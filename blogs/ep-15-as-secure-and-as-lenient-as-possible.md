# The $20 Jar of Candy That Will Change How You Make Security Decisions

**Why every risk call you make boils down to consequences -- and how to stop overthinking the ones that don't matter**

---

You make hundreds of decisions a day. What to wear, what to eat, whether to pull out in front of that car whose speed you can't quite gauge. Most of those decisions carry zero long-term weight. But some of them -- especially in security -- carry enormous weight. And the trick isn't just knowing *what* to decide. It's knowing *how much time and energy the decision actually deserves*.

Let me walk you through a thought exercise that has genuinely shaped the way I approach risk.

## The Hershey Kiss Estimation Game

Back in elementary school, around the holidays, someone would fill a big glass jar with Hershey Kisses. You'd write down your best guess for the count, drop it in a box, and the closest estimate won the jar plus a $25 gift card to Barnes & Noble. Pretty low stakes, right? If you lose, you shrug and go about your day.

Now imagine the same game, but if your guess is wrong, you owe a million dollars. Suddenly that jar of candy is the most interesting object on the planet. You're counting rows, estimating volume, factoring in the curvature of the glass, wondering if there's something hidden in the middle. You'd take *forever* to write your number down.

That's not irrational behavior. That's consequence-driven decision-making. And it's exactly what we do -- or should be doing -- in security every single day.

## Two Principles: As Secure As Possible vs. As Lenient As Possible

I like to frame security decisions using two principles: **as secure as possible** and **as lenient as possible**. They sound like opposites, but they're really more like two ends of a dial you're constantly adjusting.

**As secure as possible** means: I don't have enough information to say yes, so I'm going to take my time. I'm going to investigate. I'm going to sit with this until I've gathered what I need to make a truly educated call. This is the "stare at the jar for 45 minutes" approach -- and it's the right one when the downside of getting it wrong is severe.

**As lenient as possible** doesn't mean you're being reckless or submissive. Lenient means *permissive within your tolerances*. You've looked at the risk, it falls within acceptable bounds, and you're comfortable saying yes without a month-long investigation. That's not weak security. That's smart security.

Here's a concrete example. Someone on your team wants to add a Slack bot. If all it does is write data into a channel -- posting notifications, surfacing alerts -- the risk profile is pretty narrow. Worst case, it spams a channel and you disable it. That's a lenient yes. Quick decision, easy to reverse.

But if that same bot wants read access to every channel in your workspace, public and private? Now you're in "as secure as possible" territory. That's a slow decision, and it should be. There's sensitive data at stake, and the consequences of getting it wrong aren't something you can undo by flipping a switch.

## The Four-Square Matrix: Quick and Slow, Yes and No

If you've listened to me before, you know I love thinking in four squares. Here's the matrix that lives in my head for security decisions:

| | **Quick** | **Slow** |
|---|---|---|
| **Yes** | Low risk, easy to reverse | High potential value, needs thorough vetting |
| **No** | Egregiously bad, obvious reject | Complex risk, not enough data yet |

**Quick yeses** are the 10-pieces-sitting-on-a-table scenarios. You can see what you're dealing with. The risk is minimal. The ability to course-correct is fast. Say yes and move on.

**Quick nos** are the ones so obviously terrible that you don't even need to spend time on them. If a vendor asks for full admin access to your production environment with no explanation, that's not a slow no -- that's a "we're done here."

**Slow yeses** and **slow nos** are where the real work happens. These are the jar-of-candy problems where you can't see through the glass clearly. Maybe there's an object hidden inside. Maybe the wrappers are empty. You don't have enough information, so you take the time to get it.

## The Revenue vs. Risk Gut Check

At the end of the day, security exists to enable the business, not block it. So here's the gut check I always come back to:

If a security incident from this decision could cost you $10 million, but the feature is *guaranteed* to drive $100 million in annual recurring revenue -- that's a quick yes. The math is obvious.

But if that $100 million in potential revenue comes with the risk of bankrupting the company and $50 million in personal liability? That's a very different conversation. That one deserves every minute you can give it.

The real skill is in calibrating how much time and energy each decision deserves based on the actual consequences -- not treating every request like it's the million-dollar jar.

## The Power of Reversibility

Here's the shortcut that saves me the most brainpower: **How easy is it to undo this decision?**

If you can flip a switch and turn something off, you've got a natural safety net. Turn on the bot. If it starts spamming everyone's DMs, shut it down. Done. You just saved yourself hours of analysis for something you could test and reverse in minutes.

But if the decision involves data access that can't be ungranted, or a configuration that's painful to roll back, or exposure that can't be unexposed -- slow down. That's where you earn your paycheck.

## Document Everything (Seriously, Everything)

Whatever decision you land on, write down *how you got there*. This is what puts you in a smart, defensible position. Not just "approved" or "denied," but the reasoning. The risk factors you weighed. The tolerances you applied. The unknowns you accepted.

When someone asks six months later why a particular integration was approved, you don't want to be digging through your memory. You want to point to a document that shows your thought process was structured, intentional, and based on the information available at the time.

## Prioritizing Your Roadmap with This Lens

This framework isn't just for one-off security decisions. Use it to prioritize your entire roadmap:

- **Operational task that doesn't increase business value and takes forever?** Backlog it. Maybe permanently.
- **Initiative that drives significant revenue growth but needs careful security work?** Drop what you're doing and invest the time to get it right.
- **Low-risk opportunity that doesn't hurt but has unclear upside?** Quick yes. Let it run. Have a playbook ready in case something goes sideways.

The point is to match your investment of time and energy to the actual weight of the consequences. Stop spending three weeks evaluating a read-only Slack bot. Start spending three weeks on the integration that touches every customer record in your database.

## Actionable Takeaways

1. **Assess the consequence first, not the request.** Before you dive into evaluating a tool, integration, or access request, ask yourself: what's the worst realistic outcome, and how reversible is it?

2. **Use the quick yes / quick no / slow yes / slow no framework.** Plot every decision on that matrix. It'll immediately tell you how much time to invest.

3. **Lenient does not mean careless.** Being permissive within defined tolerances is a legitimate security posture. Not everything needs to be locked down to the maximum.

4. **Reversibility is your best friend.** If you can undo it easily, bias toward action. If you can't, bias toward investigation.

5. **Document your reasoning, not just your decision.** Future you -- and your auditors -- will thank you.

6. **Tie every decision back to business impact.** Security doesn't exist in a vacuum. Revenue, risk, and reversibility are the three Rs that should guide your calls.

---

*Thanks for reading. This article is based on Episode 15 of **Plan B Security**. If you want to hear more about making smarter security decisions without losing your mind, subscribe and follow on Apple Podcasts, Spotify, or wherever you listen. Find us on the web at planb.security, and follow along on Instagram, Twitter, and Bluesky. Until next time -- stay sharp.*

*-- Mike Mackintosh*
