# Benefit vs. Burden: Slaying the Dragon of Data Negligence

## Why "reasonable security" is the legal standard that should be driving every decision you make -- and a simple framework for talking about it with your business leaders

---

Do not read legal enforcement actions before you go to bed. Trust me on this one. I made that mistake on a Saturday night and ended up in some kind of lucid dream that felt like an episode of *Are You Afraid of the Dark?* -- the 90s Nickelodeon anthology series that traumatized an entire generation of kids. Except instead of goblins and evil knights, the walls of the labyrinth had signs that read "BEWARE OF NEGLIGENCE," and the dragon was breathing fire made of legal consequences and reputational damage.

But here's the thing about labyrinths -- they have a way out. And so does the legal mess that comes with failing to protect your data. You just need to know the path.

## The Leaky Law Firm: $200K for the Basics

Let's start with a real case. New York Attorney General Letitia James secured roughly $200,000 from the law firm Heidel, Pitoni, Murphy & Bach (HPMB) for failing to protect personal and healthcare data. The compromise affected approximately 114,000 patients, including over 60,000 New Yorkers.

The failures? They read like a "what not to do" checklist:

- **Failure to apply timely patches.** Their Microsoft Exchange email server had a known vulnerability sitting there, unpatched, like an unlocked front door with a neon "COME ON IN" sign.
- **Inadequate risk assessments.** No regular evaluations of their system's security. They probably thought nobody would bother coming after them.
- **Lack of encryption.** Private information on their servers wasn't properly encrypted. Now, those of you who've been in this field long enough know that "encryption" gets thrown around like a magic word. But when you don't even have the basics covered, it matters.
- **Poor data minimization.** For a legal firm -- a *legal firm* -- you'd think data retention would be top of mind. They held onto data longer than they needed to.

HPMB paid the $200,000 and had to adopt a bunch of corrective measures. Standard stuff. But here's what I want you to actually take away: that fine works out to about **$3.33 per compromised New York resident**. Let that sink in.

## The Hospital That Let Tracking Tools Run Wild: $300K

On December 27, 2023, AG James also secured $300,000 from New York Presbyterian Hospital for disclosing patients' health information through their website. The culprit? Advertising tracking tools that collected and shared private information with third-party tech companies when visitors searched for doctors or booked appointments.

The sensitive health data was exposed through URL parameters -- query strings sitting right there in the address bar. That means anywhere between the user's browser and the destination service, if someone is logging URLs, that information is being captured. That's a nightmare to clean up.

The failures here:

- **No vetting of third-party tracking tools** before deployment. They just slapped them on the site without understanding what data was being collected.
- **Sensitive data in URL parameters.** It wasn't buried in a POST body where it might avoid access logs. It was right there in the URL for anyone in the chain to see.
- **Delayed response.** It took a *journalist's report* to prompt NYP to disable the tracking tools. Only when they were pressured did they take action.

Now take a moment and think about your own organization. How many third-party tools and trackers are running on your sites? Do you know exactly what data they're collecting and where it's going? I'd bet the answer is no. And it's not just consumer data you need to worry about -- it's the metadata associated with someone simply visiting your properties.

## The Real Question: Would They Have Changed Anything?

Here's why I picked these two cases specifically. The fines are relatively small. Not hundreds of millions. Not tens of millions. Not even millions. Hundreds of thousands.

So put your business hat on for a second and take off that security practitioner hat. Do you think these organizations would have changed anything if they could go back in time? The answer is probably not. They likely made more money from the practices that led to these violations than the fine cost them.

And that's the uncomfortable truth we need to talk about.

## The Benefits vs. Burdens Framework

I want you to picture something. Draw a square in your mind. At the top, write "Growth." At the bottom, write "Risk." Now draw a horizontal line somewhere across that square, dividing it into two rectangles. That line represents how much your organization focuses on growth versus reducing risk.

My favorite part about this exercise is that when I've done it with people in the past, one person drew a squiggly line. They said it couldn't be a straight cut because the balance isn't uniform -- it shifts depending on leadership, product lines, market conditions. Fair point. It's messier than a clean split.

Now on the left side of the square, write "Benefit." On the right, write "Burden." That horizontal line you drew? That's your **risk threshold** -- the point at which the benefit to the business outweighs the risk.

Here's where it gets interesting. You actually need *two* lines in that square:

1. **Your risk tolerance level** -- where your organization currently operates.
2. **Your line of reasonability** -- what would hold up as "reasonable security" in a legal context.

These two lines are almost never in the same place. Your job is to close the gap between them. Whatever delta exists between your reasonability line and the top of that square? Color it red. That's the growth you can't safely pursue right now.

## What "Reasonable" Actually Looks Like in Court

Let me give you a case that makes this concept crystal clear. In *Harleysville Insurance Company v. Holding Funeral Home, Inc.*, a fire loss dispute turned into a cybersecurity lesson nobody expected.

Nationwide, the parent company of Harleysville Insurance, uploaded video surveillance footage of a fire scene to Box -- just a hyperlink. No password protection. Available to anyone with the link. The defense counsel found it and used it.

Harleysville argued the disclosure was involuntary -- that the other side shouldn't have accessed it. But the Virginia Supreme Court drew an important distinction between *involuntary* and *inadvertent*. Involuntary means someone got access through criminal activity or bad faith. Inadvertent means you knowingly but mistakenly provided access by failing to implement sufficient precautions.

The file sat publicly on the web for **six months** before anyone noticed. No password. The court ruled that attorney-client privilege was waived because Harleysville didn't take reasonable steps to prevent the disclosure or fix the error. Under federal law, work product protection was also waived because sharing the file to Box was an intentional act, and they did nothing to rectify it.

The word "reasonable" keeps coming up for a reason. It's the legal standard that everything hinges on.

## Raising the Bar, One Control at a Time

Every security control you implement pushes that line of reasonable security higher. Here's how to think about it practically:

- **Send login notifications.** Every time an account gets accessed, let the user know. If someone's logging in from Abu Dhabi but all their traffic has historically been from Boston on a Mac, and suddenly it's a Windows XP machine overseas -- flag it.
- **Implement risk-based authentication.** You don't need to block every anomaly, but you need to be taking reasonable steps to notify users of suspicious behavior.
- **Invest in security awareness training.** Make it harder for people to accidentally do the wrong thing.
- **Vet your third-party tools.** Understand what data they're collecting before you deploy them.
- **Patch your systems.** I shouldn't have to say this in 2026, but here we are.

The business will always push back. They want to focus on growth. That's their job. Your job is to arm yourself with data -- enforcement actions, competitor incidents, industry trends, dollar amounts -- so you can speak with confidence when you challenge their decisions.

## Your New Communication Tool

If you're in a hyper-growth startup where everything is ship, ship, ship, build, build, build, money, money, money -- draw yourself a Benefits vs. Burdens chart. Use it in conversations with business leaders and product owners. Show them: "This is as far as we can safely take this idea given the risk we're carrying."

Want to make it even more powerful? Attach a threat model exercise. Show them emerging threats and attack vectors from your industry. Use frameworks like MITRE ATT&CK to illustrate potential attack scenarios. CISOs and senior security leaders are supposed to be **qualifying unrealized risks** -- identifying and evaluating threats that haven't materialized yet. That's hard to justify when the threats seem hypothetical, but enforcement actions from the FTC, the New York AG's office, and court rulings give you real dollar amounts and real consequences to point to.

## Actionable Takeaways

1. **Draw your Benefits vs. Burdens chart.** Identify where your risk tolerance sits versus where reasonable security demands you be. Close the gap.
2. **Read enforcement actions.** The FTC website, the NY Attorney General's site -- these are goldmines of lessons learned from other people's mistakes. Put together dollar amounts, common trends, and gaps that companies were held accountable for.
3. **Audit your third-party tools.** Map what data they collect and how it flows. URL parameters, tracking pixels, analytics scripts -- know what's happening on your properties.
4. **Set the bar for reasonable security.** Patch management, encryption, risk assessments, data minimization, employee training. None of this is new. But "not new" doesn't mean "already done."
5. **Use real cases to justify your security budget.** A $200K fine might not scare the C-suite, but the reputational damage and the consent decrees that follow? That's a different conversation.

---

In the realm of data protection, an ounce of reasonable security is worth a pound of litigation. Set the bar, protect the data, and then profit.

Stay secure, stay informed, and keep those digital locks tight.

*-- Mike Mackintosh, Plan B Security*
