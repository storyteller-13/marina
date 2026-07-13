---
title: 🤖 TECH → Was this the craziest week yet in AI?
subtitle: We are riding that exponential curve, aren't we?
date: 2026-04-05
---

## TL; DR

I'm not planning to use these notes as a weekly roundup. But since I) I'm really busy this weekend and II) this has been a week for the books, today we'll simply take a moment to reflect on everything that's happening.

## Updates on Time...

- **[TurboQuant](https://research.google/blog/turboquant-redefining-ai-efficiency-with-extreme-compression/) + [1-Bit Frontier](https://arxiv.org/abs/2310.11453)**: Google Research and NYU's TurboQuant (ICLR 2026) compresses KV cache vectors to 3–4 bits with near-zero quality loss and no preprocessing or calibration required. For long-context agentic inference, KV cache is typically the dominant memory bottleneck. Big win for local models.

- **[Gemma 4 — Apache 2.0](https://blog.google/innovation-and-ai/technology/developers-tools/gemma-4/)**: Google DeepMind released four [open-weight models](https://www.interconnects.ai/p/gemma-4-and-what-makes-an-open-model) (E2B, E4B, 26B MoE, 31B dense) under the Apache 2.0 license. The 31B scores 89.2% on AIME 2026 and 80% on LiveCodeBench, with native vision and audio input and context windows up to 256K tokens. Big win for local models ++.

- **[Qwen 3.6-Plus](https://www.constellationr.com/insights/news/alibabas-qwen-launches-new-flagship-llm-qwen-36-plus)**: Alibaba's new flagship model features a 1M-token context window, always-on chain-of-thought reasoning, and deep integration with agentic coding frameworks including Claude Code and Cline. Scores 78.8 on SWE-bench Verified. Big win for local models ++.

- **[Claude Code Source Leak](https://venturebeat.com/technology/claude-codes-source-code-appears-to-have-leaked-heres-what-we-know)**: On March 31, a JavaScript sourcemap shipped inside npm package v2.1.88 exposed 512,000 lines of TypeScript across 1,906 files. Reviewers found a multi-agent orchestration system, frustration-detection via regex, and KAIROS — a feature-gated always-on background agent with a "dream" mode for nightly memory consolidation.

- **[OpenAI Raises $122B at $852B Valuation](https://openai.com/index/accelerating-the-next-phase-ai/)**: The round, anchored by Amazon ($50B), SoftBank, and Nvidia, is the largest private fundraise in history. OpenAI reports $2B in monthly revenue and 900M weekly active ChatGPT users.

- **[Karpathy on LLM Knowledge Bases + AutoResearch](https://github.com/karpathy/autoresearch)**: Published a [workflow](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) for using LLMs to incrementally compile and maintain personal knowledge bases in Markdown with [Obsidian](https://obsidian.md/), instead of traditional RAG pipelines. His separate [AutoResearch](https://github.com/karpathy/autoresearch) script runs 100+ ML experiments autonomously overnight on a single GPU.


- **[Meta's Avocado Delayed, Possibly Closed-Source](https://thenextweb.com/news/the-unreleased-ai-metas-model)**: Meta's next-generation model has been pushed to May–June 2026 after falling short of competitors in internal evaluations for reasoning, coding, and writing. The company is reportedly considering temporarily licensing Google's Gemini, and may ship Avocado as a proprietary model — a departure from Meta's Llama strategy.

- **[Cursor 3](https://cursor.com/blog/cursor-3)**: The new Agents Window provides a unified interface for running multiple coding agents in parallel across local, cloud, SSH, and mobile environments. The full interface was rebuilt from scratch (codenamed "Glass") with agent orchestration as the primary interaction model rather than the file editor.

- **[Pi Agent](https://github.com/badlogic/pi-mono)**: A minimal, open-source terminal coding agent by Mario Zechner that powers the OpenClaw ecosystem. Pi ships without opinionated features — no plan mode, no built-in sub-agents — and instead exposes a TypeScript extension API so developers can adapt it to their own workflows. Now launchable in one command via `ollama launch pi`.

- **Cool Tools and Open-source Projects: [Pipecat](https://pipecat.ai) · [RAG-Anything](https://github.com/HKUDS/RAG-Anything) · [LightRAG](https://github.com/HKUDS/LightRAG) · [MinerU](https://github.com/opendatalab/mineru) · [mini-coding-agent](https://github.com/rasbt/mini-coding-agent) · [Hermes (the other cool agent)](https://github.com/NousResearch/hermes-agent) · [ComfyUI](https://github.com/Comfy-Org/ComfyUI) · [OpenAI's Symphony](https://github.com/openai/symphony) · [Superpowers](https://github.com/obra/superpowers) · [agent-governance-toolkit](https://github.com/microsoft/agent-governance-toolkit)**

## ...and Space

- **[Artemis II](https://www.nasa.gov/artemis/)** — Not AI, but worth noting: on April 1, 2026, NASA launched four astronauts on a 10-day crewed mission around the Moon — the first humans to travel that far from Earth in 54 years. The mission is a systems validation flight ahead of an eventual lunar landing. Humans are going back to the Moon!

![Artemis II — crewed flight around the Moon](/blog/assets/artemis2.webp)
