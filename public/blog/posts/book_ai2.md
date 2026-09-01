---
title: 📚 BOOK → AI - Part  2️⃣ (Russell & Norvig, 2010) 
subtitle: Rating: 10/10 | Audience: Beginner to Advanced AI Scientists
date: 2026; 08; 07
---

> ***"We can see only a short distance ahead, but we can see that much remains to be done."*** - Alan Turing’s Computing Machinery and Intelligence (1950)

<br>

In this second post, I continue **[the work started in Part 1️⃣](https://marina.nullstar.fun/pages/post.html?post=book_ai)**, studying inference in first-order logic, planning, searching, uncertainty, reasoning, making decisions, and a bit of the superintelligence discussion from the last post.

The remaining chapters for `V. Learning` and `VI. Communicating, perceiving, and acting` are closer to the applied side of ML and Robotics (which I studied during my PhD, or over the years...). I'll cover them in the final post, Part 3️⃣.

**🤖 Below are my highlights (for personal inventory), with a moderate attempt at coherence.**
**🤖 If you see a 👾, it means I found something particularly cool or learned something new.**
**🤖 If you see a ✨, it means things that are so cool that they need a lil glitter around them.**
**🤖 If these notes look interesting to you, it's your ✦moral duty✦ to read the original book.**

<br>

---

## 🎸 10. CLASSICAL PLANNING

<br>

>  👾 *AI as the study of rational action -> planning—devising a plan of action to achieve one’s goals—is a critical part of AI.*

<br>

#### DEFINITION OF CLASSICAL PLANNING

<br>

* PDDL (the Planning Domain Definition Language) -> allows us to express all `4Tn^2` actions with one action schema -> describes the four things we need to define a search problem: 

<br>

```
- the initial state
- the actions that are available in a state
- the result of applying an action
- the goal test
```

<br>

* The initial state is a conjunction of ground atoms.

* The goal is just like a precondition: a conjunction of literals (positive or negative) that may contain variables.


<br>

#### ALGORITHMS FOR PLANNING AS STATE-SPACE SEARCH

<br>

> *The description of a planning problem defines a search problem.*

<br>

* Two approaches to searching for a plan -> (a) Forward (progression) search through the space of states, starting in the initial state and using the problem’s actions to search forward for a member of the set of goal states.; (b) Backward (regression) search through sets of relevant states, starting at the set of states representing the goal and using the inverse of the actions to search backward for the initial state.

<br>

> 🌟 *A search problem can be seen as a graph where the nodes are states and the edges are actions. The problem is to find a path connecting the initial state to a goal state. There are two ways we can relax this problem to make it easier: by adding more edges to the graph, making it strictly easier to find a path, or by grouping multiple nodes together, forming an abstraction of the state space that has fewer states, and thus is easier to search.*

<br>

* Subgoal independence assumption is that the cost of solving a conjunction of subgoals is approximated by the sum of the costs of solving each subgoal independently. 

<br>

#### PLANNING GRAPHS

<br>

> *As a planning problem asks if we can reach a goal state from the initial state, a planning graph can be used to give better heuristic estimates.*

<br>

* A planning problem asks if we can reach a goal state from the initial state. Suppose we are given a tree of all possible actions from the initial state to successor states, and their successors -> exponential size -> A planning graph is polynomial-size approximation to this tree that can be constructed quickly. 

* It can’t answer definitively whether `G` is reachable from `S0`, but it can estimate how many steps it takes to reach `G`. -> a directed graph organized into levels. -> `Si` contains all the literals that could hold at time `i`, depending on the actions executed at preceding time steps AND `Ai` contains all the actions that could have their preconditions satisfied at time `i`. 

* Mutual exclusion (or mutex) links -> records conflicts between actions that would prevent them from occurring together.

* Level `S1` contains all the literals that could result from picking any subset of the actions in `A0`, as well as mutex links (gray lines) indicating literals that could not appear together -> `S1` represents a belief state: a set of possible states. -> continue alternating between -> `n` state level `Si` and action level `Ai` until we reach a point where two consecutive levels are identical. -> the graph has leveled off.


* Every `Si` level contains all the literals that could result from any possible choice of actions in `Ai`, along with constraints saying which pairs of literals are not possible. -> the process of constructing the planning graph does not require choosing among actions, which would entail combinatorial search. Instead, it just records the impossibility of certain choices using mutex links.

* A mutex relation holds between two actions at a given level if any of the following three conditions holds: 1) Inconsistent effects; 2) Inference; 3) Competing needs.


<br>

> 👾 *A planning graph is polynomial in the size of the planning problem. For a planning problem with `l` literals and `a` actions, each `Si` has no more than `l` nodes and l2 mutex links, and each `Ai` has no more than `a + l` nodes (including the no-ops), `(a + l)2` mutex links, and `2(al + l)` precondition and effect links. Thus, an entire graph with n levels has a size of `O(n(a + l)2)`. The time to build the graph has the same complexity.*

<br>

* if any goal literal fails to appear in the final level of the graph, then the problem is unsolvable.

* Level cost of go -> we can estimate the cost of achieving any goal literal `gi` from state `s` as the level at which `gi` first appears in the planning graph constructed from initial state `s`.

* Serial graph insists that only one action can actually occur at any given time step; this is done by adding mutex links between every pair of nonpersistence actions.

<br>

#### The GRAPHPLAN Algorithm

<br>

> 👾 *How to extract a plan directly from the planning graph, rather than just using the graph to provide a heuristic -> The GRAPHPLAN algorithm repeatedly adds a level to a planning graph with EXPAND-GRAPH. Once all the goals show up as non- mutex in the graph, GRAPHPLAN calls EXTRACT-SOLUTION to search for a plan that solves the problem. If that fails, it expands another level and tries again, terminating with failure when there is no reason to go on.*

<br>

```
function GRAPHPLAN(problem) returns solution or failure
	graph ← INITIAL-PLANNING-GRAPH(problem)
	goals ← CONJUNCTS(problem.GOAL)
	nogoods ← an empty hash table
	for tl = 0 to ∞ do
		if goals all non-mutex in St of graph then
			solution ← EXTRACT-SOLUTION(graph, goals, NUMLEVELS(graph), nogoods)
			if solution = failure then return solution
		if graph and nogoods have both leveled off then return failure
		graph←EXPAND-GRAPH(graph, problem)
```

<br>

- Mutex relations and their causes: inconsistent effects, interference, competing needs, inconsistent support.

- We could define EXTRACT-SOLUTION as a backward search problem where each state in the search contains a pointer to a level in the planning graph and a set of unsatisfied goals.

- Planning is PSPACE-complete and constructing the planning graph takes polynomial time -> solution extraction is intractable in the worst case.

- How long do we have to keep expanding after the graph has leveled off? If the function EXTRACT-SOLUTION fails to find a solution, then there must have been at least one set of goals that were not achievable and were marked as a no-good. 

* As soon as the graph itself and the no-goods have both leveled off, with no solution found, we can terminate with failure because there is no possibility of a subsequent change that could add a solution.

* Now all we have to do is prove that the graph and the no-goods will always level off. The key to this proof is that certain properties of planning graphs are monotonically increasing or decreasing. 

* Properties:

```
* Literals increase monotonically: Once a literal appears at a given level, it will appear at all subsequent levels. This is because of the persistence actions; once a literal shows up, persistence actions cause it to stay forever.
* Actions increase monotonically: Once an action appears at a given level, it will appear at all subsequent levels.
* Mutexes decrease monotonically: If two actions are mutex at a given level Ai, then they will also be mutex for all previous levels at which they both appear. 
* No-goods decrease monotonically: If a set of goals is not achievable at a given level, then they are not achievable in any previous level.
```

<br>

#### ANALYSIS OF PLANNING APPROACHES

<br>

* Currently the most popular and effective approaches to fully automated planning are: 1) Translating to a Boolean satisfiability (SAT) problem; 2) Forward state-space search with carefully crafted heuristics; 3) Search using a planning graph.


* Planning combines the two major areas of AI we have covered so far: search and logic.

* Planning is foremost an exercise in controlling combinatorial explosion. If there are `n` propositions in a domain, then there are `2n` states. As we have seen, planning is PSPACE-hard. Against such pessimism, the identification of independent subproblems can be a powerful weapon. In the best case—full decomposability of the problem—we get an exponential speedup. Decomposability is destroyed, however, by negative interactions between actions. GRAPHPLAN records mutexes to point out where the difficult interactions are. SATPLAN represents a similar range of mutex relations, but does so by using the general CNF form rather than a specific data structure. Forward search addresses the problem heuristically by trying to find patterns (subsets of propositions) that cover the independent subproblems. Since this approach is heuristic, it can work even when the subproblems are not completely independent.

* AI planning arose from investigations into state-space search, theorem proving, and control theory and from the practical needs of robotics, scheduling, and other domains.


<br>

----

## 🎸 11. PLANNING AND ACTING IN THE REAL WORLD

<br>

#### TIME, SCHEDULES, AND RESOURCES

<br>

* Plan first, schedule later: that is, we divide the overall problem into a planning phase in which actions are selected, with some ordering constraints, to meet the goals of the problem, and a later scheduling phase, in which temporal information is added to the plan to ensure that it meets resource and deadline constraints.

* A typical job-shop scheduling problem, consists of a set of jobs, each of which consists a collection of actions with ordering constraints among them. Each action has a duration and a set of resource constraints required by the action. Each constraint specifies a type of resource (e.g., bolts, wrenches, or pilots), the number of that resource required, and whether that resource is consumable (e.g., the bolts are no longer available for use) or reusable (e.g., a pilot is occupied during a flight but is available again when the flight is over). 

* As with search and planning problems, solutions can be evaluated according to a cost function; this can be quite complicated, with nonlinear resource costs, time-dependent delay costs, and so on. For simplicity, we assume that the cost function is just the total duration of the plan, which is called the makespan.

* To minimize makespan (plan duration), we must find the earliest start times for all the actions consistent with the ordering constraints supplied with the problem.

* We can apply the critical path method (CPM) to this graph to determine the possible start and end times of each action. A path through a graph representing a partial-order plan is a linearly ordered sequence of actions beginning with `Start` and ending with `Finish`. 

<br>

#### HIERARCHICAL PLANNING

<br>

> *Hierarchical task network (HTN) planning allows the agent to take advice from the domain designer in the form of high-level actions (HLAs) that can be implemented in various ways by lower-level action sequences. The effects of HLAs can be defined with angelic semantics, allowing provably correct high-level plans to be derived without consideration of lower-level implementations. HTN methods can create the very large plans required by many real-world applications.*

<br>

* The basic formalism we adopt to understand hierarchical decomposition comes from the area of hierarchical task networks or HTN planning. The key additional concept is the high-level action or HLA.

* Hierarchical decomposition ->  a computational task is reduced to a small number of activities at the next lower level, so the computational cost of finding the correct way to arrange those activities for the current problem is small.

* A high-level plan achieves the goal from a given state if at least one of its implementations achieves the goal from that state.

* The key to HTN planning, then, is the construction of a plan library containing known methods for implementing complex, high-level actions. One method of constructing the library is to learn the methods from problem-solving experience. 

* Requiring that an effect hold for every implementation is equivalent to assuming that someone else—an adversary—will choose the implementation. It treats the HLA’s multiple outcomes exactly as if the HLA were a nondeterministic action. For our case, the agent itself will choose the implementation. -> demonic nondeterminism for the case where an adversary makes the choices, contrasting this with angelic nondeterminism, where the agent itself makes the choices.

<br>

#### PLANNING AND ACTING IN NONDETERMINISTIC DOMAINS

<br>

* An online planning agent uses execution monitoring and splices in repairs as needed to recover from unexpected situations, which can be due to nondeterministic actions, exogenous events, or incorrect models of the environment.

<br>

> *Extend planning to handle partially observable, nondeterministic, and unknown environments -> sensorless planning (also known as conformant planning) for environments with no observations; contingency planning for partially observable and nondeterministic environments; and online planning and replanning for unknown environments.*

<br>

* Planners deal with factored representations rather than atomic representations. This affects the way we represent the agent’s capability for action and observation and the way we represent belief states—the sets of possible physical states the agent might be in—for unobservable and partially observable environments. 

* Conversion of a sensorless planning problem to a belief-state planning problem -> the main differences are that the underlying physical transition model is represented by a collection of action schemas and the belief state can be represented by a logical formula instead of an explicitly enumerated set of states.

* In classical planning, where the closed-world assumption is made, we would assume that any fluent not mentioned in a state is false, but in sensorless (and partially observable) planning we have to switch to an open-world assumption in which states contain both positive and negative fluents, and if a fluent does not appear, its value is unknown. Thus, the belief state corresponds exactly to the set of possible worlds that satisfy the formula.

* The family of belief states defined as conjunctions of literals is closed under updates defined by PDDL action schemas.

* The meaning of the heuristic function is the same as for classical planning: an estimate (perhaps admissible) of the cost of achieving the goal from the given belief state.

* Replanning presupposes some form of execution monitoring to determine the need for a new plan. Replanning may also be needed if the agent’s model of the world is incorrect. The model for an action may have a missing precondition.

* The online agent has a choice of how carefully to monitor the environment. We distinguish three levels:

<br>

```
- Action monitoring: before executing an action, the agent verifies that all the preconditions still hold.
- Plan monitoring: before executing an action, the agent verifies that the remaining plan will still succeed.
- Goal monitoring: before executing an action, the agent checks to see if there is a better set of goals it could be trying to achieve.
```

<br>


* Trouble occurs when an action is actually not nondeterministic, but rather depends on some precondition that the agent does not know about. Every prediction failure is an opportunity for learning; an agent should be able to modify its model of the world to accord with its percepts.

<br>

#### 🌟 MULTIAGENT PLANNING

<br>

> *When there are multiple agents in the environment, each agent faces a multiagent planning problem in which it tries to achieve its own goals with the help or hindrance of others.*

<br>

* An agent with multiple effectors that can operate concurrently needs to do multieffector planning to manage each effector while handling positive and negative interactions among the effectors.

* When the effectors are physically decoupled into detached units - as in a fleet of delivery robots in a factory - multieffector planning becomes multibody planning.

* Decentralized planning problem -> the subplan constructed for each body may need to include explicit communicative actions with other bodies.

* Some systems are a mixture of centralized and multiagent planning.

* A convention is any constraint on the selection of joint plans. When conventions are widespread, they are called social laws.

* In the absence of a convention, agents can use communication to achieve common knowledge of a feasible joint plan. 

<br>

----

## 🎸 12. KNOWLEDGE REPRESENTATION

<br>

> *General ontology -> organize everything in the world into a hierarchy of categories.*

<br>

#### CATEGORIES AND OBJECTS

<br>

> *Much reasoning takes place at the level of categories.*

<br>

* There are two choices for representing categories in first-order logic: predicates and objects.

* Subclass relations organize categories into a taxonomy, or taxonomic hierarchy.

* Logical minimization: defining an object as the smallest one satisfying certain conditions.

<br>

#### EVENTS

<br>

* Situation calculus represents actions and their effects, but it’s is limited in its applicability: it was designed to describe a world in which actions are discrete, instantaneous, and happen one at a time. It also can’t describe two actions happening at the same time.

* Event calculus is based on points of time rather than on situations.

* We can extend event calculus to make it possible to represent simultaneous events, exogenous events (such as the wind blowing and changing the location of an object), continuous events (such as the level of water in the bathtub continuously rising) and other complications.

* The distinction between liquid and nonliquid events is exactly analogous to the difference between substances, or stuff, and individual objects, or things. In fact, some have called liquid events temporal substances, whereas substances like butter are spatial substances.

* Modal logic includes special modal operators that take sentences (rather than terms) as arguments. The syntax of modal logic is the same as first-order logic, except that sentences can also be formed with modal operators.

* We need a more complicated model, one that consists of a collection of possible worlds rather than just one true world. The worlds are connected in a graph by accessibility relations, one relation for each modal operator. 

* One problem with the modal logic approach is that it assumes logical omniscience on the part of agents. That is, if an agent knows a set of axioms, then it knows all consequences of those axioms.

<br>

#### REASONING SYSTEMS FOR CATEGORIES

<br>

* Semantic networks provide graphical aids for visualizing a knowledge base and efficient algorithms for inferring properties of an object on the basis of its category membership; and description logics provide a formal language for constructing and combining category definitions and efficient algorithms for deciding subset and superset relationships between categories.

<br>

> *In 1909, Charles S. Peirce proposed a graphical notation of nodes and edges called existential graphs that he called “the logic of the future.” Thus began a long-running debate between advocates of “logic” and advocates of “semantic networks.”*

<br>

* One of the most important aspects of semantic networks is their ability to represent default values for categories.

* The principal inference tasks for description logics are subsumption (checking if one category is a subset of another by comparing their definitions) and classification (checking whether an object belongs to a category).

* With disjunctive descriptions, nested definitions can lead easily to an exponential number of alternative routes by which one category can subsume another.

<br>

#### REASONING WITH DEFAULT INFORMATION

<br>

* Circumscription can be seen as a more powerful and precise version of the closed-world assumption. The idea is to specify particular predicates that are assumed to be “as false as possible”—that is, false for every object except those for which they are known to be true.

<br>

> *A Truth Maintenance System (TMS) is an AI knowledge management system that keeps track of what is believed, why is believed, and how beliefs should change when new information is arrived. Justification-based TMS (JTMS) track justifications for beliefs and revises them when necessary. Assumption-based TMS (ATMS) manages multiple sets of assumptions simultaneously, allowing reasoning under different possible scenarios.*

<br>

----

## 🎸 13. QUANTIFYING UNCERTAINTY

<br>

#### ACTING UNDER UNCERTAINTY

<br>

> *Agents may need to handle uncertainty, whether due to partial observability, nondeterminism, or a combination of the two. An agent may never know for certain what state it’s in or where it will end up after a sequence of actions.*

<br>


* Problem-solving agents and logical agents are designed to handle uncertainty by keeping track of a belief state—a representation of the set of all possible world states that it might be in—and generating a contingency plan that handles every possible eventuality that its sensors may report during execution. This approach has drawbacks.

* When interpreting partial sensor information, a logical agent must consider every logically possible explanation for the observations, no matter how unlikely. This leads to impossible large and complex belief-state representations.

* A correct contingent plan that handles every eventuality can grow arbitrarily large and must consider arbitrarily unlikely contingencies.

* Sometimes there is no plan that is guaranteed to achieve the goal—yet the agent must act.

* Probability provides a way of summarizing the uncertainty that comes from our laziness and ignorance.

* To make such choices, an agent must first have preferences between the different possible outcomes of the various plans. An outcome is a completely specified state, including such factors as whether the agent arrives on time and the length of the wait at the airport. We use utility theory to represent and reason with preferences. Utility theory says that every state has a degree of usefulness, or utility, to an agent and that the agent will prefer states with higher utility.

<br>

```
Decision theory = probability theory + utility theory
```

<br>

* Maximum expected utility (MEU) -> an agent is rational if and only if it chooses the action that yields the highest expected utility, averaged over all the possible outcomes of the action. 

<br>

#### BASIC PROBABILITY NOTATION

<br>

* In probability theory, the set of all possible worlds is called the sample space. The possible worlds are mutually exclusive and exhaustive—two possible worlds cannot both be the case, and one possible world must be the case.

* Unconditional or prior probabilities -> degrees of belief in propositions in the absence of any other information -> as opposed to conditional or posterior probability.

* A possible world is defined to be an assignment of values to all of the random variables under consideration. 

* Kolmogorov’s axiom -> inclusion–exclusion principle -> `P(a ∨b) = P(a) + P(b)−P(a ∧b)`

<br>

#### INFERENCE USING FULL JOINT DISTRIBUTIONS

<br>

* Probabilistic inference: the computation of posterior probabilities for query propositions given observed evidence. 

<br>

> 👾 *WHERE DO PROBABILITIES COME FROM? 1) The frequentist position is that the numbers can come only from experiments.; 2) The objectivist view is that probabilities are real aspects of the universe—propensities of objects to behave in certain ways—rather than being just descriptions of an observer’s degree of belief.; 3) the subjectivist view describes probabilities as a way of characterizing an agent’s beliefs, rather than as having any external physical significance. The subjective Bayesian view allows any self-consistent ascription of prior probabilities to propositions, but then insists on proper Bayesian updating as evidence arrives.*

<br>

#### BAYES’ RULE AND ITS USE

<br>

> *The conditional probability `P(effect |cause)` quantifies the relationship in the causal direction, whereas `P(cause |effect)` describes the diagnostic direction.*

<br>

* Conditional independence assertions can allow probabilistic systems to scale up; moreover, they are much more commonly available than absolute independence assertions. -> The decomposition of large probabilistic domains into weakly connected subsets through conditional independence is one of the most important developments in the recent history of AI.

* Naive Bayes ->  where the “effect” variables are not actually conditionally independent given the cause variable

<br>

---

## 🎸 14.  PROBABILISTIC REASONING

<br>

> *Bayesian networks -> any full joint probability distribution and in many cases can do so very concisely (belief network, probabilistic network, causal network, and knowledge map).*

<br>

* 👾 A Bayesian network is a directed graph in which each node is annotated with quantitative probability information. The full specification is as follows:

<br>

```
1. Each node corresponds to a random variable, which may be discrete or continuous.
2. A set of directed links or arrows connects pairs of nodes. If there is an arrow from node X to node Y , X is said to be a parent of Y. The graph has no directed cycles (and hence is a directed acyclic graph, or DAG.
3. Each node Xi has a conditional probability distribution P(Xi |Parents(Xi)) that quantifies the effect of the parents on the node.
```

<br>

* The meaning of an arrow is typically that `X` has a direct influence on `Y`. 

* Once the topology of the Bayesian network is laid out, we need only specify a conditional probability distribution for each variable, given its parents. 

<br>

#### THE SEMANTICS OF BAYESIAN NETWORKS

<br>

* One way to define what the network means—its semantics—is to define the way in which it represents a specific joint distribution over all the variables. 

* If a Bayesian network is a representation of the joint distribution, then it too can be used to answer any query, by summing all the relevant joint entries. 

* Chain rule —> the Bayesian network is a correct representation of the domain only if each node is conditionally independent of its other predecessors in the node ordering, given its parents.

1.  Nodes: First determine the set of variables that are required to model the domain. Now order them, `{X1,... ,Xn}`. Any order will work, but the resulting network will be more compact if the variables are ordered such that causes precede effects.
2.  Links: `For i = 1 to n do: Choose, from X1,... ,Xi`, a minimal set of parents for `Xi`, such that the chain rule is satisfied. For each parent insert a link from the parent to `Xi`. CPTs: Write down the conditional probability table, `P(Xi|Parents(Xi))`. -> the parents of node `Xi` should contain all those nodes in `X1, ... , Xi` that directly influence `Xi`. 

* Another important property of Bayesian networks is that they contain no redundant probability values. If there is no redundancy, then there is no chance for inconsistency.

* The compactness of Bayesian networks is an example of a general property of locally structured (also called sparse) systems.

* 👾 Using this semantics to derive a method for constructing Bayesian networks, we were led to the consequence that a node is conditionally independent of its other predecessors, given its parents. It turns out that we can also go in the other direction. We can start from a “topological” semantics that specifies the conditional independence relationships encoded by the graph structure, and from this we can derive the “numerical” semantics.

* Markov blanket: anode is conditionally independent of all other nodes in the network, given its parents, children, and children’s parents.

<br>

#### EFFICIENT REPRESENTATION OF CONDITIONAL DISTRIBUTIONS

<br>

* The worst-case scenario in which the relationship between the parents and the child is completely arbitrary -> `O(2^k)`

* Usually, such a relationships are describable by a canonical distribution.

* The simplest example is provided by deterministic nodes -> has has value specified exactly by the values of its parents, with no uncertainty.

* Uncertain relationships can often be characterized by so-called noisy logical relationships. The standard example is the noisy-OR relation, which is a generalization of the logical `OR`.

* A network with both discrete and continuous variables is called a hybrid Bayesian network. To specify a hybrid network, we have to specify two new kinds of distributions: the conditional distribution for a continuous variable given discrete or continuous parents; and the conditional distribution for a discrete variable given continuous parents. 

* 👾 Linear Gaussian distribution -> the child has a Gaussian distribution whose mean `μ` varies linearly with the value of the parent and whose standard deviation σ is fixed. ->  We need two distributions, one for subsidy and one for `¬` subsidy.

* When discrete variables are added as parents (not as children) of continuous variables, the network defines a conditional Gaussian, or CG, distribution: given any assignment to the discrete variables, the distribution over the continuous variables is a multivariate Gaussian.

* 👾 Both probit and logit distribution can be generalized to handle multiple continuous parents by taking a linear combination of the parent values.

<br>

#### EXACT INFERENCE IN BAYESIAN NETWORKS

<br>

> *The basic task for any probabilistic inference system is to compute the posterior probability distribution for a set of query variables, given some observed event—that is, some assignment of values to a set of evidence variables.*

<br>

* A query can be answered using a Bayesian network by computing sums of products of conditional probabilities from the network.

* The time complexity for a network with `n` Boolean variables is always `always(2^n)`. The numerationation algorithm for answering queries on Bayesian networks.

<br>

```
function ENUMERATION-ASK(X, e, bn) returns a distribution over X
	inputs: X, the query variable
		e, observed values for variables E
		bn, a Bayes net with variables {X} ∪ E ∪ Y /* Y = hidden variables */
	Q(X)←a distribution over X, initially empty
	for each value xi of X do
		Q(xi)←ENUMERATE-ALL(bn.VARS, exi )
			where exi is e extended with X= xi
	return NORMALIZE(Q(X))

function ENUMERATE-ALL(vars, e) returns a real number
	if EMPTY?(vars) then return 1.0
	Y ←FIRST(vars)
	if Y has value y in e
		then return P(y |parents(Y )) × ENUMERATE-ALL(REST(vars), e)
		else return y P(y |parents(Y )) × ENUMERATE-ALL(REST(vars), ey)
			where ey is e extended with Y= y
```

<br>

> *A polytree is a DAG whose underlying undirected graph is a tree. If you ignore the arrow directions, the graph is connected and has no cycles (tree).*

<br>

* Singly connected networks or polytrees -> the time and space complexity of exact inference in polytrees is linear in the size of the network. 

* For multiply connected networks, variable elimination can have exponential time and space complexity in the worst case, even when the number of parents per node is bounded. -> inference in Bayesian networks is NP-hard. -> the problem is as hard as that of computing the number of satisfying assignments for a propositional logic formula. This means that it is #P-hard ("number-P hard")—that is, strictly harder than NP-complete problems.

<br>

> 👾 *The difficulty of solving a discrete CSP is related to how "treelike" its constraint graph is. Measures such as tree width, which bound the complexity of solving a CSP, can also be applied directly to Bayesian networks. Moreover, the variable elimination algorithm can be generalized to solve CSPs as well as Bayesian networks.* 

<br>

* In a polytree network, one would need to issue queries costing `O(n)` each, for a total of `O(time)` time. Using clustering algorithms (also known as join algorithmsithms), the time can be reduced to `O(n)`. For this reason, these algorithms are widely used in commercial Bayesian network tools.

<br>

#### APPROXIMATE INFERENCE IN BAYESIAN NETWORKS

<br>

* In any sampling algorithm, the answers are computed by counting the actual samples generated. Suppose there are `N` total samples, and let `NPS (x1,... ,xn)` be the number of times the specific event `x1,... ,xn` occurs in the set of samples. We expect this number, as a fraction of the total, to converge in the limit to its expected value according to the sampling probability.

* Rejection sampling is a general method for producing samples from a hard-to-sample distribution given an easy-to-sample distribution. In its simplest form, it can be used to compute conditional probabilities. -> lots of samples are rejected ->  The fraction of samples consistent with the evidence `e` drops exponentially as the number of evidence variables grows, so the procedure is simply unusable for complex problems.

<br>

> 👾 *Stochastic approximation techniques such as likelihood weighting and Markov chain Monte Carlo can give reasonable estimates of the true posterior probabilities in a network and can cope with much larger networks than can exact algorithms.*

<br>

* Likelihood weighting avoids the inefficiency of rejection sampling by generating only events that are consistent with the evidence `e`. It is a particular instance of the general statistical technique of importance sampling, tailored for inference in Bayesian networks.

* Markov chain Monte Carlo (MCMC) -> instead of generating each sample from scratch, MCMC algorithms generate each sample by making a random change to the preceding sample -> an MCMC algorithm as being in a particular current state specifying a value for every variable and generating a next state by making random changes to the current state.

* 👾 A particular form of MCMC called Gibbs sampling is especially well suited for Bayesian networks. -> The Gibbs sampling algorithm for Bayesian networks starts with an arbitrary state (with the evidence variables fixed at their observed values) and generates a next state by randomly sampling a value for one of the nonevidence variables `Xi`. The sampling for `Xi` is done conditioned on the current values of the variables in the Markov blanket of `Xi`. -> The algorithm therefore wanders randomly around the state space—the space of possible complete assignments—flipping one variable at a time, but keeping the evidence variables fixed.

* 👾 Why Gibbs sampling works -> the sampling process settles into a “dynamic equilibrium” in which the long-run fraction of time spent in each state is exactly proportional to its posterior probability. -> property follows from the specific transition probability with which the process moves from one state to another, as defined by the conditional distribution given the Markov blanket of the variable being sampled.

* Let `q(x → x )` be the probability that the process makes a transition from state `x` to state `x`. This transition probability defines what is called a Markov chain on the state space.

* Provided the transition probability distribution `q` is ergodic—that is, every state is reachable from every other and there are no strictly periodic cycles—there is exactly one distribution π satisfying the Markov chain equation for any given `q`.

<br>

#### RELATIONAL AND FIRST-ORDER PROBABILITY MODELS

<br>

* If we can find a way to combine probability theory with the expressive power of first-order representations, we expect to be able to increase dramatically the range of problems that can be handled.

* A a major part of human cognition seems to require learning what objects exist and being able to connect observations—which almost never come with unique IDs attached—to hypothesized objects in the world. -> we need to be able to write so-called open-universe probability models.

<br>

#### OTHER APPROACHES TO UNCERTAIN REASONING

<br>


> 😄 I learned this the hard way back in [high school](https://web.archive.org/web/20070322015644/http://fly.to/bytegirl) -> *”The earliest expert systems of the 1970s ignored uncertainty and used strict logical reasoning, but it soon became clear that this was impractical for most real-world domains. The next generation of expert systems (especially in medical domains) used probabilistic techniques. Initial results were promising, but they did not scale up because of the exponential number of probabilities required in the full joint distribution. (Efficient Bayesian network algorithms were unknown then.)”*


<br>

* Probability makes the same ontological commitment as logic: that propositions are true or false in the world, even if the agent is uncertain as to which is the case. Researchers in fuzzy logic have proposed an ontology that allows vagueness: that a proposition can be “sort of” true. Vagueness and uncertainty are in fact orthogonal issues.

* Logical systems in general, and logical rule-based systems in particular, have three desirable properties: 1) Locality (In logical systems, whenever we have a rule of the form `A ⇒ B`, we can conclude `B`, given evidence `A`, without worrying about any other rules. In probabilistic systems, we need to consider all the evidence); 2) Detachment (Once a logical proof is found for a proposition `B`, the proposition can be used regardless of how it was derived. That is, it can be detached from its justification. In dealing with probabilities, on the other hand, the source of the evidence for a belief is important for subsequent reasoning.); and 3) Truth-functionality (In logic, the truth of complex sentences can be computed from the truth of the components. Probability combination does not work this way, except under strong global independence assumptions).

* Rule-based systems is that the properties of locality, detachment, and truth-functionality are simply not appropriate for uncertain reasoning.

<br>

> 👾 *The Dempster–Shafer theory is designed to deal with the distinction between uncertainty and ignorance. Rather than computing the probability of a proposition, it computes the probability that the evidence supports the proposition. This measure of belief is called a belief function, written `Bel(X)`.*

<br>

* A Bayesian approach expresses our "ignorance" in terms of how our beliefs would change in the face of future information gathering.

* Fuzzy set theory is a means of specifying how well an object satisfies a vague description.

* Fuzzy control is a methodology for constructing control systems in which the mapping between real-valued input and output parameters is represented by fuzzy rules.

<br>

> 👾 *Both the hybrid Bayesian network approach and the random sets approach appear to capture aspects of fuzziness without introducing degrees of truth. Nonetheless, there remain many open issues concerning the proper representation of linguistic observations and continuous quantities—issues that have been neglected by most outside the fuzzy community.*

<br>

----

## 🎸 15. PROBABILISTIC REASONING OVER TIME

<br>

> 🌟 *Agents in partially observable environments must be able to keep track of the current state, to the extent that their sensors allow. An agent maintains a belief state that represents which states of the world are currently possible. From the belief state and a transition model, the agent can predict how the world might evolve in the next time step. From the percepts observed and a sensor model, the agent can update the belief state. Belief states were represented by explicitly enumerated sets of states, or by logical formulas. Those approaches defined belief states in terms of which world states were possible, but could say nothing about which states were likely or unlikely.*

<br>

> 👾 *We describe three specific kinds of models: hidden Markov models, Kalman filters, and dynamic Bayesian networks.*

<br>

#### TIME AND UNCERTAINTY

<br>

* We view the world as a series of snapshots, or time slices, each of which contains a set of random variables, some observable and some not. -> we will assume that the same subset of variables is observable in each time slice (although this is not strictly necessary in anything that follows). We will use `Xt` to denote the set of state variables at time `t`, which are assumed to be unobservable, and `Et` to denote the set of observable evidence variables. The observation at time `t` is `Et = et` for some set of values `et`.

* With the set of state and evidence variables for a given problem decided on, the next step is to specify how the world evolves (the transition model) and how the evidence variables get their values (the sensor model).

* First-order Markov process, in which the current state depends only on the previous state and not on any earlier states. -> The first-order Markov assumption says that the state variables contain all the information needed to characterize the probability distribution for the next time slice.

* There are infinitely many possible values of `t` -> Do we need to specify a different distribution for each time step?  -> We avoid this problem by assuming that changes in the world state are caused by a stationary process—that is, a process of change that is governed by laws that do not themselves change over time. 

<br>

#### INFERENCE IN TEMPORAL MODELS

<br>

* Basic inference task to be solved:

1. Filtering (state estimation) -> computing the belief state (the posterior distribution over the most recent state) given all evidence to date. -> what a rational agent does to keep track of the current state so that rational decisions can be made.
2. Prediction -> the task of computing the posterior distribution over the future state given all evidence to date.
3. Smoothing -> computing the posterior distribution over a past state, given all evidence up to the present. -> provides a better estimate of the state than was available at the time because incorporate more evidence.
4. Most likely explanation -> given a sequence of observations, we wish to find the sequence of states that is most likely to have generated them.
5. Learning -> the transition and sensor models can be learned from observations. -> Just as with static Bayesian networks, dynamic Bayes net learning can be done as a by-product of inference. -> requires smoothing, rather than filtering.

<br>

* The time and space requirements for updating must be constant if an agent with limited memory is to keep track of the current state distribution over an unbounded sequence of observations.

<br>

#### HIDDEN MARKOV MODELS

<br>

> *HMM is a temporal probabilistic model in which the state of the process is described by a single discrete random variable. -> The possible values of the variable are the possible states of the world.*

<br>

* The matrix formulation reveals opportunities for improved algorithms. The first is a simple variation on the forward–backward algorithm that allows smoothing to be carried out in constant space, independently of the length of the sequence. A second area in which the matrix formulation reveals an improvement is in online smoothing with a fixed lag. 

* Localization -> Here we make the problem slightly more realistic by including a simple probability model for the robot’s motion and by allowing for noise in the sensors. 

<br>

#### KALMAN FILTERS

<br>

> *Kalman filtering -> handling continuous variables with gaussians -> every Kalman filter model can be represented in a DBN with continuous variables and linear Gaussian conditional distributions.*

<br>

#### DYNAMIC BAYESIAN NETWORKS

<br>

> *A dynamic Bayesian network, or DBN, is a Bayesian network that represents a temporal probability model.*

<br>

* If every HMM is a DBN and every DBN can be translated into an HMM, what’s the difference? The difference is that, by decomposing the state of a complex system into its constituent variables, the can take advantage of sparseness in the temporal probability model. 

* Not every DBN can be represented by a Kalman filter model. In a Kalman filter, the current state distribution is always a single multivariate Gaussian distribution—that is, a single “bump” in a particular location. DBNs, on the other hand, can model arbitrary distributions.

* For the system to handle sensor failure properly, the sensor model must include the possibility of failure.

* The cost of HMM updating, which is `O(d^{2n})` -> even though we can use DBNs to represent very complex temporal processes with many sparsely connected variables, we cannot reason efficiently and exactly about those processes.

<br>

> 👾 *Recall that likelihood weighting works by sampling the nonevidence nodes of the network in topological order, weighting each sample by the likelihood it accords to the observed evidence variables. As with the exact algorithms, we could apply likelihood weighting directly to an unrolled DBN, but this would suffer from the same problems of increasing time and space requirements per update as the observation sequence grows. -> The problem is that the standard algorithm runs each sample in turn, all the way through the network. Instead, we can simply run all `N` samples together through the DBN, one slice at a time. The modified algorithm fits the general pattern of filtering algorithms, with the set of `N` samples as the forward message. The first key innovation, then, is to use the samples themselves as an approximate representation of the current state distribution.*

<br>

#### KEEPING TRACK OF MANY OBJECTS

<br>

> *The preceding sections have considered—without mentioning it—state estimation problems involving a single object. In this section, we see what happens when two or more objects generate the observations. What makes this case different from plain old state estimation is that there is now the possibility of uncertainty about which object generated which observation.*


<br>

----

## 🎸 16. MAKING SIMPLE DECISIONS

<br>

> ✨ *We fill in the details of how utility theory combines with probability theory to yield a decision-theoretic agent—an agent that can make rational decisions based on what it believes and what it wants. Such an agent can make decisions in contexts in which uncertainty and conflicting goals leave a logical agent with no way to decide: a goal-based agent has a binary distinction between good (goal) and bad (non-goal) states, while a decision-theoretic agent has a continuous measure of outcome quality.* ✨

<br>

#### COMBINING BELIEFS AND DESIRES UNDER UNCERTAINTY

<br>

> *Decision theory, in its simplest form, deals with choosing among actions based on the desirability of their immediate outcomes; that is, the environment is assumed to be episodic.*

<br>

* The agent’s preferences are captured by a utility function, `U(s)`, which assigns a single number to express the desirability of a state. The expected utility of an action given the evidence, `EU(a|e)`, is just the average utility value of the outcomes, weighted by the probability that the outcome occurs.

<br>

> 👾 Also, in Portuguese, if someone is not being rational, you can say “Meu!” -> *The principle of maximum expected utility (MEU) says that a rational agent should choose the action that maximizes the agent’s expected utility. -> If an agent acts so as to maximize a utility function that correctly reflects the performance measure, then the agent will achieve the highest possible performance score (averaged over all the possible environments).*

<br>

#### THE BASIS OF UTILITY THEORY

<br>

```
A ≻ B the agent prefers A over B.
A ∼ B the agent is indifferent between A and B.
A ≻∼ B the agent prefers A over B or is indifferent between them.
```

<br>

* We can think of the set of outcomes for each action as a lottery—think of each action as a ticket. A lottery `L` with possible outcomes `S1,... ,Sn` that occur with probabilities `p1,... ,pn` is written `L = [p1,S1; p2,S2; ... pn,Sn]`.

* Each outcome `Si` of a lottery can be either an atomic state or another lottery. -> preferences between complex lotteries are related to preferences between the underlying states in those lotteries?

* The axioms of utility theory:

1. Orderability -> the agent cannot avoid decide -> Exactly one of `(A ≻ B), (B ≻ A)`, or `(A ∼ B)` holds.
2. Transitiviy -> `(A ≻ B) ∧(B ≻ C) ⇒ (A ≻ C)`
3. Continuity -> `A ≻ B ≻ C ⇒ ∃p [p, A; 1−p, C] ∼ B` 
4. Substitutability -> `A ∼ B ⇒ [p, A; 1−p, C] ∼ [p, B; 1−p, C]`
5. Monotocity -> `A ≻B ⇒ (p > q ⇔ [p, A; 1−p, B] ≻[q, A; 1−q, B])`
6. Decomposability -> `[p, A; 1−p, [q, B; 1−q, C]] ∼ [p, A; (1−p)q, B; (1−p)(1−q), C]`

* Expected Utility of a Lottery: The utility of a lottery is the sum of the probability of each outcome times the utility of that outcome.

<br>

#### UTILITY FUNCTIONS

<br>

> *Utility is a function that maps from lotteries to real numbers.*

<br>

> 👾 *The evidence for human irrationality is also questioned by researchers in the field of evolutionary psychology, who point to the fact that our brain’s decision-making mechanisms did not evolve to solve word problems with probabilities and prizes stated as decimal numbers.*

<br>

#### MULTIATTRIBUTE UTILITY FUNCTIONS

<br>

> *Problems on which outcomes are characterized by two or more attributes, are handled by multiattribute utility theory.*

<br>

* If `A1` stochastically dominates `A2`, then for any monotonically nondecreasing utility function `U(x)`, the expected utility of `A1` is at least as high as the expected utility of `A2`.

<br>

#### DECISION NETWORKS (INFLUENCE NETWORK)

<br>

> *Decision networks combine Bayesian networks with additional node types for actions and utilities.*

<br>

* Chance nodes represent random variables, just as they do in Bayesian networks. -> Each chance node has associated with it a conditional distribution that is indexed by the state of the parent nodes.

* Decision nodes represent points where the decision maker has a choice of actions.

* Utility nodes represent the agent’s utility function. -> The utility node has as parents all variables describing the outcome that directly affect utility. -> Associated with the utility node is a description of the agent’s utility as a function of the parent attributes. 

* Actions are selected by evaluating the decision network for each possible setting of the decision node. Once the decision node is set, it behaves exactly like a chance node that has been set as an evidence variable. 

* The algorithm for evaluating decision networks is ( straightforward extension of the Bayesian network algorithm):

<br>

```
1. Set the evidence variables for the current state.
2. For each possible value of the decision node:
	(a) Set the decision node to that value.
	(b) Calculate the posterior probabilities for the parent nodes of the utility node, using
a standard probabilistic inference algorithm.
	(c) Calculate the resulting utility for the action.
3. Return the action with the highest utility.
```

<br>

#### THE VALUE OF INFORMATION

<br>

* Information value theory -> enable an agent to choose what information to acquire.

<br>

#### DECISION-THEORETIC EXPERT SYSTEMS

<br>

* It is traditional in decision analysis to talk about two roles: the decision maker states preferences between outcomes, and the decision analyst enumerates the possible actions and outcomes and elicits preferences from the decision maker to determine the best course of action.

* The emergence of Bayesian networks in the late 1980s made it possible to build large-scale systems that generated sound probabilistic inferences from evidence. The addition of decision networks means that expert systems can be developed that recommend optimal decisions, reflecting the preferences of the agent as well as the available evidence.

* Decision-theoretic expert systems:

<br>

```
1. Create a causal model
2. Simplify to a quality decision model
3. Assign probabilities
4. Assign utilities
5. Verify and refine the model (with a gold-standard to compare against)
6. Perform sensitivity analysis
```

<br>

---

## 🎸 17.  MAKING COMPLEX DECISIONS

<br>

> *Sequential decision problems -> the agent’s utility depends on a sequence of decisions.*

<br>

#### SEQUENTIAL DECISION PROBLEMS

<br>

* Assume a fully observable environment -> the transition model (the outcome of each action in each state, where the outcome is stochastic -> transitions are markovian -> the transition model can be represented as a dynamic bayesian network.

* To complete the definition of the task environment, we must specify the utility for the agent -> Because the decision problem is sequential, the utility function will depend on a sequence of states—an environment history—rather than on a single state. -> in each state `s`, the agent receives a reward `R(s)`, which may be positive or negative, but must be bounded. 

* Markov decision process -> a sequential decision problem for a fully observable, stochastic environment with a Markovian transition model and additive rewards is called `a` or MDP, and consists of a set of states (with an initial state `s0`); a set ACTIONS(s) of actions in each state; a transition model `P(s |s,a)`; and a reward function `R(s)`.

* Policy -> a solution must specify what the agent should do for any state that the agent might reach. -> If the agent has a complete policy, then no matter what the outcome of any action, the agent will always know what to do next. -> An optimal policy is a policy that yields the highest expected utility.

* 👾 A finite horizon means that there is a fixed time `N` after which nothing matters—the game is over. -> the optimal action in a given state could change over time. -> the optimal policy for a finite horizon is nonstationary.

* 👾 Infinite horizon -> no reason to behave differently in the same state at different times. -> the optimal policy is stationary.

* Under stationarity there are just two coherent ways to assign utilities to sequences:

1. Additive rewards
2. Discounted rewards (with a discount factor `γ`  between `0` and `1`)

<br>

* If the environment does not contain a terminal state, or if the agent never reaches one, then all environment histories will be infinitely long, and utilities with additive, undiscounted rewards will generally be infinite.

* A policy that is guaranteed to reach a terminal state is called a proper policy

<br>

#### VALUE ITERATION

<br>

> *Algorithm for calculating an optimal policy. -> calculate the utility of each state and then use the state utilities to select an optimal action in each state.*

<br>

> *Bellman equation -> the basis of the value iteration algorithm for solving MDPs -> The utility of a state is the immediate reward for that state plus the expected discounted utility of the next state, assuming that the agent chooses the optimal action.*

<br>

* If there are `n` possible states, then there are n Bellman equations, one for each state. The n equations contain n unknowns—the utilities of the states. -> solve these simultaneous equations to find the utilities.

* Systems of nonlinear equations -> start with arbitrary initial values for the utilities, updating the utility of each state from the utilities of its neighbors, until equilibrium.

* Contraction -> a function of one argument that, when applied to two different inputs in turn, produces two output values that are closer together.

* 👾 The Bellman update is a contraction by a factor of `γ` on the space of utility vectors.

<br>

#### POLICY ITERATION

<br>

* The policy iteration algorithm alternates the following two steps, beginning from some initial policy `π0`:

1. Policy evaluation: given a policy `πi`, calculate `Ui = Uπi`, the utility of each state if `πi` were to be executed.
2. Policy improvement: Calculate a new MEU policy `πi+1`, using one-step look-ahead based on `Ui`.

* The algorithm terminates when the policy improvement step yields no change in the utilities. -> the utility function `Ui` is a fixed point of the Bellman update -> must be an optimal policy.

<br>

#### PARTIALLY OBSERVABLE MDPS (POMDPs)

<br>

> 👾 *The agent does not necessarily know which state it is in, so it cannot execute the action `π(s)` recommended for that state. Furthermore, the utility of a state `s` and the optimal action in `s` depend not just on `s`, but also on how much the agent knows when it is in `s`.*

<br>

> 👾 *A POMDP has the same elements as an MDP—the transition model `P(s |s,a)`, actions `A(s)`, and reward function `R(s)`—but, like the partially observable search problems, it also has a sensor model `P(e|s)`.*

<br>

* The belief state b becomes a probability distribution over all possible states -> The agent can calculate its current belief state as the conditional probability distribution over the actual states given the sequence of percepts and actions so far (filtering).

* POMDP belief-state space is continuous, because a POMDP belief state is a probability distribution.

* Solving a POMDP on a physical state space can be reduced to solving an MDP on the corresponding belief-state space.

<br>

#### 🌟 DECISIONS WITH MULTIPLE AGENTS: GAME THEORY

<br>

> *What if the uncertainty is due to other agents and the decisions they make?*

<br>

> *Agent design: Game theory can analyze the agent’s decisions and compute the expected utility for each decision (under the assumption that other agents are acting optimally according to game theory).*

<br>

> *Mechanism design: When an environment is inhabited by many agents, it might be possible to define the rules of the environment (i.e., the game that the agents must play) so that the collective good of all agents is maximized when each agent adopts the game-theoretic solution that maximizes its own utility. Mechanism design can also be used to construct intelligent multiagent systems that solve complex problems in a distributed fashion.*

<br>

* A single-move game is defined by three components:

1. Players or agents who will be making decisions. Two-player games have received the most attention, although n-player games for `n > 2` are also common. 
2. Actions that the players can choose. The players may or may not have the same set of actions available.
3. A payoff function that gives the utility to each player for each combination of actions by all the players. For single-move games the payoff function can be represented by a matrix, a representation known as the strategic form (also called normal form). 

<br>

* Each player in a game must adopt and then execute a strategy (which is the name used in game theory for a policy). A pure strategy is a deterministic policy; for a single-move game, a pure strategy is just a single action. For many games an agent can do better with a mixed strategy, which is a randomized policy that selects actions according to a probability distribution. The mixed strategy that chooses action a with probability `p` and action `b` otherwise is written `[p:a;(1−p):b]`. A strategy profile is an assignment of a strategy to each player; given the strategy profile, the game’s outcome is a numeric value for each player.

* A solution to a game is a strategy profile in which each player adopts a rational strategy. We will see that the most important issue in game theory is to define what "rational" means when each agent chooses only part of the strategy profile that determines the outcome.

* We say that a strategy `s` for player `p` strongly dominates strategy `s` if the outcome for `s` is better for `p` than the outcome for `s`, for every choice of strategies by the other player(s). Strategy `s` weakly dominates `s` if `s` is better than `s` on at least one strategy profile and no worse on any other. A dominant strategy is a strategy that dominates all others.

* An outcome is Pareto optimal if there is no other outcome that all players would prefer. An outcome is Pareto dominated by another outcome if all players would prefer the other outcome.

* When each player has a dominant strategy, the combination of those strategies is called a dominant strategy equilibrium. In general, a strategy profile forms an equilibrium if no player can benefit by switching strategies, given that every other player sticks with the same strategy. An equilibrium is essentially a local optimum in the space of policies; it is the top of a peak that slopes downward along every dimension, where a dimension corresponds to a player’s strategy choices.

*  Nash equilibrium ->  every game has at least one equilibrium. -> dominant strategy equilibrium is a Nash equilibrium, but some games have Nash equilibria but no dominant strategies. -> Exploitability evaluates the distance between a strategy and Nash equilibrium strategy, which can be measured from the strategy profits of both side. ->  Nash Equilibrium is unexploitable, i.e. exploitability is 0.

<br>

> ✨ *John Nash on Finite Games -> "For us an `n`-person game will be a set of `n` players, or positions, each with an associated finite set of pure strategies; and corresponding to each player, `i`, a payoff function, `pi`, which maps the set of all `n`-tuples of pure strategies into the real numbers. When we use the term `n`-tuple we shall always mean a set of `n` items, with each item associated with a different player."*

<br>

> ✨ *John Nash on Finite Strategies -> "Mixed Strategy, `si`: A mixed strategy of player `i` will be a collection of non-negative numbers which have unit sum and are in one to one correspondence with his pure strategies."*

<br>

> ✨ *John Nash's conclusion -> "The problem of analyzing a cooperative game becomes the problem of obtaining a suitable and convincing non-cooperative model for the negotiation."*

<br>

* Von Neumann -> every two-player zero-sum game has a maximin equilibrium when you allow mixed strategies. -> every Nash equilibrium in a zero-sum game is a maximin for both players. 

* Finding equilibria in non-zero-sum games is somewhat more complicated. The general approach has two steps:

1) Enumerate all possible subsets of actions that might form mixed strategies. 
2) For each strategy profile enumerated in 1), check to see if it is an equilibrium. 

<br>

* A strategy profile for a repeated game specifies an action choice for each player at each time step for every possible history of previous choices. As with MDPs, payoffs are additive over time.

* A game consisting of a sequence of turns -> best represented by a game tree, which game theorists call the extensive form.

* Chance’s “strategy” is part of the definition of the game, specified as a probability distribution over actions

* Actions -> here is no easy way to represent a game where the players have to discover what actions are available.

* 👾 Game theory is very good at representing the idea that the other players’ strategies are initially unknown—as long as we assume all agents are rational. The theory itself does not say what to do when the other players are less than fully rational. The notion of a Bayes–Nash equilibrium partially addresses this point: it is an equilibrium with respect to a player’s prior probability distribution over the other players’ strategies—in other words, it expresses a player’s beliefs about the other players’ likely strategies.

* Game theory has been used primarily to analyze environments that are at equilibrium, rather than to control agents within an environment.

<br>

#### MECHANISM DESIGN

<br>

> 👾 *Inverse game theory -> We would like to design a game whose solutions, consisting of each agent pursuing its own rational strategy, result in the maximization of some global utility function.*

<br>

Formally, a mechanism consists of:

1) a language for describing the set of allowable strategies that agents may adopt
2) a distinguished agent, called the center, that collects reports of strategy choices from the agents in the game, and 
3) an outcome rule, known to all agents, that the center uses to determine the payoffs to each agent, given their strategy choices.

<br>

* A mechanism where agents have a dominant strategy is called a strategy-proof mechanism. 

*  Vickrey-Clarke-Groves, or VCG, mechanism -> makes as dominant strategy for VCG each agent to report its true utility and that achieves an efficient allocation of the goods. 

<br>

----
## 🎸 26. Philosophical Foundations

<br>

> *The assertion that machines could act as if they were intelligent is called the weak AI hypothesis by philosophers, and the assertion that machines that do so are actually thinking (not just simulating thinking) is called the strong AI hypothesis.*

<br>

#### WEAK AI: CAN MACHINES ACT INTELLIGENTLY?

<br>

> 🌟 *The argument from disability by Alan Turing (a machine can never do) -> Be kind, resourceful, beautiful, friendly, have initiative, have a sense of humor, tell right from wrong, make mistakes, fall in love, enjoy strawberries and cream, make someone fall in love with it, learn from experience, use words properly, be the subject of its own thought, have as much diversity of behavior as man, do something really new.* 😄

<br>

> 👾 *It is well known, through the work of Turing (1936) and Gödel (1931), that certain mathematical questions are in principle unanswerable by particular formal systems. Gödel's incompleteness theorem is the most famous example of this. Briefly, for any formal axiomatic system `F` powerful enough to do arithmetic, it is possible to construct a so-called Gödel sentence `G(F)` with the following properties:*

* `G(F)` is a sentence of `F`, but cannot be proved within `F`.
* If `F` is consistent, then `G(F)` is true.

<br>

* 👾 Philosophers such as J. R. Lucas (1961) have claimed that this theorem shows that machines are mentally inferior to humans, because machines are formal systems that are limited by the incompleteness theorem—they cannot establish the truth of their own Gödel sentence—while humans have no such limitation.

* 👾 Turing machines are infinite, whereas computers are finite, and any computer can therefore be described as a (very large) system in propositional logic, which is not subject to Gödel's incompleteness theorem.

* 👾 It's impossible to prove that humans are not subject to Gödel's incompleteness theorem -> any rigorous proof would require a formalization of the claimed unformalizable human talent, and hence refute itself.

* 👾 The qualification problem in AI ->  The inability to capture everything in a set of logical rules -> human behavior is far too complex to be captured by any simple set of rules and that because computers can do no more than follow a set of rules, they cannot generate behavior as intelligent as that of humans.

* 👾 GOFAI is supposed to claim that all intelligent behavior can be captured by a system that reasons logically from a set of facts and rules describing the domain. -> our simplest logical agent are vulnerable to the qualification problem. -> probabilistic reasoning systems are more appropriate for open-ended domains.

<br>

#### STRONG AI: CAN MACHINES REALLY THINK?

<br>

* Many philosophers have claimed that a machine that passes the Turing Test would still not be actually thinking, but would be only a simulation of thinking.

<br>

> 🥹 *Professor Geoffrey Jefferson (1949) "Not until a machine could write a sonnet or compose a concerto because of thoughts and emotions felt, and not by the chance fall of symbols, could we agree that machine equals brain—that is, not only write it but know that it had written it."*

<br>

* The nature of the mind has been a standard topic of philosophical theorizing from ancient times to the present. In the Phaedo, Plato specifically considered and rejected the idea that the mind could be an “attunement” or pattern of organization of the parts of the body, a viewpoint that approximates the functionalist viewpoint in modern philosophy of mind. He decided instead that the mind had to be an immortal, immaterial soul, separable from the body and different in substance—the viewpoint of dualism. Aristotle distinguished a variety of souls (Greek ψυχη) in living things, some of which, at least, he described in a functionalist manner.

* Physicalist philosophers have attempted to explicate what it means to say that a person—and, by extension, a computer—is in a particular mental state. They have focused in particular on intentional states. These are states, such as believing, knowing, desiring, fearing, and so on, that refer to some aspect of the external world.

* If physicalism is correct, it must be the case that the proper description of a person’s mental state is determined by that person’s brain state.

* The content of mental states could be interpreted from two different points of view -> The “wide content” view interprets it from the point of view of an omniscient outside observer with access to the whole situation, who can distinguish differences in the world. Under this view, the content of mental states involves both the brain state and the environment history. Narrow content, on the other hand, considers only the brain state. 

* 👾 If one is concerned with the question of whether AI systems are really thinking and really do have mental states, then narrow content is appropriate; it simply doesn’t make sense to say that whether or not an AI system is really thinking depends on conditions outside that system. Narrow content is also relevant if we are thinking about designing AI systems or understanding their operation, because it is the narrow content of a brain state that determines what will be the (narrow content of the) next brain state. This leads naturally to the idea that what matters about a brain state—what makes it have one kind of mental content and not another—is its functional role within the mental operation of the entity involved.

* Under functionalist theory, any two systems with isomorphic causal processes would have the same mental states. -> Therefore, a computer program could have the same mental states as a person. 

* A strong challenge to functionalism has been mounted by John Searle’s (1980) biological naturalism, according to which mental states are high-level emergent features that are caused by low-level physical processes in the neurons, and it is the (unspecified) properties of the neurons that matter. -> “running the right program does not necessarily generate understanding.” -> he then states 4 controversial (and perhaps proven wrong) axioms:

```
1. Computer programs are formal (syntactic).
2. Human minds have mental contents (semantics).
3. Syntax by itself is neither constitutive of nor sufficient for semantics.
4. Brains cause minds.
```

* Qualia  -> the technical term for the intrinsic nature of experiences. 

<br>

#### THE ETHICS AND RISKS OF DEVELOPING ARTIFICIAL INTELLIGENCE

<br>

* All scientists and engineers face ethical considerations of how they should act on the job, what projects should or should not be done, and how they should be handled. AI seems to pose some fresh problems beyond that of, say, building bridges that don’t fall down:

1. People might lose their jobs to automation.
2. People might have too much (or too little) leisure time.
3. People might lose their sense of being unique.
4. AI systems might be used toward undesirable ends.
5. The use of AI systems might result in a loss of accountability.

<br>

* Yudkowsky (2008) goes into more detail about how to design a Friendly AI. He asserts that friendliness (a desire not to harm humans) should be designed in from the start, but that the designers should recognize both that their own designs may be flawed, and that the robot will learn and evolve over time. Thus the challenge is one of mechanism design—to define a mechanism for evolving AI systems under a system of checks and balances, and to give the systems utility functions that will remain friendly in the face of such changes.

* We should note that the idea of safeguards against change in utility function is not a new one. In the Odyssey, Homer (ca. 700 B.C.) described Ulysses’ encounter with the sirens, whose song was so alluring it compelled sailors to cast themselves into the sea. Knowing it would have that effect on him, Ulysses ordered his crew to bind him to the mast so that he could not perform the self-destructive act. It is interesting to think how similar safeguards could be built into AI systems.

<br>

* 💜 Finally, let us consider the robot’s point of view. If robots become conscious, then to treat them as mere “machines” (e.g., to take them apart) might be immoral.

<br>

---

#### *Thank you again, Dr. Russell & Dr. Norvig, for this fun and captivating journey.*


### ⬛️
