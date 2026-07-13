---
title: 📺 PODCAST → Tim Roughgarden + Ergo on Computation
subtitle: Rating: 10/10 | Audience: Beginner to Intermediate Computer Scientists
date: 2026-07-12
---

#### ✨ Last week I discovered a [new YouTube channel called Ergo](https://www.youtube.com/@ergo_org), and they're publishing lectures featuring many outstanding guests. I wanted to binge-watch all of them, but I decided to start with one of my favorite subjects ever: [Algorithms](https://www.youtube.com/playlist?list=PL1GBzfniaE7xovcAP1LbbTi7UXsqEoCyl) (I even published [a book about it](https://github.com/cypherpunk-symposium/master-algorithms-py) a decade ago).

<br>

## 🪎 P ? NP 4 Life

<br>

> *Why is it so hard to prove such a simple statement? Would it be easier to prove *why* it's so hard to prove?*

<br>

Tim Roughgarden walks through the origins of theoretical computer science, beginning with Alan Turing's seminal 1936 paper and Hilbert's program, later transformed by Gödel's incompleteness theorems.

Starting with a whiteboard definition of a Turing machine and explaining how one machine can rule them all through universality, he explores whether there is a mechanical procedure capable of generating proofs for true statements. From there, he discusses the meaning of undecidability, confronting the uncomfortable but fundamental truth of the unsolvability of the Halting Problem. It is simply a fact about our universe that there is no automated procedure capable of solving it.

He then revisits decision problems, explaining why provability cannot be determined simply by searching through increasingly longer proofs. This naturally leads back to Cantor's famous 1891 diagonalization argument, showing that there are more real numbers than integers — that some infinities are genuinely larger than others (i.e., different cardinalities of infinity). Ironically, the same diagonalization technique that was initially rejected by many mathematicians ultimately dealt a fatal blow to Hilbert's original program.

Tim then introduces the (pre-quantum) Church–Turing thesis: any computation that can be effectively performed can also be carried out by a Turing machine. From there, he arrives at the P versus NP problem — arguably the deepest and most important open problem in theoretical computer science.

<br>

> *Are there problems whose solutions are easy to verify but nevertheless require brute-force search to find?*

<br>

He builds intuition for efficient algorithms by defining P as the class of problems solvable in polynomial time, and explains how improvements in computing power affect the size of solvable problems. For example, with a linear-time algorithm, doubling computing power doubles the size of the problem that can be solved. With a quadratic-time algorithm, doubling computing power increases the solvable problem size by only about 41%.

From there, he discusses graph algorithms, graph isomorphism (determining [whether two networks are structurally identical](https://github.com/autistic-symposium/mlnet-complex-networks)), and contrasts exhaustive search with efficiently solvable problems like shortest paths. This naturally leads to the Traveling Salesman Problem (TSP), one of the canonical NP-complete problems, illustrating why we do not know efficient algorithms for solving it.

Using reductions to connect different computational problems, he argues that it is much easier to believe that P ≠ NP than the opposite. Sudoku serves as a nice example: while verifying a completed puzzle is easy, finding a solution appears computationally difficult. He also mentions that John Nash, while working on cryptographic problems, likewise did not believe that P equals NP.

Within NP (non-deterministic polynomial time), he discusses three broad groups of problems:

1. NP-complete problems (such as TSP), to which all NP problems can be reduced.
2. Problems already known to be in P.
3. NP-intermediate problems, such as integer factorization.

This third class has become especially important in the era of quantum computing. Thanks to Shor's algorithm, we know that integer factorization can be solved efficiently on a sufficiently powerful quantum computer, which would break RSA encryption. However, because factoring is only a set of the NP class, this does not imply that quantum computers make P = NP.

Instead, quantum computing poses a challenge to the original Church–Turing thesis. If factoring can indeed be solved efficiently on a quantum computer but not on a classical computer, then it would no longer be true that every efficiently realizable computation can be simulated efficiently by a classical Turing machine. This realization motivated the quantum version of the Extended Church–Turing thesis.

Finally, Tim spends some time reflecting on what makes a great mathematician or theoretical computer scientist. His conclusion is that success depends not only on talent or luck, but perhaps even more on persistence and relentless curiosity. That part made me smile. :)

<br>

*Thank you, Tim, for such an entertaining discussion and for making us excited about algorithms once again!*

### ⬛️