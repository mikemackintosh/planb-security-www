# No Party Like a Third Party -- And No Risk Like the One You Didn't See Coming

## How to build a third-party risk management program that actually works, without grinding your business to a halt

---

Picture this: you're at a local family farm in the fall. Corn maze, apple cider donuts, hayrides -- the works. Now imagine you're running a three-legged race with a complete stranger. You've never met them. You don't know if they're coordinated, reckless, or about to trip you both face-first into the potato salad. But you're tied together, and neither of you wants to eat dirt.

That's third-party risk management in a nutshell. You and your vendors are strapped together, racing toward a finish line, and the only thing motivating both of you is not wanting your businesses to fail. The question is: how do you make sure that race goes smoothly?

## The Alphabet Soup of Compliance

Before we get into the practical stuff, let's talk about why this matters from a regulatory standpoint. And I'm going to overwhelm you a little -- on purpose.

CIS Controls 14 and 15 address security awareness and third-party relationship management. SOC 2's CC9.2 says you need to assess and manage risks from vendors and business partners. ISO 27001 covers supplier relationships under A15. GDPR Article 28 outlines your obligations when engaging data processors. NIST SP 800-53 has Control SA-12 for supply chain protection. PCI DSS Requirement 12.8 specifically addresses service provider management. HIPAA requires business associate agreements for anyone touching PHI. CCPA extends to service providers handling California consumer data. New York DFS Section 500.11 addresses third-party security policies. And NERC CIP 013-1 covers supply chain risk management for bulk power systems.

And that's just the U.S.-centric view. Head to Brazil and you've got LGPD. Australia has their Privacy Act with notifiable data breach requirements that extend to third-party breaches. Canada has PIPEDA, requiring contractual protections when third parties process your information.

The point of rattling all that off isn't to make your eyes glaze over. It's to make something crystal clear: **there is no excuse to skip good third-party risk management.** Can you operate a business without any of these frameworks in place? Sure. But your ability to scale, enter new markets, onboard new partners, and grow your business will hit a wall. And the same executives who complain that TPRM slows things down will be the first ones asking why you got breached when you skipped your due diligence.

## Step One: Know Your Data Before You Know Your Vendors

Everything starts with data classification. If you don't have a data handling guideline or data classification policy, that's job number one. Full stop.

Categorize your data -- PHI, PII, financial records, whatever applies to your business. Then go find it. Where does it live? Which databases? Which tables? What internal tools touch it? How does information enter your environment, and how does it leave?

You don't need to be deeply technical to do this. Sometimes it's interview-based -- just sitting down with people and asking, "Hey, what data does your team handle, and where does it go?" Other times you're reading config files or poking through repos. Either way, you're building a map.

Once you have that map, overlay your compliance requirements. Figure out which regulations actually apply to you based on where you operate and what data you handle. And if you've written controls in the past, this is a perfect time to reevaluate them. What your predecessors wrote a few years ago may not apply to your business anymore. You need to be able to speak to that with confidence.

Here's the litmus test: pick any piece of information -- say, a customer's email address. Can you trace every system it touches, every vendor that has access to it, and every regulation that governs it? If you can't, you've got work to do.

And one more thing: **do not play games with scope.** Don't tell auditors something is out of scope when it clearly isn't. Your goal should be actively reducing scope -- pulling back permissions, limiting where sensitive data can proliferate. That's real security. Not selling a fake story.

## Step Two: Map Your Vendors to Your Data

Now that you know where your data lives, the next question is: where does it leave your environment?

If the ingress of data is a vendor, who is that vendor? If data leaves your environment, which vendor pulls it? Start tracking which vendors touch which parts of your data. Build this into a master mapping -- a spreadsheet works fine to start with. You don't need to buy a fancy tool on day one.

This pays off immediately. When a third-party vendor has a breach, you don't have to scramble to figure out what they had access to. You go back to your master mapping and you know. When someone wants to onboard a new CRM tool that handles names, emails, and leads, you check your pre-approved vendor list first. Maybe you already have a tool that does the same thing.

I can't tell you how many times I've seen someone get hired at a company and say, "I really liked this tool at my last job." That's great -- but it's not going to work here if we already have something that does the job and meets our security requirements. Offer them an alternative. And if you can't offer one, that's a perfectly healthy conversation to have with procurement and legal about whether the new tool is actually better and worth the switch.

The key insight here is that steps one and two form a **positive feedback loop**. Data flows into vendors, vendors send data back, and you always know who has what.

## Step Three: Front-Load Security Into Procurement

When someone wants to bring on a new vendor that solves a genuinely new problem, this is where you break out of that feedback loop and into procurement territory.

Define your security requirements upfront -- before the contract is signed. Your agreements should spell out things like: we have the right to request data deletion and you must comply within a defined timeframe. You will encrypt our data. You will protect it. This front-loads security considerations and speeds up the review process down the road.

This is also where you classify vendors as **high risk or low risk**. A piece of software to control a printer? Probably low risk, especially if you've got EDR on that system. A vendor that needs your entire customer database or employee Social Security numbers? That's high risk, and that means a much stricter review.

And here's the thing that trips people up: sometimes vendors need to integrate with your systems using insecure approaches. They'll ask for a super admin credential to pull data from your Google Workspace or Okta or OneLogin. Don't just hand it over. Push back. Wire them up with a restricted API, scoped to a specific group or data set. Fine-tune those controls to reduce your exposure.

If that vendor gets breached, you want to be able to say, "We did everything we could to minimize the blast radius, but this integration was required for a legitimate business need." Build the truthful story. That's a great compromise to offer the business.

## Step Four: Monitor Continuously

For more mature organizations with the resources, automated continuous monitoring is the next level. Subscribe to feeds that track vendor security posture. Tools like SecurityScorecard and Venminder exist for this purpose.

But a word of caution from someone who's been on both sides of the table: I've used tools like SecurityScorecard to assess other companies, and I've been the service provider getting assessed. Once, a customer flagged us for "malware coming from our network." Turns out those IP addresses were attributed to us because we'd used them for about 14 minutes during a Kubernetes redeployment. Some other tenant had been running a C2 network off those same IPs months earlier. That's just how shared cloud infrastructure works -- there's a finite number of IP addresses, and they get recycled.

The takeaway? **Just because a finding shows up in a tool doesn't make it meaningful.** You need to know what you're looking for to make these tools actually effective.

## Building for Speed Without Sacrificing Security

The businesses that get TPRM right treat it as a speed enabler, not a blocker. Here's how:

- **Standardize your questionnaires and workflows.** Use procurement tools like Zip and integrate approval workflows into Slack or Teams. Make it easy for people to see context and click "approve" when it's the right call.
- **Tier your assessments.** Low-risk vendors get a lightweight self-assessment. High-risk vendors get the deep dive. Don't waste a full-blown review on a printer driver.
- **Hold service owners accountable.** If you run a distributed model, make the people closest to the data do the mapping work. They know their systems better than you do.
- **Collaborate cross-functionally.** Get procurement, legal, and the business owner in the room together. Integrating security into existing processes is the single easiest way to speed up the whole pipeline.
- **Build security champions.** Train people in each business unit to handle initial risk assessments. They're closer to the business process and the data. Let them take ownership, and you act as the coach.

## The Bottom Line

The goal here isn't to build an impenetrable security fortress. It never is. It's to build a process that protects your data while allowing your business to innovate and grow. That means balancing third-party risk management with business agility, and it takes continuous communication, collaboration, and refinement.

Start with a spreadsheet if you have to. Classify your data. Map your vendors. Front-load security into procurement. And keep refining as you go. You can literally start building this program today, regardless of the size of your company.

With the right approach, your TPRM program won't just meet regulatory requirements -- it'll become a business enabler.

---

*This article is based on an episode of **Plan B Security**, an information security podcast about everything that can go wrong -- because it does. In cyber defense, there's always a Plan B. Until next time, stay secure.*

*-- Mike Mackintosh, Host of Plan B Security*
