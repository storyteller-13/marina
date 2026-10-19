---
title: 📊 PAPER → Multiplayer Intelligence 2️⃣ of ♾️: Gödel Machines
subtitle: Audience: Intermediate to Advanced AI Scientists | Today's word: Infinite むげん אינסופי
date: 2026; 10; 24
---

> [🎼](https://www.youtube.com/watch?v=iC6kj2HVCMc) *"This sentence is false."* — The ancient Liar Paradox

<br>

![](/blog/assets/echer.jpg)

<br>

Happy Friday, dear anon. Today we will review six quintessential papers on one of our all-time favorite topics, **[RSI](https://en.wikipedia.org/wiki/Recursive_self-improvement)**. More specifically, we will be looking at one of its origins: [**Gödel Machines**](https://en.wikipedia.org/wiki/G%C3%B6del_machine), and how the idea has evolved over the last two decades.

You all know I am a big fan of **[Kurt Gödel](https://en.wikipedia.org/wiki/Kurt_G%C3%B6del)**, and that I believe **[Hofstadter’s Gödel, Escher, Bach](https://lore.nullstar.fun/chapters/25_summer.html#2025_june_27)** is one of the greatest books ever written.

Well, it turns out that some fascinating possibilities for AGI emerged from his work: Gödel’s famous [**incompleteness theorems (1931)**](https://en.wikipedia.org/wiki/G%C3%B6del%27s_incompleteness_theorems) and the remarkable implication that *it is possible to construct a mathematical statement that, under specific conditions, refers to its own provability*.

In the early 2000s, **[Jürgen Schmidhuber](https://people.idsia.ch/~juergen/recursive-self-improvement.html?utm_source=chatgpt.com)** connected Gödel’s ideas to information theory and the theory of self-improving systems, giving rise to the **Gödel Machine**: *Can an intelligent system prove that changing itself is worthwhile? Can it prove that modifying the machinery it uses to reason will make it more successful? Can reasoning fully understand itself?*

The Gödel Machine is a theoretical, self-referential problem-solving system with a formal description of its environment, its goals, and its own operation. It searches for a proof that a particular self-modification will improve its expected utility enough to justify making the change. It’s an honor and a pleasure to spend a little of my time learning more about this fascinating topic, and I hope you enjoy exploring it as much as I do.

As I read through today's material, below are my highlights — with a moderate attempt at coherence — for my personal inventory (and perhaps as a way to connect with other friendly AI scientists and builders out there who love talking about the same things). As always, please remember our rules:

**🤖 If you see a 👾, it means I found something particularly cool or learned something new.**
**🤖 If you see a ✨, it means things that are so cool that they need a lil glitter around them.**
**🤖 If these notes look cool to you, it's your ✦moral duty✦ to read the original resources.**
**🤖 Just another blog, but not your usual blog: they're living notes that I change as I fancy.**

<br>

---

# 🦾 [Gödel Machines: Self-Referential Universal Problem Solvers Making Provably Optimal Self-Improvements (J. Schmidhuber, 2006)](https://arxiv.org/pdf/cs/0309048)

<br>

![](/blog/assets/gm1.png)

<br>

> ✨ *In 1931, Kurt Gödel laid the foundations of theoretical computer science, using elementary arithmetics to build a universal programming language for encoding arbitrary proofs, given an arbitrary enumerable set of axioms. He went on to construct self-referential formal statements that claim their own unprovability, using Cantor’s diagonalization trick to demonstrate that formal systems such as traditional mathematics are either flawed in a certain sense or contain unprovable but true statements. Since Gödel’s exhibition of the fundamental limits of proof and computation, and Konrad Zuse’s subsequent construction of the first working programmable computer (1935-1941), there has been a lot of work on specialized algorithms solving problems taken from more or less general problem classes. Apparently, however, one remarkable fact has so far escaped the attention of computer scientists: it is possible to use self-referential proof systems to build optimally efficient yet conceptually very simple universal problem solvers.* ✨

> ✨ *To attack this “Grand Problem of Artificial Intelligence”, we introduce a novel class of optimal, fully self-referential general problem solvers called Gödel machines → self-rewrites due to this approach are actually globally optimal relative to Gödel’s well-known fundamental restrictions of provability. If there is no proof of some self-rewrite’s utility, then humans cannot do much either.* ✨

<br>

### tl; dr

<br>

- Present the first class of mathematically rigorous, general, fully self-referential, self-improving, optimally efficient problem solvers, inspired by Gödel’s self-referential formulas (1931) → A problem solver rewrites any part of its code as soon as it finds a proof that the rewrite is useful.

- The problem-dependent utility function, the hardware, and the entire initial code are described by axioms encoded in an initial proof searcher, which is itself part of the initial code.

- The searcher systematically tests computable proof techniques (programs whose outputs are proofs) in an asymptotically optimal way until it finds a provably useful computable self-rewrite → Such a self-rewrite is globally optimal: there are no local maxima.

- Unlike hardwired systems such as Hutter’s and Levin’s however, a Gödel machine can in principle speed up any part of its initial software, including its proof searcher, to meet arbitrary formalizable notions of optimality beyond those expressible in the `O()`-notation.

<br>

### Setup

<br>

1️⃣ Our hardware (e.g., a universal or space-bounded Turing machine or the abstract model of a personal computer) has a single life which consists of discrete cycles or time steps `t = 1, 2, . .`. Its total lifetime `T` may or may not be known in advance. In what follows, the value of any time-varying variable `Q` at time `t` will be denoted by `Q(t)`.

2️⃣ During each cycle our hardware executes an elementary operation which affects its variable state `s ∈ S ⊂ B∗` (without loss of generality, `B∗` is the set of possible bitstrings over the binary alphabet `B = {0, 1}`) and possibly also the variable environmental state `Env ∈ E`.

3️⃣ There is a hardwired state transition function `F:S × E → S`. For `t > 1`, `s(t) = F (s(t − 1), Env(t − 1))` is the state at a point where the hardware operation of cycle `t − 1` is finished, but the one of `t` has not started yet. `Env(t)` may depend on past output actions encoded in `s(t − 1)` and is simultaneously updated or (probabilistically) computed by the possibly reactive environment.

4️⃣ At time `t`, variable `time` holds a unique binary representation of `t`. We initialize `time(1) = ‘1’`, the bitstring consisting only of a `one`. The hardware increments `time` from one cycle to the next. This requires at most `O(log t)` and on average only `O(1)` computational steps.

5️⃣ Variable `x` holds the inputs from the environment to the Gödel machine. For `t > 1`, `x(t)` may differ from `x(t − 1)` only if a program running on the Gödel machine has executed a special input-requesting instruction at time `t−1`.

6️⃣ Variable `y` holds the outputs of the Gödel machine. `y(t)` is an output bitstring which may subsequently influence the environment, where `y(1) = ‘0’` by default. For example, `y(t)` could be interpreted as a control signal for an environment-manipulating robot whose actions may have an effect on future input.

7️⃣ `p(1)` is the initial software: a program implementing the original (sub-optimal) policy for interacting with the environment, represented as a substring `e(1)` of `p(1)`, plus the original policy for searching proofs. 

8️⃣ At any given time `t (1 ≤ t ≤ T )` the goal is to maximize future success or utility. Our machine becomes a self-referential Gödel machine by loading it with a particular form of machine-dependent, self-modifying code `p`.

9️⃣ The initial code `p(1)` at `time` step `1` includes a (typically sub-optimal) problem solving subroutine `e(1)` for interacting with the environment, such as any traditional reinforcement learning algorithm, and a general proof searcher subroutine that systematically makes pairs `(switchprog, proof)` (variable substrings of `s`) until it finds a proof of a target theorem which essentially states: *‘the immediate rewrite of `p` through current program `switchprog` on the given machine implies higher utility than leaving `p` as is’*. Then it executes `switchprog`, which may completely rewrite `p`, including the proof searcher.

<br>

> 👾 *A switchprog (switch program) is a program that can modify or replace its own code with an alternative program when a specified condition is satisfied. In the context of recursive self-improvement (RSI), a switchprog can transition from one problem-solving procedure to another when it determines that the alternative will perform better according to a given objective.*

> 👾 *The Global Optimality Theorem shows this self-improvement strategy is not greedy: since the utility of ‘leaving `p` as is’ implicitly evaluates all possible alternative `switchprogs` which an unmodified `p` might find later, we obtain a globally optimal self-change — the current `switchprog` represents the best of all possible relevant self-changes, relative to the given resource limitations and initial proof search strategy.*

> 👾 *Theorem: Given any formalizable utility function `u`, and assuming consistency of the underlying formal system `A`, any self-change of `p` obtained through execution of some program `switchprog` identified through the proof of a target is globally optimal in the following sense: the utility of starting the execution of the present `switchprog` is higher than the utility of waiting for the proof searcher to produce an alternative `switchprog` later.*

> 👾 *Theorem: the utility of starting the execution of a present `switchprog` is at least as high as the utility of waiting for the proof searcher to produce an alternative `switchprog` later.*

<br>

- Even a Gödel machine with unlimited computational resources must ignore those self-improvements whose effectiveness it cannot prove, e.g., for lack of sufficiently powerful axioms in `A` → A realistic Gödel machine with limited resources cannot profit from self-improvements whose usefulness it cannot prove within its time and space constraints.

<br>

### Proof Techniques

<br>

- The nature of the six proof-modifying instructions (there are no others) makes it impossible to insert an incorrect theorem into proof, thus trivializing proof verification → 1) `get-axiom(n)` appends the `n`-th possible axiom to the current proof, 2) `apply-rule(k, m, n)` applies the `k`-th inference rule to the `m`-th and `n`-th theorem in the current proof (appending the result), 3) `delete-theorem(m)` deletes the `m`-th theorem in the currently stored proof, thus freeing storage such that proof-storing parts of `s` can be reused and the maximal proof size is not necessarily limited by storage constraints, 4) `set-switchprog(m,n)` sets `switchprog := s^p_{m:n}`, 5) `check()` tests whether the last theorem in proof is a target theorem showing that a self-rewrite through switchprog would be useful, 6) `state2theorem(m, n)` takes two integer arguments `m, n` and tries to transform the current contents of `s_{m:n}` into a theorem.

<br>

### Bias-Optimal Proof Search (BIOPS)

<br>

- BIOPS starts with a probability distribution `P` (the initial bias) on the proof techniques w that one can write in `L`.

- It is essentially an application of Universal Search to proof search → We construct an initial `p(1)` that is `O()`-optimal in a certain limited sense, but still might be improved as it is not necessarily optimal in the sense of the given `u`.

- Previous practical variants and extensions of Universal Search have been applied to offline program search tasks where the program inputs are fixed such that the same program always produces the same results. In our online setting, however, BIOPS has to take into account that the same proof technique started at different times may yield different proofs, as it may read parts of `s` (e.g., inputs) that change as the machine’s life proceeds.

<br>

> *If independently of variable `time(s)` some unknown fast proof technique `w` would require at most `f(k)` steps to produce a proof of difficulty measure `k` (an integer depending on the nature of the task to be solved), then we will need at most `O(f(k))` steps.*

<br>

- BIOPS allocates part of the total search time for a new task to proof techniques that exploit previous successful proof techniques in computable ways. If the new task can be solved faster by copy-editing / invoking previously frozen proof techniques than by solving the new proof search task from scratch, then BIOPS will discover this and profit thereof. If not, then at least it will not be significantly slowed down by the previous solutions—BIOPS will remain 8-bias-optimal (theorem above).

<br>

### Discussion

<br>

- In certain uninteresting environments reward is maximized by becoming dumb. For example, a given task may require to repeatedly and forever execute the same pleasure center-activating action, as quickly as possible. In such cases the G¨odel machine may delete most of its more time-consuming initial software including the proof searcher.

- There is no reason why a Gödel machine should not augment its own hardware. Suppose its lifetime is known to be 100 years. Given a hard problem and axioms restricting the possible behaviors of the environment, the Gödel machine might find a proof that its expected cumulative reward will increase if it invests 10 years into building faster computational hardware, by exploiting the physical resources of its environment.

- ✨ The initial input to the Gödel machine is the representation of a connected graph with a large number of nodes linked by edges of various lengths. Within given time `T` it should find a cyclic path connecting all nodes. The only real-valued reward will occur at time `T`. It equals `1` divided by the length of the best path found so far (`0` if none was found). There are no other inputs. The by-product of maximizing expected reward is to find the shortest path findable within the limited time, given the initial bias. ✨

<br>

> *Gödel Machine vs Universal Search → Unlike the fully self-referential Gödel machine, Levin’s Universal Search has a hardwired, unmodifiable meta-algorithm that cannot improve itself. It is asymptotically optimal for inversion problems whose solutions can be quickly verified in `O(n)` time (where `n` is the solution size), but it will always suffer from the same huge constant slowdown factors (typically `>> 101000`) buried in the `O()`-notation. The Gödel machine is applicable to general lifelong reinforcement learning tasks where Universal Search is not asymptotically optimal, and not even applicable, since in RL the evaluation of some behavior’s value in principle consumes the learner’s entire life.*

> *Gödel Machine vs AIXI → Unlike Gödel machines, Hutter’s recent AIXI model generally needs unlimited computational resources per input update. It combines Solomonoff’s universal prediction scheme with an `expectimax` computation. While AIXI clarifies certain theoretical limits of machine learning, it is computationally intractable, especially when `M` includes all computable distribution.*

> *Gödel Machine vs `HSEARCH` and `AIXI(t,l)` → Hutter’s non-self-referential but still `O()`-optimal ‘fastest’ algorithm for all well-defined problems `HSEARCH` uses a hardwired brute force proof searcher and ignores the costs of proof search. Hutter’s `AIXI(t,l)` is related. In discrete cycle `k = 1, 2, 3, . . .` of `AIXI(t,l)`’s lifetime, action `y(k)` results in perception `x(k)` and reward `r(k)`, where all quantities may depend on the complete history. The theorem provers of `HSEARCH` and `AIXI(t,l)` are hardwired, non-self-referential, unmodifiable meta-algorithms that cannot improve themselves. It is the self-referential aspects of the Gödel machine that relieve us of much of the burden of careful algorithm design required for `AIXI(t,l)` and `HSEARCH`.*

> ✨ *In recent years the topic of consciousness has gained some credibility as a serious research issue, at least in philosophy and neuroscience. However, there is a lack of technical justifications of consciousness: so far nobody has shown that consciousness is really useful for solving problems, although problem solving is considered of central importance in philosophy. The fully self-referential Gödel machine may be viewed as providing just such a technical justification. It is “conscious” or “self-aware” in the sense that its entire behavior is open to self-introspection, and modifiable. It may ‘step outside of itself’ by executing self-changes that are provably good, where the proof searcher itself is subject to analysis and change through the proof techniques it tests.* ✨

<br>

---

# 🦾 Open Problems in Universal Induction & Intelligence (M. Hutter, 2009)

<br>

> *The science of artificial intelligence may be defined as the construction of intelligent systems (artificial agents) and their analysis. A natural efinition of a system is anything that has an input and an output stream, or equivalently an agent that acts and observes. Intelligence is more complicated. It can have many faces like creativity, solving problems, pattern recognition, classification, learning, induction, deduction, building analogies, optimization, surviving in an environment, language processing, planning, and knowledge acquisition and processing. Informally, AI is concerned with developing agents that perform well in a large range of environments. A formal definition incorporating every aspect of intelligence, however, seems difficult. In order to solve this problem we need to solve the induction, prediction, decision, and action problem, which seems like a daunting (some even claim impossible) task: Intelligent actions are based on informed decisions. Attaining good decisions requires predictions which are typically based on models of the environments. Models are constructed or learned from past observations via induction.*

> *What do we need (from a mathematical point of view) to construct a universal optimal learning agent interacting with an arbitrary unknown environment? The theory, coined AIXI, developed in this decade and says: All you need is Occam, Epicurus, Turing, Bayes, Solomonoff, Kolmogorov, and Bellman: Sequential decision theory (Bellman’s equation) formally solves the problem of rational agents in uncertain worlds if the true environmental probability distribution is known. If the environment is unknown, Bayesians replace the true distribution by a weighted mixture of distributions from some (hypothesis) class. Using the large class of all (semi)measures that are (semi)computable on a Turing machine bears in mind Epicurus, who teaches not to discard any (consistent) hypothesis. In order not to ignore Occam, who would select the simplest hypothesis, Solomonoff defined a universal prior that assigns high/low prior weight to simple/complex environments, where Kolmogorov quantifies complexity. All other concepts and phenomena attributed to intelligence are emergent. All together, this solves all conceptual problems, and “only” computational problems remain.*

<br>

- Intelligence Aspects of AIXI ➡️ Intelligence can have many faces. As argued in, it is plausible that AIXI possesses all or at least most properties an intelligent rational agent should posses. Some of the following properties could and should be investigated mathematically: creativity, problem solving, pattern recognition, classification, learning, induction, deduction, building analogies, optimization, surviving in an environment, language processing, planning.

- There are many fields that try to understand the phenomenon of intelligence and whose insights help in creating intelligent systems: Cognitive psychology and behaviorism, philosophy of mind, neuroscience, linguistics, anthropology, machine learning, logic, computer science, biological evolution, and others. In computer science, most AI research is bottom-up; extending and improving existing or developing new algorithms and increasing their range of applicability; an interplay between experimentation on toy problems and theory, with occasional real-world applications.

- The agent perspective of AI brings some order and unification in the large variety of problems the fields wants to address, but it is only a framework rather than a complete theory. In the absence of a perfect (stochastic) model of the environment, machine learning techniques are needed and employed. Apart from AIXI, there is no general theory for learning agents. This resulted in an ever increasing number of limited models and algorithms in the past.

- The information-theoretic approach to AI ➡️ Solomonoff induction and AIXI are mathematical top-down approaches. The price for this generality is that the full models are computationally intractable, and investigations have to be mostly theoretical at this stage. From a different perspective, UAI strictly separates the conceptual and algorithmic AI questions. 

- Two analogies may help: Von Neumann’s optimal minimax strategy is a conceptual solution of zero-sum games, but is infeasible for most interesting zero-sum games. Nevertheless most algorithms are based on approximations of this ideal. In physics, the quest for a “theory of everything” (TOE) lead to extremely successful unified theories, despite their computational intractability. The role of UAI in AI should be understood as analogous to the role of minimax in zero-sum games or of the TOE in physics.

- Algorithmic information theory offers answers to the following two key scientific questions: (1) The problem of induction, which is what science itself is mostly about: Induction ≈ finding regularities in data ≈ understanding the world ≈ science. (2) Understanding intelligence, the key property that distinguishes humans from animals and inanimate things. This modern mathematical approach to both questions (1) and (2) is quite different to the more traditional philosophical, logic-based, engineering, psychological, or neurological approaches. Among the few other mathematical approaches, none captures rational intelligence as completely as the AIXI model does. Still, a lot of questions remain open. 

-  Imagine a complete practical solution of the AI problem (by the next generation or so), i.e. systems that surpass human intelligence. This would transform society more than the industrial revolution two centuries ago, the computer last century, and the internet this century. Although individually, some questions I raised seem quite technical and narrow, they derive their significance from their role in a truly outstanding scientific endeavor. As with most innovations, the social benefit of course depends on its benevolent use.

<br>

---

# 🦾 [Gödel Agent: A Self-Referential Agent Framework for Recursively Self-Improvement (X. Yin et al., 2025)](https://arxiv.org/pdf/2410.04444)

<br>

![](/blog/assets/gm2.png)

<br>

- Introduce a self-evolving framework inspired by the Gödel Machine, enabling agents to recursively improve themselves without relying on predefined routines or fixed optimization algorithms.

- Gödel agents leverage LLMs to dynamically modify their own logic and behavior, guided by high-level objectives expressed through prompting.

- Experimental results across multiple domains demonstrate that Gödel agents can achieve continuous self-improvement, surpassing manually crafted agents in performance, efficiency, and generalizability.

<br>

<br>

![](/blog/assets/gm3.png)

<br>

> *Let `E ∈ S` denote a specific environment state, where `S` denotes the set of all possible environments the agent will encounter. For example, an environment can be a mathematical problem with ground truth solutions. We denote the policy that an agent follows to solve a problem in the current environment by `π ∈ Π`, where `Π` is the set of all possible policies the agent can follow. A hand-designed agent is not capable of updating its policy and following the same policy `π` all the time, regardless of environmental feedback. In contrast, a meta-learning optimized agent updates its policy based on a meta-learning algorithm `I` at training time based on the feedback it receives from the environment. A self-referential Gödel Agent updates both the policy `π` and the meta-learning algorithm `I` recursively. The main idea is that, after each update, the whole code base of the agent is rewritten to accommodate any possible changes. Here we call this self-updatable meta-learning algorithm `I` a self-referential learning algorithm.*

<br>

- The agent's recursive design requires the specification of an initial agent algorithm `(π0, I0)`, detailed as follows: 1) A initial agent policy `π0` to perform the desired task within the environment `E`, and 2) A self-referential learning algorithm `I0` for recursively querying an LLM to rewrite its own code based on the environmental feedback.

<br>

![](/blog/assets/gm4.png)

<br>

- The set of actions `A` for the action function `o` to execute needs to include the following four actions: 1) `self_inspect`: Introspect and read the agent’s current algorithm `(πt, It)`, 2) `interact`: Interact with the environment by calling the utility function `U` to assess the performance of the current policy `πt`, 3) `self­_update`: Alter and update `(πt, It)` with an LLM and produce `(πt+1, It+1)`, 4) `continue_improve`: If no other actions can be taken, recursively invoke the decision algorithm `f` to produce new actions.

- Gödel Agent achieves self-awareness by inspecting runtime memory, particularly local and global variables in Python. This capability allows the agent to extract and interpret the variables, functions, and classes that constitute both the environment and the agent itself, according to the modular structure of the system. By introspecting these elements, the agent gains an understanding of its own operational state and can adapt accordingly.

- ✨ Collective Intelligence ➡️ what are the interactions among multiple Gödel Agents? Agents could consider other agents as part of their environment, modeling them using techniques such as game theory. This approach treats these agents as predictable components of the environment, enabling the study of properties related to this specific subset of the environment. ✨

<br>

---

# 🦾 [The Darwin Gödel Machine: AI that improves itself by rewriting its own code (Sakana AI, 2025)](https://sakana.ai/dgm/)

<br>

![](/blog/assets/gm5.png)

<br>

- A longstanding goal of AI research has been the creation of AI that can learn indefinitely. One tantalizing path toward that goal is an AI that improves itself by rewriting its own code, including any code responsible for learning. That idea, known as a Gödel Machine, proposed by Jürgen Schmidhuber decades ago, is a hypothetical self-improving AI. It optimally solves problems by recursively rewriting its own code when it can mathematically prove a better strategy, making it a key concept in meta-learning or “learning to learn.”

- While the theoretical Gödel Machine promised provably beneficial self-modifications, its realization relied on an impractical assumption: that the AI could mathematically prove that a proposed change in its own code would yield a net improvement before adopting it. 

<br>

> ✨ *The Darwin Gödel Machine is a self-improving coding agent that rewrites its own code to improve performance on programming tasks. It creates various self-improvements, such as a patch validation step, better file viewing, enhanced editing tools, generating and ranking multiple solutions to choose the best one, and adding a history of what has been tried before (and why it failed) when making new changes.* ✨

<br>

- This first DGM is a coding agent that has the ability to ➡️ 1) Read and Modify Its Own Code: It understands and can modify its own Python codebase to try to self-improve (e.g., adding a new tool, or suggesting a different workflow), 2) Evaluate if the Change Improves Performance: Proposed new versions of itself are evaluated on coding benchmarks (like SWE-bench and Polyglot),  3) Open-endedly Explore the AI Design Space: New agents are added to an ever-expanding archive of interesting agents. 

- Harnessing the power of open-ended algorithms, future self-modifications can then branch off from any agent in this growing archive, allowing for parallel exploration of many different evolutionary paths. This open-ended exploration helps DGM discover truly novel solutions and avoid getting trapped in suboptimal designs.

<br>

![](/blog/assets/gm6.png)

<br>

---

# 🦾 [Huxley-Gödel Machine: Human-Level Coding Agents Development by an Approximation of Optimal Self-Improving Machine (W. Wang et al., 2025)](https://arxiv.org/pdf/2510.21614)

<br>

- Self-improvement through coding agents that edit their own codebases → They grow a tree of self-modifications through expansion strategies that favor higher software engineering benchmark performance, assuming that this implies more promising subsequent self-modifications. 

- However, we identify a mismatch between the agent’s self-improvement potential (metaproductivity) and its coding benchmark performance, namely the Metaproductivity-Performance Mismatch.

<br>

> *In the context of recursive self-improvement (RSI), a clade, borrowing from Julian Huxley’s evolutionary thinking, can be understood as a lineage of intelligent systems that share a common ancestor but evolve into increasingly differentiated descendants through successive rounds of self-improvement. Each generation inherits the capabilities and modifications of its predecessors while potentially developing new architectures, strategies, and optimization mechanisms. By analogy with biological evolution, an RSI clade could branch into distinct families of self-improving agents, each following its own evolutionary trajectory while retaining traces of its original design.*

<br>

- Inspired by Huxley’s concept of clade, we propose a metric,  clade-metaproductivity (CMP), that aggregates the benchmark performances of the descendants of an agent as an indicator of its potential for self-improvement. In our self-improving coding agent development setting, access to the true CMP is sufficient to simulate how the Gödel Machine would behave under certain assumptions. We introduce the Huxley-Gödel Machine (HGM), which, by estimating CMP and using it as guidance, searches the tree of self-modifications.

- A central challenge is how to decide which self-modifications to accept. The Gödel machine offers a theoretically optimal answer: accept only modifications that provably increase the expected long-term utility. While this provides a sound blueprint, its reliance on formal proofs makes it practically challenging.

- Recent implementations rely on coding agents that edit their own codebases and favor self-modifications from agents with higher benchmark performance.

- At each step of self-improvement, the system faces a compound decision: whether to expand the tree by generating new agents or to evaluate existing ones. This decision naturally decomposes into three sub-policies: (i) a selection policy that chooses between expansion and evaluation, (ii) an expansion policy that determines which parent to modify, and (iii) an evaluation policy that selects an agent to test. Prior approaches, such as SICA and DGM, conflate these choices. They always expand a parent, create a child, and immediately evaluate that child on multiple tasks. 

- The fixed sequence restricts flexibility: once a new agent is generated, it monopolizes evaluations, even if older agents appear more promising. For instance, an agent that fails nine tasks in a row continues to consume evaluations, while an older agent with partial successes is ignored. HGM breaks this rigidity by decoupling expansion from evaluation. At each step, it adaptively decides whether to generate a new agent or to further probe an existing one, and evaluations are always at the granularity of a single agent–task pair. This finer control enables early stopping on unpromising agents.

<br>

![](/blog/assets/gm7.png)

<br>

---

# 🦾 [DarwinX: Evolving Agent Harnesses Through Natural Selection (Y. Zhang et al., 2026)](https://arxiv.org/pdf/2608.07545)

<br>

- An LLM agent’s capability depends not only on model weights but on its harness: prompts, tools, skills, and control flow. Self-improvement loops already edit harnesses, yet single-lineage search is path-dependent and local wins often regress other tasks.

- DarwinX treats self-evolution as selection over a population of harnesses with the model frozen: a preserve-and-extend contract admits only variants that extend coverage without regressing, an archive keeps alternative lineages for recombination, and failure-, teacher-, and self-derived evidence share one edit interface. Fitness comes from each benchmark’s own verifier: no gold solutions, no hand-picked winners. 

<br>

![](/blog/assets/gm8.png)

<br>

- What is the right selection process for evolving a heterogeneous coding agent? Two failure modes motivate our design. First, path dependence: single-lineage self-editors are biased by early edits and plateau/ Second, cross-task interference: an edit that fixes one family of tasks silently regresses another, so evolution over a mixed task distribution stagnates. The wider that distribution, the sharper the pathology: many prompt and tool changes win on a small subset yet lose on the full benchmark, so the selection criterion must reflect the final benchmark rather than a narrow local objective. Darwin Agent Team respond by isolating variants, keeping task families apart, which contains the interference but leaves the resulting specialists in separate lineages.

- DarwinX treats self-evolution as selection over harness variants: the archive is the substrate, and the selection rule over it is the contribution. Archives of self-modifying agents are by now common ground, inherited from open-ended and quality-diversity search, and DGM is their most prominent agent-side realization. What such systems leave unsettled is how a candidate earns its place. DGM mutates one parent at a time and scores the child against it, so lineages that solve complementary tasks are never brought back together, and a gain carries no obligation to hold what it displaces. DarwinX makes that obligation explicit: it searches the harness rather than whole-agent code, admits a child only under a preserve-and-extend contract that bounds what a win may cost elsewhere, and recombines complementary specialists across lineages. 

- The harness spans two editable layers: skill (prompts, memory, and distilled knowledge) and code (tools, control flow, and the agent loop). Freezing the model isolates these layers as the sole locus of improvement. Its central design choice is to separate exploration from confirmation.

<br>

![](/blog/assets/gm9.png)

<br>


- A child harness has to earn its place: it must measurably improve on at least one task without giving up more than a small tolerance of what its parent solved. A verifier decides whether the evidence is strong enough to trust, and only a re-tested child may steer later rounds, so a lucky result cannot redirect the search.

- Each round picks a promising harness from the archive and asks for one small addition aimed at a task the agent currently fails. The addition survives only if everything that worked before still works, so capabilities accumulate instead of trading one for another.

- Different branches get good at different things, so DarwinX keeps all of them, including the losers: a variant that is worse on average may be the only one that cracks a particular task. Complementary variants are merged, and the merged child is kept only if it inherits the wins of both parents, so a merge can only add coverage.

<br>

![](/blog/assets/gm10.png)

<br>

- The same framework holds across four regimes of increasing separation between evolution signal and test, for an average gain of about 17 points, the model frozen throughout. Terminal-Bench 2.1 rises from 75.5% to 83.2% on GPT-5.5, and to a leaderboard-frontier 84.7% on GPT-5.6 Sol; TerminalWorld held-out from 25 to 28 of 41  tasks, the best result on the split; WebArena-Infinity audit-clean pass@1 from 43.5% to 93.0% as invalid trajectories fall from 293 to 17, so capability and compliance improve together; and Terminal-Bench 2.1 harness run unchanged on SWE-bench Verified reaches 84.2% with no in-domain feedback. TerminalWorld also gives the clearest evidence for the population design: specialists solve 24 to 27 of the held-out tasks, and the merged harness beats every one.

<br>

---

### We are now ready for chapter 3️⃣ of this series, where we can connect these ideas to current developments. Thank you to all these brilliant minds for proving that humankind can be truly marvelous. Until next time!

### ⬛️

