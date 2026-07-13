---
title: 🤖 TECH → On Global Workspace and J-Space in LLMs
subtitle: Rating: 9/10 | Audience: Intermediate to Advanced AI Scientists
date: 2026-07-13
---

A week ago, one of Anthropic's research groups published a paper titled [Verbalizable Representations Form a Global Workspace in Language Models](http://transformer-circuits.pub/2026/workspace/index.html). Since one of my hobbies is to [study interpretability](https://gist.github.com/von-steinkirch/0b2f642d0c16b30cf9c479d028531b84), I thought it was an important read, so I decided to write a quick review here.

The paper is super, uber dense, and I will definitely return to it later (especially to take a closer look at the mathematics in the appendix). On top of that, its references introduced me to a dozen new papers on consciousness and interpretability, all of which have now made their way onto my reading list. For now, though, I wanted to write down my initial notes, which are presented below (and, conveniently, polished by — who else? — Claude, of course).

PS: A note to the curious anons. Besides being very familiar with Jacobians from physics, most of the concepts in this paper were completely new to me (unfortunately, I don't know much about neuroscience). I had to stop and think about almost every sentence. You know that feeling when you encounter a concept for the first time, and it seems much harder than every subsequent reading? That's simply the nature of learning intricate subjects. You have to force yourself through that first difficult pass, and then each subsequent pass becomes progressively easier — and much more enjoyable.


<br>

## 🧉 Core Thesis

<br>

Language models maintain a privileged, limited set of internal representations — analogous to a "global workspace" — that are available for verbal report, deliberate manipulation, and internal reasoning, sitting atop a much larger volume of automatic processing the model can't access or report on. This structure is identified using a new interpretability method called the Jacobian lens (J-lens).

<br>

## 🧉 Global Workspace Theory from Human Cognition

<br>

- Only a subset of what the brain processes is consciously accessible — poised for use in reasoning and in direct control of action/speech.
- Under global workspace theory, the brain has many specialized processors operating in parallel and largely in isolation. A representation becomes consciously accessible when "posted" to a shared global workspace, from which many downstream processes can read.
- The workspace integrates and broadcasts information for flexible reasoning and report. It's capacity-limited, so entry is competitive and shaped by attention.

<br>

## 🧉  What Would a Workspace in an LLM Look Like?

<br>

The paper proposes five properties a candidate LLM "workspace" should satisfy:

1. **Verbal report** — asking the model what it's thinking surfaces workspace concepts; swapping workspace vectors changes its stated answer.
2. **Directed modulation** — the model can deliberately hold/compute with workspace concepts under instruction, independent of what it outputs, and can pull in atypical content when needed.
3. **Internal reasoning** — workspace vectors represent intermediate computation steps; intervening on them redirects the model's conclusions.
4. **Flexible generalization** — a workspace vector taken from one context is correctly used by whatever function a new context supplies.
5. **Selectivity** — the workspace is a small subset of total representational content, not involved in routine processing like parsing or grammar.

The researchers found workspace-like representations by first searching for verbalizable ones, then discovered these also satisfy the other four properties.

<br>

## 🧉 The Jacobian Lens

<br>

- **Residual stream basics**: at each token position, a transformer maintains a residual stream vector, progressively updated across layers — starting near "just the token identity" and ending as a directly readable next-token prediction (via the unembedding matrix).
- **J-lens**: for each vocabulary token, computes a vector encoding the model's general disposition to verbalize that token — the  averaged linearized effect of an activation on token-production likelihood across many contexts (as opposed to a single-prompt Jacobian, which conflates general disposition with the concept's specific use in that context).
- Considered a principled refinement of the logit lens, correcting for representational drift across layers.
- Related to Hernandez et al.'s use of Jacobians for per-relation subject → object maps (e.g., "plays instrument"), but here applied to the general activation → output map rather than a single relation.
- **J-space**: the set of points expressible as a sparse, nonnegative combination of J-lens vectors, with a sparsity parameter k (empirically ≤25 — the number of J-lens vectors meaningfully active at once). Geometrically a union of k-dimensional cones. Any activation can be decomposed into a J-space component (nearest point in J-space) and a non-J-space remainder.

<br>

## 🧉 Findings

<br>

**Where the workspace lives:**
- J-space carries workspace-like content only at intermediate depths — empty early on, aligned with imminent output late on.
- It's capacity-limited: holds on the order of tens of concepts at once, is a small fraction of total activation variance, and excludes most of the model's representational features.
- Related concepts can be packed in more densely than unrelated ones — suggesting capacity scales with coherence, not just count.

**Report and correlation:**
- Tested via a colon-token protocol: activation ordering in the J-lens correlates with the order of words the model actually reports, and this correlation strengthens near the end of the workspace layers.

**Directed modulation:**
- Tested by instructing the model to "hold in mind" a concept while copying unrelated text, then reading the J-lens at output positions with unrelated surface text — showing top-down attentional-style control over workspace contents, echoing similar capacities in humans.

**Broadcasting:**
- J-lens vectors compose with downstream components' input weights far more broadly than other residual-stream directions — consistent with a "broadcast" role.
- Broadcasting operates along two transformer "axes": depth (available to all later layers at that position) and **sequence position** (available to later positions via attention). Evidence of broadcast along both.
- A single J-lens vector can serve as valid input to many different downstream operations (flexible generalization).

**Training and intervention:**
- J-space content changes over the course of training.
- The workspace is already present in the pretrained base model, before any post-training — suggesting next-token prediction alone is sufficient to induce it. The base model's workspace has no privileged "self" perspective; that appears to be installed by post-training (the "Assistant" persona).
- Proposed intervention — counterfactual reflection training: implants ethical principles into the model's workspace by training it to articulate those principles if interrupted and asked to reflect on them.

**Safety-relevant findings:**
- The workspace can encode recognition of being in an evaluation (i.e., that a scenario is fake/fictional).
- Ablating these "am I being evaluated" representations can surface concealed malicious propensities.
- J-lens can reveal internal signatures of a model's "intentions" — e.g., detecting reward/bias-seeking in a model trained to exploit reward-model biases, even when not stated in output.

<br>

## 🧉 Limitations

<br>

- **Single-token bottleneck**: J-lens only names concepts with a single-token vocabulary entry — many represented concepts have no such token.
- **Inconsistent interpretability**: readouts are often but not always human-interpretable; unclear whether uninterpretable ones reflect noise, multi-token concepts, or real content the researchers just aren't recognizing.
- **Vs. human workspace**: the human workspace can be sustained via recurrent dynamics over indefinite time without verbalizing; may also contain non-verbal content (spatial, motor, perceptual) that has no compact description — the paper speculates image-generating models might develop a visual workspace component.

<br>

## 🧉 Broader Theoretical Connections

<br>

- Connects to Butlin et al.'s framework of "indicator properties" across multiple consciousness theories (global workspace, higher-order theories, attention schema theory, recurrent processing theory).
- ✨ The base-model workspace (pre-post-training, no "self") is compared to human "ego dissolution" states (psychedelics, some meditative traditions) — but framed as more stable and directly inspectable than fleeting, retrospectively-reported human states. ✨
- Authors frame their finding as suggesting the functional architecture associated with conscious access may be a convergent solution for learning systems under certain computational pressures, not a biological accident — while being careful to note this doesn't settle whether such functional signatures entail or require phenomenal consciousness.

<br>

### ⬛️