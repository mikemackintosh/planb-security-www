# Detect or Respond? That Is the Question

**Why your detection and response program is only as good as your understanding of the business you're protecting**

---

Look, I'm going to be honest with you. The best incident response I've ever done started on a commuter train somewhere between New Jersey and Manhattan, half-awake, with a PagerDuty alert buzzing while I was dreaming about winning the Powerball. Five matching numbers. The Powerball itself. All of it. And then I opened my eyes and realized the buzzing was real -- just not the lottery part.

That's the thing about incident response. It never shows up when you're sitting at your desk, coffee in hand, ready for action. It shows up when you're driving through a known trouble area on the PCH where your cell signal drops every thirty seconds, or when you're packed into a train car with zero room to open your laptop. You have to be prepared anyway.

But being prepared isn't just about having your laptop charged and your VPN configured. It's about knowing *what* you're looking for and *why* it matters. And that's what I want to dig into here.

## You Don't Need a SIEM to Start

Let me say this upfront because I think a lot of folks get stuck on it: you do not need a fully built-out SIEM to have an incident response process. You absolutely should have one eventually, but if you're waiting for perfect tooling before you start responding to security events, you're already behind.

Think about it. If someone in your office says, "Hey, my mouse is moving on its own," that's a security event. If someone in customer support reports that a user's bank account information changed and the user swears they didn't do it -- that's a security event. If someone notices a stranger trying to tailgate into the building without a badge -- security event.

None of those require log aggregation. They require people knowing how to reach you and feeling comfortable doing it. The "see something, say something" principle is your first line of detection, and it costs nothing.

Every tool in your environment already has its own logs. Your endpoint detection software has logs. Your web server has access logs. Your application has audit trails. A SIEM gives you the glue -- the ability to connect dots across systems and build the full picture from pre-fail to mid-fail to post-fail. But you can absolutely start investigating without it.

## Know Your Business Before You Write a Single Alert

Here's where I see teams go sideways. They start writing detection rules before they understand what they're actually protecting. You can ingest every log in existence, build the most sophisticated alerting pipeline known to humankind, and still miss what matters if you haven't done the foundational work.

Ask yourself: what does your company actually do? What are the assets that matter most? If you're running a merchant marketplace where sellers get payouts, you're not just protecting product listings or user profiles. You're protecting *money*. You're essentially a payment transfer agent, and attackers know that.

They're going to target those payout accounts. They'll try to gain access -- maybe through a credential stuffing attack using passwords leaked from some other breach -- change the bank account information, and redirect funds to themselves. That's the threat model. That's what you build your detection around.

If you don't know that's your risk, you might spend all your time building alerts for things that don't matter while the actual money walks out the door.

## The Binary Tree Approach to Investigation

When an incident lands in your lap, the instinct is to panic and look at everything at once. Don't do that. Think of it like a binary tree -- divide the problem in half, then in half again, then in half again.

Take our payout scenario. A customer calls in and says, "I had $50,000 in my account and it's gone. I didn't change my bank info." The customer support agent sees a bank account change in the logs. So where do you start?

First question: **Was this on our side or the customer's side?** Is there a vulnerability in our API that let someone update bank details without proper authorization? Or were the customer's credentials compromised externally and replayed against our platform?

You pull the access logs. What IP made the change? What user agent? What time? Is the customer's email address showing up in known data breach sets? Are you seeing the same pattern across multiple accounts?

Each answer narrows the funnel. If you see bulk changes from the same IP range or ASN, you're probably looking at an automated attack exploiting leaked credentials. If you see a single account compromised through an API vulnerability, that's a completely different investigation path.

This is exactly how your playbooks should be structured -- like a "choose your own adventure" book. If you see X, go down this path. If you see Y, go down that one.

## Mitigation Is Not Remediation (and You Need Both)

This distinction trips people up all the time. Mitigation stops the bleeding. Remediation fixes the wound.

When you're watching bank accounts get drained in real time, every second of delay matters. You need to stop the bleeding *now*. Here are your options, roughly ordered from most aggressive to most surgical:

- **Kill the feature.** Push a code change that disables bank account updates entirely. Nuclear option, but effective.
- **Block the route.** Drop a 403 on the endpoint in your Nginx or Apache config. No code deploy needed, just a config change your DevOps team can push in minutes.
- **Block the source.** If the traffic is coming from a country you don't service or a specific ASN, block it at the network layer. This is actually a common DDoS mitigation tactic and it works here too.

Yes, some of these will impact legitimate customers. That's okay. You're choosing between "some customers are temporarily inconvenienced" and "money is actively being stolen." That's not a hard call.

Remediation comes after. That's where you partner with product and engineering to build the real fix -- maybe requiring MFA before any sensitive account change like updating a password, email, phone number, or bank details. Even if an attacker has stolen credentials or a session cookie (remember the Okta support breach where HAR files containing authenticated session cookies were exposed?), step-up authentication on sensitive actions stops them cold.

One thing I'd warn against: don't over-prescribe how customers use your platform. Blocking a U.S.-based user from setting a French bank account might seem logical, but people have legitimate reasons for cross-border banking. Solve the security problem without dictating the user experience.

## What Happens After the Fire Is Out

This is the part most teams skip, and it's arguably the most important.

Once you've mitigated and remediated, sit down and ask: what did we learn? What are the gaps? And critically -- what can we *measure*?

Build dashboards. Track things like: How many bank account changes are happening per day? Per week? Is there a baseline you can establish from six months or a year of historical data? When that number spikes, you want to know about it *before* a customer calls in.

Track email address changes. Password resets. Phone number updates. Any sensitive account modification that could indicate an account takeover. These metrics aren't just useful for detection -- they're how you communicate the value of your security program to leadership. Especially when the details of an incident are wrapped in attorney-client privilege and you can't talk specifics, metrics let you tell the story without exposing the details.

Write the playbook while the incident is fresh. Document where you found the logs, what you were most worried about, and the decision tree you followed. The next person who gets paged at 2 AM while dreaming about winning the lottery will thank you.

## Practice Like You Mean It

Firefighters don't wait for a five-alarm blaze to figure out how their equipment works. Athletes don't show up to game day without practicing. Military units run drills constantly. So why do security teams think they can wing it when an incident hits?

Run tabletop exercises. Simulate the scenarios. Walk through your playbooks with the team and find the holes before a real attacker does. Make incident response muscle memory. When that page comes in -- and it *will* come in at the worst possible time -- you want your hands moving before your brain fully wakes up.

And here's the thing: one incident often spawns multiple playbooks. That bank account takeover scenario? It led to a playbook for account takeover response *and* a separate playbook for responding when a third-party breach is announced. Because if Adobe leaks 153 million accounts and your users reused their passwords (they did), you need a plan for that too.

## The Bottom Line

You can have the fanciest SIEM, the most comprehensive log pipeline, and alerts firing on everything under the sun. But if you don't understand your business, your risks, and your threats, you're just generating noise. Detection and response starts with knowing what matters, builds with practice and playbooks, and improves through honest retrospectives and meaningful metrics.

Don't wait for Plan B. Get your Plan A figured out.

---

*This article is based on a discussion from [Plan B Security](https://planb.security), hosted by Mike Mackintosh. Got a wild on-call story or a creative incident response trick? Find us on X or Instagram at @_planbsecurity, or visit planb.security. Thanks for reading, and catch you next time.*
