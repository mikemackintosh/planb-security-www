# Solutioning Through Scenarios: How to Actually Think About Security Decisions

**Before you approve that Slack app, that service account, or that web architecture -- here's the mental framework that changes everything.**

---

Look, if you've been in the security field for any real amount of time, you've heard the buzzwords -- threat modeling, risk modeling, all that good stuff. But here's the thing most people don't talk about: these concepts aren't just for fancy frameworks and compliance checklists. You use them every single day. Should I open this door? Should I make this right turn? Should I trust that the car with the blinker on is *actually* going to turn?

The more you practice thinking through scenarios, the more confidence you build. When something inevitably goes sideways, you're not panicking about *what to do next* -- you're focused on *how fast can we fix this*, which is exactly where your head needs to be.

So today I want to walk you through how I think about real security decisions -- not template-driven risk models, but the actual thought process that goes into approving or rejecting a design, a solution, an integration. And if you're not on the security team? Pay attention anyway. This is what your security folks are thinking about when you submit that request, and understanding it will make everyone's life easier.

## The FCAPS Framework: My Swiss Army Knife

Early in my career at Verizon Wireless, I had a great manager named Wes. My team was responsible for the firewall infrastructure behind every 3G and 4G connection on the network. One of the first things Wes taught me was the FCAPS model: **Fault, Configuration, Accountability, Performance, and Security**. It comes from the telecommunications world, but Wes challenged me to apply it to everything I did as a developer.

And I did. I started asking myself: Do we have fault tolerance and backups? Is the configuration consistent and verifiable? Can we track who changed what, when, and how? Is the tooling performant enough that it doesn't degrade what it's supposed to be monitoring? And is it all secure -- not just the traffic, but the tools, the access, the whole chain?

I've carried those tenants through every job since. No matter what I'm building, reviewing, or approving, FCAPS gives me a structured way to think through problems without missing the stuff that bites you later. Keep that in the back of your mind as we work through a few real scenarios.

## Scenario 1: Someone Wants to Install a Slack App

You get the request: "Hey, we need this Slack app for the team." Seems simple, right? It's not.

**Start with the vendor.** That shiny app in the Slack marketplace? Ninety-nine percent of the time, it's built by a third-party developer, not Slack itself. If your organization is subject to regulations requiring a third-party risk program, you need to onboard that vendor properly -- data processing agreements, NDAs, MSAs, and checking for SOC 2 or ISO 27001 certification.

And here's a mindset shift for you: **Slack should always be treated as one of your most sensitive data sources.** This is where your people communicate. If litigation ever hits, communications are the first thing going into discovery.

**Dig into the scopes.** What is this app actually trying to do? An app that only uses `chat:write` to post messages into channels? Relatively low risk. But if it's requesting `users:read:email`, or the ability to read channel history, or -- worst case -- the ability to join channels on its own? Now you're talking about something that can hoover up PII and corporate data at scale.

**Think like the attacker.** For every app you evaluate, assume it's going to encounter your most sensitive information. What happens if someone shared a VPN config in a public channel and this bot can read it? What about that CSV of affected users someone dropped into an incident channel? If file URLs are set to public (which is often the default), that data is one leaked conversation log away from exposure.

**Watch for impersonation.** I've done red team engagements where we imitated an internal security tool through Slack -- sent a message that looked exactly like the real thing, complete with a phishing link disguised as an Okta login. People clicked it because it came from a trusted channel. You don't even need email to phish someone anymore.

And for everyone requesting these apps: **your company's data is the product for these vendors.** They want as much information as they can get to drive their own roadmap. Sometimes you can opt out, sometimes you can't. But that's often why the answer is just "no."

One more thing -- if any of your Slack apps use interactivity endpoints, make sure you own those endpoints. A dangling DNS record or an abandoned endpoint is an open door for an attacker to receive your Slack messages in real time. I'd almost call that organization-assisted exfiltration.

## Scenario 2: Cleaning Up Service Accounts Nobody's Watching

Here's a loaded one: you've got a pile of service accounts with way too much privilege and nobody monitoring them. Where do you start?

**First: why is nobody monitoring them?** Anything non-human should be monitored, period. Human users will notice something weird -- a login from a strange location, a new device notification -- and they'll say something (assuming you've built a healthy security culture where reporting doesn't get you yelled at). Service accounts don't have that instinct. They'll just keep running, compromised or not.

**Enforce least privilege.** Yes, it takes time to figure out the minimum permissions a service account actually needs. But that process is worth it -- you'll learn how your systems interact, build out documentation and runbooks, and catch misconfigurations you didn't know existed.

**Lock down access.** Restrict service accounts to specific IP addresses. Don't skip MFA just because it's a service account. Implement quarterly password rotations, especially if you don't have full visibility into who has access to those credentials.

**Do behavioral analysis on the logs.** Is someone trying to log in from outside the allowed IP range? If it's external, you might have a compromise. If it's internal, someone's doing something that wasn't agreed to. Either way, you need to know.

**Watch out for vendor limitations.** This is where it gets tricky. Take Google Workspace as an example: if you need a service account to read or write to other users' calendars, you often need domain-wide delegation with a highly privileged user -- even for something that sounds simple. Same story with Google Drive. If you use the broad `drive` scope, your API client can see *everything*. A better approach? Use `drive.file` and have the API client create the files it needs to manage. Only those files become visible to the client. That's a huge reduction in blast radius.

And circle it back to Slack -- when you authenticate a Slack app to Google Drive, that "Authorize" button might be sharing every document in your domain with a third party. Be careful with the chain of trust you're building.

## Scenario 3: Securing a Web Application from Scratch

You've got a database, a front end, a network transport layer, and three user types: admins (employees), members, and non-members. How do you secure it?

This is where FCAPS really shines as a thinking tool.

**Fault tolerance:** Are we backing up the database? Are we *testing* those backups routinely? Can we automate the validation -- unfreeze a backup, run queries against it, confirm the data matches? Are we hashing user-uploaded files and scanning them? Are we protected against file inclusion vulnerabilities where an uploaded file becomes a C2 shell?

**Configuration:** Where does the app config live? If it's a `config.yaml` sitting in the web root, an attacker with a path traversal vulnerability just found your database credentials, S3 tokens, and everything else. Are we using environment variables? Great -- but is debug mode off? A manipulated request that triggers a 500 error can dump every environment variable if debugging is enabled. Pull secrets from a proper secrets manager instead.

**Here's a big one:** separate your admin and consumer entry points completely. Different tools, different authentication methods, different network requirements. Put Okta and device trust in front of the admin panel. Put it behind a VPN. If you go back to the 2011 FTC motion against Twitter, one of the findings was that they used the same tooling for customer and admin access -- and that contributed directly to the compromise. History has lessons. Use them.

For the database, listen on a Unix socket instead of TCP. Take it off the network entirely. No more worrying about whether your firewall is blocking 3306 or 5432.

**Accountability:** Implement tokenization so that if your database gets dumped, sensitive data like IP addresses and emails aren't sitting there in plain text. Keep the token-to-value mapping in a separate system. Build a full audit trail: who logged in, who deployed what code, who changed what record. Attackers think in graphs, and so do auditors. Make sure every node in that graph has a log attached.

**Performance and security together:** Use TLS. Put a load balancer in front. Host your own JavaScript, CSS, and images instead of pulling from third-party CDNs -- that eliminates cache poisoning risk and reduces the attack surface if a vendor gets compromised. Minimize tracking pixels and tag managers. Every external call is both a performance hit and a security risk.

**Authentication and authorization:** Are you using SSO, or rolling your own? If you're storing passwords, use bcrypt with a reasonable cost factor. Build proper authorization scopes for members versus non-members versus admins. And test for IDORs -- if user 1 can access `/user/2`, you've got a broken access control problem that will ruin your week.

## The Takeaway

Security is not an afterthought. Every single piece of the FCAPS model we just walked through -- even though Security is the last letter -- gets addressed right up front when you think through scenarios properly.

Or, to borrow from Dwight Schrute: whenever I'm about to do something, I think, "Would an idiot do that?" And if they would, I do not do that thing.

**Key actions you can take today:**

- Audit your Slack app permissions -- check every scope, every interactivity endpoint, every vendor agreement
- Inventory your service accounts, enforce least privilege, and start monitoring them like you would any other identity
- Separate admin and consumer access for your web applications -- completely, not just different URL paths
- Apply a thinking framework like FCAPS to every security decision, not just the ones that feel "big enough"
- Build a culture where people report weird things without fear of being blamed

---

*Thanks for reading. This is Plan B Security with Mike Mackintosh -- keep the conversation going and don't be afraid to dig into the details. That's where the real security lives.*
