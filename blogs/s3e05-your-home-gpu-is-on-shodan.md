# Your Home GPU Is on Shodan: How to Secure a Self-Hosted LLM

## How we put a local LLM on the internet without exposing it, with identity, authentication, authorization, and accounting on every request


<!-- published: 2026-08-26 -->
---

## How this started

We run a local LLM on a Mac Mini in the house, served over an OpenAI-compatible API, and we wanted to reach it away from home. The path of least resistance is one router rule — `internet -> router:30000 -> mac-mini:30000 -> model server`. That is the setup most people land on, because Ollama, vLLM, and SGLang all default to listening and serving, and Shodan will show you thousands of instances running exactly this way, with no TLS, no authentication, and no record of who called. Anyone who finds the port gets free compute, and every prompt and completion crosses the internet in plaintext.

We knew that going in, and we were not willing to put the machine on the internet under those terms. So before the model took any traffic from outside the LAN, we set a requirement: every request to the model has to clear **IAAA**, meaning **I**dentity (who is this?), **A**uthentication (prove it), **A**uthorization (are they allowed?), and **A**ccounting (write it all down), and the machine should have no route from the internet except through something that enforces all four. This post is about the system that requirement produced.

## What we built

<figure>
<img src="/img/s3e05-your-home-gpu-is-on-shodan.webp" width="1672" height="941" loading="lazy" decoding="async" alt="Diagram: what happens on every request. Eight stages run left to right — a user or app request, identify the requester, authenticate, authorize, then an allow-or-deny decision. Allow continues to account and audit, forward to the local LLM API, the model server, and finally the response. Deny blocks access. Callouts note that there is no anonymous access, policy is evaluated before model access, every request carries per-user accountability, and every request leaves a trail. A band underneath traces the full chain: identity, authentication, authorization, accounting." />
<figcaption>Every request clears identity, authentication, authorization and accounting before the model sees it — a denial never reaches the model server at all.</figcaption>
</figure>

There are four pieces, and each one is as small as we could make it:

1. **An OIDC authorization server.** We run our own because it is part of our platform, but everything in this post works against any AS that implements the standards correctly: authorization code with PKCE, `client_credentials`, device authorization (RFC 8628), resource indicators (RFC 8707), and JWKS discovery.
2. **An edge guard.** This is a Go reverse proxy of about 120 lines that runs in our cloud, behind real DNS and a Let's Encrypt certificate. It verifies the JWT signature against the AS's JWKS, checks the token's `aud` claim against an allowlist, and only then forwards the request to the house, adding a shared-secret `X-Edge-Token` header after stripping any copy of that header a client tried to send.
3. **llmgw.** This is a Go gateway of about 1,000 lines that runs on the Mini itself, and it is where IAAA actually happens: token verification, user provisioning, the enable/disable gate, prompt policy, and the accounting write.
4. **The model server, unreachable.** The model server has no published port at all anymore. It exists only on a private Docker network, and the router forward to :30000 is gone. Even from inside our LAN, the only way to reach it is through the gateway.

All of the code in this post lives in a companion repository at [rocketbox.ai/mike/iaaa-llm-gateway](https://rocketbox.ai/mike/iaaa-llm-gateway), and it is small enough to read in a sitting.

## The decisions, and why we made them

### Why we did not just run LiteLLM

The standard answer to this problem is [LiteLLM](https://github.com/BerriAI/litellm), and if your situation is many upstream providers, model routing, and per-team budgets, it is a reasonable tool. We looked at it and decided against it, for three reasons.

First, identity. LiteLLM's model is built around virtual API keys that it issues and stores, which means running a second credential system next to the IdP we already operate. We wanted the opposite: our OIDC authorization server is the only source of identity, humans authenticate with the device flow, machines authenticate with their own OAuth clients, and the gateway holds no credentials of its own to leak, rotate, or audit separately.

Second, scope. We have one upstream model server and one team. LiteLLM is a large Python codebase with a large configuration surface, and we would be running, patching, and reasoning about far more software than the problem calls for. The gateway we wrote instead is about a thousand lines of Go, and we understand every one of them, which matters more in a security boundary than feature count does.

Third, the specific behaviors we wanted were easier to write than to configure: stripping client system messages and injecting our own prompt server-side, the proof-of-transit gate, and the split between shipped metrics and locally spooled prompt bodies. None of those are exotic, but they are opinions, and holding opinions is simpler in code you own.

### Machines and humans get different credentials

The first version of "add auth" everyone reaches for is a single shared API key. We skipped it, because a shared secret would just rebuild the exposed port with extra steps: it identifies nobody, it cannot be revoked for one person without breaking everyone, and it makes the accounting table useless.

Instead, the token's grant type encodes what kind of caller you are:

- **Unattended workloads** use `client_credentials`, and each service gets its own OAuth client so the token's `sub` names the workload. At one point we almost shared a service credential between a human and a cron job, and catching that was a useful lesson: one client per principal, every time.
- **Humans** use the **device flow** (RFC 8628). We wrote a small helper called `llmgw-token` (about 200 lines) that prints a URL and a short code to stderr; you approve it once in a browser where you are already signed in, and the token pair lands in `~/.config` with `0600` permissions and refreshes silently after that. The important design choice is that the CLI's OAuth client is public (PKCE, no secret), so there is no shared credential sitting on anyone's laptop, just a per-person refresh token that can be revoked individually.

The payoff shows up in the accounting table: rows say `mike@...` or `reporting-cron`, and never "whoever had the key."

### Two gates on every API call

A single perimeter check means a single mistake exposes the origin, so we check twice, independently. Here is the middleware from the gateway:

```go
func (s *Server) requireAPIUser(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Gate 1: proof of transit. Only the edge proxy injects X-Edge-Token
		// (and strips inbound copies), so a matching header means the request
		// actually crossed the edge guard.
		if s.cfg.EdgeToken != "" &&
			subtle.ConstantTimeCompare([]byte(r.Header.Get("X-Edge-Token")),
				[]byte(s.cfg.EdgeToken)) != 1 {
			http.Error(w, `{"error":"requests must come through the gateway edge"}`,
				http.StatusForbidden)
			return
		}
		// Gate 2: a verified principal.
		raw, ok := strings.CutPrefix(r.Header.Get("Authorization"), "Bearer ")
		if !ok || raw == "" {
			http.Error(w, `{"error":"missing bearer token"}`, http.StatusUnauthorized)
			return
		}
		tok, err := s.apiVerifier.Verify(r.Context(), raw)
		if err != nil {
			http.Error(w, `{"error":"invalid token"}`, http.StatusUnauthorized)
			return
		}
		u, err := s.store.GetOrCreateUser(tok.Subject, email, s.cfg.AutoEnable)
		// unknown subjects are created DISABLED and get a 403 telling them
		// to ask the administrator to enable their account
	}
}
```

The transit header only means something because the edge refuses to pass an inbound copy through. This one `Header.Del` line is doing a lot of work:

```go
proxy := &httputil.ReverseProxy{
	Rewrite: func(pr *httputil.ProxyRequest) {
		pr.SetURL(origin)
		// The transit stamp is only ever set by THIS hop. Strip any inbound
		// copy first, so a client can never forge proof of transit.
		pr.Out.Header.Del("X-Edge-Token")
		if edgeToken != "" {
			pr.Out.Header.Set("X-Edge-Token", edgeToken)
		}
	},
	FlushInterval: -1, // LLM responses stream; don't buffer completions
}
```

Neither gate trusts the other. If the edge is misconfigured, the origin still demands a valid user, and if the origin's address leaks, the transit gate still refuses direct callers, including callers on our own LAN. On the principal side, unknown subjects are auto-provisioned in a disabled state, so getting access is a deliberate action by an admin, per person, and revocable per person.

### Audience-stamp the tokens instead of allowlisting client ids

Early on, our edge allowlist started accumulating OAuth client ids, because every new CLI client meant another config entry. That is backwards, and RFC 8707 (resource indicators) is the fix. The caller states what the token is for (`resource=https://llmgw.example.com`), the AS validates that value against the client's registered audiences, and stamps it into `aud`. After that the edge allowlists exactly one string, the gateway's own URL, and it never needs another entry. We did have to add `resource` support to our AS's device flow to get there, since only the authorization-code path had it; if your AS supports resource indicators partially, this is the gap worth asking them to close.

### Accounting: metrics are shipped out, prompt content stays local

Every request writes a row: caller, model, tokens in and out, cost at configured prices, wall-clock duration, status, plus the full prompt, the response, and the chain-of-thought for reasoning models. Those are two different kinds of data, so we split them:

- **Metrics** ship in batches to our central Postgres and stay there permanently, which is what dashboards, chargeback, and "what happened in March" questions are built on. Shipping is at-least-once with idempotent dedup on `(gateway, request_id)`, and it authenticates with a `client_credentials` token carrying a purpose-built custom scope (`llm:ingest`) that exactly one client is granted.
- **Bodies** (prompts, completions, reasoning) never leave the house. The gateway's local SQLite acts as a rolling one-week debugging spool, and shipped rows past the retention window get deleted. Storing conversation content forever is a liability you should take on deliberately if you take it on at all, not inherit from your logging design.

One more accounting decision that has earned its keep: the gateway injects the system prompt server-side and strips any system messages the client sent. Clients never see the prompt and cannot override it, and the stored record reflects what the model actually received.

## The OAuth attacks this design accounts for

Putting an IdP in front of something does not make it safe by itself. OAuth deployments have a well-documented catalog of failure modes, and the IETF's Security Best Current Practice ([RFC 9700](https://www.rfc-editor.org/rfc/rfc9700)) is a good tour of them. These are the ones that shaped specific decisions in this design.

**The confused deputy.** A service that accepts any valid token from a shared issuer can be handed a token that was minted for a completely different purpose, and it will do work for a caller who was never authorized to use it. The service is the deputy, and the attacker confuses it with borrowed authority: a token legitimately issued for some other app on the same IdP works just fine at your API, because the signature checks out. Audience restriction is the direct fix, and it is why RFC 8707 shows up so often in this post. Tokens are minted for a stated resource, the AS validates that request against the client's registered audiences, and both the edge and the gateway check the resulting `aud` claim. A token minted for anything else is refused, even though the same AS signed it. If you take one OAuth lesson from this article, take this one: verify audience, not just signature.

**Stolen and replayed credentials.** Access tokens live for an hour. Refresh tokens rotate on every use, and presenting a rotated-out refresh token is refused, which also acts as theft detection, because a stolen token and its legitimate owner cannot both keep refreshing. Where clients authenticate with signed JWT assertions instead of secrets, each assertion carries a single-use `jti`, so a captured assertion replays into a rejection. Device codes are consumed exactly once.

**Authorization code interception.** PKCE is required on every authorization-code flow, redirect URIs match exactly with no wildcards, and codes are single use. An intercepted code without the verifier is worthless, and there is no registered URI loose enough for an attacker to receive one at.

**Client impersonation.** The AS enforces each client's registered `token_endpoint_auth_method`: a client authenticates the way it registered or not at all. This is why the auth-style bug earlier in the post mattered enough to chase, because an AS that accepts whatever style shows up is easier to impersonate against, and one that enforces the registration will break clients whose libraries choose a style at random.

**Trusting network position.** The proof-of-transit gate is deliberately not an IP allowlist. Source addresses are weak identity: they are spoofable in some topologies, shared behind NAT, and they rot as infrastructure moves. The gate is possession of a secret header that only the edge can inject, the edge strips any inbound copy so a client cannot forge it, and the gateway compares it in constant time.

**Scope creep.** Requested scopes are intersected with each client's registered allowlist at mint time, so a client cannot talk its way into scopes it was never granted. Purpose-built endpoints get purpose-built scopes: the metrics ingest endpoint accepts exactly one custom scope, and exactly one client is granted it.

None of these protections are novel, and that is the point. They are the standard answers from the RFCs, and each one maps to a specific line of code or configuration in [the companion repository](https://rocketbox.ai/mike/iaaa-llm-gateway) that you can point at during a review.

## Worth understanding before you build this

**Access tokens do not carry email, and that is correct behavior.** Profile claims belong in ID tokens and `/userinfo`, not in access tokens, so a resource server that wants to show who a subject is has to go get that answer. Our first per-human user rows had empty email columns until we did it the way the spec intends: the gateway calls `/userinfo` once for each newly-seen subject, but only for tokens with the `openid` scope, since machine tokens have no user behind them and should honestly stay blank. The result gets cached on the user row. It is tempting to just stuff `email` into the access token, and worth resisting.

## A bug we hit

**Your OAuth library is choosing its auth style at random.** Go's `x/oauth2` defaults to auto-detecting the client authentication style: it tries one of `client_secret_basic` or `client_secret_post`, falls back to the other on failure, and caches the winner per process, which means every restart can present a different method. We only noticed because our AS logs a warning when the presented method does not match the registered one (we ran a warn-only soak period before enforcing), and one client warned in both directions on different days. The fix is one line that belongs in every Go OAuth client:

```go
endpoint := provider.Endpoint()
endpoint.AuthStyle = oauth2.AuthStyleInHeader // client_secret_basic, always
```

If your IdP enforces the registered auth method, and it should, auto-detect is a latent outage.

There is also an honorable mention that bit us twice in one day: appending to a YAML config with a shell one-liner is not idempotent, duplicate keys are a fatal parse error in strict YAML libraries, and a config parse failure at boot means a crash loop that your reverse proxy reports only as a 502. Validate the config before restarting, and make provisioning steps idempotent.

## What it costs

The gateway adds single-digit milliseconds to inference times that are measured in seconds, and because every response now includes the measured duration (`gateway.duration_ms`), that overhead is visible rather than asserted. Operationally, the whole stack is one `docker compose up` on the model host plus one small deployment in the cloud. The code we wrote totals well under two thousand lines of Go. The AS-side behaviors are pinned by an integration suite that boots the real server against a throwaway Postgres and runs every flow in about two seconds, and that suite caught, on its first run, that our `client_credentials` implementation had never actually worked for registered OAuth clients. A test suite proves its value quickly in this kind of work.

## If you are running an exposed local model today

This is the order that worked for us, and each step ships on its own:

1. **Get the model server off 0.0.0.0.** Put it on a private network only. This is the single highest-value change, and it costs one compose file.
2. **Put a gateway in front** that verifies tokens from an IdP you already trust, which can be any OIDC-compliant AS. Provision unknown users disabled.
3. **Terminate TLS with a real certificate** at something with a real domain, and proxy to the house from there.
4. **Split credentials by principal**: one OAuth client per workload, and the device flow with a public client for humans, so there are no shared keys and no secrets on laptops.
5. **Write everything down** (tokens, duration, caller), and decide on purpose where prompt bodies live and for how long.
6. **Then harden**: audience-stamped tokens, proof-of-transit headers, and enforced client-auth methods.

None of this required exotic technology. It is the standard OAuth RFCs applied consistently, and the result is a model server that is reachable from anywhere but answers only to people and workloads we can name.

---

*The gateway, edge guard, token helper, and deploy scripts described here are published at [rocketbox.ai/mike/iaaa-llm-gateway](https://rocketbox.ai/mike/iaaa-llm-gateway), and the shape transfers to any stack: Ollama behind oauth2-proxy and Keycloak clears the same bar. Questions or war stories of your own: hello@planb.security.*
