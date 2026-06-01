# MFA Isn't Enough: Why Your "Secured" Accounts Are Still Wide Open

**Multi-factor authentication was supposed to be the silver bullet. It's not. Here's what actually makes your accounts non-phishable.**

---

Here's something that might keep you up at night: the only thing separating you from an attacker on most websites is *intent*.

Think about it. You log into a website with a username and a password. On the backend, the system takes that password, runs it through a one-way hash, and checks if it matches what's stored in the database. If it's a match -- boom, you're in. Session created, welcome home. But here's the thing: the computer doesn't actually know it's *you*. It just knows that someone provided the right information. That's it. There's no secret handshake, no retina scan at the door. Just knowledge.

And that right there is the fundamental problem we need to talk about.

## The Extra Lock on the Door

This is where multi-factor authentication steps in -- MFA, 2FA, two-step verification, whatever you want to call it. The idea is solid: after you prove you know something (your password), you prove you *have* something. That could be a six-digit TOTP code from an authenticator app, a text message, or a push notification on your phone.

Sounds great, right? And look, it is better than just a password. But here's what people get wrong: **not all MFA is created equal**. Some methods are rock-solid, and some are barely speed bumps for a motivated attacker.

Let me show you what I mean with a story.

## Glenn Coco, Candy Grams, and Why I Phished My Own Company

I love social engineering. It's one of my favorite parts of security, and every chance I get, I sharpen those skills. A couple years back, I needed some real metrics to help prioritize our security program. Now, I'm not one of those people who runs a phishing campaign just to tell employees "gotcha, now go sit through a training video." That approach demoralizes your workforce and makes people afraid to open their email. It's like setting the office building on fire and calling it a fire drill.

Instead, I wanted to understand our actual risk profile. Who's clicking? What kind of access do they have? Are they sitting on Excel files full of SSNs or holding super admin credentials?

So here's what I did. I registered a domain called benefits.us and sat on it for over a year, sending generic emails back and forth to build up its reputation with the email gods. No allow-listing, no configuration changes on our end. I wanted it to be as legitimate as possible. When the domain was ready, I waited until right around Thanksgiving and sent out a mass email: *"Come get your candy grams! Your benefits department is giving away free candy grams to all your coworkers."*

Now, if you've seen *Mean Girls*, you already know where this is going. I literally took the Glenn Coco candy gram scene -- "Four for you, Glenn Coco! You go, Glenn Coco!" -- turned it into an animated GIF, and dropped it right in the email. Because let me ask you this: if you see an animated GIF in an email and it's not a skull and crossbones, are you thinking "attacker"? Of course not. You drop your guard completely.

The link in that email went to a fake Okta login page -- just a quick Go app I wrote that looked exactly like the real thing. People entered their usernames, passwords, and then got an interstitial page asking for their TOTP code. They entered it. And just like that, I had everything. I replayed it through Okta's API, grabbed their sessions, and had full access.

**MFA was on. I got through it anyway.**

## The TOTP Problem

What I did wasn't magic. The psychology is straightforward: an email goes out, someone clicks, they see what looks like their company's login page, and they're *incentivized* to enter their credentials. That's the whole design of the page. Add a TOTP prompt that looks just like the real one, and people hand over that six-digit code without a second thought. All I had to do was replay it within the time window.

And it's not just TOTP that has issues. Think about push notification MFA -- the kind where you get a pop-up on your phone and just tap "approve." Remember the Uber breach? Attackers already had the credentials and just kept triggering the MFA flow over and over until the target got sick of the pop-ups and hit "yes." That's the MFA fatigue attack.

Some vendors responded by adding number matching -- a random number appears on screen, and you match it on your phone. Better, sure. But if an attacker builds a convincing enough proxy page, they can capture that number too. You're still trusting the user to verify they're on the real site, and that's a losing bet.

## Enter WebAuthn: The Non-Phishable Answer

This is where things actually get interesting, and where real security starts. WebAuthn -- the protocol behind passkeys, YubiKeys, Touch ID, Windows Hello, and Google Titan keys -- works fundamentally differently.

Here's the short version: when you register a WebAuthn credential, your device creates a cryptographic key pair and **stores the domain name alongside it**. So the credential is cryptographically bound to that specific website. The next time you visit, your device checks the domain, finds the matching credential, and handles the authentication.

Now here's the magic: when an attacker sends you to their phishing site on some random domain, your device looks for a credential for that domain and finds... nothing. The credential simply will not be presented. It doesn't matter how convincing the fake page looks. The domain doesn't match, so the key never leaves your device. Game over for the attacker.

After our candy gram exercise, the very first thing we did was roll out WebAuthn everywhere. And when I went back later to test the same technique? I couldn't get in. That's the difference.

(We actually got to present that whole phishing exercise at RSA in 2018 under the talk name "Redfish Bluefish." One of the highlights of my career, honestly.)

## The Weakest Link Is Still Human

Now, before you think WebAuthn solves everything, let me pump the brakes. It's only as good as the policies you wrap around it.

Consider this scenario: an attacker finds an employee on LinkedIn, does some reconnaissance, maybe uses AI to impersonate them. They call the help desk: "Hey, I lost my phone. I need my MFA reset." If the IT employee just resets it without proper identity verification, the attacker enrolls their own WebAuthn authenticator using credentials they already obtained from a previous data leak. Now they're in, and WebAuthn didn't save you.

This is exactly the kind of thing that hit MGM. Social engineering led to compromised Okta and Azure accounts, which cascaded into a full-blown ransomware incident. Caesars Entertainment had a similar situation where an outsourced IT support vendor got socially engineered, leading to a loyalty database compromise with driver's license numbers and SSNs.

**Security controls are only as good as your policies and your staff's ability to follow them.** That means having a real identity verification process. Jump on a Zoom call and verify the person's face. Have them come to the service desk with a photo ID. It might feel uncomfortable, but depending on the criticality of the system, that's the level of rigor you need.

## What About Your TOTP Secrets?

Not every service supports WebAuthn yet. You're still going to have TOTP codes for some things, and you need to protect those secrets. The Retool breach was a good example -- they got hit with social engineering, and then tried to blame Google Authenticator for syncing TOTP secrets to the cloud. But here's the thing: people have been begging for that sync feature for a decade because every time someone gets a new phone, IT has to deal with a flood of MFA resets.

The real question is: why wasn't there hardware-based MFA like WebAuthn protecting the Google account that held those secrets? It's layers. Protect your most sensitive accounts with the strongest factors, and make sure your TOTP secrets are stored securely -- whether that's in 1Password, a password manager, or a shared vault for the bus-test scenarios where a key employee is suddenly unavailable.

## Your Action Plan

Here's what you should do starting today:

- **Enable WebAuthn/passkeys everywhere it's supported.** Your email, your identity provider, your cloud accounts -- these get hardware-based MFA first.
- **Stop treating phishing tests as gotcha exercises.** Use them to gather metrics, understand risk, and run real tabletop exercises. Test your people *and* your processes.
- **Build an identity verification policy for MFA resets.** Video calls, in-person ID checks -- whatever matches your risk tolerance. Write it down and train your help desk on it.
- **Audit your TOTP secrets.** Know where they're stored, who has access, and what protects the account that holds them.
- **Think like an attacker.** Put on that adversary hat and find the gaps before someone else does. Otherwise, you're just gambling with your customers' data.

---

These attacks aren't going to stop. They're going to get more sophisticated, more automated, and harder to spot. But the good news is that the tools to defend against them exist right now. You just have to actually deploy them -- and back them up with solid policies.

Don't play that game with your customers' trust.

*Thanks for reading. This article is based on an episode of **Plan B Security** with me, Mike Mackintosh. If you want to hear more about the real-world side of cybersecurity -- no fluff, no fear-mongering, just practical defense -- come hang out on the podcast. Until next time, stay safe out there.*
