---
title: 📚 BOOK → Generative AI with LangChain (Auffarth, 2023)
subtitle: Rating: 8/10 | Audience: Beginner to Intermediate AI Engineers
date: 2026-07-23
---

A good end-to-end overview of the subject.

##### 💜🤖 Below are my highlights (with some attempt, although very moderate, at coherence). If they look interesting to you, it's your *moral duty* to read the original book.

<br>

---

## What Is Generative AI?

<br>

> *Generative Models are a type of ML model that can generate new data based on patterns learned from input data.*

<br>

* There are many types of generative models, handling different data modalities across various domains. They are:
1. Text-to-text: Models that generate text from input text, like conversational agents. Examples: LLaMa 2, GPT-4, Claude, and PaLM 2.
2. Text-to-image: Models that generate images from text captions. Examples: DALL-E 2, Stable Diffusion, and Imagen.
3. Text-to-audio: Models that generate audio clips and music from text. Examples: Jukebox, AudioLM, and MusicGen.
4. Text-to-video: Models that generate video content from text descriptions. Example: Phenaki and Emu Video.
5. Text-to-speech: Models that synthesize speech audio from input text. Examples: WaveNet and Tacotron.
6. Speech-to-text: Models that transcribe speech to text [also called Automatic Speech Recognition (ASR)]. Examples: Whisper and SpeechGPT.
7. Image-to-text: Models that generate image captions from images. Examples: CLIP and DALL-E 3.
8. Image-to-image: Applications for this type of model are data augmentation such as super-resolution, style transfer, and in painting.
9. Text-to-code: Models that generate programming code from text. Examples: Stable Diffusion and DALL-E 3.
10. Video-to-audio: Models that analyze video and generate matching audio. Example: Soundify.

<br>

*  The backpropagation algorithm introduced in the 1980s by Geoffrey Hinton, David Rumelhart, and Ronald Williams is one such example. It provided a way to effectively train multi-layer neural networks.

* In the 2000s, neural networks began to regain popularity as researchers developed more complex architectures. However, it was the advent of DL, a type of neural network with numerous layers, that marked a significant turning point in the performance and capabilities of these models. Interestingly, although the concept of DL has existed for some time, the development and expansion of generative models correlate with significant advances in hardware, particularly Graphics Processing Units (GPUs), which have been instrumental in propelling the field forward.

* This trend toward larger models started around 2009, when NVIDIA catalyzed what is often called the Big Bang of DL. GPUs are particularly well suited for the matrix/vector computations necessary to train deep learning neural networks, therefore significantly increasing the speed and efficiency of these systems by several orders of magnitude and reducing running times from weeks to days. In particular, NVIDIA’s CUDA platform, which allows direct programming of GPUs, has made it easier than ever for researchers and developers to experiment with and deploy complex generative models facilitating breakthroughs in vision, speech recognition, and – more recently – LLMs. Many LLM papers describe the use of NVIDIA A100s for training.

* In the 2010s, several types of generative models started gaining traction. Autoencoders, a kind of neural network that can learn to compress data from the input layer to a representation, and then reconstruct the input, served as a basis for more advanced models like Variational Autoencoders (VAEs), which were first proposed in 2013. VAEs, unlike traditional autoencoders, use variational inference to learn the distribution of data, also called the latent space of input data. Around the same time, GANs were proposed by Ian Goodfellow and others in 2014.

* A transformer is a DL architecture, first introduced in 2017 by researchers at Google and the University of Toronto (in an article called Attention Is All You Need; Vaswani and colleagues), that comprises self-attention and feed-forward neural networks, allowing it to effectively capture the word relationships in a sentence. The attention mechanism enables the model to focus on various parts of the input sequence.

* Generative Pre-Trained Transformers (GPTs), on the other hand, were introduced by researchers at OpenAI in 2018 together with the first of their eponymous GPT models, GPT-1 (Improving Language Understanding by Generative Pre-Training; Radford and others). The pre-training process involves predicting the next word in a text sequence, enhancing the model’s grasp of language as measured in the quality of the output. Following pre-training, the model can be fine-tuned for specific language processing tasks like sentiment analysis, language translation, or chat. This combination of unsupervised and supervised learning enables GPT models to perform better across a range of NLP tasks and reduces the challenges associated with training LLMs.

* Apparently, GPT-4 was trained on about 13 trillion tokens. However, these are not unique tokens since they count repeated presentation of the data in each epoch. Training was conducted for 2 epochs for text-based data and 4 for code-based data. For fine-tuning, the dataset consisted of millions of rows of instruction fine-tuning data.

* The releases of the LLaMa and LLaMa 2 series of models, with up to 70B parameters, by Meta AI in February and July 2023, respectively, have been highly influential by enabling the community to build on top of them, thereby kicking off a Cambrian explosion of open-source LLMs.

* Claude and Claude 2 are AI assistants created by Anthropic. Evaluations suggest Claude 2, released in July 2023, is one of the best GPT-4 competitors in the market. It improves on previous versions in helpfulness, honesty, and lack of stereotype bias based on human feedback comparisons

* The transformer model architecture has an encoder-decoder structure, where the encoder maps an input sequence to a sequence of hidden states, and the decoder maps the hidden states to an output sequence. The hidden state representations consider not only the inherent meaning of the words (their semantic value) but also their context in the sequence.

* The encoder is made up of identical layers, each with two sub-layers. The input embedding is passed through an attention mechanism, and the second sub-layer is a fully connected feed-forward network. Each sub-layer is followed by a residual connection and layer normalization. The output of each sub-layer is the sum of the input and the output of the sub-layer, which is then normalized.

* The decoder uses this encoded information to generate the output sequence one item at a time, using the context of the previously generated items. It also has identical modules, with the same two sub-layers as the encoder.

* In addition, the decoder has a third sub-layer that performs Multi-Head Attention (MHA) over the output of the encoder stack. The decoder also uses residual connections and layer normalization.

* The architectural features that have contributed to the success of transformers are: Positional encoding, Layer normalization, Multi-head attention.

* The basic idea behind attention mechanisms is to compute a weighted sum of the values (usually referred to as values or content vectors) associated with each position in the input sequence, based on the similarity between the current position and all other positions. This weighted sum, known as the context vector, is then used as an input to the subsequent layers of the model, enabling the model to selectively attend to relevant parts of the input during the decoding process.

* To enhance the expressiveness of the attention mechanism, it is often extended to include multiple so-called heads, where each head has its own set of query, key, and value vectors, allowing the model to capture various aspects of the input representation. The individual context vectors from each head are then concatenated or combined in some way to form the final output.

* LLaMa 2 and a few other models used Grouped-Query Attention (GQA), which is a practice used in autoregressive decoding to cache the key (K) and value (V) pairs for the previous tokens in the sequence, speeding up attention computation. However, as the context window or batch sizes increase, the memory costs associated with the KV cache size in MHA models also increase significantly. To address this, the key and value projections can be shared across multiple heads without much degradation of performance.

* Negative Log-Likelihood (NLL) and Perplexity (PPL) are important metrics used in training and evaluating language models. NLL is a loss function used in ML algorithms, aimed at maximizing the probability of correct predictions. A lower NLL indicates that the network has successfully learned patterns from the training set, so it will accurately predict the labels of the training samples. PPL, on the other hand, is an exponentiation of NLL, providing a more intuitive way to understand the model’s performance. Smaller PPL values indicate a well-trained network that can predict accurately while higher values indicate poor learning performance. Intuitively, we could say that a low perplexity means that the model is less surprised by the next word.

<br>

#### Scaling Laws

* Kaplan and others (Scaling laws for neural language models, 2020) discussed scaling laws and the choice of parameters: they found a power-law relationship between performance and each of the following factors: dataset size, model size (number of parameters), and the amount of computational resources required for training.

* Researchers at DeepMind (An empirical analysis of compute-optimal large language model training; Hoffmann and others, 2022) analyzed the training compute and dataset size of LLMs and concluded that LLMs are undertrained in terms of compute budget and dataset size as suggested by scaling laws. They predicted that large models would perform better if substantially smaller and trained for much longer, and – in fact – validated their prediction by comparing a 70-billion-parameter Chinchilla model on a benchmark to their Gopher model, which consists of 280 billion parameters.

* However, more recently, a team at Microsoft Research has challenged these conclusions and surprised everyone (Textbooks Are All You Need; Gunaseka and colleagues, June 2023), finding that a small network (350M parameters) trained on high-quality datasets can give very competitive performance. 

<br>

----

## Other Definitions

<br>

> *Simply scaling up compute and data does not impart reasoning capabilities or common sense.*

<br>

### Gen LLM TL;DR

* Stochastic parrots refers to LLMs that can produce convincing language but lack any true comprehension of the meaning behind words. Coined by researchers Emily Bender, Timnit Gebru, Margaret Mitchell, and Angelina McMillan-Major in their influential paper On the Dangers of Stochastic Parrots (2021), the term critiques models that mindlessly mimic linguistic patterns.

<br>

* What are the limitations of LLMs?
1. Outdated knowledge
2. Inability to take action
3. Hallucination risks
4. Biases and discrimination
5. Lack of transparency
6. Lack of context

<br>

* How can we mitigate LLM limitations?
1. Retrieval augmentation
2. Chaining
3. Prompt engineering
4. Monitoring, filtering, and reviews
5. Memory
6. Fine-tuning

<br>

#### RAG

* Retrieval augmented generation (RAG) enhances the LLM with external knowledge:
1. Function calling allows parameterized API requests.
2. SQL functions enable conversational database queries.
3. Reasoning algorithms like chain-of-thought facilitate multi-step logic.

<br>

#### LangChain

* Created in 2022 by Harrison Chase, LangChain is an open-source Python framework for building LLM-powered applications. LangSmith is a platform that complements LangChain by providing robust debugging, testing, and monitoring capabilities for LLM applications. LlamaHub and LangChainHub provide open libraries of reusable elements to build sophisticated LLM systems in a simplified manner. 

* Prompt chaining is a technique that can be used to improve the performance of LangChain applications, which involves chaining together multiple prompts to autocomplete a more complex response.

* A few chains can make autonomous decisions. Like agents, router chains can decide which tool to use based on their descriptions.

* Typically, developing a LangChain chain involves breaking down a workflow into logical steps, like data loading, processing, model querying, and so on. Well-designed chains embrace single-responsibility components being pipelined together. Steps should be stateless functions to maximize reusability.

<br>

#### Agent

* An agent is an autonomous software entity that is capable of taking actions to accomplish goals and tasks. Agents combine and orchestrate chains. The agent observes the environment, decides which chain to execute based on that observation, takes the chain’s specified action, and repeats.

<br>

#### Memory

* A key limitation of agents and chains is their statelessness – each execution occurs in isolation without retaining prior context. This is where the concept of memory becomes critical. Memory in LangChain refers to persisting information across chain executions to enable statefulness.

* In LangChain, memory refers to the persisting state between executions of a chain or agent. Robust memory approaches unlock key benefits for developers building conversational and interactive applications.

* Several memory options exist:
1. ConversationBufferMemory stores all messages in model history. This increases latency and costs.
2. ConversationBufferWindowMemory retains only recent messages.
3. ConversationKGMemory summarizes exchanges as a knowledge graph for integration into prompts. 
4. EntityMemory backed by a database persists agent state and facts.

<br>

Moreover, LangChain integrates many database options for durable storage:
1. SQL options like Postgres and SQLite enable relational data modeling.
2. NoSQL choices like MongoDB and Cassandra facilitate scalable unstructured data.
3. Redis provides an in-memory database for high-performance caching.
4. Managed cloud services like AWS DynamoDB remove infrastructure burdens.

<br>

* LangChain’s memory integrations, from short-term caching to long-term databases, enable the building of stateful, context-aware agents.

* There are numerous integrations for vector storage. These include Alibaba Cloud OpenSearch, AnalyticDB for PostgreSQL, Meta AI’s Annoy library for Approximate Nearest Neighbor (ANN) search, Cassandra, Chroma, Elasticsearch, Facebook AI Similarity Search (Faiss), MongoDB Atlas Vector Search, PGVector as a vector similarity search for Postgres, Pinecone, scikit-learn (SKLearnVectorStore for k-nearest neighbor search).

<br>

----

## Building Capable Assistants

<br>

#### Mitigating hallucinations through fact-checking

* One technique to address hallucinations is automatic fact-checking – verifying claims made by LLMs against evidence from external sources. This allows for catching incorrect or unverified statements.

* Fact-checking involves three main stages:
1. Claim detection: Identify parts needing verification
2. Evidence retrieval: Find sources supporting or refuting the claim
3. Verdict prediction: Assess claim veracity based on evidence

<br>

#### Summarization

* Researchers at Salesforce (Adams and colleagues, 2023; From Sparse to Dense: GPT-4 Summarization with Chain of Density Prompting) have developed a prompt-guided technique called Chain of Density (CoD) to incrementally increase the information density of GPT-4 generated summaries while controlling length.

<br>

#### Map-Reduce pipelines

* To summarize long documents, we can first split the document into smaller parts (chunks) that are suitable for the token context length of the LLM, and then a map-reduce chain can summarize these chunks independently before recombining. This scales summarization to any length of text while controlling chunk size.

<br>

#### Exploring reasoning strategies

* LLMs excel at pattern recognition in data but struggle with the symbolic reasoning required for complex multi-step problems. While tool-augmented language models combine LLMs with external resources like search engines and databases to enhance reasoning capabilities, this can be further enhanced with agents. In LangChain, this consists of three parts: Tools, An LLMChain, The agent itself. There are two key agent architectures: 1) Action agents reason iteratively based on observations after each action.; 2) Plan-and-execute agents plan completely upfront before taking any action.

* In observation-dependent reasoning, the agent iteratively provides context and examples to an LLM to generate thoughts and actions. Observations from tools are incorporated to inform the next reasoning step. This approach is used in action agents.

* An alternative is plan-and-execute agents that first create a complete plan and then gather evidence to execute it. The Planner LLM produces a list of plans (P). The agent gathers evidence (E) using tools. P and E are combined and fed to the Solver LLM to generate the final output.

* Observation-dependent reasoning involves making judgments, predictions, or choices based on the current state of knowledge or the evidence fetched through observation. In each iteration, the agent provides context and examples to the LLM.

<br>

---

## Building a Chatbot like ChatGPT

<br>

* Retrieval-augmented generation (RAG) is a technique that enhances text generation by retrieving and incorporating external knowledge. This grounds the output in factual information rather than relying solely on the knowledge that is encoded in the language model’s parameters.
* Retrieval-Augmented Language Models (RALMs) specifically refer to retrieval-augmented language models that integrate retrieval into the training and inference process.
* Traditional language models generate text autoregressively based only on the prompt. RALMs augment this by first retrieving relevant context from external corpora using semantic search algorithms. Semantic search typically involves indexing documents into vector embeddings, allowing fast similarity lookups via approximate nearest neighbor search.
* An embedding is a numerical representation of content in a way that machines can process and understand. The essence of the process is to convert an object such as an image or some text into a vector that encapsulates its semantic content while discarding irrelevant details as much as possible. An embedding takes a piece of content, such as a word, sentence, or image, and maps it into a multi-dimensional vector space.
* Embeddings can be created using different methods. For texts, one simple method is the bag-of-words approach, where each word is represented by a count of how many times it appears in a text. This approach, which in the scikit-learn library is implemented as CountVectorizer, was popular until word2vec came about. Word2vec, which – roughly speaking – learns embeddings by predicting the words in a sentence based on other surrounding words ignoring the word order in a linear model.
* In vector search, every data object in a dataset is assigned a vector embedding. These embeddings are arrays of numbers that can be used as coordinates in a high-dimensional space. The distance between vectors can be computed using distance metrics like cosine similarity or Euclidean distance. To perform a vector search, the query vector (representing the search query) is compared to every vector in the collection. The distance between the query vector and each vector in the collection is calculated, and objects with smaller distances are considered more similar. To perform vector search efficiently, vector storage mechanisms are used such as vector databases.
* Indexing organizes vectors to optimize retrieval, structuring them so that vectors can be retrieved quickly. There are different algorithms like k-d trees or Annoy for this.
* Vector databases like Milvus or Pinecone are designed to store, manage, and retrieve large sets of vectors. They use indexing mechanisms to facilitate efficient similarity searches on these vectors.
* For vector embeddings, indexing aims to structure the vectors – roughly speaking – so that similar vectors are stored next to each other, enabling fast proximity or similarity searches. A typical algorithm applied in this context is k-dimensional trees (k-d trees), but many others, like ball trees, Annoy, and Faiss, are often implemented, especially for high-dimensional vectors, which traditional methods can struggle with.

<br>

#### Algorithms For Similarity Search Indexing

* Product quantization (PQ): PQ is a technique that divides the vector space into smaller subspaces and quantizes each subspace separately. This reduces the dimensionality of the vectors and allows for efficient storage and search. PQ is known for its fast search speed but may sacrifice some accuracy.
* Locality sensitive hashing (LSH): This is a hashing-based method that maps similar data points to the same hash buckets. It is efficient for high-dimensional data but may have a higher probability of false positives and false negatives. The Annoy (Approximate Nearest Neighbors Oh Yeah) algorithm is a popular LSH algorithm that uses random projection trees to index vectors. It constructs a binary tree structure where each node represents a random hyperplane. Annoy is simple to use and provides fast approximate nearest neighbor search.
* Hierarchical navigable small world (HNSW): HNSW is a graph-based indexing algorithm that constructs a hierarchical graph structure to organize the vectors. It uses a combination of randomization and greedy search to build a navigable network, allowing for efficient nearest-neighbor search. HNSW is known for its high search accuracy and scalability.
* Apart from HNSW and KNN, there are other graph-based methods, like Graph Neural Networks (GNNs) and Graph Convolutional Networks (GCNs), that leverage graph structures for similarity search.

<br>

#### Retrievers

* BM25 retriever: This retriever uses the BM25 algorithm to rank documents based on their relevance to a given query. It is a popular information retrieval algorithm that considers term frequency and document length.
* TF-IDF retriever: This retriever uses the TF-IDF (Term Frequency-Inverse Document Frequency) algorithm to rank documents based on the importance of terms in the document collection. It assigns higher weights to terms that are rare in the collection but occur frequently in a specific document.
* Dense retriever: This retriever uses dense embeddings to retrieve documents. It encodes documents and queries into dense vectors, and calculates the similarity between them using cosine similarity or other distance metrics.
* kNN retriever: This utilizes the well-known k-nearest neighbors algorithm to retrieve relevant documents based on their similarity to a given query.

<br>

#### Knowledge Graphs

* Extract information from the conversation as facts and store these by integrating a knowledge graph as the memory. This can enhance the capabilities of language models and enable them to leverage structured knowledge during text generation and inference.
* A knowledge graph is a structured knowledge representation model that organizes information in the form of entities, attributes, and relationships. It represents knowledge as a graph, where entities are represented as nodes and relationships between entities are represented as edges. In a knowledge graph, entities can be any concept, object, or thing in the world, and attributes describe the properties or characteristics of these entities. Relationships capture the connections and associations between entities, providing contextual information and enabling semantic reasoning.

<br>

#### Long-term persistence

* Zep provides a persistent backend to store, summarize, and search chat histories using vector embeddings and auto-token counting. This long-term memory with fast vector search and configurable summarization enables more capable conversational AI with context awareness.

* Guardrails can be used to define the behavior of the language model on specific topics, prevent it from engaging in discussions on unwanted topics, guide the conversation along a predefined path, enforce a particular language style, extract structured data, and more:
1. Controlling topics
2. Predefined dialogue paths
3. Language style
4. Structured data extraction

<br>

----

## LLMs for Data Science

<br>

* Benefits of generative AI in data science:
1. Interpreting research data
2. Performing literature reviews and identifying research gap.
3. Automatically generating synthetic data.
4. Identifying patterns in data.
5. Creating new features from existing data.

<br>

* ETL (extract, transform, and load) as the process that not only takes data from one or more sources (data collection) but also prepares it for specific use cases. There are many ETL tools, including commercial ones such as AWS Glue, Google Dataflow, Amazon Simple Workflow Service (SWF), dbt, Fivetran, Microsoft SSIS, IBM InfoSphere DataStage, Talend Open Studio, or open-source tools such as Airflow, Kafka, and Spark. In Python, there are many more tools (too many to list them all), such as pandas for data extraction and processing, and even celery and joblib, which can serve as ETL orchestration tools.

<br>

----

## Customizing LLMs and Their Output

<br>

* Conditioning LLMs refers to a collection of methods used to direct the model’s generation of outputs. This includes not only prompt crafting but also more systemic techniques, such as fine-tuning the model on specific datasets to adapt its responses to certain topics or styles persistently.

* Alignment refers to the process and goal of training and modifying LLMs so that their general behavior, decision-making processes, and outputs conform to broader human values, ethical principles, and safety considerations.

* In 2022 paper, Ouyang and others from OpenAI demonstrated using RLHF with Proximal Policy Optimization (PPO) to align LLMs, like GPT-3, with human preferences. RLHF is an online approach that fine-tunes LMs using human preferences. It has three main steps:
1. Supervised pre-training
2. Reward model training
3. RL fine-tuning

<br>

* Strategies like adapters and Low-Rank Adaptation (LoRA), which introduce elements of sparsity or implement partial freezing of parameters to lighten the burden.

* Parameter-Efficient Fine-Tuning (PEFT) methods enable the use of small checkpoints for each task, making the models more portable. This small set of trained weights can be added on top of the LLM, allowing the same model to be used for multiple tasks without replacing the entire model.

* Low-Rank Adaptation (LoRA) is a type of PEFT, where the pre-trained model weights are frozen. It introduces trainable rank decomposition matrices into each layer of the Transformer architecture to reduce the number of trainable parameters. LoRA achieves comparable model quality compared to fine-tuning while having fewer trainable parameters and higher training throughput.

* The QLORA method is an extension of LoRA, which enables efficient fine-tuning of large models by backpropagating gradients through a frozen 4-bit quantized model into learnable low-rank adapters. This allows you to fine-tune a 65B parameter model on a single GPU. QLORA models achieve 99% of ChatGPT performance on Vicuna, using innovations like new data types and optimizers.

* Some common techniques for inference-time conditioning include:
1. Prompt tuning: Providing natural language guidance for intended behavior. Sensitive to prompt design.
2. Prefix tuning: Prepending trainable vectors to LLM layers.
3. Constraining tokens: Forcing inclusion/exclusion of certain words
4. Metadata: Providing high-level info like genre, target audience, and so on

<br>

* Zero-shot prompting involves no solved examples, while few-shot prompting includes a small number of examples of similar (problem and solution) pairs.

* Weights and Biases (W&B) is an MLOps platform that can help developers monitor and document ML training workflows from end to end. 

* Prompts consist of three main components:
1. Instructions that describe the task requirements, goals, and format of input/output. They explain the task to the model unambiguously.
2. Examples that demonstrate the desired input-output pairs. They provide diverse demonstrations of how different inputs should map to outputs.
3. Input that the model must act on to generate the output.

<br>


* In Tree-of-Thought (ToT) prompting, we generate multiple problem-solving steps or approaches for a given prompt and then use the AI model to critique them. The critique will be based on the model’s judgment of the solution’s suitability to the problem:
1. Train or fine-tune language models using datasets that are relevant to the reasoning task at hand.
2. Develop or adapt reasoning algorithms and techniques to improve the performance of language models in specific reasoning tasks.
3. Evaluate existing language models and identify their strengths and weaknesses in reasoning.
4. Implement evaluation metrics to measure the reasoning performance of the language models.
5. Iteratively refine and optimize the reasoning capabilities of the language models based on evaluation results.

<br>

---

## Generative AI in Production

<br>

* Practices to ensure deployment readiness involve:
1. Data management: Rigorous attention to data quality is critical to avoid biases that can emanate from imbalanced or inappropriate training data. Substantial efforts in data cuation and ongoing scrutiny of model outputs are required to mitigate emerging biases.
2. Ethical deployment and compliance: LLM applications are potentially capable of generating harmful content, thus necessitating strict review processes, safety guidelines, and compliance with regulations such as HIPAA, especially in sensitive sectors such as healthcare.
3. Resource management: The resource demands of LLMs call for an infrastructure that is both efficient and environmentally sustainable. Innovation in infrastructure helps to reduce costs and address environmental concerns tied to the energy demands of LLMs.
4. Performance management: Models must be continually monitored for data drift—where changes in input data patterns can alter model performance—and performance degradation over time. Detecting these deviations necessitates prompt retraining or model adjustments.
5. Interpretability: To build trust and offer insight into the decision-making processes of LLMs, interpretability tools are increasingly important for users who need clarity on how model decisions are reached.
6. Data security: Protecting sensitive information within LLM processes is essential for privacy and compliance. Strong encryption measures and stringent access controls bolster security measures.
7. Model behavior standards: Models must align with ethical guidelines beyond basic functional performance—ensuring outputs are constructive (helpful), innocuous (harmless), and trustworthy (honest). This results in stability and societal acceptance. 
8. Hallucination mitigation: Hallucinations refer to instances where LLMs inadvertently generate or recall sensitive personal information from their training data corpus in the outputs, despite no prompting for such details in the input source—highlighting critical privacy concerns and the need for mitigation strategies.

<br>

* MLOps is a paradigm that focuses on deploying and maintaining machine learning models in production reliably and efficiently. It combines the practices of DevOps with machine learning to transition algorithms from experimental systems to production systems. MLOps aims to increase automation, improve the quality of production models, and address business and regulatory requirements.

* The evaluation process involves several steps:

1. Create the evaluator: Load the evaluator using the load_evaluator() function, specifying the type of evaluator (in this case, pairwise_string).
2. Select the dataset: Load a dataset of inputs using the load_dataset() function.
3. Define models to compare: Initialize the LLMs, chains, or agents to compare using the necessary configurations. This involves initializing the language model and any additional tools or agents required.
4. Generate responses: Generate outputs for each of the models before evaluating them. This is typically done in batches to improve efficiency.
5. Evaluate pairs: Evaluate the results by comparing the outputs of different models for each input. This is often done using a random selection order to reduce positional bias.

<br>

* Tracking, tracing, and monitoring are three important concepts in the field of software operation and management. While all related to understanding and improving a system’s performance, they each have distinct roles. While tracking and tracing are about keeping detailed historical records for analysis and debugging, monitoring is aimed at real-time observation and immediate awareness of issues to ensure optimal system functionality at all times. All three of these concepts fall within the category of observability.
1. Preventing model drift
2. Performance optimization
3. A/B testing
4. Debugging issues
5. Avoiding hallucinations
6. Ensuring appropriate behavior

<br>

* Metrics to capture:
1. Inference latency
2. Query per Second (QPS)
3. Token per Second (TPS)
4. Token usage
5. Error rate
6. Resource utilization
7. Model drift
8. Out-of-distribution inputs
9. User feedback metrics
10. User engagement
11. Tool/retrieval usage

<br>

* Tracing is a more specialized form of tracking. It involves recording the execution flow through software/systems. Particularly in distributed systems where a single transaction might span multiple services, tracing helps in maintaining an audit or breadcrumb trail, a detailed source of information about that request path through the system. Tracking the trajectory of agents can be challenging due to their broad range of actions and generative capabilities.

<br>

### ⬛️