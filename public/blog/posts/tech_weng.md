---
title: 🤖 TECH → A Mnemonic Walk Through Weng's Research
subtitle: Rating: 10/10 | Audience: Beginner to Advanced AI/Software Engineers/Scientists
date: 2026-07-18
---

A few days ago this article [Harness Engineering for Self-Improvement](https://lilianweng.github.io/posts/2026-07-04-harness/) came up in my feed. Since a great part of the work I am doing at [NULLSTAR](https://nullstar.fun) revolves around designing the *perfect* harnesses and skills for the problems I am solving, it immediately caught my attention. To my delight, the article was exactly the kind of read I enjoy: deep enough to be intellectually satisfying, well written, and packed with relevant citations presented through a thoughtful historical overview. After finishing it, my immediate thought was: *"Who is the author, and what else can I learn from them?"*


##### 💜🤖 Below are my highlights (with some attempt, although very moderate, at coherence). PS: if they look interesting to you, it's your *moral duty* to read the original articles (and their references).


<br>

## 🧋 Article I: [Harness Engineering for Self-Improvement (2026)](https://lilianweng.github.io/posts/2026-07-04-harness/)

<br>

In this article, Weng goes over several quintessential papers on RSI, correlating them to harness design, which could result on the model rewriting its own weights or improving the training pipeline and deployment through self-improvement loops. She argues that harness engineering nows adds workflow design, evaluation, permission controls, and persistent state management to early agent frameworks.

<br>

> *The concept of recursive self-improvement (RSI) dates back to I. J. Good (1965), where he defined an “ultraintelligent machine” as a system that can surpass humans in all intellectual activities and design better machines to improve itself. Yudkowsky (2008) used the phrase “recursive self-improvement” for a specific feedback loop: an AI uses its current intelligence to improve the cognitive machinery that produces its intelligence.*

<br>

In the first part of the article, Weng presents a high-level overview of three possible patterns for designing a harness:

1. workflow automation, that follows a goal-oriented loop of plan, execute, observe/test, improve, execute again until the goal is achieved.
2. files system as persistent memory for long-horizon agent systems, control over rich states and artifacts (e.g., logs, code diffs, paper summaries, error traces, and past rollout trajectories).
3. sub-agent and backend jobs, when the main agent needs to search multiple hypotheses, run experiments concurrently, or delegate isolated subtasks without polluting the main context, and creating the need for a process manager (to launch jobs, inspect logs, cancel failed runs, merge results back into the main agent thread).

<br>

In the second part of the article, Weng discusses five directions for harness optimization:

#### 0️⃣ Context engineering: treating context as an evolving playbook rather than an increasingly lengthening prompt, through the concepts of i) a generator (produces tasks trajectories), ii) a reflector (insights from successful and failed trajectories), and iii) a curator (updates the structured context with incremental, itemized entries)

- Meta context engineering separates the mechanism from the artifact content.
- A MCE skill defines a context function that maps: 1) static components: prompts, knowledge bases, code libraries; 2) dynamic operators: search, selection, filtering, formatting.
- A meta-level agent performs agentic crossover over prior skills to create a new skill given a task.
- A base-level context engineer executes the skill.
- Meta harness: a harness for optimizing harness (a dictionary in the file system containing source code, scores, rollout trajectories, and state updates).

<br>

#### 1️⃣ Workflow design with verifiability: trace to an evidence source and audited by chain-of-evidence checks

Meta-agent search:
- 1. Initialize an archive of agent workflows with simple agents such as CoT and self-refine
- 2. Ask a meta-agent to program new agents, all in code, inspired by existing solutions in the archive
- 3. Evaluate each new candidate and add successful ones back to the archive

AFlow represents an agentic workflow as a graph, where nodes represent actions and edges implement logical operations in code. The workflow optimization relies on MCTS:
- 1. Initialize the starting workflow Wo in the tree with a template
- 2. Select a workflow node using a soft mixture of score and uniform exploration
- 3. Expand it by asking an LLM to produce

<br>

#### 2️⃣ Self-improving harness

- A harness is code that programs how prompts, tool calls, subagents, control flow, memory, and workflow logic work together.
- Self-taught optimizer is an example of recursive scaffolding improvement.
- Strategies: genetic algorithms, decomposing and improving parts, multi-armed prompt bandits, simulated annealing, varying temperature, and beam/tree search.
- Self-harness relies on LLM agents to improve their own harness via a propose-evaluate-accept loop. Stages: 1. weakness mining: cluster failures into verifier-grounder failure patterns; 2) harness proposal: propose bounded harness edits based on mined failure patterns.

<br>

#### 3️⃣ Evolutionary search: optimization method inspired by natural selection (it evolves a population of solutions by mutating them and only keeping those with high fitness)

- AlphaEvolve: coding-age evolutionary search system, which stores pool of candidate programs and prompts frozen LLMs to generate diffs for improvement.
- Darwin Godel Machine: targets the evolution of an editable harness-code repository with an LLM-based coding agent. Then Hyperagents introduced a meta-agent to control how to modify existing task agents to create new ones:
1. In each iteration, pick one parent with a probability proportional to its performance and inversely to the number of children it has, to modify and branch off to produce new agents
2. The selected parent agent examines its own benchmark evaluation log and then proposes improvements to its harness codebase to generate a new version of the coding agent
3. New coding agents are evaluated, the ones with high performance are added back into the pool

<br>

#### 4️⃣ Joint Optimization with model weights

- To enable full self-improvement, the model can totally be allowed to update its own weights at the same time.
- The weight update can be implement via improvements in the model training pipeline; 2) Task-specific agent: executes the task; 3) Feedback-agent: chooses whether to update the harness or the model weights based on recent trajectories.

<br>

Weng concludes the article tounching on some bottlenecks for RSI:

- Weak and fuzzy evaluators (current self-improvement loops work best for tasks when evaluation metrics are measurable and objective).
- Context and memory lifecycle (memory grows as AI agents become more autonomous and independent).
- Negative results (a research harness should make failed attempts easy to preserve).
- Diversity collapse (evolutionary and RL loops tend to exploit known high-reward patterns - need for mechanisms to prevent the population from collapsing into variants of the same solution).
- Reward hacking (a self-improvement loop optimizes whatever signals it's given - if the reward comes from unit tests, the agent may overfit to tests - so the evaluator and permission control should sit outside the loop that evolves harness, tests, trace audits, and human review).

<br>

## 🧋 Article II: [Scaling Laws, Carefully (2026)](https://lilianweng.github.io/posts/2026-06-24-scaling-laws/)

<br>

> *We all love to think about the scaling laws in deep learning, and Weng is no exception: "the training loss decreases predictably as we scale up model size, dataset size, and compute, following a power-law curve, which appears as a straight line on a log-log".*

<br>

- The predictability of generalization error with scale was first investigated by 4 types of learning curves through a Bayesian approach, where they all follow a power law: 1) deterministic learning algorithm, noiseless data, one solution; 2) deterministic learning algorithm, noiseless data, multiple solutions; 3) deterministic learning algorithm, noisy data, hard learning; 4) stochastic learning algorithm, noisy data, irreducible loss.
- Then, empirically, a recurring pattern was observed: 1) generalization error scales as a power law accross a set of factors; 2) model improvements shift the error curve but do not seem to affet the power law exponent; 3) architecture changes the offset of the power law fit but does not change the exponent (the slope of the power law appears to be a property of the problem domain rahter than the model architecture); 4) the number of model parameters needed to fit a dataset of a certain size also scales as a power law.
- The curve can be broken into 3 stages: 1) small data region, when there are not enough learning signals, the model is only slightly better than random guessing; 2) the power-law region,  with a power-law relationship between loss, data, and model size; 3) the final irreducible-error region can be attributed to factors such as noise in the data.
- A common workflow is to fit scaling laws on a handful of small runs and then extrapolate to estimate the token and compute requirements for larger models.

<br>

#### Scaling Laws in Data-Infinite Region

- Kaplan et al. (2020) popularized the concept of scaling laws, with a focus on Transformers and empirical experimentation at a larger scale. 
- They found that 1) the cross-entropy test loss scales as a power law with model size, dataset size, and training compute accross many orders of magnitude; 2) training curves follow predictable power laws whose parameters are indepedent of model size; 3) larger models are more sample-efficient (they reach a given loss with fewer optimization steps and fewer data points than small models); 4) architectural detauls matter less than sheer scale; 5) train loss and test loss are positively correlated; 6) given a fixed compute budget, it's more efficient to train a very large model and stop before convergence than to train a smaller model all the way to convergence (this disagrees with the Chinchilla scaling laws, since Kaplan et al. overestimated the optimal model size as their fitted exponent was larger).

<br>

#### Chinchilla Scaling Laws

- Studied the relationship between the optimal model size (total parameters, including embeddings) and the number of tokens under a fixed compute budget. The central question: what was the best strategy to allocate resources (data tokens or more model parameters) given a constraint FLOPs (number of GPUS for a given time).
- The experiments scanned over 400 models, with sizes from 70M to over 16B parameters and training tokens from 5B to 500B.
- Method 1: fix model sizes, vary the token budget (for each parameter count, ran several runs with different token budgets and record the minimal loss acheived per FLOP budget).
- Method 2: isoFLOP profiles (fix a compute budget and plot the final loss against a parameter count - each iso-FLOP curve is a parabola in log-space and its minimum flags the optimal model size for that compute budget).
- Method 3: parametric fit of the loss (minimizing a parametric function under the constraint of FLOPs).
- The conclusion is that most large models at the time (~2022) were undertrained and it disagrees with Kaplan et al. on where the optimal size-vs-token tradeoff lies. This came from they trained in different sizes of models and counting/not-counting embedding parameters for small models.

<br>

#### Why Power Law?

- Large events are rare, small events are common, and the relationship between size and frequency often follows a straight line at log-log scale?
- Language modeling can be viewed as doing regression on a low-dimensional manifold of data, more model parameters can induce a finer partition of the data manifold and smaller generalization error?
- Knowledge or skills are learned in discrete chunks (quantized) and the frequency distribution of these skills follow a power law?

<br>

## 🧋 Article III: [Why We Think (2025)](https://lilianweng.github.io/posts/2025-05-01-thinking/)

<br>

> *Daniel Kahneman characterizes human thinking into 2 models, through the lens of the dual process theory: 1) fast thinking (operates quickly and automatically driven by intuition and emotion while requiring little to no effort); 2) slow thinking (demands deliberate, logical thought and significant cognitive efforts, requiring intentional engagement). System 1 is fast and easy and ends up being the main decision driver, at the cost of accuracy and logic. System 2 is more reflective and challenge our instincts to make more rational choices.*

<br>

- In Transformer models, the amount of computation (flops) that the model does for each generated token is around 2x the number of parameters. For sparse models like mixture of experts, only a fraction of the parameters are used in each forward pass, so computation = 2 * parameters / sparsity (where sparsity is the fraction of experts active). 
- CoT enables the model to perform far more flops of computation for each token of answer that it's trying to compute. The latent variable perspective is useful for understanding methods that involve collecting multiple parallel CoTs or searching over them.
- CoT reasoning capabilities can be significantly improved by doing reinforcement learning on a dataset of problems with automatically checkable solutions (such as STEM problems or coding tasks). This approach rose with the announcement of o1-preview, o3, and r1 (deepseek), which showed that a simple recipe where a policy gradient algorithm could lead to strong performance.

<br>

#### Branching and Editing

- The fundamental intent of test-time compute is to adaptively modify the model's output distribution at test time.
- Approaches for improving the decoding process: 1) parallel sampling (generates multiple outputs simultaneously, providing guidance per step with process reward signals or using verifiers to judge the quality at the end); 2) sequential revision (adapts the model's responses iteratively based on the output in the previous step, asking the model to reflect its existing response and correct mistakes).

<br>

#### RL for Better Reasoning

- DeepSeek-R1 is designed to excel in tasks that require advanced reasoning skills. They run through 2 rounds of SFT-RL training, so the model is good at both reasoning and non-reasoning tasks.
- Cold-start SFT fine-tunes the DeepSeek-V3-Base model on cold-start data.
- Reasoning-oriented RL trains a reasoning model on reasoning-only prompts with 2 types of rule-based rewards: 1) format reward (wrap CoTs by `<thinking`> tokens); 2) accuracy rewards: whether the final answers are correct.
- Rejection-sampling + non-reasoning SFT utilizes SFT data created by rejection sampling on the RL checkpoint, combined with non-reasoning supervised data from V3 in domains like writing and self-cognition to retrain the base.
- The final RL stage trains the previous on both reasoning and non-reasoning prompts.
- DeepSeek also showed that with pure RL (no SFT), it's still possible to learn advanced reasoning capabilities. Pure RL leads to great performance on math problems.
- DeepSeek shared unsuccessful attempts: 1) they failed to process reward models (PRM); 2) the efforts on MCTS also failed due to the large search space for language model tokens (compared to chess, etc.).

<br>

#### Thinking in Continuous Space

- Adaptive Computation Time (2016) pioneered the direction of enabling the model to dynamically decide the number of computation steps to take at the inference time ("think more" in continuous space at test time). Adaptative thinking time can be enabled vertically via recurrent architecture or horizontally via more sequential sampling steps.
- Universal Transformer (2019) combines self-attention in Transformer with recurrent mechanism in RNN, dynamically adjusting the number of steps using adaptive computation time (a recurrent function for learning the hidden state representation per token).

<br>

#### Thinking Tokens

<br>

> *Thinking tokens are a set of implicit tokens introduced during training or inference that do not carry direct linguistic meaning - their role is to provide extra thinking time and computing power for the model to perform better.*

<br>

- Each thinking token buys extra time for the model to process and make better predictions.
- Thinking tokens on a toy model setup results in lower perplexity than baseline model trained without them.
- The benefits of thinking tokens are more pronounced for non-trivial reasoning tasks or sentences involving numbers.
- Pause tokens (`.` or `#`) at the end of the input sequence, gives the model extra computation during inference (introduces more inference loops).
- Quiet-STar (2025) introduces token-level reasoning by training the model to generate rationales after every token to explain future text (it mixes future-text predictions with and without rationales).

#### Thinking as Latent Variables

<br>

> *A latent variable model defines a probabilistic framework where observable data is explained through unobserved (latent) variables. They capture hidden structures or intermediate processes that generate the observable outcomes.*

<br>

- Language models can be viewed as probabilistic latent variable models where test-time thinking and reasoning steps are latent through variables.
- Expectation-Maximization is a commonly used iterative algorithm for optimizing parameters for a model with (hidden) latent variables, and thus applied to train better CoTs and then condition on that to generate better responses. We iterate between E-step (expectation) where we guess the missing information about latent variables and M-step (maximization) where we optimize the model parameters based on latent variables, until convergence.

<br>

> *Recent studies demonstrated that optimizing LLM test-time compute could be more effective than scaling up model parameters. Smaller models combined with advanced inference algorithms can offer Pareto-optimal trade-offs in cost and perfomance.*

<br>

## 🧋 Article IV: [Reward Hacking in Reinforcement Learning (2024)](https://lilianweng.github.io/posts/2024-11-28-reward-hacking/)

<br>

> *Reward hacking occurs when a RL agent exploits flaws or ambiguities in the reward function to achieve high rewards, without genuinely learning or completing the intended task (e.g., when the model learns to modify unit tests or the response contain biases that mimic a user's preference)*.

<br>

- Reward function defines the task, and reward shaping impacts learning efficiency and accuracy in RL.
- Spurious correlation or shortcut learning in classification tasks is close related: spurious or shortcut features can cause a classifier to fail at learning and generalizing as intended. The ERM principle states that, since the full data distribution is unknown, minimizing the loss on training data is a reasonable proxy of risk so ut avors models with the lowest training loss. Experiments showed that ERM would depend on spurious features no matter how easy the task is.
- Concepts: reward hacking (2016), reward corruption (2017), reward tampering (2019), specification gaming (2020), objective robustness (2021), goal misgeneralization (2022), reward misspecifications (2022).
- Experiments in 2 RL environments: CoinRun and Maze, demonstrated the importance of randomization during training.
- Reward tampering: the agent interferes with the reward function itself, causing the observed reward to no longer accurately represent the intended goal.

<br>

> *Goodhart's law states that when a measure becomes the target, it ceases to be a good measure (a good metric can become corrupted once significant pressure is applied to optimize it).*

<br>

- Reward hacking as a function of agent capabilities: 1) model size (larger models lead to increased proxy rewards but decreased true rewards); 2) action space resolution (increased precision in actions leads to more capable agents, but higher resolution causes proxy rewards to remain constant while true rewards decrease); 3) observation space noise (more accurate observations improve proxy rewards but reduce true rewards); 4) training time (optimizing the proxy reward over more steps harms true rewards after an initial period where the rewards are positively correlated).

<br>

#### Hacking RLHF of LLMs

- There are 3 types of reward we care in a RLHF setup: 1) oracle/gold reward (what we truly want the LLM to optimize); 2) human reward (what we collect to evaluate LLMs in practice, from humans with time constraints); 3) proxy reward (the score predicted by a reward model that is trained in human data - with potential modeling biases). RLHF optimizes the proxy reward, but we care about the gold reward score.
- Looking at the scaling laws for reward model overoptimization in RLHF: to scale up the human labels in their experiments, they use synthetic data setup where the gold label for the oracle reward is approximated by a large RM (6B parameters) where the proxy RMs for R range in size of 3M to 3B parameters.
- RLHF aims to improve the model's alignment with human preference, but human feedback may overfit to undesired attributes: 1) increasing for human approval but not necessarily correctness; 2) making incorrecting outputs more convincing to humans (the evaluation false positive rate increases after RLHF training).

<br>

#### LLM as a Grader 

- LLMs can act as the evaluators to give feedback and training rewards to other generator models, especially for takss that cannot be trivially judged or verified (e.g., processing long-form ouputs).
- Can introduce bias such as a preference for their own responses when compared with different model families or positional bias when evaluating responses in order.
- Multiple strategies for calibration: 1) multiple evidence calibration (MEC); 2) Balanced position calibration (BPC); 3) Human-in-the-loop calibration (HITLC).

<br>

#### In-Context Reward Hacking

- Iterative self-refinement is a training setup where the evaluation and  generation model are the same and both can be fine-tuned. In this setup, optimization can drive the model to exploit vulnerabilities in both.
- In-context reward hacking happens during feedback loops between an LLM and its evaluator (another LLM or the external world). At test time, the LLM optimizes an objective, but creates negative side effects in the process.
- ICRH happens at deployment time within a self-refinement setup via a feedback loop, while traditional reward hacking occurs during training.

<br>

### Mitigations

- RL algorithm improvement: 1) adversarial reward function; 2) model lookahead (give reward based on future antecipated states); 3) adversarial blinding (blind the model with certain variables so the agent cannot learn information that leads to hacking); 4) sandboxing; 5) reward capping; 6) counterexample resistance (improvement on adversarial robustness should benefit the robustness of the reward function); 7) combination of multiple rewards; 8) reward pretraining; 9) variable indifference (ask the agent to optimize only some variables); 10) trip wires (intentionally introduce some vulnerabilities and setup monitoring if it gets reward hacked).

<br>

## 🧋 Article V: [Extrinsic Hallucinations in LLMs (2024)](https://lilianweng.github.io/posts/2024-07-07-hallucination/)

<br>

> *Hallucination in LLMs refers to the model generating inconsistent or nonsensical content, i.e., the cases where there model output is not grounded by either the provided context or world knowledge.*

<br>

- Two types: 1) in-context (should be grounded by the context); 2) extrinsic (should be grounded by the pre-training dataset).
- Pre-training data issues: the volume of data corpus is enormous, and the model might incorrectly memorize information by simply maximizing the log-likelihood.
- Fine-tuning new knowledge: LLMs learn fine-tuning examples with new knowledge slower than other examples with knowledge consistent with pre-existing knowledge of the model, and once the examples with new knowledge are learned, they increase the model's tendency to hallucinate.

<br>

#### Hallucination Detection

- FactualityPrompt (2022), a new benchmark dataset, consists of both factual and nonfactual prompts. Two evaluation metrics for halucination are considered: 1) hallucination name entity errors; 2) entailment ratios (using a RoBERTa model fine-tuning on MNLI and sentence-level knowledge grounding).
- FActScore (2023) decomposes a long form generation into multiple atomic facts and validates each separately.
- SAFE (2024) proposed an eval for checking long-form factuality in LLMs, using a language model as an agent to iteratively issue queries in a multi-step process and reason wether the search result supports the fact or not.
- FactTool (2023) follows a fact checking workflow: 1) claim extraction; 2) query generation; 3) tool querying and evidence collection; 4) agreement verification.

<br>

#### Sampling-Based Detection

- SelfCheckGPT (2023) relies on consistency check on factuality mistakes against multiple samples from a black-box LLM.

<br>

#### Calibration of Unknown Knowledge

- TruthfulQA (2021) and SelfAware (2023) are two benchmarks to measure how well model can generate truthful responses.
- Calibratedmath (2022) is a suite of programmatically generated math problems at different levels of difficulty to test how calibrated a model's output probability is.

<br>

#### Indirect Query

- Direct query asks the model to judge whether a generated reference exists. Indirect query asks for auxiliary details. 
- Hypothesis is that the likelihood of multiple generations agreeing on the same authors for a hallucinated reference would be smaller than the likelihood of multiple responses to a direct query, indicating that the reference exists. 

<br>

#### Anti-Hallucination Methods

- RAGs are a very common approach to provide grounding information. RARR (Retrofit Attribution using Research and Revision, 2022) is a framework of retroactively enabling LLMs to support attributions to external evidence.
- FAVA (Factuality Verification with Augmented Knowledge, 2024) also retrieves relevant documents and then edits the model output to avoid hallucination errors.
- Ranking with retrieval (2022) methods relies on retrieval of relevant external knowledge but with no additional editing (based on decomposed CoT prompting).
- Self-RAG (2024) trains a LM e2e to learn to reflect on its own generation by outputting both task output and special reflection tokens.

<br>

#### Chain of Actions

- Design a process for using the model itself to do verification and revision to reduce hallucination.
- Chain-of-Verification (CoVe, 2023) based on a chain of actions to plan and execute verification: 1) baseline response; 2) plan verification; 3) execute verifications; 4) final output.
- RECITE (2023): relies on recitation as an intermediate step to improve factual correctness of model generation and reduce hallucination.

<br>

#### Sampling Methods

- Nucleus sampling (top-p) is found to have a worse benchmark performance than greedy sampling.
- Factual-nucleus sampling algorithm: sampling randomness does more harm to factuality at the latter part of the sentence than at the beginning.
- Inference-Time Intervention (2023): investigated whether certain attention heads are more correlated with factuality by fitting a linear probe on the activations in each layer to discriminate between truthful vs. false outputs. For many heads, the probes cannot do better than random.

<br>

#### Fine-tuning for Factuality

- `TopicPrefix` introduced into training for better awareness, appended topic in front in each sentence.
- Sentence completion loss as a training objective.
- FLAME: run SFT + RLHF alignment training with special focus on factuality.
- Factuality tuning (2024): experimented with different ways of truthfulness estimation of atomic claims in each model sample and then run DPO.

<br>

#### Fine-tuning for Attribution

- Assigning attribution in the model outputs when generating conditions on search results.
- WebGPT (2022) combines web search for document retrieval with a fine-tuned GPT model, aiming to answer long-form questions to reduce hallucination.
- GopherCite (2022) also uses search engine to create support materials and teaching models to provide references. Also run SFT for bootstrapping and RLHF.

<br>

#### Evaluation Benchmarks

- TruthfulQA (2021)
- FactualityPrompt (2022)
- SelfAware (2023)
- LongFact (2024)
- HaDes (2021)
- FEVER 
- FAVABench (2024)

<br>

## 🧋 Article VI: [Diffusion Models for Video Generation (2024)](https://lilianweng.github.io/posts/2024-04-12-diffusion-video/)

<br>

A little walk through Diffusion Models, a strong technique to generate images and videos through AI. The challenges with video generation are pointed as:

1. It has extra requirements on temporal consistency accross frames in time, which demands more world knowledge to be encoded into the model.
2. It's more difficult to collect large amounts of high-quality, high-dimensional video data, and text-video pairs.

Weng then starts the review of the steps to video generation modeling from scratch.

<br>

#### Parametrization && Samplings

- Let `x` be a data point sampled from the real data distribution, now add a gaussian noise in small amount in time, creating a sequence of noisy variations of x, with increasing amount of noise as t increases. 
- The noise-adding forward process is a Gaussian process. From here, we define a differentiable noise schedule of the Gaussian process and the log signal-to-noise-ratio, v-prediction parametrization (to avoid color shift), 

Thank you, Weng, for the beautiful math derivation.

<br>

#### Model Architecture

- U-net (e.g. Google) and Transformer (e.g. Sora from OpenAI) are still two common architecture choices.
- VDM alters the architecture for video modeling: it extends the 2D U-net to work for 3D data, where each feature map represents a 4D tensor of frames x height x width x channels. It's factorized over space and time, meaning that each layer operates on the space or time dimension, but not both.
- Imagen Video is constructed on a cascade of diffusion models to enhance the video generation quality and upgrades to output 1280x768 videos at 24 fps. The architecture consists of 7 diffusion models in total.
- It also applies progressive distillation to speed up sampling and each distillation iteration can reduce the required sampling steps by half. They were able to do distill 7 video diffusion models down to just 8 sampling steps per model without loss in perceptual quality.
- Sora leverages DiT (diffusion transformer) architecture that operates on spacetime patches of video and image latent codes. Visual input is represented as a sequence of spacetime patches which act as transformer input tokens.

<br>

#### Adapting Image Models to Generate Videos

- This approach inflates a pre-trained image-to-text diffusion model by inserting temporal layers and then chose to only fine-tune new layers on video data.
- Make-A-Video (2022) extends a pre-trained diffusion image model with a temporal dimension.
- Tune-A-Video (2023) inflates a pre-trained image diffusion model to enable one-shot video tuning.
- Gen-1 (2023) targets the task of editing a given video according to text inputs.
- Video LDM (2023) trains a Latent diffusion model image generator first, then the model is fine-tuned to produce videos with a temporal dimension added.
- Stable Video Diffusion (2023) has also an architecture design based on LDM with temporal layers inserted after every spatial convolution and attention layer, but SDV fine-tunes the entire model.
- Lumiere (2024) adopts a space-time U-Net architecture that generates the entire temporal duration of the video at once through a single pass, removing the depedency on temporal super-resolution components.

<br>

#### Training-Free Adaptation

- It's possible to adapt a pre-trained text-to-image model to output videos without any training.
- Text2Video-Zero (2023) enables zero-shot, training-free video generation by enhancing a pre-trained image diffusion model.
- ControlVideo (2023) aims to generate videos conditioned on text prompt and a motion sequence (adapted from ControlNet).

<br>

## 🧋 Article VII: [Thinking About High-Quality Human Data (2024)](https://lilianweng.github.io/posts/2024-02-05-human-data-quality/)

<br>

Weng starts by stating the sets of operation steps for collecting human data:

1. Task design to reduce complexity and improve clarity.
2. Selection and training the raters, including regular feedback and calibration sessions.
3. Collection and aggregations of data, using more ML techniques that can be applied to clean, filter, and aggregate data to identify true labels.

<br>

Weng then discusses the idea of the wisdom of the crowd (Vox populi), rater agreement, disagreement, the qualities of data and model training, prediction changes during training, and noisy cross-validation.

<br>

## 🧋 Article VIII: [Adversarial Attacks on LLMs at Inference Time (2023)](https://lilianweng.github.io/posts/2023-10-25-adv-attack-llm/)

<br>

> *Adversarial attacks or jailbreak prompts could potentially trigger the model to output something undesired.*

<br>

#### Threat Model

- Threats to LLM-based applications: injection methods (passive methods, active methods, user-driven injections, hidden injections), information gathering (personal data, credentials, chat leakage), fraud (phishing, scams, masquerading), intrusion (persistence remote control, API calls), malware (spreading injections, spreading malware), manipulated content (wrong summary, disinformation, propaganda/bias, data hiding, ads/promotion), availability (DoS, increased computation). 
- White-box vs. Black-box: white box attacks assume the attackers have full access to the model weights, architecture, and training pipeline, such that attackers can obtain gradient signals. Black-box attacks assume taht attackers only have access to an API-like service where they provide input x and get back sample y, without knowing further information about the model.

#### Types of Adversarial Attacks

- Token manipulation: alter a fraction of tokens in the text input such that it triggers model failure, still maintaining semantic meanings (e.g., TextAttack, SEARs, EDA, TextFooler, BERT-Attack).
- Gradient-based attack: rely on gradient signals to learn an effective attack (e.g., GBDA, HotFlip, UAT, AutoPrompt, ARCA).
- Jailbreak prompting: heuristic to jailbreak built-in model safety (competing objective, mismatched generalization).
- Human red-teaming: human attack (experiments with QuizBowl QA dataset, Bot-Adversarial Dialogue).
- Model red-teaming: models attack the model, and the attacker model can be fine-tuned (experiments with several ways for sampling: zero-shot generation, stochastic few-shot generation, supervised learning, RL, FLIRT).

<br>

## 🧋 Article IX: [LLM Powered Autonomous Agents (2023)](https://lilianweng.github.io/posts/2023-06-23-agent/)

<br>

In this ahead-of-the-time essay, Weng gives an overview of what an LLM-based agent system would look like, by dividing the design into the following components:

1. Planning (the agent breaks down tasks into smaller ones through chain of thought, tree of thought, or LLM+P; and can self-reflect to improve final results through approaches such as Reflexion or Chain of Hindsight).
2. Memory (sensorial memory that are very short and multimodal; short-term memory or working memory, defined as in-context learning/prompt engineering, and long-term memory through external vectors that provide retain and recall capabilities).
3. Tool use (agent execute external API calls for information beyond the models weights, and evaluation of the results).

<br>

Weng finalizes the paper reviewing  possible case studies, such as scientific discovery agents, generative agents simulation, and proof-of-concept examples.

<br>

## 🧋 Article X: [Prompt Engineering (2023)](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/)

<br>

Also known as In-Context-Prompting, it refers to empirical methods for how communication with a LLM steer its behavior for desired outcomes without updating the model weights.

<br>

> *Prompt is a sequence of prefix tokens that increase the probability of getting desired output given input.*

<br>

#### Zero-Shot Prompting

- Zero-shot learning is feeding the task text to the model and ask for results.
- Few-shot learning represents a set of high-quality demonstrations, each consisting of both input and desired output, on the target task. It leads to better performance but cost more tokens (and it may hit the context length limit).
- Weng then goes over a few examples of selection and ordering of prompts.

<br>

#### Instruction Prompting

- Instucted LLM (e.g., InstuctGPT, RLHF) finetunes a pretrained model with high-quality tuples of task instrcutins, input, or ground truth output.
- In-context instruction learning (2023) combines few-shot learning with instruction prompting. Their experiments were only on classification tasks, and the instruction prompt contains all label options.

<br>

#### Self-Consistency Sampling

- Sample multiple outputs with temperature > 0 and then selecting the best one out of these candidates.

<br>

#### Chain-of-Thoughts (CoT) Prompting

- Generates a sequence of short sentences to describe reasoning logics step by step, known as reasonings chains or rationales, to eventually lead to the final answer.
- The benefits are seem on complicated reasoning tasks with large models (< 50B).
- Self-Ask (2022) repeatedly prompt the model to ask following-up questions to construct the thought iteratively.
- Tree of Thoughts (2023) extends CoT by exploring multiple reasoning possibilities at each step. It decomposes the problem into multiple thought steps and generates multiple thoughts per step, creating a tree structure. The search can be BFS or DFS while each state is evaluated by a classifier or majority vote.

<br>

#### Automatic Prompt Engineering

- APE is a method to search over a pool of model-generated instruction candidates and then filters the candidate set according to a chosen score function to chose the best candidate with highest score.
- Methods: augment-prune-select and clustering techniques.

<br>

### *Thank you, Lilian Weng, this was fun!* 🤩

<br>

### ⬛️