# Software Developers Are Your First Line of Defense

## Why application security is everyone's problem -- and how to actually do something about it

Here's the most impactful thing I can share with you after years of working detection and response: the only difference between a user and a malicious actor is intent. That's it. An internal employee acting maliciously is a malicious actor. A random person trying to exploit your system is a malicious actor. And someone using your product within the terms of service? Just a regular user. Same access, same tools, different intent.

Application security is really about building walls around the stuff you're trying to protect -- keeping the bad people out and letting the good people in. And when people ask me about it, I always frame it as a fractal. There is no start. There is no finish. It's a continuous journey that you'll be following forever.

## You're Only as Secure as Your Dependencies

Think about this: you're an IT network engineer implementing a third-party firewall. You didn't build it yourself. You spent money on it, so there's a reasonable expectation that you purchased a secure solution. But that vendor's development team? They need to be doing their own testing, their own code reviews, their own security validation.

I lived this firsthand. One of the leading firewall vendors had a bug on their management interface -- the backend interface you'd plug into to manage device configurations. If it received an ISAKMP packet (part of VPN tunnel negotiation), the device would core dump. Hard fail. Denial of service, just like that.

Our network operations center kept seeing this device go offline every couple of hours. Automatic failover would kick in, user traffic was fine, but something kept killing this thing. So we did what we did best: dug into the network logs, correlated the timing of vulnerability scans with the core dumps using PCAP traces, and sent it to the vendor. They identified the bug, fixed it, and got us a new release cut quickly.

The lesson? Your own development team has the exact same capability of introducing bugs like this -- if not worse. And sometimes people forget the difference between getting the job done and doing things right.

## The WK HTML to PDF Problem (and Why Shelling Out Will Haunt You)

Here's a scenario I've put to developers before: your task is to create an interface that reads a webpage and outputs a PDF. Pretty common for invoicing, financial documents, sensitive information sharing. Most developers I've asked would reach for WK HTML to PDF -- a WebKit HTML renderer that outputs PDF files.

Sounds fine, right? Except to use it, you have to implement what's called "shelling out" or "execing" -- having your application call another binary on the host operating system. It's inception-style: one application calling another, which can call its own, and so on. And it's a building block to remote code execution.

When your app relies on the host OS to execute a command and return the output, you've lost control over that tertiary command. If there's an upload portal with unsanitized inputs, an attacker could overwrite the WK HTML to PDF binary with a malicious payload. Next time someone generates a PDF -- boom, you're executing attacker-controlled code.

Now, from the attacker's side, this sounds complex. They need to chain multiple things together: find an upload vector, write to an executable path, figure out which API endpoint triggers execution. But put your application security hat on and look at how many things had to fail for this to work.

Think of it like those old 1980s 3D glasses with the red and blue lenses. Look through the red lens, you don't see the red markings. Look through the blue lens, you miss the blue lines. But it's all still there. You just have to look from the right angle.

## Rule Number One: Never Trust User Input. Ever.

If you've ever worked a help desk, you know people will click the first form they find and shove whatever they want into it. Build automations on top of that? They'll break immediately because nothing is structured the way you expect.

This is why building strong processes around intake is critical. Drop-down menus instead of free text. Inferring the user's email from their authenticated session instead of letting them type it in. You'd be amazed how many problems disappear when you simply remove the ability for people to supply information you already have.

And as your product expands internationally, input validation gets even trickier. Phone numbers in the US and Canada? Ten digits, country code plus one. Expand to Mexico or the UK? Now you're dealing with plus 52 and plus 44. Are there still ten digits after the country code? Maybe not.

Too many companies take the shortcut: "Validation is slowing down growth, let's just remove it." That's not the right call. You're compromising data integrity for the sake of reducing friction. Some companies operate at that risk tolerance. I personally don't think it's the way to go -- if you need to contact someone, you want good information to reach them.

## Junior Engineers, Passwords, and a Conversation I'll Never Forget

Software engineers are the first line of defense. If you have inexperienced developers working on sensitive, privileged code, the probability that they haven't anticipated certain attack vectors goes way up.

About 10 to 15 years ago, I had a real conversation with a client about their login page. A junior engineer's solution to reduce sign-up friction was to store passwords in plain text so they could email users their passwords if they forgot them. Or do partial password matching.

Yeah. That was a real conversation.

The fix was straightforward: make the password reset process easier instead. Trust email validation. Implement 2FA. TOTP strings were easy to generate even back then -- throw up a QR code, let users scan it into an authenticator app, and you've got a solid verification flow. We built plenty of those. It worked. The more secure path was also the better user experience.

And if you really want to look forward, WebAuthn is the way of the future. Private-public key handshakes registered to your device, no passwords at all. Someone has to have a trusted device to access the service. Win-win-win.

## Building a Honeypot on the Fly

Over a decade ago, I found myself in a real-time red team versus blue team situation -- except the red team was an actual malicious actor, and the blue team was just me.

They were running bots that did dictionary attacks, brute forcing, trying to compromise accounts with assets so they could withdraw them into attacker-controlled accounts. Think early Web 3.0, Bitcoin-era stuff. The compromised accounts all fell the same way: a botnet hitting us from a massively distributed range of IP addresses. Couldn't block by IP. But I could fingerprint other pieces of the request -- header ordering, request patterns, synchronous behavior.

This led to a tool I built with a few others during a hackathon: an Nginx application with a Lua module and a Node.js backend. Requests came in, the Lua module grabbed header order, IP, URI, scheme -- everything in the request -- aggregated it, and shipped it to the backend for analysis. If you tripped enough triggers (say, 150 failed logins in under a second), your traffic got rerouted to what was essentially a honeypot-as-a-service. Same-looking website, but now it was a monitoring and data collection service.

We were careful about privacy: passwords were respected, usernames were anonymized, and nothing was stored in plain text. We could de-anonymize selectively when it was time to take action.

A good friend of mine, unbeknownst to me, was building something eerily similar at the same time. That became Signal Sciences -- the next-gen web application firewall company that Fastly acquired in 2020. I ended up joining them not long after.

## Threat Modeling Starts in the Design Phase

The best place to do threat modeling is before you write a single line of code. Get your development team to write down what they think will happen when they implement a feature.

Say someone needs to interface with Google as an identity provider and needs an API key for the Google Workspace backend. Where are they running this? On Google infrastructure via App Engine or Cloud Run? Or on AWS? Because if it's AWS, you'll need a service account JSON key floating around in your environment. Are you pinning that to an IP? Using a security perimeter? Or can you use credential impersonation and service account assumption instead?

Same goes for IAM policies. Are you giving star access to all resources for something trivial like writing to a bucket? Or are you locking it down on both the resource side and the actor side?

As an attacker, if I get access to an overprivileged instance, that's my golden ticket. As a security engineer, thinking through this during design gives you the chance to catch it before it ships.

And when someone says "we'll accept that risk" -- document it. Get a sign-off. Make sure there's accountability and mitigation in place. Maybe that internal-only app doesn't need to be publicly exposed. Maybe an identity-aware proxy solves the problem. These are accepted industry standards for mitigating risk when you can't implement the most secure approach possible.

## Nothing Is 100% Secure, and That's the Point

If you make things 100% secure, you're not doing anything. No code written, no services running, nothing exposed to the internet. Security is inherently subjective. The question isn't "is it secure?" -- it's "what are you doing to reduce the gap as much as possible?"

Document your risk tolerance. And then -- and I cannot stress this enough -- make sure you're actually doing everything you've documented. That's probably the single biggest takeaway from threat modeling.

## Your Superpowers as a Security-Minded Team

A few things to carry with you:

- **Find it, fix it, deploy it fast.** Being able to patch a vulnerability and ship the fix quickly is one of your greatest superpowers. Invest in that muscle memory. Use real vulnerabilities as fire drills.
- **Remember FCAPS.** Fault tolerance, Configuration, Accounting (auditability), Performance, and Security. Keep these in the back of your mind every time you build something.
- **Champion secure coding practices.** Security awareness for developers is different from corporate security awareness. Speak to your engineering culture. Make security part of performance reviews. Gamify it if you can. Hold people accountable when you need to.
- **Sanitize your logs.** Override string output methods to scrub PII before it ever hits disk. Mask bank accounts, credit card numbers, addresses. Apply geo-masking for location data. If your debug logging is storing passwords in plain text, you've got a compliance nightmare waiting to happen.
- **Assume compromise.** Operate under the assumption that every application will be compromised at some point. It's not a legal conclusion -- it's a mindset that shifts how you solve problems and reduces blast radius when something does go wrong.

---

*Thanks for reading. This article is based on a conversation from Plan B Security, hosted by yours truly, Mike Mackintosh. If you've got topics you'd like me to dig into or you want to come on as a guest, reach out -- I'd love to hear from you. Until next time, stay secure out there.*
