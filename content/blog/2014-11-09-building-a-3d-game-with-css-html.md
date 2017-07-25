---
title: Building a 3D Game with CSS + HTML
author: michael-bromley
type: post
date: 2014-11-09T21:06:16+00:00
aliases:
  - blog/298/building-a-3d-game-with-css-html
categories:
  - post
tags:
  - css
  - demo
  - html
  - JavaScript
  - web audio api

---
I have recently been exploring some of the lesser-used features of CSS - namely 3D transforms and animations. For a recent talk I gave at a local JavaScript user group, I put together [this demo](http://www.michaelbromley.co.uk/experiments/css-3d-butterfly/), and in doing so I became really curious about just how far the 3D capabilities of pure CSS could be pushed.

In searching around for examples, I came across the work of Keith Clark. In particular, he has put together two absolutely stunning demos of what can be achieved using pure CSS, in the form of a [FPS-style 3D world](http://keithclark.co.uk/labs/css-fps/) and this [shaded X-wing model](http://keithclark.co.uk/articles/calculating-element-vertex-data-from-css-transforms/demo6/). Inspired by these and a number of other [amazing demos on Codepen](http://codepen.io/search?q=css+3d&limit=all&depth=everything&show_forks=false), I decided to see if I could put together a working 3D game using only CSS, HTML and JavaScript. That is to say, I would only use CSS and HTML to draw everything you can see on the screen - _no images_, _no canvas_, _no WebGL_, _no SVG_.

Here is what the result looks like (click to open the actual game in a new tab) - **[CSS Space Shooter](http://www.michaelbromley.co.uk/experiments/css-space-shooter/)**:

{{< figure src="/media/2014/11/screenshot-02.jpg" title="Screenshot of CSS Space Shooter" >}}

## 

Since I wanted to stress the 3D capabilities of CSS, I decided on an old-school arcade-style shoot-em-up. I mean, you are _flying into the screen_ and aliens are _flying out of it_. You can't get much more 3D than that, right?

For the look and feel I took inspiration from the classic Atari game [Tempest ](http://en.wikipedia.org/wiki/Tempest_(video_game))- with its wire-frame 3D style and strong primary colour palette. The fact that this visual style also meant I didn't have to worry about shading was a nice side-effect.

## Why CSS?

Good question. Was  CSS designed for this kind of thing? Hell no! CSS, as we all well know, is for making button rollovers without needing JavaScript and for removing underlines from links. Would I recommend using CSS in place of more conventional web-based graphics technologies like canvas and WebGL? No - and I will expand on this a bit later. But still, I think it's cool to see just how powerful pure CSS can be, and there _are_ certain advantages to taking a CSS-only approach to 3D graphics.

## The Advantages

I'll start by saying that I'm no professional games or graphics programmer. My day job involves building web and business apps, but I just enjoy playing with canvas and other visual tools in my free time. With that in mind, the maths involved in real 3D programming is not my strong point. So the first advantage of CSS is that you can tell the browser to make something 3D without needing to know the implementation details, and - if the browser is [reasonably modern and compliant](http://caniuse.com/#feat=transforms3d) - it will oblige. Just like when you tell the browser via CSS to do a graduated colour fill, and you don't need to know _how_ to interpolate from one colour to another yourself.

<p class='codepen'  data-height='268' data-theme-id='8720' data-slug-hash='OPLQgx' data-default-tab='result' data-animations='run' data-editable='' data-embed-version='2'>
  See the Pen <a href="http://codepen.io/michaelbromley/pen/OPLQgx/">Simple 3D rotating squares</a> by Michael Bromley (<a href="http://codepen.io/michaelbromley">@michaelbromley</a>) on <a href="http://codepen.io">CodePen</a>.8720
</p>

That's the nature of a declarative language like CSS. Just say, "_Okay CSS_ (as we may one day be able to address it, in some future utopia), _rotate this div by 45 degrees on the x-axis and then translate it by 500px on the z-axis._" The browser will spit out a rotated, translated div, with nary a thought of "sin" or "cos" needing to trouble your mind. You can also nest elements and have them inherit the 3D orientation of their parent, allowing you to build up 3D objects which can then be controlled in 3D space by simply manipulating a few properties of the parent element. For an example of this principle in action, take a look at an [earlier article I wrote](http://www.michaelbromley.co.uk/blog/236/css-javascript-3d-butterfly-case-study) where I used this technique.

It is also the declarative nature of CSS that keeps it simple and therefore more approachable than learning canvas or WebGL. Every web developer knows at least some CSS. They know that a DOM element has a number of CSS properties that can be defined to determine the appearance of that element. Doing 3D stuff with CSS is no different from setting the text colour via the `color` property or setting the width or height of a div. And with astonishingly few lines of CSS, you can create very impressive 3D effects. This is no primer on 3D in CSS - if you want to get a feel for how it works, I highly recommend [David DeSandro's introduction article](http://desandro.github.io/3dtransforms/).

So at the very simple end of the 3D spectrum, CSS offers massive bang for your programming buck. So why aren't there more 3D games implemented with CSS? Well...

## The Problems

As cool as CSS 3D transforms and animations are, I stated earlier that I wouldn't recommend their use for serious 3D games. Here are some reasons why I came to this conclusion.

### Peg/Hole Disparity Problem

First - the obvious one. HTML is for making web pages. CSS is for styling them. To wrangle them into doing something like rendering a 3D game can be a fun hobby, but could also justifiably be labelled abuse. Let's take a look at some of the implications of that statement.

### Inherent Limitations

The very points I cited as advantages quickly turn into problems as you try to do anything reasonably complex. For example, if I wanted to draw anything other than a rectangle or an ellipse with CSS, I will have to start resorting to increasingly ugly hacks. So, you know, [triangles can be pretty useful in 3D graphics](http://stackoverflow.com/questions/6100528/why-are-there-always-triangles-used-in-a-3d-engine); yet in CSS the only "triangle" you will see is in fact [the space between two massive invisible borders](http://css-tricks.com/snippets/css/css-triangle/).

{{< figure src="/media/2014/11/css-triangle.png" title="Illustration of the CSS triangle hack as given in [this StackOverflow answer](http://stackoverflow.com/a/18293319/772859)." >}}

Another aspect of the declarative duo of CSS and HTML is that they do not fit so well with procedural or generative graphics techniques. In my game, I do need to generate objects on the fly - for example when new aliens are spawned - but to do this I just save a copy of the hard-coded alien DOM node and clone it back to the document whenever I need a new alien, which works quite well. If I wanted to programmatically change the shape of the alien, however, things would quickly become unwieldy with this approach.

Essentially, these are problems arising from trying to get something to do things that it wasn't really designed to do. A bit like those [impressive single div CSS drawings](http://a.singlediv.com/) you might have seen - more of a curiosity than anything you would consider using in your day job as a graphic designer, I would imagine. Same goes for this - I built it as an experiment, and that's how it should stay. I don't want to be held responsible for a new trend towards CSS for everything 3D. Especially not when we consider the next two problems.

### Performance

You might have heard about how using CSS 3D transforms allow you to leverage (there - I just used _that_ word) the GPU for better performance. This is true. However, it doesn't mean CSS will necessarily be more performant than the more conventional ways of rendering graphics. Not by a long shot. In my tests with this CSS Space Shooter, I get a pretty consistent 60 frames per second in Chrome running on my core i7 ultrabook as long as there are less than about 5 - 10 aliens on screen at once. Above that point, things start to slow down. In an earlier version, I had aliens exploding with an expanding ball of flame, which I achieved by animating the box-shadow property of the alien. While this looked pretty good, there was a noticeable slow-down every time an alien exploded, so I had to ditch that technique in favour of something a little simpler.

In Firefox, for whatever reason, performance is much worse, but I'll come to the browser issue next. In comparison, my canvas-based pseudo-3D [audio visualizer experiment](http://www.michaelbromley.co.uk/experiments/soundcloud-vis/#muse/undisclosed-desires) is vastly more complex in terms of on-screen objects, yet generally runs pretty smoothly across browsers.

### Browser Support

Another huge problem with this experiment is that it only seems to run properly in Chrome. Despite the fact that Firefox fully supports all the features I have used, on my machine at least, performance is terrible in that browser - sluggish frame rates followed by complete meltdown after a minute or two. Switching off the CSS animated grid yields a huge improvement, but it is still way worse than in Chrome. This is the other thing about declarative languages - you are forced to reply on whatever implementation the runtime environment can supply, which in the case of browsers and CSS, has a sorry history of inconsistency.

In Internet Explorer the game won't load at all. However, this is due to lack of support for the Web Audio API (more on that later), rather than the CSS stuff. If it did load, however, it would look terrible anyway, since IE (the current version being 11 at this time) does not support a key property - transform-style: preserve3d - which is needed to construct a scene consisting of many objects which all share the same 3D space.

I have a Windows machine but I have been told that the game doesn't work on Safari 7.1 on Mac either.

So I'm sorry, but I've had to add a "Works best in <span style="text-decoration: line-through;">Internet Explorer</span> Google Chrome"-type banner to the game, just so people on other browsers don't think I am worse at programming than I actually am.

## The Web Audio API

This section has absolutely nothing to do with CSS or graphics, but I just wanted to write a short mention of just how cool the Web Audio API is. I use it in this game for both the incidental sound effects and the background music. I basically learned everything I needed about it from a couple of articles on Html5Rocks:

  * [Getting Started with Web Audio API](http://www.html5rocks.com/en/tutorials/webaudio/intro/)
  * [Developing Game Audio with the Web Audio API](http://www.html5rocks.com/en/tutorials/webaudio/games/)

With very little code, I was able to make sound effects that pan as the source of the sound moves relative to the player, and even simulate doppler effects consistent with the velocity of objects!

For the background music, I just stole a bit of code from my earlier SoundCloud visualizer project, and also piped it through the Web Audio API so that I could make the blue colouring effect at the screen edges react to the music. For a little more on how this effect is achieved, see [this earlier article I wrote on the topic](http://www.michaelbromley.co.uk/blog/42/audio-visualization-with-web-audio-canvas-and-the-soundcloud-api).

If you are interested, the music is the second movement of Beethoven's 7th symphony. I'd like to say that it's an old favourite that I drew from my impressive knowledge of all things refined and cultured. But no. I actually heard it recently while watching the [Nicholas Cage movie "Knowing"](http://www.rottentomatoes.com/m/knowing/) where it is used as a central motif. It is the best thing about that entire movie.

## Conclusion

My main lessons from this exercise:

  1. Yes, CSS is surprisingly powerful and viable for simple 3D graphics.
  2. No, don't use it for 3D games.
  3. I need to learn more about the Web Audio API.

And lastly, make sure you [try out the game](http://www.michaelbromley.co.uk/experiments/css-space-shooter/)! Remember to use Chrome!

See if you can complete it - there are only 10 stages. If you do, let me know [@michlbrmly](https://twitter.com/michlbrmly) - you'll get major kudos from me because the last couple of stages get pretty bloody hard.

Some further reading and resources:

  * [WebGL vs CSS 3D Transforms](http://blog.teamtreehouse.com/3d-in-the-browser-webgl-versus-css-3d-transforms) - a blog post by Nick Pettit which covers some of the same ground as I do in this one, but with more of an overview of the current state of each technology.
  * [Creating 3D Worlds with HTML and CSS](http://keithclark.co.uk/articles/creating-3d-worlds-with-html-and-css/) - Blog post by Keith Clark about how he did the FPS demo. Goes into the implementation details in-depth. This guy knows what he is doing far more than I.
  * [Tridiv](http://tridiv.com/) - A tool for creating 3D models in CSS. Some really impressive demos on the home page.
  * [Interactive 3D transforms](http://css3.bradshawenterprises.com/transforms/) - play about with various settings to get a feel for how 3D objects can be constructed out of CSS and DOM.

&nbsp;