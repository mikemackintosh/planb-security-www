# Device "Trust"? More Like Device Authorization.
## Why the thing every vendor is selling you isn't quite what you think it is -- and what you actually need to get right first.

Look, I get it. Device trust is the hot topic right now. Every vendor at every conference has a slide about it, and every CISO wants to check the box. But here's the thing -- before you even think about device trust, we need to talk about the stuff nobody wants to deal with first. The boring stuff. The stuff that will actually make or break your security program.

Let me walk you through it.

## You're Not Patching. Fix That First.

Patching is probably the biggest red flag I see when someone comes to me saying, "Hey, I want a device trust solution." If you're not patching, why are you even worrying about device trust? You've got fundamentals to solve for first.

A lot of folks will tell me, "Well, my MDM just handles it." Cool. Have you tested that? Are you really sure you have the ability to push a patch and that it actually lands?

And this pains me to say -- as much as I love macOS (and not just because my last name is Mackintosh with a special K) -- there really is no way anymore to truly force-push an update on a Mac. It has to be initiated from the client. You can trigger a pop-up, you can use tools like Nudge, but you can't just say "install this now" like you used to with a combo update. That takes extra management overhead.

On the Windows side, you've got more flexibility -- WSUS, KB articles, however you want to do it. But don't forget, Windows invented Patch Tuesday. That's your monthly cadence for quality updates, plus one big feature update a year.

Here's a practical tip: take this week as an opportunity to run a tabletop exercise. Break down all your patches, figure out what's needed, what's deployed, and what's lagging behind. For Macs, stick with an N-minus-one strategy at minimum. If a new major release is about to drop, start force-upgrading everyone to at least the previous version. That way, tooling only needs to support two OS versions, and your Mac admins -- God bless every one of you -- can maintain their sanity.

## Asset Management: The Problem Nobody Wants to Invest In

The number one thing I see done wrong at companies, right next to patching, is asset management. Or worse -- the complete lack of it.

Here's one of my favorite sayings: **in the land of IT and security, attribution is king and queen.** At the end of the day, the most important thing you need to know about an asset is: who is it assigned to?

Think about breaking asset management into three areas:

1. **Metadata and context** -- What type of asset is it? Where was it procured? When? How much? What's the depreciation schedule?
2. **Lifecycle tracking** -- When was it assigned? Where is it in the depreciation cycle? Is a hardware refresh coming up?
3. **Automated enrichments** -- How much disk space is available? (You can't download a patch if there's no free space.) What OS version is running? What software is installed?

All of this adds up to the bigger picture. Is this a company-owned device? BYOD? Vendor-owned? You need to know these things before you can build a device trust strategy. How can you trust something you don't know about? How can you trust something you have zero visibility into?

Get your unmanaged devices enrolled -- whether that's AirWatch, Mosyle, Fleet DM, whatever you're using. Get them managed. That's your first real step toward having a device trust story.

## So What Actually Is Device Trust?

Now we're at the good part. There are really two distinct flavors of device trust being sold out there, and understanding the difference matters.

### Flavor 1: Policy-Based Access Enforcement

This is the "is your device secure enough to access this resource?" approach. Picture this: your laptop isn't patched to the latest version. The next time you try to log into a sensitive service -- a data repository, a financial tool, even your identity provider itself -- that login is gated. You get prompted with instructions: "Hey, to access this resource, you need to be secure. Here's how."

Kolide has a really beautiful implementation of this. The user knows exactly what they need to do. The call to action is clear. The security benefit is obvious. It's just really well done from a usability standpoint, and that usability is what makes it effective.

### Flavor 2: Device Identity and Authorization

This is where the device itself is trusted through an agent or certificate placed on it during MDM enrollment -- which traces back to your asset management chain of custody. When you access a resource, the device presents its identity (serial number, agent status), and the backend validates it against your security stack (CrowdStrike, Carbon Black, whatever you're running). It's like a three-way matching triangle of validation.

What makes this one powerful is that it essentially replaces VPNs. After 20 years in this space, I can tell you that VPNs are smoke and mirrors. They're the first thing attackers go after. Device authorization gives you the same network gating without the VPN overhead, and it's a lot harder to abuse.

In a perfect world, these two circles overlap 100% in a Venn diagram. We're not there yet. But that's the goal.

## The Real Threat: Session Stealing, Not Just Credential Harvesting

Let's make this concrete. Say a support agent gets phished. They enter their username, password, and MFA token into a fake page. The attacker replays those credentials into your VPN login in real time. Without device trust, that's a successful breach.

But with device authorization in the authentication flow, even valid credentials from a phished employee won't work without an approved device. The attacker would need to physically compromise your logistics chain -- bribe a departing employee for their hardware, something like that. You've raised the cost of attack dramatically.

Now here's where it gets even more interesting. The most commonly installed malware from phishing emails targeting support agents isn't a keylogger -- it's a **session stealer**. Remember all those warnings in the '90s and 2000s about cookies being bad? That's exactly what attackers are still going after. Once you've authenticated, that session cookie is gold. An attacker who grabs it can replay it from anywhere.

This is where an identity-aware proxy with active session enforcement comes in. Instead of tying the session to an IP address (which breaks every time you hop between WiFi and mobile), it ties the session to the device that started the auth flow. Suspicious activity? Kill the session. Session coming from a different device than the one that minted it? Sever it immediately and alert your SOC.

## SaaS vs. Internally Hosted: Two Very Different Problems

Here's an architecture reality that trips people up. You can't control the internet. You can rewrite DNS on your managed devices, tunnel traffic through your proxy, and set up IP allow-lists on services like GitHub. But for most SaaS providers? Their hostname is publicly discoverable.

Take a tool like Coupa -- purchase requests, invoicing, all of it. An attacker with a red team mindset looks at Coupa and thinks, "That's an inventory of every third-party service this company pays for." And they can probably guess your slug and hit it directly on the public web.

So you put device trust on the login flow. Great. But if there's a session stealer on the host, those cookies are compromised and anyone can access it externally. You start chasing your tail.

What do you do instead? Jokingly -- put it in the contract that the SaaS provider has to solve this for you with private links or ingress IP filtering. But more practically, this is where detection and response becomes your best friend. Pull access logs and audit logs into your SIEM. Write detections. Test them. Run tabletop exercises. Pair that detection engineering with device trust at the login flow, and now you've got a solid foundation.

For internally hosted applications, it's a different story entirely. You control the transport. You put mTLS at the edge. Every request is validated against the authorized device. Google's BeyondCorp Enterprise is a great example -- an agent, a Chrome extension, and an identity-aware proxy all working together, using concepts like zero-knowledge proofs so that both parties in the conversation can verify they know the same thing without actually sharing it.

## Actionable Takeaways

1. **Patch first.** If your patching program isn't solid, device trust is premature. Run a tabletop exercise this week.
2. **Get your asset management house in order.** You can't trust what you can't see. Know who owns every device, what state it's in, and whether it's managed.
3. **Understand the two flavors of device trust** -- policy enforcement (is the device compliant?) and device authorization (is the device who it says it is?). You probably need both.
4. **Think about session security, not just authentication.** Session stealers are the bigger threat. Active session enforcement tied to device identity is how you counter it.
5. **Differentiate your approach for SaaS vs. internally hosted apps.** You have full control over one and very little over the other. Plan accordingly.
6. **Invest in detection engineering** for the gaps device trust can't close, especially around SaaS services you don't fully control.

## The Honest Truth

I mostly prefer to call this "device authorization" instead of device trust. Achieving true device trust is extremely difficult, and I don't think we have enough technology in place today to fully get there -- whether we're talking about SaaS providers, internally hosted apps, devices we control, or devices we don't. There's enough signaling out there that we can make pretty well-informed decisions, but we're not at the finish line yet.

Or, as Dwight Schrute once put it: *"Can I trust Jim? I don't know. Do I have a choice? No, frankly, I don't. Will I trust Jim? Yes. Should I trust Jim? You tell me."*

That's device trust in 2026. We're getting there, little by little.

---

*This article is based on an episode of **Plan B Security** with Mike Mackintosh. If you found this useful, check out the podcast for more straight-talk on building security programs that actually work. Until next time -- stay patched, stay managed, and stay skeptical.*
