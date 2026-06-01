# The Scary Truth of Information Security
## Okta got breached, but the real horror story is what their customers did next

Let me paint you a picture. One of the biggest identity providers on the planet gets breached through their customer support tools, and suddenly companies like BeyondTrust and 1Password are scrambling to figure out how deep the damage goes. The internet lights up with hot takes condemning Okta. Influencers with massive follower counts pile on. Everyone points the finger in one direction.

But here's the thing -- that's only half the story. And the other half? That's where it gets truly scary.

## The Okta Breach: What Actually Happened

Okta's support case management system was compromised. When you're an Okta admin dealing with an issue, you open a case, describe the problem, and often upload attachments to help the support team troubleshoot. One of the most common attachments? HAR files.

If you're not familiar, a HAR file -- HTTP Archive format -- is essentially a JSON dump of every request your browser makes. Every page load, every favicon fetch, every AJAX call, every redirect. It captures everything. And I mean *everything*: your cookies, your session tokens, all of it.

So when a threat actor gained access to Okta's support system, they could view those uploaded HAR files. And if a super administrator had generated one of those files while they were logged in and uploaded it without scrubbing it first? That attacker now has valid session cookies operating at the highest privilege level in your environment.

That is a massive problem.

## Stop Blaming Just Okta -- Look in the Mirror

Here's where I'm going to push back on the popular narrative. Yes, Okta got breached. Yes, that's bad. But why did your staff upload HAR files with live session cookies and unsanitized credentials to a third-party platform in the first place?

Just because you can click around an admin interface doesn't make you an administrator. Just because you can read a HAR file doesn't make you an engineer. Understanding the risks and how all of this plays into the bigger picture -- that's what separates someone with a title from someone who actually earns it.

Every piece of documentation out there about HAR files tells you they contain sensitive information. It tells you to scrub them before sharing. If your team isn't doing that, you have a training problem, a process problem, or both. And no vendor breach is going to fix that for you.

Does sanitizing your HAR files prevent the Okta breach from happening? No. But it absolutely reduces the blast radius when it does. If your uploaded files contain nothing useful to an attacker, then the breach on Okta's side becomes a whole lot less relevant to your organization.

## The Device Trust Problem Nobody Wants to Talk About

Okta's own disclosure says they "identified adversarial activity that leveraged access to a stolen credential." Stolen credential. Let that sink in.

Why was another device able to replay that credential successfully? Where's the device binding? Where's the source IP validation? Where's the device authorization check?

Because 99% of the time, an adversary stealing these credentials is replaying them from compromised hosts or some unsanctioned cloud provider -- not from the original device on the original network. If your "zero trust" solution can't catch that, what exactly is it doing for you?

And look, Okta sells a zero-trust solution. After this breach, all they've really sold us is that we have zero trust in *them*. But before you rip everything out and migrate to Microsoft and Azure, remember: the grass is only greener on the other side of the fence because of all the manure. I think it's probably worse over there if we're being honest.

This is a market-wide problem. Zscaler, Netskope, Okta's own Device Trust, Google BeyondCorp Enterprise, PingID -- they're all missing the same fundamental piece: true end-to-end session pinning. Once someone figures that out, the value of session stealers drops off a cliff. But these vendors know how critical this capability is going to be, so expect a massive price tag. If you're already upset about paying $200 a year per license just to get SSO support, imagine paying $1,000 per license for real device trust.

## The BPO Angle Everyone Missed

Here's something that jumped out at me from Okta's disclosure. They said "the threat actor was able to view files uploaded by *certain* Okta customers as part of *recent* support cases." Certain customers. Recent cases.

That screams BPO agency compromise to me. Business Process Outsourcing agencies typically handle specific categories of customers -- maybe healthcare clients go to one team, telecom to another, finance to another. That segmentation is what lets support teams build expertise in specific workflows and industries. Healthcare operates completely differently from a fast-moving tech startup, and finance looks nothing like telco.

At Okta's scale, with hundreds of millions of users, you can't keep all of that support in-house. I get it. But when you're outsourcing support and those external teams have access to sensitive customer data, you need to be absolutely buttoned down on security. The fact that only "certain" customers were affected in "recent" cases strongly suggests a scoped compromise -- exactly what you'd see if a specific BPO team or agency was the entry point.

## The Browser Fix That Won't Save You Today

Shortly after this all went down, someone posted a feature request on the Chromium DevTracker asking for an option to automatically scrub credentials when generating HAR files. That's the right idea, and I hope it happens. But it's not going to save you now.

Feature development takes time. You're probably looking at a year or more before it ships in Chrome. And then what about Firefox, Safari, Edge, and every other browser with meaningful market share? This is a long-term fix for a problem that exists right now.

## What You Should Actually Do About This

Here are the immediate, actionable steps you can take today:

**Train your people.** Anyone who might upload files to any vendor -- not just Okta, but your SIEM vendor, your monitoring tools, ad networks, anyone -- needs to understand what HAR files contain and how to sanitize them before sharing. This isn't optional. This is baseline operational hygiene.

**Audit your support workflows.** Look at every place your team interacts with third-party support portals. Are they logging in from the same top-level domain where your customer-facing apps live? If your support tools share a cookie scope with your production environment, a compromised session could grant access far beyond what you intended.

**Reduce session timeouts and reduce re-authentication friction.** This is where WebAuthn really shines. When you implement passkeys or hardware keys like YubiKeys, re-authentication becomes a simple tap. No username, no password, just a quick biometric or hardware confirmation from a trusted device. You can set aggressive session timeouts without destroying the user experience. And if a session token does get stolen, its useful lifespan is measured in minutes, not days.

**Monitor for session stealers and malware.** If your security program isn't actively watching for info-stealers, session hijacking tools, and potentially unwanted applications, start now. These are some of the easiest vectors for attackers to harvest credentials, and they often hide behind PUA classifications that teams overlook.

**Stop assuming your identity provider's "zero trust" label means you're covered.** This breach proved that device trust, as most vendors implement it today, has serious gaps. Evaluate what your provider actually validates versus what their marketing materials claim.

## The Real Scary Truth

The scariest part of all this isn't the breach itself. Breaches happen. The scary truth is the gap between what our industry *says* it's doing and what it's *actually* doing. We've got influencers with massive followings recycling half-truths. We've got admins with super-admin privileges who don't understand the tools they're managing. We've got "zero trust" solutions that don't actually verify trust. And we've got an entire generation of people entering this field and absorbing content that isn't necessarily accurate.

When you truly understand something, it's easy to communicate it. When you don't, you end up repeating yourself and struggling to go deep. Pay attention to which voices in this industry can do the former versus the latter, and choose your sources accordingly.

---

*Thanks for reading. This article is based on a discussion from **Plan B Security**, hosted by Mike Mackintosh. If you want more straight-talk security analysis without the fluff, check out the podcast wherever you listen. Stay safe out there.*
