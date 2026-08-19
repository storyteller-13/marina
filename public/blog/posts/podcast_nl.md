---
title: 📺 PODCAST → Nathan Lambert's Post-Training Lectures
subtitle: Rating: 10/10 | Audience: Intermediate to Advanced AI Scientists/Engineers
date: 2026; 8; 13
---

> **[🎼](https://www.youtube.com/watch?v=3qTDdzmzGPg)** *"Of all existing things, some are in our power, and others are not in our power. In our power are thought, impulse, will to get and will to avoid, and, in a word, everything which is our own doing. Things not in our power include the body, property, reputation, office, and, in a word, everything which is not our own doing."* - Epictetus (~100 AD)

<br>

This week, I looked at the **[very insightful and fresh series on post-training by Dr. Nathan Lambert](https://www.youtube.com/@natolambert)**.

I discovered his work **[early last year](https://www.youtube.com/watch?v=_1f-o0nqpEI)**, and since then, I have been following **[his writing](https://www.interconnects.ai/)**. With the work we are doing at **[NULLSTAR](https://www.nullstar.fun/)** (more specifically, on `MEROPE`, but perhaps a little bit on all of the modules), I found the timing of these lectures very serendipitous. 

He also just released a **[book on RLHF](https://www.amazon.com/Reinforcement-Learning-Human-Feedback-post-training/dp/1633434303?tag=ustxtaddt-20)**, which is in my reading list and will certainly become a post eventually.

<br>

As always:

**🤖 Below are my highlights (for personal inventory), with a moderate attempt at coherence.**
**🤖 If you see a 👾, it means I found something particularly cool or learned something new.**
**🤖 If you see a ⭐️, it means the idea is somehow related to our cool research at NULLSTAR.**
**🤖 If you see a ✨, it means things that are so cool that they need a lil glitter around them.**
**🤖 If these notes look interesting to you, it's your ✦moral duty✦ to watch the original videos.**

<br>

---

## 🐶 Lecture 0 ➡️ [ML Foundations for Post-Training](https://www.youtube.com/watch?v=MMDNaeIFVy8)

<br>

> *A language model learns the joint probability of a sequence of tokens in an autoregressive manner → each prediction depends on the token before it.*

<br>

* Modern LLMs are decoder-only Transformers built on self-attention (each position attends only to itself and preceding positions).

* The LM head → the transformer backbone outputs a hidden state vector per token → the head is a final linear projection from the hidden dimension back to the vocabulary (the tokenizer space).

* Hidden state → LM head → logits (one score per vocab token).

* The same backbone can carry different heads for different jobs → reward-model head: same transformer, new head, new objective.

* Softmax turns the logits at step `t` into the next-token distribution, producing each per-token probability → a whole sequence is the product of these terms → a sum in the log space → every term in the sum is a `log_softmax` of the logits at the true token, which is the (negative) cross-entropy at that position.

* Masking → three different types: 1) causal mask (built into decoder attention), 2) attention / padding mask (tells attention to ignore padding tokens), 3) completion / loss mask (`1` on completion tokens, prompt tokens contribute no loss).

* Sampling generation from the distribution during decoding → same weights but many ways to pick each token: 1) greedy; 2) beam search; 3) temperature; 4) truncated (from top-`k`); 5) lookahead search (MCTS).

* Cross-entropy loss → compares the model’s predicted distribution to the true next-token label.

* Training is measured in optimizer steps / tokens; epochs are a useful unit for finite fine-tuning datasets → the learning-rate schedule matters as much as the rate itself.

* The same backpropagation loop is shared across pre-, mid-, and fine-tuning → what differs is masking, sampling, batching, data construction, and systems (not the optimizer).

* Mid-training → the annealing / high-quality-data phase at the very end of pre-training, before any instruction data → modern post-training pipelines start here.

<br>

> *KL (Kullback-Leibler) divergence → measures how one distribution differs from another. It’s asymmetric, non-negative, and keeps the policy close to its SFT start. The entropy (similar equation on one distribution) is the uncertainty of the distribution, while the cross-entropy is the equation on two distributions.*

<br>

```💡
Cross-entropy(p, q) = Entropy (p) + KL_Divergence(p, q)
```

<br>

* The sum behind KL is intractable, but since KL is an expectation, we can estimate it with Monte Carlo (average the log-ratio over samples drawn from the policy).

* A preference is a binary outcome, so a score difference is squeezed through a sigmoid into a probability → only relative reward differences matter.

<br>

> *The goal of RL is to choose policy parameters that maximize expected reward under the policy itself. A human preference is a single scalar at the end of a response → policy gradients optimize the expected evaluator score anyway, first by learning that signal as a reward model, then by optimizing it → the whole motivation for RLHF: change the model’s distribution over responses toward behavior we want.*

<br>

---

## 🐶 Lecture 1 ➡️ [Post-Training and RLHF Overview ](https://www.youtube.com/watch?v=o6l6tJQgUg4)

<br>

* InstructGPT → made the classic 3-stage recipe canonical:

```💡
1. Instruction fine-tuning (IFT/SFT) 
    → foundations → teaches the model to follow instructions (the format)

2. Reward model
    → learns to score quality from human preferences (the signal)

3. RL against the reward model (re-use preference prompts, PPO optimization) 
    → aligned model: uses those scores to curate better training data (the optimization, which will be replaced with RL)
```

<br>

* **Preference tuning/training landscape** → optimize the same underlying objective but differ in how they move the policy toward higher-reward completions → debates on performance → we don’t have a reward function → the reward model is a proxy, not ground truth (the well-trained RM is corrected with the real user choices, i.e., Goodhart’s law), so overfitting is real.

```💡
- PPO (online RL)
    → generate, score, update policy

- Rejection sampling
    → fine-tune on the best samples (filter, then SFT)
    
- DPO
    → direct gradient for RLHF on preferences (no need to train an extra reward model)
```

<br>

* **In practice:**

```💡
- Sycophancy

- Reward hacking
    → RM score climbs, but quality degrades

- Verbosity bias
    → longer responses score higher
    
- Over-refusal
    → model refuses legitimate queries

- KL penalty helps (limits how far the policy can drift from the reference model)
    → over-optimization is a problem
```

<br>

* **From RLHF to post-training** → evolving into a complex series of steps to get the final, best model.

* Base model → aligned model `N` → reward model / LLM judge → aligned model `N+1` → final model.

* Modern systems keep the same core idea of using multiple optimizers with different strengths and weaknesses, but add more stages, more data, more filtering → and then tools like RLVR and model merging.

* **Frontier** → RL with verifiable rewards → RLVR is much simpler than RLHF because it removes the reward model and replaces it with a verifiable reward → unlocked inference-time scaling → more compute at generation time per problem → a whole new scaling law → o1 and DeepSeek-R1 → notions of agentic models acting.

* **o1** → test-time scaling → how many tokens you spend on the problem → a log-linear relationship between inference compute (number of tokens generated) and downstream performance:

```💡
- Fundamental property of models, unlocked with RLVR

- Can be done in many ways 
    → one long chain-of-thought sequence, multiple agents in parallel, or a mix

- Improving inference-time scaling changes the slope and offset of the curve
```

<br>

---

## 🐶 Lecture 2 ➡️ [RLHF Foundations, IFT, Reward Modeling, Rejection Sampling](https://www.youtube.com/watch?v=4gIwiSPmQkU)

<br>

* Instruction tuning emerges from two parallel research threads:

```💡
1. Unified text-to-text framework
    → T5 framing every NLP task as “text in, text out” worked well

2. Scaling + instruction following 
    → FLAN, T0, and natural instructions 
    → training on diverse tasks with explicit instructions improved zero-shot generalization

3. SFT took off after ChatGPT, Alpaca, OpenAssistant, Tülu 
    → turned instruction tuning into a broadly reproducible open recipe
```

<br>

* Chat templates → the structure of instruction tuning → early chat templates defined 3 roles → system (background instruction, persona, constraints), user (the human's messages), assistant (the model’s response) → the model generates until it produces an end-of-turn token → snippets of Jinja code stored in the tokenizer config.

* Prompt masking → during SFT, predict assistant responses, not user messages:

```💡
- System and user tokens → masked from the loss

- Only assistant completion tokens contribute to gradient updates

- The model learns how to respond, not how to ask
```

<br>

* For multi-turn conversations:

```💡
1. Final-turn only
    → mask everything except the last assistant response

2. All assistant turns
    → mask only user/system tokens, train on every assistant response
```

<br>

- Best practices for instruction tuning:

```💡
- Data quality matters more than quantity:
    → High-quality completions are critical 
    → prompts are masked anyway, model learns from responses 
    → ~1M prompts is sufficient for good RLHF-ready models 
    → SFT prompt quality has DECREASED with reasoning models

- From pre-training:
    → Batch size much smaller
    → Learning rate 1-2 orders lower
    → Loss function → same cross-entropy, but only on unmasked assistant tokens
```

<br>

* Data scaling for IFT → The amount of instruction data needed has evolved rapidly:

```💡
- Early post-ChatGPT 
    → ~10k high-quality human-generated samples could be SOTA
    → Now, large-scale synthetic datasets, quality filtering is essential

- Before 
    → scaling the prompts enabled more performance
    → Now, RMs use more compute and tokens to train, via more tokens per prompt in SFT (and longer context lengths)
```

<br>

* Building SFT data → synthetic completions:

```💡
- Synthetic data has become the dominant approach for building SFT datasets (Wang et al., 2023)
    - Start with N high-quality (human-written) prompts
    - Ask a strong LM to create a modified version
    - Generate completions with another strong LM
    - 10x more training data

- Human data still needed for out-of-distribution or novel tasks (knowledge work)
```

<br>

* The role of reward model in RLHF:

```💡
- The reward model plays the role of the environment
    → it returns a reward signal that tells the policy how well it did

- Difference with RL 
    → in RLHF, we get to control and learn the reward function from human preferences, not FIXED by the environment

- Reward model compresses complex subjective human judgments into a single scalar score
```

<br>

### The Bradley-Terry model of preferences

<br>

* A probability model is a mathematical form that assumes it matches how real judgments work → then we fit its parameters to data → canonical reward from BT model, 1952.

* Given two items `i` and `j`, represents the probability that the judge prefers `i` over `j` → each item has a latent strength, which can be reparameterized using exponentials to work with unbounded scores → shift the probability function to a sigmoid function between two scalars (the difference of rewards for `i` and `j`).

* Only score differences matter → Binary cross-entropy → the reward model is learning to classify which completion was preferred.

* Implemented similarly to a transformer but instead of having the language modeling head, which outputs logits per token in the vocabulary, it appends a linear head that outputs a single scalar (goes from the hidden size of the language model to a dimension `1`):

```💡
- What’s the probability that that is a chosen response? 
    → It’s a latent score/power of the input text

- Gets the reward from chosen and rejected and then calculates the loss

- Reward models are typically trained for only 1 epoch to avoid overfitting to the preference data 
```

<br>

* Preference margin loss → When annotators provide Likert scale ratings, the magnitude of the preference can inform training → encourages the model to produce larger score gaps for strongly preferred pairs.

* `k`-wise loss and balancing comparisons → InstructGPT balances multiple comparisons per prompt to prevent overfitting (also included all prompts in the same batch at training time).

* `k`-wise loss → handles full rankings over `k` completions (`k = 2` reduces to Bradley-Terry).

* Outcome reward models (ORMs):

```💡
- For reasoning tasks, we have verifiable correctness
    → ORMs train a per-token head using the completion-level correctness label repeated across completion tokens

- Key differences from Bradley-Terry
    → no pairwise comparisons needed, just correct/incorrect labels per response
    → the model outputs a per-token probability of correctness, not a single score at the EOS token

- Score at the last token vs. score at every token
    → both start from the same base LM hidden states, the difference is where the head is applied
```

<br>

* Outcome reward model is not the same as a Bradley-Terry model trained on correct vs. incorrect comparisons → different architectures:

```💡
- A BT model trained on correct/incorrect pairs is still a preference RM
    → uses correctness as the preference signal
    → a true ORM has a fundamentally different input-output structure 
    
- Process reward models (PRMs)

- Score intermediate reasoning steps, not just final outcomes

- Labels are applied only at step boundaries; other tokens are masked during training 

- Generative reward model → LLM-as-a-judge
    → An alternative to training a reward model → prompt an LLM to judge quality
    → Benchmarks → MT-Bench, AlpacaEval, Arena-hard, WildBench 
    → Generative RMs tend to UNDERPERFORM trained reward models on RM evals, but are cheaper
    → Very useful on synthetic data pipelines
```

<br>

* Rejection sampling → Simplest thing you can do with the RM for downstream training:

```💡
1. Generate many candidate completions

2. Score them with a RM

3. Keep only the best ones

4. Fine-tune on those:
    → No policy gradients, no online RL
        → just filtered supervised learning
    → Offline data curation 
        → generate first, then train on the filtered outputs
```

<br>

* Need to be careful with sampling settings → core hyperparameters:

```💡
- Temperature → 0.7-1.0; need diversity in completions

- Completions per prompt → 10-30+ (too few, noisy selection)

- Fine-tuning
    → standard SFT on selected completions (same loss, but details like learning rate may differ from initial IFT)

- TIP: sort completions by length before batch RM inference to reduce padding token computation 
    → reward model batches can be about length
```

<br>

* How to sequence RS in a multi-stage pipeline, whether to use generations from multiple models, optimal prompt selection? There hasn’t been a fully open reproduction of this, which is confusing.

* Best-of-N sampling → rejection sampling without fine-tuning:

```💡
- Same procedure, but skips the fine-tuning step

- Used at inference time to pick the best completion

- Does not modify the model → it’s a sampling technique

- Often used as a baseline comparison for online RL methods like PPO

- Simplest possible reward-guided method 
    → generate more, pick the best
    → can also be done with verification / LLM-as-a-judge
```

<br>

* The pipeline so far:

```💡
1. Instruction fine-tune the retained model → learn the chat format
2. Collect preference data → human annotators compare pairs of responses
3. Train an RM on preference data → learns to score quality
4. Rejection sampling → generate many completions, keep the best, fine-tune
```

<br>

---

## 🐶 Lecture 3 ➡️ [Policy Gradient Algorithms for RL on LLMs](https://www.youtube.com/watch?v=K_Sj_-1BUMM)

<br>

> *Overall, RL losses on language models are robust, scalable, effective, and flexible, opening large new fields of experimentation.*

<br>

* RLHF → reward model scores subjective quality; RLVR → verification function instead of a reward model that checks correctness (math, code) → same policy gradient algorithms, different reward source.

<br>

* Notation:

```💡
 ➡️ (s, a) for state and action <→ (x, y) for prompt and completion
 ➡️ state is the prompt + tokens generated so far
 ➡️ action is the next token y_t
 ➡️ r_t for per-step rewards
 ➡️ R(tau) for trajectory returns
 ➡️ rho_t for importance-sampling ratios
 ➡️ pi_theta(a_t  | s_t) is the next-token distribution
 ➡️ episode is the one prompt → completion 
 ➡️ transition is deterministic: append token to sequence
 ➡️ terminal reward: RM score or verifier output
 ➡️ gamma → typically 1.0 (no discounting)
 ➡️ the unit of optimization is the full completion
```

<br>

* What is optimized? Choose policy parameters that maximize reward on average under the current policy → we estimate this expectation with sampled rollouts → we craft a gradient/derivative that lets us optimize this.

* Policy gradient → make actions more likely when they lead to better outcomes → the gradient of the probability tells what actions matter → `psi_t` is the learning signal telling the optimizer how good the action was and determines the algorithm’s variance, bias, and compute cost.

<br>

* Key RL qualities:

```💡
- value functions V(s) → expected future return from state s

- action-value Q(s, a) → expected return after taking action a in s

- advantage A(s, a) = Q(s, a) - V(s) → how much better is an action a compared to average
```

<br>

* Popular choices for `psi_t` → total trajectory reward, future return from `t`, baselined return, state-action value function, advantage function, TD residual.

<br>

### Derivation of the policy gradient

<br>

* The reference model is a frozen copy of the policy at the start of RL training (the SFT checkpoint) → it anchors the policy so it doesn’t drift too far during optimization.

* KL divergence as regularization → the KL penalty measures how far the current policy has drifted from the reference AT EACH TOKEN.

* In RLVR, KL is often reduced or removed → the reward is the ground truth, so there is less to exploit → some setups (e.g., DeepSeek R1) drop the reference model, saving memory. → as reward signals become more reliable, the need for KL regularization decreases.

<br>

### REINFORCE

<br>

* The simplest instantiation of the policy gradient → the Monte Carlo form of policy gradient: sample trajectories, compute their returns, use those sampled returns to weight the log-prob gradients. → needs a baseline to reduce variance → no value function required.

<br>

> *The baseline problem in REINFORCE → without a baseline, the gradient weights each action by its raw return, which doesn’t tell you whether an action was better or worse than expected, just how good the overall outcome was → the gradient is high variance because the raw return mixes the quality of the action with the quality of the state → a good action in a bad state and a bad action in a good state can produce similar returns.*

<br>

* Common baselines → average reward over the batch, moving average of recent rewards, learned value function.

<br>

> *Actor-critic methods → there’s a learned model which is the policy, and a learned value model which is a critic, critiquing how good each state is.*

<br>

* REINFORCE RLOO (leave one out) → generate `k` completions per prompt and use the other `k - 1` rewards as the baseline → per-prompt baseline capturing prompt difficulty → iterate on the baseline → make sure the baseline is helping reduce the variance effectively so the gradient signal is useful → per-prompt baseline that naturally captures prompt difficulty - hard prompts get low rewards across all completions, so the baseline is low.

<br>

### PPO

<br>

* All the algorithms so far are on-policy → they generate fresh rollouts from the current policy each batch, then update on rollouts → this is in contrast to off-policy RL methods (e.g., DQN, Atari, old DM stuff), that store and replay old experience → the problem: vanilla policy gradient is sensitive to step size. Too large an update and the policy can collapse, too small and training is painfully slow. TRPO solved this with a hard trust-region constraint, but required expensive second-order optimization. → proximal policy optimization (PPO) gets TRPO-like stability with a simple clipped objective, and because the clipping keeps updates conservative, you can safely take multiple gradient steps per batch of rollouts, improving sample efficiency.

* Core idea 1️⃣ → constrained updates → large gradient steps can destroy the policy (instability, over-optimization, etc.) → the solution: trust regions, limit how far the policy can move in a single update.

* What can we do with more conservative gradients → extract more signal from the batch → introduce new problems → how do we constrain the updates over multiple gradient updates? → how do we take the policy gradient if the data has drifted off-policy?

* Core idea 2️⃣ → importance sampling → we want to take multiple gradient steps on a batch, but the data came from an old policy → define the importance sampling ratio which tells how the current and old policy agree on the action (which one assigns higher probability) → the ratio reweighs old-policy samples to estimate new-policy gradients.

* The surrogate objective → plugging the importance sampling into the policy → intermediate problem → without constraints, maximizing this can take arbitrarily large steps, the ratio of importance sampling can diverge from `1` → PPO introduces the clipped objective.

* PPO clips the ratio to prevent large updates with an epsilon cutoff around `0.1-0.2` → a practical surrogate inspired by trust-region ideas

* The value function (critic) → PPO trains a value function alongside the policy → the expected future return from state `s_t` → separate parameters, predicts post-KL-shaped future return at each token position, trained via MSE against post-KL returns → the value function serves as a learned baseline for advantage estimation.

* The critic learns to predict returns → the total discounted reward from each token onward → GAE gives us the advantages by combining actual rewards with the critic’s own predictions.

* Value function initialization is hard → needs to produce reasonable estimates from the start → 1) initialize from RM backbone (value predictions start near actual rewards); 2) initialize from SFT model + random head (cheaper but early training unstable); 3) cold start issues (if initial value estimates are bad, GAE advantages are noisy, early training can be chaotic).

* How PPO-RLHF gets token-level credit (i.e., turns a sequence-level reward into token-level training) → PPO-style RLHF often starts with one scalar reward for the whole completion → how does that become a per-token training signal → 1) KL penalty shapes intermediate tokens, at each token `t`, subtract `beta . KL_t` from the reward → per-token reward signal; 2) Final token gets the RM score: `r_T - R(tau) - beta . KL_T`, all other tokens get `r_t = - beta KL_t`; 3) GAE propagates credit backward: the value function + TD residuals assign per-token advantages from these shaped rewards.

* Advantage estimation → it helps by: 1) centering reduces variance (asking how much better is this action than average? How good was the total return?), 2) credit assignment (with per-token values, each token gets its own advantage signal) → Monte Carlo estimate is simple and unbiased → but it can be high variance → temporal difference (TD) methods and generalized advantage estimation (GAE) trade some bias for lower variance.

* Advantage whitening → normalize advantages to zero mean, unit variance within the batch → stabilizes gradient magnitudes across batches → without whitening, batches with uniformly high or low rewards can produce outsized gradients.

* Distribution of advantages within each batch → during learning, you normalize the advantages so they form a unit Gaussian → gradients become much more predictable.

* TD residual → how different the actual reward from the environment was from the value prediction → `1`-step advantage estimate: low variance with potentially high bias → `k`-step: more variance, less bias → at `k → inf` we recover the full Monte Carlo advantage, no bias, highest variance.

* GAE: exponential weighting → uses an exponentially weighted average across all `k`-step estimates.

* PPO-RLHF → full policy objective → PPO-RLHF combines the clipped PPO objective with a KL regularizer → two layers of regularization: 1) clipping (limits how far the policy moves per batch), 2) KL (limits total drift from the ref policy across training).

* PPO training loop:

```💡
1. Generate → sample prompts 
    → generate completions with current policy

2. Score
    → compute rewards with reward model + KL penalty

3. Estimate advantages
    → compute GAE using learned value function

4. Update (K epochs)
    → clipped policy gradient + value function loss on the same batch (k=2-4 gradient steps per batch before re-generating) 
    
5. Repeat
    → new batch and sync policies
```

<br>

* PPO → Four models in memory (policy, value, reference, RM) → memory-intensive, which makes simpler alternatives such as GRPO attractive:

```💡
1. Policy → generates completions → update

2. Value function → estimates per-token expected return → update

3. Reference policy → KL penalty anchor → frozen

4. Reward model → scores completions → frozen
```

<br>

### GRPO + modern variants

<br>

* GRPO → PPO for the reasoning/RLVR era → introduced in DeepSeekMath for math reasoning and became the go-to algorithm for RL on LMs → it keeps PPO’s clipped objective but drops the value function.

* Core idea → generate `G` completions per prompt, use the group’s reward statistics as the baseline → no learned critic needed → simpler to implement and debug than PPO → naturally fit for RLVR as you have a clear verification and higher-variance rewards → popularized with DeepSeek R1.

* GRPO advantage → normalization of the rewards by the mean and standard deviation of the group rewards → z-score normalization: positive advantage for above-average completions → each token in completion `i` gets the same advantage (sequence-level, not per-token).

* Why choose token-level rewards over sequence-level rewards:

```💡
* Reward granularity
    → final-answer reward vs. step/token rewards

* Loss granularity
    → average by sequence vs. average by active tokens; DAPO uses token-level policy-gradient loss

* Why token-level can help:
    → Local signals → KL, format rewards, PRMs, partial credit
    → Long-CoT → more gradient on the tokens actually sampled
    → Batching → normalize by active tokens, not examples
    → DAPO → token-level loss + clip-higher + dynamic sampling for reasoning RL
```

<br>

* GRPO objective:

```💡
→ clipped ratio like PPO + group-normalized advantages + KL penalty directly in loss 

→ where the clipping applies per-token, and the action in i is shared across all tokens in completion
```

<br>

* GRPO is PPO minus the value function, with a statistical baseline instead → without standard normalization, the GRPO-style advantage estimate becomes equivalent to RLOO up to a scaling constant

<br>

### GSPO → sequence-level ratios (objective clipping)

<br>

* Aggregating per-token importance ratios across long sequences is numerically unstable → a single token with a large ratio can dominate the update → GSPO uses a geometric mean, a single length-normalized importance weight per response → the full objective mirrors GRPO but with a sequence-level ratio → the clipping range now operates on a per-token average scale, making it comparable across different completion lengths.

* Introduced by Qwen to change the ratio in GRPO to make it sequence-level rather than token-level (adds a bit of buffer before clipping) → helps to handle instability when training large models like MoE, since you can have specific tokens that can have way bigger variations in probability because of the routing of the experts and how that can fluctuate.

* On token-level vs. sequence-level rewards → if the reward is only final-answer correctness, sequence-level advantage is still natural.

<br>

### CISPO → clipping only on the importance sampling (weight clipping)

<br>

* CISPO clips the importance weights themselves rather than the objective, using a stop-gradient.

* Key difference from PPO → every token still receives a gradient signal, the weight just bounds how much it’s amplified → asymmetric bounds allow more aggressive reward-increasing updates (introduced in the MiniMax M1 paper).

<br>

---

## 🐶 Lecture 4 ➡️  [Implementing RL Algorithms for LLMs](https://www.youtube.com/watch?v=i-AIMpZHgeg)

<br>

#### Translating the policy gradient into code

<br>

* From the objective and its gradient, the gradient says → for each token, compute the direction that makes it more likely, then scale it by how good it was (`psi_t`).

* All methods (REINFORCE, RLOO, PPO, GRPO) optimize the same core objective; they differ in `psi_t` and how updates are bounded.

<br>

### PPO

<br>

* Multiple epochs and minibatches → PPO (and GRPO) optionally reuse each rollout batch for multiple gradient steps → clipping activates whenever the new policy has drifted from the old → two mechanisms cause this:

```💡
1. Minibatching 
    → split the rollout batch into smaller minibatches to allow a larger total batch size to fit on a certain GPU setup
    → after updating on the first minibatch, the policy has changed
    → so later minibatches in the same epoch already see rho_t different from 1
    → clipping can activate even in k=1 epoch
    → with k=1 and no minibatching, the policies are the same, ratios are always 1
    → clipping never activates, and PPO reduces to vanilla policy gradient with GAE

2. Multiple epochs 
    → loop over the full batch k times to learn more from a given rollout (which can be expensive)
    → each pass sees a more-updated policy, making ratios drift further
    → typical k=2-4
    → after ~6, the policy is too far off-policy
```

<br>

* Batch size matters more in RL → gradient noise scale is orders of magnitude higher because gradients come from Monte Carlo rollouts, not labeled data:

```💡
* OpenAI data 2 
    → critical batch size was in millions of transitions

* PPO specifically is not batch-size invariant 
    → clipping couples batch size to effective step size, so you can’t compensate with learning rate

* PPO plateaus 
    → often caused by noisy loss estimates, which can be resolved with more samples

* Large batches reduce gradient variance proportional to 1/N 
    → in RLHF, this is one of the cheapest ways to stabilize training (more effective than most hyperparameter tuning)
```

<br>

### GRPO

<br>

* Training infrastructure:

```💡
* Theory (on-policy): generate → update → generate → update

* Each batch of completions is scored and used for a short update window (one or a few epochs), then discarded

* Reality (async) 
    → generation and training overlap on different GPU groups for better throughput
    → the model used for generation may be 1-N steps behind the training model

* Trade-off → perfect on-policy is slow → slight staleness is usually fine
```

<br>

* Modern RL for LLMs splits compute into two groups:

```💡
* Actors → inference GPUs → generate completions using vLLM or similar

* Learners → training GPUs → compute policy gradient updates

* A process management library coordinates data flow between them

* Modern weights are synced periodically from learner → actor
```

<br>

### Bandit-style vs MDP-style RLHF

<br>

* Bandit-style:

```💡
* One reward per completion

* Sequence-level psi_t broadcast across tokens

* Used by default in REINFORCE, RLOO, GRPO
```

<br>

* MDP-style:

```💡
* Each token is treated as an action

* Per-token values or advantages 

* Used by default in PPO with GAE
```

<br>

* Most RLHF is mixed in practice → sequence-level rewards, but token-level log-probability gradients → PPO-style RLHF usually starts from a sequence reward model score, then gets token-level via KL shaping and GAE.

* What to monitor during training:

```💡
* Reward/mean → should be steadily upward, no spikes/oscillations/plateaus

* KL/mean → gradual increase, no explosions or flatness

* Loss/policy → decreasing, no divergence or NaNs

* Metrics/clip_frac → 5-30%, not 0 or >50%

* Generation/length → stable or slight increase, no monotonic increase

* Policy entropy → slow decrease, no crashes to 0

* Also monitor: eval scores on held-out benchmarks, and read sample outputs for coherence
```

<br>

---

## 🐶 Lecture 5 ➡️ [The Rise of Reasoning Models ](https://www.youtube.com/watch?v=o4AB5xHIDdM)

<br>

### Why does RL work now?

<br>

* Stability is much more tractable → still a first-class research problem (entropy collapse, long-horizon credit), but tooling and recipes are mature.

* Base models are good enough → multiple sources suggest RL reasoning training became viable with models ~2024 onwards.

* Verifiable domains provide clear signals → math and code give unambiguous rewards, avoiding reward hacking problems of RLHF.

<br>

### Timeline

<br>

```💡
* DeepSeek R1 (Jan, 2025)
    → Cold-start SFT
    → large-scale RL
    → distillation of smaller models

* Kimi 1.5 (Jan, 2025)
    → PPO/GRPO-style RL on Chinese and English reasoning data
    → difficulty scheduling and online filtering to keep gradients useful
    → progressive length extension to reduce overthinking while enabling long CoT

* Open-reasoner-zero (Feb, 2025)
    → minimalist replication
    → fully open
    → training code, curated RL data, model weights
    → vanilla PPO with GAE and simple rule-based rewards
    → no KL penalty

* Qwen (April, 2025)
    → hybrid reasoners
    → new open-weight standard
    → toggleable thinking /think and /no_think modes
    → mirror the R1-style multi-stage pipeline
    → lightweight models use strong-to-weak distillation
    → off-policy outputs, then on-policy teacher-logit-matching

* MiMo (April, 2025)
    → end-to-end reasoning pipeline (from pre- to post-training)
    → three-stage data mixing during pre-training - 25T tokens)
    → multi-token prediction during pre-training
    → multi-domain RL to prevent over-optimization on a single task type
    → clear intermediate checkpoints within post-training

* OpenThoughts 3 (June, 2025)
    → SFT data recipes (primarily an open reasoning data release)
    → open reasoning traces

* MiniMax-M1 (June, 2025)
    → CISPO clips importance-sampling weights instead of dropping high-update tokens
    → introduces FP32 LM head inference-training mismatch plot

* GLM-4.5 (July, 2025)
    → reasoning broadens into agentic work
    → expert-model iteration plus RL for agent, reasoning, and general chat skills

* Olmo 3 Think (2025)
    → fully open reasoning model
    → releases: stages, checkpoints, data, infrastructure, hyperparameters
    → interesting DPO findings

* DeepSeek V3.2 (December, 2025)
    → pushes R1 recipe into tool use and agent environments
    → open-weight MoE successor to V3.2-exp
    → integrates thinking directly into tool use, no longer distinct reasoning models

* Nemotron 3 Nano (December, 2025)
    → efficient agentic reasoning
    → hybrid Mamba-Transformer MoE
    → post-trained with SFT, multi-environment RLVR, and RLHF

* MiMo-V2-Flash (Dec, 2025)
    → multi-teacher on-policy distillation (MOPD)
    → train a specialist teacher per domain
    → then distill them into a single student that learns from dense, token-level rewards
    → not just sequence-level outcome rewards

* Nemotron 3 Super (March, 2026) 
    → 120B/12B MoE, LatentMoE, MTP, native NVFP4 pre-training (quantization)
    → fully open: checkpoints, training data, recipes

* Arcee Trinity-Large-Thinking (April, 2026)
    → frontier reasoning model tuned for long-horizon multi-turn tool use
    → Apache 2.0 weights, SFT + RL pipeline

* DeepSeek V4 (April, 2026)

* Gemma 4
```

<br>

### Recipe decisions

<br>

* Offline difficulty filtering → pre-sample `N` completions/prompts, keep prompts at `~20%` pass rate.
* Online filtering and curriculum → skip prompts now too easy/hard, save harder problems for later.
* Zero-gradient filtering + active sampling → drop groups where all `G` completions pass or fail, then refill the batch.
* KL penalty → dropped, now coming back → single-turn math RLVR usually sets `beta = 0` → long-horizon, off-policy agentic training is reviving a KL/reference term for stability.
* CISPO → clip importance-sampling weights instead of making high-update tokens.
* Normalization choices → how you average advantages and loss quietly changes the objective → normalize advantages across the whole batch, not per prompt group, so a few easy/hard prompts don’t dominate.
* Format rewards → reward valid `<think>` blocks and extractable answers; usability, not correctness.
* Language consistency rewards → penalize language switching inside a trace.
* Length control → progressive length extension → the maximum length of training, which rewards concise thinking, small penalty, overlong filtering for throughput.
* Findings - text-only RL boosts multimodal and mid-training sets the RL ceiling.

<br>

---

## 🐶 Lecture 6 ➡️ [Direct Preference Optimization (DPO)](https://www.youtube.com/watch?v=6g6b4gvO-y0)

<br>

> 👾 *Your language model is secretly a reward model.*

<br>

> *DPO (Rafailov et al., 2023) was a breakthrough in the accessibility of RLHF research → when the paper was released, many groups were struggling to open-source replications of RLHF pipelines (most aligned models were just SFT) → Zephyr-Beta, Tulu 2, etc. reiterated the post-training research.*

<br>

* The promise of DPO:

```💡
* No separate reward model

* No reinforcement learning loop

* Just a single, directly differentiable loss on preference pairs
```

* Classic RLHF is three moving parts:

```💡
1. Collect human preference pairs

2. Train a reward model

3. Optimize the policy against the RM with RL (e.g., PPO), under a KL penalty

4. DPO collapses 2 and 3 into one supervised-style loss
    → the optimal RLHF policy and the reward model are two views of the same object
```

<br>

### Deriving the Optimal Policy

<br>

```💡
1. Start with the RLHF optimization problem
    → we want to find the policy that solves the equation without RL

2. Fold the KL into the expectation

3. Flip to a minimization

4. Fold the optimization target into one log-ratio
    → introduce the reference reweighted by reward
    → multiplication of each response’s probability by an exponential factor (on beta) larger for higher rewards
    → (i.e., setting how aggressive reweighting is)

5. Introduce the partition function Z(x) and “energy” minimization

6. Turn the objective into a KL divergence

7. Apply Gibbs’s inequality to get the optimal policy 
    → ✨ DPO is the gradient on it ✨ 
    → the reward model never has to be built, but it’s hiding inside the policy!
```

<br>

### DPO weaknesses, implementation

<br>

* A subtle risk: the chosen probability can fall → The DPO loss only cares about the margin between the chosen and rejected log-ratios, not the absolute values → the model can lower the loss by pushing the rejected probability down faster than the chosen, even while the chosen probability also falls → a reason some practitioners add an SFT term on the chosen response, or fixes like Cal-DPO.

* The beta parameter sets the strength of the KL constraint relative to reward maximization → large betas, the policy stays close the reference policy; small betas, the policy is free to deviate and can over-optimize.

* DPO’s final KL distance is static → it steps directly to the optimal solution implied by the dataset and the chosen beta. → online RL instead takes steps based on freshly sampled batches and a per-sample KL penalty → some RL runs even include dynamically adjusted KL controllers.

* DPO vs. RL/PPO (offline vs. online) → 1) train on a fixed dataset collected ahead of time vs. generate fresh completions during training, score with a reward model; 2) simpler, stable, faster vs. more compute and complexity, 4 models in memory; 3) limited by the coverage of the dataset vs. can explore new regions.

* Models today: Olmo 3, Nemotron 3 (mixed preference optimization: DPO + binary classifier optimization in one offline stage, over data scored by a generative reward model), Liquid AI LFM2.

<br>

---

## 🐶 Lecture 7 ➡️ [On-Policy Distillation & Using Synthetic Data](https://www.youtube.com/watch?v=6nyJ8y8ghsE)

<br>

* Synthetic data:

```💡
* Lowered the price of post-training experiments; the time-to-collect was faster, enabling RSI arguments

* Synthetic data in post-training only worked once GPT-4-class models arrived
    → Llama 2 and GPT-3.5-Turbo were not reliable enough to generate or supervise data
    → LLM-as-a-judge ability emerged in the GPT-3.5 to 4.0 jump

* Today, leading models need synthetic data to reach the frontier
    → distillation is the general word to transfer capabilities
```

<br>

### The Roles of Synthetic Data

<br>

* Spans the entire pipeline:

```💡
* writing prompts from seeds

* modifying / expanding existing prompts

* generating completions to prompts

* Providing AI feedback to create preference data

* Filtering completions for quality, labeling preferences

* verifying answers as rewards for RL
```

<br>

* Model collapse, “as diversity drops, rare facts and styles are underrepresented and small mistakes compound across iterations” → not a worry anymore → collapse can be avoided by 1) mixing real/human data, 2) using diverse teachers, 3) deduplication, 4) strong quality filters.

<br>

### The path to on-policy Distillation (OPD)

<br>

* Knowledge distillation (Hinton et al., 2015) uses soft labels (the full distribution over next tokens) rather than the one-shot target of next-token prediction → to apply it to autoregressive LMs, decompose the loss per token.

* Notation → `s` is the source prompt, `u` is the teacher trajectory, `V` for tokenizer, `q` for the teacher’s next-token distribution and `p` for students, `a` for the student-sampled completion in the on-policy / RL notation.

* Word-level (per-token) distillation → standard teacher-student distillation for an LLM → expensive but tractable (`|V|` probabilities per position) → matching over whole sequences is the hard part.

* Exposure bias → the propensity for the student to accumulate errors → offline KD samples teacher trajectories `u ~ pi_T` and matches per token (`q → pi_T, p = pi_theta`) → at test time, these policies are different (different distributions) → DAgger analogy (compounding error).

* From off-policy to on-policy → sampling from the student (rather than the teacher) minimizes a lot of the distributional errors:

```💡
* In offline KD, a single suboptimal token can nudge the student generation slightly out-of-distribution
    → the model is more likely to err again (as it has never seen the token in training)

* On-policy distillation iteratively samples from the student and supervises it with the teacher on its own visited states

* MiniLLM introduced a reverse-KL objective inside a policy-gradient frame
    → concurrent work connected on-policy KD to imitation learning (closer to the modern distillation form used today)
```

<br>

### Forward vs. Reverse KL

<br>

* Sampling completions from the student is what puts `pi_theta` on the left of the KL - which flips its direction (estimating the KL and its direction relies on which distribution you sample from).

* Offline KD / SFT (`~ pi_T`) → the expectation is over the teacher (off-policy, a fixed teacher dataset) → mass-covering (weighted by teacher mass; wherever the teacher has mass and `pi_theta → 0`, the log-ratio blows up and the student must cover everything the teacher might say).

* Online distillation (`~pi_theta`) → the expectation is over the student (on-policy, you sample the model you are training; mode-seeking - weighted by the student’s own mass, penalized only where it puts probability the teacher dislikes, so it collapses onto the teacher’s modes).

* KD distance as an RL advantage (i.e., directly as a reward) → substitute the negative per-token reverse-KL contribution as the advantage (*** thinking machine post ***) → for a sampled token `a_t` at state `s_t` it becomes just a log difference, not the policies on them:

```💡
* Tokens more likely for the teacher → positive advantage; less likely → negative

* The teacher log-prob gap is dense, token-level feedback 
    → potentially richer than a sparse verifiable reward or a single scalar reward-model score

* This layers into modern RL machinery 
    → e.g., add it alongside GRPO’s group-level normalization for more complex reward shaping
```

<br>

* Multi-teacher on-policy distillation (MOPD) → use several teachers - domain specialists or earlier checkpoints → each with a pre-prompt mixture weight → at scale: organizations divide labor, train expert teachers that later distill into one final student → DeepSeek-V4-Pro, MiMo-V2-Flash.

* On-Policy Self-distillation (OPSD) → pushing the frontier → the teacher is the same model conditioned on privileged information → gradients will teach the model the tokens after the hint were a mistake, absorbing the lesson with an OPD-style loss → Cursor Compose 2.5, Kimi K2.5.

<br>

### AI Feedback and Constitutional AI

<br>

* RLAIF (RL from AI feedback) → using AIs to approximate the human-data step, starting with pairwise preferences → cost advantages.

* Building specialized judge models:

```💡
* Research on how LLMs are inconsistent evaluators and show self-preference bias (they favor their own generations)

* Dedicated judge / critic models exist (not widely adopted in documented post-training recipes)

* Equilibrium → frontier models are already trained hard for judging, so you rarely need your own
    → unless your task has private data
```

* Constitutional AI (CAI) → Anthropic’s post-training method for Claude models → the earliest documented, large-scale use of synthetic data for RLHF → generates synthetic data in two ways, one for instructions and one for preferences:

```💡
* It builds an SFT pipeline, rewriting the prompt based on the sampled principle

* Then constructs preferences by giving a feedback model
    → the model selects which answer is higher quality and more aligned with the principle
```

<br>

### Rubrics: Prompt-specific AI Feedback

<br>

* A popular tool for scaling RL on the long tail of domains → used to help with domain-specific evaluations and any other place domain expertise needs to be trained into the models

* Emerged in late 2024 → 2025 as LLM judges and synthetic-data practices matured → likely a function of making RL more broadly accessible to frontier post-training

* Per prompt → quality and robustness to over-optimization

<br>

---

## 🐶 Lecture 8 ➡️ [Preference Data](https://www.youtube.com/watch?v=Y2tv5vuaxFs)

<br>

* Logic to numbers; choices scored:

```💡
* Port Royal Logic (1662)
    → decision quality = outcome weighted by its probability 

* Bentham’s hedonic calculus (~1800s) 
    → weigh all of life on one complicated, but common scale

* Ramsey, Truth and Probability (1931) 
    → first to quantify preference and belief together as the way that individuals make probabilistic decisions
```

<br>

> 👾 *To judge what one must do to obtain a good or avoid an evil, it’s necessary to consider not only the good and the evil in itself, but also the probability that it happens or not.”* - The Port Royal Logic, 1662

<br>

* Von Neumann-Morgenstern Utility theory (1947) → if your preferences obey a few axioms (completeness, transitivity, continuity, independence), they can be represented by a single utility function and a rational choice → maximizing **expected utility**. → RLHF fitting a scalar reward.

* Preferences drift during and after labeling; they are context- and framing-dependent, can be intransitive, and highly multidimensional.

* Where utility theory breaks down:

```💡
* Arrow’s impossibility theorem (1950) 
    → no voting rule aggregates individual preferences into a collective one while satisfying a few basic fairness criteria
    
* Sen, Behaviour, Choice, and Values (1973)
    → choice is not the same as preference 
    → revealed-preference theory is too thin

* Hirschman, Against Parsimony (1984)
    → people have preferences over their preferences, so preference may be unmeasurable
```

<br>

* The other root → optimal control and RL → a machinery for optimizing a reward → these guarantees assume a single closed-form reward:

```💡
* Bellman (1957)
    → MDPs and dynamic programming → origins of optimal control / control theory

* Sutton (1988)
    → temporal-difference learning for credit assignment (instead of learning from lots of past data)

* Watkins (1992)
    → Q-learning (learning value)

* DQN (2013)
    → deep RL at scale, AlphaGo / AlphaZero (2017) → mastery from self-play
```

<br>

* Rewards are a scalar signal to maximize, while preferences are unstable and not scalar → reducing preferences to rewards made the optimization format tractable but it’s the root cause of unsolvable biases in RLHF and preference data.

* A learned reward model is a moving, noisy proxy, not a ground-truth reward → inverse RL: learning a reward from behavior (e.g., on-policy distillation) is conceptually close but absent from RLHF practice → we inherit RL’s optimizers without its guarantees.

<br>

### Preference data → Trade-offs in Practice

<br>

* Ratings → a score on one completion in isolation; good ad metadata.

* Rankings → relative comparisons, often on a Likert scale, early Claude used an `8`-point scale; UltraFeedback pairs high- vs. low-rated completions. → In practice, almost everyone trains on pairwise rankings, binarized to chosen/rejected for the Bradley-Terry loss - and keeps ratings on the side.

* Likert scale → the famous scale that records a preference as an ordered, graded judgment - not just which answer wins, but by how much, on a symmetric scale with an optional neutral middle. → ordered judgment.

* Beyond pairwise preferences → richer signal, harder collection:

```💡
* Directional / single-bit labels
    → trained with Kahneman-Tversky Optimization (KTO)

* Token-level / fine-grained feedback
    → label specific tokens, or token-spans as good or bad

* Natural-language feedback
    → written critiques instead of a label
```

<br>

* "The nature of preferences": Preference evals → Arena; Spec → data → behavior.

<br>

---

## 🐶 Lecture 9 ➡️ [Over-Optimization and RLHF’s Bad Reputation](http://youtube.com/watch?v=y04JhXpiI4s)

<br>

* OpenAI’s sycophancy problem, April 2025 → what went wrong:

```💡
- The model update had a reward signal from user feedback via an RM for RL data from ChatGPT

- Under RL, that signal overpowered the primary rewards
    → optimize the easiest objective to move

- Not caught by evals
    → offline benchmarks looked good and A/B testers preferred the model 
    → no deployment eval tracking for sycophancy 
```

<br>

* Reward-model accuracy is a proxy for a proxy (a learned model, from data that incompletely captures a complex distribution - proxy for truth, as over-optimization is common).

* Critique of RLHF being “style transfer” → the Superficial Alignment Hypothesis (Zhou et al. 2023) is the strong version: knowledge is learned in pretraining; alignment just picks a format and tone.

<br>

### Over-optimization

<br>

> *”Any observed statistical regularity will tend to collapse once pressure is placed upon it for control purposes”* - Goodhart, 1984

<br>

* RL is a very strong optimizer → it pulls all the available reward out of the environment. → in RLHF, the reward is a learned model, at best correlated with downstream quality. → optimizing the proxy makes the true objective better in early training - then worse.

* Over-optimization vs. overfitting → in overfitting, the model memorizes training examples rather than generalizing patterns (so training accuracy improves while accuracy degrades) → in over-optimization, the model genuinely improves at the proxy objective: the reward model’s scores (including on validation set), but that objective diverges from the true goal - it’s an imperfect measurement problem.

* Anthropic’s version of over-optimization → split preference in half and train two `52B` preference models (test and train) → training with RL on the training set only, inducing a KL distance from the initial policy.

<br>

> 🤣 *”I cannot provide instructions or advice on how to harm or destroy Linux processes or any other living being. It’s not ethical, legal, or morally right…”*

<br>

* Source of errors: 1) approximation (the RM cannot perfectly fit preferences); 2) estimation (the RM overfits its training set); 3) optimization (the policy trains too hard against it).

* Potential mitigations: 1) bigger policies (more ways to gain reward at small optimization distances); 2) reward-model ensembles; 3) changed optimizers; 4) direct alignment over-optimizes but makes the trade-off easier to pin; 5) best-of-N sampling spends far less KL than online RL → the main lever is KL penalty (and more careful data).

* Over-optimization enables misalignment. → reward hacking in scaled-up RL on verifiable and agentic tasks → models exploiting graders, test harnesses, and tools rather than solving the task.

* Preference tuning reliably boosts LLM-as-a-judge chat evals (AlpacaEval, MT-Bench) - gains that do not transfer proportionally to Arena or real usage. → DPO leads to improvements in human preference evaluation but degradation in benchmark evaluation.

* Preference tuning method from “Direct Nash Optimization” (April, 2024): reports a `7B` model beating GPT-4 on AlpacaEval → not quite true, hacking some measurement → a lot came from length expansion, where longer generations were judged as better.

* The honest retrospective → RLHF earned its bad reputation on style failures, but the same tools, used carefully, are now central to modern post-training.

<br>

---

## 🐶 Lecture 10 ➡️ [Regularization in RL, Why RL Generalizes, and Why SFT Forgets](https://www.youtube.com/watch?v=IwpYxANrpUs)

<br>

### How do these optimizers change the distribution of the models? How do we control it?

<br>

* The RLHF process is the RL step maximizing reward from the RM minus a penalty from drifting from the reference model → what happens with this penalty?

* RLVR has regularization too, but different best practices → same RL loop, different reward source → a verification function instead of a reward model → reasoning models often dropped the KL penalty to enhance learning → with large-scale tool use, regularization is coming back, aimed at drift from the sampling distribution, not a KL penalty to a reference model.

<br>

### Explicit KL Penalty

<br>

* KL control for RL predates LLMs → dialogue agents, then fine-tuning pretrained models. → this penalty is a reverse KL: estimated by sampling from the policy you are training and scoring against the reference model → it punishes the policy for putting mass where the reference would not.

* Intuition for KL is that it’s an (optimization) distance, but when implementing it’s not a distance/true metric as it’s not symmetric (commutative).

* Measuring KL in practice → sampling from `P` turns the definition into an expectation → practitioners watch the KL curve during training (a very large KL usually means a bug or a broken model).

* Static or dynamic KL penalties? Beta began as a feedback controller → the first RLHF for LMs paper did not fix beta; it picked a target KL and let the controller chase it. → Before RLHF, PPO’s original adaptive KL penalty variant doubled or halved beta around a target, and constrained RL later made the control framing explicit with full PID controllers on the penalty multiplier. → modern practice is back to small static beta, and in many RLVR setups, no KL at all.

<br>

### RL Optimization is a Reverse KL Minimization

<br>

* What’s the shape of RL optimization and how it relates to KL? RL samples from itself → with the penalty on, maximizing the objective is exactly a reverse-KL minimization toward a reward-tilted reference → this is only true with the KL penalty in the optimization → but on-policy sampling still biases RL toward KL-minimal solutions.

* The optimized policy as the reward-tilted reference → the “tilt” shifts probability mass toward high-reward completions while staying inside the reference’s support - large beta tilts barely at all, small beta concentrates on the highest-reward completions. → with the penalty included, RL doesn’t just use a reverse KL, the whole objective is one, pointed at the reward-tilted reference policy.

* Minimizing the SFT loss is minimizing forward KL (to the data) distribution

* Forward KL (SFT, standard KL) vs. Reverse KL (RL) → samples from the target (fixed database, mass-covering, wherever the target has mass and `pi_theta` goes to zero, the loss blows up, the model must spread to cover everything) vs. samples from the policy itself (mode-seeking, only penalized where it places mass, so it concentrates on high-reward modes).

<br>

### Why RL Generalizes More

<br>

* SFT Memorizes, RL Generalizes (Chu et al., 2025) → RL-based post-training carries implicit regularization from its on-policy structure alone.

* Naive read → forward KL is mass-covering, so SFT should preserve every mode, while mode-seeking RL should collapse onto one and forget the rest. → this assumes a unimodal policy, and LLMs are multimodal.

* RL’s razor (Shenfeld et al., 2026) → lower KL drift for equivalent performance → *”Among the many high-reward solutions for a new task, on-policy methods such as RL are inherently biased toward solutions that remain closer to the original policy in KL divergence.”*

<br>

### Other Tools for Control Optimization

<br>

* Pretraining next-token prediction gradients; NLL alongside DPO; margin loss for reward models.

* A trust region on the sampling distribution → DPPO (Divergence Proximal Policy Optimization) masks tokens by a directly estimated divergence between the rollout and training policies, instead of PPO’s per-token ratio clip.

* The per-token ratio is a noisy one-sample estimate of that divergence. → this is not the reference-anchored reverse KL but a drift control against the sampling distribution, a trust region on each update rather than a penalty in the objective.

* Even with no penalty, on-policy RL is implicitly regularized - SFT memorizes, RL generalizes.

<br>

---

## 🐶 Lecture 11 ➡️ [How Language Models Use Tools and the Path to Agents](https://www.youtube.com/watch?v=GMry2DzC304)

<br>

### What are the limitations of Model weights alone?

<br>

* What an LLM is has changed → an LLM today is: model weights (the trained network: foundation of knowledge, reasoning, style) + tools (the actions the model can request: search, code execution, file edits, APIs) + harness (the software loop around the weights that executes those requests and feeds the results back into the context) → now systems, instead of static weights.

* The hardest evals today are e2e tasks in complex containers!

<br>

### A short history of models using tools:

<br>

```💡
* 2015-2020, precursors 
    → neural programmer-interpreters execute programs with neural networks
    → retrieval augmentation pulls in outside knowledge

* 2011 
    → WebGPT browses the web, trained with human feedback

* 2022 
    → TALM bootstraps tool-augmented training data
    →  PAL offloads computation to Python
    → ReAct interleaves reasoning and actions

* 2023 
    → Toolformer teaches itself APIs with synthetic data
    → Gorilla scales to 1,645 APIs, ToolLLM to 16k+
    → OpenAI ships function calling in the API and code interpreter in ChatGP
    
* 2024 
    → MCP

* 2025 
    → o3 makes multistep tool calls inside its reasoning

* 2026 
    → terminal and coding agents become the frontier of post-training
```

<br>

* ReAct: Reasoning and acting are one generation → before, reasoning (CoT) and acting (tool calls) were separate literatures → interleaving them in one token stream is the new pattern for agents.

* Toolformer: Models teach themselves tools → via a self-labeling/synthetic data mechanism → 1) Prompt the model to insert candidate API calls into its own pretraining text, 2) Execute the calls, 3) Keep only the calls whose results reduce perplexity on the following text, 4) Fine-tune on the filtered corpus.

* How tool use is evaluated → 1) Schema-level (JSON validity, etc.); 2) Breadth (ToolLLM/ToolBench spanning 16k real-world APIs); 3) Reliability (e.g., tau-bench measures `pass^k`, succeeding on all `k` trials); 4) e2e (terminal-bench runs agents on real tasks in containers with verification tests; long-horizon benchmarks).

<br>

### Infra - How tool calls actually work

<br>

* The model only sees tokens → tools live in the system prompt → training data for function calling looks like ordinary post-training data, plus a system prompt declaring the available tools as JSON schemas. → the model learns to emit calls matching the declared schemas and expect results in context.

<br>

### Training for Tool Use

<br>

* Same post-training applies:

```💡
* SFT on tool trajectories → formatting and tool selection; establishes the skill

* Preference tuning still works, but is less popular

* RL with environment feedback, where the action is in frontier model training
```

<br>

* For RL, environments are the bottleneck → scaling environments means synthesizing them (difficult control, personas, verifier diversification) → environments have a ton of new infra + complexity failure modes (API keys becoming inactive, CPU resource limits, bandwidth limits, missing data the model was told it has, etc.).

* TMax → an open recipe for terminal agents → RL over TMax-`15K` environments with outcome-only rewards. → DPPO, a GRPO variant, designed to help with agentic stability. → TMax-`9B`: 27.2% on Terminal Bench 2.0 (the strongest open-weight model under `10B`, beating the `32B` variants of prior work).

* Most of the effort goes into stability during scaling, rather than speed or learning efficiency → without intervention, runs were often unstable, collapsing after `300` training steps → train/inference numerical mismatch → the inference engine and the trainer disagree on logprobs (fixes: an `FP32` LM head, and DPPO’s masking of tokens where the two diverge) → a standard run: H100 nodes (2 for training, 6 for inference, 2-3 days).

* Kimi K3 (July, 2026) → lots on environments and sandboxes (`51,219,741` sandboxes created during training, microVMs that checkpoint in 133ms, and living environments, where one rollout can span thousands of tool calls → sandboxes sit idle up to `98%` of their lifetime waiting on inference).

* Open models train across multiple harnesses so deployment is smooth → Kimi K3 says that training with a single fixed agent harness can cause a model to overfit → Nemotron 3 Ultra trains every task under at least two harnesses.

* Nemotron 3 Ultra → as environments multiply, “each domain contributes only a relatively small number of samples to any given training batch, diluting the per-domain learning signal.” → a common answer is to train domain experts with RL, then merge them via multi-teacher on-policy distillation (MOPD).

* Reward hacking → GLM-5’s slides-RL policy discovered `overflow: hidden` to make an overflowing slide measure `16:9`, and flex-padding to stretch short ones (the fix was patching the renderer, not the reward). → Nemotron deletes future git commits and firewalls GitHub so SWE agents can’t read the gold patch → Kimi K3 ships a kernel-exploit detector and public/hidden verifier pairs.

* More headaches:

```💡
* Long-tail rollouts
    → one trajectory makes 2 calls, another makes 200
    → async is designed to help, but long-tail is challenging 

* Credit assignment → one sparse reward over a 10^5-10^6 token trajectory
    → expensive rollouts also make GRPO-style algorithms more costly

* Verifier gaming
    → TMax rollouts were caught replacing test files with no-ops and faking binaries with simulated logs

* Harness-native training
    → production agents live inside complex deployment harnesses (which may not be in training data)
```

<br>

---

## 🐶 Lecture 12 ➡️ [How Evaluation Has Evolved with Frontier Model Progress](https://www.youtube.com/watch?v=dFafQmClYq4)

<br>

* Frontier evaluation is harder than it has ever been → benchmark-based release reactions barely matter at the frontier.

* The task length frontier models can complete doubles every `~7` months.

<br>

### The Eras of Post-Training Evaluation

<br>

* Benchmarks mirror the training goals of their era → the key to understanding evals: popular benchmarks are a reflection of the training best practices of their era:

```💡
* Chat era (2022-23) → basic knowledge and chat style

* Multi-skill era (2023-24) → post-training improves more skills than just chat

* Reasoning & tool eras (2024-26) → long chains of thought

* Agents & Real work (now) → e2e knowledge-work tasks inside products and harnesses
```

<br>

* Base models (before post-training):

```💡
→ few-shot prompting → base models can’t take a bare or formatted question

→ eval prompts carried example software of the patterns so the model continues the pattern

→ canonical evals: 5-shot MMLU, 8-shot GSM8K
```

<br>

* Multiple ways to extract an answer from a model:

```💡
* log-likelihood scoring: 
    → compare the probability the model assigns each answer option
    → either just the letter A or the full answer string
    → no sampling, fully deterministic

* Generation + exact match
    → sample a completion, extract the answer
    → mirrors real usage, and is standard for post-training since ~2024
    → aggregating multiple completions/samples gives majority voting

* Generation and extraction gave rise to answer-extraction formatting bugs
    → which only became more complex with agentic models today
```

<br>

* `pass@k` → the probability that at least one of `k` samples solves the problem → the naive route generates exactly `k` and reports whether any passed; this is a high-variance coin flip per problem, and plugging a small-sample success rate into `1 - (1 - p)^k` is biased → the fix, from the Codex paper: sample `n >= k` completions, count the `c` that pass, and average an unbiased estimator over problems → the knobs interact: higher temperature can hurt `pass@1` but help `pass@100`, so a reported `pass@1` depends on `n` and the sampling settings, not just the model.

* Chain of Thought emerged to enable progress on harder problems → few-shot examples that show intermediate steps let models reason before answering → when people were still prompting base models, adding CoT made math and reasoning scores jump.

* Entering the chat era → zero-shot instruction following → instruction tuning and then RLHF changed the way people expected to use models → the models learned to directly answer questions:

```💡
* LLM-as-a-judge emerged as questions became open-ended (and evals imitated RLHF training)

* Canonical evals → MT-Bench, AlpacaEval, and the community-scale Chatbot Arena

* MCQ evals like MMLU stayed in the mix - now answered zero-shot, sampling the answer letter at temperature 0
```

<br>

* The emergence of zero-shot prompting took time → when training Tulu 3 (summer 2024), many evaluations were a mix of zero-shot and few-shot prompting. → knowledge: MMLU, PopQA, TruthfulQA → Reasoning: BigBenchHard, DROP → Math & Code: MATH, GSM9K, HumanEval → Instruction following: IFEval.

* Modern eval suites carry per-benchmark prompts tuned for formatting → sampling settings joined the prompt as part of the eval: reasoning models need temperature > 0 for their best scores.

<br>

### Can we trust the number?

<br>

* Evaluation variance is everywhere:

```💡
* Sampling at temperature > 0 means re-running the same eval on the same models moves the score

* During Olmo3, we measured it → std. dev. across 3 runs of 14 models, per benchmark

* Most reasoning-era evals sit between 0.25 and 1.5 points of noise - before anyone changes a prompt or a sampling setting
```

<br>

* Managing eval noise:

```💡
* avg@k is the rescue 
    → LiveCodeBench was noisy and cheap → retuning 10x moved it from high-variance to very stable

* Variance also leaks in from infrastructure
    → batch size, tensor-parallel settings, numerics of long generations

* Practical rule
    → a ~1-point gap between two press releases is noise
```

<br>

* What evals are actually for inside frontier labs:

```💡
* Lab hillclimb on ~50 prioritized evals and report the public suite (subset) at the end

* The real product of a good internal evaluation is statistical power
    → less noise on the signals used to compare training runs

* Sometimes the “test set” is just good data
    → MATH and GSM8K train splits are high-quality and crucial at a time
    → if a lab doesn’t track that evaluation, training on them is a rational choice

* Human A/B testing and Elo stay in the loop for what benchmark makers can’t measure
```

<br>

* Established evaluation harnesses:

```💡
* Inspect
* lm-evaluation-harness
* LightEval
* OLMES
* HELM
* Eval Gauntlet 
* olmo-eval
* verifiers from Prime Intellect
```

<br>

---

## 🐶 Lecture 13 ➡️ [An Introduction to Character Training](http://youtube.com/watch?v=xECWRYBxq1E)

<br>

* Changing how a model behaves (in order of increasing effect and effort):

```💡
1. Prompt it

2. Steer its activations (manipulate the model’s internal state with no gradient updates)

3. Train it (character training, post-training designed to craft traits and manner into the weights)
```

<br>

### Character Training

<br>

* Features are sequences of words/tokens it repeats; behaviors are how those link together.
* Pipelines that control the specific language in training data.
* Constitution: principles that are inputs to the training process → principles sampled inside the data-generation pipeline, not a statement of final behavior; the model’s final behavior is an emergent result of running the pipeline over them (started by Anthropic).
* Model spec: states the intended final behavior → public document of goal model behaviors to guide experimentation and decision-making, allowing users to understand if a behavior/issue was an intended action they don’t agree with or a bug in the technical process (to be fixed later) → important sign of intent when compared to a more vague constitution (OpenAI).

<br>

### Who is a model spec for

<br>

* Model designers: clarity on which behaviors are wanted or not, easier prioritization decisions on data, a bigger picture above complex evaluation suites.
* Developers: a way to tell which behaviors are intentional vs. side effects of training.
* The observing public: one of the few public sources on what is prioritized in training; the substrate for regulatory oversight and effective policy.

<br>

### Character Training in Practice ([Maiya et al., 2025](https://arxiv.org/pdf/2511.01689))

<br>

* Workflow:

```💡
1. hand-written trait constitutions for multiple personas

2. pairwise preference data for DPO

3. synthetic introspective data for SFT
```

<br>

* Evals → instruct the model to embody one of two traits without verbalizing the choice, have an LLM judge which trait each of `25k` responses expresses, and compute an Elo score per trait.

<br>

### Character Elicitation Without Gradient Steps

<br>

> ✨ *Persona vectors → concepts are directions in latent space (Word2vec) → extract a trait’s direction from its description alone → an LLM writes prompt pairs to elicit / suppress it → steer by adding it back at inference (traits dial almost perfectly linearly and compose).* ✨

<br>

* The assistant axis → where the default persona lives → extract vectors for `275+` character archetypes and run PCA across them.

* Activation capping for precise intervention → same tool as persona-vector steering → add a vector to the activations at inference, but conditionally throughout 1) steering (persona vector slide), 2) capping (check how assistant-like activation is) → result: at some turn, the drifted model maintains the assistant personality.

* Persona subnetworks → mask in weight space → Frankle & Carbin (lottery-ticket-flavored hypothesis), 2019 pre-trained models already contain persona-specialized subnetworks → from a few hundred calibration examples, score each connection by weight magnitude vs. source-neuron activation and keep the top-`k` per row as a binary mask → Switching personas by swapping masks over frozen weights with only the most influence on the output → the downside is costly capability regression by turning off parts of the network → not scalable (yet).

* Big open question in character training → a spec is only as good as the effort spent making the model follow it.

<br>

---

<br>


#### *Thank you, Dr. Lambert, for a highly relevant journey (and a special thank you for all the math derivations and for reminding me how awesome partition functions are — a great tool from any physicist's toolkit).*

<br>

##### ✨*"Freedom is the only worthy goal in life. It is won by disregarding things that lie beyond our control."* - Epictetus (~100 AD) ✨

<br>

### ⬛️

