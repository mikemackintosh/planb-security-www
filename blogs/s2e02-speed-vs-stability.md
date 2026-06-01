# Speed Is Stability -- You're Just Riding the Motorcycle Wrong

## Why the fastest engineering teams are the ones that invest in guardrails, not shortcuts

---

There's a Native American parable called the tale of two wolves. A grandfather tells his grandson about two wolves battling inside every person -- one representing anger, envy, greed, and regret, the other representing joy, peace, generosity, and compassion. The grandson asks which wolf wins, and the grandfather answers: "The one you feed."

That story lives rent-free in my head because it perfectly captures what I see playing out in engineering organizations every single day. Two forces pulling in opposite directions: the drive to ship fast and the need to build things that don't collapse under pressure. Speed versus stability. And the wolf you feed is the one that defines your company's future.

## The IDOR That Changed Everything

Years ago, I worked at a company where this tension was on full display. Product and engineering wanted to move fast -- get features out, make life easier for the next developer building on top of whatever they shipped. Security? That was basically me. One person. A few other folks stepped up when they could between their actual job responsibilities, but I was the dedicated security resource.

Being a single security person at a fast-growing company is like being a goalie on a team that doesn't believe in defense. You can't be in every code review. You can't sit in on every design discussion. The company is scaling, and one person simply cannot facilitate that level of oversight.

So what happened? Exactly what you'd expect. An API endpoint was returning more data than it should. An early security review had been done on the original feature, but when engineers made modifications later, those changes didn't get the same scrutiny. The attitude was basically, "We're just adding XYZ to this endpoint, update the notes." Sounds harmless, right?

Then a malicious actor registered an API token through our developer resources and started enumerating user profiles through what we now call an IDOR -- Insecure Direct Object Reference. They were pulling personal information at scale.

Suddenly I'm sitting there with my white hat on, working through logs, figuring out which endpoints were hit, which users were impacted, and which jurisdictions we had reporting obligations to. Attorney generals, state boards, individual notifications -- the whole painful playbook.

## "Why Don't We Fix the Real Problem?"

Here's the part that still makes my jaw hit the floor years later. I took the postmortem to our product and engineering teams, laid out what happened, and proposed fixes to the vulnerable endpoints. Their response? "Hey, instead of fixing that, why don't we fix the *real* problem?"

I said, "Oh, what's that?"

"Let's streamline our ability to report out to individuals and jurisdictional bodies."

Read that again. Their solution to a security vulnerability was to get *better at telling people they'd been breached*. Not to stop the bleeding -- to buy nicer bandages.

That's what happens when you feed the speed wolf. You start thinking stability means slowing down your velocity, reducing how fast you can ship features. But here's the thing about speed and stability that anyone who's ridden a motorcycle already knows: **speed *is* stability.** The faster you go, the more stable the bike becomes. And the more stable your platform is, the faster you can actually ship.

A better CI/CD pipeline, end-to-end testing, integration tests, unit tests, a solid test coverage matrix -- these aren't speed bumps. They're the engine. Companies that skip this stuff and call it "moving fast" are just building on sand and pretending the tide isn't coming.

## Three Iterations of Data Protection (and What I Learned)

When the company wouldn't fix the root cause, I had to get creative. Here's how the solution evolved through three architectural eras.

### Iteration 1: Middleware Masking (The Monolith Days)

I wrote a middleware layer that intercepted response payloads and masked sensitive fields -- bank account numbers, phone numbers, addresses. It used a combination of field name matching and regex patterns, similar to how a DLP system works. Low effort, worked great for about nine months while we were still in a monolith architecture.

### Iteration 2: SQL Proxy (The Microservices Migration)

When the company moved to microservices, the middleware approach broke. Each microservice was responsible for rendering its own views, so you couldn't have one centralized layer scrubbing everything without introducing unacceptable latency. Fair point -- I actually agreed with engineering on that one.

So I moved closer to the data itself. I built a proxy layer for SQL connections going into the database. Instead of masking data at rest (which would've broken analytics and reporting), I intercepted queries based on which service account was requesting data and sanitized the responses accordingly.

This worked for about a year. Then engineers got clever -- they started renaming response fields and remapping them in the UI to sidestep the masking. That bad wolf started showing its teeth.

### Iteration 3: The Data Presentation Layer (The Actual Solution)

The final and most effective solution was building a dedicated data presentation layer service -- essentially a gateway that owned all type definitions for response payloads. Every API endpoint's output flowed through strict struct definitions, whether the service behind it was written in Go, PHP, Ruby, or anything else.

This was the game-changer, and here's why: it gave me one authoritative place to see exactly what data was being shared, through which fields, how it was categorized, and how it moved through the entire environment. If an attack hit a specific endpoint, I could look at the presentation layer and immediately know which data was at risk.

We took it further by tying authorization directly into response payloads with a risk-based approach. Accessing your own profile from a new IP? Your data is masked 100% of the time. Coming from your usual IP and trying to update something? Unmasked in certain scenarios. Five failed login attempts before landing on the page? Everything gets masked again.

## Don't Forget the Back Office

Here's something people miss entirely: it's not just about the customer-facing application. Your internal support tools are just as critical. When a customer submits a case through Salesforce or Zendesk, a support agent pulls up their account -- payment info, Stripe accounts, personal details. If that support agent's account gets compromised (remember the Okta incidents?), you have a corporate account takeover with access to customer data.

The data presentation layer handled this too. Every consumer of the data, whether external user or internal agent, went through the same risk-based access controls.

## The Compromise That Actually Makes You Faster

Now let's talk about testing, because this is where speed versus stability really comes to a head. There is a happy compromise here. As a wise man once said, compromise is the shared hypotenuse of the conjoined triangles of success.

Every time you fix a regression because you didn't have a test, you're doing the same work twice. Count that time against your velocity. You should.

Think about tests in a simple two-by-two matrix based on impact and effort:

- **High impact, low effort** -- Write these immediately. No excuses.
- **Low impact, low effort** -- Nice to have. Good for catching subtle dependency changes or argument order shifts in upgrades. Deprioritize until you're at that level of maturity.
- **High impact, high effort** -- Prioritize these, but rethink your approach. Maybe your test fixtures are too isolated. Instead of each test spinning up a fresh database, design tests that build on each other: first verify a login fails for a non-existent user, then create the user, update the user, and verify the login succeeds. Sequencing your tests smartly can cut complexity dramatically.
- **Low impact, high effort** -- Skip them. Life is too short.

And for the love of all things in this world: **disconnect your production authentication and authorization from your testing infrastructure.** Do not require corporate service accounts to run tests. The FTC brought a case against Twitter in 2011 partly because they mixed production and test environments and didn't separate corporate from production data. Learn from their mistakes so you don't repeat them.

## Bowling Alley Security

I'm a true believer in what I call bowling alley security. Put up the bumpers so your engineers can never throw a gutter ball. If they're managing to gutter despite the bumpers, they're bowling in the wrong lane entirely.

When you combine a solid data presentation layer with risk-based authorization and smart testing, you create an environment where engineering can go fast *because* the guardrails are there. A new endpoint with new data fields? That becomes a quick PR review rather than a multi-day security audit. You're not a bottleneck anymore. You're an enabler.

Use a requirements traceability matrix to tie it all together. Every new feature documents which data fields it needs, which endpoints serve them, and how they flow through the presentation layer. Everything becomes self-documenting. Your PRDs and BRDs do double duty as security artifacts.

## Which Wolf Are You Feeding?

So here's the question I'll leave you with: which wolf are you feeding? Are you building systems that let your teams move fast *and* stay secure? Or are you sacrificing stability for the illusion of speed, only to spend twice as long cleaning up the mess?

The choice is yours. And echoing what I said last time -- the only limitation is you.

---

*Thanks for reading. This article is based on a discussion from **Plan B Security**, a podcast about everything that can go wrong in information security -- because it does. Catch the show wherever you get your podcasts, and remember: there's always a Plan B.*
