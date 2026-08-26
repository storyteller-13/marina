---
title: 📚 BOOK → TAOCP - Part 4️⃣ (Donald E. Knuth, 1997)
subtitle: Rating: 10/10 | Audience: Beginner to Advanced Computer Scientists | Today's Word: Inexorable
date: 2026; 8; 28
---

> [🎼](https://www.youtube.com/watch?v=h9CqJTsT2Ms) *"Attempt the end, and never stand to doubt; Nothing’s so hard, but search will find it out."* — Robert Herrick (1648)

> [🎵](https://www.youtube.com/watch?v=yUXwdnOJ_z0) *"You can't connect the dots looking forward; you can only connect them looking backwards."* — **[Steve Jobs (2005)](https://www.youtube.com/watch?v=jiHZqamCD8c)** 

> [🎶](https://www.youtube.com/watch?v=FQpuSV9AHQ4) *"Seek and you shall find."* — Matthew 7:7

<br>

![](/blog/assets/klee.webp)

<br>

In this third post, I continue the *brain-marathon* I began in [**Part 1️⃣**](https://marina.nullstar.fun/pages/post.html?post=book_knuth), [**Part 2️⃣**](https://marina.nullstar.fun/pages/post.html?post=book_knuth_2), and [**Part 3️⃣**](https://marina.nullstar.fun/pages/post.html?post=book_knuth_3), savoring [**our luminal reality**](https://www.youtube.com/watch?v=dtW-AFYpH_A). 

Today we go through the **Searching** chapter....


https://blog.trailofbits.com/2026/08/26/vms-wont-contain-cyber-capable-agents/


<br>

As always, below are a few highlights (for personal inventory), with a moderate attempt at coherence:

**🤖 If you see a 👾, it means I found something particularly cool or learned something new.**
**🤖 If you see a ⭐️, it means the idea is somehow related to our cool research at [NULLSTAR](https://nullstar.games/).**
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

2. [Compare.] If K ≤ Ki, go to 4.

3. [Advance.] Increase i by 1 and return to 2.

4. [Equality?] If K = Ki, the algorithm terminates successfully. Otherwise it terminates unsuccessfully.
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

> *Algorithm (Binary search) → Given a table of records `R1,  R2, ..., RN` whose keys are in increasing order `K1 < K2 < ··· < KN`, this algorithm searches for a given argument `K`.*

```🐝
1. [Initialize.] Set l ← 1, u ← N.

2. [Get midpoint.] At this point we know that if K is in the table, it satisfies Kl ≤ K ≤ Ku. If u < l, the algorithm terminates unsuccessfully. Otherwise, set i←[(l + u)/2], the approximate midpoint of the relevant table area.

3. [Compare.] If K < Ki, go to 4; if K > Ki, go to 5; and if K = Ki, the algorithm terminates successfully.

4. [Adjust u.] Set u ← i − 1 and return to 2.

5. [Adjust l.] Set l ← i + 1 and return to 2.
```

<br>

* Fibonacci numbers provide us with an alternative to binary search. The resulting method is preferable on some computers, because it involves only addition and subtraction, not division by 2.

<br>

![](/blog/assets/knuth_fib.png)

<br>

> 👾 *Algorithm (Fibonaccian search). Given a table of records `R1, R2, ..., RN` whose keys are in increasing order `K1 < K2 < ··· < KN`, this algorithm searches for a given argument `K`. For convenience in description, we assume that `N + 1` is a perfect Fibonacci number, `F_{k+1}`.*

* It is not difficult to make the method work for arbitrary `N`, if a suitable initialization is provided:

```🐝
1. [Initialize.] Set i ← Fk, p ← Fk − 1, q ← Fk − 2. (Throughout the algorithm, p and q will be consecutive Fibonacci numbers.)

2. [Compare.] If K < Ki, go to step 3; if K > Ki, go to 4; and if K = Ki, the algorithm terminates successfully.

3. [Decrease i.] If q = 0, the algorithm terminates unsuccessfully. Otherwise set i ← i − q, and set (p, q) ← (q, p − q); then return to 2.

4. [Increase i.] If p = 1, the algorithm terminates unsuccessfully. Otherwise set i ← i + q, p ← p − q, then q ← q − p, and return to 2.
```

<br>

* Let `C`, `C1`, and `(C2 − S)` be the respective number of times steps 2, 3, and 4 are performed. Then we have:

```🐝
C = (ave ϕk/√5 + O(1), max k − 1)

C1 = (ave k/√5 + O(1), max k − 1)

C2 − S = (ave ϕ − 1k/√5 + O(1), max ⌊k/2⌋)

left branch is taken about `ϕ ≈ 1.618` times as often as the right branch
```

<br>

> *Interpolation search → When we know that `K` lies between `Kl` and `Ku`, we can choose the next probe to be about `(K − Kl) / (Ku − Kl)` of the way between `l` and `u`, assuming that the keys are numeric and that they increase in a roughly constant manner throughout the interval.*

<br>

* Interpolation search is asymptotically superior to binary search. One step of binary search essentially reduces the amount of uncertainty from `n` to `1/2 n`, while one step of interpolation search essentially reduces it to `√n`, when the keys in the table are randomly distributed. Hence interpolation search takes about `lg lg N` steps, on the average, to reduce the uncertainty from `N` to `2`.

* However, computer simulation experiments show that interpolation search does not decrease the number of comparisons enough to compensate for the extra computing time involved, unless the table is rather large. Typical files aren’t sufficiently random, and the difference between `lg lg N` and `lg N` is not substantial unless `N` exceeds, say, `2^{16} = 65,536`. Interpolation is most successful in the early stages of searching a large possibly external file; after the range has been narrowed down, binary search finishes things off more quickly.



<br>

---

### TO BE CONTINUED... 🫪

##### Talking about searching, would a **binary** *soul* **search** be the answer to the meaning of life? Nowadays, I believe so, but I had to try many other types of seaches to come up with this conclusion. This is a story for **nostalgia, part 3️⃣** — illustrated by a picture of me snowboarding at **[Woodward Tahoe](https://www.rideboreal.com/explore/who-we-are/woodward-tahoe/)**, circa 2019. This one is long.

##### Once I left Cupertino, at the end of 2016, I officially became a nomad for the first time in my life. See, after five years stuck in an office without windows, followed by a couple of years of working too many hours a day and full weekends, I was feeling like I was missing out. I wanted a chance to finally experience a little bit of life, all that free spirit that had been sold to me in the movies. At that time, I had a very cool blue Subaru Crosstrek that could hold all my boards — for surf, skate, and snow — as well as my camera gear and lenses, my DJI drone, a guitar, a blanket, and everything I needed to be **[the bravest kid in the world](https://en.wikipedia.org/wiki/Kafka_on_the_Shore)**. Don't forget that I was still very green at probably every single thing in life at that time, because until then, I had pretty much spent most of my time being the best student or nerd I could be.

##### I decided I would explore and stargaze across the entire states of California and Hawaii — all the beaches, parks, and mountains. I wanted to live this type of life once before going back to my *normal* life, getting married, becoming a full adult, etc. I wanted to get to know people, I wanted to learn more about different lifestyles, I wanted to have some meat for storytelling, I wanted to find my soul, I wanted to chase the meaning of life, and I wanted to be able to say I did not spend my entire life in front of my lovely computers. And I did. For three years, I lived that life — nobody will ever steal that experience from me. It's mine. I did it.

##### The original plan was to do this while working remotely (I joined Etsy Engineering, a nice remote job, right before this decision), staying at nice Airbnbs or Nomadic Communities (there were so many of them before the pandemic!), or sometimes even getting a longer stay if the place was worth it, such as in Encinitas or Maui, for instance. The original plan was to do this for just a couple of years or so at most, and then set up a base in my favorite spot and move on with my destiny. It took something like a global pandemic for me to realize that this life is not very sustainable for too long, especially if your main goal is still to be an engineer, builder, or, you know, a serious person.

##### That particular year in this picture was a very intense year for me. I should mention that I only learned how to snowboard back in 2017, so being able to jump on a slippery tube on a board without breaking my legs or dying was, at that moment, the coolest personal achievement possible.

##### Looking back now, as the person I am today, after all the suffering that came after this journey of ego dissolution, this whole thing does sound a little silly and dangerous, and I am not sure why I did not feel either of those things back then. But that person is still me. She is still someone I got to be once, and I don't look back on it regretfully. It's more like, *"I have empirically experienced living inside that persona for a while."*

##### Life is a funny thing. If you live intensively like I did, indulging yourself to maximize experiences and knowledge, you will eventually find no more meaning in certain choices, and you will grow out of past characters. On the other hand, if you don't do it at all — if you never go explore the world, if you never push yourself to the limits, if you never leave "home" for the hero's journey — you will never know. And I am pretty sure you will become one of those people who eventually grow into a resentful character, constantly asking, *"what if?"* (But you might also be super safe and uber-rich, too, so who knows?).

##### So what's the right answer? To be or not to be? Should we stay or should we go? Nobody will ever be able to answer this question for you, my dear anon. It's your job to live your life. It's your job to let others live their lives without judgment. And it's your job to own the choices you make in the game of choices — and do it as gracefully and gratefully as you can 🫶🏼.

<br>

![](/blog/assets/searching_dopamine.png)

<br>

### ⬛️