# To Control or Be Controlled: Why More Security Controls Don't Mean More Security

**Adding a seventh lock to a door that already has six doesn't make it safer. It just means nobody can get in -- including you.**

---

Let me tell you a story. A mid-sized company -- we'll call them SecureCore -- prided itself on implementing every single control recommended by every framework they could find. They had more acronyms in their security stack than letters in the alphabet. MFA, EDR, SIEM, PAM -- you name it, they had it. Then one day, an employee couldn't access a critical system because they were locked out by what amounted to a 17-factor authentication process. By the time they finally got in, hours later, a multi-million dollar deal had fallen through.

The kicker? A pen test later revealed that despite all those controls, a simple phishing email still could have compromised their network.

Before you throw your keyboard at me, hear me out. We've all been there -- layering control after control, thinking we're building an impenetrable wall. But sometimes more security doesn't actually make you more secure.

## The Fire Trail Lock Problem

I was on a hike recently, going through a fire trail, and I came across a barricade -- the kind set up to prevent people from riding ATVs through. But here's the thing: a lot of different organizations need access to that trail. The electric company, the gas company, the fire department, the police department -- they all need through.

If you put one lock on that gate, you need a bunch of copies of one key, and that decreases your security. So what they did instead was each organization brought their own lock, their own key, and they daisy-chained them all together. If the fire department needs through, they unlock their lock, which disconnects the chain between the utility company's lock and the police department's lock, and the gate swings open.

The control was simple: the gate needs to be locked at all times, and only authorized individuals should be able to unlock it. Mission accomplished -- without a single unnecessary layer of complexity.

That's the mindset you need. Never lose sight of the overall mission.

## What the Data Actually Says

So here's the question: what do you believe is the single most effective security control? Got your answer? Let's see if the data agrees.

Marsh's cyber risk analytics center released a report that directly links key cybersecurity controls to a reduced chance of cyber incidents. They identified 12 key controls and measured each one's "signal strength" -- essentially how much implementing that control decreases the likelihood of a successful attack.

The winner? **Automated hardening techniques.** Signal strength of 5.58. That means if you don't apply automated hardening, you're 5.58 times more likely to suffer a security event. That's nearly twice as effective as the next best control on the list.

Here's the full top five:

1. **Hardening techniques** -- Signal strength: 5.58 | Implementation rate: 96%
2. **Privileged access management (PAM)** -- Signal strength: 2.92 | Implementation rate: 35%
3. **Endpoint detection and response (EDR)** -- Signal strength: 2.23 | Implementation rate: 82%
4. **Logging and monitoring** -- Signal strength: 2.19 | Implementation rate: 88%
5. **Patch management** -- Signal strength: 2.19 | Implementation rate: 24%

Now here's where it gets interesting. MFA -- the thing we've all been preaching about for years -- doesn't even make the top 10 when implemented in isolation. It only shows a significant positive impact when deployed broadly across the entire organization. Partial implementation gives you the illusion of security, not actual security.

## The Numbers That Should Keep You Up at Night

Look at those implementation rates again. Hardening is at 96% -- great. But PAM is at 35%. The second most effective control, and barely a third of organizations have it in place. That means 65% of companies out there are letting people run around with shared logins, no just-in-time access, and everyone having the keys to everything.

And patch management? Twenty-four percent. If you're not patching high-severity vulnerabilities -- we're talking CVSS 7.0 to 8.9 -- within seven days, you're twice as likely to suffer a security event. You wouldn't leave your front door wide open for a month and let anyone (or anything) just walk in. But that's effectively what you're doing.

Now, context matters. If a system has a remote code execution vulnerability but it's air-gapped and powered off, the actual risk is lower. But it's still a finding. You still need to track it, document it, and show maturity in how you handle it. Sometimes the only mitigation is to stop using a system entirely -- and that's exactly why "end of life systems replaced or protected" made Marsh's list of 12 key controls.

## The Lego Approach to Security

I have a very Lego mindset -- yeah, I'm talking about those little plastic bricks you build amazing things with. Everything you do should add up to the bigger picture, even if you don't know what that bigger picture is yet.

Say it's your first day at a new job. You've got a brand new Linux server that just came online. Here's how you build it, block by block:

**Block one: Harden the system.** Disable or reconfigure SSH. Apply firewall rules. Configure PAM so nobody's using a shared service account like `ec2-user`. Every person gets their own identity on every log.

**Block two: Establish logging.** Make sure logs are in place -- SSH access logs, HTTP service logs -- and that you can actually search them. Ship them to a data lake or a SIEM so you've got a single pane of glass.

**Block three: Build active monitoring of your controls.** Did the SSH configuration change? Can someone now hit port 22 on the public interface when they shouldn't be able to? Are you running low on disk space for log retention? Are logs actually shipping to where they're supposed to go? Build the tests. Automate them. Trust but verify.

I've been using ServerSpec for over 10 years to validate that every EC2 instance or VM is configured exactly how I expect it to be. Whether I'm using Chef, CIS benchmark workbooks, or whatever -- I want to know the state of my systems matches my expectations.

## Sell It to the Business

Here's the part nobody talks about enough: you need to get the business to help you. Tell engineering and operations teams that if they build technical monitors into their own processes, applications, and services, you won't have to block them for two weeks while you find time to review everything. The review process gets shortened significantly. They get their features out faster. You get better visibility. Everyone wins.

Speed is stability. It's not an either-or.

## The Takeaways

If you walk away with nothing else, remember these:

- **More controls does not equal more security.** A scattershot approach with partial implementation across dozens of tools is worse than deep, complete implementation of a few high-impact controls.
- **Hardening is king.** At 5.58x signal strength, automated hardening techniques are the single most effective thing you can do. Use system configuration management tools, enforce CIS benchmarks, and lock down what needs locking down.
- **PAM is massively underinvested.** The second most effective control with only 35% implementation is a glaring gap across the industry. If you're not managing privileged access, start now.
- **Patch what matters, fast.** High-severity vulnerabilities need to be patched within days, not months. Apply business context to prioritize, but don't let that become an excuse to do nothing.
- **Build like Legos.** Every control should stack on top of the last, adding up to defense in depth -- not defense in chaos.
- **Think about your own organization.** How many of your controls are only partially implemented? Are you getting real benefit, or just the illusion of security?

---

*Thanks for reading. This article is based on a conversation from **Plan B Security**, an information security podcast about everything that can go wrong -- because it does. Stay secure, stay vigilant, and always have a Plan B.*

*-- Mike Mackintosh*
