# Your Development Lifecycle Has a Worm Problem

## How a self-replicating NPM worm named after a Dune sandworm exposed the fragile trust holding your software supply chain together

Back in 1984, Ken Thompson stood at a podium to accept the Turing Award. Big glasses, probably a tweed jacket -- the kind of guy who looks like he belongs in a university computer lab. Reagan was in the White House, Michael Jackson's *Thriller* was still dominating the charts, and most people had never touched a computer.

Thompson's acceptance speech, *Reflections on Trusting Trust*, laid out something unsettling. He described how you could modify a compiler to insert a backdoor into any program it compiled -- including future versions of the compiler itself. The backdoor would persist even if you rebuilt the compiler from clean source code. His conclusion was simple: **you can't trust code that you did not totally create yourself.**

Nearly 40 years later, we're still wearing aviator sunglasses, but everything else has changed. We don't create our code ourselves anymore. We compose it from thousands of dependencies, each maintained by strangers, each capable of running arbitrary code on our systems. The question isn't whether to trust -- it's how do we verify?

## The Worm That Ate the Supply Chain

September 2025. A package called `@aspect-build/rules-jest` pushes a malicious update to NPM. Within hours, it spreads to 40 other packages. By the time anybody notices, the malware has already stolen credentials from hundreds of developers, published itself to packages those developers maintained, and uploaded their secrets to public GitHub repositories.

The attacker named their creation **Shai Halud** -- the sandworm from *Dune*. Fitting name for something that burrows through your supply chain, consuming everything in its path.

But Shai Halud didn't come out of nowhere. About 10 days earlier, attackers had compromised the NX build system -- a popular monorepo tool used by thousands of JavaScript teams -- in an attack dubbed **Singularity**. It exploited a flaw in GitHub Actions, and all it took was updating the NPM package to the latest version. The malicious code scanned developer machines for sensitive data and, if you had linked your GitHub account to the CLI utility, it would create a *public* repository under your namespace and dump every credential it could find into it for the world to see.

The stolen credentials from Singularity then fueled Shai Halud. When a compromised package was installed, it stole the developer's credentials and used them to publish malicious versions of any package they maintained. Exponential spread.

By November, Shai Halud 2.0 had evolved. It switched from post-install to pre-install hooks -- running before installation even completed, even if the install failed. It added obfuscation. It included a deadman switch that would wipe your home directory if its exfiltration channels were blocked. Let that sink in.

## Two Attack Patterns You Need to Understand

Every supply chain attack targets one of two things, sometimes both.

**Pattern 1: Compromise the developer.** The attacker wants access to your infrastructure. Malicious code runs on developer machines or CI/CD systems, stealing credentials, tokens, private keys -- the whole nine yards. The goal is lateral movement: using your access to compromise other systems, other packages, other organizations. Shai Halud is the textbook example. It used TruffleHog to scan for secrets, harvested GitHub and NPM tokens, extracted cloud credentials from environment variables, and even leveraged AI tools to assist its reconnaissance.

**Pattern 2: Compromise the customer.** The attacker wants access to your users. The malicious code makes it into your production build and runs in your customers' browsers. Think crypto stealers injected into React frontends, or payment skimmers embedded in checkout flows. The 2024 Polyfill attack worked this way -- a compromised CDN delivered malicious JavaScript to hundreds of thousands of websites, running in the browsers of millions of end users.

Here's the question you should be asking: which pattern poses the greatest risk to *your* organization? An attack that compromises your developer infrastructure, or one that compromises your customers?

## Closed Source Isn't Safe Either

We've been focused on open source, but closed source software presents its own supply chain risks -- and they're often harder to detect. When you install commercial software, you're trusting the vendor's entire development, deployment, and distribution pipeline. Their employees, their contractors, their build systems, every dependency they've included.

Remember SolarWinds? December 2020, the world is in lockdown, everyone's baking sourdough bread, and we learn that attackers had compromised SolarWinds' build environment. They embedded malicious code into software updates distributed to 18,000 organizations, including multiple U.S. government agencies. IT teams were intentionally pushing compromised updates to their networks under the guise of a patch, because they were paying to trust this vendor.

A SOC 2 report doesn't tell you how a vendor secures their build pipeline. You need to ask: do they use reproducible builds? Do they sign their releases? How do they verify their own dependencies? If you can't answer those questions for the commercial software running in your production environment, you have a blind spot.

## Building Defenses That Developers Will Actually Use

Here's the tension every security team faces: the most effective supply chain defenses slow developers down. And in an organization that depends on velocity, friction creates workarounds -- shadow tools, disabled checks, copy-pasted credentials. The goal isn't to eliminate risk. It's to build controls that developers will actually use.

### Layer 1: Reduce Your Attack Surface

Every package you include is a potential attack vector. The question isn't "do we need this feature?" -- it's "is this package worth the risk?"

Pin your dependencies. Use lock files. Specify exact versions, not ranges. This won't prevent attacks, but it gives you control over when you accept new versions -- meaning when you accept new risk. Introduce a time delay: don't allow packages into your environment unless they've been published for at least four or five days.

### Layer 2: Secure Your Build Environment

Your CI/CD pipeline is essentially remote code execution as a service. Treat it like production infrastructure.

- **Disable lifecycle scripts** in CI environments. Use `--ignore-scripts` for NPM. Yes, some packages legitimately need install scripts, but you should be making that decision consciously, not accepting it by default.
- **Restrict network access.** Your build system probably doesn't need outbound access to arbitrary domains. Shai Halud exfiltrated data to webhook.site and api.github.com. If your build system can't reach those endpoints, the attack fails.
- **Use short-lived, narrowly scoped credentials.** If your CI pipeline needs an NPM token, that token should only have permissions to publish specific packages and should expire after the build completes.

### Layer 3: Detect Compromise

You can't prevent every supply chain attack, but you can detect them quickly. Monitor for dependency changes -- especially patch releases that modify install scripts or add new dependencies. Watch for suspicious repository activity. And don't just scan your organization's repositories; consider scanning the public repositories of your employees' GitHub accounts too. Personal access tokens don't always have clear boundaries, and a token created on a personal machine could grant access into your enterprise if you haven't enabled SSO or SAML enforcement.

Implement secret scanning in your codebase. If a credential is exposed, you need to know immediately -- not when an attacker uses it months later.

### Layer 4: Enable Fast Response

When a supply chain attack drops, the difference between four hours of exposure and four days can be catastrophic. Maintain an accurate, searchable inventory of your dependencies (your SBOM -- software bill of materials). You need to answer "are we affected?" in minutes, not days.

Build a credential rotation playbook. When a compromise is detected, which tokens get revoked? In what order? Who has the authority to do it at 3 a.m.? Design your secrets management to support rotation so you can limit downtime. And practice -- run a tabletop exercise for secret rotation when you're *not* in the middle of an incident.

## The Cultural Shift Nobody Wants to Talk About

Supply chain security requires changing how developers work. You're asking them to be suspicious of the tools they rely on, to add friction to workflows they've optimized for speed, to think about security implications for decisions they've made reflexively for their entire careers.

This only works if security is a partner, not a blocker. Curate an internal registry of approved packages using tools like AWS CodeArtifact, JFrog Artifactory, or Sonatype Nexus. Make security scanning invisible until it finds something worth interrupting for. Explain the *why* behind every control -- developers who understand a threat will work with you; developers who see security as arbitrary bureaucracy will work around you.

And be willing to accept some risk. Not every dependency can be vetted. Not every build can be locked down. Make conscious decisions about where to invest your limited security resources, and document the risks you're accepting.

## Seven Things You Can Do This Week

1. **Audit your lifecycle scripts.** Run `npm config set ignore-scripts true` in your CI pipeline. Identify which packages break. Evaluate whether they're worth the risk.
2. **Inventory your dependencies.** Generate an SBOM for your production applications. Measure how long it takes you to determine if a specific package version is in your environment. Improve that number.
3. **Restrict CI/CD network access.** Limit outbound connectivity to approved registries. Block webhook.site and pastebin-style services.
4. **Scope your CI/CD permissions.** If your build process creates a Docker image, it probably doesn't need write access back to GitHub. Adjust accordingly.
5. **Add supply chain questions to your vendor assessments.** Ask about build pipeline security, dependency verification, and incident response capabilities.
6. **Enable NPM provenance checking.** Configure your package managers to warn on unsigned packages. It won't catch everything, but it raises the bar.
7. **Run a supply chain tabletop.** The scenario: a core dependency in your payment processing flow published a malicious version six hours ago. How do you detect it? Who makes the decisions? How fast can you remediate?

---

When it comes to software supply chain attacks, if you're not the victim, your customers are. And that's why learning is always the best Plan B.

*Thanks for reading. This article is based on an episode of **Plan B Security**, an information security podcast about everything that can go wrong -- because it does. I'm Mike Mackintosh. Stay curious, stay skeptical, and keep your dependencies close.*
