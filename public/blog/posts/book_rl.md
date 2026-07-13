---
title: 📚 BOOK → Reinforcement Learning I (Sutton & Barto, 2018)
subtitle: Rating: 10/10 | Audience: Intermediate to Advanced AI Scientists
date: 2026-07-04
---


I had touched a few chapters of this uber-classic a few times before — for instance, the first edition when I was taking graduate classes in **[machine learning](https://github.com/future-ai-org/ml-classifiers-and-experiments-py)** and **[robotics](https://github.com/autistic-symposium/robotics-matlab)** during my **[PhD at Stony Brook](https://www.astro.sunysb.edu/steinkirch)** a decade ago, or later when I was looking into **[training DeFi agents with Markov Chains](https://mirror.xyz/go-outside.eth/DKaWYobU7q3EvZw8x01J7uEmF_E8PfNN27j0VgxQhNQ)**.

But now, as I juggle deep research and the engineering and artistic work of building **[NULLSTAR](https://www.nullstar.games)**, it felt like the right time to read the book. I went through the first eight chapters and, as it turns out, I already knew much of the material from my PhD or industry practice, so this first part was a refreshing read (and also made me feel good about myself because I remembered that I know stuff). In a future post, I'll continue with Part II, Approximate Solution Methods. The glory of being a researcher is that the fun remains ad infinitum.

##### 💜🤖 Below are my highlights (with some attempt, although very moderate, at coherence).

<br>

---

## 🧑🏽‍🩰 Introduction to RL

<br>

- Reinforcement learning is a computational approach to understanding and automating goal-directed learning and decision making. It’s distinguished from other computational approaches by its emphasis on learning by an agent from interaction with its environment, without requiring exemplary supervision or complete models of the environment.

- RL uses the framework of Markov decision processes to define the interaction between a learning agent and its environment in terms of states, actions, and rewards (featuring cause and effect, uncertainty and nondeterminism, and explicit goals).

- Elements of an RL system: a policy (the learning agent’s way of behaving a given time - it could be a simple function or lookup table or a search process), a reward signal (defines the goal or a reinforcement learning problem, and the primary basis for altering the policy, in general they may be stochastic functions of the state of the environment and the actions taken), a value function, and optionally a model of the environment.

- Dynamic programming is the only feasible way of solving general stochastic optimal control problems - it suffers from the curse of dimensionality (its computational requirements grow exponentially with the number of state variables).

- John Tsitsiklis (1996) coined the term “neurodynamic programming” to refer to the combination of dynamic programming to artificial neural networks.

- Alan Turing (1948) described a design for a “pleasure-pain system” that worked along the lines of the Law of Effect: “When a configuration is reached for which the action is undetermined, a random choice for the missing data is made and the appropriate entry is made in the description, and is applied. When a pain stimulus occurs all tentative entries are cancelled, and when a pleasure stimulus occurs they are all made permanent.”

<br>

---

## 🧑🏽‍🩰 Multi-Armed Bandits

<br>

- RL, when comparing to other types of learning, uses training information that evaluates the actions taken, rather than instructs by giving correct actions. Purely evaluative feedback indicates how good the action taken was, but not whether it was the best or the worst action possible.

- Evaluative feedback depends on the action taken, whereas instructive feedback is independent of the action taken.

<br>

### A k-armed Bandit Problem (a slot machine with k levers)

<br>

1. You are faced repeatedly with a choice among k different options or actions
2. After each choice you receive a numerical reward chosen from a stationary probability distribution that depends on the action you selected - each of the k actions has an expected or mean reward given that that action is selected (the value of the action)
3. Your objective is to maximize the expected total reward over some time period, to time steps (the action on time step t is At, and the reward Rt)

<br>

- If you maintain estimates of the action values, then at any time step there is at least one action whose estimated value is greatest —> greedy actions. If you select one of these actions, you are exploiting the current knowledge of the values of the actions (maximizing in the current step). If you select the nongreedy actions, then you are exploring (maximizing in the long run).

- Action-value methods: methods for estimating the values of actions and for using the estimates to make action selection decisions. The true value of an action is the mean reward when that action is selected. Greedy action selection always exploits current knowledge to maximize immediate reward.

- The advantage of epsilon-greedy over greedy methods depends on the task. With noisier rewards (larger variance), it takes more exploration to find the optimal action, and epsilon-greedy methods should fare even better relative to the greedy method. If reward variances were zero, then the greedy method would know the true value of each action after trying it once. In this case, the greedy method might actually perform best because it would soon find the optimal action and then never explore.

- How to efficiently compute action values as sample averages of observed rewards (with constant memory and per-time-step computation)?

##### New Estimate <— Old Estimate + Step Size [ Target - Old Estimate]

<br>

- All the methods so far are dependent on the initial action-value estimates Q1(a) —> these methods are biased by their initial estimates

- Exploration is needed because there is always uncertainty about the accuracy of the action-value estimates.

- Gradient bandit algorithm —> a stochastic approximation to gradient ascent (each action preference would be incremented proportional to the increment’s effect on performance). The measure of the increment’s effect is the partial derivative of this performance with respect to the action preference.

- Nonassociative tasks: when there is no need to associate different actions with different situations -> the learned either tries to find a single best action when the task is stationary, or tries to track the best action as it changes over time when the task is non stationary.

<br>

---

## 🧑🏽‍🩰 Finite Markov Decision Processes

<br>

- The finite MDP problem involves evaluative feedback, as in bandits, but also on associative aspect - choosing different actions in different situations. They are a classical formalization of sequential decision making.

- MDPs are meant to be a straightforward framing of the problem of learning from interaction to achieve a goal. The learner and decision maker is called agent. Everything outside the agent is the environment (the thing it interacts with).

- In a Markov decision process, the probabilities given by p (a probability distribution for each choice of state and action) completely characterize the environment’s dynamics. 

- Markov Property: The state must include information about all aspects of the past agent-environment interaction that make a difference for the future. 

- The MDP framework is a considerable abstraction of the problem of goal-directed learning from interaction. It proposes that whatever the details of the sensory, memory, and control apparatus, and whatever objective one is trying to achieve, any problem of learning goal-directed behavior can be reduced to three signals passing back and forth between an agent and its environment: one signal to represent the basis on which the choices are made (the states), and one signal to define the agent’s goal (the rewards).

- The dynamics of a finite MDP can be represented as a transition graph, with two kinds of nodes: state nodes and action nodes (for each state-action pair).

- The purpose or goal of the agent is formalized in terms of rewards, passing from the environment to the agent (Rt) —> “all of what we mean by goals and purpose can be well thought of as the maximization of the reward of the cumulative sum of a received scalar signal”.

- Almost all RL algorithms involve estimating value functions (functions of state, or of state-action pairs) that estimate how good is for the agent to be in a given state.

- A policy is a mapping from states to probabilities of selecting each possible action. It’s changed as a result of its experience.

- A fundamental property of values functions used throughout RL and DP is that they satisfy recursive relationships

- Solving a RL tasks means finding a policy that achieves a lot of reward over the long run. There is always at least one policy that I better than or equal to all other policies (the optimal policy).

- The Bellman optimality equation has a unique solution -> It’s a system of equations, one for each state, so if there are n states, then there are n equations and n unknowns. If the dynamics p of the environment are known, then one can solve this system of equations using any one of a variety of methods for solving nonlinear equations. 

- Explicitly solving the Bellman optimality equation provides one route to finding an optimal policy, solving the RL problem. Thus solution relies on at least three assumptions that are rarely true in practice: 1) accurately know the dynamics of the environment; 2) have enough computational resources to complete the computation of the solution; 3) the Markov property. 

- Many different decision-making methods can be viewed as ways of approximately solving the Bellman optimality equation. For example, heuristic search methods can be viewed as expanding the equation several times, up to some depth, forming a tree of possibilities.

<br>

---

## 🧑🏽‍🩰 Dynamic Programming

<br>

- Dynamic programming refers to a collection of algorithms that can be used to compute optimal policies given a perfect model of the environment as a MDP. They are of limited utility in RL because of this assumption and because of their computational expense.

- A common way of obtaining approximate solutions for tasks with continuous states and actions is to quantize the state and action spaces and then apply finite-state DP methods.

- Policy evaluation (prediction problem) -> how to compute the state-value function v_pi for an arbitrary policy pi.

- All the updates done in DP algorithms are called expected updates because they are based on an expectation over all possible next states rather than on a sample next state.

- A reason for computing the value function for a policy is to help find better policies.  

- Policy iteration -> Each policy is guaranteed to be a strict improvement over the previous one, unless it’s already optimal.

- Value iteration combines, in each of its sweeps, one sweep of policy evaluation and one sweep of policy improvement. Faster convergence is often achieved by interposing multiple policy evaluation sweeps between each policy improvement sweep.

- Asynchronous DP algorithms are in-place iterative DP algorithms that are not organized in terms of systematic sweeps of the state set. These algorithms update the values of state in any order whatsoever, using whatever values of other states happen to be available.

- To converge correctly, an asynchronous algorithm must continue to update the values of all the states.

- Policy iteration consists of two simultaneous interacting processes: one making the value function consistent with the current policy (policy evaluation) and other making the policy greedy with respect to the current value function (policy improvement).

- Generalized policy iteration (GPI) -> letting policy evaluation and policy-improvement processes interact, independent of the granularity and other details of the two processes. If both the evaluation process and the improvement process stabilize (no long produce changes), then the value function and policy must be optimal.

- A DP method is guaranteed to find an optimal policy in polynomial time even though the total number of (deterministic) policies is k^n —> DP is exponentially faster than any direct search in policy space could be, because direct search would have to exhaustively examine each policy to provide the guarantee.

<br>

---

## 🧑🏽‍🩰 Monte Carlo Methods

<br>

>  *I've heavily used Monte Carlo methods throughout my life. One of those occasions was while working on my PhD thesis on the equation of state of neutron stars in collaboration with the Los Alamos National Laboratory.*

<br>

- Monte Carlo methods are ways of solving the RL problem based on averaging sample returns.

- Monte Carlo methods require only experience (sample sequences of states, actions, and rewards from actual or simulated interaction with an environment).

- The first-visit MC method estimates the value of the states as the average of the returns following first visits to the state. The every-visit MC method averages the returns following all visits to the state.

- The MC methods are essentially the same as just presented for state values, except now it’s a state-action pair (s, a) rather than to a state. These methods converge quadratically to the true expected values as the number of visits to each state-action pair approaches infinity.

- Monte Carlo estimation can be used in control, to approximate optimal policies. MC methods can be used to find optimal policies given only sample episodes and no other knowledge of the environment’s dynamics.

- Assumptions for the guarantee of convergence for the Monte Carlo method: 1) the episodes have exploring starts; 2) the policy evaluation could be done with an infinite number of episodes. For a practical algorithm, we remove both assumptions.

- For MC policy iteration, it’s natural to alternate between evaluation and improvement on an episode-by-episode basis. After each episode, the observed returns are used for policy evaluation - the policy is improved at all the states visited in the episode.

- All learning control methods face a dilemma: they seek to learn action values conditional on subsequent optimal behavior, but they need to behave non-optically in order to explore all actions (to find the optimal actions).

- How can they learn about the optimal policy while behaving according to an exploratory policy? Use two policies, one that is learned about and that becomes the optimal policy (target policy), and one that I more exploratory, and is used to generate behavior (off-policy learning).

- While on-policy methods estimate the value of a policy while using it for control, in off-policy methods, these two functions are separated. The policy used to generate behavior, called the behaviour policy, may in fact be unrelated to the policy that is evaluated and improved, called the target policy. The target policy may be deterministic (greedy), while the behavior policy can continue to sample all possible actions. In summary, in on-policy, the agent commits to always exploring and tries to find the best policy that still explores, in off-policy, the agent explores but learns a deterministic optimal policy that may be unrelated to the policy followed.

- The MC methods presented in this chapter learn value functions and optimal policies from experience in the form of sample episodes, giving them at least three kinds of advantages over DP methods. First, they can be used to learn optimal behaviour directly from interaction with the environment, with no model of the environment’s dynamics. Second, they can be used with simulation or sample models. Third, it’s easy and efficient to focus MC methods on a small subset of the states.

<br>

-----

## 🧑🏽‍🩰 Temporal-Difference Learning

<br>

- TD Learning is a combination of MC (the sampling, or learning directly from raw experience without a model of the environment’s dynamics) and DP ideas (the bootstrapping, or updating estimates based in part on other learned estimates, without waiting for a final outcome).

- We start by focusing on the policy evaluation or prediction problem: estimating the value function v_pi for a given policy pi. For the control problem (finding an optimal policy), DP, TC, and MC all use som variation of generalized policy iteration (GPI).

- TD methods update their estimates based in part on other estimates. They learn a guess from a guess (bootstrap). 

- Their advantage over DP is that they do not require a model of the environment, of its reward and next-state probability distribution.

- Their advantage over MC is that they are naturally implemented in an online, fully incremental fashion. In MC one needs to wait an entire episode, but in TD one need wait only one step.

- For any fixed policy pi, TD(0) has been proved to converge to v_pi, in the mean for a constant step-size parameter if it’s sufficiently small, and with probability 1 if the step-size parameter decreases according to the usual stochastic approximation conditions.

- A Markov reward process (MRP) is a Markov decision process without actions.They are used on prediction problems, when there is no need to distinguish the dynamics due to the environment form those due to the agent.

- Under batch updating, TD(0) converges deterministically to a single answer independent of the step-size parameter, alpha, as long it is chosen sufficiently small.

- On tasks with large state spaces, TC methods may be the only feasible way of approximating the certainty-equivalence solution.

- Sarsa prediction method: on-policy TD control. The convergence depends on the nature of the policy’s dependence on Q. Sarsa converges with probability 1 to an optimal policy and action-value function as long as all state-action pairs are visited an infinite number of times and the policy converges in the limit to the greedy policy.

- Q-learning: off-policy TD control algorithm where the learned action-value function, Q, directly approximates q*, the optimal action-value function, independent of the policy being followed. This simplifies the analysis of the algorithm and enables early convergence proofs.

- Maximization bias -> All the control algorithms that we have discussed so far involve maximization in the construction of their target policies. A maximum over estimated values is used as an estimate of the maximum value, which lead to a significant positive bias. Consider a single state s where there are many actions a whose true values, q(s, a), are all zero but whose estimated values, Q(s, a), are uncertain and this distributed some above and some below zero. The maximum of the true values is zero, but the maximum of the estimates is positive, a positive bias.

<br>

----

## 🧑🏽‍🩰 n-step Bootstrapping

<br>

- Unify MC and one-step TD into n-step TD methods, which enables bootstrapping to occur over multiple steps.
- n-step methods can be combined with Sarsa in a straightforward way to produce an on-policy TD control method. The main idea is to switch states for actions (state-action pairs) and then use an epsilon-greedy policy.
- Off-policy learning is learning the value function for one policy, pi (the greedy policy for the current action-value function estimate), while following another policy, b (a more exploratory policy, perhaps epsilon-greedy). In order to use the data from b, we must take into account the difference between the two policies, using their relative probability of taking the actions that were taken.
- For a conventional n-step method, the learning rule to use in conjunction with the n-step TD update, which has no explicit importance sampling ratios other than those embedded in the return.
- For action values, the off-policy definition of the n-step return is a little different because the first action does not play a role in the importance sampling. That first action is the one being learned; it does not matter if it was unlikely or even impossible under the target policy - it has been taken and now full unit weight must be given to the reward and state that follows it.
- The n-step method for off-policy learning without importance sampling is called tree-backup algorithm.
- All n-step methods involve a delay of n time steps before updating, as only then are all the required future events known. Compared to one-step methods, n-step methods also require more memory to record the states, actions, rewards, and sometimes other variables over the last n time steps.
- We developed two approaches to off-policy learning in the n-step case: one, based on importance sampling is simple but can be of high variance. The other, based on tree-backup updates, is the natural extension of Q-learning to the multi-step case with stochastic target policies.

<br>

---

## 🧑🏽‍🩰 Planning and Learning with Tabular Methods

<br>

- A unified view of RL methods that require a model of the environment (model-based, relying on planning), such as DP and heuristic search, and methods that can be used without a model (model-free, relying on learning), such as MC and TD. All the methods are based on looking ahead to future events, computing a backed-up value, and then using it as an update target for an approximate value function.
- A mode of the environment is anything that an agent can use to predict how the environment will respond to its action. Given a state and an action, a model produces a prediction of the resultant next state and  next reward. If the model is stochastic, then there are several possible next states and next rewards, each with some probability of occurring. Some models produce a description of all possibilities and their probabilities, called distribution models. Other models produce just one of the possibilities, sampled according to the probabilities, called sample models.
- State-space planning is a search through the state space for an optimal policy or an optimal path to a goal. Actions cause transitions from state to state, and value functions are computed over states.
- Plan-space planning is a search through the space of plans. Operators transform one plan into another, and value functions are defined over the space of plans.
- All state-space planning methods share a common structure: 1) computing value functions as a key intermediate step toward improving the policy, and 2) compute value functions by updates of backup operations applied to simulated experience.
- Within a planning agent, there are at least two roles for the real experience: it can be used to improve a model (to make it more accurately match the real environment, model-learning) and it can be used to improve the value function and policy using RL methods (direct reinforcement learning).
- During planning, the Q-planning algorithm randomly samples only from state-action pairs that have previously been experienced, so the model is never queried with a pair about which it has no information. 
- We use the term search control to refer to the process that selects the starting states and actions for the simulated experiences generated by the model.
- In Dyna-Q, learning and planning are accomplished by exactly the same algorithm, operating on real experience for learning and on simulated experience for planning. Because planning proceeds incrementally, it’s trivial to intermix planning and acting.
- The models may be incorrect because the environment is stochastic and only a limited number of samples have been observed, or because the model was learned using function approximation that has generalized imperfectly, or because the environment has changed and its new behavior has not yet been observed.
- In a planning context, exploration means trying actions that improve the model, whereas exploitation means behaving in the optimal way given the current model.
- The Dyna-Q+ agent keeps track for each state-action pair of how many time steps have elapsed since the pair was last tried in a real interaction with the environment. The more time that has elapsed, the greater the chance that the dynamics of this pair has changed and that the model of it is incorrect.
- Prioritized sweeping: as the frontier of useful propagates backward, it often grows rapidly producing many state-action pairs that could be updated. But not all of these will be equally useful. In a stochastic environment, variations in estimated transition probabilities also contribute to variations in the sizes, of changes in the urgency with which pairs need to be updated. It’s natural to prioritize the updates according to a measure of their urgency, and perform them in order of priority.
- Trajectory Sampling -> In an episodic task, one starts in a start state and simulates until the terminal state. In a continuing task, one starts anywhere and just keeps simulating. In either case, sample state transitions and rewards are given by the model, and sample actions are given by the current policy (one simulates explicit individual trajectories and performs updates at the state or state-action pairs encountered along the way).
- Monte Carlo Tree Search (MCTS) is a great example of decision-time planning. It’s a rollout algorithm enhanced by the addition of a means of accumulating value estimates obtained from the Monte Carlo simulations to successively direct simulations toward more highly-rewarding trajectories. The core idea is to successively focus multiple simulations starting at the current state by extending the initial portions of trajectories that have received high evaluations from earlier simulations. When both the rollout policy and the model do not require a lot of computation, many simulated trajectories can be generated in a short period of time. MC value estimates are maintained only for the subset of state-action pairs that are most likely to be reached in a few steps, which form a tree rooted at the current state. MCTS incrementally extends the tree by adding nodes representing states that look promising based on the results of the simulated trajectories. Any simulated trajectory will pass through the tree and then exit it at some leaf node. Outside the tree and at the leaf node, the rollout policy is used for action selections, but at the states inside the tree something better is possible. For these states we have value estimates for of at least some of the actions, so we can pick among them using an informed policy, called the tree policy, that balances exploration and exploitation. 
- Each iteration of a basic version of MCTS consists of 1) Selection (a tree policy based on the action values attached to the edges of the tree traverses the tree to select a leaf node); 2) Expansion (the tree is expanded from the selected leaf node by adding one more child nodes reached from the selected node via unexplored actions); 3) Simulation (from the selected node, or from one if its newly-added child nodes, simulations of a complete episode is run with actions selected by the rollout policy); and 4) Backup (the return generated by the simulated episode is backed up to update or to initialize, the action values attached to the edges of the tree transversed by the tree policy in its iteration of MCTS).

<br>

⬛️