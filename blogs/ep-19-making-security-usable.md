# Stop Making Security Everyone's Worst Experience

**If your security controls punish people for trying to do their jobs, you've already lost.**

---

You know what really grinds my gears? You've been waiting weeks for concert tickets. The countdown hits zero, you refresh the page, and -- bam -- a cookie consent pop-up steals your moment. Sold out. Gone. All because some lawyer somewhere decided the best way to protect your privacy was to interrupt literally everything you do on the internet.

That little cookie banner is a perfect case study in what happens when security and privacy controls are designed without thinking about the human on the other end. And honestly? It's just the tip of the iceberg.

## The Cookie Problem: Letter vs. Spirit of the Law

Here's the thing about GDPR and the ePrivacy Directive. The *spirit* of the law is actually great: give people autonomy over their personal data online. If you don't want a website tracking you, you should be able to say no. That's a reasonable, respectable goal.

But then there's the *letter* of the law. And the letter of the law spawned a billion identical pop-ups that nobody reads, everyone clicks "Accept All" on, and that accomplish roughly nothing for actual privacy.

The regulations say you need to get consent before using non-essential cookies, provide clear information about what each cookie does, let users access your service even if they refuse cookies, and make it just as easy to withdraw consent as it was to give it. Sounds reasonable on paper, right?

In practice, what we got was an over-interpreted mess. Websites hit you with that banner every time you visit -- or every few hours when you come back -- because technically, repeatedly prompting you satisfies the requirement that changing your consent should be easy. It's the letter of the law, sure. But it completely misses the point.

What I'd actually love to see is browser-level cookie control. Let me decide once, at the browser level, which cookies I'm comfortable sharing with any website I visit. Stop making me play whack-a-mole with consent banners on every single page. That's usable privacy. What we have now is privacy theater.

## Passwords: One Key to Rule Them All

Let's talk about another area where security is actively hostile to users -- passwords. There are millions of websites out there, and the conventional wisdom says you need a unique, complex password for every single one. That's not usable. That's homework.

Your alternatives aren't great either. Write them in a notebook? Everyone says don't do that (unless you've got a safe, and even then, that's basically just an analog password manager). Use a digital password manager like 1Password, Bitwarden, or Dashlane? Sure, but now -- like Lord of the Rings -- there's one key to rule them all. One master password to protect the vault.

I'll tell you what I do, and I credit my ADHD for this one. Every website makes me think of something -- usually a song lyric or a feeling I associate with the site. And then I make my password an entire verse. We're talking 25 to 40 characters, spaces included, proper grammar, single quotes where they belong, maybe a little leet speak thrown in to hit the special character requirements.

And this is where I have a bone to pick with site operators: if your password field maxes out at 12 characters, we have a problem. If you block single quotes, double quotes, exclamation points, or semicolons because you think that's how SQL injection works, you're telling me you have no idea how to properly handle input. And I want my data nowhere near your infrastructure. I will absolutely take my business elsewhere.

But the real answer? Let's just get rid of passwords. We've been promised passwordless authentication for years now, and the technology is here. WebAuthn lets you use something you *have* -- Face ID, Touch ID, a YubiKey, Windows Hello -- as a key that pairs with the website's lock. You show up, you use your key, and you're in. It really is that simple, and I don't even think that's an oversimplification. That is what usable security looks like.

## Make Reporting Threats Dead Simple

Picture this: it's your first day at a new company. You get a message from the "CEO" asking you to run out and buy iTunes gift cards, scratch them off, and send pictures. Classic scam. But do you know what to do with it?

Usable security means making the right thing to do the *obvious* thing to do. If it's a suspicious text, you should be able to screenshot it and drop it into a Slack channel or forward it to a dedicated inbox. If it's a phishing email, you should be able to slap a phishing label on it or hit a "Report Phishing" button right there in your mail client. One click, done, the security team gets notified automatically.

The key principle here: always operate under the assumption that people want to do the right thing. They just need you to show them what the right thing is.

## Build Safety Nets, Not Brick Walls

Here's where it gets really practical. Say someone needs to share a W-2 or a 1099 -- documents loaded with PII like Social Security numbers. The usable security approach isn't just training people not to email sensitive documents (though yes, you should do that too). It's building systems that catch mistakes before they cause damage.

Set up your email gateway to detect PII in outbound messages and attachments. If someone tries to email a file with Social Security numbers, block the delivery or scrub the attachment and convert it to a secure download link. Block zip files and archives from going out via email -- those are usually bulk data shares, and email is not the place for that. Redirect people to approved sharing tools like SharePoint, OneDrive, Box, or Google Drive.

You can even take a risk-scoring approach: external recipient plus Gmail address plus multiple attachments plus a zip file? That's a high-risk score. Route it through moderation before it goes out.

And for the inevitable "but our vendor doesn't support the approved method" conversations -- that's what exception processes are for. Log the exception in your risk register, document the trusted recipient, and now you've got a gating mechanism. Anything that gets blocked without an exception means the security and privacy teams weren't aware of it, which means the safety net did its job.

## Developers Need Guardrails, Not Lectures

This philosophy extends to your engineering teams too. If a developer can accidentally deploy a SQL injection vulnerability, the answer isn't just more training (though that helps). Build a shared library that abstracts database interactions with prepared statements and parameterized queries. If raw SQL injection gets detected on input, use that as a metric to identify where additional education is needed -- but the vulnerability never makes it to production.

Same thing on the infrastructure side. Create Terraform or Pulumi modules that prevent wide-open firewall rules (looking at you, `0.0.0.0/0`) from making it into production. If a team needs to expose a service to the public web, route it through a code owners review where the security team gives the thumbs up. That review becomes your documented exception, and you've made it significantly harder for someone to accidentally blow a hole in your perimeter.

## The Bottom Line

Usable security boils down to one idea: **let people make mistakes safely.** Don't build controls that punish users for not being security experts. Build systems that guide them toward the right behavior and catch them when they slip.

Whether it's cookie banners, password policies, phishing reports, data loss prevention, or infrastructure guardrails -- the question is always the same: did you make the secure path the easy path? If the answer is no, you've got work to do.

### Quick Takeaways

- **Push for browser-level privacy controls** instead of per-site cookie consent fatigue.
- **Let people use long passphrases.** If your site caps passwords at 12 characters or blocks common punctuation, fix it yesterday.
- **Adopt passwordless authentication.** WebAuthn is here. Use it.
- **Make threat reporting one click.** A phishing button in the email client, a Slack channel for suspicious texts -- remove every barrier.
- **Build safety nets for data sharing.** Scan outbound email for PII, block risky attachments, and redirect to approved sharing tools.
- **Create secure-by-default developer tooling.** Shared libraries, controlled modules, code owner reviews -- make the secure path the default path.
- **Document exceptions, not just rules.** When someone needs to go off the beaten path, a risk register entry is your safety net.

---

*This article is based on a conversation from **Plan B Security**, hosted by Mike Mackintosh. If you want to hear more about making security work for real people in the real world, find us on Spotify, Apple Podcasts, YouTube, and wherever else you listen. And hey -- share with us how you've made security usable in your corner of the world. Until next time.*
