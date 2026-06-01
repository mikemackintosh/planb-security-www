# Selling Security Through Storytelling

## Why the best security leaders aren't pitching -- they're telling stories that make people care

---

Let me be real with you. You can have the most technically sound security strategy on the planet, backed by data, aligned with frameworks, wrapped in a neat little bow -- and it will still die on arrival if you can't get people to care about it. I've watched it happen over and over again. Brilliant security professionals walk into a room with the right answer and walk out with nothing because they couldn't sell it.

And selling it? That comes down to storytelling.

## Everything You've Been Through Is Practice

Before I get into the mechanics, I need to set the stage. Every experience in your life -- good, bad, painful, mundane -- is teaching you how to communicate. You just have to be paying attention.

Someone I worked with about a year ago came up to me and asked, "How did you learn to communicate the way you do?" And I told them the truth: I learned through my divorce. Not exactly the answer they were expecting. But when you go through something like that -- something contentious and emotionally draining -- you learn to put your ego aside. You learn to separate emotion from fact. You learn that winning isn't always the goal. And most importantly, you learn that how you say something matters just as much as what you're saying.

Every night during that period, I was reflecting. How could I have said that differently? How could I have been clearer? How do I become the person I actually want to be instead of just reacting? That practice -- that constant, uncomfortable self-examination -- is what built my communication skills. Not a course. Not a book. Life.

And here's the thing: you're getting those same reps every single day. You just might not realize it.

## The F***s You Give Are a Finite Resource

Let's talk about capacity for a second, because this matters more than people think.

You wake up with a limited number of f***s to give in a day. Let's say it's 100. But you slept poorly, so you're starting at 80. You can't find your favorite socks -- 75. Your neighbor parked crooked again -- 55. Starbucks is out of your pumpkin spice latte and all they've got is the iced pumpkin cream chai tea thing -- 40. And it's only been two hours.

Now you've got to spread that 40 across the rest of your day. Meetings, decisions, conversations that require patience. Being able to manage that is a skill. An absolute skill. And it doesn't come overnight. But every one of those little draining moments is an opportunity to practice centering yourself and communicating clearly even when you're running on fumes.

That's the foundation of storytelling. You can't tell a compelling story when you're emotionally hijacked by your own frustration.

## Stop Saying "I Think" and Start Knowing

One of the fastest ways to undermine your own story is to fill it with qualifiers. "I believe," "I think," "probably around a thousand users will be affected."

That's not concrete enough. If you don't have the number, say so. "I don't have that number yet. I'm going to find it and come back to you." That honesty builds more credibility than a guess ever will.

And while you're at it, make sure everyone is speaking the same language. I started building a language dictionary for different teams because I watched the same meeting derail three times over the word "MFA." To the security team, MFA means non-phishable authentication by default. To IT, it might mean SMS codes or TOTP apps. Someone says "WebAuthn rollout" when we're actually doing a broader MFA rollout. Now you're burning cycles just getting back on the same page.

Clarity kills confusion. This is why clarity is one of the four C's of cybersecurity I talk about. When you're concise and clear, you stop wasting everyone's time -- including your own.

## The Canterbury Tales of Security

Stay with me here. Think about the Canterbury Tales -- Chaucer's collection of 24 stories told by pilgrims on their way from London to Canterbury. Knights, cooks, monks, priests, each with their own perspective and their own story.

When I read these in high school -- shoutout to Mr. Eng's class -- the assignment was simple: pick a story that resonates with you and report on it. I picked the Miller's Tale because it was hilarious and wildly inappropriate, which is exactly what a teenager gravitates toward. But what fascinated me more was *why* people chose the stories they did. Everyone gravitated toward the tale that connected with something they already cared about.

Security storytelling works the same way. You have to figure out what your audience cares about and lead with that. Nobody is going to care about your story just because *you* care about it. They're going to care because you made it about *them*.

## The Three Pillars of a Security Story

Every security story needs three things:

**1. The Goal.** What are you trying to pitch, sell, or bring awareness to? Get crystal clear on this before you write a single word.

**2. The Audience.** Who is going to read or hear this? Leadership? The board? A committee? That one person who fights you on everything? And if you want a real challenge -- write it for all of them.

**3. The Call to Action.** What do you need them to *do*? Sometimes it's simple: complete something by a specific date. Sometimes it's massive: reprioritize the next two years of work. Either way, the call to action is where you make the audience emotionally invested in the outcome. You want them to remember your data because they felt something when they heard it.

## Putting It Into Practice: The IAM Story

Let me walk you through how this actually works. Say you need to move your company from basic CRUD-style permissions (create, read, update, delete) to relationship-based access controls. I'm a huge proponent of ReBAC because it goes deeper -- instead of "this support agent can read all customers," it says "this support agent can only read *this one customer's* data, and only because a support ticket was created."

If that agent's credentials get compromised, there's nothing to leak. No relationship, no access. It's elegant and it scales.

But here's the problem: if you walk into a leadership meeting and say "stop everything and implement relationship-based access controls," the answer is going to be a very fast no. So you tell a story instead.

**Lead with user stories.** Put these right at the top of your document -- they're the hook:

- 32 support agents accessed 95% of our customer base without a ticket or case associated.
- Relatives of 43 employees received death threats from attackers demanding access to customer accounts.
- There's been a 23% increase in bribe attempts against our support org.
- The COO's account was compromised, leaking their home address and personal phone number.

That's your catalyst. You've captivated your audience before the technical story even begins.

**Then explain how you got here.** Don't trash past decisions -- they were probably right for the company at that stage. But connect the dots to show why they won't scale going forward.

**Make it personal for the reader.** Get the engineers asking themselves: do *I* want my account compromised? Do *I* want my home address leaked? If there's a payout system, do *I* want my money stolen? Now they're personally invested. Now they're your champions, pushing for change from the bottom up.

**Keep your own emotion out of it.** The second people sense bias, shields go up and they stop reading. Let the data and the user stories do the emotional heavy lifting.

**Close with a clear, realistic call to action.** You don't need to specify the tool or the schema. Just show the path: the next new service implements it from scratch as a proof of value, the security team builds a client library, and development teams roll it out on rolling sprints. Quantify the developer time investment. Then compare it to the cost of *not* doing it -- the breach, the bad press, the regulatory fallout.

And if you really want to seal it? Put them in a double bind. Give them two options, both of which lead to your outcome. "We implement this and the company scales securely. Or we don't, and someone has to explain to the COO why protecting their personal information wasn't a priority." As David Wallace once said about Michael Scott: "Michael is doing something right. And in this economic climate, no method of success can be ignored."

## The Four Square: Make Sure They Don't Forget

Once you've sold the story, you need to keep it visible. I use something I call the Four Square, inspired by the Eisenhower matrix but modified to fit how security teams actually operate:

- **Top Left -- Keep the Lights On:** Mission-critical work. If this doesn't happen, the business fails. Quantify the volume.
- **Top Right -- Urgent:** Things people need from you today that aren't in your core mission but can't wait.
- **Bottom Left -- Important:** What your team committed to delivering. This is where leadership tracks your progress and where headcount funding lives.
- **Bottom Right -- Up Next:** What just got completed and what's next in the queue. Keep your backlog honest -- if something's been sitting there for years, cut it loose.

Here's the power move: do a Four Square for *other* teams too. Show them your interpretation of their priorities. They'll probably say you're way off. Good. That's the conversation starter. Now you're driving alignment without anyone having to sit through another OKR workshop.

## Actionable Takeaways

1. **Strip the qualifiers.** Replace "I think" and "I believe" with data. If you don't have the data, say so and go get it.
2. **Build a shared language.** Create a dictionary for your cross-functional teams so MFA actually means the same thing to everyone.
3. **Structure every pitch with Goal, Audience, and Call to Action.** No exceptions.
4. **Lead with user stories, not technical requirements.** Hook people emotionally before you explain the architecture.
5. **Use the Four Square** to maintain visibility and drive alignment across teams.
6. **Keep your emotion out of the document.** Let the facts invoke the emotional response. The moment they see your bias, they'll disengage.
7. **Practice every day.** Every frustrating interaction is a rep. Reflect on it. Ask yourself how you'd handle it differently next time.

---

Storytelling has been around as long as humans have -- from cave paintings to blogs to, well, podcasts. It's the oldest tool we have for getting people to care about something. And in security, where every initiative requires buy-in from people who'd rather be doing literally anything else, it might be the most important skill you develop.

Thanks for reading. This one's based on Episode 10 of **Plan B Security**. If you want to hear more, come find me -- I'm Mike Mackintosh, and I'll keep putting these out as long as you keep showing up.
