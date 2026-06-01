# Your Data Is Telling Stories You Didn't Authorize

**How direct and indirect data can quietly betray you -- and what to do about it**

---

Earlier this year, the total solar eclipse swept across North America, and like any self-respecting astro nerd, I stepped away from my desk to take it in. Incredible sight. But a few days later, I saw something almost as fascinating: Airbnb published a heat map of all their bookings across North America for that week. And guess what? The bookings lined up perfectly with the path of totality -- that arc from Texas up through New York and beyond.

On the surface, it's a cool data visualization. Maybe useful if you're the type who avoids crowds. But it got me thinking: what else is that data telling us? And more importantly, who else is paying attention?

That's what I want to dig into here -- the difference between **direct data** and **indirect data**, why both can be dangerous, and what you should be doing about it if you build products, manage teams, or just care about privacy.

## Direct Data: The Story You Meant to Tell

Some data is meant to be the product. Think Bloomberg terminals, stock tickers, Tableau dashboards, your Mode reports. The whole point is to take raw numbers and turn them into something meaningful. Someone authors a query, builds a visualization, and tells a story with intent.

GitHub commit history is another great example. It's a feature. You can see when people push code, how often, what times of day. It's direct data -- offered openly as part of the platform.

Now here's where it gets interesting. Remember the XZ backdoor? XZ is a compression library that gets compiled into other tools, most notably OpenSSH -- the thing that lets you remotely access a system. A malicious actor managed to inject obfuscated code into this publicly maintained library, and if someone had a specially crafted private key, they could achieve remote code execution on any system running the compromised version.

An oversimplified analogy: imagine holding a key to a house you're not inside and being able to flush the toilet from the sidewalk. Not great.

The whole thing got discovered because someone noticed their system was eating more CPU than it should. The InfoSec community pounced, traced the commits, and found the culprit -- a longtime contributor who'd been building trust over time. And when someone graphed the commit times? The malicious commits stuck out like a sore thumb. They weren't happening during normal contribution hours.

That's the power of direct data used for good. The commit visualization feature existed long before this exploit was even a twinkle in someone's eye, but it helped expose the threat after the fact.

## The Developer Data Problem

Here's a pattern I see constantly: developers get access to data, and because they have it, they find ways to shove it into whatever product, feature, or tool they're building. And they don't think about security or privacy when they do it.

Picture this. A webpage that visualizes everything about you -- your home address, phone number, relatives, every address you've ever lived at, your Social Security number, credit card numbers. One grand dashboard of *you*. That's a one-stop shop to get pwned.

Now imagine that same page with data masked. Your address shows as "52 XXXXX Way." Your phone number is "3XX-XXX-X97." Is it pretty? No. Is it functional? Barely. But here's the trap: because masked data looks worse, people are more likely to show the real thing. They want the visualization to feel meaningful, so they skip the right call -- which is often not showing the data at all -- and instead show too much.

This is something my team is probably tired of hearing me say, but I'll say it again: **developers need to ask themselves, "What is the value of showing this data?"** And the answer needs to be quantifiable and meaningful. "It lets people know what data we have on them" is not a good enough reason. You establish a business process for them to request it, and you share it with them securely. Not through some web portal that's one compromised credential away from becoming a data breach.

## Indirect Data: The Story You Didn't Know You Were Telling

This is the part that really gets me going -- and where things get into gray-area territory.

Pull up Google Maps or Apple Maps and look at the traffic overlay. Green means clear. Yellow means it's slowing down. Red means you're crawling. Black means you're going nowhere. Simple, right? You use it to pick a faster route. That's the intended purpose.

But think about what that traffic data actually reveals.

If there's a sports stadium and the roads around it are black at 7:15 PM, you know an event is starting. If it's green at 8:30 PM, the game is in progress. If it goes red again at 10 PM, the game just ended. You've just reconstructed the event schedule without ever looking at a ticket site.

Now swap the stadium for a hospital. Heavy traffic around a hospital at an unusual time? That could signal something significant happening -- and I'll leave it at that.

Here's the kicker: **the absence of data is just as meaningful as the presence of data.** If there's supposed to be a game at 7:30 and the roads are empty at 6:45, either your data source is broken or the game got canceled. Both are useful signals.

Think about a city that gets heavy snow. The Department of Public Works has crews that normally clock out at a regular time. You'd expect to see traffic leaving those offices at the end of their shift. But if it's snowing hard and there's no traffic leaving? They've extended shifts for overtime to clear the roads. The absence of departure traffic tells you something about current conditions and government response.

## The Domino's Index

There's an old piece of folklore called the Domino's Index, and it's one of my favorite examples of indirect data. If a Domino's Pizza location near a certain type of important federal facility is showing as "busier than normal" or "about as busy as it gets" on its Google listing, you can infer that a lot of people are staying late next door. Staying late means they need to eat. Needing to eat means pizza orders spike. And now a pizza shop's busyness indicator is accidentally broadcasting that something significant is happening at a sensitive government location.

That's textbook bad operational security. Not because anyone did anything malicious, but because nobody thought about how a pizza shop's foot traffic data could become an intelligence signal.

## What You Should Actually Do About This

If you're building products, designing features, or managing data in any capacity, here's the bottom line:

- **Threat model your data.** Before you publish, visualize, or expose any data, ask yourself how someone could interpret it in the worst way possible. How could someone exploit it for financial or personal gain?
- **Challenge the "just because we can" mindset.** Having access to data doesn't mean you should display it. Every data point in your product should have a clear, quantifiable business reason for being there.
- **Mask aggressively.** When in doubt, redact. Yes, it looks worse. That's the point. Pretty data that leaks sensitive information is worse than ugly data that keeps people safe.
- **Think about indirect signals.** It's not just about what your data says directly. It's about what it says in combination with other publicly available information. A heat map, a traffic pattern, a busy indicator -- alone they're harmless. Together, they can paint a picture you never intended.
- **Establish secure channels for sensitive data.** If someone needs access to their personal information, build a secure process for requesting and delivering it. Don't throw it on a dashboard behind a single login.

## The Takeaway

Data can be fun. Data can be sexy, even. It can help you tell compelling stories and connect with your users. But it can also be dangerous in ways you haven't considered -- both the data you show on purpose and the data you accidentally reveal through context, timing, and correlation.

So before you ship that next feature or publish that next visualization, take a beat. Think like an adversary. Ask yourself: *what story is this data telling that I didn't write?*

---

*Thanks for reading. This article is based on a conversation from **Plan B Security** -- because things don't always go according to plan. I'm Mike Mackintosh, and I'll catch you in the next one.*
