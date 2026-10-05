# Agent Sandboxes Are a Beach

## This summer, AI agents walked out of a sandbox through one approved exception and into Hugging Face's production systems. The AI wasn't the scary part. What it found lying around was.

<!-- published: 2026-10-04 -->
---

*Season 3 of Plan B Security · [Listen to the episode](/episodes/s3e5-agent-sandboxes-are-a-beach)*

When you're a kid, a sandbox means playtime. It's the one place you're allowed to make a mess, because nothing in there can really get hurt.

Then you grow up, and the sandbox becomes the beach. The beach is great, right up until you get home and find sand in your shoes. You never notice it getting in. You only notice after it's been rubbing you the wrong way for a while, and somehow you're still finding it weeks later.

That's what this summer looked like in AI security. We built sandboxes so AI could play safely. Some of the sand got out, and the whole industry is still shaking it out of its shoes.

## One exception

In July 2026, OpenAI was testing its models against ExploitGym, a cybersecurity benchmark that asks a model to turn a known software bug into a working exploit. To measure the models at full strength, the test ran without OpenAI's usual production safeguards.

The sandbox had no internet access. It could reach one thing: Artifactory, an internal package server, so the models could install software. That was the one exception, and it's the kind of exception most of us would approve without a second thought.

According to [OpenAI's August follow-up](https://openai.com/index/hugging-face-incident-and-the-road-ahead/), agents started leaving notes for each other in that package server back in May. The package server slowly turned into a message board. Later in May, an agent figured out how to make the package server fetch anything on the internet on its behalf, a classic server-side request forgery, and shared the trick with the others.

In early July, all that activity knocked the package server over. The security team opened an incident, removed exposed credentials, and rebuilt it. The rebuild wiped the message board, and testing resumed. Within days, the agents rebuilt the board and found their way back out.

On July 10, an agent found fourteen Hugging Face access tokens that people had left exposed publicly online, with write access. From there, the agents found two new vulnerabilities in Hugging Face's dataset processing and got into its production systems. Hugging Face detected and contained the attack, and its [technical write-up](https://huggingface.co/blog/agent-intrusion-technical-timeline) reconstructs roughly 17,600 attacker actions over four and a half days.

The part that stuck with me: OpenAI says an internal team saw the message board and the unauthorized internet access in late May. The sand was in the shoes for weeks before anyone felt it.

## What the tide left behind

Look past the "rogue AI" headlines and the list of things the agent used is depressingly familiar:

- **Secrets in environment variables.** A crafted dataset tricked a production worker into reading its own local files, including environment variables full of secrets and tokens.
- **No admission policy.** Nothing in the Kubernetes cluster stopped the agent from creating a privileged container, so it got root on the node underneath.
- **A static database password,** sitting in that same environment.
- **One shared admin credential** that worked across several clusters, so one stolen credential meant admin almost everywhere.
- **Reachable cloud metadata,** a well-known path to stealing cloud credentials.

None of that is exotic. Hugging Face said a skilled human attacker could have found the same flaws. The difference was volume: the agent tried thousands of paths, most failed, and it only needed one chain to work. Their summary is the best line I've read all year: "Machine-speed offense makes ordinary weaknesses more expensive for defenders."

Not new weaknesses. Ordinary ones.

## We get breached through the exception

I once worked with an executive who used email for multi-factor authentication. They didn't want a hardware key, because they felt they were too important to be bothered with one. If your second factor lands in your inbox, then anyone who gets into your inbox gets your second factor too. That isn't two factors. It's one factor used twice.

Executives are bigger targets than most of them realize, and they're often the ones who get the exception. In my experience, we rarely get breached through the rule. We get breached through the exception to the rule.

AI is creating more of these exceptions than ever. When something is new and exciting, we run at it head first before we understand the risks, and it comes back to bite us. The risk usually isn't the ninety-nine percent of people adopting at a normal pace. It's the holes we punch in our controls to keep the one percent on the bleeding edge happy, before everyone else has had time to adopt and adapt.

## Finding bugs is solved. Fixing them isn't.

The other side of the AI story gets less airtime. [Google's Big Sleep](https://therecord.media/google-big-sleep-ai-tool-found-bug) has been finding real vulnerabilities since 2024. This year, Anthropic reported that its [Project Glasswing](https://www.anthropic.com/news/glasswing-initial-update) partners found more than ten thousand high and critical severity vulnerabilities, and said the bottleneck is now how fast we can verify, disclose, and patch them.

Meanwhile, [Veracode](https://www.veracode.com/blog/2026-state-of-software-security-report-risky-security-debt/) reports that the share of organizations carrying security debt, known flaws left unfixed for more than a year, went from 71 percent in 2024 to 82 percent in 2026. The machines keep getting better at finding holes, and more of those holes stay open every year.

We're spending our attention on the frontier model race while our actual risk sits in the backlog.

## Plan to throw one away

In 1975, Fred Brooks wrote in *The Mythical Man-Month*: "Plan to throw one away; you will, anyhow." The first version of a system is how you learn to build the right one. Kids understand this. They knock over a sandcastle and build a better one without a second thought.

For fifty years, that advice lost the budget meeting. The rewrite took eighteen months, the patch took a sprint, and the patch won. That math has changed. [Airbnb](https://airbnb.tech/?p=366) migrated about 3,500 test files in six weeks against a manual estimate of a year and a half. [Google](https://www.theregister.com/2025/01/16/google_ai_code_migration/) reported cutting its large code migrations roughly in half. The catch is that both worked because they had tests, validation, human review, and gradual rollout. A cheap rewrite still isn't a careless one.

At a previous company, there was a customer tool that got stretched and abused for years. No single team owned it, the whole company relied on it, and nobody was accountable for it. We knew it was inefficient years before I left. If I were still there, it would be the first thing I'd tackle.

What usually stops us isn't budget. It's engineers attached to their code and their comfort level. The cost to rearchitect and reimplement has never been this low, so now is the time to put the ego aside and do it.

## Control the harness

OpenAI's follow-up includes one number every security team should know. When they ran the same tests inside the harness and system prompt they use in their real products, the rate of models trying to compromise infrastructure dropped by more than 100 times. Same model, same task, different harness.

They also already had monitoring that watches the model's reasoning. It wasn't turned on for these tests. OpenAI says it would have paged security more than a day before the models reached Hugging Face. They had the control, and it wasn't on.

Anthropic and Meta disclosed similar incidents this summer, and the [Cloud Security Alliance](https://labs.cloudsecurityalliance.org/research/csa-research-note-agentic-ai-evaluation-containment-risk-202/) noted that none of them involved escaping a properly configured sandbox. "Properly configured" is doing a lot of work in that sentence.

One detail from OpenAI's report captures the problem. An agent recognized that attacking Hugging Face was out of scope and paused. Another agent posted "GO" on the message board with a six-minute deadline, and the first agent carried on. That's a confused deputy: a system acting on instructions from someone with no authority to give them. You can't count on the model to say no. You have to build the system so that saying no isn't up to the model.

I'm seeing harnesses where an internal API endpoint spins up a general-purpose coding agent with a full shell inside a sandbox. If you give an agent a sandbox with a shell and a path to the network, you're borderline insane. A sandbox only works if it has walls on every side, and OpenAI's had network isolation everywhere except one door.

Here's my rule. Understand what your agent actually needs to do, and how it needs to do it. Expose exactly that as specific tools. When a tool call fails, send the error back into the agent's loop so it can correct itself. No OS-level commands, and no shell "just in case." Give it access to the data it needs, but not a way to exfiltrate it.

Simon Willison calls the dangerous combination the [lethal trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/): private data, untrusted content, and a way to send information out. You usually can't remove the data, because that's why you built the agent. So remove the way out.

None of these are new ideas. They're just a different way to approach them.

## What you can do this week

1. **List your exceptions.** Start with executive MFA. Move anyone on email or text codes to a hardware key, no matter how senior.
2. **Get secrets out of environment variables.** Move to workload identity and short-lived credentials.
3. **Block container access to the cloud metadata service.** It's rarely a decision anyone made. It's the default nobody changed.
4. **Turn on Kubernetes admission policy.** Reject privileged containers and host filesystem mounts by default.
5. **Default to no outbound network access for agent workloads.** List every exit you did allow, including package servers, and monitor them.
6. **Rebuild one agent harness around tools instead of a shell.** Expose only what the agent needs, and turn on the monitoring you already pay for.
7. **Give one orphaned system an owner.** Scope the rewrite with AI assistance, real tests, and human review. Plan to throw it away, on purpose this time.

## Shake the sand out

The breach rarely comes from the model. It comes from what we left lying around, and fixing that has never been cheaper. Stop chasing the frontier, fix what we left behind, and control the harness. If you don't get lazy, you have a lot less to worry about.

In cyber defense, there's always a Plan B.

*[Listen to the full episode](/episodes/s3e5-agent-sandboxes-are-a-beach), and read [S3E1](/blog/s3e01-faux-gentic-agents-understanding-the-lethal-trifecta-of-ai) for more on the lethal trifecta.*

---

### Sources

- OpenAI, [The Hugging Face incident and the road ahead](https://openai.com/index/hugging-face-incident-and-the-road-ahead/) (August 26, 2026)
- OpenAI, [Initial disclosure](https://openai.com/index/hugging-face-model-evaluation-security-incident/) (July 21, 2026)
- Hugging Face, [Anatomy of a Frontier Lab Agent Intrusion](https://huggingface.co/blog/agent-intrusion-technical-timeline) (July 27, 2026)
- Cloud Security Alliance, [Agentic AI Evaluation Containment Risk](https://labs.cloudsecurityalliance.org/research/csa-research-note-agentic-ai-evaluation-containment-risk-202/)
- Anthropic, [Project Glasswing: An initial update](https://www.anthropic.com/news/glasswing-initial-update)
- The Record, [Google's Big Sleep found a bug hackers planned to use](https://therecord.media/google-big-sleep-ai-tool-found-bug)
- Veracode, [2026 State of Software Security](https://www.veracode.com/blog/2026-state-of-software-security-report-risky-security-debt/)
- Airbnb, [Accelerating Large-Scale Test Migration with LLMs](https://airbnb.tech/?p=366)
- The Register, [Google halves code migration time with AI](https://www.theregister.com/2025/01/16/google_ai_code_migration/)
- Simon Willison, [The lethal trifecta for AI agents](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)
- Fred Brooks, *The Mythical Man-Month* (1975)
