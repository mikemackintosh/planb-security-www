# Pace of Action: Why Going Fast in Cybersecurity Can Be the Slowest Move You Make

**The best incident responders aren't the fastest ones. They're the ones who know exactly when to sprint and when to pump the brakes.**

---

Your phone just blew up. And no, I'm not talking about Samsung batteries -- I'm talking about that moment where you're minding your own business and suddenly everything becomes a five-alarm fire. An escalation, an incident, somebody at the next desk who doesn't know where else to go and is now making you their personal help desk. Welcome to the reality of working in cybersecurity.

This is where most people default to one of two modes: full panic or total paralysis. Neither one is going to serve you well. What you actually need is something I call **pace of action** -- the discipline of knowing how fast or how slow you need to move in any given situation. It's not an SLA. It's not a KPI on some dashboard. It's a philosophy, and it's one that will save your career if you get it right.

## The Breach Scenario: Act Now or Gather Intel?

Picture this: you're a CISO, and you just learned about a potential data breach. You've got two choices. Act immediately with whatever information is sitting in front of you, or take a beat, gather more data, and then respond.

There's no universally right answer here -- and that's the whole point.

If you're familiar with the NIST Cybersecurity Framework (and no, that's not a new diet plan), you know the five pillars: Identify, Protect, Detect, Respond, and Recover. In our scenario, we've already hit Identify. But before you jump to Respond, you need to think through the rest. Do you know exactly what systems are affected? Do you know what data lives on those systems? Can you draw the map?

Your protective measures matter here too. Strong access controls, data encryption, regular security awareness training -- these are the difference between a minor hiccup and a front-page catastrophe. For example, if your organization gets targeted by a phishing campaign, do you have anti-phishing controls at your login pages? If an employee gives up their credentials, are those logins still protected by something like FIDO2 or WebAuthn? That's the kind of layered defense that buys you time when you need it most.

And let's talk detection. The average time to identify a breach in 2020 was 228 days. If you caught yours faster than that, give yourself a pat on the back -- but not for too long, because there's a lot of work ahead. How much exposure did the attacker actually have?

## The Evidence You Just Destroyed

Here's a real scenario that should make you think twice about acting too fast. Say a sensitive document gets uploaded to a file hosting service. You're in incident response mode, so you delete it. Problem solved, right?

Except now you find out that deleting the file also wiped all the audit log entries -- who uploaded it, who accessed it, the whole trail. The vendor doesn't give you access to their access logs, so you can't even look up IP addresses (not that they're always a reliable indicator anymore anyway).

Now you've got a reporting obligation problem. If that file contained PII or healthcare data, you might need to report the breach. If you could prove nobody accessed the file or that it had no material impact, you'd be in the clear. But you just torched your forensic evidence.

This is the missile trajectory problem. You know that 1997 training video? "The missile knows where it is at all times. It knows this because it knows where it isn't." It's absurd and hilarious, but the underlying logic applies: you need to know what you have before you can determine what's missing. And you need to know what's missing before you take a destructive action.

**Put reasonable checks in place before any destructive action. That's the core of pace of action.**

## Speed Kills (Sometimes)

Let's look at two real-world examples that sit on opposite ends of the spectrum.

In 2017, Equifax was breached because attackers exploited a known vulnerability that had a patch available for months. The slow pace of action in applying that update left 147 million Americans exposed. That's what happens when you move too slowly.

But in 2018, when GitHub got hit with the largest DDoS attack ever recorded at the time, they mitigated it in 10 minutes. That's what a well-rehearsed, well-tooled team looks like in action.

Now here's the kicker -- the paradox. Say you detect malware on a critical server. You could immediately shut it down to prevent spread. Or you could keep it running while you investigate and gather evidence. If you nuke that server from orbit, you might lose the forensic data that would help you prevent the next attack. A measured approach, like John McClane working through Nakatomi Plaza, often gets you better results than going full scorched earth.

## The Operational Side: Whack-a-Mole with a Sledgehammer

Pace of action isn't just for incidents. It shows up in your daily operations too.

You're juggling vendor reviews, change requests, and an ever-growing backlog of security tickets. You try to slap an SLA on everything, but you can't get to all the tickets in 24 or 48 hours. The business starts asking why it's taking so long to onboard a new vendor or make a firewall change.

The answer is triage. Not everything deserves the same response time. I worked at one company where low-risk changes had a five-day turnaround -- which was honestly too slow for something low-risk. But critical security patches? Same-day treatment. Other organizations I've seen give critical patches a full business week, which is borderline ludicrous if you don't have upstream mitigations in place. If another Log4j-style event drops, a week is an eternity.

Build an intake process that automatically triages and routes to the right queue. Different risk levels get different SLAs. It's not rocket science, but it requires you to actually think about the pace at which different types of work need to move.

## Contracts: The Silent Pace Killer

Here's one that bites people all the time. Your legal and procurement teams are signing contracts faster than a teenager agreeing to app permissions. Next thing you know, you're on the hook for PCI DSS compliance because somebody decided the company should start taking credit card payments over the phone. Without asking you.

And you know why you weren't asked? Because someone said "security is slowing us down," so they cut you out of the review process. Now you can't call out the fact that someone's running with scissors.

Go back and review your last few contracts. Work with legal and procurement to build an FAQ: things you will agree to, things you won't, and things you'll agree to within certain boundaries. Give your teams the tools to self-serve on the easy stuff so they come to you for the hard stuff. Build that capacity into your team for the ad hoc requests, because if you don't call it out beforehand, it will cause a much worse problem down the road.

## Regulations Won't Wait for You

The regulatory landscape adds another layer to pace of action. GDPR gives you 72 hours to report a breach -- that's like trying to solve a Rubik's Cube while riding a unicycle. Possible, but not easy when you don't have all the information. CCPA doesn't specify a time frame but requires "reasonable security procedures." What's reasonable? They leave that up to you and potentially a judge.

Then there's the SEC's updated guidelines from December 2023. If a security breach results in material impact, you've got four days after your materiality determination to file an 8-K. The materiality standard here isn't new -- it's the same one the Supreme Court established in cases like *TSC Industries v. Northway* and *Basic, Inc. v. Levinson*. Who doesn't love reading case law?

The materiality clause exists for a reason. You're not reporting every dictionary attack or every ICMP scan that lights up like a Christmas tree. It's about protecting shareholders from financially significant events. But you need to be able to *make* that materiality determination quickly, which means your processes and evidence-gathering need to already be in place.

## Five Things You Should Do This Week

1. **Develop and regularly test your incident response plan.** Make it muscle memory. And keep it simple enough that anyone can follow it every single time -- not some overly cumbersome document nobody will ever actually use.

2. **Implement automation where possible, especially for routine tasks.** You can only automate what you truly understand, and that usually starts with a manual process. Even a simple webhook triggered by certain criteria is a great starting point.

3. **Establish clear communication channels for emergencies.** And make sure your business continuity plan is available offline. If all your systems are down, you still need to access it.

4. **Conduct regular tabletop exercises.** These don't just have to be security events. Practice handling ticket types, responding to ambiguous questions, dealing with edge cases. Secret shoppers work wonders in retail -- the same concept applies to your SOC.

5. **Build relationships with key stakeholders before you need them.** When the business is moving fast and you need them to stop, they'll actually listen if they already trust you.

## Find Your Rhythm

Mastering pace of action is about finding the right rhythm for your organization. Too slow and you're a sitting duck. Too fast and you trip over your own feet. As Wayne Gretzky put it, "I skate to where the puck is going to be, not where it has been." In cybersecurity, we need to anticipate threats and move at the right pace to meet them.

We're not aiming for "move fast and break things." We're aiming for **move deliberately and fix things**.

So here's your homework: look at your current security processes. Where could you safely increase speed? Where do you need to slow down? Jot down three areas for improvement and have an honest conversation with your team about it.

---

*Thanks for reading. This post is based on a conversation from **Plan B Security** with me, Mike Mackintosh. If you want to dig deeper into the philosophy behind how security teams actually operate, come hang out on the podcast. And remember -- in cyber defense, there's always a Plan B.*
