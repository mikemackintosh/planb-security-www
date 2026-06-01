# Stop Just Managing Risk -- Start Turning It Into Enablement

**Every risk you identify is an opportunity to make someone's job easier. Here's how to shift your mindset.**

---

Let me tell you something that changed the way I think about security, IT, and honestly just problem-solving in general. I was on a flight recently, catching up on audiobooks -- one of the few times I actually carve out for myself these days -- and I was listening to *Dichotomy of Leadership* by Jocko Willink. I'm a huge fan of his. And something just clicked. A connection between what I've been doing my entire career in tech and a principle that applies way beyond firewalls and compliance frameworks.

It's this: **every risk is a potential enablement waiting to happen.**

## The Risk-Only Mindset Is a Dead End

I started my career at Verizon Wireless. We're talking 100,000 employees, hundreds of millions of subscribers, 911 call delivery, emergency response communications during hurricanes and tornadoes -- real stakes. People's lives were literally on the line.

Everything I did was based off a risk. Every change we made -- turning on a firewall interface, reconfiguring backend routing -- could drop links, kill calls, stop 911 text messages from being delivered. A simple misconfiguration could have massive consequences.

So we tested. And then we tested again. And then we tested some more. We had full lab environments that mimicked our switch offices down to the IP address. We could overwrite MAC addresses if we needed to. We once caught a bug where a routing engine couldn't handle a MAC address with specific hex characters in the 11th and 12th positions. Most people hear that and go, "Whatever, not my problem." But when you're responsible for keeping people connected, it absolutely is your problem.

That environment taught me how to identify and mitigate risk. But here's the thing -- mitigation alone isn't enough. It's necessary, but it's not the finish line. The real skill is learning to take that risk and turn it into something better.

## What Risk Enablement Actually Looks Like

Let me give you a concrete example. Say you're in an environment with strict PCI compliance requirements. Firewall is fully enforced, locked down, nobody turns it off. Good. That's the right call.

But now you've got an iOS developer who needs to use Charles Proxy or Burp Suite to capture traffic between a real device and a test server. Simulators only get you so far -- once you need true usability testing, dynamic library behavior, the real execution experience on a physical device, you need that device connected to your machine. And with the firewall fully enforced, that traffic isn't flowing.

So what do you do? You could just say "no" and call it a day. Risk mitigated. Developer blocked. Congratulations, you've protected the company and annoyed everyone in engineering.

Or you could think about enablement. On macOS, you've got management tools like Munki. What if you built a self-service workflow where a developer can temporarily adjust their firewall policy for a set period of time? Maybe you're not disabling the whole firewall -- maybe you're just allowing incoming connections for signed binaries. Charles Proxy is signed by its developer. Add it to the allow list. The developer is unblocked. The firewall stays on. The risk is managed, and you've enabled someone to do their job.

That's the shift. You went from "here's a risk" to "here's how we let people work safely."

## Why This Matters More Than You Think

Here's something that keeps me up at night. A lot of developers bind their local web servers to `0.0.0.0` instead of `127.0.0.1`. If you don't know the difference -- `0.0.0.0` means you're advertising on all interfaces. You're sitting in a Starbucks with no client isolation on the access point, running a dev server with third-party libraries you never actually inspected, and anyone on that network can find you with a simple nmap scan.

I know plenty of red teamers who used to camp out at coffee shops in the Bay Area, waiting for folks from the big tech companies to connect. They'd scan, find exposed services, match them to project names, look for subdomains, dig into DNS enumeration. You don't need to compromise the whole system. You just need one puzzle piece. And the more puzzle pieces you collect, the clearer the picture gets.

That's the risk. And if your only response is "don't go to Starbucks," you're not enabling anyone. But if you build a system where the firewall stays enforced, developers can self-service the specific exceptions they need, and everything is logged and time-bound -- now you're solving the actual problem.

## Jocko, Tanks, and the Cost of Slow Communication

In *Dichotomy of Leadership*, Jocko tells this story about communication in Ramadi. The SEAL teams, the Army, the Marines -- they all used different radio frequencies and keying mechanisms. If a SEAL needed to talk to an Army unit, the message had to go through TACOM, get relayed to the right branch, and then passed to the forward units. That's a lot of hops when seconds matter.

Jocko held the line on this one. He insisted his team needed to communicate directly with everyone on the ground. And it paid off. His team had a sniper's nest on a rooftop when some M1A2 Abrams tanks started firing at them -- blue on blue. They needed to call a ceasefire immediately. Because Jocko had pushed for direct communication capability, they could make that call without going through three layers of relay. That decision probably saved lives.

He took a risk -- breaking from standard communication protocol -- and turned it into an enablement. His teams could self-service their own comms. Sound familiar?

## The Old Man and the Hummer

Let me bring this all the way down to earth. I once watched an older gentleman -- had to be in his 70s or 80s -- walk over to help push a car that had stalled going up a hill. It was a white Hummer H3, of all things. He joined a couple other people pushing while the driver steered.

But he started getting winded. He's pushing uphill, and he just couldn't sustain it. When he started letting go, the other two people struggled. Someone yelled to hit the brakes. They got it sorted out, but it was a close call.

Now, nobody in their right mind would walk up to that man and say, "I don't want your help." His heart was absolutely in the right place. But think about it -- what if he'd been redirected? He could have directed traffic. He could have gotten in the driver's seat and steered while the younger, stronger driver pushed. Same contribution, different role, dramatically less risk.

That's enablement. You're not telling someone they can't help. You're finding the right way for them to contribute without increasing the danger.

## Your Challenge: One Risk, One Enablement

Here's what I want you to do this week. Grab a scrap piece of paper. Write down one risk you've identified in your business, your team, your workflow -- whatever. Then ask yourself: how can I turn this into an enablement?

Maybe it's self-service access to data. Maybe there are communications that certain people shouldn't see raw, but they need to action a sanitized version. Build that pipeline. Remove yourself as the manual step function in the process. Let the system generate a clean, actionable message automatically.

Once you've got that figured out, start selling the idea. Because now you're not just the person who says "no" -- you're the person who:

- Addresses a real business risk
- Turns it into a self-service capability
- Solves problems instead of creating bottlenecks
- Potentially drives revenue while decreasing exposure

There are so many ways to apply this. Compliance, product integrity, financial accuracy, data protection -- pick your lane. The principle is the same everywhere.

## Takeaways

1. **Mitigation is the floor, not the ceiling.** Identifying and managing risk is essential, but stopping there leaves value on the table.
2. **Self-service is the unlock.** The best security solutions are the ones where people can help themselves within safe boundaries.
3. **Context matters.** The right solution depends on understanding what people actually need to do, not just what you need to prevent.
4. **This applies everywhere.** Battlefields, roadside breakdowns, firewall policies -- the pattern is the same. Find the risk, find the enablement.
5. **Start small.** One risk. One enablement. This week. Write it down.

---

*Thanks for reading. This post is based on thoughts from Plan B Security, where I dig into the real-world side of cybersecurity, risk, and building things that actually work. I'm Mike Mackintosh -- if you've got a story about turning a risk into an enablement, I'd love to hear it. Find me on socials and let's talk.*
