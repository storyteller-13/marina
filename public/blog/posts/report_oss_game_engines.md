---
title: 🏄‍♀️ REPORT → A Fun Ride Through OSS Game Engines
subtitle: In which we learn a little bit about the current open-source landscape.
date: 2026; 10; 17
---

> [🎧](https://www.youtube.com/watch?v=xjoRehKLslE) *"It is a riddle wrapped in a mystery inside an enigma; but perhaps there is a key."* — Winston Churchill, 1939

<br>

![](/blog/assets/the_idea_maze.jpeg)

<br>

Happy Monday, my dear anon. Today, we will take a quick look at the current open-source landscape for game engines. This is a high-level overview meant to enlighten us all about this *playful* engineering sub-niche. Enjoy!

Ah, and by the way, as we read through today's material, please remember our rules:

**🤖 Just another blog, but not your usual blog: they're living notes that I change as I fancy.**

<br>

---

# 🎮 Serving the Infrastructure for Multiplayer MMO Experiences in the Agentic Era

<br>

One of the reasons we are building [**NULLSTAR**](https://nullstar.games/) is to bring the development of interactive experiences to a remarkably modular agentic paradigm. This matters because a game engine renders and simulates *experience worlds*, but does not automatically provide the infrastructure needed to support a persistent MMO with thousands of players. NULLSTAR is a seven-layer operating system being developed to integrate these layers (and today, we are discussing more specifically our sixth layer, **[STEROPE](http://localhost:8037/pages/post.html?post=idea_nullstar)**).

Although several great engine options are available (e.g., browser-first platforms, single-player engines, and 2D engines), the infrastructure for the experiences we are creating should support the following features:

- High-quality rendering for a large-world simulation
- Authoritative multiplayer networking with excellent server performance
- (Multimodal) asset streaming 
- The ability to operate the game for years (persistence)

<br>

Therefore, for this report, let us narrow our options to three powerful open-source engines that meet these criteria:

1. [**Godot**](https://godotengine.org/)
2. [**Bevy**](https://bevy.org/)
3. [**Open 3D Engine (O3DE)**](https://o3de.org/)

<br>

----

# 🎮 Head-to-head comparison

<br>

| Criterion                          | Godot                              | Bevy                               | O3DE                         |
| ---------------------------------- | ---------------------------------- | ---------------------------------- | ---------------------------- |
| 3D graphics                        | Good                               | Good                               | Excellent potential          |
| Visual editor                      | Excellent                          | Developing                         | Extensive                    |
| Dedicated server support           | Yes                                | Yes, via custom application        | Yes                          |
| Built-in multiplayer framework     | Yes                                | Relies on ecosystem libraries      | Yes                          |
| Server-authoritative networking    | Must architect correctly           | Must architect correctly           | Supported by [Multiplayer Gem](https://docs.o3de.org/docs/user-guide/networking/multiplayer/overview) |
| Entity replication                 | Available through multiplayer APIs | Depends on chosen networking stack | Built-in framework           |
| Local prediction                   | Custom implementation/integrations | Depends on networking stack        | Supported                    |
| Massive-world architecture         | Custom work                        | Custom work                        | Custom work                  |
| Rust integration                   | [Rust binding](https://github.com/godot-rust/gdext)| Native             | C++-centric                  |
| Development speed for a small team | High                               | Medium – low                       | Medium – low                 |
| Long-term engine customization     | High                               | Very high                          | Very high                    |

<br>

Additionally:

- O3DE has a notable advantage in built-in multiplayer infrastructure: its official Multiplayer Gem documents server-authoritative networking, entity replication, network inputs, and local prediction.

- Godot also supports dedicated headless servers and multiplayer APIs, but you still need to design the authoritative simulation and production server architecture.

- Bevy offers more freedom to build a Rust-native stack, but its networking capabilities depend on the libraries and architecture you select. Its community maintains networking and replication options, rather than one integrated, MMORPG-ready networking solution.

<br>

---

# 🎮 What each engine means for real MMO Experiences

<br>

## Godot: fastest route to a playable MMO prototype

<br>

**[Godot](https://github.com/godotengine/godot)** is attractive for getting character movement, exploration, quests, inventory, dialogue, and social gameplay into a functioning game quickly. Plus, some of its strongest features are:

- Mature editor and iteration workflow
- Dedicated headless server exports
- Multiplayer APIs that you can use as a foundation
- MIT licensing, with fewer engine-license constraints for commercial distribution

<br>

Now, here are some things that would need be implemented (integrated with NULLSTAR's TAYGETE and CELAENO):

##### Server-authoritative gameplay
- movement, combat, cooldowns, damage, and interaction rules on the server
- validation of client inputs so players cannot report their own health, position, inventory, or rewards

##### Persistent character and world data
- database schema for accounts, characters, equipment, inventories, quests, and progression
- saving and restore world state across server restarts, including object changes and completed events
- handling concurrent writes, retries, transaction boundaries, and crash recovery
- keeping durable storage separate from frequently updated in-memory simulation state

##### World partitioning and server scaling
- dividing the world into zones, regions, or server-owned areas
- assigning players to instances and handle their transitions between zones
- implementing interest management so clients receive updates only for relevant nearby entities
- split, migrate, scale of out overloaded regions

<br>

## Bevy: best for a custom simulation platform

<br>

**[Bevy](https://github.com/bevyengine/bevy)** makes sense if the experience is a long-lived software platform with custom simulation rules, procedural systems, agent behavior, and a Rust-heavy codebase. Plus, some of its strongest features are:

- An ECS (Entity Component System) architecture is a natural fit for large numbers of simulated entities
- Game logic can share types and concepts with other Rust services (Rust is suitable for performance-sensitive server components)
- You can choose networking libraries to fit your protocol and deployment model

<br>

In addition, these are the things that would need be implemented for this engine (integrated with NULLSTAR's TAYGETE and CELAENO):

##### Multiplayer networking and replication
- selection of a networking solution for client-server communication, packet delivery, and connection lifecycle management
- which ECS components are replicated, which remain server-only, and which are predicted locally
- serialization, delta updates, entity creation and destruction messages, and synchronization of component changes
- handling latency, packet loss, interpolation, prediction, reconciliation, and reconnection

##### Server-authoritative simulation
- separate server simulation systems from client presentation systems
- validation of player inputs and execute combat, movement, AI, and interactions on the server
- defining update ordering, simulation frequency, and deterministic or reproducible behavior where needed
- preventing clients from modifying authoritative ECS components directly

##### Persistence and data lifecycle
- serialization and database representations for entities and their components
- which data is transient, periodically saved, or committed immediately
- map persistent character IDs to runtime ECS entities when players join
- migrations, recovery, and consistency rules for data that changes across sessions

##### World partitioning and distributed simulation
- the boundaries between world zones, instances, or server processes
- how to transfer entities and player ownership between server processes
- coordination of shared world events and avoid conflicting writes when multiple services interact with the same state
- interest management and visibility filtering to limit network traffic

##### Editor and developer tooling
- integration of workflows for creating levels, inspecting entities, tuning gameplay, and debugging network state
- in-game diagnostics for latency, replication, entity counts, and server performance
- repeatable local development environments that launch clients, dedicated servers, and supporting services together

<br>

## O3DE: strongest integrated networking foundation

<br>

**[O3DE](https://github.com/o3de/o3de)** is worth consideration for advanced high-fidelity 3D rendering and a networking framework integrated into the engine (O3DE has the most AAA-style tech). Plus, some of its strongest features are:

- Dedicated server runtime
- Multiplayer Gem with replication and server-authoritative networking
- C++ customization and modular Gems
- Extensive tooling for complex 3D applications

<br>

> *In Open 3D Engine (O3DE), the synchronization needed for multiplayer support is performed through multiplayer components. Like other components in O3DE, these are attached to entities. Multiplayer components can receive remote procedure calls (RPC), which are function calls from a remote source. Multiplayer components also define the data to be synchronized across the network. Each multiplayer component, normally generated as an auto-component, defines its own requirements for other data to be present and defines which functions are available. Some of the features offered in the O3DE Multiplayer Gem include: 1) Role-based synchronization and replication rules, 2) Local prediction and backwards reconciliation (“rollback”), and 3) Server-authoritative asynchronous multiplayer.*

<br>

In addition, here are some things that would need be implemented for this engine (integrated with NULLSTAR's TAYGETE and CELAENO):

##### Network-enabled game entities 
- which entities participate in multiplayer and which components expose networked properties
- configuration of network entity roles and ownership for players, NPCs, interactable objects, and other gameplay entities
- using O3DE's auto-component generation where appropriate, then implement the actual gameplay behavior

##### World zoning and large-scale server architecture
- the division between world regions, instances, and server processes
- routing and handoff mechanisms for players moving between regions
- interest management and update prioritization for large numbers of entities
- how to scale individual regions, recover failed processes, and maintain world ownership

<br>

## And for all engines...

<br>

#### ✨ Orchestration and Intelligence, integrated with NULLSTAR's TAYGETE, MEROPE, and CELAENO:

##### Gameplay and AI systems
- combat, quests, progression, world events, and game-specific rules using the engine's component and scripting systems
- AI decisions on the server and replicate the resulting actions to clients

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

<br>

#### ✨ MMO operations, integrated with NULLSTAR's ALCYONE: 

##### **Build and deployment**
- headless dedicated servers and package the binaries with their configuration and secrets
- deployment of pipelines that roll out updates through orchestration, scaling, graceful restarts, and rolling deployments
- management of engine modules (e.g., O3DE Gems), project dependencies, and custom engine code with end-to-end workflows

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

# 🎮 Engine-Architecture Integration

<br>

Let's end today's discussion with some eye candy: a diagram of how the infrastructure for MMO worlds can be organized into multiple layers:

<br>

![](/blog/assets/sterope_1.png)

<br>

And an *ever-growing* list of very good resources on building games and large-scale experiences:

- **[frozenfractal](https://frozenfractal.com)**
- **[heredragonsabound](https://heredragonsabound.blogspot.com/)**
- **[the godot-rust book](https://godot-rust.github.io/book/)**

<br>

---

### Until next time, my friend!

### ⬛