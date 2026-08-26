---
title: 📚 BOOK → TAOCP - Part  1️⃣ (Donald E. Knuth, 1997)
subtitle: Rating: 10/10 | Audience: Beginner to Advanced Computer Scientists
date: 2026; 8; 22
---

![](/blog/assets/monet.jpg)

<br>


> [🎶](https://www.youtube.com/watch?v=hkWKXdRMVxE) ✨ ***"The process of preparing programs for a digital computer is especially attractive, not only because it can be economically and scientifically rewarding, but also because it can be an aesthetic experience much like composing poetry or music".*** ✨

> ***Things have changed in the past two decades.*** — Bill Gate (1995)

> ***Things have changed in the past three decades*** — Marina von Steinkirch (2026)

> ***Practice yourself, for heaven's sake, in little things; and thence proceed to greater.*** — Epictetus (c. 100 CE)

> ***Any one who considers arithmetical methods of producing random digits is, of course, in a state of sin.*** — John Von Neumann (1951)


<br>

For the first series of posts of my **[new and free life](https://gist.github.com/von-steinkirch/8213afc9f505664e6b634d2834eeaca6)**, as I continue to **[work on my dreams](https://gist.github.com/von-steinkirch/c6a453915347867425c522fce52becdc)** and build **[NULLSTAR](https://nullstar.games)**, I decided to delve into a **[quintessential](https://arxiv.org/pdf/2608.16753)** **[Bible](https://www.youtube.com/watch?v=xH7U7w9Qzlo)** that has been on my reading list for decades. At some point (again, when I was living in the Bay Area), I even owned the physical books — but shamefully, barely read them.

Well, I am **[super-uber](https://www.youtube.com/watch?v=oWIwYGs30T4)** excited because now I am in that slightly **[liminal space](https://www.youtube.com/watch?v=iSIP65HQ-iA)** where I actually have some time to read them in between the tasks of my main job of, you know, actually writing code and building my (still-stealth) company. One thing I have learned over the many years of **[honing](https://vitalik.eth.limo/general/2026/08/21/obfuscation_part_iii_local_mixing.html)** my craft, and about the way my **[brain](https://arxiv.org/pdf/2607.12664v1)** works, is that I am most efficient when I alternate between bits of *producing* work (like writing code, writing, or doing some planing) and *consuming* work (like technical reading, debugging, or watching podcasts). Luckily, this kind of cyclical context switching is somehow both **[fun](https://www.youtube.com/watch?v=N5AQFYtqx8Q)** and productive. How about you? Have you figured out *your best protocol* for working on your craft and doing what you love?

By the way, is it weird that I am low-key very thrilled about this journey? I have no idea how many posts I will need to write to complete all 4️⃣ volumes of **[The Art of Computer Programming](https://www.amazon.com/Computer-Programming-Volumes-1-4A-Boxed/dp/0321751043?tag=ustxtaddt-20)** by the master Donald E. Knuth (or even whether I will complete the Odyssey *alive*...), but I do have a feeling I might emerge as another **[hero](https://openai.com/index/pacing-model-development-cyber-capabilities/)** when I come out **[the other side](https://www.youtube.com/watch?v=lrd5aiw-gv4)**.

In this post, I worked through Volume 1️⃣, *Fundamental Algorithms*, and the first part of Volume 2️⃣, *Seminumerical Algorithms*. And, not going to lie, I know I’m a great computer scientist because I pretty much know everything in this first book in my bones. I guess dedicating your entire life to your profession does that. 💁🏻‍♀️

<br>

![](/blog/assets/nerd.png)

<br>

As always, below are a few highlights (for personal inventory), with a moderate attempt at coherence:

**🤖 If you see a 👾, it means I found something particularly cool or learned something new.**
**🤖 If you see a ⭐️, it means the idea is somehow related to our cool research at [NULLSTAR](https://www.nullstar.games/).**
**🤖 If you see a ✨, it means things that are so cool that they need a lil glitter around them.**
**🤖 If you see a ☀️, it means it's just a fun easter egg (because life's short; [we must dance](https://www.youtube.com/watch?v=VbD_kBJc_gI)).**
**🤖 If these notes look interesting to you, it's your ✦moral duty✦ to read the original books.**

<br>

----

## 🌠 VOLUME 1️⃣; CHAPTER 1️⃣ and 2️⃣; BASIC CONCEPTS

<br>

### Induction; Deduction; Logic

<br>

☀️ *(note to self that should never be shared publicly: I wish he had used some version of assembly, but I get it — the whole portability and generalization thing.)*

<br>

> 👾 *Mathematical Induction → Let `P(n)` be some statement about the integer `n`; for example, `P(n)` might be “`n` times `(n + 3)` is an even number," or "if `n ≥ 10`, then `2^n > n^31`” . Suppose we want to prove that `P(n)` is true for all positive integers `n`. An important way to do this is: 1) Give a proof that `P(1)` is true; 2) Give a proof that "if all o f `P(1), P(2),…, P(n)` are true, then `P(n + 1)` is also true"; this proof should be valid for any positive integer `n` → algorithmic proof procedure.*

<br>

> 👾 *The concept of mathematical induction should be distinguished from what is usually called inductive reasoning in science. A scientist takes specific observations and creates, by "induction," a general theory or hypothesis that accounts for these facts. Induction is no more than our best guess about the situation; mathematicians would call it an empirical result or a conjecture.*

<br>

![](/blog/assets/knuth8.png)

<br>

---

### Routines; Subroutines; Co-routines

<br>

* Transfer of control between subroutines and main programs is called subroutine linkage → no subroutine may call on any other subroutine that is (directly or indirectly) calling on it.

* Subroutines are special cases of more general program components, called co-routines. In contrast to the unsymmetric relationship between a main routine and a subroutine, there is complete symmetry between coroutines, which call on each other.

* A computer memory is often classified as a “random access memory,” like MIX’s main memory; or as a “read-only memory,” which is supposed to contain essentially constant information; or a “secondary bulk memory,” like MIX’s disk units, which cannot be accessed at high speed although large quantities of information can be stored; or an “associative memory,” more properly called a “content-addressed memory,” for which information is addressed by its value rather than by its location; and so on. The intended function of each kind of memory is so important that it enters into the name of the particular memory type; all of these devices are “memory” units, but the purposes to which they are put profoundly influence their design and their cost.

<br>

---

### Data Structures

<br>

* The process of entering and leaving subroutines during the execution of a computer program has a stack-like behavior. Stacks are particularly useful for the processing of languages with a nested structure, like programming languages, arithmetic expressions, and the literary German “Schachtelsätze.” 

* Topological sorting → important process needed in connection with network problems, with so-called PERT charts, and even with linguistics; in fact, it is of potential use whenever we have a problem involving a partial ordering. A partial ordering of a set `S` is a relation between the objects of `S`, which we may denote by the symbol `“⪯”`, satisfying the following properties for any objects `x`, `y`, and `z` (not necessarily distinct) in `S`:

```🐝
i) If x ⪯ y and y ⪯ z, then x ⪯ z. (Transitivity.)
ii) If x ⪯ y and y ⪯ x, then x = y. (Antisymmetry.)
iii) x ⪯ x. (Reflexivity.)
```

<br>

* Discrete simulation program → the simulation of a system in which all changes in the state of the system may be assumed to happen at certain discrete instants of time. The “system” being simulated is usually a set of individual activities that are largely independent although they interact with each other. In a discrete simulation, we proceed by doing whatever is to be done at a certain instant of simulated time, then advance the simulated clock to the next time when some action is scheduled to occur.

<br>

![](/blog/assets/knuth1.png)

<br>

![](/blog/assets/knuth2.png)

<br>

* There is very little distinction between abstract forests and trees. If we delete the root of a tree, we have a forest; conversely, if we add just one node to any forest and regard the trees of the forest as subtrees of the new node, we get a tree.

* Let us define a binary tree as a finite set of nodes that either is empty, or consists of a root and the elements of two disjoint binary trees called the left and right subtrees of the root. This recursive definition of binary tree should be studied carefully. Notice that a binary tree is not a special case of a tree; it is another concept entirely (although we will see many relations between the two concepts).

* 👾 A free tree or “unrooted tree” is defined to be a connected graph with no cycles.

* An electrical engineer may prefer to call a “tree” what we call “free tree”. If we were to follow the terminology of some authors on graph theory, we would have to say “finite labeled rooted ordered tree” instead of just “tree,” and “topological bifurcating arborescence” instead of “binary tree”!

<br>

> 👾 *The “infinity lemma” → Every infinite oriented tree in which every vertex has finite degree has an infinite path to the root, that is, an infinite sequence of vertices `V0, V1, V2,…` in which `V0` is the root and `fin(e[Vj+1]) = Vj` for all `j ≥ 0`.*

<br>

* The concept of the “path length” of a tree is of great importance in the analysis of algorithms, since this quantity is often directly related to the execution time. Our primary concern is with binary trees, since they are so close to actual computer representations.

* How much structural information ought to be explicitly recorded in memory?

* Linking automata can easily simulate graph machines, taking at most a bounded number of steps per graph step. Conversely, however, it is unlikely that graph machines can simulate arbitrary linking automata without unboundedly increasing the running time, unless the definition is changed from undirected to directed graphs, in view of the restriction to vertices of bounded degree.

<br>

----

## 🌠 VOLUME 2️⃣; CHAPTER 3️⃣; RANDOM NUMBERS

<br>

### Random Numbers

<br>

> *Numbers that are “chosen at random” are useful in many different kinds of applications: simulation, sampling, numerical analysis, computer programming, decision making, cryptography, aesthetic, and recreation.*

<br>

> *It is conceivable that someday somebody will invent a random number generator that produces one of these other random quantities directly, instead of getting it indirectly via the uniform distribution. But no direct methods have as yet proved to be practical, except for the “random bit”...*

<br>

> *D. H. Lehmer (1951): “A random sequence is a vague notion embodying the idea of a sequence in which each term is unpredictable to the uninitiated and whose digits pass a certain number of tests, traditional with statisticians and depending somewhat on the uses to which the sequence is to be put.”*

<br>

> *J. N. Franklin (1962): “A sequence is random if it has every property that is shared by all infinite sequences of independent samples of random variables from the uniform distribution.”*

<br>

![](/blog/assets/knuth3.png)

<br>

* Consider methods for generating a sequence of random fractions—random real numbers `Un`, uniformly distributed between zero and one. Since a computer can represent a real number with only finite accuracy, we shall actually be generating integers `Xn` between zero and some number `m`; the fraction `Un = Xn/m` will then lie between zero and one. Usually `m` is the word size of the computer, so `Xn` may be regarded (conservatively) as the integer contents of a computer word with the radix point assumed at the extreme right, andUn maybe regarded (liberally) as the contents of the same word with the radix point assumed at the extreme left.

* Linear congruential sequence → by far the most popular random number generators in use today are special cases of the following scheme → We choose four magic integers: `m`, the modulus; `0 < m`, `a`, the multiplier; `0 ≤ a < m`, `c`, the increment; `0 ≤ c < m`, `X0`, the starting value; `0 ≤ X0 < m`. The desired sequence of random numbers `⟨Xn⟩` is then obtained by setting:

```🐝
Xn+1 = (aXn + c) mod m, n ≥ 0
```

<br>

With the following rules:

```🐝
1. The seed (X_0) must be chosen arbitrarily.
2. The number (m) should be large, at least (2^{30}).
3. If (m) is a power of 2 (i.e., if using a binary computer), choose (a) so that (a \bmod 8 = 5).
4. The multiplier (a) should be chosen between (0.01m) and (0.99m), and its binary or decimal digits should not have a simple, regular pattern.
5. (c) must have no factor in common with (m).
6. It’s best to think of (X) as a random fraction (X/m) between 0 and 1.
7. The accuracy in (t) dimensions will be only about one part in (\sqrt[t]{m}).
8. At most about (m/1000) numbers should be generated; otherwise, the future will behave more like the past.
```

<br>

* The most prudent policy for a person to follow is to run each Monte Carlo program at least twice using quite different sources of random numbers, before taking the answers of the program seriously; this will not only give an indication of the stability of the results, it also will guard against the danger of trusting in a generator with hidden deficiencies.

* “Mathematicians consider the decimal expansion of `π` a random series, but to a modern numerologist it is rich with remarkable patterns.” Dr. Matrix has pointed out, for example, that the first repeated two-digit number in `π`’s expansion is `26`, and its second appearance comes in the middle of a curious repetition pattern: `3.14159265358979323846264338327950`. After listing a dozen or so further properties of these digits, he observed that `π`, when correctly interpreted, conveys the entire history of the human race!

* The chi-square test (`χ2` test) is perhaps the best known of all statistical tests, and it is a basic method that is used in connection with many other tests. The distribution is an approximation that is valid only for large enough values of `n`.

<br>

> *The Kolmogorov–Smirnov test → the chi-square test applies to the situation when observations can fall into a finite number of categories. It is not unusual, however, to consider random quantities that range over infinitely many values, such as a random fraction (a random real number between `0` and `1`). Even though only finitely many real numbers can be represented in a computer, we want our random values to behave essentially as if all real numbers in `[0..1)` were equally likely. A general notation for specifying probability distributions, whether they are finite or infinite, is commonly used in the study of probability and statistics. Suppose we want to specify the distribution of the values of a random quantity, `X`; we do this in terms of the distribution function `F(x)`, where `F(x) = Pr(X ≤x) =` probability that `(X ≤ x)`. If we make n independent observations of the random quantity `X`, thereby obtaining the values `X1, X2,..., Xn`, we can form the empirical distribution function `Fn(x)`, where number of `X1,X2,...,Xn that are ≤x Fn(x) = n`. The Kolmogorov–Smirnov test (KS test) may be used when `F(x)` has no jumps. It is based on the difference between `F(x)` and `Fn(x)`. A bad source of random numbers will give empirical distribution functions that do not approximate `F(x)` sufficiently well.*

<br>

* An important difference between the KS test and the chi-square test is that the KS test applies to distributions `F(x)` having no jumps, while the chi-square test applies to distributions having nothing but jumps (since all observations are divided into `k` categories).

<br>

> ☀️ *More generally, we want pairs of successive numbers to be uniformly distributed in an independent manner. The sun comes up just about as often as it goes down, in the long run, but that doesn’t make its motion random.*

<br>

* Theoretical tests for randomness (summarized by robot CG, “If these numbers were truly independent and uniformly distributed, would I see this particular pattern this often?”):

```🐝
1. Equidistribution test — checks whether generated values occur with approximately equal frequency across the possible outcomes.
2. Serial test — checks whether successive pairs/tuples of values are uniformly distributed, detecting dependence between neighboring values.
3. Gap test — examines the lengths of gaps between occurrences of values in a specified interval.
4. Poker test — groups values into fixed-size sets and checks whether the resulting patterns occur with the expected frequencies.
5. Coupon collector’s test — measures how many observations are needed to collect all possible categories, looking for deviations from the expected collection time.
6. Permutation test — checks whether the relative ordering of successive values produces each possible permutation with the expected frequency.
7. Run test — examines consecutive increasing/decreasing runs to detect patterns inconsistent with randomness.
8. Maximum-of-t test — divides observations into blocks and studies the distribution of each block’s maximum.
9. Collision test — looks for repeated values (“collisions”) and compares their frequency with the probability expected under independent random sampling.
10. Spectral test — primarily for linear congruential generators, examines the lattice structure of generated points to detect hidden regularities.
```

<br>

* A sequence is said to be `∞`-distributed if it is `k`-distributed for all positive integers `k`.

* A truly random sequence will exhibit local non-randomness.

* Does `∞`-distributed = random? A `[0..1)` sequence is defined to be “random” if it is an `∞`-distributed sequence.

<br>


---

### TO BE CONTINUED... 😄

<br>

### ⬛️