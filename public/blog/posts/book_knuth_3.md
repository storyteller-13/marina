---
title: 📚 BOOK → TAOCP - Part 3️⃣ (Donald E. Knuth, 1997)
subtitle: Rating: 10/10 | Audience: Beginner to Advanced Computer Scientists | Today's Word: Flourishing
date: 2026; 8; 26
---

> [🎶](https://www.youtube.com/watch?v=4yVheY2WBgM) *"There is nothing more difficult to take in hand, more perilous to conduct, or more uncertain in its success, than to take the lead in the introduction of a new order of things."* — Niccolo Machiavelli (1513)

> [🎵](https://www.youtube.com/watch?v=UQh-vGjuocM) *"But if the optimal route looks too quiet, the solution is not to avoid it. The solution is to stand firm, knowing that you're doing the right thing, and eventually the results will speak for themselves."* — Paul Graham

> [🎼](https://www.youtube.com/watch?v=QO1uJdA73ts) *"They that weave networks shall be confounded."* — Isaiah 19:9

> [🎹](https://www.youtube.com/watch?v=_9jaJtmraXA) *"Then, as in the case of an archer, there must be some end at which we aim, and we shall be more likely to hit the mark if we have a target.”* — Aristotle’s  Nicomachean Ethics


<br>

![](/blog/assets/magritte.webp)

<br>

In this third post, I continue the *brain-gymnastics* I began in [**Part 1️⃣**](https://marina.nullstar.fun/pages/post.html?post=book_knuth) and in [**Part 2️⃣**](https://marina.nullstar.fun/pages/post.html?post=book_knuth_2), all within this [**luminal spacetime of ours**](https://www.youtube.com/watch?v=DqjWFZN82_A). Today we go through the entire **Sorting** chapter, and I must say, this might be one of my favorites. Call me a *weirdo*, but there is a **[sublime](https://www.youtube.com/watch?v=G5BIhjXCJOY)** pleasure in trying *to optimize the order of a set of things*. Every algorithm traces a different **[pathway](https://www.youtube.com/watch?v=CXKGNFVse30)** through the brain, a series of braidings (or multidimensions?) that makes it itch in a **[peculiar](https://www.youtube.com/watch?v=2f9bBlGOuX4)** way.

Speaking of **[funny, pleasant](https://blog.archive.org/2026/08/16/vintage-artificial-intelligence-before-it-got-awkward/)** ways the brain can be itched, it’s story time.

Back in c. 2014, when I was in the **[last year of my PhD](https://www.astro.sunysb.edu/steinkirch/)**, I was running a lot of **[Monte Carlo simulations](https://www.astro.sunysb.edu/steinkirch/reviews/first_results.pdf)** and **[calculations](https://github.com/future-ai-org/astrophysics-mfits-py)** with **[Los Alamos Laboratory](https://www.lanl.gov/)** to find **[the correct form](https://www.astro.sunysb.edu/steinkirch/figures/opacities_LANL.png)** for the **[equation of state](https://www.astro.sunysb.edu/steinkirch/reviews/xrays.pdf)** of **[neutron stars](https://iopscience.iop.org/article/10.3847/0004-637X/832/2/102)** through the **[observation](https://science.nasa.gov/asset/webb/life-cycles-of-sun-like-and-massive-stars/)** of **[X-ray bursters](https://www.astro.sunysb.edu/steinkirch/reviews/xrb_review.pdf)**. During those years of astrophysics, I was writing a lot of code in [**IDL**](https://github.com/future-ai-org/interstellar-idl/blob/master/src/calibration.pro), **[MATLAB](https://github.com/future-ai-org/robotics-matlab/blob/master/gradient/code/README_and_RESULTS.txt)**, and [**C**](https://github.com/future-ai-org/solar/blob/master/src/DataRedux.C)/C++. But I was getting really hooked on Python. At that time, it felt like the most superior language (sorry, [**Ruby**](https://github.com/cypherpunk-symposium/csrf-apache-modsecurity-rb) crew...). 

Since I didn’t have a traditional computer science background, I decided it was the moment for me to work through the traditional classical algorithms exercises, and since there were **[barely](https://www.andrew.cmu.edu/user/ramesh/teaching/course/48784.pdf)** any of them published in Python, that was the perfect excuse to create and open-source something unique. I started working through all the exercises in [**Cracking the Coding Interview**](https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850) and [**Algorithms by Skiena**](https://www.amazon.com/Algorithm-Design-Manual-Steven-Skiena/dp/1849967202?tag=ustxtaddt-20), and at the same time, because I love **[writing](https://www.youtube.com/watch?v=2chNuUpC8_Y)** things down to organize my thoughts (and I used to love writing things in **[LaTeX](https://www.latex-project.org/)** as well), I started creating a **[book on Python, algorithms, and data structures](https://github.com/future-ai-org/master-algorithms-py)**. The book was open, and the repository got **[over 600 stars at the time](https://github.com/future-ai-org/master-algorithms-py/blob/master/book_pdf/assets/600_stars.png)** (later, I lost all the stars and forks when I made the repository **[private](https://youtu.be/1Fp6ibfOQ4Y?t=2699)**).

 A year or so later, I received an email from a **[Korean publisher asking whether they could publish my book](https://www.hanbit.co.kr/books/%ED%8C%8C%EC%9D%B4%EC%8D%AC-%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0%EC%99%80-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EA%B8%B0%EC%B4%88-%ED%8A%BC%ED%8A%BC-%ED%95%B5%EC%8B%AC-%EC%8F%99%EC%8F%99-%EC%8B%A4%EB%A0%A5-%EC%91%A5%EC%91%A5?code=B8465804191)**. They would give me a small sum of money, plus two hard copies. Well, I told them, *“But the book is **[free](https://www.youtube.com/watch?v=Y9lSq6bM9C8&t=2s)** already,”* and they go, *“But it’s not in Korean.”* That’s the story of **[the publication of my first book](https://github.com/future-ai-org/master-algorithms-py/commits/master/?after=9fb230309aec59a1b35df7e2171af3d1044104b8+769)** (and the easter egg in this tale is that the book’s theme is **[Buffy the Vampire Slayer](https://en.wikipedia.org/wiki/Buffy_the_Vampire_Slayer)** — which they kept entirely in the publication!). 

<br>

![](/blog/assets/buffy2.png)

<br>

Why am I telling this story? 

Ah, yes. That was the first time in my life when I actually tried to implement *almost* every type of sorting algorithm imaginable, and when I learned I had to love **[merge sort](https://en.wikipedia.org/wiki/Merge_sort)** and disapprove of **[bubble sort](https://en.wikipedia.org/wiki/Bubble_sort)**. Now, more than a decade later, as I return to these problems under the voice of **[the Master](https://en.wikipedia.org/wiki/Donald_Knuth)**, and one day before a final **[eclipse](https://marina.nullstar.fun/images/eclipse_26_08_27.png)** **[cycle](https://apod.nasa.gov/apod/ap260825.html)** in my **[2nd house](https://choices.vonsteinkirch.com/choices/choose-your-adventure/astrology/usd/undefined-1/eclipses)**, I feel a beautiful sense of having come **[full circle](https://en.wikipedia.org/wiki/Ouroboros)**. 

<br>

![](/blog/assets/knuth_infinite.png)

<br>

A deep sense of worthiness. I think I made it. I think I became the amazing computer scientist I always dreamed I would be when I **[grew up](https://www.youtube.com/watch?v=eKLeBGHAUGw)**. And I am so very excited to live the best (and final) part of my life, where I get to build the most interesting project yet of this (ephemeral) existence: my (still-**[stealth](https://www.youtube.com/watch?v=E9NlRJaBIR4)**) **[NULLSTAR](https://nullstar.games)**.

<br>

![](/blog/assets/br.png)

<br>

As always, below are a few highlights (for personal inventory), with a moderate attempt at coherence:

**🤖 If you see a 👾, it means I found something particularly cool or learned something new.**
**🤖 If you see a ⭐️, it means the idea is somehow related to our cool research at [NULLSTAR](https://nullstar.games/).**
**🤖 If you see a ✨, it means things that are so cool that they need a lil glitter around them.**
**🤖 If you see a ☀️, it means it's just a fun easter egg (because life's short; [we must dance](https://www.youtube.com/watch?v=VbD_kBJc_gI)).**
**🤖 If these notes look interesting to you, it's your ✦moral duty✦ to read the original books.**

<br>

----

## VOLUME 3️⃣; CHAPTER 5️⃣; SORTING

<br>

> ✨ *Although dictionaries of the English language define “sorting” as the process of separating or arranging things according to class or kind, computer programmers traditionally use the word in the much more special sense of marshaling things into ascending or descending order. The process should perhaps be called ordering, not sorting; but anyone who tries to call it “ordering” is soon led into confusion because of the many different meanings attached to that word. Mathematical terminology abounds with still more senses of order (the order of a group, the order of a permutation, the order of a branch point, relations of order, etc., etc.). Thus we find that the word “order” can lead to chaos.* ✨

<br>

* From a broader perspective we will find also that sorting algorithms make a valuable case study of how to attack computer programming problems in general.

<br>

> ✨*The goal of sorting is to determine a permutation `p(1)p(2) ... p(N)` of the indices `{1, 2, ..., N}` that will put the keys into nondecreasing order: `Kp(1) ≤ Kp(2) ≤ ··· ≤ Kp(N)`.* ✨

<br>

* Stable sorting has the additional property that `p(i) < p(j)` whenever `Kp(i) = Kp(j)` and `i < j`.

* Sorting can be classified generally into internal sorting, in which the records are kept entirely in the computer’s high-speed random-access memory, and external sorting, when more records are present than can be held comfortably in memory at once.

* The time required to sort `N` records, using a decent general-purpose sorting algorithm, is roughly proportional to `N log N`; we make about `log N` “passes” over the data. This is the minimum possible time. If the keys are known to be randomly distributed with respect to some continuous numerical distribution, we will see that sorting can be accomplished in `O(N)` steps on the average.

<br>

![](/blog/assets/knuth9.png)

<br>

---

### COMBINATORIAL PROPERTIES OF PERMUTATIONS

<br>

> *A permutation of a finite set is an arrangement of its elements into a row. Permutations are of special importance in the study of sorting algorithms, since they represent the unsorted input data. In order to study the efficiency of different sorting methods, we will want to be able to count the number of permutations that cause a certain step of a sorting procedure to be executed a certain number of times.*

<br>

> *Let `a1 a2 … an` be a permutation of the set `{1, 2, …, n}`. If `i < j` and `ai > aj`, the pair `(ai, aj)` is called an inversion of the permutation; for example, the permutation `3 1 4 2` has three inversions: `(3, 1)`, `(3, 2)`, and `(4, 2)`. Each inversion is a pair of elements that is out of sort, so the only permutation with no inversions is the sorted permutation `12 ... n`.*

<br> 

* How many permutations of `{1, 2, ..., n}` are possible? The answer must be the number of possible inversion tables, and they are easily enumerated since there are `n` choices for `b1`, independently `n − 1` choices for `b2, ...`, `1` choice for `bn`, making n`(n − 1) ... 1 = n!` choices in all.

* The inversion table `b1 b2 ... bn` of the permutation `a1 a2 ... an` is obtained by letting `bj` be the number of elements to the left of `j` that are greater than `j`. An inversion table uniquely determines the corresponding permutation. 

* Hence the number of inversions of a permutation `π` is the length of a downward path from `1234` to `π`; all such paths must have the same length.

* The inverse of a permutation has exactly as many inversions as the permutation itself.

* The analysis of several sorting algorithms involves the knowledge of how many permutations of `n` elements have exactly `k` inversions.

* A multiset is like a set except that it can have repetitions of identical elements. 

<br>

> ✨👾 *The number of permutations of a set has been known for more than 1500 years. The Hebrew Book of Creation (c.A.D.400), which was the earliest literary product of Jewish philosophical mysticism, gives the correct values of the first seven factorials, after which it says “Go on and compute what the mouth cannot express and the ear cannot hear.” (**[Sefer Yetzirah](https://choices.vonsteinkirch.com/choices/choose-your-adventure/alchemy/the-usdchoice-of-alchemy/undefined-7/by-moses-c.-1400-bce-1/by-moses-c.-1400-bce?q=)**). This is one of the first two known enumerations of permutations in history.* 👾✨

<br>


* The intercalation product `α ⊺ β` of two multiset permutations `α` and `β` is obtained by (a) expressing `α` and `β` in the two-line notation, (b) juxtaposing these two-line representations, and (c) sorting the columns into nondecreasing order of the top line. The sorting is supposed to be stable, in the sense that left-to-right order of elements in the bottom line is preserved when the corresponding top line elements are equal. 

<br>

![](/blog/assets/knuth10.png)

<br>

> *Theorem: Let the elements of the multiset `M` be linearly ordered by the relation `“<”`. Every permutation `π` of `M` has a unique representation as the intercalation `π = (x11 … x1 n1 y1) (x21 … x2 n2 y2) ... (xt1 … xtn tyt)`, `t ≥ 0`, where the following two conditions are satisfied: `y1 ≤ y2 ≤ ... ≤ yt` and `yi < xij` for `1 ≤ j ≤ ni`, `1 ≤ i ≤ t`.*

<br>

* A permutation is prime if and only if it is a cycle with no repeated elements. A nonprime permutation can be factored into smaller and smaller pieces until it has been expressed as a product of primes. 

<br>

![](/blog/assets/knuth11.png)

<br>

* If we place a vertical line at both ends of a permutation `a1 a2 ... an` and also between `aj` and `aj + 1` whenever `aj > aj + 1`, the runs are the segments between pairs of lines. For example, the permutation `|3 5 7 |1 6 8 9 |4 |2 |` has four runs.

<br>

![](/blog/assets/eulerian.png)

<br>

* A Young tableau of shape `(n1, n2, ..., nm)`, where `n1 ≥ n2 ≥ ... ≥ nm > 0`, is an arrangement of `n1 + n2 + ... + nm` distinct integers in an array of left-justified rows, with `ni` elements in row `i`, such that the entries of each row are in increasing order from left to right, and the entries of each column are increasing from top to bottom.

* An involution is a permutation that is its own inverse. The number of involutions of `{1, 2, ..., n}` is the same as the number of tableaux that can be formed from the elements `{1, 2, ..., n}`.

<br>

> *Algorithm (Insertion into a tableau) → Let `P = (Pij)` be a tableau of positive integers, and let `x` be a positive integer not in `P`. This algorithm transforms `P` into another tableau that contains `x` in addition to its original elements. The new tableau has the same shape as the old, except for the addition of a new position in row `s`, column `t`, where `s` and `t` are quantities determined by the algorithm.*

<br>

> *Algorithm (Deletion from a tableau) → Given a tableau `P` and positive integers `s`, `t`, this algorithm transforms `P` into another tableau, having almost the same shape, but with `∞` in column `t` of row `s`. An element `x`, determined by the algorithm, is deleted from `P`.*

<br>

> *Theorem → There is a one-to-one correspondence between the set of all permutations of `{1, 2, ..., n}` and the set of ordered pairs `(P, Q)` of tableaux formed from `{1, 2, ..., n}`, where `P` and `Q` have the same shape.*

<br>

![](/blog/assets/knuth_witchcraft.png)

<br>

> ✨ *In particular, this theorem establishes two surprising facts about the tableau insertion algorithm: If successive insertion of distinct elements `p1, ..., pn` into an empty tableau yields tableau `P`, insertion in the opposite order `pn, ..., p1` yields the transposed tableau `P^T`. And if we not only insert the `p`’s in this order `pn, ..., p1` but also interchange the roles of `<` and `>`, as well as `0` and `∞`, in the insertion process, we obtain the dual tableau `P^S` → The unusual nature of these coincidences might lead us to suspect that some sort of witchcraft is operating behind the scenes! No simple explanation for these phenomena is yet known.* ✨

<br>

* The hook corresponding to a cell in a tableau is defined to be the cell itself plus the cells lying below and to its right.

<br>

> *Theorem: the number of tableaux on `{1, 2, ..., n}` having a specified shape is `n!` divided by the product of the hook lengths (and so this is the number of binary trees) → The number of permutations `a1 a2 ... an` of `{1, 2, ..., n}` containing no decreasing subsequence `ai > aj > ak` for `i < j < k` is the number of binary trees with `n` nodes.*

<br>

* Binary trees with `n` nodes correspond to permutations that can be obtained with a stack, and that such permutations correspond to sequences `a1 a2 ... a_{2n}` of `n` `S`’s and `n` `X`’s, where the number of `S`’s is never less than the number of `X`’s as we read from left to right.

<br>

![](/blog/assets/steinkirch_tableau.png)

<br>

> ☀️ Another fun story ⬆️ → I spent a lot of time playing with Young tableaux during my PhD in Theoretical Physics, when I was studying group theory representations in the context of quantum field theory — and I ended up writing a couple of other books: [**Group Theory for Physicists**](https://www.astro.sunysb.edu/steinkirch/books/group.pdf) (which was even [**a little successful**](https://gist.github.com/von-steinkirch/dbe61fee2861184489a648b719e57fd1) at the time) and [**Quantum Field Theory**](https://www.astro.sunysb.edu/steinkirch/books/qft.pdf). I’m pretty proud of how I explain the theory, so if you’re interested in these subjects, I invite you to read the chapter.

<br>

----

### INTERNAL SORTING

<br>

![](/blog/assets/knuth_is_the_king.png)

<br>

![](/blog/assets/knuth_bubble.png)

<br>

![](/blog/assets/knuth_heap.png)

<br>

![](/blog/assets/knuth_merge.png)

<br>

![](/blog/assets/knuth_quick.png)

<br>

----

### OPTIMAL SORTING

<br>

* Let `T(G)` be the number of permutations consistent with `G`, that is, the number of ways to assign the integers `{1, 2, ... , n}` to the vertices of `G` so that the number on vertex `x` is less than the number on vertex `y` whenever `x → y` in `G` → the efficiency of `G` is `E(G) = {n!}{2^k T(G)}`.

<br>

>  👾 *Theorem → Zero-one principle → If a network with `n` input lines sorts all `2n` sequences of `0`s and `1`s into nondecreasing order, it will sort any arbitrary sequence of `n` numbers into nondecreasing order.*

<br>

![](/blog/assets/knuth_graph_eff.png)

<br>

----

###  EXTERNAL SORTING

<br>

> *Time for us to study the interesting problems that arise when the number of records to be sorted is larger than our computer can hold in its high-speed internal memory.*

<br>


* 👾 Algorithm (Polyphase merge sorting with “horizontal” distribution) → This algorithm takes initial runs and disperses them to tapes, one run at a time, until the supply of initial runs is exhausted. Then it specifies how the tapes are to be merged, assuming that there are `T = P + 1 ≥ 3` available tape units, using P-way merging. Tape `T` may be used to hold the input, since it does not receive any initial runs. The following tables are maintained:

```🐝
A[j], 1 ≤ j ≤ T
	→ The perfect Fibonacci distribution we are striving for

D[j], 1 ≤ j ≤ T
	→ Number of dummy runs assumed to be present at the beginning of logical tape unit #j
```

<br>

* Algorithm (Cascade merge sorting with special distribution) → This algorithm takes initial runs and disperses them to tapes, one run at a time, until the supply of initial runs is exhausted. Then it specifies how the tapes are to be merged, assuming that there are `T ≥ 3` available tape units, using at most `(T − 1)`-way merging and avoiding unnecessary one-way merging. Tape `T` may be used to hold the input, since it does not receive any initial runs. The following tables are maintained:

```🐝
A[j], 1 ≤ j ≤ T: The perfect cascade distribution we have most recently reached

AA[j], 1 ≤ j ≤ T: The perfect cascade distribution we are striving for

D[j], 1 ≤ j ≤ T: Number of dummy runs assumed to be present on logical tape unit number j

M[j], 1 ≤ j < T: Maximum number of dummy runs desired on logical tape unit number j

TAPE[j], 1 ≤ j ≤ T: Number of the physical tape unit corresponding to logical tape unit number j
```

<br>

* The following brief survey gives the highlights of the most significant algorithms we have encountered for internal sorting. As usual, `N` stands for the number of records in the given file:

```🐝
1. Distribution counting 
    → is very useful when the keys have a small range
    → It is stable (doesn’t affect the order of records with equal keys)
    → but requires memory space for counters and for 2N records

2. Straight insertion 
    → is the simplest method to program, requires no extra space
    → and is quite efficient for small N (say N ≤25)
    → For large N it is unbearably slow unless the input is nearly in order

3. Shellsort 
    → is also quite easy to program, and uses minimum memory space
    → and it is reasonably efficient for moderately large N (say N ≤ 1000)

4. List insertion 
    → uses the same basic idea as straight insertion, so it is suitable only for small N
    → Like the other list sorting methods described below, it saves the cost of moving long records by manipulating links
    → this is particularly advantageous when the records have variable length or are part of other data structures

5. Address calculation techniques 
    → efficient when the keys have a known (usually uniform) distribution
    → the principal variants of this approach are multiple list insertion, and MacLaren’s combined radix-insertion method

6. Merge exchange 
    → Useful when a large number of comparisons can be made simultaneously

7. Quicksort 
    → probably the most useful general-purpose technique for internal sorting
    → Requires very little memory space
    → Its average running time on most computers beats that of its competitors
    → It can run very slowly in its worst case, however
    → so a careful choice of the partitioning elements should be made whenever nonrandom data are likely

8. Straight selection 
    → a simpl method
    → especially suitable when special hardware is available to find the smallest element of a list rapidly

9. Heapsort 
    → requires minimum memory and is guaranteed to run pretty fast
    → its average time and its maximum time are both roughly twice the average running time of quicksort

10. List merging 
    → is a list sort that, like heapsort, is guaranteed to be rather fast even in its worst case;
    → moreover, it is stable with respect to equal keys

11. Radix sorting 
    → List sort especially appropriate for keys that are either rather short
    → or that have an unusual lexicographic collating sequence.

12. Merge insertion 
    → is especially suitable for very small values of N, in a “straight-line-coded” routine
    → it would be the appropriate method in an application that requires the sorting of numerous five- or six-record groups

13. Hybrid methods 
    → combining one or more of the techniques above, are also possible
```

<br>

---

### TO BE CONTINUED (UNTIL THEN, HAVE YOURSELF A SAFE ECLIPSE)... ☀️🌙

##### (Talking about [**nostalgia**](https://archive.org/details/msdos_Racter_1984), part 2️⃣ — here’s a picture of me during my Astrophysics PhD student years, living on Long Island, NY. Those were cold winters, but I loved the snow. One of my favorite hobbies was going for a nice hike right after a storm, when the snow was all fluffy and fun. I have very tender **[memories](https://www.youtube.com/watch?v=5aCegKCsd7I)** of those years, despite all the work of graduate school and living on a graduate student scholarship. By the way, you can clearly see that I was into [**progressive rock**](https://web.archive.org/web/20090621102022/http://www.last.fm/user/steinkirch), the definition of the infinite, and [**looking exactly like Buffy**](https://www.imdb.com/title/tt11286314/mediaviewer/rm253881601/) — circa 2012.)


<br>

![](/blog/assets/buffy.png)

<br>

### ⬛️