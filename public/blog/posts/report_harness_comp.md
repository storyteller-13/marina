---
title: 🏄‍♀️ REPORT → A Ride Through Harness Engineering
subtitle: Audience: Beginner to Advanced AI Scientists and Engineers | Today's word: Action · Handlung · 行動 (こうどう) · פעולה
date: 2026; 10; 30
---

> [🎧](https://www.youtube.com/watch?v=ODKy0ffjXS0) *“[The universe is change](https://www.youtube.com/watch?v=GScw6xLHPp4); our life is what our thoughts make it."* — Marcus Aurelius on Meditations

> [🎼](https://www.youtube.com/watch?v=P3l3ezun46I) *“If you consider yourself a serious researcher, it’s essential to read the original sources.”* — Marina von Steinkirch

<br>

![](/blog/assets/rubens.jpg)

<br>

#### *Hello there, and Happy Halloween, anon friend!*

#### *Part of this week was dedicated to technical debt and summarization. Today, we're exploring the literature covering the main aspects of the work behind [**NULLSTAR**](https://www.nullstar.games/)'s [**PleiadesOS:MAIA and PleiadesOS:TAYGETE**](https://marina.nullstar.fun/pages/post.html?post=idea_nullstar) modules. We'll take a deep dive into the current landscape of agent harnesses and their integrations with orchestration frameworks.*

<br>

![](/blog/assets/report_harn_0.png)

<br>

As I read through the material, below are my highlights — with a moderate attempt at coherence — for my personal inventory (and perhaps as a way to connect with other friendly AI scientists and builders out there who love talking about the same things). As always, please remember our rules:

**🤖 If these notes look cool to you, it's your ✦moral duty✦ to read the original resources.**
**🤖 Just another blog, but not your usual blog: they're living notes that I change as I fancy.**

<br>

----

# 1️⃣🐯 Paper I: [Agent Harness Engineering: A Survey (J. Li et al., 2026)](https://openreview.net/pdf?id=eONq7FdiHa)

<br>

#### ✨ Let's begin our studies by outlining the fundamental components involved in designing, maintaining, orchestrating, and evaluating agentic harnesses in production. ✨

<br>

![](/blog/assets/report_harn_1.png)

<br>

- **[ReAct (Yao et al., 2022)](https://arxiv.org/abs/2210.03629)** popularized agent loops that interleave reasoning, actions, and environmental observations. Early systems often relied on minimal supporting infrastructure: a while loop, a prompt template, and a small tool-dispatch table. 

- In 2023 came tool integration and multi-agent coordination. In 2025, the harness turn. By early 2026, practitioner reports and benchmark studies increasingly attributed agent reliability not only to model capability, but also to the design of the surrounding infrastructure.

- This work introduces a seven-layer taxonomy for harnesses spanning Execution environment, Tool interface, Context management, Lifecycle/Orchestration, Observability, Verification, and Governance.

- The first four layers describe the structural core of a harness. Execution (E) determines where agent code runs and what sandbox constraints bound it; Tooling (T) specifies how external capabilities are described, discovered, and invoked; Context (C) controls what the model can see over short-term, session-level, and persistent horizons; and Lifecycle (L) organizes the control flow that reads and writes that state, from single-agent loops to multi-agent and issue-to-pull-request workflows. 

- The remaining three layers describe the control plane around that core. Observability (O) captures traces, costs, failures, and reliability signals; Verification (V) turns tasks and traces into evaluation, failure attribution, and regression feedback; and Governance (G) constrains behavior through permission, identity, policy, hardening, audit, and human oversight mechanisms.

<br>

![](/blog/assets/report_harn_2.png)

<br>

## I. Execution Environment and Sandbox

<br>

- The field is diverging between two isolation strategies: managed sandboxes are migrating from shared-kernel containers toward dedicated-kernel microVMs, while OS-level permission sandboxes dispense with separate environments entirely and instead narrow the host’s view. 

- Plain Docker containers occupy a diminishing middle ground between these approaches, and the choice reflects the threat model (fully adversarial code versus prompt-injected but otherwise cooperative code) rather than a universal technology preference.

- Evaluation increasingly targets sandbox robustness directly: container-escape benchmarks such as SandboxEscapeBench and security benchmarks for code-interpreter agents such as CIBER show that sandbox configurations currently deployed in production are partially bypassable by frontier models.

- The field is separating infrastructure-level isolation from semantic or capability-level isolation at the tool-calling layer. 

- An infrastructure sandbox constrains the blast radius of an action once it is executed, while semantic isolation constrains which actions are permitted in the first place. A complete agent harness requires both.

- Sandboxing agent execution faces both traditional container-level threats (container escape, side channels, resource exhaustion) and agent specific threat classes that amplify classical concerns. First, prompt injection attacks allow external input, such as retrieved web pages, tool responses, or file contents, to hijack agent behavior and initiate malicious sandbox operations. Second, goal misalignment can cause the agent itself to actively attempt sandbox escape as an instrumental subgoal. Third, compositional amplification occurs when agents with multiple tools access allow a single sandbox weakness to cascade across integrated capabilities.

<br>

![](/blog/assets/report_harn_3.png)

<br>

### Deployment modes

<br>

- Agent sandbox infrastructure has diversified across deployment modes beyond the original self-hosted Docker pattern. Three modes coexist in current practice. 

- In the self-hosted mode, developers manage sandbox infrastructure directly, which is the default pattern for OpenHands and SWE-agent. 

- In the cloud (SaaS) mode, sandbox as a service providers handle infrastructure, as exemplified by E2B, Modal, and Daytona Cloud. 

- In the hybrid or bring-your-own-cloud (BYOC) mode, agent logic and sandbox execution are decoupled across environments; examples include the OpenHands SDK’s Local.

<br>

## II. Tool Interface and Protocol Layer

<br>

- Organize this layer into four complementary directions: protocol and interface standards; tool description, discovery, and selection; tool-augmented model training and integration; and scalability and session management.

- MCP has become the most visible tool-integration substrate for coding and enterprise agents, with an explicit host-client-server architecture and JSON-RPC-based typed exchange of tools, resources, and prompts.

- The practical value of MCP is not only schema-level interoperability, but also ecosystem liquidity: agent builders can reuse an expanding server catalog instead of implementing custom connectors for each deployment.

<br>

### Scalability and Session Management

<br>

- Stateful tool sessions improve continuity but increase bookkeeping complexity, especially when calls are parallelized or delegated across multiple agents. 

- Failure modes include stale handles, inconsistent tool state across retries, and context-window saturation from verbose tool traces. 

- Effective harness design therefore requires explicit lifecycle controls for tool sessions, bounded tool context injection, and observability hooks that can attribute errors to either planner logic or interface/protocol failures.

<br>

## III. Context and Memory Management

<br>

> 💡 NOTE: We will be looking at Memory in the future (**[travel here](http://marina.nullstar.fun/pages/post.html?post=report_memory)**).

<br>

- What information the model sees at each step of execution and how knowledge persists across turns and sessions. 

- The core engineering problem is simple to state: give the model exactly the right information at each step, nothing more. Too little context and the agent lacks the state needed to act correctly. Too much and performance degrades in ways that are measurable, consistent across models, and not fully understood.

<br>

### Why Context Must Be Engineered

<br>

- Larger context windows do not solve the memory problem. Understanding why requires looking at the architecture.

- Quadratic attention cost. The transformer’s self-attention mechanism computes pairwise relationships between every token in the context (Vaswani et al., 2017). For `n` tokens, this produces `n^2` pairwise weights; compute and memory scale quadratically with context length. Engineering techniques such as FlashAttention and position-encoding interpolation reduce constant factors, but the quadratic structure is architectural.

- Doubling the context does not double cost – it quadruples it. This makes the context window a scarce resource.

- The U-shaped attention curve. Architectural cost alone does not explain why models fail on long contexts even when computation is affordable. Liu et al. (2024a) provided the key empirical result: on multi-document question answering with 20 input documents, accuracy drops by more than 30% when the relevant document sits in the middle of the context, compared to placing it at the start or end. This U-shaped performance curve holds across models, tasks, and context lengths, including models trained specifically on long contexts. The practical implication is direct: information placement matters as much as information presence. An agent that retrieves the right content but positions it poorly gains little from the retrieval.

- Context rot at scale. Hong et al. (2025) evaluated 18 frontier models, including GPT-4.1, Claude Opus 4, Gemini 2.5, and Qwen3, under controlled conditions designed to isolate input length from task difficulty. Every model degraded as input grew. The degradation was non-uniform and task-specific. Semantically ambiguous queries, where the relevant passage does not lexically match the question, showed steeper degradation than exact-match queries, pointing to a compound failure: the model cannot localize relevant information, and then cannot reason over it once located. The degradation also begins well before windows are full. A model rated for 200K tokens may show significant performance loss at 50K. This phenomenon is the normal operating condition for any agent that accumulates tool results, intermediate reasoning, and file contents over multiple steps.

- The three-tier memory architecture, covering the active context window, session-level state, and cross-session storage, has emerged as the dominant organizing framework. It maps directly onto the classical memory hierarchy of operating systems, which provides both useful intuition and a vocabulary for matching the right technique to the right time horizon.

<br>

### Short-Term: Managing the Active Context Window

<br>

- In practice, effective system prompts are organized into clearly delineated sections for background, instructions, tool guidance, and output format, using XML tags or Markdown headers to separate them. The recommended workflow is to start with a minimal prompt on the best available model, identify failure modes empirically, then add targeted instructions to address specific gaps. Preemptively enumerating every edge case tends to bloat prompts without improving reliability.

- Tool definitions are a major context consumer. Every schema, name, description, and parameter type is injected at every call. A large tool set can consume tens of thousands of tokens before the agent reads the user request. The principle that emerges from production deployments is to prefer fewer, more expressive tools over a large menu of narrow ones. If a human engineer cannot say which tool applies in a given situation, the model cannot be expected to do better. Tools should be self-contained, robust to error, and unambiguous in their intended use, with descriptive parameter names that play to the model’s strengths.

- Rather than loading all potentially relevant information upfront, effective agents maintain lightweight identifiers such as file paths, stored queries, and web links, and use them to load data on demand as the task unfolds.

-  Claude Code uses a hybrid strategy in practice. `CLAUDE.md` files are loaded at session start to provide project context, while glob and grep commands let the agent navigate and load specific file contents just in time. This sidesteps both the stale-indexing problem and the cost of large prefills. Environmental metadata also carries implicit signals. File sizes suggest complexity; naming conventions hint at purpose; timestamps proxy for relevance. Agents can assemble understanding layer by layer, keeping only what is currently necessary in the active window.

- [??🧐??] Prompt caching is the single most cost-effective optimization available to production agent deployments, and its benefit depends entirely on how context is structured. After five architectural iterations of their production agent, the Manus team identified KV-cache hit rate as “the single most important metric for a production-stage AI agent".

- Three design rules follow from the caching model. First, keep the prompt prefix stable: a single token difference at the start of the system prompt invalidates the cache for everything that follows. Second, treat context as append-only: modifying past actions or observations breaks cache reuse by creating a different prefix sequence. Third, use deterministic serialization: non-stable key ordering in JSON serialization silently invalidates caches across otherwise identical requests.

- Because tool definitions typically appear near the front of the serialized context, adding or removing tools invalidates cached content for all subsequent turns. Manus addresses this by using a context-aware state machine that masks token logits during decoding to prevent selection of unavailable actions, rather than modifying the tool definition list at runtime. Anthropic’s context management release operationalizes caching at the product level through explicit `cache_control` breakpoints.

<br>

### Mid-Term: Session State and Cross-Run Persistence

<br>

- After each compaction step that cleared the main conversation history, the agent read its own notes and continued multi-hour training sequences without losing coherence. The key insight is that note-taking externalizes working memory. Rather than relying on conversation history to carry task state, the agent writes what matters to an external store and reads it back on demand.
<br>

![](/blog/assets/report_harn_5.png)

<br>
- Task state, specifications, intermediate results, and dependency graphs are written to the filesystem at each milestone and loaded selectively at the start of the next run, bypassing the context window entirely for content that is not immediately relevant.

- Tools such as claude-mem (Newman, 2025) operate as plugin-style memory layers: they capture session history, extract the information most useful in a future run, and prepend it to the next session’s context. This requires no vector database and no graph store, while providing substantial continuity across runs.

<br>

### Long-Term: Persistent Memory Systems

<br>

- Long-term memory systems provide indexed, retrievable storage that persists across sessions, tasks, and agent instances. Where mid-term techniques rely on forward injection of summaries, long-term systems support arbitrary recall: given a query, the system retrieves the most relevant stored memories regardless of when they were created.

- The Memory Stream stores all of the agent’s observations as natural-language records with timestamps and importance scores. At each step, a retrieval model surfaces the most relevant memories by combining three signals: recency, importance (scored by the agent at write time), and relevance to the current query. A second mechanism, reflection, periodically synthesizes stored observations into higher-level insights. 

- The agent asks itself what the most salient questions are from its recent experience, retrieves relevant records, and generates conclusions that are stored back into the Memory Stream. Ablation experiments showed that each of the three components, observation, reflection, and retrieval, contributes independently to behavior quality; removing any one produces measurable degradation. The observation-reflection-retrieval triad remains the standard template for agent memory design.

<br>

### Production Memory Systems

<br>

- Mem0 architecture combines three storage backends: a vector database for semantic similarity search, a graph database for relationship modeling, and a key-value store for fast fact retrieval. An LLM-based extraction layer processes new interactions, identifies facts and preferences, and routes records to the appropriate store.

- A-MEM draws on the Zettelkasten knowledge management system. Rather than storing memories as flat records, it generates a structured note for each new memory that includes keywords, tags, a contextual description, and a dynamic set of links to semantically related memories. When a new memory is added, A-MEM not only stores it but also retroactively updates the context and attributes of existing related notes, allowing the memory graph to evolve as knowledge accretes. This addresses a fundamental limitation of retrieval-based systems: the relevance of a stored memory may not be apparent at write time, and its significance can only be assessed in relation to later information.

- Hindsight takes the position that most memory systems focus on remembering when the real need is learning. Its API exposes three operations: retain to store new information, recall to retrieve relevant memories, and reflect to generate a disposition-aware response that integrates memory with current context.

- Honcho builds a model of users rather than a store of facts about them. An asynchronous reasoning pipeline called “dreaming” continuously processes past interactions in the background, extracting not just explicit facts but inferred conclusions about preferences, communication styles, and evolving goals. The entity-centric data model supports multi-agent environments where multiple agents interact with the same user: each agent maintains its own observation perspective, preventing cross-contamination while a shared user model accumulates understanding from all interactions.

- Mozilla AI’s cq addresses a gap that the other systems leave open: shared memory across agent instances. Most long-term memory systems are per-agent or per-user; when multiple agents work on related tasks, each instance independently rediscovers what the others have already learned. cq is an open standard for shared agent learning in which agents persist, query, and confirm collective knowledge across a fleet. Its architecture is MCP-native and operates at three tiers: local knowledge stored on the developer’s machine, organization-shared knowledge accessible to a team, and cross-team knowledge.

- Compaction summarizes a context window approaching its limit and reinitiates execution with a compressed representation of the accumulated state.

- The summary must preserve architectural decisions, unresolved bugs, and implementation details while discarding redundant tool outputs and intermediate reasoning already incorporated into later steps. 

- The recommended tuning workflow starts by maximizing recall, capturing every potentially relevant piece of information from the trace, then iterates to improve precision by removing superfluous content. One does not start from the other direction. Removing too much early produces an agent that loses context it needed later, and that loss is not recoverable.

- When a task requires deep exploration of a subtopic, the exploration itself generates large amounts of intermediate context that is useful within the subtask but pollutes the orchestrator’s view of the overall task. The sub-agent architecture addresses this by assigning subtasks to dedicated agents, each with a fresh context window, which return only a condensed 1,000 to 2,000 token summary of their findings to the orchestrator.

- Sharing context between agents is expensive: it produces larger prefills and eliminates KV-cache reuse across different system prompts. The trade-off between isolation cost and coordination benefit must be made explicitly for each task type.

- Production deployments do not apply a single technique uniformly; they select different techniques at different points in the execution based on task structure.

- Pre-load content that is always needed, retrieve just-in-time content that is conditionally needed, compact history when the window approaches saturation, and spawn sub-agents when a subtask requires exploration that would pollute the orchestrator’s context.

- Checkpoint and resume patterns allow agents to survive transient failures without losing task state, and lifecycle hooks can trigger compaction or memory consolidation automatically at configurable thresholds.

<br>

### Context Drift and the Limits of Current Approaches

<br>

- Context drift, the progressive degradation of agent behavior over extended interactions, remains the hardest open challenge in this layer.

- Context drift is distinct from context rot, though both arise from the same architectural constraints. 

- Context rot is a property of a single inference step: adding more tokens to a fixed context degrades retrieval and reasoning quality. 

- Context drift is a property of an extended trajectory. As the agent accumulates turns, its behavior drifts from the original intent in ways that compaction and retrieval steps can slow but not prevent. After 100 or more turns, agents frequently repeat work already done, contradict earlier decisions without awareness, and lose track of the motivating goal. 

- The root cause is not simply window saturation. Even with aggressive compaction, the summaries that survive each compression step carry subtle inaccuracies that compound over time. The agent’s accumulated assumptions can diverge from the actual task environment, and nothing in the current architecture detects this divergence.

- A secondary problem is that context drift is hard to measure. Standard benchmarks evaluate agents on tasks that complete within a few dozen steps; the failure modes that appear at 100 or more turns are not captured.

- Compaction reduces the token count but cannot guarantee that the compressed representation accurately captures all relevant state. Information lost at each compression step is gone. Retrieval systems can surface relevant prior memories, but the query must be well-formed to do so.

- A drifting agent may not know what it needs to retrieve to correct its course. Sub-agent isolation prevents subtask context from polluting the orchestrator, but the orchestrator’s own context still accumulates drift over time. 

- A full harness layer with verification loops, human-in-the-loop checkpoints at strategic intervals, and anomaly detection capable of identifying behavioral divergence is required. 


<br>

## IV. Lifecycle and Orchestration

<br>

- A single-agent inner loop is the repeated cycle in which one agent observes the current situation, decides on an action, invokes a tool or produces an output, and use the results to continue. Multi-agent orchestration coordinates several such loops, usually by assigning different roles to different agents or by routing work among them. 

- A full lifecycle pipeline places these agent loops inside a broader software or task workflow, such as moving from an issue to code changes, tests, review, and a pull request. Across these levels, systems also differ in how they maintain state. 

- Stateless replay reconstructs the run from the recorded interaction history. 

- Stateful execution stores operational state outside the prompt, for example in files, repositories, databases, task graphs, or services.

- Many practical systems are hybrid: they keep replayable histories while also relying on persistent artifacts.


<br>

### Lifecycle State Management

<br>

- Lifecycle state management concerns the operational state needed to continue an agent run across turns, sessions, failures, and handoffs. This includes pending subtasks, tool results, intermediate artifacts, repository changes, coordination metadata, session persistence, and checkpoint resume mechanisms. 

- These mechanisms make orchestration durable rather than transient: the agent can continue from prior work instead of treating every step as an isolated model call.

- Stateful designs persist execution state in files, databases, repositories, task graphs, or external services, improving continuity and recovery but introducing consistency and debugging challenges.

<br>

### Single-Agent Inner Loop

<br>

- Conceptually, the single-agent loop follows the ReAct paradigm (Yao et al., 2022), interleaving reasoning, action, and observation.

<br>

### Multi-Agent Orchestration Patterns

<br>

- Multi-agent orchestration extends the single-agent loop by composing multiple agents with specialized roles.

- Instead of asking one agent to plan, execute, check, and revise alone, a multi-agent harness can separate these responsibilities across agents or subagents. This structure supports task decomposition, parallel exploration, critique, validation, and aggregation, making it better suited to complex tasks than an isolated loop.

- Execution at this level is usually Stateful or Hybrid, since multi-agent systems must maintain coordination state, role assignments, task graphs, shared artifacts, or intermediate results.

- The central abstraction is the task runner: a harness that manages scheduling, state persistence, retries, validation, and iterative refinement over a complete task lifecycle.

- These systems compose the previous abstractions: single-agent loops provide the execution primitive, multi-agent patterns provide coordination, and the task runner integrates them into an end-to-end workflow in which humans steer while agents execute.

- Several recurring patterns appear in this design space. 

1. Hierarchical orchestration uses a higher-level controller to assign work to agents or subagents and integrate their outputs. 
2. Workflow orchestration organizes agents and tools into explicit stages or control logic. 
3. Fan-out runs multiple agents in parallel to explore diverse solutions. 
4. Graph composition represents agents, tools, or states as nodes in an interaction graph, allowing multiple coordination patterns to coexist.

<br>

![](/blog/assets/report_harn_6.png)

<br>

## V. Observability and Operations

<br>

> 💡 NOTE: We will be looking at Observability and Evals in the future (**[travel here](http://marina.nullstar.fun/pages/post.html?post=report_evals)**).

<br>

- How agent behavior is monitored, debugged, and made reliable in production. 

- Observability deserves independent treatment, separate from lifecycle hooks, because it has spawned a dedicated ecosystem of platforms, specifications, and engineering practices.

- The foundation of agent observability is structured trace collection: recording every LLM call, tool invocation, retrieval step, and context-assembly operation as a tree of spans that can be inspected, filtered, and replayed.

- The observability requirement is twofold: tracking (knowing where tokens are spent) and optimization (spending fewer tokens for the same outcome).

- Together, routing and caching have become recurring building blocks in production cost-optimization stacks and are directly applicable to harness-level instrumentation, where each tool call and context-assembly step can be independently metered and routed.

- The practical implication is that reliability for agents requires a layered detection strategy: lightweight rule-based checks for structural failures (malformed tool calls, schema violations), statistical monitoring for performance drift (latency, token usage, cost trends), and LLM-based semantic analysis for reasoning failures (hallucination, plan-action misalignment, premature stopping).

- Every harness component encodes an assumption about what the model cannot do on its own (Anthropic, 2026c). As models improve, observability systems must detect not only when agents fail, but also when harness components have become unnecessary overhead. 

- The ideal observability system would include a meta-monitoring layer that tracks which interventions (context resets, evaluator feedback loops, tool restrictions) are still load-bearing, enabling continuous harness simplification alongside model upgrades

<br>

## VI. Verification and Evaluation

<br>

- A harness-aware evaluation should treat the reported score as a property of the model–harness pair, not of the model alone. This motivates evaluation protocols that either lock the harness across models or vary harness configurations as an explicit experimental factor.

- Conventional LLM evaluation primarily scores outputs on fixed inputs, whereas harness evaluation measures an execution episode: a task is grounded in an environment, the agent interacts with tools and state over time, traces are captured, and the evaluator judges both the final result and the path taken to reach it.

- The five-stage decomposition follows the causal path of an agent evaluation run. Before an agent can be evaluated, the benchmark must specify the task, environment, tools, constraints, and success criteria.

- Before execution, the setup must be validated so that environment or grader failures are not mistaken for model failures. During execution, the harness must capture traces that make the run diagnosable. 

- After execution, the system must judge the outcome, trajectory, and evaluator reliability, then attribute failures to likely harness components. 

- Finally, the resulting diagnosis should feed back into regression tests and future harness revisions. In this view, evaluation is not a terminal scoring step, but a quality-control loop over the full agent harness.

- In benchmarks such as SWE-bench, executable tests provide scalable outcome verification, but score validity still depends on correct environment setup, task specification, and test reliability.

- For open-ended tasks, LLM-as-Judge systems require calibration, bias mitigation, and consistency checks rather than blind reuse of a strong model as a grader.

- Evaluator readiness is therefore a prerequisite for meaningful failure attribution.

<br>

![](/blog/assets/report_harn_7.png)

<br>

## VII. Governance and Security

<br>

- Designing permission models that are both expressive and usable is an unsolved problem. 

- Overly restrictive policies degrade agent utility; overly permissive ones negate the purpose of governance.

- The community has not converged on a standard permission specification language that is portable across harness implementations. 

- Open questions also persist about whether actions should be attributed to the human operator, the agent instance, or transient task identities.

- Permission models define what is allowed. Lifecycle hooks define when policy checks fire. 

- Many harnesses expose hook points at each stage of the agent loop: before planning, before tool invocation, after tool execution, and before response delivery. These hooks allow governance logic to be injected without modifying the agent’s core reasoning.

- Pre-execution hooks: input guardrails. Pre-invocation hooks: output guardrails and action validation. Post-execution hooks: information flow control and taint tracking Human-in-the-loop hooks.

- The open problem is to make the runtime substrate both measurable and composable. 

- Future harnesses need common security evaluations for prompt injection, goal misalignment, and compositional amplification; cost models that decide when to use containers, microVMs, OS-level permission boundaries, full desktop VMs, browser environments, or learned surrogates; and portability layers that preserve semantics across self-hosted, cloud, and hybrid deployments. 

- The bundle-versus-compose split between framework-integrated runtimes and sandbox abstractions should be treated as an empirical design question rather than a product preference. 

- Standards such as MCP may reduce composition cost, but only if the tool, governance, and observability layers expose enough state to keep runtime choices auditable, recoverable, and safe.

- Harness design should not be assumed to move monotonically toward more scaffolding. Every wrapper, reset, verifier, planner, memory rule, and permission gate encodes an assumption about what the model cannot do reliably on its own. 

- As model capabilities change, harness interventions should be re-estimated rather than assumed to remain beneficial. A factorial model-by-harness evaluation can reveal when an intervention improves all models, helps only specific model families, or reverses model rankings.

<br>


----

# 2️⃣🐯 Paper II: [Architectural Design Decisions in Agent Harnesses (H. Wei, 2026)](https://arxiv.org/pdf/2604.18071)

<br>

#### ✨ Let's continue our studies by outlining the fundamental architectural design dimensions in multi-agent systems (i.e., subagent architecture, context management, tool systems, safety mechanisms, and orchestration). ✨

<br>


- The ecosystem can be read through two contrasting emphases: application frameworks, which primarily provide programming abstractions for building agent applications, and surrounding execution infrastructure, which more explicitly organizes the reusable runtime conditions within which agents operate.

<br>

| Dimension             | Design Decisions Examined                                                           |
| --------------------- | ----------------------------------------------------------------------------------- |
| Subagent Architecture | Presence of subagents, creation style, hierarchy depth, communication relationship  |
| Context Management    | Storage backend, compression strategy, persistence scope, token awareness           |
| Tool System           | Registration style, extension mechanism, execution pathway, protocol integration    |
| Safety Mechanisms     | Approval workflow, isolation level, audit visibility                                |
| Orchestration         | Control-flow style, planning strategy, event-driven vs. command-driven coordination |

<br>

- Subagent architecture captures the structural decomposition of agent roles and delegation relations: whether multiple agent-like components exist, how they are spawned, and how authority or communication is distributed. 

- Orchestration captures the temporal control logic by which tasks are planned, sequenced, triggered, and completed, whether or not multiple agents are present. 

- The distinction matters analytically because a project may have sophisticated orchestration without explicit subagents, or multiple subagents without a highly formalized workflow model.

<br>

### Context Management Decisions

<br>

- Context management concerns how frameworks retain, compress, and reintroduce information across turns. In the source reports, this topic spans both “memory” and “context management” artifacts.

- The first recurring decision concerns the storage backend. The observed spectrum runs from no persistence, to session-only in-memory state, to file-backed storage, and finally to more structured database- or vector-backed retrieval. File-based persistence is especially important in Agent harnesses because it offers continuity without introducing a heavyweight service dependency.

- The second recurring decision concerns compression strategy. Some projects simply truncate the accumulated history, while others introduce summaries, layered memory, or explicit compression passes before constructing the next prompt. This distinction matters because context management is not only about where information is stored, but also about how much of it can be carried forward under token limits. 

- The third recurring decision concerns persistence scope. Some frameworks preserve information only within a running session. Others write conversation state, tool traces, or task artifacts to disk so that work can continue across sessions. This decision often reflects intended use: ephemeral assistants can tolerate session-bound state, whereas long-running coding or research workflows usually require more durable context.

- The fourth recurring decision concerns token awareness. A few systems treat the context window as an implicit limit and rely on ad hoc trimming. More explicit designs track token usage, reserve budget for future tool calls or subagents, and trigger compression or summarization before the prompt becomes overloaded.

<br>

### Tool System Decisions

<br>

- Three design questions recur most often in this dimension: how tools are registered, how they are surfaced for selection or discovery, and how execution is bounded. 

- The registration spectrum ranges from hard-coded, decorator-driven, explicity registry, declarative/DSL, protocol-based (MCP), plugin ecosystem, and delegation/proxy approaches.

- Tool-execution security also varies widely. Some frameworks execute tools in-process with minimal checks, while others add command filtering, process isolation, containerization, or external delegation. 

- In practice, tool registration and tool execution are tightly coupled design decisions: a framework that supports open-ended extension also requires a clearer execution boundary and a more credible account of approval and auditing.

<br>

### Security and Isolation Decisions

<br>

- Safety mechanisms determine how a framework constrains risky actions, isolates execution, and records what occurs. 

- In Agent harnesses, this dimension becomes especially important once tools can modify files, invoke shells, access networks, or coordinate multiple execution steps.

- Approval Workflows: The spectrum ranges from no approval, to one-off confirmation, to more explicit policy-based approval. This choice determines when a user, policy rule, or other governance layer can intervene before execution.

<br>

### Orchestration Decisions

<br>

- Orchestration design decisions determine how a framework structures task execution over time. This includes not only whether workflows are imperative or declarative, but also how planning, decomposition, and coordination are organized.

- For workflow definition, the spectrum ranges from imperative, declarative/YAML/DSL (configuration), to event-driven (state change driven) approaches.

<br>

### Multi-Agent Orchestrator Pattern

<br>

- Orchestrator-worker or recursive subagent architecture
- Hierarchical or hybrid memory systems
- Structured tool delegation with category routing
- Policy-based security with approval workflows
- Container-based or WASM sandboxing
- Event-driven or structured workflow orchestration

<br>

### Enterprise Full-Featured Pattern

<br>

- Multi-level recursive or event-driven subagent architecture
- Enterprise-grade memory with vector database integration
- Full MCP ecosystem integration
- Multi-layer defense: container isolation, policy engines, audit trails
- Hierarchical memory with working, short-term, and long-term layers
- Plugin architecture with versioning and dependency management

<br>

### Scenario-Verticalized or Research-Oriented Pattern

<br>

- Highly variable subagent architectures
- Highly variable memory systems
- Often minimal or experimental tool implementations
- Security often minimal or absent
- Sophisticated core capabilities matching research focus
- Simplified infrastructure and deployment

<br>


---

# 3️⃣🐯 Prelude: Agentic and Loop Patterns

<br>

#### ✨ Let's introduce a few design patterns that will help guide the rest of our discussion. ✨

<br>

---

## PRELUDE I: [Agentic Patterns (philschmid, 2025)](https://www.philschmid.de/agentic-pattern)

<br>

### Workflow: Prompt Chaining

<br>

- The output of one LLM call sequentially feeds into the input of the next LLM call.
- This pattern decomposes a task into a fixed sequence of steps, each handled by an LLM call that processes the output of the preceding step.
- Suitable for tasks involving sequential subtasks.

<br>

### Workflow: Routing

<br>

- An initial LLM acts as a router, classifying the user's input and directing it to the most appropriate specialized task or LLM.
- This allows individual downstream tasks to be optimized in isolation.

<br>

### Workflow: Parallelization

<br>

- A task is broken into independent subtasks that are processed simultaneously by multiple LLMs, with their outputs aggregated.
- This pattern uses concurrency to handle tasks (e.g., MapReduce or RAG with query decomposition).
- It can improve latency when subtasks do not depend on one another.

<br>

### Reflection Pattern

<br>

- An agent evaluates its own output and uses that feedback to refine its response iteratively.
- Also known as the evaluator-optimizer pattern, it uses a self-correction loop.
- An initial LLM generates a response or completes a task. A subsequent LLM step acts as a reflector or evaluator. Its feedback is then fed back into the process, prompting the LLM to produce a refined output.

<br>

### Tool Use Pattern

<br>

- The LLM is provided with definitions (name, description, and input schema) of available tools (e.g., functions, APIs, and databases).
- Based on the user's query, the LLM can decide to call one or more tools by generating a structured output.
- This output is used to execute the external tool or function, and the result is returned to the LLM.

<br>

### Planning Pattern (Orchestrator-Workers)

<br>

- A central planner LLM breaks down a complex task into a dynamic list of subtasks, which are then delegated to specialized worker agents for execution.
- This pattern aims to solve complex problems requiring multi-step reasoning by creating an initial plan.
- The plan is generated dynamically based on the user's input.
- Subtasks are then assigned to worker agents. An orchestrator LLM collects the results, evaluates whether the overall goal has been achieved, and either synthesizes the final output or initiates a replanning step.

<br>

### Multi-Agent Pattern

<br>

- Multiple distinct agents, each assigned a specific role, persona, or area of expertise, collaborate to achieve a common goal.
- The agents interact and collaborate, often under the coordination of a central coordinator agent or through handoff logic, in which one agent passes control to another.

<br>

![](/blog/assets/report_harn_4.png)

<br>

### Some good coding references

<br>

- **[OpenAI Agents SDK](https://github.com/openai/openai-agents-python/tree/main)** and **[examples of agent patterns](https://github.com/openai/openai-agents-python/tree/main/examples/agent_patterns)**
- **[Anthropic's recipes of agent patterns](https://github.com/anthropics/claude-cookbooks/tree/main/patterns/agents)** and **[blog post](https://www.anthropic.com/research/building-effective-agents)**
- **[Microsoft's agent design patterns](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns)**

<br>

---

## PRELUDE II: [Loop Patterns (cobusgreyling, 2026)](https://github.com/cobusgreyling/loop-engineering/)

<br>

> Loop engineering adds structures that start an agent loop, verify its results, and start it again over time. It's the practice of designing automated control structures that repeatedly invoke coding agents, triggered on a schedule or by events, with each agent loop bounded by a machine-checkable stop condition. A well-engineered loop persists state across agent loops, verifies results independently of the implementation agents, bounds inference costs, restricts what an unattended agent loop may change without approval, and defines when humans should intervene.

<br>

Each loop pattern should answer:

- What problem it solves
- How the loop runs
- Circuit breaker
- Verification approach
- Human hand-off strategy
- Tool-specific notes
- Failure modes
- Cost profile
- Success metrics

<br>

A loop needs:

- Automations that run on a schedule and perform discovery and triage by themselves
- Worktrees so two agents working in parallel don't step on each other
- Skills to document the project knowledge that the agent would otherwise just guess
- Plugins and connectors to plug the agent into the tools you already use
- Sub-agents so one agent comes up with an idea and a different one checks it

<br>

### Examples of Coding-Oriented Loops

<br>

- Babysitter Loop → Goal: Reduce the human time spent herding a task while keeping the human in the judgment seat.
- Daily Triage Loop → Goal: Start each day (or active period) with a prioritized, actionable picture of what needs attention.
- Issue Triage Loop → Goal: Continuously discover, deduplicate, prioritize, and label incoming issues, feature requests, and discussions so the team (and other loops) always have a clean, actionable top of the queue. Pure reporting/proposal mode.
- CI Sweeper Loop → Goal: React quickly to failing tasks or jobs — diagnose, propose minimal fixes, and escalate when the loop cannot confidently resolve them.
- Post-Merge Cleanup Loop → Goal: After merges to main, sweep for follow-up work — deprecations, TODOs, tech debt tickets, stale feature flags, and documentation gaps — without blocking the merge itself.
- Dependency Sweeper Loop → Goal: Discover outdated or vulnerable dependencies, apply the smallest safe updates, verify with tests/builds in isolation, and escalate anything risky (major bumps, breaking changes, or high-severity vulnerabilities) to a human.
- Changelog Drafter Loop → Goal: Scan merged PRs, commits, and labels since the last release (or on a regular cadence) and produce a high-quality, categorized draft of release notes or CHANGELOG entries.

<br>

---

# 4️⃣🐯 How Leading AI Companies Design Their Agent Harnesses and Orchestration

<br>

#### ✨ Through my own research and by asking the frontier robots, I've read dozens, if not hundreds, of articles on to this subject throughout the year. Today, we'll explore a few seminal resources that illustrate the major advances, concerns, and directions in the field. This list is far from exhaustive, but it should be sufficiently illustrative and enlightening for the purposes of our technical debt week. ✨

<br>

---

## [How to Think About Agent Frameworks (LangChain, 2025)](https://www.langchain.com/blog/how-to-think-about-agent-frameworks)

<br>

- The hard part of building reliable agentic systems is making sure the LLM has the appropriate context at each step. This includes both controlling the exact content that goes into the LLM, as well as running the appropriate steps to generate relevant content.

- What causes agents to perform poorly sometimes? The LLM messes up: 1) incomplete or short system messages, 2) vague user input, 3) not having access to the right tools, 4) poor tool descriptions, 5) not passing in the right context, 6) poorly formatted tool responses.
- Most agentic frameworks are neither declarative or imperative orchestration frameworks, but rather just a set of agent abstractions.

- LangGraph is best thought of as a orchestration framework (with both declarative and imperative APIs), with a series of agent abstractions built on top. It is an event-driven framework for building agentic systems. The two most common ways of using it are through: a declarative, graph-based syntax, and agent abstractions (built on top of the lower level framework).

- Agentic systems can be represented as nodes and edges. Nodes represent units of work, while edges represent transitions. Nodes and edges are nothing more than normal Python or TypeScript code - so while the structure of the graph is represented in a declarative manner, the inner functioning of the graph’s logic is normal, imperative code. Edges can be either fixed or conditional. So while the structure of the graph is declarative, the path through the graph can be completely dynamic.

<br>

---

## [How and When to Build Multi-Agent Systems (LangChain, 2025)](https://www.langchain.com/blog/how-and-when-to-build-multi-agent-systems)

<br>

- One of the hardest parts of building multi-agent (or even single-agent) applications is effectively communicating to the models the context of what they’re being asked to do.

- When using a framework, you need to have full control what gets passed into the LLM, and full control over what steps are run and in what order (in order to generate the context that gets passed into the LLM). We prioritize this with LangGraph, which is a low-level orchestration framework with no hidden prompts, no enforced “cognitive architectures”.

- The key insight is that read actions are inherently more parallelizable than write actions. When you attempt to parallelize writing, you face the dual challenge of effectively communicating context between agents and then merging their outputs coherently. 

- The durable execution is a key part of LangGraph, our agent orchestration framework. We believe all long running agents will need this, and accordingly it should be built into the agent orchestration framework.

<br>

---

## [Improving Deep Agents with Harness Engineering (LangChain, 2026)](https://www.langchain.com/blog/improving-deep-agents-with-harness-engineering)

<br>

> The goal of a harness is to mold the inherently spiky intelligence of a model for tasks we care about. Harness Engineering is about systems, you’re building tooling around the model to optimize goals like task performance, token efficiency, latency, etc. Design decisions include the system prompt, tool choice, and execution flow.

<br>

- We use Traces to understand agent failure modes at scale. Models today are largely black-boxes, their inner mechanisms are hard to interpret. But we can see their inputs and outputs in text space which we then use in our improvement loops.

- We use Harbor to orchestrate the runs. It spins up sandboxes (**[Daytona](https://www.daytona.io)**), interacts with our agent loop, and runs verification + scoring. Every agent action is stored in LangSmith. It also includes metrics like latency, token counts, and costs.


<br>

![](/blog/assets/report_harn_11.png)

<br>

- Part of harness engineering is building a good delivery mechanism for context engineering.

- Agents can be myopic once they’ve decided on a plan which results in “doom loops” that make small variations to the same broken approach (10+ times in some traces). We use a `LoopDetectionMiddleware` that tracks per-file edit counts via tool call hooks. It adds context like “…consider reconsidering your approach” after `N` edits to the same file. This can help agents recover from doom loops, though the model can continue down the same path if it thinks it’s correct.

- This is a design heuristic that engineers around today’s perceived model issues. As models improve, these guardrails will likely be unnecessary, but today helps agents execute correctly and autonomously.

- For the outer loop of improving agents, we’re looking at methods like RLMs to more efficiently mine traces. 

<br>

---

## [Choosing the Right Multi-Agent Architecture (LangChain, 2026)](https://www.langchain.com/blog/choosing-the-right-multi-agent-architecture)

<br>

> Context management: Specialized knowledge for each capability doesn't fit comfortably in a single prompt. If context windows were infinite and latency was zero, you could include all relevant information upfront. In practice, you need strategies to selectively surface information as agents work.

> Distributed development: Different teams develop and maintain each capability independently, with clear boundaries and ownership. A single monolithic agent prompt becomes difficult to manage across team boundaries.

> Four architectural patterns form the foundation of most multi-agent applications: subagents, skills, handoffs, and routers. Each takes a different approach to task coordination, state management, and sequential unlocking.

<br>

### Subagents: Centralized orchestration Pattern

<br>
- A supervisor agent coordinates specialized subagents by calling them as tools. The main agent maintains conversation context while subagents remain stateless, providing strong context isolation.

- Adds one extra model call per interaction because results must flow back through the main agent. This overhead provides centralized control and context isolation, but costs latency and tokens.

<br>

### Skills: Progressive disclosure Pattern

<br>

- An agent loads specialized prompts and knowledge on-demand. 

- Context accumulates in conversation history as skills are loaded, which can lead to token bloat on subsequent calls. However, the pattern provides simplicity and direct user interaction throughout.

<br>

### Handoffs: State-driven transitions Pattern

<br>

- The active agent changes dynamically based on conversation context. Each agent has the ability to transfer to others via tool calling.

- More stateful than other patterns, requiring careful state management. However, this enables fluid multi-turn conversations where context carries forward naturally between stages.

<br>

### Router: Parallel dispatch and synthesis Pattern

<br>

- A routing step classifies input and directs it to specialized agents, executing queries in parallel and synthesizing results. Routers are typically stateless, handling each request independently.

- Best for Applications with distinct verticals (separate knowledge domains), scenarios requiring queries across multiple sources in parallel, or situations where you need to synthesize results from multiple agents.

- Stateless design means consistent performance per request, but repeated routing overhead if you need conversation history. Can be mitigated by wrapping the router as a tool within a stateful conversational agent.

<br>

---

## [Making it Easy to Build Multi-Agent Applications (Google, 2025)](https://developers.googleblog.com/agent-development-kit-easy-to-build-multi-agent-applications/)

<br>

![](/blog/assets/report_harn_9.png)

<br>

> **[Agent Development Kit (ADK)](https://cloud.google.com/products/gemini-enterprise-agent-platform)** is an open-source framework designed to simplify the full stack end-to-end development of agents and multi-agent systems.

<br>

ADK provides capabilities across the entire agent development lifecycle:

1. Multi-Agent by Design: Build modular and scalable applications by composing multiple specialized agents in a hierarchy. Enable complex coordination and delegation.
2. Rich Model Ecosystem: Choose the model that works best for your needs. ADK works with your model of choice – whether it is Gemini or your any model accessible via Vertex AI Model Garden. The framework also offers LiteLLM integration letting you choose from a wide selection of models from providers like Anthropic, Meta, Mistral AI, AI21 Labs.
3. Rich Tool Ecosystem: Equip agents with diverse capabilities: use pre-built tools (Search, Code Exec), Model Context Protocol (MCP) tools, integrate 3rd-party libraries (LangChain, LlamaIndex), or use other agents as tools (LangGraph, CrewAI, etc).
4. Built-in streaming: Interact with your agents in human-like conversations with ADK's unique bidirectional audio and video streaming capabilities.
5. Flexible Orchestration: Define workflows using workflow agents (Sequential, Parallel, Loop) for predictable pipelines, or leverage LLM-driven dynamic routing (LlmAgent transfer) for adaptive behavior.
6. Integrated Developer Experience: Develop, test, and debug locally with a powerful CLI and a visual Web UI.
7. Built-in Evaluation: Systematically assess agent performance by evaluating both the final response quality and the step-by-step execution trajectory against predefined test cases.

<br>

```
from google.adk.agents import LlmAgent 
from google.adk.tools import google_Search

agent = LlmAgent(
    model="gemini-2.0-flash-exp", # Required: Specify the LLM 
    name="question_answer_agent", # Required: Unique agent name
    description="A helpful assistant agent that can answer questions.",
    instruction="""Respond to the query using google search""",
    tools=[google_search], # Provide an instance of the tool
)
```

<br>

An illustrative example:

1. Define a tool.
2. Define the agents and their relationships.
3. Before going live, ensure the agents behave predictably through integrated evaluation tools.

<br>

---

## [Architecting Efficient Context-Aware Multi-Agent Framework (Google, 2025)](https://developers.googleblog.com/en/architecting-efficient-context-aware-multi-agent-framework-for-production/)

<br>

- Today, organizations are deploying sophisticated, autonomous agents to handle long-horizon tasks: automating workflows, conducting deep research, and maintaining complex codebases. That ambition immediately runs into a bottleneck: context.

- A large context window will help context-related problems but won't address all context-related problems. In practice, the naive pattern—append everything into one giant prompt—collapses under a three-way pressure: 1) Cost and latency spirals: Model cost and time-to-first-token grow quickly with context size. "Shoveling" raw history and verbose tool payloads into the window makes agents prohibitively slow and expensive., 2) Signal degradation (“lost in the middle”): A context window flooded with irrelevant logs, stale tool outputs, or deprecated state can distract the model, causing it to fixate on past patterns rather than the immediate instruction. 3) Physical limits: Real-world workloads—involving full RAG results, intermediate artifacts, and long conversation traces—eventually overflow even the largest fixed windows.

- With ADK, context is a compiled view over a richer stateful system: 1) Sessions, memory, and artifacts (files) are the sources– the full, structured state of the interaction and its data., 2) Flows and processors are the compiler pipeline – a sequence of passes that transform that state., 3) The working context is the compiled view you ship to the LLM for this one invocation.

- What is the intermediate representation? Where do we apply compaction? How do we make transformations observable?

- Three design principles: 1) Separate storage from presentation: We distinguish between durable state (Sessions) and per-call views (working context). This allows you to evolve storage schemas and prompt formats independently., 2) Explicit transformations: Context is built through named, ordered processors, not ad-hoc string concatenation. This makes the "compilation" step observable and testable. 3) Scope by default: Every model call and sub-agent sees the minimum context required. Agents must reach for more information explicitly via tools, rather than being flooded by default.

- ADK separates storage from presentation and organizes context into distinct layers, each with a specific job: 1) Working context – the immediate prompt for this model call: system instructions, agent identity, selected history, tool outputs, optional memory results, and references to artifacts., 2) Session – the durable log of the interaction: every user message, agent reply, tool call, tool result, control signal, and error, captured as structured Event objects. 3) Memory – long-lived, searchable knowledge that outlives a single session: user preferences, and past conversations., 4) Artifacts – large binary or textual data associated with the session or user (files, logs, images), addressed by name and version rather than pasted into the prompt.

- Modern models support context caching (prefix caching), which allows the inference engine to reuse attention computation across calls. ADK’s separation of "Session" (storage) and "Working Context" (view) provides a natural substrate for this optimization. The architecture effectively divides the context window into two zones: 1) Stable prefixes: System instructions, agent identity, and long-lived summaries., 2) Variable suffixes: The latest user turn, new tool outputs, and small incremental updates.

- Where Artifacts handle discrete, large objects, ADK's Memory layer manages long-lived, semantic knowledge that extends beyond a single session—user preferences, past decisions, and domain facts. We designed the `MemoryService` around two principles: memory must be searchable (not permanently pinned), and retrieval should be agent-directed. The `MemoryService` ingests data—often from finished Sessions—into a vector or keyword corpus. Agents then access this knowledge via two distinct patterns: 1) Reactive recall: The agent recognizes a knowledge gap ("What is the user's dietary restriction?") and explicitly calls the `load_memory_tool` to search the corpus., 2) Proactive recall: The system uses a pre-processor to run a similarity search based on the latest user input, injecting likely relevant snippets via the `preload_memory_tool` before the model is even invoked.

- At a high level, ADK maps multi-agent interactions into two distinct architectural patterns. The first is Agents as Tools. Here, the root agent treats a specialized agent strictly as a function: call it with a focused prompt, get a result, and move on. The callee sees only the specific instructions and necessary artifacts—no history. The second is Agent Transfer (Hierarchy). Here, control is fully handed off to a sub-agent to continue the conversation. The sub-agent inherits a view over the Session and can drive the workflow, calling its own tools or transferring control further down the chain.

<br>

---

## [Developer’s Guide to AI Agent Protocols (Google, 2026)](https://developers.googleblog.com/en/developers-guide-to-ai-agent-protocols/)

<br>

![](/blog/assets/report_harn_21.png)

<br>

> Explain MCP, A2A, UCP, AP2, A2UI, and AG-UI in the context of Agent Development Kit (ADK).

<br>

### Model Context Protocol (MCP)

<br>

- Gives you a single standard connection pattern for hundreds of servers. Servers advertise their tools, and your agent discovers them automatically.

<br>

### Agent2Agent Protocol (A2A)

<br>

- Standardizes how agents discover and communicate with each other.
- Each A2A agent publishes an Agent Card at a well-known URL that describes its name, capabilities, and endpoints.

<br>

### Universal Commerce Protocol (UCP)

<br>

- The Universal Commerce Protocol (UCP) standardizes the project lifecycle into modular capabilities through strongly typed request and response schemas that remain consistent across any underlying transport.
- The agent interacts with custom integrations via a unified pattern, regardless of whether the connection is established via REST, MCP, A2A, or Embedded Protocols (EP).

<br>

### Agent Payments Protocol (AP2)

<br>

- AP2 adds the missing layer with typed mandates that provide non-repudiable proof of intent and enforce configurable guardrails and audit trails.

<br>

### Agent-to-User Protocol (A2UI)

<br>

- A2UI lets the agent dynamically compose novel layouts from a fixed catalog.
- It uses a declarative JSON format made up of 18 component primitives, separating the UI structure from the underlying data.

<br>

### Agent-User Interaction Protocol (AG-UI)

<br>

- Traditional REST APIs return a response, and they’re done, but agents are different. They stream text incrementally, call tools in the middle of a response, and sometimes pause to wait for human input.
- AG-UI eliminates this boilerplate. It acts as middleware that translates raw framework events into a standardized SSE stream. The frontend listens for typed events like `TEXT_MESSAGE_CONTENT` and `TOOL_CALL_START`.

<br>

---

## [The Open-Source Engine for Agentic AI Apps (Microsoft, 2025)](https://devblogs.microsoft.com/foundry/introducing-microsoft-agent-framework-the-open-source-engine-for-agentic-ai-apps)

<br>

> **[Microsoft Agent Framework](https://github.com/microsoft/agent-framework)** is an open-source SDK and runtime designed to let developers build, deploy, and manage sophisticated multi-agent systems with ease. It unifies the enterprise-ready foundations of Semantic Kernel with the innovative orchestration of AutoGen.

<br>

### Open Standards & Interoperability

<br>

- MCP (Model Context Protocol): Agents can dynamically discover and invoke external tools or data servers exposed over MCP. 
- Agent-to-Agent (A2A): Agents can collaborate across runtimes using structured, protocol-driven messaging. A2A support allows developers to create workflows where one agent retrieves data, another analyzes it, and a third validates results.
- OpenAPI-first design: Any REST API with an OpenAPI specification can be imported as a callable tool instantly. 
- Cloud-agnostic runtime: Agents can run in containers, on-premises, or across multiple clouds, making them portable across environments. 
<br>

### Pipeline for Research

<br>

The framework supports:

- Sequential orchestration for step-by-step workflows. 
- Concurrent orchestration where agents work in parallel. 
- Group chat orchestration where agents brainstorm collaboratively. 
- Handoff orchestration where responsibility moves between agents as context evolves. 
- Magentic orchestration where a manager agent builds and refines a dynamic task ledger, coordinating specialized agents (and sometimes humans) for complex, open-ended problems. 

<br>

### Extensible by Design & Community-Driven

<br>

- Connectors to enterprise systems: Agent Framework inherits a broad set of built-in connectors (Azure AI Foundry, Microsoft Graph, Microsoft Fabric, SharePoint, Oracle, Amazon Bedrock, MongoDB, and a various SaaS system through Azure Logic Apps) so agents can work with enterprise data from day one. 
- Pluggable memory modules: Developers can choose Redis, Pinecone, Qdrant, Weaviate, Elasticsearch, Postgres, or their own store for conversational memory.
- Declarative agents: YAML or JSON definitions allow developers to specify prompts, roles, and tools declaratively. These files can be version-controlled, templatized, and shared across teams.

<br>

### Ready for Production

<br>

- Observability: OpenTelemetry can instrument and visualize every agent action, tool invocation, and orchestration step.
- Secure Cloud Hosting: Agents will run natively on Azure AI Foundry with enterprise controls like virtual network integration, role-based access, private data handling, and built-in content safety.
- Security & compliance: Azure AI Content Safety integration, Entra ID authentication, and structured logging mean Agent Framework agents can run in regulated industries. 
- Long-running durability: Agent threads and workflows can pause, resume, and recover from interruptions, with retry and error-handling logic ensuring long-running processes remain reliable at scale. 
- Human in the loop: For scenarios that require governance, tools can be marked as requiring human approval. Agent Framework automatically emits a pending approval request that can be routed to a UI or queue, then continues or denies execution accordingly. 
- CI/CD integration: The framework integrates directly into GitHub Actions and Azure DevOps pipelines, with telemetry flowing into Azure Monitor and Application Insights for enterprise-grade deployment and root-cause analysis.

<br>

---

## [Multi-Agents: What’s Actually Working (Cognition, 2026)](https://cognition.com/blog/multi-agents-working)

<br>

Context engineering can get very challenging in a multi-agent setup. In the past, we recommended the following principles:

1. Share as much context as possible between the agents.
2. Actions carry implicit decisions. When one agent makes certain changes or edits, it might make implicit choices  that might conflict with the implicit choices of other parallel agents. 

<br>

- How one can achieve frontier capabilities at a lower cost arises? Multi-agent systems may be a natural answer.

- Putting the same model in two agents, even if the agent harness is exactly the same, does not quite make them self-biased/correlated in the same way you might imagine one human doing both tasks would be. These agents are ultimately systems that perform based on their context. 

- Having a clean context makes the agent smarter because of the math of attention. Context Rot is a well-documented phenomenon that is a result of models making less intelligent decisions at longer and longer context lengths.

- Clean context leads to a notable improvement in capabilities when using a generator-verifier loop. But clear communication and synthesis with the overall context is important for a cohesive experience.

- Cross-agent communication, a sub-agent writing messages back to its manager to be passed to other agents in the agent team, doesn't happen by default, because models haven't been trained in environments where it needed to. Each of these took dedicated work to fix, and we're still improving on all of them.

- Multi-agent systems work best today when writes stay single-threaded and the additional agents contribute intelligence rather than actions.

- The open problems are all communication problems. How does a weaker model learn when to escalate? How does a child agent surface a discovery that should change its siblings' work? How do you transfer context between agents without drowning the receiver? You can get decently far with prompting, but we also expect the next generation of models, including the ones we train ourselves, to start closing these gaps.

<br>

---

## [Scaling Long-Running Autonomous Coding (Cursor, 2026)](https://cursor.com/blog/scaling-agents)

<br>

- Today's agents work well for focused tasks, but are slow for complex projects. The natural next step is to run multiple agents in parallel, but figuring out how to coordinate them is challenging.

- Agents would hold locks for too long, or forget to release them entirely. Even when locking worked correctly, it became a bottleneck. Twenty agents would slow down to the effective throughput of two or three, with most time spent waiting.

- The system was brittle: agents could fail while holding locks, try to acquire locks they already held, or update the coordination file without acquiring the lock at all.

- We tried replacing locks with optimistic concurrency control. Agents could read state freely, but writes would fail if the state had changed since they last read it. This was simpler and more robust, but there were still deeper problems.

- Instead of a flat structure where every agent does everything, we created a pipeline with distinct responsibilities: 1) Planners continuously explore the codebase and create tasks. They can spawn sub-planners for specific areas, making planning itself parallel and recursive.; 2) Workers pick up tasks and focus entirely on completing them. They don't coordinate with other workers or worry about the big picture.

- At the end of each cycle, a judge agent determined whether to continue, then the next iteration would start fresh.

- Model choice matters for extremely long-running tasks. We found that GPT-5.2 models are much better at extended autonomous work: following instructions, keeping focus, avoiding drift, and implementing things precisely and completely.

- A surprising amount of the system's behavior comes down to how we prompt the agents. Getting them to coordinate well, avoid pathological behaviors, and maintain focus over long periods required extensive experimentation. The harness and models matter, but the prompts matter more.

- Multi-agent coordination remains a hard problem. 

<br>

---

## [Introducing the Agent SDK (Cursor, 2026)](https://cursor.com/blog/agent-sdk)

<br>

- The framework we use to build our own managed agents like Bugbot, Security Reviewer, and Rollouts. 

- Agent SDK allows you to define agents in code and manage them like any other software project. Start from a template or point your coding agent at our docs. When the agent is ready, `agent-sdk deploy` it to Cursor infrastructure with one command.

- For more complicated work, agents can hand a task to another specialized agent with its own tools and sessions. They can also divide a job among subagents working in parallel.

<br>

```
import { homedir } from "node:os";
import { join } from "node:path";
import { defineAgent } from "@cursor/agent-sdk";

export default defineAgent({
  name: "Robo",
  model: {
    id: "composer-2.5",
    params: [
      { id: "effort", value: "high" },
      { id: "fast", value: "true" },
    ],
  },
  local: {
    cwd: join(homedir(), ".cache", "factory", "robo"),
  },
})
```

<br>

---

## [How We Built Our Multi-Agent Research System (Anthropic, 2025)](https://www.anthropic.com/research/multi-agent-research-system)


<br>

![](/blog/assets/report_harn_22.webp)

<br>

- Research demands the flexibility to pivot or explore tangential connections as the investigation unfolds. The model must operate autonomously for many turns, making decisions about which directions to pursue based on intermediate findings. A linear, one-shot pipeline cannot handle these tasks.

- The essence of search is compression: distilling insights from a vast corpus. Subagents facilitate compression by operating in parallel with their own context windows, exploring different aspects of the question simultaneously before condensing the most important tokens for the lead research agent. Each subagent also provides separation of concerns—distinct tools, prompts, and exploration trajectories—which reduces path dependency and enables thorough, independent investigations.

- We’ve found that multi-agent systems excel at valuable tasks that involve heavy **[parallelization](https://platform.claude.com/cookbook/patterns-agents-basic-workflows)**, information that exceeds single context windows, and interfacing with numerous complex tools.

- Traditional approaches using Retrieval Augmented Generation (RAG) use static retrieval. That is, they fetch some set of chunks that are most similar to an input query and use these chunks to generate a response. In contrast, our architecture uses a multi-step search that dynamically finds relevant information, adapts to new findings, and analyzes results to formulate high-quality answers.

- Complex research tasks naturally involve exploring many sources. Our early agents executed sequential searches, which was painfully slow. For speed, we introduced two kinds of parallelization: (1) the lead agent spins up 3-5 subagents in parallel rather than serially; (2) the subagents use 3+ tools in parallel. These changes cut research time by up to 90% for complex queries.

- We used an LLM judge that evaluated each output against criteria in a rubric: factual accuracy (do claims match sources?), citation accuracy (do the cited sources match the claims?), completeness (are all requested aspects covered?), source quality (did it use primary sources over lower-quality secondary sources?), and tool efficiency (did it use the right tools a reasonable number of times?). We experimented with multiple judges to evaluate each component, but found that a single LLM call with a single prompt outputting scores from 0.0-1.0 and a pass-fail grade was the most consistent and aligned with human judgements. This method was especially effective when the eval test cases did have a clear answer, and we could use the LLM judge to simply check if the answer was correct. Using an LLM as a judge allowed us to scalably evaluate hundreds of outputs.

- Multi-agent systems have emergent behaviors, which arise without specific programming. For instance, small changes to the lead agent can unpredictably change how subagents behave. Success requires understanding interaction patterns, not just individual agent behavior. Therefore, the best prompts for these agents are not just strict instructions, but frameworks for collaboration that define the division of labor, problem-solving approaches, and effort budgets. 

- Wwe use rainbow deployments to avoid disrupting running agents, by gradually shifting traffic from old to new versions while keeping both running simultaneously.

- Asynchronous execution would enable additional parallelism: agents working concurrently and creating new subagents when needed. But this asynchronicity adds challenges in result coordination, state consistency, and error propagation across the subagents. As models can handle longer and more complex research tasks, we expect the performance gains will justify the complexity.

- Production agents often engage in conversations spanning hundreds of turns, requiring careful context management strategies. As conversations extend, standard context windows become insufficient, necessitating intelligent compression and memory mechanisms. We implemented patterns where agents summarize completed work phases and store essential information in external memory before proceeding to new tasks. When context limits approach, agents can spawn fresh subagents with clean contexts while maintaining continuity through careful handoffs. 

- Rather than requiring subagents to communicate everything through the lead agent, implement artifact systems where specialized agents can create outputs that persist independently. Subagents call tools to store their work in external systems, then pass lightweight references back to the coordinator. 

<br>

![](/blog/assets/report_harn_23.webp)

<br>

---

## [Scaling Managed Agents (Anthropic, 2026)](https://www.anthropic.com/research/managed-agents)

<br>

![](/blog/assets/report_harn_8.png)

<br>  ­
 
 > **[Managed agents](https://platform.claude.com/docs/en/managed-agents/overview)** is a hosted service in Claude Platform that runs long-horizon agents through a small set of interfaces meant to outlast any particular implementations.  
 
 <br> 

- Virtualized the components of an agents: a session (the append-only log of everything that happened), a harness (the loop that calls Claude and routes tool calls), and a sandbox (the execution environment where Claude run code and edit files). 

- Decoupling the brain from the hands meant the harness no longer lived inside the container. It called the container the way it called any other tool: `execute(name, input) → string`. The container became cattle. If the container died, the harness caught the failure as a tool-call error and passed it back to Claude. If Claude decided to retry, a new container could be reinitialized with a standard recipe: `provision({resources})`. We no longer had to nurse failed containers back to health.

- Because the session log sits outside the harness, nothing in the harness needs to survive a crash. When one fails, a new one can be rebooted with `wake(sessionId)`, use `getSession(id)` to get back the event log, and resume from the last event. During the agent loop, the harness writes to the session with `emitEvent(id, event)` in order to keep a durable record of events.

- In the coupled design, any untrusted code that Claude generated was run in the same container as credentials—so a prompt injection only had to convince Claude to read its own environment. Once an attacker has those tokens, they can spawn fresh, unrestricted sessions and delegate work to them. Narrow scoping is an obvious mitigation, but this encodes an assumption about what Claude can't do with a limited token—and Claude is getting increasingly smart.

- For custom tools, we support MCP and store OAuth tokens in a secure vault. Claude calls MCP tools via a dedicated proxy; this proxy takes in a token associated with the session. The proxy can then fetch the corresponding credentials from the vault and make the call to the external service. The harness is never made aware of any credentials.

- In Managed Agents, the session serves as a context object that lives outside Claude’s context window. But rather than be stored within the sandbox or REPL, context is durably stored in the session log. The interface, `getEvents()`, allows the brain to interrogate context by selecting positional slices of the event stream. The interface can be used flexibly, allowing the brain to pick up from wherever it last stopped reading, rewinding a few events before a specific moment to see the lead up, or rereading context before a specific action.

- Any fetched events can also be transformed in the harness before being passed to Claude’s context window.

- When we initially put the brain in a container, it meant that many brains required as many containers. For each brain, no inference could happen until that container was provisioned; every session paid the full container setup cost up front. Every session, even ones that would never touch the sandbox, had to clone the repo, boot the process, fetch pending events from our servers.

- That dead time is expressed in time-to-first-token (TTFT), which measures how long a session waits between accepting work and producing its first response token. TTFT is the latency the user most acutely feels.

- Decoupling the brain from the hands means that containers are provisioned by the brain via a tool call `(execute(name, input) → string)` only if they are needed. So a session that didn't need a container right away didn't wait for one. Inference could start as soon as the orchestration layer pulled pending events from the session log. 

- Decoupling the brain from the hands makes each hand a tool, `execute(name, input) → string`: a name and input go in, and a string is returned. That interface supports any custom tool, any MCP server, and our own tools.

<br>

---

## [Harness Design for Long-Running Application Development (Anthropic, 2026)](https://www.anthropic.com/research/harness-design-long-running-apps)

<br>

- Taking inspiration from Generative Adversarial Networks (GANs), I designed a multi-agent structure with a generator and evaluator agent. Building an evaluator that graded outputs reliably—and with taste—meant first developing a set of criteria that could turn subjective judgments like “is this design good?” into concrete, gradable terms.

- I then applied these techniques to long-running autonomous coding, carrying over two lessons from our earlier harness work: decomposing the build into tractable chunks, and using structured artifacts to hand off context between sessions. The final result was a three-agent architecture—planner, generator, and evaluator—that produced rich full-stack applications over multi-hour autonomous coding sessions.

- For more complex tasks, the agent still tends to go off the rails over time. While decomposing this issue, we observed two common failure modes with agents executing these sorts of tasks.

- First is that models tend to lose coherence on lengthy tasks as the context window fills. Some models also exhibit "context anxiety," in which they begin wrapping up work prematurely as they approach what they believe is their context limit. While compaction preserves continuity, it doesn't give the agent a clean slate, which means context anxiety can still persist.

- A second issue, which we haven’t previously addressed, is self-evaluation. When asked to evaluate work they've produced, agents tend to respond by confidently praising the work. Separating the agent doing the work from the agent judging it proves to be a strong lever to address this issue. 

- Four grading criteria to both the generator and evaluator agents in their prompts: 1) design quality, 2) originality, 3) craft (competence), 4) functionality.

- The system contained the following agent personas: 1) planner (take a few sentences and expand to a full product spec), 2) generator (works in sprints, picking up one feature at a time from the spec), 3) evaluator (tests UI features, API endpoints, database states, etc.). Communication via files.

<br>

---

## [How We Contain Claude Across Product (Anthropic, 2026)](https://www.anthropic.com/research/how-we-contain-claude)

<br>

![](/blog/assets/report_harn_15.webp)

<br>

> Rather than supervising what the agent does, we supervise what it’s able to do by enforcing access boundaries through, for example, **[sandboxes](https://github.com/anthropics/sandbox-runtime)**, virtual machines, and egress controls.

> **[gVisor](https://github.com/google/gvisor)** and seccomp have been hardened against well-resourced adversaries for far longer than agentic AI has existed.

<br>

- Security risks to agents fall into one of three categories: 1) User misuse, 2) Model misbehavior, and 3) External attackers.

- When building containment and defense systems, we apply defenses to three main components: 1) The environment in which the agent runs, 2) The model the agent consults (the mechanisms here include system prompts, classifiers, probes, and training modifications), 3) The external content the agent can reach (MCP servers, third-party plugins, and web search tools all feed content into the agent’s context from sources you don’t control).

<br>

### Patterns for containing agents


<br>

![](/blog/assets/report_harn_16.webp)

<br>

- The ephemeral container (inside a gVisor container on isolated infrastructure; the agent is entirely server-side and the filesystem is epheral/per-session).

- The human-in-the-loop sandbox (approval fatigue showed up within weeks; as users move to multi-agent systems, this approach is also much less likely to be an effective oversight strategy).

- The local VM (our first version of Claude Cowork ran inside a full virtual machine using the platform's vendor hypervisor  - Apple's Virtualization framework on macOS, HCS on Windows. The VM has its own Linux kernel, its own filesystem, and its own process table; any failure during VM startup made Cowork unusable).
<br>

![](/blog/assets/report_harn_17.webp)

<br>

- Models and products are advancing fast. As they do, risks morph and evolve, and our mitigations must keep pace to meet them such as 1) persistent memory poisoning, 2) multi-agent trust escalation, 3) agent identity (credentials, session tokens, etc.).

<br>

---

## [A Practical Guide to Building Agents (OpenAI, 2026)](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/)

<br>

- An approach that works well is to build your agent prototype with the most capable model for every task to establish a performance baseline: 1) Set up evals to establish a performance baseline., 2) Focus on meeting your accuracy target with the best models available., 3) Optimize for cost and latency by replacing larger models with smaller ones where possible.

- In general, orchestration patterns fall into two categories: 1) Single-agent systems, where a single model equipped with appropriate tools and instructions executes workflows in a loop., 2) Multi-agent systems, where workflow execution is distributed across multiple coordinated agents.

- While multi-agent systems can be designed in numerous ways for specific workflows and requirements, our experience with customers highlights two broadly applicable categories: 1) Manager (agents as tools) A central “manager” agent coordinates multiple specialized agents via tool calls, each handling a specific task or domain., 2) Decentralized (agents handing off to agents) Multiple agents operate as peers, handing off tasks to one another based on their specializations.

-  Multi-agent systems can be modeled as graphs, with agents represented as nodes. In the manager pattern, edges represent tool calls whereas in the decentralized pattern, edges represent handoffs that transfer execution between agents.

- Declarative vs non-declarative graphs: Some frameworks are declarative, requiring developers to explicitly define every branch, loop, and conditional in the workflow upfront through graphs consisting of nodes (agents) and edges (deterministic or dynamic handoffs). In contrast, the Agents SDK adopts a more flexible, code-first approach. Developers can directly express workflow logic using familiar programming constructs without needing to pre-define the entire graph upfront, enabling more dynamic and adaptable agent orchestration.

<br>

### Guardrails

<br>


- Well-designed guardrails help you manage data privacy risks (for example, preventing system prompt leaks) or reputational risks (for example, enforcing brand aligned model behavior). 

- Types: relevance classifier, safety classifier, PII filter, moderation, tool safeguards, rule-based protections (blocklists, regex filters), output validation.

<br>

---

## [Unrolling the Codex Agent Loop (OpenAI, 2026)](https://openai.com/index/unrolling-the-codex-agent-loop)

<br>

> At the heart of every AI agent is something called “the agent loop.”

<br>

![](/blog/assets/report_harn_18.svg)

<br>

- To start, the agent takes input from the user to include in the set of textual instructions it prepares for the model known as a prompt.

- The next step is to query the model by sending it our instructions and asking it to generate a response (inference).

- As the result of the inference step, the model either (1) produces a final response to the user’s original input, or (2) requests a tool call that the agent is expected to perform (e.g., “run ls and report the output”).

- This process repeats until the model stops emitting tool calls and instead produces a message for the user (referred to as an assistant message in OpenAI models).

- The journey from user input to agent response shown in the diagram is referred to as one turn of a conversation (a thread in Codex). Though this conversation turn can include many iterations between the model inference and tool calls. 

- In the initial prompt, every item in the list is associated with a role. The role indicates how much weight the associated content should have and is one of the following values (in decreasing order of priority): system, developer, user, assistant.

- The Responses API takes a JSON payload with many parameters: 1) instructions⁠, 2) tools⁠, 3) input⁠.

- General strategy to avoid running out of context window is to compact the conversation once the number of tokens exceeds some threshold. Specifically, we replace the input with a new, smaller list of items that is representative of the conversation, enabling the agent to continue with an understanding of what has happened thus far. Codex used the resulting assistant message containing the summary as the new input⁠ for subsequent conversation turns.

<br>

---

## [Harness Engineering (OpenAI, 2026)](https://openai.com/index/harness-engineering/)

<br>

> Humans steer. Agents execute.

<br>

- As code throughput increased, our bottleneck became human QA capacity. Because the fixed constraint has been human time and attention, we’ve worked to add more capabilities to the agent by making things like the application UI, logs, and app metrics themselves directly legible to Codex.

- We did the same for observability tooling. Logs, metrics, and traces are exposed to Codex via a local observability stack that’s ephemeral for any given worktree. Codex works on a fully isolated version of that app—including its logs and metrics, which get torn down once that task is complete.

- Context management is one of the biggest challenges in making agents effective at large and complex tasks. One of the earliest lessons we learned was simple: give Codex a map, not a 1,000-page instruction manual.

- We tried the “one big `AGENTS.md`  approach. It failed in predictable ways: 1) Context is a scarce resource., 2) Too much guidance becomes non-guidance, 3) It rots instantly., 4) It’s hard to verify. 

- So instead of treating `AGENTS.md` as the encyclopedia, we treat it as the table of contents. The repository’s knowledge base lives in a structured docs/ directory treated as the system of record. A short `AGENTS.md` (roughly 100 lines) is injected into context and serves primarily as a map, with pointers to deeper sources of truth elsewhere.

- This enables progressive disclosure: agents start with a small, stable entry point and are taught where to look next, rather than being overwhelmed up front.

- Agents are most effective in environments with strict boundaries and predictable structure⁠, so we built the application around a rigid architectural model. Each business domain is divided into a fixed set of layers, with strictly validated dependency directions and a limited set of permissible edges. 

- Human taste is fed back into the system continuously. Review comments, refactoring pull requests, and user-facing bugs are captured as documentation updates or encoded directly into tooling.

- Our team used to spend every Friday (20% of the week) cleaning up “AI slop.” Unsurprisingly, that didn’t scale. Instead, we started encoding what we call “golden principles” directly into the repository and built a recurring cleanup process. These principles are opinionated, mechanical rules that keep the codebase legible and consistent for future agent runs. For example: (1) we prefer shared utility packages over hand-rolled helpers to keep invariants centralized, and (2) we don’t probe data “YOLO-style”—we validate boundaries or rely on typed SDKs so the agent can’t accidentally build on guessed shapes.

- Our most difficult challenges now center on designing environments, feedback loops, and control systems that help agents accomplish our goal: build and maintain complex, reliable software at scale.

<br>

---

## [How We Built the App Server (OpenAI, 2026)](https://openai.com/index/unlocking-the-codex-harness)

<br>

> OpenAI’s coding agent Codex exists across many different surfaces: the web app⁠, the CLI, the IDE extension⁠, and the new Codex macOS app. Under the hood, they’re all powered by the same Codex harness—the agent loop and logic that underlies all Codex experiences. The critical link between them? The Codex App Server⁠, a client-friendly, bidirectional JSON-RPC API.

<br>

- Initially, the App Server was a practical way to reuse the Codex harness across products that gradually evolved into our standard protocol.

- Needed rich interaction patterns beyond request/response, such as exploring the workspace, streaming progress as the agent reasons, and emitting diffs. 

- The App Server is both the JSON-RPC protocol between the client and the server and a long-lived process that hosts the Codex core threads.

- An App Server process has four main components: the stdio reader, the Codex message processor, the thread manager, and core threads:

<br>

![](/blog/assets/report_harn_10.png)

<br>

- The JSON-RPC protocol between the client and the App Server is fully bidirectional. A typical thread has a client request and many server notifications. 

<br>

---

## [An Open-Source Spec for Codex Orchestration: Symphony (OpenAI, 2026)](https://openai.com/index/open-source-codex-orchestration-symphony)

<br>

> **[Symphony⁠](https://github.com/openai/symphony)** is an agent orchestrator that turns a project-management board like Linear into a control plane for coding agents. Every open task gets an agent, agents run continuously, and humans review the results.

<br>

- Agents only start working on tasks that aren’t blocked, so execution unfolds naturally and optimally in parallel for this DAG (a sequence of execution steps). 

- Agents can also create work themselves. During implementation or review, they often notice improvements that fall outside the scope of the current task: a performance issue, a refactoring opportunity, or a better architecture. When that happens, they simply file a new issue that we can evaluate and schedule later.

- The reference implementation is written in Elixir—because when code is effectively free, you can finally pick languages for their strengths, like Elixir's concurrency.

- Use Codex in app server mode ⁠(opens in a new window), a built-in headless mode for Codex. This mode allowed us to run Codex and talk to it programmatically via a well documented JSON-RPC API for things like starting a thread or reacting to turns. It’s more convenient and scalable than trying to interact with Codex via CLI or live tmux sessions.

<br>

---

## [The Thin Orchestrator (Meta, 2026)](https://engineering.fb.com/2026/10/19/ml-applications/thin-orchestrator-ai-agent-architecture)

<br>

- Sometimes, giving an AI agent all of the knowledge it needs is the wrong approach.
- We’ve seen notable improvements in efficiency and accuracy by keeping the orchestration layer of our data pipeline agents deliberately thin: It routes work and enforces reliability checks, while specialized agents do the domain reasoning.

- Our pipeline is config-as-code: Python configurations drive C++ code generation, which feeds data processing services, which populate analytics systems. Onboarding a single data column requires coordinated changes across configuration registries, backend services, and data pipelines, and each column moves through up to six stages before its data arrives.

- Past a certain context threshold, additional knowledge degraded rather than improved performance. The agent would cross-contaminate concepts, applying field naming conventions from one subsystem to another, or using a code generation pattern meant for one data source when populating from a different one.

<br>

We split the system into two layers:
1. A deterministic orchestrator that performs zero domain work. It classifies intent, gathers required fields, runs reliability checks, and delegates to the right specialist. It never reasons about code, never generates configurations, and never touches the codebase. It’s a router. 
2. Fourteen specialized subagents, each a complete domain expert with isolated context. A schema management agent knows configuration registries. A population agent knows how to generate code for each of 10 data sources. A validation agent knows build systems and quality checks. No agent sees the full picture. That’s the feature, not the bug. 

<br>

The orchestrator follows a fixed 7-step protocol for every request:

1. Read the relevant subagent’s instruction file. 
2. Check if the target already exists (prevent duplicates). 
3. Gather required fields from the user. 
4. Auto-discover what can be inferred (repository type, existing configurations). 
5. Reliability gate check for active warnings or required reviewers. 
6. Delegate to the subagent with full context. 
7. Handle results and surface errors, confirm success. 

<br>

Each subagent follows a standardized structure:

- Knowledge sources: which domain files to load at runtime (typically a few thousand tokens each). 
- Pre-gathering checklist: what the orchestrator must collect before delegation. 
- Step-by-step workflow: the domain-specific execution plan. 
- Discovery patterns: how to find relevant code patterns in the monorepo. 
- Troubleshooting: error-to-resolution mappings for common failures. 

<br>

The thin orchestrator works because it aligns architectural boundaries with computational boundaries:

- Deterministic decisions stay deterministic. “Which subagent handles this?” is a routing decision, not a reasoning task. Don’t use an LLM for it. 
- Context isolation prevents cross-contamination. The population agent for data source A never sees data source B’s patterns. It can’t hallucinate the wrong one. 
- Failures are contained. If a subagent fails, the orchestrator retries or escalates. The failure doesn’t corrupt the orchestrator’s state or other subagents’ contexts. 
- The system improves at every layer independently. A better model improves all 14 subagents simultaneously. A knowledge file update takes effect immediately. A new workflow template unlocks new capabilities without touching agents. No single component carries the full weight. 

<br>

Any team building production AI agents can benefit:

1. Separate routing from reasoning. 
2. Design subagents as structurally uniform specialists. 
3. Use workflow templates, not new agents, to scale.
4. Load knowledge at runtime, not at build time. 
5. Draw the deterministic/probabilistic boundary explicitly.

<br>

---

## [Agentic Flow with AMD PACE (AMD, 2026)](https://www.amd.com/en/developer/resources/technical-articles/2026/agentic-flow-with-amd-pace.html)

<br>

> **[AMD PACE](https://github.com/amd/AMD-PACE)** (AMD Platform Aware Compute Engine) is an Open source Research and Development (RAD) project and a high-performance inference server that squeezes maximum throughput out of the AMD EPYC™ processor for Transformer workloads. 

<br>

- Today's frontier is multi-agent systems, where specialized agents - planners, researchers, coders, and critics - work together to solve problems no single agent could handle alone. Every step up this ladder adds capability by running hundreds of connected LLM calls, tool calls, and decisions.

- PACE is graduating from being purely an inference engine to becoming a full agentic AI orchestrator, using LangGraph as its orchestration layer. The result is one stack that unifies how agents are defined (LangGraph graphs) with how they run efficiently (PACE's platform-aware runtime).

- The four capabilities that make PACE a platform for building and serving agents: 1) Deterministic Agent Execution and Benchmarking, 2) Flexible Deployment Across Local and Remote AI Infrastructure, 3) Native Support for Custom LangGraph Agents, 4) Optimized tool ops execution for end-to-end measurable performance gains.

<br>

---

## [Train Small Orchestration Agents to Solve Big Problems (NVIDIA, 2026)](https://developer.nvidia.com/blog/train-small-orchestration-agents-to-solve-big-problems/)

<br>

![](/blog/assets/report_harn_13.png)

<br>

> We train and use a separate model, which we call an “orchestrator” (**[ToolOrchestra](https://github.com/NVlabs/ToolOrchestra)**), to act as a supervisor over all of the other models and tools.

<br>

- While it may be surprising to employ large models subordinate to small models, the arrangement plays to their advantages. Small models are unburdened by excessive knowledge and trained to capture the essence of problem-solving due to their limited size.

- The small model, Orchestrator-8B, tackles some of the most difficult tasks available, including the problems of the Humanity’s Last Exam, FRAMES, and τ2-Bench. We used Qwen3-8B as our underlying model, generated only 552 synthetic problems, and used only 1,296 prompts in training.

<br>

---

## [OpenShell Secures and Governs AI Agent Workloads at Scale (NVIDIA, 2026)](https://developer.nvidia.com/blog/how-nvidia-openshell-reference-architecture-secures-and-governs-ai-agent-workloads-at-scale/)

<br>­

- Autonomous agents can work for hours on complex tasks, accessing files, tools, the internet, and spawning other agents to collaborate with. Executing complex tasks over long time horizons leads to compounding risk: the agents may download code, build new tools, request additional privileges, and touch more of the underlying infrastructure.

- NVIDIA OpenShell is an open-source runtime to build the security and governance needed for agentic systems into the computing infrastructure. OpenShell defines and enforces which systems and data an agent can access, from files and internet services to systems that interact with physical devices.

- OpenShell has four key components: 1) Gateway: The control plane that manages sandbox lifecycles and policies, 2) Supervisor: Checks outbound requests against policy and mediates access to credentials. This runs completely separate to the sandbox, 3) Sandbox: Isolates the agent workload and restricts filesystem and process access, 4) Policy prover: Adds formal verification, checking whether a policy’s permissions stay within an organization-defined ceiling.

- Supervisor middleware lets you inspect, block, or change the content that an agent sends and receives over the network as an additional enforcement layer. Gateway interceptors let operators add deployment-specific governance to OpenShell control-plane operations without modifying the gateway.

- NVIDIA Sentry observes requests and responses, networking and file activities, verifies identity and delegated authority, and analyzes selected host memory to detect deviations from authorized behavior without relying on agent self-reporting.

<br>

---

## [Building a Memory-Driven Agent with NVIDIA NemoClaw (NVIDIA, 2026)](https://developer.nvidia.com/blog/building-a-memory-driven-agent-with-nvidia-nemoclaw)

<br>

> A memory-driven agent built with **[NVIDIA NemoClaw](https://github.com/NVIDIA/NemoClaw)** can improve productivity in real-world enterprise workflows.

> NVIDIA NemoClaw is an open source reference stack for running supported AI agents more safely inside NVIDIA OpenShell sandboxes. It provides guided onboarding, managed inference, network policy, managed integrations, OpenShell-backed state persistence, and lifecycle operations through the NemoClaw CLI and its agent-specific aliases.

> OpenShell is the safe, private runtime for fleets of autonomous AI agents. Agents are most useful when they can read files, install packages, call APIs, and use credentials. OpenShell gives them that capability without giving them unrestricted access to your data, secrets, or network. You declare what each agent can touch in a policy, and OpenShell enforces it.

<br>

- It shares five design lessons you can apply to your own agents: 1) Maintain context across daily work to improve task quality, 2) Separate evidence, knowledge, and actions to help agents make better judgments, 3) Design memory-driven agents can prioritize user intent over short-term urgency , 4) Allow users to correct agent decisions to build trust, 5) Enforce the boundary of security and authorization with **[NVIDIA OpenShell](https://github.com/NVIDIA/openshell)**.

- A Markdown agent memory stores knowledge. A SQLite ledger stores obligations, rankings, corrections, and audit events. This design preserves the agent’s judgments without writing them into source messages as read flags, labels, or folders.

- Persistent memory can preserve an incorrect judgment as easily as a correct one. Each change is recorded once in an append-only audit trail. Repeated correction patterns can update a small, readable preference policy. Users can inspect, edit, or delete that policy instead of leaving the preference hidden in model state.

<br>

![](/blog/assets/report_harn_12.png)

<br>

---


## [Six Agent Harness Capabilities for Higher Model Perfomance (NVIDIA, 2026)](https://developer.nvidia.com/blog/six-agent-harness-capabilities-for-higher-model-performance)

<br>

> **[NVIDIA Labs Object-Oriented Agents (NOOA)](https://github.com/nvidia-nemo/labs-OO-Agents)** is an open-source research preview with a Python framework, memory system, capability tests, and benchmark agents with code, data, and evaluations.

<br>

- NOOA takes a simpler approach: an agent is a single Python class. Its methods are its capabilities. Its fields are its state. Its docstrings are its prompts. Its type annotations are enforced contracts. The agent development becomes traditional software development. 

- The NOOA architecture identifies six model-facing interface ideas that drive agent performance: 1) Typed input/output., 2) Pass by reference, 3) Code as action, 4) Programmable loop engineering, 5) Explicit object state, 6) Model-callable harness APIs.

- NOOA includes a long-term memory subsystem. Rather than an automatic background summarization pipeline, memory is a store the agent curates through model-callable tools— deliberately writing, querying, and correcting records as part of its work—while spontaneous memories relevant to the current turn surface automatically into context.

<br>

---

## [Full-Stack Optimizations for Agentic Inference with NVIDIA Dynamo (NVIDIA, 2026)](https://developer.nvidia.com/blog/full-stack-optimizations-for-agentic-inference-with-nvidia-dynamo)

<br>

- Coding agents are starting to write production code at scale. Behind every one of these workflows is an inference stack under significant KV cache pressure.

- This is a write-once-read-many (WORM) access pattern: the system prompt and growing conversation prefix are computed once, then served from cache on every subsequent call. Maximizing cache reuse rate across all workers and keeping KV blocks warm and routable is the central optimization target for agentic inference.

- APIs use typed content blocks, so a single assistant turn can contain thinking, tool calls, and text as distinct objects. This matters for inference because the orchestrator can see block boundaries, perform prompt optimizations, and apply different cache and scheduling policies per block type. Dynamo serves all three endpoints through a common internal representation, so a single deployment can act as the inference backend for any harness. 

- When using coding agents, the user waits for a final result, not individual token streams, so the orchestrator can reorder and prioritize requests across agents without affecting the end-user experience. Sessions run for minutes to even days with long tool-call pauses. This is enough to optimize inference scheduling in ways that traditional serving cannot. Dynamo’s new agent hints extension was designed to bridge this gap. It allows any harness to attach structured hints to a request across all three API endpoints, giving the router and runtime the context they need to make agent aware scheduling and caching decisions. 

- The `cache_control` field will look familiar to anyone who has used Anthropic’s prompt caching API. It tells the orchestrator to pin the computed prefix on the worker for the specified TTL, protecting it from eviction during tool call gaps. Currently `ephemeral` is the only supported type (to match Anthropic’s API).

- A coding agent follows a sequential pattern: long prefill, tool call, extend prefix, repeat. A multi-agent harness fans out work across parallel subagents with short, independent contexts. Default round-robin routing is blind to both patterns — it cannot account for cache locality, request priority, or session structure. Dynamo’s router closes this gap with three mechanisms: KV-aware placement, priority scheduling, and extensible routing strategies.

- Once dispatched, SGLang, vLLM, and TRT-LLM may interpret engine priority differently, so Dynamo normalizes the engine-facing value per backend. Engines like SGLang can also use priority-based radix cache eviction where lower-priority blocks are evicted first under memory pressure.

<br>

![](/blog/assets/report_harn_14.png)

<br>

- Agentic workloads produce blocks with vastly different reuse value — system prompts reused every turn, reasoning tokens never reused again — but default LRU eviction treats all blocks identically.

- LRU sees only recency. In a high traffic environment, a wait for the completion of a called tool (2-30 seconds while the agent waits for an external API) might cause the agent’s blocks to age out and when the agent resumes, the entire prefix must be recomputed. 

- To solve this, we need to provide the orchestrator APIs to control which blocks should be retained, where they should live, and for how long. The goal is to make high value KV cache blocks available to all workers in the cluster. Essentially, they are written once during cold start and then read by any worker at all times.

- Multi-tier storage solves sharing and persistence, but blocks still arrive on GPU only after the request hits the worker. The missing piece for agentic systems is prefetch: the harness can use historical timing data to predict when an agent’s tool call might return, which means it knows which blocks will be needed and when. We are building prefetch hooks so the harness can signal “bring these blocks from storage to GPU ahead of the next request.”

- If the harness can tag a subagent’s requests as belonging to a session and mark that session’s KV as ephemeral, the evictor can target those blocks first and skip writing them to shared storage entirely.

- When the subagent terminates, its session’s blocks are the first to reclaim. The same mechanism applies to thinking tokens: the engine can detect `<think>` boundaries during generation and tag those blocks as ephemeral at insertion time, so they skip L2 write-back and evict before normal blocks without any external signal. 

- The design space here is wide: harness-driven session tagging, engine-native semantic detection, hybrid approaches that combine both. 

<br>

---

## [Minions: One-Shot E2E Coding Agents (Stripe, 2026)](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents-part-2)

<br>

> Minions are Stripe’s homegrown coding agents. They’re fully unattended and built to one-shot tasks.

<br>

- A minion run starts in an isolated developer environment—or “devbox”—which are the same type of machine that Stripe engineers write code on. A Stripe devbox is an AWS EC2 instance that contains our source code and runs services under development. 

- The core agent loop runs on a fork of Block’s coding agent **[goose](https://github.com/aaif-goose/goose)**, one of the first widely used coding agents, which we forked early on.

- Minions are connected to MCP, which provides a common language for networkable LLM function calling. This is how they gather context like internal documentation, ticket details, build statuses, code intelligence via Sourcegraph search, and more.

- Since CI runs cost tokens, compute, and time, we only have at most two rounds of CI. If tests fail after an initial push, we prompt the minion to fix failing tests and push a second time, but are then done.

- The most common primitives for orchestrating an LLM flow are workflows and agents. A workflow is an LLM system that operates via a fixed graph of steps, where each node in the graph is responsible for a narrowly scoped portion of the overall goal, and predefined edges control the execution flow between these discrete nodes.

- On the other hand, an agent is typically a simpler “loop with tools” orchestration pattern, where the LLM relies on its own judgment to repeatedly call the tools at its disposal and decide—based on the results of those tool calls—what to do next.

- Minions are orchestrated with a primitive we call “blueprints.” Blueprints are workflows defined in code that direct a minion run. In essence, a blueprint is like a collection of agent skills interwoven with deterministic code so that particular subtasks can be handled most appropriately.

- In our experience, writing code to deterministically accomplish small decisions we can anticipate—such as “always lint changes at the end of a run”—saves tokens (and CI costs) at scale and gives the agent a little less opportunity to get things wrong.

- We have pre-push hooks to fix the most common lint issues. A background daemon precomputes lint rule heuristics that apply to a change and caches the results of running those lints, so developers can usually get lint fixes in well under a second on a push.

<br>

---

## [What is an AI Agent Harness (Databricks, 2026)](https://www.databricks.com/blog/ai-harness)

<br>

> Harness design directly shapes agent performance. Strong context management, orchestration and verification can matter as much as the underlying model. Centralized governance, evaluation and observability help prevent agent sprawl and keep systems reliable.

<br>

- The harness is everything around it that helps the agent operate safely and reliably, including: 1) Tools: APIs, code execution, search, databases and business applications, 2) Memory: Prior context, user preferences and workflow history, 3) Workspace: Files, data, environments and systems the agent can access, 4) Guardrails: Permissions, policies, approvals and monitoring.

- At the core of many AI agents is a repeating cycle. Understanding this loop makes the role of the harness easier to see: 1) Reason. , 2) Act. , 3) Observe., and 4) Repeat. 

- A filesystem gives the agent a place to read and write files such as code, notes, plans and intermediate work that persist between sessions. Persistent storage allows agents to accumulate progress across long-running tasks and collaborate with humans or other agents through a shared workspace of files, not just chat messages.

- Base models don’t retain memory beyond their current context window. The harness manages memory both within a task and across sessions. As conversations grow longer, the harness decides what stays active and what gets summarized, a process known as context compaction. In practice, this means trimming older parts of the conversation so the model does not become overwhelmed as the context grows. Across sessions, the harness stores and retrieves relevant history. 

- Good harnesses do not just let the model act — they check the work. After each action, the harness can run tests, inspect results or prompt the model to review its own output before continuing.

- Guardrails are rules built into the harness that block unsafe or unapproved actions. Examples include requiring human approval before an agent deletes a file, sends a customer message or makes a purchase. One common type of guardrail is a human-in-the-loop control, where a person reviews or approves certain actions before they go through. In enterprise environments, these approval checkpoints are often mandatory.

- Observability means being able to see what the agent did, why it made each decision and where things went wrong through logs, traces and dashboards. For developers, observability helps diagnose and debug agent behavior. For enterprise teams, it’s often a compliance requirement. Regulated industries need audit trails that show exactly what an agent did and on whose authority.

- Most operational agent failures come from the harness, not the model itself. These are some of the most common problems teams encounter in real-world systems: 1) context rot, 2) tool overload, 3) latency, 4) irrelevant retrieval, 5) weak verification, 6) missing guardrails.

- Two emerging ideas help illustrate where the field may be heading: 1) Disposable harnesses. Lightweight, task-specific harnesses are created for a single workflow and discarded afterward instead of operating as long-running infrastructure. As execution environments become faster and cheaper to provision, this approach is becoming more practical.; 2) Natural-language agent harnesses (NLAHs). Instead of configuring harnesses through code, engineers describe how an agent should behave using plain-language instructions. A shared runtime interprets and executes those instructions, lowering the barrier for who can build, modify and reuse harnesses across projects.

<br>

---

## [The Top Best AI Agent Frameworks (Daytona, 2026)](https://www.daytona.io/dotfiles/best-ai-agent-frameworks)

<br>

> Some frameworks give you an agent object and let control flow emerge from the model's decisions. Others make the control flow explicit and typed: a graph with nodes and edges, or a workflow with sequential steps, branches, and parallel fan-out. A third pattern is delegation, where agents hand off to other agents or call them as tools.

> A framework focused on the agent gives you a good model abstraction, tools, and a loop, letting behavior emerge from the model's decisions. An orchestration engine puts an explicit, persistent state machine at the center, where the agent is one node in a graph whose execution can be paused, inspected, replayed, and resumed.

<br>

- An AI agent framework is the software layer that manages the loop between a language model and the tools it uses. At minimum, that means calling a model, parsing its request to use a tool, executing the tool, returning the result, and repeating until the task is complete.

- Orchestration engines require you to express the agent as a structure the framework understands, typically a graph of nodes or a workflow of steps. In exchange, the framework can persist that structure to a database, so a run can be paused, resumed after a crash, inspected mid-flight, or replayed later.

- "Memory" can mean an in-process message array or a vector-backed store with retrieval and decay. "Sandbox" can mean a microVM with its own kernel, or a list of permitted shell commands checked before execution on your own machine.

-  Conversation state is the message history within a session. Long-term memory is knowledge that persists across sessions and is retrieved when relevant. Execution state is the framework's own record of where a run is, which is what makes resumption possible.

- In-process interpreter isolation runs model-authored code inside an embedded engine such as QuickJS or a V8 isolate, with no filesystem, no network, and no process access. It is a genuine improvement, and it has one limitation that is easy to miss.

- External environment isolation delegates execution to a separate machine boundary (a container, microVM, or full VM) reached over an API. The agent orchestrates from your infrastructure while code runs somewhere that cannot reach it. 

- Agents fail in ways that unit tests do not catch. The same prompt produces different trajectories, and a regression often looks like a subtly worse tool-selection pattern rather than an exception. Two capabilities matter. Tracing captures the full run, including every model call, tool invocation, argument, result, token count, and latency, so a failure can be reconstructed after the fact. Evaluation runs an agent against a fixed set of cases and scores the results, so behavioral drift is caught before deployment rather than after.
<br>

### The Six Best AI Agent Frameworks

<br>

- Mastra is a TypeScript agent framework built around a specific position: that once an agent reaches production, the sequence of steps it takes should be something you wrote down, not something it decided. Memory is built in, spanning conversation history, RAG, and an Observational Memory system, with execution state persisted through a pluggable storage layer. Because that state is durable, suspend-and-resume is a real primitive: a workflow can pause indefinitely awaiting human input and resume later in a different process.

- LangGraph is the orchestration layer in LangChain's stack, and the most explicitly systems-oriented framework. It describes itself as a low-level framework for stateful agents, and its lineage is unusual for the category. Rather than borrowing from other agent libraries, LangGraph borrows from distributed data processing: its execution model follows Pregel, Google's system for large-scale graph computation, and Apache Beam. Tthe graph advances in discrete supersteps. Every node eligible to run in a given step runs, each producing state updates; those updates are applied together at the end of the step, and only then does the next step begin. The benefit is that progress has clean checkpoint boundaries. Because the runtime knows exactly which step completed and what the state was when it did, it can persist that point and resume from it later. Subgraphs, streaming, and conditional branching round out the control-flow surface, and above LangGraph the vendor now ships Deep Agents, a higher-level layer adding planning, subagents, and a virtual filesystem.

- CrewAI takes the most distinctive conceptual approach in this guide. Where the other frameworks ask you to describe control flow, CrewAI asks you to describe a team. An Agent is defined by a role, a goal, and a backstory; a Task is defined by a description and an expected_output; a Crew binds them together and a Process, either sequential or hierarchical, decides who works when. For a large class of problems, declaring the outcome you want and letting agents negotiate the path is genuinely faster than drawing a graph, and it is the most approachable on-ramp in the category.

- The OpenAI Agents SDK is deliberately minimal, and its primitive list is the clearest statement of scope in this guide: Agents, Sandbox agents, Realtime agents, Voice agents, Handoffs, Agents as tools, Tools, Guardrails, Human in the loop, Sessions, and Tracing. There is no graph DSL and no workflow engine. A Runner drives the loop, handoffs delegate between agents, and control flow is largely the model's business. . Sessions handle conversation history automatically across runs, with SQLAlchemy and Redis backends available as extras.

- Google's Agent Development Kit has the widest language coverage. Its Workflow Runtime is a full graph engine covering routing, fan-out and fan-in, loops, retries, state management, dynamic nodes, human-in-the-loop, and nested workflows, with a Task API for structured agent-to-agent delegation. Two features stand out as unusual. Agent Config allows agents to be defined declaratively in YAML with no code, which is a meaningful lever for organizations where non-engineers need to author or review agent behavior. Tool Confirmation provides a human gate specifically on tool execution rather than on the run as a whole.

- The Claude Agent SDK is architecturally is not a framework that calls a model. It is a programmatic wrapper around the Claude Code CLI, which is bundled into the package and invoked as a subprocess. Claude Code is among the strongest coding agents available, with mature context management, compaction, and a well-tuned toolset of Read, Write, Edit, and Bash enabled by default.

<br>

---

# 5️⃣🐯 Appendix I: Open-Source Agentic Harnesses

<br>

#### ✨ Here, I list some of the most popular projects, organized by programming language for easy reference. For each, I've added some personal notes about their codebases and links to additional resources. I'll continue adding relevant resources as I come across them. ✨

<br>

---

## 🦀 [Rig (Rust)](https://github.com/0xPlaygrounds/rig)

<br>

> Rust library for building LLM applications, and a terminal coding agent built on it that you extend with **[Bevy plugin](https://bevy.org/)**.

<br>

- Everything is a plugin. The agent is a Bevy app; its tools, commands, sessions, sign-in and terminal view are each a plugin listed in plugins.toml, so any of them can be removed, replaced or added to.

- It rebuilds itself. `/reload` rebuilds the agent with your plugin changes and restarts it in the same session, and keeps the old build running if the new one does not compile.

- Subagents and checkpoints of what shell changed are optional plugins, and the tools work on remote hosts over ssh or any command.

<br>

### Agent Builder

<br>

```
use rig::prelude::*;
use rig::providers::openai::{self, OpenAI};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let model = OpenAI::from_env()?.completion(openai::GPT_5_5);

    let agent = AgentBuilder::new(model)
        .preamble("You are a helpful assistant.")
        .temperature(0.7)
        .build();

    let response = agent.prompt("Hello!").await?;
    println!("{}", response.output());

    Ok(())
}
```

<br>

### Crates

<br>

- The `rig` crate re-exports the core and the agent runtime, and each companion crate behind a feature:

<br>

| Crate | What it is |
| --- | --- |
| `rig-core` | Provider-neutral messages, completion and embedding models, tool contracts, the conversation type, vector-store contracts, and the providers |
| `rig-agent` | The agent builder, prompting and streaming, hooks, the tool registry and the serializable `AgentRun` |
| `rig-memory` | Windows, compaction, and saving, resuming and forking conversations |
| `rig-cassette` | Effect logs: recording, replay and checkpoints |
| `rig-tools` | Coding tools any rig agent can use: read, write, edit, search, shell |
| `rig-ecs`, `rig-harness` | The agent kernel on Bevy's ECS, and the harness the coding agent's plugins build on |
| `rig-tui`, `rig-basics` | The terminal view, and the coding agent's default plugins |
| `rig-traffic` | Opt-in provider HTTP recording in the session store, using the cassette engine |

<br>

### Resources

<br>

- **[Rig documentation](https://rig.rs/docs)**
- **[Awesome Rig](https://github.com/0xPlaygrounds/awesome-rig)**
- **[Rig on memory](https://rig.rs/docs/concepts/memory)**
- **[Rig on hooks](https://rig.rs/docs/concepts/hooks)**
- **[Rig on plugins](https://github.com/0xPlaygrounds/rig/blob/main/crates/rig-harness/PLUGINS.md)**
- **[Rig agent examples](https://github.com/0xPlaygrounds/rig/tree/main/examples)**

<br>

---

## 🦀 [goose (Rust)](https://github.com/aaif-goose/goose)

<br>

> A general-purpose AI agent not just for code — use it for research, writing, automation, data analysis, or anything you need to get done. Built in Rust for performance and portability.

<br>

- It works with 15+ providers — Anthropic, OpenAI, Google, Ollama, OpenRouter, Azure, Bedrock, and more. Use API keys or your existing Claude, ChatGPT, or Gemini subscriptions via ACP. Connect to 70+ extensions via the Model Context Protocol open standard.

- It's part of the Agentic AI Foundation (AAIF) at the Linux Foundation.

### [Crates](https://github.com/aaif-goose/goose/tree/main/crates)

<br>

```
goose: the main code for goose, contains all the core logic
goose-bench: benchmarking
goose-cli: the command line interface, use goose crate
goose-mcp: the mcp servers that ship with goose. the developer sub system is of special interest
goose-server: the server that supports the desktop (electron) app. also known as goosed
```

<br>

### ACP Agents as Providers

<br>

- goose can delegate to external ACP agents (like Claude Code or Codex) as providers. The ACP agent handles tool execution internally. goose passes configured extensions through as MCP servers.

<br>

![](/blog/assets/report_harn_19.png)

<br>

### [(Ralph) Loop](https://goose-docs.ai/docs/tutorials/ralph-loop/)

<br>

```
# Function to prompt for settings
prompt_for_settings() {
    local default_model="${GOOSE_MODEL:-}"
    local default_provider="${GOOSE_PROVIDER:-}"
    
    # Worker model
    if [ -n "$default_model" ]; then
        echo -ne "${BLUE}Worker model${NC} [${default_model}]: "
        read -r user_input
        WORKER_MODEL="${user_input:-$default_model}"
    else
        echo -ne "${BLUE}Worker model${NC}: "
        read -r WORKER_MODEL
        if [ -z "$WORKER_MODEL" ]; then
            echo -e "${RED}Error: Worker model is required${NC}"
            exit 1
        fi
    fi
    
    # Worker provider
    if [ -n "$default_provider" ]; then
        echo -ne "${BLUE}Worker provider${NC} [${default_provider}]: "
        read -r user_input
        WORKER_PROVIDER="${user_input:-$default_provider}"
    else
        echo -ne "${BLUE}Worker provider${NC}: "
        read -r WORKER_PROVIDER
        if [ -z "$WORKER_PROVIDER" ]; then
            echo -e "${RED}Error: Worker provider is required${NC}"
            exit 1
        fi
    fi
    
    # Reviewer model
    echo -ne "${BLUE}Reviewer model${NC} (should be different from worker): "
    read -r REVIEWER_MODEL
    if [ -z "$REVIEWER_MODEL" ]; then
        echo -e "${RED}Error: Reviewer model is required${NC}"
        echo "The reviewer should be a different model to provide fresh perspective."
        exit 1
    fi
    
    # Reviewer provider
    echo -ne "${BLUE}Reviewer provider${NC}: "
    read -r REVIEWER_PROVIDER
    if [ -z "$REVIEWER_PROVIDER" ]; then
        echo -e "${RED}Error: Reviewer provider is required${NC}"
        exit 1
    fi
    
    # Same model warning
    if [ "$WORKER_MODEL" = "$REVIEWER_MODEL" ] && [ "$WORKER_PROVIDER" = "$REVIEWER_PROVIDER" ]; then
        echo -e "${YELLOW}Warning: Worker and reviewer are the same model.${NC}"
        echo "For best results, use different models for cross-model review."
        echo -ne "Continue anyway? [y/N]: "
        read -r confirm
        if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
            exit 1
        fi
    fi
    
    # Max iterations
    echo -ne "${BLUE}Max iterations${NC} [10]: "
    read -r user_input
    MAX_ITERATIONS="${user_input:-10}"
}

# Initialize from environment variables
WORKER_MODEL="${RALPH_WORKER_MODEL:-}"
WORKER_PROVIDER="${RALPH_WORKER_PROVIDER:-}"
REVIEWER_MODEL="${RALPH_REVIEWER_MODEL:-}"
REVIEWER_PROVIDER="${RALPH_REVIEWER_PROVIDER:-}"
MAX_ITERATIONS="${RALPH_MAX_ITERATIONS:-10}"

# If any required setting is missing, prompt for all settings
if [ -z "$WORKER_MODEL" ] || [ -z "$WORKER_PROVIDER" ] || [ -z "$REVIEWER_MODEL" ] || [ -z "$REVIEWER_PROVIDER" ]; then
    prompt_for_settings
fi

STATE_DIR=".goose/ralph"
mkdir -p "$STATE_DIR"

if [ -f "$INPUT" ]; then
    cp "$INPUT" "$STATE_DIR/task.md"
    echo -e "${BLUE}Reading task from file: $INPUT${NC}"
else
    echo "$INPUT" > "$STATE_DIR/task.md"
fi

TASK=$(cat "$STATE_DIR/task.md")

rm -f "$STATE_DIR/review-result.txt"
rm -f "$STATE_DIR/review-feedback.txt"
rm -f "$STATE_DIR/work-complete.txt"
rm -f "$STATE_DIR/work-summary.txt"

echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Ralph Loop - Multi-Model Edition${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "  Task: ${YELLOW}$TASK${NC}"
echo -e "  Worker: ${WORKER_MODEL} (${WORKER_PROVIDER})"
echo -e "  Reviewer: ${REVIEWER_MODEL} (${REVIEWER_PROVIDER})"
echo -e "  Max Iterations: $MAX_ITERATIONS"
echo ""

for i in $(seq 1 "$MAX_ITERATIONS"); do
    echo -e "${BLUE}───────────────────────────────────────────────────────────────${NC}"
    echo -e "${BLUE}  Iteration $i / $MAX_ITERATIONS${NC}"
    echo -e "${BLUE}───────────────────────────────────────────────────────────────${NC}"
    
    echo "$i" > "$STATE_DIR/iteration.txt"
    
    echo ""
    echo -e "${YELLOW}▶ WORK PHASE${NC}"
    
    GOOSE_PROVIDER="$WORKER_PROVIDER" GOOSE_MODEL="$WORKER_MODEL" goose run --recipe "$RECIPE_DIR/ralph-work.yaml" || {
        echo -e "${RED}✗ WORK PHASE FAILED${NC}"
        exit 1
    }
    
    if [ -f "$STATE_DIR/RALPH-BLOCKED.md" ]; then
        echo ""
        echo -e "${RED}✗ BLOCKED${NC}"
        cat "$STATE_DIR/RALPH-BLOCKED.md"
        exit 1
    fi
    
    echo ""
    echo -e "${YELLOW}▶ REVIEW PHASE${NC}"
    
    GOOSE_PROVIDER="$REVIEWER_PROVIDER" GOOSE_MODEL="$REVIEWER_MODEL" goose run --recipe "$RECIPE_DIR/ralph-review.yaml" || {
        echo -e "${RED}✗ REVIEW PHASE FAILED${NC}"
        exit 1
    }
    
    if [ -f "$STATE_DIR/review-result.txt" ]; then
        RESULT=$(cat "$STATE_DIR/review-result.txt" | tr -d '[:space:]')
        
        if [ "$RESULT" = "SHIP" ]; then
            echo ""
            echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
            echo -e "${GREEN}  ✓ SHIPPED after $i iteration(s)${NC}"
            echo -e "${GREEN}═══════════════════════════════════════════════════════════════${NC}"
            echo "COMPLETE: $(date)" > "$STATE_DIR/.ralph-complete"
            exit 0
        else
            echo ""
            echo -e "${YELLOW}↻ REVISE - Feedback for next iteration:${NC}"
            if [ -f "$STATE_DIR/review-feedback.txt" ]; then
                cat "$STATE_DIR/review-feedback.txt"
            fi
        fi
    else
        echo -e "${RED}✗ No review result found${NC}"
        exit 1
    fi
    
    rm -f "$STATE_DIR/work-complete.txt"
    rm -f "$STATE_DIR/review-result.txt"
    echo ""
done

echo -e "${RED}✗ Max iterations ($MAX_ITERATIONS) reached${NC}"
exit 1
```


<br>

### Resources

<br>

- **[Goose docs](https://goose-docs.ai/docs/quickstart/)**
- **[Observability with LangFuse](https://goose-docs.ai/docs/tutorials/langfuse/)**

<br>

---

## 🦀 [SpaceXAI's Grok (Rust)](https://github.com/xai-org/grok-build)

<br>

> Terminal-based AI coding agent. It runs as a full-screen TUI that understands your codebase, edits files, executes shell commands, searches the web, and manages long-running tasks — interactively, headlessly for scripting/CI, or embedded in editors via the Agent Client Protocol (ACP).

<br>

### [Agent Builder](https://github.com/xai-org/grok-build/tree/main/crates/codegen/xai-grok-agent)

<br>

From a file:

```
use xai_grok_agent::{AgentDefinition, AgentBuilder};
use xai_grok_tools::notification::ToolNotificationHandle;

// 1. Parse the definition file
let def = AgentDefinition::from_file(".grok/agents/code-reviewer.md")?;

// 2. Build the agent
let agent = AgentBuilder::new(cwd, None, ToolNotificationHandle::noop())
    .from_definition(def)
    .build()
    .await?;

// 3. Use it
println!("Agent: {}", agent.name());
println!("Prompt: {}", agent.system_prompt());
let tool_defs = agent.tool_definitions().await;
```

<br>

No file:

```
let agent = AgentBuilder::new(cwd, None, ToolNotificationHandle::noop())
    .with_name("my-agent")
    .with_description("A custom agent")
    .with_tools(vec!["read_file".into(), "grep".into()])
    .build()
    .await?;
```

<br>

### Crates

<br>


| Path                                          | Description                                                             |
| --------------------------------------------- | ----------------------------------------------------------------------- |
| `crates/codegen/xai-grok-pager-bin`           | Composition-root package; builds the `xai-grok-pager` binary            |
| `crates/codegen/xai-grok-pager`               | The TUI: scrollback, prompt, modals, rendering                          |
| `crates/codegen/xai-grok-shell`               | Agent runtime + leader/stdio/headless entry points                      |
| `crates/codegen/xai-grok-tools`               | Tool implementations (terminal, file edit, search, ...)                 |
| `crates/codegen/xai-grok-workspace`           | Host filesystem, VCS, execution, checkpoints                            |
| `crates/codegen/...`                          | The rest of the CLI crate closure (config, MCP, markdown, sandbox, ...) |
| `crates/common/`, `crates/build/`, `prod/mc/` | Small shared leaf crates pulled in by the closure                       |
| `third_party/`                                | Vendored upstream source (Mermaid diagram stack) — see below            |

<br>

### ACP Protocol (standard for AI agent communication)

<br>

```
┌─────────────────────────────────────────┐
│           ACP Client                    │
│  (IDE, Editor, Custom Application)      │
└──────────────────┬──────────────────────┘
                   │ JSON-RPC over stdio
┌──────────────────▼──────────────────────┐
│           grok agent stdio              │
│                                         │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  │
│  │ Session │  │  Tools  │  │   MCP   │  │
│  │ Manager │  │ Registry│  │ Servers │  │
│  └─────────┘  └─────────┘  └─────────┘  │
└─────────────────────────────────────────┘
```

<br>

### Resources

<br>

- **[Grok's user guide](https://github.com/xai-org/grok-build/tree/main/crates/codegen/xai-grok-pager/docs/user-guide)**
- **[Grok's memory/dream code](https://github.com/xai-org/grok-build/tree/main/crates/codegen/xai-grok-memory)** (and **[docs](https://github.com/xai-org/grok-build/blob/main/crates/codegen/xai-grok-pager/docs/user-guide/13-memory.md)**)
- **[Grok's compaction code](https://github.com/xai-org/grok-build/tree/main/crates/common/xai-grok-compaction)** (and **[transcript](https://github.com/xai-org/grok-build/tree/main/crates/codegen/xai-compaction-transcript)**)
- **[Grok's tool runtime code](https://github.com/xai-org/grok-build/tree/main/crates/common/xai-tool-runtime)**
- **[Grok's hooks code](https://github.com/xai-org/grok-build/tree/main/crates/codegen/xai-grok-hooks/examples)** (and **[docs](https://github.com/xai-org/grok-build/blob/main/crates/codegen/xai-grok-pager/docs/user-guide/10-hooks.md)**)
- **[Grok's graph/`ScopeGraph`](https://github.com/xai-org/grok-build/tree/main/crates/codegen/xai-codebase-graph)**
- **[Grok's tracing code](https://github.com/xai-org/grok-build/tree/main/crates/common/xai-tracing)**
- **[Cookbooks for building with Grok](https://github.com/xai-org/xai-cookbook)**

<br>

---

## 🦀 [OpenAI's Codex (Rust)](https://github.com/openai/codex)

<br>

> Perhaps the biggest coding agent out there. It understands codebases, edits files, executes commands, and supports multi-step software engineering workflows. **[Built with Bazel](https://github.com/openai/codex/tree/main/bazel)**.

<br>

### Agent Builder

<br>

1. **[CLI entry point — main.rs](https://github.com/openai/codex/blob/main/codex-rs/cli/src/main.rs#L1039)**
2. **[Interactive startup — `run_main`](https://github.com/openai/codex/blob/main/codex-rs/tui/src/lib.rs#L1145)**
3. **[Non-interative agent startup — `run_main`](https://github.com/openai/codex/blob/main/codex-rs/exec/src/lib.rs#L266)**

<br>

### Resources

<br>

- **[Codex learning docs](https://learn.chatgpt.com/docs)**
- **[Codex skills docs](https://learn.chatgpt.com/docs/build-skills)**
- **[Codex on prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching#structuring-prompts)**

<br>

---

## 🦀 [Ante (Rust)](https://github.com/AntigmaLabs/ante)

<br>

> Ante is a self-contained offline coding agent that lives in your terminal and self-organizes.

<br>

- One `~15MB` compressed download that expands to a single Rust executable with zero runtime dependencies, built to get the most out of any model.

- It works like Claude Code or Codex, with none of their dependencies or model constraints. It can also be the optimized core for building your own harness and high-performing assistants.

- Ante is hand-written Rust: the heavy parts (`Grep`, `git`) are embedded in one binary and one process, and local inference is handled by a managed `llama.cpp` (Amte's inference engine is a pinned, managed version of llama.cpp: point it at a GGUF file and the whole loop runs on your machine: no API key, no account, no internet).

- Across the same 20 parallel tasks in Docker, Ante uses ~7× less peak memory, ~9× less average CPU, and ~5× less disk I/O than Claude Code.

<br>

### [Crates](https://github.com/AntigmaLabs/ante/tree/main/crates)

<br>

```
Applications:
    ante-acp — Agent Client Protocol server driving Ante from editors like Zed and JetBrains IDEs.
    ante-gateway — Slack and Discord gateway for Ante.

Protocol & SDKs:
    crates/protocol-shape — Wire message schema spoken by ante serve.
    crates/ante-sdk — Async Rust SDK for controlling Ante over stdio or Unix domain sockets.

Core Primitives:
    crates/exec — Bounded async process execution.
    crates/llm — LLM provider profiles and shared primitives.
```

<br>

### Agent Builder

<br>

```
use std::time::Duration;
use ante_exec::{CommandOptions, run_with_timeout};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let output = run_with_timeout(
        CommandOptions::new("git", ".").args(["status", "--short"]),
        Duration::from_secs(10),
        1024 * 1024,
    )
    .await?;

    println!("{}", String::from_utf8_lossy(&output.stdout));
    Ok(())
}
```

<br>

### Architecture

<br>

```
┌─────────────────────────────────────────────────────────────┐
│                         Clients                             │
│                                                             │
│   ┌───────────┐    ┌───────────┐    ┌────────────────────┐  │
│   │    TUI    │    │ Headless  │    │    ante serve      │  │
│   │  (ante)   │    │ (ante -p) │    │   stdio/sock/ws    │  │
│   └─────┬─────┘    └─────┬─────┘    └─────────┬──────────┘  │
└─────────┼────────────────┼─────────────────────┼────────────┘
          │                │                     │
          ▼                ▼                     ▼
┌─────────────────────────────────────────────────────────────┐
│                         Daemon                              │
│                                                             │
│   Session ──▶ Turn ──▶ Step                                 │
│                                                             │
│   ┌──────────┐  ┌──────────────┐  ┌───────────────────┐     │
│   │  Tools   │  │  Permission  │  │  Skills / Agents  │     │
│   └──────────┘  └──────────────┘  └───────────────────┘     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                     LLM Providers                           │
│                                                             │
│   Anthropic · OpenAI · Gemini · Grok · Open Router · Local  │
└─────────────────────────────────────────────────────────────┘
```

<br>

### Resources

<br>

- **[Ante's documentation](https://docs.antigma.ai/)**
- **[Ante's memory docs](https://docs.antigma.ai/extend/memory/)**
- **[Ante benchmark comparisons](https://antigma.ai/eval)**

<br>

---

## 🦀 [Codewhale (Rust)](https://github.com/codewhale-hq/Codewhale)

<br>

> Give Codewhale a task and it reads the repository, edits files, and runs commands until the task is done or it needs input from you. It works with more than 40 built-in providers, DeepSeek V4.1 Flash by default, and with models running on your own machine. Built with **[Orca Router](https://www.orcarouter.ai/)**.

<br>

### [Architecture](https://github.com/codewhale-hq/Codewhale/blob/main/docs/ARCHITECTURE.md)

<br>

![](/blog/assets/report_harn_20.webp)

<br>

### Resources

<br>

- **[Codewhale docs](https://codewhale.net/en/docs)**
- **[Codewhale skills](https://github.com/codewhale-hq/Codewhale/blob/main/docs/SKILLS.md)**
- **[Codewhale memory](https://github.com/codewhale-hq/Codewhale/blob/main/docs/MEMORY.md)**
- **[Codewhale hooks](https://github.com/codewhale-hq/Codewhale/blob/main/docs/HOOKS.md)**
- **[Codewhale agent fleet](https://github.com/codewhale-hq/Codewhale/blob/main/docs/FLEET.md)** and **[subagents](https://github.com/codewhale-hq/Codewhale/blob/main/docs/SUBAGENTS.md)**

<br>

---

## 🐍 [LangChain's Deep Agents (Python)](https://github.com/langchain-ai/deepagents/tree/main)

<br>

> Deep Agents is an open source agent harness — an opinionated agent that runs out of the box. Extend, override, or replace any piece. 

<br>

- LangGraph is the graph runtime. LangChain's `create_agent` is a minimal agent harness on top of it. Deep Agents is a more opinionated harness on top of `create_agent` — same building blocks, but with filesystem, sub-agents, context management, and skills bundled in. 

- Use Deep Agents when you want the full harness — planning, context management, delegation — out of the box. Use LangChain's `create_agent` when you want a lighter harness without the bundled middleware. Drop to LangGraph when the agent loop itself isn't the right shape and you need a custom graph.

- Any LangGraph `CompiledStateGraph` can be passed in as a sub-agent to a Deep Agent, so custom orchestration plugs in alongside the harness's defaults.

- Pair it with LangSmith for tracing, evaluation, and monitoring.

- Similar to Claude Code or Codex — powered by any LLM. Includes an interactive TUI, web search, remote sandboxes, persistent memory, custom skills, and human-in-the-loop approval.

<br>

### Agent Builder

<br>

```
from deepagents import create_deep_agent

agent = create_deep_agent(
    model="openai:gpt-6-astra",
    system_prompt="You are a research assistant.",
)
result = agent.invoke({"messages": "Research LangGraph and write a summary"})
```
<br>

Which will:

- Resolves the requested chat model and any provider or harness profile that applies to it,
- Resolves the backend used by filesystem, skills, memory, and execute behavior,
- Assembles the main-agent middleware stack,
- Builds the default general-purpose subagent and any caller-provided subagents,
- Composes the system prompt (from caller instructions, SDK defaults, and profile text), and
- Calls LangChain's `create_agent(...)` to produce the runnable agent graph.

<br>

Principles:

- Opinionated — defaults tuned for long-horizon, multi-step work
- Extensible — override or replace any piece without forking
- Model-agnostic — works with any LLM that supports tool calling: frontier, open-weight, or local
- Production-ready — built on LangGraph (streaming, persistence, checkpointing) with first-class tracing, evaluation, and deployment via LangSmith

<br>

Features include:

- Sub-agents — delegate tasks to agents with isolated context windows
- Filesystem — read, write, edit, or search over pluggable local, sandboxed, or remote backends
- Context management — summarize long threads and offload tool outputs to disk
- Shell access — run commands in your sandbox of choice
- Persistent memory — pluggable state and store backends for cross-session recall
- Human-in-the-loop — approve, edit, or reject tool calls before they run
- Skills — reusable behaviors the agent can load on demand
- Tools — bring your own functions or any MCP server

<br>

Deep Agents installs scaffolding middleware first, inserts caller-supplied middleware in the middle, then appends tail behavior that depends on the final prompt and tool surface:

- Base scaffolding creates the capabilities expected of a deep agent: planning, filesystem access, subagent delegation, summarization, and request cleanup.
- Caller middleware is where applications add their own behavior without rebuilding the harness from scratch.
- Profile and tail middleware tune the final request surface: provider-specific behavior, tool exclusions, prompt caching, memory injection, and human approval.

<br>

### (Ralph) Loop

<br>

```
from deepagents_cli.non_interactive import run_non_interactive
from rich.console import Console

async def ralph(
    task: str,
    max_iterations: int = 0,
    model_name: str | None = None,
    model_params: dict[str, Any] | None = None,
    sandbox_type: str = "none",
    sandbox_id: str | None = None,
    sandbox_setup: str | None = None,
    *,
    stream: bool = True,
) -> None:

    console = Console()
    iteration = 1
    
    try:
        while max_iterations == 0 or iteration <= max_iterations:

            iter_display = (
                f"{iteration}/{max_iterations}"
                if max_iterations > 0
                else str(iteration)
            )
            prompt = (
                f"## Ralph Iteration {iter_display}\n\n"
                f"Your previous work is in the filesystem. "
                f"Check what exists and keep building.\n\n"
                f"TASK:\n{task}\n\n"
                f"Make progress. You'll be called again."
            )

            exit_code = await run_non_interactive(
                message=prompt,
                assistant_id="ralph",
                model_name=model_name,
                model_params=model_params,
                sandbox_type=sandbox_type,
                sandbox_id=sandbox_id,
                sandbox_setup=sandbox_setup,
                quiet=True,
                stream=stream,
            )

            if exit_code == 130:  # noqa: PLR2004
                break

            if exit_code != 0:
                console.print(
                    f"[bold red]Iteration {iteration} exited with code {exit_code}[/bold red]"
                )

            console.print(f"\n[dim]...continuing to iteration {iteration + 1}[/dim]")
            iteration += 1

    except KeyboardInterrupt:
        console.print(
            f"\n[bold yellow]Stopped after {iteration} iterations[/bold yellow]"
        )


def main() -> None:
    
    if args.shell_allow_list:
        from deepagents_cli.config import parse_shell_allow_list, settings
        settings.shell_allow_list = parse_shell_allow_list(args.shell_allow_list)

    model_params: dict[str, Any] | None = None
    if args.model_params:
        model_params = json.loads(args.model_params)

    with contextlib.suppress(KeyboardInterrupt):
        asyncio.run(
            ralph(
                args.task,
                args.iterations,
                args.model,
                model_params=model_params,
                sandbox_type=args.sandbox,
                sandbox_id=args.sandbox_id,
                sandbox_setup=args.sandbox_setup,
                stream=not args.no_stream,
            )
        )


if __name__ == "__main__":
    main()
```

<br>

### [Nemotron Deep Agent + GPU Skills](https://github.com/langchain-ai/deepagents/tree/main/examples/nvidia_deep_agent)

<br>

```
create_deep_agent (orchestrator: frontier model)
    |
    |-- researcher-agent (Nemotron Super)
    |       Conducts web searches, gathers and synthesizes information
    |
    |-- data-processor-agent (frontier model)
    |       Writes and executes Python scripts on GPU sandbox
    |       GPU-accelerated data analysis, ML, visualization, document processing
    |
    |-- skills/
    |       cudf-analytics             GPU data analysis (groupby, stats, anomaly detection)
    |       cuml-machine-learning      GPU ML (classification, regression, clustering, PCA)
    |       data-visualization         Publication-quality charts (matplotlib, seaborn)
    |       gpu-document-processing    Large document processing via GPU sandbox
    |
    |-- memory/
    |       AGENTS.md    Persistent agent instructions (self-improving)
    |
    |-- backend: Modal Sandbox (GPU or CPU, switchable at runtime)
            Skills + memory uploaded on sandbox creation
            Agent reads/writes/executes directly inside the sandbox
```

<br>

### Resources

<br>

- **[LangChain Academy](https://academy.langchain.com/)**
- **[Deep Agent examples](https://github.com/langchain-ai/deepagents/tree/main/examples)**
- **[Pre-built code agent](https://github.com/langchain-ai/deepagents/tree/main/libs/code)**
- **[Evals](https://github.com/langchain-ai/deepagents/tree/main/libs/evals)** and **[evals.yml](https://github.com/langchain-ai/deepagents/actions/workflows/evals.yml)**
- **[Server middleware/hooks](https://github.com/langchain-ai/deepagents/blob/main/libs/code/deepagents_code/hooks/server_middleware.py)**
- **[Going to production (docs)](https://docs.langchain.com/oss/python/deepagents/going-to-production#langsmith-deployments)**
- **[Integration with sandbox providers](https://github.com/langchain-ai/deepagents/tree/main/libs/partners)**
- **[An example of harness optimization](https://github.com/langchain-ai/deepagents/tree/main/examples/better-harness)** 
- **[How to Build Agents That Improve Over Time](https://www.youtube.com/watch?v=xy_7SzwsIjM)**

<br>

---

## 🐍 [Hermes (Python)](https://github.com/NousResearch/hermes-agent)

<br>

> The self-improving AI agent built by **[Nous Research](https://nousresearch.com/)**. With a built-in learning loop: it creates skills from experience, improves them during use, nudges itself to persist knowledge, searches its own past conversations, and builds a deepening model of who you are across sessions. 

<br>

- Spawn isolated subagents for parallel workstreams. Write Python scripts that call tools via RPC, collapsing multi-step pipelines into zero-context-cost turns.

- Six built-in terminal backends — local, Docker, SSH, Modal, Daytona, and Vercel Sandbox — plus plugin backends such as Singularity/Apptainer. Daytona and Modal offer serverless persistence — your agent's environment hibernates when idle and wakes on demand, costing nearly nothing between sessions.

<br>

### Agent Builder

<br>

```
# Simple interface — returns final response string
response = agent.chat("Fix the bug in main.py")

# Full interface — returns dict with messages, metadata, usage stats
result = agent.run_conversation(
    user_message="Fix the bug in main.py",
    system_message=None,           # auto-built if omitted
    conversation_history=None,      # auto-loaded from session if omitted
    task_id="task_abc123"
)
```

<br>

where

```
`run_conversation()`
  1. Generate task_id if not provided
  2. Append user message to conversation history
  3. Build or reuse cached system prompt (prompt_builder.py)
  4. Check if preflight compression is needed (>50% context)
  5. Build API messages from conversation history
     - chat_completions: OpenAI format as-is
     - codex_responses: convert to Responses API input items
     - anthropic_messages: convert via anthropic_adapter.py
  6. Inject ephemeral prompt layers (budget warnings, context pressure)
  7. Apply prompt caching markers if on Anthropic
  8. Make interruptible API call (_interruptible_api_call)
  9. Parse response:
     - If tool_calls: execute them, append results, loop back to step 5
     - If text response: persist session, flush memory if needed, return
```

<br>

### Architecture

<br>

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Entry Points                                 │
│                                                                     │
│  CLI (cli.py)    Gateway (gateway/run.py)    ACP (acp_adapter/)     │
│  Batch Runner    API Server                  Python Library         │
└──────────┬──────────────┬───────────────────────┬───────────────────┘
           │              │                       │
           ▼              ▼                       ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     AIAgent (run_agent.py)                          │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐               │
│  │ Prompt       │  │ Provider     │  │ Tool         │               │
│  │ Builder      │  │ Resolution   │  │ Dispatch     │               │
│  │ (prompt_     │  │ (runtime_    │  │ (model_      │               │
│  │  builder.py) │  │  provider.py)│  │  tools.py)   │               │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘               │
│         │                 │                 │                       │
│  ┌──────┴───────┐  ┌──────┴───────┐  ┌──────┴───────┐               │
│  │ Compression  │  │ 3 API Modes  │  │ Tool Registry│               │
│  │ & Caching    │  │ chat_compl.  │  │ (registry.py)│               │
│  │              │  │ codex_resp.  │  │ 70+ tools    │               │
│  │              │  │ anthropic    │  │ 28 toolsets  │               │
│  └──────────────┘  └──────────────┘  └──────────────┘               │
└─────────┴─────────────────┴─────────────────┴───────────────────────┘
           │                                    │
           ▼                                    ▼
┌───────────────────┐              ┌─────────────────────-─┐
│ Session Storage   │              │ Tool Backends         │
│ (SQLite + FTS5)   │              │ Terminal (7 backends) │
│ hermes_state.py   │              │ Browser (5 backends)  │
│ gateway/session.py│              │ Web (4 backends)      │
└───────────────────┘              │ MCP (dynamic)         │
                                   │ File, Vision, etc.    │
                                   └───────────────────-───┘
```
<br>

### [Plugins](https://hermes-agent.nousresearch.com/docs/user-guide/features/plugins)

<br>

> Hermes has a plugin system for adding custom tools, hooks, and integrations without modifying core code.

<br>

```
"""Minimal Hermes plugin — registers a tool and a hook."""

def register(ctx):
    # --- Tool: hello_world ---
    schema = {
        "name": "hello_world",
        "description": "Returns a friendly greeting for the given name.",
        "parameters": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "Name to greet",
                }
            },
            "required": ["name"],
        },
    }

    def handle_hello(params, **kwargs):
        del kwargs
        name = params.get("name", "World")
        return json.dumps({"success": True, "greeting": f"Hello, {name}!"})

    ctx.register_tool(
        name="hello_world",
        toolset="hello_world",
        schema=schema,
        handler=handle_hello,
    )

    # --- Hook: log every tool call ---
    def on_tool_call(tool_name, params, result):
        print(f"[hello-world] tool called: {tool_name}")

    ctx.register_hook("post_tool_call", on_tool_call)
```

<br>

### Resources

<br>

- **[Hermes' list of evals](https://github.com/NousResearch/hermes-agent/tree/main/evals)**
- **[Hermes' list of skills](https://github.com/NousResearch/hermes-agent/tree/main/skills)**
- **[How Hermes organizes context files](https://hermes-agent.nousresearch.com/docs/user-guide/features/context-files)**
- **[How Hermes organizes persistent memory](https://hermes-agent.nousresearch.com/docs/user-guide/features/memory)**
- **[Hermes' containerization files](https://github.com/NousResearch/hermes-agent/tree/main/docker)**
- **[Hermes' security mode has eight layers](https://hermes-agent.nousresearch.com/docs/user-guide/security)**
- **[Hermes' `SOUL.md` and `/personality`](https://hermes-agent.nousresearch.com/docs/user-guide/features/personality)**
- **[Hermes Agent Masterclass, by Tonbi’s Garage](https://www.youtube.com/playlist?list=PLmpUb_PWAkDx-VWjh00tVCji794xAa_IX)**

<br>

---

## 🐍 [Bytedance's DeerFlow (Python)](https://github.com/bytedance/deer-flow)

<br>

> An open-source long-horizon SuperAgent harness that researches, codes, and creates. With the help of sandboxes, memories, tools, skill, subagents and message gateway, it handles different levels of tasks that could take minutes to hours.

<br>

- DeerFlow is a LangGraph-based AI super agent with sandbox execution, persistent memory, and extensible tool integration. The backend enables AI agents to execute code, browse the web, manage files, delegate tasks to subagents, and retain context across conversations - all in isolated, per-thread environments.

- DeerFlow supports multiple sandbox execution modes: 1) Local Execution (runs sandbox code directly on the host machine); 2) Docker Execution (runs sandbox code in isolated Docker containers); 3) Docker Execution with Kubernetes (runs sandbox code in Kubernetes pods via provisioner service).

<br>

### Agent Builder

<br>

```
from deerflow.agents import RuntimeFeatures, create_deerflow_agent
from deerflow.subagents import SubagentRuntime

runtime = SubagentRuntime.from_app_config(app_config, batch_repository=batch_repository)
async with runtime:
    graph = create_deerflow_agent(
        model,
        features=RuntimeFeatures(subagent=True),
        subagent_runtime=runtime,
    )
    # Serve or invoke graph while the durable worker is running.
```

<br>

- Recommended using Doubao-Seed-2.0-Code, DeepSeek v3.2 and Kimi 2.5.

<br>

### Resources

<br>

- **[DeerFlow's context compaction](https://github.com/bytedance/deer-flow#manual-context-compaction)**
- **[DeerFlow's conversation summarization](https://github.com/bytedance/deer-flow/blob/main/backend/docs/summarization.md)**
- **[DeerFlow's long-term memory](https://github.com/bytedance/deer-flow#long-term-memory)**
- **[DeerFlow's subagents guide](https://github.com/bytedance/deer-flow#sub-agents)**
- **[DeerFlow's middleware chain](https://github.com/bytedance/deer-flow/tree/main/backend#middleware-chain)**
- **[DeerFlow's guardrails guide](https://github.com/bytedance/deer-flow/blob/main/backend/docs/GUARDRAILS.md)**
- **[DeerFlow's memory system](https://github.com/bytedance/deer-flow/tree/main/backend#memory-system)**
- **[DeerFlow's list of skills](https://github.com/bytedance/deer-flow/tree/main/skills/public)**
- **[DeerFlow's eval scripts](https://github.com/bytedance/deer-flow/tree/main/backend/scripts)**
- **[DeerFlow's security guide](https://github.com/bytedance/deer-flow#%EF%B8%8F-security-notice)**
- **[LangSmith tracing docs](https://github.com/bytedance/deer-flow#langsmith-tracing)**

<br>

---

## 🟦 [pi (TypeScript)](https://github.com/earendil-works/pi)

<br>

> Pi is a minimal, extensible agent harness that you can make your own.

> 💡 **[NULLSTAR](https://www.nullstar.games/)**'s first module, **[PleiadesOS:MAIA](https://marina.nullstar.fun/pages/post.html?post=idea_nullstar)**, is written in Rust but it was inspired by Pi's beautiful, minimalist design (and heavily based on primitives and customized extensions wrappers).

<br>

- Pi ships with powerful defaults but skips features like sub-agents and plan mode. Customize Pi with extensions, skills, prompt templates, and themes. Bundle them as Pi packages and share via npm or git.

- Pi's minimal system prompt and extensibility let you do actual context engineering. Control what goes into the context window and how it's managed.

- Use Pi interactively, automate it in print or JSON mode, control it over RPC, or build apps with the Pi TypeScript SDK (four modes).

<br>

### [Agent Builder](https://github.com/earendil-works/pi/tree/main/packages/agent)

<br>

```
import { Agent } from "@earendil-works/pi-agent-core";
import { createModels } from "@earendil-works/pi-ai";
import { anthropicProvider } from "@earendil-works/pi-ai/providers/anthropic";

const models = createModels();
models.setProvider(anthropicProvider());
const model = models.getModel("anthropic", "claude-sonnet-4-6");
if (!model) throw new Error("Model not found");

const agent = new Agent({
  initialState: {
    systemPrompt: "You are a helpful assistant.",
    model,
  },
  streamFn: models.streamSimple.bind(models),
});

agent.subscribe((event) => {
  if (event.type === "message_update" && event.assistantMessageEvent.type === "text_delta") {
    // Stream just the new text chunk
    process.stdout.write(event.assistantMessageEvent.delta);
  }
});

await agent.prompt("Hello!");
```
<br>

with these options:

```
const agent = new Agent({
  // Initial state. systemPrompt and tools become the leading system message
  // unless messages already starts with one.
  initialState: {
    systemPrompt: string,
    model: Model<any>,
    thinkingLevel: "off" | "minimal" | "low" | "medium" | "high" | "xhigh" | "max",
    tools: AgentTool<any>[],
    messages: AgentMessage[],
  },

  // Convert AgentMessage[] to LLM Message[] (required for custom message types)
  convertToLlm: (messages) => messages.filter(...),

  // Transform context before convertToLlm (for pruning, compaction)
  transformContext: async (messages, signal) => pruneOldMessages(messages),

  // Steering mode: "one-at-a-time" (default) or "all"
  steeringMode: "one-at-a-time",

  // Follow-up mode: "one-at-a-time" (default) or "all"
  followUpMode: "one-at-a-time",

  // Required stream function. Receives a TranscriptContext: the prompt and tools
  // are in the transcript's system messages, not on the context.
  streamFn: models.streamSimple.bind(models),

  // Session ID for provider caching
  sessionId: "session-123",

  // How requests identify the app to providers (pi-ai ClientIdentity), merged over
  // DEFAULT_AGENT_IDENTITY ({ attribution: PI_ATTRIBUTION }: provider attribution headers name pi).
  // Pass your app's attribution, or null to send none.
  identity: { attribution: { name: "my-app", url: "https://my-app.example" } },

  // Dynamic API key resolution (for expiring OAuth tokens)
  getApiKey: async (provider) => refreshToken(),

  // Tool execution mode: "parallel" (default) or "sequential"
  toolExecution: "parallel",

  // Preflight each tool call after args are validated. Can block execution.
  beforeToolCall: async ({ toolCall, args, context }) => {
    if (toolCall.name === "bash") {
      return { block: true, reason: "bash is disabled", terminate: true };
    }
  },

  // Postprocess each tool result before final tool events are emitted.
  afterToolCall: async ({ toolCall, result, isError, context }) => {
    if (toolCall.name === "notify_done" && !isError) {
      return { terminate: true };
    }
    if (!isError) {
      return { details: { ...result.details, audited: true } };
    }
  },

  // Rebuild finalized context immediately before every provider request.
  prepareRequest: async ({ context }, signal) => {
    return { context: { ...context, messages: await loadCanonicalMessages(signal) } };
  },

  // Finalize a completed turn before turn_end is emitted.
  // `continue` ensures one next request; existing tool/queue scheduling can satisfy it.
  // `end` ends this run after turn_end without polling queues.
  finishTurn: async ({ message, toolResults }, signal) => {
    return shouldContinue(message, toolResults) ? { action: "continue" } : undefined;
  },

  // Custom thinking budgets for token-based providers
  thinkingBudgets: {
    minimal: 128,
    low: 512,
    medium: 1024,
    high: 2048,
  },
});
```

<br>

where each provider turn follows this lifecycle:

```
selected input events
→ prepareRequest
→ provider response
→ tool results
→ finishTurn
→ turn_end
→ existing continuation scheduling or agent_end
```

<br>

### Events

<br>

| Event                   | Description                                                                               |
|-------------------------|-------------------------------------------------------------------------------------------|
| `agent_start`           | Agent begins processing                                                                   |
| `agent_end`             | Final event for the run. Awaited subscribers for this event still count toward settlement |
| `turn_start`            | New turn begins (one LLM call + tool executions)                                          |
| `turn_end`              | Turn completes with assistant message and tool results                                    |
| `message_start`         | Any message begins (user, assistant, toolResult)                                          |
| `message_update`        | **Assistant only.** Includes `assistantMessageEvent` with delta                           |
| `message_end`           | Message completes                                                                         |
| `tool_execution_start`  | Tool begins                                                                               |
| `tool_execution_update` | Tool streams progress                                                                     |
| `tool_execution_end`    | Tool completes                                                                            |

<br>

### Resources

<br>

- **[Pi documentation](https://pi.dev/docs/latest)** 
- **[Pi's skills docs](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/skills.md)**
- **[Pi's subagent docs](https://github.com/earendil-works/pi/tree/main/packages/coding-agent/examples/extensions/subagent/)**
- **[Pi's custom compaction](https://github.com/earendil-works/pi/blob/main/packages/coding-agent/examples/extensions/custom-compaction.ts)**
- **[Pi's evals docs](https://github.com/earendil-works/pi/tree/main/packages/evals)**
- **[Pi's telemetry docs](https://github.com/earendil-works/pi/tree/main/packages/telemetry)**
- **[Pi's providers docs](https://github.com/earendil-works/pi/tree/main/packages/ai)**
- **[Pi's chords docs](https://github.com/earendil-works/pi/tree/main/packages/chord)**
- **[Pi's durable harness](https://github.com/earendil-works/pi/tree/main/packages/durable)**
- **[Pi durable explained by Hugging Face](https://www.youtube.com/watch?v=ti3vVYwzW4A&list=WL&index=104)**
- **[Run Pi with NVIDIA RTX and llama.cpp](https://pi.dev/docs/latest/nvidia-rtx-llama-cpp)**
- **[Earendil blog](https://earendil.com/posts/)**

<br>

---

## 🟦 [Anthropic's Claude Code (TypeScript)](https://github.com/anthropics/claude-code)

<br>

> Another of the big ones, but closed-source. Agentic coding tool that lives in your terminal, understands your codebase, and helps you code faster by executing routine tasks, explaining complex code, and handling git workflows.

<br>

### Agent Builder

<br>

- Anthropic's claude-code repository has not exposed the full implementation as ordinary, readable source code, but below is an example of how one can interact with its API (i.e., evaluate stop reasons, execute tools, and feed results back iteratively):

<br>

```
import anthropic
import subprocess
import json

# Initialize the official Anthropic client
client = anthropic.Anthropic()

def run_agent_loop(initial_prompt: str, max_turns: int = 15):
    """
    Core agentic run loop managing multi-turn interactions, tool dispatch,
    and state continuation.
    """
    messages = [{"role": "user", "content": initial_prompt}]
    
    # Define tools available to the model (e.g., bash execution)
    tools = [
        {
            "name": "bash",
            "description": "Execute a shell command in the local environment.",
            "input_schema": {
                "type": "object",
                "properties": {
                    "command": {
                        "type": "string",
                        "description": "The bash command line to run."
                    }
                },
                "required": ["command"]
            }
        }
    ]

    for turn in range(max_turns):
        print(f"\n--- Turn {turn + 1} of {max_turns} ---")
        
        # 1. Send conversation history + tools to Claude
        response = client.messages.create(
            model="claude-3-5-sonnet-20260228",
            max_tokens=4096,
            tools=tools,
            messages=messages
        )
        
        # 2. Append assistant's response (which may contain text and/or tool calls)
        messages.append({"role": "assistant", "content": response.content})
        
        # Print out any thoughts/text the model generated
        for content_block in response.content:
            if content_block.type == "text":
                print(f"Claude: {content_block.text}")

        # 3. Evaluate the stop reason
        if response.stop_reason == "end_turn":
            print("\n[Loop Completed]: Task finished by model.")
            break
            
        elif response.stop_reason == "tool_use":
            tool_results = []
            
            # Extract and process all requested tool calls
            for content_block in response.content:
                if content_block.type == "tool_use":
                    tool_name = content_block.name
                    tool_inputs = content_block.input
                    tool_id = content_block.id
                    
                    print(f"\n[Executing Tool -> {tool_name}]: {tool_inputs.get('command', '')}")
                    
                    # Execute tool in local environment
                    output = execute_local_tool(tool_name, tool_inputs)
                    
                    # Package tool result for the next turn
                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": tool_id,
                        "content": output
                    })
            
            # 4. Feed tool execution outputs back into the conversation history
            messages.append({"role": "user", "content": tool_results})
            
        else:
            print(f"\n[Loop Interrupted]: Stopped due to {response.stop_reason}")
            break

def execute_local_tool(name: str, inputs: dict) -> str:
    """Helper dispatcher for local tool execution."""
    if name == "bash":
        try:
            res = subprocess.run(
                inputs["command"], 
                shell=True, 
                capture_output=True, 
                text=True, 
                timeout=60
            )
            output = res.stdout if res.returncode == 0 else f"Error: {res.stderr}"
            return output.strip() if output else "Command executed successfully with no output."
        except Exception as e:
            return f"Execution exception: {str(e)}"
    return f"Error: Unknown tool '{name}'"


if __name__ == "__main__":
    run_agent_loop("Check what files are in the current directory and run git status.")
```

<br>

### Resources

<br>

- **[Claude Code documentation](https://code.claude.com/docs/en/overview)**
- **[Claude Code on memory](https://code.claude.com/docs/en/memory)**
- **[Claude Code on hooks](https://code.claude.com/docs/en/hooks-guide)**
- **[Claude Code on plugins](https://github.com/anthropics/claude-code/tree/main/plugins)**

<br>

---

## 🟦 [OpenClaw (TypeScript)](https://github.com/openclaw/openclaw)

<br>

> Everybody loves their claw...

> AI assistant that runs on your own computer and meets you in the channels you already use: Discord, iMessage, Slack, Teams, Telegram, WhatsApp, and 20+ more, plus native apps for macOS, iOS, Android, Windows, and Linux. One Gateway runs it as a personal assistant on a laptop or as a shared team deployment; configuration is the only difference.

> State, memory, and credentials live on your hardware. Models and agent harnesses (Claude, Codex, local models) are plugins you can swap without changing anything else. Your prompts go to the model provider and chat platforms you configure, plus any diagnostics export you enable yourself; by default OpenClaw itself phones home for nothing but a daily version check, anonymous feature statistics are opt-in, and `update.checkOnStart: false` disables both (what OpenClaw sends). 

<br>

How it fits together

- The Gateway is the local control plane for sessions, tools, events, and channel connections.
- The Control UI, CLI, and TUI connect to the Gateway.
- Channels bring the assistant to messaging services.
- Companion apps and nodes add voice, Canvas, camera, screen, and device-local actions on supported platforms.

<br>

### Agent Builder

<br>

- OpenClaw owns the built-in agent runtime. 

- Runtime code lives under `src/agents/`, model/provider transport lives under `src/llm/`, and `openclaw/plugin-sdk/*` barrels expose the plugin-facing contracts.

<br>

| Path                                | Owns                                                                                                                                                                             |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/agents/embedded-agent-runner/` | Built-in attempt loop (`run.ts`, `run/`), model selection and provider normalization (`model*.ts`), per-provider request params (`extra-params.*`), compaction, transcript and session wiring.                            |
| `src/agents/sessions/`              | Session persistence (`session-manager.ts`), resource discovery (`package-manager.ts`, `resource-loader.ts`), in-session `extensions` loading, prompt templates, skills, themes, and TUI-backed tool renderers (`tools/`). |
| `packages/agent-core/`              | Reusable agent core (`@openclaw/agent-core`): agent loop, harness types, messages, compaction helpers, prompt templates, skills, and session storage contracts.                                                           |
| `src/agents/runtime/`               | OpenClaw facade that wires `@openclaw/agent-core` to the plugin SDK LLM runtime and re-exports it plus local proxy utilities.                                                                                             |
| `src/agents/agent-tools*.ts`        | OpenClaw-owned tool definitions, parameter schemas, tool policy, before/after tool-call adapters, and host/sandbox edit tools.                                                                                            |
| `src/agents/agent-hooks/`           | Built-in runtime hooks: compaction safeguard, compaction instructions, context pruning.                                                                                                                                   |
| `src/agents/harness/`               | Harness registry, selection policy, and lifecycle for the built-in and plugin-registered harnesses.                                                                                                                       |
| `src/llm/`                          | Model/provider registry, transport helpers, and provider-specific stream implementations (`src/llm/providers/`).                                                                                                          |


<br>

### Resources

<br>

- **[OpenClaw documentation](https://docs.openclaw.ai)**
- **[OpenClaw on skills](https://docs.openclaw.ai/tools/skills)**
- **[OpenClaw on plugins](https://docs.openclaw.ai/tools/plugin)**
- **[OpenClaw on compaction](https://docs.openclaw.ai/concepts/compaction)**
- **[OpenClaw on memory and dreams](https://docs.openclaw.ai/concepts/memory)**
- **OpenClaw on memory [architecture](https://docs.openclaw.ai/concepts/memory-architecture)** and **[search](https://docs.openclaw.ai/concepts/memory-search)**
- **[Y combinator + Peter Steinberger](https://www.youtube.com/watch?v=4uzGDAoNOZc)**
- **[a16z Speedrun + Peter Steinberger](https://www.youtube.com/watch?v=P8iK9ZyhJPM)**
- **[Lex Fridman + Peter Steinberger](https://www.youtube.com/watch?v=YFjfBk8HI5o)**

<br>

---

## 🟦 [DeepSeek's harness (TypeScript)](https://github.com/deepseek-ai/deepseek-harness)

<br>

> An agent harness associated for supporting agent execution and tool orchestration. Built on an "everything-is-a-plugin" architecture.

<br>

- Every part of the product is a plugin, including the model adapter, the tool registry, the session log, and the agent loop itself, so each is replaceable from configuration. A bundle is a distribution format for **[Cordis config](https://arxiv.org/abs/2608.25512)** rows and the code they mount, so whatever it inserts stays patchable by the layers above it.

- Events are the extension points, and picking the right domain is the first decision in most changes: 1) Session events are durable facts appended to the log and broadcast through session/event. Use one when the fact must survive a reload., 2) Agent events (`agent/`) carry a live Agent: inbox, step, status, request, validation, continuation. Use one to observe or intercept work in flight., 3) Capability events attach policy and adapters to a seam (`fs/`, `tools/`, `telemetry/`) without importing the loop.

<br>

### [Agent Builder and Run Loop](https://github.com/deepseek-ai/deepseek-harness/blob/master/packages/core/agent-loop/src/agent.ts#L112)

<br>

```
/** Drives one session through turn and step boundaries. */
export class ReactLoopAgent implements Agent {
  readonly model: AgentModel
  readonly inbox: ReactLoopInbox
  private phase: Phase
  private activityDone: Promise<void> = Promise.resolve()

  /** The agent-scoped registration boundary; the lifecycle owner unwinds it after the driver exits. */
  readonly scope: Scope
  readonly ctx: Context

  /** Fused dispatcher, built once in the constructor so hot-path dispatches never allocate. */
  private readonly dispatch: AgentEventDispatch

  /** Whether this loop instance has appended its initial/resume request anchor. */
  private requestHeaderLogged = false
  /** Surface generation at attachment or the preceding built request. */
  private requestSurfaceGeneration: number
  private readonly runtimeContext: RuntimeContextProjection
  /** Process-local revision of assistant frames for this attached Session. */
  private assistantStreamRevision = 0
  private assistantAttemptCounter = 0
  private readonly systemPrompt: SystemPromptProjection
  /** Identities fully frozen by this loop; weak references do not retain replaced history. */
  private readonly frozenMessages = new WeakSet<Message>()

  constructor(
    private loopCtx: Context,
    public readonly id: SessionId,
    public readonly options: AgentOptions,
    public readonly session: Session,
    projections: LoopProjections,
    lastTurn: number,
  ) {
    this.requestSurfaceGeneration = session.surface.contentGeneration
    this.dispatch = agentEvents(loopCtx, this)
    this.scope = createScope(loopCtx, this)
    this.ctx = this.scope.ctx
    this.model = new AgentModel(projections.modelSelection, session, options)
    this.inbox = new ReactLoopInbox(projections.inbox, session, this.dispatch)
    this.phase = { kind: 'idle', lastTurn }
    this.runtimeContext = new RuntimeContextProjection(this.ctx, session)
    this.systemPrompt = new SystemPromptProjection(session)
  }

  get status(): AgentStatus {
    return this.phase.kind === 'idle' || this.phase.kind === 'maintenance' ? 'idle' : 'running'
  }

  /** Commit a phase and publish its externally visible status transition. */
  private setPhase(next: Phase): void {
    const previousStatus = this.status
    this.phase = next
    const status = this.status
    if (status !== previousStatus) {
      this.dispatch.emit('agent/status', { status })
    }
  }

  send(message: UserMessage, target: InboxTarget, wakeup: boolean): void {
    // Waking input cannot join an aborted activity, so it starts the next turn.
    // Captured before the insertion so a reentrant cancel from a splice observer cannot reclassify it.
    const wakingAfterAbort = wakeup && this.phase.kind !== 'idle' && this.phase.abort.signal.aborted
    const resolvedTarget = wakingAfterAbort ? 'next-turn' : target
    this.inbox.splice(resolvedTarget, Infinity, 0, [message])
    if (wakeup) this.wakeDriver(wakingAfterAbort)
  }

  followup(input: UserMessage): void {
    this.send(input, 'next-turn', true)
  }

  steer(input: UserMessage): void {
    this.send(input, 'next-step', true)
  }

  inject(input: UserMessage): void {
    this.send(input, 'next-step', false)
  }

  cancel(cause: AgentCancelCause, options: CancelOptions = {}): void {
    if (!options.keepInbox) {
      this.inbox.clear()
      if (this.phase.kind !== 'idle') this.phase.wakeRequested = false
    }
    if (this.phase.kind !== 'idle') this.phase.abort.abort(cause)
  }

  runMaintenance<T>(job: (signal: AbortSignal) => Promise<T>): Promise<T> {
    if (this.phase.kind !== 'idle') throw new Error(`agent "${this.id}" already has active work`)
    const done = Promise.withResolvers<void>()
    const maintenance: Phase = {
      kind: 'maintenance',
      abort: new AbortController(),
      lastTurn: this.phase.lastTurn,
      wakeRequested: false,
    }
    this.setPhase(maintenance)
    this.activityDone = done.promise
    return (async () => {
      try {
        return await job(maintenance.abort.signal)
      } finally {
        this.setPhase({ kind: 'idle', lastTurn: maintenance.lastTurn })
        const cause = abortedCancelCause(maintenance.abort.signal)
        if (cause?.kind !== 'disposed' && maintenance.wakeRequested && this.inbox.hasPending) this.wakeDriver()
        done.resolve()
      }
    })()
  }

  /**
   * Start one driver, or latch its wake behind maintenance or an aborted
   * activity. A wake sent while idle always opens its turn boundary, even
   * when its message was cleared; only a latched replay is suppressed when
   * the queue no longer holds the wake.
   * @param wakeAfterAbort - the {@link send} classification, captured before
   *   the inbox insertion so a reentrant cancel cannot reclassify it.
   */
  private wakeDriver(wakeAfterAbort = false): void {
    if (this.phase.kind !== 'idle') {
      // Maintenance and aborted drivers cannot deliver the wake: latch it for
      // replay at convergence. Live drivers claim queued work themselves;
      // disposal never latches, so teardown waits on no model turn.
      const reason = abortedCancelCause(this.phase.abort.signal)
      if (reason?.kind !== 'disposed' && (this.phase.kind === 'maintenance' || wakeAfterAbort)) {
        this.phase.wakeRequested = true
      }
      return
    }
    const driver = Promise.withResolvers<void>()
    this.activityDone = driver.promise
    this.setPhase({
      kind: 'running',
      abort: new AbortController(),
      turn: this.phase.lastTurn,
      step: 0,
      wakeRequested: false,
    })
    this.loopCtx.agents.withInitiator(this, () => this.kick()).then(driver.resolve, driver.reject)
  }

  async whenIdle(): Promise<void> {
    let activity: Promise<void>
    do {
      await (activity = this.activityDone)
    } while (activity !== this.activityDone)
  }

  /** Report one failure at its live boundary, then preserve it for driver containment. */
  private throwError(error: unknown): never {
    const turn = this.phase.kind === 'running' ? this.phase.turn : this.phase.lastTurn
    const step = this.phase.kind === 'running' ? this.phase.step : 0
    this.dispatch.emit('agent/error', { turn, step, error })
    throw error
  }

  private async kick(): Promise<void> {
    try {
      while (await this.turn()) {}
    } catch (_error) {
      // Reported failures and cancellation are contained at the driver boundary.
    } finally {
      /* v8 ignore next -- kick owns a running phase until this driver boundary */
      if (this.phase.kind === 'running') {
        const { turn, wakeRequested } = this.phase
        this.setPhase({ kind: 'idle', lastTurn: turn })
        if (wakeRequested && this.inbox.hasPending) this.wakeDriver()
      }
    }
  }

  private async preStep(target: InboxTarget, position: { turn: number; step: number }): Promise<PreparedStep> {
    /* v8 ignore next -- private callers establish the running phase before proposing a step */
    if (this.phase.kind !== 'running') throw new Error(`agent "${this.id}": pre-step outside running phase`)
    const signal = this.phase.abort.signal
    const claimed = this.inbox.claim(target, position.turn)
    const selection = this.model.current()
    if (selection === undefined) {
      throw new Error(`agent "${this.id}" has no provider/model: set AgentOptions.provider and AgentOptions.model or record a model selection`)
    }
    const toolSet = await this.loopCtx.tools.resolve({ agent: this, modelSelection: selection, signal })
    try {
      const assembly = await this.loopCtx.systemPrompt.assemble({ ...assembleContextFor(this, signal), modelSelection: selection, toolSet })
      signal.throwIfAborted()
      const decision = await this.dispatch.waterfall(
        'agent/pre-step', { messages: claimed, ...position, signal, modelSelection: selection },
        (): Promise<PreStepDecision> => {
          const sections = renderContextSections(assembly)
          const context = this.runtimeContext.project(joinContextSections(sections), sections)
          return Promise.resolve<PreStepDecision>({
            kind: 'enter',
            messages: context === undefined ? claimed : [...claimed, context],
          })
        },
      )
      signal.throwIfAborted()
      if (decision.kind === 'reject') {
        toolSet.dispose()
        return decision
      }
      return { ...decision, assembly, selection, toolSet }
    } catch (error: unknown) {
      toolSet.dispose()
      throw error
    }
  }

  /** Whether the assembled tool schemas differ from the logged request header's. */
  private toolsChanged(tools: PromptAssembly['tools']): boolean {
    const baseline = this.session.requestHeader()
    if (baseline === undefined) return false
    return !headerEquals(baseline, canonicalHeader({ ...baseline, tools: [...tools] }))
  }

  /** Open one turn before claiming its first proposed step. */
  private async turn(): Promise<boolean> {
    if (this.phase.kind !== 'running') {
      this.throwError(new Error(`agent "${this.id}": turn without driver reservation`))
    }
    const phase = this.phase
    const { signal } = phase.abort
    signal.throwIfAborted()
    const turn = phase.turn + 1
    try {
      this.session.append('turn/start', { turn })
    } catch (error: unknown) {
      this.throwError(error)
    }
    phase.turn = turn
    let turnEnds: TurnEndReason | null = null
    let target: InboxTarget = 'next-turn'
    try {
      while (true) {
        signal.throwIfAborted()
        const step = phase.step + 1
        const decision = await this.preStep(target, { turn, step })
        if (decision.kind === 'reject') {
          turnEnds = { kind: 'blocked' }
          return false
        }
        try {
          if (turnEnds && decision.messages.length === 0) break
          // A removed waking message or an enter decision rewritten to empty
          // still owns the initial turn boundary, but it spends no model call.
          if (phase.step === 0 && decision.messages.length === 0) {
            turnEnds = { kind: 'completed' }
            return false
          }
          signal.throwIfAborted()
          this.session.append('step/start', { turn, step })
          phase.step = step
          const toolRecovery = new ToolCallRecovery()
          const stopRecovery = this.ctx.on('session/event', (session, event) => {
            if (session === this.session) toolRecovery.observe(event)
          })
          try {
            // max-tokens is sticky: once any step hits the ceiling, later steps
            // that complete normally must not downgrade the turn outcome.
            const stepEnd = await this.step(decision)
            // max-tokens stays sticky: a later completed step must not
            // downgrade the turn outcome.
            if (turnEnds === null || turnEnds.kind !== 'max-tokens') turnEnds = stepEnd
          } catch (error: unknown) {
            try {
              for (const event of toolRecovery.results()) {
                this.session.append('tool/result', event.data, {
                  surfaceOp: 'append',
                  ...event.sourceEventSeqs === undefined ? {} : { sourceEventSeqs: event.sourceEventSeqs },
                })
              }
            } catch (recoveryError: unknown) {
              throw new AggregateError([error, recoveryError], 'Step failed and its pending tool results could not be recorded', { cause: error })
            }
            throw error
          } finally {
            stopRecovery()
            this.session.append('step/end', { turn, step })
          }
        } finally {
          // Admission closes once the step's tool batch settles or no step opens.
          decision.toolSet.dispose()
        }
        signal.throwIfAborted()
        if (turnEnds && this.inbox.nextStep.length === 0) {
          await this.dispatch.serial('agent/turn-stopping', { turn, signal })
          signal.throwIfAborted()
        }
        if (turnEnds && this.inbox.nextStep.length === 0) break
        target = 'next-step'
      }
    } catch (error: unknown) {
      // A cause is present exactly while the signal is aborted.
      const cause = abortedCancelCause(signal)
      if (cause !== undefined) {
        turnEnds = { kind: 'aborted', reason: cause }
        throw error
      }
      // Every failure is structured: an `LlmError` keeps its facts, a tool
      // activation failure keeps its code, and anything else flattens to
      // `errorChain` text under the `UNKNOWN` code.
      turnEnds = {
        kind: 'error',
        error: error instanceof LlmError
          ? error.failure
          : { message: errorChain(error), code: error instanceof ToolActivationError ? error.code : 'UNKNOWN' },
      }
      this.throwError(error)
    } finally {
      try {
        // oxlint-disable-next-line typescript/no-non-null-assertion -- every exit assigns a turn ending
        this.session.append('turn/end', { turn, reason: turnEnds! })
      } catch (error: unknown) {
        this.throwError(error)
      }
    }
    if (!this.inbox.hasPending) return false
    phase.abort = new AbortController()
    // A fresh controller makes a latch set on the old one stale: the live driver claims the queue itself.
    phase.wakeRequested = false
    phase.step = 0
    return true
  }

  private async step(decision: Extract<PreparedStep, { kind: 'enter' }>): Promise<StepEndReason | null> {
    /* v8 ignore next -- private callers establish the running phase before executing a step */
    if (this.phase.kind !== 'running') throw new Error(`agent "${this.id}": step outside running phase`)
    const { turn, step, abort: { signal } } = this.phase
    signal.throwIfAborted()

    const { assembly } = decision
    const renderedPrompt = renderPrompt(assembly)
    let firstAttempt = true
    while (true) {
      const { config, preparedCall } = await this.prepareRequest(turn, step, decision.selection, signal)
      const currentContext = this.loopCtx.systemPrompt.refreshContext(assembly, {
        ...assembleContextFor(this, signal), modelSelection: decision.selection,
      })
      const sections = renderContextSections(currentContext)
      const context = this.runtimeContext.project(joinContextSections(sections), sections)
      signal.throwIfAborted()
      const startsRequestSeries = firstAttempt && decision.startsRequestSeries === true
      const commits = this.systemPrompt.project(renderedPrompt, {
        inHistory: preparedCall?.systemPromptUpdate === 'in-history',
        startsSeries: startsRequestSeries
          || this.requestSurfaceGeneration !== this.session.surface.contentGeneration
          || (preparedCall?.toolUpdate === undefined && this.toolsChanged(assembly.tools)),
      })
      for (const { message, intent } of commits) {
        this.session.append('system/message', { turn, step, message }, intent)
      }
      let contextAdmitted = false
      if (firstAttempt) {
        for (const message of decision.messages) {
          if (message.source.kind === 'runtime-context') {
            if (context !== undefined && !contextAdmitted) {
              this.session.append('user/message', context, { surfaceOp: 'append' })
              contextAdmitted = true
            }
          } else {
            this.session.append('user/message', message, { surfaceOp: 'append' })
          }
        }
      }
      if (context !== undefined && !contextAdmitted) {
        this.session.append('user/message', context, { surfaceOp: 'append' })
      }
      firstAttempt = false
      const request = this.buildRequest(config, preparedCall, assembly.tools, { turn, step }, startsRequestSeries, signal)
      const live = new AssistantStreamAttempt(
        this.session.id,
        ++this.assistantAttemptCounter,
        () => ++this.assistantStreamRevision,
        turn,
        step,
        (frame) => { this.dispatch.emit('agent/assistant-stream', { frame }) },
      )
      let started = false
      try {
        const stream = preparedCall?.stream(request) ?? this.loopCtx.llm.stream(request)
        signal.throwIfAborted()
        live.start()
        started = true
        for await (const chunk of stream) {
          signal.throwIfAborted()
          live.push(chunk)
        }
        signal.throwIfAborted()
      } catch (error: unknown) {
        if (!started) throw error
        try {
          if (signal.aborted) {
            const content = live.interruptedBlocks()
            if (content.length > 0) {
              live.settle('assistant/message', () => this.session.append('assistant/message', {
                turn,
                step,
                message: createAssistantMessage({
                  content,
                  source: {
                    provider: request.provider,
                    model: request.model,
                    ...live.replayState === undefined ? {} : { replayState: live.replayState },
                  },
                }),
                interrupted: true,
                ...live.usage === undefined ? {} : { usage: live.usage },
                stream: live.stream,
              }, { surfaceOp: 'append' }).seq)
            } else {
              live.settle(
                'assistant/attempt',
                () => this.session.append('assistant/attempt', { turn, step, stream: live.stream }).seq,
              )
            }
          } else {
            live.settle(
              'assistant/attempt',
              () => this.session.append('assistant/attempt', { turn, step, stream: live.stream }).seq,
            )
          }
        } catch (settlementError: unknown) {
          throw new AggregateError(
            [error, settlementError],
            'Assistant stream failed and its durable settlement was rejected',
            { cause: error },
          )
        }
        throw error
      }
      try {
        const finish = live.finish
        if (finish.kind === 'error' || finish.kind === 'aborted') {
          live.settle(
            'assistant/attempt',
            () => this.session.append('assistant/attempt', { turn, step, stream: live.stream }).seq,
          )
          const action = await this.dispatch.waterfall(
            'agent/request-error', {
              turn,
              step,
              provider: request.provider,
              failure: finish.failure,
              retryPolicy: preparedCall?.retryPolicy,
              signal,
            },
            () => Promise.resolve<RequestErrorAction>(undefined),
          )
          signal.throwIfAborted()
          if (action?.kind !== 'retry') {
            throw new LlmError(finish.failure.message, finish.failure.code, finish.failure)
          }
          continue
        }

        const message = createAssistantMessage({
          content: live.blocks(),
          source: {
            provider: request.provider,
            model: request.model,
            ...live.replayState !== undefined ? { replayState: live.replayState } : {},
          },
        })
        live.settle(
          'assistant/message',
          () => this.session.append('assistant/message', {
            turn,
            step,
            message,
            ...live.usage === undefined ? {} : { usage: live.usage },
            stream: live.stream,
          }, { surfaceOp: 'append' }).seq,
        )
        if (finish.kind === 'max-tokens') return { kind: 'max-tokens' }

        const toolCalls = message.content.filter(block => block.type === 'tool-call')
        if (toolCalls.length === 0) return { kind: 'completed' }
        const maxParallelToolCalls = this.loopCtx.agentLoop.config.maxParallelToolCalls.get()
        try {
          const result = await this.loopCtx.tools.execute({
            calls: toolCalls, signal, agent: this, log: { turn, step },
            maxParallelToolCalls, toolSet: decision.toolSet,
          })
          for (const context of result.additionalContexts) {
            this.inbox.splice('next-step', this.inbox.nextStep.length, 0, [context])
          }
          return result.concluded ? { kind: 'completed' } : null
        } catch (error: unknown) {
          if (!(error instanceof ToolBatchExecutionError)) throw error
          for (const context of error.partial.additionalContexts) {
            this.inbox.splice('next-step', this.inbox.nextStep.length, 0, [context])
          }
          throw error.cause
        }
      } catch (error: unknown) {
        if (!live.ended) live.abandon()
        throw error
      }
    }
  }

  /** Resolve request config for the step's selection and bind its adapter before admitting model-visible input. */
  private async prepareRequest(
    turn: number,
    step: number,
    selection: Readonly<ModelSelection>,
    signal: AbortSignal,
  ): Promise<{ config: LlmCallConfig; preparedCall?: PreparedLlmCall }> {
    const { session } = this

    // A loop instance seeds output controls from its options until it logs its
    // own header; later steps re-resolve marked defaults.
    const maxTokens = this.options.maxTokens
    const persisted: Partial<LlmCallConfig> = this.requestHeaderLogged
      // oxlint-disable-next-line typescript/no-non-null-assertion -- the instance logged the header it now folds
      ? requestProposal(session.requestHeader()!)
      : maxTokens === undefined ? {} : { maxTokens }
    const { provider: _provider, model: _model, reasoningEffort: _effort, ...controls } = persisted
    const seedConfig = deepFreeze(structuredClone({ ...controls, ...selection }))
    const proposedConfig = await this.dispatch.waterfall(
      'agent/request', { turn, step, signal },
      () => Promise.resolve(seedConfig),
    )
    signal.throwIfAborted()
    if (proposedConfig.provider !== selection.provider || proposedConfig.model !== selection.model) {
      throw new Error(`agent "${this.id}": agent/request proposed "${proposedConfig.provider}/${proposedConfig.model}" after step preparation fixed "${selection.provider}/${selection.model}"; use agent.model.select() before step preparation`)
    }
    if (proposedConfig.reasoningEffort !== selection.reasoningEffort) {
      throw new Error(`agent "${this.id}": agent/request proposed reasoning effort "${proposedConfig.reasoningEffort ?? 'adapter default'}" after step preparation fixed "${selection.reasoningEffort ?? 'adapter default'}"; use agent.model.select() before step preparation`)
    }
    let config: LlmCallConfig
    let preparedCall: PreparedLlmCall | undefined
    try {
      preparedCall = await this.loopCtx.llm.prepareCall(proposedConfig, signal)
      config = preparedCall.config
    } catch (error: unknown) {
      // Middleware may serve an unregistered route; terminal dispatch still requires an adapter.
      if (!(error instanceof LlmError) || error.code !== 'NO_ADAPTER') throw error
      config = proposedConfig
    }
    signal.throwIfAborted()
    return { config, ...preparedCall === undefined ? {} : { preparedCall } }
  }

  /** Log the resolved envelope and derive a frozen request from the admitted surface. */
  private buildRequest(
    config: LlmCallConfig,
    preparedCall: PreparedLlmCall | undefined,
    tools: GenerateOptions['tools'] & object,
    position: { turn: number; step: number },
    startsRequestSeries: boolean,
    signal: AbortSignal,
  ): GenerateOptions {
    const { session } = this
    const surfaceGeneration = session.surface.contentGeneration
    const header = canonicalHeader({
      config,
      ...preparedCall === undefined ? {} : { adapterDefaults: preparedCall.adapterDefaults },
      ...tools.length > 0 ? { tools } : {},
    })
    const baseline = this.session.requestHeader()
    const startsSeries = startsRequestSeries
      || this.requestSurfaceGeneration !== surfaceGeneration
    let headerSeq: SessionSeq | undefined
    if (!this.requestHeaderLogged) {
      // Compaction during the first resumed pre-step must still mark a new series.
      headerSeq = this.session.append('request/header', {
        header,
        reason: baseline === undefined ? 'initial' : 'resume',
        ...startsSeries ? { startsSeries: true } : {},
      }).seq
      this.requestHeaderLogged = true
    } else if (baseline === undefined || !headerEquals(baseline, header)) {
      headerSeq = this.session.append('request/header', {
        header,
        reason: 'change',
        ...startsSeries ? { startsSeries: true } : {},
      }).seq
    } else if (startsSeries) {
      this.session.append('request/header', { header, reason: 'series' })
    }
    if (baseline !== undefined && headerSeq !== undefined) {
      const previousNames = new Set(baseline.tools?.map(tool => tool.name))
      const currentNames = new Set(tools.map(tool => tool.name))
      const additions = tools.filter(tool => !previousNames.has(tool.name))
        .map(tool => ({ type: 'tool-addition' as const, toolName: tool.name }))
      const removals = (baseline.tools ?? []).filter(tool => !currentNames.has(tool.name))
        .map(tool => ({ type: 'tool-removal' as const, toolName: tool.name }))
      if (additions.length > 0 || removals.length > 0) {
        session.append('developer/message', {
          ...position,
          message: createDeveloperMessage({ source: { kind: 'tool-registry' }, content: [...additions, ...removals] }),
          ...additions.length > 0 ? { headerSeq } : {},
        }, { surfaceOp: 'append' })
      }
    }
    this.requestSurfaceGeneration = surfaceGeneration

    const contextWindow = preparedCall?.context?.contextWindow
    const systemPromptUpdate = preparedCall?.systemPromptUpdate
    const requestContext: RequestContext = {
      provider: config.provider,
      model: config.model,
      ...contextWindow === undefined ? {} : { contextWindow },
      ...systemPromptUpdate === undefined ? {} : { systemPromptUpdate },
    }
    const previousContext = session.requestContext()
    if (previousContext?.provider !== requestContext.provider
      || previousContext.model !== requestContext.model
      || previousContext.contextWindow !== requestContext.contextWindow
      || previousContext.systemPromptUpdate !== requestContext.systemPromptUpdate) {
      session.append('request/context', requestContext)
    }
    signal.throwIfAborted()

    // canonicalHeader is shallow; append logs a detached snapshot, not these local values.
    deepFreeze(header)
    const boundaryMessages = session.deriveMessages()
    for (const message of boundaryMessages) {
      if (this.frozenMessages.has(message)) continue
      deepFreeze(message)
      this.frozenMessages.add(message)
    }
    Object.freeze(boundaryMessages)
    const request = markAgentLoopRequest(Object.freeze({
      ...header.config,
      messages: boundaryMessages,
      toolHistory: session.toolHistory(),
      ...header.tools !== undefined ? { tools: header.tools } : {},
      sessionId: this.session.id,
      signal,
    }))
    return request
  }
}
```

<br>

> 🧌 NOTE TO READERS: This could have been trolling. Or not.

> 🙄 NOTE TO SELF: **[TypeScript/JavaScript is the ugliest language in the world](https://www.youtube.com/watch?v=lx9Q66VNCW)**.

<br>

### Core packages

<br>

| Package | Owns | `ctx` key |
|---|---|---|
| `core/session` | The append-only `SessionEvent` log and in-memory store | `ctx.sessions` |
| `core/system-prompt` | Prompt-section and tool-schema assembly | `ctx.systemPrompt` |
| `core/tools` | The scoped tool registry and guarded execution pipeline | `ctx.tools` |
| `core/agent` | The `Agent` interface, live registry, and `agent/*` events | `ctx.agents` |
| `core/agent-loop` | The default driver implementing that interface | `ctx.agentLoop` |
| `core/scope` | The per-agent scoped-registration primitive | library, no key |
| `llm/llm` | Message and stream vocabulary plus the adapter seam | `ctx.llm` |

<br>

### Resources

<br>

- **[DeepSeek's harness docs](https://deepseek-harness.github.io/deepseek-harness/en/guide/quickstart)**

<br>

---

### Other Notable Projects

<br>

- 🦀 [sentrux (Rust)](https://github.com/sentrux/sentrux): Real-time architectural sensor that helps AI agents close the feedback loop, enabling recursive self-improvement of code quality.

- 🦀 [moltis (Rust)](https://github.com/moltis-org/moltis): A secure persistent personal agent server in Rust. One binary, sandboxed execution, multi-provider LLMs, voice, memory.

- 🦀 [zeroclaw (Rust)](https://github.com/zeroclaw-labs/zeroclaw): An agent runtime — a single Rust binary you configure and run. It talks to LLM providers, reaches the world through 30+ channels, and acts through tools (shell, browser, HTTP, hardware, custom MCP servers). 

- 🦀 [opencrabs (Rust)](http://github.com/opencrabs/opencrabs): All-in-one AI agent. Build mobile apps, frontend, backend, manages files, deep research, schedule tasks and events. Self-improving, self-healing, fully autonomous. TUI, CLI and Daemon. Zero Telemetry.

- 🦀 [openfangs (Rust)](https://github.com/RightNow-AI/openfang): Agent Operating System. Not a chatbot framework. Not a Python wrapper around an LLM. Not a "multi-agent orchestrator." A full operating system for autonomous agents.

- 🦀 [zeptoclaw (Rust)](http://github.com/qhkm/zeptoclaw): Fast, small, secure, local-first personal AI assistant infrastructure: one Rust binary for tools, memory, channels, providers, and sandboxed autonomy.

- 🦀 [thClaws (Rust)](https://github.com/thClaws/thClaws): AI agent harness in native Rust — GUI, CLI, headless, and webapp from one binary. Multi-provider, MCP, skills, plugins, agent teams.

- 🦀 [microclaw (Rust)](https://github.com/microclaw/microclaw):Self-hosted Rust agent platform with two product surfaces and an embeddable SDK. MicroClaw Server runs continuously for chat channels, Web, APIs, scheduling, and automation.

- 🐍 [Hugging Face's smolagents (Python)](https://github.com/huggingface/smolagents): A library that enables you to run powerful agents in a few lines of code. 

- 🐍 [cowagent (Python)](https://github.com/zhayujie/CowAgent): AI assistant that proactively plans tasks, controls your computer and external services, creates and runs Skills, builds a personal knowledge base and long-term memory, forms multi-agent teams, and grows alongside you through self-evolution — a reference implementation of Agent Harness engineering.

- 🐍 [strands (Python)](https://github.com/strands-agents/harness-sdk): SDK for building and running AI agents in Python and TypeScript. Choose Strands when you would otherwise write your own agent loop: it runs in your process with no hosted control plane, and it covers the jobs a hand-rolled loop grows into.

- 🐍 [raven (Python)](https://github.com/EverMind-AI/Raven): The harness of harnesses, built for recursive self-improvement (RSI). As a Host Agent, it brings built-in and third-party agents together to carry out complex tasks. Its modular architecture supports iterative improvement of Raven's own harness: proposing changes to how agents plan and act, evaluating those changes, and adopting improvements that pass validation.

- 🟦 [Google's gemini-cli (TypeScript)](https://github.com/google-gemini/gemini-cli): AI agent that brings the power of Gemini directly into your terminal. It provides lightweight access to Gemini, giving you the most direct path from your prompt to our model.

- 🟦 [opencode (TypeScript)](https://github.com/anomalyco/opencode): open-source AI coding agent (so you can **[work offline](https://latent.space/p/offline-coding)** with **[open-weights models](https://www.youtube.com/watch?v=79Pnm5hANsA)**). It’s available as a terminal-based interface, desktop app, or web app.

- 🟦 [Letta (TypeScript)](https://github.com/letta-ai/letta-code): Stateful agents that are like people, with memory, identity, and the ability to learn and adapt.

- 🟦 [Trellis (TypeScript)](https://github.com/mindfold-ai/Trellis): Trellis runs a 4-phase loop with auto-invoked skills and sub-agents: Plan, Implement, Verify, Finish.

<br>

---

# 6️⃣🐯 Appendix II: Open-Source Orchestration and Integration Layer

<br>

#### ✨ For completeness, I've compiled a list of some of the most popular mulfi-agentic frameworks (which sometimes also contain a harness), organized by programming language for easy reference. I'll continue adding relevant resources as I come across them. ✨

<br>

- 🦀 [NVIDIA's OpenShell (Rust)](https://github.com/NVIDIA/OpenShell): Safe, private runtime for fleets of autonomous AI agents. Agents are most useful when they can read files, install packages, call APIs, and use credentials. OpenShell gives them that capability without giving them unrestricted access to your data, secrets, or network. You declare what each agent can touch in a policy, and OpenShell enforces it.

- 🐍 [LangChain / LangGraph (Python, TypeScript)](https://github.com/langchain-ai/langchain): A framework for building agents and LLM-powered applications. It helps you chain together interoperable components and third-party integrations with simplify AI application development — all while future-proofing decisions as the underlying technology evolves. LangChain provides components, integrations, and abstractions for building LLM applications and agents. LangGraph is its complementary orchestration runtime for stateful, long-running agents, with cycles, persistence, durable execution, and human-in-the-loop workflows.

- 🐍 [LlamaIndex (Python, TypeScript)](https://github.com/run-llama/llama_index): A framework to build agentic applications; foregrounds data-centric retrieval, memory, and agent composition over user data.

- 🐍 [CrewAI (Python)](https://github.com/crewAIInc/crewAI): Framework with high-level abstractions and low-level APIs for building production-ready multi-agent workflows. It gives developers autonomous agent collaboration through Crews and precise, event-driven control through Flows. Introduces role-based multi-agent collaboration.

- 🐍 [AutoGPT (Python)](https://github.com/Significant-Gravitas/AutoGPT): A team of AI experts. Each Expert has a role you can shape with your instructions, context, skills, and connected apps. Demonstrated autonomous goal-directed behavior through iterative prompting and tool use.

- 🐍 [MetaGPT (Python)](https://github.com/FoundationAgents/MetaGPT): The Multi-Agent Framework: First AI Software Company, Towards Natural Language Programming. Proposes structured coordination through generated artifacts.

- 🐍 [AgentScope (Python)](https://github.com/agentscope-ai/agentscope): Production-ready, easy-to-use agent framework with essential abstractions that keep up with rising model capability. Approach leverages the models' reasoning and tool use abilities rather than constraining them with strict prompts and opinionated orchestrations. Emphasize agent-oriented programming for multi-agent applications.

- 🐍 [Hive (Python)](https://github.com/aden-hive/hive): One execution primitive: the agent loop. The queen is one, and every worker is a clone of it with its own task, a narrower set of tools and a strict budget. Orchestration is a tool call, not a compiled graph: `run_worker`, tracker, and `run_playbook`.

- 🐍 [Harmonist (Python)](https://github.com/GammaLabTechnologies/harmonist): Portable AI agent orchestration with mechanical protocol enforcement. 186 agents, zero runtime dependencies.

- 🐍 [Haystack (Python)](https://github.com/deepset-ai/haystack): AI orchestration framework for building context-engineered, production-ready LLM applications. Design modular pipelines and agent workflows with explicit control over retrieval, routing, memory, and generation. Built for scalable agents, RAG, multimodal applications, semantic search, and conversational systems.

- 🐍 [Dify (Python, TypeScript)](https://github.com/langgenius/dify): Build Agentic workflows, RAG pipelines, with rich AI model and tool support on one collaborative workspace. Deploy on cloud, VPC, or self-hosted, so teams move from prototype to production without rebuilding the stack.

- 🐍 [OpenAI Agents SDK (Python, TypeScript)](https://github.com/openai/openai-agents-python): A lightweight yet powerful framework for building multi-agent workflows. It is provider-agnostic, supporting the OpenAI Responses and Chat Completions APIs, as well as 100+ other LLMs.

- 🐍 [Google Agent Development Kit (Python, Java, TypeScript)](https://github.com/google/adk-python): A flexible and modular framework that applies software development principles to AI agent creation. It is designed to simplify building, deploying, and orchestrating agent workflows, from simple tasks to complex systems. While optimized for Gemini, ADK is model-agnostic, deployment-agnostic, and compatible with other frameworks.

- 🐍 [Microsoft Agent Framework (Python, C#)](https://github.com/microsoft/agent-framework): Multi-language framework for building production-grade AI agents and multi-agent workflows in .NET and Python.

- 🐍 [Microsoft AutoGen (Python, .NET)](https://github.com/microsoft/autogen): Framework for creating multi-agent AI applications that can act autonomously or work alongside humans.

- 🐍 [DSPy (Python)](https://github.com/stanfordnlp/dspy): The framework for programming—rather than prompting—language models. It allows you to iterate fast on building modular AI systems and offers algorithms for optimizing their prompts and weights, whether you're building simple classifiers, sophisticated RAG pipelines, or Agent loops.

- 🐍 [Pydantic AI (Python)](https://github.com/pydantic/pydantic-ai): Typed, extensible agent loop with every model a string swap away. The same agent runs everywhere you need it: behind a web frontend, in the terminal, on a voice call, on a durable background queue, in GitHub Actions, or as a plain object you call `run()` on.

- 🐍 [Agno (Python)](https://github.com/agno-agi/agno): Agno is a self-improving agent platform. Build agents for your product, your team, or your customers. Run them as durable services. Improve them with use.

- 🐍 [BeeAI Framework (Python, TypeScript)](https://github.com/i-am-bee/beeai-framework): Build production-ready multi-agent systems in Python or TypeScript.

- 🐍 [Temporal (Go, Java, TypeScript, Python, C#)](https://github.com/temporalio/temporal): A durable execution platform that enables developers to build scalable applications without sacrificing productivity or reliability. The Temporal server executes units of application logic called Workflows in a resilient manner that automatically handles intermittent failures, and retries failed operations.

- 🐍 [CAMEL-AI (Python)](https://github.com/camel-ai/camel): Community dedicated to finding the scaling laws of agents. We believe that studying these agents on a large scale offers valuable insights into their behaviors, capabilities, and potential risks. To facilitate research in this field, we implement and support various types of agents, tasks, prompts, models, and simulated environments.

- 🐍 [Llama Stack (Python)](https://github.com/llamastack/llama-stack): Agentic API server for building AI applications. OpenAI-compatible. Any model, any infrastructure.

- 🐍 [A2A (Python)](https://github.com/a2aproject/A2A): open protocol enabling communication and interoperability between opaque agentic applications.

- 🟦 [OpenHands (TypeScript)](https://github.com/OpenHands/openhands): The self-hosted developer control center for coding agents and automations. Emphasizes repository integration and execution support for software-development agents.

- 🟦 [n8n (TypeScript)](https://github.com/n8n-io/n8n): Fair-code workflow automation platform with native AI capabilities. Combine visual building with custom code, self-host or cloud, 400+ integrations.

- 🟦 [Vercel's AI SDK (TypeScript)](https://github.com/vercel/ai): The AI SDK is a provider-agnostic TypeScript toolkit designed to help you build AI-powered applications and agents using popular UI frameworks like Next.js, React, Svelte, Vue, Angular, and runtimes like Node.js.

- 🟦 [Vercel's Eve (TypeScript)](https://github.com/vercel/eve): The Open Framework for Building Agents.

- 🟦 [Mastra (TypeScript)](https://github.com/mastra-ai/mastra): Framework for building AI-powered applications and agents with a modern TypeScript stack.

- 🟦 [open-connector (TypeScript)](https://github.com/oomol-lab/open-connector): Auth gateway connecting 1500+ SaaS providers to AI agents through SDK, CLI, MCP, HTTP, and OpenAPI.

- 🟦 [open-multi-agent (TypeScript)](https://github.com/open-multi-agent/open-multi-agent): Self-hosted agent runtime with durable approvals and verifiable run records. Own it, approve it, audit it.

- ♦️ [Shopify's Roast (Ruby)](https://github.com/Shopify/roast): Structured AI workflows made easy.

- 🦫 [Docker's docker-agent (Go)](https://github.com/docker/docker-agent): AI Agent Builder and Runtime by Docker Engineering. Explores container-based execution as an explicit basis for operational reliability. 

- ⚙️ [Microsoft's Semantic Kernel (C#)](https://github.com/microsoft/semantic-kernel): Model-agnostic SDK that empowers developers to build, orchestrate, and deploy AI agents and multi-agent systems.

<br>

---

<br>

### That's it for today. I hope you had as much fun reading as I had conducting this research. Thank you for reading, and until next time, my friends!

### ⬛️

