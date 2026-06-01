# The Three Phases of a Security Program: From Afterthought to Gold Standard

**Your company doesn't need a perfect security program. It needs the right one for where you are right now.**

---

Every security program has to start somewhere -- and most of them start with nothing. I've been doing this for over 20 years, from running network cables at a mom-and-pop computer repair shop to building security programs at startups, large telecoms, and social networks. Along the way, I've seen companies at every stage of security maturity, and I've broken it down into three distinct phases.

Understanding which phase your company is in isn't just academic. It tells you exactly where to focus your energy so you're not wasting time building a fortress when you should be locking the front door.

## Phase One: The Era of Afterthought

This is the startup phase. The "we need to ship the product yesterday" phase. All the company cares about -- and honestly, *should* care about -- is finding product-market fit. Slowing down the development pipeline for code scanning? That's not going to fly here. The business needs to iterate fast, and security isn't paying the bills yet.

You'll be lucky if there's even a dedicated IT person. Most of the time, someone on the engineering team is duct-taping solutions together with Zapier, Make, or whatever no-code platform is hot this week. Click, authorize access to corporate docs, authorize access to email -- boom, you've got an automated workflow. You've also got risk being introduced at every integration point, and probably nobody monitoring any of it.

Here's a risk that catches a lot of early-stage companies off guard: **unauthorized terms of service acceptance**. I've consulted with clients who ended up as a party to litigation or took on unexpected financial burdens because some well-meaning employee clicked "I Agree" on a third-party service without anyone from legal reviewing it. They didn't have signing authority, but the contract didn't care.

Then there's shadow IT. An employee gets offboarded but still has access to that random third-party tool they signed up for -- along with all the company data inside it. If it's outside the scope of your IT team, good luck managing it.

And the classic: **everyone has access to everything**. Not just what they need -- *everything*. I get it. In a small company, people need to read data, understand how the product is actually being used versus how it was intended, and make quick decisions. But remember -- data is the product. Data is what makes the company valuable. It's also what adversaries are going after.

### What You Can Actually Do in Phase One

If leadership doesn't want you touching the engineering pipeline, pivot. Focus on the corporate side:

- **Roll out MFA** on your business-critical tools: Slack, Gmail, Microsoft 365, Jira, Trello -- all of it.
- **Build your asset inventory.** Domains, certificates, billing accounts. Make sure nothing is expiring without someone knowing about it. Set up alerts.
- **Lock down endpoints.** Full disk encryption, screen lock timeouts, strong passwords. You don't need a class A/B/C asset classification yet -- just make sure the basics are covered on every laptop.
- **Get legal, finance, and procurement talking to each other** so there's a clear policy on third-party tools before someone signs you up for something you can't get out of.
- **Think about business continuity.** If your product crashes on launch day, you've burned your credibility before you even started.

One thing startups have going for them: if they do suffer a breach, they can pivot the product or even rebrand. When not many people know who you are, it's not that costly. But that's not a strategy -- it's a safety net made of tissue paper.

## Phase Two: The Bowling Alley Principle

By phase two, the company has matured enough to start growing the security team. A lot of the foundational corporate security work is already in place, so now you can start enabling the engineering team to build more securely without killing their velocity.

I call this the bowling alley principle because it's all about putting up gutter guards. When you go bowling, you can throw the ball and it might go in the gutter, might hit the pins -- 50/50 unless you really know what you're doing. But put up those bumpers, and suddenly every throw at least has a chance of knocking something down.

### Gutter Guards for Engineering

Take something like DNS management. If you're using Terraform (an infrastructure-as-code tool), you can create a module where every DNS change goes through a plan step that checks the current state against the proposed change. This is huge for catching **dangling DNS** -- one of the most prolific DNS-related security issues you'll encounter.

Here's the scenario: an employee signs up for a hosting provider, points `example.company.com` to it, then leaves the company or moves to a different team. Nobody remembers to clean it up. An attacker notices that subdomain is pointing to a service with an unclaimed slot, signs up, and now they control a page on your trusted domain. They can phish your customers, host malware -- whatever they want.

With a Terraform module, you can gate DNS changes against a list of authorized providers, and even use a null resource with a local-exec provisioner to periodically check what's actually being served at those endpoints. Automate the detection before it becomes a headline.

Another powerful gutter guard: **shared coding libraries**. Create a single, well-maintained library for common functions -- authentication, authorization, audit logging, input sanitization. If there's one way you want engineers to handle something, hand it to them pre-built. This is your best defense against things like IDORs (Insecure Direct Object References), one of the OWASP Top 10. When every team uses the same validated library, you fix a vulnerability once and it's fixed everywhere.

### Gutter Guards for Corporate

- **Turn off the ability for outside users to message employees** through Slack or Teams without explicit approval.
- **Prevent public document sharing.** In Google Workspace, anyone can change a document's sharing settings to "anyone with the link" or even fully public. Lock that down before someone accidentally publishes your product roadmap to the internet.

## Phase Three: The Completionist Charter

This is the golden standard. The place every security program aspires to reach. But it can go one of two ways: **policy-driven** or **paranoia-driven**. You want policy.

The paranoia approach is where one team locks everything down and becomes the bottleneck for every access request. They're power-hungry gatekeepers, and they'll grind your organization to a halt. Unless you're in a government environment with extreme confidentiality requirements, avoid this like the plague.

The policy approach gives you **smart defense**. For every policy you write, you can make a clear case that you've understood the risk and made a deliberate decision. And look -- I know people hear "policies" and think red tape. But a good policy builds on the bowling alley principle. It tells people how to do what they need to do, or what not to do, and creates space for them to operate safely. Just make sure you have a **policy exception process**, because real life doesn't always fit neatly into rules.

### Rethinking Security Awareness

Here's where I might ruffle some feathers. If you've built your program right -- non-phishable MFA like FIDO2, passkeys, or YubiKeys; endpoint detection and response covering pre-compromise, active execution, and post-execution; devices that are patched and locked down -- then **it doesn't matter if your employee clicks the link**.

Read that again.

The majority of companies are out there telling people "don't click on links, don't open attachments from strangers." But the psychology is simple: people are either curious, or they're trying to be productive and helpful. They're going to click. Build the program so that when they do:

- **Credentials are safe.** Non-phishable MFA means a remote attacker needs physical access to your user's device to authenticate. Game over.
- **Malicious attachments don't execute.** And if something does execute, you can trace where the binary came from, what it did, and what happened after. You can lock, wipe, or forensically image the device remotely.
- **Sensitive data doesn't leave.** If someone tries to attach a CSV full of Social Security numbers to an email, you detect and block it.

This is a fundamentally different approach than reprimanding people for clicking on phishing simulations they genuinely believed were legitimate. Build the safety net, then let people work. This concept is what led to the **sophistication matrix** that my colleague and I presented at RSA back in 2018 -- mapping response mechanisms to threat severity so your team knows exactly what to do when malware is detected, from low-risk PUAs to high-risk ransomware.

## The Takeaway

Every company is different. Every company has its own threats and risks that need to be assessed and understood. Only then can you build a security program that fits what you're actually trying to protect.

Here's the honest truth: you're probably not going to get it right the first time. That's fine. Adopt the mindset of **fail fast**. Learn how to communicate with your stakeholders. Learn how to iterate as the business grows.

**Quick checklist based on your phase:**

- **Phase 1:** Lock down corporate tools, build an asset inventory, enforce MFA, get procurement and legal aligned.
- **Phase 2:** Create engineering guardrails with IaC modules and shared libraries, restrict external communications, prevent public data sharing.
- **Phase 3:** Invest in policy-driven defense, deploy non-phishable MFA, build detection and response capabilities that make the click irrelevant, and document your runbooks.

Figure out where you are, focus on what matters at that stage, and keep building. The golden standard isn't built overnight -- it's built one gutter guard at a time.

---

*Thanks for reading. This post is based on a conversation from **Plan B Security** with me, Mike Mackintosh. If you want to hear more about building security programs that actually work, come hang out on the podcast. And as Jim and Pam would remind us -- the ice melts, and then it's like a second drink. Cheers.*
