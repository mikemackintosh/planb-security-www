# The Principle of Most Private: Why "Least Privilege" Is Holding Your Security Program Back

**It's time to stop thinking about what people *shouldn't* have access to -- and start thinking about what they *need*.**

---

Let me ask you something. When you hear "least privilege," what comes to mind? Restriction. Lockdown. Taking things away. And look, I get it -- the concept has been a cornerstone of information security for years. But I think we've been approaching it wrong, and it's time for a reframe.

I call it the Principle of Most Private. Think of it as a perpendicular framework to least privilege. It's not about stripping access down to the bare minimum and calling it a day. It's about doing things the right way for the right reasons -- a context and intent based approach to security.

## The Problem with "Least"

Let's just sit with the word "least" for a second. What are the synonyms? Insufficient. Inadequate. Bare bones. Minimal. Slightest. That's not what privilege should be. You should be granted all the access you need from day zero to do your job.

And here's the thing -- least privilege, in practice, usually ends up in one of two places. Either everyone has access to everything because the restrictions were so painful that people found workarounds, or people are constantly blocked from doing their actual work and security becomes the department everyone loves to hate.

Most private flips the script. Instead of asking "what's the least we can give them?" you ask "what's the most private thing we can do here?" It's a subtle but powerful shift.

## Security as an Enabler, Not a Blocker

There's going to be a huge change in infosec over the next couple of years. We're going to move away from being that blocker and become more of an enabler. When you do that, you stop being a cost center and start becoming a profit center. Product security is going to take off. Corporate security is going to shift. Your security operations teams are going to start doing more active control monitoring, partnering more closely with detection engineering and incident response.

That old Venn diagram where security and compliance lived in two completely separate circles? Those circles are going to start overlapping. And when the compliance story drives the security story -- and vice versa -- you stop operating in a bifurcated environment and start actually making progress.

## The PRIVATE Framework

If you need a structured way to work through this, I've got an acronym for you. Because of course I do. PRIVATE:

- **P -- Purpose:** What is the purpose of what you're trying to do? Does this person actually need this access?
- **R -- Risk:** What's the risk if this goes sideways?
- **I -- Impact:** What's the downstream damage if the risk is realized?
- **V -- Validity:** How are you validating that the right person is doing the right thing?
- **A -- Auditing:** Are you tracking what changed, when, and by whom?
- **T -- Transparency:** Are you being upfront with your users and customers about what you're doing with their data?
- **E -- Education:** Are you leaving people better informed than when they started?

The key thing to understand is that these aren't seven separate checkboxes. They're a gradient. Each one feeds into the next. Purpose leads you to consider risk. Risk makes you think about impact. Impact demands validity. And so on.

## Real-World Scenario: The Self-Service Feature

Let's say a developer is building a feature that lets customers update their own profile -- bank account info, address, the usual. Walk it through with me.

**Purpose:** The customer should only be able to update *their own* information. Any session identifier tied to their account should be scoped only to what they can access, recall, and see. And just because you *have* their full address and bank details doesn't mean you should display all of it on screen. Mask that information. Just because you can show it doesn't mean you should.

**Risk:** During an account takeover, exposed data like a zip code or street address can be used to compromise *other* services -- maybe an Apple account that uses address verification.

**Impact:** If someone can change bank account information without proper validation, you could be looking at tens of thousands of dollars flowing into an attacker-owned account.

**Validity:** Build in a two-step verification. Customer requests a change, it goes into a queue, and support reaches out via the phone number on file -- not the one that was just updated at the same time. Maybe you mailed them a PIN when they signed up for sensitive actions. Use it.

**Auditing:** Track the previous value, the new value (masked or tokenized in the logs), the timestamp, the IP address, the device ID if you're fingerprinting. And if internal employees and customers share the same interface, make sure you're differentiating who made the change.

**Transparency:** Show customers what's happening with their data. Build visualizations. Let them see how long you've stored their information. Give them a button to purge it instead of making them email some privacy@ address and wait three weeks.

**Education:** Teach your customers why WebAuthn is better than SMS for multi-factor authentication. Turn it into a story. Make them leave your platform as a more security-minded person than when they arrived.

## The IT Side: Stop Taking Away Admin Access

Here's one that hits close to home for a lot of you. Least privilege says you can't install software on your local computer. Period. Well, that's a productivity blocker, and you know it.

Most companies I've worked for don't take administrator access away from people who need it day in and day out. You could do temporary admin escalation, sure. But the most private approach says: let people do what they need to do, and build guardrails around it.

Do they need this software for their job? Yes or no. If they're trying to install some random game, no -- hopefully you have an allow list or block list handling that. But you're not stripping admin privileges.

Where did they download it from? If it came from one of those notoriously terrible download sites with malware baked in, that's where your EDR and your education program come in.

Is there sensitive data on the device that would make a malware incident catastrophic? If so, maybe that data shouldn't be on the local device in the first place. It should live in your approved data repositories.

And here's the transparency piece for the IT side -- make what you're doing on those hosts transparent to your employees. If you haven't checked out [honest.security](https://honest.security), go do that. It's a great model for letting people understand what security tooling is on their device, what logs you're pulling, what you can and can't see. Nobody should be shocked to learn their Coinbase wallet traffic is going through a corporate proxy. But also -- maybe don't do that on your work laptop in the first place.

## The Bowling Alley Analogy

As security professionals, we should be building the guardrails. We shouldn't stop people from throwing the bowling ball. But we shouldn't let them throw gutter balls either. Build those guardrails. Educate your people. That's how you build trust with employees. And when employees trust security, they build products that customers can trust.

## Most Private vs. Least Privilege: The Bottom Line

Least privilege is really just about identity and access management. Most private is much more than that. You can achieve least privilege successfully by thinking about it through the most private lens.

Here's the simplest way I can put it:

> **Least privilege:** Everyone has access to everything (because that's what eventually happens when restrictions drive workarounds).
>
> **Most private:** Everyone has access to everything *that they need*.

It's time to stop being the security perfectionists we've been, time and time again. Attackers are finding ways through it. They find flaws. And when you think you've got this perfect security posture -- you're yelling at people every time they click a training phish -- you're not solving anything. People will go around you and your security program, and *that's* what gets compromised.

Most private is that perfect balance. It's the compromise between people having access to everything and people having access to everything they need.

And hey -- you know what happens when you don't take this stuff seriously? Well, let's just say Michael Scott taught us all a valuable lesson about password security. Big boobs... with a Z. We're in.

Do better. Hold your service providers accountable. Hold yourself accountable. And start asking: is this the most private thing we can do?

---

## Actionable Takeaways

1. **Reframe your access decisions.** Stop asking "what's the least we can give?" and start asking "what's the most private thing we can do?"
2. **Use the PRIVATE framework** (Purpose, Risk, Impact, Validity, Auditing, Transparency, Education) as a checklist when designing features or policies.
3. **Mask and minimize data display.** Just because you store it doesn't mean you should show it.
4. **Build validation into sensitive actions.** Bank account changes, profile updates -- add queue-based verification with out-of-band confirmation.
5. **Be transparent with employees and customers.** Document what you monitor, what data you collect, and give people control where you can.
6. **Educate relentlessly.** Make your customers and employees more security-savvy than when they found you.
7. **Build guardrails, not walls.** Enable productivity while steering people toward secure behavior.

---

*Thanks for reading. This article is based on ideas explored on **Plan B Security**, the podcast where we rethink the fundamentals of information security -- from frameworks to philosophy. If this got you thinking differently about access, privacy, and building trust, tune in for more. As always, I'd love to hear what topics you want us to dig into next. Until then -- Kitos.*

*-- Mike Mackintosh*
