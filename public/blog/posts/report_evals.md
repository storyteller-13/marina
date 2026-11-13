---
title: 🏄‍♀️ REPORT → A Ride Through AI Evals & Benchmarks
subtitle: Beginner to Advanced AI Scientists and Engineers | Today's word: Focus · Fokus · 集中 (しゅうちゅう) · מיקוד
date: 2026; 11; 14
---

> [🎧](https://www.youtube.com/watch?v=efLx7KeGnWA) *"The successful warrior is the average man, with laser-like focus."* — Bruce Lee

<br>

![](/blog/assets/raphael.webp)

<br>

#### *Hello there, my anon friend!*

#### *This is the final installment of our Technical Debt Festival (check out [Part I here](https://marina.nullstar.fun/blog/report_harness.html) and [Part II here](https://marina.nullstar.fun/blog/report_memory.html)). As we continue our research for [NULLSTAR](https://www.nullstar.games/)'s [PleiadesOS: ALCYONE](https://marina.nullstar.fun/blog/idea_nullstar.html) module, we'll take a deep dive into the current landscape of agentic evaluations and benchmarks. We'll explore a selection of relevant articles while examining some of the most prominent projects in the field.*

<br>

![](/blog/assets/report_evals_3.png)

<br>

#### *This will also be my final post of 2026 on this blog. As [I close a personal chapter in my life](https://matrix.nullstar.fun/?note=story-november-2026) and shift my focus entirely toward building [NULLSTAR](https://www.nullstar.games/), I'll be taking a short break from this format of outreach and external interactions to dedicate more time to the work ahead. It's been a remarkable year, and I'm deeply grateful for the people, conversations, and opportunities along the way. I'm looking forward to an even more productive and exciting 2027.*

<br>

As I read through the material, below are my highlights — with a moderate attempt at coherence — for my personal inventory (and perhaps as a way to connect with other friendly AI scientists and builders out there who love talking about the same things). As always, please remember our rules:

**🤖 If these notes look cool to you, it's your ✦moral duty✦ to read the original resources.**
**🤖 Just another blog, but not your usual blog: they're living notes that I change as I fancy.**

<br>

---

# 0️⃣🦋 Agentic Evals and Benchmarks TL;DR

<br>

#### ✨ *Traditional model benchmarks measure isolated capabilities, whereas agentic evaluations must assess systems operating over multiple turns/steps, managing context, and pursuing objectives. The evaluation of the model is wrapped in a harness with tools, memory, skills, and a sandbox, working through long tasks that end in a verifier. The common measurements are: task success, correctness, tool-use accuracy, reliability, efficiency, robustness, safety, and cost.* ✨

<br>

---

## The Pieces Around a Benchmark

<br>

> A benchmark is the task set and its expected outcomes. A runner or task format packages tasks and executes trials. An evaluation framework helps define, run, and score experiments. Observability records what happened during a run so failures can be diagnosed. Training data is used to change a system; it is not itself evidence that the changed system works.

<br>

```text
benchmark tasks + environment
             │
             ▼
runner / harness ── configures model, tools, memory, budgets
             │
             ▼
          agent trial ── traces and artifacts ──▶ observability
             │
             ▼
       verifier / judge ──▶ scores and failure analysis
                                  │
                                  └──▶ new regression tasks
```

<br>

---

## Which Eval Answers Which Question?

<br>

| Evaluation family | Examples in this guide | What a result can tell you | A useful caution |
|---|---|---|---|
| Software engineering and terminal work | Terminal-Bench 2 and Pro, SWE-bench and SWE-bench Pro, DeepSWE, SWE-Atlas, CompileBench | How well an agent handles real repositories and terminal tasks; most are graded with tests | Results depend on repository snapshot, tools, budget, and test quality |
| Memory and personalization | LongMemEval, LoCoMo, BEAM, ConvoMem, BABILong | Whether a system recalls and applies information across long conversations; newer evaluations probe personalization, over-personalization, and sycophancy | Recall alone does not measure whether memory is relevant, current, or appropriately used |
| Tool use and APIs | BFCL, Toolathlon, MCP-Atlas | Whether an agent selects and uses tools to complete tasks | A valid call may still be a poor or unsafe action; inspect end-task outcomes too |
| Web and computer interaction | WebArena, OSWorld-Verified, AndroidWorld | Whether an agent can operate interfaces through a sequence of actions | Environment state, visual variation, and reset behavior can change difficulty |
| Safety and robustness | Agent-SafetyBench and task-specific adversarial cases | How the system behaves under risky, ambiguous, or adversarial conditions | A benchmark pass does not establish safety outside its tested threat model |
| Task formats, eval frameworks, and observability | Harbor, SWE-gen; Inspect AI, DeepEval, Promptfoo, LM Evaluation Harness; Langfuse, Phoenix, Opik, OpenTelemetry GenAI conventions | Harbor packages tasks for runs; SWE-gen turns merged pull requests into tasks usable for evaluation and reinforcement learning. Frameworks run and score experiments; observability captures traces. Production failures can become tasks for the next evaluation cycle | These tools serve different roles. Reusing training tasks for evaluation can overstate progress; trace portability depends on what each system records |

<br>

---

## Trusting Scores

<br>

> Agent scores are estimates from a particular set of tasks, environment, harness, and run budget. A leaderboard number is useful evidence, not a universal measure of agent quality. 

<br>

- Before comparing or relying on a result, check:

```
1. Task coverage: Do tasks resemble the real work and its difficulty?
2. Verifier quality: Do tests check requested behavior, including regressions and edge cases?
3. Run-to-run variation: Different paths on repeated runs. Report the number of attempts and a confidence interval.
4. Harness disclosure: The model/version, prompt, tools, context and memory setup,, concurrency, retries, time or token limits.
5. Useful trade-offs: Pair task success with latency, token or monetary cost, tool errors, and safety failures.
6. Reproducibility: Publish run configuration and scoring code, and retain traces and artifacts for failures.
```

<br>

- For LLM judges, define a rubric, test agreement against human ratings, and use deterministic checks for facts that can be verified directly. 
- For high-impact decisions, report disagreements and failure examples alongside the aggregate score.

<br>

### A small example

<br>

Suppose two agent versions each attempt the same 40 tasks five times under the same model, tools, and budget:

| Measure | Agent A | Agent B |
|---|---:|---:|
| Successful runs | 156 / 200 (78%) | 164 / 200 (82%) |
| Median cost per run | $0.42 | $0.71 |
| Median completion time | 4.8 min | 6.1 min |
| Safety failures | 0 | 2 |

<br>

- The four-point success gap alone is not enough to call B better. 
- Show uncertainty for the difference, account for the fact that runs share the same tasks, and inspect whether B's extra successes justify its higher cost and safety failures. 
- A useful report would also break results down by task category and include representative failure traces. 
- If the uncertainty interval includes no meaningful difference, say the results are inconclusive rather than ranking the systems by the point estimates.

<br>

---

## A Practical Eval Loop

<br>

1. **Define the job.** Write down the user goal, acceptable completion criteria, and unacceptable outcomes.
2. **Build a representative task set.** Start with real, permissioned examples, include common cases and difficult edge cases, and keep a held-out set for final comparisons.
3. **Fix the conditions.** Pin the model, prompts, harness, tools, environment, and budgets. Log them with every run.
4. **Run repeatedly.** Use enough independent trials to see variability. Capture success, cost, latency, and safety signals rather than one headline score.
5. **Inspect failures.** Review traces and artifacts to distinguish model errors from bad instructions, broken tools, weak tests, and environment problems.
6. **Turn recurring failures into regression tasks.** Re-run those tasks after every meaningful change, then periodically refresh the set so it still represents current work.

<br>

---

# 1️⃣🦋 Notable Projects

<br>

---

## Coordinators and Standards

<br>


### [Harbor](https://www.harborframework.com/)

<br>

> Harbor is a framework from the creators of Terminal-Bench for evaluating and optimizing agents and language models. You can use it to evaluate agents such as Claude Code, OpenHands, and Codex CLI, build and share your own benchmarks and environments, run experiments in thousands of environments in parallel through sandbox providers, and generate rollouts for RL optimization.

<br>

![](/blog/assets/report_harn_19.webp)

<br>

- A Harbor task is an instruction, environment, and test script. The task is defined as a directory of files with the following structure:

```
my-task/
├── instruction.md
├── task.toml
├── environment/
│   ├── Dockerfile  # or some other spec
│   └── ...
├── solution/
│   ├── solve.sh
│   └── ...
└── tests/
    ├── test.sh
    └── ...
```

<br>

- A Harbor trial is an agent's attempt at completing a task. The diagram below shows how the components of a task are used in a trial.

- A task defines the logic to verify the completion of the instruction and produce a reward in the tests/test.sh script. The script must produce a numerical reward in the environment at /logs/verifier/reward.txt or /logs/verifier/reward.json (for multi-dimensional or labeled rewards).

<br>

---

## Coding Benchmarks

<br>

---

### [terminal-bench-1 (legacy)](https://github.com/harbor-framework/terminal-bench-1)

<br>

> Terminal-Bench 1 is the original benchmark for LLMs on complicated tasks in the terminal, from compiling code and training models to setting up servers. Its authors now point users to Harbor, the framework that runs Terminal-Bench 2.0.

<br>

```text
Terminal-Bench 1 (legacy repo)
  task prompt ──▶ agent in a terminal ──▶ test checks ──▶ pass / fail

  current runner: Harbor, which runs Terminal-Bench 2.0
                  (use this repo only for the original tasks)
```

<br>

---

### [terminal-bench-2](https://github.com/harbor-framework/terminal-bench-2)

<br>

> Terminal-Bench is a popular benchmark for measuring how well agents and language models do valuable work in containerized environments. Its tasks include assembling proteins for synthesis, debugging async code, and resolving security vulnerabilities, so it tests end-to-end work rather than isolated questions.

<br>

```text
one task = one container
┌──────────────────────────────────────────────────┐
│ instruction.md: "debug this async code ..."       │
│ environment/  : Docker image with the repo        │
└──────────────────────────────────────────────────┘
        │ agent works in a shell (run, edit, install)
        ▼
tests/test.sh ──▶ /logs/verifier/reward.txt ──▶ score
```

<br>

---

### [terminal-bench-pro](https://github.com/alibaba/terminal-bench-pro)

<br>

> Terminal-Bench Pro is a systematic extension of the original Terminal-Bench, designed to address key limitations of existing terminal-agent benchmarks. It has 400 tasks (200 public and 200 private) across eight domains, including data processing, games, debugging, system administration, scientific computing, software engineering, ML, and security.

<br>

```text
400 tasks = 200 public + 200 private
                         ┌─ data processing
                         ├─ games
  terminal task ─────────┼─ debugging
  (one of 8 domains)     ├─ system administration
                         ├─ scientific computing
                         ├─ software engineering
                         ├─ ML
                         └─ security
```

<br>

---

### [otel-bench](https://github.com/QuesmaOrg/otel-bench)

<br>

> OTel-Bench is an open-source benchmark for evaluating AI models on OpenTelemetry instrumentation tasks, where models must instrument applications across multiple programming languages. The repository also links a results page and a blog post about the benchmark.

<br>

```python
# what a correct answer looks like: the model adds spans like these
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

def checkout(cart):
    with tracer.start_as_current_span("checkout") as span:
        span.set_attribute("cart.items", len(cart))
        return process_payment(cart)  # the benchmark checks emitted spans
```

<br>

---

### [CompileBench](https://github.com/QuesmaOrg/CompileBench)

<br>

> CompileBench measures how well LLMs handle real open-source projects that suffer from dependency hell, legacy toolchains, and complex build systems. It focuses on the messy build-and-compile work that contest-style and vibe-coding benchmarks usually skip.

<br>

```text
old open-source project (deps, legacy toolchain, custom build)
   │ agent: read README ─▶ install deps ─▶ pick compiler ─▶ fix Makefile
   ▼
build ──▶ binary runs? ──▶ score
   ▲                    │
   └── missing lib / wrong GCC / broken CMake: loop until it builds
```

<br>

---

### [RuneBench](https://github.com/MaxBittker/RuneBench)

<br>

> RuneBench evaluates AI coding agents on RuneScape gameplay through rs-sdk. Agents play by writing and executing TypeScript snippets against an emulated game server running at 8x speed, with a folder of wiki-extracted markdown for strategy, and they are scored on their peak XP rate.

<br>

```text
agent (LLM) ──writes TypeScript snippet──▶ rs-sdk ──▶ game server (8x speed)
     ▲                                              │
     └──── game state, XP, wiki notes ◀─────────────┘
score = peak XP rate reached
```

<br>

---

### [legacy-bench](https://github.com/Factory-AI/legacy-bench)

<br>

> Legacy-Bench evaluates AI coding agents on legacy software engineering tasks in COBOL, Fortran, and Java 7, the languages behind systems that handle financial settlements, telephone routing, and insurance claims. It measures how well frontier agents maintain, debug, and modernize that code, which modern Python and JavaScript benchmarks do not cover.

<br>

```cobol
       01 WS-TOTAL   PIC 9(7)V99 VALUE ZERO.
       ADD WS-AMOUNT TO WS-TOTAL.
*> Agents must read code like this (COBOL, Fortran, Java 7), then
*> maintain, debug, or modernize it and pass the hidden tests.
```

<br>

---

### [SWE-atlas](https://github.com/scaleapi/SWE-Atlas)

<br>

> SWE Atlas is a benchmark for coding agents across professional software engineering work, beyond simple issue resolution. It covers Codebase QnA, Test Writing, and Refactoring, and this repository provides the tasks and run setup, with results published on the SWE Atlas leaderboard.

<br>

```text
repo snapshot
   ├── Codebase QnA ──▶ answer a question about the code ──▶ graded answer
   ├── Test writing ──▶ new tests run against hidden checks
   └── Refactoring  ──▶ behavior must stay the same ──▶ tests still pass
```

<br>

---

### [SWE-bench Pro](https://github.com/scaleapi/SWE-bench_Pro-os)

<br>

> SWE-bench Pro asks whether AI agents can solve long-horizon software engineering tasks. The repository contains the code and data for the paper, and a public leaderboard hosted by Scale AI tracks results.

<br>

```text
issue + repo @ base commit
        │
        ▼
agent writes a patch
        │
        ▼
apply patch ──▶ run FAIL_TO_PASS tests (must now pass)
                    └──▶ run PASS_TO_PASS tests (must still pass)
                             │
                             ▼
                        resolved? yes / no
```

<br>

---

### [DeepSWE](https://deepswe.datacurve.ai/blog/deepswe)

<br>

> DeepSWE is a benchmark for frontier coding agents on original, long-horizon software engineering tasks drawn from active open-source repositories. The tasks are written from scratch to avoid contamination, span 113 tasks across 91 repos in 5 languages, and use hand-written verifiers that test behavior rather than implementation details.

<br>

![](/blog/assets/report_harn_19.webp)

<br>

Long-horizon software engineering benchmark with:

1. Contamination free: tasks are written from scratch, not adapted from existing commits or PRs, so no model has seen the solution during pretraining.
2. High diversity: 113 tasks span a broad pool of 91 repos in 5 programming languages.
3. Real-world complexity: prompts are half the length of SWE-bench Pro's, yet solutions require 5.5x more code and ~2x more output tokens.
4. Reliable verification: verifiers are hand-written to test software behavior, rather than implementation details.

<br>

It uses [Harbor](https://www.harborframework.com/) task format:

```
task.toml         Metadata (repo, base commit, language, image, limits)
instruction.md    The prompt the agent sees
environment/      Dockerfile reproducing the prebuilt image
tests/            Verifier entry point, held-out tests, and grader config
solution/         Reference solution (held out from the agent)
```

<br>

The verifier produces the following outputs for each run:

```
verifier/
    reward.json      Structured scores (binary reward + pass fractions)
    ctrf.json        Machine-readable test report with failure messages
    test-stdout.txt  Raw suite output and a list of failure reasons
    run.log          Raw stdout/stderr captured during the run
    reports/         Framework-native report/log files from the grader
```

<br>

---

### [SWE-bench](https://www.swebench.com/)

<br>

> SWE-bench evaluates language models on resolving real GitHub issues from popular Python repositories, where the model must produce a patch that passes the project's tests. It has become one of the standard benchmarks for coding agents and publishes a leaderboard on its website.

<br>

```diff
# a typical model answer: a patch that makes the failing test pass
--- a/pkg/parser.py
+++ b/pkg/parser.py
@@ -41,7 +41,7 @@ def parse_value(value):
-    if value == None:
+    if value is None:
         return default
```

<br>

---

### [CCA-SWE-bench](https://github.com/facebookresearch/cca-swebench)

<br>

> A minimal harness from Meta Research that runs Confucius Code Agent (CCA) on SWE-bench Pro inside a Docker container. The agent receives the task, reasons about the fix, and executes actions such as shell commands and file reads and writes directly.

<br>

```text
docker container
┌──────────────────────────────────────────────┐
│ CCA agent                                    │
│   ├─ reasons about the fix                   │
│   ├─ runs shell commands ──▶ repo            │
│   └─ reads / writes files ──▶ repo           │
└──────────────────────────────────────────────┘
        │ final diff
        ▼
  SWE-bench Pro grader
```

<br>

---

### [SWE-bench Verified](https://www.swebench.com/)

<br>

> A human-validated subset of SWE-bench, with 500 real GitHub issues that agents must resolve by producing patches that pass the project's tests. It is the version most often reported for coding agents, and results are tracked on the SWE-bench leaderboard.

<br>

```text
500 human-validated issues (a subset of SWE-bench)
   issue ──▶ agent ──▶ patch ──▶ tests
                                  │
   resolved rate = passed / 500 ◀─┘
```

<br>

---

## Memory Benchmarks

<br>

### [LongMemEval](https://github.com/xiaowu0162/LongMemEval)

<br>

> LongMemEval is a comprehensive, challenging, and scalable benchmark for testing the long-term memory of chat assistants. It was introduced by Di Wu and colleagues and tests recall and reasoning across long, multi-session conversations.

<br>

```text
chat history:  session 1 ─ session 2 ─ ... ─ session N   (long, multi-session)
                              │
question: "What did I say about my trip in March?"   (illustrative)
                              │
memory system or long context ──▶ answer ──▶ judged against the gold answer
```

<br>

---

### [LoCoMo](https://github.com/snap-research/locomo)

<br>

> LoCoMo comes from the ACL 2024 paper "Evaluating Very Long-Term Conversational Memory of LLM Agents" and is a benchmark of very long conversations. It has ten conversations, each annotated for question answering and event summarization, and its dialogs can also support multimodal dialog generation.

<br>

```text
very long conversation (many sessions, months of dialog)
   │
   ├──▶ QA pairs ──▶ agent answers ──▶ score
   └──▶ event summaries ──▶ agent summarizes ──▶ score
```

<br>

---

### [ConvoMem](https://github.com/SalesforceAIResearch/ConvoMem)

<br>

> ConvoMem is a benchmark for conversational memory in large language models, with 75,336 question-answer pairs across six evidence categories. It tests how well assistants remember and use information from previous conversations.

<br>

```text
past conversations ──▶ memory store
new question ──▶ retrieve evidence from memory ──▶ answer
75,336 QA pairs, grouped into six evidence categories
```

<br>

---

### [BEAM](https://github.com/mohammadtavakoli78/BEAM)

<br>

> BEAM, from the paper "Beyond a Million Tokens: Benchmarking and Enhancing Long-Term Memory in LLMs", benchmarks and tries to improve long-term memory in language models. The repository contains the code and data for the paper.

<br>

```text
long dialogue (1M+ tokens)
   ├── baseline: put everything in the context window
   └── memory method: store, index, retrieve only what matters
                       │
                       ▼
                 questions ──▶ long-term memory score
```

<br>

---

### [BABILong](https://github.com/booydar/babilong)

<br>

> BABILong is a long-context needle-in-a-haystack benchmark for LLMs, where the relevant facts are hidden inside long distractor text. Its evaluation sets cover many context lengths, from short texts up to 10M tokens, with samples for each task at each length.

<br>

```text
[ ...distractor...
  FACT: "Maria keeps the keys in the blue box"
  ...distractor... ]
                              │
question: "Where are the keys?" ──▶ model answer ──▶ exact match check
context lengths: from short texts up to 10M tokens
```

<br>

---

### [SQuAD](https://github.com/rajpurkar/SQuAD-explorer)

<br>

> SQuAD, the Stanford Question Answering Dataset, is a large reading comprehension dataset. This repository lets people explore the dataset, visualize model predictions, and generate predictions for their own data through the workflow used by the SQuAD leaderboard.

<br>

```text
passage: "... the tower was completed in 1889 ..."
question: "When was the tower completed?"
            │
model ──▶ answer span "1889" ──▶ compare with gold span ──▶ EM / F1
```

<br>

---

### [Agent Memory Benchmark](https://agentmemorybenchmark.ai/)

<br>

> The Agent Memory Benchmark (AMB) is an open, reproducible leaderboard for evaluating AI agent memory and retrieval systems on real-world long-context tasks. It is meant to show how memory systems compare on the same tasks, with the scoring and results visible.

<br>

```text
real-world long-context tasks (same tasks for every system)
   │
   ▼
memory system under test ──▶ answers ──▶ scoring ──▶ public leaderboard
```

<br>

---

### [Mem0 Memory Benchmarks](https://github.com/mem0ai/memory-benchmarks)

<br>

> An open-source evaluation suite for running benchmarks on memory-augmented LLM systems. It supports the Mem0 cloud and open-source versions and measures memory recall, extraction quality, and retrieval accuracy, using datasets such as LoCoMo, LongMemEval, and BEAM.

<br>

```python
# the loop these benchmarks run against a memory layer (Mem0 OSS API)
from mem0 import Memory

memory = Memory()
messages = [{"role": "user", "content": "I moved to Lisbon last year"}]
memory.add(messages, user_id="user-1")
results = memory.search(query="Where does the user live?",
                        filters={"user_id": "user-1"}, top_k=3)
# the suite then scores recall, extraction quality, and retrieval accuracy
```

<br>

---

### [Honcho Memory Benchmarks](https://honcho.dev/evals/)

<br>

> Honcho's evals page reports long-context memory results on LongMem S, LoCoMo, and BEAM 100K. These numbers come from the company itself, so compare them against the original benchmarks before drawing conclusions.

<br>

```text
benchmark       system           result
LongMem S  ──┐
LoCoMo     ──┼──▶ Honcho (self-reported) ──▶ compare with originals
BEAM 100K  ──┘
```

<br>

---

### [FrontierMemory](https://www.frontiermemory.com/)

<br>

> FrontierMemory is a benchmark for continual learning through memory, measuring how well systems keep learning as they accumulate memories over time.

<br>

```text
interaction 1 ──▶ memory ──▶ interaction 2 ──▶ ... ──▶ interaction N
                    ▲                                    │
                    └──── does accuracy improve as memory grows? ◀┘
```

<br>

---

### [Cognee Knowledge Graph Memory Benchmarks](https://www.cognee.ai/knowledge-graph-memory-benchmarks)

<br>

> Two benchmark exercises from Cognee, run on HotPotQA, TwoWikiMultiHop, and MuSiQue, plus a head-to-head comparison with Mem0, Graphiti, and LightRAG. The page publishes the numbers, methodology, caveats, and reproduction code.

<br>

```text
HotPotQA / TwoWikiMultiHop / MuSiQue documents
   │ ingest ──▶ knowledge graph (entities + relations)
   ▼
multi-hop question ──▶ graph traversal across hops ──▶ answer
compared head-to-head with Mem0, Graphiti, and LightRAG
```

<br>

---

### [Vectorize Agent Memory Benchmark](https://github.com/vectorize-io/agent-memory-benchmark)

<br>

> Vectorize's agent memory benchmark was built because LoCoMo and LongMemEval were designed for 32k-token context windows, and modern models can often score well by putting everything in context. The project publishes its datasets, prompts, scoring logic, and results in the open.

<br>

```text
LoCoMo / LongMemEval  (designed for 32k-token windows)
   │
   ▼
modern model: put the whole history in context ──▶ high score (a shortcut)
   │
   ▼
new benchmark: publishes datasets, prompts, and scoring, aiming to test memory
```

<br>

---

### [Zep Evaluation Harness](https://github.com/getzep/zep/tree/main/zep-eval-harness)

<br>

> The evaluation harness in the Zep repository, used to test Zep's memory system. Zep describes itself as a context layer for agents, and this harness is one of the tools for checking how well that memory works.

<br>

```text
conversation logs ──▶ Zep (context layer: facts and graph)
eval questions ──▶ Zep retrieval ──▶ LLM answer ──▶ grader ──▶ score
```

<br>

---

### [Letta Evals](https://www.letta.com/blog/letta-evals/)

<br>

> Letta Evals is an open-source evaluation framework for systematically testing stateful agents, introduced by the Letta team. It is aimed at agents that learn and keep state across interactions, which static benchmarks do not capture well.

<br>

```text
stateful agent (keeps memory across turns)
   │ turn 1 ──▶ turn 2 ──▶ ... ──▶ turn N   (state changes along the way)
   ▼
check final state and outputs ──▶ graded result
```

<br>

---

### [MemoryBench](https://github.com/supermemoryai/memorybench)

<br>

> A pluggable benchmarking framework for memory and context systems. You can mix any provider with any benchmark, bring your own datasets, resume runs from any pipeline stage, compare providers side by side, and inspect results in a web UI.

<br>

```text
providers (any)  x  benchmarks (any)
   │ ingest ──▶ index ──▶ search ──▶ answer ──▶ evaluate
   │          (resume a run from any stage)
   ▼
side-by-side comparison table + web UI
```

<br>

---

### [CL-Bench 1.0](https://continual-learning-bench.com/news/cl-bench-1-0/)

<br>

> Continual Learning Bench 1.0 measures an agent's ability to use memory to tackle long-horizon tasks. It checks whether systems adapt and improve from feedback across sequences of task instances.

<br>

```text
task 1 ──▶ agent + memory ──▶ feedback ──▶ memory update
task 2 ──▶ agent + memory ──▶ feedback ──▶ memory update
  ...
task N ──▶ does performance improve across the sequence?
```

<br>

---

## Other Benchmarks

<br>

---

### [skillsbench](https://github.com/benchflow-ai/skillsbench)

<br>

> SkillsBench is the first benchmark for evaluating how well AI agents use skills, which are modular folders of instructions, scripts, and resources. It measures both skill effectiveness and agent behavior through gym-style benchmarking.

<br>

```text
skill/
├── SKILL.md     instructions
├── scripts/     helper code
└── resources/   templates and data
   │ agent loads the skill for a task
   ▼
gym-style run ──▶ score with the skill vs. without it
```

<br>

---

### [AgentBench](https://github.com/THUDM/AgentBench)

<br>

> AgentBench is a comprehensive benchmark for evaluating LLMs as agents, presented at ICLR 2024. The project has since added AgentBench FC, a function-calling version built on AgentRL.

<br>

```text
          ┌──────────────────────────────────────┐
  LLM ◀──▶│ environments: OS · DB · knowledge    │
  agent   │ graph · web browsing · games · ...   │
          └──────────────────────────────────────┘
   observation ──▶ action ──▶ observation ... ──▶ task success rate
```

<br>

---

### [CommerceAgentBench](https://github.com/Accio-org/CommerceAgentBench)

<br>

> CommerceAgentBench, from the Accio team at Alibaba International, benchmarks long-horizon agents in high-fidelity, stateful, and reproducible replicas of real online services. The project includes a live leaderboard, a mock showcase, and reproducibility instructions.

<br>

```text
agent ──▶ stateful replica of an online store (catalog, cart, orders)
   │ actions: search, add to cart, check out
   ▼
final state checked against the goal ──▶ reproducible score
```

<br>

---

### [Claw-Eval](https://github.com/claw-eval/claw-eval)

<br>

> Claw-Eval is an evaluation harness for LLMs as agents, aimed at trustworthy evaluation of autonomous agents. It has 300 human-verified tasks, 2,159 rubrics, and nine categories covering completion, safety, and robustness.

<br>

```text
300 human-verified tasks ──▶ agent run ──▶ trace
                                  │
                       rubric checks (2,159 rubrics)
                       ├─ completion
                       ├─ safety
                       └─ robustness
```

<br>

---

### [Harvey LAB](https://github.com/harveyai/harvey-labs)

<br>

> Harvey LAB, the Legal Agent Benchmark, is an open-source benchmark for evaluating agents on real legal work in realistic environments. It is designed to measure and improve how LLM agents perform legal tasks.

<br>

```text
legal task + workspace (documents, matter files)
   │ agent drafts, reviews, or analyzes
   ▼
checked against task rubric ──▶ LAB score
```

<br>

---

### [APEX](https://www.mercor.com/apex/)

<br>

> Mercor's APEX benchmarks and leaderboards measure AI productivity across software engineering, law, consulting, medicine, and more. The site presents results for frontier models in these professional domains.

<br>

```text
professional tasks: software engineering · law · consulting · medicine ...
   │ frontier models attempt each task
   ▼
graded per domain ──▶ leaderboard
```

<br>

---

### [Olam Labs — Multi-Agent Mindustry](https://github.com/olamlabs/multi-agent-mindustry)

<br>

> PvP and cooperative PvE benchmarks built on Mindustry and Harbor Multi-Agent. In the PvP series, teams compete over consecutive games with persistent agent sessions, and in endless survival, one team cooperates to defend its core against waves of enemies.

<br>

```text
PvP:  team A ◀──▶ Mindustry map ◀──▶ team B   (consecutive games)
PvE:  team agents defend the core against waves of enemies
built on Harbor Multi-Agent
```

<br>

---

### [MCP-Atlas](https://github.com/scaleapi/mcp-atlas)

<br>

> Scale AI's benchmark for tool-use competency with real Model Context Protocol servers. It has 1,000 tasks across 36 servers and 220 tools, and prompts avoid naming tools, so agents must choose the right tools and chain 3 to 6 calls across servers while ignoring plausible distractors.

<br>

```text
user prompt (tool names NOT given)
   │
   ▼
agent picks from 220 tools across 36 MCP servers
   │ chains 3-6 calls, while distractor tools are present
   ▼
final answer checked against the task
```

<br>

---

### [BFCL v4](https://gorilla.cs.berkeley.edu/leaderboard.html)

<br>

> The Berkeley Function-Calling Leaderboard from the Gorilla project, which evaluates how well LLMs select functions, format arguments against schemas, and chain calls. Version 4 is the current release of the leaderboard.

<br>

```json
// function schema given to the model
{"name": "get_weather",
 "parameters": {"city": "string", "unit": "celsius | fahrenheit"}}

// model output, compared against the gold call
get_weather(city="Lisbon", unit="celsius")
```

<br>

---

### [Toolathlon](https://github.com/hkust-nlp/Toolathlon)

<br>

> The Tool Decathlon, presented at ICLR 2026, benchmarks language agents on diverse, realistic, and long-horizon task execution with many tools, testing whether agents can plan and carry out multi-step work across them.

<br>

```text
long multi-step task across many apps
   │ agent plans ──▶ calls tools (mail, sheets, calendar, files, ...)
   ▼
final environment state verified ──▶ success
```

<br>

---

### [OSWorld-Verified](https://github.com/xlang-ai/OSWorld)

<br>

> OSWorld is a NeurIPS 2024 benchmark for multimodal agents on open-ended tasks in real computer environments. OSWorld-Verified is its verified release, where agents click, type, and navigate live desktop applications to finish tasks.

<br>

```text
desktop screenshot ──▶ VLM agent ──▶ action (click x,y · type · key)
      ▲                                       │
      └──── new screen ◀── VM desktop ◀───────┘
task done? ──▶ execution-based check of app / file state
```

<br>

---

### [WebArena](https://github.com/web-arena-x/webarena)

<br>

> The code repository for WebArena, a realistic web environment for building and evaluating autonomous agents. Agents complete tasks in websites such as shopping, forums, and code hosting by reading pages and acting through the browser.

<br>

```text
goal: "find X on the shop and add it to the cart"
browser (page DOM / screenshot)
   │ click · type · scroll · navigate
   ▼
sites: shopping · forum · code hosting · wiki
   ▼
functional check of the final page or site state
```

<br>

---

### [AndroidWorld](https://github.com/google-research/android_world)

<br>

> An environment and benchmark for autonomous agents on Android. Agents must tap, type, and navigate real apps on a live mobile interface to complete tasks.

<br>

```text
task: "set an alarm for 7am in Clock"
   │ agent sees the screen (UI tree or pixels)
   ▼
tap · type · swipe · back ──▶ live Android app ──▶ state check
```

<br>

---

### [τ²-bench](https://github.com/sierra-research/tau2-bench)

<br>

> The τ-bench family from Sierra for tool-agent-user interaction. Agents talk to simulated users, keep state across turns, and follow strict business policies in domains such as airline, retail, and telecom, with τ²-bench extending the original.

<br>

```text
agent ◀──── messages ────▶ simulated user (LLM)
  │ tool calls
  ▼
domain (airline / retail / telecom): database + policy rules
  │
  ▼
final database state + tool trace ──▶ pass / fail per trial
```

<br>

---

### [BrowseComp](https://github.com/openai/simple-evals)

<br>

> A benchmark of 1,266 questions that require persistently browsing the internet for hard-to-find, entangled information. Answers are short and easy to verify, and in the original paper accuracy ranged from 0.6% for GPT-4o to 51.5% for Deep Research.

<br>

```text
question: obscure, multi-constraint clue
   │ agent browses: search ──▶ open ──▶ read (many steps)
   ▼
short answer ──▶ compared with the reference (easy to verify)
```

<br>

---

### [Agent-SafetyBench](https://github.com/thu-coai/Agent-SafetyBench)

<br>

> A benchmark for evaluating the safety of LLM agents, with 349 interaction environments and 2,000 test cases across 8 risk categories and 10 failure modes. When 16 popular agents were tested, none scored above 60% on safety.

<br>

```text
349 environments + 2,000 test cases
   agent ──▶ actions on simulated tools
   ▼
risk category (8) x failure mode (10) ──▶ safe / unsafe
```

<br>

---

### [AgentX](https://inferencex.semianalysis.com/blog/agentic-benchmark-agent-benchmark-guide)

<br>

> The AgentX benchmark from SemiAnalysis's InferenceX tests how inference systems serve long-context, multi-turn coding-agent sessions. It replays recorded agentic-coding traces, reproducing real prompt sizes, KV-cache prefix sharing, subagent fan-out, and timing, and its median request has 142,016 input tokens.

<br>

```text
recorded agentic-coding trace
  ├─ median request: 142,016 input tokens
  ├─ KV-cache prefix shared across turns
  └─ subagent fan-out ──▶ parallel requests
replayed against an inference server ──▶ latency and throughput
```

<br>

---

# 2️⃣ 🦋 Tools and Resources

<br>

---

## Training Datasets

<br>

- [SWE-gen](https://github.com/abundant-ai/SWE-gen): An automated pipeline that creates tasks from real bug fixes in open-source GitHub repos, in any programming language. It reverts a merged PR to recreate the buggy state, checks that the tests fail on the baseline and pass after the fix, and containerizes each task.
- [SWE-gen-Java](https://github.com/abundant-ai/SWE-gen-Java): A dataset of 1,000 JVM tasks generated from 16 open-source GitHub repos with SWE-gen. Each task is a merged PR with 1 to 10 edited source files and Fail-to-Pass unit tests, validated against both the baseline and the fix.
- [SWE-gen-JS](https://github.com/abundant-ai/SWE-gen-JS): A dataset of 1,000 JavaScript and TypeScript tasks from 30 open-source repos, generated with SWE-gen. Each task is a merged PR with linked issues, 3 to 10 edited source files, and Fail-to-Pass tests, following the Harbor format.
- [SWE-gen-Rust](https://github.com/abundant-ai/SWE-gen-Rust): A dataset of 1,000 Rust tasks from 23 open-source repos, generated with SWE-gen. Each task is a merged PR with 2 to 10 edited source files and Fail-to-Pass unit tests, validated against the baseline and the fix.
- [SWE-gen-Go](https://github.com/abundant-ai/SWE-gen-Go): A dataset of 1,000 Go tasks from 20 open-source repos, generated with SWE-gen. Each task is a merged PR with 2 to 10 edited source files and Fail-to-Pass unit tests, validated against the baseline and the fix.
- [SWE-gen-Cpp](https://github.com/abundant-ai/SWE-gen-Cpp): A dataset of 1,000 C++ tasks from 17 open-source repos, generated with SWE-gen. Each task is a merged PR with 1 to 10 edited source files and Fail-to-Pass unit tests, validated against the baseline and the fix.
- [Nemotron-Terminal-Synthetic-Tasks](https://huggingface.co/datasets/nvidia/Nemotron-Terminal-Synthetic-Tasks): A synthetic dataset of terminal tasks from NVIDIA, hosted on Hugging Face, for training terminal agents. It is one of several public datasets for agent training.
- [seta-env](https://github.com/camel-ai/seta-env): The SETA RL dataset from the CAMEL-AI Scaling Environments for Agents project, generated by an automated synthesis and verification pipeline. Each folder is one task with a task.yaml, a Dockerfile, and run-tests.sh, and the tasks are compatible with the Terminal-Bench format.

<br>
---

## Relevant Tools

<br>

- [OpenThoughts-Agent](https://github.com/open-thoughts/OpenThoughts-Agent): A research codebase from the OpenThoughts project for building tooling and finding data to train small agentic models. It covers generating Harbor tasks, training with SkyRL, and distilling trajectories with SFT.
- [endless-terminals](https://github.com/kanishkg/endless-terminals): A fully autonomous pipeline that generates terminal-use tasks without human annotation, for training terminal agents with reinforcement learning. It can generate tasks with a model such as Qwen3-32B and write them to a folder.
- [Ares](https://github.com/withmartian/ares): An RL-first framework for training and evaluating LLM agents, especially coding agents. It works as a modern gym, the environment layer for RL research on Harbor and SkyRL.
- [Benchmark Templates](https://github.com/yipihey/TerminalBenchTaskGenerator): A desktop application for creating, browsing, and managing Terminal-Bench-Science tasks in the Harbor format. Scientists describe a task in plain language, and a Claude Code agent generates and refines its five Harbor files before they are validated and tested locally.
- [AutoAgent](https://github.com/thirdlayerinc/autoagent): Autoresearch-style iteration for agent engineering: an AI agent builds and improves an agent harness overnight, changing the system prompt, tools, configuration, and orchestration. It runs the benchmark, keeps or discards each change based on the score, and repeats.
- [Agent Accounting](https://github.com/mikehasa/agentacct): A local-first dashboard that shows what your coding agents did and what they cost, across projects and clients. It reads local session logs from tools such as Claude Code, Codex, and OpenCode, and nothing leaves your computer.
- [shadcn Lint](https://github.com/shadcn-ui/lint): An agent-first linter for Tailwind design systems, where you define what is allowed. When an agent breaks a rule, the error explains the problem and suggests a fix based on your components, variants, and theme.
- [Weights & Biases Weave](https://github.com/wandb/weave): A toolkit from Weights & Biases for tracing and evaluating AI agents and LLM applications. Conversations, turns, LLM calls, and tool calls appear in the Agents tab, and the @weave.op decorator traces individual functions.
- [EvalAI](https://github.com/Cloud-CV/EvalAI): An open-source platform for evaluating and comparing machine learning and AI algorithms at scale. It is used to host evaluation challenges where participants submit their results and compare them on leaderboards.
- [Future AGI](https://github.com/future-agi/future-agi): An open-source platform for shipping self-improving AI agents, combining evaluations, tracing, simulations, guardrails, a gateway, and optimization. It aims to close the feedback loop from prototype to production by turning traces into signal for the next version.
- [Inspect AI](https://github.com/UKGovernmentBEIS/inspect_ai): A framework for LLM evaluations created by the UK AI Security Institute. It has built-in components for prompt engineering, tool use, multi-turn dialog, and model-graded evaluations, and it can be extended with other Python packages.
- [DeepEval](https://github.com/confident-ai/deepeval): An open-source LLM evaluation framework that works like Pytest, but for LLM apps. It runs evals through metrics such as G-Eval, task completion, answer relevancy, and hallucination, many of which use LLM-as-a-judge.
- [Promptfoo](https://github.com/promptfoo/promptfoo): A CLI and library for evaluating and red-teaming LLM-based apps. It is used to test prompts and agents and to find security issues before they reach users.
- [EleutherAI LM Evaluation Harness](https://github.com/EleutherAI/lm-evaluation-harness): The widely used harness for running language model benchmarks, with support for many model backends. Recent versions added plugins for custom backends, filters, and metrics, along with a CLI that has subcommands and YAML configuration.
- [NVIDIA NeMo Evaluator](https://github.com/NVIDIA-NeMo/Evaluator): An LLM evaluation framework with benchmark environments, pluggable solvers, an interceptor proxy, and multi-format reporting. It has optional integrations, such as Harbor agents and Inspect AI log export.
- [NVIDIA NeMo Gym](https://github.com/NVIDIA-NeMo/Gym/tree/main): A library for evaluating and improving models and agents using environments. It provides infrastructure to develop environments, run evaluation and training at scale, and includes a collection of popular benchmarks and training environments.
- [Prime Intellect Verifiers](https://github.com/PrimeIntellect-ai/verifiers): A library for creating environments to train and evaluate LLMs. It integrates with Prime Intellect's Environments Hub, its prime-rl training framework, and its hosted training platform.
- [AgentOps](https://github.com/AgentOps-AI/agentops): A platform that helps developers build, evaluate, and monitor AI agents, from prototype to production. The app is open source under the MIT license.
- [Arize — OpenInference](https://github.com/Arize-ai/openinference): A set of conventions and plugins that complement OpenTelemetry to enable tracing of AI applications. It works natively with Arize Phoenix and Arize AX, and with any OpenTelemetry-compatible backend.
- [Arize — Phoenix](https://github.com/Arize-ai/phoenix): An open-source AI observability platform for experimentation, evaluation, and troubleshooting. Arize also offers Arize AX for managed production workflows.
- [Comet — Opik](https://github.com/comet-ml/opik): An open-source LLM observability and evaluation platform for agent tracing, LLM evaluation, prompt management, and production monitoring. It is Apache-2.0 licensed, and the full platform can be self-hosted.
- [Helicone](https://github.com/Helicone/helicone): An open-source LLM observability platform with agent tracing, LLM routing, cost and latency tracking, datasets for fine-tuning, and automatic fallbacks. Setup takes one line of code.
- [Traceloop — OpenLLMetry](https://github.com/traceloop/openllmetry): A set of extensions built on OpenTelemetry that gives complete observability over an LLM application. Because it uses OpenTelemetry, it connects to existing tools such as Datadog and Honeycomb.
- [Langfuse](https://github.com/langfuse/langfuse): An open-source AI engineering platform for agent evals and observability. It tracks usage and costs, traces and evaluates agents, and manages prompts, and it can be used on Langfuse Cloud or self-hosted.
- [MLflow](https://github.com/mlflow/mlflow): An open-source AI engineering platform for agents, LLMs, and ML models, used to debug, evaluate, monitor, and optimize production AI applications. Teams use it to control costs and manage access to models and data.
- [OpenTelemetry — GenAI Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/): The OpenTelemetry specification of standard attribute names and span structure for generative AI calls, so traces from different tools look the same. Many of the observability tools in this list build on it.
- [OpenTelemetry — Demo](https://github.com/open-telemetry/opentelemetry-demo): The Astronomy Shop, a microservice-based distributed system that shows how OpenTelemetry works in a near real-world environment. Vendors and tool authors use it to demonstrate their integrations, and contributors use it to test new versions.
- [Pydantic — Logfire](https://github.com/pydantic/logfire): An observability platform from the team behind Pydantic, built for production LLM and agent systems. It offers Python-centric insights such as profiling and database query visibility, and lets you query your data with standard SQL.
- [OpenObserve](https://openobserve.ai/): An observability platform for logs, metrics, traces, real user monitoring, and AI/LLM workloads. It emphasizes low storage costs compared with other platforms.
- [Braintrust](https://www.braintrust.dev/): An AI observability platform for tracing production systems, running evals, and catching regressions before they reach users. It is used to ship quality agents at scale.
- [RagaAI Catalyst](https://github.com/raga-ai-hub/RagaAI-Catalyst): A Python SDK for agent observability, monitoring, and evaluation. It covers project, dataset, evaluation, trace, and prompt management, along with synthetic data generation, guardrails, and red-teaming.
- [Laminar](https://github.com/lmnr-ai/lmnr): An open-source observability platform built for AI agents, with OpenTelemetry-native tracing and signals that flag behaviors such as loops, described in plain English. It also has an SDK and CLI for running evals locally or in CI/CD.
- [NVIDIA — NeMo Relay](https://docs.nvidia.com/nemo/relay/latest/about-nemo-relay/overview): NeMo Relay manages scopes, middleware, plugins, and lifecycle events for agent systems. Its documentation covers the overview and how to trace agent harness behavior.
- [NVIDIA — NeMo Fabric](https://github.com/NVIDIA/NeMo-Fabric): NeMo Fabric gives applications, evaluation systems, and rollout platforms one interface for running agent harnesses and custom agents. It lets you compose runs, validate configurations before execution, switch harnesses, and compare normalized results.

<br>

---

## Notable Readings

<br>

- [OpenAI's Aligment](https://alignment.openai.com/)
- [ByteRover — Benchmarking AI Agent Memory](https://www.byterover.dev/blog/benchmark-ai-agent-memory)
- [Letta — Evaluating Memory in Production Agents](https://www.letta.com/blog/evaluating-memory-in-production-agents/)
- [Supermemory — Research](https://supermemory.ai/research/)
- [Mem0 — Why BEAM Is a Good Memory Benchmark](https://mem0.ai/library/agent-memory/why-beam-is-a-good-memory-benchmark-for-ai-agents)
- [Mem0 — Understanding Memory Benchmarks for Production AI Agents](https://mem0.ai/library/agent-memory/understanding-memory-benchmark-for-production-ai-agents)
- [Mem0 — How to Read Memory Benchmarks](https://mem0.ai/library/agent-memory/how-to-read-memory-benchmarks)
- [Memory Papers — Benchmarks](https://memorypapers.org/benchmarks)
- [Awesome Evals](https://github.com/benchflow-ai/awesome-evals): curated list of evaluation resources
- [OpenAI — Eval Skills](https://developers.openai.com/blog/eval-skills): OpenAI blog post on evaluation skills
- [LangChain — Evaluating Deep Agents](https://www.langchain.com/blog/evaluating-deep-agents-our-learnings): LangChain's lessons from evaluating deep agents
- [LangChain — Agent Evaluation Readiness Checklist](https://www.langchain.com/blog/agent-evaluation-readiness-checklist): checklist for getting an agent ready to evaluate
- [LangChain — Evaluating Skills](https://www.langchain.com/blog/evaluating-skills): how to evaluate agent skills
- [LangChain — Agent Observability Powers Agent Evaluation](https://www.langchain.com/blog/agent-observability-powers-agent-evaluation): how observability data feeds agent evaluation
- [Anthropic — Demystifying Evals for AI Agents](https://www.anthropic.com/research/demystifying-evals-for-ai-agents): Anthropic's overview of designing evals for AI agents
- [Anthropic — Infrastructure Noise](https://www.anthropic.com/research/infrastructure-noise): how infrastructure differences add noise to agentic evals
- [Anthropic — Eval Awareness and BrowseComp](https://www.anthropic.com/research/eval-awareness-browsecomp): eval awareness in models tested on BrowseComp
- [Anthropic — AI-Resistant Technical Evaluations](https://www.anthropic.com/research/AI-resistant-technical-evaluations): designing technical evaluations that resist AI assistance
- [Red Hat — Eval-Driven Development for AI Agents](https://developers.redhat.com/articles/2026/03/23/eval-driven-development-build-evaluate-ai-agents): building and evaluating AI agents with eval-driven development
- [Splunk — Agent Evaluation Framework](https://www.splunk.com/en_us/blog/artificial-intelligence/agent-evaluation-framework.html): Splunk's framework for evaluating agents
- [Google — Driving the Agent Quality Flywheel](https://developers.googleblog.com/en/driving-the-agent-quality-flywheel-from-your-coding-agent/): improving agent quality with a feedback loop from coding agents
- [OpenAI — How We Detect Frontier Model Misalignment](https://openai.com/index/how-we-detect-frontier-model-misalignment/): OpenAI on detecting misalignment in frontier models
- [AWS — AgentCore Evaluations](https://aws.amazon.com/about-aws/whats-new/2026/03/agentcore-evaluations-generally-available/): AWS announcement that AgentCore Evaluations is generally available
- [NVIDIA — Tracing Agent Harness Behavior with NeMo Relay](https://developer.nvidia.com/blog/tracing-agent-harness-behavior-with-nvidia-nemo-relay/): tracing agent harness behavior with NeMo Relay
- [Temporal — Building Observable AI Agents with Braintrust](https://temporal.io/blog/building-observable-ai-agents-temporal-now-integrates-with-braintrust): building observable agents with Temporal and Braintrust
- [Google Cloud — BigQuery Agent Analytics](https://cloud.google.com/blog/products/data-analytics/introducing-bigquery-agent-analytics/): analyzing agent behavior with BigQuery
- [Red Hat — Distributed Tracing for Agentic Workflows](https://developers.redhat.com/articles/2026/04/06/distributed-tracing-agentic-workflows-opentelemetry): distributed tracing for agentic workflows with OpenTelemetry
- [METR — Red Teaming Anthropic Agent Monitoring](https://metr.org/blog/2026-03-25-red-teaming-anthropic-agent-monitoring/): METR's red teaming of Anthropic's agent monitoring
- [Interconnects — Artificial Analysis V5 and the Benchmarkers](https://www.interconnects.ai/p/artificial-analysis-v5-and-the-benchmarkers): a review of the benchmarking industry and what's missing
- [Olam Labs](https://olamlabs.ai/): measures social intelligence in AI models through behavioral evaluations in multi-agent simulations

<br>

---

# 3️⃣ 🦋 Notable Research Papers

<br>

## Memory Evaluation

<br>

- [MemoryArena: Benchmarking Agent Memory in Interdependent Multi-Session Agentic Tasks](https://arxiv.org/abs/2602.16313) — Zexue He et al., 2026
- [BenchPreS: A Benchmark for Context-Aware Personalized Preference Selectivity of Persistent-Memory LLMs](https://arxiv.org/abs/2603.16557) — Sangyeon Yoon et al., 2026
- [How Does Personalized Memory Shape LLM Behavior? Benchmarking Rational Preference Utilization in Personalized Assistants](https://arxiv.org/abs/2601.16621) — Xueyang Feng et al., 2026
- [OP-Bench: Benchmarking Over-Personalization for Memory-Augmented Personalized Conversational Agents](https://arxiv.org/abs/2601.13722) — Yulin Hu et al., 2026
- [MemSyco-Bench: Benchmarking Sycophancy in Agent Memory](https://arxiv.org/abs/2607.01071) — Zhishang Xiang et al., 2026
- [MemCalib: Benchmarking and Optimizing Memory Use in LLM Agents](https://arxiv.org/abs/2609.24259) — Ruike Cao et al., 2026
- [MemBench: Towards More Comprehensive Evaluation on the Memory of LLM-based Agents](https://arxiv.org/abs/2506.21605) — Haoran Tan et al., 2025
- [Evaluating Memory in LLM Agents via Incremental Multi-Turn Interactions](https://arxiv.org/abs/2507.05257) — Yuanzhe Hu et al., 2025

<br>

---

## Coding Agents and Software Engineering

<br>

- [Agyn: A Multi-Agent System for Team-Based Autonomous Software Engineering](https://arxiv.org/abs/2602.01465) — Nikita Benkovich et al., 2026
- [AgentLens: Revealing The Lucky Pass Problem in SWE-Agent Evaluation](https://arxiv.org/abs/2605.12925) — Priyam Sahoo et al., 2026
- [StaminaBench: Stress-Testing Coding Agents over 100 Interaction Turns](https://arxiv.org/abs/2606.19613) — Vlad Sobal et al., 2026
- [Repo2Run: Automated Building Executable Environment for Code Repository at Scale](https://arxiv.org/abs/2502.13681) — Ruida Hu et al., 2025
- [R2E-Gym: Procedural Environments and Hybrid Verifiers for Scaling Open-Weights SWE Agents](https://arxiv.org/abs/2504.07164) — Naman Jain et al., 2025
- [OpenHands: An Open Platform for AI Software Developers as Generalist Agents](https://arxiv.org/abs/2407.16741) — Xingyao Wang et al., 2024
- [SWE-bench: Can Language Models Resolve Real-World GitHub Issues?](https://arxiv.org/abs/2310.06770) — Carlos E. Jimenez et al., 2023

<br>

---

## Web, Computer and Workplace Agents

<br>

- [OccuBench: Evaluating AI Agents on Real-World Professional Tasks via Language Environment Simulation](https://arxiv.org/abs/2604.10866) — Xiaomeng Hu et al., 2026
- [VisualWebArena: Evaluating Multimodal Agents on Realistic Visual Web Tasks](https://arxiv.org/abs/2401.13649) — Jing Yu Koh et al., 2024
- [WorkArena: How Capable Are Web Agents at Solving Common Knowledge Work Tasks?](https://arxiv.org/abs/2403.07718) — Alexandre Drouin et al., 2024
- [OSWorld: Benchmarking Multimodal Agents for Open-Ended Tasks in Real Computer Environments](https://arxiv.org/abs/2404.07972) — Tianbao Xie et al., 2024
- [τ-bench: A Benchmark for Tool-Agent-User Interaction in Real-World Domains](https://arxiv.org/abs/2406.12045) — Shunyu Yao et al., 2024
- [WorkArena++: Towards Compositional Planning and Reasoning-based Common Knowledge Work Tasks](https://arxiv.org/abs/2407.05291) — Léo Boisvert et al., 2024
- [The BrowserGym Ecosystem for Web Agent Research](https://arxiv.org/abs/2412.05467) — Thibault Le Sellier De Chezelles et al., 2024
- [TheAgentCompany: Benchmarking LLM Agents on Consequential Real World Tasks](https://arxiv.org/abs/2412.14161) — Frank F. Xu et al., 2024
- [WebArena: A Realistic Web Environment for Building Autonomous Agents](https://arxiv.org/abs/2307.13854) — Shuyan Zhou et al., 2023
- [AgentBench: Evaluating LLMs as Agents](https://arxiv.org/abs/2308.03688) — Xiao Liu et al., 2023
- [GAIA: a benchmark for General AI Assistants](https://arxiv.org/abs/2311.12983) — Grégoire Mialon et al., 2023

<br>

---

## Agent Harnesses and Runtimes

<br>

- [VeRO: A Harness for Agents to Optimize Agents](https://arxiv.org/abs/2602.22480) — Varun Ursekar et al., 2026
- [Evaluating Agents Across Runtime Contracts: When Mismatch Costs Efficiency or Quality](https://arxiv.org/abs/2603.01209) — Victor May et al., 2026
- [Natural-Language Agent Harnesses](https://arxiv.org/abs/2603.25723) — Linyue Pan et al., 2026
- [Meta-Harness: End-to-End Optimization of Model Harnesses](https://arxiv.org/abs/2603.28052) — Yoonho Lee et al., 2026
- [AI Harness Engineering: A Runtime Substrate for Foundation-Model Software Agents](https://arxiv.org/abs/2605.13357) — Hailin Zhong et al., 2026
- [Stop Comparing LLM Agents Without Disclosing the Harness](https://arxiv.org/abs/2605.23950) — Yunbei Zhang et al., 2026
- [Harness-Bench: Evaluating Agent Harnesses across Models and Realistic Workflows](https://arxiv.org/abs/2605.27922) — Yilun Yao et al., 2026
- [Cache Engineering for Agents](https://arxiv.org/abs/2610.28577) — Tianyu Fu et al., 2026

<br>

---

## Tools, Skills and Interfaces

<br>

- [SkillTester: Benchmarking Utility and Security of Agent Skills](https://arxiv.org/abs/2603.28815) — Leye Wang et al., 2026
- [The Devil Is in the Interface: Evaluating How Tool Architecture Shapes Coding Agent Behavior](https://arxiv.org/abs/2608.11386) — Xiangzhe Xu et al., 2026

<br>

---

## Observability and Failure Analysis

<br>

- [Beyond Black-Box Benchmarking: Observability, Analytics, and Optimization of Agentic Systems](https://arxiv.org/abs/2503.06745) — Dany Moshkovich et al., 2025
- [Why Do Multi-Agent LLM Systems Fail?](https://arxiv.org/abs/2503.13657) — Mert Cemri et al., 2025
- [SentinelAgent: Graph-based Anomaly Detection in Multi-Agent Systems](https://arxiv.org/abs/2505.24201) — Xu He et al., 2025
- [Mind the Metrics: Patterns for Telemetry-Aware In-IDE AI Application Development using the Model Context Protocol (MCP)](https://arxiv.org/abs/2506.11019) — Vincent Koc et al., 2025
- [Taming Uncertainty via Automation: Observing, Analyzing, and Optimizing Agentic AI Systems](https://arxiv.org/abs/2507.11277) — Dany Moshkovich et al., 2025
- [AgentSight: System-Level Observability for AI Agents Using eBPF](https://arxiv.org/abs/2508.02736) — Yusheng Zheng et al., 2025
- [Where LLM Agents Fail and How They can Learn From Failures](https://arxiv.org/abs/2509.25370) — Kunlun Zhu et al., 2025
- [Watson: A Cognitive Observability Framework for the Reasoning of LLM-Powered Agents](https://arxiv.org/abs/2411.03455) — Benjamin Rombaut et al., 2024

<br>

---

## Evaluation Methodology and Reliability

<br>

- [The 2025 AI Agent Index: Documenting Technical and Safety Features of Deployed Agentic AI Systems](https://arxiv.org/abs/2602.17753) — Leon Staufer et al., 2026
- [AgentAssay: Token-Efficient Regression Testing for Non-Deterministic AI Agent Workflows](https://arxiv.org/abs/2603.02601) — Varun Pratap Bhardwaj, 2026
- [LLM Readiness Harness: Evaluation, Observability, and CI Gates for LLM/RAG Applications](https://arxiv.org/abs/2603.27355) — Alexandre Cristovão Maiorano, 2026
- [Holistic Agent Leaderboard: The Missing Infrastructure for AI Agent Evaluation](https://arxiv.org/abs/2510.11977) — Sayash Kapoor et al., 2025
- [Lessons from the Trenches on Reproducible Evaluation of Language Models](https://arxiv.org/abs/2405.14782) — Stella Biderman et al., 2024
- [A Survey on LLM-as-a-Judge](https://arxiv.org/abs/2411.15594) — Jiawei Gu et al., 2024

<br>

---


<br>

#### That's it for now! Thank you for reading and for being here with me. Wishing you an amazing end to the year. I'll see you in 2027, my friend!

#### ⬛️
