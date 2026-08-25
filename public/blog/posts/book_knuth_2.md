---
title: 📚 BOOK → TAOCP - Part 2️⃣ (Donald E. Knuth, 1997)
subtitle: Rating: 10/10 | Audience: Beginner to Advanced Computer Scientists
date: 2026; 8; 24
---

![](/blog/assets/magritte2.jpg)

<br>

> [🎶](https://www.youtube.com/watch?v=o7WGrdg-p4Y) ***"From error to error one discovers the entire truth."*** — Sigmund Freud

> [🎵](https://www.youtube.com/watch?v=pJsX3os6Xc0)  ***"An idea is like a virus. Resilient. Highly contagious. And even the smallest seed of an idea can grow. It can grow to define or destroy you."*** — Dom Cobb, Inception

> [🎼](https://www.youtube.com/watch?v=h2cipX5Ir-0) ***"Science is a method of disciplined skepticism: it does not seek absolute certainty, but progressively stronger evidence against plausible alternatives. We do not establish truth by eliminating uncertainty; we establish increasingly compelling evidence by exposing hypotheses to attempts at falsification. 5σ under the null hypothesis is the scientific method's way of saying the more surprising the claim, the more evidence it needs to earn belief. Turning Carl Sagan's old line, 'extraordinary claims require extraordinary evidence,' into an actual, enforceable threshold."*** — Robot Clau in collaboration with Robot CG

<br>

In this second post, I continue **[the work started in Part 1️⃣](https://marina.nullstar.fun/pages/post.html?post=book_knuth)** during this **[luminal spacetime of mine](https://www.youtube.com/watch?v=4V7Mt_TcFjM)**. Here, I conclude volume 2️⃣ and revisit the basics and **[the beauty](https://essays.georgestrakhov.com/weird/)** of arithmetic. This was a very nostalgic **[sesh](https://blog.google/security/how-google-is-making-private-ai-practical-with-homomorphic-encryption/)** that transported me back to **[my high school](https://web.archive.org/web/20070322015644/http://fly.to/bytegirl)** and **[college days](https://web.archive.org/web/20090620090344/http://www.steinkirch.org/)** (and perhaps even **[my PhD](https://www.astro.sunysb.edu/steinkirch/)**?). I love **[math](https://newsletter.maartengrootendorst.com/p/a-visual-guide-to-quantization)**, I love **[physics](https://www.youtube.com/watch?v=6as2S-ixusE)**, I love **[computers](https://www.youtube.com/watch?v=HI2q3ci3Iuc)**, I love **[science](https://www.youtube.com/watch?v=cRZNwgvcWUg)**, I love **[nature](https://www.youtube.com/watch?v=pDSDbi6ffIc&list=LL&index=26)**, I love **[art](https://www.munch.no/en/object/MM.M.00777)**, I love **[philosophy](https://www.youtube.com/watch?v=tW6VQLOhBcE)**, I love the **[universe](https://apod.nasa.gov/apod/ap260824.html)**, I love **[life](https://www.jank.cool/death-to-the-self-playing-game/)**.

<br>

As always, below are a few highlights (for personal inventory), with a moderate attempt at coherence:

**🤖 If you see a 👾, it means I found something particularly cool or learned something new.**
**🤖 If you see a ⭐️, it means the idea is somehow related to our cool research at [NULLSTAR](https://www.nullstar.games/).**
**🤖 If you see a ✨, it means things that are so cool that they need a lil glitter around them.**
**🤖 If you see a ☀️, it means it's just a fun easter egg (because life's short; [we must dance](https://www.youtube.com/watch?v=VbD_kBJc_gI)).**
**🤖 If these notes look interesting to you, it's your ✦moral duty✦ to read the original books.**

<br>

----

## 🌠 VOLUME 2️⃣; CHAPTER 4️⃣; ARITHMETIC

<br>

### Floating

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

> *Round numbers are always false.* — Samuel Johnson (1750)

<br>

![](/blog/assets/knuth7.png)

<br>
* Numerical subroutines should deliver results that satisfy simple, useful mathematical laws whenever possible. 

* The crucial formula `u ⊕ v = round(u + v)` is a regularity property that makes a great deal of difference between whether mathematical analysis of computational algorithms is worth doing or worth avoiding. Without any underlying symmetry properties, the job of proving interesting results becomes extremely unpleasant. The enjoyment of one’s tools is an essential ingredient of successful work.

* Another interesting alternative is available for doing arithmetic on large integer numbers, based on some simple principles of number theory. The idea is to have several moduli `m1`,` m2`,…, `mr` that contain no common factors, and to work indirectly with residues `u mod m1`, `u mod m2`,..., `u mod mr` instead of directly with the number `u`.

<br>

![](/blog/assets/knuth6.png)

<br>

* We may therefore regard `(u1,u2,...,ur)` as a new type of internal computer representation, a “modular representation,” of the integer `u`.

* The range of numbers that can be handled by modular arithmetic is equal to `m = m1 m2 ... mr`, the product of the moduli; and if each `mj` is near our computer’s word size we can deal with `n`-place numbers when `r ≈ n`.

* The critical problem in high-precision multiplication is the determination of “convolution products” such as `ur v0 + u_{r−1} v1 + ··· + u0 vr`, and there is an intimate relation between convolutions and Fourier transformation.

<br>

----

### GCD

<br>

![](/blog/assets/gcd.png)

<br>

> *Original Euclidean algorithm → Given two integers `A` and `C` greater than unity, this algorithm finds their greatest common divisor: E1. [Is `A` divisible by `C`?] If `C` divides `A`, the algorithm terminates with `C` as the answer. E2. [Replace `A` by remainder.] If `A mod C` is equal to unity, the given numbers were relatively prime, so the algorithm terminates. Otherwise replace the pair of values `(A,C)` by `(C, A mod C)` and return to step E1.*

<br>

> *Modern Euclidean algorithm → Given nonnegative integers `u` and `v`, this algorithm finds their greatest common divisor. `A1`. `[v= 0?]` If `v = 0`, the algorithm terminates with `u` as the answer. `A2`. [Take `u mod v`.] Set `r ← u mod v`, `u ← v`, `v ← r`, and return to A1.*

<br>

* If u and v are integers chosen at random, the probability that `gcd(u,v) = 1` is `6/π2 ≈.60793`.

* The execution time of Euclid’s algorithm depends on `T`, the number of times the division step `A2` is performed. The quantity `T` is also an important factor in the running time of other algorithms, such as the evaluation of functions satisfying a reciprocity formula. 

<br>

![](/blog/assets/euclid.png)

<br>

```🐝
// x1, x2, ..., xn // = 1 / (x1 +1 / (x2 +1 / (··· / (xn−1 + 1/xn ) … )))
``` 

<br>

```🐝
π =  3 + //7,15,1,292,1,1,1,2,1,3,1,14,2,1,1,2,2,2,2,1,84,2,1,1,15,3,13,...//;
e = 2 + //1,2,1,1,4,1,1,6,1,1,8,1,1,10,1,1,12,1,1,14,1,1,16,1,1,18,1,...//;
γ = //1,1,2,1,2,1,4,3,13,5,1,1,8,1,2,4,1,1,40,1,11,3,7,1,7,1,1,5,1,49,...//;
ϕ = 1 + //1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,...//.
```

<br>

* 👾 The worst case of Euclid’s algorithm → the upper bound on the number of division steps → when the inputs are consecutive Fibonacci numbers.

<br>

----

### Primes

<br>

* It is unfortunately not a simple matter to find this prime factorization of `n`, or to determine whether or not `n` is prime. So far as anyone knows, it is a great deal harder to factor a large number `n` than to compute the greatest common divisor of two large numbers `m` and `n`; therefore we should avoid factoring large numbers whenever possible. → (☀️ or we just build a **[quantum computer](https://en.wikipedia.org/wiki/Shor%27s_algorithm)**).

<br>

![](/blog/assets/factoring.png)

<br>

* Let `π(x)` be the number of primes `≤ x`, so that `π(2) = 1`, `π(10) = 4`; the asymptotic behavior of this function has been studied extensively by many of the world’s greatest mathematicians, beginning with Legendre in 1798, then the Riemann conjecture in 1859, which was disproved by J.E. Littlewood in 1914, and the Riemann hypothesis which states that the complex function `ζ(z)` is zero only when the real part of `z` is equal to `1/2`, except in the trivial cases where `z` is a negative even integer, which would imply `π(x) = L(x)+O(√xlogx)` where ` L(x) = int_2^x dt/lnt`.

* 👾 The size of prime factors has a remarkable connection with permutations: The average number of bits in the `k`th largest prime factor of a random `n`-bit integer is asymptotically the same as the average length of the `k`th largest cycle of a random `n`-element permutation, as `n → ∞`.

* Fermat’s method → Another approach to the factoring problem, which was used by Pierre de Fermat in 1643, is more suited to finding large factors than small ones. Assume that `N = uv`, where `u ≤ v`. For practical purposes we may assume that `N` is odd; this means that `u` and `v` are odd, and we can let:

```🐝
x = (u + v) / 2
y = (v − u) / 2
```

<br>

* Fermat’s method consists of searching systematically for values of `x` and `y` that satisfy:

```🐝
N = x^2 − y^2, 0 ≤ y < x ≤ N
```

<br>

![](/blog/assets/primes.png)

<br>

* According to Fermat’s theorem, we have `x^{p − 1} mod  p = 1` whenever `p` is prime and `x` is not a multiple of `p`. Furthermore, there are efficient ways to calculate `x^{n − 1} mod n`, requiring only `O(log n)` operations of multiplication `mod n`.

* Fermat’s theorem is a powerful test for showing nonprimality of a given number. When `n` is not prime, it is always possible to find a value of `x < n` such that `x^{n − 1} mod n ≠ 1` → If there is a number `x` for which the order of `x` modulo `n` is equal to `n − 1`, then `n` is prime. 

* It is unnecessary to calculate `x^k mod n` for all `k ≤ n − 1` to determine if the order of `x` is `n − 1` or not. The order of `x` will be `n − 1` if and only if:

```🐝
i) x^{n − 1} mod n = 1
ii) x^{(n − 1)/p} mod ≠ 1 for all primes p that divide n − 1
```

<br>

![](/blog/assets/primes2.png)

<br>

* 👾 A completely rigorous and deterministic way to test for primality in polynomial time was finally discovered in 2002 by Manindra Agrawal, Neeraj Kayal, and Nitin Saxena → Let `r` be an integer such that `n⊥r` and the order of `n mod r` exceeds `(lgn)^2`. Then `n` is prime if and only if the polynomial congruence `(z + a)^n ≡ z^n + a` (modulo `z^r − 1`  and `n`) holds for `0 ≤ z ≤√r lg n`. 

* Marin Mersenne’s Cogitata Physico-Mathematica (Mersenne numbers) → A number of the form `2^{n − 1}` cannot be prime unless `n` is prime, since `2^{uv} − 1` is divisible by `2^u − 1` → the numbers `2^{p − 1}` are prime for `p = 2, 3, 5, 7, 13, 17, 19, 31, 67, 127, 257`, and for no other `p` less than `257`. 

<br>

---

### Polymomials

<br>

* ✨ It is possible to divide one polynomial by another in essentially the same way that we divide one multiple-precision integer by another, when arithmetic is being done on polynomials over a field. A field `S` is a commutative ring with identity, in which exact division is possible as well as the operations of addition, subtraction, and multiplication; this means as usual that whenever `u` and `v` are elements of `S`, and `v ≠ 0`, there is an element `w` in `S` such that `u = vw`. ✨

* ✨ Of special importance is the field of integers modulo `2`, whose only elements are `0` and `1`. Polynomials over this field (namely polynomials modulo `2`) have many analogies to integers expressed in binary notation; and rational functions over this field have striking analogies to rational numbers whose numerator and denominator are represented in binary notation. ✨

* Unique factorization domains → Consider the more general situation that the algebraic system `S` of coefficients is a unique factorization domain, not necessarily a field. This means that `S` is a commutative ring with identity, and that i) `uv ≠ 0`, whenever `u` and `v` are nonzero elements of `S`; ii) every non zero element `u` of `S` is either a unit or has a “unique” representation as a product of primes `p1,..., pt`. A unit is an element that has a reciprocal, namely an element `u` such that `uv = 1` for some `v` in `S`; and a prime is a non unit element `p` such that the equation `p = qr` can be true only if either `q` or `r` is a unit. 

* Any field is a unique factorization domain, in which each nonzero element is a unit and there are no primes. 

* Polynomials over a unique factorization domain form a unique factorization domain. A polynomial that is prime in this domain is usually called an irreducible polynomial. A polynomial over a unique factorization domain is called primitive if its coefficients are relatively prime.

<br>

![](/blog/assets/primitive.png)

<br>

* Gauss’s Lemma → The product of primitive polynomials over a unique factorization domain is primitive. → Any nonzero polynomial `u(x)` over a unique factorization domain `S` can be factored in the form `u(x) = c·v(x)`, where `c` is in `S` and `v(x)` is primitive. This representation is unique, in the sense that if `u = c1·v1(x) = c2·v2(x)`, then `c1 = ac2` and `v2(x) = av1(x)` where `a` is a unit of `S`.

<br>

![](/blog/assets/primitive2.png)

<br>

* Generalized Euclidean algorithm → Given nonzero polynomials `u(x)` and `v(x)` over a unique factorization domain `S`, this algorithm calculates a greatest common divisor of `u(x)` and `v(x)`. We assume that auxiliary algorithms exist to calculate greatest common divisors of elements of `S`, and to divide `a` by `b` in `S` when `b ≠ 0` and `a` is a multiple of `b`.

<br>

> 👾 *”The asymptotically best algorithms frequently turn out to be worst on all problems for which they are used.”* — Cantor and Zassenhaus (1981)

<br>

![](/blog/assets/starchains.png)

<br>

* An addition chain for n is a sequence of integers `1 = a0, a1, a2, ..., ar = n` with the property that `ai = aj +ak, for some k ≤ j < i`, for all `i = 1, 2,..., r`.

* 👾 An addition chain corresponds in a natural way to a directed graph, where the vertices are labeled `ai` for `0 ≤i ≤ r`, and where we draw arcs from `aj` to `ai` and from `ak` to `ai` as a representation of each step `ai = aj +ak`.

* The length of the addition chain, exclusive of useless steps, can be reconstructed by looking at the reduced graph → `(number of arcs) −(number of vertices) + 1` (deletion of a vertex of out-degree `1` also deletes one arc).

* An addition chain is equivalent to a star chain if and only if its reduced directed graph can be topologically sorted in only one way.

<br>

---

### TO BE CONTINUED... 🤓

<br>

![](/blog/assets/nasa.png)

##### (Talking about nostalgia — here’s a picture of me when I was living in D.C. and studying **[active galatic nuclei](https://en.wikipedia.org/wiki/Active_galactic_nucleus)** at the **[Goddard Space Flight Center, NASA](https://www.nasa.gov/goddard/)** — **[sudo](https://store.xkcd.com/)** circa 2008)

<br>

### ⬛️