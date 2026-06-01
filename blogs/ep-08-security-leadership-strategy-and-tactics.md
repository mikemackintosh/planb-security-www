# Stop Building Security Strategies Nobody Cares About

**How to use risk scenarios, common language, and a little salesmanship to actually get buy-in for your security program**

---

You know what the biggest failure mode is for security leaders? It's not a missed vulnerability or a botched incident response. It's building a strategy that nobody executes on. You can have the most technically brilliant security roadmap in the world, but if your stakeholders don't understand it, don't buy into it, and don't see themselves in it, it's just a PDF collecting dust in a shared drive somewhere.

So let's talk about how to actually build a security leadership strategy that gets traction -- and the tactics to make it real.

## The Three-Circle Problem

Picture a Venn diagram with three circles: **productivity**, **security**, and **compliance**. Your job as a security leader is to live right in the middle where all three overlap.

Now, I know there are folks who don't see compliance and security as the same thing, and folks who do. That difference usually comes down to the maturity of the program they've been a part of. In a really good organization, those two circles overlap completely. But productivity is always going to be the balancing act -- making sure you're enabling the business to move fast while keeping things secure and accountable.

Here's the thing: without business, we don't have jobs. Increasing the company's velocity should be your number one focus. And the security circle? It's all about **making it harder to do the wrong thing and easier to do the right thing**. If somebody gets a phishing email, they should be able to click that link without it nuking your organization. That's the standard you should be designing toward.

Compliance is about accountability. Making sure people are doing the right thing when they're supposed to, building the policies and programs to teach them what the right thing is, and then collecting evidence to prove it's actually happening.

As Stanley said, "Life is short. Try fast and leave a sexy corpse." That's one of my mottos.

## Speak the Language of Money (Enter: CIDR)

One of the first things your strategy needs is a **common language**. If you can't translate security risk into business terms, you're going to lose every budget fight and every prioritization discussion.

I use something I call **CIDR** -- Control, Impact, Threat, Expense, and Risk. It's a structured way to take scenarios your business has experienced (or could experience) and turn them into something a CFO can actually feel in their gut.

Let's walk through a quick example.

**Scenario: Over-Granted Access**

- **Control:** Fine-grained access controls weren't configured, allowing an untrained staff member to delete data.
- **Impact:** Thousands of records destroyed.
- **Threat:** Material financial data is deleted, preventing on-time regulatory reporting.
- **Expense:** Engineers wait an average of one week for access to new tools. Ten blocked engineers, 40 hours each, at $100/hour = **$40,000/week** in lost productivity.
- **Risk Tolerance:** The business decides it's cheaper to over-grant access than to properly review every request.

Now merge that into a narrative: *"Thousands of data records were destroyed due to untrained staff being granted access in order to save $40,000 in lost productivity."*

That sentence hits different in a boardroom.

**Scenario: Unpatched Vulnerability**

- **Control:** Vulnerability management SLAs weren't followed, allowing a maliciously crafted HTML page to exploit the WebP vulnerability.
- **Impact:** Over 100,000 user records exposed.
- **Threat:** A drive-by attack leads to customer data exposure via an unpatched system.
- **Expense:** Applying the patch costs $25,000 in lost productivity (500 people x 30 minutes x $100/hour).
- **Risk Tolerance:** Forcing restarts to patch is "too costly" outside the standard SLA.

Merged: *"Over 100,000 user records were exposed due to failure to comply with vulnerability management SLAs in order to save $25,000 one time."*

Now layer on the reality: $350,000 in outside counsel fees, litigation, identity theft protection, and regulatory fines. Suddenly that $25,000 in lost productivity looks like a bargain. And that's the point -- you're giving the business the data to make the right call.

Here's my pro tip: go back and run CIDR on incidents you've already had. Use real-world data to build trust in the approach. When the numbers come from your own history, they're a lot harder to argue with.

## Turn Dollar Amounts Into Capital OKRs

Here's where it gets fun. Those dollar amounts you calculated? They're not just scare tactics. They're your ticket to contributing directly to the company's financial goals.

As a cost center, security teams are usually at the mercy of the profit centers. But when you can say "investing in this area drives this number down, which moves revenue into profit," you've just changed the conversation entirely.

I'm a huge nerd when it comes to OKRs, and I've found that a lot of companies struggle with them because they lack alignment to their actual business values. That's why I came up with **IEVs -- Initiatives, Expectations, and Values**.

- **Initiatives** are the big things driving your strategy: implement least privilege, reduce phishability, drive up brand trust.
- **Expectations** are how you measure how much they matter. Not boolean pass/fail -- actual meaningful metrics.
- **Values** are your North Star. This is the hill you'd die on. What keeps you focused when priorities shift.

The biggest mistake I see with key results is that people already have the solution in mind. They're trying to reverse-engineer a metric to justify the thing they already want to build. That's backwards. Start with the outcome you need, then figure out the best way to get there.

## Tactics: Where Strategy Meets the Real World

Once your strategy is set and your expectations are defined, it's time to execute. Tactics are your project work -- extremely actionable and time-bound.

One piece of advice: **never pin yourself to an exact date**. Give a range. "By May 2024" is better than "on May 14th." Business priorities shift constantly. Give yourself a sandbox for the unknowns while still committing to a deliverable window.

Let's say your objective is to **reduce account takeovers by 20%**. Here are three tactics:

1. **Implement non-phishable MFA.** Add WebAuthn and passkey support. Move away from SMS and phone number verification. If someone accesses a support tool without a trusted device, certain functionality gets disabled. This is the single biggest lever you can pull for self-service account security.

2. **Empower your support staff to do the right thing.** Sometimes this is as simple as: don't let anyone call in and make a change. The support agent calls them back at the known phone number on file. It's not foolproof, but it adds a meaningful roadblock without overcomplicating the process.

3. **Measure the financial impact.** Track account takeover reduction quarter over quarter. Show the dollar amount of fraud reduction month over month. Connect it all back to the CIDR scenarios and your capital OKRs. Show the business why it matters in their language.

On the compliance side, push toward **active control monitoring** instead of manual reviews. Reviews and audits are only as good as the data you're collecting and the story being told. As Michael Scott would say... well, a lot of the folks writing controls aren't using the actual systems. They don't understand how it works. They're writing controls just to write them. Active monitoring lets you catch deviations in real time, investigate them, and either remediate or file an exception to your risk register. Move on.

When you do this right, the three circles start overlapping beautifully. You're not blocking access -- you're actively monitoring controls as written. Security learns about edge cases and unexpected behavior, feeding your detection engineering team. Compliance gets 100% coverage instead of sampling. And productivity goes up because people aren't sitting around waiting for access approvals.

## Sell It Like Your Budget Depends on It (Because It Does)

The last piece -- and honestly, this might be the most important one -- is selling your strategy. You need to put on your salesperson hat.

Find a way for each business unit owner to feel **personally attached** to what you're implementing. For some, it's about increasing velocity. For others, it's about money. For product teams, it might be about building better products -- like going passwordless with WebAuthn, which simultaneously improves account security and reduces login friction.

Take your risk scenarios. Use them to inform your strategy. Find ways to measure impact, measure expense, and show what it costs to maintain the status quo. Then find champions -- people who relate to your strategy and will help you sell it across the organization.

With real data behind you, it's hard to say no. But always know your audience and tailor the message to whoever you're presenting to.

## You're a Shepherd, Not an Engineer of Weather

If I could leave you with one thought, it's this: as a security leader, you are a shepherd. It's your responsibility to make sure the sheep are protected, fed, and healthy. You pick the pastures where they graze. You don't create the sheep. You don't determine the weather. You can't make free will choices for them. But when they trust you, they will follow you.

Embrace the mosaic of problems in front of you and focus on solving those -- instead of trying to engineer solutions to the wrong problems.

## Key Takeaways

- **Use the CIDR framework** (Control, Impact, Threat, Expense, Risk) to translate security risk into business language.
- **Quantify everything.** Dollar amounts tied to real scenarios are your most powerful tool for getting buy-in.
- **Align security work to business OKRs** by showing how risk reduction directly impacts the bottom line.
- **Consider IEVs** (Initiatives, Expectations, Values) as an alternative to traditional OKRs for better strategic alignment.
- **Tactics need time ranges, not fixed dates.** Give yourself room for the unknowns.
- **Move from manual control reviews to active monitoring** for better compliance coverage and faster business velocity.
- **Sell your strategy** by making it personal to each stakeholder. Find champions and let the data do the heavy lifting.

---

And hey -- make sure you're taking care of yourself. Like they always tell you on the airplanes, put on your oxygen mask before assisting other passengers. Same thing applies to your life.

*Thanks for reading. This post is based on a discussion from **Plan B Security** with me, Mike Mackintosh. If you found this useful, check out the podcast for more on building practical, business-aligned security programs. Until next time -- stay rested, stay sharp.*
