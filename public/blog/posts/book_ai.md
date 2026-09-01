---
title: 📚 BOOK → AI - Part  1️⃣ (Russell & Norvig, 2010) 
subtitle: Rating: 10/10 | Audience: Beginner to Advanced AI Scientists
date: 2026; 08; 02
---

![](/blog/assets/princess.png)

<br>

This book is not only a *must* for every researcher in the field, but also an incredibly interesting journey. It's one of the best books I've ever read (outside of Physics). 

In this first post, I cover the first 9 chapters, up to inference in first-order logic. At some point in the future, I'll publish Parts 2️⃣ and 3️⃣, covering the remaining chapters.

💡 *From my Ph.D. in Theoretical Physics, I'm well aware that something fascinating happens to your brain when you spend time studying mathematics and logic. It's like going to the gym — but for your mind. You also become fluent in the language and notation of science. That's one of the reasons I believe a Ph.D. in Physics equips you with the analytical tools to tackle virtually any technical problem.*


**🤖 Below are my highlights with some attempt, although very moderate, at coherence.**
**🤖 If you see a 👾, it means I found something particularly cool or learned something new.**
**🤖 If you see a ✨, it means things that are so cool that they need a lil glitter around them.**
**🤖 If these notes look interesting to you, it's your ✦moral duty✦ to read the original book.**


*Thank you, Dr. Russell & Dr. Norvig, for this fun and enlightening journey!*

<br>

---

##  🪆 1. INTRODUCTION

<br>

> *A human-centered approach must be in part an empirical science, involving observations and hypotheses about human behavior. A rationalist1 approach involves a combination of mathematics and engineering.*

<br>

* The following  six disciplines compose most of AI -> the (total) Turing Test, proposed by Alan Turing (1950), was designed to provide a satisfactory operational definition of intelligence:

```
1. natural language processing to enable it to communicate successfully in English;
2. knowledge representation to store what it knows or hears;
3. automated reasoning to use the stored information to answer questions and to draw new conclusions;
4. machine learning to adapt to new circumstances and to detect and extrapolate patterns;
5. computer vision to perceive objects, and
6. robotics to manipulate objects and move about.
```

<br>

* If we are going to say that a given program thinks like a human, we must have some way of determining how humans think. We need to get inside the actual workings of human minds. There are three ways to do this: 

```
1. through introspection—trying to catch our own thoughts as they go by; 
2. through psychological experiments—observing a person in action; and 
3. through brain imaging—observing the brain in action.
```
<br>

* 👾 The Greek philosopher Aristotle was one of the first to attempt to codify “right thinking,” that is, irrefutable reasoning processes. His syllogisms provided patterns for argument structures that always yielded correct conclusions when given correct premises—for example, “Socrates is a man; all men are mortal; therefore, Socrates is mortal.” These laws of thought were supposed to govern the operation of the mind; their study initiated the field called logic.

<br>

> *An agent is just something that acts (agent comes from the Latin agere, to do). A rational agent is one that acts so as to achieve the best outcome or, when there is uncertainty, the best expected outcome.*

<br>

* We will see before too long that achieving perfect rationality—always doing the right thing—is not feasible in complicated environments. The computational demands are just too high. Perfect rationality is a good starting point for analysis. Limited rationality—acting appropriately when there is not enough time to do all the computations one might like.

<br>

> *Can formal rules be used to draw valid conclusions? How does the mind arise from a physical brain? Where does knowledge come from? How does knowledge lead to action?*

<br>

#### THE FOUNDATIONS OF ARTIFICIAL INTELLIGENCE

<br>

*  Descartes (1596–1650) gave the first clear discussion of the distinction between mind and matter and of the problems that arise. One problem with a purely physical conception of the mind is that it seems to leave little room for free will: if the mind is governed entirely by physical laws, then it has no more free will than a rock “deciding” to fall toward the center of the earth. Descartes was a strong advocate of the power of reasoning in understanding the world, a philosophy now called rationalism, and one that counts Aristotle and Leibnitz as members. But Descartes was also a proponent of dualism. He held that there is a part of the human mind (or soul or spirit) that is outside of nature, exempt from physical laws. Animals, on the other hand, did not possess this dual quality; they could be treated as machines. An alternative to dualism is materialism, which holds that the brain’s operation according to the laws of physics constitutes the mind. Free will is simply the way that the perception of available choices appears to the choosing entity.

* Aristotle argued (in De Motu Animalium) that actions are justified by a logical connection between goals and knowledge of the action’s outcome.

* The idea of formal logic can be traced back to the philosophers of ancient Greece, but its mathematical development really began with the work of George Boole (1815–1864), who worked out the details of propositional, or Boolean, logic (Boole, 1847). In 1879, Gottlob Frege (1848–1925) extended Boole’s logic to include objects and relations, creating the first- order logic that is used today. Alfred Tarski (1902–1983) introduced a theory of reference that shows how to relate the objects in a logic to objects in the real world.

* In 1930, Kurt Gödel (1906–1978) showed that there exists an effective procedure to prove any true statement in the first-order logic of Frege and Russell, but that first-order logic could not capture the principle of mathematical induction needed to characterize the natural numbers. In 1931, Gödel showed that limits on deduction do exist. His incompleteness theorem showed that in any formal theory as strong as Peano arithmetic (the elementary theory of natural numbers), there are true statements that are undecidable in the sense that they have no proof within the theory.

* The Church–Turing thesis, which states that the Turing machine (Turing, 1936) is capable of computing any computable function, is generally accepted as providing a sufficient definition. Turing also showed that there were some functions that no Turing machine can compute. For example, no machine can tell in general whether a given program will return an answer on a given input or run forever.

* The theory of NP-completeness, pioneered by Steven Cook (1971) and Richard Karp (1972), provides a method. Cook and Karp showed the existence of large classes of canonical combinatorial search and reasoning problems that are NP-complete. Any problem class to which the class of NP-complete problems can be reduced is likely to be intractable.

* Besides logic and computation, the third great contribution of mathematics to AI is the theory of probability. The Italian Gerolamo Cardano (1501–1576) first framed the idea of probability, describing it in terms of the possible outcomes of gambling events. In 1654, Blaise Pascal (1623–1662), in a letter to Pierre Fermat (1601–1665), showed how to predict the future of an unfinished gambling game and assign average payoffs to the gamblers.

<br>

> *How should we make decisions so as to maximize payoff? How should we do this when others may not go along? How should we do this when the payoff may be far in the future?*

<br>

* The mathematical treatment of “preferred outcomes” or utility was first formalized by L´eon Walras (pronounced “Valrasse”) (1834-1910) and was improved by Frank Ramsey (1931) and later by John von Neumann and Oskar Morgenstern in their book The Theory of Games and Economic Behavior (1944).

* Decision theory, which combines probability theory with utility theory, provides a formal and complete framework for decisions (economic or otherwise) made under uncertainty—that is, in cases where probabilistic descriptions appropriately capture the decision maker’s environment. This is suitable for “large” economies where each agent need pay no attention to the actions of other agents as individuals. For “small” economies, the situation is much more like a game: the actions of one player can significantly affect the utility of another (either positively or negatively).

* Von Neumann and Morgenstern’s development of game theory (see also Luce and Raiffa, 1957) included the surprising result that, for some games, a rational agent should adopt policies that are (or least appear to be) randomized. Unlike decision theory, game theory does not offer an unambiguous prescription for selecting actions. The work of Richard Bellman (1957) formalized a class of sequential decision problems called Markov decision processes.

* The truly amazing conclusion is that a collection of simple cells can lead to thought, action, and consciousness or, in the pithy words of John Searle (1992), brains cause minds. The only real alternative theory is mysticism: that minds operate in some mystical realm that is beyond physical science.

* Futurists make much of these numbers, pointing to an approaching singularity at which computers reach a superhuman level of performance (Vinge, 1993; Kurzweil, 2005), but the raw comparisons are not especially informative. Even with a computer of virtually unlimited capacity, we still would not know how to achieve the brain’s level of intelligence.

* Cognitive psychology, which views the brain as an information-processing device, can be traced back at least to the works of William James (1842–1910). He insisted that perception involved a form of unconscious logical inference.

* Kenneth Craik (1943), specified the three key steps of a knowledge-based agent: (1) the stimulus must be translated into an internal representation, (2) the representation is manipulated by cognitive processes to derive new internal representations, and (3) these are in turn retranslated back into action.

* Charles Babbage (1792–1871) designed two machines, neither of which he completed. The Difference Engine was intended to compute mathematical tables for engineering and scientific projects. Babbage’s Analytical Engine was far more ambitious: it included addressable memory, stored programs, and conditional jumps and was the first artifact capable of universal computation. Babbage’s colleague Ada Lovelace, daughter of the poet Lord Byron, was perhaps the world’s first programmer. (The programming language Ada is named after her.) She wrote programs for the unfinished Analytical Engine and even speculated that the machine could play chess or compose music.

<br>

> *How can artifacts operate under their own control?*

<br>

* Modern control theory, especially the branch known as stochastic optimal control, has as its goal the design of systems that maximize an objective function over time. This roughly matches our view of AI: designing systems that behave optimally. 

<br>

> *How does language relate to thought?*

<br>

* Chomsky pointed out that the behaviorist theory did not address the notion of creativity in language—it did not explain how a child could understand and make up sentences that he or she had never heard before. Chomsky’s theory—based on syntactic models going back to the Indian linguist Panini (c. 350 B.C.)—could explain this, and unlike previous theories, it was formal enough that it could in principle be programmed.

* Much of the early work in knowledge representation (the study of how to put knowledge into a form that a computer can reason with) was tied to language and informed by research in linguistics, which was connected in turn to decades of work on the philosophical analysis of language.

<br>

#### THE HISTORY OF ARTIFICIAL INTELLIGENCE

<br>

* The first work that is now generally recognized as AI was done by Warren McCulloch and Walter Pitts (1943).  They proposed a model of artificial neurons in which each neuron is characterized as being “on” or “off,” with a switch to “on” occurring in response to stimulation by a sufficient number of neighboring neurons. The state of a neuron was conceived of as “factually equivalent to a proposition which proposed its adequate stimulus.” They showed, for example, that any computable function could be computed by some network of connected neurons, and that all the logical connectives (and, or, not, etc.) could be implemented by simple net structures.

* Two undergraduate students at Harvard, Marvin Minsky and Dean Edmonds, built the first neural network computer in 1950. The SNARC, as it was called, used 3000 vacuum tubes and a surplus automatic pilot mechanism from a B-24 bomber to simulate a network of 40 neurons.

* 👾 Alan Turing gave lectures on the topic as early as 1947 at the London Mathematical Society and articulated a persuasive agenda in his 1950 article “Computing Machinery and Intelligence.” Therein, he introduced the Turing Test, machine learning, genetic algorithms, and reinforcement learning. He proposed the Child Programme idea, explaining “Instead of trying to produce a programme to simulate the adult mind, why not rather try to produce one which simulated the child’s?”

<br>

> *“We propose that a 2 month, 10 man study of artificial intelligence be carried out during the summer of 1956 at Dartmouth College in Hanover, New Hampshire. The study is to proceed on the basis of the conjecture that every aspect of learning or any other feature of intelligence can in principle be so precisely described that a machine can be made to simulate it. An attempt will be made to find how to make machines use language, form abstractions and concepts, solve kinds of problems now reserved for humans, and improve themselves. We think that a significant advance can be made in one or more of these problems if a carefully selected group of scientists work on it together for a summer.”*

<br>

* In 1958, John McCarthy moved from Dartmouth to MIT and there made crucial contributions. In MIT AI Lab Memo No. 1, McCarthy defined the high-level language Lisp, which was to become the dominant AI programming language for the next 30 years. He also published a paper entitled Programs with Common Sense, in which he described the Advice Taker, a hypothetical program that can be seen as the first complete AI system. 

* The perceptron convergence theorem (Block et al., 1962) says that the learning algorithm can adjust the connection strengths of a perceptron to match any input data, provided such a match exists. 

<br>

> *The fact that a program can find a solution in principle does not mean that the program contains any of the mechanisms needed to find it in practice.*

<br>

* Early experiments in machine evolution (now called genetic algorithms) (Friedberg, 1958; Friedberg et al., 1959) were based on the undoubtedly correct belief that by making an appropriate series of small mutations to a machine-code program, one can generate a program with good performance for any particular task. The idea, then, was to try random mutations with a selection process to preserve mutations that seemed useful. Despite thousands of hours of CPU time, almost no progress was demonstrated. Modern genetic algorithms use better representations and have shown more success.

* Minsky and Papert’s book Perceptrons (1969) proved that, although perceptrons (a simple form of neural network) could be shown to learn anything they were capable of representing, they could represent very little.

* Feigenbaum and others at Stanford began the Heuristic Programming Project (HPP) to investigate the extent to which the new methodology of expert systems could be applied to other areas of human expertise. The next major effort was in the area of medical diagnosis.

* The AI industry boomed from a few million dollars in 1980 to billions of dollars in 1988, including hundreds of companies building expert systems, vision systems, robots, and software and hardware specialized for these purposes. Soon after that came a period called the “AI Winter,” in which many companies fell by the wayside as they failed to deliver on extravagant promises.

* In the mid-1980s at least four different groups reinvented the back-propagation learning algorithm first found in 1969 by Bryson and Ho. The algorithm was applied to many learning problems in computer science and psychology, and the widespread dissemination of the results in the collection Parallel Distributed Processing (Rumelhart and McClelland, 1986) caused great excitement.

<br>

> *David McAllester (1998): “In the early period of AI it seemed plausible that new forms of symbolic computation, e.g., frames and semantic networks, made much of classical theory obsolete. This led to a form of isolationism in which AI became largely separated from the rest of computer science. This isolationism is currently being abandoned. There is a recognition that machine learning should not be isolated from information theory, that uncertain reasoning should not be isolated from stochastic modeling, that search should not be isolated from classical optimization and control, and that automated reasoning should not be isolated from formal methods and static analysis.*

<br>

* Hidden Markov models (HMMs) have come to dominate the area. First, they are based on a rigorous mathematical theory. This has allowed speech researchers to build on several decades of mathematical results developed in other fields. Second, they are generated by a process of training on a large corpus of real speech data. 

* Artificial General Intelligence or AGI (Goertzel and Pennachin, 2007) held its first conference and organized the Journal of Artificial General Intelligence in 2008. AGI looks for a universal algorithm for learning and acting in any environment, and has its roots in the work of Ray Solomonoff (1964), one of the attendees of the original 1956 Dartmouth conference.

<br>

----

## 🪆 2. INTELLIGENT AGENTS

<br>

* An agent is anything that can be viewed as perceiving its environment through sensors and acting upon that environment through actuators.

* An agent’s percept sequence is the complete history of everything the agent has ever perceived. In general, an agent’s choice of action at any given instant can depend on the entire percept sequence observed to date, but not on anything it hasn’t perceived. 

<br>

> *For each possible percept sequence, a rational agent should select an action that is expected to maximize its performance measure, given the evidence provided by the percept sequence and whatever built-in knowledge the agent has.*

<br>

* Task environments are the “problems” to which rational agents are the “solutions.” We call this the PEAS (Performance, Environment, Actuators, Sensors) description. 


<br>

> *Chess is a competitive multiagent environment.*

<br>

* Our use of the word “stochastic” generally implies that uncertainty about outcomes is quantified in terms of probabilities; a nondeterministic environment is one in which actions are characterized by their possible outcomes, but no probabilities are attached to them. Nondeterministic environment descriptions are usually associated with performance measures that require the agent to succeed for all possible outcomes of its actions.

* In an episodic task environment, the agent’s experience is divided into atomic episodes. In each episode the agent receives a percept and then performs a single action. Crucially, the next episode does not depend on the actions taken in previous episodes. In sequential environments, on the other hand, the current decision could affect all future decisions.

* If the environment can change while an agent is deliberating, then we say the environment is dynamic for that agent; otherwise, it is static. 

* The discrete/continuous distinction applies to the state of the environment, to the way time is handled, and to the percepts and actions of the agent. For example, the chess environment has a finite number of distinct states (excluding the clock). Chess also has a discrete set of percepts and actions. 

* In a known environment, the outcomes (or outcome probabilities if the environment is stochastic) for all actions are given. Obviously, if the environment is unknown, the agent will have to learn how it works in order to make good decisions.

<br>

> *The hardest case is partially observable, multiagent, stochastic, sequential, dynamic, continuous, and unknown.*

<br>

#### THE STRUCTURE OF AGENTS

<br>

* The job of AI is to design an agent program that implements the agent function—the mapping from percepts to actions. We assume this program will run on some sort of computing device with physical sensors and actuators—we call this the architecture: agent= architecture + program.

* Simple reflex agent: these agents select actions on the basis of the current percept, ignoring the rest of the percept history, using  a condition–action rule: if car-in-front-is-braking then initiate-braking. Escape from infinite loops is possible if the agent can randomize its actions. In single-agent environments, randomization is usually not rational. It is a useful trick that helps a simple reflex agent in some situations, but in most cases we can do much better with more sophisticated deterministic agents.

* Model-based reflex agent: Updating this internal state information as time goes by requires two kinds of knowledge to be encoded in the agent program. First, we need some information about how the world evolves independently of the agent. Second, we need some information about how the agent’s own actions affect the world. This knowledge about “how the world works”—whether implemented in simple Boolean circuits or in complete scientific theories—is called a model of the world.

* Goal-based agents: the agent needs some sort of goal information that describes situations that are desirable. The agent program can combine this with the model (the same information as was used in the model-based reflex agent) to choose actions that achieve the goal. Search and planning are the subfields of AI devoted to finding action sequences that achieve the agent’s goals.

* Utility-based agents: An agent’s utility function is essentially an internalization of the performance measure. If the internal utility function and the external performance measure are in agreement, then an agent that chooses actions to maximize its utility will be rational according to the external performance measure. An agent that possesses an explicit utility function can make rational decisions with a general-purpose algorithm that does not depend on the specific utility function being maximized. In this way, the “global” definition of rationality—designating as rational those agent functions that have the highest performance—is turned into a “local” constraint o rational-agent designs that can be expressed in a simple program.

* Various ways that the components can represent the environment that the agent inhabits: we can place the representations along an axis of increasing complexity and expressive power—atomic, factored, and structured.

* In an atomic representation each state of the world is indivisible—it has no internal structure. Algorithms underlying search and game-playing, Hidden Markov models and Markov decision processes all work with atomic representations—or, at least, they treat representations as if they were atomic.

* A factored representation splits up each state into a fixed set of variables or attributes, each of which can have a value. While two different atomic states have nothing in common—they are just different black boxes—two different factored states can share some attributes. With factored representations, we can also represent uncertainty. Many important areas of AI are based on factored representations, including constraint satisfaction algorithms, propositional logic, planning, Bayesian networks, and the machine learning.

* Structured representations underlie relational databases and first-order logic, first-order probability models, knowledge-based learning and much of natural language understanding. In fact, almost everything that humans express in natural language concerns objects and their relationships.

<br>

----

## 🪆 3. SOLVING PROBLEMS BY SEARCH

<br>

> *This chapter describes one kind of goal-based agent called a problem-solving agent.*

<br>

* Uninformed search algorithms: algorithms that are given no information about the problem other than its definition (although some of these algorithms can solve any solvable problem, none of them can do so efficiently). Informed search algorithms: can do quite well given some guidance on where to look for solutions.

<br>

#### PROBLEM-SOLVING AGENTS

<br>

> *An agent with several immediate options of unknown value can decide what to do by first examining future actions (i.e., the environment is observable, discrete, known, deterministic) that eventually lead to states of known value.*

<br>

* The process of looking for a sequence of actions that reaches the goal is called search. A search algorithm takes a problem as input and returns a solution in the form of an action sequence. Once a solution is found, the actions it recommends can be carried out. This is called the execution phase.

* A problem can be defined formally by five components:

```
1. The initial state that the agent starts in.
2. A description of the possible actions available to the agent.
3. A description of what each action does (the transition model).
4. The goal test, determining whether a given state is a goal state.
5. A path cost function that assigns a numeric cost to each path.
```

<br>

* A solution to a problem is an action sequence that leads from the initial state to a goal state. 

* Solution quality is measured by the path cost function, and an optimal solution has the lowest path cost among all solutions.

<br>

#### EXAMPLE PROBLEMS

<br>

* Touring problems are closely related to route-finding problems, but the state space is quite different. Each state must include not just the current location but also the set of cities the agent has visited.

* The traveling salesperson problem (TSP) is a touring problem in which each city must be visited exactly once. The aim is to find the shortest tour. The problem is known to be NP-hard, but an enormous amount of effort has been expended to improve the capabilities of TSP algorithms. In addition to planning trips for traveling salespersons, these algorithms have been used for tasks such as planning movements of automatic circuit-board drills and of stocking machines on shop floors.

* A VLSI layout problem requires positioning millions of components and connections on a chip to minimize area, minimize circuit delays, minimize stray capacitances, and maximize manufacturing yield. The layout problem comes after the logical design phase and is usually split into two parts: cell layout and channel routing.

* Robot navigation is a generalization of the route-finding problem. Rather than following a discrete set of routes, a robot can move in a continuous space with (in principle) an infinite set of possible actions and states. For a circular robot moving on a flat surface, the space is essentially two-dimensional. When the robot has arms and legs or wheels that must also be controlled, the search space becomes many-dimensional. Advanced techniques are required just to make the search space finite.

* Automatic assembly sequencing of complex objects by a robot was first demonstrated by FREDDY (Michie, 1972). Progress since then has been slow but sure, to the point where the assembly of intricate objects such as electric motors is economically feasible. In assembly problems, the aim is to find an order in which to assemble the parts of some object.

<br>

#### SEARCHING FOR SOLUTIONS

<br>

* A solution is an action sequence, so search algorithms work by considering various possible action sequences. The possible action sequences starting at the initial state form a search tree with the initial state at the root; the branches are actions and the nodes correspond to states in the state space of the problem. 

* Search algorithms all share this basic structure; they vary primarily according to how they choose which state to expand next—the so-called search strategy.

<br>

```
function TREE-SEARCH(problem) returns a solution, or failure
	initialize the frontier using the initial state of problem
	loop do
		if the frontier is empty then return failure
		choose a leaf node and remove it from the frontier
		if the node contains a goal state then return the corresponding solution
		expand the chosen node, adding the resulting nodes to the frontier

function GRAPH-SEARCH(problem) returns a solution, or failure
	initialize the frontier using the initial state of problem
	initialize the explored set to be empty
	loop do
		if the frontier is empty then return failure
		choose a leaf node and remove it from the frontier
		if the node contains a goal state then return the corresponding solution
		add the node to the explored set
		expand the chosen node, adding the resulting nodes to the frontier
			only if not in the frontier or explored set
```

<br>

> *Algorithms that forget their history are doomed to repeat it.*

<br>

* 👾 Search algorithms require a data structure to keep track of the search tree that is being constructed. For each node n of the tree, we have a structure that contains four components: 1) n.STATE: the state in the state space to which the node corresponds; 2) n.PARENT: the node in the search tree that generated this node; 3) n.ACTION: the action that was applied to the parent to generate the node; 4) n.PATH-COST: the cost, traditionally denoted by g(n), of the path from the initial state to the node, as indicated by the parent pointers.

* A node is a bookkeeping data structure used to represent the search tree. A state corresponds to a configuration of the world. Thus, nodes are on particular paths, as defined by PARENT pointers, whereas states are not. 

* Queues are characterized by the order in which they store the inserted nodes. Three common variants are the first-in, first-out or FIFO queue, which pops the oldest element of the queue; the last-in, first-out or LIFO queue (also known as a stack), which pops the newest element of the queue; and the priority queue, which pops the element of the queue with the highest priority according to some ordering function.

* The explored set can be implemented with a hash table to allow efficient checking for repeated states. Sometimes this can be achieved most easily by insisting that the data structures for states be in some canonical form; that is, logically equivalent states should map to the same data structure. In the case of states described by sets, for example, a bit-vector representation or a sorted list without repetition would be canonical, whereas an unsorted list would not.

* We can evaluate an algorithm’s performance in four ways:

```
* Completeness: Is the algorithm guaranteed to find a solution when there is one?
* Optimality: Does the strategy find the optimal solution, as defined on page 68?
* Time complexity: How long does it take to find a solution?
* Space complexity: How much memory is needed to perform the search?
```

<br>

#### UNINFORMED SEARCH STRATEGIES

<br>

* Breadth-first search is a simple strategy in which the root node is expanded first, then all the successors of the root node are expanded next, then their successors, and so on. In general, all the nodes are expanded at a given depth in the search tree before any nodes at the next level are expanded. The memory requirements are bigger problem for breadth-first search than is the execution time. Exponential-complexity search problems cannot be solved by uninformed methods for any but the smallest instances.

* Instead of expanding the shallowest node, uniform-cost search expands the node n with the lowest path cost g(n). This is done by storing the frontier as a priority queue ordered by g. Uniform-cost search does not care about the number of steps a path has, but only about their total cost. Therefore, it will get stuck in an infinite loop if there is a path with an infinite sequence of zero-cost actions—for example, a sequence of NoOp actions (think completeness).

* Depth-first search always expands the deepest node in the current frontier of the search tree. The depth-first search algorithm is an instance of the graph-search algorithm, whereas breadth-first-search uses a FIFO queue, depth-first search uses a LIFO queue. The graph-search version, which avoids repeated states and redundant paths, is complete in finite state spaces because it will eventually expand every node. The tree-search version, on the other hand, is not complete.

* So far, depth-first search seems to have no clear advantage over breadth-first search, so why do we include it? The reason is the space complexity. For a graph search, there is no advantage, but a depth-first tree search needs to store only a single path from the root to a leaf node, along with the remaining unexpanded sibling nodes for each node on the path. Once a node has been expanded, it can be removed from memory as soon as all its descendants have been fully explored. For a state space with branching factor b and maximum depth m, depth-first search requires storage of only O(bm) nodes.

* A variant of depth-first search called backtracking search uses still less memory: only one successor is generated at a time rather than all successors; each partially expanded node remembers which successor to generate next.

* Depth-limited search: The embarrassing failure of depth-first search in infinite state spaces can be alleviated by supplying depth-first search with a predetermined depth limit ℓ. That is, nodes at depth ℓ are treated as if they have no successors. 

* Iterative deepening search (or iterative deepening depth-first search) is a general strategy, often used in combination with depth-first tree search, that finds the best depth limit. It does this by gradually increasing the limit—first 0, then 1, then 2, and so on—until a goal is found. In general, iterative deepening is the preferred uninformed search method when the search space is large and the depth of the solution is not known.

* Bidirectional search: run two simultaneous searches—one forward from the initial state and the other backward from the goal—hoping that the two searches meet in the middle. They are implemented by replacing the goal test with a check to see whether the frontiers of the two searches intersect; if they do, a solution has been found.

* The heuristic function, denoted h(n) = estimated cost of the cheapest path from the state at node n to a goal state.

* Greedy best-first search tries to expand the node that is closest to the goal, on the grounds that this is likely to lead to a solution quickly. Thus, it evaluates nodes by using just the heuristic function; that is, f(n) = h(n).

* A* search: it evaluates nodes by combining g(n), the cost to reach the node, and h(n), the cost to get from the node to the goal: f(n) = g(n) + h(n) = estimated cost of the cheapest solution through n.

* The first condition we require for optimality is that h(n) be an admissible heuristic. An admissible heuristic is one that never overestimates the cost to reach the goal. 

* A second, slightly stronger condition called consistency (or sometimes monotonicity) is required only for applications of A* to graph search. A heuristic h(n) is consistent if, for every node n and every successor n’ of n generated by any action a, the estimated cost of reaching the goal from n is no greater than the step cost of getting to n’ plus the estimated cost of reaching the goal from n’.

* Iterative-deepening A* (IDA*) algorithm: adapt the idea of iterative deepening to the heuristic search context -> cutoff is not the depth, but the f-cost (g + h).

* Recursive best-first search (RBFS) is a simple recursive algorithm that attempts to mimic the operation of standard best-first search, but using only linear space. Its optimal algorithm if the heuristic function h(n) is admissible. Its space complexity is linear in the depth of the deepest optimal solution, but its time complexity is rather difficult to characterize.

* RBFS (recursive best-first search) and SMA* (simplified memory-bounded A*)are robust, optimal search algorithms that use limited amounts of memory; given enough time, they can solve problems that A cannot solve because it runs out of memory.

<br>

> 👾 *Could an agent learn how to search better? Yes, and the method rests on an important concept called the metalevel state space. Each state in a metalevel state space captures the internal (computational) state of a program that is searching in an object-level state space. A metalevel learning algorithm can learn from these experiences to avoid exploring unpromising subtrees. The goal of learning is to minimize the total cost of problem solving, trading off computational expense and path cost.*

<br>

* Effective branching factor b*. If the total number of nodes generated by A* for a particular problem is N and the solution depth is d, then b* is the branching factor that a uniform tree of depth d would have to have in order to contain N + 1 nodes. 

* A problem with fewer restrictions on the actions is called a relaxed problem. The state-space graph of the relaxed problem is a supergraph of the original state space because the removal of restrictions creates added edges in the graph. The cost of an optimal solution to a relaxed problem is an admissible heuristic for the original problem.

<br>

---

## 🪆 4. BEYOND CLASSICAL SEARCH

<br>

#### LOCAL SEARCH ALGORITHMS AND OPTIMIZATION PROBLEMS

<br>

* Local search algorithms operate using a single current node (rather than multiple paths) and generally move only to neighbors of that node. Typically, the paths followed by the search are not retained. Although local search algorithms are not systematic, they have two key advantages: (1) they use very little memory—usually a constant amount; and (2) they can often find reasonable solutions in large or infinite (continuous) state spaces for which systematic algorithms are unsuitable.

* 👾 In addition to finding goals, local search algorithms are useful for solving pure optimization problems, in which the aim is to find the best state according to an objective function.

<br>

> Local search -> think state-space landscape  -> global and local minimums and maximums (on the objective function).

<br>

* The hill-climbing search algorithm (steepest-ascent version) is a loop that continually moves in the direction of increasing value—that is, uphill. It terminates when it reaches a “peak” where no neighbor has a higher value. —> GREEDY LOCAL SEARCH.

* Stochastic hill climbing chooses at random from among the uphill moves; the probability of selection can vary with the steepness of the uphill move. This usually converges more slowly than steepest ascent, but in some state landscapes, it finds better solutions. First-choice hill climbing implements stochastic hill climbing by generating successors randomly until one is generated that is better than the current state. This is a good strategy when a state has many (e.g., thousands) of successors.

<br>

> 👾 *NP-hard problems typically have an exponential number of local maxima to get stuck on. A hill-climbing algorithm that never makes “downhill” moves toward states with lower value (or higher cost) is guaranteed to be incomplete, because it can get stuck on a local maximum.*

<br>

* The simulated annealing algorithm, a version of stochastic hill climbing where some downhill moves are allowed. Downhill moves are accepted readily early in the annealing schedule and then less often as time goes on. The simulated-annealing solution is to start by shaking hard (i.e., at a high temperature) and then gradually reduce the intensity of the shaking (i.e., lower the temperature).

* A genetic algorithm (or GA) is a variant of stochastic beam search in which successor states are generated by combining two parent states rather than by modifying a single state.

* GAs begin with a set of k randomly generated states, called the population. Each state, or individual, is represented as a string over a finite alphabet.

* Fitness function: Each state is rated by the objective function.

* For each pair to be mated, a crossover point is chosen randomly from the positions in the string.

* Each location is subject to random mutation with a small independent probability. 

<br>

```
function GENETIC-ALGORITHM(population, FITNESS-FN) returns an individual
	inputs: population, a set of individuals
		FITNESS-FN, a function that measures the fitness of an individual
	repeat
	new population ←empty set
	for i = 1 to SIZE(population) do
		x ←RANDOM-SELECTION(population, FITNESS-FN)
		y ←RANDOM-SELECTION(population, FITNESS-FN)
		child ←REPRODUCE(x, y)
		if (small random probability) then child ←MUTATE(child)
		add child to new population
	population ←new population
  until some individual is fit enough, or enough time has elapsed
  return the best individual in population, according to FITNESS-FN

function REPRODUCE(x, y) returns an individual
	inputs: x, y, parent individuals
	n ←LENGTH(x); c ←random number from 1 to n
	return APPEND(SUBSTRING(x, 1, c), SUBSTRING(y, c + 1, n))
```

<br>

#### LOCAL SEARCH IN CONTINUOUS SPACES

<br>

> *The theory of evolution was developed in Charles Darwin’s On the Origin of Species by Means of Natural Selection (1859) and independently by Alfred Russel Wallace (1858). The central idea is simple: variations occur in reproduction and will be preserved in successive generations approximately in proportion to their effect on reproductive fitness.*

<br>

* For many problems, the most effective algorithm is the venerable Newton–Raphson method. This is a general technique for finding roots of functions—that is, solving equations of the form g(x)= 0. It works by computing a new estimate for the root x according to Newton’s formula x ←x−g(x)/g (x).

* To find a maximum or minimum of f, we need to find x such that the gradient is zero (i.e., ∇f(x)= 0). Thus, g(x) in Newton’s formula becomes ∇f(x), and the update equation can be written in matrix–vector form as x ←x−Hf-1 (x)∇f(x), where Hf (x) is the Hessian matrix of second derivatives, whose elements Hij are given by ∂2f/∂xi∂xj. 

* 👾 Convex optimization: allows the constraint region to be any convex region and the objective to be any function that is convex within the constraint region. Under certain conditions, convex optimization problems are also polynomially solvable and may be feasible in practice with thousands of variables.

<br>

#### SEARCHING WITH NONDETERMINISTIC ACTIONS

<br>

* When the environment is either partially observable or nondeterministic (or both), percepts become useful. In a partially observable environment, every percept helps narrow down the set of possible states the agent might be in, thus making it easier for the agent to achieve its goals. 

* The solution to a problem is not a sequence but a contingency plan (also known as a strategy) that specifies what to do depending on what percepts are received. 

* 👾 In a nondeterministic environment, branching is also introduced by the environment’s choice of outcome for each action. Solutions for nondeterministic problems can contain nested if–then–else statements; this means that they are trees rather than sequences. 

* Given the definition of a cyclic solution, an agent executing such a solution will eventually reach the goal provided that each outcome of a nondeterministic action eventually occurs. Is this condition reasonable? It depends on the reason for the nondeterminism. 

<br>

#### SEARCHING WITH PARTIAL OBSERVATIONS

<br>

* The key concept required for solving partially observable problems is the belief state, representing the agent’s current belief about the possible physical states it might be in, given the sequence of actions and percepts up to that point. 

* 👾 When the agent’s percepts provide no information at all, we have what is called a sensorless problem or sometimes a conformant problem. At first, one might think the sensorless what state it’s in; in fact, sensorless problems are quite often solvable: To solve sensorless problems, we search in the space of belief states rather than physical states. Moreover, sensorless agents can be surprisingly useful, primarily because they don’t rely on sensors working properly.

<br>

> *Belief states: The entire belief-state space contains every possible set of physical states. If P has N states, then the sensorless problem has up to 2^N states, although many may be unreachable from the initial state. The initial state: Typically the set of all states in P, although in some cases the agent will have more knowledge than this.*

<br>

* Even with this improvement, however, sensorless problem-solving as we have described it is seldom feasible in practice. The difficulty is not so much the vastness of the belief-state space—even though it is exponentially larger than the underlying physical state space; in most cases the branching factor and solution length in the belief-state space and physical state space are not so different. The real difficulty lies with the size of each belief state. 

* Recursive state estimator: it computes the new belief state from the previous one rather than by examining the entire percept sequence -> b= UPDATE(PREDICT(b,a),o).

<br>

#### ONLINE SEARCH AGENTS AND UNKNOWN ENVIRONMENTS

<br>

> *Offline search algorithms compute a complete solution before setting foot in the real world and then execute the solution. In contrast, an online search agent interleaves computation and action: first it takes an action, then it observes the environment and computes the next action. Online search is a good idea in dynamic or semidynamic domains—where there is a penalty for sitting around and computing too long. Online search is also helpful in nondeterministic domains because it allows the agent to focus its computational efforts on the contingencies that actually arise rather than those that might happen but probably won’t.*

<br>

* Online search is a necessary idea for unknown environments, where the agent does not know what states exist or what its actions do. In this state of ignorance, the agent faces an exploration problem and must use its actions as experiments in order to learn enough to make deliberation worthwhile.

* Like depth-first search, hill-climbing search has the property of locality in its node expansions. In fact, because it keeps just one current state in memory, hill-climbing search is already an online search algorithm!Unfortunately, it is not very useful in its simplest form because it leaves the agent sitting at local maxima with nowhere to go. Moreover, random restarts cannot be used, because the agent cannot transport itself to a new state.

* A random walk simply selects at random one of the available actions from the current state; preference can be given to actions that have not yet been tried.

* Augmenting hill climbing with memory rather than randomness turns out to be a more effective approach.  The basic idea is to store a “current best estimate” H(s) of the cost to reach the goal from each state that has been visited. 

<br>

> 👾 *Optimism under uncertainty encourages the agent to explore new, possibly promising paths.*

<br>

----

## 🪆 5. ADVERSARIAL SEARCH

<br>

#### GAMES (adversarial search problems)

<br>

> 👾 *Chess: deterministic, turn-taking, two-player, zero-sum games of perfect information. Chess has an average branching factor of about 35, and games often go to 50 moves by each player, so the search tree has about 35^100 or 10^154 nodes (although the search graph has “only” about 10^40 distinct nodes).*

<br>

* Games, like the real world, therefore require the ability to make some decision even when calculating the optimal decision is infeasible. Games also penalize inefficiency severely. Whereas an implementation of A search that is half as efficient will simply take twice as long to run to completion, a chess program that is half as efficient in using its available time probably will be beaten into the ground, other things being equal. 

<br>

> *A zero-sum game is (confusingly) defined as one where the total payoff to all players is the same for every instance of the game.*

<br>

#### OPTIMAL DECISIONS IN GAMES

<br>

* 👾 Given a game tree, the optimal strategy can be determined from the minimax value of each node, which we write as MINIMAX(n). The minimax value of a node is the utility (for MAX) of being in the corresponding state, assuming that both players play optimally from there to the end of the game. Obviously, the minimax value of a terminal state is just its utility. The minimax algorithm performs a complete depth-first exploration of the game tree.

<br>

```
function MINIMAX-DECISION(state) returns an action
	return argmaxa ∈ ACTIONS(s) MIN-VALUE(RESULT(state, a))

function MAX-VALUE(state) returns a utility value
	if TERMINAL-TEST(state) then return UTILITY(state)
	v ←−∞
	for each a in ACTIONS(state) do
		v ←MAX(v, MIN-VALUE(RESULT(s, a)))
	return v

function MIN-VALUE(state) returns a utility value
	if TERMINAL-TEST(state) then return UTILITY(state)
	v ←∞
	for each a in ACTIONS(state) do
		v ←MIN(v, MAX-VALUE(RESULT(s, a)))
	return v
```

<br>

* ⭐️ Let us examine how to extend the minimax idea to multiplayer games. First, we need to replace the single value for each node with a vector of values. The simplest way to implement this is to have the UTILITY function return a vector of utilities. The backed-up value of a node n is always the utility vector of the successor state with the highest value for the player choosing at n. 

* ⭐️ Multiplayer games usually involve alliances, whether formal or informal, among the players. Alliances are made and broken as the game proceeds. How are we to understand such behavior? Are alliances a natural consequence of optimal strategies for each player in a multiplayer game? 

<br>

#### ALPHA–BETA PRUNING

<br>

* Alpha–beta pruning. When applied to a standard minimax tree, it returns the same move as minimax would, but prunes away branches that cannot possibly influence the final decision.

* α  = the value of the best (i.e., highest-value) choice we have found so far at any choice point along the path for MAX. β = the value of the best (i.e., lowest-value) choice we have found so far at any choice point along the path for MIN.

* Alpha–beta can solve a tree roughly twice as deep as minimax in the same amount of time. 

<br>

#### IMPERFECT REAL-TIME DECISIONS

<br>

* The minimax algorithm generates the entire game search space, whereas the alpha–beta algorithm allows us to prune large parts of it. However, alpha–beta still has to search all the way to terminal states for at least a portion of the search space. This depth is usually not practical, because moves must be made in a reasonable amount of time.

* Claude Shannon’s paper Programming a Computer for Playing Chess (1950) proposed instead that programs should cut off the search earlier and apply a heuristic evaluation function to states in the search, effectively turning nonterminal nodes into terminal leaves. -> replace the utility function by a heuristic evaluation function EVAL, which estimates the position’s utility, and replace the terminal test by a cutoff test that decides when to apply EVAL.

<br>

> *An evaluation function returns an estimate of the expected utility of the game from a given position, just as the heuristic functions return an estimate of the distance to the goal.*

<br>

* Cutoff test: The evaluation function should be applied only to positions that are quiescent—that is, unlikely to exhibit wild swings in value in the near future. In chess, for example, positions in which favorable captures can be made are not quiescent for an evaluation function that just counts material. Nonquiescent positions can be expanded further until quiescent positions are reached. This extra search is called a quiescence search; sometimes it is restricted to consider only certain types of moves, such as capture moves, that will quickly resolve the uncertainties in the position.

<br>

> 👾 *The horizon effect arises when the program is facing an opponent’s move that causes serious damage and is ultimately unavoidable, but can be temporarily avoided by delaying tactics. One strategy to mitigate the horizon effect is the singular extension, a move that is “clearly better” than all other moves in a given position.*

<br>

> 👾 *In chess, for the openings, the computer is mostly relying on the expertise of humans. The best advice of human experts on how to play each opening is copied from books and entered into tables for the computer’s use. However, computers can also gather statistics from a database of previously played games to see which opening sequences most often lead to a win. In the early moves there are few choices, and thus much expert commentary and past games on which to draw. Usually after ten moves we end up in a rarely seen position, and the program must switch from table lookup to search. Near the end of the game there are again fewer possible positions, and thus more chance to do lookup. A human can tell you the general strategy for playing a king-and-rook-versus-king (KRK) endgame: reduce the opposing king’s mobility by squeezing it toward one edge of the board, using your king to prevent the opponent from escaping the squeeze. Other endings, such as king, bishop, and knight versus king (KBNK), are difficult to master and have no succinct strategy description. A computer, on the other hand, can completely solve the endgame by producing a policy, which is a mapping from every possible state to the best move in that state.*

<br>

> 👾 *How big will the KBNK lookup table be? It turns out there are 462 ways that two kings can be placed on the board without being adjacent. After the kings are placed, there are 62 empty squares for the bishop, 61 for the knight, and two possible players to move next, so there are just 462 ×62 ×61 ×2 = 3,494,568 possible positions. Some of these are checkmates; mark them as such in a table. Then do a retrograde minimax search: reverse the rules of chess to do unmoves rather than moves. Any move by White that, no matter what move Black responds with, ends up in a position marked as a win, must also be a win. Continue this search until all 3,494,568 positions are resolved as win, loss, or draw, and you have an infallible lookup table for all KBNK endgames.*

<br>

#### STOCHASTIC GAMES

<br>

* ⭐️ Stochastic games: Many games mirror this unpredictability by including a random element, such as the throwing of dice. It must include chance nodes in addition to MAX and MIN nodes.

* How to make correct decisions? Positions do not have definite minimax values. Instead, we can only calculate the expected value of a position: the average over all possible outcomes of the chance nodes.

* An alternative is to do Monte Carlo simulation to evaluate a position. Start with an alpha–beta (or other) search algorithm. From a start position, have the algorithm play thousands of games against itself, using random dice rolls. In the case of backgammon, the resulting win percentage has been shown to be a good approximation of the value of the position, even if the algorithm has an imperfect heuristic and is searching only a few plies (Tesauro, 1995). For games with dice, this type of simulation is called a rollout.

<br>

#### PARTIALLY OBSERVABLE GAMES

<br>

> 👾 *Chess has often been described as war in miniature, but it lacks at least one major characteristic of real wars, namely, partial observability. In the “fog of war,” the existence and disposition of enemy units is often unknown until revealed by direct contact. As a result, warfare includes the use of scouts and spies to gather information and the use of concealment and bluff to confuse the enemy.*

<br>

> 👾 *Each player’s goal is not just to move pieces to the right squares but also to minimize the information that the opponent has about their location. Playing any predictable “optimal” strategy provides the opponent with information. Hence, optimal play in partially observable games requires a willingness to play somewhat randomly. This means occasionally selecting moves that may seem “intrinsically” weak—but they gain strength from their very unpredictability, because the opponent is unlikely to have prepared any defense against them.*

<br>

* An equilibrium specifies an optimal randomized strategy for each player.

<br>

#### STATE-OF-THE-ART GAME PROGRAMS

<br>

* 👾 For Deep Blue on chess: a variety of pruning heuristics were used to reduce the effective branching factor to less than 3 (compared with the actual branching factor of about 35). The most important of these was the null move heuristic, which generates a good lower bound on the value of a position, using a shallow search in which the opponent gets to move twice at the beginning. This lower bound often allows alpha–beta pruning without the expense of a full-depth search.

* Go: because the board is 19 ×19 and moves are allowed into (almost) every empty square, the branching factor starts at 361, which is too daunting for regular alpha–beta search methods. In addition, it is difficult to write an evaluation function because control of territory is often very unpredictable until the endgame.

<br>

----

## 🪆 6. CONSTRAINT SATISFACTION PROBLEMS (CSP)

<br>

* A problem is solved when each variable has a value that satisfies all the constraints on the variable. Use general-purpose rather than problem-specific heuristics to enable the solution of complex problems.

<br>

#### DEFINING CONSTRAINT SATISFACTION PROBLEMS

<br>

* A constraint satisfaction problem consists of three components, X,D, and C: X is a set of variables, {X1,... ,Xn}, D is a set of domains, {D1,... ,Dn}, one for each variable, C is a set of constraints that specify allowable combinations of values. Each domain Di consists of a set of allowable values, {v1,... ,vk} for variable Xi. Each constraint Ci consists of a pair ⟨scope,rel⟩, where scope is a tuple of variables that participate in the constraint and rel is a relation that defines the values that those variables can take on.

<br>

> *A example is map/graph coloring (and, a long time ago, I studied [its correlation with Quantum Computing](https://www.astro.sunysb.edu/steinkirch/reviews/potts_model_paper.pdf)).*

<br>

* To solve a CSP, we need to define a state space and the notion of a solution. Each state in a CSP is defined by an assignment of values to some or all of the variables.

* One can visualize a CSP as a constraint graph. The nodes of the graph correspond to variables of the problem, and a link connects any two variables that participate in a constraint.

* CSP solvers can be faster than state-space searchers because the CSP solver can quickly eliminate large swatches of the search space.

* A constraint involving an arbitrary number of variables is called a global constraint.

* Constraint hypergraph: consists of ordinary nodes (the circles in the figure) and hypernodes (the squares), which represent n-ary constraints.

* Dual graph transformation: create a new graph in which there will be one variable for each constraint in the original graph, one binary constraint for each pair of constraints in the original graph that share variables.

* One of the most common global constraints is Alldiﬀ, which says that all of the variables involved in the constraint must have different values (e.g., a row or column of sudoku).

* In regular state-space search, an algorithm can do only one thing: search. In CSPs there is a choice: an algorithm can search (choose a new variable assignment from several possibilities) or do a specific type of inference called constraint propagation: using the constraints to reduce the number of legal values for a variable, which in turn can reduce the legal values for another variable, and so on.

* Local consistency. If we treat each variable as a node in a graph and each binary constraint as an arc, then the process of enforcing local consistency in each part of the graph causes inconsistent values to be eliminated throughout the graph. 
* Path consistency tightens the binary constraints by using implicit constraints that are inferred by looking at triples of variables.

* A CSP is k-consistent if, for any set of k−1 variables and for any consistent assignment to those variables, a consistent value can always be assigned to any kth variable.

<br>

#### BACKTRACKING SEARCH FOR CSPS

<br>

* Standard depth-limited search: a state would be a partial assignment, and an action would be adding var = value to the assignment. But for a CSP with n variables of domain size d, we quickly notice something terrible: the branching factor at the top level is nd because any of d values can be assigned to any of n variables. At the next level, the branching factor is (n−1)d, and so on for n levels. We generate a tree with n!·d^n leaves, even though there are only d^n possible complete assignments! -> this ignores commutativity!

* CSPs are commutative because when assigning values to variables, we reach the same partial assignment regardless of order.

<br>

```
function BACKTRACKING-SEARCH(csp) returns a solution, or failure
	return BACKTRACK({}, csp)

function BACKTRACK(assignment, csp) returns a solution, or failure
	if assignment is complete then return assignment
	var ←SELECT-UNASSIGNED-VARIABLE(csp)
	for each value in ORDER-DOMAIN-VALUES(var, assignment, csp) do
		if value is consistent with assignment then
			add {var = value}to assignment
			inferences←INFERENCE(csp, var, value)
			if inferences ̸= failure then
				add inferences to assignment
				result ←BACKTRACK(assignment, csp)
				if result ̸= failure then
					return result
		remove {var = value}and inferences from assignment
	return failure
```

<br>

> *Backtracking search -> a depth-first search that chooses values for one variable at a time and backtracks when a variable has no legal values left to assign.*

<br>

* One of the simplest forms of inference is called forward checking. Whenever a variable X is assigned, the forward-checking process establishes arc consistency for it: for each unassigned variable Y that is connected to X by a constraint, delete from Y ’s domain any value that is inconsistent with the value chosen for X. Because forward checking only does arc consistency inferences, there is no reason to do forward checking if we have already done arc consistency as a preprocessing step.

<br>

#### LOCAL SEARCH FOR CSPS

<br>

* Local search algorithms turn out to be effective in solving many CSPs. They use a complete-state formulation: the initial state assigns a value to every variable, and the search changes the value of one variable at a time.

* The min-conflicts: the most obvious heuristic is to select the value that results in the minimum number of conflicts with other variables.

<br>

```
function MIN-CONFLICTS(csp, max steps) returns a solution or failure
	inputs: csp, a constraint satisfaction problem
		max steps, the number of steps allowed before giving up

	current ←an initial complete assignment for csp
	for i = 1 to max steps do
		if current is a solution for csp then return current
		var ←a randomly chosen conflicted variable from csp.VARIABLES
		value ←the value v for var that minimizes CONFLICTS(var, v, current, csp)
		set var =value in current
	return failure
```

<br>

#### THE STRUCTURE OF PROBLEMS

<br>

* What are ways in which the structure of the problem, as represented by the constraint graph, can be used to find solutions quickly?

* A constraint graph is a tree when any two variables are connected by only one path. We show that any tree-structured CSP can be solved in time linear in the number of variables.

* 👾 Topological sort: to solve a tree-structured CSP, first pick any variable to be the root of the tree, and choose an ordering of the variables such that each variable appears after its parent in the tree.

<br>

> 💡 A cycle outset (feedback vertex set) is a set of vertices whose removal makes a graph acyclic (the remaining graphs has no cycles -> tree). A minimum cycle outset is the cycle outset with the smallest number of vertices. Finding such s set is the Minimum Feedback Vertex Set problem, NP-hard.

<br>

* A given constraint graph admits many tree decompositions; in choosing a decomposition, the aim is to make the subproblems as small as possible. The tree width of a tree decomposition of a graph is one less than the size of the largest subproblem. CSPs with constraint graphs of bounded tree width are solvable in polynomial time. Unfortunately, finding the decomposition with minimal tree width is NP-hard.

* There can be important structure in the values of variables as well. Consider the map-coloring problem with n colors. For every consistent solution, there is actually a set of n! solutions formed by permuting the color names. This is called value symmetry. We would like to reduce the search space by a factor of n! by breaking the symmetry. We do this by introducing a symmetry-breaking constraint. For map coloring, it was easy to find a constraint that eliminates the symmetry, and in general it is possible to find constraints that eliminate all but one symmetric solution in polynomial time, but it is NP-hard to eliminate all symmetry among intermediate sets of values during search. In practice, breaking value symmetry has proved to be important and effective on a wide range of problems.

<br>

>  ✨ Constraint satisfaction problems (CSPs) represent a state with a set of variable/value pairs and represent the conditions for a solution by a set of constraints on the variables. Many important real-world problems can be described as CSPs. A number of inference techniques use the constraints to infer which variable/value pairs are consistent and which are not. These include node, arc, path, and k-consistency. Backtracking search, a form of depth-first search, is commonly used for solving CSPs. Inference can be interwoven with search. The minimum-remaining-values and degree heuristics are domain-independent methods for deciding which variable to choose next in a backtracking search. The least-constraining-value heuristic helps in deciding which value to try first for a given variable. Backtracking occurs when no legal assignment can be found for a variable. Conflict-directed backjumping backtracks directly to the source of the problem. Local search using the min-conflicts heuristic has also been applied to constraint satisfaction problems with great success. The complexity of solving a CSP is strongly related to the structure of its constraint graph. Tree-structured problems can be solved in linear time. Cutset conditioning can reduce a general CSP to a tree-structured one and is quite efficient if a small cutset can be found. Tree decomposition techniques transform the CSP into a tree of subproblems and are efficient if the tree width of the constraint graph is small.✨

<br>

----

## 🪆 7. LOGICAL AGENTS

<br>

> *Logic as a general class of representations to support knowledge-based agents. Knowledge-based agents can accept new tasks in the form of explicitly described goals; they can achieve competence quickly by being told or learning new knowledge about the environment; and they can adapt to changes in the environment by updating the relevant knowledge.*

<br>

#### KNOWLEDGE-BASED AGENTS

<br>

* The central component of a knowledge-based agent is its knowledge base, or KB. A knowledge base is a set of sentences. Each sentence is expressed in a language called a knowledge representation language and represents some assertion about the world. Sometimes we dignify a sentence with the name axiom, when the sentence is taken as given without being derived from other sentences.

* There must be a way to add new sentences to the knowledge base and a way to query what is known -> inference derives new sentences from old. 

<br>

> *A knowledge-based agent can be built simply by TELLing it what it needs to know. Starting with an empty knowledge base, the agent designer can TELL sentences one by one until the agent knows how to operate in its environment. This is called the declarative approach to system building. In contrast, the procedural approach encodes desired behaviors directly as program code. In the 1970s and 1980s, advocates of the two approaches engaged in heated debates. We now understand that a successful agent often combines both declarative and procedural elements in its design, and that declarative knowledge can often be compiled into more efficient procedural code.*

<br>

#### LOGIC

<br>

> 👾 *A logic must also define the semantics or meaning of sentences. The semantics defines the truth of each sentence with respect to each possible world (or model).*

<br>

*  logical entailment -> a sentence follows logically from another sentence -> α |= β -> α entails the sentence β, or in every model in which α is true, β is also true -> logical inference.

* An inference algorithm that derives only entailed sentences is called sound or truth-preserving.

* Grounding: the connection between logical reasoning processes and the real environment in which the agent exists. In particular, how do we know that KB is true in the real world?

<br>

#### PROPOSITIONAL LOGIC: A VERY SIMPLE LOGIC

<br>

🌟 ¬ (not) <br>
🌟 ∧ (and) <br>
🌟 ∨ (or) <br>
🌟 ⇒ (implies)<br>
🌟 ⇔ (if and only if)

<br>

* A BNF (Backus–Naur Form) grammar of sentences in propositional logic, along with operator precedences, from highest to lowest:

```
Sentence                → AtomicSentence | ComplexSentence
AtomicSentence    → True | False | P | Q | R |. . .
ComplexSentence → ( Sentence ) | [ Sentence ]
		| ¬ Sentence
		| Sentence ∧ Sentence
		| Sentence ∨ Sentence
		| Sentence ⇒ Sentence
		| Sentence ⇔ Sentence
OPERATOR PRECEDENCE : ¬, ∧, ∨, ⇒, ⇔
```

<br>

* The semantics defines the rules for determining the truth of a sentence with respect to a particular model. In propositional logic, a model simply fixes the truth value—true or false—for every proposition symbol.

* Every known inference algorithm for propositional logic has a worst-case complexity that is exponential in the size of the input.

<br>

#### PROPOSITIONAL THEOREM PROVING

<br>

* logical equivalence -> α ≡β -> two sentences α and β are logically equivalent if they are true in the same set of models.

* A sentence is satisfiable if it is true in, or satisfied by, some model.

<br>

> ✨ *Proving β from α by checking the unsatisfiability of (α ∧¬β) corresponds exactly to the standard mathematical proof technique of reductio ad absurdum. It is also called proof by refutation or proof by contradiction.* ✨

<br>

* Inference rules that can be applied to derive a proof -> a chain of concluions that leads to the desired goal.

* The best-known rule is called Modus Ponens (Latin for mode that affirms) -> whenever any sentences of the form α ⇒β and α are given, then the sentence β can be inferred.

* Another useful inference rule is And-Elimination, which says that, from a conjunction, any of the conjuncts can be inferred.

* Define a proof problem as follows: 1) INITIAL STATE: the initial knowledge base; 2) ACTIONS: the set of actions consists of all the inference rules applied to all the sentences that match the top half of the inference rule; 3) RESULT: the result of an action is to add the sentence in the bottom half of the inference rule; 4) GOAL: the goal is a state that contains the sentence we are trying to prove.

* 👾 Monotonicity is a property of logical systems that says that the set of entailed sentences can only increase as information is added to the knowledge base. Monotonicity means that inference rules can be applied whenever suitable premises are found in the knowledge base—the conclusion of the rule must follow regardless of what else is in the knowledge base. Nonmonotonic logics, which violate the monotonicity property, capture a common property of human reasoning: changing one’s mind.

* Resolution: yields a complete inference algorithm when coupled with any complete search algorithm. The resolution rule is that it forms the basis for a family of complete inference procedures. A resolution-based theorem prover can, for any sentences α and β in propositional logic, decide whether α |= β.

<br>

> 👾 *Conjunctive normal form: Every sentence of propositional logic is logically equivalent to a conjunction of clauses.*

<br>

* Inference procedures based on resolution work by using the principle of proof by contradiction.

* 👾 The empty clause—a disjunction of no disjuncts—is equivalent to False because a disjunction is true only if at least one of its disjuncts is true. 

* Ground resolution theorem: If a set of clauses is unsatisfiable, then the resolution closure of those clauses contains the empty clause.

<br>

> 👾 *Horn clause: a disjunction of literals of which at most one is positive. Horn clauses are closed under resolution: if you resolve two Horn clauses, you get back a Horn clause.  Inference with Horn clauses can be done through the forward-chaining and backward-chaining algorithms. Deciding entailment with Horn clauses can be done in time that is linear in the size of the knowledge base!*

<br>

* In AND–OR graphs, multiple links joined by an arc indicate a conjunction—every link must be proved—while multiple links without an arc indicate a disjunction—any link can be proved.

* The forward-chaining algorithm for propositional logic: the agenda keeps track of symbols known to be true but not yet “processed.” The count table keeps track of how many premises of each implication are as yet unknown. Whenever a new symbol p from the agenda is processed, the count is reduced by one for each implication in whose premise p appears. Finally, we need to keep track of which symbols have been processed; a symbol that is already in the set of inferred symbols need not be added to the agenda again:

<br>

```
function PL-FC-ENTAILS?(KB, q) returns true or false
	inputs: KB, the knowledge base, a set of propositional definite clauses q, the query, a proposition symbol
	count ←a table, where count[c] is the number of symbols in c’s premise
	inferred←a table, where inferred[s] is initially false for all symbols
	agenda←a queue of symbols, initially symbols known to be true in KB

	while agenda is not empty do
		p ←POP(agenda)
		if p = q then return true
		if inferred[p] = false then
			inferred[p] ←true
			for each clause c in KB where p is in c.PREMISE do
				decrement count[c]
				if count[c] = 0 then add c.CONCLUSION to agenda
	return false
```

<br>

* Forward chaining is an example of the general concept of data-driven reasoning—that is, reasoning in which the focus of attention starts with the known data.

* The backward-chaining algorithm, as its name suggests, works backward from the query. If the query q is known to be true, then no work is needed. Otherwise, the algorithm finds those implications in the knowledge base whose conclusion is q. If all the premises of one of those implications can be proved true (by backward chaining), then q is true.

* Backward chaining is a form of goal-directed reasoning. It is useful for answering specific questions such as “What shall I do now?” and “Where are my keys?” Often, the cost of backward chaining is much less than linear in the size of the knowledge base, because the process touches only relevant facts.

<br>

#### EFFECTIVE PROPOSITIONAL MODEL CHECKING

<br>

* We describe two families of efficient algorithms for general propositional inference based on model checking: One approach based on backtracking search, and one on local hill-climbing search. 

* Davis–Putnam algorithm (DPLL): takes as input a sentence in conjunctive normal form—a set of clauses, with three improvements: 

<br>

```
1) early termination -> The algorithm detects whether the sentence must be true or false, even with a partially completed model. A clause is true if any literal is true, even if the other literals do not yet have truth values. For example, the sentence (A ∨B) ∧ (A ∨C) is true if A is true, regardless of the values of B and C.

2) pure symbolism heuristic -> For example, in the three clauses (A ∨¬B), (¬B ∨¬C), and (C ∨A), the symbol A is pure because only the positive literal appears, B is pure because only the negative literal appears, and C is impure.

3) unit clause heuristic -> clauses in which all literals but one are already assigned false by the model. For example, if the model contains B= true, then (¬B ∨¬C) simplifies to¬C, which is a unit clause.
```

<br>

* 👾 Tricks that enable SAT solvers to scale up to large problems:

<br>

```
1. Component analysis ->  As DPLL assigns truth values to variables, the set of clauses may become separated into disjoint subsets, called components, that share no unassigned variables. Given an efficient way to detect when this occurs, a solver can gain considerable speed by working on each component separately.

2. Variable and value ordering ->  Our simple implementation of DPLL uses an arbitrary variable ordering and always tries the value true before false. The degree heuristic suggests choosing the variable that appears most frequently over all remaining clauses.

3. Intelligent backtracking -> Many problems that cannot be solved in hours of run time with chronological backtracking can be solved in seconds with intelligent backtracking that backs up all the way to the relevant point of conflict. All SAT solvers that do intelligent backtracking use some form of conflict clause learning to record conflicts so that they won’t be repeated later in the search. 

4. Random restarts ->  We can start over from the top of the search tree, rather than trying to continue. After restarting, different random choices (in variable and value selection) are made. Clauses that are learned in the first run are retained after the restart and can help prune the search space.

5. Clever Indexing -> Fast indexing of such things as “the set of clauses in which variable Xi appears as a positive literal.”
```

<br>

* Local search algorithms: How to find a good balance between greediness and randomness?

* Some SAT problems are harder than others. Easy problems can be solved by any old algorithm, but because we know that SAT is NP-complete, at least some problem instances must require exponential run time. 

<br>

#### AGENTS BASED ON PROPOSITIONAL LOGIC

<br>

> 👾 *World agents that use propositional logic -> The first step is to enable the agent to deduce, to the extent possible, the state of the world given its percept history. This requires writing down a complete logical model of the effects of actions. -> Then, show how the agent can use logical inference to construct plans that are guaranteed to achieve its goals.*

<br>

* Propositional logic does not scale to environments of unbounded size because it lacksnthe expressive power to deal concisely with time, space, and universal patterns of relationships among objects.

<br>

> *A logical agent operates by deducing what to do from a knowledge base of sentences about the world. The knowledge base is composed of axioms—general knowledge about how the world works—and percept sentences obtained from the agent’s experience in a particular world.*

<br>

* We use the word fluent (from the Latin fluens, flowing) to refer an aspect of the world that changes.

* This specific manifestation of the frame problem is sometimes called the representational frame problem.

<br>

> 👾 *Logic itself had its origins in ancient Greek philosophy and mathematics. Various logical principles—principles connecting the syntactic structure of sentences with their truth and falsity, with their meaning, or with the validity of arguments in which they figure—are scattered in the works of Plato. The first known systematic study of logic was carried out by Aristotle, whose work was assembled by his students after his death in 322 B.C. as a treatise called the Organon. Aristotle’s syllogisms were what we would now call inference rules. Although the syllogisms included elements of both propositional and first-order logic, the system as a whole lacked the compositional properties required to handle sentences of arbitrary complexity.*

<br>

> 👾 *The closely related Megarian and Stoic schools (originating in the fifth century B.C. and continuing for several centuries thereafter) began the systematic study of the basic logical connectives. The use of truth tables for defining connectives is due to Philo of Megara. Stoics took five basic inference rules as valid without proof, including the rule we now call Modus Ponens. They derived a number of other rules from these five, using, among other principles, the deduction theorem and were much clearer about the notion of proof than was Aristotle. A good account of the history of Megarian and Stoic logic is given by Benson Mates (1953).*

<br>

> 👾 *Truth tables as a method of testing validity or unsatisfiability in propositional logic were introduced independently by Emil Post (1921) and Ludwig Wittgenstein (1922). In the 1930s, a great deal of progress was made on inference methods for first-order logic. In particular, Godel (1930) showed that a complete procedure for inference in first-order logic could be obtained via a reduction to propositional logic, using Herbrand’s theorem (Herbrand, 1930).*

<br>

---

## 🪆 8. FIRST-ORDER LOGIC

<br>

> *Propositional logic is too puny a language to represent knowledge of complex environments in a concise way. First-order logic is sufficiently expressive to represent a good deal of our commonsense knowledge.*

<br>

#### REPRESENTATION REVISITED

<br>

* What programming languages lack is any general mechanism for deriving facts from other facts; each update to a data structure is done by a domain-specific procedure whose details are derived by the programmer from his or her own knowledge of the domain. This procedural approach can be contrasted with the declarative nature of propositional logic, in which knowledge and inference are separate, and inference is entirely domain independent.

<br>

> *Sapir–Whorf hypothesis claims that our understanding of the world is strongly influenced by the language we speak. -> “We cut nature up, organize it into concepts, and ascribe significances as we do, largely because we are parties to an agreement to organize it this way—an agreement that holds throughout our speech community and is codified in the patterns of our language.”*

<br>

* The primary difference between propositional and first-order logic lies in the ontological commitment made by each language—that is, what it assumes about the nature of reality. Mathematically, this commitment is expressed through the nature of the formal models with respect to which the truth of sentences is defined. For example, propositional logic assumes that there are facts that either hold or do not hold in the world. Each fact can be in one of two states: true or false, and each model assigns true or false to each proposition symbol. First-order logic assumes more; namely, that the world consists of objects with certain relations among them that do or do not hold. The formal models are correspondingly more complicated than those for propositional logic.

<br>

> 👾 *A logic can also be characterized by its epistemological commitments—the possible states of knowledge that it allows with respect to each fact.*

<br>

#### SYNTAX AND SEMANTICS OF FIRST-ORDER LOGIC

<br>

> 👾 *The models of a logical language are the formal structures that constitute the possible worlds under consideration. Each model links the vocabulary of the logical sentences to elements of the possible world, so that the TRUTH of any sentence can be determined.*

<br>

* The basic syntactic elements of first-order logic are the symbols that stand for objects, relations, and functions. The symbols, therefore, come in three kinds: constant symbols, which stand for objects; predicate symbols, which stand for relations; and function symbols, which stand for functions. 

* The syntax of first-order logic with equality:

<br>

```
Sentence 		→ AtomicSentence | ComplexSentence
AtomicSentence 	→ Predicate | Predicate(Term, . . .) | Term = Term
ComplexSentence→ ( Sentence ) | [ Sentence ]
					| ¬ Sentence
					| Sentence ∧ Sentence
					| Sentence ∨ Sentence
					| Sentence ⇒ Sentence
					| Sentence ⇔ Sentence
					| Quantifier Variable, . . . Sentence
			Term → Function(Term, . . .)
					| Constant
					| Variable
	Quantifier → ∀| ∃
	Constant → A | X1 | John | ···
	Variable → a | x | s | ···
	Predicate → True | False | After | Loves | Raining | ···
	Function → Mother | LeftLeg | ···
OPERATOR PRECEDENCE : ¬, = , ∧, ∨, ⇒, ⇔
```

<br>

> *A model in first-order logic consists of a set of objects and an interpretation that maps constant symbols to objects, predicate symbols to relations on those objects, and function symbols to functions on those objects. Just as with propositional logic, entailment, validity, and so on are defined in terms of all possible models.*

<br>

* A term is a logical expression that refers to an object. Constant symbols are therefore terms, but it is not always convenient to have a distinct symbol to name every object.

* An atomic sentence (or atom for short) is formed from a predicate symbol optionally followed by a parenthesized list of terms. An atomic sentence is true in a given model if the relation referred to by the predicate symbol holds among the objects referred to by the arguments.

* Quantifiers -> express properties of entire collections of objects, instead of enumerating the objects by name. First-order logic contains two standard quantifiers, called universal (∀) and existential (∃).

* There is no one “correct” semantics for logic. The usefulness of any proposed semantics depends on how concise and intuitive it makes the expression of the kinds of knowledge we want to write down, and on how easy and natural it is to develop the corresponding rules of inference.

<br>

#### KNOWLEDGE ENGINEERING IN FIRST-ORDER LOGIC

<br>

> 👾 *An ontology in AI is a machine-readable knowledge model that defines concepts, their properties, and their relationships so intelligent system can understand and reason about information.*

<br>

* The knowledge-engineering process:

<br>

```
1. Identify the task
2. Assemble the relevant knowledge
3. Decide on a vocabulary of predicates, functions, and contents -> the ontology of the domain
4. Encode the general knowledge about the domain
5. Encode a description of the specific problem instance
6. Pose queries to the inference procedure and get answers
7. Debug the knowledge base
```

<br>

> 👾 *“Although Aristotle’s logic deals with generalizations over objects, it fell far short of the expressive power of first-order logic. A major barrier to its further development was its concentration on one-place predicates to the exclusion of many-place relational predicates. The first systematic treatment of relations was given by Augustus De Morgan (1864), who cited the following example to show the sorts of inferences that Aristotle’s logic could not handle: “All horses are animals; therefore, the head of a horse is the head of an animal.” This inference is inaccessible to Aristotle because any valid rule that can support this inference must first analyze the sentence using the two-place predicate “x is the head of y.” The logic of relations was studied in depth by Charles Sanders Peirce (1870, 2004).*

<br>

----

## 🪆 9. INFERENCE IN FIRST-ORDER LOGIC

<br>

> *Obtaining algorithms that can answer any answerable question stated in first-order logic.*

<br>

#### PROPOSITIONAL VS. FIRST-ORDER INFERENCE

<br>

* 👾 First-order inference can be done by converting the knowledge base to propositional logic and using propositional inference.

* Universal Instantiation -> we can infer any sentence obtained by substituting a ground term (a term without variables) for the variable.

*  Existential Instantiation, the variable is replaced by a single new constant symbol -> applying the existential instantiation rule just gives a name to that object -> the new name is called a Skolem constant -> the new knowledge base is not logically equivalent to the old, but it can be shown to be inferentially equivalent in the sense that it is satisfiable exactly when the original knowledge base is satisfiable.

<br>

> ⭐️ *In logic, entailment is the relationship where the truth of one statement (or set of statements) guarantees the truth of another statement). Semantic entailment is based on meaning or truth of all interpretations (models). Syntactic derivation is based on formal proof rules. For sound and complete logical systems, these notions coincide.*

<br>

* 👾 Very much like the halting problem for Turing machines -> The question of entailment for first-order logic is semidecidable—that is, algorithms exist that say yes to every entailed sentence, but no algorithm exists that also says no to every nonentailed sentence.

<br>

#### UNIFICATION AND LIFTING

<br>

> *Generalized Modus Ponems is an inference rule combining multiple premises with variable substitution (unification) used in first-order logic, rule-based expert systems, and forward-chaining and backward-chaining inference algorithms.*

<br>

* Lifted inference rules require finding substitutions that make different logical expressions look identical. This process is called unification and is a key component of all first-order inference algorithms. The UNIFY algorithm takes two sentences and returns a unifier for them if one exists.

<br>

> 👾 *Predicate indexing is an optimization technique used in first-order logic and AI inference systems to make rule matching more efficient. Instead of checking every fact in the knowledge base, facts are organized (indexed) by their predicate name so that only relevant facts are searched.*

<br>

* Predicate indexing is useful when there are many predicate symbols but only a few clauses for each symbol.

* Subsumption lattice -> the child of any node in the lattice is obtained from its parent by a single substitution; and the “highest” common descendant of any two nodes is the result of applying their most general unifier. The portion of the lattice above any ground fact can be constructed systematically.  Function symbols and variables in the sentences to be stored introduce still more interesting lattice structures.

* For a predicate with n arguments, however, the lattice contains O(2^n) nodes. 

<br>

#### FORWARD CHAINING

<br>

* First-order definite clauses closely resemble propositional definite clauses -> they are disjunctions of literals of which exactly one is positive. Unlike propositional literals, first-order literals can include variables, in which case those variables are assumed to be universally quantified.

<br>

```
King(x) ∧Greedy(x) ⇒ Evil(x).
King(John).
Greedy(y).
```
<br>

*  Three possible sources of inefficiency for forward-chaining algorithm: 1) the “inner loop” of the algorithm involves finding all possible unifiers such that the premise of a rule unifies with a suitable set of facts in the knowledge base (pattern matching).; 2) the algorithm rechecks every rule on every iteration to see whether its premises are satisfied, even if very few additions are made to the knowledge base on each iteration.; 3) the algorithm might generate many facts that are irrelevant to the goal. 

* We can express every finite-domain CSP as a single definite clause together with some associated ground facts. Matching a definite clause against a set of facts is NP-hard. -> forward chaining has an NP-hard matching problem in its inner loop but a data complexity that is polynomial.

* If the constraint graph (the graph whose nodes are variables and whose links are constraints) forms a tree, then the CSP can be solved in linear time.

* Incremental forward chaining -> Every new fact inferred on iteration t must be derived from at least one new fact inferred on iteration t−1. This is true because any inference that does not require a new fact from iteration t−1 could have been done at iteration t−1 already.

<br>

> 👾 *The rete algorithm preprocesses the set of rules in the knowledge base to construct a sort of dataflow network in which each node is a literal from rule premise. Variable bindings flow through the network and are filtered out when they fail to match a literal.  If two literals in a rule share a variable, then the bindings from each literal are filtered through an equality node.*

<br>

> ⭐️ *Cognitive architectures: models of human reasoning—such as ACT (Anderson, 1983) and SOAR (Laird et al., 1987). In such systems, the “working memory” of the system models human short-term memory, and the productions are part of long-term memory. On each cycle of operation, productions are matched against the working memory of facts. A production whose conditions are satisfied can add or delete facts in working memory. In contrast to the typical situation in databases, production systems often have many rules and relatively few facts. With suitably optimized matching technology, some modern systems can operate in real time with tens of millions of rules.*

<br>

#### BACKWARD CHAINING

<br>

> *Backward chaining algorithms work backward from the goal, chaining through rules to find known facts that support the proof.*

<br>

> *Logic programming -> systems should be constructed by expressing knowledge in a formal language and that problems should be solved by running inference processes on that knowledge.*

<br>

* The execution of Prolog programs is done through depth-first backward chaining, where clauses are tried in the order in which they are written in the knowledge base.

* There are two principal sources of parallelism -> The first, called OR-parallelism, comes from the possibility of a goal unifying with many different clauses in the knowledge base. Each gives rise to an independent branch in the search space that can lead to a potential solution, and all such branches can be solved in parallel. The second, called AND-parallelism, comes from the possibility of solving each conjunct in the body of an implication in parallel. AND-parallelism is more difficult to achieve, because solutions for the whole conjunction require consistent bindings for all the variables. Each conjunctive branch must communicate with the other branches to ensure a global solution.

* Forward chaining on graph search problems is an example of dynamic programming, in which the solutions to subproblems are constructed incrementally from those of smaller subproblems and are cached to avoid recomputation. We can obtain a similar effect in a backward chaining system using memoization—that is, caching solutions to subgoals as they are found and then reusing those solutions when the subgoal recurs, rather than repeating the previous computation.

<br>

#### RESOLUTION

<br>

> 👾 *Propositional resolution using refutation is a complete inference procedure for propositional logic.*

<br>

* As in the propositional case, first-order resolution requires that sentences be in conjunctive normal form (CNF)—that is, a conjunction of clauses, where each clause is a disjunction of literals. Literals can contain variables, which are assumed to be universally quantified. 

* Every sentence of first-order logic can be converted into an inferentially equivalent CNF sentence.

<br>

> *Skolemination is a method used to eliminate existential quantifiers by replacing quantified variables with Skolem constants or functions.*

<br>

* Binary resolution rule -> it resolves exactly two literals.

<br>

> 👾 *By slightly extending the language of first-order logic to allow for the mathematical induction schema in arithmetic, Kurt Gödel was able to show, in his incompleteness theorem, that there are true arithmetic sentences that cannot be proved.*

<br>

* Refutation-complete -> if a set of sentences is unsatisfiable, then resolution will always be able to derive a contradiction.

* Resolution cannot be used to generate all logical consequences of a set of sentences, but it can be used to establish that a given sentence is entailed by the set of sentences. Hence, it can be used to find all answers to a given question, Q(x), by proving that KB ∧¬Q(x) is unsatisfiable.

<br>

> ✨ *If S is an unsatisfiable set of clauses, then the application of a finite number of resolution steps to S will yield a contradiction.* ✨

<br>

> ✨ **GODEL’S INCOMPLETENESS THEOREM -> By slightly extending the language of first-order logic to allow for the mathematical induction schema in arithmetic, Kurt Gödel was able to show, in his incompleteness theorem, that there are true arithmetic sentences that cannot be proved. -> we can never prove all the theorems of mathematics within any given system of axioms.** ✨

<br>

* Resolution strategies:

<br>

```
- Unit preference -> one of the sentences is a single literal
- Set of support -> try to eliminate some potential resolutions altogether -> insist that every resolution step involve at least one element of special set of clauses
- Input resolution -> every resolution combines one of the input sentences with some other sentence.
- Subsumption -> eliminates all sentences that are subsumed bu an existing sentence in the knowledge base.
```

<br>

---

<br>

### TO BE CONTINUED... 😄

<br>

### ⬛️