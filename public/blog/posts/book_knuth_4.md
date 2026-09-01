---
title: 📚 BOOK → TAOCP - Part 4️⃣ (Donald E. Knuth, 2019)
subtitle: Rating: 10/10 | Audience: Beginner to Advanced Computer Scientists | Today's Word: Inexorable
date: 2026; 08; 27
---

Here are three cool quotes from this chapter:

> [🎶](https://www.youtube.com/watch?v=FQpuSV9AHQ4) *"Seek and you shall find."* — Matthew 7:7

> [🎼](https://www.youtube.com/watch?v=h9CqJTsT2Ms) *"Attempt the end, and never stand to doubt; Nothing’s so hard, but search will find it out."* — Robert Herrick (1648)

> [🌳](https://www.youtube.com/watch?v=hnFlDk5n34Q) *"Why don’t you pair ’em up in threes?"* — attributed to Yogi Berra (c. 1970)

<br>

And one cool quote from my studies this week:

> [🎵](https://www.youtube.com/watch?v=yUXwdnOJ_z0) *"You can't connect the dots looking forward; you can only connect them looking backwards."* — **[Steve Jobs (2005)](https://www.youtube.com/watch?v=jiHZqamCD8c)** 

<br>

![](/blog/assets/klee.webp)

<br>

In this third post, I continue the *brain-marathon* I began in [**Part 1️⃣**](https://marina.nullstar.fun/pages/post.html?post=book_knuth), [**Part 2️⃣**](https://marina.nullstar.fun/pages/post.html?post=book_knuth_2), and [**Part 3️⃣**](https://marina.nullstar.fun/pages/post.html?post=book_knuth_3), savoring [**our luminal reality**](https://www.youtube.com/watch?v=dtW-AFYpH_A).

Today, we **[dive](https://blog.trailofbits.com/2026/08/26/vms-wont-contain-cyber-capable-agents/)** into the **Searching** chapter. If you think of 💕 binary search 💕 when someone says "search", you’re like me — it's **[nice](https://pollen-robotics.com/microduck/)** and binaryly **[pretty](https://apod.nasa.gov/apod/ap260820.html)**. This time, though, I learned there’s much more **[color](https://apod.nasa.gov/apod/ap260827.html)** to it. And, funny enough, I learned this through the zodiacs on a **[tree](https://www.youtube.com/watch?v=DAzVVp9lmis)**. Read on if you want to understand what I mean!

<br>

As always, below are a few highlights (for personal inventory), with a moderate attempt at coherence:

**🤖 If you see a 👾, it means I found something particularly cool or learned something new.**
**🤖 If you see a ✨, it means things that are so cool that they need a lil glitter around them.**
**🤖 If you see a ☀️, it means it's just a fun easter egg (because life's short; [we must dance](https://www.youtube.com/watch?v=VbD_kBJc_gI)).**
**🤖 If these notes look interesting to you, it's your ✦moral duty✦ to read the original books.**

<br>

----

## VOLUME 3️⃣; CHAPTER 6️⃣; SEARCHING

<br>

### SEQUENTIAL SEARCHING

<br>

> *“Begin at the beginning, and go on till you find the right key; then stop.” This sequential procedure is the obvious way to search.*

<br>

> *Algorithm (Sequential search in ordered table) → Given a table of records `R_1, R_2, ..., R_N` whose keys are in increasing order `K_1 < K_2 < ... < K_N`, this algorithm searches for a given argument `K`. For convenience and speed, the algorithm assumes that there is a dummy record `R_{N + 1}` whose key value is `K_{N + 1} = ∞ > K`.*

```🐝
1. [Initialize.] Set i ← 1.

2. [Compare.] If K ≤ K_i, go to 4.

3. [Advance.] Increase i by 1 and return to 2.

4. [Equality?] If K = K_i, the algorithm terminates successfully. Otherwise it terminates unsuccessfully.
``` 

<br>

* Another approximation to realistic distributions is the “80-20” rule of thumb that has commonly been observed in commercial applications. This rule states that 80 percent of the transactions deal with the most active 20 percent of a file; and the same rule applies in fractal fashion to the top 20 percent, so that 64 percent of the transactions deal with the most active 4 percent, etc. 


<br>

---

### SEARCHING BY COMPARISON OF KEYS

<br>

> *In this section we shall discuss search methods that are based on a linear ordering of the keys, such as alphabetic order or numeric order.*

<br>

![](/blog/assets/knuth_bs.png)

<br>

> *Algorithm (Binary search) → Given a table of records `R_1,  R_2, ..., R_N` whose keys are in increasing order `K_1 < K_2 < ··· < K_N`, this algorithm searches for a given argument `K`.*

```🐝
1. [Initialize.] Set l ← 1, u ← N.

2. [Get midpoint.] At this point we know that if K is in the table, it satisfies K_l ≤ K ≤ K_u. 
    If u < l, the algorithm terminates unsuccessfully. 
    Otherwise, set i ← [(l + u) / 2], the approximate midpoint of the relevant table area.

3. [Compare.] If K < K_i, go to 4; if K > K_i, go to 5; and if K = K_i, the algorithm terminates successfully.

4. [Adjust u.] Set u ← i − 1 and return to 2.

5. [Adjust l.] Set l ← i + 1 and return to 2.
```

<br>

* Fibonacci numbers provide us with an alternative to binary search. The resulting method is preferable on some computers, because it involves only addition and subtraction, not division by 2.

<br>

![](/blog/assets/knuth_fib.png)

<br>

> 👾 *Algorithm (Fibonaccian search). Given a table of records `R_1, R_2, ..., R_N` whose keys are in increasing order `K_1 < K_2 < ··· < K_N`, this algorithm searches for a given argument `K`. For convenience in description, we assume that `N + 1` is a perfect Fibonacci number, `F_{k + 1}`.*

* It is not difficult to make the method work for arbitrary `N`, if a suitable initialization is provided:

```🐝
1. [Initialize.] Set i ← F_k, p ← F_k − 1, q ← F_k − 2. 
    (Throughout the algorithm, p and q will be consecutive Fibonacci numbers.)

2. [Compare.] If K < K_i, go to step 3; if K > K_i, go to 4; and if K = Ki, 
    the algorithm terminates successfully.

3. [Decrease i.] If q = 0, the algorithm terminates unsuccessfully. 
    Otherwise set i ← i − q, and set (p, q) ← (q, p − q); then return to 2.

4. [Increase i.] If p = 1, the algorithm terminates unsuccessfully. 
    Otherwise set i ← i + q, p ← p − q, then q ← q − p, and return to 2.
```

<br>

* Let `C`, `C1`, and `(C2 − S)` be the respective number of times steps 2, 3, and 4 are performed. Then we have:

```🐝
C = (ave ϕk/√5 + O(1), max k − 1)

C1 = (ave k/√5 + O(1), max k − 1)

C2 − S = (ave ϕ − 1k/√5 + O(1), max ⌊k/2⌋)

(left branch is taken about ϕ ≈ 1.618 times as often as the right branch)
```

<br>

> *Interpolation search → When we know that `K` lies between `K_l` and `K_u`, we can choose the next probe to be about `(K − K_l) / (K_u − K_l)` of the way between `l` and `u`, assuming that the keys are numeric and that they increase in a roughly constant manner throughout the interval.*

<br>

* Interpolation search is asymptotically superior to binary search. One step of binary search essentially reduces the amount of uncertainty from `n` to `1/2 n`, while one step of interpolation search essentially reduces it to `√n`, when the keys in the table are randomly distributed. Hence interpolation search takes about `lg lg N` steps, on the average, to reduce the uncertainty from `N` to `2`.

* However, computer simulation experiments show that interpolation search does not decrease the number of comparisons enough to compensate for the extra computing time involved, unless the table is rather large. Typical files aren’t sufficiently random, and the difference between `lg lg N` and `lg N` is not substantial unless `N` exceeds, say, `2^{16} = 65,536`. Interpolation is most successful in the early stages of searching a large possibly external file; after the range has been narrowed down, binary search finishes things off more quickly.

<br>

![](/blog/assets/knuth_bs2.png)

<br>

* Figure 10 shows a binary search tree containing the names of eleven signs of the zodiac. If we now search for the twelfth name, `SAGITTARIUS`, starting at the root or apex of the tree, we find it is greater than `CAPRICORN`, so we move to the right; it is greater than `PISCES`, so we move right again; it is less than `TAURUS,` so we move left; and it is less than `SCORPIO`, so we arrive at external node `8` . The search was unsuccessful; we can now insert `SAGITTARIUS` at the place the search ended, by linking it into the tree in place of the external node `8` . In this way the table can grow without the necessity of moving any of the existing records. Figure 10 was formed by starting with an empty tree and successively inserting the keys `CAPRICORN`, `AQUARIUS`, `PISCES`, `ARIES`, `TAURUS`, `GEMINI`, `CANCER`, `LEO`, `VIRGO`, `LIBRA`, `SCORPIO`, in this order. It follows that the keys appear in strict alphabetic sequence from left to right, `AQUARIUS`, `ARIES`, `CANCER`, `CAPRICORN`, `GEMINI`, `LEO`, ... , `VIRGO`. if we traverse the tree in symmetric order, since symmetric order is based on traversing the left subtree of each node just before that node, then traversing the right subtree.

<br>

![](/blog/assets/knuth_bs3.png)

<br>

* Algorithm (Tree search and insertion) → Given a table of records that form a binary tree as described above, this algorithm searches for a given argument `K`. If `K` is not in the table, a new node containing `K` is inserted into the tree in the appropriate place.

* Theorem (T. N. Hibbard, 1962) → After a random element is deleted from a random tree by Algorithm D, the resulting tree is still random. The shape of the tree is random after deletions, but the relative distribution of values in a given tree shape may change, and it turns out that the first random insertion after deletion actually destroys the randomness property on the shapes. 

<br>

![](/blog/assets/knuth_bs4.png)

<br>

* Let us now explore the problem of finding the optimum tree → when `N` is large there are `perm(2N N) / ( N + 1 ) ≈ 4^N / √πN^{3/2})` binary trees (so we can’t just try them all).

* Call the expected number of comparisons for a binary tree the cost of the tree; and the minimum-cost tree is optimum. We can determine an optimum tree in `O(n^3)` units of time, using `O(n^2)` cells of memory.

* All subtrees of an optimum tree are optimum.

* The minimum cost is closely related to entropy →  If `p1, p2, ..., pn` are probabilities with `p1 + p2 + ... + pn = 1`, we define the entropy `H(p1, p2,..., pn)` by the formula `H(p1, p2,..., pn) = sum^n_{k = 1} pk lg(1 / pk)`. If `n` events are possible and the `k`th event occurs with probability `pk`, we can imagine that we have received `lg(1 / pk)` bits of information when the `k`th event has occurred. 

<br>

![](/blog/assets/knuth_garsia_wachs_2.png)
![](/blog/assets/knuth_garsia-wachs.png)
![](/blog/assets/knuth_opt_tree.png)

<br>

* The height of a tree is defined to be its maximum level, the length of the longest path from the root to an external node. A binary tree is called balanced if the height of the left subtree of every node never differs by more than `±1` from the height of its right subtree.

* Theorem (Adelson-Velsky and Landis) → The height of a balanced tree with `N` internal nodes always lies between `lg(N + 1)` and `1.440 lg(N  + 2) − 0.3277`.

<br>

```🐝
A B-tree of order m is a tree that satisfies the following properties:

i) Every node has at most m children.

ii) Every node, except for the root and the leaves, has at least m/2 children.

iii) The root has at least 2 children (unless it is a leaf).

iv) All leaves appear on the same level, and carry no information.

v) A nonleaf node with k children contains k − 1 keys.
```

<br>

![](/blog/assets/knuth_balanced_tree.png)

<br>

### DIGITAL SEARCHING

<br>

* A trie — pronounced “try” — is essentially an M-ary tree, whose nodes are M-place vectors with components corresponding to digits or characters. Each node on level `l` represents the set of all keys that begin with a certain sequence of l characters called its prefix; the node specifies an M-way branch, depending on the `(l + 1)`st character.

* The number of nodes needed to store `N` random keys in an M-ary trie, with the trie branching terminated for subfiles of `≤ s` keys, is approximately `N / (s lnM)`. This approximation is valid for large `N`, small `s`, and small `M`. Since a trie node involves `M` link fields, we will need only about `N / ln M` link fields if we choose `s = M`.

* The number of digits or characters examined during a random search is approximately `log_M N` for all methods considered. 

* Sometimes it’s necessary to conduct a search based on the values of other fields in the records besides the primary key; these other fields are often called secondary keys or attributes of the record.

* ✨It is interesting to note that the human brain is much better at secondary key retrieval than computers are; in fact, people find it rather easy to recognize faces or melodies from only fragmentary information, while computers have barely been able to do this at all. Therefore it is not unlikely that a completely new approach to machine design will someday be discovered that solves the problem of secondary key retrieval once and for all, making this entire section obsolete. ✨

<br>

![](/blog/assets/knuth_patricia.png)

<br>

### HASHING

<br>

* A third possibility for search methods is to avoid all this rummaging around by doing some arithmetical calculation on `K`, computing a function `f(K)` that is the location of `K` and the associated data in the table.

<br>

![](/blog/assets/knuth_bytegirl.png)

<br>

---

### TO BE CONTINUED... 🫪

##### Talking about searching, would a 💕 **binary** *soul* **search** 💕 be the answer to the meaning of life? Nowadays, I believe so, but I had to try many other types of searches to come to this conclusion. This is a story for **nostalgia, part 3️⃣** — illustrated by the picture below of me snowboarding at **[Woodward Tahoe](https://www.rideboreal.com/explore/who-we-are/woodward-tahoe/)**, circa 2019. This one is long.

##### Once I left Cupertino, at the end of 2016, I officially became a nomad for the first time in my life. See, after five years stuck in an office without windows, followed by a couple of years of working too many hours a day and full weekends, I was feeling like I was missing out. I wanted a chance to finally experience life a bit, all that **[free spirit](https://www.youtube.com/watch?v=5CXzUcdNEtU)** that had been sold to me in the movies. At that time, I had a very cool blue Subaru Crosstrek that could hold all my boards — for surf, skate, and snow — as well as my camera gear and lenses, **[my DJI drone](https://vimeo.com/bt3gl)**, a guitar, a blanket, and everything I needed to be **[the bravest kid in the world](https://en.wikipedia.org/wiki/Kafka_on_the_Shore)**. Also, don't forget that I was still very *green* at probably every single thing in life at that time, because until then, I had pretty much spent most of my time being the best student or nerd I could be.

##### I decided I would explore and stargaze across the entire states of California and Hawaii — all the beaches, parks, and mountains. I wanted to live this type of life once before going back to my *normal* life, getting married, becoming a full adult, etc. I wanted to get to know people, I wanted to learn more about different lifestyles, I wanted to have some **[meat for storytelling](https://en.wikipedia.org/wiki/Jack_Kerouac)**, I wanted to find my soul, I wanted to chase the meaning of life, I wanted **[to express myself creating art](https://tv.vonsteinkirch.com/an-ode-to-a-quantum-simulation)**, and I wanted to be able to say I did not spend my entire life in front of my lovely computers. And I did. For years, I lived that life — nobody will ever steal that experience from me. It's mine. I did it.

##### The original plan was to do this while working remotely (I joined Etsy Engineering, a nice remote job, right before this decision), staying at nice Airbnbs or nomadic communities (there were so many of them before the pandemic!), or sometimes even getting a longer stay if the place was worth it, such as in Encinitas or Maui, for instance. The original plan was to do this for just a couple of years or so at most, and then set up a base in my favorite spot and move on with my destiny. It took something like a global pandemic for me to realize that this life is not very sustainable for too long, especially if your main goal is still to be an engineer, builder, or, you know, a serious person.

##### That particular year in the Tahoe pic was a very intense year for me. I should mention that I only learned how to snowboard back in 2017, so being able to jump on a slippery tube on a board without breaking my legs or **[dying](https://science.nasa.gov/universe/stars/#death)** was, at that moment, the coolest personal achievement possible.

##### Looking back now, as the person I am today, after all the suffering that came after this journey of ego dissolution, this whole thing does sound a little silly and dangerous, and I am not sure why I did not feel either of those feelings back then. But it's only *silly* because I had the chance to experience it down to my bones, overcome it, and eventually call it *silly* — that's the inexorable beauty of growing and maturing and being a human. And that person is still me. She is still someone I got to be once, and I don't look back on it regretfully. It's more like, *"I have empirically experienced living inside that persona for a while."*

##### Life is a funny thing. If you live intensively like I did, indulging yourself to maximize experiences and knowledge, you will eventually find no more meaning in certain choices, and you will grow out of past characters. On the other hand, if you don't do it at all — if you never go explore the world, if you never push yourself to the limits, if you never leave "home" for the hero's journey — you will never know. And I am pretty sure you will become one of those people who eventually grow into a resentful character, constantly asking, *"what if?"* (But you might also become super-safe and uber-rich, too, so who knows?).

##### So what's the right answer? To be or not to be? Should we stay or should we go? Nobody will ever be able to answer this question for you, my dear anon. It's your job to live your life. It's your job to let others live their lives without your judgment. And it's your job to own the choices you make in the game of choices — and do it as gracefully and gratefully as you can 🫶🏼.

<br>

![](/blog/assets/searching_dopamine.png)

<br>

##### PS: When I look back at this picture, I think, "It's so epic — why am I not wearing something better?" 😅. That’s a little quirk of mine: I never really cared about pictures or how I looked to others. I was the classic nerd who needed to wear comfortable clothes because, "I'm too busy and that's really what matters". See why I have never been interested in or cared about social media? These days, as maturity pushes me to embrace my lifelong role of a scholar and a leader (and, soon, a mother and wife), I've become more mindful of my wardrobe. When I'm working, I mostly wear black and suits; for personal activities, I enjoy floral, colorful, and elegant dresses.

### ⬛️