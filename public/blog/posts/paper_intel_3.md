---
title: 📊 PAPER → Multiplayer Intelligence 3️⃣ of ♾️: Harness RSI
subtitle: Audience: Intermediate to Advanced AI Scientists and Engineers | Today's word: Home 故郷 · בית
date: 2026; 10; 25
---

> [❄️](https://www.youtube.com/watch?v=bbYTBZeJODw) *"In the midst of winter, I found there was, within me, an invincible summer"* — Albert Camus

> [🎼](https://www.youtube.com/watch?v=w-Sy-Uncw3M) *"Whatever you do will be insignificant, but it is very important that you do it."* — Mahatma Gandhi

> [🎶](https://www.youtube.com/watch?v=lgYAmMIrrJE) *"Hope is a good thing, maybe the best of things, and no good thing ever dies."* — Stephen King, on Shawshank Redemption

> [🎧](https://www.youtube.com/watch?v=8uwdBpgVqs4) *"For a conscious being, to exist is to change, to change is to mature, to mature is to go on creating oneself endlessly."* — **[Henri Bergson, on Creative Evolution](https://singularity.nullstar.fun/mahalo-and-farewell.html)**

> [🎹](https://www.youtube.com/watch?v=nVGIXu7e0jQ) *“Home is where one starts from. As we grow older, the world becomes stranger, the pattern more complicated of dead and living. Not the intense moment, isolated, with no before and after, but a lifetime burning in every moment. And not the lifetime of one man only, but of old stones that cannot be deciphered."* — T.S. Eliot 

<br>

![](/blog/assets/gogh.jpg)

<br>

```
Forever is composed of Nows —
’Tis not a different time,
Except for infiniteness
And latitude of home.

From this, experienced here,
Remove the dates to these,
Let months dissolve in further months,
And years exhale in years.

Without certificate or pause
Or celebrated days,

As infinite our years would be
As Anno Domini’s.

— Emily Dickinson 
```

<br>

Today, we continue our informal discussion of the literature on recursive self-improvement and self-reference in the context of the work we are doing at **[NULLSTAR](https://www.nullstar.games/)** on self-improving harness engineering. Across these fifteen 2026 papers, we build on what we explored in **[the last post](https://marina.nullstar.fun/pages/post.html?post=paper_intel_2)** and **[earlier this summer](http://localhost:8037/pages/post.html?post=paper_weng)**, while adding some modern (and very fresh) color to the topic.

As I read through today's material, below are my highlights — with a moderate attempt at coherence — for my personal inventory (and perhaps as a way to connect with other friendly AI scientists and builders out there who love talking about the same things). As always, please remember our rules:

**🤖 If you see a 👾, it means I found something particularly cool or learned something new.**
**🤖 If these notes look cool to you, it's your ✦moral duty✦ to read the original resources.**
**🤖 Just another blog, but not your usual blog: they're living notes that I change as I fancy.**

<br>

---

### 💌 Open Letter to My Audience, Anon Friends, and Those Who Would Like to Be Part of My Personal Inner Circle

<br>

*At this point, I truly need help getting back home, back to my life, and to continue with my career. Things have been incredibly tough, and I am running out of every resource I have. I have been fighting for years, and I am exhausted. I have reached the absolute limits of human endurance. Anything beyond this is sadism. I am not exaggerating; I am begging for common sense.*

*Please, I need real help now — help that recognizes my worth, my work, and my capabilities. Just what is fair and due for all my efforts. That is all I ask.*

*I don't need any more moral support or false hope. I no longer have the mental energy to entertain online games or endure an endless wait for something to finally happen. It has been years. Please, stop trying to capture my attention if you're not going to actually do something. This has gone beyond sanity and morality at this point. Meaningful personal connections can only come from what is real: from actions, from real-life effort, from something normal and tangible. This is the only measure by which I can truly quantify and qualify my choices.*

*I really appreciate each one of you, and I am deeply grateful for all the help and love you have given me over these past years. I couldn't have made it without you, and I truly mean that. But right now, I need a real opportunity to move forward with my life and continue my work, just as any honest, hardworking human being deserves. If you truly care, this is how you can help.*

*Thank you.*

<br>

---

# 🏡 [Self-Evolving Agent Harness (C. Wei et al., 2026)](https://arxiv.org/pdf/2610.18813)

<br>

![](/blog/assets/m-i-3-1.png)

<br>

### tl; dr

- Revise an agent’s software scaffolding through execution feedback, including prompts, memory, workflows, and executable components, while keeping model weights fixed → It separates mutation boundaries from search and admission, distinguishing expected generalization, budget-constrained retention, and high-probability acceptance under fresh validation.

- Formalize a feedback-driven process where accepted revisions persist across runs (the framework separates update targets from proposal and admission mechanisms) → It distinguishes changes to interpreted state from revisions to tools and code, repository-level control logic, and plugin composition → Search through evolutionary optimization and reliability through continual PAC-learning.

- The harness directly shapes a fixed model’s behavior, while reusable procedures preserve task constraints and lessons from earlier failures. In addition, harness revisions reuse an existing model deployment, avoiding retraining and additional weight checkpoints. Finally, memory records and version comparison: attributing behavioral differences between model checkpoints.

<br>

![](/blog/assets/m-i-3-2.png)

<br>

### Definition of Harness Self-Evolution

<br>

> *Harness is the software and configuration governing a model M’s execution in a task environment E. Model adapters are part of H; learned parameters are part of M. The final assessment J includes scoring, outcome verification, and the records that determine the result.*

> *Harness self-evolution: uses execution experience to iteratively revise H, aiming to improve task performance or resource efficiency, while holding M fixed.*

> *Self-evolution denotes the update process; self-improvement denotes a gain established by comparison.*

<br>

- The lifecycle requires: 1) operational feedback and update continuity, 2) persistence across runs.

- Workflow revisions remain interpreted when they change task-level sequencing or routing through fixed coordination interfaces over predefined operators. This includes code that only composes those operators; revising operator implementations or the runtime mechanisms that enact coordination constitutes an executable revision, even under an unchanged executor.

- Component-level revision → mutation to callable procedures or designated modules while keeping surrounding orchestration outside the editable surface.

- Repository-level search → context construction, orchestration loops, execution hooks, recovery, and termination to revision. Control over interactions among harness components, rather than the number of files edited. It extends mutation to the optimizer’s prompts, hooks, and tools.

<br>

### Theory of Harness Self-Evolution

<br>

- Many harness optimizers explore discrete instructions, skills, and code through execution-guided proposals rather than gradients through the edits.

- Evolutionary algorithms (EAs) characterize the search structure; continual-learning analysis relates empirical gains to generalization and capability retention.

- The EA view separates four aspects of an update: the representation of mutable state, the variation that generates edits, the assessment of their fitness, and the selection of state to retain.

<br>

### Generalization and Retention from a Continual PAC-Learning Perspective

<br>

> 👾 *Probably Approximately Correct (PAC) learning is a theoretical framework in computational learning theory, introduced by Leslie Valiant in 1984, that formalizes when a machine-learning algorithm can learn a concept from examples. A concept is PAC-learnable if, given enough independently sampled training examples and sufficient computational resources, the algorithm can produce a hypothesis that approximates the true concept with high probability. The key idea is that the learned model does not need to be perfectly correct; it must be probably correct and approximately accurate, while requiring a number of examples and computational resources that scale reasonably with the problem's parameters.*

<br>

1. Evolution state and sampling
2. Stability under task replacement
3. Retention and accumulated regressions
4. Admission with fresh validation
5. Scope of the guarantees

<br>

### Future Directions

<br>

1. Model-harness co-design (skill optimization, runtime revision, and weight updates)
2. Distributed execution and edge infrastructure (runtime revision can change both execution cost and where the components are best placed)
3. Plugin creation and reuse (lifecycle-aware decisions when to reuse, revalidate, regenerate, or retire a plugin)
4. Safety boundaries for self-modifying systems (external safeguards complement model alignment)

<br>

---

# 🏡 [Self-Harness: Harnesses That Improve Themselves (H. Zhang et al., 2026)](https://arxiv.org/pdf/2606.09498)

<br>

![](/blog/assets/m-i-3-17.png)

<br>

- Because different models exhibit distinct behaviors, effective harness design is inherently model-specific. Yet agent harnesses are still largely engineered by human experts, a paradigm that scales poorly as modern LLMs become increasingly diverse and rapidly evolving. In this paper, we introduce Self-Harness, a new paradigm in which an LLM-based agent improves its own operating harness, without relying on human engineers or stronger external agents.

- Operationalize Self-Harness as an iterative loop with three stages: Weakness Mining, which identifies model-specific failure patterns from execution traces; Harness Proposal, which generates diverse yet minimal harness modifications tied to these failures; and Proposal Validation, which accepts candidate edits only after regression testing.

- Self-Harness can also introduce broader structural mechanisms, such as subagent-based decomposition and middleware creation, that go beyond local failure repair and improve the overall organization of problem solving.

- Formally, let `𝑀` be a fixed language model and let `ℎ` denote an agent harness. Given a task instance `𝑥`, running `𝑀` under harness `ℎ` produces an execution trace `𝜏` and an output `𝑦`. The trace records the messages, tool calls, and verifier outcomes. An evaluator then maps the task, trace, and output to a behavioral outcome, such as pass/fail. In this work, the model `𝑀` and evaluator `E` are held fixed, while the harness is treated as the object of improvement. Self-Harness therefore operates over a lineage of harnesses `ℎ0, ℎ1, . . .`, where each transition corresponds to a bounded edit to the execution protocol rather than an update to the model weights.

- The main lesson is that harness improvement should be treated as an empirical state transition.

<br>

![](/blog/assets/m-i-3-16.png)

<br>

---

# [Meta-Harness: E2E Optimization of Model Harness (Y. Lee et al., 2026)](https://arxiv.org/pdf/2603.28052)

<br>

![](/blog/assets/m-i-3-20.png)

<br>

> *A harness is a stateful program that wraps a language model and determines what context the model sees at each step. The goal is simple: find the harness that makes the underlying model perform best on the target task distribution. Formally, let `M` denote a fixed language model and `X` a task distribution. For a harness `H` and task instance `x ∼ X`, we execute a rollout trajectory `τ ∼ pM(H, x)`. The harness constructs prompts for `M`, the model responds, and the harness updates its state after each interaction. A task-specific reward function `r(τ, x)` scores the trajectory. The objective of harness optimization is to find the harness that maximizes the expected final reward.*

<br>

- Meta-Harness is an outer-loop system that searches over harness code for LLM applications. It uses an agentic proposer that accesses the source code, scores, and execution traces of all prior candidates through a filesystem. 

- On online text classification, Meta-Harness improves over a state-of-the-art context management system by 7.7 points while using 4× fewer context tokens. On retrieval-augmented math reasoning, a single discovered harness improves accuracy on 200 IMO-level problems by 4.7 points on average across five held-out models. On agentic coding, discovered harnesses surpass the best hand-engineered baselines on TerminalBench-2.

- Its key design choice is to expose full history through a filesystem, enabling selective diagnosis of raw prior code and execution traces rather than optimization from compressed per-candidate summaries. For every previous candidate harness, the filesystem stores the source code, evaluation scores, and execution traces, which the proposer retrieves via standard operations such as grep and cat rather than ingesting them as a single prompt.

- The main advantage of Meta-Harness is not just search over code, but search with selective access to prior diagnostic experience. The proposer is not limited to scalar rewards or fixed summaries; it can inspect raw code, execution traces, and prior failures, then use that information to form and test hypotheses about what to change.

- 👾 Findings reflect a recurring pattern in machine learning: once a search space becomes accessible, stronger general-purpose agents can outperform hand-engineered solutions. A natural next step for future work is to co-evolve the harness and the model weights, letting the strategy shape what the model learns and vice versa.

<br>

---

# 🏡 [Harness2: Recursive Agent Harnessing for an Open World (R. Xu et al., 2026)](https://arxiv.org/pdf/2610.14224)

<br>

![](/blog/assets/m-i-3-8.png)

<br>

> *Definition: Recursive agent harnessing couples two recursive updates: task-level recursion refines the current execution harness using generated harnesses and execution evidence; harnessing-level recursion updates the improvement harness that guides this refinement, using adopted harnesses and improvement experience after each task to inform subsequent refinement.*

<br>

![](/blog/assets/m-i-3-9.png)

<br>

-  Deploying RSI in open-world settings still faces two critical challenges. First, open-world tasks are typically unseen during the harness design phase and novel at test time, leaving no ground-truth verifiers to reliably guide online harness edits. Second, the RSI process remains highly task-specific and fails to generalize to novel scenarios.

-  Harness2, a plug-and-play, recursive agent harnessing framework addresses these challenges through two connected levels of recursion: 1) Task-level recursion refines the current task’s harness using a contrastive Propose–Probe–Compose step that reliably guides edits without ground-truth verifiers, and can be scaled further via parallel or sequential recursion; 2) Harnessing-level recursion then extracts experience from these edits to update a continual improvement harness, enabling the agent to better adapt to future tasks.

<br>

![](/blog/assets/m-i-3-11.png)

<br>

- Harness2 delivers consistent gains across models and benchmarks. A single improvement step improves both GLM-5 and Gemini 3.5 Flash under OpenCode and Codex. On WorkBuddy-Bench, Harness2 raises GLM-5’s average score by 11.5 points under OpenCode, the largest one-step improvement over the base harness on this benchmark. The same pattern extends to JobBench and LAB, where gains reach 4.5 points and 11.8 percentage points in Partial pass rate, respectively. By contrast, ReasoningBank falls as much as 6.6 points below the base harness on coding tasks. Harness Scaling underperforms the base in seven of the twelve benchmark–configuration pairs. Harness2 exceeds the compared baselines on WorkBuddy-Bench Avg. and JobBench Score in all four configurations; on LAB Partial, Meta-Harness leads for Gemini 3.5 Flash under Codex.

<br>

![](/blog/assets/m-i-3-10.png)

<br>

---

# 🏡 [MOSS: Self-Evolution through Source-Level Rewriting in Agents (Q. Cai et al., 2026)](https://arxiv.org/pdf/2605.22794)

<br>

![](/blog/assets/m-i-3-18.png)

<br>

- Autonomous agentic systems are largely static after deployment: they do not learn from user interactions, and recurring failures persist until the next human-driven update ships a fix. 

- Self-evolving agents have emerged in response, but all confine evolution to text-mutable artifacts—skill files, prompt configurations, memory schemas, workflow graphs—and leave the agent harness untouched.

- Since routing, hook ordering, state invariants, and dispatch live in code rather than in any text artifact, an entire class of structural failure is physically unreachable from the text layer. 

- Source-level adaptation is a fundamentally more general medium: it is Turing-complete, a strict superset of every text-mutable scope, takes effect deterministically rather than through base-model compliance, and does not erode under long-context drift.

-  OpenClaw have matured from research demonstrations into real-world workers, deployed across Slack, Discord, web, and other channels to complete complex multi-step tasks for users. Yet once deployed, they remain largely static: they do not learn from how they are actually used, and the same failure modes recur across users until the next human-driven iteration ships a fix. A wave of self-evolving agents has emerged in response, letting agents evolve themselves after deployment. These systems leave one layer untouched. Their evolution scope is bounded to text-mutable artifacts—skill files, prompt configurations, memory schemas, and at most workflow graphs; the agent harness—routing, state management, dispatch, hooks, mediator, session lifecycle— is never modified by the agent itself. The limit this boundary imposes is physical: edits to text-mutable artifacts can only change what the agent itself thinks (what to say, which skill to invoke, how to break a task into sub-goals); they cannot change what the harness decides on its behalf. Once a failure originates in this layer—mis-routed messages, hooks firing out of order, corrupted session state, atomicity bugs across concurrent skills—no update to skills, prompts, or memory can reach it: the bug is not in the prompt text, and a prompt rewrite cannot paper over it. The proportion of failures of this kind scales with harness complexity, so this gap widens as agentic systems mature.

- MOSS realizes self-rewriting on a production agentic substrate through five pieces: a main container that runs the substrate’s user-facing agent, a control-surface CLI through which the agent (and the user, via the agent) drives evolution, a pluggable external coding-agent CLI invoked per stage to make code edits, a host-resident daemon (the host-daemon) that supervises everything else, and ephemeral trial workers used to verify candidates.

- User state—sessions, memory, credentials, and agent configs—lives on a user-state volume mounted from the host filesystem into the moss-gateway container. A swap therefore destroys the container but not the volume, and the new image inherits state intact; trial workers run without this mount and with isolated networking.

<br>

![](/blog/assets/m-i-3-19.png)

<br>

- The Code-Review stage operates at the syntactic and semantic level, so runtime faults pass through it: race conditions, cross-module state interactions, and hook-order-dependent behavior only manifest when the agent runs. Entire classes of application-level failure—channel routing, session lifecycle, cross-module state propagation—surface only under execution. Verification must therefore be runtime, on a production-equivalent environment, and against the same prompts that produced the failure evidence in the first place.

- MOSS instantiates this argument on a production agentic substrate, extending the editable scope from skill files, prompt configurations, memory schemas, and workflow graphs to the agent harness itself, where routing, state management, hook ordering, and dispatch live. Anchoring evolution to an automatically curated batch of production-failure evidence, executing a deterministic multi-stage pipeline with code modification delegated to a pluggable external coding-agent CLI, verifying candidates by replaying the batch against the candidate image in ephemeral trial workers, and promoting them via user-consent-gated, in-place container swap with health-probe-gated rollback together close the loop from a real user failure to a deployed harness-level fix; on OpenClaw, this single loop lifts a four-task mean grader score from 0.25 to 0.61 without human intervention.

<br>

---

# 🏡 [Harness Evolution as Learning (Z. Gan et al., 2026)](https://arxiv.org/pdf/2609.36892)

<br>

> *Harnesses are local stateful transducers that mediate between the model and the environment.*

<br>

- Introduce a unified learning-theoretic framework for harness evolution, linking architecture, memory scale, and update dynamics to approximation, generalization, and optimization errors, with analyses of reachability limits, memory-capacity and estimation bounds, and residual error under biased updates. 

- Q1 (harness architecture, approximation error). Which user preferences can context harnesses reliably express, and when does additional computation or action-level control improve compliance?

- Q2 (harness scale, generalization error). How does the scale of a memory harness affect preference compliance when its contents are constructed from finite interaction evidence?

- Q3 (self-evolving algorithm, optimization error). To what extent can repeated harness updates close the gap to an oracle context? 

<br>

---

# 🏡 [A Theory of Reliable Self-Evolution for Agent Harness (Q. Cai et al., 2026)](https://arxiv.org/pdf/2609.08175)

<br>

> *In harness self-evolution, agents modify their own prompts, code, tools, and orchestration while keeping the underlying language model fixed. Does reliable self-evolution have a performance ceiling, and which factors govern this ceiling?*

<br>

![](/blog/assets/m-i-3-4.png)

<br>

- Provide a theoretically grounded condition under which a self-evolved harness can be reliably adopted → propose a validation rule to make the evolved system satisfy the reliable adoption condition with theoretical guarantees so the system can achieve progressive improvement through evolution.

- Results show that a performance ceiling imposed by a validation rule need not imply that further improvement is impossible. 

<br>

---

# 🏡 [AutoHarness: Improving LLM agents by automatically synthesizing a code harness (X. Lou et al., 2026)](https://arxiv.org/pdf/2603.03329)

<br>

- Despite significant strides in language models in the last few years, when used as agents, such models often try to perform actions that are not just suboptimal for a given state, but are strictly prohibited by the external environment. 

- Show that Gemini-2.5-Flash can automatically synthesize a code harness, using a small number of rounds of iterative code refinement given feedback from the (game) environment. The harness can be seen as a control loop that calls the LLM and rejects unacceptable answers. The resulting harness prevents all illegal moves in 145 different TextArena games.

- We formulate the generation of this harness as a search problem over the space of programs. Unlike simple iterative prompting, we employ a tree search guided by Thompson sampling to efficiently explore the landscape of potential harnesses.

- The LLM acts as a mutation operator, proposing refinements to the code based on feedback from execution. The search algorithm balances exploration (trying distinct logic structures) and exploitation (refining a partially working harness) to converge on a robust control loop.

-  The refinement (gradient-free code optimizer) is done with a base LLM, given feedback from the environment (critic) about whether the previous attempted moves were legal or not, and what reward they produced (if any).

<br>

---

# 🏡 [Test-Time Harness Evolution (J. Nie et al., 2026)](https://arxiv.org/pdf/2607.08124)

<br>

> *Can an LLM agent adapt its harness at test time using its own execution traces, without final correctness feedback?*

<br>

![](/blog/assets/m-i-3-3.png)

<br>

- Existing approaches typically optimize harnesses on training or development data and freeze the resulting programs at test time, limiting adaptation to shifts in task distributions, failure modes, and tool interactions. We ask whether the harness can instead be optimized during evaluation using unlabeled execution traces.

- This evaluation-time formulation offers two practical advantages. First, it adapts at the point where the relevant evidence appears: after the agent encounters the schemas, repositories, tests, tools, and runtime constraints of the target workload. It can therefore use task-specific execution evidence without requiring an additional labeled development set tailored to that workload. Second, updating an executable program requires no gradient access and permits explicit changes to context construction, multi-sample generation, tool-mediated grounding, deterministic contract checks, and conditional recovery branches.

- Executing a candidate records its model prompts and completions, tool calls and responses, stdout/stderr, intermediate artifacts, runtime states, errors, and probe results; long fields are truncated. A trace exposes how a harness operates: which tools it calls, whether intermediate artifacts are consumed, when validation or recovery branches fire, and how the final output relates to the preceding computation.

- A central challenge, however, is that execution evidence is not a correctness oracle. A query can execute successfully while answering the wrong question; code can pass visible tests while failing hidden ones. TTHE therefore presents proxy signals together with candidate code and the underlying execution traces, allowing proposers and the judge to interpret these signals in the context of how an outcome was produced rather than relying on a single surrogate score. Because an edit intended to repair a failure can also disrupt previously correct behavior, we complement this design with a conditional analysis of a class of trace-triggered harness edits, characterizing when corrective gains outweigh unintended regressions.

<br>

### Discovered Harness Policies

<br>

The evolved programs are retained as source code rather than summarized only by aggregate scores. Recurring discovered policies include:

- Text-to-SQL: value grounding through database probes, date-format repair, explicit output-shape checks, and removal of accidental limits on list queries.
- LiveCodeBench: multiple candidate programs, execution-based ranking on public tests, targeted repair from expected-versus-observed outputs, and fresh-start recovery after repeated failure.
- SWE-bench: reproduce-first debugging, root-cause localization before editing, post-edit verification, and an anti-paralysis failsafe for issues that would otherwise return an empty patch.
- DS-1000: insertion-only output contracts, deterministic self-checks, and guards against redefining supplied variables.
- claw-eval: single-line tool payloads so write actions are recorded, per-record identifier citation with a predelivery completeness check, exact-identifier service chaining, and a prohibition on reporting unexecuted actions.

<br>

---

# 🏡 [Agentic Harness Engineering: Observability-Driven Automatic Evolution of Coding-Agent Harnesses (J. Lin, 2026)](https://arxiv.org/pdf/2604.25850)

<br>

> *How can an evolution agent jointly and stably evolve all editable components of a coding agent’s harness? This question is bottlenecked by observability, not by agent capability: once the evolution agent receives structured context over a clear action space, it can reliably converge on better harness design.*

> *Harness engineering refers to the practice of designing the system surrounding the model, including its tools, interfaces, memory, execution constraints, and feedback loops, which together shape what an agent can do on long-horizon tasks. Concretely, the harness mediates how the model perceives and acts on its environment: it exposes the action and observation interfaces over which tool-augmented reasoning unfolds, custom agent-computer interfaces for repository navigation, file editing, and command execution, as well as sandboxed execution and orchestration support that keep long-horizon runs reproducible.*

<br>

- The optimal harness is model-specific: a harness tuned for one base model often underperforms on another and must be re-adapted as the base model changes. In current practice, this adaptation is performed manually—developers inspect trajectories, identify recurring failure patterns, and hand-craft edits across prompts, tools, middleware, and skills.

- Introduce a closed loop that addresses these challenges through three matched observability pillars: 1) component observability gives every editable harness component a file-level representation so the action space is explicit and revertible; 2) experience observability distills millions of raw trajectory tokens into a layered, drill-down evidence corpus that an evolving agent can actually consume; and 3) decision observability pairs every edit with a self-declared prediction, later verified against the next round’s task-level outcomes. Together, these pillars turn every edit into a falsifiable contract, so harness evolution proceeds autonomously without collapsing into trial-and-error. 

<br>

----

# 🏡 [HarnessX: A Composable, Adaptive, and Evolvable Agent Harness Foundry (Darwin Agent Team, 2026)](https://arxiv.org/pdf/2606.14249)

<br>

![](/blog/assets/m-i-3-21.png)

<br>

- AI agent performance depends critically on the runtime harness, comprising the prompts, tools, memory, and control flow that mediate how a model observes, reasons, and acts. Yet today’s harnesses remain largely hand-crafted and static: each new model or task still demands bespoke scaffolding, and the rich traces produced during execution are rarely distilled back into systematic improvement.

- HarnessX is a foundry for composable, adaptive, and evolvable agent harnesses. HarnessX assembles typed harness primitives via a substitution algebra, adapts them through AEGIS, a trace-driven multi-agent evolution engine grounded in an operational mirror between symbolic adaptation and reinforcement learning, and closes the harness–model loop by turning trajectories into both harness updates and model training signal.

- It begins with a modular foundation: harness primitives spanning context, tools, skills, control, and memory are described via typed interfaces and composed via a substitution algebra. This separates concerns that existing systems typically conflate. On top of this substrate, we introduce AEGIS, an observability-driven and auditable harness adaptation engine. Framing harness adaptation not as ad-hoc editing but as a learning problem over symbolic artifacts (prompts [51], tools, memory, and control policies) reveals that standard RL pathologies (reward hacking, catastrophic forgetting [15], under-exploration [16]) become concrete design risks. To address these risks, AEGIS combines full trace observability with a four-stage pipeline (Digester, Planner, Evolver, and Critic) that compresses traces, plans adaptations, generates candidates, and assesses changes. Finally, we close the loop between harness adaptation and model training via harness-model co-evolution. Traces produced during harness adaptation serve as reinforcement-learning signal for model training, so that model improvements feed back into subsequent harness evolution.
<br>

![](/blog/assets/m-i-3-22.png)

<br>

- The harness evolution is a first-class operation: AEGIS can insert a new processor at a specific hook, replace an existing one by matching its singleton group, or remove a processor entirely—all without touching other processors at the same or different hooks. Because the type contract (input event type = output event type) is enforced per-hook, any such substitution preserves the well-typedness of the overall pipeline. The metadata fields further constrain composition: _singleton_group prevents conflicting duplicates, and _order ensures that newly inserted processors interact predictably with existing ones.

- Organize the behavioral space along nine dimensions: model selection (D1) decides which model serves which role; context assembly (D2) determines what is presented to the model at each step; memory management (D3) governs what carries across steps and sessions; tool ecosystem (D4) controls which tools the agent can invoke; execution environment (D5) determines where tool-induced side-effects materialize; evaluation and reward (D6) specifies how outcomes are judged; control and safety (D7) enforces rules that keep the agent from looping, overspending, or drifting from intent; observability (D8) records each event, model call, and tool invocation; and the training bridge (D9) converts execution trajectories into reinforcement-learning records.

<br>

![](/blog/assets/m-i-3-23.png)

<br>

- Training the model under a fixed harness meets a training-signal ceiling: newly acquired capabilities go unexercised when the scaffold never surfaces the context, tools, or control flow that elicit them. The model is the agent’s cognitive core, supplying reasoning and planning, while the harness is its executive apparatus, determining what the model perceives, what it can invoke, and what constrains its execution. A sharper apparatus cannot compensate for a weak core, nor a stronger core for an apparatus that never calls on it. Co-evolution targets precisely this bottleneck: by training the model within the same loop that evolves its harness, the agent improves along both axes simultaneously, breaking the ceiling that either improvement alone could leave in place.

<br>

![](/blog/assets/m-i-3-24.png)

<br>

---

# 🏡 [HELIX: Model-Harness Co-evolution for RSI (T. Fan & C. Huang, 2026)](https://arxiv.org/pdf/2608.13951)

<br>

![](/blog/assets/m-i-3-12.png)

<br>

- For interactive agents, the harness’ influence is recursive: it governs how the model executes today and shapes the trajectories from which the model learns tomorrow. Treating model and harness as independent artifacts severs this feedback loop. We argue that closing it requires model–harness co-evolution as a first-class principle. 

- Organize approach around build–update–rebuild: 1) build source-traceable harnesses for a fixed model; 2) update the model from verified sibling trajectories; 3) rebuild the harnesses for the updated model, whose shifted capability profile may favor different runtime designs.

- Decomposes OpenCode, Pi Mono, Nanobot, and Hermes agent into typed ports, atoms, recipes, product shells, and runtime policies—making interventions explicit rather than implicit in ad-hoc prompting. 

<br>

![](/blog/assets/m-i-3-13.png)

<br>

### Model-harness Interaction at Runtime

<br>

Each trajectory alternates between harness mediation and model action. The harness constructs the current observation and action interface, the model proposes a response, and the harness checks and executes its actions before returning environment feedback. The assembled runtime implements this interaction as a shared multi-step loop:

1. create or restore the session, run input and before-start hooks, and persist the user message;
2. normalize the request and build prompt/context under the selected product personality;
3. stream a provider step, normalize assistant parts, and collect proposed tool calls;
4. run tool preflight and permission checks, execute serial or parallel batches, apply result hooks, and truncate or retry where required;
5. evaluate acceptance evidence and the provider finish reason;
6. inject a continuation when required, or stop at acceptance, request boundary, or the configured step limit; and
7. persist the transcript and session state, return the runtime trace, and let the task-parity/evaluation layer snapshot workspace effects.

<br>

- At round `t`, the harness portfolio `Φt` changes which behaviors `Mt` can reach and which experiences it produces. The resulting verified experience can update the model to `Mt+1`; because that update changes the capability profile, it can also change which harness is preferred. 

<br>

---

# 🏡 [CoTrace: Data Recipes for Training Terminal Agents with Harness-Model Co-Evolution (J. Chen et al., 2026)](https://arxiv.org/pdf/2610.10426)

<br>

> *How should execution data flow between the policy and the harness during co-evolution?*

<br>

![](/blog/assets/m-i-3-14.png)

<br>

- Existing harness–model co-evolution approaches improve both components, yet often treat trajectories produced during harness search as an undifferentiated replay buffer. This practice overlooks that a trajectory’s value for model training depends on the harness under which it was generated.

- CoTrace is a harness-aware data recipe that explicitly governs how execution experience is filtered, matched, and refreshed across model–harness co-evolution. Operating over an alternating search and training pipeline, CoTrace coordinates data flow through three targeted mechanisms. Route directs clustered execution failures to harness synthesis while restricting policy supervision to verified successes strictly matched to the adopted runtime, supplemented with fresh rollouts under that same harness. 

<br>

![](/blog/assets/m-i-3-15.png)

<br>

---

# 🏡 [Self-Evolving Coding Agents (H. Zhou et al., 2026)](https://arxiv.org/pdf/2608.03392)

<br>

> *Self-Evolving Coding Agents: A coding agent that uses experience and feedback from coding interactions to update its own assets, architecture, or model parameters, and improves its problem-solving capability, reliability, or efficiency in subsequent coding activity by retaining and reusing those updates.*

<br>

![](/blog/assets/m-i-3-5.png)

<br>

- Large language models have moved software automation beyond code generation toward agents that inspect repositories, use command-line tools, revise files, and test candidate patches.

-  Code plays a dual role: it is both a product of task solving and part of the system that solves the task. This dual role allows coding capabilities to act on both task artifacts and the agent itself, but modifying code does not inherently constitute self-evolution.

- The operational boundary: 1) update target, 2) update source, 3) update reuse, 4) capability improvement.

<br>

![](/blog/assets/m-i-3-6.png)

<br>

- 👾 Architecture self-evolution changes how available capabilities are coordinated, allowing experience to revise the procedure through which subsequent tasks are solved. They are not independent: a change in collaboration may alter the workflow, while its implementation may require modifications to the harness. Architecture therefore includes both structural connections and the rules governing their use. Even a small edit to these rules can affect many later decisions, making the scope of the change more informative than its code size.

- 👾 Model self-evolution incorporates coding experience into the parameters `𝜃𝑡` that shape subsequent agent decisions. Within `A𝑡 = (S𝑡 , H𝑡 , 𝜃𝑡 )`, these updates can change how the model localizes a defect, proposes a repair, interprets feedback, or decides to verify its work. Parameter learning can make an acquired behavior available across tasks without requiring explicit retrieval of the originating experience. Its usefulness then depends on whether the model preserves the conditions under which that experience was informative. A successful repair can teach a transferable strategy, but training on an incidental feature of the same repair may produce an unreliable shortcut.

- 👾 Asset self-evolution turns coding experience and external knowledge into resources that remain available for subsequent execution. The main design choices concern the unit of experience retained, its representation, and the conditions under which it is revised or reused. Memory can preserve a diagnosis and its supporting evidence; a skill can organize that knowledge into a procedure; a tool can implement an operation; and context can expose the information needed at the next decision point.

- 👾 Memory evolution updates `M𝑡` within the asset state `S𝑡` . Its central design choice is the unit of knowledge that survives an interaction, together with the conditions under which it should be recalled. We distinguish experience-derived memory from external knowledge memory by the provenance of that knowledge. Both concern explicit storage outside model parameters, but the former abstracts agent executions, whereas the latter incorporates repository history or human guidance.

- 👾 Skill self-evolution turns coding knowledge into reusable guidance for action, updating the skill collection `K𝑡` . A skill specifies a procedure and the conditions under which it should be applied, potentially combining instructions with executable resources. Its contribution therefore depends on more than whether its content accurately summarizes a past task.

- 👾 Tool self-evolution updates the executable utilities in `T𝑡` . Where a skill describes a procedure, a tool provides a callable implementation. The retained update is a utility or adapter that supports subsequent execution, rather than the project code delivered for the current task.

- 👾 Context self-evolution targets `C𝑡` , the information, instructions, and environmental settings through which an agent encounters a coding task. The reusable change may be selected repository evidence, a compression rule, an optimized prompt, or a repository-side information structure. These changes shape what reaches the decision process and how it is presented. The central distinction is between constructing context for one invocation and retaining an experience-informed change that influences subsequent execution.

- Evaluating a self-evolving coding agent involves two coupled objects: the software artifact produced for the current task and the persistent agent state that shapes subsequent tasks. Tests, compilers, and reviewers can assess the artifact directly, but they supervise the retained update only indirectly.

<br>

![](/blog/assets/m-i-3-7.png)

<br>

---
# 🏡 [A Survey of Self-Evolving Agents (H. Gao et al., 2026)](https://arxiv.org/pdf/2507.21046)

<br>

> *What aspects of an agent should evolve? When should adaptation occur? And how should that evolution be implemented in practice?*

<br>

![](/blog/assets/m-i-3-26.png)

<br>

- By providing a structured framework for understanding and designing self-evolving agents, this survey establishes a roadmap for advancing more adaptive, capable, robust, and versatile agentic systems in both research and real-world deployments, and ultimately sheds light on the realization of Artificial Super Intelligence (ASI) where agents evolve autonomously and perform beyond human-level intelligence across a wide array of tasks.

- Analyze the mechanisms contributing to the self-evolving paradigm ranging from proto-evolution (e.g., iterative bootstrapping or feedback-driven prompting) to strong self-evolution (fully autonomous diagnosis and reconfiguration), allowing us to provide a comprehensive view of how diverse methods contribute to the "What, When, and How" of the paradigm’s progression toward full autonomy.

- The evolution of these agents will require significant advancements in models, data, algorithms, and evaluation practices, and so on. Addressing issues such as catastrophic forgetting, human preference alignment during autonomous evolution, and the co-evolution of agents and environments will be key to unlocking agents that are not only adaptive but also trustworthy and aligned with human values.

<br>

![](/blog/assets/m-i-3-25.png)

<br>

---

# 🏡 Our Picks: Fresh & Nice OSS 

<br>

We conclude today's discussion with a few notable, related GitHub projects that came across my feed this week:

- **[Google's harness2: a plug-and-play framework for recursive agent harnessing in an open world, where agents encounter tasks unseen during harness design](https://github.com/google-research/harness2)**
- **[Awesome Self-Improving Modern Agentic Systems: a curated and continuously evolving resource hub for self-improving agentic systems](https://github.com/selfimproving-agent/awesome-Self-Improving-Agents)**
- **[Awesome Recursive Self-Improvement (RSI): a taxonomy-first, auditable map of recursive self-improvement research](https://github.com/theseus-labs-rsi/awesome-rsi)**
- **[DeepInfer: the high-performance inference framework that powers DeepSeek's large-scale production services](https://github.com/deepseek-ai/DeepInfer)** (also, check **[DeepSeek Harness (dsh): agent harness developed by DeepSeek AI and built on an everything-is-a-plugin architecture](https://github.com/deepseek-ai/deepseek-harness)**)
- **[microsandbox: runs untrusted workloads inside fast, local microVMs: AI agents, user code, plugins, CI jobs, dev environments, scrapers, and automation](https://github.com/superradcompany/microsandbox)** (built on **[harbor: framework for evaluating and improving agents](https://github.com/harbor-framework/harbor)**)
- **[Hybrid Reasoning Agents: LLM Agents that Think in latent space, Act through text](https://github.com/togethercomputer/HybridAgent)**
- **[runbench: benchmark long horizon problem solving in an MMO](https://github.com/MaxBittker/runebench)**
- **[uji: a small lightweight composable coding harness in Lua](https://github.com/uji-labs/uji)**

<br>

---

### Thank you for reading, and until next time! 

### ⬛️

