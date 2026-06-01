# The 4 Cs of Cybersecurity: A Framework for Building a Security Program That Actually Works

**Because consistency, clarity, collaboration, and creativity aren't just buzzwords -- they're the foundation of a security culture people actually buy into.**

---

Look, I've been doing this long enough to know that security isn't just about firewalls and policies. It's about people. It's about how you communicate, how you show up every day, and how you bring others along for the ride. That's why I came up with what I call the 4 Cs of Cybersecurity: **Consistency, Clarity, Collaboration, and Creativity**.

These started as three Cs back when I was at Snapchat. I did this interactive presentation where I'd shout "Consistency!" and the whole room would shout it back. Then "Clarity!" and "Collaboration!" People joked about it for weeks afterward -- which told me it stuck. And if something sticks, it's doing its job.

As our friend Andy Bernard once said, "I wish there was a way to know you're in the good old days before you've actually left them." Those were some good days. But the framework kept evolving, and eventually I added a fourth C. More on that later.

Let me break each one down for you.

---

## Consistency: Be the Oil in the Engine

Consistency has at least three definitions that matter here. First, the ability to do something for an extraordinary amount of time -- think building habits. Second, making sure things are done the same way time and time again -- accuracy, fairness, conformity. And third -- this one's my favorite -- the way a substance holds together. Its thickness. Its viscosity.

Your security program needs to be like oil in a motor. You need to fit into every little groove and crevice of the business. You need to coat the pieces that keep the company moving forward without breaking down and losing your value.

This is also the hardest of the four Cs to put into practice.

### A Real-World Example: Firewall Policies

Every corporate computer you can think of probably has some sort of firewall policy. It's one of the easiest compliance checkboxes out there. But plenty of workflows can't have that policy enabled. iOS developers need to proxy traffic from a phone to their machine to debug. Android developers have similar needs. So what do you do?

You either run a tight risk register where you're filing every exception -- who got what, for what reason, at what time -- or you establish baseline exceptions for specific working groups. Sometimes people call these "birthright exceptions." Either way, your consistency comes from how you enforce those policies across the board.

Now take it a step further. Every organization has that one person who's super helpful, never wants to say no, and gets Slacked constantly with requests. If that person starts making exceptions or fielding requests outside of the normal process, you've got problems:

1. **No one can look back** and see why something was done.
2. **You lose the knowledge share** -- other team members can't learn from old tickets.
3. **You lose the ability to track operations work** and turn it into metrics for leadership.

And if you're sitting there thinking, "I just don't have time for all that," that's your first sign you need to mature. Either as an individual, a team, or a program. That flag is telling you it's time to find a better way to intake cross-functional requests.

One more thing about consistency: it becomes a smart defense mechanism. Whether it's an incident, litigation, or an audit, being able to show demonstrated consistency in how you make decisions, write policies, enforce policies, and run your incident playbooks is incredibly powerful.

If you're convinced things could never be consistent in your environment, you probably don't understand it as well as you think. And that's okay -- now you know where the growth opportunity is.

---

## Clarity: If You Can't Explain It in 24 Words, Go Learn It Better

Clarity has two definitions I love. The quality of being coherent and intelligible, and the quality of transparency or purity. Notice they both share the word **quality**.

Just because you know something -- how well do you know it? Just because you can see something -- how well can you see it?

Back when I worked at Verizon, I printed out a little sign and hung it on my cubicle wall: **"If you can't explain something in 24 words or less, go back and learn it better."** That mantra has shaped how I approach everything.

### Watch Out for "I Think" Culture

Here's something that might ruffle some feathers, but I stand by it. Next time you're in a data-driven conversation, count how many times someone says "I think," "it might be," or "maybe it's" before throwing out a number. "I think we got about 500 emails." "Maybe it was around four o'clock."

People will psychologically latch onto those numbers immediately. They'll hold you accountable for them. They'll start making decisions based on them. And if they're wrong, you've got a real problem.

So do one of two things. Either find a way to pull accurate data in real time during the conversation, or review the meeting agenda ahead of time, predict what metrics might come up, and prepare before you walk in the room.

If you're on the receiving end and you're not sure the data is accurate, handle it with care. It's free to be kind. It's free to be respectful. You don't want the person sharing data to feel unappreciated. But it is completely okay to say, "Hey, this decision carries a lot of weight -- can you walk me through the source data? Which queries did you run? Which spreadsheet has the raw numbers?" Deliver that with respect and you'll get the clarity you need.

### Clarity in Your Security Vision

This goes beyond data. When you write vision statements, mission statements, or policies, perspective matters a thousand percent. If your sales team, your legal team, or your executive leadership can't understand what you're trying to achieve, how do you expect them to embody it?

They can't. They won't.

Always provide a **why**. What's the impact to the business? What's the impact to them specifically? What's changing? And if you want to go the extra mile, explain how you're going to measure the change. Some business partners respond much better to a data-driven approach.

---

## Collaboration: It's a Two-Way Street

Collaboration comes down to two things. First, you need to understand the risks different teams bring to the company so you can secure them. Second, you need to build a security program that fits the requirements of the business.

You can't just walk up to a team and say, "Hey, you can't do this anymore" without giving them a plausible alternative or truly demonstrating the severity of the risk. In a fault-tolerant company, that approach won't fly.

### Do the Work: Shadow the Teams

Sit down with your cross-functional partners. Understand their workloads, their workflows, their tools. How are they accessing things? How are they sharing credentials? Are they onboarded into your identity provider? What kind of data do they touch? Do they need to download anything locally, or does everything live in a SaaS solution?

This is your chance to do real data mapping. Ask the hard questions: Is there PII in those tools? Financial data that could materially change the business? Healthcare information? Anything material under your compliance program?

And here's a challenge for every one of you: ask your cross-functional partners how **they** think they can help make the company more secure. You'll learn two things from this. First, how technically competent they are around security. I once had someone tell me, "Well, if I zip a file with social security numbers and email it, it's not a plain text attachment." That's a red flag and a training opportunity right there.

Second, you'll learn what they believe security is. You can't get someone to do something if they don't believe in it. This is where emotional intelligence really starts to come into play. You understand what they think security is, you share what you know it is, and together you build a compromise that cements the collaboration.

The beautiful thing? Once collaboration is in place, you gain clarity around the interaction. And then you can enforce consistency. It all builds back up.

---

## Creativity: The One I Added Later

The original three Cs served me well for years. But I added creativity because sometimes those first three hit a wall. When there's a failure in consistency, clarity, or collaboration -- when there's no compromise to be found -- you need a creative solution.

This is where strong leadership really shines.

Maybe you've got a difficult partner who doesn't want to collaborate. You've been clear, but they don't want to understand. A few creative approaches I've used:

- **Red team engagements.** If something is a legitimate risk and they won't budge, a controlled demonstration of that risk can be incredibly persuasive.
- **Technical controls.** Force compliance through configuration -- block zip file attachments, restrict downloads. But be careful here. When security becomes a blocker, people find workarounds. If your DLP is set up on Google Drive and people start using Dropbox instead, you've just created a shadow IT problem.
- **Security champions.** Find an ally in their organization or leadership team who can champion the cause from the inside.
- **Metrics.** This is the one that works 99% of the time. Measure what security actually impacts for that specific team. The biggest argument you'll hear is "security slows us down." If you can prove it doesn't -- with real data, without actually impacting their workflow -- you've got the ammunition for a much more productive conversation.

### A Creative Solution in Action

Here's one from my own experience. A sales and marketing team was doing outbound email blasts from our Google Workspace domain. Google has a hard limit of 1,500 unique outbound emails before the account gets suspended for spamming. We told them repeatedly to stop. They didn't. We ended up on a Spamhaus block list.

So I spun up a secondary subdomain: marketing.topleveldomain.com. All the cold outbound emails went through that subdomain. It isolated the marketing traffic from legitimate corporate email. It protected the top-level domain from being blocklisted. And it made it immediately clear to recipients that this was marketing, not a corporate-to-corporate email.

It solved multiple problems at once -- and nobody had to stop doing their job.

---

## The Bottom Line

Here's what I want you to take away:

- **Consistency prevents confusion.**
- **Clarity prevents confusion.**
- **Collaboration prevents confusion.**
- **Creativity solves confusion.**

A strong program built on these four Cs removes the ambiguity that leads to all the confusion in the first place. Pair that with solid knowledge sharing, documentation, and a wiki culture, and you start making security accessible to everyone in the organization.

And once everyone is contributing to the security story, you realize you've built something bigger than a program. You've built a real security culture.

And like Michael Scott always said -- go into every situation with confidence.

---

*Thanks for reading. This article is based on a discussion from **Plan B Security** with me, Mike Mackintosh. If you want more straight talk about building security programs that work in the real world, check out the podcast wherever you listen.*
