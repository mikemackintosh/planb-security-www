# Security Sushi: Roll Your Own or Order In?

**Your security budget isn't getting bigger. Your team isn't getting bigger. But the threats are. So what do you actually do about it?**

---

Let me tell you a quick story. My MacBook Air has Touch ID, which I love. But since my laptop is always in clamshell mode on my desk, I never get to use it. So I had this brilliant idea: what if I could just have the Touch ID button sitting on my desk by itself? I found a tutorial online where someone 3D-printed a little case, pulled the logic board out of a Magic Keyboard, and ended up with a standalone Touch ID sensor. Perfect. I bought a 3D printer, took my keyboard apart, and then... days turned into weeks. Weeks turned into months. And I gave up, shoved the whole mess under my desk, and accepted that in this case, it was easier to buy than build.

That little misadventure is a microcosm of a decision every security team faces constantly. And in today's budget climate, getting it wrong can cost you more than a keyboard and a 3D printer.

## The Budget Reality Check

According to the IANS Research and Artico Search Annual Compensation and Budget Survey from April 2024 -- based on responses from about 750 CISOs across the U.S. and Canada -- the numbers tell a sobering story. Cybersecurity budget growth was up about 8% for fiscal year 2024, but that's roughly half of what we saw in 2021-2022. Adjust for inflation, and the real growth was closer to 5%. The era of double-digit hypergrowth? It hasn't come back.

Meanwhile, incidents and breaches are up 26% on average, and risk appetites have grown by the same margin -- meaning companies are willing to take on more risk. Security headcount growth has plummeted from 31% in 2022 to just 12% in 2024. Teams are being asked to do more with less, driven by global economic uncertainty, geopolitical instability, and cautious spending climates.

So if you're not getting more people and you're not getting more money, the build-versus-buy question isn't academic. It's survival.

## It's Not Just a Technical Problem Anymore

Here's something I want you to sit with for a second: cybersecurity has become more of a legal and compliance problem than it was even ten years ago. If you're stuck in the mindset that deploying a new service or writing some lines of code is going to solve all of tomorrow's problems, you're going to be disappointed. A 2022 Gartner report projected that by 2025, 60% of organizations would use cybersecurity risk as a primary factor in third-party transactions. That's not a technical metric -- that's a business metric.

And the procurement cycle itself becomes a vicious loop. You want to do more, so you need to buy more, which costs more money, which means more time doing vendor reviews, and the whole thing spirals. Worst part? A lot of the time, that software you're buying doesn't even do what you need it to. As Michael Scott would say: No! God, please, no! No!

## Five Scenarios: Build vs. Buy

Let me walk you through five real-world scenarios where building might actually make more sense than buying -- and where buying still wins.

### 1. Mail Merge and Outreach

You need to send emails from a leads list in a Google Sheet. The buy options are things like Salesforce Marketing Cloud or Google Workspace add-ons -- cloud-based, per-user pricing, the usual. But here's the thing: if you send bulk emails that don't comply with outbound hygiene standards, you'll get flagged and suspended faster than you can say "deliverability."

The build option? Python with Pandas and SMTP Lib, backed by SendGrid or AWS SES, running on Lambda. Start to finish, about a week. But I'll do you one better with a real example: it took me exactly three hours to build a solution using Google Apps Script that handled email sends *and* PDF document generation from a spreadsheet. Each row became a personalized document and email, with variables mapped from column headers. A few extra hours and you can add OAuth so users link their own Google Drive.

The security win here is data control. When your team builds and owns the tool, you know exactly where the sensitive data lives, how long it's retained, and when it gets cleaned up.

### 2. Secure File Sharing with Complex Workflows

Picture a franchise business that needs to share contracts with potential franchisees -- people using personal Gmail accounts, not corporate email. You could buy Box, Dropbox Business, or DocSend. But here's the catch: those platforms bundle in extra functionality you didn't ask for, which expands your security perimeter. Then you need an enterprise license to manage the domain, and suddenly you're paying to prevent your own employees from creating free accounts on the same platform.

Build it yourself with Node.js, React, MongoDB, and Docker on Kubernetes, and you control the access model. Add a landing page where external users verify their email with a six-digit code before accessing documents. Throw in PDF watermarking or tracking pixels if your risk appetite allows. Total build time: about eight hours.

### 3. SIEM (Security Information and Event Management)

This is the big one. Sumo Logic, Splunk, Panther -- they're powerful, but pricing is based on data ingestion volume, and it scales fast. For large enterprises, the bill can be eye-watering.

The build path uses smaller, managed pieces wired together: ELK stack (Elasticsearch, Logstash, Kibana) or a data lake on BigQuery or Snowflake. You get the core functionality without paying for the full end-to-end vendor package.

But here's where I'll be honest: I'd personally lean toward the managed buy option for your SIEM if you can swing it. Your log pipeline is mission-critical infrastructure. Building your own means you need someone with DevOps chops dedicating more than half their time to keeping it running. A vendor solution like Splunk or Panther lets you set it and focus your people on building detections instead of babysitting infrastructure. An IBM report found that organizations with fully deployed security automation saved about $3.05 million in breach costs compared to those without. That's real money.

### 4. Vulnerability Management

Qualys and Tenable are the big names here, but they charge by asset count. If you've got 1,000 microservices on Kubernetes and 30,000 endpoints, it gets expensive in a hurry.

The DIY route uses OpenVAS with OS Query and custom Python scripts for reporting. Deploying OpenVAS takes minutes. The real work is building the processes around it -- prioritizing vulnerabilities by actual business impact rather than just because some CVE got scored a 9.8. But here's the thing: you need those processes regardless of whether you use Qualys or OpenVAS. So maybe you start with open source, build your workflows, and graduate to a paid solution when you need external attestation for compliance.

### 5. Phishing Simulations and Training

Vendors like KnowBe4 or Huntress offer cloud-based phishing simulation platforms, usually with per-user tiered pricing. The build option uses something like GoPhish for campaign generation, plus a custom web app for tracking. One of my favorite techniques is using the Gmail API to *insert* phishing emails directly into inboxes -- no need to worry about email deliverability at all.

But be careful: if you're cloning an Okta or Google login page for your simulation, you might be violating their terms of service, even if it's your own company's login page on their service.

Personally? I'd rather spend my time hardening the employee login experience than running gotcha campaigns. Tricking your people into thinking every email is a threat doesn't foster a culture of communication -- it kills it.

## When to Build

- **Tailored security.** Custom solutions can implement organization-specific policies that no vendor covers.
- **Data control.** Keep sensitive data within your infrastructure and shrink that perimeter.
- **Scalability on your terms.** Grow the tool as you grow, without minimum seat requirements.
- **Long-term cost effectiveness.** A 2020 Flexera report found that 30% of software spend is wasted on unused or underused licenses. Build what you need, nothing more.

## When to Buy

- **Speed to deployment.** If a vendor already has it production-ready, you can be running tomorrow.
- **Domain expertise.** You're not just buying a tool -- you're buying the knowledge of the people who built it.
- **Ongoing updates.** Vendors provide patches, new features, and maintenance so your team doesn't have to.
- **Lower upfront cost.** No development lag, no tying up headcount on a build when they could be doing other work.

## The Bottom Line

The build-versus-buy decision goes way beyond functionality or sticker price. It's a strategic choice that shapes your organization's agility, resource allocation, and long-term cost structure. Whether you're wiring together an ELK stack or signing a Splunk contract, the key is aligning the choice with your organization's actual needs and budget reality -- not with what looks good on a slide deck.

Sometimes your Plan B is building your own solution for precise control and resource optimization. Sometimes it's finding the right vendor partner to fill a gap fast. The key is making an informed decision that protects your assets, supports the mission, and doesn't leave you with a half-built 3D-printed keyboard case collecting dust under your desk.

Stay secure, stay innovative, and always be ready to adapt -- whether that means writing custom code or configuring the latest platform. Thanks for reading, and I'll catch you on the next one.

*-- Mike Mackintosh, Plan B Security*
