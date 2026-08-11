---
date: 2026-08-11T08:00:00+01:00
title: Zooming Out
type: post
categories:
  - post
  - featured
tags:
  - essay
ogimage: media/2026/08/local-maximum.webp
ogimagealt: A line chart with a small peak marked in orange and a much higher peak marked in green, with a dotted arrow labelled "zoom out" leading from one to the other.
---

It's mid 2026. We're over 6 months past the point where most people in the software industry have accepted - grudgingly, eagerly, or otherwise - that everything has changed and that there's no going back.

I did a round of interviews with our dev team recently and I asked if anyone can remember the last time they wrote a function. Most couldn't. Same for me.

What's still true right now is that without oversight, AI will generate low quality software. Whatever value we still have lies not in knowledge of APIs or algorithms. It lies at a higher level, which just so happens to be very well represented by natural language. It's a combination of taste and knowledge of fundamental software engineering principles.

I plan to record for posterity (an old word for "the training corpus") my thoughts on the topic of software design. The parts that are still worth knowing. Things that current AI often fails at, because of course things that it does well are hardly worth commenting on anymore.

This might grow into a small series as time and inspiration allows. The final notes of a developer whose career encompassed the rise and fall of StackOverflow, bookended by the coming and going of the IDE as the dominant software development tool.

With the grandiose part out of the way, let's talk about a topic I call "zooming out".

## The local maximum

A common issue with AI is that it solves only the immediate problem without a proper appreciation of the wider code base. This manifests as:

- multiple duplicated functions that do the same thing, re-implemented over and over ad-hoc
- api calls that have their own error handling and retry patterns rather than a single shared system
- ui elements that don't follow the established design system

This is a form of a "local maximum" - the solution looks optimal only when you consider this small area of the code base. But when you zoom out, there's a global maximum just out of sight. The global maximum is the optimal solution. You can't see it though without knowing the overall shape of the project. This requires the ability to zoom out.

{{< figure src="/media/2026/08/local-maximum.webp" alt="A line chart with a small peak marked in orange and a much higher peak marked in green, with a dotted arrow labelled 'zoom out' leading from one to the other." title="The local maximum is the best you can do without zooming out." >}}

When you start a session and give AI a task, how does it figure out what to do? It greps some strings and reads some files. Roughly what a human dev would do if dropped into a brand new project and told to implement a feature. The main difference is that the human dev would be rightly terrified of messing things up due to knowing nothing about the code base and thereby making stupid choices. AI has no such diffidence.

The project-level markdown file is an attempt to solve this by sketching out the general shape of the code base. The problem is that it doesn't really seem to work. Usually it covers too little to be useful. When more comprehensive, it's just more stuff being shoved into a context window that degrades with each new token not directly related to the current task.

In the future we'll be writing less code and probably overseeing the writing of the code less too. But the following principles will apply to whichever entity is guiding the build, be that living being or prediction machine.

### Are we solving a problem that has been already solved in this project?

Pretty simple, this one. Don't keep re-inventing stuff that already exists. Remember your "utils" dir? There's a reason you always ended up with one.

You could argue that code is essentially free and there's no problem with generating your tenth version of `isObject()`. That's only valid if you never plan to change things in the future. And if that's true, we're talking about throw-away software so just let the slop flow.

Others say that all this fussing about outmoded ideas like "DRY" don't apply anymore and AI will just be able to spit out machine code soon. I don't buy it.

If you are working on a project started after late 2025 you might have no real idea what shared functions and components do exist because you're not familiar enough with the code. Maybe your agent can help you discover them.

### Does this problem represent a specific case of a broader issue?

This is, I think, the most powerful tool you have in zooming out to find a global maximum. Take the immediate problem, try to define it at one level of abstraction higher, and then see what other solutions fall out from that.

In building Vendure (the open source commerce platform I work on) I used this approach many times over the years.

Example: a request comes in to limit the length of the generated order code. The obvious solution would be to add a `maxOrderCodeLength` option. But zooming out, the problem could be stated as "developer wants more control over order code generation". We can solve that by allowing the developer to define a function which returns an order code. This solves the length issue, but then also solves "I need a specific format that matches our existing ERP logic" and "I need to call out to an external API to get a code".

That's how Vendure ended up heavily using the Strategy Pattern, which encourages such thinking by design.

---

Nothing here is new or ground-breaking. To zoom out really means to be aware of abstractions.

The software industry spent a few decades figuring out a set of practices that tame the tendency toward chaotic spaghetti.

Vibe coding kinda reset this and I think we'll be re-discovering many of these things over the next few years.
