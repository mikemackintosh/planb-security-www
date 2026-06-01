# The Bridge Between Your Customers and Your Castle

**Why information security isn't just a gate at the door -- it's everything between your business and the people it serves.**

---

About six to nine months ago, I was sitting in front of an executive team trying to justify the cost of spinning up an information security program. They hit me with the classic request: "Can you explain this in the simplest terms possible?" And honestly, that question stopped me in my tracks.

See, when you live and breathe this stuff every day -- design reviews, architecture reviews, vendor assessments, responding to security events, configuring GitHub, reviewing Slack Connect invites -- you get so deep in the weeds that you forget most people have no idea what any of that means. Recency bias kicks in, and you want to rattle off the last ten things you worked on. That's not helpful for anyone.

So I leaned back in my chair, looked out the window in San Francisco, and saw the Golden Gate Bridge and the Bay Bridge. And it clicked. That's the metaphor.

## The Setup: Customers, a Castle, and a Bridge

I walked up to the whiteboard. On the left side, I drew customers -- their homes, businesses, offices. On the right side, I drew a castle. The castle is everything you're trying to protect: your data, your services, your intellectual property, the money in the bank account. All of it lives inside those walls.

For your customers to interface with your business, they need a bridge. Think of that bridge as the transport mechanism -- the internet, a VPN, a point-to-point connection, whatever it is. It's how people get from point A to point B.

Now think about the lanes on that bridge. One lane handles payments. Another lane handles data exchange -- API requests, CSV file integrations. A third lane pulls analytics and metrics. All of this is happening in parallel, all the time, between your customers and your castle.

One of the executives nodded and said, "Okay, so information security is like a gate at either end of the bridge?"

Close. But it's so much more than that. **Information security is the team responsible for making sure the bridge is safe to drive on.**

## It's Not Just About the Bridge -- It's About Everything on It

The pushback came fast: "Why not just do a pen test once a year?" That's the equivalent of checking the expansion joints and calling it a day. You're not wrong that it matters, but it's incredibly small-sighted. Information security isn't just about the bridge itself. It's about the cars driving across, what's inside those cars, and making sure every vehicle can get from point A to point B safely.

Let me break it down.

### Privacy Engineering

Privacy engineering is making sure one car can't see the occupants of another car. With privacy laws popping up across the globe -- GDPR, CCPA, and more -- you should always take the most private perspective first and then open things up intentionally to fit the needs of the product. If your platform has a communication feature, obviously users need to see who they're talking to. But that's a deliberate decision, not a default.

### Identity and Access Management

Your IAM engineers are responsible for making sure the person inside the car is who they say they are. And authorization? That's making sure they can only go down certain roads and pass certain tolls they're actually entitled to pass.

### Device Security

In a corporate model, the car might be a company-issued laptop or phone, and the occupants are your employees. How do you make sure that car is even supposed to be on the bridge in the first place? This is where your endpoint security and device management programs come in.

### Terms of Service and Legal

Want to control which types of cars are allowed on the bridge? Your terms of service, privacy policy, and legal frameworks act as the rules of the road. People have to operate within your guidelines to access your information -- period.

### Brand Integrity

You also need to make sure you're not exposing people to risk when they pull up to your toll booth. Nobody wants to drive over a bridge that looks like it's falling apart. Same deal online: nobody's putting their credit card info into a website that doesn't have HTTPS. Your brand integrity program is about making sure the bridge *looks* maintained, even when you're scrambling behind the scenes.

### Supply Chain Security

Where are you getting the materials to build the castle and the bridge? Are there vulnerabilities hiding inside the open-source libraries or vendor platforms your infrastructure depends on? Did your customer jailbreak their phone and bring malware along for the ride when they load your web app? Is their device harboring a session cookie stealer that could clone their toll booth pass and hand it to someone else?

This is why secret scanning in your codebase matters. This is why you monitor chat platforms and email for PII leaks. People will accidentally -- or intentionally -- do things they shouldn't.

### Application Security

Here's one of my favorites. Think about covered toll booths with height restrictions. You only want cars to pass through. But what about a truck with the word "car" painted on the side? Technically it *says* it's a car, but it doesn't fit under the height bar. Your application security program validates that the things coming through are actually what they claim to be.

And jokingly -- what about an El Camino? It's a car *and* a truck. This is where input validation and user verification become critical. As I've said before: **never trust user input. Always expect it to be malicious.**

If your growth team is pushing for faster onboarding or more monthly active users, they're going to try cutting every one of these checks to reduce friction. Think of FastPass or EZPass -- if that RFID tag isn't tied to a specific vehicle with plate readers backing it up, anyone can move it to any car. Is the person using it actually authorized? Who knows. That's your appsec team's problem to solve.

### Business Continuity and Disaster Recovery

What happens when a big wave knocks the bridge over? Is there another way for people to reach your castle? What if a tornado hits the castle itself? Can you rebuild it with the same data and serve the same information? That's your business continuity and disaster recovery program.

### Compliance and Risk

Your compliance and risk teams are the people standing outside with clipboards, checking every quarter that the bridge is doing what it's supposed to. Materials holding up, no stress fractures, no bricks falling off the castle. And if you're a public company, this stuff goes into your 10-Q and 10-K filings for the whole world to see.

## So Where Do You Start?

After I drew all of this out -- cars, trucks, toll booths, splash marks from vehicles in the water, the whole mess -- I erased everything. Went back to basics: hill on the left, hill on the right, castle, customers, and just a line across.

"Will your business function this way?" I asked.

"Yeah," they said.

"How long will it continue to function this way?"

They didn't know.

So I told them: **pick three.** If you had to implement three security controls, which would you choose? Here's how to think about it:

- **Collecting payment card data?** PCI compliance will inform your top priorities. The fines for getting this wrong are significant, even at low transaction volumes.
- **Operating in the EU or California?** Privacy restrictions like GDPR and CCPA will dictate where you focus first.
- **Processing sensitive data like medical billing?** HIPAA or HITRUST compliance will likely mean funding a corporate security program before you even touch application security.
- **Running a platform with microservices, media encoding, or AI processing?** Invest in cloud security first, then follow up with application security -- service-to-service authentication, input sanitization, the works.
- **Integrating with vendors who want SOC 1 or SOC 2 reports?** You'll need specific controls tested and certified before those partnerships move forward.

And no, you don't need a thousand engineers to pull this off. The industry loves throwing around ratios of security engineers per developer, but what matters is how smart you are with implementation. Maybe your appsec engineer builds an SDK that bakes security in so developers can't get it wrong. Maybe they run capture-the-flag exercises and on-the-job training that shows developers what happens when you skip the checks. You can do a lot with a small, sharp team.

## The Bottom Line

At the end of the day, it's just a bridge connecting point A to point B. It's up to you to decide what you care about and how much you want to protect your customers. There's a security metaphor for every piece of that bridge -- and that's exactly why this work matters.

---

*Thanks for reading. This article is based on a conversation from Plan B Security, hosted by me, Mike Mackintosh. If you found this useful, check out the rest of the series -- and stay tuned for the next one, where we dig into building a detection and response program. Think of it as the emergency services responding to car crashes on the bridge. Until next time, stay safe out there.*
