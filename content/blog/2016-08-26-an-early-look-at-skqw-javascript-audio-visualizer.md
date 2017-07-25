---
title: 'An Early Look at SKQW: JavaScript Audio Visualizer'
author: michael-bromley
type: post
date: 2016-08-26T08:25:07+00:00
aliases:
  - blog/541/an-early-look-at-skqw-javascript-audio-visualizer
categories:
  - post
tags:
  - Angular 2
  - canvas
  - creative coding
  - JavaScript
  - open source
  - TypeScript

---
SKQW (pronounced "skew") is a native desktop audio visualization application written in TypeScript with Angular 2, and implemented on the Electron framework.

{{< youtube OD636XmkRQ4 >}}

It is **currently in alpha** and a compiled binary only exists for Windows, but I'm hoping that - if there is interest - I can push the project forward and improve stability, features and of course bring full support to Mac OS X and Linux.

If you want to check out the project itself, [go to the SKQW website][1]. If you are not using Windows and know how to, feel free to have a go at building from source and send me feedback so I can update the docs.

If you are interested in my ramblings on the background and future direction of this project, read on…

## Origins

Let me take you back to the late 1990s. With the help of Napster and Limewire, I was building up my illicit mp3 collection. To enjoy the sweet sounds of Fatboy Slim, Beatie Boys and Eagle Eye Cherry, I of course used Winamp. For those of you who are not old enough to remember, Winamp was basically the perfect audio player. Small, simple, extensible and (at least in the beginning) without bloat. It's changed since then, so I'm not if it is still any good.

The popularity of Winamp spawned a whole ecosystem of skins and plugins, including some incredible visualization plugins such as those made by [Ryan Geiss][2]: Geiss and Milkdrop. Whenever I had Winamp playing (which was most of the time), I had a visualization window open pumping out some crazy, trippy visuals. Since then I've had a fascination with audio visualizations and creative coding in general, but up until recently, I had no clue about how to create them myself.

{{< figure src="/media/2016/08/geiss-1024x640.jpg" title="Screenshot from Geiss for Winamp" >}}

## JavaScript and Canvas

Fast forward to 2014. I've learned some JavaScript and discovered the HTML Canvas element! Previously I had never got into computer graphics because of the relatively high barrier to entry (perceived, at least). But I was already familiar with JavaScript, and nothing could be simpler than writing some code and then running it in a browser. I wrote a [browser-based audio visualizer][3] which hinted at some of the creative possibilities and simplicity of writing visualizations in JavaScript.

While this was a nice experiment, it was rather limited. What I really wanted to build was a general audio visualizer which

  1. was not tied to any particular player or platform
  2. would be simple to create visualizations for.

My early experimentation involved a node-based server which would read raw sound card data and then stream this data over a websocket to a browser. I built a [working prototype][4] this way, but it performed poorly with severe latency and heavy CPU usage; and was not at all user friendly.

## Electron and Hackable Everything

I ditched the project as nonviable until earlier this year when I started to investigate [Electron][5]. For those who don't know, Electron is a project which bundles Node.js and Chromium (the browser engine behind Chrome) into a single package, which means we can now create native desktop applications using all our familiar web technologies! Electron has seen huge adoption, with major projects such as the [Atom][6] and [VS Code][7] editors being built on top of it.

A huge draw for the Electron platform is the fact that, since apps are built with common web technologies - HTML, CSS, JavaScript - they become very easily "hackable" or user-extensible. Examples include themes and packages for the Atom editor and extensions for Hyperterm (seriously, just check out the [Hyperterm demo video][8]).

I soon realized that Electron was the way forward. I resurrected the abandoned SKQW project and rewrote it on top of Electron. The results are exactly as I had envisioned: Fast, simple and easily extensible. If you know JavaScript, you can write a SKQW visualization.

{{< figure src="/media/2016/08/skqw-screenshot-01.png" title="A simple visualization running in SKQW" >}}

## Future Plans

I write SKQW in my free time. I have [written before][9] about how I don't have a whole lot of it. But I intend to keep developing the project, if nothing else than for my own amusement. Here are some ideas I have:

  1.  There are a few features already in the pipeline which I have [started listing on GitHub][10] (presets, improved dev tooling, etc). Feature requests and suggestions are welcome!
  2. I want to learn Three.js properly (so far I just made a spinning green cube), and write some more sophisticated Web GL-based visualizations.
  3. I'm hoping that, if there is enough interest, other more talented people will run with the idea, and perhaps we can even get a community of creative coders writing visualizations and sharing their work for everyone to enjoy.
  4. To that end, I intend to expand the developer docs to include a bunch of "recipes" that I have figured out that are useful in writing visualizations.
  5. I need to find a solution for OS X & Linux releases. This might just mean convincing a couple of people at work to let me use their computer whenever I need to cut a new release. If anyone knows of another solution for compiling native Node addons, please let me know!

 [1]: http://michaelbromley.github.io/skqw/
 [2]: http://www.geisswerks.com/
 [3]: https://github.com/michaelbromley/soundcloud-visualizer
 [4]: https://github.com/michaelbromley/skqw/tree/5dc5ace0ba4e6aa3d673516ecc3092907057519c
 [5]: http://electron.atom.io/
 [6]: https://atom.io/
 [7]: https://code.visualstudio.com/
 [8]: https://hyperterm.org/
 [9]: http://www.michaelbromley.co.uk/blog/529/why-i-havent-fixed-your-issue-yet
 [10]: https://github.com/michaelbromley/skqw/issues