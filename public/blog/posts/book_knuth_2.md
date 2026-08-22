---
title: 📚 BOOK → TAOCP - Part 2️⃣ (Donald E. Knuth, 1997)
subtitle: Rating: 10/10 | Audience: Beginner to Advanced Computer Scientists
date: 2026; 8; 24
---

![](/blog/assets/magritte2.jpg)

<br>

> [🎵](https://www.youtube.com/watch?v=pJsX3os6Xc0)  ***"An idea is like a virus. Resilient. Highly contagious. And even the smallest seed of an idea can grow. It can grow to define or destroy you."*** — Dom Cobb, Inception

> ***"From error to error one discovers the entire truth"*** — Sigmund Freud

<br>

In this second post, I continue **[the work started in Part 1️⃣](https://marina.nullstar.fun/pages/post.html?post=book_knuth)**, studying


https://www.jank.cool/death-to-the-self-playing-game/

....


<br>

As always, below are a few highlights (for personal inventory), with a moderate attempt at coherence:

**🤖 If you see a 👾, it means I found something particularly cool or learned something new.**
**🤖 If you see a ⭐️, it means the idea is somehow related to our cool research at NULLSTAR.**
**🤖 If you see a ✨, it means things that are so cool that they need a lil glitter around them.**
**🤖 If you see a ☀️, it means it's just a fun easter egg (because life's short; we must dance).**
**🤖 If these notes look interesting to you, it's your ✦moral duty✦ to read the original books.**

<br>

----

## 🌠 VOLUME 2️⃣; CHAPTER 4️⃣; ARITHMETIC

<br>

> ✨ *“Every well-rounded programmer ought to have a knowledge of what goes on during the elementary steps of floating point arithmetic.* ✨

<br>

![](/blog/assets/knuth5.png)

<br>

* Fixed point positional notation was apparently first conceived by the Maya Indians in central America some 2000 years ago; their radix-20 system was highly developed, especially in connection with astronomical records and calendar dates. They began to use a written sign for zero about A.D. 200. But the Spanish conquerors destroyed nearly all of the Maya books on history and science, so we have comparatively little knowledge about the degree of sophistication that native Americans had reached in arithmetic. Special-purpose multiplication tables have been found, but no examples of division are known.

* Our decimal notation, which differs from the more ancient forms primarily because of its fixed radix point, together with its symbol for zero to mark an empty position, was developed first in India within the Hindu culture. The exact date when this notation first appeared is quite uncertain; about A.D. 600 seems to be a good guess. Hindu science was highly developed at that time, particularly in astronomy. 

* The Hindu principles of decimal arithmetic were brought to Persia about A.D. 750, as several important works were translated into Arabic; a picturesque account of this development is given in a Hebrew document by Abraham Ibn Ezra.

* Decimal notation was applied at first only to integer numbers, not to fractions. Arabic astronomers, who required fractions in their star charts and other tables, continued to use the notation of Ptolemy, a notation based on sexagesimal fractions.

* Chinese mathematicians—who never used sexagesimals—were apparently the first people to work with the equivalent of decimal fractions, although their numeral system (lacking zero) was not originally a positional number system in the strict sense. Chinese units of weights and measures were decimal, so that Tsu Ch’ung-Chih (who died in A.D. 500 or 501) was able to express an approximation to π in the following form: 3 chang, 1 ch’in, 4 ts’un, 1 fen, 5 li, 9 hao, 2 miao, 7 hu.

* Blaise Pascal wrote, “Denaria enim ex instituto hominum, non ex necessitate naturæ ut vulgus arbitratur, et sane satis inepte, posita est”; i.e., “The decimal system has been established, somewhat foolishly to be sure, according to man’s custom, not from a natural necessity as most people think.”

<br>

![](/blog/assets/knuth4.png)

<br>

> ✨ *For many purposes, it is considerably more convenient to let the position of the radix point be dynamically variable or “floating” as a program is running, and to carry with each number an indication of its current radix point position. This idea has been used for many years in scientific calculations, especially for expressing very large numbers like Avogadro’s number `N = 6.02214×1023` (`N = (74,+.60221400)`), or very small numbers like Planck’s constant `h = 6.6261×10−27` erg sec (`h= (24,+.66261000).`).* ✨

<br>

> *Round numbers are always false.* — Samuel Johnson (1750)

<br>

* Numerical subroutines should deliver results that satisfy simple, useful mathematical laws whenever possible. 

* The crucial formula `u ⊕ v = round(u + v)` is a regularity property that makes a great deal of difference between whether mathematical analysis of computational algorithms is worth doing or worth avoiding. Without any underlying symmetry properties, the job of proving interesting results becomes extremely unpleasant. The enjoyment of one’s tools is an essential ingredient of successful work.

* Another interesting alternative is available for doing arithmetic on large integer numbers, based on some simple principles of number theory. The idea is to have several moduli `m1`,` m2`,…, `mr` that contain no common factors, and to work indirectly with residues `u mod m1`, `u mod m2`,…, `u mod`mr` instead of directly with the number `u`.

* We may therefore regard `(u1,u2,...,ur)` as a new type of internal computer representation, a “modular representation,” of the integer `u`.

* The range of numbers that can be handled by modular arithmetic is equal to `m = m1 m2 ... mr`, the product of the moduli; and if each `mj` is near our computer’s word size we can deal with `n`-place numbers when `r ≈ n`.

* The critical problem in high-precision multiplication is the determination of “convolution products” such as `ur v0 + u_{r−1} v1 + ··· +u0 vr`, and there is an intimate relation between convolutions and Fourier transformation.






---

### TO BE CONTINUED... 🤓

<br>

### ⬛️