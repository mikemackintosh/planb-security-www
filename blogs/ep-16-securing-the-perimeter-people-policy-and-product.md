# The Four P's of Cybersecurity: A Framework You Can Actually Remember When Things Go Sideways

**Your castle walls don't mean much if you're handing out keys at the front gate.**

---

Look, I'm a big fan of acronyms. Not in the annoying corporate-speak way, but because when everything's on fire and you're in the heat of the moment, your brain needs something simple to grab onto. Four letters. That's it.

Back in episode four, I laid out the Four C's -- consistency, clarity, collaboration, creativity -- which was all about building the foundation of a security program. Think of the Four P's as the roof and the framing that sits on top of that foundation. You know how to communicate, you know how to set priorities, you've got people caring about security. Great. Now what do you actually focus on?

**Perimeter. People. Policies. Product.**

Let's break them down.

## Perimeter: Your Castle Walls (and Everything Trying to Get Over Them)

Think of your perimeter as literal castle walls. Firewalls, intrusion detection systems, endpoint security, physical access controls -- badges, cameras, locks bolting devices to desks. That's the obvious stuff. But here's where people trip up: the perimeter isn't just a wall. It's multi-dimensional. You've got to make sure nobody can tunnel underneath *or* parachute in.

Now sit with this question for a second: how does your company handle Wi-Fi? Is there one network for employees and one for guests, or is everyone sharing the same pipe? If a visitor connects to your privileged corporate network -- the one with access to data shares, internal apps, all the good stuff -- and their device has malware, that traffic is now phoning home from *your* IP address. Vendors like Security Scorecard are watching traffic across the internet and attributing malicious activity back to your organization's AS number. Imagine trying to onboard a new client with a strict third-party risk program, and they're seeing malware flagged on your network. Not a great look.

This is where zero trust comes in. Even if someone gets on your network, they still can't access anything without authenticating -- username and password, YubiKey, smart card, whatever fits your environment. The network connection alone isn't a golden ticket.

And don't forget about the DMZ -- your demilitarized zone. Think of it as a buffer where your web servers and email servers live. Outside traffic can reach the DMZ, but it can't punch through to your internal network. Your internal clients reach *into* the DMZ. It's a pivot point, not a pass-through.

### A Quick Word on Patching

I don't like thinking about patching as a percentage of the environment that's patched. When things are exposed, they're either exposed in full or not at all. Either somebody gets into the network where they'll have access to all these devices, or they won't.

I'll never forget the time I was at a Starbucks and found a developer who had bound an insecure web server straight to the Wi-Fi interface. No client isolation on the router. I was able to hit it directly and get remote code execution. Gave him a heads up, bought him a coffee, and we had a good conversation about it. But here's the thing -- patching his system wouldn't have prevented that, because the insecure code was intentionally running as part of his development work.

Think of routine patching as a fire drill. You're getting people comfortable with the process so that when an actual zero-day drops and a patch ships the next day, everyone already knows what to do. The more people patch, the more they adapt their workflows. They start saving documents differently, thinking about where their data lives. And that naturally leads us into securing the next P.

## People: "I'm Not Mad, I Just Want to Know Who Did It"

Awareness is key, but not in the "watch this outdated training video and check the box" kind of way.

Here's one that bites organizations constantly: personal accounts on corporate devices. Someone gets a shiny new Mac from work, and the first thing they do is sign in with their personal Apple ID. Suddenly, iCloud Drive is syncing their Desktop and Documents folders -- which are full of company-confidential files -- straight to their personal cloud storage. Downloads folder? Probably has spreadsheets with PII in them. And you have zero control over whether that person even has two-factor authentication enabled on their Apple ID.

Remember CelebGate? A bunch of Apple IDs got breached because people didn't have 2FA turned on. That should have been a wake-up call for everyone. Now imagine that same scenario, but the compromised iCloud account is full of your company's intellectual property.

Windows has the exact same problem with OneDrive. Same risks, different brand.

### The Gift Card Scam (It Still Works, Somehow)

You'd be amazed how often this one lands. A new hire gets a text message: "Hey, I'm the CEO, I'm in a meeting and I need you to buy Target gift cards for a client. Scratch off the back and send me the codes." Sometimes it comes with a threat -- do this or you're fired.

Teach your people to ask the obvious questions. Why would the CEO text a random new hire instead of using Slack or Teams? Why gift cards? Make "see something, say something" part of the culture, and -- this is critical -- actually respond when people report things. Set up a phishing alias or a dedicated Slack channel, and at minimum, send an auto-reply: "Got it, thanks for flagging this, we'll follow up if needed." If people feel like their reports disappear into a void, they'll stop reporting.

### Train for Resilience

People get fatigued. We burn out, get distracted, have bad days. That's not a weakness to shame -- it's a reality to plan for. Run simulations, tabletop exercises, and drills. Document what you're *actually* achieving today, not just the golden ideal you're working toward. Find the patterns. Hold yourselves accountable.

I love incident response work. Connecting the dots, tracing the attack path, then flipping to blue team mode to figure out how to prevent it next time. If you ever get the chance to shadow one of these exercises, take it. Because if you're not constantly being breached, how will you know how to handle it when it actually happens? Practice doesn't make perfect -- practice makes improvement.

## Policies: Taking the Emotion Out of It

Policies protect you from internal risk, accidents, litigation, and external threats. They're also your defense mechanism when someone second-guesses your decisions after the fact.

Here's the uncomfortable truth that makes some people squirm: not every risk is worth mitigating. Sometimes the cost of prevention exceeds the realistic cost of the incident. That's not negligence -- that's risk management. The key is documenting *why* you made that call. If you've genuinely thought it through and can justify it with real-world reasoning, that becomes your defensible position.

But there's a line. Storing passwords in plain text so you can read them back to users on the phone? That was how things used to work, and there's no defensible mechanism for that implementation. Use bcrypt, use PBKDF2 -- the infrastructure cost of proper hashing is always cheaper than the litigation and brand damage of a breach caused by plain-text passwords.

### Policies That Actually Matter

Make sure you have these covered:

- **Code of conduct and acceptable use policies**
- **Information security policy guidelines**
- **Data handling and classification policies** -- including how you identify data classification and whether new features require data inventorying
- **Vendor risk assessment processes** -- Do they have SOC 2? ISO 27001? Do they support SSO, SAML, or OIDC?
- **Exception processes** -- because not everything will fit neatly into your policy. Don't throw a tantrum when someone wants to onboard a new tool. Define the risk tolerance the business and board agree to, put it in the policy, and let people self-service against it.

As they say: fool me once, strike one. Fool me twice, strike three.

## Product: It's Not the Platform, It's the Stock

There's a great bit from *Silicon Valley* where they tell Richard that Pied Piper's product isn't the platform or the algorithm -- it's the stock. People buy stock because they believe in the product. It's your responsibility to make sure your company is doing things right so that stock doesn't tank.

Everything is internet-connected now, whether it needs to be or not. I have a washer and dryer with Wi-Fi. I've seen a *flashlight* with a Bluetooth app for changing the light color and intensity. There are clothes with Wi-Fi that monitor your body temperature. Whether or not your physical product connects to the internet, the company building it will be.

The FTC actually publishes business guidance for app developers -- "Start with Security" -- and it's worth reading. A few highlights:

- **Make someone responsible for security.** One person who's accountable, who makes the final call, and who -- let's be honest -- might be the one who gets sued by an attorney general or the FTC directly.
- **Take stock of your data.** Inventory what you collect and retain. Do you actually need all of it? Anonymize or aggregate where you can, and delete the source data.
- **Don't rely on the platform alone.** Don't trust the OS, the web server, or the programming language to be your security strategy. Do your own threat modeling.
- **Generate credentials securely.** If your API tokens are 15 characters of hex, someone's brute-forcing that. Use high-entropy secrets with the full character set.
- **Don't store passwords in plain text.** (Yes, the FTC had to say this out loud.)
- **Vet your dependencies.** Open source doesn't mean secure. I used to co-maintain a Ruby gem with over 100 million installs. We required PR reviews and nobody had admin. But imagine a solo maintainer who gets offered a million bucks -- or gets blackmailed -- to slip one malicious line into a package that auto-updates into thousands of apps.

### Bug Bounties and Responsible Disclosure

The FTC specifically recommends creating a bug bounty program or a security disclosure channel. This is solid advice, but the moment you open that door, you need to staff it. Have a clear disclosure process. Respond promptly. Because if a researcher finds a critical vulnerability, reports it to your unmonitored security@ inbox, waits weeks with no response, and then publicly discloses it alongside a CVE filing -- that's bad press you brought on yourself.

Put up a `/security` page on your website. Monitor the inbox. Communicate clearly about timelines and expectations.

## The Takeaways

1. **Think multi-dimensional on perimeter security.** Walls aren't enough -- cover the tunnels and the airspace too. Segment your networks. Implement zero trust.
2. **Treat patching like a fire drill.** The routine builds the muscle memory you'll need when a real zero-day hits.
3. **Lock down personal accounts on corporate devices.** iCloud Drive and OneDrive syncing company data to personal accounts is a ticking time bomb.
4. **Make reporting easy and responsive.** If people see something and say something, acknowledge it. Every. Single. Time.
5. **Document your risk decisions.** Even the ones where you chose not to act. Especially those.
6. **Your policies need exception processes.** Rigid policies that don't account for reality get ignored.
7. **Vet your code dependencies like you'd vet a business partner.** Open source is not inherently safe.
8. **If you open a bug bounty channel, actually monitor it.** An unresponsive disclosure process is worse than not having one.

---

*Thanks for reading. This article is based on a conversation from **Plan B Security**, the podcast where we break down cybersecurity into something you can actually use. If you want more frameworks, real talk, and the occasional Starbucks hacking story, find us at [planb.security](https://planb.security) or on social media @_planbsecurity. Until next time -- stay sharp out there.*

*-- Mike Mackintosh*
