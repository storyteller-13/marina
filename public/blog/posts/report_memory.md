---
title: 🏄‍♀️ REPORT → A Ride Through AI Agentic Memory
subtitle: Audience: Beginner to Advanced AI Scientists and Engineers |  Today's word: Magic · Magie · 魔法 (まほう) · קסם
date: 2026; 11; 06
---

> [🎧](https://www.youtube.com/watch?v=mu0KNo8ULHE) *"The soul becomes dyed with the color of its thoughts."* — Marcus Aurelius on Mindset

> [🎵](https://www.youtube.com/watch?v=usQvdsTRVgE) *"I am yet to find a greater pleasure than the pleasure of creating and bringing something new into the world."* — Marina von Steinkirch

<br>

![](/blog/assets/dali.webp)

<br>

#### *Hello there, my anon friend!*

#### *This is the Part II of III of our technical debt festival (check out **[Part I here](https://marina.nullstar.fun/pages/post.html?post=report_harness)**). Continuing our research for **[NULLSTAR](https://www.nullstar.games/)**'s **[PleiadesOS:ELECTRA](https://marina.nullstar.fun/pages/post.html?post=idea_nullstar)** module, today we'll take a deep dive into the current landscape of agentic memory. We'll be reading a selection of reserch and industry articles and examining the code of some of the most prominent projects.*

<br>

As I read through the material, below are my highlights — with a moderate attempt at coherence — for my personal inventory (and perhaps as a way to connect with other friendly AI scientists and builders out there who love talking about the same things). As always, please remember our rules:

**🤖 If these notes look cool to you, it's your ✦moral duty✦ to read the original resources.**
**🤖 Just another blog, but not your usual blog: they're living notes that I change as I fancy.**

<br>

---

# 0️⃣🪄 Agentic Memory TL;DR

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

| Category | [Mem0](https://github.com/mem0ai/mem0) | [Cognee](https://github.com/topoteretes/cognee) | [Zep](https://github.com/getzep/zep) / [Graphiti](https://github.com/getzep/graphiti) | [Letta](https://github.com/letta-ai/letta) | [LangChain](https://github.com/langchain-ai/langchain) / [LangMem](https://github.com/langchain-ai/langmem) | [Hindsight](https://github.com/vectorize-io/hindsight) | [Supermemory](https://github.com/supermemoryai/supermemory) | [Honcho](https://github.com/plastic-labs/honcho) | [ByteRover](https://github.com/byterover) | [OpenViking](https://github.com/volcengine/OpenViking) | [Holograph](https://github.com/writerslogic/holographic-memory) |
| --------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Core approach               | Hybrid vector + graph memory; extraction-based distilled facts with entity linking                       | Graph-native memory with ECL pipeline                                    | Temporal knowledge graph + vector search engine                                                      | Self-editing agent memory with OS-inspired paging                                  | Tool-based memory integrated directly with LangGraph                                                                   | Compositional memory structured into four epistemically distinct networks                                  | Personal knowledge repository combining memory and RAG                                                                                | Managed peer-centric memory and user modeling layer                                         | Agent-curated, hierarchical file-based context tree with agentic retrieval                                       | Filesystem-native context database unifying memory, resources, and skills                                           | Vector-symbolic associative memory using hypervectors, alongside hybrid document search                              |
| Primary focus               | Long-term agent memory and cross-session personalization                                                 | Graph-based knowledge ingestion, structuring, and reasoning              | Temporal knowledge, timeline tracking, and entity relationship changes                               | Stateful agents with self-managed memory blocks                                    | Configurable memory managers and self-updating instructions                                                            | Fact/opinion separation, reflection, and multi-horizon reasoning                                           | Knowledge vault for storing, searching, and retrieving unstructured data                                                              | Multi-peer perspective tracking, user profiling, and conversation history                   | Persistent project knowledge, coding-agent context, and cross-agent sharing                                      | Unified context management, cross-session memory, and reusable agent skills                                         | Associative long-term memory, document retrieval, and semantic recall                                                |
| Memory architecture         | Combines vector embeddings, graph relationships, and hierarchical scopes                                 | ECL (Extract, Cognify, Load) pipeline into a hybrid graph-vector store   | Temporal knowledge graph (Graphiti engine); tracks exact validity ranges (`valid_at` / `invalid_at`) | Two-tier model: core memory (in-context RAM) + archival memory (disk vector store) | Configurable memory managers operating over any LangGraph `BaseStore`                                                  | Four logical networks: World, Experience, Observation, and Opinion                                         | Personal knowledge vault backed by vector search and metadata stores                                                                  | Peer-centric graph and profile representations updated via background reasoning             | Four-level semantic hierarchy (Domain → Topic → Subtopic → Entry) of Markdown knowledge files with metadata      | VikingFS virtual filesystem (`viking://` URIs) with vector indexing and hierarchical L0/L1/L2 context layers        | Vector-symbolic associative memory with sparse binary hypervectors, binding, bundling, and hybrid document retrieval |
| Memory representation       | Structured memories with metadata tags                                                                   | Hybrid graph-vector-relational structures                                | Temporal facts, entities, and timestamped edges                                                      | Editable memory blocks and archival vector storage                                 | Configurable memory representations via custom memory managers                                                         | Structured networks separating objective facts, experiences, observations, and opinions                    | Vector segments, document chunks, user profiles, and metadata                                                                         | Messages, peer relationship graphs, summaries, and inferred user profiles                   | Human-readable Markdown files organized into hierarchical context trees                                          | Filesystem directories and files with L0 abstracts, L1 overviews, and L2 full content                               | Sparse binary hypervectors, bound key-value pairs, bundled associations, and document passages                       |
| Semantic memory             | Yes, native (user and global memory)                                                                     | Yes, through extracted entities, relationships, and knowledge graphs     | Yes, via Graphiti's temporal knowledge graph                                                         | Yes, via tiered core/archival/recall memory model                                  | Yes (facts and user profiles)                                                                                          | Yes, through World and Observation networks                                                                | Yes, through extracted knowledge and profile chunks                                                                                   | Yes, through automatically maintained peer representations and facts                        | Yes; curated project knowledge, decisions, rules, and relationships                                              | Yes; profile, preferences, entities, identity, and other extracted memories                                         | Yes; associative key-value memory and semantic document retrieval                                                    |
| Episodic memory             | Yes, via defined episodic/semantic hierarchy and metadata consolidation                                  | Episodic ingestion via documents, conversations, and data points         | Partial; event tracking within the graph with explicit temporal validities                           | Yes; agent self-manages what moves between archival memory on disk and core RAM    | Yes; past interactions surfaced via memory stores or few-shot examples                                                 | Yes; Experience network stores agent actions and interaction history                                       | Yes; session messages and conversation history retention                                                                              | Yes; session-level message logs and conversation history                                    | Partial; persistent knowledge entries and session-derived project context, but no explicit episodic memory model | Yes; session archives, conversation history, events, and extracted experiences                                      | Partial; conversation memory with source provenance, but not explicitly categorized as episodic memory               |
| Procedural memory           | Architecture supports concept; dedicated tooling is early-stage                                          | Not explicitly categorized as procedural memory                          | Not a dedicated feature                                                                              | Yes, conceptually through editable core memory blocks                              | Yes, via self-updating instruction layers / prompt optimizer (a standout LangMem feature)                              | Not explicitly categorized as procedural memory                                                            | Not explicitly categorized as procedural memory                                                                                       | Not explicitly categorized as procedural memory                                             | Yes, through reusable project rules, workflows, and agent instructions                                           | Yes, through reusable Skills and task trajectories                                                                  | Not explicitly categorized as procedural memory                                                                      |
| License / open source       | Apache 2.0                                                                                               | Apache 2.0                                                               | Graphiti: Apache 2.0 (open source). Zep platform: managed-only; Community Edition deprecated         | Apache 2.0 (core development has moved to the letta-code repo)                     | Open-source (LangChain ecosystem license; LangMem license not independently verified)                                  | MIT open-source library                                                                                    | MIT for the public repo (SDKs and components); the self-hosted server is a separate non-open-source binary under a lite license limit | AGPL-3.0 open-source Python/TS SDK and server                                               | Elastic License 2.0 (source-available, not OSI open source)                                                      | AGPL-3.0 for the core; CLI and examples Apache 2.0; some framework adapters AGPL-3.0 or MIT                         | Apache 2.0                                                                                                           |
| Self-hosting                | Yes; pip, npm, Docker, and local installs                                                                | Yes; embedded defaults require no external infra to start                | Graphiti: yes, against Neo4j, FalkorDB, Kuzu, or Neptune. Zep core: managed-only                     | Yes, local/Docker deployment supported                                             | Yes, developer provides and manages the underlying store                                                               | Yes, local stack or self-hosted FastAPI server                                                             | Yes; local self-hosted server binary (not open source, lite license limit)                                                            | Yes, local stack or self-hosted FastAPI server via Docker Compose                           | Yes; local-first CLI and filesystem storage                                                                      | Yes; standalone server, CLI, and local deployment                                                                   | Yes; local-first Rust engine and local persistent storage                                                            |
| Managed cloud / service     | Yes (Mem0 Cloud)                                                                                         | Yes (Cognee Cloud)                                                       | Yes (Zep Cloud)                                                                                      | Yes (Letta Cloud)                                                                  | No (managed via LangGraph Platform)                                                                                    | Yes (Hindsight Cloud, pay-as-you-go; Enterprise tier available)                                            | Yes (Supermemory Cloud)                                                                                                               | Yes (Honcho managed API at `api.honcho.dev`)                                                | Optional cloud synchronization and team sharing                                                                  | Yes; Volcengine-hosted OpenViking Service (SaaS) and a licensed self-managed/BYOC edition                           | No managed service found; local-first engine                                                                         |
| Multi-agent support         | Yes, via `agent_id` scoping alongside `user_id`                                                          | Supported through agent integrations and workspace organization          | Not a native architectural concept                                                                   | Yes, shared memory blocks between agents are core                                  | Depends on LangGraph orchestration                                                                                     | Not natively optimized for multi-agent peer tracking                                                       | Not explicitly structured for multi-agent routing                                                                                     | Yes, native peer-based multi-agent architecture (tracks peers, groups, agents)              | Yes; shared project context with selective agent and teammate access                                             | Yes; agent-specific contexts, shared skills, and multi-agent integrations                                           | Not explicitly documented as a native multi-agent architecture                                                       |
| Memory scopes               | Session, user, agent, organization, and custom scopes                                                    | Datasets, users, sessions, and workspace isolation                       | Graphs organized by subjects, users, teams, and topics                                               | Core/archival namespaces and shared memory blocks                                  | Namespaces, users, agents, and application-defined scopes                                                              | Agent-specific memory banks and entity-level isolation                                                     | Namespaces, containers, and user profiles                                                                                             | Workspaces, peers, and sessions                                                             | Project workspaces, context trees, agents, and selectively shared folders                                        | Resources, users, agents, peers, sessions, and skills                                                               | Local store, per-project namespaces, and document-level identifiers; tenant-scoped server stores                     |
| Multi-tenant support        | Built-in scopes (user, organization, agent)                                                              | Yes, Cognee Cloud supports isolated multi-tenant workspaces              | Yes, enterprise context infrastructure                                                               | Organization-level shared memory and agent isolation                               | Depends on underlying store and application implementation                                                             | Application-managed isolation (Hindsight Cloud is multi-tenant)                                            | Namespace-based organization; enterprise options available                                                                            | Workspace and peer-based isolation                                                          | Project-level isolation; team sharing with access controls                                                       | Yes; account, user, peer, and ACL-based isolation                                                                   | Yes; tenant-scoped HTTP server storage (single node, no TLS, shared key)                                             |
| Framework agnostic          | Yes                                                                                                      | Yes                                                                      | Yes                                                                                                  | Yes                                                                                | Partial; core memory managers and prompt optimizer work standalone, stateful storage is built on LangGraph `BaseStore` | Yes                                                                                                        | Yes                                                                                                                                   | Yes                                                                                         | Yes                                                                                                              | Yes                                                                                                                 | Yes                                                                                                                  |
| Graph memory support        | Yes; graph relationships and entity linking (paid tiers on the hosted platform, included in open source) | Yes; native and central to architecture                                  | Yes; core architectural differentiator                                                               | No; archival memory is vector-based                                                | No                                                                                                                     | Yes; temporal entity graph and traversal                                                                   | Yes; knowledge graph of facts (vendor-stated)                                                                                         | Not a primary native knowledge graph architecture                                           | Hierarchical file-based knowledge graph with cross-references; no native graph database                          | Context hierarchy and knowledge graph compilation; no native graph database as core storage                         | Yes; vector-symbolic triple store and multi-hop associative queries                                                  |
| Vector memory support       | Yes                                                                                                      | Yes                                                                      | Yes                                                                                                  | Yes; archival retrieval                                                            | Yes                                                                                                                    | Yes; vector search with pgvector                                                                           | Yes                                                                                                                                   | Yes; semantic retrieval and indexed search                                                  | No; file-based BM25 retrieval without a vector database                                                          | Yes; vector indexing and semantic retrieval                                                                         | Yes; hypervector associative memory and exact-cosine document retrieval                                              |
| Hierarchical memory         | Yes; user / session / agent                                                                              | Yes; graph, document, and summary organization                           | Yes; entity, relationship, and episodic layers                                                       | Yes; core vs. archival                                                             | Yes; profiles and collections                                                                                          | Yes; four logical memory networks                                                                          | Yes; profiles, memories, and documents                                                                                                | Yes; peer representations, sessions, and messages                                           | Yes; Domain → Topic → Subtopic → Entry context tree                                                              | Yes; directory hierarchy with L0/L1/L2 progressive context layers                                                   | Limited; associative vector composition rather than conventional hierarchical memory                                 |
| Automatic memory extraction | Yes                                                                                                      | Yes                                                                      | Yes                                                                                                  | Yes                                                                                | Yes; background memory manager                                                                                         | Yes; retain pipeline                                                                                       | Yes                                                                                                                                   | Yes; background reasoning and profile generation                                            | Yes; agent-driven curation, extraction, and organization                                                         | Yes; session-based extraction, compression, merging, and deduplication                                              | Not explicitly documented as automatic conversational memory extraction                                              |
| Memory retrieval            | Semantic search + graph traversal + keyword matching                                                     | Graph, vector, lexical, and hybrid search                                | Graph search + vector search + full-text search                                                      | Core memory context + archival retrieval                                           | Semantic retrieval + memory search APIs                                                                                | Hybrid retrieval (vector, keyword, graph traversal, temporal filtering)                                    | Knowledge/document retrieval (vector + metadata + RAG)                                                                                | Peer-scoped semantic retrieval and curated context                                          | Agentic file-based search, hierarchical traversal, and BM25 lexical retrieval                                    | Semantic search, hierarchical retrieval, and reranking                                                              | Hybrid BM25 + exact-cosine document search and vector-symbolic associative recall                                    |
| Retrieval strategy          | Hybrid semantic + keyword + entity signals                                                               | Hybrid graph + vector + lexical retrieval                                | Hybrid graph + vector + full-text traversal                                                          | Core memory + archival retrieval                                                   | Semantic retrieval and memory search APIs                                                                              | Hybrid multi-network search combining vectors, graphs, and temporal filters                                | Vector + metadata + RAG-oriented search                                                                                               | Peer-scoped semantic retrieval and context injection                                        | Hierarchical context discovery, file search, and agent-driven retrieval                                          | Intent analysis, scoped hierarchical retrieval, vector search, and optional reranking                               | Hybrid BM25 + exact cosine; associative retrieval through binding, bundling, and resonance                           |
| Memory updates              | Automatic extraction and updates                                                                         | Automatic extraction, graph refinement, and feedback improvement         | Automatic extraction and temporal edge invalidation                                                  | Agent-controlled memory updates                                                    | Explicit tool calls / memory operations; optional background updates                                                   | Retain and reflect operations; updates to evolving facts and opinions                                      | Automatic memory extraction and updates                                                                                               | Automatic reasoning and continuously updated peer representations                           | Stateful agent-driven curation (add, update, merge, delete) with review workflow                                 | Automatic memory extraction, LLM-based merging, deduplication, and filesystem updates                               | Persistent associative writes, document ingestion, and explicit remember / recall / forget operations                |
| Entity relationships        | Yes                                                                                                      | Yes                                                                      | Yes                                                                                                  | Limited                                                                            | Limited                                                                                                                | Yes; temporal entity relationships                                                                         | Entity extraction and profile associations                                                                                            | Peer relationships and inferred connections                                                 | Explicit cross-references and relationships within context files                                                 | Yes; entity memories and knowledge graph compilation                                                                | Yes; associative key-value relationships and triple-store representation                                             |
| Temporal reasoning          | Limited (temporal search filtering added in 2026)                                                        | Yes; temporal search and validity-aware knowledge                        | Strong; tracks changing facts over time with valid/invalid dates                                     | Limited                                                                            | Limited                                                                                                                | Yes; temporal filtering and tracking of evolving facts                                                     | Evaluated in benchmarks                                                                                                               | Tracks changing people, preferences, and patterns over time                                 | Limited; timestamps, recency scoring, and version-controlled context changes                                     | Yes; events, experiences, session histories, and temporal context                                                   | Partial; memory API supports time validity and supersession, but no dedicated temporal reasoning engine              |
| Multi-hop reasoning         | Yes                                                                                                      | Yes; graph traversal and graph-completion modes                          | Yes                                                                                                  | Not a dedicated native feature                                                     | Application-dependent                                                                                                  | Yes; graph-based reasoning and reflection                                                                  | Evaluated on multi-hop conversational recall                                                                                          | Natural-language reasoning over accumulated peer knowledge                                  | Agent-driven reasoning over hierarchical context and cross-referenced files                                      | Knowledge graph compilation and hierarchical context retrieval                                                      | Yes; multi-hop queries through associative triple-store memory                                                       |
| API support                 | Yes                                                                                                      | Yes; Python SDK and REST API                                             | Yes                                                                                                  | REST API                                                                           | Integrated memory APIs                                                                                                 | Yes; REST API, Python / Node / Go clients, and MCP server                                                  | Developer API                                                                                                                         | Yes; REST API and SDK                                                                       | Yes; CLI and agent-facing tools                                                                                  | Yes; Python, Go, and TypeScript SDKs, CLI, and HTTP API                                                             | Yes; Rust, Python, Node.js, and HTTP APIs                                                                            |
| Primary integration         | Framework-agnostic; MCP support (OpenMemory MCP, hosted Platform MCP)                                    | LangGraph, OpenClaw, MCP                                                 | MCP server for Claude/Cursor; direct Neo4j/FalkorDB integration                                      | Native agent runtime, API, and CLI                                                 | LangGraph specifically                                                                                                 | Python/Node/Go SDKs, MCP server, and custom agent integrations                                             | Browser extension, notes, documents, web content                                                                                      | API-oriented, MCP, and agent-framework integrations                                         | Coding agents, OpenClaw, Hermes, and MCP-compatible agents                                                       | MCP, CLI, and agent integrations including Claude Code, Codex, Cursor, and OpenClaw                                 | MCP server and local memory integrations                                                                             |
| Integration capabilities    | LangChain, LlamaIndex, CrewAI, AutoGen, and custom loops                                                 | LangGraph, OpenClaw, MCP, CrewAI, OpenAI Agents SDK, Google ADK, and n8n | CRM and enterprise data integration; Neo4j / FalkorDB                                                | Agent runtime integration                                                          | LangGraph ecosystem                                                                                                    | Python, Node, Go, MCP, and custom agent integrations                                                       | Browser extension, web content, and notes                                                                                             | Custom integration, MCP, and agent frameworks                                               | Codex, Claude Code, Cursor, OpenClaw, Hermes, OpenCode, and other agent workflows                                | MCP, Python, HTTP, CLI, LangChain/LangGraph, and agent plugins (Claude Code, Codex, Cursor, TRAE, OpenCode, Hermes) | MCP, Rust, Python, Node.js, and HTTP integration                                                                     |
| Enterprise compliance       | Yes (SOC 2 Type I and HIPAA-ready badges, GDPR options; enterprise tier adds SSO, audit logs, on-prem)   | Enterprise and cloud deployment options                                  | Yes (Enterprise governance via Zep Cloud)                                                            | Not publicly stated (unverified)                                                   | No (relies on LangGraph platform compliance)                                                                           | Self-hosted compliance model; Cloud/Enterprise adds SSO, audit logs, GDPR tooling, and vendor-stated SOC 2 | Enterprise deployment options available                                                                                               | Organization-level controls and enterprise deployment options (certifications not verified) | SOC 2 Type II; enterprise security and access controls                                                           | Enterprise deployment, ACL, and self-managed/BYOC edition                                                           | Local-first privacy model; optional encryption                                                                       |
| Data residency control      | Self-hosting or region-specific cloud                                                                    | Self-hosting (Docker/Python) or regional Cognee Cloud                    | Self-hosted graph database (Neo4j/FalkorDB) or Zep Cloud                                             | Self-hosted local/Docker or Letta Cloud                                            | Determined by developer's choice of underlying data store                                                              | Self-hosted via Docker / FastAPI server, or Hindsight Cloud / Enterprise (BYOC and on-prem options)        | Self-hosted (local-first) or Supermemory Cloud                                                                                        | Self-hosted via Docker / FastAPI or managed `api.honcho.dev`                                | Local-first filesystem storage; optional cloud synchronization                                                   | Self-hosted server and storage with configurable deployment; hosted service currently in China (Beijing)            | Fully local storage by default; optional encryption; no cloud sync found                                             |
| **Long-memory benchmarks** | Published: LoCoMo (92.5%); LongMemEval (94.4%); BEAM (64.1%) | Published: BEAM 100K/10M (0.79 correctness score) | Published: LoCoMo (94.7%); LongMemEval (90.2%) | Published: LoCoMo (74.0% via filesystem baseline) | Published (LangMem): LoCoMo / Bench'd (58.1%–60.0%); LongMemEval (Pending / unverified) | Not publicly benchmarked | Partial: LongMemEval | No comparable public long-memory benchmarks | Published: LoCoMo (96.1%); LongMemEval-S (92.8%) | Published: LoCoMo (82.08% OpenClaw; 82.86% Hermes; 80.32% Claude Code) | Benchmark harness prepared for LoCoMo, LongMemEval-S, and BEAM; comparative results not yet published |
| **Testing and evaluation** | Dedicated harness for LoCoMo, LongMemEval, and BEAM | Built-in evaluation harness for BEAM, LoCoMo, tau2-bench, and custom RAG | Evaluation framework & harness for LoCoMo, LongMemEval, and auto-search depth | Open-source agent memory leaderboard harness (`letta-leaderboard`) | Bench'd harness integrations & custom unit/integration tests | Custom, ad hoc | Partial; mostly relevance-oriented | No comparable public long-memory benchmarks | Published evaluations using LoCoMo and LongMemEval-S; production CLI benchmark suite | Dedicated memory evaluation harness; LoCoMo, tau2-bench, and RAG evaluations | Synthetic research benchmarks; compositional retrieval, capacity, noise tolerance, and memory evaluation harness |
| **Token efficiency** | ~6,956 tokens/query on LoCoMo; ~6,787 tokens/query on LongMemEval | Efficient via graph completion & targeted hybrid chunk retrieval | ~2,680–5,760 tokens/query on LoCoMo; ~4,408 tokens/query on LongMemEval | Context-dependent; raw file injection relies on LLM context limits | Variable; relies on `SummarizationMiddleware` or context slicing | Highly variable per summarization strategy | Not disclosed | Full details not publicly benchmarked | Five-tier progressive retrieval; most queries resolved in under 100 ms without LLM calls; no comparable token-efficiency figures disclosed | Reported 34.3–91.0% reduction in input tokens across agent integrations through progressive context loading | Configurable retrieval budgets; 7K-token-matched benchmark configuration, but end-to-end results pending |
| **Long-term factual recall** | High; 92.5% on LoCoMo & 94.4% on LongMemEval | High; strong across multi-turn shift dialogues & temporal updates | High; 95.6% temporal & 94.0% multi-hop recall on LoCoMo | Moderate; limited to window/file size without specialized index | Moderate; depends on retrieval configuration and prompt/store design | Medium; depends on prompt and heuristics | Good for RAG facts; less focused on temporal evaluations | - | High; benchmarked on LoCoMo and LongMemEval-S, including temporal and multi-session recall | Good; 80–83% LoCoMo accuracy across three agent integrations | Strong synthetic associative recall; 100% knowledge-graph retrieval on 2,120 controlled facts; conversational recall not yet established |
| **Cost at scale** | Bounded; ~6.9K tokens per retrieval | Low-to-moderate; optimized graph completion reduces redundant LLM calls | Bounded; auto-search reduces token footprint by 53% | Low infrastructure cost, but higher context token usage per query | Variable; LLM summarization and frequent vector store rewrites add overhead | Grows with history and summarization | Tied to RAG usage and context sizes | - | No external vector database, graph database, or embedding service required; LLM-based curation and reasoning still incur model costs | Reduced inference costs through progressive retrieval and lower context consumption; requires infrastructure and model providers | Local-first Rust engine; no external service calls or embedding requirements in the published benchmark adapter |
| **Scalability** | Cloud managed or self-hosted API with multi-vector DB support | Scalable distributed processing via Modal & local graph backends | Production-ready managed cloud or self-hosted enterprise infrastructure | Local file-based state or managed agent server instance | Dependent on underlying vector DBs, PostgreSQL, or LangGraph Cloud storage | - | Primarily personal knowledge management | - | Hierarchical Context Tree, local filesystem storage, Git-like versioning, and cloud synchronization for teams | Unified context filesystem, recursive retrieval, scoped namespaces, and self-hosted or managed deployment | Embedded Rust engine, persistent storage, federated queries, and synthetic capacity tests up to 58K facts at 95% recall |
| **Main advantage** | Flexible hybrid memory with automatic extraction and graph relationships | Native graph architecture and hybrid storage | Temporal relationship tracking and multi-hop reasoning | Agent autonomy and editable memory | Fine-grained developer control over memory operations | Conversation summarization and context management | Personal knowledge consolidation and retrieval | Managed memory service for agent builders | LLM-curated hierarchical context, explicit relationships, provenance, adaptive knowledge lifecycle, and version-controlled memory | Unified context infrastructure combining resources, memories, and skills with hierarchical retrieval and progressive loading | Local-first hybrid search, graph indexing, vector-symbolic memory, associative reasoning, and provenance |
| **Main limitation** | Graph features require additional configuration; extraction quality depends on the underlying LLM | Ingestion requires dedicated graph creation/LLM parsing step | More complex infrastructure; graph traversal can become expensive; ongoing schema maintenance | Requires adopting its agent runtime; tool-driven memory management adds complexity | LangGraph dependency; explicit tool invocation; self-hosted infrastructure management | Depends on summarization strategy; no publicly benchmarked long-memory performance | Limited multi-tenancy, production agent infrastructure, managed hosting, and developer API integration | No comparable public long-memory benchmarks; cloud-centric infrastructure | LLM-dependent curation; model costs and quality depend on the selected configuration | Requires additional infrastructure and model configuration; hierarchical summaries introduce processing and freshness considerations | Long-memory benchmark results not yet established; experimental sparse-vector retrieval path has performance limitations |
| **Typical use cases** | Agents, copilots, CX, coding assistants | Knowledge graphs, data pipeline memory, multi-session RAG agents | Enterprise AI agents, temporal tracking, customer memory | Stateful autonomous agents, personal assistant bots | LangChain / LangGraph applications needing simple persistent context | Chatbots and assistants with conversation history | Apps that mix memory with external documents | Agent builders requiring managed memory | Coding agents, persistent project knowledge, collaborative agent workflows, and cross-session context | AI agents requiring unified context management, knowledge retrieval, persistent memory, and reusable skills | Local AI agents, private RAG, associative memory, semantic search, and on-device applications |
| **Well-suited for** | Personalization and general-purpose agent memory across sessions; production AI agents needing persistent memory, personalization, and easy integration | Data-heavy applications needing structured knowledge graph memory across long dialogues | Temporal reasoning specifically; tracking when a fact stopped being true; enterprise agents requiring relationship tracking and business data integration | Long-running agents that need explicit, self-directed memory management; sophisticated stateful agents | Teams already building on LangChain who want memory that composes with existing LangGraph state | Simple assistants and early prototypes | Personal AI assistants, individual productivity tools, and knowledge management | Managed memory for agent builders | Coding agents and teams requiring persistent, structured, version-controlled, and shareable knowledge | Agentic systems requiring structured, hierarchical access to resources, memories, and skills | Applications requiring local-first, privacy-preserving memory with associative retrieval and auditable provenance |
| **Other use case** | Persistent, personalized, general-purpose production AI agents | Knowledge-intensive systems requiring graph synthesis and cross-turn evidence compilation | Enterprise knowledge-intensive agents requiring temporal reasoning and relationship tracking | Autonomous agents with self-managed memory | LangGraph-based applications | Simple assistants with conversation history | Personal AI knowledge assistants and knowledge apps with heavy external data | Production agents using a managed memory API | Persistent project memory and shared context for autonomous coding agents | Unified context infrastructure for production agentic systems with progressive retrieval | Embedded, privacy-preserving agent memory and local knowledge systems requiring provenance and associative reasoning |

<br>
<br>

---

# 1️⃣🪄 Production Memory Systems

<br>

#### ✨ Let's kick off our studies with an in-depth look at the projects pushing the state of the art in agentic memory systems. ✨

<br>
<br>

## 🟪 [mem0.ai](https://mem0.ai/research) 

<br>

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

1. The extraction phase initiates upon ingestion of a new message pair (the current and the preceding one). This pair consists of a user message and an assistant response, capturing a complete interaction unit. To establish appropriate context for memory extraction, the system employs two complementary sources: 1) a conversation summary retrieved from the database that encapsulates the semantic content of the entire conversation history, and 2) a sequence of recent messages from the conversation history, where m is a hyperparameter controlling the recency window. To support context-aware memory extraction, we implement an asynchronous summary generation module that periodically refreshes the conversation summary (which operates independently of the main processing pipeline).

2. The update phase evaluates each candidate fact against existing memories to maintain consistency and avoid redundancy. It determines the appropriate memory management operation for each extracted fact. For each fact, the system first retrieves the top s semantically similar memories using vector embeddings from the database. The retrieved memories and the candidate fact are presented to the LLM. The LLM determines which of four distinct operations to execute: `ADD`, `UPDATE`, `DELETE`, `NOOP`.

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
2. Edges E are relationship between entities
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

1️⃣ Age-based / TTL: The simplest. Drop entries older than N days regardless of how often they have been accessed. The cognitive analogue of trace decay.
2️⃣ LRU / recency: Drop entries unused for N days. Each access resets the clock. This is the closest analogue to Bjork's retrieval-strength decay. LRU works well for high-churn assistants where the relevant context shifts quickly.
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

<br>

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

```
import os
from mem0 import MemoryClient

# Configure your Mem0 API key
os.environ["MEM0_API_KEY"] = "YOUR_API_KEY"

# Initialize the client
mem_client = MemoryClient()
```

<br>

- Production AI agents do not fail because they lack a context window. They fail because their memories grow unstructured, stale, and noisy over time.

<br>

- Mem0 stores each memory as a small, self contained document that sits between structured database records and raw text logs. The core fields follow a common pattern:

➡️ `id`: unique identifier for the memory
➡️ `content`: actual text of the memory
➡️ `metadata`: JSON object that can include user ID, tags, source, timestamps, and domain specific fields
➡️ `created_at` and `updated_at`: temporal boundaries
➡️ `embedding` or `vector` field: for semantic search
➡️ `score` or similarity indicators: returned in search results
      
<br>

![](/blog/assets/report_mem_5.webp)

<br>

```
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

- Memory Stream: is a comprehensive list of an agent's experiences and Reflections are periodic, high-level abstract thoughts generated by the agent. The agent does not just retrieve raw observations, it synthesizes them into insights.

<br>

#### Vector Databases

<br>

- The most common implementation of agent memory today relies on Vector Databases. When text is ingested, be it a user query, a document, or a log file, it is passed through an embedding model (like OpenAI's text-embedding-3). This model converts the semantic meaning of the text into a high-dimensional vector, a list of floating-point numbers. 

- These vectors are stored in a database like Pinecone, Weaviate, or Qdrant. When the agent needs to "remember" something, it converts the current query into a vector and performs a similarity search (often using Cosine Similarity) to find the nearest vectors in that high-dimensional space.

<br>

| Feature / Dimension | [Pinecone](https://github.com/pinecone-io?utm_source=chatgpt.com) | [Qdrant](https://github.com/qdrant/qdrant?utm_source=chatgpt.com) | [Weaviate](https://github.com/weaviate/weaviate?utm_source=chatgpt.com) | [Milvus](https://github.com/milvus-io/milvus?utm_source=chatgpt.com) | [Chroma](https://github.com/chroma-core/chroma?utm_source=chatgpt.com) | [LanceDB](https://github.com/lancedb/lancedb?utm_source=chatgpt.com) | [pgvector (PostgreSQL)](https://github.com/pgvector/pgvector?utm_source=chatgpt.com) | [Redis (Redis Vector Search)](https://github.com/redis/redis?utm_source=chatgpt.com) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Category** | Dedicated & Managed | Dedicated & Managed | Dedicated & Managed | Dedicated & Managed | Embedded & Lightweight | Embedded & Lightweight | Extension Solution (Relational) | Extension Solution (In-Memory) |
| **Deployment Type** | Managed Cloud SaaS | Open-source / Managed Cloud | Open-source / Managed Cloud | Open-source / Managed Cloud (Zilliz) | Embedded / Local / In-memory | Embedded / Serverless | Database Extension | In-Memory / Managed |
| **Best For** | Fully managed cloud SaaS, rapid prototyping, hands-off scaling | High performance, custom metadata filtering, self-hosting or managed cloud | Hybrid search (vectors + keyword BM25), rich multi-modal memory | Enterprise-scale deployments with billions of memory vectors | Local prototyping, single-agent apps, Python-native environments | Disk-based storage, multi-modal memories, embedded serverless agents | Teams already running PostgreSQL wanting unified transactional & vector memory | Ultra-fast sub-millisecond short-term context & active agent session state |
| **Why it fits Agent Memory** | Serverless model (separates compute/storage) that auto-scales; strong native metadata filtering (`user_id`, `session_id`, `timestamp`); built-in namespace isolation | Built in Rust; famous for **payload-based filtering** and memory efficiency; handles complex logical filters fast without sacrificing recall; supports local embedded via `Qdrant Edge` | Object-oriented; natively handles hybrid search out of the box, combining semantic similarity with exact keyword lookup (dates, names, codes) | Open-source, cloud-native; completely decouples storage and compute; handles massive throughput & distributed tenant sharding efficiently | Extremely simple `pip install chromadb` setup; runs in-memory or persisted to disk locally; default choice for AutoGen, CrewAI, LangChain experimentation | Serverless/embedded engine backed by Apache Arrow/Lance format; queries disk directly with zero-copy reads; drastically reduces RAM overhead for desktop/edge agents | Eliminates need to sync external vector DB with main DB; relational user tables, structured logs, & vector embeddings live together in one `ACID`-compliant system | Combines ephemeral cache (working memory), key-value operational state, and vector similarity search into a single high-speed in-memory engine |
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

- For the agent's persona,`agent_id`, `app_id `for the product surface, and `run_id` for a single session or ticket.

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
3️⃣ scheduled reflection scan (it changes how memory is stored rather than just how it’s retrieved – a background worker runs after sessions end or on a schedule; the work happens asynchronously)

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

### [Open Source Agents with Memory](https://mem0.ai/library/agent-memory/open-source-ai-agents-with-built-in-memory)

<br>

| Aspect | No memory, only prompt history | Raw vector DB per message | Custom SQL/JSON memory | Mem0-style memory layer |
| --- | --- | --- | --- | --- |
| Cross-session persistence | No | Yes | Yes | Yes |
| Control over memory types | None | Minimal (all entries similar) | High but manual | Built-in via metadata and schemas |
| Retrieval quality | Limited to last N turns | Semantic, but noisy and redundant | Depends on custom queries | Semantic plus structured filters |
| Long-term summarization | Manual via ad-hoc prompts | Rarely implemented consistently | Custom logic per project | Encouraged pattern with shared primitives |
| Multi-tenant isolation | N/A | Possible but fragile | Possible, requires discipline | First-class via metadata scopes |
| Ecosystem and composability | Framework-specific | DB/vendor-specific | Application-specific | Framework-agnostic memory API |
| Auditability of decisions | Hard as history is partial | Hard as retrieval is opaque | Possible with extra work | Easier via inspectable memory records |
| Dev effort for new agents | Low for prototypes, high for production | Medium plus tuning | High, repeated per project | Medium, reusable across agents |

<br>

- Key points when in a real deployment: 

1️⃣ Data residency and self-hosting: Mem0 is open source and can be self-hosted, which allows data to remain within a VPC or specific region.
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
<br>

---

## 🟪 [Cognee](https://github.com/topoteretes/cognee)

<br>

> Cognee turns documents, code and conversations into a knowledge graph that agents can search, with remember, recall, improve and forget operations and support for custom data models and ontologies. It's made to build a company's brain.

<br>
<br>

---

## 🟪 [Zep](https://github.com/getzep/zep)

<br>

> Zep is an open-source memory store for LLM applications centered on conversation-history ingestion, through a distinguishing piece is called **[Graphiti](https://github.com/getzep/graphiti)** (a temporal knowledge graph engine that tracks how facts evolve over time). As a graph‑centric memory infrastructure is backed by graph databases such as Neo4j (or similar). 

<br>

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
<br>

---

## 🟪 [Letta](https://github.com/letta-ai/letta)

<br>

> The MemGPT paper framed the limited context window as an operating-systems problem: give the agent tools to page information in and out of its own context, and let it decide what to hold. In Letta, the agent edits its own memory blocks, deciding what is important enough to keep resident, what to archive, and when to fetch information back. Consequently, memory functions as an internal agent behavior rather than an external service called by the application.

<br>
<br>

---

## 🟪 [Hindsight](https://github.com/vectorize-io/hindsight)

<br>

> Hindsight is a style of memory architecture implemented by many teams: log every interaction, then periodically summarize or distill those logs into a compressed representation that can be re-injected into the model prompt.

<br>

Components:

➡️ Continuous logging: Store every user and assistant message in a database or vector store.
➡️ Periodic summarization: Use an LLM to create a summary of the last N interactions, or of the full conversation, and persist that summary as a “hindsight” artifact.
➡️ Heuristic retrieval: At inference time, choose a mix of the most recent messages, one or more long-term summaries, or a few semantically similar snippets.
➡️ Prompt rehydration: Construct a final prompt combining system instructions, the user query, recent messages, and summaries.

<br>
<br>

---

## 🟪 [Supermemory](https://supermemory.ai)

<br>

> Supermemory targets a broader surface area: memory, user profiles, RAG, and external connectors in a single platform. It is well-suited for knowledge-heavy applications where memory is one part of the broader stack.

<br>

Capabilities:

➡️ Connectors and ingestion: Index documents, web pages, and third-party data sources.
➡️ Profiles and traits: Store user attributes and traits inferred from interactions.
➡️ Vector and metadata retrieval: Use embeddings combined with metadata filters to pull relevant context.
➡️ Unified API: Provide a single endpoint that handles both memory and document retrieval.

<br>
<br>

---

## 🟪 [Honcho](https://github.com/plastic-labs/honcho)

<br>

> Honcho provides a managed memory service for AI agents. It focuses on storing conversations, extracting salient facts, and retrieving them for later use. Its goal is to abstract away the complexities of embedding stores, retrieval logic, and persistence so that agents can add “remembering” capabilities with minimal code.

<br>
<br>

---

## 🟪 [ByteRover](https://www.byterover.dev/)

<br>

> ByteRover is an agent-native memory and collaboration layer that acts as a company brain for development teams. It uses LLM-curated hierarchical context trees to sync project memory, code decisions, and workflows selectively across agents and teammates.

<br>
<br>

---

## 🟪 [OpenViking](https://openviking.ai/)

<br>

> OpenViking is an open-source context database for AI agents designed to unify agent memory, knowledge RAG, and skills. It acts as a single structured filesystem for everything an agent knows, avoiding opaque black-box vector stores.

<br>
<br>

---

## 🟪 [Holographic](https://github.com/writerslogic/holographic-memory)

<br>

> Holographic Memory is a local-first associative memory and vector search engine for AI agents. It leverages Vector Symbolic Architectures and Binary Spatter Code to enable lightning-fast, zero-dependency semantic search, associative recall, and analogical reasoning.

<br>
<br>

---

# 🪄2️⃣  How Leading AI Projects Think About Memory

<br>

#### ✨ To complement the results above, let's explore a few resources that illustrate how leading AI projects and companies are thinking about these challenges. This list is far from exhaustive, but it should be sufficiently illustrative and enlightening for the purposes of our studies. ✨

<br>
<br>

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


## [AI Memory Systems with MongoDB Atlas, AWS and Claude (MongDB, 2025)](https://www.mongodb.com/company/blog/technical/build-ai-memory-systems-mongodb-atlas-aws-claude)


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

## [The Sleep Framework (Google, 2026)](https://research.google/blog/the-sleep-framework-a-new-way-for-llms-to-retain-knowledge-in-continual-learning/)

<br>

- Modern LLMs achieve impressive performance via pre-training and in-context learning (ICL). However, once deployed, they remain largely static, operating with a fixed knowledge cutoff date that leaves them unable to acquire long-term capabilities or adapt to new information.

- While updating models with new data seems like the obvious solution, continual parameter updates often trigger catastrophic forgetting, a fundamental issue where learning new tasks severely degrades performance on previously learned ones. Alternatively, relying strictly on ICL limits knowledge retention to the immediate context window: once the context session ends, the acquired short-term information is forgotten.

- Inspired by how the human brain processes and stabilizes memory during rest, we introduce a sleep framework in continual learning: a learning paradigm that equips large language models (LLMs) with a continuous periodic lifecycle, enabling them to continually learn, consolidate fragile short-term context into stable long-term parameters. With this framework, we demonstrate that alternating between active interaction and offline memory consolidation allows LLMs to continuously acquire new facts, retain long-context knowledge up to 10M tokens, and improve complex reasoning.

<br>

Memory consolidation:

➡️ Parameter expansion & continuum memory hierarchy: To prevent catastrophic forgetting, the model dynamically scales its capacity during sleep. Using a Mixture of Experts (MoE) and Hope architecture , newly unlocked, low-rank experts are integrated into stable, lower-frequency memory blocks to store incoming knowledge without disrupting older parameters.
➡️ Knowledge seeding (upward distillation): Fragile short-term memories stored in high-frequency layers (e.g., in-context memory) are transferred into the newly expanded long-term parameters. This is achieved through Generalized Knowledge Distillation (GKD) combined with reinforcement learning (RL)-based imitation learning.
➡️ Synaptic pruning: Once the memory consolidation into lower-frequency modules is complete, the high-frequency temporary parameters are reset, freeing up capacity for future active sessions.

<br>

Dreaming for self-improvement

➡️ Random expert selection: During synthetic data generation, the MoE router randomly activates non-standard experts. This forces the model to mix disparate domains of knowledge and uncover latent patterns.
➡️ Curated rehearsal: The model generates synthetic training samples ("dreams") and filters them using gradient-based data selection to prioritize samples with the highest potential to boost overall model capability.
➡️ RL refinement: The model performs supervised fine-tuning on top-rated dream samples and evaluates whether the generation improves performance on downstream tasks.

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

## [Memory scaling for AI agents (Databricks, 2026)](https://www.databricks.com/blog/memory-scaling-ai-agent)

<br>

- Does the agent get better as it accumulates more information? We call this memory scaling: the property that agent performance improves with the amount of past conversations, user feedback, interaction trajectories (both successful and failed), and business context stored in its memory.

- Memory scaling is the property that an agent's performance improves as its external memory grows. Here "memory" refers to a persistent store of information the agent can interact with at inference time, distinct from the model's weights or the current context window.

- **[MemAlign](https://www.databricks.com/blog/memalign-building-better-llm-judges-human-feedback-scalable-memory)** is our exploration into what a simple memory framework can look like for AI agents. It stores past interactions as episodic memories, uses an LLM to distill them into generalized rules and patterns (semantic memories), and retrieves the most relevant entries at inference time to guide the agen.

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

- This attention scarcity stems from architectural constraints of LLMs. LLMs are based on the transformer architecture, which enables every token to attend to every other token across the entire context. This results in n² pairwise relationships for n tokens.

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

# 🪄3️⃣ Notable Research Papers on Agentic Memory

<br>

#### ✨ Let's conclude our readings with a curated collection of the latest research and developments in agentic memory, which we shall explore in future posts in our *Collective Intelligence Series* (on some weekend, if time allows... 🥲). Until then, I'll keep adding relevant resources as I come across them. ✨

<br>

### 2026's Quintessential Surveys and Guides

<br>

* [A Survey of Agent Memory in the Second Half](https://arxiv.org/pdf/2602.06052) — W. Huang et al. (2026).
* [A Survey on the Evolution of LLM Agent Memory Mechanisms](https://arxiv.org/pdf/2605.06716) — J. Luo et al. (2026).
* [Memory in the Age of AI Agents: A Survey](https://arxiv.org/pdf/2512.13564) — Y. Hu et al. (2026).
* [Advances in Memory Mechanisms for LLMs](https://arxiv.org/pdf/2610.35089) — C. Han et al. (2026).
* [Memory as Infrastructure](https://arxiv.org/pdf/2609.05510) — M. Helwig (2026).
* [Harness the Memory](https://arxiv.org/pdf/2608.15008) — W. Huang et al. (2026).
* [A Unified Review of Memory, Skills, Protocols and Harness Engineering](https://arxiv.org/pdf/2604.08224) — C. Zhou et al. (2026).
* [Memory for Autonomous LLM Agents](https://arxiv.org/pdf/2603.07670) — P. Dug (2026).
* [Anatomy of Agentic Memory](https://arxiv.org/pdf/2602.19320) — D. Jiang et al. (2026).
* [A Survey on the Memory Mechanism of LLM-Based Agents](https://arxiv.org/pdf/2404.13501) — Z. Zhang et al. (2024).
* [M*⋆: Every Task Deserves Its Own Memory Harness](https://arxiv.org/pdf/2604.11811) — W. Pan et al. (2026).
* [A Survey on Long-Term Memory Security in LLM Agents](https://arxiv.org/pdf/2604.16548) — Z. Lin et al. (2026).

<br>

### Agentic Memory & Harness Engineering

<br>

* [A-Mem: Agentic Memory for LLM Agents](https://arxiv.org/pdf/2502.12110) — W. Xu et al. (2025).
- [AutoCompact: Learning When to Compact Context in Long-Horizon Coding Agents](https://arxiv.org/abs/2610.02163) — Xuan Zhang et al. (2026).
- [ACM: Agentic Context Management for Long Horizon Tasks](https://arxiv.org/abs/2607.23809) — Xiaochuan Li, Ryan Ming, Meng Chu, Shuai Shao, Rong Jin, Chenyan Xiong (2026).
- [PRO-LONG: Programmatic Memory Enables Long-Horizon Reasoning](https://arxiv.org/abs/2607.20064) — Alexis Fox, Junlin Wang, Paul Rosu, Bhuwan Dhingra (2026).
- [Beyond Semantic Organization: Memory as Execution State Management for Long-Horizon Agents](https://arxiv.org/abs/2606.06090) — Yaoqi Chen et al. (2026).
- [Context Pruning for Coding Agents via Multi-Rubric Latent Reasoning](https://arxiv.org/abs/2605.15315) — Jingjing Wang et al. (2026).
- [ClawVM: Harness-Managed Virtual Memory for Stateful Tool-Using LLM Agents](https://arxiv.org/abs/2604.10352) — Mofasshara Rafique, Laurent Bindschaedler (2026)..
- [GAAMA: Graph Augmented Associative Memory for Agents](https://arxiv.org/abs/2603.27910) — Swarna Kamal Paul, Shubhendu Sharma, Nitin Sareen (2026).
- [MemArchitect: A Policy Driven Memory Governance Layer](https://arxiv.org/abs/2603.18330) — Lingavasan Suresh Kumar, Yang Ba, Rong Pan (2026).
- [Facts as First Class Objects: Knowledge Objects for Persistent LLM Memory](https://arxiv.org/abs/2603.17781) — Oliver Zahn, Simran Chana (2026).
- [Graph-Native Cognitive Memory for AI Agents: Formal Belief Revision Semantics for Versioned Memory Architectures](https://arxiv.org/abs/2603.17244) — Young Bin Park (2026).
- [Codified Context: Infrastructure for AI Agents in a Complex Codebase](https://arxiv.org/abs/2602.20478) — Aristidis Vasilopoulos (2026).
- [Active Context Compression: Autonomous Memory Management in LLM Agents](https://arxiv.org/abs/2601.07190) — Nikhil Verma (2026).
- [MAGMA: A Multi-Graph based Agentic Memory Architecture for AI Agents](https://arxiv.org/abs/2601.03236) — Dongming Jiang, Yi Li, Guanpeng Li, Bingzhe Li (2026).
- [Beyond Static Summarization: Proactive Memory Extraction for LLM Agents](https://arxiv.org/abs/2601.04463) — Chengyuan Yang, Zequn Sun, Wei Wei, Wei Hu (2026).

<br>

### Agentic Memory & Long-Horizon Learning

<br>

- [QSAF: A Novel Mitigation Framework for Cognitive Degradation in Agentic AI](https://arxiv.org/abs/2507.15330) — Hammad Atta et al. (2025).
- [LLMs Get Lost In Multi-Turn Conversation](https://arxiv.org/abs/2505.06120) — Philippe Laban, Hiroaki Hayashi, Yingbo Zhou, Jennifer Neville (2025).
- [It's All Connected: A Journey Through Test-Time Memorization, Attentional Bias, Retention, and Online Optimization](https://arxiv.org/abs/2504.13173) — Ali Behrouz, Meisam Razaviyayn, Peilin Zhong, Vahab Mirrokni (2025).
- [Towards Economical Inference: Enabling DeepSeek's Multi-Head Latent Attention in Any Transformer-based LLMs](https://arxiv.org/abs/2502.14837) — Tao Ji et al. (2025).
- [MemEvolve: Meta-Evolution of Agent Memory Systems](https://arxiv.org/pdf/2512.18746) — OPPO AI Team (2025)

<br>

### Foundational Research 

<br>

- [Cognitive Architectures for Language Agents](https://arxiv.org/abs/2309.02427) — Theodore R. Sumers, Shunyu Yao, Karthik Narasimhan, Thomas L. Griffiths (2023).
- [Lost in the Middle: How Language Models Use Long Contexts](https://arxiv.org/abs/2307.03172) — Nelson F. Liu, Kevin Lin, John Hewitt, Ashwin Paranjape, Michele Bevilacqua, Fabio Petroni, Percy Liang (2023).
- [Generative Agents: Interactive Simulacra of Human Behavior](https://arxiv.org/abs/2304.03442) — Joon Sung Park, Joseph C. O'Brien, Carrie J. Cai, Meredith Ringel Morris, Percy Liang, Michael S. Bernstein (2023).
- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401) — Patrick Lewis, Ethan Perez, Aleksandra Piktus, Fabio Petroni, Vladimir Karpukhin, Naman Goyal, Heinrich Küttler, Mike Lewis, Wen-tau Yih, Tim Rocktäschel, Sebastian Riedel, Douwe Kiela (2020).

<br>
<br>

---

# 🪄4️⃣ Notable Open-Source Projects on Agentic Memory

<br>

#### ✨ For completeness, I've compiled a list of other popular open-source projects focused on agentic memory, organized by programming language for easy reference. I'll continue to expand the list as I discover additional relevant resources. ✨

<br>
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

* ⚙️ [nebula (C++)](https://github.com/vesoft-inc/nebula): A distributed, fast, open-source graph database featuring horizontal scalability and high availability.

<br>
<br>

---

<br>

### That's it for today. I hope you had as much fun reading as I had conducting this research. Thank you for reading, and until next time, my friends!

### ⬛️


