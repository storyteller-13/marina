---
title: 📚 BOOK → Hands-On LLM (Alammar & Grootendorst, 2024)
subtitle: Rating: 8/10 | Audience: Beginner to Intermediate AI Engineers
date: 2026; 07; 27
---

A good end-to-end overview of the subject.

##### 💜🤖 Below are my highlights (with some attempt, although very moderate, at coherence). If they look interesting to you, it's your *moral duty* to read the original book.

<br>

---

## Chapter 1. An Introduction to Large Language Models

<br>

* Released in 2013, word2vec was one of the first successful attempts at capturing the meaning of text in embeddings. Embeddings are vector representations of data that attempt to capture its meaning. To generate these semantic representations, word2vec leverages neural networks. 

* A step in encoding this text was achieved through recurrent neural networks (RNNs). These are variants of neural networks that can model sequences as an additional input.

* In 2014, a solution called attention was introduced that highly improved upon the original architecture.4 Attention allows a model to focus on parts of the input sequence that are relevant to one another (“attend” to each other) and amplify their signal.

* “Attention is all you need” paper released in 2017: The authors proposed a network architecture called the Transformer, which was solely based on the attention mechanism and removed the recurrence network.

* Compared to previous methods of attention, self-attention can attend to different positions within a single sequence, thereby more easily and accurately representing the input sequence.

* The Transformer architecture is the foundation of many impactful models in Language AI, such as BERT (encoder only) and GPT-1 (decoder only).

* BERT: encoder blocks are the same as we saw before: self-attention followed by feedforward neural networks. The input contains an additional token, the [CLS] or classification token, which is used as the representation for the entire input. Often, we use this [CLS] token as the input embedding for fine-tuning the model on specific tasks, like classification.

* we refer to encoder-only models as representation models to differentiate them from decoder-only, which we refer to as generative models. Representation models mainly focus on representing language, for instance, by creating embeddings, and typically do not generate text. In contrast, generative models focus primarily on generating text and typically are not trained to generate embeddings.

* A vital part of these completion models is something called the context length or context window. The context length represents the maximum number of tokens the model can process.

* There is no single rule to determine exactly how much VRAM you need for a specific model. It depends on the model’s architecture and size, compression technique, context size, backend for running the model, etc.

<br>

```
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline

# Load model and tokenizer
model = AutoModelForCausalLM.from_pretrained("microsoft/Phi-3-mini-4k-instruct", device_map="cuda”, torch_dtype="auto", trust_remote_code=True,)

tokenizer = AutoTokenizer.from_pretrained("microsoft/Phi-3-mini-4k-instruct")

# Create a pipeline
generator = pipeline("text-generation", model=model, tokenizer=tokenizer, return_full_text=False, max_new_tokens=500, do_sample=False)

# The prompt (user input / query)
messages = [{"role": "user", "content": "Create a funny joke about chickens."}]

# Generate output
output = generator(messages)
print(output[0]["generated_text"])
```

<br>

----

## Chapter 2. Tokens and Embeddings

<br>

> *Language is a sequence of tokens.*

<br>

* There are three major factors that dictate how a tokenizer breaks down an input prompt:

* First, at model design time, the creator of the model chooses a tokenization method. Popular methods include byte pair encoding (BPE) (widely used by GPT models) and WordPiece (used by BERT).

* Second, after choosing the method, we need to make a number of tokenizer design choices like vocabulary size and what special tokens to use.

* Third, the tokenizer needs to be trained on a specific dataset to establish the best vocabulary it can use to represent that dataset.

<br>

```
from transformers import AutoModel, AutoTokenizer

# Load a tokenizer
tokenizer = AutoTokenizer.from_pretrained("microsoft/deberta-base")

# Load a language model
model = AutoModel.from_pretrained("microsoft/deberta-v3-xsmall")

# Tokenize the sentence
tokens = tokenizer('Hello world', return_tensors='pt')

# Process the tokens
output = model(**tokens)[0]
output.shape
```

<br>


* While token embeddings are key to how LLMs operate, a number of LLM applications require operating on entire sentences, paragraphs, or even text documents (powering everything from categorization to semantic search to RAG). This has led to special language models that produce text embeddings—a single vector that represents a piece of text longer than just one token.

* There are multiple ways of producing a text embedding vector. One of the most common ways is to average the values of all the token embeddings produced by the model.

<br>

```
from sentence_transformers import SentenceTransformer

# Load model
model = SentenceTransformer("sentence-transformers/all-mpnet-base-v2")

# Convert text to text embeddings
vector = model.encode("Best movie ever!")
```

<br>

* Imagine if we treated each song as we would a word or token, and we treated each playlist like a sentence. These bembeddings can then be used to recommend similar songs that often appear together in playlists.

<br>

----

## Chapter 3. Looking Inside Large Language Models

<br>

> *Attention is a mechanism that helps the model incorporate context as it’s processing a specific token. It’s made up of two major steps: relevance scoring for each position, then a step where we combine the information based on those scores.*

<br>

* Each token generation step is one forward pass through the model (that’s machine-learning speak for the inputs going into the neural network and flowing through the computations it needs to produce an output on the other end of the computation graph).

* After each token generation, we tweak the input prompt for the next generation step by appending the output token to the end of the input prompt.

* Autoregressive models: models that consume their earlier predictions to make later predictions (e.g., the model’s first generated token is used to generate the second token). BERT are not autoregressive.

* The tokenizer is followed by the neural network (a stack of Transformer blocks that do all of the processing) -> That stack is then followed by the LM head, which translates the output of the stack into probability scores for what the most likely next token is. 

* Decoding strategy: At the end of the forward pass, the model predicts a probability score for each token in the vocabulary.

* The LM head is a simple neural network layer itself. It is one of multiple possible “heads” to attach to a stack of Transformer blocks to build different kinds of systems. Other kinds of Transformer heads include sequence classification heads and token classification heads.

* Each Transformer blocks includes an attention layer and a feedforward neural network (also known as an mlp or multilevel perceptron).

* The easiest decoding strategy would be to always pick the token with the highest probability score (greedy decoding, when you set the temperature parameter to zero). In practice, this doesn’t tend to lead to the best outputs for most use cases. A better approach is to add some randomness and sometimes choose the second or third highest probability token. -> sample from the probability distribution based on the probability score.

<br>

```
prompt = "The capital of France is"

# Tokenize the input prompt
input_ids = tokenizer(prompt, return_tensors="pt").input_ids
input_ids = input_ids.to("cuda")

# Get the output of the model before the lm_head
model_output = model.model(input_ids)

# Get the output of the lm_head
lm_head_output = model.lm_head(model_output[0])
```

<br>

* For text generation, only the output result of the last stream is used to predict the next token. That output vector is the only input into the LM head as it calculates the probabilities of the next token.

* When generating the second token, we simply append the output token to the input and do another forward pass through the model. If we give the model the ability to cache the results of the previous calculation (especially some of the specific vectors in the attention mechanism), we no longer need to repeat the calculations of the previous streams. This time the only needed calculation is for the last stream. This is an optimization technique called the keys and values (kv) cache.

* A Transformer block (Figure 3-12) is made up of two successive components: 1. The attention layer is mainly concerned with incorporating relevant information from other input tokens and positions, 2. The feedforward layer houses the majority of the model’s processing capacity. 

* To give the Transformer more extensive attention capability, the attention mechanism is duplicated and executed multiple times in parallel. Each of these parallel applications of attention is conducted into an attention head.


<br>

#### How attention is calculated

1. The attention layer (of a generative LLM) is processing attention for a single position.
2. The goal is to produce a new representation of the current position that incorporates relevant information from the previous tokens.
3. The training process produces three projection matrices that produce the components that interact in this calculation: a query projection matrix, a key projection matrix, and a value projection matrix.

<br>

* The relevance scoring step of attention is conducted by multiplying the query vector of the current position with the keys matrix. -> This produces a score stating how relevant each previous token is. Passing that by a softmax operation normalizes these scores so they sum up to 1.

* Attention combines the relevant information of previous positions by multiplying their relevance scores by their respective value vectors.

* As Transformers started getting larger, ideas like sparse attention and sliding window attention provided improvements for the efficiency of the attention calculation. Sparse attention limits the context of previous tokens that the model can attend to.


<br>

#### Flash Attention

* Popular method and implementation that provides significant speedups for both training and inference of Transformer LLMs on GPUs. It speeds up the attention calculation by optimizing what values are loaded and moved between a GPU’s shared memory (SRAM) and high bandwidth memory (HBM).

<br>

#### Positional Embeddings (RoPE)

* Enable the model to keep track of the order of tokens/words in a sequence/sentence.

* Packing is the process of efficiently organizing short training documents into the context. It includes grouping multiple documents in a single context while minimizing the padding at the end of the context.

* Rotary embeddings are a method to encode positional information in a way that captures absolute and relative token position information. It is based on the idea of rotating vectors in their embeddings space. In the forward pass, they are added in the attention step.

<br>

----

## Chapter 4. Text Classification

<br>

* The confusion matrix describes four types of predictions we can make: 1) Precision measures how many of the items found are relevant, which indicates the accuracy of the relevant results.; 2) Recall refers to how many relevant classes were found, which indicates its ability to find all relevant results. 3) Accuracy refers to how many correct predictions the model makes out of all predictions, which indicates the overall correctness of the model.; 4) The F1 score balances both precision and recall to create a model’s overall performance.

* In zero-shot classification, we have no labeled data, only the labels themselves. The zero-shot model decides how the input is related to the candidate labels.

* The cosine similarity is the angle between two vectors or embeddings. In this example, we calculate the similarity between a document and the two possible labels, positive and negative. To perform cosine similarity on the embeddings, we only need to compare the document embeddings with the label embeddings and get the best matching pairs.

<br>

----

## Chapter 5. Text Clustering and Topic Modeling

<br>

* Although there are many methods for text clustering, from graph-based neural networks to centroid-based clustering techniques, a common pipeline that has gained popularity involves three steps and algorithms: 1. Convert the input documents to embeddings with an embedding model; 2. Reduce the dimensionality of embeddings with a dimensionality reduction model.; 3. Find groups of semantically similar documents with a cluster model.

* This idea of finding themes or latent topics in a collection of textual data is often referred to as topic modeling. Traditionally, it involves finding a set of keywords or phrases that best represent and capture the meaning of the topic.

* Classic approaches, like latent Dirichlet allocation, assume that each topic is characterized by a probability distribution of words in a corpus’s vocabulary.

* BERTopic is a topic modeling technique that leverages clusters of semantically similar texts to extract various types of topic representations. The underlying algorithm can be thought of in two steps.

<br>

----

## Chapter 6. Prompt Engineering

<br>

* Models trained primarily for text generation are often referred to as generative pre-trained transformers (GPT). These models have the remarkable ability to generate text in response to prompts from the user. Through prompt engineering, we can design these prompts in a way that enhances the quality of the generated text.

<br>

```
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline

# Load model and tokenizer
model = AutoModelForCausalLM.from_pretrained( "microsoft/Phi-3-mini-4k-instruct", device_map="cuda",
torch_dtype="auto", trust_remote_code=True,)
tokenizer = AutoTokenizer.from_pretrained("microsoft/Phi-3-mini-4k-instruct")

# Create a pipeline
pipe = pipeline("text-generation", model=model,
tokenizer=tokenizer, return_full_text=False, max_new_tokens=500, do_sample=False, )

# Prompt
messages = [ {"role": "user", "content": "Create a funny joke about  chickens."} ]

# Generate the output
output = pipe(messages)
print(output[0]["generated_text"])

# Apply prompt template
prompt = pipe.tokenizer.apply_chat_template(messages,
tokenize=False)
print(prompt)
```

<br>

* The temperature controls the randomness or creativity of the text generated. It defines how likely it is to choose tokens that are less probable. The underlying idea is that a temperature of 0 generates the same response every time because it always chooses the most likely word.  A  higher temperature (e.g., 0.8) generally results in a more diverse output while a lower temperature (e.g., 0.2) creates a more deterministic output.

* top_p, also known as nucleus sampling, is a sampling technique that controls which subset of tokens (the nucleus) the LLM can consider. It will consider tokens until it reaches their cumulative probability. If we set top_p to 0.1, it will consider tokens until it reaches that value. If we set top_p to 1, it will consider all tokens.

* We can provide the LLM with examples of exactly the thing that we want to achieve. This is often referred to as in-context learning, where we provide the model with correct examples.

* Chain-of-thought aims to have the generative model “think” first rather than answering the question directly without any reasoning. Adding this reasoning step allows the model to distribute more compute over the reasoning process. Instead of calculating the entire solution based on a few tokens, each additional token in this reasoning process allows the LLM to stabilize its output.

<br>

----

## Chapter 7. Advanced Text Generation Techniques and Tools

<br>

* LangChain is a complete framework for using LLMs. It has modular components that can be chained together to allow for complex LLM systems. (Model I/O, Memory, Retrieval, Agents).

* Quantization reduces the number of bits required to represent the parameters of an LLM while attempting to maintain most of the original information. This comes with some loss in precision but often makes up for it as the model is much faster to run, requires less VRAM, and is often almost as accurate as the original.. A GGUF model represents a compressed version of its original counterpart through a method called quantization, which reduces the number of bits needed to represent the parameters of an LLM.

<br>

```
# Make sure the model path is correct for your system!
llm = LlamaCpp(model_path="Phi-3-mini-4k-instruct-fp16.gguf", n_gpu_layers=-1, max_tokens=500, n_ctx=2048, seed=42, verbose=False )

llm.invoke("Hi! My name is Maarten. What is 1 + 1?")
```

<br>

* One of the most intuitive forms of giving LLMs memory is simply reminding them exactly what has happened in the past. In LangChain, this form of memory is called a ConversationBufferMemory. 

<br>

```
from langchain.memory import ConversationBufferMemory

# Define the type of memory we will use
memory = ConversationBufferMemory(memory_key="chat_history")

# Chain the LLM, prompt, and memory together
llm_chain = LLMChain(prompt=prompt, llm=llm, memory=memory

llm_chain.invoke({"input_prompt": "What is my name?"}))
```

<br>

* ConversationSummaryMemory summarizes an entire conversation history to distill it into the main points. Whenever we ask the LLM a question, there are two calls: The user prompt, The summarization prompt. This summarization helps keep the chat history relatively small without using too many tokens during inference.

* Although the tools they use are important, the driving force of many agent-based systems is the use of a framework called Reasoning and Acting (ReAct). In practice, the framework consists of iteratively following these three steps: Thought, Action, Observation.

<br>

```
from langchain.agents import load_tools, Tool
from langchain.tools import DuckDuckGoSearchResults
from langchain.agents import AgentExecutor, create_react_agent

# You can create the tool to pass to an agent
search = DuckDuckGoSearchResults()
search_tool = Tool(name="duckduck",
description="A web search engine. Use this to as a search
engine for general queries.", func=search.run,)

# Prepare tools
tools = load_tools(["llm-math"], llm=openai_llm)
tools.append(search_tool)

# Construct the ReAct agent
agent = create_react_agent(openai_llm, tools, prompt)
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True, handle_parsing_errors=True)

# What is the price of a MacBook Pro?
agent_executor.invoke({"input": "What is the current price of a MacBook Pro in USD? How much would it cost in EUR if the exchange rate is 0.85 EUR for 1 USD." })
```

<br>

---

## Chapter 8. Semantic Search and Retrieval-Augmented Generation

<br>

* Semantic search, which enables searching by meaning, and not simply keyword matching.

* Dense retrieval systems rely on the concept of embeddings, and turn the search problem into retrieving the nearest neighbors of the search query (after both the query and the documents are converted into embeddings).

* Search systems are often pipelines of multiple steps. A reranking language model is one of these steps and is tasked with scoring the relevance of a subset of results against the query; the order of results is then changed based on these scores. 

* One popular way of building LLM search rerankers is to present the query and each result to an LLM working as a cross-encoder. This means that a query and possible result are presented to the model at the same time allowing the model to view both these texts before it assigns a relevance score.

* RAG systems incorporate search capabilities in addition to generation capabilities. They can be seen as an improvement to generation systems because they reduce their hallucinations and improve their factuality.

* Turn our search system into a RAG system -> adding an LLM to the end of the search pipeline.

<br>

```
from langchain import LlamaCpp, PromptTemplate
from langchain.embeddings.huggingface import
HuggingFaceEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains import RetrievalQA

# Make sure the model path is correct for your system!
llm = LlamaCpp(model_path="Phi-3-mini-4k-instruct-fp16.gguf", n_gpu_layers=-1, max_tokens=500,
n_ctx=2048, seed=42, verbose=False)

# Embedding model for converting text to numerical
representations 
embedding_model = HuggingFaceEmbeddings(model_name='thenlper/gte-small')

# Create a local vector database
db = FAISS.from_texts(texts, embedding_model)

# Create a prompt template
template = """<|user|>
Relevant information:
{context}
Provide a concise answer the following question using the
relevant information provided above:
{question}<|end|>
<|assistant|>"""

prompt = PromptTemplate(template=template, input_variables=["context", "question"])

# RAG pipeline
rag = RetrievalQA.from_chain_type(llm=llm, chain_type='stuff', retriever=db.as_retriever(), chain_type_kwargs={"prompt": prompt},verbose=True)

rag.invoke('Income generated')
```

<br>

* There are several additional techniques to improve the performance of RAG systems: Query rewriting, Multi-query RAG, Multi-hop RAG, Query routing, Agentic RA.

* RAG Evaluation: Fluency, Perceived utility, Citation recall, Citation precision, Faithfulness, Answer relevance.

<br>

----

## Chapter 9. Multimodal Large Language Model

<br>

* Generalize some of the Transformer’s success to the field of computer vision. The method they came up with is called the Vision Transformer (ViT), which has been shown to do well on image recognition tasks compared to the previously default convolutional neural networks (CNNs).

* ViT relies on an important component of the Transformer architecture, namely the encoder ( responsible for converting textual input into numerical representations before being passed to the decoder).

* Just like we are converting text into tokens of text, we are converting an image into patches of images. The flattened input of image patches can be thought of as the tokens in a piece of text. However, unlike tokens, we cannot just assign each patch with an ID since these patches will rarely be found in other images, unlike the vocabulary of a text. Instead, the patches are linearly embedded to create numerical representations, namely embeddings.

* Multimodal embedding models can create embeddings for multiple modalities in the same vector space.

* CLIP is an embedding model that can compute embeddings of both images and texts. The resulting embeddings lie in the same vector space, which means that the embeddings of images can be compared with the embeddings of text.3 This comparison capability makes CLIP, and similar models, usable for tasks such as: Zero-shot classification, Clustering, Search, Generation.

* When we start training, the similarity between the image embedding and text embedding will be low as they are not yet optimized to be within the same vector space. During training, we optimize for the similarity between the embeddings and want to maximize them for similar image/caption pairs and minimize them for dissimilar image/caption pairs.

<br>

---

## Chapter 10. Creating Text Embedding Models

<br>

* This process of embedding the input is typically performed by an LLM, which we refer to as an embedding model.

* The main purpose of such a model is to be as accurate as possible in representing the textual data as an embedding.

*  We want to capture the semantic nature—the meaning— of documents. If we can capture the core of what the document communicates, we hope to have captured what the document is about.

* While two-dimensional visualization helps illustrate the proximity and similarity of embeddings, these embeddings typically reside in high-dimensional spaces.

* We can fine-tune the model such that documents are closer in n-dimensional space based on their sentiment rather than their semantic nature.

* One major technique for both training and fine-tuning text embedding models is called contrastive learning. Contrastive learning is a technique that aims to train an embedding model such that similar documents are closer in vector space while dissimilar documents are further apart (word2vec).

<br>

```
from datasets import load_dataset
from sentence_transformers import losses
from sentence_transformers import SentenceTransformer
from sentence_transformers.evaluation import
EmbeddingSimilarityEvaluator
from sentence_transformers.training_args import
SentenceTransformerTrainingArguments
from sentence_transformers.trainer import
SentenceTransformerTrainer

# Load MNLI dataset from GLUE
# 0 = entailment, 1 = neutral, 2 = contradiction train_dataset = load_dataset("glue", "mnli", split="train").select(range(50_000))
train_dataset = train_dataset.remove_columns("idx")

# Use a base model
embedding_model = SentenceTransformer('bert-base-uncased')

# Define the loss function. In softmax loss, we will also need to explicitly set the number of labels.
train_loss = losses.SoftmaxLoss(model=embedding_model, sentence_embedding_dimension=embedding_model.get_sentence_embedding_dimension(), num_labels=3)

# Create an embedding similarity evaluator for STSB
val_sts = load_dataset("glue”, “stsb", split="validation")
evaluator = EmbeddingSimilarityEvaluator(
sentences1=val_sts["sentence1"],
sentences2=val_sts["sentence2"],
scores=[score/5 for score in val_sts["label"]], main_similarity="cosine",)

# Define the training arguments
args = SentenceTransformerTrainingArguments(output_dir="base_embedding_model", num_train_epochs=1, per_device_train_batch_size=32, per_device_eval_batch_size=32, warmup_steps=100, fp16=True, eval_steps=100, logging_steps=100,)

# Train embedding model
trainer = SentenceTransformerTrainer(model=embedding_model, args=args, train_dataset=train_dataset, loss=train_loss, evaluator=evaluator)
trainer.train()

# Evaluate our trained model
evaluator(embedding_model)
```

<br>

* Softmax loss is generally not advised as there are more performant losses: Cosine similarity, Multiple negatives ranking (MNR) loss.

* Multiple negatives ranking (MNR) loss, often referred to as InfoNCE7 orNTXentLoss, is a loss that uses either positive pairs of sentences or triplets that contain a pair of positive sentences and an additional unrelated sentence. This unrelated sentence is called a negative and represents the dissimilarity between the positive sentences.

* After having generated these positive and negative pairs, we calculate their embeddings and apply cosine similarity. These similarity scores are then used to answer the question, are these pairs negative or positive? In other words, it is treated as a classification task and we can use cross-entropy loss to optimize the model.

* Larger batch sizes tend to work better with multiple negative rankings (MNR) loss as a larger batch makes the task more difficult. The reason for this is that the model needs to find the best matching sentence from a larger set of potential pairs of sentences. You can adapt the code to try out different batch sizes and get a feeling of its effects.

<br>

----

## Chapter 11. Fine-Tuning Representation Models for Classification

<br>

* When you are training for multiple epochs, the difference (in training time and resources) between freezing and not freezing often becomes larger. 

* Few-shot classification is a technique within supervised classification where you have a classifier learn target labels based on only a few labeled examples. This technique is great when you have a classification task but do not have many labeled data points readily available. In other words, this method allows you to label a few high-quality data points per class on which to train the model.

* SetFit, Efficient Fine-Tuning with Few Training Examples: 1) Sampling training data; 2) Fine-tuning embedding; 3) Training a classifier (Create a classification head on top of the embedding model and train it using the previously generated training data).

* Not only can SetFit perform few-shot classification tasks, but it also has support for when you have no labels at all, also called zero-shot classification. SetFit generates synthetic examples from the label names to resemble the classification task and thenbtrains a SetFit model on them.

* NER (named-entity recognition): process of fine-tuning a pretrained BERT model where, instead of classifying entire documents, this procedure allows for the classification of individual tokens and/or words, including people and locations. This is especially helpful for de-identification and anonymization tasks when there is sensitive data.

<br>

---

## Chapter 12. Fine-Tuning Generation Models

<br>

* There are three common steps that lead to creating a high-quality LLM:
1. Base model: creating a high-quality LLM is to pretrain it on one or more massive text datasets.
2. Fine-tuning 1 (supervised fine-tuning)
3. Fine-tuning 2 (preference tuning)

* Parameter-efficient fine-tuning (PEFT): focus on fine-tuning pretrained models at higher computational efficiency.

* Adapters are a core component of many PEFT-based techniques. The method proposes a set of additional modular components inside the Transformer that can be fine-tuned to improve the model’s performance on a specific task without having to fine-tune all the model weights. This saves a lot of time and compute.

* The paper “AdapterHub: A framework for adapting transformers” introduced the Adapter Hub as a central repository for sharing adapters. A lot of these earlier adapters were more focused on BERT architectures. More recently, the concept has been applied to text generation Transformers in papers like “LLaMA-Adapter: Efficient fine-tuning of language models with zero-init attention”.

* LoRA is a technique that (like adapters) only requires updating a small set of parameters. This subset allows for much quicker fine-tuning since we only need to update a small part of the base model.

* We can make LoRA even more efficient by reducing the memory requirements of the model’s original weights before projecting them into smaller matrices. The weights of an LLM are numeric values with a given precision, which can be expressed by the number of bits like float64 or float32. QLoRA, a quantized version of LoRA, found a way to go from a higher number of bits to a lower value and vice versa without differentiating too much from the original weights.

<br>

```
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
from transformers import AutoTokenizer
from datasets import load_dataset
from peft import LoraConfig, prepare_model_for_kbit_training, get_peft_model

# Load a tokenizer to use its chat template
template_tokenizer = AutoTokenizer.from_pretrained(
"TinyLlama/TinyLlama-1.1BChat-v1.0")

def format_prompt(example):
	"""Format the prompt to using the <|user|> template TinyLLama is using"""

	# Format answers
	chat = example["messages"]
	prompt = template_tokenizer.apply_chat_template(chat, tokenize=False)
	return {"text": prompt}

# Load and format the data using the template TinyLLama is using
dataset = (load_dataset("HuggingFaceH4/ultrachat_200k”, split="test_sft").shuffle(seed=42).select(range(3_000)))
dataset = dataset.map(format_prompt)

model_name = "TinyLlama/TinyLlama-1.1B-intermediate-step-1431k-3T"

# 4-bit quantization configuration - Q in QLoRA
bnb_config = BitsAndBytesConfig(load_in_4bit=True, bnb_4bit_quant_type="nf4”, bnb_4bit_compute_dtype="float16”, bnb_4bit_use_double_quant=True,)

# Load the model to train on the GPU
model = AutoModelForCausalLM.from_pretrained(model_name, device_map="auto", quantization_config=bnb_config,)

model.config.use_cache = False
model.config.pretraining_tp = 1

# Load LLaMA tokenizer
tokenizer = AutoTokenizer.from_pretrained(model_name,
trust_remote_code=True)
tokenizer.pad_token = "<PAD>"
tokenizer.padding_side = "left"

# Prepare LoRA Configuration
peft_config = LoraConfig(lora_alpha=32, lora_dropout=0.1, r=64, bias="none", task_type="CAUSAL_LM", target_modules= ["k_proj", "gate_proj", "v_proj", "up_proj”, “o_proj", "down_proj”])

# Prepare model for training
model = prepare_model_for_kbit_training(model)
model = get_peft_model(model, peft_config)
```

<br>

* Evaluating generative models poses a significant challenge. Generative models are used across many diverse use cases, making it a challenge to rely on a singular metric for judgment. Unlike more specialized models, a generative model’s ability to solve mathematical questions does not guarantee success in solving coding questions.

* A common method for evaluating generative models on language generation and understanding tasks is on well-known and public benchmarks, such as MMLU, GLUE, TruthfulQA, GSM8k, and HellaSwag.

* Aside from natural language tasks, some models specialize in other domains, like programming. These models tend to be evaluated on different benchmarks, such as HumanEval.

* LLM-as-a-judge was introduced: a separate LLM is asked to judge the quality of the LLM to be evaluated. An interesting variant of this method is pairwise comparison. Two different LLMs will generate an answer to a question and a third LLM will be the judge to declare which is better.

* When we use the Hugging Face stack, preference tuning is eerily similar to the instruction tuning: we still be use TinyLlama but this time an instruction-tuned version that was first trained using full fine-tuning and then further aligned with DPO.

<br>

### ⬛️