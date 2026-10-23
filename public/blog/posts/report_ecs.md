---
title: 🏄‍♀️ REPORT → A Ride Through Entity Component System
subtitle: In which all computer code is essentially a series of data transformations.
date: 2026; 10; 21
---

> [🎶](https://www.youtube.com/watch?v=xWF2IuEO2nw) *"Fantasy is escapist, and that is its glory."* — Ursula K. Le Guin on The Language of the Night

> [🎧](https://www.youtube.com/watch?v=-7IPRCHlkyc) *"In every real man a child is hidden that wants to play."* — Friedrich Nietzsche on Thus Spoke Zarathustra

> [🎼](https://www.youtube.com/watch?v=ndXbWP_cgKU) *"I have a binary rule for publishing writings: either you take your time to make sure it's perfect, or you put it out fast and iterate publicly, like in open-source development. The first is perfectionism; the second is pragmatism."* — Marina von Steinkirch

<br>

![](/blog/assets/wade.jpg)

<br>

Hello there, my dear anon. Continuing our informal discussion from **[earlier this week](https://marina.nullstar.fun/pages/post.html?post=report_oss_game_engines)** about **[NULLSTAR](https://www.nullstar.games/)**'s **[PleiadesOS:STEROPE](https://marina.nullstar.fun/pages/post.html?post=idea_nullstar)**, today we're going to dive a little into a topic we only briefly mentioned: **[Entity Component Systems (ECS)](https://en.wikipedia.org/wiki/Entity_component_system)**.

As we read through today's material, please remember our rules:

**🤖 If these notes look cool to you, it's your ✦moral duty✦ to read the original resources.**
**🤖 Just another blog, but not your usual blog: they're living notes that I change as I fancy.**

<br>

---

# 🦴 A General Mental Model

<br>

From **[ecs-faq](https://github.com/SanderMertens/ecs-faq)**, *ECS describes a design approach which promotes code reusability by separating data from behavior. Data is often stored in cache-friendly ways which benefit performance, so that ECS can typically support larger numbers of simulation objects.*

More specifically, ECS separates three things that **[object-oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming)** often bundles together:

1️⃣ Entity: identity (a unique identifier for something in the world; the behavior of an entity can be changed at runtime; it can contain zero or more components)
2️⃣ Component: data without logic (a small piece of state attached to an entity; such as position, velocity, inventory, etc.; implementations typically use structs, classes, or associative arrays)
3️⃣ System: logic for behavior (code that processes entities with the relevant components)

<br>

This means that:

- The behavior comes from composition (over inheritance), and it can be changed at runtime by adding or removing components. This avoids deep class hierarchies and **[the diamond problem](https://en.wikipedia.org/wiki/Multiple_inheritance#The_diamond_problem)**.
- For example, instead of a class `Troll` extends `Monster` extends `Entity`, a troll is an `ID` with `Position` + `Velocity` + `AI`... 
- Components of the same type are stored contiguously, so systems iterate over tightly packed arrays (maximizes CPU cache locality and decouples data from behavior). This is data-oriented design, making it ideal for multiplayer and high-performance simulations. 

<br>

> 💡 *ECS is commonly associated with **[data-oriented design (DOD)](https://www.youtube.com/watch?v=0_Byw9UMn9g)**, a software design philosophy that emphasizes data layout and memory access patterns as primary design concerns. DOD focuses on how data is laid out in RAM: when components of the same type are stored contiguously in memory arrays, the CPU loads them into its cache efficiently, drastically reducing cache misses during iteration.*

<br>

---

# 🦴 A Rusty Example

<br>

Let's model a very simple simulation *from one of the main robots*, with a player and an NPC using **[bevy_ecs API](https://docs.rs/bevy_ecs/latest/bevy_ecs/)**. Both entities have positions and velocities, but only the player has a mutable quantity called `entropy`.

First, components are normal Rust structs. Specific instances of components correlate to entities:

```
use bevy_ecs::prelude::*;

#[derive(Component, Debug)]
struct Position {
    x: f32,
    y: f32,
}

#[derive(Component)]
struct Velocity {
    x: f32,
    y: f32,
}

#[derive(Component)]
struct Entropy(u32);

#[derive(Component)]
struct Player;

#[derive(Component)]
struct Npc;
```

<br>

Systems are normal Rust functions that run in parallel with each other:

```
// Processes every entity that has Position + Velocity.
fn movement_system(mut query: Query<(&mut Position, &Velocity)>) {
    for (mut position, velocity) in &mut query {
        position.x += velocity.x;
        position.y += velocity.y;
    }
}

// Processes only entities that have Entropy.
fn entropy_system(query: Query<(Entity, &Entropy)>) {
    for (entity, entropy) in &query {
        println!("Entity {:?}: Entropy = {}", entity, entropy.0);
    }
}
```

<br>

Entities, components, and resources are stored in a `World`, which are like `std::collections`’s `HashSet` and `Vec`, and they expose operations to insert, read, write, and remove the data they store:

```
fn main() {
    let mut world = World::new();

    (all the code below)
}
```

<br>

Entities are unique identifiers that correlate to zero or more components:

```
// An entity is an ID with a collection of components.
let player = world
        .spawn((
            Player,
            Position { x: 0.0, y: 0.0 },
            Velocity { x: 1.0, y: 0.5 },
            Entropy(100),
        ))
        .id();

let npc = world
        .spawn((
            Npc,
            Position { x: 10.0, y: 10.0 },
            Velocity { x: -1.0, y: 0.0 },
        ))
        .id();
```

<br>

Schedules run a set of systems according to some execution strategy (built in "parallel executor", running as many of them in parallel as possible):

```
// A Schedule executes systems against the World.
let mut schedule = Schedule::default();
schedule.add_systems((movement_system, entropy_system));

// Run one simulation tick.
schedule.run(&mut world);

// Inspect the updated state.
let position = world.get::<&Position>(player).unwrap();
println!("Player position: ({}, {})", position.x, position.y);

let position = world.get::<&Position>(npc).unwrap();
println!("NPC position: ({}, {})", position.x, position.y);
```

<br>

Things to note:

- There is no inheritance: the NPC and the player share movement capabilities without a common base class.
- Queries define membership: adding or removing a component changes which systems match an entity.
- The schedule defines execution: systems can run independently and if one system depends on another’s output, the ordering requirement must be expressed.

<br>

**[How do I design for ECS?](https://github.com/SanderMertens/ecs-faq#how-do-i-design-for-ecs)**

- How many instances of the data will exist?
- How often is data accessed?
- How often is the data mutated?
- When does data need to be accessed/mutated?
- Which data is accessed/mutated together?
- What is the cardinality of the data (the number of entities, components, component instances, or possible combinations of component types in the world)?
- Do the components and systems have single responsibilities?

<br>

![](/blog/assets/ecs.png)

<br>

---

## 🦴 Further References

<br>

Let's end today's discussion with an *ever-growing* list of good resources on building ECS:

- **[Awesome ECS](https://github.com/jslee02/awesome-entity-component-system)**
- **[Data Oriented Design Book](https://www.dataorienteddesign.com/dodbook/)**
- **[Data Oriented Design Resources](https://github.com/dbartolini/data-oriented-design)**
- **[shipyard: ECS focused on usability and speed (Rust)](https://github.com/leudz/shipyard)**
- **[hecs: a high-performance, minimalist ECS world (Rust)](https://github.com/Ralith/hecs)**
- **[specs: ECS for easy parallelism, high flexibility, high performance (Rust)](https://github.com/amethyst/specs)** (**[book](https://amethyst.github.io/specs/docs/tutorials/)**)
- **[legion: feature rich high performance ECS library (Rust)](https://github.com/amethyst/legion)**
- **[entt: fast and reliable ECS (C++)](https://github.com/skypjack/entt)**
- **[flecs: fast ECS to build simulations with millions of entities (C/C++)](https://github.com/SanderMertens/flecs)**
- **[Unity's Entity Component System Samples](https://github.com/Unity-Technologies/EntityComponentSystemSamples)**
- **[Google's Rust Style Guide](https://google.github.io/styleguide/rustguide.html)**

<br>

---

### Until next time, my friend!

### ⬛
