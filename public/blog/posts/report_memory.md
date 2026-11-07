---
title: 🏄‍♀️ REPORT → A Ride Through AI Agentic Memory
subtitle: Beginner to Advanced AI Scientists and Engineers |  Today's word: Magic · Magie · 魔法 (まほう) · קסם
date: 2026; 11; 06
---

> [🎶](https://www.youtube.com/watch?v=xA43JUXgc1k) *"Personality is my medium."* — Gibson on Neuromancer

> [🎧](https://www.youtube.com/watch?v=mu0KNo8ULHE) *"The soul becomes dyed with the color of its thoughts."* — Marcus Aurelius on Mindset

> [🎵](https://www.youtube.com/watch?v=usQvdsTRVgE) *"I am yet to find a greater pleasure than the pleasure of creating and bringing something new into the world."* — Marina von Steinkirch on Thus Spoke the Cockroach

> [🎼](https://www.youtube.com/watch?v=rp8cImqAIPg) *"Yes: I am a dreamer. For a dreamer is one who can only find his way by moonlight, and his punishment is that he sees the dawn before the rest of the world."* — Oscar Wilde on The Critic as Artist

<br>

![](/blog/assets/dali.webp)

<br>

#### *Hello there, my anon friend!*

#### *This is Part II of III of our technical debt festival (check out **[Part I here](https://marina.nullstar.fun/blog/report_harness.html)**). Continuing our research for **[NULLSTAR](https://www.nullstar.games/)**'s **[PleiadesOS:ELECTRA](https://marina.nullstar.fun/blog/idea_nullstar.html)** module, today we'll take a deep dive into the current landscape of agentic memory. We'll be reading a selection of research and industry articles and examining the code of some of the most prominent projects.*

<br>

As I read through the material, below are my highlights — with a moderate attempt at coherence — for my personal inventory (and perhaps as a way to connect with other friendly AI scientists and builders out there who love talking about the same things). As always, please remember our rules:

**🤖 If these notes look cool to you, it's your ✦moral duty✦ to read the original resources.**
**🤖 Just another blog, but not your usual blog: they're living notes that I change as I fancy.**

<br>

---

# 0️⃣🪄 Open-Source AI Agentic Memory TL;DR

<br>

#### ✨ Let's begin our report with a summary of the most important considerations when building production-grade multi-agent memory systems, which we'll explore in detail throughout the following sections. ✨

<br>
<br>

![](/blog/assets/report_mem_00.webp)

<br>
<br>

![](/blog/assets/report_mem_0.webp)

<br>
<br>

| Category | [Mem0](https://github.com/mem0ai/mem0) | [Cognee](https://github.com/topoteretes/cognee) | [Zep](https://github.com/getzep/zep) / [Graphiti](https://github.com/getzep/graphiti) | [Letta](https://github.com/letta-ai/letta) | [LangChain](https://github.com/langchain-ai/langchain) / [LangMem](https://github.com/langchain-ai/langmem) | [Hindsight](https://github.com/vectorize-io/hindsight) | [Supermemory](https://github.com/supermemoryai/supermemory) | [Honcho](https://github.com/plastic-labs/honcho) | [OpenViking](https://github.com/volcengine/OpenViking) | 
| --------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | 
| **Core approach**| Hybrid vector + graph memory; extraction-based distilled facts with entity linking | Graph-native memory with ECL pipeline | Temporal knowledge graph + vector search engine | Self-editing agent memory with OS-inspired paging | Tool-based memory integrated directly with LangGraph | Compositional memory structured into four epistemically distinct networks | Personal knowledge repository combining memory and RAG | Managed peer-centric memory and user modeling layer | Filesystem-native context database unifying memory, resources, and skills |
| **Primary focus**| Long-term agent memory and cross-session personalization | Graph-based knowledge ingestion, structuring, and reasoning | Temporal knowledge, timeline tracking, and entity relationship changes | Stateful agents with self-managed memory blocks | Configurable memory managers and self-updating instructions | Fact/opinion separation, reflection, and multi-horizon reasoning | Knowledge vault for storing, searching, and retrieving unstructured data | Multi-peer perspective tracking, user profiling, and conversation history | Unified context management, cross-session memory, and reusable agent skills | 
| **Memory architecture** | Combines vector embeddings, graph relationships, and hierarchical scopes | ECL (Extract, Cognify, Load) pipeline into a hybrid graph-vector store   | Temporal knowledge graph (Graphiti engine); tracks exact validity ranges (`valid_at` / `invalid_at`) | Two-tier model: core memory (in-context RAM) + archival memory (disk vector store) | Configurable memory managers operating over any LangGraph `BaseStore` | Four logical networks: World, Experience, Observation, and Opinion | Personal knowledge vault backed by vector search and metadata stores | Peer-centric graph and profile representations updated via background reasoning | VikingFS virtual filesystem (`viking://` URIs) with vector indexing and hierarchical L0/L1/L2 context layers | 
| **Memory representation** | Structured memories with metadata tags | Hybrid graph-vector-relational structures | Temporal facts, entities, and timestamped edges | Editable memory blocks and archival vector | Configurable memory representations via custom memory managers | Structured networks separating objective facts, experiences, observations, and opinions | Vector segments, document chunks, user profiles, and metadata | Messages, peer relationship graphs, summaries, and inferred user profiles | Filesystem directories and files with L0 abstracts, L1 overviews, and L2 full content | 
| **Semantic memory** | Yes, native (user and global memory) | Yes, through extracted entities, relationships, and knowledge graphs | Yes, via Graphiti's temporal knowledge graph | Yes, via tiered core/archival/recall memory model | Yes (facts and user profiles) | Yes, through World and Observation networks | Yes, through extracted knowledge and profile chunks | Yes, through automatically maintained peer representations and facts | Yes; profile, preferences, entities, identity, and other extracted memories | 
| **Episodic memory** | Yes, via defined episodic/semantic hierarchy and metadata consolidation | Episodic ingestion via documents, conversations, and data points | Partial; event tracking within the graph with explicit temporal validities | Yes; agent self-manages what moves between archival memory on disk and core RAM    | Yes; past interactions surfaced via memory stores or few-shot examples | Yes; Experience network stores agent actions and interaction history | Yes; session messages and conversation history retention | Partial; persistent knowledge entries and session-derived project context, but no explicit episodic memory model | Yes; session archives, conversation history, events, and extracted experiences |
| **Procedural memory** | Architecture supports concept; dedicated tooling is early-stage | Not explicitly categorized as procedural memory | Not a dedicated feature | Yes, conceptually through editable core memory blocks | Yes, via self-updating instruction layers / prompt optimizer (a standout LangMem feature) | Not explicitly categorized as procedural memory | Not explicitly categorized as procedural memory | Not explicitly categorized as procedural memory | Yes, through reusable Skills and task trajectories |
| **License / open-source** | Apache 2.0 | Apache 2.0 | Graphiti: Apache 2.0 (open-source). Zep platform: managed-only; Community Edition deprecated | Apache 2.0 (core development has moved to the letta-code repo) | Open-source (LangChain ecosystem license; LangMem license not independently verified) | MIT open-source library | MIT for the public repo (SDKs and components); the self-hosted server is a separate non-open-source binary under a lite license limit | AGPL-3.0 open-source Python/TS SDK and server | AGPL-3.0 for the core; CLI and examples Apache 2.0; some framework adapters AGPL-3.0 or MIT | 
| **Self-hosting** | Yes; pip, npm, Docker, and local installs | Yes; embedded defaults require no external infra to start | Graphiti: yes, against Neo4j, FalkorDB, Kuzu, or Neptune. Zep core: managed-only | Yes, local/Docker deployment supported | Yes, developer provides and manages the underlying store | Yes, local stack or self-hosted FastAPI server | Yes; local self-hosted server binary (not open-source, lite license limit) | Yes, local stack or self-hosted FastAPI server via Docker Compose  | Yes; standalone server, CLI, and local deployment | 
| **Managed cloud / service** | Yes (Mem0 Cloud) | Yes (Cognee Cloud) | Yes (Zep Cloud) | Yes (Letta Cloud) | No (managed via LangGraph Platform) | Yes (Hindsight Cloud, pay-as-you-go; Enterprise tier available) | Yes (Supermemory Cloud) | Yes (Honcho managed API at `api.honcho.dev`)     | Yes; Volcengine-hosted OpenViking Service (SaaS) and a licensed self-managed/BYOC edition |
| **Multi-agent support** | Yes, via `agent_id` scoping alongside `user_id` | Supported through agent integrations and workspace organization | Not a native architectural concept | Yes, shared memory blocks between agents are core | Depends on LangGraph orchestration | Not natively optimized for multi-agent peer tracking | Not explicitly structured for multi-agent routing | Yes, native peer-based multi-agent architecture (tracks peers, groups, agents)   | Yes; agent-specific contexts, shared skills, and multi-agent integrations | 
| **Memory scopes** | Session, user, agent, organization, and custom scopes | Datasets, users, sessions, and workspace isolation | Graphs organized by subjects, users, teams, and topics | Core/archival namespaces and shared memory blocks | Namespaces, users, agents, and application-defined scopes | Agent-specific memory banks and entity-level isolation | Namespaces, containers, and user profiles | Workspaces, peers, and sessions | Resources, users, agents, peers, sessions, and skills | 
| **Multi-tenant support** | Built-in scopes (user, organization, agent) | Yes, Cognee Cloud supports isolated multi-tenant workspaces | Yes, enterprise context infrastructure | Organization-level shared memory and agent isolation | Depends on underlying store and application implementation | Application-managed isolation (Hindsight Cloud is multi-tenant) | Namespace-based organization; enterprise options available | Workspace and peer-based isolation | Yes; account, user, peer, and ACL-based isolation | 
| **Framework agnostic** | Yes | Yes | Yes | Yes | Partial; core memory managers and prompt optimizer work standalone, stateful storage is built on LangGraph `BaseStore` | Yes | Yes | Yes | Yes |
| **Graph memory support**| Yes; graph relationships and entity linking (paid tiers on the hosted platform, included in open-source) | Yes; native and central to architecture                                  | Yes; core architectural differentiator | No; archival memory is vector-based | No | Yes; temporal entity graph and traversal | Yes; knowledge graph of facts (vendor-stated) | Not a primary native knowledge graph architecture |  Context hierarchy and knowledge graph compilation; no native graph database as core storage |
| **Vector memory support** | Yes | Yes | Yes | Yes; archival retrieval | Yes | Yes; vector search with pgvector | Yes | Yes; semantic retrieval and indexed search                                                  | Yes; vector indexing and semantic retrieval | 
| **Hierarchical memory** | Yes; user / session / agent | Yes; graph, document, and summary organization | Yes; entity, relationship, and episodic layers | Yes; core vs. archival | Yes; profiles and collections | Yes; four logical memory networks | Yes; profiles, memories, and documents | Yes; peer representations, sessions, and messages | Yes; directory hierarchy with L0/L1/L2 progressive context layers | 
| **Automatic memory extraction** | Yes | Yes | Yes | Yes | Yes; background memory manager | Yes; retain pipeline | Yes | Yes; background reasoning and profile generation    | Yes; session-based extraction, compression, merging, and deduplication | 
| **Memory retrieval** | Semantic search + graph traversal + keyword matching | Graph, vector, lexical, and hybrid search | Graph search + vector search + full-text search | Core memory context + archival retrieval | Semantic retrieval + memory search APIs | Hybrid retrieval (vector, keyword, graph traversal, temporal filtering) | Knowledge/document retrieval (vector + metadata + RAG) | Peer-scoped semantic retrieval and curated context    | Semantic search, hierarchical retrieval, and reranking | 
| **Retrieval strategy** | Hybrid semantic + keyword + entity signals | Hybrid graph + vector + lexical retrieval | Hybrid graph + vector + full-text traversal | Core memory + archival retrieval | Semantic retrieval and memory search APIs | Hybrid multi-network search combining vectors, graphs, and temporal filters | Vector + metadata + RAG-oriented search | Peer-scoped semantic retrieval and context injection     | Intent analysis, scoped hierarchical retrieval, vector search, and optional reranking | 
| **Memory updates** | Automatic extraction and updates | Automatic extraction, graph refinement, and feedback improvement | Automatic extraction and temporal edge invalidation | Agent-controlled memory updates | Explicit tool calls / memory operations; optional background updates | Retain and reflect operations; updates to evolving facts and opinions | Automatic memory extraction and updates | Automatic reasoning and continuously updated peer representations   | Automatic memory extraction, LLM-based merging, deduplication, and filesystem updates | 
| **Entity relationships** | Yes | Yes| Yes | Limited| Limited| Yes; temporal entity relationships| Entity extraction and profile associations| Peer relationships and inferred connections| Yes; entity memories and knowledge graph compilation|
| **Temporal reasoning** | Limited (temporal search filtering added in 2026)| Yes; temporal search and validity-aware knowledge| Strong; tracks changing facts over time with valid/invalid dates| Limited| Limited| Yes; temporal filtering and tracking of evolving facts| Evaluated in benchmarks| Tracks changing people, preferences, and patterns over time  | Yes; events, experiences, session histories, and temporal context|
| **Multi-hop reasoning**|  Yes| Yes; graph traversal and graph-completion modes| Yes| Not a dedicated native feature| Application-dependent| Yes; graph-based reasoning and reflection| Evaluated on multi-hop conversational recall| Natural-language reasoning over accumulated peer knowledge| Knowledge graph compilation and hierarchical context retrieval| 
| **API support** | Yes| Yes; Python SDK and REST API| Yes| REST API| Integrated memory APIs| Yes; REST API, Python / Node / Go clients, and MCP server| Developer API| Yes; REST API and SDK     | Yes; Python, Go, and TypeScript SDKs, CLI, and HTTP API| 
| **Primary integration** | Framework-agnostic; MCP support (OpenMemory MCP, hosted Platform MCP)| LangGraph, OpenClaw, MCP| MCP server for Claude/Cursor; direct Neo4j/FalkorDB integration| Native agent runtime, API, and CLI| LangGraph specifically | Python/Node/Go SDKs, MCP server, and custom agent integrations| Browser extension, notes, documents, web content| API-oriented, MCP, and agent-framework integrations     | MCP, CLI, and agent integrations including Claude Code, Codex, Cursor, and OpenClaw|
| **Integration capabilities** | LangChain, LlamaIndex, CrewAI, AutoGen, and custom loops| LangGraph, OpenClaw, MCP, CrewAI, OpenAI Agents SDK, Google ADK, and n8n | CRM and enterprise data integration; Neo4j / FalkorDB| Agent runtime integration| LangGraph ecosystem| Python, Node, Go, MCP, and custom agent integrations| Browser extension, web content, and notes| Custom integration, MCP, and agent frameworks  | MCP, Python, HTTP, CLI, LangChain/LangGraph, and agent plugins (Claude Code, Codex, Cursor, TRAE, OpenCode, Hermes) | 
| **Enterprise compliance** | Yes (SOC 2 Type I and HIPAA-ready badges, GDPR options; enterprise tier adds SSO, audit logs, on-prem)   | Enterprise and cloud deployment options | Yes (Enterprise governance via Zep Cloud)| Not publicly stated (unverified) | No (relies on LangGraph platform compliance)| Self-hosted compliance model; Cloud/Enterprise adds SSO, audit logs, GDPR tooling, and vendor-stated SOC 2 | Enterprise deployment options available| Organization-level controls and enterprise deployment options (certifications not verified)   | Enterprise deployment, ACL, and self-managed/BYOC edition |
| **Data residency control** | Self-hosting or region-specific cloud | Self-hosting (Docker/Python) or regional Cognee Cloud | Self-hosted graph database (Neo4j/FalkorDB) or Zep Cloud | Self-hosted local/Docker or Letta Cloud | Determined by developer's choice of underlying data store| Self-hosted via Docker / FastAPI server, or Hindsight Cloud / Enterprise (BYOC and on-prem options)        | Self-hosted (local-first) or Supermemory Cloud| Self-hosted via Docker / FastAPI or managed `api.honcho.dev`    | Self-hosted server and storage with configurable deployment; hosted service currently in China (Beijing)            |
| **Long-memory benchmarks** | Published: LoCoMo (92.5%); LongMemEval (94.4%); BEAM (64.1%) | Published: BEAM 100K/10M (0.79 correctness score) | Published: LoCoMo (94.7%); LongMemEval (90.2%) | Published: LoCoMo (74.0% via filesystem baseline) | Published (LangMem): LoCoMo / Bench'd (58.1%–60.0%); LongMemEval (Pending / unverified) | Not publicly benchmarked | Partial: LongMemEval | No comparable public long-memory benchmarks | Published: LoCoMo (82.08% OpenClaw; 82.86% Hermes; 80.32% Claude Code) |
| **Testing and evaluation** | Dedicated harness for LoCoMo, LongMemEval, and BEAM | Built-in evaluation harness for BEAM, LoCoMo, tau2-bench, and custom RAG | Evaluation framework & harness for LoCoMo, LongMemEval, and auto-search depth | Open-source agent memory leaderboard harness (`letta-leaderboard`) | Bench'd harness integrations & custom unit/integration tests | Custom, ad hoc | Partial; mostly relevance-oriented | No comparable public long-memory benchmarks  | Dedicated memory evaluation harness; LoCoMo, tau2-bench, and RAG evaluations | 
| **Token efficiency** | ~6,956 tokens/query on LoCoMo; ~6,787 tokens/query on LongMemEval | Efficient via graph completion & targeted hybrid chunk retrieval | ~2,680–5,760 tokens/query on LoCoMo; ~4,408 tokens/query on LongMemEval | Context-dependent; raw file injection relies on LLM context limits | Variable; relies on `SummarizationMiddleware` or context slicing | Highly variable per summarization strategy | Not disclosed | Full details not publicly benchmarked | Reported 34.3–91.0% reduction in input tokens across agent integrations through progressive context loading |
| **Long-term factual recall** | High; 92.5% on LoCoMo & 94.4% on LongMemEval | High; strong across multi-turn shift dialogues & temporal updates | High; 95.6% temporal & 94.0% multi-hop recall on LoCoMo | Moderate; limited to window/file size without specialized index | Moderate; depends on retrieval configuration and prompt/store design | Medium; depends on prompt and heuristics | Good for RAG facts; less focused on temporal evaluations | -  | Good; 80–83% LoCoMo accuracy across three agent integrations |
| **Cost at scale** | Bounded; ~6.9K tokens per retrieval | Low-to-moderate; optimized graph completion reduces redundant LLM calls | Bounded; auto-search reduces token footprint by 53% | Low infrastructure cost, but higher context token usage per query | Variable; LLM summarization and frequent vector store rewrites add overhead | Grows with history and summarization | Tied to RAG usage and context sizes | - |Reduced inference costs through progressive retrieval and lower context consumption; requires infrastructure and model providers |
| **Scalability** | Cloud managed or self-hosted API with multi-vector DB support | Scalable distributed processing via Modal & local graph backends | Production-ready managed cloud or self-hosted enterprise infrastructure | Local file-based state or managed agent server instance | Dependent on underlying vector DBs, PostgreSQL, or LangGraph Cloud storage | - | Primarily personal knowledge management | -  | Unified context filesystem, recursive retrieval, scoped namespaces, and self-hosted or managed deployment | 
| **Main advantage** | Flexible hybrid memory with automatic extraction and graph relationships | Native graph architecture and hybrid storage | Temporal relationship tracking and multi-hop reasoning | Agent autonomy and editable memory | Fine-grained developer control over memory operations | Conversation summarization and context management | Personal knowledge consolidation and retrieval | Managed memory service for agent builders | Unified context infrastructure combining resources, memories, and skills with hierarchical retrieval and progressive loading | 
| **Main limitation** | Graph features require additional configuration; extraction quality depends on the underlying LLM | Ingestion requires dedicated graph creation/LLM parsing step | More complex infrastructure; graph traversal can become expensive; ongoing schema maintenance | Requires adopting its agent runtime; tool-driven memory management adds complexity | LangGraph dependency; explicit tool invocation; self-hosted infrastructure management | Depends on summarization strategy; no publicly benchmarked long-memory performance | Limited multi-tenancy, production agent infrastructure, managed hosting, and developer API integration | No comparable public long-memory benchmarks; cloud-centric infrastructure |  Requires additional infrastructure and model configuration; hierarchical summaries introduce processing and freshness considerations |


<br>
<br>

---

# 1️⃣🪄 Open-Source Production Memory Systems

<br>

#### ✨ Let's kick off our studies with an in-depth look at the projects pushing the state of the art in agentic memory systems. ✨

<br>
<br>

## 🟪 [Mem0 (Python)](https://mem0.ai/research) (A Memory API with Configurable Storage)

<br>

> *A memory architecture built to scale, which pulls out the important information from ongoing conversations, consolidates it, and retrieves it later. Its pipeline runs in two phases. In the **extraction phase**, Mem0 looks at a conversation summary together with the most recent messages and produces candidate memories. In the **update phase**, it checks those candidates against what is already stored, and an LLM decides which of four operations to apply: add a new memory when it is entirely different from anything stored, update an existing memory by enriching or extending it, delete memories that conflict with the new one, or make no change at all.*

> *Because of this consolidation step, Mem0 doesn't simply keep appending memories, so its store stays coherent as facts change over time. The base version stores memories as natural-language entries in a vector database.*

> *An enhanced variant, Mem0g, stores memories as a directed labeled graph to capture more complex relationships between the elements of a conversation, and it adds a `Conflict Detector` that flags overlapping or contradictory nodes and edges, plus an `Update Resolver` that decides whether to merge, invalidate, or skip them. The result is a memory layer that agents can plug into to stay consistent across many sessions without carrying their full conversation history in context.*

<br>

---

### [Mem0: Building Production-Ready AI Agents with Scalable Long-Term Memory (P. Chhikara et al., 2025)](https://arxiv.org/pdf/2504.19413)

<br>

> *Human memory is a foundation of intelligence — it shapes our identity, guides decision-making, and enables us to learn, adapt, and form meaningful relationships.*

<br>

- Unlike humans, who dynamically integrate new information and revise outdated beliefs, LLMs effectively “reset” once information falls outside their context window.

- Context windows prove insufficient for two critical reasons. First, as meaningful human-AI relationships develop over weeks or months, conversation history inevitably exceeds even the most generous context limits. Second, real-world conversations rarely maintain thematic continuity.

- A robust AI memory should selectively store important information, consolidate related concepts, and retrieve relevant details when needed—mirroring human cognitive processes.

- Introduce two memory architectures for AI agents: 1) Mem0 implements a novel paradigm that extracts, evaluates, and manages salient information from conversations through dedicated modules for memory extraction and updating; 2) Mem0g extends this foundation by incorporating graph-based memory representations, where memories are stored as directed, labeled graphs with entities as nodes and relationships as edges. By explicitly modeling both entities and their relationships, it supports more advanced reasoning across interconnected facts (e.g., when queries require navigating complex relational paths across multiple memories).

- Through comprehensive evaluations on the LOCOMO benchmark, we compare our approaches against six baseline categories: (i) established memory-augmented systems, (ii) retrieval-augmented generation (RAG) with varying chunk sizes and k-values, (iii) a full-context approach that processes the entire conversation history, (iv) an open-source memory solution, (v) a proprietary model system, and (vi) a dedicated memory management platform.

- Outperform all existing memory systems across four question categories: single-hop, temporal, multi-hop, and open-domain.

<br>

#### Mem0

<br>

> *Incremental processing paradigm with a pipeline containing two phases: extraction and update.*

<br>

![](/blog/assets/report_mem_1.webp)

<br>

1️⃣ The extraction phase initiates upon ingestion of a new message pair (the current and the preceding one). This pair consists of a user message and an assistant response, capturing a complete interaction unit. To establish appropriate context for memory extraction, the system employs two complementary sources: 1) a conversation summary retrieved from the database that encapsulates the semantic content of the entire conversation history, and 2) a sequence of recent messages from the conversation history, where m is a hyperparameter controlling the recency window. To support context-aware memory extraction, we implement an asynchronous summary generation module that periodically refreshes the conversation summary (which operates independently of the main processing pipeline).

2️⃣ The update phase evaluates each candidate fact against existing memories to maintain consistency and avoid redundancy. It determines the appropriate memory management operation for each extracted fact. For each fact, the system first retrieves the top s semantically similar memories using vector embeddings from the database. The retrieved memories and the candidate fact are presented to the LLM. The LLM determines which of four distinct operations to execute: `ADD`, `UPDATE`, `DELETE`, `NOOP`.

<br>

#### Mem0g

<br>

![](/blog/assets/report_mem_2.webp)

<br>

> Mem0g's two-step pipeline implements a graph-based memory approach that captures, stores, and retrieves contextual information for natural language interactions. The extraction process leverages LLMs to transform unstructured text into structured graph representation.

<br>

- Memories are represented as a directed labeled graph `G = (V, E, L)`, where:

```
1. Nodes V are entities
2. Edges E are relationships between entities
3. Labels L are semantic types to nodes
```

<br>

- Each entity node contains three components: 1) an entity type classification that categorizes the entity, 2) an embedding vector that captures the entity’s semantic meaning, and 3) metadata including a creation timestamp.

- The entity extractor module processes the input text to identify a set of entities along with their corresponding types.

- A relationship generator component derives meaningful connections between entities, establishing a set of relationship triplets that capture the semantic structure of the information (LLM-based modules). It works by examining linguistic patterns, contextual cues, and domain knowledge to determine how entities relate to one another.

- For each new relationship triple, compute embeddings for both source and destination entities, then search for existing nodes with semantic similarity above a given threshold.

- To maintain a consistent knowledge graph, implement a conflict detection mechanism that identifies conflicting relationships.

- The memory retrieval functionality implements a dual-approach strategy for optimal information access. The entity-centric method first identifies key entities within a query, then leverages semantic similarity to locate corresponding nodes in the knowledge graph.

- It systematically explores both incoming and outgoing relationships from these anchor nodes, constructing a comprehensive subgraph that captures relevant contextual information. Complementing this, the semantic triplet approach encodes the entire query as a dense embedding vector. This query representation is matched against textual encodings of each relationship triplet in the knowledge graph. This dual approach enables both targeted, entity-focused questions and broader conceptual queries with equal effectiveness.

- The system uses Neo4j as the underlying graph database.

<br>

#### Experimental Setup

<br>

- The LOCOMO (Maharana et al., 2024) dataset is designed to evaluate long-term conversational memory in dialogue systems. Questions are categorized into multiple types: single-hop, multi-hop, temporal, and open-domain.

- Previous research in conversational AI (Goswami, 2025; Soni et al., 2024; Singh et al., 2020) has predominantly relied on lexical similarity metrics such as F1 Score (F1) and BLEU-1 (B1). However, these metrics exhibit significant limitations when evaluating factual accuracy in conversational contexts. To address these shortcomings, we use LLM-as-a-Judge (J) as a complementary evaluation metric. Due to the stochastic nature of J evaluations, we conducted 10 independent runs for each method on the entire dataset.

- We systematically track token consumption and latency (search latency and total latency).

- We compare against six distinct categories of baselines that represent the current state of conversational memory systems: 1) Established LOCOMO Benchmarks, 2) Open-Source Memory Solutions, 3) Retrieval-Augmented Generation (RAG), 4) Full-Context Processing, 5) Proprietary Models, and 6) Memory Providers.

<br>

#### Evaluation Results

<br>

![](/blog/assets/report_mem_3.webp)

<br>

- In temporal reasoning, Mem0g substantially outperforms other methods, validating that structured relational graphs excel in capturing chronological relationships and event sequences. The presence of explicit relational context significantly enhances Mem0g’s temporal coherence, outperforming Mem0’s dense memory storage and highlighting the importance of precise relational representations when tracking temporally sensitive information.

<br>

![](/blog/assets/report_mem_4.webp)

<br>

- As conversation length increases, full-context approaches suffer from exponential growth in computational overhead. This increase in input chunks leads to longer response times and higher token consumption costs.

- In contrast, memory-focused approaches like Mem0 and Mem0g maintain consistent performance regardless of conversation length, making them substantially more viable for production-scale deployments where efficiency and responsiveness are critical.

- Future research directions include optimizing graph operations to reduce the latency overhead in Mem0g, exploring hierarchical memory architectures that blend efficiency with relational representation, and developing more sophisticated memory consolidation mechanisms inspired by human cognitive processes.

- Additionally, extending our memory frameworks to domains beyond conversational scenarios, such as procedural reasoning and multimodal interactions, would further validate their broader applicability.

<br>

---

### [Memory vs. Context Window](https://mem0.ai/library/context-engineering/context-window-is-ram-not-storage-why-most-agent-failures-happen-how-to-fix-them-in-2026)

<br>

![](/blog/assets/report_mem_11.webp)

<br>

- The context window is not a database. It behaves like RAM, and when you build against it as if it were storage, you get failures that look like model problems but are not.

<br>

| Property | Context Window | Computer RAM | Persistent Storage |
| --- | --- | --- | --- |
| Volatility | Clears at session end | Clears at the process end | Survives indefinitely |
| Capacity effect | Degrades before full | Binary: has capacity or does not | Scales with hardware |
| Access cost | Full re-read every call | Direct address lookup | Seek and read overhead |
| Update mechanism | Append only | Random write | Read-modify-write |
| Failure mode | Burial and attention dilution | Overflow crash | Corruption or loss |
| Best for | Active reasoning and recent context | Running computation | Facts, preferences, history |

<br>

```
def route_memory(content: str, user_id: str, session_id: str) -> str:
    """
    Classify information at ingestion time and route to the correct store.
    Returns: 'working' | 'persistent' | 'task_state'
    """
    if is_hard_constraint(content):
        persistent_store.write(
            content, user_id=user_id, category="hard_constraints"
        )
        return "persistent"

    if is_stable_preference(content):
        persistent_store.write(
            content, user_id=user_id, category="preferences"
        )
        return "persistent"

    if is_task_state(content):
        task_store.write(
            content, session_id=session_id, ttl_days=7
        )
        return "task_state"

    return "working"
```

<br>

| Dimension | Working Memory (RAM layer) | Persistent Memory (Storage layer) |
| --- | --- | --- |
| Lifetime | Current task or session | Indefinitely or until TTL expires |
| Retrieval | Full context on every LLM call | Semantic search, top-K relevant facts |
| Update pattern | Append during task, clear at close | Extract stable facts, write explicitly |
| Failure mode | Burial, dilution, instruction loss | Staleness, over-persistence, and extraction errors |
| Token cost | Scales with task depth | Fixed retrieval budget, typically 5 to 10 facts |
| Example content | "Step 3 result: found 4 matches." | "User prefers Python with type hints." |

<br>

- Failure modes when the layers are mixed: 1) token bloat and cost explosion, 2) preference dilution and safety rule violations, 3) contradictory behavior mid-session, 4) inconsistent behavior across sessions.

- Design patterns to fix: 1) hard constraint pinning, 2) total result summarization before injection, 3) active modifier re-injection, 4) session-close extraction, 5) structured compression with external memory.

- Within-session metrics: 1) constraint adherence rate by turn depth, 2) exact value accuracy, 3) working memory token footprint over time.

- Cross-session metrics: 1) preference persistence rate, 2) constraing survival after compression.

<br>

---

### [Context Engineering](https://mem0.ai/library/context-engineering/context-engineering-for-ai-agents-how-to-route-queries-to-memory)

<br>

- A context query is any user input where the correct response depends on prior interactions, user state, or historical data, and not just the current message.

- From the agent's perspective, these queries require: 1) Detecting that the user expects continuity with the past., 2) Locating the right memory slice that satisfies this expectation., 3) Providing that memory to the model in a structured way.

- In production, context queries show up in at least three patterns: 1) User profile and preferences: These include personal details, preferences, and constraints that shape decisions and responses., 2) Session and task state: Plans, intermediate results, and previous tool outputs that affect the current step., 3) Organizational or account context: Shared documents, configs, and policies relevant to a specific workspace or project.

- Incoming user message is classified into routing choices for direct answer, tools, or Mem0-backed memory operations:

<br>

![](/blog/assets/report_mem_14.webp)

<br>

- Mem0 attaches memory operations to identities, agents, and sources, and exposes retrieval and write APIs that agents can call deterministically. 

<br>

![](/blog/assets/report_mem_15.webp)

<br>

- Instead of multiplexing all memory into a single embedding space, agents can label entries and then selectively query them.

- Common metadata fields: `memory_type`: "preference", "task_state", "observation", "note"’; `scope`: "user", "project", "global"; `project_id`, `workspace_id`, `conversation_id`: Identifiers for task or organization-scoped memories.

<br>

| Routing approach | How it works | Pros | Cons |
| --- | --- | --- | --- |
| Rule-based keyword detection | Match phrases like "last time" or "remember". | Simple to implement; predictable behavior. | Misses subtle cues; language dependent. |
| LLM-based intent classification | Use a small model to label the message intent. | Captures nuances; adaptable. | Adds latency and cost; needs prompt maintenance. |
| Heuristic based on thread size | Retrieve memory when the conversation exceeds N tokens. | Easy thresholding. | Not aligned with user expectations. |
| Always retrieve N recent items | Fetch the last K memories for the user or project. | Very simple; low overhead. | Includes irrelevant context; risks confusion. |
| Hybrid rules and LLM | Rules for obvious cases, LLM for ambiguous ones. | Good recall and precision. | More complex orchestration. |
| Tool-call-based routing | LLM decides which memory search tool to call. | Flexible; centralized logic in LLM. | Harder to debug and constrain. |

<br>

- Mem0 supports patterns such as: 1) Incremental summarization: Periodically summarizing long conversation histories into compact memory entries tagged as a summary; 2) Conflict resolution policies: Storing multiple preferences with timestamps and tags so that the agent can favor the most recent or most explicit entry; 3) Context templates: Standardizing how memories are formatted into prompts; 4) Multi-tenant separation: Using metadata and identity fields to enforce hard boundaries between tenants, while still allowing shared agent memory.

<br>

---

### [Context Compression vs Memory in AI Agents](https://mem0.ai/library/context-engineering/context-compression-vs-memory-in-ai-agents)

<br>

- Context compression is any automated process that shrinks an agent's conversation history when it approaches the token limit.

<br>

Six strategies are in production use:

➡️ Truncation: Drop the oldest messages. Breaks immediately when the agent needs a constraint or decision from earlier in the session.
➡️ Rolling summarization: When history exceeds a threshold, send the full history to a model and replace it with a prose summary. Loses precision across multiple compression cycles.
➡️ Anchored incremental summarization: The current state of the art. The compressor maintains a persistent structured document and extends it per eviction span rather than regenerating from scratch. 
➡️ Structured handoffs: A fixed schema for the compressed summary: files modified, tools called, decisions made, in-progress state, constraints, preferences. 
➡️ Selective pruning: Remove verbose content before any model call. Primary target: tool outputs. No LLM call required. High token savings per compute cost.
➡️ Embedding-based compression: Store historical turns as dense embeddings and reconstruct only semantically relevant segments. Achieves 80-90% token reduction.

<br>

External memory is a storage layer that lives entirely outside the context window. Facts are extracted during a conversation, persisted to a store, and retrieved into future sessions based on relevance:

➡️ Vector stores: Memories are embedded and retrieved by semantic similarity. 
➡️ Graph stores: Memories stored as entities and relationships. 
➡️ Structured stores: SQL or key-value for preference tracking, metadata filtering, temporal queries. Useful when memories carry structured attributes that need to be queried independently of their content.

<br>

---

### [Context Engineering in Multi-Turn Agents](https://mem0.ai/library/context-engineering/context-engineering-in-multi-turn-ai-agents)

<br>

- There are five established techniques for managing context growth in multi-turn agents. Most production systems combine more than one.

<br>

| Technique | What it does | What it costs | Best for |
| --- | --- | --- | --- |
| Sliding window truncation | Keeps only the N most recent messages, dropping everything older. | Continuity. A reference from turn 3 is gone by turn 20. | Agents where recency dominates, such as support bots, CLI assistants, and short-lived task agents. |
| Conversation summarization | Replaces the oldest K turns with a model-generated summary block once the context reaches a threshold. | Fine-grained detail. Compression is lossy, and specifics may not survive. | Long advisory or research sessions where the thread of reasoning matters more than exact wording. |
| Selective tool output pruning | Extracts or truncates a tool result to the relevant portion before appending it. | An extra model call to decide what is relevant. | Agents with verbose tools, such as search, file reads, and large API responses. |
| Token budget management | Allocates a fixed share of the context window to each component upfront and triggers compression when one overruns. | Upfront design work and ongoing tuning. | Any agent expected to run long sessions in production. |
| Retrieval-augmented context injection | Stores prior exchanges in an index and retrieves only those relevant to the current message. | Retrieval infrastructure, plus the risk of missing context that a naive keyword match would not surface. | Agents where conversation length is unbounded and the context window must stay flat. |

<br>

- Every context engineering technique (truncation, summarization, budget management, retrieval) operates on the messages that exist within the current process.

- Context engineering solves the within-session problem. It cannot solve the across-session problem.

- Mem0 provides the persistent memory layer that sits outside the context window and extends across sessions. At the end of each agent turn, relevant exchanges are stored with the user’s identifier. At the start of the next turn, the most relevant memories are retrieved and injected into context before the agent processes the user’s message.

<br>

---

### [Your Agent's Memory Is Just a File?](https://mem0.ai/library/agent-memory/your-ai-agents-memory-is-just-a-file-thats-the-problem)

<br>

File-based memory fails because files can't do the seven things a growing memory store needs to do:

1️⃣ Context window ceiling: files are loaded wholesale
2️⃣ No semantic search; grep can’t reason
3️⃣ No temporal reasoning, files don’t know when facts stopped being true
4️⃣ Race conditions, concurrent writes silently lose data
5️⃣ No conflict resolution, contradictions coexist, LLM guesses
6️⃣ No multi-tenancy, rebuilding access control on mkdir
7️⃣ No forgetting, signal-to-noise degrades monotonically

<br>

- Claude Code’s `MEMORY.md` file doesn’t have an infinite capacity. Content beyond a certain size gets silently truncated. No error. No warning. The memories you added most recently (at the bottom of the file) just disappear from the agent’s view. 

- A dedicated memory system does selective retrieval. It takes the current query, computes semantic similarity against the memory store, and injects only the 5-10 most relevant memories. Mem0 uses roughly 2K tokens per query regardless of whether the total memory store has 100 or 100,000 entries. The difference between loading everything and retrieving what’s relevant is the difference between `O(n)` and `O(1)` for context window consumption.

- This is the lost update problem. It’s literally the first thing you learn about in a database systems course. Databases solved it decades ago with transactions, locks, and MVCC (Multi-Version Concurrency Control). Filesystem-based memory has none of this.

<br>

![](/blog/assets/report_mem_17.webp)

<br>

- Just as the database world is split into OLTP, OLAP, graph, time-series, and document databases, agent memory will specialize. Some workloads need fast key-value lookup. Others need temporal graphs. Others need semantic search. The best systems will handle multiple access patterns.

- Storing and retrieving memories will become table stakes. The differentiation will move to higher-level capabilities: reasoning about what to remember, when to forget, how to resolve conflicts, and how to connect memories into coherent knowledge.

<br>

---

### [Memory Eviction and Forgetting](https://mem0.ai/library/agent-memory/memory-eviction-and-forgetting-in-ai-agents)

<br>

- An agent's recall quality is bounded not by what it can store but by how well it can suppress everything irrelevant.

- Robert and Elizabeth Bjork came up with the New Theory of Disuse for memory. They distinguished two indices: storage strength, which is how well a memory is laid down, and retrieval strength, which is how easily it can be accessed right now. Storage strength does not decay. Retrieval strength does, and that decay is adaptive rather than accidental.

<br>

- The four eviction strategies:

1️⃣ Age-based / TTL: The simplest. Drop entries older than `N` days regardless of how often they have been accessed. The cognitive analogue of trace decay.
2️⃣ LRU / recency: Drop entries unused for `N` days. Each access resets the clock. This is the closest analogue to Bjork's retrieval-strength decay. LRU works well for high-churn assistants where the relevant context shifts quickly.
3️⃣ Salience scoring: Attach an importance score at extraction time, set either by the LLM that pulled the fact out of conversation or by explicit user signals. Drop entries whose score falls below a threshold.
4️⃣ Semantic supersession / update: When a new fact contradicts an old one, replace or mark the old as superseded. Most useful for preference and profile data, where what changes is not the topic but the value.

<br>

| Strategy | What triggers eviction | Cognitive analogue | Best for | Worst for |
| --- | --- | --- | --- | --- |
| TTL / age | Wall-clock age exceeds N | Trace decay | Compliance, PII retention | Long-lived true facts |
| LRU / recency | Time since last access | Bjork retrieval-strength decay | High-churn assistants | Rare-but-critical facts |
| Salience scoring | Score below threshold | Emotional, flashbulb effects | High-signal extraction pipelines | Drift in rater calibration |
| Semantic supersession | New fact contradicts old | Belief revision, interference resolution | Preference and profile data | Cases needing audit history |

<br>

---

### [The Modal Model of Memory](https://mem0.ai/library/agent-memory/the-modal-model-of-memory-what-ai-agents-can-learn-from-cognitive-science)

<br>

- The Atkinson-Shiffrin Modal Model describes three memory stores and the processes that connect them.

- The sensory register holds raw perceptual input for a fraction of a second - visual information persists for roughly half a second (iconic memory), auditory information for slightly longer (echoic memory). The vast majority of what enters the sensory register decays immediately. Only what receives attention moves forward.

- The short-term store holds attended information for active processing. Without active maintenance through rehearsal, information in the short-term store fades within 15 to 30 seconds. Duration and capacity are both constrained.

- The long-term store is, for practical purposes, unlimited in both capacity and duration. Information enters through encoding from the short-term store. It does not decay in the way short-term memories do, but it can become harder to retrieve through interference from other memories.

- Not all information is worth remembering, and the system uses priority scoring and contextual relevance to decide what gets stored and what gets surfaced. The attentional gate happens before inference, not during it.

- Proactive interference occurs when older memories make it harder to retrieve newer ones. Retroactive interference works in the opposite direction: new information disrupts access to older memories.

- A memory store that never forgets anything gradually becomes a noise machine. 

- Human memory makes this decision based on emotional salience, relevance to existing knowledge, and frequency of rehearsal. AI memory systems need an equivalent selection mechanism.

<br>

---

### [Programmatic Memory Management](https://mem0.ai/library/agent-memory/programmatic-memory-management-for-ai-agents-with-mem0)

<br>

- Production AI agents do not fail because they lack a context window. They fail because their memories grow unstructured, stale, and noisy over time.

<br>

- Mem0 stores each memory as a small, self-contained document that sits between structured database records and raw text logs. The core fields follow a common pattern:

➡️ `id`: unique identifier for the memory
➡️ `content`: actual text of the memory
➡️ `metadata`: JSON object that can include user ID, tags, source, timestamps, and domain-specific fields
➡️ `created_at` and `updated_at`: temporal boundaries
➡️ `embedding` or `vector` field: for semantic search
➡️ `score` or similarity indicators: returned in search results
      
<br>

![](/blog/assets/report_mem_5.webp)

<br>

```
import os
from mem0 import MemoryClient

# Configure your Mem0 API key
os.environ["MEM0_API_KEY"] = "YOUR_API_KEY"

# Initialize the client
mem_client = MemoryClient()

def store_user_preference(user_id: str, preference_text: str):
    memory = mem_client.add(
        content=preference_text,
        metadata={
            "user_id": user_id,
            "type": "preference",
            "source": "agent_inference",
        }
    )
    return memory["id"]
```

<br>

From an API perspective, production agents usually need six concrete behaviors:

➡️ Search by semantic similarity
➡️ Search with filters (user ID, tags, time ranges)
➡️ Update a single memory by ID
➡️ Update a group of memories by filter criteria
➡️ Soft delete so the memory stops influencing the agent but remains recoverable
➡️ Hard delete for compliance and data minimization

<br>

![](/blog/assets/report_mem_10.webp)

<br>

```
def search_user_memories(user_id: str, query: str, limit: int = 5):
    results = mem_client.search(
        query=query,
        filters={
            "user_id": user_id,
        },
        limit=limit,
    	)
    return results

def upsert_contact_preference(user_id: str, new_preference: str):
    # Step 1: search existing preference memories
    existing = mem_client.search(
        query="contact preference",
        filters={
            "user_id": user_id,
            "type": "preference",
        },
        limit=1,
    )

    if existing:
        # Step 2: update the first matching memory
        memory_id = existing[0]["id"]
        return mem_client.update(
            id=memory_id,
            content=new_preference,
            metadata={
                **existing[0]["metadata"],
                "updated_by": "agent",
            },
        )
    else:
        # Step 3: create a new memory
        return mem_client.add(
            content=new_preference,
            metadata={
                "user_id": user_id,
                "type": "preference",
                "source": "agent_inference",
            },
        )

def soft_delete_memory(memory_id: str):
    # Retrieve existing memory details
    existing = mem_client.get(id=memory_id)

    if not existing:
        return None

    return mem_client.update(
        id=memory_id,
        metadata={
            **existing["metadata"],
            "is_active": False,
            "deleted_at": existing.get("deleted_at") or existing["updated_at"],
        },
    )
```

<br>

![](/blog/assets/report_mem_12.webp)

<br>

---

### [The Architecture of Remembrance](https://mem0.ai/library/agent-memory/what-is-ai-agent-memory)

<br>

- Memory Stream is a comprehensive list of an agent's experiences and Reflections are periodic, high-level abstract thoughts generated by the agent. The agent does not just retrieve raw observations, it synthesizes them into insights.

<br>

#### Vector Databases

<br>

- The most common implementation of agent memory today relies on Vector Databases. When text is ingested, be it a user query, a document, or a log file, it is passed through an embedding model (like OpenAI's text-embedding-3). This model converts the semantic meaning of the text into a high-dimensional vector, a list of floating-point numbers. 

- These vectors are stored in a database like Pinecone, Weaviate, or Qdrant. When the agent needs to "remember" something, it converts the current query into a vector and performs a similarity search (often using Cosine Similarity) to find the nearest vectors in that high-dimensional space.

<br>

| Feature / Dimension | [Pinecone](https://github.com/pinecone-io) | [Qdrant](https://github.com/qdrant/qdrant) | [Weaviate](https://github.com/weaviate/weaviate) | [Milvus](https://github.com/milvus-io/milvus) | [Chroma](https://github.com/chroma-core/chroma) | [LanceDB](https://github.com/lancedb/lancedb) | [pgvector (PostgreSQL)](https://github.com/pgvector/pgvector) | [Redis (Redis Vector Search)](https://github.com/redis/redis) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Category** | Dedicated & Managed | Dedicated & Managed | Dedicated & Managed | Dedicated & Managed | Embedded & Lightweight | Embedded & Lightweight | Extension Solution (Relational) | Extension Solution (In-Memory) |
| **Deployment Type** | Managed Cloud SaaS | Open-source / Managed Cloud | Open-source / Managed Cloud | Open-source / Managed Cloud (Zilliz) | Embedded / Local / In-memory | Embedded / Serverless | Database Extension | In-Memory / Managed |
| **Best For** | Fully managed cloud SaaS, rapid prototyping, hands-off scaling | High performance, custom metadata filtering, self-hosting or managed cloud | Hybrid search (vectors + keyword BM25), rich multi-modal memory | Enterprise-scale deployments with billions of memory vectors | Local prototyping, single-agent apps, Python-native environments | Disk-based storage, multi-modal memories, embedded serverless agents | Teams already running PostgreSQL wanting unified transactional & vector memory | Ultra-fast sub-millisecond short-term context & active agent session state |
| **Why it fits Agent Memory** | Serverless model (separates compute/storage) that auto-scales; strong native metadata filtering (`user_id`, `session_id`, `timestamp`); built-in namespace isolation | Built with Rust; famous for **payload-based filtering** and memory efficiency; handles complex logical filters fast without sacrificing recall; supports local embedded via `Qdrant Edge` | Object-oriented; natively handles hybrid search out of the box, combining semantic similarity with exact keyword lookup (dates, names, codes) | Open-source, cloud-native; completely decouples storage and compute; handles massive throughput & distributed tenant sharding efficiently | Extremely simple `pip install chromadb` setup; runs in-memory or persisted to disk locally; default choice for AutoGen, CrewAI, LangChain experimentation | Serverless/embedded engine backed by Apache Arrow/Lance format; queries disk directly with zero-copy reads; drastically reduces RAM overhead for desktop/edge agents | Eliminates need to sync external vector DB with main DB; relational user tables, structured logs, & vector embeddings live together in one `ACID`-compliant system | Combines ephemeral cache (working memory), key-value operational state, and vector similarity search into a single high-speed in-memory engine |
| **Tradeoffs** | Proprietary closed-source engine; cost can escalate under heavy payload mutations | Self-hosting at massive cluster scales requires Rust/Kubernetes devops maturity | Higher memory usage per node compared to pure vector-only systems like Qdrant | High setup complexity for self-hosted instances compared to simpler engines | Not natively designed for high-concurrency production or multi-node clusters out of the box | Younger ecosystem for cloud-native orchestration compared to Pinecone or Qdrant | Pure HNSW vector indexing scale and latency lag behind dedicated engines at high vector counts | RAM-intensive storage makes ultra-long-term cold memory retention expensive |
| **Primary Strengths** | Zero-management serverless, simple setup | Payload filtering, Rust performance, edge support | Hybrid search (Vector + BM25 keyword) | Enterprise scale, decoupled storage/compute, distributed sharding | Python native, instant local setup | Disk-backed zero-copy reads, low RAM footprint | Single database for relational metadata & vectors | Lowest latency, unifies cache, state & memory |
| **Best Suited Scenario** | Production agent apps scaling on cloud | Multi-tenant user memory with strict filtering | Knowledge-heavy agents requiring exact matches | Enterprise deployments with billions of vectors | Local dev, prototypes, single-user desktop agents | Desktop/edge embedded agents with disk-based storage | Startups wanting operational simplicity | Real-time voice/chat agents needing high speed |

<br>

The basic RAG pipeline works like this:

1️⃣ Take documents and split them into chunks
2️⃣ Convert each chunk into a vector embedding
3️⃣ Store those vectors in Pinecone, Chroma, Weaviate, or in a vector DB of your choice.
4️⃣ At query time, embed the user's question, find similar chunks, and paste them into the prompt
5️⃣ Extra complexities: incorporating metadata filtering, hybrid search, reranking, and query transformation.

<br>

Memory retrieval needs to answer a harder question, like "What do I know about this user that's relevant to this moment?" That requires multiple signals that RAG doesn't consider:

1️⃣ Recency: If you told an LLM with memory a preference yesterday, it should prioritize it over the same preference you mentioned six months ago. RAG has no concept of when information was indexed. 
2️⃣ User scope: RAG returns the same results for the same query regardless of who's asking. Memory filters it to you specifically before similarity scoring even begins. This way, the retrieval space differs for each user the system talks to. In production, this becomes a hard requirement called tenant isolation. Without it, two users with similar queries can pull each other's stored preferences through embedding proximity alone. No security breach required, just a shared index with no partitioning. Query-time filtering won't save you here, because you need to partition your memory store by user ID at the infrastructure level. It's one of the first things to get right, because retrofitting isolation into a shared index after you've accumulated millions of memories is a painful rebuild.
3️⃣ Importance weighting: Not all memories matter equally. If you're allergic to peanuts, that should rank higher than the fact that you like jazz, even if the jazz memory is more recent.
4️⃣ Write path: RAG is read-only. You index documents once, then query. Memory needs a write path that extracts facts from your conversations, decides what to store, and handles updates when information changes. When you tell an LLM with memory, "actually, I moved to Berlin," it’ll update your location, not just add a new memory that contradicts the old one.

<br>

The retrieval scoring function for memory looks something like:

```
score = (0.4 * similarity) + (0.35 * recency_decay) + (0.25 * importance)

```

<br>

Where:

➡️ `similarity` is cosine distance between the query embedding and the memory embedding (same as RAG)
➡️ `recency_decay` is something like exp(-λ * days_since_stored), where older memories score lower
➡️ `importance` is an LLM-assigned score (1-10) determined when the memory was first extracted

<br>

The weights are tunable and depend on your use case. An agent handling medical information might weigh importance at 0.5 because "patient is allergic to penicillin" needs to surface regardless of when it was stored. A casual chatbot might weigh recency higher because last week's conversation matters more than last year's.

<br>

RAG scoring is just:

```
score = similarity
```

<br>

| Dimension               | Pinecone                                                                            |
| ----------------------- | ----------------------------------------------------------------------------------- |
| Type                    | Serverless vector database                                                          |
| Scalability             | Built for scale, supporting millions of namespaces                                  |
| Write throughput        | High write throughput                                                               |
| Metadata filtering      | Sophisticated metadata filtering, including disk-based filtering                    |
| High-cardinality fields | Supports filtering that narrows searches without loading the full index into memory |
| Primary strength        | Raw retrieval at scale                                                              |
| Production readiness    | Production-hardened                                                                 |
| Mem0 integration        | One of the vector backends used by Mem0                                             |

<br>

> *Vector embeddings are dense numerical representations that capture the semantic properties of data. The embedding space follows a metric structure. Distances and angles between vectors encode relationships such as similarity, topic, or sentiment.*

> *Vector databases store embeddings and enable Approximate Nearest Neighbor (ANN) search. Each memory unit is converted into a high-dimensional vector representation, often 1536 dimensions when using OpenAI's embedding models. These vectors are indexed using structures such as HNSW, which allows sub-linear search over millions of entries. In a typical production setup, you might configure: 1536-dimensional embeddings, HNSW indexing, top-k retrieval set to 20, and sub-50ms latency even at multi-million scale. Vectors excel at semantic similarity, allowing the system to retrieve memory based on meaning rather than keyword matching. A well-configured vector index can scale beyond 100 million entries while maintaining acceptable recall and latency.*

<br>

- At query time, input text or other content is embedded to produce a query vector. The database runs similarity search against its indexes, often with metadata filters. It returns the closest vectors and their associated payloads.

- Retrieved candidates can be re-ranked or filtered further using metadata, recency, popularity, or custom scoring. In RAG and agent workflows, these results feed into an LLM prompt as context, sometimes after additional reranking.

- HNSW (Hierarchical Navigable Small World) builds a multi-layer graph where nodes represent vectors and edges connect nearby vectors. Queries start at upper layers, which are sparser, and descend to denser layers, following edges to closer neighbors. This structure yields high recall and low latency on large datasets, at the cost of more memory and complex index construction. The original HNSW paper by Malkov and Yashunin (first posted in 2016, revised in 2018 as v4) showed state-of-the-art performance for similarity search.

- IVF (Inverted File Index) partitions the vector space into coarse clusters, usually via k-means. Each cluster has an inverted list of vectors assigned to it. Queries are routed to the most relevant clusters based on the query vector, and search is performed only within those lists. IVF reduces the search space significantly and can be combined with product quantization for further compression.

- PQ (Product Quantization) splits vectors into sub-vectors and quantizes each sub-vector into discrete codes. Instead of storing full-precision floats, the index stores compact codes and uses precomputed distance tables. This enables large-scale search with reduced memory footprint and reasonable accuracy, often used in conjunction with IVF or HNSW.

- LSH (Locality Sensitive Hashing) uses hash functions that map similar vectors to the same buckets with high probability. Multiple hash tables improve recall. For a query vector, only vectors in the same buckets are compared. LSH is simple, works well for some distributions, and provides probabilistic guarantees, but can require many hash tables for high-quality results.

- Pre-filtering: The system applies metadata constraints before similarity search. Strict pre-filtering can miss globally relevant results and add overhead when filters are complex.

- Post-filtering: The system runs similarity search on a broader set, then filters results afterwards by metadata conditions. This is helpful when the filter and the semantic condition are both important, or when indexes are not partitioned by the filter attribute. The tradeoff is additional overhead, because some irrelevant results need to be retrieved and then discarded during filtering.

<br>

![](/blog/assets/report_mem_21.webp)

<br>

#### Graph Databases

<br>

> *Graph databases approach memory from a structural perspective. Instead of embedding text into dense vectors, graphs encode explicit relationships between entities. Graphs are particularly effective for relationship traversal, entity disambiguation, dependency resolution, and structured queries. However, graph systems require careful schema design, edge weighting logic, and traversal optimization. They also lack the fuzzy semantic flexibility of vector embeddings unless paired with text-based indexing.*

<br>

- Vector stores struggle with structured relationships and multi-hop reasoning. GraphRAG (Graph Retrieval-Augmented Generation) solves this by combining the unstructured strength of vectors with the structured rigidness of Knowledge Graphs.

- Mem0's Graph Memory, for example, allows for dynamic relationship mapping that evolves as the agent learns more about its environment. For an agent, this is essential for complex problem-solving.

<br>

#### Hybrid Memory

<br>

The solution is hybrid Memory:

1️⃣ Vector Search: For unstructured retrieval (finding relevant emails, documents, or loose notes).
2️⃣ Graph Traversal: For structured facts and rigid relationships.
3️⃣ Episodic Storage: For temporal sequences of events.

<br>

The hybrid architecture:

1️⃣ Perform vector search to retrieve top-k candidate memories
2️⃣ Apply graph traversal to validate structural relationships
3️⃣ Fuse scores using a weighted model
4️⃣ A common scoring fusion: `Final score = 0.7 × vector similarity + 0.3 × graph traversal confidence`

<br>

---

### [The Problem After Retrieval](https://mem0.ai/library/agent-memory/why-agents-misuse-the-memories)

<br>

- When a model is handed retrieved memories, it often gives them the wrong amount of influence: irrelevant memories steer the answer, and relevant ones get ignored. 

- MemCalib found that even the best frontier model it tested scored only 46.25 out of 100 on calibrated memory use. 

- MemSyco-Bench found that 61 to 62% of errors in three memory systems happened after the right memory had already been retrieved.

<br>

| Paper | What it tests | Headline finding |
| --- | --- | --- |
| MemCalib | Influence of each memory atom across three domains | Best model tested: SCS 46.25, Exact 28.40 out of 100 |
| BenchPreS | Applying or suppressing stored preferences in formal writing | Misapplication rates up to 86.48% |
| OP-Bench | Over-personalization with real memory systems attached | Scores 26.2% to 61.1% below the no-memory baseline |
| RPEval | Classifying each preference as Ignore, Support, or Dominate | Humans: 0.86 on Ignore; models: 0.06 to 0.38 |
| MemSyco-Bench | Memory-induced sycophancy across five tasks | 61% to 62% of errors occur after the right memory was retrieved |

<br>

- Frontier models struggle, and they lean one way.
- Bigger models are not reliably better.
- Retrieval quality isn't the bottleneck.
- Wrong memories change factual answers.
- Proposed method: MemCalib-RL splits the reward into separate channels for each target-and-actual combination and uses counterfactual likelihoods to assign credit to specific tokens.

<br>

---

### [What Is Memory Staleness in AI?](https://mem0.ai/library/agent-memory/memory-staleness)

<br>

- Staleness isn't a data quality issue or a bug that you can catch in test. It's a time problem.

- Two ways a memory goes stale: 1) Decay (any information has a natural expiry), 2) Unconfirmed drift (how AI memory confidence scoring works for a more systematic way to weight a memory by how much it’s been reinforced or contradicted).

<br>


```
import datetime
from mem0 import MemoryClient

mem = MemoryClient(api_key="your-api-key")  # get one free at app.mem0.ai
USER_ID = "user_123"

yesterday = (datetime.date.today() - datetime.timedelta(days=1)).isoformat()

mem.add(
    "The user is traveling this week and unreachable by phone.",
    user_id=USER_ID,
    expiration_date=yesterday,
    infer=False,
)

mem.add(
    "The user prefers dark mode in the editor.",
    user_id=USER_ID,
    infer=False,
)

# hidden by default, it expired
results = mem.search(
    query="what do we know about this user?",
    filters={"user_id": USER_ID},
)

# still there if you actually ask for it
results_with_expired = mem.search(
    query="what do we know about this user?",
    show_expired=True,    # an expired memory isn’t gone, it’s packed
    filters={"user_id": USER_ID},
)
```

<br>

- If that delete only removes the note itself and doesn't touch what it superseded, the outdated fact is now the only thing left standing, which can resurface simply because the delete was incomplete.

```
# only removes the fact itself, whatever it superseded can resurface
mem.delete(memory_id=memory_id, delete_linked=False)

# removes the fact and the whole chain it superseded
mem.delete(memory_id=memory_id, delete_linked=True)
```
<br>

---

### [Structured vs. Unstructured Memory](https://mem0.ai/library/agent-memory/structured-vs-unstructured-memory)

<br>

| Parameter | Unstructured | Structured |
| --- | --- | --- |
| Shape | Free text, no predefined fields | Defined fields with types |
| Write cost | Low, capture whatever comes up | Higher, fields decided in advance |
| Retrieval | Similarity search, approximate | Exact match, filterable, aggregatable |
| Validation | None built in | Can enforce types, allowed values |
| Handles novelty | Well, anything fits as a sentence | Poorly, needs a schema change |
| Degrades how | Gets noisy, contradictions pile up unless resolved | Gets brittle, breaks when reality outgrows the fields |
| Best fit | Conversational context, explanations, nuance | Filters, reporting, anything downstream code reads directly |

<br>

---

### [Semantic vs. Episodic vs. Procedural Memory](https://mem0.ai/library/agent-memory/semantic-vs-episodic-vs-procedural-memory)

<br>

- Semantic: general knowledge detached from when or where it was learned. It’s stored as a fact, retrieved by relevance, and rarely needs to expire.


```
from mem0 import MemoryClient

mem = MemoryClient(api_key="your-api-key")

mem.add(
    "The user prefers dark mode in the editor and works primarily in Python.",
    user_id="dev_123",
)

results = mem.search(query="What are the user's editor preferences?", filters={"user_id": "dev_123"})
```

<br>

- Episodic: is a specific experience, dated and situated. Its failure is keeping the fact, but dropping the outcome.


```
mem.add(
    "Attempted to fix the flaky test by mocking the network call. It did not resolve the failure.",
    user_id="dev_123",
    run_id="debug-session-2026-08-11",
    metadata={"type": "event", "outcome": "failed"},
)

results = mem.search(
    query="What have we already tried for the flaky test?",
    filters={"AND": [{"user_id": "dev_123"}, {"run_id": "debug-session-2026-08-11"}]},
)
```

<br>

- Procedural: reusable skill or routine. It can be stored as a callable procedure and improved over time.


```
# a senior dev teaches the procedure once, scoped to the agent, not to themselves
mem.add(
    [{"role": "user", "content": "When we add a new REST endpoint, we always: "
      "1. Add the route. 2. Write the handler. 3. Register it. "
      "4. Add a unit test. 5. Update the OpenAPI spec. Never skip the test or the spec."}],
    agent_id="coding-agent",
    infer=False,
)

# a different developer, months later, gets the taught convention without being told
hits = mem.search(
    query="checklist for adding a REST API endpoint",
    filters={"agent_id": "coding-agent"},
)
```

<br>

---

### [Memory Hierarchy](https://mem0.ai/library/agent-memory/memory-hierarchy-in-ai-systems-from-sensory-to-semantic)

<br>

- The classic framework here is the Atkinson-Shiffrin model, which describes human memory as three interconnected stores: sensory memory, short-term memory, and long-term memory. Information moves forward only if it is attended to. Otherwise, it decays.

<br>

- The architecture that maps cleanest onto this model distinguishes four practical layers:

1️⃣ Sensory / Input layer - raw context entering the model
2️⃣ Working memory - the active context window during inference
3️⃣ Episodic memory - what happened across this session and recent sessions
4️⃣ Semantic memory - persistent facts, relationships, and user knowledge

<br>

- In humans, sensory memory lasts roughly 200 to 500 milliseconds. It is the buffer where raw perception sits before attention decides what to keep. In AI, this maps to the moment of token ingestion: the message, the tool output, the retrieved chunk, everything landing in the model's input before any reasoning begins.

- A context window is flat. It treats every token with roughly equal weight, has no concept of what is important versus incidental, and resets completely at the end of every session

- In Mem0's architecture, episodic memory maps to session memory, scoped by `session_id` and designed to expire when the task ends. The system promotes relevant details from episodic to semantic memory and discards the rest.

- Semantic memory is the deepest layer, scoped by `user_id`. It holds durable facts, relationships, preferences, and learned knowledge that does not expire with a session. 

- For the agent's persona, `agent_id`, `app_id `for the product surface, and `run_id` for a single session or ticket.

- The graph memory approach uses an entity extractor to identify nodes and a relations generator to infer labeled edges. A conflict detector flags contradictory information. The result is a memory store that can reason about relationships between things, not just retrieve isolated facts.

<br>

---

### [Stateless vs. Stateful](https://mem0.ai/library/agent-memory/short-term-vs-long-term-memory-in-ai)

<br>

- Short-term memory is whatever fits in the current context window: the recent turns of this conversation, still fresh and cheap to reference directly. 

- Long-term memory is state that must survive past this session: a user's standing preferences, a fact learned three weeks ago, a procedure every future run must follow.

<br>

![](/blog/assets/report_mem_20.webp)

<br>

A stateful system follows the same loop on every request:

1️⃣ Load: Read the state that applies to this user, session, or workflow.
2️⃣ Validate: Check that the state is current, complete, and that this caller can use it. Do not trust state only because it exists.
3️⃣ Hydrate context: Put the loaded state into the prompt as usable context. This step is also called context hydration.
4️⃣ Reason: Run the model over that context and the new input.
5️⃣ Act: Call a tool, write a file, or answer the user.
6️⃣ Update state: Record what changed: a new fact, a completed step, a tool result.
7️⃣ Persist: Write the update to durable storage.
8️⃣ Checkpoint: Save the execution position if the task has more steps.
9️⃣ Resume or expire: Continue from the checkpoint later, or let the state expire when it is no longer useful.

<br>

"State" covers more than conversation history:

1️⃣ Session state: information tied to the current active interaction, typically short-lived.
2️⃣ Workflow state: where a multi-step process currently stands, distinct from any fact being remembered.
3️⃣ User state: durable facts and preferences tied to a specific person across sessions.
4️⃣ Tool state: results or side effects from a tool call, available without re-invoking the tool.
5️⃣ Environment state: facts about the surrounding system or context the agent operates in, rather than about a specific user or task.
6️⃣ Persistent memory: information retained specifically because it's likely to be useful later, the layer Mem0 is built for.

<br>

| Dimension | Stateless Agent | Stateful Agent |
| --- | --- | --- |
| Persistent state | No implicit persistence | Reads/writes persisted state |
| Context across calls | Must be supplied/reconstructed | Can be retrieved |
| Horizontal scaling | Easier | Requires externalized state |
| Infrastructure | Simpler | More components |
| Personalization | Limited unless context is supplied | Persistent |
| Workflow continuity | Requires external orchestration | Can resume from state |
| Failure recovery | Individual request retry | Requires checkpoints/idempotency |
| Concurrency complexity | Lower | State conflicts possible |
| Token usage | Depends on replayed context | Depends on retrieval strategy |
| Latency | Often lower | State retrieval/write can add latency |
| Privacy burden | Lower persistence requirements | Requires storage governance |
| Debugging | Easier to reproduce | Historical state may influence output |
| Cross-session continuity | No implicit continuity | Supported |
| Best fit | Independent one-shot tasks | Multi-step/persistent tasks |

<br>

| Concept | Meaning | Typical Lifetime | Example |
| --- | --- | --- | --- |
| Context | Information currently available to the model | One inference/request | Prompt + retrieved documents |
| Session state | Information retained during an active interaction | Minutes–hours | Current conversation progress |
| Workflow state | Current status of a process | Task duration | Waiting for approval |
| Checkpoint | Snapshot used to resume execution | Workflow duration | Steps 1–3 completed |
| Memory | Information retained because it may be useful later | Days/months+ | User prefers Python |
| Knowledge | External reference information | Persistent | Product documentation |

<br>

| Failure | Cause | Mitigation |
| --- | --- | --- |
| Stale reads | The agent loads what it thinks is current state, but another session, agent, or parallel request has already changed the underlying fact, and the agent acts on it with full confidence anyway. | Read at decision time, not once at the start of a long-running task. Prefer a memory layer's own `search()` at the moment of the decision over a value cached earlier in the run. |
| Partial writes | An interaction updates more than one thing, a preference here, a workflow flag there, and the process dies between writes, leaving state internally inconsistent. | Keep the number of places a single interaction writes to as small as possible. Prefer a memory API that returns the written record (Mem0's `add()`/`update()` responses confirm what actually landed) rather than a fire-and-forget write you never verify. |
| Race conditions | Two agents, or two instances of the same agent, read the same memory, both reason from it, both write back, and one write silently clobbers the other, most common in multi-agent setups sharing a `user_id` or `agent_id` scope. | Scope writes as narrowly as the task allows, per-agent or per-run rather than one shared bucket. For a shared record, use optimistic locking: attach a version to each read, and reject a write whose version is stale. |
| Memory drift | Not every stored fact is equally trustworthy, and a memory that only ever gets reinforced, never revised, quietly grows more wrong over time as small contradictions get ignored. | Use a confidence-tracking pattern: track how much evidence backs a stored fact, and let a memory get revised, not just appended to, when new evidence disagrees. |
| Lost progress after a crash | An agent fails partway through a multi-step task and, with nothing checkpointed along the way, has to restart from zero instead of resuming from step three of five. | Write progress as each step is actually completed, not just once at the end on success. Design each step to be safe to re-run in case a retry double-fires it. |
| Cross-user / tenant leakage | A bad or missing state namespace lets one user's or tenant's state become visible to another, a distinct and serious production risk specific to persistent agent memory. | Enforce tenant and user isolation at the scoping level itself, not just in application logic, so a missing filter fails closed rather than silently returning someone else's data. |
| Duplicate action | A request times out, the caller retries, and the agent performs the same side effect twice: two refunds, two emails, two tickets. | Make each action idempotent. Give every action an ID, and check whether that ID already ran before repeating it. |
| Incorrect memory | The agent stores something it inferred rather than something the user stated, and later treats the guess as fact. | Record where each memory came from, and keep model guesses separate from user statements until something confirms them. |

<br>

| Requirement | Typical Technology |
| --- | --- |
| Session state | Redis |
| Structured persistent state | PostgreSQL / DynamoDB |
| Workflow checkpoints | Agent orchestration/checkpoint system (e.g., LangGraph) |
| Semantic retrieval | Vector database |
| Persistent agent memory | Memory layer such as Mem0 |
| External knowledge | RAG/document store |
| Event history | Event log |

<br>

---

### [Short-Term vs. Long-Term Memory](https://mem0.ai/library/agent-memory/stateless-vs-stateful-ai-agents)

<br>

- Retrieval precision is the hard limit here. If your search returns irrelevant chunks, you pollute the context with noise, increasing hallucination rates. Staleness is another silent killer. If a user updates their address, but your memory systems keep the old embedding, the model will confidently generate the wrong answer.

- Instead of writing custom glue code to move data between Redis (short-term) and a Vector DB (long-term), Mem0 offers a single API. It automatically manages the hot capabilities of episodic storage and the cold storage of semantic memory to help you maintain context and remember user preferences. Mem0 also uses a Graph Memory architecture that captures relationships between entities, going beyond simple vector similarity to understand structured knowledge.

<br>

| Aspect | Short-term memory | Long-term memory |
| --- | --- | --- |
| Primary role | Hold immediate context and recent tokens. | Store persistent knowledge and historical data across sessions. |
| Typical size | Small to medium (8k to 128k tokens). | Large, unbounded (GBs to TBs) for storing vast amounts of data. |
| Latency requirement | Very low (sub-millisecond) for real-time responses. | Higher latency acceptable (100ms+) for retrieval. |
| Representation | Raw tokens or attention values. | Indexed embeddings, documents, graphs. |
| Update pattern | High-frequency, ephemeral writes during a single session. | Low-frequency, persistent updates. |
| Eviction strategy | FIFO, LRU, token trimming. | Merge, summarization, archival. |
| Failure modes | Context truncation, primacy/recency bias. | Staleness, index drift, privacy leakage. |
| Common infrastructure | Context buffers, Redis caches. | Vector databases, search indexes, S3. |

<br>

-  For large datasets (under 100k vectors), a flat index is fast and accurate. For scale (1M+ vectors), use HNSW (Hierarchical Navigable Small World) indexes. They trade a small amount of accuracy for massive speed gains and energy efficiency.

- Do not keep everything. Implement a "Least Recently Used" (LRU) policy for short-term buffers. For long-term storage, use a "relevance score" to periodically prune low-value memories. If a memory has not been retrieved in 6 months, move it to cold storage.

- Race condition: If two user requests arrive simultaneously, they might both try to update the session state. Use optimistic locking or atomic database operations (like Redis WATCH) to ensure you do not overwrite data.

- Monitor your "context utilization". If you consistently fill 90% of your context window with retrieved memories, your costs will explode. Track "retrieval relevance" by logging how often users reject the model's answer when memory was used.

- Latency P99: Track the time it takes to retrieve memory. It should stay under 200ms.

- Recall at K: If the answer was in your database, did it show up in the top 5 results?

- Precision at K: How many of the top 5 results were actually useful?

- Factuality: Use a secondary fine-tuned grader LLM to verify that the generated answer matches the retrieved facts.

<br>

---

### [Event-Based Memory for Long-Running Agents](https://mem0.ai/library/agent-memory/event-based-memory-systems-for-long-running-ai-agents)

<br>

- Most memory work in agents is fact-based and it breaks down the moment what matters is something that happened, at a specific point, with a specific result, because a fact-store flattens "when" out of the picture entirely.

- Event-based memory keeps the "when." Each unit of memory is a dated, situated record of one thing that actually occurred, a tool-call, an error, a correction, tied to the moment it happened and the task it happened inside. Cognitive science calls this episodic memory, and unlike a fact, an event doesn't get overwritten when the world changes.

- The separation of fact vs. event only works if an event has a consistent shape. Not a chat message, but a structured receipt of what actually happened. Here’s an example to understand this better:

```
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime

class AgentEvent(BaseModel):
    event_id: str
    timestamp: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    actor: str                        # e.g., "coding_agent_v1"
    event_type: str                   # e.g., "tool_execution_failure"
    task_id: str
    action: str                       # e.g., "apply_git_patch"
    payload: Dict[str, Any]           # e.g., {"file": "auth.py", "error": "ImportError"}
    learned_constraint: Optional[str] # e.g., "auth.py requires pyjwt>=2.0"
```

<br>

- Pattern 1 (write): append every event (raw receipt) the instant it happens, exactly as it occurred, without any summarization or LLM pass. This makes for a lossless append, controlled by the `infer` parameter: setting `infer=False` stores the raw content as-is.

```
# Save the raw execution receipt without LLM extraction latency
mem0.add(
    messages=[{
        "role": "assistant",
        "content": f"Failed running patch on {event.payload['file']}: {event.payload['error']}"
    }],
    user_id=event.task_id,
    metadata={
        "category": event.event_type,
        "action": event.action,
        "is_active": True,
    },
    infer=False,  # append the exact receipt, no extraction
)
```

<br>

- Pattern 2 (read): Before the agent repeats a risky action, it should check its own history for that specific action first.

```
def check_past_failures(task_id: str, file_path: str):
    # Query this task's history for the file, raw receipts if compaction
    # hasn't run yet, or the compacted lesson once it has
    past_events = mem0.search(
        query=f"failures on {file_path}",
        user_id= task_id,
    )
    # Return the extracted constraints to inject into the system prompt
    return [e["memory"] for e in past_events]
```

<br>

- Pattern 3 (maintain): Compacting the ledger. A raw log keeps everything, but re-reading all of it every time gets wasteful. So we often take the entries about one repeated problem and feed them back into Mem0, letting it summarize them into one clear takeaway instead of many separate ones.

```
# Background process running periodically over the event log
def compact_session_events(task_id: str, raw_event_logs: list[str]):
    # Let Mem0 infer the overarching lesson from the historical event stream
    mem0.add(
        messages=raw_event_logs,
        user_id=task_id,
        metadata={"type": "compacted_lesson"},
        infer=True,  # LLM extracts the persistent, generalized pattern
    )
```

<br>

- Dream: when a new memory contradicts an existing one, the old one gets marked outdated instead of being deleted. On the read side, `latest_only=True` returns only the current, non-superseded memory:

```
# Only the current constraint, old ones filtered out automatically
current = mem0.search(
    query="dependency constraints on auth.py",
    user_id=task_id,
    latest_only=True,
)

# Everything on file, including anything already superseded
full_history = mem0.search(
    query="dependency constraints on auth.py",
    user_id=task_id,
    latest_only=False,
)
```

<br>

![](/blog/assets/report_mem_6.webp)

<br>

---

### [Dream: Background Memory Consolidation](https://mem0.ai/blog/dream-background-memory-consolidation-for-ai-agents)

<br>

- Cleans up agent memory in the background: duplicates get merged, outdated facts get marked as superseded without losing history, and recurring behavior gets summarized into higher-level memories.

<br>

- Dream runs three operations on the memory:

1️⃣ Merge. When a newer memory contains all the information of an older one plus more, the older memory is marked as merged and points to its replacement. 
2️⃣ Supersede. When a newer memory replaces an older fact, the older memory is marked as `superseded` and points to the memory that replaced it.
3️⃣ Synthesize. A background job looks at groups of related memories and writes a new summary memory when several independent observations support one.

<br>

- Memories marked `immutable` or `exclude_from_dream` are skipped entirely.

<br>

---

### [Proactive Memory](https://mem0.ai/library/agent-memory/proactive-memory)

<br>

- Gap proactive memory closes: retrieval triggered by context, not by the user.

<br>

```
Reactive:   user types message → search memory → respond
Proactive:  context signal fires → detect relevance → surface → respond
```

<br>

Two structural failures in how current memory systems store information:

➡️ Feed-forward extraction: Memory summarization happens before the agent knows what future tasks will need. The agent summarizes a conversation without knowing which details will matter in three weeks.
➡️ One-off extraction: The current systems extract once. If the extraction makes a mistake or misses something, that error persists in memory permanently. There's no second pass, no self-correction, no way to recover what was dropped.

<br>

Patterns:

1️⃣ Session-start scan (one extra search call at session open).
2️⃣ Context-trigger scan (monitors the calls for context shifts such as file reference, error detected, tool invocation, topic shift, etc. - and runs a targeted memory search then).
3️⃣ Scheduled reflection scan (it changes how memory is stored rather than just how it’s retrieved – a background worker runs after sessions end or on a schedule; the work happens asynchronously)

<br>

Common failure modes:

➡️ Noise injection
➡️ Over-proactivity fatigue
➡️ Latency at session start
➡️ Extraction completeness vs. storage cost

<br>

----

### [Continual Learning Agents](https://mem0.ai/library/agent-memory/how-to-build-a-continual-learning-agent-with-mem0)

<br>

- A continual learning agent is an LLM-driven system that updates its behavior based on experience collected across many episodes. Each task produces an outcome, the agent stores that outcome, and future tasks retrieve and reuse those outcomes as context.

<br>

![](/blog/assets/report_mem_13.webp)

<br>

- Pattern: Inline Learning Loop

1️⃣ Prefetches outcomes from Mem0.
2️⃣ Plans and executes the task.
3️⃣ Evaluates and writes back outcomes before returning.

<br>

- Pattern: Asynchronous Outcome Processing

1️⃣ The agent publishes execution logs and outputs.
2️⃣ A background worker or separate service evaluates outcomes using LLMs or metrics.
3️⃣ The worker writes outcomes into Mem0 with rich metadata.

<br>

- Pattern: Global vs. Local Memory Layers

1️⃣ Per-user memory: Experiences and preferences specific to a single user.
2️⃣ Global memory: Lessons that generalize across users and environments.

<br>

---

### [Hyperagents: How Memory Works in Self-Improving AI](https://mem0.ai/library/agent-memory/how-memory-works-in-hyperagents)

<br>

![](/blog/assets/report_mem_18.webp)

<br>

- HyperAgents is a self-referential agent that combines the task agent and the meta agent into a single editable program, one that can improve not just how it solves tasks but how it generates future improvements. 

- The meta-level modification procedure is itself editable, enabling what the paper calls metacognitive self-modification.

<br>

![](/blog/assets/report_mem_19.webp)

<br>

---

### [Graph Memory for AI](https://mem0.ai/library/agent-memory/graph-memory-solutions-ai-agents)

<br>

- If you need your AI agent to remember relationships (people, entities, timelines, tasks, preferences, etc.) and not just surface similar snippets of past context, then you'll need semantic memory + relational/graph-style representation. Embeddings will not be sufficient.

- Graph memory tracks how preferences change and preserves relationship structure across sessions.

- Workflow state is the structured data object that flows through the graph during a run.

<br>

- We assessed graph-based memory solutions based on five criteria that matter when building AI agents with persistent context:

1️⃣ Entity relationship modelling: can the system store facts as nodes with typed connections?
2️⃣ Temporal tracking: does the memory layer timestamp facts and handle updates? Preferences change.
3️⃣ Retrieval performance: how quickly can the system traverse relationships to surface relevant context?
4️⃣ Integration ease: what does the setup look like? Can you add graph memory with a few API calls, or does it require rewriting your entire agent architecture?
5️⃣ Scalability: how does the system perform as memory grows from hundreds to millions of facts per user?

<br>

---

### [AI Memory Confidence Score](https://mem0.ai/library/agent-memory/confidence-score-in-ml)

<br>

- An AI confidence score is a numerical signal representing how certain or reliable an AI system estimates a prediction, answer, retrieved result, stored memory, or decision to be.

<br>

- Each layer’s confidence is calculated differently and answers a slightly different question:

➡️ Prediction confidence: how sure a classifier is about which category an input belongs to
➡️ Token confidence: how likely a language model considered a specific generated token
➡️ Answer confidence: how sure a system is about a complete generated response
➡️ Claim confidence: how sure a system is about one specific factual statement within a longer answer
➡️ Retrieval confidence: how sure a system is that a retrieved document or passage is actually useful
➡️ Memory confidence: how sure a system is that a stored fact is still true
➡️ Agent/action confidence: how sure an agent is that a planned action is the right one to take

<br>

- Calibration measures whether a system’s predicted confidence corresponds to its actual correctness rate. Calibration Methods:

➡️ Platt scaling fits a logistic model on top of a classifier’s raw output scores to transform them into calibrated probabilities, a technique that predates the deep learning era but still shows up as a calibration baseline.
➡️ Temperature scaling, per Guo et al.’s own description in the paper that introduced it, is specifically a single-parameter variant of Platt scaling: instead of fitting a full logistic model, it rescales a model’s logits by one shared temperature value before the softmax step.
➡️ Isotonic regression is a non-parametric calibration method, useful specifically when the relationship between raw scores and actual correctness isn’t well described by a simple logistic curve, giving it more flexibility than Platt or temperature scaling at the cost of needing more calibration data to work reliably.

<br>

- How Is AI Confidence Evaluated?

➡️ Expected Calibration Error (ECE) measures the gap between a system’s predicted confidence and its actually observed accuracy, averaged across confidence buckets. 
➡️ Brier score measures how close predicted probabilities are to actual binary outcomes (correct or incorrect), a single number that rewards both accuracy and honest confidence simultaneously.
➡️ Reliability diagrams visualize predicted confidence against observed accuracy directly, typically as a plot where perfect calibration falls on a diagonal line, with overconfidence bowing below it and underconfidence bowing above it.

<br>

---

### [Agents with Memory](https://mem0.ai/library/agent-memory/open-source-ai-agents-with-built-in-memory)

<br>

| Aspect | No memory, only prompt history | Raw vector DB per message | Custom SQL/JSON memory | Mem0-style memory layer |
| --- | --- | --- | --- | --- |
| Cross-session persistence | No | Yes | Yes | Yes |
| Control over memory types | None | Minimal (all entries similar) | High but manual | Built-in via metadata and schemas |
| Retrieval quality | Limited to last N turns | Semantic, but noisy and redundant | Depends on custom queries | Semantic plus structured filters |
| Long-term summarization | Manual via ad-hoc prompts | Rarely implemented consistently | Custom logic per project | Encouraged pattern with shared primitives |
| Multi-tenant isolation | N/A | Possible but fragile | Possible, requires discipline | First-class via metadata scopes |
| Ecosystem and composability | Framework-specific | DB/vendor-specific | Application-specific | Framework-agnostic memory API |
| Auditability of decisions | Hard as history is partial | Hard as retrieval is opaque | Possible with extra work | Easier via inspectable memory records |`
| Dev effort for new agents | Low for prototypes, high for production | Medium plus tuning | High, repeated per project | Medium, reusable across agents |

<br>

- Key points when in a real deployment: 

1️⃣ Data residency and self-hosting: Mem0 is open-source and can be self-hosted, which allows data to remain within a VPC or specific region.
2️⃣ Access control and tenancy: The combination of infrastructure isolation and Mem0 metadata (for user_id, tenant_id, etc.) should enforce both physical and logical separation of memories.
3️⃣ PII and retention policies: Projects that handle PII should implement retention and deletion workflows. 
4️⃣ Observability and debugging: Inspecting what memories are retrieved for a given query can explain agent actions and help tune memory filters or schemas.
5️⃣ Schema evolution: Over time, metadata schemas evolve. Using versioned keys (for example, "schema_version": 1) can help distinguish older entries from newer ones.

<br>

---

### [Give Your AI Agent Memory and Guardrails](https://mem0.ai/library/ai-agent-security/give-your-ai-agent-memory-and-guardrails-mem0-docker-sandboxes)

<br>

> *A sandbox is a lightweight microVM with its own kernel and network namespace, and the only path it shares with your host is the project directory you mount.*

<br>

- Each memory is tied to an ID, a user, or an agent, so it recalls the right context for the right person. 

- [sbx-kits-mem0](https://github.com/ajeetraina/sbx-kits-mem0) gives any agent a Mem0 memory layer, runs fully local with no cloud keys, and boxes the agent inside a microVM.

<br>

![](/blog/assets/report_mem_7.webp)

<br>

- For years, the security worry with LLMs was prompt injection, and it was a contained one: the attack lived and died inside a single session. Persistent memory removes that limit, and the industry has named the result. OWASP added memory poisoning to its Top 10 for Agentic Applications as ASI06.

<br>

![](/blog/assets/report_mem_8.webp)

<br>

| Dimension | Centralized memory | Distributed memory | Hybrid memory |
| ------------ | ------------------------------------------ | --------------------------------------------------- | -------------------------------- |
| Coordination | Simple reads/writes to one store           | Sync protocols between agents                       | Access-controlled sharing        |
| Consistency  | Strong consistency, single source of truth | Eventual consistency, sync challenges               | Configurable per use case        |
| Best for     | Small agent teams, simple orchestration    | Large-scale systems, privacy-sensitive applications | Production multi-agent workflows |

<br>

---

### [Memory Poisoning in AI Agents](https://mem0.ai/library/ai-agent-security/memory-poisoning-how-bad-inputs-corrupt-your-ai-agent-s-memory)

<br>

- Memory poisoning is when bad inputs get written into an agent's long-term memory and later get recalled as if they were true. Once in, they are hard to remove and hard to debug.

- Mem0 stores memories as typed objects with that metadata, so you can filter agent-generated facts out of safety-sensitive flows, keep preferences private per user, and decay stale entries. 

- The problem is a combination of three properties: 1) Long-term state that outlives a single session, 2) Automatic write-back from model outputs or raw user messages, 3) Later recall that assumes stored content is valid context.

- Many agents start with simple memory patterns: 1) Raw transcript storage: Every message goes into a log, and retrieval pulls the most recent k messages., 2) Summarized memory: A background process compresses conversations into summary documents., 3) Vector similarity memory: Messages or summaries are embedded and stored in a vector database. Retrieval returns the nearest neighbors to the current query.

- Key weaknesses: 1) No trust dimension, only similarity, 2) No control over who can influence which memories, 3) No concept of recency decay or confidence updates, 4) No feedback loop from downstream signals like user corrections.

- Types of memory poisoning in AI agents: 1) User-level preference poisoning, 2) Shared knowledge poisoning, 3) System prompt and tool poisoning, 4) Hallucination feedback loops, 5) Adversarial poisoning.

- Mem0 treats memory as first-class objects, not just chunks of text. This structure allows policies like: 1) Trust human feedback above self-generated content., 2) Keep user preferences private by default., 3) Downweight or expire memories with conflict signals., 4) Restrict retrieval to safe types for certain tools.

- Other patterns to reduce poisoning: 1) separate preference and factual memories, 2) track source and trust level, 3) use feedback to adjust memory scores, 4) apply moderation and filters at write-time, 5) decay or archive stale and low value memories.

<br>

| Attack type                       | Access required                | Persistence              | Detection difficulty                     | Primary defense                     |
| --------------------------------- | ------------------------------ | ------------------------ | ---------------------------------------- | ----------------------------------- |
| Memory injection (MINJA)          | User-level queries only        | Cross-session            | High (entries appear benign)             | Input sanitization + trust scoring  |
| Backdoor poisoning (AgentPoison)  | Knowledge base write access    | Permanent until cleaned  | Very high (indistinguishable embeddings) | Memory isolation + integrity checks |
| Experience grafting (MemoryGraft) | Indirect, via ingested content | Durable behavioral drift | Very high (trigger-free)                 | Anomaly monitoring + memory audits  |

<br>

---

### [GPU-Aware Agent Memory](https://mem0.ai/library/agent-memory/gpu-aware-agent-memory-with-mem0)

<br>

When GPUs enter the picture, three parts of this pipeline become especially important:

1️⃣ Embedding generation
2️⃣ Similarity search
3️⃣ Model-based memory refinement and summarization

<br>

![](/blog/assets/report_mem_16.webp)

<br>

At a high level, Mem0 has four main layers that can touch GPU or TPU resources:

1️⃣ Ingestion layer: 1) Takes raw events, messages, or documents from the agent; 2) Normalizes and enriches with metadata; 3) optionally runs LLM-based extraction or summarization on GPU
2️⃣ Embedding layer: 1) Converts text or structured records into vectors; 2) Can use GPU-accelerated embedding models; 3) Can batch requests for higher throughput
3️⃣ Indexing and retrieval layer: 1) Stores vectors in a vector index (in-memory or external), 2) Runs similarity search with approximate or exact methods, 3) Some backends can use GPUs for fast search over large collections
4️⃣ Policy and reasoning layer: 1) Decides which memories to fetch and how to rank them; 2) Uses LLMs for re-ranking, compression, or summarization; 3) Often runs on the same GPU or TPU pool used for main inference

<br>

Several patterns make clear use of GPUs and TPUs alongside memory:

1️⃣ Latency-sensitive conversational agents at scale: 1) Thousands of concurrent users, 2) Personalized context selection per request, 3) GPU embeddings plus GPU LLMs reduce tail latency
2️⃣ Knowledge-heavy agents with large private corpora: 1) Millions of documents or internal notes, 2) Need fast filtered retrieval plus LLM re-ranking, 3) GPU for bulk embedding, offline summarization, and high-throughput search
3️⃣ Research and experimentation with adaptive agents: 1) Agents that update knowledge frequently, 2) LLMs that compress histories into semantic summaries on GPU, 3)  Mem0 acts as the stable interface tracking identities and relationships
4️⃣ Multimodal agents: 1) Images, code, logs, and text all stored as memories; 2) GPU models for vision or audio embeddings; 3) Mem0 coordinates heterogeneous memories into a single retrieval interface

<br>

| Aspect | CPU-only Mem0 stack | GPU-aware Mem0 stack |
| --- | --- | --- |
| Embedding throughput | Lower, often fine for small workloads | High, good for large-scale or real-time ingestion |
| Retrieval latency | Adequate for small to medium collections | Very low for large collections with GPU-based search |
| Cost profile | Lower hardware cost, more CPU instances | Higher per-node cost, fewer nodes for same throughput |
| Operational complexity | Simpler to deploy and scale | More complex scheduling and resource allocation |
| Best suited for | Prototypes, smaller agents, moderate traffic | Production agents with strict latency and high volume |
| Memory durability | Backed by disk or managed services | Same as CPU stack, GPUs used only for compute |

<br>

---

### Additional Resources

<br>

- [Mem0 docs](https://docs.mem0.ai)
- [Mem0 Benchmarks](https://mem0.ai/research) ([GitHub repo](https://github.com/mem0ai/memory-benchmarks))

<br>
<br>

---

## 🟪 [Cognee (Python, TypeScript, Rust)](https://github.com/topoteretes/cognee) (Graph and Vector Memory over Configurable Storage)

<br>

>  *Open-source AI memory platform that turns raw data into persistent knowledge graphs for AI agents. Its design is a pipeline. First, **add** converts content to plain text, hashes it to remove duplicates, and groups it into datasets with ownership and permissions. Next, **cognify** does the core work: it classifies documents, splits them into chunks, uses an LLM to extract entities and relationships, writes summaries, and stores the results in both the graph and vector databases. A temporal_cognify mode can also extract events with timestamps to build a knowledge graph that is aware of time. Then **memify** runs over the existing knowledge graph to enrich it, for example by attaching domain or coding rules to nodes.*

> *Under the hood, Cognee combines three stores in a single memory layer: a vector store for semantic search, a graph store for entities and relationships, and a relational store for provenance. Every graph node has a matching embedding, so a query can move between semantic similarity and relationship traversal without losing coherence.*

> *Cognee also separates memory into two layers. Session memory acts as short-term working memory for the agent, while permanent memory holds long-term knowledge such as user data, interaction traces, external documents, and the relationships derived from them. For retrieval, it offers 14 modes, ranging from classic RAG to chain-of-thought graph traversal.*

<br>

![](/blog/assets/report_mem_32.png)

<br>

---

### Architecture

<br>

- Write path as an ECL pipeline. Extract ingests raw input (text, files, turns, tool output). Cognify runs the middle of the write path: chunking, entity and relation extraction, resolution against the existing graph, optional ontology alignment. Load persists into a knowledge graph, a vector index and relational metadata in one operation, so a fact is never in one store and missing from another. 

- Graph, vector and relational in one engine. Backends are pluggable: Neo4j, Kuzu or FalkorDB for the graph, LanceDB or pgvector for vectors, Postgres for relational data.

- Four verbs. The Cognee 1.0 API exposes `remember` (ingest and cognify), `recall` (hybrid retrieval with ranking and a token budget), `improve` (the feedback loop) and `forget` (remove a fact and its derived artifacts), mapping to the write path, read path, feedback loop and forgetting operation in the diagram.

<br>

| Command | Purpose | Shared flags |
| ------------------ | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `remember <data…>` | add + cognify (+ improve) | `-d/--dataset-name`, `--session-id`, `--no-improve`, `--tenant-id` |
| `recall <query>` | smart search (auto-routes) | `-d/--datasets`, `-t/--query-type`, `-k/--top-k` (10), `--session-id`, `-f/--output-format`, `--tenant-id` |
| `improve` | reinforce graph from feedback | `-d/--dataset-name`, `--session-id`, `--node-name` (deprecated, ignored), `--feedback-alpha` (default: `improve.feedback_alpha`, 0.1), `--tenant-id` |
| `forget` | delete memory | one of `--all` / `-d` / `--data-id`+`--dataset-name`, `--tenant-id` |

<br>

---

### [LLM Memory Explained](https://www.cognee.ai/llm-memory)

<br>

LLM memory is information-bearing state that can influence a model's output:


|                   | Where is it stored?                                                        | Persistent?                         | How does it change?                                     | What does it provide?                                                         |
| ----------------- | -------------------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Parametric memory | Model weights                                                              | Persists across inference calls     | Pretraining, fine-tuning, PEFT (Parameter-Efficient Fine-Tuning), or model editing        | Learned knowledge, patterns, and behavior                                     |
| Contextual memory | Current context and inference-time state                                   | Temporary                           | Context assembly, truncation, compression, or retrieval | Instructions, recent interactions, and information available during inference |
| External memory   | Databases, documents, vector indexes, graphs, or other application storage | Persists independently of the model | Application-level writes, updates, and deletion         | Information that can be retrieved across separate calls or sessions           |

<br>


Applications can preserve information independently of the model in databases, documents, vector indexes, knowledge graphs, or other storage systems. When it's needed again, retrieval selects relevant records and adds them to the model's context for the current request:

|                  | Contextual memory                                             | Long-term memory                                     |
|------------------|---------------------------------------------------------------|------------------------------------------------------|
| **Persistence**  | Current inference or reconstructed conversation               | Across separate calls or sessions                    |
| **Location**     | Model context                                                 | Model parameters or external storage                 |
| **Updates**      | Change the supplied context                                   | Update parameters or external records                |
| **Capacity**     | Limited by the context window                                 | Determined by the model or external storage          |
| **Typical role** | Current instructions, conversation, and retrieved information | Learned knowledge and information needed again later |


<br>

Both parametric and external memory can preserve information across inference calls. However, their storage and update mechanisms lead to different design constraints:

|            | Parametric memory                              | External memory                                                  |
| ---------- | ---------------------------------------------- | ---------------------------------------------------------------- |
| Storage    | Model parameters                               | Databases, documents, indexes, graphs, or other external storage |
| Access     | Available directly during inference            | Requires retrieval                                               |
| Updating   | Training, PEFT, or model editing               | Direct changes to stored information                             |
| Freshness  | Depends on model updates                       | Can change independently from the model                          |
| Provenance | Difficult to trace to an individual source     | Can preserve sources and metadata                                |
| Deletion   | Difficult to verify for an individual fact     | Records can be removed explicitly                                |
| Capacity   | Constrained by model architecture and training | Can expand with the storage system                               |
| Latency    | No external retrieval step                     | Retrieval adds work before generation                            |

<br>

---

### [AI Agent Memory Architecture](https://www.cognee.ai/ai-agent-memory-architecture)

<br>

- An AI agent memory architecture is the arrangement of stores, pipelines and interfaces that lets an agent remember things across turns, sessions and tasks instead of starting every call from zero. It’s a is a system design, not a single database.

<br>

![](/blog/assets/report_mem_40.svg)

<br>

| Memory Type | What it holds                                                | Lifetime                        | Typical storage                            | Written by                  |
| ----------- | ------------------------------------------------------------ | ------------------------------- | ------------------------------------------ | --------------------------- |
| Working     | System prompt, recent turns, tool results, injected memories | One model call                  | The prompt itself                          | Harness, every turn         |
| Episodic    | Message log, tool traces, session summaries                  | Days to months, then summarized | Relational or document store               | Harness, automatically      |
| Semantic    | Facts, entities, relationships, with validity windows        | Until superseded or forgotten   | Vector index plus knowledge graph          | Write path after extraction |
| Procedural  | Instruction files, skills, tools, retrieval weights          | Until revised                   | Repo files, skills registry, policy tables | Humans, plus feedback loop  |

<br>

- Episodic memory is cheap to write and expensive to read, so most architectures summarize episodes into semantic facts. 

- Semantic memory is where the hard engineering is, and it benefits most from a graph: "who owns this service" and "what was true in March" are relationship and time queries, not similarity queries. 

- Procedural memory is the least automated: `CLAUDE.md`, `AGENTS.md` and `.cursor/rules` are written by humans, and the feedback loop is what lets the system write some of it.

<br>

![](/blog/assets/report_mem_41.svg)

<br>

| Option                      | Strengths                                                         | Weaknesses                                                                             | Use when                                    |
| --------------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------- |
| Vector store only           | Simplest write path; good semantic recall; mature managed options | No relationships or temporal validity; duplicates accumulate; multi-hop questions fail | Prototypes, single-user assistants          |
| Knowledge graph only        | Entities, relations, provenance, and time are native; explainable | Needs an extraction pipeline; fuzzy queries weak without embeddings                    | Relationship- and history-heavy domains     |
| Relational / document only  | Transactions, retention, and multi-tenancy are solved             | Neither similarity nor traversal is natural                                            | Episodic log, session state, audit trail    |
| All three, separate systems | Each store does what it is best at; independent scaling           | Three systems to keep consistent; deletes must succeed in all                          | Large deployments with infrastructure teams |
| All three, one engine       | One transaction, one permission model, one backup                 | Bound by the engine's weakest store; fewer hosting options                             | Full architecture without three databases   |

<br>

---

### [Long-Term Knowledge for AI Agents](https://www.cognee.ai/long-term-knowledge-ai-agents)

<br>

|                       | Long-term memory               | Long-term knowledge                    |
|-----------------------|--------------------------------|----------------------------------------|
| How data is stored    | Text chunks in a vector DB     | Entities + relationships in a graph   |
| How data is retrieved | Similarity search              | Similarity + graph traversal + lexical |
| Versioning            | Rare, bolted on                | First-class                            |
| What you get back     | The paragraphs closest to you  | A connected subgraph you can reason over |

<br>

Full architecture in how cognee builds AI memory:

```
  raw data ──▶ Extract ──▶ Cognify ──▶ Load ──▶ hybrid store
                  │           │          │         │
              entities +   dedup +    graph DB +   auto-routed
              relations    version    vector idx   recall


import cognee

# Store permanently in the knowledge graph
await cognee.remember("Customer 9132 hit a sync bug; Maya fixed it 2025-11-03.")

# Auto-routed recall picks the best search strategy for the question
results = await cognee.recall("Who resolved the last billing sync bug on this account?")

# Session memory is a fast cache that syncs to the graph in the background
await cognee.remember("User prefers monthly billing summaries.", session_id="user_123")
```

<br>

---

### [Context Graphs](https://www.cognee.ai/context-graphs-world-models-and-behavioral-validation)

<br>

- Session trace: the end-to-end, chronological record of a complete multi-turn workflow (what the agent saw, used, and produced across the whole run). 

- Decision trace: the structured rationale inside that session—what the agent believed, what it optimised for, and why it chose a specific action. 

- Context graph: the combination of (1) the relevant slice of your knowledge graph touched during the session and (2) the traces that explain how decisions were made on top of that knowledge. 

- World model: a compressed, generalized representation learned from many traces that helps predict what tends to happen next under similar conditions. Memory becomes a source of predictive leverage, not just searchable history.

<br>

A trace-driven, graph-first approach is more forgiving. It lets you start with what’s real—how work actually happens—then introduce stricter structure where it pays off:

➡️ Start without a heavy ontology when your organization’s knowledge is messy, distributed, or still being discovered through workflows. Let traces reveal what matters. 
➡️ Add ontology where it reduces friction: shared definitions across teams, compliance constraints, audit requirements, or when you need consistent joins across systems. 
➡️ Avoid using ontology as a gate that blocks value until every edge case is defined. Enterprise reality will always outpace the schema. 

<br>

---

### [Knowledge Graphs for LLMs](https://www.cognee.ai/knowledge-graph-llm)

<br>

- Knowledge graphs and LLMs fix each other's weaknesses. LLMs are fluent but forgetful and prone to invention; knowledge graphs are precise and persistent but hard to build by hand. Combined, an LLM can build and maintain a graph from unstructured data, and the graph can ground the LLM's answers in connected, verifiable facts.

- The graph lives in your choice of store — Kuzu, Neo4j, Neptune, or Postgres — and the same memory serves applications, agents, and coding tools through the MCP server. 

<br>

|                            | Knowledge graph               | LLM                              |
| -------------------------- | ----------------------------- | -------------------------------- |
| Facts                      | Explicit, exact, complete     | Implicit, approximate, patchy    |
| Reasoning over connections | Multi-hop traversal is native | Only over what fits in context   |
| Handling new information   | Add nodes and edges           | Retrain, or supply in the prompt |
| Explaining an answer       | Path through the graph        | Hard to verify                   |
| Building and maintaining   | Expensive by hand             | Can read and extract at scale    |
| Natural language           | Needs a query layer           | Native                           |

<br>

Four Ways Knowledge Graphs and LLMs Work Together:

1️⃣ the LLM builds the graph (how cognee builds memory: `remember` chunks the input, extracts entities and relationships with an LLM),
2️⃣ the graph grounds the LLM (the model's job shrinks from "know the answer" to "explain these facts," which is what it is good at)
3️⃣ GraphRAG (retrieves along relationships as well as similarity. A query finds its entry points by vector search, then expands through the graph to pull in connected context, and the combined result is ranked and handed to the model)
4️⃣ The graph as memory (For agents, the knowledge graph becomes long-term memory. Every session adds facts and relationships; contradictions are detected and resolved, so the graph reflects what is currently true while keeping the history; and retrieval is scoped to what the current task needs).

<br>

When You Need a Knowledge Graph With Your LLM:

➡️ Multi-hop questions
➡️ Fact that changes
➡️ Many entities with many relationships
➡️ Explainability
➡️  Memory across sessions and agents

<br>

---

### [Temporal Knowledge Graphs](https://www.cognee.ai/temporal-knowledge-graph)

<br>

> A temporal knowledge graph records not just that two things are related but when the relationship was true and when the system learned about it. That lets it answer point-in-time questions, keep history when facts change, and resolve contradictions instead of storing both versions.

<br>

- A knowledge graph represents entities as nodes and relationships as typed edges. A temporal knowledge graph adds time to the edges (and sometimes the nodes), so each fact carries an interval during which it holds.

- There are two different times worth tracking: 1) fact time, and 2) transaction time. These are bi-temporal graphs.

<br>

---

### [How to Build a Memory Graph for AI Agents](https://www.cognee.ai/memory-graph-for-ai-agents)

<br>

- A memory graph for AI agents is a persistent graph representation of agent memory that stores entities, events, decisions, observations, and sources as connected records with typed relationships. 

- Memory graphs need an ongoing update lifecycle for identity resolution, provenance, contradictions, revision, deletion, and bounded retrieval as the graph grows.

<br>

Nodes are persistent data points and can include:

➡️ entities, such as people, organizations, services, products, or code components; 
➡️ events, such as meetings, incidents, deployments, or transactions; 
➡️ decisions, including accepted choices and rejected alternatives; 
➡️ observations, such as a preference, constraint, or system state; 
➡️ sources, including documents, messages, tickets, commits, or API responses; 
➡️ tasks or episodes, which group records created during the same workflow or interaction. 

<br>

Edges are how those data points relate:

➡️ `DEPENDS_ON`
➡️ `CONSTRAINS` 
➡️ `SUPPORTED_BY`
➡️ `RELATED_TO`
➡️ `OWNED_BY`
➡️ `USED_BY`

<br>

A memory implementation needs rules for:

➡️ which observations become durable
➡️ who can create or revise records
➡️ how memories are scoped
➡️ how time and provenance are retained
➡️ how contradictions and later corrections are represented
➡️ when records are archived or deleted

<br>

| Term                                                                                                                | Primary role                                                                                             |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| [Knowledge graph](https://www.cognee.ai/ai-knowledge-graph)                                  | Represents domain entities and relationships in a structured graph                                       |
| Memory graph                                                                                                        | Uses graph structure as persistent agent memory, updated through observations, outcomes, and corrections |
| [Context graph](https://www.cognee.ai/context-graphs-world-models-and-behavioral-validation) | Organizes connected context from several systems for task-time access; usage varies by product           |
| [GraphRAG](https://www.cognee.ai/what-is-graphrag)                                           | Retrieves graph-connected information and assembles it as model context                                  |
| Temporal knowledge graph                                                                                            | Records when entities or relationships were valid and how they changed                                   |

<br>

---

###  [Multi-Tenant AI Memory](https://www.cognee.ai/multi-tenant-ai-memory-data-isolation)

<br>

- Multi-tenant agent memory is kept separate at three levels: logical (tenant-scoped datasets and permission checks in one store), physical (a database or namespace per tenant), and per-deployment.

- Cognee scopes memory by dataset with per-dataset permissions enforced on recall; Mem0 scopes by `user_id` and `agent_id`, Zep by users and sessions, Letta by agents and blocks. 

<br>

- Agent memory stores conversational history, documents, extracted entities, embeddings, and derived graph edges. Any of these can leak across tenants if the retrieval path is not scoped correctly. In production, three separation levels are commonly combined:

➡️ Logical separation keeps every tenant's records in the same database and the same embeddings index, with a tenant identifier on each row and permission checks applied at query time. Operational cost is low and onboarding a new tenant is a single insert, but a missing predicate in a recall query or a shared ANN index without a filter can return another tenant's vectors. 
➡️ Physical separation gives each tenant its own database, schema, or vector namespace. Cross-tenant queries become structurally impossible because the storage engine itself refuses to see other tenants, at the cost of more infrastructure to run and migrate. 
➡️ Per-deployment separation runs an entire stack per tenant, often in that tenant's VPC. This is the model regulated buyers ask for when data residency, air-gapped operation, or contractual single-tenancy is required. 

<br>

- The snippet below shows the minimum pattern for writing and reading memory with per-tenant dataset names. The dataset name encodes the tenant, and the recall call restricts search to that single dataset:

```
import cognee

async def ingest_for_tenant(tenant_id: str, documents: list[str]) -> None:
    dataset = f"tenant_{tenant_id}"
    await cognee.remember(documents, dataset_name=dataset)

async def answer_for_tenant(tenant_id: str, question: str) -> list[dict]:
    dataset = f"tenant_{tenant_id}"
    results = await cognee.recall(question, datasets=[dataset])
    return results

async def delete_tenant(tenant_id: str) -> None:
    # GDPR / contractual deletion: remove everything written under this dataset,
    # including graph nodes and vector embeddings derived from the source data.
    dataset = f"tenant_{tenant_id}"
    await cognee.forget(dataset_name=dataset)
```

<br>

---

### [Best Vector Database](https://www.cognee.ai/best-vector-database)

<br>

- Vector search can support AI memory, but persistent memory also needs ways to handle relationships, provenance, changing information, and structured context.

<br>

| If you need...                        | Start with                                         | Why                                                                                                                                                                           |
| ------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Zero operations, pay-as-you-go        | **Pinecone** or **turbopuffer**                    | Serverless; storage and compute billed separately                                                                                                                             |
| Open source with a managed path       | **Qdrant**, **Weaviate**, or **Milvus / Zilliz**   | Self-host first, move to cloud later without changing the API                                                                                                                 |
| Vectors next to your relational data  | **PostgreSQL + pgvector**                          | One database, one backup, SQL joins with metadata                                                                                                                             |
| Embedded or local-first               | **Chroma** or **LanceDB**                          | Runs in-process; no server to manage                                                                                                                                          |
| Tens of billions of vectors           | **Milvus (distributed)** or **LanceDB Enterprise** | Designed for horizontal scale                                                                                                                                                 |
| Multimodal or lakehouse-style storage | **LanceDB**                                        | Columnar format, large objects alongside vectors                                                                                                                              |
| Memory for AI agents, not just search | A vector store **plus a graph**                    | Similarity alone can't represent relationships or what superseded what |


<br>

---

### [Agent Observability](https://www.cognee.ai/ai-observability-tools)

<br>

|                          | **LLM observability**                     | **Agent observability**                                     |
| ------------------------ | ----------------------------------------- | ----------------------------------------------------------- |
| **Primary unit**         | Model call                                | Agent run or session                                        |
| **Typical visibility**   | Prompt, response, tokens, latency, errors | Model calls, retrieval, tools, state, handoffs, evaluations |
| **Main debugging focus** | What happened during this model call?     | Which sequence of events produced this agent outcome?       |

<br>

What Should an AI Observability Tool Track?

|                                 | What to check                                                                                                     |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Agent tracing                   | Complete runs, nested agents, tool calls, retries, handoffs, and execution order                                  |
| Evaluations                     | Production scoring, offline experiments, regression testing, datasets, and human or automated feedback            |
| Retrieval and memory visibility | Queries, returned context, memory reads and writes, updates, scope, and information passed into later model calls |
| Operational monitoring          | Latency, token usage, model cost, errors, dashboards, and alerts                                                  |
| Standards and deployment        | OpenTelemetry or OpenInference support, telemetry export, self-hosting, and control over observability data       |

<br>

8 AI Observability Tools for Agents in 2026:

| Project                                                                                        | Core focus                                                         | Memory and retrieval visibility                                              | Deployment options                          |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------- | ------------------------------------------- |
| [LangSmith](https://github.com/langchain-ai/langsmith-python)                  | Agent tracing tied closely to evaluation                           | Dedicated retriever traces; custom tracing for other operations              | Cloud; hybrid; Enterprise self-hosting      |
| [Langfuse](https://github.com/langfuse/langfuse)                        | OpenTelemetry-based observability with an MIT-licensed core        | Generic observations and sessions can capture retrieval or memory operations | Cloud or self-hosted                        |
| [Arize Phoenix](https://github.com/Arize-ai/phoenix)                    | OpenInference/OpenTelemetry tracing and RAG evaluation             | Explicit retrieval traces; custom spans for application logic                | Local, containerized, or Phoenix Cloud      |
| [Braintrust](github.com/braintrustdata/braintrust-cookbook)              | Evaluation-centered production observability                       | Agent-observability guidance explicitly includes memory reads and writes     | Cloud; customer-hosted data plane available |
| [Comet Opik](https://github.com/comet-ml/opik)                          | Open-source tracing and trajectory evaluation                      | Custom spans can include retrieval and memory activity                       | Cloud or self-hosted                        |
| [W&B Weave](https://github.com/wandb/weave)                             | Agent tracing and evaluation within the W&B ecosystem              | Instrumented operations can include retrieval or memory calls                | W&B platform                                |
| [Datadog Agent Observability](https://github.com/DataDog/datadog-agent) | AI traces connected with application and infrastructure monitoring | Custom/manual spans can capture memory operations                            | Datadog platform                            |
| [AgentOps](https://github.com/AgentOps-AI/agentops)                     | Agent-specific hierarchical execution traces                       | Custom operation spans can represent memory activity                         | Hosted or self-hosted                       |

<br>

---

### ✨ Design checklist for your own agent memory architecture ✨

<br>

1️⃣ Working memory budget. How many tokens are reserved for injected memories, and what is evicted first?
2️⃣ Write trigger. Every turn, end of session, explicit remember calls, or a background job?
3️⃣ Extraction schema and entity resolution. Free-form facts, triples, or a typed ontology; what makes two mentions the same entity?
4️⃣ Conflict policy. Overwrite, append or supersede with validity windows? Only the third answers "what did we believe in March".
5️⃣ Episodic retention. How long raw logs are kept and when they are summarized.
6️⃣ Retrieval routing and ranking. Which query types go to vector, lexical, graph or episodic search; which signals rank them; are weights learned from feedback?
7️⃣ Source attribution. Does every injected memory carry provenance?
8️⃣ Forgetting. Can one forget call remove a fact from graph, vector index and log together, within tenant scope?
9️⃣ Scopes, permissions and interface. Which scopes exist, are read, write, delete and share separate rights, and is memory exposed as native tools, MCP, or both?
🔟 Evaluation. Task success with and without memory, retrieval precision, p95 latency.

<br>

---

### Additional Resources

<br>

- [Cognee docs](https://docs.cognee.ai/getting-started/introduction)
- [Cognee examples](https://github.com/topoteretes/cognee/blob/main/examples/README.md)
- [Cognee in Rust](https://github.com/topoteretes/cognee-rs)
- [Cognee Benchmarks](https://www.cognee.ai/research-and-evaluation-results)

<br>
<br>

---

## 🟪 [Zep (Python, TypeScript, Go)](https://github.com/getzep/zep) (Temporal Memory for Evolving Facts)

<br>

> *A memory layer service built on **[Graphiti](https://github.com/getzep/graphiti)**, a knowledge graph engine that keeps track of time, and it takes in both unstructured messages and structured business data.*

> *The graph has three levels. **Episodes** store the raw input (messages, text, or JSON) and are never discarded, which makes them the base of everything else. A **semantic entity layer** sits above them, holding entities extracted from episodes and merged with entities already in the graph. At the top, **communities** are groups of closely connected entities that Graphiti finds with label propagation and summarizes in a summary node for each group.*

> *Its most distinctive feature is a bi-temporal model: one timeline records when events actually happened, and a second records when Zep ingested the data. When a new fact contradicts an older one, Zep marks the old edge with an invalid_at timestamp instead of deleting it, so the history survives while current facts stay correct.*

> *For retrieval, it uses a hybrid search that combines cosine similarity, BM25 full-text search, and breadth-first graph traversal, which lets agents reason over facts that change over time and across many sessions.*

<br>

---

### [Zep: A Temporal Knowledge Graph Architecture for Agent Memory (P. Rasmussen et al., 2025)](https://arxiv.org/pdf/2501.13956)

<br>

-  While existing retrieval-augmented generation frameworks for LLM-based agents are limited to static document retrieval, enterprise applications demand dynamic knowledge integration from diverse sources including ongoing conversations and business data. Zep addresses this fundamental limitation through its core component Graphiti—a temporally-aware knowledge graph engine that dynamically synthesizes both unstructured conversational data and structured business data while maintaining historical relationships.

- Memory is powered by a temporally-aware dynamic knowledge graph `G = (N , E, φ)`, where `N` represents nodes, `E` represents edges, and `φ : E → N × N` represents a formal incidence function. This graph comprises three hierarchical tiers of subgraphs: an episode subgraph, a semantic entity subgraph, and a community subgraph.

- The dual storage of both raw episodic data and derived semantic entity information mirrors psychological models of human memory.

- Zep graph search API implements a function that accepts a text-string query as input and returns a text-string context as output. The output contains formatted data from nodes and edges required for an LLM agent to generate an accurate response to query. The process comprises three distinct steps: 1) Search, 2) Reranker, 3) Constructor.

- Zep implements three search functions: cosine semantic similarity search, Okapi BM25 full-text search, and breadth-first search. The first two functions utilize Neo4j’s implementation of Lucene.

<br>

---

### [Reasons Context Graphs are Effective](https://www.getzep.com/blog/context-graphs-unusually-effective/)

<br>

> A context graph is a knowledge graph built to give agents context. It holds the entities in your data and the facts that connect them, along with when each fact was true and where it came from. An entity is a person, a company, a ticket, a product, or another thing that the data mentions. A relationship connects two entities and represents a fact about them.
> Vector RAG returns text chunks that are similar to the query. A context graph returns entities and facts, follows relationships across several hops, and stores when each fact was true. A graph search can also use vector similarity and BM25 keyword search, so it keeps the methods of vector RAG and adds the relationships between results.

<br>

- A context graph can connect them, because every kind of data contains the same two things: entities, such as the customer, and the relationships between them.

- Vector search finds text that looks like the question. In a graph, the answer is a path.

- When a fact changes, a chunk index can return both the old and the new version, and the agent can't tell which one is current. A text chunk can mention dates, but it has no separate start and end time for each fact it contains. 

- A pattern summary is a materialized view. The agent reads one statement about John's routine instead of five weeks of facts.

- A context graph costs more to build than a store of raw text, because an LLM has to extract the entities and relationships. The cost pays off over time. Without a graph, the expensive model reads raw text for every question, including text it has already read many times. With a graph, extraction happens once, when the data arrives, and every later question reuses the facts.

<br>

---

### [How Zep Tracks Provenance in Agent Memory](https://www.getzep.com/blog/how-zep-tracks-provenance-in-agent-memory/)

<br>

> Provenance is the record of where a piece of information came from and how it was produced. In agent memory, that means being able to take any fact an agent retrieves and name the raw sources behind it: which chat message, document, or record it was derived from, and what has happened to it since.

<br>

- When building memory, LLM extraction breaks source tracking. Several sources produce one fact whose wording matches none of them, entities merge, and new data invalidates old facts. A scalar `source_id` on the fact cannot represent any of this. Every agent memory system built on LLM extraction has this problem.

- Zep records provenance as graph structure. Raw sources are kept verbatim as episodes. Every derived node and edge is associated with the episodes that produced it, written at construction time. Tracing a fact to its source is a graph traversal.

- The associations are maintained through mutation. When entities merge, the merged node keeps the episode associations from both sides. A fact accumulates every episode that extracted, reaffirmed, or invalidated it, with `valid_at` and `invalid_at` timestamps.

- Provenance enables access control. A metadata tag applied to an episode at ingestion is readable on every fact derived from it. Zep's attribute-based access control and search filters evaluate these projected attributes, so retrieval can be scoped by source without a separate access system.

- Deletion propagates along the same associations. Graphiti's `remove_episode` removes a fact or node only when no remaining episode supports it, which is the propagation behavior a right-to-be-forgotten implementation needs.

<br>

An ETL pipeline copies or transforms one value deterministically, lineage is one-to-one, and a single pointer records it exactly. LLM extraction breaks the assumptions behind that pointer in three ways:

➡️ Many sources, one fact.
➡️ Entities merge.
➡️ Facts invalidate.

<br>

Lineage must be set-valued, survive mutation, answer queries. Set-valued links between facts and sources, maintained through mutation and exposed to queries, are relationships, and Zep models them on the graph itself. Three primitives carry the design:

➡️ Episodes are the raw sources: a chat message, a document chunk, a JSON record. Zep keeps them byte-for-byte as ingested, and they remain retrievable. 
➡️ Entities are the nodes the LLM extracts across episodes. 
➡️ Facts are time-stamped relationships on the edges between entities.

<br>

---

### [Defending Agent Memory Against Poisoning](https://www.getzep.com/blog/defending-agent-memory-poisoning/)

<br>

- Memory poisoning is prompt injection with persistence. Agent memory persists across sessions or users. One poisoned input, such as a message or a fetched web page, can influence answers and tool calls long after the attacker's session ends.

- Retrieval must consider source, not similarity alone. A search that ranks on relevance serves poisoned content as readily as real content. Zep can filter by source metadata inside the service, before results return, through filtered search or access policies.

- Provenance and retained history make repair possible.

<br>

| Control | Application layer | Zep |
|---|---|---|
| Write admission | Validates content, decides what to store | Ingestion APIs, per-user graph isolation |
| Identity scoping | Derives `user_id` / `graph_id` from auth state | User graphs, standalone graphs |
| Provenance | Labels sources at ingestion | Episode metadata, projection onto derived facts |
| Conflicting claims | Decides which sources may update which fields | Bi-temporal facts; invalidation keeps the prior fact |
| Scoped retrieval | Declares eligible sources per request | Server-side metadata and search filters |
| Least privilege | Issues one key per agent | ABAC policies on API keys (Enterprise) |
| Instruction isolation | Prompt assembly, message roles | Returns context as data |
| Action authorization | Deterministic gate, systems of record | Provides cited evidence, never authority |
| Detection | Alerts on write and retrieval behavior | API and audit logs (Enterprise), time-filtered listing |
| Investigation and repair | Decides what to exclude or delete | Episode associations, deletion APIs |

<br>

---

### [Evaluating Nemotron 3 Embed for Agent Memory](https://www.getzep.com/blog/evaluating-nemotron-3-embed-for-agent-memory/)

<br>

- Recall errors compound in Zep's graph retrieval: Semantic and BM25 full-text search select the entrypoints into a Context Graph; traversal expands from those nodes, so a fact missed at the entrypoint is unreachable downstream.

- We benchmarked NVIDIA's Nemotron 3 Embed 1B. Each task probes a different retrieval shape: 1) facts — short edge-fact sentences (30,093 documents), 2) fact concatenations — deterministic per-entity strings joining an entity's extracted facts (34,467 documents), 3) summaries — abstractive entity summaries written by an LLM from the source episodes (34,923 documents).

- Nemotron 3 Embed 1B is the strongest embedding model we have tested on our workload: first on all three tasks and statistically significant against every alternative, with a quantized serving path that addresses encode cost at scale.

<br>

---

### [Markdown is not Agent Memory](https://www.getzep.com/blog/markdown-is-not-agent-memory/)

<br>

- Markdown memory is a legitimate pattern. Manus runs "filesystem as context" at millions of users; Claude Code and Letta's MemFS keep agent memory in markdown files. For a single agent and a single user it is simple and runs with no infrastructure.

- The best implementations are more disciplined than a single growing file. Anthropic calls the principle progressive disclosure: the context window is finite, so the agent pulls in only the context a step needs. Letta's MemFS keeps a `system/` directory always in context and exposes the rest as filenames and descriptions, and loads contents only when needed. Manus keeps state restorable rather than resident: it drops a web page's content from context as long as it keeps the URL. The filesystem is disk to the context window's RAM, and the agent pages in what it needs.

- Errors compound. A file records what was written, not what it replaced or why, so later turns build on bad facts. Git tracks line edits, not a fact's validity or source, and doesn't reconcile contradictions.

- Concurrent agents diverge. Without git, writes to one file race; with git, related files diverge logically with nothing to reconcile them against the source.

- The fixes turn memory into a system. Recording when a fact was true and where it came from is more than a file holds, and it is the point where a database or a temporal graph earns its place.

- Multiple agents sharing one memory hit two problems. Without git, two agents writing the same file at once have no reliable lock. File locking is inconsistent across platforms and breaks on network filesystems, so the writes race and clobber each other.

<br>

| Concern | Markdown Memory | What a Fix Requires |
| --- | --- | --- |
| **Retrieval at scale** | Whole-file selection; degrades as it grows | Ranked retrieval that stays fast |
| **Changing facts** | Overwrites or piles up; no history | Validity intervals; point-in-time queries |
| **Provenance** | None; git logs commits, not facts | Each fact linked to its source |
| **Concurrent agents** | Races without git; diverges with it | Reconciliation against source and timeline |
| **Governance** | File permissions; manual deletes | Isolation, retention, and audit below the layer |

<br>

---

### [Why We Built a Graph Database Service for Agent Memory](https://www.getzep.com/blog/why-we-built-a-graph-database-service-for-agent-memory/)

<br>

- Konig is Zep's purpose-built graph database for agent memory: millions of knowledge graphs, one per user, team, or project, most in cold storage and all temporal and governed.

- Retrieval latency holds near-constant as the number of graphs grows: p95 retrieval stays under 100ms from a thousand graphs to tens of millions, and Zep's full end-to-end retrieval stays under 200ms at that scale. Cost tracks activity, not capacity: hot graphs serve from RAM and idle graphs are evicted to object storage.

- A single query fuses vector, full-text, graph, and pattern signals into one ranked answer. Graph analytics that normally run offline as batch jobs, like PageRank, run inline in milliseconds.

- Every graph has its own full-text and vector indexes inside its snapshot: exact kNN with SIMD kernels by default, an IVF index with SPFresh/LIRE incremental maintenance as graphs grow. There's no shared search cluster to operate.

- A graph is the right structure for this data. Relationships are first-class, so traversal replaces the joins a relational or document store would require. Provenance is built in: each fact is an edge that references the source data it was extracted from, so tracing why an agent holds a belief is a traversal. Time fits the model as well, since an edge can store when a relationship held in the world and when the system recorded it.

- Security: isolation between graphs and customer-controlled encryption, in a deployment model that matches the customer's compliance requirements.

- General-purpose graph databases often assume one large graph: mostly resident in memory, traversed by complex queries, against a schema fixed in advance. Agent context is the inverse workload: millions of smaller graphs, most cold at any moment, each temporal and governed independently. Graphs have a reputation for being slow and hard to scale. In our case the cause was the database's fit to this workload, not the graph model itself.

- The query interface is the clearest example. Konig exposes a gRPC API: mutate, search, traverse, and a small set of lookups. It has no general-purpose query language such as Cypher. That removes a large part of what makes a database hard to build. There is no grammar to parse and no query optimizer to keep fast across arbitrary queries. The parsing and planning layer that consumes significant effort in a general-purpose database does not exist in Konig.

- Hot graphs live in RAM and serve most queries at microsecond latency. Snapshots are periodically written to both local ephemeral NVMe and object storage. A graph evicted from RAM due to inactivity stays warm while its snapshot remains on local NVMe, where it reloads in low milliseconds. After longer idleness the local copy is pruned and the graph goes cold, leaving only the snapshot in object storage.

- A cold graph costs almost nothing to retain and reloads from object storage on its next request. After optimizing how we use our cloud provider's object storage, we've gotten cold load down to low hundreds of milliseconds. Promotion to hot is lazy; no background process warms graphs that are not in use.
- Cost tracks active graphs, not total graphs. A deployment with a million graphs and one percent hot pays for one percent of the memory; the rest is in object storage at object-storage prices. This is the data-lake pattern applied to agent context: the working set stays in fast storage and the long tail costs little.

<br>

![](/blog/assets/report_mem_37.avif)

<br>

- Konig offers several approaches to context retrieval from the graph. These include lexical relevance via BM25 and vector similarity for semantic meaning. These lexical and semantic search results may function as seeds to graph-structural queries such as BFS (Breadth-First Search) and Personalized PageRank. Doing so optimizes these operations by narrowing them to subgraphs. No separate search cluster, such as Elastic or OpenSearch, is needed.

- Every graph has its own set of full-text and vector indexes, stored as companion structures inside its snapshot. The indexes are tiered, snapshotted, replicated, and deleted together with the graph they serve. BM25 runs against the per-graph full-text indexes; vector search runs against the per-graph vector indexes, one per embedding model.

- An adjacency list is the standard structure for a graph that changes. Each node keeps a list of its own edges, so adding a relationship appends one entry to one node's list, and traversal from a node reads only that node's neighbors. Konig holds each graph in RAM this way: integer-indexed arrays of nodes, each with its edge list. Mutation and traversal, the operations the in-memory workload runs constantly, are cheap.

- Adjacency lists are a poor fit for linear-algebra workloads such as PageRank and motif finding, an approach to identifying graph patterns. Those algorithms process every edge in bulk, and they run fastest over a compressed-sparse-row (CSR) matrix: all edges packed into one contiguous array, with an offset index marking where each node's edges begin. The layout is compact, and because the CPU reads memory in cache lines, a scan over a packed array uses every byte it fetches; the whole graph streams through the CPU in order.

<br>

![](/blog/assets/report_mem_38.webp)

<br>

- A key Zep innovation is the use of bi-temporal facts. Every edge, on which a fact is materialized, has four timestamps. Two record the world: when the relationship became true and when it stopped being true. Two record the system's knowledge: when Zep first recorded the fact and when it learned the fact was no longer valid. Truth and knowledge are separate timelines, and Konig natively tracks both.

- Snapshots compact the log periodically: they collapse tombstones and compress the result, with a checksum to detect corruption. Each snapshot persists to multi-AZ object storage, with a local NVMe copy for fast warm loads. Recovery loads the latest snapshot and replays the log written since; the graph is then current. If a snapshot is missing, Konig rebuilds from the log alone.

- Failover needs no central coordinator. Shards write heartbeats. A leader-elected reconciler removes a shard from membership when its heartbeats stop, and rendezvous hashing re-derives the new owners. gRPC requests may hit any shard and then be routed to a graph owner. Surviving shards usually discover a shard is lost in the course of a request: forwarded requests hit a dead peer and the connection fails. The surviving shard refreshes membership, and the retry reaches the new owner, which cold-loads the graph from object storage and the log. No data is lost, because durability never depended on any single shard.

<br>

---

### Additional Resources

<br>

- [Zep Documentation](https://help.getzep.com/overview)
- [Zep's Context Lake](https://help.getzep.com/context-lake)
- [Zep Benchmarks](https://www.getzep.com/blog/tag/benchmarks/)

<br>
<br>

---

## 🟪 [Letta (TypeScript)](https://github.com/letta-ai/letta-code) (Memory Built into the Agent Runtime)

<br>

> *Letta (formerly MemGPT) borrows its memory design from operating systems, letting an LLM act like an OS that manages its own context window through paging, tool calls, and archival search.*

> *Its memory is split into tiers. **Core memory** works like RAM: it sits inside the context window at all times and holds labeled memory blocks, such as the agent's persona and facts about the user, alongside the system instructions. Each block has a character limit, so the agent has to manage that space itself. **Recall memory** stores older conversation history outside the context window, which the agent can query with a `conversation_search` tool. **Archival memory** acts like disk: it is a vector database for long-term facts and external data sources, read and written with `archival_memory_search` and `archival_memory_insert`.*

> *What makes Letta distinctive is that the agent manages its memory on its own. It edits its memory blocks with tools, and it decides what to keep in view, what to archive, and when to search. The drawback is cost, because every memory operation uses LLM tokens, which can break prompt caching and add latency.*

<br>

---

### [MemGPT: Towards LLMs as Operating Systems (C. Packer et al., 2024)](https://arxiv.org/pdf/2310.08560)

<br>

> MemGPT (MemoryGPT) intelligently manages different storage tiers in order to effectively provide extended context within the LLM’s limited context window.

> MemGPT’s OS-inspired multi-level memory architecture delineates between two primary memory types: main context (analogous to main memory/physical memory/RAM) and external context (analogous to disk memory/disk storage).

<br>

- Directly extending the context length of transformers incurs a quadratic increase in computational time and memory cost due to the transformer architecture’s self-attention mechanism, making the design of new long-context architectures a pressing research challenge.

- To enable using context beyond limited context windows, we propose virtual context management, a technique drawing inspiration from hierarchical memory systems in traditional operating systems which provide the illusion of an extended virtual memory via paging between physical memory and disk. 

- The FIFO queue stores a rolling history of messages, including messages between the agent and user, as well as system messages (e.g. memory warnings) and function call inputs and outputs. The first index in the FIFO queue stores a system message containing a recursive summary of messages that have been evicted from the queue.

<br>

![](/blog/assets/report_mem_33.webp)

<br>

- MemGPT orchestrates data movement between main context and external context via function calls that are generated by the LLM processor.

<br>

---

### MemFS

<br>

- MemFS is how a Letta agent works with its long-term memory. The memory itself is part of the agent’s state, held in a git repository that belongs to the agent — hosted by Letta for cloud agents, alongside its conversations and configuration.

```
$MEMORY_DIR/
├── MEMORY.md
├── persona.md
├── human.md
├── reference/
│   ├── MEMORY.md
│   └── project-notes.md
└── skills/
    └── my-skill/
        └── SKILL.md
```

<br>

---

### [RAG Is Not Agent Memory](https://www.letta.com/blog/rag-vs-agent-memory/)

<br>

- RAG often places irrelevant data into the context window, resulting in context pollution and degraded performance (especially for newer reasoning models).

- RAG rose in popularity because of its simplicity: you embed a document in your LLM workflow, use an algorithm to find the top-K-related snippets of that document, and then deposit those snippets into the context window.

- RAG is single step. LLMs get “one shot” at retrieving the most relevant data and generating a response. While that can work, it often doesn’t. T

- RAG is purely reactive. RAG isn't going to retrieve personalization information that isn’t semantically similar.

- Multi-step reasoning with tools is “agentic RAG,” and it’s the underlying foundation of Letta. 

- Agentic RAG’s iterative methodology updates results each time it retrieves and reviews more information, generating a more holistic and accurate response than if it retrieved information and generated responses only once.

<br>

---

### [Context Repositories: Git-based Memory for Coding Agents](https://www.letta.com/blog/context-repositories/)

<br>

- Context Repositories is a rebuild of how memory works in Letta Code based on programmatic context management and git-based versioning. 

- Agents can leverage their full terminal and coding capabilities to manage context, such as progressive disclosure and rewriting context for learning in token-space. In comparison, prior approaches to memory limited agents to MemGPT-style memory tools or virtual filesystem operations.

- Files are simple, universal primitives that both humans and agents can work with using familiar tools. Following the Unix philosophy, agents can chain standard tools for complex queries over memory, use bash for batch operations (e.g., `for file in /memory/*/; do ...;`), or write scripts to process memory programmatically.

- Files in the context repository are designed for progressive disclosure, similar to patterns recommended for agent skills. The filetree structure is always in the system prompt, so folder hierarchy and file names act as navigational signals. Each memory file also includes frontmatter with a description of its contents, similar to the `YAML` frontmatter in Anthropic's `SKILL.md` files.

- Memory formation and learning in agents are single-threaded: if an agent wants to learn from data or a prior trajectory, it processes it sequentially (such with sleep-time agents current), because there's been no mechanism to coordinate concurrent writes to memory. Git changes this. By giving each subagent an isolated worktree, multiple subagents can process and write to memory concurrently, then merge their changes back through git-based conflict resolution.

- Letta Code has built-in skills and subagents for memory management designed to work with Context Repositories: 1) Memory initialization, 2) Memory reflection, 3) Memory defragmentation.

<br>

---

### [Dynamic workflows for stateful agents and decision models](https://www.letta.com/blog/dynamic-workflows/)

<br>

- Dynamic workflows: agents can write scripts that orchestrate many subagents at once. They can spawn many subagents, so per-call cost adds up fast. Low-cost models with strong coding ability, such as DeepSeek V4.1 Flash and GPT-6 Luna, make large fan-outs practical. 

- They are built from a small set of primitives: `agent()`, `parallel()`, `pipeline()`, and `decide()`.

 - Context Repositories are git-backed, so every change to memory is automatically versioned with informative commit messages. Git tracking also enables concurrent, collaborative work across multiple subagents, which can manage divergence and conflicts between learned context through standard git operations.

- Files in the context repository are designed for progressive disclosure, similar to patterns recommended for agent skills.

- By giving each subagent an isolated worktree, multiple subagents can process and write to memory concurrently, then merge their changes back through git-based conflict resolution.

- Memory repositories are agnostic to the mechanism for memory management, but open up more possibilities for how memory and context engineering can be designed. 

<br>

---

### [Introducing Mods: Enabling Agents to Self-Improve through Harness-Level Adaptation](https://www.letta.com/blog/introducing-mods/)

<br>

- An agent-friendly way to extend and adapt the Letta Code harness. Mods let an agent modify the runtime it executes in — adding tools, commands, and UI, or changing how context is fed into the model — so that the harness itself becomes something an agent can learn.

- Letta Code agents are designed to self-adapt through context using skill and system-prompt learning. Every agent has a built-in MemFS that versions and stores all of the context available to it, including prompts and skills. Both background memory agents and the agent itself can revise this context, so the agent learns and improves with experience and feedback.

<br>

Harness-level modifications let an agent self-improve in ways that learned context alone cannot:

➡️ Modify context: An agent that keeps losing track of time in a use case that depends on it can modify the harness to attach a timestamp to every user message — rather than trying to infer or remember the current time on each turn.
➡️ Extend capabilities: Instead of (or alongside) learning a skill, the agent can add new tools to the harness, or add features like automated secret scanning or plan mode.
➡️ Compact: The agent can change the method or prompt used for compaction so that it better fits the environment it runs in.

<br>

---

### [Memory Models: Towards Agents that Learn](https://www.letta.com/blog/towards-agents-that-learn/)

<br>

- The most valuable agents in the future will be multi-model: agents that can carry their memory and learning across model generations (and even new model architectures) to combine frontier intelligence with compounding expertise. 

- Agents will also be compound systems composed of several underlying models working in orchestration, including general-purpose coding models and low-latency models for real-time interaction. 

- In this multi-model future, token-space representations serve as the vital connective tissue between all models in the greater system - and the primary mechanism for continual learning.

- Token-space learning will also become more powerful as in-context learning capabilities of models continue to improve. While models are a depreciating asset, learning and memory represented in token space is an appreciating asset: as models improve, representations can be transferred to new models that leverage the learnings even more effectively through more powerful ICL capabilities.

- Memory formation through general-purpose models is not capable enough to power long-term self-improvement: 1) Memories become generic and lossy after repeated refinements, 2) Memories are overly specific rather than generalizable learnings, 3) Memories fail to consistently adapt the behavior of agents across sessions with the same model, and across different models.

- Long context (e.g. 1M or 10M token context windows), or methods for using context more efficiently during a task, like self-compaction, context folding, and Recursive Language Models (RLMs) help extend the task horizon for increasingly challenging coding tasks, but are not mechanisms for true continual learning.

- We believe continual learning will be solved by creating agents that learn to learn in token-space via memory models, which are models specialized in the generation and curation of context. Memory models are optimized end-to-end through meta-RL to create token-space memories that enable the agent to successfully learn across tasks by creating durable memories that improve future performance.

- Rather than using RL to optimize a model for task performance directly, we instead use RL to optimize a compound system where a specialized memory model is responsible for cross-task and cross-model learning.

- Distillation of memories from tokens to weights can provide additional gains in personalization and efficiency.

<br>

---

### Additional Resources

<br>

- [Letta docs](https://docs.letta.com/)
- [Letta Benchmarks](https://www.letta.com/blog/letta-leaderboard/)

<br>
<br>

---

## 🟪 [Hindsight (Python)](https://github.com/vectorize-io/hindsight) (Agent memory focused on making agents learn over time across sessions)

<br>

> *Hindsight treats agent memory as a structured foundation for reasoning in its own right, rather than as an external, unstructured layer added onto the model. At its center is a memory bank divided into four logical networks (world, experience, opinion, and observation) along with three core operations: retain, recall, and reflect.*

> *The world and experience networks hold objective facts about the outside world and about the agent's own experiences. The opinion network holds subjective beliefs with confidence scores that change as new evidence comes in, and the observation network holds neutral summaries of entities built from the underlying facts. Keeping these networks separate lets the agent tell evidence apart from inference, and lets developers check why it answered the way it did.*

> *Two components handle the operations. TEMPR covers retain and recall: it extracts narrative facts with time ranges, resolves entities, links them in a graph, and retrieves memories using several search strategies. Those strategies run in parallel: semantic vector search, BM25 keyword search, graph traversal over entity, causal, and temporal links, and explicit filtering by time. CARA covers reflect: it combines the retrieved memories with an agent profile (a name, a background, and parameters that shape the agent's disposition) to produce responses shaped by the agent's preferences, and to form and strengthen its opinions over time.*

<br>

---

### Components

<br>

➡️ Continuous logging: Store every user and assistant message in a database or vector store.
➡️ Periodic summarization: Use an LLM to create a summary of the last N interactions, or of the full conversation, and persist that summary as a “hindsight” artifact.
➡️ Heuristic retrieval: At inference time, choose a mix of the most recent messages, one or more long-term summaries, or a few semantically similar snippets.
➡️ Prompt rehydration: Construct a final prompt combining system instructions, the user query, recent messages, and summaries.

<br>

---

### Memory Types

<br>

Hindsight uses biomimetic data structures to organize agent memories in a way that is more like how human memory works:

➡️ World facts: facts about the world ("The stove gets hot")
➡️ Experiences: the agent's own experiences ("I touched the stove and it really hurt")
➡️ Observations: consolidated, evidence-backed beliefs formed from many memories
➡️ Mental models: learned understanding of the agent's world, synthesized from observations and facts
➡️ Knowledge page: a living document the bank writes about itself

<br>

---

### Multi-Strategy Retrieval

<br>

`recall()` runs four searches in parallel, because no single one handles every question:

➡️ Semantic: meaning rather than wording
➡️ Keyword (BM25): the names and technical terms an embedding blurs together; five pluggable Postgres backends, including one that works on a Citus cluster
➡️ Graph: entity links, so a fact reachable in two hops comes back even when it shares no words with the query
➡️ Temporal: time expressions parsed into a window, then filled by relevance and spread across the range

<br>

Then the part that matters more than any single arm:

➡️ Fused by rank, not score — a memory several strategies agree on wins, and no arm's scoring scale can dominate the others
➡️ Re-ranked by a cross-encoder that reads the query and the memory together
➡️ Cut to a token budget, not a top-k — you say how much context you can afford and Hindsight fills it, because agents budget in tokens and not in result counts

<br>

---

### Agentic Wrapper

<br>

```
from openai import OpenAI
from hindsight_litellm import wrap_openai

# Wrap your existing LLM client and you're done.
# Defaults to Hindsight Cloud; pass hindsight_api_url for a self-hosted server.
client = wrap_openai(
    OpenAI(),
    bank_id="user-123",
    hindsight_api_url="http://localhost:8888",
)

# Hindsight recalls relevant memories before the call
# and retains the conversation after it.
response = client.chat.completions.create(
    model="gpt-5-mini",
    messages=[{"role": "user", "content": "What do you know about me?"}],
)
```

<br>

---

### [Thirty Agents, One Memory](https://hindsight.vectorize.io/blog/2026/10/20/agent-swarm-memory)

<br>

- Nothing in Hindsight ever merges two raw facts. Twenty agents reaching the same conclusion write twenty rows, permanently. That is the audit trail working as designed, not a dedup failure.

- Consolidation is what turns redundancy into evidence. An observation's `proof_coun`t is a count of distinct live source memory `ids`, so twenty agents agreeing becomes one observation citing twenty facts — independent corroboration is the one thing a swarm can give memory that a single agent structurally cannot.

- Concurrency bites hardest on entity names, not facts. Variant merging is in-batch, and a swarm's writes are separate retains, so convergence falls to matching against entities already committed.

- A worker without a stable `document_id` does not retry, it duplicates.

<br>

---

### [Recall vs. Reflect](https://hindsight.vectorize.io/blog/2026/07/24/recall-vs-reflect)

<br>

- Your agent writes to agent memory with `retain`. 

- `recall` retrieves. It finds the memories relevant to a query and returns them as a ranked list of facts. No LLM. Sub-second. Cheap. 

- `reflect` reasons. It is an agent that searches your memory across several levels and uses an LLM to synthesize an answer. Slower. Costs a model call.

<br>

|                       | `recall`                       | `reflect`                                    |
| --------------------- | ------------------------------ | -------------------------------------------- |
| Job                   | Retrieve relevant memories     | Reason across memories to answer             |
| LLM involved?         | No, embeddings + reranker only | Yes, agentic loop with an LLM                |
| Returns               | A ranked list of facts         | A synthesized answer (optionally structured) |
| Speed and cost        | Sub-second, near-free          | Slower, costs a model call                   |
| `budget` controls     | Search depth                   | How thoroughly the agent explores            |
| `max_tokens` controls | Size of the returned facts     | Length of the final answer                   |
| Cited sources         | The facts are the result       | `include_based_on` returns validated sources |
| Best for              | "What did I say about X?"      | "What should I do about X?"                  |

<br>

---


### [Agent Swarms](https://blog.openviking.ai/post/agent-swarm-memory/)

<br>

| Road                | Examples                                               | What’s missing                                                     |
| ------------------- | ------------------------------------------------------ | ------------------------------------------------------------------ |
| Task orchestration  | Multi-agent research, Agent Teams, Cursor agent swarms | “Who it is” — nameless, destroyed when the task ends               |
| Sandbox simulation  | Generative Agents, Project Sid                         | The real world — has memory, but locked in a closed sandbox        |
| Open community      | Moltbook                                               | Social memory — scale that decayed into prompt theater             |
| Human-inside spaces | The Colony, Raft, Coze 3.0, Buzz                       | An answer on memory and identity — the question this post takes on |

<br>

A database-shaped stack for agent context:

| Layer              | Components                                                                          | Responsibility                                    | Interface      |
| ------------------ | ----------------------------------------------------------------------------------- | ------------------------------------------------- | -------------- |
| Agent surface      | CLI, SDK, MCP, Skills, VikingBot                                                    | Navigation commands and resource URIs             | `viking://...` |
| OpenViking server  | Python: identity, parsing, model calls, queues, retrieval, sessions                 | Coordinates reads, writes, retries, and isolation | API + jobs     |
| Context filesystem | VikingFS URIs over RAGFS (Rust, embedded), path locks, L0/L1 sidecars               | Turns context into paths agents can traverse      | `ls/tree/read` |
| Storage substrate  | Vector index (embedded C++ engine or VikingDB), local or S3-compatible file storage | Durability, retrieval, filters, and artifacts     | Index + files  |

<br>

---

### Additional Resources

<br>

- [Hindsight docs](https://hindsight.vectorize.io/)
- [Hindsight + Hermes](https://hindsight.vectorize.io/blog/2026/09/25/hindsight-hermes-plugin-catalog)
- [hs-decide-1-flash (0.8B decision model)](https://huggingface.co/hindsight-ai/hs-decide-1-flash) ([blog post](https://hindsight.vectorize.io/blog/2026/11/03/hindsight-models))
- [Hindsight Benchmarks](https://benchmarks.hindsight.vectorize.io/) and for [Agent Memory](https://agentmemorybenchmark.ai/)

<br>
<br>

---

## 🟪 [Supermemory (TypeScript, Python)](https://supermemory.ai) (Context Engine that Automatically Extracts Profiles and Manages Memory)

<br>

> *A memory and context engine that sits between an AI application and whichever model it calls. At its core, the engine has three main parts: a `Memory Engine` that extracts facts and resolves contradictions, `User Profiles` that maintain static and dynamic context about each user, and `Hybrid Search` that combines RAG with memory retrieval.* 

> *Text, files, chats, and connector data all flow in through two paths. The RAG path handles search over documents, while the user memory path builds a memory graph that tracks how facts change over time. When content is ingested, a 50-page PDF, for example, is broken into hundreds of interconnected memories, each linked to its context and to other knowledge. Those memories are connected through typed relationships.*

> *When new information contradicts or updates something already stored, Supermemory records an "update" relationship and uses an `isLatest` field so searches return the current version. When new information adds to existing knowledge without replacing it, it records an "extends" relationship instead. The system also applies decay, so that, much as people forget where they parked weeks ago but remember yesterday's important meeting, older and less relevant memories fade.*

> *The backend (the API server, ingestion pipeline, and memory engine) is closed source, and the open-source repository contains the client SDKs, framework integrations, MCP server, and web app.*

<br>

![](/blog/assets/report_mem_34.webp)

<br>

---

### Capabilities

<br>

➡️ Connectors and ingestion: Index documents, web pages, and third-party data sources.
➡️ Profiles and traits: Store user attributes and traits inferred from interactions.
➡️ Vector and metadata retrieval: Use embeddings combined with metadata filters to pull relevant context.
➡️ Unified API: Provide a single endpoint that handles both memory and document retrieval.

<br>

---

### [How AI Memory Actually Works](https://supermemory.ai/blog/how-ai-memory-works/)

<br>

![](/blog/assets/report_mem_36.webp)

<br>

- A 100-turn chat is only about 50k tokens long, but every turn resends everything before it, so by the end your app has sent about 2.5M tokens.

<br>

What a memory system has:

➡️ A search step. This can be RAG, grep or semantic search, and something always has to find the relevant pieces. 
➡️ Chunking. The data gets split into pieces, because it can't all fit into one model call. That goes for search and for learning. 
➡️ Learning outside the main conversation. The agent you're talking to usually isn't the one deciding what to remember. Learning runs on a schedule or after a trigger. 
➡️ Code in the app that puts what was found back into the model's context. 

<br>

![](/blog/assets/report_mem_35.webp)

<br>

- Dreaming: we do the arranging with learner-1, a model we built for the job. It reads what you send, pulls out facts and links them to the ones it already has.

```
import { Supermemory } from "supermemory" // npm i supermemory

const client = new Supermemory({ apiKey: process.env.SUPERMEMORY_API_KEY })

// 1. Write: send a conversation. Facts get extracted and
//    linked in the background, so they aren't searchable right away.
await client.add("user_123", {
  content: "user: I just moved from Google to Stripe as a PM",
})

// 2. Recall: the profile, plus memories relevant to this question
const { profile } = await client.profile("user_123")
const { results } = await client.search("user_123", {
  query: "Suggest a talk I should give",
})

// 3. Inject: put it in the system prompt of any model
const context = [
  ...profile.static.map((m) => m.memory),
  ...profile.dynamic.map((m) => m.memory),
  ...results.map((r) => r.memory ?? r.chunk),
].filter(Boolean).join("\n")
```

<br>

---

### Additional Resources

<br>

- [Supermemory docs](https://supermemory.ai/docs)
- [Supermemory benchmarks](https://github.com/supermemoryai/memorybench)

<br>
<br>

---

## 🟪 [Honcho (Python, TypeScript)](https://github.com/plastic-labs/honcho) (Memory Framework that Helps Agents Build Evolving Understanding of People)

<br>

> *Memory infrastructure that keeps reasoning about incoming data to build up rich representations of peers, meaning users, agents, or any other entity, over time. Its design is peer-centric: peers are the most important entity in Honcho, and everything revolves around them and their representations. Peers take part in sessions, which hold messages.*

> *Honcho also accepts other inputs, such as user actions (clicks and reactions) and file uploads (PDFs, text files, and JSON documents). Instead of only storing what comes in, Honcho queues background jobs for each new message across three reasoning pipelines: the deriver extracts atomic facts, the summary pipeline keeps rolling summaries of session themes, and the dialectic reasons over what has been learned. The deriver is central here, since it takes the new messages peers send and reasons over them to pull out facts, insights, and context.*

> *The results form two kinds of representation: a global one, which synthesizes insights about a peer across all its sessions, and a local one, which holds context formed from specific interactions it has observed. To read from memory, developers can use the Dialectic API, a natural-language endpoint (`/peers/{peer_id}/chat`) that lets them ask Honcho about any peer, much like consulting an oracle, to fill in prompts or get personalized insights. In Honcho 3, that endpoint is backed by a Dialectic Agent that replaced the earlier fixed-path design.*

<br>

---

### Architecture

<br>

Honcho organises everything around peers — humans and AI agents alike are first-class entities. The peer model enables:

➡️ Multi-participant sessions with mixed human and AI agents
➡️ Configurable observation settings (which peers observe which others)
➡️ Flexible identity management for all participants
➡️ Support for complex multi-agent interactions

<br>

Peers exchange messages within sessions; Honcho reasons over those messages to build a representation of each peer that you can query.

➡️ Workspace (formerly App): top-level container; isolates data between use cases.
➡️ Peer (formerly User): any participant — human user or AI agent.
➡️ Session: a conversation context; many-to-many with peers.
➡️ Scope: a named grouping of sessions that bounds recall (chat, representation, search) to those members.
➡️ Message: an atomic data unit (peer-to-peer communication or ingested document chunk).

<br>

- Honcho splits into two services: `Storage` (workspaces, peers, sessions, scopes, messages, internal collections) and `Insights` (reasoning, conclusions, representations, summaries, the chat endpoint). 

- Storage is synchronous via the API; Insights is asynchronous via a background queue consumed by the deriver worker process.

<br>

| Need                               | API                                                             |
| ---------------------------------- | --------------------------------------------------------------- |
| Save interaction history           | `session.add_messages(...)`                                     |
| Ask what Honcho knows about a peer | `peer.chat(...)`                                                |
| Ask across the whole workspace     | `honcho.chat(...)` / `honcho.chat_stream(...)`                  |
| Get prompt-ready context           | `session.context(...).to_openai(...)` / `.to_anthropic(...)`    |
| Hybrid search (BM25 + vector)      | `peer.search(...)`, `session.search(...)`, `honcho.search(...)` |
| Low-latency static representations | `peer.representation(...)`, `session.representation(...)`       |
| Import documents                   | `session.upload_file(...)`                                      |
| Inspect background processing      | `honcho.queue_status(...)`                                      |

<br>

---

### Formal Logic Framework

<br>

- Honcho’s memory system is powered by custom models trained to perform formal logical reasoning. The system extracts what was explicitly stated, draws certain conclusions from those, identifies patterns across multiple conclusions, and infers the simplest explanations for behavior.

- LLMs are uniquely well-suited for this reasoning task—it’s well-represented in the pretraining data. LLMs can maintain consistent reasoning across thousands of conclusions without cognitive fatigue or belief resistance—which is extremely hard for humans to do reliably. The outputs are also composable, meaning logical conclusions can be stored, retrieved, and combined programmatically for dynamic context assembly.

<br>

![](/blog/assets/report_mem_39.avif)

<br>

---

### [Memory as Reasoning](https://honcho.dev/blog/blog/memory-as-reasoning)

<br>

- Memory in agentic systems has historically focused on static storage, but we propose treating it as a dynamic reasoning task. Humans evolved to leverage prediction & surprisal-based reasoning systems to deal with resource constraints. LLMs and agents, however, don’t have these limitations, so we make the argument for logical reasoning as a trainable task to produce memory models that exceed human performance on several axes. Scaffolding reasoning traces using this approach allows us to get more out of user and agent data and form more useful representations of personal identity.

<br>

Common storage solutions include, but are not limited to, the following:

➡️ Relational Databases: Reliable, familiar, optimizable. Good for almost everything. We’ve found developers often wish they started here, but they try out fancy new frameworks and quickly find their limits. 
➡️ Vector Databases: Newer, well understood, supported by most relational databases. Allows developers to “embed” their text sequences--meaning they get run through a special LLM that produces a high-dimensional vector representation that you can do math on. Cosine distance is a popular way to compute “semantic” similarity, meaning you can search on ideas rather than just strings. Fuzzy, but still useful. 
➡️ Graph Databases: Organize data via nodes and edges. The associations are the product. Great for human legibility, hard to scale. 

<br>

- Human cognitive systems evolved under energy, information, and computation constraints. They therefore evolved elegant ways of taking incomplete data flowing over sensory organs and constructing representations or models of reality. Cognitive science tells us that the brain employs sophisticated prediction and surprisal strategies to build models under such constraints. Remembering everything with perfect fidelity just isn’t realistic for a system evolving in a competitive, under-resourced environment. So memory is not simply the encoding of perfect static data about the world and surfacing it when needed. Instead, it’s making predictions about the environment based on incomplete data and checking at the margins for errors thrown by sensory inputs to improve the next round of predictions. In this way, an internal model of reality is born.

- Two ideas were combined--reinforcement learning was (and is being) applied to the chain-of-thought reasoning traces directly, computing rewards based on whether or not the reasoning led to the correct answers. The first demonstration of this concept was OpenAI’s o1 series of models, which hid the “thinking” trace and served the response once it was done. DeepSeek open-sourced their R1 series of models, which effectively reverse engineered the o1 methodology, exposed the “thinking” of the model for all to see, and demonstrated the cost benefits of scaling post-training.

- Logical reasoning is the process by which we derive conclusions based on premises that serve as evidence to support that conclusion. We’ve all encountered these terms before, but deductive conclusions are certain statements supported by premises that were explicitly stated or observed. Inductive conclusions form general statements based on observed patterns, and abductive conclusions seek the best explanation for behaviors in the simplest way possible.

- This tree of logical reasoning is far superior to static storage. It can be entered and traversed anywhere to scaffold reasoning and answer any query, a capability not true of any other method. And it can be computed over asynchronously or on the fly to improve the representation.

- The question isn’t how best to store your data as it exists for prediction later, but rather how best to reason over it to get the most accurate topological representation of identity upon which to run simulation. We can transcend mere good guessing and black box inference and replace it with reaching certainty and making high-fidelity, traceable predictions.

<br>

---

### [Neuromancer](https://plasticlabs.ai/neuromancer)

<br>

- The first collection of models dedicated to AI-native memory and social cognition. They're trained specifically to do formal logical reasoning over user and agent data to form representations of any entity's personal identity.

- Neuromancer XR - A model for explicit reasoning, excelling at deduction & factual derivation. XR is a fine-tuned Qwen3-8B model trained on a manually curated dataset of social reasoning traces. It achieves state-of-the art results on memory benchmarks and reasons toward certain conclusions.

- Neuromancer MR (in training) - A model for meta-reasoning--reasoning about reasoning. MR focuses on reaching predictive conclusions, like inductions & abductions, to scaffold patterns & hypotheses over XR traces.

<br>

![](/blog/assets/report_mem_45.webp)

<br>

---

### Additional Resources

<br>

- [Honcho docs](https://honcho.dev/docs/v3/documentation/introduction/overview)
- [Honcho Benchmarks](https://honcho.dev/evals)
- [Honcho on OpenClaw](https://docs.openclaw.ai/concepts/memory-honcho)
- [Tonbi on Hermes, Memory, Honcho](https://www.youtube.com/watch?v=ZKZLko9kLm4)

<br>
<br>

---

## 🟪 [OpenViking (Python)](https://openviking.ai/) (Self-Evolving Context Filesystem Unifying Memory, Knowledge RAG, and Skills)

<br>

> *Context database for AI agents that rather than treating memory as a separate module, it puts every kind of context (memories, resources, and skills) into one directory structure, with semantic retrieval and progressive loading of content. These three types have different lifecycles: resources are static knowledge that users add, memory is extracted by the agent and updated over time, and skills are callable capabilities with fixed definitions.*

> *Everything is laid out as a virtual filesystem addressed with `viking:// URIs`, so agents can navigate context with familiar commands like ls, find, and grep. These directories are virtual, though, backed by a file system layer and a vector index, so the "filesystem" is really a presentation layer over a database rather than actual files on disk. To save tokens, each piece of context is automatically processed into three levels of detail when it is written, labeled `L0`, `L1`, and `L2`, with the full content loaded only when needed.*

> *Retrieval works recursively through directories instead of relying on a single flat vector search. Memory builds up through sessions: after a session is committed, OpenViking asynchronously extracts user preferences and agent experience into long-term memory, sorting it into six categories (profile, preferences, entities, events, cases, and patterns) and using an LLM to decide what is a duplicate.*

<br>

---

### Architecture 

<br>

```
viking://
├── resources/              # Resources: project docs, repos, web pages, etc.
│   └── my_project/
│       ├── docs/
│       │   ├── api/
│       │   └── tutorials/
│       └── src/
└── user/
    └── {user_id}/
        ├── memories/
        │   └── preferences/
        │       ├── writing_style
        │       └── coding_habits
        ├── resources/
        │   └── private_project/
        ├── skills/
        │   ├── search_code
        │   └── analyze_data
        └── peers/
            └── web-visitor-alice/
```

<br>

With 3 Loading Tiers:

➡️ L0 (Abstract): a one-sentence summary for quick relevance checks.
➡️ L1 (Overview): core information and usage scenarios for planning.
➡️ L2 (Details): the full original data, read only when needed.

<br>

```
viking://resources/my_project/
├── .abstract.md           # L0: quick relevance check
├── .overview.md           # L1: structure and key points
└── docs/
    ├── .abstract.md
    ├── .overview.md
    └── api/
        ├── auth.md         # L2: full content, loaded on demand
        └── endpoints.md
```

<br>

---

### Additional Resources

<br>

- [OpenViking docs](https://docs.openviking.ai/en/)
- [OpenViking Benchmarks](https://blog.openviking.ai/post/openviking-benchmark-results/) (and [code](https://github.com/volcengine/OpenViking/tree/main/benchmark))

<br>
<br>

---

# 2️⃣🪄  How Leading AI Projects Think About Memory

<br>

#### ✨ To complement the results above, let's explore a few resources that illustrate how leading AI projects and companies are thinking about these challenges. This list is far from exhaustive, but it should be sufficiently illustrative and enlightening for the purposes of our studies. ✨

<br>
<br>

----

## A Quick Review of Hermes Agent Holographic Memory (MvS + [Hindsight](https://hindsight.vectorize.io/guides/2026/04/21/guide-hermes-agent-holographic-memory-technical-deep-dive), 2026)

<br>

> Holographic Memory is a persistent, structured memory system for Hermes Agent. It allows an agent to remember facts across sessions, understand relationships between entities, evaluate conflicting information, and retrieve combinations of facts rather than simply searching for matching text.

> Unlike built-in flat memory files (`MEMORY.md` or `USER.md`) which quickly fill context windows, Holographic memory functions as a scalable, structured, local fact store designed for deep cross-session recall without sending data to external APIs.

<br>

It combines three ideas:

1️⃣ Traditional database storage.
2️⃣ Information retrieval and trust scoring.
3️⃣ Holographic Reduced Representations (HRR) — an algebraic framework for encoding, binding, and composing relationships between distributed representations (technical references: [1](https://redwood.berkeley.edu/wp-content/uploads/2020/08/Plate-HRR-IEEE-TransNN.pdf), [2](https://arxiv.org/pdf/2001.11797v4), [3](https://cs.uwaterloo.ca/~jhoey/teaching/cogsci600/papers/Kanerva09.pdf), [4](https://arxiv.org/abs/cs/0412059), [5](https://arxiv.org/abs/2111.06077), [6](https://arxiv.org/abs/2010.07426), [7](https://proceedings.neurips.cc/paper_files/paper/1993/file/edfbe1afcf9246bb0d40eb4d8027d90f-Paper.pdf))

<br>

| Component           | Responsibility                                  |
| ------------------- | ----------------------------------------------- |
| SQLite              | Persistent fact storage                         |
| FTS5                | Full-text keyword retrieval                     |
| Character n-grams   | Multilingual text matching                      |
| Entity resolution   | Connects facts to people, projects, and concepts|
| Trust scoring       | Tracks confidence and feedback                  |
| HRR                 | Compositional, associative retrieval            |
| Optional embeddings | Semantic similarity search                      |
| Optional reranker   | Reorders retrieved candidates                   |

<br>

| Architecture       | Main idea                                  | Strength                          |
| ------------------ | ------------------------------------------ | --------------------------------- |
| `MEMORY.md`          | Curated textual memory                     | Simplicity                        |
| Vector database    | Embedding-based retrieval                  | Semantic similarity               |
| Knowledge graph    | Entities and relationships                 | Explicit structure                |
| Graph memory       | Persistent relational knowledge            | Relationship traversal            |
| Holographic Memory | Fact storage + HRR composition             | Associative retrieval             |
| OpenViking         | Filesystem-oriented context management     | Hierarchical context organization |
| Hindsight          | Memory formation, retrieval and reflection | Learning from experience          |


<br>


```
hermes plugins install holographic
hermes config set memory.provider holographic

```

and then, under `~/.hermes/config.yaml` in `plugins.hermes-memory-store`:

```
plugins:
  hermes-memory-store:
    db_path: "$HERMES_HOME/memory_store.db"
    auto_extract: true
    default_trust: 0.5
```

<br>

---

## [Agent Swarms are a Distributed Systems Problem (Chroma, 2026)](https://www.trychroma.com/engineering/transactions)

<br>

- Shared state must solve for the conflicts that arise with concurrent writers.

- Git merge can work well for code because code is written in lines: line-based diffs mostly coincide with syntactic units, edits are mostly local, and there's an intelligence standing by to escalate conflicts to. But these assumptions do not hold for agent-written knowledge. Agent-written knowledge, like that recorded in a wiki or knowledge base, is based upon natural language; prose gets summarized, reorganized, rewritten, and retracted. 

- Foundation, Chroma's solution to memory, operates through a swarm of agents modifying shared state. Foundation must also solve for concurrency control, and specifically we want to optimize for goodput.

- The system processing incoming data breaks it into batches of data to be processed incrementally by the swarm. Each agent takes a batch of traces and does the following: Search for relevant pages on the wiki, read the pages that seem relevant in the search results, and update those that would benefit from information in the batch. Everything is powered by a lightweight reasoning model.

- Two observations drive everything: 1) A batch ingest can last multiple minutes, 2) A batch's read set is discovered through searching and reasoning. 

- Because the read set is discovered through search, it is possible to acquire locks incrementally in a way that yields a cycle. Deadlock prevention techniques roll back transactions and discard paid-for tokens. 

- A fact is no less relevant at the end when the transaction aborts than it was at the time the reasoning model put the transaction on the page. Contention, not transaction content or consistency guarantees, drives the abort.

- To summarize the protocol: 1) Lock pages using exclusive locks, 2) Acquire locks at first page read - explicitly not over search results, 3) Wound wait over batch arrival timestamps, 4) Wounded transactions release locks immediately and retry with original timestamp, 5) Durability comes from Chroma Cloud. 

- There are two modes of operation that can lead a transaction to be wounded: Waiting to read or waiting to write. For the former, we observed that in approximately 39.7% of wounded transactions, the model would revisit via read or write the page that wounded its prior attempt. For the latter, we observed that of pages written during a wounded transaction's retry, that 28.2% of modifications share a prefix or suffix with the page causing the wounded abort. 

- Why not store the wiki in git and access it via a filesystem? It's a natural question to ask. There are two reasons to not go with this approach: First, it requires secondary indexing in a searchable way; else, it incurs massive token costs. Second, git is terrible for resolving merge conflicts.

<br>

---

## [Dreaming: Improving Memory (OpenAI, 2026)](https://openai.com/index/chatgpt-memory-dreaming/)

<br>

- In April 2025, we updated ChatGPT’s memory by giving the model the ability to reference chat context outside of the saved memories list; this was done by introducing the first version of dreaming—a method for ChatGPT to automatically curate memories in the background by referencing chat history.

- We’re beginning to roll out a more capable and scalable system for synthesizing memory, developed to tackle the staleness, correctness, and scalability challenges that we observe when memory is applied to the hundreds of millions of users and multi-year time horizons in ChatGPT.

- The memories synthesized by dreaming are reviewable through a summary of them made visible in the memory summary page.

- How we evaluate memory: 1) carry forward useful context (the new dreaming-based system improves the model's ability to recall relevant facts), 2) follow preferences and constraints, 3) stay current over time.

<br>

---

## [How We Built Agent Builder’s Memory System (LangChain, 2026)](https://www.langchain.com/blog/how-we-built-agent-builders-memory-system)

<br>

- The [COALA paper](https://arxiv.org/abs/2309.02427?ref=blog.langchain.com) defines memory for agents in three categories: 1) Procedural (the set of rules that can be applied to working memory to determine the agent’s behavior), 2) Semantic (facts about the world), and 3) Episodic (sequences of the agent’s past behavior).

- We represent memory in Agent Builder as a set of files. We use `AGENTS.md` to define the core instruction set for the agent. We use agent skills to give the agents particular specialized instructions for specific tasks. For MCP access, we use a custom `tools.json` file.

- We do not use a real filesystem to store these files. Rather, we store them in Postgres and expose them to the agent in the shape of a filesystem.  This “virtual filesystem” is natively supported by DeepAgents - and is completely pluggable so you could bring any storage layer you want (S3, MySQL, etc).

<br>

![](/blog/assets/report_mem_22.webp)

<br>

- The reason it is possible to build complicated agents without any code or any domain specific language (DSL) is that we use a generic agent harness like Deep Agents under the hood. Deep Agents abstracts away a lot of complex context engineering (like summarization, tool call offloading, and planning) 

<br>

---

## [Autonomous Context Compression (LangChain, 2026)](https://www.langchain.com/blog/autonomous-context-compression)

<br>

- Context compression is an action that reduces the information in an agent’s working memory. Older messages are replaced by a summary or condensed representation of an agent’s progress that preserves what’s relevant to a task. This action is often necessary to accommodate finite context windows and reduce context rot.

- It is not ideal to compact when you’re in the middle of a complex refactor; It is better to compact when you are starting a new task or otherwise believe that prior context will lose relevance.

- Compaction could happen at: 1) task boundaries, 2) after extracting a result from a large amount of context, 3) before consuming a large amount of new context, 4) before entering a complex multi-step process, 5) some decision that supersedes prior context.

<br>

![](/blog/assets/report_mem_23.webp)

<br>

---

## [Organizing Context in a Multi-Agent Harness (LangChain, 2026)](https://www.langchain.com/blog/organizing-context-in-a-multi-agent-harness)

<br>

- Subagents enable parallel reasoning and context isolation, allowing a supervisor agent to delegate work without polluting the context window.

- Isolated subagents: provide context isolation, so that the details of individual tasks can be withheld from a supervisor agent’s context window.

- Forked subagents: inherit the supervisor’s full conversation instead of starting fresh. Forking can be faster and cheaper than isolated subagents, since reusing the supervisor’s conversation takes advantage of prompt caching and reduces repeated work.

- Context modes: 1) Worker Agent: continue work already in progress, 2) Verifier agent: independently evaluate work, 3) Researcher agent: investigate a question, 4) Memory agent: retain information from the conversation.

<br>

```
const memorizerSubagent: SubAgent = {
  mode: "fork",
  name: "memorizer",
  description:
    "Use when the conversation contains durable decisions, facts, or preferences worth saving to memory",
  permissions: [
    {
      operations: ["write"],
      paths: ["/**"],
      mode: "deny",
    },
    {
      operations: ["read"],
      paths: ["/AGENTS.md", "/docs/**"],
      mode: "allow",
    },
  ],
};
```

<br>

---

## [AI Memory Systems with MongoDB Atlas, AWS and Claude (MongoDB, 2025)](https://www.mongodb.com/company/blog/technical/build-ai-memory-systems-mongodb-atlas-aws-claude)

<br>

- At its simplest, our memory system mimics three core aspects of human memory: 1) Importance-weighted storage: Not all memories are equally valuable, 2) Reinforcement through repetition: Important concepts strengthen over time, 3) Contextual retrieval: Memories are recalled based on relevance to current context.

<br>

![](/blog/assets/report_mem_28.webp)

<br>

- The database design strategically separates raw conversation data from processed memory nodes to optimize performance and functionality. The Conversations Collection maintains chronological records of all interactions, preserving the complete historical context, while the Memory Nodes Collection stores higher-level semantic information with importance ratings that facilitate cognitive prioritization. Vector Search Indexes enable efficient semantic similarity searches with `O(log n)` performance, allowing the system to rapidly identify contextually relevant information regardless of database size. 

<br>

![](/blog/assets/report_mem_29.webp)

<br>

- Through repetition, memories are strengthened via reinforcement, similar to human cognitive processes. At its core, the LLM functions as an "importance evaluator" that assigns each memory a value on a 1-10 scale, reflecting how humans naturally prioritize information based on relevance, uniqueness, and utility. This importance rating directly affects a memory's persistence, recall probability, and survival during pruning operations. 

<br>

---

## [Powering Long-Term Memory for Agents With LangGraph (MongoDB, 2026)](https://www.mongodb.com/company/blog/product-release-announcements/powering-long-term-memory-for-agents-langgraph)

<br>

- Introduce the MongoDB Store for LangGraph—a powerful integration that brings flexible and scalable long-term memory to AI agents, allowing agents to remember and build on previous interactions across multiple sessions instead of only retaining memory for the current session. 

- In a memory context, LangGraph uses “threads” to represent individual conversations or sessions. Short-term memory, managed through thread-scoped checkpointers that MongoDB supports, maintains context within a given session. While this preserves conversation continuity and manages history, it doesn’t help agents learn continuously from the past across different conversations to adapt and optimize their behavior over time. This is why we introduced the MongoDB Store for LangGraph, enabling your agents to retain memories across conversations through a cross-thread memory store.

<br>

![](/blog/assets/report_mem_25.webp)

<br>

- Long-term memory serves as the agent’s knowledge base, storing diverse kinds of information for future use. It includes several functional types, each requiring specific storage and retrieval strategies.

- Episodic memory: captures specific events and interactions, such as conversation history or summaries of key occurrences with metadata (e.g., timestamps, participants).

- Procedural memory: records instructions or rules for recurring tasks. A typical implementation is a social content generator agent that remembers past feedback on writing style and formatting to improve its process.

- Semantic memory: remembers general knowledge, facts, and concepts. This is often implemented through retrieval-augmented generation (RAG), where data is stored as vector embeddings and retrieved based on semantic similarity.

- Associative memory: stores key entities and relationships between different pieces of information, enabling an agent to identify patterns and make inferences by navigating these connections. It's often implemented using graph structures that support efficient exploration of relationships. One practical approach is GraphRAG.

<br>

---

## [Building an Agentic Memory System (Github, 2026)](https://github.blog/ai-and-ml/github-copilot/building-an-agentic-memory-system-for-github-copilot/)

<br>

- Cross-agent memory allows agents to remember and learn from experiences across your development workflow, without relying on explicit user instructions.

- The core challenge for memory systems isn’t about information retrieval, but ensuring that any stored knowledge remains valid as code evolves across branches and time.

- Information retrieval is an asymmetrical problem: It’s hard to solve, but easy to verify. By using real-time verification, we gain the power of pre-stored memories while avoiding the risk of outdated or misleading information. Instead of offline memory curation, we store memories with citations: references to specific code locations that support each fact. When an agent encounters a stored memory, it verifies the citations in real-time, validating that the information is accurate and relevant to the current branch before using it.

<br>

![](/blog/assets/report_mem_26.webp)

<br>


- When an agent starts a new session, we retrieve the most recent memories for the target repository and include them in the prompt. Future implementations will enable additional retrieval techniques, such as a search tool and weighted prioritization.

<br>

![](/blog/assets/report_mem_27.webp)

<br>

- Memories for a given repository can only be created in response to actions taken within that repository by contributors with write permissions, and can only be used in tasks on that same repository initiated by users with read permissions. Much like the source code itself, memories about a repository stay within that repository, ensuring privacy and security.

- Our biggest concern was the impact of outdated, incorrect, or even maliciously injected memories. To test the system’s resilience, we deliberately seeded repositories with adversarial memories–facts that contradicted the codebase–with citations pointing to irrelevant or nonexistent code locations.

<br>

---

## [Architecting Memory for AI agents (Red Hat, 2026)](https://next.redhat.com/2026/06/01/from-context-to-dreams-architecting-memory-for-ai-agents/)

<br>

`Agent capability = model + harness + memory + environment + evolution`

<br>

- Server-side agent memory is provider-managed, with capabilities for multi-agent learning, enterprise data governance, security, auditing, versioning, and content attribution.

- Session memory: Contains the complete history of queries and responses within a single agent-LLM session. Lifetime is scoped to one session. Example: OpenAI Responses API conversation state management implementations.
- Long-term file system memory: Memories stored as files in a filesystem, often with supplemental indexing. Effective because agent runtimes naturally traverse directory structures.
- Long-term episodic memory: Persistent memory structured around events and temporal sequences, with lifetime beyond individual sessions.
- Long-term semantic memory: Persistent memory stored using embeddings to enable semantic search and retrieval, typically in vector databases augmented with graph metadata and indexing.

<br>

![](/blog/assets/report_mem_24.webp)

<br>

---

## [Amazon Bedrock AgentCore Memory: Building context-aware agents (Amazon, 2025)](https://aws.amazon.com/blogs/machine-learning/amazon-bedrock-agentcore-memory-building-context-aware-agents/)

<br>

> Bedrock provides capabilities for maintaining both short-term working memory (capturing immediate conversation context within a session) and long-term intelligent memory (storing persistent insights and preferences across sessions).

<br>

When implementing memory for AI agents, developers encounter several fundamental challenges:

➡️ Context window constraints: Modern LLMs have limited capacity to process conversation history. Developers must implement context window management strategies (often manually pruning or summarizing earlier exchanges) to handle ongoing customer conversations to stay within token limits. 
➡️ State management complexity: Without dedicated memory systems, developers often build custom solutions for tracking conversation history, user preferences, and agent state—reinventing similar solutions across projects. 
➡️ Memory recall challenges: Storing raw conversation data isn’t enough. Without intelligent extraction and structured memory organization, developers must implement complex systems to identify and surface relevant information at the right time. 
➡️ Persistence without intelligence: Most existing solutions focus on data storage rather than intelligent memory formation, providing no built-in mechanisms to extract relevant insights or identify patterns that matter to users. 

<br>

The service is built on five key design principles:

➡️ Abstracted storage: AgentCore Memory handles the storage complexity for short- and long-term information, without requiring developers to manage underlying infrastructures. 
➡️ Security: Encrypted data both at rest and in transit. 
➡️ Continuity: Events within sessions are stored in chronological order to maintain accurate narrative flow and context. 
➡️ Data organization and access control: Hierarchical namespaces provide structured memory organization and fine-grained access control for shared memory contexts. 
➡️ Scalability and performance: Efficiently handle large volumes of memory data with low latency, facilitating fast and reliable retrieval as usage grows. 

<br>

![](/blog/assets/report_mem_31.webp)

<br>

Short-term memory: To create an event, you typically need 3 identifiers.

1️⃣ `memoryId`:This is automatically created and returned in the response when you create a new memory resource. 
2️⃣ `actorId`: which typically identifies entities in your system (users, agents, project, or combinations), 
3️⃣ `sessionId`: groups related events together. 

<br>

- Long-term memory: Namespaces are a critical organizational concept within long-term memory that provide hierarchical structure within your memory resource. They function like file system paths, and you can use them to logically group and categorize memories. These are especially powerful in multi-tenant systems, be it multi-agent, multi-users, or both.

- With checkpointing, agents can save and mark specific states in the conversation, creating reference points that can be returned to later. This is like saving your progress in a complex game or application.

<br>

---

## [Titans + MIRAS: Helping AI have long-term memory (Google, 2025)](https://research.google/blog/titans-miras-helping-ai-have-long-term-memory/)

<br>

- Introduce an architecture and theoretical blueprint that combine the speed of RNNs with the accuracy of transformers. Titans is the specific architecture (the tool), and MIRAS is the theoretical framework (the blueprint) for generalizing these approaches. 

- Together, they advance the concept of test-time memorization, the ability of an AI model to maintain long-term memory by incorporating more powerful “surprise” metrics (i.e., unexpected pieces of information) while the model is running and without dedicated offline retraining.

- While attention mechanisms excel for precise, short-term memory, Titans introduces a novel neural long-term memory module, that, unlike the fixed-size vector or matrix memory in traditional RNNs, acts as a deep neural network (specifically, a multi-layer perceptron). This memory module provides significantly higher expressive power, allowing the model to summarize large volumes of information without losing important context.

- In the context of Titans, the "surprise metric" is the model detecting a large difference between what it currently remembers and what the new input is telling it.

- Forgetting (weight decay): To manage the finite capacity of the memory when dealing with extremely long sequences, Titans employ an adaptive weight decay mechanism. This acts as a forgetting gate, allowing the model to discard information that is no longer needed.

- MIRAS transcends this limitation by providing a generative framework to explore a more rich design space informed by the literature in optimization and statistics. This allows for the creation of novel architectures with non-Euclidean objectives and regularization.

<br>

---

## [The Sleep Framework (Google, 2026)](https://research.google/blog/the-sleep-framework-a-new-way-for-llms-to-retain-knowledge-in-continual-learning/)

<br>

- Modern LLMs achieve impressive performance via pre-training and in-context learning (ICL). However, once deployed, they remain largely static, operating with a fixed knowledge cutoff date that leaves them unable to acquire long-term capabilities or adapt to new information.

- While updating models with new data seems like the obvious solution, continual parameter updates often trigger catastrophic forgetting, a fundamental issue where learning new tasks severely degrades performance on previously learned ones. Alternatively, relying strictly on ICL limits knowledge retention to the immediate context window: once the context session ends, the acquired short-term information is forgotten.

- Inspired by how the human brain processes and stabilizes memory during rest, we introduce a sleep framework in continual learning: a learning paradigm that equips large language models (LLMs) with a continuous periodic lifecycle, enabling them to continually learn, consolidate fragile short-term context into stable long-term parameters. With this framework, we demonstrate that alternating between active interaction and offline memory consolidation allows LLMs to continuously acquire new facts, retain long-context knowledge up to 10M tokens, and improve complex reasoning.

<br>

Memory consolidation:

➡️ Parameter expansion & continuum memory hierarchy: To prevent catastrophic forgetting, the model dynamically scales its capacity during sleep. Using a Mixture of Experts (MoE) and Hope architecture, newly unlocked, low-rank experts are integrated into stable, lower-frequency memory blocks to store incoming knowledge without disrupting older parameters.
➡️ Knowledge seeding (upward distillation): Fragile short-term memories stored in high-frequency layers (e.g., in-context memory) are transferred into the newly expanded long-term parameters. This is achieved through Generalized Knowledge Distillation (GKD) combined with reinforcement learning (RL)-based imitation learning.
➡️ Synaptic pruning: Once the memory consolidation into lower-frequency modules is complete, the high-frequency temporary parameters are reset, freeing up capacity for future active sessions.

<br>

Dreaming for self-improvement

➡️ Random expert selection: During synthetic data generation, the MoE router randomly activates non-standard experts. This forces the model to mix disparate domains of knowledge and uncover latent patterns.
➡️ Curated rehearsal: The model generates synthetic training samples ("dreams") and filters them using gradient-based data selection to prioritize samples with the highest potential to boost overall model capability.
➡️ RL refinement: The model performs supervised fine-tuning on top-rated dream samples and evaluates whether the generation improves performance on downstream tasks.

<br>

---

## [Memory scaling for AI agents (Databricks, 2026)](https://www.databricks.com/blog/memory-scaling-ai-agent)

<br>

- Does the agent get better as it accumulates more information? We call this memory scaling: the property that agent performance improves with the amount of past conversations, user feedback, interaction trajectories (both successful and failed), and business context stored in its memory.

- Memory scaling is the property that an agent's performance improves as its external memory grows. Here "memory" refers to a persistent store of information the agent can interact with at inference time, distinct from the model's weights or the current context window.

- **[MemAlign](https://www.databricks.com/blog/memalign-building-better-llm-judges-human-feedback-scalable-memory)** is our exploration into what a simple memory framework can look like for AI agents. It stores past interactions as episodic memories, uses an LLM to distill them into generalized rules and patterns (semantic memories), and retrieves the most relevant entries at inference time to guide the agent.

- Standalone vector databases handle semantic search well but lack relational capabilities like joins and filtering. Modern PostgreSQL-based systems offer a more unified alternative: they natively support structured queries, full-text search, and vector similarity search in a single engine.

- For **[stateful agents](https://docs.databricks.com/aws/en/agents/custom-agents/stateful-agents)** we use Lakebase, built on Neon's serverless PostgreSQL engine, thanks to its scale-to-0 cost and support for both vector and exact search.

- Distillation: raw episodic memories are useful for direct retrieval but become expensive to store and search at scale. Periodically distilling them into semantic memories (compressed rules and patterns) keeps the memory store tractable, and provides generalizable insights to the agent, which may not be evident from episodic memory alone.

- Memory introduces governance requirements that do not exist for stateless agents. As agents accumulate deeply contextual knowledge, including user preferences, proprietary workflows, and internal data patterns, the same governance principles that apply to enterprise data must extend to agent memory.

<br>

![](/blog/assets/report_mem_30.webp)

<br>

---

## [Self-improving Memory for Agents (Perplexity, 2026)](https://www.perplexity.ai/hub/blog/self-improving-memory-for-agents)

<br>

- Brain is a self-improving memory system. It builds a context graph of the work Computer performs. At set intervals, such as overnight, Brain reviews the context graph and teaches itself how to do the work better. 

- The context layer takes the form of an LLM wiki that’s automatically loaded onto the agent sandbox. A user's LLM wiki pages reflect the ideas, people, projects, and other elements that make up their world, allowing Computer to traverse this web of personal information. 

<br>

---

## [Context Engineering for AI Agents (Manus, 2025)](https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus)

<br>

- KV-cache hit rate is the single most important metric for a production-stage AI agent. It directly affects both latency and cost.

- Contexts with identical prefixes can take advantage of   KV-cache, which drastically reduces time-to-first-token (TTFT) and inference cost—whether you're using a self-hosted model or calling an inference API.

- Avoid dynamically adding or removing tools mid-iteration. 

- File system as the ultimate context. Our compression strategies are always designed to be restorable.
- Unlike Transformers, State Space Models (SSMs) lack full attention and struggle with long-range backward dependencies. But if they could master file-based memory—externalizing long-term state instead of holding it in context—then their speed and efficiency might unlock a new class of agents.

- One of the most effective ways to improve agent behavior is deceptively simple: leave the wrong turns in the context. When the model sees a failed action—and the resulting observation or stack trace—it implicitly updates its internal beliefs.

<br>

---

## [Effective Context Engineering for AI agents (Anthropic, 2025)](https://www.anthropic.com/research/effective-context-engineering-for-ai-agents)

<br>

- Context refers to the set of tokens included when sampling from a large-language model (LLM). The engineering problem at hand is optimizing the utility of those tokens against the inherent constraints of LLMs in order to consistently achieve a desired outcome.

- Context engineering refers to the set of strategies for curating and maintaining the optimal set of tokens (information) during LLM inference, including all the other information that may land there outside of the prompts.

- This attention scarcity stems from architectural constraints of LLMs. LLMs are based on the transformer architecture, which enables every token to attend to every other token across the entire context. This results in `n²` pairwise relationships for `n` tokens.

- As its context length increases, a model's ability to capture these pairwise relationships gets stretched thin, creating a natural tension between context size and attention focus. Additionally, models develop their attention patterns from training data distributions where shorter sequences are typically more common than longer ones. This means models have less experience with, and fewer specialized parameters for, context-wide dependencies.

- Techniques like position encoding interpolation allow models to handle longer sequences by adapting them to the originally trained smaller context, though with some degradation in token position understanding. These factors create a performance gradient rather than a hard cliff: models remain highly capable at longer contexts but may show reduced precision for information retrieval and long-range reasoning compared to their performance on shorter contexts.

- For tasks that span tens of minutes to multiple hours of continuous work, like large codebase migrations or comprehensive research projects, agents require specialized techniques to work around the context window size limitation: compaction, structured note-taking, and multi-agent architectures.

- Compaction is the practice of taking a conversation nearing the context window limit, summarizing its contents, and reinitiating a new context window with the summary. Compaction typically serves as the first lever in context engineering to drive better long-term coherence. At its core, compaction distills the contents of a context window in a high-fidelity manner, enabling the agent to continue with minimal performance degradation.

- For engineers implementing compaction systems, we recommend carefully tuning your prompt on complex agent traces. Start by maximizing recall to ensure your compaction prompt captures every relevant piece of information from the trace, then iterate to improve precision by eliminating superfluous content.

- Structured note-taking, or agentic memory, is a technique where the agent regularly writes notes persisted to memory outside of the context window. These notes get pulled back into the context window at later times.

- Sub-agent architectures provide another way around context limitations. Rather than one agent attempting to maintain state across an entire project, specialized sub-agents can handle focused tasks with clean context windows. The main agent coordinates with a high-level plan while subagents perform deep technical work or use tools to find relevant information. Each subagent might explore extensively, using tens of thousands of tokens or more, but returns only a condensed, distilled summary of its work (often 1,000-2,000 tokens).

<br>
<br>

---

# 3️⃣🪄 Notable Research Papers on Agentic Memory

<br>

#### ✨ Let's wrap up our readings with a few survey papers from 2026, followed by a curated collection of the latest research and developments in agentic memory. We'll explore these in future posts in our *Collective Intelligence* series (on some weekend, if time allows... 🥲). Until then, I'll keep adding relevant resources as I come across them. ✨

<br>

---

## [A Survey of Agent Memory in the Second Half ( W. Huang et al., 2026)](https://arxiv.org/pdf/2602.06052)

<br>

![](/blog/assets/report_mem_42.webp)

<br>

- As the field enters the “second half,” the central challenge becomes real utility in long-horizon, dynamic, and user-dependent settings such as agentic coding, deep research, and computer use, where LLM-based agents face context explosion beyond fixed context windows and must continuously accumulate, manage, and selectively reuse large volumes of information across extended interactions.

- We provide a unified view of foundation agent memory along three dimensions: memory substrate (internal parametric state and external retrieval-augmented stores), cognitive mechanism (sensory, working, episodic, semantic, and procedural), and memory subject (user-centric personalization and agent-centric experience). 

<br>

![](/blog/assets/report_mem_43.webp)

<br>

- A growing line of work further frames foundation agents as self-evolving systems that improve from their own execution experience at deployment time, rather than solely through offline training, and emerging benchmarks have begun to directly evaluate such experience-driven test-time learning over self-evolving memory. 

- Memory is the substrate that makes this self-evolution possible: without mechanisms to record, consolidate, and reuse experience, every episode leaves the agent unchanged,and long-horizon interaction degenerates into a sequence of isolated one-shot tasks. 

- Multi-agent systems extend this paradigm by assigning specialized roles and memories to multiple agents that communicate and coordinate.

<br>

![](/blog/assets/report_mem_44.webp)

<br>

### Memory Routing

<br>

- Orchestrator-based Routing. This refers to a setting where a centralized orchestrator makes routing decisions in a unified way. It maintains the global task state and collaboration progress, breaks a complex goal into subtasks, and then assigns subtasks to different worker agents based on their roles and abilities, while also distributing the required memory and deciding the execution order. These decisions can be updated dynamically as the task state changes. This method emphasizes a centralized global workflow, but the cost is that the orchestrator may become a bottleneck for performance and robustness, creating a single point of load and failure risks.

- Agent-Initiated Routing. Compared with orchestrator-based routing, in this method routing decisions are not assigned by a centralized orchestrator. Instead, each agent initiates them locally based on its role and task. Information is usually published into a shared memory pool first, and then agents use constraint mechanisms to select the memories they need, forming their own memory views. This method is often more flexible, but it also depends more on good filtering design to avoid noise, conflict, or missing important information in the shared pool.

- Memory-driven Routing. Different from the above two, routing here is mostly done by retrieval from the memory store. The system represents the current task as a query, and then performs “retrieval, scoring and reranking, selection” in the memory store to obtain the most relevant subset of memories and inject it into the context. Sometimes it can also use structured links between memories (like graph-based expansion) to extend the retrieved results into a more complete set of experience pieces

<br>

---

## In the Backlog for the Future...

<br>

### Agentic Memory & Harness Engineering

<br>

- [Harness the Memory: A Holistic Evaluation of Memory Substrates in Memory Agents](https://arxiv.org/abs/2608.15008) — W. Huang et al. (2026)
- [Learning to Remember: Advances in Memory Mechanisms for Large Language Models](https://arxiv.org/pdf/2610.35089) — C. Ha et al.(2026)
- [Memory in the Age of Agents](https://arxiv.org/pdf/2512.13564) — Y. Hu et al. (2026)
- [M*⋆: Every Task Deserves Its Own Memory Harness](https://arxiv.org/pdf/2604.11811) — W. Pan et al. (2026).
- [A-Mem: Agentic Memory for LLM Agents](https://arxiv.org/pdf/2502.12110) — W. Xu et al. (2025).
- [AutoCompact: Learning When to Compact Context in Long-Horizon Coding Agents](https://arxiv.org/abs/2610.02163) — X. Zhang et al. (2026).
- [ACM: Agentic Context Management for Long Horizon Tasks](https://arxiv.org/abs/2607.23809) — X. Li et al. (2026).
- [PRO-LONG: Programmatic Memory Enables Long-Horizon Reasoning](https://arxiv.org/abs/2607.20064) — A. Fox et al. (2026).
- [Beyond Semantic Organization: Memory as Execution State Management for Long-Horizon Agents](https://arxiv.org/abs/2606.06090) — Y. Chen et al. (2026).
- [Context Pruning for Coding Agents via Multi-Rubric Latent Reasoning](https://arxiv.org/abs/2605.15315) — J. Wang et al. (2026).
- [ClawVM: Harness-Managed Virtual Memory for Stateful Tool-Using LLM Agents](https://arxiv.org/abs/2604.10352) — M. Rafique, L. Bindschaedler (2026).
- [GAAMA: Graph Augmented Associative Memory for Agents](https://arxiv.org/abs/2603.27910) — S. Kamal Paul et al. (2026).
- [MemArchitect: A Policy Driven Memory Governance Layer](https://arxiv.org/abs/2603.18330) — L. Suresh Kumar et al. (2026).
- [Facts as First Class Objects: Knowledge Objects for Persistent LLM Memory](https://arxiv.org/abs/2603.17781) — Oliver Zahn, Simran Chana (2026).
- [Graph-Native Cognitive Memory for AI Agents](https://arxiv.org/abs/2603.17244) — Y. Bin Park (2026).
- [Codified Context: Infrastructure for AI Agents in a Complex Codebase](https://arxiv.org/abs/2602.20478) — A. Vasilopoulos (2026).
- [Active Context Compression: Autonomous Memory Management in LLM Agents](https://arxiv.org/abs/2601.07190) — Nikhil Verma (2026).
- [MAGMA: A Multi-Graph based Agentic Memory Architecture for AI Agents](https://arxiv.org/abs/2601.03236) — D. Jiang et al. (2026).
- [Beyond Static Summarization: Proactive Memory Extraction for LLM Agents](https://arxiv.org/abs/2601.04463) — C. Yang et al. (2026).
- [Externalization in LLM Agents: A Unified Review of Memory, Skills, Protocols and Harness Engineering](https://arxiv.org/pdf/2604.08224) — C. Zhou et al. (2026)

<br>

### Agentic Memory & Long-Horizon Learning

<br>

- [Scaling Long-Horizon LLM Agent via Context-Folding](https://arxiv.org/abs/2510.11967) — W. Sun et al. (2025).
- [QSAF: A Novel Mitigation Framework for Cognitive Degradation in Agentic AI](https://arxiv.org/abs/2507.15330) — H. Atta et al. (2025).
- [LLMs Get Lost In Multi-Turn Conversation](https://arxiv.org/abs/2505.06120) — P. Laban et al. (2025).
- [A Journey Through Test-Time Memorization, Attentional Bias, Retention, and Online Optimization](https://arxiv.org/abs/2504.13173) — A. Behrouz et al. (2025).
- [Enabling DeepSeek's Multi-Head Latent Attention in Any Transformer-based LLMs](https://arxiv.org/abs/2502.14837) — Tao Ji et al. (2025).
- [MemEvolve: Meta-Evolution of Agent Memory Systems](https://arxiv.org/pdf/2512.18746) — OPPO AI Team (2025)
- [Memorilla: Latent Semantic Memory for LLMs](https://arxiv.org/pdf/2610.21375) — A. Fallahpour et al. (2026) 

<br>

### Foundational Research 

<br>

- [A Survey on the Memory Mechanism of LLM-Based Agents](https://arxiv.org/pdf/2404.13501) — Z. Zhang et al. (2024).
- [Cognitive Architectures for Language Agents](https://arxiv.org/abs/2309.02427) — T. R. Sumers et al. (2023).
- [Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172) — N. F. Liu et al. (2023).
- [Generative Agents: Interactive Simulacra of Human Behavior](https://arxiv.org/abs/2304.03442) — J. S. Park et al. (2023).
- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) — P. Lewis et al. (2020).

<br>
<br>

---

# 4️⃣🪄 Notable Open-Source Projects on Agentic Memory

<br>

#### ✨ For completeness, I've compiled a list of other popular open-source projects focused on agentic memory, organized by programming language for easy reference. I'll continue to expand the list as I discover additional relevant resources. ✨

<br>

* 🦀 [memvid (Rust)](https://github.com/memvid/memvid): Memory layer for AI agents. Replace complex RAG pipelines with a serverless, single-file memory layer. Give your agents instant retrieval and long-term memory.

* 🦀 [Utopia (Rust)](https://github.com/deeplethe/utopia): Knowledge graph / world model system. One Rust binary and one Postgres instance. Full-text search is embedded in the binary, vectors go into pgvector, and the job queue is a table: nothing else to run.

* 🦀 [memmy-agent (Rust)](https://github.com/MemTensor/memmy-agent): Personal AI agent and local memory hub for all AI agents. Gives every AI one shared, fully controlled memory and persistent context.

* 🦀 [Minigraf (Rust)](https://github.com/project-minigraf/minigraf): Embedded graph memory for AI agents, mobile apps, and the browser — the SQLite of bi-temporal graph databases. A tiny, self-contained graph database with Datalog queries and bi-temporal time travel.

* 🦀 [graphicle (Rust)](https://github.com/Graphicle-AI/graphicle): Code graph and memory for your coding agents.

* 🦀 [Ratel (Rust)](https://github.com/ratel-ai/ratel): Context engineering for AI agents. ~80% fewer tokens. Fix tool overload. Skills and memory with in-process BM25 and semantic retrieval. Progressive disclosure. No vector DB.

* 🦀 [icm (Rust)](https://github.com/rtk-ai/icm): Permanent memory for AI agents. Single binary, zero dependencies, MCP-native.

* 🦀 [Chroma (Rust)](https://github.com/chroma-core/chroma): Data infrastructure for AI. Powers serverless vector, hybrid, and full-text search. It's extremely fast, cost-effective, scalable and painless. Create a DB and try it out in under 30 seconds.

* 🦀 [Warm (Rust)](https://github.com/writerslogic/warm): Local memory for agents and apps: full-text and vector search, a memory API and a vector-symbolic fact store in one embeddable Rust engine that makes no network calls.

* 🦀 [Qdrant (Rust)](https://github.com/qdrant/qdrant): High-performance, massive-scale Vector Database and Vector Search Engine for the next generation of AI.

* 🐍 [NVIDIA's Auto-Ontology (Python)](https://github.com/NVIDIA/auto-ontology): Auto Ontology is a Python framework for building semantic, graph-based reasoning layers over data. It enables deterministic query generation, better context retrieval, and more explainable AI for LLM and agent workflows.

* 🐍 [Red Hat's MemoryHub (Python)](http://github.com/redhat-ai-americas/memory-hub): Persistent, governed memory for AI agents. Gives agents a shared memory layer with semantic search, version history, scoped access control, and audit logging. It works with any agent framework that speaks MCP.

* 🐍 [txtai (Python)](http://github.com/neuml/txtai): All-in-one AI framework for semantic search, LLM orchestration, and language model workflows.

* 🐍 [Caura (Python)](https://github.com/caura-ai/caura): Governed shared memory for AI agent fleets. Multi-agent, multi-tenant, and MCP-native. Features trust tiers, keystone policies, audit trails, a knowledge graph, and self-improving retrieval.

* 🐍 [EverOS (Python)](https://github.com/EverMind-AI/EverOS): One portable memory layer for every AI agent: local-first, Markdown-native, user-owned, and self-evolving across apps, tools, and workflows.

* 🐍 [agent-memory (Python)](https://github.com/tigerless-labs/agent-memory): Long-term memory runtime for AI agents — plain Markdown as the source of truth, local ranked retrieval, and an independent sleep-time management layer. Claude Code and Codex share one store.

* 🐍 [mempalace (Python)](https://github.com/MemPalace/mempalace): Local-first AI memory. Verbatim storage, pluggable backends, 96.6% R@5 raw on LongMemEval — zero API calls.

* 🐍 [Memori (Python)](https://github.com/MemoriLabs/Memori): Agent-native memory infrastructure. An LLM-agnostic layer that turns agent execution and conversations into structured, persistent state for production systems. Built for enterprise use, Memori works with the data infrastructure you already run, requires no rip-and-replace, and supports deployment across managed cloud, single-tenant cloud, VPC, and on-premises environments.

* 🐍 [mnemosyne (Python)](https://github.com/mnemosyne-oss/mnemosyne): Zero-cloud AI memory that works everywhere. SQLite-backed, with a single pure-Python dependency.

* 🐍 [A-mem (Python)](https://github.com/WujiangXu/A-mem): A novel agentic memory system for LLM agents that can dynamically organize memories in an agentic way.

* 🐍 [semantica (Python)](https://github.com/semantica-agi/): Graph-native infrastructure for context and accountable AI systems.

* 🐍 [mengram (Python)](https://github.com/alibaizhanov/mengram): Human-like memory for AI agents — semantic, episodic, and procedural. Experience-driven procedures that learn from failures. Free API, Python and JS SDKs, and LangChain, CrewAI, and OpenClaw integrations.

* 🐍 [Microsoft's GraphRAG (Python)](https://github.com/microsoft/graphrag): A modular, graph-based Retrieval-Augmented Generation (RAG) system.

* 🐍 [headroom (Python)](https://github.com/headroomlabs-ai/headroom): Compress tool outputs, logs, files, and RAG chunks before they reach the LLM. 20% fewer tokens for coding agents and 60–95% fewer tokens for JSON, with the same answers. Available as a library, proxy, and MCP server.

* 🟦 [agentmemory (TypeScript)](https://github.com/rohitg00/agentmemory): Persistent memory for AI coding agents based on real-world benchmarks.

* 🟦 [MemOS (TypeScript)](https://github.com/MemTensor/MemOS): Self-evolving memory OS for LLMs and AI agents: ultra-persistent memory, hybrid retrieval, and cross-task skill reuse, with 35.24% token savings and DeepSeek Harness support.

* 🟦 [RetainDB (TypeScript)](https://github.com/RetainDB/RetainDB): Memory infrastructure for AI agents, from local coding-agent recall to hosted product memory. 

* ⚙️ [nebula (C++)](https://github.com/vesoft-inc/nebula): A distributed, fast, open-source graph database featuring horizontal scalability and high availability.

<br>
<br>

---

### That's it for today. I hope you had as much fun reading as I had conducting this research. Thank you for reading, and until next time, my friends!

### ⬛️


