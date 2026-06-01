# The FTC Gave You a Security Blueprint -- You're Just Not Using It

## How IT pros can start thinking like security people today, using lessons from real enforcement cases

---

You know that feeling when you're sitting at a burger joint and a stranger starts asking you career advice? That happened to me at Holstein's in the Cosmo during hacker summer camp 2023 -- that glorious collision of Black Hat, DEF CON, and BSides Las Vegas. This person had a solid 10 years of IT experience, managed Office 365, handled identity providers, the whole nine yards. And they hit me with the question I get asked more than any other:

*"What's the difference between a security person and an IT person?"*

Here's the short version: a security person will do things *right*, whereas an IT person traditionally will just do things to be *productive*. IT enables the business to move faster. Security reduces unnecessary risk. And when you do take on risk, you document it clearly so nobody's surprised when things go sideways.

Their follow-up was even better: "Where do I start?"

## Your Unlikely Security Mentor: The Federal Trade Commission

Whenever someone asks me that question, I don't point them to a certification or a YouTube playlist. I send them to the FTC website.

Yeah, the Federal Trade Commission. The folks responsible for going after companies engaged in deceptive or unfair practices against consumers. If your company has a massive data set and it gets leaked, the FTC is coming for you.

Here's why this matters to you: every time the FTC takes action against a company for failing to protect personal information, that becomes a public case. Facts are presented. Outcomes set the bar higher for everyone. The TLDR? **Learn from other companies' mistakes.** These cases are essentially a blueprint for what a security program should address.

The FTC even publishes a guide called *Start With Security: A Guide for Business*. It's a free PDF. You can literally have them ship you pamphlets -- I ordered about 200 copies once just to hand out at events. It's that good of a starting point.

## The Twitter Case: Seven Failures You Can Learn From

Let's get concrete. In 2011, the FTC brought a case against Twitter after two breaches in 2009. In one incident, an attacker gained unauthorized access and sent tweets on behalf of high-profile users. In another, attackers compromised a Twitter employee's account and started issuing password resets for other users.

The FTC identified seven failed controls. Let's walk through them, and more importantly, let's talk about what *you* can actually do about each one with your existing IT skills.

### 1. Weak Password Policies

Twitter failed to enforce policies that made administrative passwords hard to guess -- no restrictions on common dictionary words, no requirement that passwords be unique across services.

If you're running Active Directory or Okta, you already have the tools to fix this. Okta has a common password check that blocks passwords from lists like RockYou. Active Directory has group policy settings for complexity requirements. Turn them on.

The trickier question is: how do you make sure people aren't reusing passwords across services without storing them in plaintext? One approach is the Password Alert Chrome extension. It hashes password inputs and checks them against other sites to flag reuse. Your admin password for Google Workspace should never be the same one you use on Flickr. Because when one service gets breached, attackers will absolutely try those credentials everywhere else.

### 2. Passwords Stored in Plaintext (and Emailed Around)

Twitter failed to prevent administrative passwords from being stored in plain text and personal email accounts.

Let me say this plainly: nobody should ever be emailing a cleartext password for an admin account. Full stop. Use a password manager -- 1Password, LastPass, whatever works for your org.

On the DLP side, this is where you can start flexing those IT muscles. Take your password policy, convert it into a regex pattern, and build a DLP rule around it. Put it in monitoring mode first, collect some metrics, and then bring that report to your security team or leadership. Even if the rule isn't perfect, you're demonstrating security thinking. Bonus: apply it org-wide and turn it into a training opportunity about password sharing policies.

### 3. No Account Lockout After Failed Logins

Twitter didn't suspend or disable admin accounts after repeated failed login attempts. This is brute force 101.

Configure your identity provider to lock accounts after a set number of failed attempts -- say 10 -- for a defined cooldown period. You're increasing the cost for attackers by forcing them to slow their scripts down. And while you're at it, make sure MFA is enforced on every admin account. If the username and password get compromised, MFA is your safety net.

Put on your IT hat here: don't just configure it once. Run routine audits -- monthly, quarterly, whatever cadence works. Tabletop exercises are great for testing whether your lockout policies actually behave the way you expect them to.

### 4. No Separate Admin Login Portal

Twitter used the same login page for administrators and regular users. The FTC said admin login pages should be known only to authorized personnel and kept separate from consumer-facing login.

This is an architecture decision. Ideally, your admin tools sit behind a VPN, a device trust proxy, or some other network gating mechanism. Back in 2011, "known only to authorized persons" meant literally hiding the URL. Today, compensating controls like device trust -- where you verify EDR is installed, the device is managed, and it's assigned to the right person -- can satisfy that spirit.

The IT play here is to evangelize your capabilities to the engineering team. If you have a device trust solution or a Zero Trust proxy, make sure your developers know it exists so they can build on it. Break out of the IT-engineering silo.

### 5. No Periodic Password Rotation

The FTC flagged Twitter for not enforcing password changes, specifically calling out a 90-day rotation.

Now, before you jump out of your chair -- yes, NIST has updated their guidance. They now recommend changing passwords at least once a year and explicitly warn that forcing changes too frequently leads to weaker passwords (hello, "Password1!" becoming "Password2!").

Personally, I like to avoid storing passwords at all when possible. Think one-time-use passwords, LAPS on the Windows side, or rolling credentials after every use with WebAuthn for physical proof of presence.

The practical takeaway: when an employee leaves, rotate everything they touched. Service accounts, API tokens, shared credentials -- all of it. It's a pain, I know. But it's a lot less painful than an FTC consent decree and a career-ending breach.

### 6. No Least Privilege Enforcement

Twitter failed to restrict admin access based on job responsibilities. This one screams the principle of least privilege.

"I need access to everything because I do" is not a valid defense when you're staring down the FTC. If you're an engineer working on the timeline feed, you probably need access to sample data and the ability to debug feed issues. You don't need access to the billing system. A salesperson needs access to their accounts, not the entire customer database.

Think about the request flow: not everyone gets full permissions on day one. Tie access to training, require business justifications, and build in periodic reviews. When someone changes roles, their old permissions go away. Period.

And keep this in mind -- your executives are going to be the first targets. They're public, they're on LinkedIn, their email format is guessable. As your company grows, actively trim their access back to only what they need for their current role.

### 7. No IP or Network-Based Access Restrictions

The FTC said Twitter should have restricted admin access to specified IP addresses.

If you're running a BeyondCorp-style network or using a device trust proxy with mutual TLS, you're in good shape. Even if an attacker compromises a session or credentials, they won't have the certificate on their machine to authenticate upstream. That satisfies this requirement nicely.

## The Mindset Shift

Is this list everything you need to know about security? Absolutely not. But it's a concrete, real-world starting point. The FTC has hundreds of these cases in their database, each one spelling out exactly where a company went wrong and what controls would have prevented it.

The shift from IT to security isn't about getting a new certification or learning a new tool. It's about putting a different lens on the work you're already doing. Take the requirements the FTC has laid out, look at your current environment, and ask yourself: *How do I apply this to what I'm doing today?*

That's where the security mindset starts.

## Key Takeaways

- **Start with the FTC's "Start With Security" guide** -- it's a free blueprint for security program fundamentals.
- **Read FTC enforcement cases** to learn from real failures at real companies.
- **Audit your password policies** -- enable common password checks, enforce complexity, and block reuse.
- **Implement account lockout and MFA** on every administrative account, then test it regularly.
- **Apply least privilege everywhere** -- tie access to roles, require justification, and review periodically.
- **Rotate credentials on termination** -- every service account, API token, and shared password the departing employee touched.
- **Evangelize your IT capabilities** to engineering teams so security gets built into architecture, not bolted on after.

---

*Thanks for reading. This article is based on an episode of **Plan B Security** with me, Mike Mackintosh. If you found this useful, tune in for more -- and remember, kindness is free and it's the one thing you can give to everybody at zero cost. Or as Michael Scott would say, "I want people to be afraid of how much they love me." Catch you next time.*
