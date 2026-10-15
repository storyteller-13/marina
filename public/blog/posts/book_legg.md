---
title: 📚 BOOK → Machine Super Intelligence (S. Legg, 2008)
subtitle: Rating: 10/10 | Audience: Beginner to Advanced AI Scientists | Today's Word: Future 未来 · עתיד
date: 2026; 10; 16
---

![](/blog/assets/norris.webp)

<br>

> [🎶](https://www.youtube.com/watch?v=4umozIM4Yqc) *“Intelligence is the ability to use optimally limited resources – including time – to achieve goals”.* - Ray Kurzweil, 2000

<br>

```
If men could only see the cause, and why
This mountain of distress weighs down the mind,
They’d drop all else and study to find out
The Universe’s Nature and its layout
Since it’s our status for eternity
That is at issue here, and not just one
Brief hour — the state in which all mortals must
Spend time to come, when once our days are done.

— Lucretius
```
<br>

**[Happy friday](https://www.youtube.com/watch?v=rqKgGwqLotE)**, my dear anon. We’re back for another weekend’s collective research into human and machine superintelligence. Today, we’ll explore **[the thesis of one of DeepMind’s co-founders](https://www.vetta.org/documents/Machine_Super_Intelligence.pdf)**, which concerns the “optimal behavior of agents in unknown computable environments,” also known as universal artificial intelligence. Very well written. It was a **[delightful](https://www.youtube.com/watch?v=uLu1cTKBspI&list=LL)** journey through the nature and measurement of intelligence, the concept and measure of universal artificial intelligence, the optimality of AIXI, the limits of computational agents, and the fundamental temporal difference learning. At another time, we might review **[Legg's full publication list as well](https://www.vetta.org/publications/).**

As I read through today's material, below are my highlights — with a moderate attempt at coherence — for my personal inventory (and perhaps as a way to connect with other friendly AI scientists and builders out there who love talking about the same things). As always, remember the rules:

**🤖 If you see a 👾, it means I found something particularly cool or learned something new.**
**🤖 If you see a ✨, it means things that are so cool that they need a lil glitter around them.**
**🤖 If these notes look interesting to you, it's your ✦moral duty✦ to read the original books.**
**🤖 Just another blog, but not your usual blog: they're living notes that I change as I fancy.**

<br>

----

# 🧳 Nature and Measurement of Intelligence

<br>

- The foundations of universal intelligence date back to the origins of philosophy and inductive inference. Universal artificial intelligence proper started with the work of Ray J. Solomonoff in the 1960’s. Solomonoff was considering the problem of predicting binary sequences. What he discovered was a formulation for an inductive inference system that can be proven to very rapidly learn to optimally predict any sequence that has a computable probability distribution. (…) by considering special cases of Solomonoff’s model, one can recover well known statistical principles such as maximum likelihood, minimum description length and maximum entropy. 

- The main theoretical limitation of Solomonoff induction is that it only addresses the problem of passive inductive learning, in particular sequence prediction. Whether the agent’s predictions are correct or not has no effect on the future observed sequence. Thus the agent is passive in the sense that it is unable to influence the future.

- In the late 1990’s Marcus Hutter extended Solomonoff’s passive induction model to the active case by combining it with sequential decision theory. This produced a theory of universal agents, and in particular a universal agent for a very general class of interactive environments, known as the AIXI agent. Hutter was able to prove that the behaviour of universal agents converges to optimal in any setting where this is at all possible for a general agent, and that these agents are Pareto optimal in the sense that no agent can perform as well in all environments and strictly better in at least one. These are the strongest known results for a completely general purpose agent. Given that AIXI has such generality and extreme performance characteristics, it can be considered to be a theoretical model of a super intelligent agent. Unfortunately, even stronger results showing that AIXI converges to optimal behaviour rapidly, similar to Solomonoff’s convergence result, have been shown to be impossible in some settings, and remain open questions in others.

<br>

> *In which settings the behaviour of universal agents converges to optimal, the way in which AIXI theory relates to the concept and definition of intelligence, the limitations that computable agents face when trying to approximate theoretical super intelligent agents such as AIXI??*

<br>

- A central question in the study of intelligence concerns whether intelligence should be viewed as one ability, or many. On one side of the debate are the theories that view intelligence as consisting of many different components and that identifying these components is important to understanding intelligence. Different theories propose different ways to do this. One of the first was Thurstone’s “multiple-factors” theory which considers seven “primary mental abilities”: verbal comprehension, word fluency, number facility, spatial visualisation, associative memory, perceptual speed and reasoning (Thurstone, 1938). Another approach is Sternberg’s “Triarchic Mind” which breaks intelligence down into analytical intelligence, creative intelligence, and practical intelligence (Sternberg, 1985), however this model is now considered outdated, even by Sternberg himself.


-  A recently popular approach is Gardner’s “multiple intelligences” where he argues that the components of human intelligence are sufficiently separate that they are actually different “intelligences”(Gardner, 1993). Based on the structure of the human brain he identifies these intelligences to be linguistic, musical, logical-mathematical, spatial, bodily kinaesthetic, intra-personal and inter-personal intelligence. Although Gardner’s theory of multiple intelligences has certainly captured the imagination of the public, it remains to be seen to what degree it will have a lasting impact in professional circles.

- At the other end of the spectrum is the work of Spearman and those that have followed in his approach. Here intelligence is seen as a very general mental ability that underlies and contributes to all other mental abilities. As evidence they point to the fact that an individual’s performance levels in reasoning, association, linguistic, spatial thinking, pattern identification etc. are positively correlated. Spearman called this positive statistical correlation beween different mental abilities the “g-factor”, where g stands for “general intelligence” (Spearman, 1927). 

- Perhaps the most elementary common feature of these definitions is that intelligence is seen as a property of an individual who is interacting with an external environment, problem or situation.

<br>

> *Intelligence is not the ability to deal with a fully known environment, but rather the ability to deal with some range of possibilities which cannot be wholly anticipated. What is important then is that the individual is able to quickly learn and adapt so as to perform as well as possible over a wide range of environments, situations, tasks and problems.*

> *“Intelligence is a very general mental capability that, among other things, involves the ability to reason, plan, solve problems, think abstractly, comprehend complex ideas, learn quickly and learn from experience.” - Gottfredson (1997a)*

> *Intelligent systems are expected to work, and work well, in many different environments. Their property of intelligence allows them to maximize the probability of success even if full knowledge of the situation is not available. Functioning of intelligent systems cannot be considered separately from the environment and the concrete situation including the goal.” Gudwin (2000)*

> *We define two perspectives on artificial system intelligence: (1) native intelligence, expressed in the specified complexity inherent in the information content of the system, and (2) performance intelligence, expressed in the successful (i.e., goal-achieving) performance of the system in a complicated environment.” Horst (2002)*

<br>

- 👾 The ability to recognise patterns tested, but also the ability to evaluate the complexity of different explanations and then correctly apply the philosophical principle of Occam’s razor.

<br>

> The classic approach to determining whether a machine is intelligent is the so called Turing test (Turing, 1950) which has been extensively debated over the last 50 years (Saygin et al., 2000). Turing realised how difficult it would be to directly define intelligence and thus attempted to side step the issue by setting up his now famous imitation game: if human judges cannot effectively discriminate between a computer and a human through teletyped conversation then we must conclude that the computer is intelligent. (…) he Turing test has other problems as well. Current AI systems are a long way from being able to pass an unrestricted Turing test. From a practical point of view this means that the full Turing test is unable to offer much guidance to our work. Indeed, even though the Turing test is the most famous test of machine intelligence, almost no current research in artificial intelligence is specifically directed towards passing it. Simply restricting the domain of conversation in the Turing test to make the test easier, as is done in the Loebner competition (Loebner, 1990), is not sufficient. With restricted conversation possibilities the most successful Loebner entrants are even more focused on faking human fallibility, rather than anything resembling intelligence (Hutchens, 1996). Finally, the Turing test returns different results depending on who the human judges are. Its unreliability has in some cases lead to clearly unintelligent machines being classified as human, and at least one instance of a human actually failing a Turing test. When queried about the latter, one of the judges explained that “no human being would have that amount of knowledge about Shakespeare”(Shieber, 1994).

<br>

- Mahoney has proposed a particularly simple solution to the binary pass or fail problem with the Turing test: replace the Turing test with a text compression test (Mahoney, 1999). In essence this is somewhat similar to a “Cloze test” where an individual’s comprehension and knowledge in a domain is estimated by having them guess missing words from a passage of text.

- One perspective among psychologists is that intelligence is “the ability to deal with complexity”(Gottfredson, 1997b). Thus, in a test of intelligence, the most difficult questions are the ones that are the most complex because these will, by definition, require the most intelligence to solve. It follows then that if we could formally define and measure the complexity of test problems using complexity theory we could construct a formal test of intelligence. The possibility of doing this was perhaps first suggested by Chaitin (1982). While this path requires numerous difficulties to be dealt with, we believe that it is the most natural and offers many advantages: it is formally motivated and precisely defined, and potentially could be used to measure the performance of both computers and biological systems on the same scale without the problem of bias towards any particular species or culture.

- As Kolmogorov complexity is not computable, the C-Test instead uses Levin’s related Kt complexity (Levin, 1973). In order to retain the invariance property of Kolmogorov complexity, Levin complexity requires the additional assumption that the universal Turing machines are able to simulate each other in linear time, for example, pointer machines. As far as we know, this is the only formal definition of intelligence that has so far produced a usable test of intelligence.

<br>

----

# 🧳 Hutter’s Universal Artificial Intelligence

<br>

### Inductive Inference

<br>

- Inductive inference is the process by which one observes the world and then infers the causes behind what has been observed. This is a key process by which we try to understand the universe and so naturally examples of it abound. Indeed much of science can be viewed as a process.

<br>

>  *Inductive inference has a long history in philosophy. An early thinker on the subject was the Greek philosopher Epicurus (342? B.C. – 270 B.C.) who noted that there typically exist many hypotheses which are consistent with all of the available data. Logically then, we cannot use the data to rule out any of these hypotheses; they must all be kept as potential explanations. This is known as Epicurus’ principle of multiple explanations and is often stated as, “Keep all hypotheses that are consistent with the data”.*

<br>

### Bayes’ Rule

<br>

- Bayes’ rule partially solves the induction problem by providing an equation for updating beliefs.

- Although fundamental, the principles of Epicurus and Occam by themselves are insufficient to provide us with a mechanism for performing inductive inference. A major step forward in this direction came from the English mathematician and Presbyterian minister, Thomas Bayes (1702 – 1761). In inductive inference we seek to find the most likely hypothesis, or hypotheses, given the data → The Baye’s rule.

- To this day professional statisticians can be roughly divided into Bayesians who accept the rule, and classical statisticians who do not. The debate is a subtle and complex one and there are many different positions within each of the two camps. At the core of the debate is the very notion of what probability means, and in particular what the prior probability `P(h)` means.

- If classical statistical methods could avoid the problem of prior bias when dealing with small data sets then this would be a significant argument in their favour. However Bayesians argue that all systems of inductive inference that obey some basic consistency principles define, either explicitly or implicitly, a prior distribution over hypotheses. Thus, methods from classical statistics make assumptions that are in effect equivalent to defining a prior. The difference is that in Bayesian statistics these assumptions take the form of an explicit prior distribution. In other words, it is not that prior bias in Bayesian statistics is necessarily any better or worse than in classical statistics, it is simply more transparent.

<br>

### Binary Sequence Prediction

<br>

- An alternate characterisation of inductive inference can be made in terms of binary sequence prediction. The problem can be formulated as follows: There is an unknown probability distribution `μ` over the space of binary sequences `B∞`. From this distribution a sequence `ω` is drawn one bit at a time. At time `t ∈ N` we have observed the initial string `ω1:t := ω1ω2 . . . ωt`, and our task is to predict what the next bit in the sequence will be, that is,`ωt + 1`. To do this we select a model, or models, from a set of potential models that explain the observed sequence so far and that, we hope, will be good at predicting future bits in the sequence.


- Finding a good prior over such spaces is not trivial. Furthermore, actually computing Bayes’ rule and finding the most likely models, as we did in the example above, can become very computationally difficult and may need to be approximated. In any case, Bayes’ rule at least tells us how to solve the induction problem in theory, so long as we have a prior distribution. (…) The fact that we can use one prior to define the other means that the two unknown priors are in fact two perspectives on the same fundamental problem of specifying our prior knowledge.

<br>

### Solomonoff’s Prior and Kolmogorov Complexity

<br>

- Solomonoff defined his prior distribution over sequences as follows: The prior probability that a sequence begins with a string `x ∈ B∗` is the probability that a universal Turing machine running a randomly generated program computes a sequence that begins with `x`. (…) Although  Solomonoff’s definition requires nothing more than random bits being fed into a universal Turing machine, we can see that the resulting distribution over sequences neatly formalises Occam’s razor.

- Kolmogorov complexity has many powerful theoretical properties and is a central ingredient in the theory of universal artificial intelligence. Its most important property is that the complexity it assigns to strings and sequences does not depend too much on the choice of the universal Turing machine `U`. This comes from the fact that universal Turing machines are universal in the sense that they are able to simulate each other with a constant number of additional input bits. (…) The biggest problem with Kolmogorov complexity is that the value of `K` is not in general computable. It can only be approximated from above. The reason for this is that in general we cannot find the shortest program to compute a string `x` on `U` due to the halting problem. Intuitively, there might exist a very short program `p∗` such that `U(p∗) = x`, however we do not know this because `p∗` takes such a long time to run.

<br>

### Solomonoff-Levin Prior

<br>

- Besides the prior described in the previous section, Solomonoff also suggested to define a universal prior by taking a mixture of distributions (Solomonoff, 1964). In the 1970’s this alternate approach was generalised and further developed (Zvonkin and Levin, 1970; Levin, 1974). (…) The Solomonoff prior `M` and Solomonoff-Levin prior `ξ` lie within a multiplicative constant of each other.

- Intuitively one may think of a semi-measure that is not a probability measure as being a kind of defective probability measure whose probabilities do not quite add up as they should. This defect can be fixed in the sense that a semi-measure can be built up to be a probability measure by appropriately normalising things.

- Intuitively, a function is enumerable if it can be progressively approximated from below. With the approximation function converging to `f` from above rather than below, we say that `f` is coenumerable.

<br>

> *We define the complexity of an enumerable semi-measure to be the length of the shortest program that computes its index.*

<br>

### Universal Inference

<br>

- When approaching an inductive inference problem from a Bayesian perspective, the first step is to define `H`. The most obvious consideration is that `H` should be large enough to contain the correct hypothesis, or at least a sufficiently close one. Having selected `H`, the next problem is to define a good prior distribution over this space. The standard solution is to select a prior that is in some sense neutral about the relative likelihood of different hypotheses. This is known as the indifference principle.

- The standard Bayesian approach is to try to find a symmetry group for the problem and a prior that is invariant under group transformations. However, in some cases there may be no obvious symmetry, and even if there is the resulting prior may be improper, meaning that the area under the distribution is no longer 1. Invariance under group transformations is a highly desirable but difficult property to attain. Remarkably, under simple group transformations `PMe` can be proven to be invariant, again up to a small  ultiplicative constant. For a proof of this, as well as further powerful properties of the universial prior distribution, see the paper that this section is based on (Hutter, 2007a).

<br>

### Solomonoff Induction

<br>

- The total of all the prediction errors over the length of the infinite sequence `ω` is bounded by a constant. This implies rapid convergence for any unknown hypothesis that can be described by a computable distribution. This set includes all computable hypotheses over binary strings, which is essentially the set of all well defined hypotheses. If it were not for the fact that the universal prior `ξ` is not computable, Solomonoff induction would be the ultimate all purpose universal predictor.

- The application of dominance to obtain powerful convergence results that lies at the heart of Solomonoff induction, and indeed universal artificial intelligence in general.

- Although Solomonoff induction does not yield a prediction algorithm itself, it does provide a theoretical framework that can be used to understand various practical inductive inference methods. It is a kind of ideal, but unattainable, model of optimal inductive inference.

<br>

### Agent-environment Model

<br>

- More powerful is the class of active agents which not only observe their environment, they are also able to take actions that may affect the environment. Such agents are able to explore and achieve goals in their environment.

- Formally, the agent is a function, denoted by `π`, which takes the current history as input and chooses the next action as output. We do not want to restrict the agent in any way, in particular we do not require that it is deterministic. A convenient way of representing the agent then is as a probability measure over actions conditioned on the complete interaction history.

- A deterministic agent is simply one that always assigns a probability of 1 to a single action for any given history. As the history that the agent can use to select its action expands indefinitely, the agent need not be Markovian. Indeed, how the agent produces its distribution over actions for any given history is left open.

<br>

### Optimal Informed Agents

<br>

- The optimal agent for an environment `μ` and discounting `γ` is the agent `πμ` that has maximal expected future discounted reward.

- The optimal agent takes the distribution `μ`, and in effect does a brute force search through all possible futures looking for the action in the current cycle that maximises the expected future discounted reward. The agent knows that the environment will always respond according to the distribution μ, thus in each cycle it takes the expectation by summing over all the possible observations x and weighting these by their probability according to `μ`. Furthermore, as the agent always follows an optimal strategy, its own future actions are just a series of value maximising actions.

<br>

### Universal AIXI Agent

<br>

- Although the agent `πμ` performs optimally in environment `μ`, this does not meet the requirements for intelligence according to our definition. What we require is a general agent that works well in many different environments. Such an agent must learn about its environment by interacting with it, and then modify its behaviour accordingly in order to optimise performance. 

- Solomonoff’s solution was to replace the unknown `μ` in the optimal predictor with a universal prior distribution, such as `ξ`. This produced an extremely powerful universal predictor that rapidly converged to optimal predictions whenever the distribution `μ` was computable.

- Hutter’s innovation was to do essentially the same trick for active agents: he took the optimal active agent `πμ`, described in the previous section, and replaced the unknown `μ` with a generalised universal prior distribution `ξ`. This produced `πξ` , also known as AIXI.

<br>

> *It can be shown that the space of all  enumerable chronological semi-measures can be effectively enumerated.*

> (Heaven and Hell) Imagine an environment where in the first cycle the agent is faced with two unmarked doors, one of which must be opened. One of these doors leads to “heaven” where the agent receives plentiful rewards, and the other leads to “hell” where the agent never gets any reward. Once a door is chosen there is no way to go back, the agent is stuck in either heaven or hell forever. This is no problem for `πμ` as it knows μ and so it knows which door to take to get to heaven. Thus it always achieves maximal future discounted reward. The agent `πξ` , on the other hand, must learn through experience. Of course once it has the necessary experience to make the right choice, it may already be too late. All `πξ` can do is to guess which door to take and hope for the best. Obviously the expected performance of `πξ` will be far below that of `πμ`.

<br>

- Pareto optimal → The most elementary property that an optimal general agent must have is that there should not exist any other agent that is strictly superior. (…) Pareto optimality does not rule out the possibility that some other agent exists which performs better in some environment in `E`.

- With high probability, the performance of the agent `π` converges to the performance of the optimal agent.

- `π` is self-optimising for the set of environments `E` if it is self-optimising for every environment in `E`. 

<br>

> For any class of environments for which there exists a self-optimising agent, the agent `πζ` defined over this class is also self-optimising. Thus, in order to understand the performance of `πζ` across a wide range of environments, we need to understand which classes of environments admit self-optimising agents, and which do not.

<br>

----

# 🧳 Taxonomy of Environments

<br>

![](/blog/assets/self-opt-agents.png)

<br>

### Passive Environments

<br>

- Such environments are not affected by the agent’s actions → A Bernoulli scheme is an environment `(A, X , μ)` such that `∀ a x1:k,μ(ax<kaxk) = μ(xk)`. As the random variables `x1, x2, . . .` are independent and identically distributed (i.i.d.), one may think of a Bernoulli scheme as being an i.i.d. process.

-  Markov chain is an environment `(A, X , μ)` that is a Bernoulli scheme `∀ ax1`, and `∀ ax1:k` with `k > 1`.

- From the definitions of Bernoulli schemes and Markov chains it is clear that in both of these classes an agent is “passive”, in the sense that its actions have no effect on the environment’s behaviour. The difference between the two classes is the size of the history that is relevant to determining the next perception.

<br>

### Active Environments

<br>

- Bandit environment → The simplest active environment is one where the next perception `xk` depends on only the last action `ak`. Bandit environments are weaker than Markov chains as future perceptions do not depend on past observations.

- A (stationary) Markov Decision Process (MDP) is an environment `(A, X , μ)` that is a Bernoulli scheme that the agent does not act before the first perception.

- `nth` order Markov chains to standard Markov chains, except that now we have to deal with the complication of having actions in the history.

<br>

### Ergodic MDPs

<br>

- A Markov chain is ergodic if the current observation cannot impose any long term constraints on future observation. Given that the reward in a Markov chain only depends on the last observation, being ergodic also implies that the current observation does not place any long term constraints on future rewards either. Although the ergodic property is typically studied in the context of Markov chains, in this section we will extend the notion to MDP.

- We say that two observations communicate if it is possible to go from one observation to the other and return after some finite number of steps. A communicating class is a set of observations that all communicate with each other, and do not communicate with any observations outside this set. If all observations of the Markov chain belong to the same communicating class, we say that the Markov chain is irreducible. An observation has period `k` if any return to the observation must occur in some multiple of `k` time steps and `k` is the largest number with this property. 

- A Markov chain environment `(A, X , μ)` is ergodic if and only if it is irreducible and aperiodic. Ergodic MDPs admit self-optimising agents.

- Consider again the Heaven and Hell environment, after the first interaction cycle the agent is always in either heaven or hell. Furthermore, no matter what the agent does, it cannot switch between being in heaven or being in hell, it is stuck in its current location for all eternity. Thus, no matter what agent we select we cannot create a Markov chain such that the observations of being in heaven communicate with the observations of being in hell, and so this MDP environment is not ergodic.

<br>

### Environments that admit self-optimizing agents

<br>

- Bernoulli schemes are ergodic MDPs.

- Classification problems are ergodic MDPs.

- Bandits are ergodic MDPs.

- Repeated strategic games are reducible to ergodic MDP.

<br>

----

# 🧳 Universal Intelligence Measure

<br>

![](/blog/assets/intel_tests.png)

<br>

### A Formal Definition Of Machine Intelligence

<br>

> *Intelligence measures an agent’s ability to achieve goals in a wide range of environments.*

<br>

- Our definition of an agent’s intelligence also requires there to be some kind of goal for the agent to try to achieve. Perhaps an agent could be intelligent, in an abstract sense, without having any objective to apply its intelligence to. Or perhaps the agent has no desire to exercise its intelligence in a way that affects its environment. In either case, the agent’s intelligence would be unobservable and, more importantly, of no practical consequence. Intelligence then, at least the concrete kind that interests us, comes into effect when the agent has an objective or goal that it actively pursues by interacting with its environment.

- We define an additional communication channel with the simplest possible semantics: a signal that indicates how good the agent’s current situation is. We will call this signal the reward. The agent simply has to maximise the amount of reward it receives, which is a function of the goal. In a complex setting the agent might be rewarded for winning a game or solving a puzzle. If the agent is to succeed in its environment, that is, receive a lot of reward, it must learn about the structure of the environment and in particular what it needs to do in order to get reward.

-  Occam’s razor assigns to each hypothesis a prior probability of it being the correct model according to its complexity. It says nothing about how relevant or useful that hypothesis might be to the agent’s goals. 

<br>

> The universal intelligence of an agent `π` is its expected performance with respect to the universal distribution `2^−K(μ)` over the space of all computable reward-summable environments `E`.

<br>

### Universal intelligence of various agents

<br>

- The agent with the lowest intelligence, at least among those that are not actively trying to perform badly, would be one that makes uniformly random actions. We will call this `πrand`. Although this is clearly a weak agent, we cannot simply conclude that the value of `V^πrand_μ` will always be low as some environments will generate high reward no matter what the agent does.

- A very intelligent agent would perform well in simple environments, and reasonably well compared to most other agents in more complex environments.

- A super intelligent agent. Consider what would be required to maximise the value of `Υ`. By definition, a “perfect” agent would always pick the action which had greatest expected future reward. To do this, for every environment `μ ∈ E` the agent must take into account how likely it is that it is facing `μ`, given the interaction history so far and the prior probability of `μ`, that is, `2−K(μ)`. It would then consider all possible future interactions that might occur, how likely they are, and from this select the action in the current cycle that maximises the expected future reward.

<br>

### Properties of Universal Intelligence

<br>

- Valid → The most important property of any proposed formal definition of intelligence is that it does indeed describe something that can reasonably be called intelligence.

- Informative → `Υ(π)` assigns to agent `π` a real value that is independent of the performance of other possible agents. Thus we can make direct comparisons between many different agents on a single scale.

- Wide range → Universal intelligence spans trivial learning algorithms right up to incomputable super intelligent agents. 

- General → A well defined measure of intelligence that is broader than universal intelligence would seem to contradict the Church-Turing thesis as it would imply that we could effectively measure an agent’s performance for some well defined problem that was outside of the space of computable measures.

- Dynamic →  Universal intelligence includes environments in which the agent has to learn and adapt its behaviour over time in order to maximise reward.

- Unbiased → In a standard intelligence test, an individual’s performance is judged on specific kinds of problems, and then these scores are combined to produce an overall result. Thus the outcome of the test depends on which types of problems it uses, and how each score is weighted to produce the end result.

- Fundamental → Universal intelligence is based on Turing computation, information and complexity. These are fundamental universal concepts that are unlikely to change in the future with changes in technology. It also means that universal intelligence is in no way anthropocentric.

- Formal and objective → As universal intelligence is expressed as a mathematical equation, there is little space for ambiguity in the definition.

- Fully defined → For a fixed reference machine, the universal intelligence measure is fully defined. In comparison, some tests of machine intelligence have aspects which are currently unspecified and in need of further research.

- Impractical → In its current form the definition cannot be directly turned into a test of intelligence as the Kolmogorov complexity function is not computable.

<br>

> *But you don’t deal with consciousness (or creativity, imagination, freewill, emotion, love, soul, etc.) We apply the same argument to consciousness, emotions, freewill, creativity, the soul and other such things. Our goal is to build powerful and flexible machines and thus these somewhat vague properties are only relevant to our goal to the extent to which they have some measurable effect on performance in some well defined environment. If no such measurable effect exists, then they are not relevant to our objective. Of course this is not the same as saying that these things do not exist. The question is whether they are relevant or not. We would consider understanding, imagination and creativity, appropriately defined, to have a significant impact on an agent’s ability to adapt to challenging environments. Perhaps the same is also true of emotions, freewill and other qualities. If one accepts that these properties affect an agent’s performance, then universal intelligence is in part a test for these properties.*

<br>

----

# 🧳 Limits of Computational Agents

<br>

![](/blog/assets/all_algos.png)

<br>

- One of the reasons for studying mathematical models such as AIXI is to gain insights that may be useful for designing practical artificial intelligence agents.

- The central question we look at is the prediction of sequences which have bounded Kolmogorov complexity. This leads us to a new notion of complexity: Rather than the length of the shortest program able to generate a given sequence, in other words standard Kolmogorov complexity, we take the length of the shortest program able to learn to predict the sequence. This new complexity measure has the same fundamental invariance property as Kolmogorov complexity, and certain strong relationships between the two measures are proven. Nevertheless, in some cases the two can diverge significantly. For example, although a long random string that indefinitely repeats has a very high Kolmogorov complexity, this sequence also has a relatively simple structure that even a simple predictor can learn to predict.

- Those algorithms that can learn to predict all sequences up to a given Kolmogorov complexity, must themselves be complex. This puts an end to our hope of there being an extremely general and yet relatively simple prediction algorithm. We then use this fact to prove that although very powerful prediction algorithms exist, they cannot be mathematically discovered due to Goedel incompleteness.0 This significantly constrains our ability to design and analyse powerful prediction algorithms, and indeed powerful artificial intelligence algorithms in general.

- The most elementary result is that every computable sequence can be predicted by at least one predictor, and that this predictor need not be significantly more complex than the sequence to be predicted.

- There does not exist an elegant constructive theory of prediction for computable sequences, even if we assume unbounded computational resources, unbounded data and learning time, and place moderate bounds on the Kolmogorov complexity of the sequences to be predicted. Very powerful computable predictors are therefore necessarily complex. We have further shown that the source of this problem is the existence of computable sequences which are extremely expensive to compute. While we have proven that very powerful prediction algorithms which can learn to predict these sequences exist, we have also proven that, unfortunately, mathematical analysiscann er these algorithms due to Goedel incompleteness.

<br>

----


# 🧳 Temporal Difference Updating without A Learning Rate

<br>

- In the field of reinforcement learning, perhaps the most popular way to estimate the future discounted reward of states is the method of temporal difference learning.

- The empirical future discounted reward of a state sk is the sum of actual rewards following from state `sk` in time steps `k, k + 1, . . .,` where the rewards are discounted as they go into the future.

- The optimal value of `λ` for our algorithm, which we will call `HL(λ)`. In order to understand how well `HL(λ)` scales as the number of states increases, we ran the previous experiment again but with 51 states. As the movement through the states is almost entirely a random walk with reward on just two transitions, estimating the value function on this Markov chain is significantly more difficult than before, even though the total number of states has not grown all that much.

- Reinforcement learning algorithms such as Watkins’ version of `Q(λ)` (Watkins, 1989) and `Sarsa(λ)` (Rummery and Niranjan, 1994; Rummery, 1995) are based on temporal difference updates. This suggests that new reinforcement learning algorithms based on `HL(λ)` should be possible.

<br>

---

# 🧳 Discussion

<br>

- If the human brain is merely a ‘meat machine’, as some have put it, it is certainly not the most powerful intelligence possible. To start with, there is the issue of scale: a typical adult human brain weights about 1.4 kg and consumes just 25 watts of power (Kandel et al., 2000). This is ideal for a mobile intelligence, however an artificial intelligence need not be mobile and thus could be orders of magnitude larger and more energy intensive. At present a large supercomputer can fill a room twice the size of a basketball court and consume 10 megawatts of power. With a few billion dollars much larger machines could be built. Google, for example, is currently constructing a data centre next to a power station in Oregon that will cover two football fields and have cooling  towers four stories high (Markoff and Hansell, 2005). Biology never had the option of building brains on such an enormous scale.

- A breakthrough in this area might occur is impossible to predict, and the same is true of other theoretical approaches. Perhaps with the right theoretical insight Bayesian networks, prediction with expert advice, artificial neural networks, reasoning engines, or any one of a dozen other techniques will suddenly advance in a dramatic way. Although some progress in all of these areas is a near certainty, true breakthroughs by their very nature are rare and highly unpredictable. Furthermore, even if a huge breakthrough did occur, whether existing computer hardware would be sufficient to support the creation of highly intelligent machines would depend on the nature of this new algorithm. In summary, although we cannot rule out the possibility of a large breakthrough leading to intelligent machines, there is little we can do to estimate how likely this is.

<br>

> *In 1887 Lord Acton famously wrote, “Power tends to corrupt, and absolute power corrupts absolutely.” It is not that power itself is inherently good or evil, rather it grants the ability to be so: power amplifies intention. Although Acton’s quote has a ring of truth to it, perhaps it is excessively pessimistic about human nature. In any case, if there is ever to be something approaching absolute power, a super intelligent machine would come close. By definition, it would be capable of achieving a vast range of goals in a wide range of environments. If we carefully prepare for this possibility in advance, not only might we avert disaster, we might bring about an age of prosperity unlike anything seen before.*

<br>

----

#### Thank you, Dr. Legg, for a very good day of wondering logic!

### ⬛️

<br>

![](/blog/assets/planet_database_2x.png)

<br>
