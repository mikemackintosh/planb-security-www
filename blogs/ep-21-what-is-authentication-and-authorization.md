# You're Using "Authentication" and "Authorization" Wrong -- Here's Why It Matters

**The difference between who you are and what you're allowed to do is the most important distinction in cybersecurity. And most people get it completely wrong.**

---

The Verizon Data Breach Investigation Report is one of the most comprehensive annual reports on security events across the land of bits and bytes. The 2023 report told us that 74% of breaches involved the human element. Not some Hollywood rendition of hacking through proxy servers and relaying off satellites. Real breaches, caused by real people making real mistakes -- like reusing passwords across multiple sites.

Case in point: 23andMe. Nearly 6.9 million users fell victim to a credential stuffing attack. No fancy exploit. No zero-day vulnerability. Attackers simply had usernames and passwords from other compromised sites and replayed them. It was essentially the same as logging in as the user in a browser.

That's it. That's the whole attack.

So here's the question that should keep you up at night: if a malicious attacker can log in *as you*, what stops them from doing everything you can do? The answer lives in understanding the difference between authentication and authorization -- and why using those words interchangeably is a problem.

## Authentication Is Not Authorization (And Vice Versa)

I find a lot of people mashing these two terms together. Authentication gets shortened to "AuthN." Authorization gets shortened to "AuthZ." One letter apart, but fundamentally different functions.

Here's how I think about it. Walk into a bank. You want to liquidate your entire account and walk out with every dollar. What happens first?

You give the teller your account number. But hold on -- that's not authentication. That's *identification*. You're simply presenting an identifier so the bank knows which account you're talking about. You haven't proven you're the owner. You haven't been given permission to do anything.

Next, the bank needs to verify who you are. Are you really the account holder? This is where **authentication** kicks in. They'll check factors like:

- **Something you have** -- a bank card, government-issued ID, passport
- **Something you know** -- a PIN, passcode, security question
- **Something you are** -- fingerprint, retinal scan, facial recognition

Depending on how risky the transaction is, you'll usually see at least two of these factors checked. And here's the critical nuance: authentication doesn't automatically mean you're matched to the account you identified. Maybe you fat-fingered the account number. Maybe you're a bad actor trying to access someone else's money. Authentication confirms *you are who you say you are*. That's all.

**Authorization** is what comes next. It's the establishment of the relationship between your identity and what you're actually allowed to do. The bank checks: Does this person have permission to make this withdrawal? Are there sufficient funds? Has the daily transaction limit been hit?

Just because you've authenticated to your bank doesn't mean you can do whatever you want in there.

## The Safety Deposit Box Problem

Here's an example I love. You walk into the bank and say you need to access your safety deposit box. They verify your account number, check your ID, confirm you're the account holder. Great -- you're authenticated.

But you still need your key. And here's the kicker: safety deposit boxes typically require *two* keys. Your customer key and the bank's guard key. Neither works alone. If you can't authenticate your identity, the bank won't use their key, no matter what. If you don't have your key, your identity doesn't matter.

That's authentication and authorization working together, and it's a beautiful thing when it's done right.

## What Happens When You Skip Authentication?

Let's flip this around. What if the bank *only* authorized a transaction without authenticating the person making it?

You walk in, read off an account number from some random check you have, and the teller just... gives you the money. No ID check, no verification, nothing. That's an unauthorized person making what the bank treated as an authorized transaction. Congratulations, the bank just handed over someone else's life savings. That's a liability nightmare.

This is exactly why credit card companies deal with concepts like **authorized users** and **authorized transactions**. An authorized user is someone the account holder has explicitly given permission to use the card. An authorized transaction is one approved by the card issuer confirming the card is valid and the account is in good standing.

But here's the thing -- the credit card company never actually knows who's swiping the card. They pass that responsibility to the merchant. That's **transitive authentication**. For low-risk transactions, just physically having the card might be enough. For card-not-present transactions, you need the card number, expiration date, security code, maybe a zip code. Chip and PIN tried to solve this by combining something you have (the card) with something you know (the PIN), but most terminals in the U.S. still don't fully support it.

## So What Does This Have to Do With Cybersecurity?

Everything.

The lowest level of cybersecurity fundamentals is making sure there is trust. Trust in a transaction, trust in a web request, trust in an email. Trust is everywhere and it's nowhere all at the same time -- because you can't trust anybody. That's why we all started saying "zero trust," which, to be honest, is a term I really despise.

Everything you do online has some sort of identity tied to it. Your IP address, your username and password, your social login via OpenID Connect. And we've been at a point for at least ten years where "something you know" alone just doesn't cut it anymore. Your password is just a string of characters. Anybody can come up with the same variation you think is so clever with the capital letters, the numbers, and -- let's be honest -- it probably ends with an exclamation point.

This is where multi-factor authentication comes in: WebAuthn, TOTP codes, SMS verification. People don't want it to be *harder* to log in. They want it to be easier to log in *with more trust*.

## Context-Aware Access: The Smart Bouncer

Once you've authenticated, authorization can use the *context* around your request to decide if you should actually be allowed to do something. Think of it as a smart bouncer who doesn't just check your ID -- they check the situation.

Some real examples:

- **Time-based**: A bank teller trying to process a transaction at 7:35 PM when their shift ends at 5:00? Denied.
- **Location-based**: Normally work from one branch but suddenly issuing wire transfers from an unknown IP address at home? Flagged.
- **Device health**: Your endpoint detection software is out of date? No access to sensitive financial documents.
- **Device management**: Is your laptop managed by MDM? Is screen lock enforced? Is your antivirus current?

You can see how these context signals layer on top of each other to build a much richer authorization decision than just "does this person have the right role?"

## Federated Identity and the SSO Trap

In the corporate world, federated identity links and manages identities across different systems. You click "Sign in with Google" on a new service, and that service creates an internal identity linked back to your Google account. Change your email? Doesn't matter -- the linking persists.

Single sign-on takes this further by letting you use one set of credentials to access multiple applications. Convenient? Absolutely. But here's my biggest pet peeve: **there's no such thing as single sign-off**. It's the other SSO. Or as I like to joke -- SSO no.

People spend enormous effort making it easier to *get* access. Taking it away? That's where things fall apart. Someone gets off-boarded, their account gets deactivated, but their web sessions on Google or Slack persist. Their native apps on their phone stay logged in. Unless those sessions are explicitly cleared, the access lives on like a ghost in the machine.

Your authorization policy needs to enforce session validation. Is this still a valid account? Is this session still legitimate? Don't just check at login -- check continuously.

## The Future Is Passwordless (For Real This Time)

One of the most promising trends is passing authentication method attributes into the authorization context. If someone authenticated with WebAuthn -- a hardware-backed credential like Face ID, Touch ID, or a YubiKey -- maybe they get access to high-risk applications. If they only used SMS (which is easily phishable or interceptable), maybe they're limited to low-risk resources.

Now flip the incentive: if WebAuthn is *easier* to use than typing in an SMS code, why even offer SMS as a factor? Remove it, and your minimum authentication factor becomes your *strongest* factor. Everybody wins.

WebAuthn has been the foundation of the "passwordless" movement for close to seven years now. Hardware costs are dropping, websites are constantly under attack, breach costs keep climbing, and cyber insurance premiums keep rising. We're in the right place for some significant market changes. I'm genuinely excited to see where this goes.

## The Hotel Analogy (My Favorite)

If the bank analogy didn't stick, try this one. You walk into a hotel with a reservation. You show your ID, hand over your credit card, and get a room key. That's authentication.

Now the authorization challenges don't happen at the front desk. They happen every time you tap that key card. Can you use it on the staff elevator? No. Some random guest's door? No. Your room? Yes. The concierge lounge because of your loyalty status? Also yes.

Authentication got you the credential. Authorization determines where that credential actually works.

## Key Takeaways

1. **Identification, authentication, and authorization are three distinct steps.** Don't collapse them into one concept.
2. **Authentication proves identity.** Authorization grants (or denies) permissions based on that identity.
3. **Context matters.** Time, location, device health, and authentication method should all factor into authorization decisions.
4. **Passwords alone are broken.** Move toward WebAuthn and hardware-backed credentials wherever possible.
5. **Revoking access is just as important as granting it.** Validate sessions continuously, not just at login.
6. **Transitive trust is everywhere.** Understand who's actually responsible for verifying identity at each step of a transaction.

---

*Thanks for reading. If this got you thinking differently about AuthN and AuthZ, I'd love to hear what metaphors you use to explain it to the people around you. Find us at [planb.security](https://planb.security) on the web, or @planbsecurity on Twitter and Instagram. Until next time -- stay curious, stay skeptical, and keep asking the hard questions.*

*-- Mike Mackintosh, Plan B Security*
