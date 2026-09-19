---
title: 📊 PAPERS → On Multiplayer Agents 1️⃣ of ♾️
subtitle: Audience: Intermediate to Advanced AI Scientists/Engineers | Today's Word: Solace
date: 2026; 09; 19
---

> [🎼](https://www.youtube.com/watch?v=w6Z8JfXjc4k) *"What is past is prologue."* — William Shakespeare, The Tempest

> [🎶](https://www.youtube.com/watch?v=-X3klDNV0VE) *"And now that you don't have to be perfect, you can be good."* — John Steinbeck, East of Eden

<br>

✨ *I am grateful for being able to* [***do what I love***](https://marina.nullstar.fun/)*. I am grateful that there are always new open questions in science and technology. I am grateful that my consciousness allows me to comprehend these ideas. I am grateful that I am safe, healthy, and alive. I am grateful for all the beautiful and good people in the world. I am grateful for the sky, for all the stars, for all the sunsets, for all the birds and animals, for sushi, for morning coffees, for comfortable black hoodies, for new good songs coming out every week, for artists, for poets, for innocence, for forgiveness, for optimism, for love, for dreams, for laughs, for good nights of sleep, for never knowing what's in store for tomorrow. I am grateful for all the days I have ahead of me. I am grateful for my liberty and privacy.* ✨

<br>

![](/blog/assets/kusama.jpg)

<br>

This is going to be a great **[happy](https://www.youtube.com/watch?v=Gk2ArbsrZwE)** weekend. I am going to spend dreaming, **[praying](https://gist.github.com/von-steinkirch/f4fce2f49fa582e8fe458539ece20a93#9%EF%B8%8F%E2%83%A3-yom-kippur-prayer)**, fasting, and researching. Maybe coding a little bit :).

Today, we will be reviewing a few papers related to one of my current main areas of interest: collective (super)intelligence and multiplayer agents. The backlog is large, but this is fun and we have our whole lives ahead of us.


As I read through the material, I wrote down a few highlights — with a moderate attempt at coherence — for my personal inventory and delight (and perhaps as a way to connect with other friendly AI scientists and builders out there who love talking about the same things). As always, remember the rules:

**🤖 If you see a 👾, it means I found something particularly cool or learned something new.**
**🤖 If you see a ✨, it means things that are so cool that they need a lil glitter around them.**
**🤖 If these notes look cool to you, it's your ✦moral duty✦ to read the original resources.**
**🤖 Just another blog, but not your usual blog: they're living notes that I change as I fancy.**

<br>

---

## 🪂 [Self-Consistency Improves Chain of Thought Reasoning in Language Models (2023)](https://arxiv.org/abs/2203.11171)

<br>

> Chain-of-thought prompting combined with pre-trained large language models has achieved encouraging results on complex reasoning tasks. In this paper, we propose a new decoding strategy, self-consistency, to replace the naive greedy decoding used in chain-of-thought prompting. It first samples a diverse set of reasoning paths instead of only taking the greedy one, and then selects the most consistent answer by marginalizing out the sampled reasoning paths. Self-consistency leverages the intuition that a complex reasoning problem typically admits multiple different ways of thinking leading to its unique correct answer.

<br>

![](/blog/assets/ma_5.png)

<br>

--- 

## 🪂 [Language Models are Super Mario (2024)](https://arxiv.org/pdf/2311.03099v3)

<br>


> Language Models (LMs), similar to Apocalypse and Super Mario, can enhance their capabilities by absorbing other models without the need for retraining or even GPUs.

<br>

![](/blog/assets/ma_3.png)

<br>

> Discussed the extremely redundant properties of SFT delta parameters in LMs and proposed a simple approach DARE to effectively reduce the number of delta parameters needed for SFT without any data, retraining, or even GPUs. DARE can impressively drop 90% or even 99% SFT delta parameters without sacrificing much performance compared with using all SFT delta parameters. We further employed DARE as a versatile plug-and-play approach for existing model merging methods to merge multiple task-specific fine-tuned models into a single model with diverse abilities. Extensive experimental results on both encoder- and decoder-based LMs demonstrated the effectiveness of DARE in reducing SFT delta parameter redundancy and facilitating the model merging performance. We also provided a deeper analysis of why DARE works as well as the prerequisites for using DARE. We hope that our findings can advance the understanding of model alignment from the perspective of analyzing model parameters.

<br>

---

## 🪂 [A Survey on the Memory Mechanism of LLM based Agents (2024)](http://www.alphaxiv.org/pdf/2404.13501)

<br>


> In the agent-environment interaction process, there are three key phases, that is, (1) the agent perceives information from the environment, and stores it into the memory; (2) the agent processes the stored information to make it more usable; and (3) the agent takes the next action based on the processed memory information. In all these phases, memory plays an extremely important role.

<br>

![](/blog/assets/ma_1.png)

<br>

> The textual memory stores raw information about the agent-environment interactions, which is more comprehensive and detailed. However, it is constrained by the token limitation of LLM prompts, which makes the agent hard to store extensive information. In contrast, the parametric memory is not limited by the prompt length, but it may suffer from information loss when transforming texts into parameters, and the complex memory training can bring additional challenges.

> For textual memory, each LLM inference requires to integrate memory into the context prompt, which leads to higher costs and longer processing times. In contrast, for parametric memory, the information can be integrated into the parameters of the LLM, eliminating the extra costs of these contexts. However, parametric memory takes additional costs in the writing process, but textual memory is easier to write, especially for small amounts of data. In a nutshell, textual memory is more efficient in writing, while parametric memory is more efficient in reading.

> Textual memory is usually more explainable than the parametric one, since natural languages are the most natural and straightforward strategies for humans to understand, while parametric memory is commonly represented in latent space. Nevertheless, such explainability is obtained at the cost of information density. This is because the sequences of words in textual memory are represented in a discrete space, which is not as dense as continuous space in parametric memory.

<br>

![](/blog/assets/ma_2.png)

<br>

> Although parametric memory holds great prospects, it currently faces numerous challenges. Foremost among these is the issue of efficiency: how to effectively transform textual information into parameters or modifications of parameters is a critical question. Presently, researchers can transfer vast amounts of domain knowledge into the parameters of LLMs by SFT. However, it is time-consuming and requires extensive text corpus, making it unsuitable for situational knowledge. One viable approach is to employ meta-learning to let models learn to memorize. Moreover, the lack of interpretability associated with parametric memory can be a hindrance, especially in domains requiring high levels of trust, such as medicine. Therefore, enhancing the credibility and interpretability of parametric memory is an urgent issue that needs to be addressed.

<br>

---

## 🪂 [Trinity: An Evolved LLM Coordinator (2026)](https://arxiv.org/pdf/2512.04695)

<br>

> Lightweight coordinator that orchestrates collaboration among large language models (LLMs). The coordinator, comprising a compact language model (≈ 0.6Bparameters) and a lightweight head (≈ 10K parameters), is optimized with an evolutionary strategy for efficient and adaptive delegation. 

<br>

![](/blog/assets/ma_4.png)

<br>

> Theoretical and empirical analyses highlight two key factors driving this success: (1) the coordinator’s hidden-state representations provide rich contextualization of inputs, and (2) under high dimensionality and strict budget constraints, the separable Covariance Matrix Adaptation Evolution Strategy algorithm provides substantial advantages over RL, imitation learning, and random search, leveraging potentA prominent line of work involving large language models (LLMs) aspires to scale in line with empirical scaling laws, targeting gains by enlarging model size, training tokens, and compute. Yet the extent to which such scaling remains efficient and yields sustained returns is uncertain and often resource intensive. An alternative at the micro level is model merging, which seeks parameter-level integration. However, this approach is frequently impractical due to architectural incompatibilities and the closed-source nature of many high-performing models. In light of these limitations, we adopt a macro-level approach: test-time model composition via coordination, which fuses the complementary strengths of multiple state-of-the-art models from diverse providers without modifying their weights. Leveraging prior data and training investments, this coordination can deliver performance improvements without retraining individual models.ial block-ε-separability.

> A prominent line of work involving large language models (LLMs) aspires to scale in line with empirical scaling laws, targeting gains by enlarging model size, training tokens, and compute. Yet the extent to which such scaling remains efficient and yields sustained returns is uncertain and often resource intensive. An alternative at the micro level is model merging, which seeks parameter-level integration. However, this approach is frequently impractical due to architectural incompatibilities and the closed-source nature of many high-performing models. In light of these limitations, we adopt a macro-level approach: test-time model composition via coordination, which fuses the complementary strengths of multiple state-of-the-art models from diverse providers without modifying their weights. Leveraging prior data and training investments, this coordination can deliver performance improvements without retraining individual models.

> To ensure the coordinator remains lightweight and offloads complex skill acquisition, TRINITY assigns the selected agent one of three distinct roles: (1) a thinker to devise high-level strategies and decompositions; (2) a worker to perform concrete problem-solving steps; and (3) a verifier to evaluate the current solution’s soundness and completeness.

<br>

----

## 🪂 In the backlog for the next times...

<br>

* [Collective Intelligence for Deep Learning: A Survey of Recent Developments](https://arxiv.org/abs/2111.14377)

* [Tree of Thoughts: Deliberate Problem Solving with Large Language Models (2023)](https://arxiv.org/pdf/2305.10601)

* [Improving Factuality and Reasoning in Language Models through Multiagent Debate](https://arxiv.org/abs/2305.14325)

* [Retrieval Augmented Conversational Recommendation with Reinforcement Learning (2026)](https://arxiv.org/abs/2604.04457)

* [Multi-Agent Collaboration via Evolving Orchestration (2025)](https://arxiv.org/pdf/2505.19591)

* [Evolutionary Optimization of Model Merging Recipes (2025)](https://arxiv.org/pdf/2403.13187)

* [GPTSwarm: Language Agents as Optimizable Graphs (2024)](https://arxiv.org/pdf/2402.16823)

* [Revisiting Model Stitching to Compare Neural Representations](https://arxiv.org/pdf/2106.07682)

* [Self-Refine: Iterative Refinement with Self-Feedback](https://arxiv.org/abs/2303.17651)

* [ReAct: Synergizing Reaction and Acting in Language Models (2023)](https://arxiv.org/pdf/2210.03629)

* [MasRouter: Learning to Route LLMs for Multi-Agent Systems (2025)](https://arxiv.org/abs/2502.11133)

* [Tool Learning with Large Language Models: A Survey](https://arxiv.org/pdf/2405.17935)

* [Michelangelo: Long Context Evaluations Beyond Haystacks via Latent Structure Queries](https://arxiv.org/pdf/2409.12640)

* [RouterDC: Query-Based Router by Dual Contrastive Learning for Assembling Large Language Models](https://arxiv.org/abs/2409.19886)

* [SMOOTHIE: Label Free Language Model Routing](https://arxiv.org/pdf/2412.04692)

* [Mixture-of-Agents Enhances Large Language Model Capabilities](https://arxiv.org/pdf/2406.04692)

* [Automated Design of Agentic Systems](https://arxiv.org/abs/2408.08435)

* [Learning to Orchestrate Agents in Natural Language with the Conductor](https://arxiv.org/abs/2512.04388)

* [CharXiv: Charting Gaps in Realistic Chart Understanding in Multimodal LLMs](https://arxiv.org/pdf/2406.18521)

<br>

### ⬛️

