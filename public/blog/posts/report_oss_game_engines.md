---
title: 🏄‍♀️ REPORT → A Ride Through OSS Simulation Engines
subtitle: In which we learn a little bit about the current open-source landscape.
date: 2026; 10; 17
---

> [🎧](https://www.youtube.com/watch?v=xjoRehKLslE) *"It is a riddle wrapped in a mystery inside an enigma; but perhaps there is a key."* — Winston Churchill, 1939

<br>

![](/blog/assets/the_idea_maze.jpeg)

<br>

Happy Monday, my dear anon. Today, we will take a quick look at the current open-source landscape for game engines. This is a high-level overview meant to enlighten us all about this *playful* engineering sub-niche. Enjoy!

Ah, and by the way, as we read through today's material, please remember our rules:

**🤖 If these notes look cool to you, it's your ✦moral duty✦ to read the original resources.**
**🤖 Just another blog, but not your usual blog: they're living notes that I change as I fancy.**

<br>

---

# 🌞 Serving the Infrastructure for MMO Experiences in the Agentic Era

<br>

One of the reasons we are building [**NULLSTAR**](https://nullstar.games/) is to bring the development of interactive experiences to a remarkably modular agentic paradigm (**["everything is a plugin"](https://arxiv.org/pdf/2608.25512)**). This matters because a game engine renders and simulates *experience worlds*, but does not automatically provide the infrastructure needed to support a persistent MMO with thousands/millions/billions➕ of players. NULLSTAR is a seven-layer operating system being developed to integrate these components. Today, we are discussing more specifically our sixth layer, **[PleiadesOS:STEROPE](http://marina.nullstar.fun/pages/post.html?post=idea_nullstar)**.

Although several great engine options are available (e.g., browser-first platforms, single-player, 2D), the infrastructure for the experiences we are creating should support the following features:

- (Multimodal) asset streaming 
- High-quality rendering for a large-world simulation
- The ability to operate the game for years (persistence)
- Authoritative multiplayer networking with excellent server performance

<br>

Therefore, for this report, let us narrow our options to three powerful open-source engines that meet these criteria:

1. [**Godot**](https://godotengine.org/)
2. [**Bevy**](https://bevy.org/)
3. [**Open 3D Engine (O3DE)**](https://o3de.org/)

<br>

----

# 🌞 Head-to-head comparison

<br>

| Criterion                          | Godot                              | Bevy                               | O3DE                         |
| ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------- |
| Main language                      | GDScript, C#, C++                  | Rust                               | C++, Lua, Python             |
| Rust integration                   | [Rust binding](https://github.com/godot-rust/gdext), [The Godot-Rust Book](https://godot-rust.github.io/book/) | Native             | Either by a separate processes over a network API, or building a Rust embedded library, or a custom O3DE Gem |
| 3D graphics                        | Good                               | Good                               | Excellent                    |
| Editor workflow                    | Strong integrated editor           | Evolving editor                    | Extensive editor and component tooling |
| Dedicated server support           | Yes                                | Yes, via custom application        | Yes                          |
| Built-in multiplayer framework     | Yes                                | Relies on ecosystem libraries      | Yes                          |
| Server-authoritative networking    | Must architect correctly           | Must architect correctly           | Supported by [Multiplayer Gem](https://docs.o3de.org/docs/user-guide/networking/multiplayer/overview) |
| Entity replication                 | Available through multiplayer APIs | Depends on chosen networking stack | Built-in framework           |
| Local prediction                   | Custom implementation/integrations | Depends on networking stack        | Supported                    |
| Native ECS                         | No ([Godot Entity Component System](https://github.com/csprance/gecs))                              | Yes                                | Yes, entity-component architecture                     |
| Data-oriented systems              | Optional/custom                    | Core design                        | Component-based, with a different execution model      |
| Parallel system scheduling         | Not a native ECS scheduler         | Built in                           | Engine-managed; not equivalent to Bevy's ECS scheduler |
| ECS usable independently           | Requires custom/external approach  | Yes, everything around the [`bevy_ecs` library](https://docs.rs/bevy_ecs/latest/bevy_ecs/) | Tightly integrated with engine architecture            |
| Development speed for a small team | High                               | Medium – low                       | Medium – low                 |
| Long-term engine customization     | High                               | Very high                          | Very high                    |

<br>

---

# 🌞 What each engine means for real-time MMO Experiences

<br>

## Godot: fastest route to a playable MMO prototype

<br>

> *Godot supports dedicated headless servers and multiplayer APIs, but you still need to design the authoritative simulation and production server architecture.*

<br>

**[Godot](https://github.com/godotengine/godot)** is attractive for getting character movement, exploration, quests, inventory, dialogue, and social gameplay into a functioning game quickly. **[Here](https://www.youtube.com/watch?v=7ZwEmxihlw4)** are some examples of games made in 2025. Plus, some of its strongest features are:

- Node-based architecture (i.e., an object-oriented paradigm using a traditional scene tree and node inheritance hierarchy)
- Mature editor and iteration workflow
- Dedicated headless server exports
- Multiplayer APIs that you can use as a foundation
- **[MIT licensing](https://docs.godotengine.org/en/stable/about/complying_with_licenses.html)**, with fewer engine-license constraints for commercial distribution

<br>

> *Intuitive scene-driven design with the following features: 1) Build your game from simple blocks, 2) Extend beyond features provided by the engine, 3) Create data-driven elements with custom resources, 4) Support both high and low-end devices, 5) Seamlessly integrate with your asset pipeline, 6) Create animated videos and prerendered cutscenes in engine.*

<br>

Now, here are some things that would need be implemented (integrated with PleiadesOS:TAYGETE and PleiadesOS:CELAENO):

##### Server-authoritative gameplay
- movement, combat, cooldowns, damage, and interaction rules on the server
- validation of client inputs so players cannot report their own health, position, inventory, or rewards

##### Persistent character and world data
- database schema for accounts, characters, equipment, inventories, quests, and progression
- saving and restore world state across server restarts, including object changes and completed events
- handling concurrent writes, retries, transaction boundaries, and crash recovery
- keeping durable storage separate from frequently updated in-memory simulation state

<br>

## Bevy: best for a custom simulation platform

<br>

> *Bevy offers more freedom to build a Rust-native stack, but its networking capabilities depend on the libraries and architecture you select. Its community maintains networking and replication options, rather than one integrated, MMO-ready networking solution.*

<br>

**[Bevy](https://github.com/bevyengine/bevy)** makes sense if the experience is a long-lived software platform with custom simulation rules, procedural systems, agent behavior, and a Rust-heavy codebase. **[Here](https://github.com/bevyengine/bevy/tree/latest/examples)** are some examples. Plus, some of its strongest features are:

- Native **[ECS (Entity Component System)](https://bevy.org/learn/quick-start/getting-started/ecs/)** architecture (a natural fit for large numbers of simulated entities, **[travel to the future to learn more](http://marina.nullstar.fun/pages/post.html?post=report_ecs)**)
- Game logic can share types and concepts with other Rust services (Rust is our language of choice for performance-sensitive server components)
- You can choose networking libraries to fit your protocol and deployment model
- Dual **[MIT and Apache 2.0 licensing](https://github.com/bevyengine/bevy#license)**

<br>


> *Design Goals: 1) Capable: Offer a complete 2D and 3D feature set , 2) Simple: Easy for newbies to pick up, but infinitely flexible for power users , 3) Data Focused: Data-oriented architecture using the Entity Component System paradigm, 4) Modular: Use only what you need. Replace what you don't like, 5) Fast: App logic should run quickly, and when possible, in parallel, 6) Productive: Changes should compile quickly.* 

<br>

In addition, these are the things that would need be implemented for this engine (integrated with PleiadesOS:TAYGETE and PleiadesOS:CELAENO):

##### Multiplayer networking and replication
- which ECS components are replicated, which remain server-only, and which are predicted locally
- selection of a networking solution for client-server communication, packet delivery, and connection lifecycle management
- serialization, delta updates, entity creation and destruction messages, and synchronization of component changes

##### Editor and developer tooling
- repeatable local development environments that launch clients, dedicated servers, and supporting services together

<br>

## O3DE: strongest integrated networking foundation

<br>

> *O3DE has a notable advantage in built-in multiplayer infrastructure: its official Multiplayer Gem documents server-authoritative networking, entity replication, network inputs, and local prediction.*

<br>

**[O3DE](https://github.com/o3de/o3de)** is worth consideration for advanced high-fidelity 3D rendering and a networking framework integrated into the engine (O3DE has the most AAA-style tech). **[Here](https://www.youtube.com/@Open3DEngine/videos)** are some of the good work they are doing. Plus, some of its strongest features are:

- Native entity-component architecture (uses entities composed of reusable components)
- Dedicated server runtime
- Multiplayer Gem with replication and server-authoritative networking
- C++ customization and modular Gems
- Extensive tooling for complex 3D applications
- **[Apache 2.0 licensing](https://github.com/o3de/o3de/blob/development/LICENSE.txt)**

<br>

> *In Open 3D Engine (O3DE), the synchronization needed for multiplayer support is performed through multiplayer components. Like other components in O3DE, these are attached to entities. Multiplayer components can receive remote procedure calls (RPC), which are function calls from a remote source. Multiplayer components also define the data to be synchronized across the network. Each multiplayer component, normally generated as an auto-component, defines its own requirements for other data to be present and defines which functions are available. Some of the features offered in the O3DE Multiplayer Gem include: 1) Role-based synchronization and replication rules, 2) Local prediction and backwards reconciliation (“rollback”), and 3) Server-authoritative asynchronous multiplayer.*

<br>

In addition, here are some things that would need be implemented for this engine (integrated with PleiadesOS:TAYGETE and PleiadesOS:CELAENO):

##### Network-enabled game entities 
- using O3DE's auto-component generation where appropriate, then implement the gameplay behavior

<br>

## And for all engines...

<br>

#### ✨ Orchestration and Intelligence, integrated with PleiadesOS:TAYGETE, PleiadesOS:MEROPE, and PleiadesOS:CELAENO:

##### Gameplay and AI systems
- combat, quests, progression, world events, and game-specific rules using the engine's component and scripting systems
- AI decisions on the server and replicate the resulting actions to clients
- configuration of network entity roles and ownership for players, NPCs, interactable objects, and other gameplay entities

##### World zoning and large-scale server architecture
- the division between world regions, instances, and server processes
- routing and handoff mechanisms for players moving between regions
- how to scale individual regions, recover failed processes, and maintain world ownership
- how to transfer entities and player ownership between server processes
- coordination of shared world events and avoid conflicting writes when multiple services interact with the same state

##### Accounts and sessions
- integration of account authentication and authorization
- handling server discovery, matchmaking, party management, and session assignment
- hadling reconnections, duplicate logins, server transfers, and session expiration
- maintaining the relationship between a player's account, character, active session, and current world server

##### Persistent world and character services
- storing characters, inventories, quests, world changes, and progression durably
- connecting the simulation to account and persistence services
- deciding when state changes must be committed, and recover from crashes or failed writes
- implementing save/load workflows that reconcile persisted data with entities spawned into the running world

##### Build and deployment
- headless dedicated servers and package the binaries with their configuration and secrets
- deployment of pipelines that roll out updates through orchestration, scaling, graceful restarts, and rolling deployments
- management of engine modules (e.g., O3DE Gems), project dependencies, and custom engine code with end-to-end workflows

<br>

#### ✨ MMO operations, integrated with PleiadesOS:ALCYONE: 

##### **Runtime observability**
- health checks for every server process
- logs, metrics, and crash reports, and set up monitoring and alerting
- profile server performance under real conditions

##### **Security**
- secure remote procedure calls
- rate-limit potentially abusive requests
- security controls across the whole stack

##### **Testing**
- run automated multiplayer tests, including replication correctness, desynchronization, and network failure
- load-test with realistic player counts and entity-update volumes

<br>

---

# 🌞 Engine-Architecture Integration

<br>

Let's end today's discussion with some eye candy: a diagram of how the infrastructure for MMO worlds can be organized into multiple layers:

<br>

![](/blog/assets/sterope_1.png)

<br>

And an *ever-growing* list of very good (but somehow random) resources on building large-scale experiences:

- **[frozenfractal](https://frozenfractal.com)**
- **[heredragonsabound](https://heredragonsabound.blogspot.com/)**
- **[gameprogrammingpatterns](https://gameprogrammingpatterns.com/)**
- **[gamesfromwithin](https://gamesfromwithin.com/)**

<br>

---

### Until next time, my friend!

### ⬛

<br>

![](/blog/assets/goat.png)

<br>
