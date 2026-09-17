---
title: 🧑‍🏫 BLACKBOARD →  WebLLM, WebGPU, Web Inference
subtitle: Audience: Beginner to Advanced AI Scientists and Engineers | Today's Word: Threshold
date: 2026; 09; 17
---

> [🎼](https://www.youtube.com/watch?v=JCX0SEX9YMo) *"In the face of the **[Sublime](https://www.youtube.com/watch?v=x8JVrSc4J8Y)**, we feel a shiver, a foretaste of death itself, something too large for our minds to encompass. And for a moment it shakes us out of our smugness and releases us from the deathlike grip of habit and banality."* — Robert Green, on The Laws of Human Nature

> [🎵](https://www.youtube.com/watch?v=jlIeMgsjr6c) *"The rest is silence."* — William Shakespeare, on Hamlet

<br>

![](/blog/assets/duff.jpeg)

<br>

In another of my side quests, I have been looking at small, distilled LLMs that can run locally in the browser. The inference stack we are learning today:

1️⃣ **[WebLLM](https://github.com/mlc-ai/web-llm)**
2️⃣ **[WebGPU](https://gpuweb.github.io/gpuweb/)**
3️⃣ MLC and **[MLC-LLM](https://github.com/mlc-ai/mlc-llm)**

<br>

![](/blog/assets/webllm_stack.png)

<br>

I am also working on my own ever-evolving platform to test and work through these experiments, while having some fun at the same time. I call it **My Japanese AI**. You can **[play with it as I build](https://japanese.nullstar.fun/)** (will be adding many tiny and distilled models in the 1-16B parameter range soon) or check out its **[source code](https://github.com/future-ai-org/my_japanese_ai)**.

As I read through the material, I wrote down a few highlights — with a moderate attempt at coherence — for my personal inventory and delight (and perhaps as a way to connect with other friendly AI scientists and builders out there who love talking about the same things). As always, remember the rules:

**🤖 If you see a 👾, it means I found something particularly cool or learned something new.**
**🤖 If you see a ✨, it means things that are so cool that they need a lil glitter around them.**
**🤖 If these notes look cool to you, it's your ✦moral duty✦ to read the original resources.**
**🤖 Just another blog, but not your usual blog: they're living notes that I change as I fancy.**

##### P.S. Mabon Hapus i chi! and 秋分の日、どうぞ良い一日をお過ごしください。

<br>

---

## 🏯 WebLLM, *The In-Browser LLM Engine*

<br>

![](/blog/assets/local_inference.png)

<br>

* WebLLM is a JavaScript/TypeScript inference engine for running LLMs directly in the browser, using MLC-compiled WebGPU kernels running inside a Web Worker.

* Zero Server Dependency (and privacy): Once the model weights are downloaded and cached in your browser, everything runs locally.

<br>

### WebLLM: A High-Performance In-Browser LLM Inference Engine, Ruan et al. (**[arXiv:2412.15803](https://arxiv.org/html/2412.15803v2)**)

<br>

![](/blog/assets/webllm_stack_paper.png)

<br>

> *With machine learning compilers MLC-LLM and Apache TVM, WebLLM leverages optimized WebGPU kernels, overcoming the absence of performant WebGPU kernel libraries. Evaluations show that WebLLM can retain up to 80% native performance on the same device with room to close the gap further.*

> *Open-weight providers now routinely ship capable small models in the 1-8B-parameter range, and techniques such as quantization have made real-time local inference common on consumer hardware (Abdin et al. (2024), Gemma Teamet al. (2024), Liu et al. (2026)).*

<br>

* Enabling LLM-based features in web applications poses three challenges: 

1️⃣ A standardized API that web applications can easily incorporate
2️⃣ Adaptation to the browser’s runtime environment
3️⃣ efficient GPU acceleration. 

<br>


* WebLLM’s architecture addresses these challenges by dividing the system into three corresponding parts: 

1️⃣ `ServiceWorkerMLCEngine`: lightweight, endpoint-like object the web developer instantiates in the page. It takes OpenAI-style JSON requests and streams back OpenAI-style JSON responses.
2️⃣ MLCEngine running inside Web Workers / Service Workers: the actual computation happens off the main thread, so a long generation doesn't freeze page scrolling or input.
3️⃣ Ahead-of-time-compiled WebGPU kernels: produced by MLC-LLM/TVM, as described above, plus a WebAssembly layer (compiled from C++ via Emscripten) for CPU-side work that doesn't belong on the GPU: the grammar engine for structured/JSON generation, paged-KV-cache bookkeeping, and tensor-manipulation glue for launching kernels.

<br>

> *The lightweight frontend engine `ServiceWorkerMLCEngine` that is exposed to the web application, and a backend engine MLCEngine in the worker thread that actually computes the LLM workload. The two engines communicate via message-passing, and the messages are simply OpenAI-style requests and responses.*

> *Using WebGPU is not enough since LLM inference requires non-trivial computation on the CPU. WebAssembly (WASM) is a portable low-level bytecode that can be compiled from C++ code and run in a JavaScript runtime with near-native performance. Thus, instead of re-implementing CPU workload in JavaScript, WebLLM leverages Emscripten to compile high-performance subsystems written in C++ into WebAssembly for various CPU workloads in LLM inference, including a grammar engine for structured generation, sequence management in the paged KV-cache and tensor manipulation for launching kernels.*

<br>

### Web Workers

<br>

![](/blog/assets/webllm_stack_2.png)

<br>

- LLM inference can take a long time, therefore WebLLM supports Web Workers.

- It utilizes background threads so that running heavy AI tasks doesn't freeze or lag the website's user interface.  

<br>

--- 

## 🏯 MLC (Machine Learning Compilation)


<br>

![](/blog/assets/mlc.png)

<br>

> **[What is ML compiler?](https://mlc.ai/)** A machine learning compiler is a specialized compiler that transforms high-level ML models into optimized code that can efficiently run on various hardware platforms. It bridges the gap between ML frameworks and hardware backends, enabling models to run faster and use less memory across different devices from cloud servers to edge devices.

<br>

- The user-facing browser layer. It runs supported open LLMs entirely in the browser, uses WebGPU for local acceleration, uses WebAssembly for CPU-side runtime work, and presents an API designed to resemble OpenAI’s chat-completion APIs.

- A compiler discipline and toolchain, built on Apache TVM, that takes a model written in Python and compiles it into optimized GPU kernels and portable binaries for a target backend (optimized implementations for different hardware and runtime targets; WebGPU included). It's the translator.

- The deeper problem MLC solves is hardware fragmentation.

- A conceptual example is:

```javascript
import { CreateMLCEngine } from "@mlc-ai/web-llm";

const engine = await CreateMLCEngine("a-supported-MLC-model-id");

const stream = await engine.chat.completions.create({
  messages: [
    { role: "system", content: "You are a concise assistant." },
    { role: "user", content: "Summarize this note." }
  ],
  stream: true
});

for await (const chunk of stream) {
  process.stdout?.write?.(chunk.choices[0]?.delta?.content ?? "");
}
```

<br>

### MLC-LLM

<br>

> *WebLLM leverages machine learning compilation libraries MLC-LLM and Apache TVM to compile performant WebGPU kernels. MLC-LLM ingests any open-source model’s implementation in Python, which can use techniques such as the aforementioned PagedAttention and FlashAttention, and compiles the model’s computation into the backend of interest (in this case, WebGPU). Besides compiling to the specified target, MLC-LLM provides both graph-level optimizations (e.g. kernel fusion) and operator-level optimizations (e.g. GEMM tiling) to improve kernel performance. MLC-LLM converts open-source models into two artifacts: converted weights and a WASM library. The WASM library contains both WebGPU kernels and non-kernel functions in WebAssembly.*

<br>

- An LLM deployment engine built on machine-learning compilation that provides optimized inference across GPUs, browsers, mobile devices, and servers.

- It compiles and runs code on MLCEngine: a unified high-performance LLM inference engine across the above platforms.

- MLC-LLM also runs as a server: MLCEngine exposes an OpenAI-compatible REST endpoint, Python API, JavaScript API, and native iOS/Android bindings — all sharing the same compiled core, so a WebLLM app in the browser and a native iOS app can, in principle, be running weights produced by the exact same compilation pipeline.

<br>


### [Apache TVM](https://tvm.apache.org/docs)

<br>

> *A deep learning compiler that enables access to high-performance machine learning anywhere for everyone.*

<br>

![](/blog/assets/tvm.png)

<br>

### [TensorIR](https://dl.acm.org/doi/epdf/10.1145/3575693.3576933)

<br>

![](/blog/assets/tensorir.png)

<br>

### Why compilation is needed

<br>

- A model checkpoint is not automatically a high-performance program for every device. 

- It encodes parameters and an architecture, but efficient execution still requires decisions such as:

<br>
 
1️⃣ How to store weights and activations in memory.
2️⃣ Which numerical precision and quantization scheme to use.
3️⃣ Which operations can be fused to avoid intermediate memory traffic.
4️⃣ How to tile matrix multiplications.
5️⃣ How to schedule work across GPU threads and workgroups.
6️⃣ How to target the constraints and capabilities of WebGPU, Metal, Vulkan, CUDA, CPUs, or mobile devices.

<br>

- Apache TVM’s compilation model explicitly supports transformations at both the graph and tensor-program levels, then produces a deployable module for the target device.

<br>

### MLC LLM artifacts for the web

<br>

- For WebLLM deployment, MLC LLM produces two key artifacts:

<br>

1️⃣ Converted model weights, often quantized (e.g., 4-bit) and packaged in MLC format.
2️⃣ A binary kernel library — a .so/.dylib/.dll for native targets, or a WebAssembly .wasm module containing WebGPU kernels for the browser, containing execution logic, including the compiled WebGPU kernels and non-kernel runtime functions.

<br>

- WebLLM downloads and uses both of these artifacts in the browser.

- The model identifier must correspond to an artifact WebLLM supports and can access; an actual production integration should also display loading progress, verify WebGPU availability, handle cancellation, and offer a graceful server or CPU fallback.

<br>

### JIT and ahead-of-time compilation

<br>

- MLC LLM can compile model libraries at runtime (JIT) or generate them explicitly for deployment (ahead of time).

- Ahead-of-time compilation is particularly relevant for web and mobile deployments because it lets an application distribute a target-specific artifact rather than asking each client to perform model compilation during startup. 

- The WebLLM paper compared browser WebLLM with native MLC LLM on the same Apple MacBook Pro M3 Max, using Chrome Canary 133.

- In that experiment:

<br>

| Model |	WebLLM generation | speed	Native MLC LLM speed	| Browser performance retained |
|--------|-------------------|----------------------------|------------------------------|
| Llama 3.1 8B |	41.1 tokens/s |	57.7 tokens/s	 | 71.2% |
| Phi-3.5 Mini (3.8B) |	71.1 tokens/s | 	89.3 tokens/s | 	79.6% |

<br>

----

## 🏯 WebGPU, *The Hardware Accelerator*

<br>

![](/blog/assets/gpudevice.png)

<br>

* A standardized low-level browser API that exposes modern GPU graphics and general-purpose computation to web applications (JavaScript). It's the hardware doorway.

- It acts as the performance backbone, allowing WebLLM to achieve close to native inference speeds.

* The catch is that WebGPU ships with no ML kernel library — no cuDNN- or cuBLAS-equivalent — so every matrix multiply, attention op, and quantization kernel has to be hand-written or generated by a compiler (That gap is exactly what MLC fills).

* WebGPU exposes compute shaders and storage buffers directly, which is the same programming model native ML kernel authors already use. The shader executes thousands of parallel operations.

* A shader is the portion of a WGSL program that executes a shader stage in a pipeline. A shader comprises:

<br>

1️⃣ An entry point function.
2️⃣ The transitive closure of all called functions, starting with the entry point. This set includes both user-defined and built-in functions.
3️⃣ The set of variables and constants statically accessed by all those functions.
4️⃣ The set of types used to define or analyze all those functions, variables, and constants.

<br>

* An application begins with:

```javascript
const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice();
```

<br>

### WebGL

<br>

![](/blog/assets/opengl.png)

<br>

- Prior to WebGPU, browser GPU compute meant abusing WebGL's graphics pipeline (packing tensors into textures) — workable but awkward and slow.

<br>

| Feature             | WebGL                | WebGPU                              |
|---------------------|----------------------|-------------------------------------|
| Primary origin      | Graphics             | Graphics + compute                 |
| Modern GPU model    | Limited              | Yes                                 |
| General compute     | Awkward              | First-class                         |
| Compute shaders     | No native equivalent | Yes                                 |
| GPU memory model    | Older abstraction    | Modern explicit resources           |
| ML suitability      | Possible but awkward | Much better                         |
| Shader language     | GLSL                 | WGSL                                |
| Modern GPU APIs     | Less aligned         | Designed around modern GPU architecture |

<br>

- Feb 2017 — Apple's WebKit team proposes a W3C community group after showing an early "WebGPU" proof-of-concept based on Metal; Google and Mozilla had parallel prototypes ("NXT" and an Obsidian/Vulkan-based design, respectively).
- 2018 — Chrome announces intent to implement the emerging standard.
- Feb 2020 — Google ships Tint, and the shading language work converges on WGSL.
- April 2023 — Chrome 113 and Edge ship WebGPU by default on Windows/ChromeOS/macOS (Android followed in Chrome 121).
- June–July 2025 — Safari (Safari 26, tied to macOS Tahoe/iOS 26) and Firefox (Firefox 141) ship WebGPU, completing coverage of all four major engines.
- As of late 2025 — the spec sits at W3C Candidate Recommendation (CR) status — mature and implemented everywhere, but formally still short of final "Recommendation."

<br>

### WGSL (WebGPU Shading Language)

<br>

![](/blog/assets/js_orc.png)

<br>

* The native shader language designed for **[WebGPU](https://gpuweb.github.io/gpuweb/wgsl/)**.

* The syntax is similar to Rust.

* If you're trying to optimize or implement an LLM GPU kernel yourself, WGSL becomes very relevant.

* WebGPU issues a unit of work to the GPU in the form of a GPU command. 

* WGSL is concerned with two kinds of GPU commands: 1) a draw command executes a render pipeline in the context of inputs, outputs, and attached resources, 2) a dispatch command executes a compute pipeline in the context of inputs and attached resources.

<br>

---

## 🏯 Other Condiderations

<br>

### The competitive landscape

<br>

WebLLM is not the only way to run models in a browser; it's worth knowing where it sits:

<br>

➡️ **[Transformers.js (Hugging Face)](https://github.com/huggingface/transformers.js)** — a JS port of the transformers pipeline API, backed by ONNX Runtime Web, which can itself target either WebAssembly or WebGPU depending on browser support. It covers a much broader task surface (embeddings, classification, audio, vision) than WebLLM, and is arguably the easiest on-ramp for non-LLM tasks, but for pure autoregressive LLM decoding, benchmarks generally show it in the same performance ballpark as WebLLM when both use WebGPU, with WASM fallback for smaller/simpler models.

2️⃣ **[wllama](https://github.com/ngxson/wllama)** / llama-cpp-wasm — WebAssembly bindings for llama.cpp itself. Historically WASM/CPU-only (SIMD-accelerated, no GPU needed at all, which is a real advantage for reach), wllama added WebGPU support in its v3 release. It works from GGUF files directly, so it plugs into the same model ecosystem as desktop llama.cpp/Ollama users already use. 

3️⃣ WebNN (Web Neural Network API) — a different W3C standard, lower-level and NPU/accelerator-aware rather than GPU-compute-aware. It's designed to let the browser hand inference off to whatever dedicated silicon a device has (Apple Neural Engine, Qualcomm/Intel NPUs, etc.), not just the GPU. It reached an updated W3C Candidate Recommendation in January 2026 after what the spec calls "over 100 significant changes," including new transformer-support operators and a buffer-sharing MLTensor API — clearly being pushed toward LLM-scale workloads, but implementation is still catching up to WebGPU's browser coverage.

<br>

- The rough mental model: WebGPU/WebNN are the standards bodies' answer to "how does a web page reach hardware acceleration," while WebLLM/Transformers.js/wllama are competing (and partly complementary) engineering answers to "how do I actually get a chat model running well on top of that."

<br>

### Practical limitations

<br>

➡️ First-load cost: multi-gigabyte weight downloads and WebGPU shader compilation add real latency (roughly 1–5 seconds of shader compile time alone is commonly reported, on top of the download) before the first token appears. Caching (IndexedDB/OPFS/Cache API) is what makes repeat visits fast.

2️⃣ Hardware floor: WebGPU support on lower-end Android devices and older GPUs remains uneven — this is a driver/vendor coverage problem, not something WebLLM or WebGPU-the-spec can fix unilaterally.

3️⃣ The native-performance gap means anything latency-critical at scale is still likely to prefer server-side inference; WebLLM's value proposition is privacy, offline capability, and zero server cost — not raw speed.

4️⃣ Security surface: WebGPU is comparatively young as a spec and its sandboxing is still being actively hardened; running untrusted model weights or untrusted WGSL is not risk-free.

<br>

### Lastly, some food for thought... 

<br>

Performance depends on:

- GPU driver
- browser implementation
- WebGPU backend
- model size
- quantization
- context length
- KV cache
- memory bandwidth
- shader efficiency
- browser overhead
- thermal limits
- available GPU memory
- CPU performance for tokenization and auxiliary operations

<br>

----

### ⬛️
