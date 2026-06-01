# You Don't Need a Degree to Break Into InfoSec -- But You Do Need to Be Relentless
## How a kid with a ThinkPad obsession, a bar trivia game, and zero formal education built a career in cybersecurity

I remember the exact moment it started. I was a little kid playing in the dirt with Tonka trucks while a contractor measured our house for a new addition. He walked over to his truck, pulled out what looked like a flat toolbox, and opened it up. It had a screen. It had keys with letters on it. It was a ThinkPad 300 running CAD software. And from that day on, I knew I wanted a computer.

I'm a baby of the 80s. I don't like sports. I don't like science fiction. I don't like fantasy. To be honest, I never really felt like I fit in anywhere -- until I saw that first computer. If you're reading this and you feel the same way about something, lean into it. That weird obsession might be the thing that builds your entire career.

## My First Hack Was a Bar Game

In the early 90s, my dad brought home a tower with a 486DX inside, a monochromatic green display, and both 5.25 and 3.5-inch floppy drives. I'd wake up in the middle of the night and watch him play games like Missile Defense and Bar Games by Accolade.

Bar Games is the one that accidentally put me on the path to cybersecurity. To launch the game, you had to identify pictures of alcoholic drinks and type in the matching name -- a rudimentary password gate for keeping kids out. I didn't know where the password sheet was. So what did I do? I sat there and just kept typing. Every drink name I could remember, over and over, until I got in.

I didn't know it at the time, but I was brute forcing my way into a video game before I could even write my own name. I started keeping a list of the passwords that worked. That was my first password list. That was the beginning.

## Books, Dyslexia, and the Logic of Code

Fast forward a few years. I'm volunteering at the library during summers -- cleaning toilets, dusting shelves, mopping floors, hauling garbage. But being surrounded by books meant I eventually picked some up. That's also around the time I realized books and I didn't get along. Turns out I had dyslexia, though it wasn't diagnosed until later.

Here's the thing though: I could read code. A C++ book made perfect sense to me because it was pure logic. I didn't have to wrestle with the grammatical structure of why some character was speaking in a specific tone. I could just look at it and know that *this equals this because these two things match*. I spent entire summers reading C and C++ books from that library and teaching myself to program.

C got me into PHP. PHP got me into everything else. And none of it happened inside a classroom.

## You Don't Need a Degree -- But You Need the Obsession

Let me be direct about something: I never went to school to get where I am today. No bachelor's, no associate's, no master's. School just isn't how I learn. And there are a lot of people like that who don't know where to start.

The difference I've noticed between people in this field breaks down roughly into three groups. There are people chasing money. There are people genuinely interested in security. And then there are people like me who are flat-out obsessed. By the time I was 10, I was telling my dad I wanted to build my own operating system and put Microsoft out of business. Obviously that didn't happen, but the obsession was real and it drove everything.

If you're trying to break into InfoSec and you're not sure whether this is for you, ask yourself: do you tinker with things even when nobody's watching? Do you stay up too late trying to figure out why something doesn't work? That's the signal.

## Apache, AIM Profiles, and Accidental Application Security

PHP taught me application security before I even knew it was a thing. By the time I was about 14, I understood that a `$_GET` or `$_POST` variable could be manipulated. I knew that if I was hitting a PHP site, there was probably zero input sanitization. I knew that when you see `?something=something` at the end of a URL, you can mess with those values and the system might do things it was never supposed to do.

But the real fun was with AIM -- AOL Instant Messenger. I figured out that Apache 1.3.37 didn't strictly follow the HTTP RFC when it came to spaces in URI paths. That meant I could embed HTML into my AIM profile, add links with `target="_self"` so they'd load in the same window, and use variable replacement so that `%s` in the URL would get swapped with the viewer's screen name. Combine that with PHP on the backend, and now I'm conditionally rendering different web pages for different people viewing my profile.

Was it practical? Debatable. Was it an incredible education in how HTTP, web servers, and application logic actually work? Absolutely. And when the hosting provider upgraded Apache and patched that behavior, I learned another important lesson: understanding the system means understanding when and why things break.

## Linux, Packet Captures, and Landing the First Real Job

I moved away from Windows and ran Gentoo Linux for a long time. And if you know Gentoo, you know that nothing works until you understand *how* it works. Running Apache with PHP on Linux forced me to learn troubleshooting from the ground up -- SSL dumps, TCP dumps, reading raw traffic to figure out why things weren't behaving the way I expected.

That skill is exactly what got me my first corporate job at Verizon Wireless when I was 18. I could read packet captures and speak to protocols like the back of my hand because I'd been doing it for five or six years already. At Verizon, that translated directly to debugging issues across the production wireless data network -- reading PDSN traces, understanding how radio traffic got translated to data packets, and figuring out why customers couldn't connect.

I didn't have a degree. I had years of hands-on experience born from obsession and curiosity.

## Always Be Building Something

I never stopped finding ways to apply what I wanted to learn to what I was doing at work. One of my favorite projects was setting up Active Desktop in Windows XP -- that old feature where you could set a webpage as your wallpaper. I built an HTML dashboard with forms, expandable link sections, and text fields right on my desktop. I could take a phone number, an IP address, or a ticket number, drop it into a field on my wallpaper, and hit APIs and backends without ever opening a browser or logging into a separate tool. JavaScript handled the data extraction. My desktop became my fastest workflow tool.

Another time, I wanted to learn about algorithms. Instead of taking a class, I built a system that pulled ticket data from a SQL Server database, geocoded the locations, created radius-based clusters with time boundaries, and generated heat maps of network issues. If a bunch of problem tickets showed up in the same area within the same window, that pointed to a cell site issue we could correlate with the network operations center. My performance numbers went through the roof once I had that running.

The point is this: the best way to learn something is to build something with it. Don't wait for permission. Don't wait for a curriculum. Just build.

## What Actually Matters If You're Getting Started

Here's what I'd boil it all down to if you're trying to break into this field:

- **Build resilience.** You will never get it right the first time. Learn to fail fast. Sometimes quitting one approach isn't giving up -- it's freeing up your resources for a better solution.

- **Learn to program -- but don't let anyone gatekeep you.** You don't *need* to be a programmer to work in security. But does it help? A thousand percent yes. Once you learn what an if-statement does in one language, you can take that logic anywhere.

- **Run Linux.** Seriously. When things don't work in Linux, you have to understand *why*. That troubleshooting muscle is the same one you'll use every single day in InfoSec.

- **Find someone to push you.** I had two friends named Justin who both wanted to program, and competing with them made me sharper than any class ever could have. Find a mentor or a peer who will hold you accountable and push you to the edge of your capability.

- **Stay curious and never accept the default answer.** I never accepted that the way everyone else did things was the final way. I always felt things could be done better, and I always tried to make them better. That mindset is the core of security work.

- **Apply what you learn immediately.** Don't just study in a vacuum. Find a way to use your new skills on real problems, even if you have to invent the problem yourself.

## Context Switching Is Your Superpower

Today, I can jump into any codebase and understand what the author intended within minutes. I can switch between languages and contexts at speed because it's all the same fundamental logic underneath -- a variable gets set because a condition is met, triggered by some protocol or input. That flexibility came from years of learning one thing and immediately applying it to something else.

And honestly, it's no different from how you already operate in real life. You act differently at a restaurant than you do hanging out with your friends. You context-switch when you see someone at the grocery store who needs help reaching the top shelf. You already know how to adapt. Now apply that same instinct to your career.

---

Not everybody's story looks the same, and this isn't even my full story. But the things that mattered most were learning what I wanted to learn, motivating myself when nobody else was going to do it for me, and never accepting anything less than what I knew I could build.

So here's my question for you: what are you going to do differently to hold yourself more accountable so you can build the resilience this field demands?

*Thanks for reading. This article is based on an episode of **Plan B Security**. If you're trying to break into cybersecurity and want to talk through it, reach out -- find us on Spotify, Instagram, or wherever you listen. Get engaged. It's the best place to start.*

*-- Mike Mackintosh, Plan B Security*
