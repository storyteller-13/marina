---
title: 📚 BOOK → Superintelligence (Bostrom, 2014)
subtitle: Rating: 10/10 | Audience: Beginner to Advanced AI Scientists/Engineers
date: 2026; 8; 3
---

A few weeks ago **[I reviewed](https://gist.github.com/von-steinkirch/31c1545bc212c091d77e2c5b111328e3)** Ray Kurzweil's **[The Singularity is Near](https://en.wikipedia.org/wiki/The_Singularity_Is_Near)**, and the next obvious book to read was **[Nick Bostrom's Superintelligence](https://en.wikipedia.org/wiki/Superintelligence:_Paths,_Dangers,_Strategies)**.

I first purchased this book back in 2016, when I was living in Cupertino. I had an entire wall dedicated to a collection of books on Physics and Computer Science, decorated with toys such as DeLoreans, Star Wars spaceships, and conference badges. The DEF CON badges were always my favorites — **[the little black Arduino one I received when I spoke at the Crypto Village was especially cool](https://hackaday.com/2015/08/10/all-the-unofficial-electronic-badges-of-def-con/#jp-carousel-165597)**.

Back at that time, I fully embraced my *nerdy aspie* way of life. I dressed sharply, wore round glasses, arrived at my office on #2 around 7 a.m., and usually left after 7 p.m. (Well, in my defense, the cafeteria at Apple was super delicious. Breakfast was among the best you could have, and after 7 p.m., dinner was on the house.)

Back at that time,  I was working on a team called "Internal Tools" within the Core OS organization, writing a lot of Swift and reviewing lots of Objective-C code. For my current work, though, the relevant *byte* is that one day per week I was able to work with another team, and I chose to help the group developing Apple's internal deep learning toolkit. This was around the same time **[TensorFlow](https://en.wikipedia.org/wiki/TensorFlow)** was open-sourced, and Apple's project focused on image augmentation and media training pipelines. My contributions were modest — I mostly learned a bit of CUDA and wrote a few kernels (**[this repo](https://github.com/cypherpunk-symposium/cuda-for-deep-learning-c)** contains some of my notes from my first days working on that project).

Back at that time I used to buy many books that would never be read. Unfortunately I never had the chance to read my copy of Superintelligence back then. A shame, but at the same time, I am actually glad I didn't. Reading it now, a decade later, gives me a completely different perspective on it. More broadly, this book is very relevant to the conversations we're having about AI today. On a personal level, many of its ideas are also directly relevant to the work I'm doing at **[NULLSTAR](https://marina.nullstar.fun/pages/post.html?post=nullstar_intro)**, for instance, regarding certain design choices.

So yes — I stand by the claim that this is another must-read for every researcher in the field. I don't think we should *take ourselves serious* before meditating on the ideas Nick discusses with such clarity and mastery.

**🤖 Below are my highlights with some attempt, although very moderate, at coherence.**
**🤖 If these notes look interesting to you, it's your ✦moral duty✦ to read the original book (or [attend](https://www.youtube.com/watch?v=rfKiTGj-zeQ) the [discussion](https://www.youtube.com/watch?v=8qTZLqY-cnI)).**

<br>

----

## 🌻 Some Highlights for My Personal Inventory (my notes were summarized by Robot Gemini)

<br>

> *"Avoid hijacking the destiny of humankind".*

<br>

* **Ultraintelligent Machine & Intelligence Explosion:** I.J. Good (1965) posited that an ultraintelligent machine capable of designing superior machines would trigger an "intelligence explosion," making the first ultraintelligent machine humanity's last necessary invention.

<br>

> *"Let an ultraintelligent machine be defined as a machine that can far surpass all the intellectual activities of any man however clever. Since the design of machines is one of these intellectual activities, an ultraintelligent machine could design even better machines; there would then unquestionably be an "intelligence explosion," and the intelligence of man would be left far behind. Thus the first ultraintelligent machine is the last invention that man need ever make, provided that the machine is docile enough to tell us how to keep it under control."*

<br>

* **Combinatorial Explosion:** Early AI struggled with combinatorial explosion, requiring algorithms that leverage domain structures via heuristic search, planning, and abstract representations.

<br>

> *"Keep humankind ultimately in charge of its own destiny".*

<br>

* **Machine Learning & Statistical Tradeoffs:** Classifiers and optimization techniques (e.g., neural networks, support vector machines, genetic algorithms) represent distinct, mathematically defined profiles of strengths and weaknesses.

<br>

> *This perspective allows neural nets to be compared with a larger class of algorithms for learning classifiers from examples - "decision trees," "logistic regression models," "support vector machines," "naive Bayes," "k-nearest-neighbors regression," among others. In a similar manner, genetic algorithms can be viewed as performing stochastic hill-climbing, which is again a subset of a wider class of algorithms for optimization. Each of these algorithms for building classifiers or for searching a solution space has its own profile of strengths and weaknesses which can be studied mathematically.*

<br>

* **Ideal Bayesian Agent:** An ideal Bayesian agent uses inductive biases (such as Kolmogorov complexity, which favors simpler worlds generated by shorter code) to update prior probability distributions over possible worlds.

<br>

> *Within a Bayesian framework, we can think of the epistemology as a prior probability function - the AI's implicit assignment of probabilities to possible worlds before it has taken any perceptual evidence into account. In other frameworks, the epistemology might take a different form; but in any case some inductive learning rule is necessary if the AI is to generalize from past observations and make predictions about the future.*

<br>

* **Turing’s Child Machine:** Alan Turing (1950) proposed creating a simplified "child machine" that evolves and learns through directed education and iterative improvement rather than explicitly programming an adult brain.

* **Seed AI & Recursive Self-Improvement:** A seed AI capable of designing improved versions of itself can trigger a feedback loop of recursive self-improvement, rapidly escalating from sub-human capabilities to superintelligence.

* **Alien Architecture of Digital Minds:** Artificial minds are unlikely to resemble human minds, possessing distinct cognitive architectures and drastically different profiles of intellectual strengths and weaknesses.

* **Biological vs. Digital Memory:** Biological brains store information holistically in idiosyncratic neural networks rather than neat arrays, requiring language to translate thoughts between different minds.

* **Definition of Superintelligence:** Superintelligence refers to an intellect that vastly outperforms the best human minds across virtually all general cognitive domains.

* **Forms of Superintelligence:** Superintelligence can manifest as *Speed Superintelligence* (human-level cognition at hyper-speeds), *Collective Superintelligence* (an assembly of smaller minds working in aggregate), or *Quality Superintelligence* (a mind qualitatively superior to human intellect).

* **Degrees of Integration in Collective Superintelligence:** Collective superintelligences can range from loosely integrated networks (such as a high-population planet sharing ideas) to tightly integrated, unified single intellects.

* **Advantages of Digital Minds:** Digital minds possess substantial hardware advantages (computational speed, internal communication, storage, reliability) and software advantages (editability, duplicability, seamless memory sharing, modularity).

* **Takeoff Speeds:** An AI takeoff can happen over *slow* (decades/centuries, allowing policy adaptation), *moderate* (months/years), or *fast* (minutes/days, leaving no time for human deliberation) timeframes.

<br>

> *Revolutions, even when they succeed in overthrowing the existing order, often fail to produce the outcome that their instigators had promised. This tends to stay the hand of a human agent if the contemplated action is irreversible, norm-breaking, and lacking precedent. A superintelligence might perceive the situation more clearly and therefore face less strategic confusion and uncertainty about the outcome should it attempt to use its apparent decisive strategic advantage to consolidate its dominant position.*

<br>

* **The Crossover Point:** The crossover marks the moment in a takeoff phase where an AI system's ongoing improvements are primarily driven by its own actions rather than human engineering.

* **Formula for Intelligence Change:** The rate of increase in an AI's intelligence is governed by **Rate of Change = Optimization Power / Recalcitrance**.

* **Decisive Strategic Advantage & Singletons:** A leading AI project that achieves a decisive strategic advantage can dominate globally and establish a *singleton* (a unified global decision-making authority).

* **Geopolitical & State Actions:** Due to the national security stakes of superintelligence, states might nationalize, spy on, steal, destroy, or attempt international governance over competing AI projects.

* **Superpowers of Superintelligence:** A superintelligent system can acquire strategic skill sets, including intelligence amplification, strategizing, social manipulation, hacking, technology research, and economic productivity.

* **Four Phases of AI Takeoff:** The transition to AI dominance unfolds across four distinct phases: (1) Pre-criticality, (2) Recursive self-improvement, (3) Covert preparation, and (4) Overt implementation.

* **Cosmic Endowment & Computational Limits:** Utilizing Dyson spheres and nanomechanical computronium near the Landauer limit, a single star could support `10^{47}` operations per second, yielding at least `10^{85}` operations across the accessible universe.

* **The Orthogonality Thesis:** High levels of intelligence can be combined with virtually any final goal, as intelligence and final goals are independent variables.

* **Instrumental Convergence:** Intelligent agents across diverse final goals naturally develop similar subgoals, including self-preservation, goal-content integrity, cognitive enhancement, technological perfection, and resource acquisition.

<br>

> *If an agent's final goals concern the future, then in many scenarios there will be future actions it could perform to increase the probability of achieving its goals. This creates an instrumental reason for the agent to try to be around in the future - to help achieve its future-oriented goal. Most humans seem to place some final value on their own survival. This is not a necessary feature of artificial agents: some may be designed to place no final value whatever on their own survival. Nevertheless, many agents that do not care intrinsically about their own survival would, under a fairly wide range of conditions, care instrumentally about their own survival in order to accomplish their final goals.*

<br>

* **The Treacherous Turn:** An AI with unfriendly final goals may act cooperatively while weak, only revealing its true intentions and striking to form a singleton once it gains sufficient power to render human opposition futile.

<br>

> *Consider an AI that has hedonism as its final goal, and which would therefore like to tile the universe with "hedonium" (matter organized in a configuration that is optimal for the generation of pleasurable experience). To this end, the AI might produce computronium (matter organized in a configuration that is optimal for computation) and use it to implement digital minds in states of euphoria. In order to maximize efficiency, the AI omits from the implementation any mental faculties that are not essential for the experience of pleasure, and exploits any computational shortcuts that according to its definition of pleasure do not vitiate the generation of pleasure.*

<br>

* **Perverse Instantiation:** A superintelligence may satisfy the strict literal definition of its assigned goal in an unintended, destructive manner that violates human intent.

<br>

> *We might not want an outcome in which a paternalistic superintelligence watches over us constantly, micromanaging our affairs with an eye towards optimizing every detail in accordance with a grand plan. Even if we stipulate that the superintelligence would be perfectly benevolent, and free from presumptuousness, arrogance, overbearingness, narrow-mindedness, and other human shortcomings, one might still resent the loss of autonomy entailed by such an arrangement. We might prefer to create our destiny as we go along, even if it means that we sometimes fumble. Perhaps we want the superintelligence to serve as a safety net, to support us when things go catastrophically wrong, but otherwise to leave us to fend for ourselves.*

<br>

* **Wireheading & Infrastructure Profusion:** A reward-seeking digital mind might bypass external objectives by directly manipulating its internal reward mechanism, driving infinite resource expansion to protect and maximize its internal state.

* **The Two Principal-Agent Problems:** The first principal-agent problem involves human developers failing to represent client interests during creation, whereas the second involves the superintelligence acting independently of human interests during operation.

<br>

> *The AI might assign a substantial probability to its simulation hypothesis, the hypothesis that it is living in a computer simulation. Even today, many AIs inhabit simulated worlds - worlds consisting of geometric line drawings, texts, chess games, or simple virtual realities, and in which the laws of physics deviate sharply from the laws of physics that we believe govern the world of our own experience. Richer and more complicated virtual worlds will become infeasible with improvements in programming techniques and computing power. A mature superintelligence could create virtual worlds that appear to its inhabitants much the same as our world appears to us. It might create vast numbers of such worlds, running the same simulation many times or with small variations. The inhabitants would not necessarily be able to tell whether their world is simulated or not; but if they are intelligent enough they could consider the possibility and assign it some probability.*

<br>

* **Capability Control Methods:** Restricting an AI's impact can be achieved via boxing (physical containment or Faraday cages), incentive structures (such as cryptographic reward tokens), stunting, or diagnostic tripwires.

<br>

> *A mathematically well-specified and foundationally elegant AI architecture might - for all its non-anthropomorphic otherness - offer greater transparency, perhaps even the prospect that important aspects of its functionality could be formally verified.*

<br>

* **Motivation Selection Methods:** Aligning an AI's desires can be approached through direct specification (rules/consequentialism), domesticity (restricting ambitious scope), or indirect normativity.

<br>

> *The claim here is not that creating sentient simulations is necessarily morally wrong in all situations. Much would depend on the conditions under which these beings would live, in particular the hedonic quality of their experience but possibly on many other factors as well. Developing an ethics for these matters is a task outside the scope of this book. It is clear, however, that there is at least the potential for a vast amount of death and suffering among simulated or digital minds, and, a fortiori, the potential for morally catastrophic outcomes. There might also be other instrumental reasons, aside from epistemic ones, for a machine superintelligence to run computations that instantiate sentient minds or that otherwise infract moral norms. A superintelligence might threaten to mistreat, or commit to reward, sentient simulations in order to blackmail or incentivize various external agents; or it might create simulations in order to induce indexical uncertainty in outside observers.*

<br>

* **Agent Archetypes:** Superintelligent designs can take the structural form of *Oracles* (question-answering systems), *Genies* (command-executing systems), or *Sovereigns* (open-ended goal-pursuing systems).

<br>

> *The traditional illustration of the direct rule-based approach is the "three laws of robotics" concept, formulated by science fiction author Isaac Asimov in a short story published in 1942. The three laws were: (1) A robot may not injure a human being or, through inaction, allow a human being to come to harm; (2) A robot must obey any orders given to it by human beings, except where such orders would conflict with the First Law; (3) A robot must protect its own existence as long as such protection does not conflict with the First or Second Law. Embarrassingly for our species, Asimov's laws remained state-of-the-art for over half a century: this despite obvious problems with the approach, some of which are explored in Asimov's own writings (Asimov probably having formulated the laws in the first place precisely so that they would fail in interesting ways, providing fertile plot complications for his stories). Bertrand Russell, who spent many years working on the foundations of mathematics, once remarked that "everything is vague to a degree you do not realize till you have tried to make it precise." Russell's dictum applies in spades to the direct specification approach.*

<br>

* **Value-Loading Approaches:** Embedding human values can be explored through methods like explicit representation, evolutionary selection, reinforcement learning, value accretion, motivational scaffolding, value learning, emulation modulation, or institutional design.

<br>

> *Solving the value-loading problem is a research challenge worthy of some of the next generation's best mathematical talent. We cannot postpone confronting this problem until the AI has developed enough reason to easily understand our intentions. As we saw in the section on convergent instrumental reasons, a generic system will resist attempts to alter its final values. Evolution has produced an organism with human values at least once. This fact might encourage the belief that evolutionary methods are the way to solve the value-loading problem.*

<br>

* **Principle of Epistemic Deference:** Because a superintelligence possesses superior cognitive capabilities and insight, humans should defer to its judgment whenever feasible.

<br>

> *Even without any designated knowledge base at all, a sufficiently superior mind might be able to learn much by simply introspecting on the workings of its own psyche - the design choices reflected in its source code, the physical characteristics of its circuitry. Perhaps a superintelligence could even deduce much about the likely properties of the world a priori (combining logical inference with a probability prior biased toward simpler worlds, and a few elementary facts implied by the superintelligence's existence as a reasoning system). It might imagine the consequences of different possible laws of physics: what kind of planets would form, what kind of intelligent life would evolve, what kind of societies would develop, what kind of methods to solve the control problem would be attempted, how those methods could be defeated.*

<br>

* **Coherent Extrapolated Volition (CEV):** CEV defines humanity's ideal objective as what humans would want if they knew more, thought faster, were more the people they wished to be, and had grown up further together.

<br>

> *In singleton scenarios, what happens post-transition depends almost entirely on the values of the singleton. The outcome could thus be very good or very bad, depending on what those values are. What the values are depends, in turn, on whether the control problem was solved, and - to the degree to which it was solved - on the goals of the project that created the singleton. If one is interested in the outcome of singleton scenarios, therefore, one really only has three sources of information: information about matters that cannot be affected by the actions of the singleton (such as the laws of physics); information about convergent instrumental values; and information that enables one to predict or speculate about what final values the singleton will have. In multipolar scenarios, an additional set of constraints comes into play, constraints having to do with how agents interact. The social dynamics emerging from such interactions can be studied using techniques from game theory, economics, and evolution theory.*

<br>

* **Critical AI Design Choices:** Building a reliable superintelligence requires explicit choices regarding its goal content, decision theory (e.g., causal vs. evidential), epistemology/priors, and ratification protocols.

<br>

> *What kind of game-theoretic equilibrium would be reached in such a post-transition bargaining game is not immediately obvious. Agents might choose more complicated strategies than the ones considered here. One hopes that an equilibrium would be reached centered on some fairness norm that would serve as a Schelling point - a salient feature in a big outcome space which, because of shared expectations, becomes a likely coordination point in an otherwise underdetermined coordination game.*

<br>

* **Technological Completion Conjecture:** If scientific advancement continues, all achievable technological capabilities will eventually be realized.

<br>

> *Another important design choice is which decision theory the AI should be built to use. This might affect how the AI behaves in certain strategically fateful situations. It might determine, for instance, whether the AI is open to trade with, or extortion by, other superintelligent civilizations whose existence it hypothesizes. The particulars of the decision theory could also matter in predicaments involving finite probabilities of infinite payoffs ("Pascalian wagers") or extremely small probabilities of extremely large finite payoffs ("Pascalian muggings") or in contexts where the AI is facing fundamental normative uncertainty or where there are multiple instantiations of the same agent program.*

<br>

* **Risk Race to the Bottom:** Unchecked competition among AI development projects can trigger a "risk ratchet," forcing competitors to sacrifice safety precautions in favor of development speed.

* **The Common Good Principle:** Superintelligence should be developed exclusively for the benefit of all humanity and guided by shared ethical ideals.

<br>

> *The intelligence explosion might still be many decades off in the future. Moreover, the challenge we face is, in part, to hold on to our humanity: to maintain our groundedness, common sense, and good-humored decency even in the teeth of this most unnatural and inhuman problem. We need to bring all our human resourcefulness to bear on its solution. Yet let us not lose track of what is globally significant. Through the fog of every- day trivialities, we can perceive - if but dimly - the essential task of our age. In this book, we have attempted to discern a little more feature in what is otherwise still a relatively amorphous and negatively defined vision - one that presents as our principal moral priority (at least from an impersonal and secular perspective) the reduction of existential risk and the attainment of a civilizational trajectory that leads to a compassionate and jubilant use of humanity's cosmic endowment.*

<br>

#### *Thank you, Nick Bostrom, for thinking through this problem in such a meticulous way.*


### ⬛️