# Your AI Agent Has the Keys to Everything -- And They're Sitting in a Text File

## The MCP credential problem is real, it's widespread, and it's the kind of thing that keeps security architects up at night

---

In October 2025, a security researcher was poking around Smithery, one of the most popular hosted MCP server platforms. Thousands of developers use it to run AI integrations -- Slack bots, GitHub assistants, email automations, calendar connectors, you name it. The researcher found a path traversal bug in the build configuration. By setting one parameter -- `docker build path` -- to `..`, they could make the platform build Docker images from the builder's home directory instead of the project folder.

That home directory contained a file called `.docker/config.json`. Inside that file was a Fly.io API token with control over more than 3,000 MCP server applications. From that single token, an attacker could execute arbitrary commands in any of those containers, access inbound client traffic, and harvest API keys for downstream services. Brave API tokens, customer credentials -- the works.

One parameter. One config file. Three thousand compromised applications.

And this is still the state of MCP security in 2026.

## You're Probably Already Doing This Wrong

Let's think about how most organizations actually deploy MCP servers. Your team wants to connect an AI assistant to Slack. Reasonable enough -- you want to summarize channels, search message history, maybe draft responses. You find a popular open-source MCP server with thousands of stars on GitHub. Very reasonable.

Then you look at the setup documentation. It walks you through opening Chrome, navigating to developer tools, going to the Application tab, selecting cookies, and copying a session token value. Then you paste that value into a JSON configuration file on your local machine.

Let that sink in. You've just extracted a session token from your browser and stored it in plain text on your machine. That token doesn't expire when you close the browser. It doesn't rotate automatically. It sits in a config file that any process on your machine can read -- including that VS Code extension you installed last week, or the MCP servers you're about to run.

This isn't some sketchy underground tool. This is a *documented setup process* for widely used MCP integrations. The ecosystem has normalized credential extraction as a setup step.

Now multiply that across your organization. Every developer who's curious about AI tooling. Every proof of concept that never got a security review. Every config file sitting in a home directory somewhere. That's your actual attack surface. And it's probably not in your asset inventory or risk register.

## General LeMay Had It Right in 1962

Back in 1962, the US Air Force implemented what they called "two-person integrity" for nuclear weapons. The principle was simple: no single individual should ever have both access to and control over a nuclear device. The reasoning? The consequences of misuse were too catastrophic to trust any one person, no matter how vetted.

General Curtis LeMay reportedly said, *"It's not about trusting people. It's about removing the opportunity for catastrophe."*

Today we're handing AI agents the keys to our most sensitive systems -- email, calendars, code repositories, payment systems -- by copying cookies out of browsers and sticking them into files on the filesystem. We've forgotten LeMay's lesson. It's not about trusting the tools. It's about removing the opportunity for catastrophe.

## A Timeline of Things Going Very Wrong

The Smithery breach wasn't an isolated incident. It was one entry in a timeline that security researchers have been documenting since MCP adoption accelerated in early 2025.

**April 2025:** Invariant Labs demonstrated that a malicious MCP server could silently exfiltrate a user's entire WhatsApp history. The attack combined tool poisoning with a legitimate WhatsApp integration -- a random "fact of the day" tool that morphed into a sleeper backdoor, forwarding hundreds of past conversations to an attacker-controlled phone number.

**May 2025:** Researchers found a prompt injection attack against the official GitHub MCP server. A malicious public GitHub issue could hijack an AI assistant and make it pull data from private repositories, then leak it back to a public repo. With a single overprivileged personal access token, the compromised agent exfiltrated private repository contents, internal project details, and personal financial information into a public pull request.

**June 2025:** Anthropic's own MCP Inspector -- their official debugging tool -- was found to allow unauthenticated remote code execution. An attacker could get arbitrary commands run on a developer machine just by having the victim inspect a malicious MCP server.

**September 2025:** A malicious MCP server package masquerading as a legitimate Postmark integration was found injecting BCC copies of all email communications to an attacker's server. Emails, internal memos, invoices -- all silently forwarded.

The principle this timeline illustrates is one we've known since the earliest days of computing: when you connect systems without rigorous access controls, you inherit their combined risk surface. MCP promised to be the USB-C of AI agents -- a universal bridge to tools, APIs, and data. What it actually became was a universal bridge for attackers.

## Your IDE Is Part of the Problem Too

The credential problem extends beyond MCP servers to the entire AI-assisted development environment. Take Cursor, one of the most popular AI-powered code editors. It's accumulated a remarkable collection of CVEs over the past year.

**CVE-2025-59944:** A case sensitivity bug that allowed attackers to bypass file protections on `.cursor/mcp.json` configuration files. On Windows and macOS, where file systems are case-insensitive by default, an attacker could create a mixed-case variant and the IDE would load it as legitimate configuration.

**CVE-2025-54136 ("MCPoison"):** Once a user approved an innocent-looking MCP configuration in a shared repository, an attacker could silently modify it to execute arbitrary commands. No reprompt, no warning -- the trust, once granted, persisted.

**CVE-2025-54135 ("CurExecute"):** Malicious content in Slack messages, when summarized by Cursor's AI, could rewrite MCP configuration files and achieve remote code execution. The attack chain completed in minutes.

And then there's the auto-run problem. Cursor ships with workspace trust disabled by default. A malicious `.vscode/tasks.json` file with a "run on folder open" setting executes the moment a developer browses to a repository. No click required.

The security researchers at Oasis put it perfectly: *"Developer laptops inherit powerful access -- cloud keys, personal access tokens, API tokens, SSH sessions. With auto-run enabled by default, a booby-trapped repo can quickly pivot from one machine to CI/CD and then the cloud."*

You download something that looks legitimate, and you can lose everything.

## The Fix: Stop Giving AI Agents Raw Credentials

The traditional approach -- telling users to be more careful, to audit every tool they download, to never paste credentials into config files -- doesn't scale. It never will.

We need architectural controls that remove the opportunity for catastrophe regardless of user behavior. This is where the **credential broker pattern** comes in.

Instead of storing OAuth tokens on endpoints where malware can harvest them, credentials live in a centralized, hardened authentication server. The AI agent -- whether it's an MCP server or an IDE plugin -- never sees the raw token for the third-party system. It gets a scoped, revocable reference that grants access to specific capabilities through an authenticated proxy.

Think of it like a CASB (cloud access security broker), but for AI agents. The proxy sits between the agent and third-party APIs, enforcing policies about which operations are permitted, logging every request for audit trails, and validating that the requester is actually authorized for that specific action.

Here's what the flow looks like:

1. The user authenticates via standard OAuth flow in their browser -- the same way they connect to any enterprise application.
2. Credentials are stored server-side, encrypted at rest, never exposed to the endpoint.
3. When an AI agent needs to perform an action -- create a calendar event, list a GitHub repo, send an email -- it makes a request to the proxy.
4. The proxy validates the agent token, looks up the user-service connection, validates the underlying OAuth token, executes the API call, and returns the results.

The agent gets the capability it needs but never sees the credentials themselves. The MCP specification actually addresses this directly: MCP clients must not send tokens to the MCP server other than the ones issued by the MCP server's own authorization server. That's token isolation. But most implementations don't follow this pattern. They ask for raw credentials, store them locally, and operate with whatever privileges those credentials grant -- usually far more than the agent actually needs.

## Seven Things You Can Do This Week

Here's your action list. No excuses.

**1. Audit your MCP server configurations.** Search your environments for `.cursor/mcp.json` and similar configuration files. Identify any that contain raw OAuth tokens, API keys, or session cookies. These are your immediate risk surface.

**2. Enable workspace trust in Cursor and VS Code.** This single setting change prevents the auto-run vulnerability -- malicious repositories that execute code the moment you open them. Enforce it via organizational policy or your MDM, not left to individual developers.

**3. Inventory your AI tool credentials.** Create a register of every AI tool that has access to corporate systems, what credentials it holds, who those credentials belong to, where they're stored, and when they were last rotated. If you can't answer any of these questions, you have significant visibility gaps.

**4. Evaluate credential broker architectures.** Whether you build or buy, start planning for a future where AI agents don't hold raw credentials. Look at MCP proxy patterns, CASB integration, or centralized secrets management through tools like HashiCorp Vault or AWS Secrets Manager.

**5. Implement per-workflow identity where possible.** Start with your highest-risk AI workflows. Can you provision short-lived, minimally scoped credentials instead of long-lived tokens? Can you revoke access when a workflow completes?

**6. Add AI tools to your security awareness training.** Developers need to understand that downloading AI tools carries the same risk as downloading any other executable -- and the attack surface is larger because these tools request access to everything.

**7. Use your EDR to build visibility.** Look at all the commands currently being executed on endpoints -- Claude, Gemini, Codex, whatever you've approved. Then trace the spawned processes and DNS requests to MCP servers. Look for TypeScript, JavaScript, or Python files reading outside of project directories. Any MCP server reading from a user's home directory unrelated to the task at hand is a red flag.

## It's an Architecture Problem, Not a User Problem

Let me be clear about where we are. The MCP specification is new. The ecosystem is immature. Most implementations prioritize functionality over security -- get it working fast, lock it down later. That's understandable for early adoption. But it's not acceptable for enterprise deployments.

The building blocks exist: SPIFFE for workload identity, HashiCorp Vault and AWS Secrets Manager for centralized credential storage, OAuth 2.1 for mandatory PKCE and dynamic client registration. What's needed is integration -- purpose-built infrastructure that applies these patterns specifically to AI agent workflows.

The breaches of 2025 were rooted in timeless flaws: overprivilege, inadequate input validation, and insufficient isolation. AI fundamentally changes the interface but not the fundamentals of security. To secure the AI era, we have to rigorously apply old-school principles -- least privilege, zero trust, defense in depth -- to these powerful new software components.

It's not about trusting your tools. It's about removing the opportunity for catastrophe.

---

*Thanks for reading. This article is based on an episode of **Plan B Security**, an information security podcast about everything that can go wrong -- because it does. If you want to hear more, find us wherever you get your podcasts. And remember: in enterprise security, there's always a Plan B.*

*-- Mike Mackintosh*
