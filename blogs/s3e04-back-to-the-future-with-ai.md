# Stop Building Tomorrow's Security Debt: AI Agents and the 25-Year Identity Crisis We Keep Ignoring

**You already know how this ends. Unless you do something different.**

---

Forty-five to one. That's the ratio of non-human identities to humans in the average enterprise. Some organizations? It's 144 to 1. For every person with a badge and a login, there are dozens — sometimes hundreds — of service accounts, API keys, bot credentials, and now AI agents quietly humming away in the background.

And here's the thing that keeps me up at night: we've been making the same mistake with machine identity for about 25 years. Same pattern, same consequences, just different technology.

## The Archaeological Dig You Don't Want to Do (But Need To)

An up-and-coming cybersecurity leader I coach brought me a scenario recently. They were preparing to deploy their first production AI agents, and I gave them some advice: before you hand a credential to something that can act autonomously, understand what you already have.

So they pulled a report for every non-human identity in their environment. What we found was archaeological.

**Layer one:** An Active Directory service account from 2014. One of them — and I wish I was making this up — was still a domain admin. Why? Because the application vendor's documentation said it needed elevated privileges. Nobody questioned it. Nobody revisited it. Ten years later, there it sits.

**Layer two:** A Hadoop service account from 2017, created during the big data push. The engineer who set it up left the company a few years later when COVID hit. The password hasn't been rotated since. Why? Because three different analytical pipelines depend on it, and nobody wants to touch it for fear of breaking something.

**Layer three:** A Tray.io integration from 2021. Multiple people used this credential to configure workflows. Someone who worked on the project left the company eight months ago, and the credential still hadn't been rotated. The exact phrase someone used? *"It's too risky to rotate."*

Too risky to rotate. Let that sink in. A credential so deeply embedded, touching so many things, that changing it would break more than leaving it exposed.

If your company is older than three or four years, I guarantee you have something like this sitting in your environment right now. And we're about to add AI agents on top of it all.

## We've Been Warned Before — Repeatedly

Grace Hopper — computer scientist, Navy Rear Admiral, the person who popularized the term "debugging" — once said, *"The most dangerous phrase in the language is, we've always done it this way."* She was talking about resistance to change in computing. But she might as well have been talking about identity and access management.

The history is instructive. In late 2009, Operation Aurora compromised Google, Adobe, Yahoo, and at least 30 other major companies. Google's security team described their pre-Aurora architecture as "crunchy on the outside, chewy in the middle." Great for candy bars. Terrible for security. That attack led Google to build BeyondCorp in 2011 — the first major enterprise implementation of Zero Trust. The core principle? Identity is the perimeter.

Fast forward to December 2020: the SolarWinds attack. Eighteen thousand organizations received compromised software updates. Service accounts became highways for lateral movement. CISA's post-incident analysis was blunt: *"Our takeaway from this attack is that identity is everything now. Identity has become the boundary."*

We learned this lesson in 2009. We relearned it in 2020. Now in 2025 and 2026, we're being asked to learn it again with AI agents. The question is: will we?

## The Pattern That Keeps Repeating

See if this sounds familiar:

1. A new technology emerges that needs machine-to-machine communication.
2. Someone creates a service account "just to get it working."
3. The credential is long-lived because rotation is hard.
4. Multiple systems start depending on that credential.
5. Someone leaves the company.
6. Nobody rotates the credential because it's "too risky."
7. Permissions accumulate because it's easier than creating a new identity.

And now you have an overprivileged credential you can't rotate, can't audit, and can't attribute.

This played out in the Active Directory era. It played out in the Big Data era when everyone needed access to the data lake. It played out in the No-Code era with platforms like Tray.io, Zapier, and Workato. And it's playing out right now with AI agents. The only thing that changes is the technology. The mistakes stay the same.

## "Access to Everything" vs. "Access to What You Need"

Remember when Hadoop clusters started appearing in enterprises? They came with a philosophy: everyone accesses everything. That was the design goal. Data lakes became data swamps. Sensitive information mixed with public data. And when someone finally asked, "Wait, who should actually have access to this?" the answer was, "Well... everyone already does."

AI agents are creating the same dynamic — not just with data access, but with permissions. It's easier to give an agent broad access than to figure out exactly what it needs. It's easier to add a permission to an existing agent than to provision a new identity. Before you know it, you've got an agent with access to *everything*, not access to *everything it needs*.

That one word — "need" — is everything.

## The Service Account Login Problem Nobody Talks About

There's another pattern I need to call out because it's particularly insidious: service accounts used for interactive login.

You create a service account for an application. The application needs configuration. Instead of setting up proper delegated access, someone just logs in as the service account. Then someone else does the same thing. Now you have multiple humans logging in behind one machine identity.

Your audit logs show "service_account_integration_1 performed this action." Which human was it? You can't answer. Attribution is gone. Accountability is gone. And when auditors ask who authorized a change, you're stuck.

AI agents make this worse, not better. When an agent takes an action, you need to trace it back to two identities: the agent itself and the human who authorized it. If you're reusing agent credentials across workflows, you lose that traceability entirely.

*"The agent did it." Which agent? "The one we use for everything." Who told it to do that? "Nobody knows."*

That's an awkward conversation to have with your auditor.

## The Fix: Treat Agents Like Ephemeral Workers

Here's the operational philosophy I recommend: **provision, run, deprovision.**

Create the identity for a specific task. Grant minimum necessary permissions. Execute the workflow. Revoke immediately when complete.

Yes, this is more operational overhead than just handing out a service account. The operational load is worth it. Here's what you get:

- **Clean audit trail.** Every action attributed to a specific identity.
- **No permission accumulation.** The identity doesn't exist long enough to acquire extra privileges.
- **No "too risky to rotate" problem.** There's nothing to rotate. The credential is already gone.
- **Blast radius containment.** If a credential is compromised, it's only useful for one task during a short window.

The technology to do this already exists. SPIFFE and SPIRE handle short-lived, cryptographically verifiable identities tied to specific workloads. Just-in-time access grants permissions only when needed and revokes immediately after. OAuth 2.0 token exchange with delegation embeds both the agent identity and the authorizing human. We just need the discipline to use them.

## Make It Bi-Directional

Here's something that might surprise you: AI agent identity management isn't just a cost center. Everything you build for agent identity governance can and should flow back to human access management.

Build automated credential rotation for agents? Use it for humans and service accounts too. Build task-based authorization instead of role-based? That benefits humans who only need access for specific projects. Build faster provisioning and deprovisioning? Now you can onboard and offboard humans faster.

This isn't just about securing agents. It's about using agents as the forcing function to fix identity management problems we've been ignoring for decades.

## Seven Things You Can Do This Week

1. **Audit your "too risky to rotate" credentials.** You have them. I promise. From the no-code era, the big data era, the integration someone built five years ago — find them before AI agents create more.

2. **Stop logging in as service accounts.** If humans are using service account credentials for interactive sessions, you've already lost attribution. Use delegated access or on-demand credential checkout so every action is attributable.

3. **One workflow, one identity.** Yes, it's easier to add permissions to an existing agent. It's also how credentials become too risky to rotate. Break the cycle now.

4. **Implement ephemeral credentials where you can.** Provision, run, deprovision. Start with your highest-risk workflows. The operational load is worth the security benefit.

5. **Build an audit trail that works for machines.** When an AI agent acts, trace it back to both the agent and the human who authorized it. Delegation tokens, structured logging, attribution at every step.

6. **Make it bi-directional.** Whatever you build for AI agent IAM should improve human access too. Don't treat this as a separate silo.

7. **Learn from the previous eras.** Big Data gave us "access to everything" vs. "access to what you need." No-Code gave us "too risky to rotate." AI agents are the third verse of the same song. You already know how this ends if you don't change the tune.

## Break the Pattern

In five years, someone will do the same audit you should be doing today. They'll find the AI credentials we create this quarter. The question is whether they'll find the same pattern — convenience over governance, accumulation over lifecycle management, "it's easier this way" over "it's the right way" — or whether we'll have finally learned the lesson.

The operational load is worth it. Treat agents as ephemeral workers. Provision, run, deprovision. And bring the improvements back to the humans. Because in cyber defense, you're not only getting the benefits on the AI side — you're reinvesting in the past.

So the next time somebody asks for your ideas on AI agent provisioning, let them know: you have a Plan A, but you also have a Plan B.

---

*This article is based on an episode of **Plan B Security**, an information security podcast about everything that can go wrong — because it does. Hosted by Mike Mackintosh. Thanks for reading, and remember: nothing ever goes according to plan.*
