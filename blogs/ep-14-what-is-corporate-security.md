# Corporate Security Engineers Are the Swiss Army Knives of InfoSec

**They protect the brand, harden the network, automate the boring stuff, and somehow still explain DMARC at parties.**

---

Look, corporate security means a lot of things to a lot of different people. But to me, it boils down to one thing: securing the productivity and operations of the business. That means everything from brand trust to the collaboration tools your teams live in every day -- your ticketing systems, email, chat platforms, build pipelines -- basically anything that keeps product moving out the door.

And I'll be upfront: I'm biased. I've always thought corporate security engineers sit at the top of the food chain on the technical side of security. These are the folks who understand every system -- or have the capacity to understand every system -- in such intricate detail that they can switch contexts mid-incident, mid-implementation, without missing a beat. They can think at the 10,000-foot view, the 5,000-foot view, the 1,000-foot view, and the 50-foot view. All in the same conversation.

## It Starts With the Network

When I think corporate security, the first thing that pops into my head is the network. And when you see a corporate security engineer who truly understands networking, they're not just reciting the OSI model. They're looking at a packet trace and telling you that 4.5.4.5 marks the start of the IP header. They're cracking open Wireshark or tcpdump and spotting a spoofed packet because the checksum is invalid. They see someone running an NMAP scan and lighting up the network like a Christmas tree.

Everything uses that network to get from point A to point B -- HTTP, gRPC, you name it (there are roughly a billion and a half protocols at this point). The corporate security engineer needs to understand the *how*, the *why*, the *what*, and the *when*. They're essentially running binary tree algorithms in their heads, recursively cutting the problem space in half: "Okay, is this a physical layer issue? Transport layer? Something weird happening with VLAN decapsulation at layer three?"

This is why the most successful people I've seen on the technical side of security tend to have this kind of deep, flexible understanding. They can navigate the technical stack *and* translate it into business terms. That dual fluency is rare and incredibly valuable.

## The Tableau Problem (and Why Business Context Matters)

Here's a real-world example. Take Tableau -- a massively popular data visualization tool that companies spend a fortune on. But Tableau doesn't exactly play nice with modern security architectures. You can't run it behind an identity-aware proxy. You can't slot it into a BeyondCorp model. If you want to support the native desktop client alongside the web browser, you're looking at two separate entry points, and the backend configuration gets ugly fast.

So what does a corporate security engineer do? They start working through the layers. Can we solve this at the presentation layer? No. Transport layer? No. Network layer? Maybe -- but that means a VPN, which means more cost and more operational overhead. They're running through all of this in the split second the question comes up. That's the job.

## Automating the Pain Away: A Snort Story

Some of my favorite projects came out of exactly this kind of problem-solving mindset. One that stands out was a Snort implementation I worked on. Snort is an intrusion detection system -- you subscribe to threat feeds, rules get generated, and when a rule trips, it records network traffic into PCAP files that you can analyze later.

The problem? At scale -- think hundreds of offices, terabytes of data daily -- the manual process of triaging alerts, hunting down PCAP files, and associating them with tickets was a nightmare. You're bouncing all over the place trying to prioritize, and it's just not sustainable.

I wanted my cake and I wanted to eat it too. So here's what we did, broken into phases:

**Phase 1: Smarter file naming.** We modified the open-source Snort code to append the signature ID (SID), source IP, and destination IP directly into the PCAP filename. Instead of one massive PCAP file you had to dig through, you got individual per-alert files with all the context baked right into the name. Log onto the host, grab the file, attach it to the ticket. Done.

**Phase 2: Get it into the cloud.** An engineer on my team took it further by dynamically mounting a Google Cloud Storage bucket so PCAPs were automatically written to the cloud. Now our SIEM could pick up alerts, match them with the right PCAP file using the SID, source IP, and destination IP, associate it with a JIRA ticket, and call it a day.

No more SSH-ing into network devices. No more managing SSH keys (which, let's be honest, is miserable). We applied the FCAPs framework I've talked about before -- Fault tolerance, Configuration, Auditability, Performance, and Security -- and came out with a system that was automated, auditable, performant, and cloud-accessible.

That's the kind of creative, full-stack thinking corporate security demands.

## Your Emails Are More Complicated Than You Think

Corporate security engineers also own the email security stack, which is a bigger deal than most people realize. If you've ever sent or received an email, there are security policies running in the background that you never see. Let me break down the three big ones:

**DKIM (DomainKeys Identified Mail):** This signs outbound messages with a cryptographic signature. When a receiver gets your email, they look up a selector in DNS, match the signature against your public key, and verify the message wasn't tampered with in transit. Pretty elegant -- until a security tool rewrites URLs to check for phishing and accidentally breaks the signature. Fun times.

**SPF (Sender Policy Framework):** This tells receivers who is actually *allowed* to send email on behalf of your domain. It's a DNS TXT record listing approved IP addresses and senders. If an email comes from somewhere not on the list, SPF can either hard fail it (drop it entirely with a `-all`) or soft fail it (flag it as suspicious with a `~all` but still deliver it). Hard fail is cleaner, but soft fail exists because a hard fail policy would break email for a shocking number of organizations that don't fully understand their own sending infrastructure.

**DMARC (Domain-based Message Authentication, Reporting & Conformance):** This is the glue. DMARC takes the results from SPF and DKIM and tells the receiver what to actually *do* -- reject the message, quarantine it to spam, or let it through. You can configure what percentage of emails to enforce on, and you can set up reporting endpoints so receivers send you data about who's trying to impersonate your domain. That reporting is gold -- you can see IPs from AWS, DigitalOcean, or Google trying to spoof you, and then take corrective action with those hosting providers.

Corporate security engineers know this stuff like the back of their hands. You'll be at a party and people are talking about sports, and we're over in the corner debating DMARC enforcement strategies. At least, I am. I'm not into sports at all.

## The .files Incident (or: How a Junior Engineer Accidentally Emailed a Competitor)

Here's a story that illustrates why this work matters. A junior engineer pulled down a `.files` repository from some random person on the internet. Buried in it was a git config file that mapped the committer email to the original author's address -- which happened to belong to someone at a *competitor*. The junior engineer didn't notice, so every subsequent commit they made used that external email. Jenkins then helpfully sent build summary notifications -- including project names, commit details, and failure messages -- straight to the competitor's inbox.

Read that again. Build summaries. Project names. Going to a competitor. Because of a git config file in a dotfiles repo.

How do you prevent Jenkins from emailing third-party domains outside your corporate domain? That's exactly the kind of question you don't think to ask until you've been burned. And that's okay. You just have to be stoic about it, build in the safeguard, and move on. You can't teach this stuff in college. You learn it by living it, at different scales, from startups to Fortune 100 companies.

## Take Care of Yourselves

I want to close with something important. Corporate security is a constant context-switching marathon. You're juggling network hardening, email policy, endpoint configuration, browser security, incident response, and whatever fire just popped up five minutes ago. The volume of work -- operational and engineering -- is relentless.

If you don't have the stamina for that, the stress stacks up. The million little things start to weigh on you. I'm coming off a pretty rough stretch of burnout myself, so I'm saying this from experience: take care of yourselves. Exercise your brain. Exercise your body. Get enough sleep. Eat something green once in a while. (Where'd you get that salad? Staples.)

## Key Takeaways

- **Corporate security is about protecting business productivity** -- brand trust, collaboration tools, build pipelines, and everything in between.
- **Deep technical fundamentals matter.** Understanding the network stack from the physical layer to the application layer lets you diagnose problems faster and build better solutions.
- **Automate the operational pain.** If you're manually SSH-ing into devices and digging through giant PCAP files, there's a better way. Think in phases and iterate.
- **Own your email security.** Configure DKIM, SPF, and DMARC properly. Use DMARC reporting to catch impersonation attempts.
- **Sweat the small configs.** A dotfiles repo with a bad git config can leak sensitive information to a competitor. Build guardrails for the things you haven't been burned by yet.
- **Watch your mental health.** Burnout is real in this field. Prioritize sleep, exercise, and actual meals.

---

And hey -- if your organization doesn't have a dedicated corporate security engineer, maybe it's time to start proposing that work stream. Be sure to reach out to your friendly neighborhood corp sec engineer and give them some appreciation for the breadth of knowledge they carry.

*Thanks for reading. This article is based on an episode of **Plan B Security** with me, Mike Mackintosh. You can find me on Twitter, Instagram, and Bluesky. Until next time -- stay secure, stay curious, and take care of yourselves.*
