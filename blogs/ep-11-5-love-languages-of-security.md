# The Five Love Languages of Security: How to Build Relationships That Actually Protect Your Organization

**Your security program isn't failing because of bad policies. It's failing because nobody feels the love.**

---

Let me be blunt with you: policies and procedures only go so far. You can write the most airtight, well-documented security requirements in the history of corporate governance, and it won't matter one bit if nobody follows them. And here's the kicker -- when people feel like you're a blocker, they won't even bother asking for approval. They'll go around you. They'll ask for forgiveness instead of permission. And that, my friend, is where real risk starts creeping in.

So how do you fix this? You build relationships. And who better to guide us through relationship-building than Gary Chapman, the guy who wrote *The Five Love Languages*?

Now, before you close this tab thinking I've lost it, hear me out. Every team in your organization is different. They have different responsibilities, different pressures, and different relationships with the bottom line. And yes, it is always about the bottom line -- even at security companies. There are shareholders, investors, and paying customers. Nobody's running a business purely out of passion. The idea might have started there, but the money keeps the lights on.

Your job in security is to figure out how each team needs to be supported, and then show up for them in the right way. Just like in a relationship.

## Quality Time: Show Up Where It Matters

Here's a trap I've fallen into myself. If you're more comfortable with application security, you'll naturally gravitate toward spending time with the engineering teams, helping them knock out OWASP Top 10 vulnerabilities. Meanwhile, corporate security programs get neglected. That's you understanding *your* quality time preference, not theirs.

You need to be hyper-aware of where you're spending your time and where the gaps are. Some teams need more love than others. Maybe their program is less mature, or their team is full of newer folks who haven't been through the security gauntlet yet.

The fix? Set up office hours. Schedule time directly with leadership teams. Run knowledge-sharing sessions, mentorships, coaching, or even pair programming. Make yourself available in a structured way so that every team gets face time with security -- not just the ones you're already comfortable with.

## Gift Giving: Contribute, Don't Just Consume

Let's be honest -- the one gift no security team ever wants to receive is a hot potato service that nobody else wants to own. You know the one. The original authors left the company two years ago, nobody understands the microservices architecture, and suddenly it's security's problem because we're the "figure it out" team.

But gift giving in the security context can actually be powerful when you flip the script. Here's a real example: at a previous job, we wanted to use an open-source asset management tool that had zero Okta support. We asked the vendor to add it. They said no. We didn't have veto power over the tool -- it was a P0 priority for the whole organization.

So I built the Okta integration myself. We contributed the code, rolled out SSO, and complied with our own requirements without blocking the business. That's a gift. You're not just saying "no, this doesn't meet our standards." You're rolling up your sleeves and making it work.

Think about the third-party libraries and open-source tools your teams are running internally -- CI/CD pipelines, monitoring stacks like Grafana or Prometheus, auth libraries. These community-developed tools don't always ship with everything your security program needs. Instead of vetoing them, consider making a small commit upstream. Give the gift of a contribution that makes the tool compliant *and* better for everyone.

## Acts of Service: Pick Up the Slack Without the Attitude

In the love languages world, acts of service is doing the dishes without being asked, folding the laundry, tidying up the house. In security, it's filing tickets and exceptions on behalf of others.

People are busy. Priorities shift constantly. And sometimes folks just forget to do something. The cognitive behavioral therapy crowd will tell you to always assume positive intent, and they're right. Instead of chastising someone for not filling out the risk matrix, fill it out for them. Answer their questions first, then file the ticket yourself afterward.

This is about reducing operational burden on both sides. And when the favor gets returned? That's your business partners actually following your processes, getting everything done exactly how you documented it, taking that mental load off your plate. That's their act of service back to you.

And here's where it gets practical: build self-service into your policies. Say your organization requires SSO for every new application, but a team wants to onboard a tool that only supports local accounts. Instead of a flat "no," have an exception process ready to go. Let them self-service it. Spell out what you need: How do people get onboarded and offboarded? What's the password policy? Who responds to incidents? Who follows up on vendor changes?

You just went from gatekeeper to enabler. And you just made a champion for your security program.

## Words of Affirmation: Tell People When They're Doing It Right

Think of this as your security awareness program on steroids. Someone reports a phishing email? Respond immediately and tell them they did the right thing. Someone notices weird tracking cookies on a website, or thinks they accidentally entered credentials on the wrong page and flags it? Tell them they did the right thing.

You can take this further with scorecards. Track how teams are performing. If the legal team starts sharing documents insecurely or skipping processes for outside counsel communication, approach it with empathy. Acknowledge that litigation is time-sensitive and that you understand the pressure. Then pivot to asking what they need to do it more securely. Maybe visitor sharing isn't enabled in Google Drive and they've been forced into workarounds with Dropbox or personal accounts. As long as nobody's posting sensitive docs on Pastebin, you can work with them on a solution.

And when things improve? Broadcast it. If account takeovers through social engineering drop, if a specific attack vector that was previously hammering your support org goes quiet -- let people know. Show them the positive feedback loop. Let teams see that their effort is making the company more secure. Some people will shrug it off, sure. But it's still good practice, and for the folks who care, that recognition goes a long way.

## Physical Touch: Get Hands-On With Their World

Okay, this is the one that requires the most creative translation, but stick with me. In the real world, physical touch is hugs and holding hands. In the security world, it's getting uncomfortably close to the services and products your teams are building.

This means incident response and tabletop exercises. Getting into their uncomfortable zone. And I'll tell you, nothing makes people sweatier than responding to an incident when you have zero visibility -- no logs, no playbooks, no understanding of how the system even works.

On the flip side, when teams practice "physical touch" back toward security, it looks like them reading your documentation, leaving comments and FAQ questions, engaging with everything you've already published. It's someone checking the travel policy before a trip. It's a developer looking up the approved software registry before installing something new. Every time they self-service through your materials, that's them reaching out and engaging with your program.

The goal is to get it to a point where it's point-and-click. If someone is doing the same task ten times a day and there's a clear logic path, automate it. Build self-updating documentation into your automation. Propagate approved software lists into JIRA fields so teams can select from them without interrupting your workflow. These are gifts you're giving back to the organization -- and they reduce friction on both sides.

## The Challenge

Here's what I want you to walk away with: take these five concepts and look at your business partners, your cross-functional teams, your co-workers. Figure out what language they speak. Some teams need quality time. Others need gifts of code. Some just need to hear that they're doing a good job.

No two companies are exactly alike, and I can't hand you a golden formula. What I can give you is a framework -- a lens to look through when you're trying to figure out why a team keeps going around your processes, or why adoption of your security program stalls in certain pockets of the organization.

And here's a teaser: Gary Chapman also wrote a companion book called *The Five Apology Languages*. Because let's be real -- sometimes security breaks things in production, or makes life harder for people while doing what needs to be done. How do you say sorry? How do you make sure it doesn't happen again? That's a conversation for another day.

Build the relationships first. The security will follow.

---

*Thanks for reading. This article is based on an episode of **Plan B Security** with me, Mike Mackintosh. If you found this useful, check out the podcast for more conversations about building practical, people-first security programs. Stay safe out there.*
