---
title: Building a 3D Game with CSS + HTML
author: michael-bromley
type: post
date: 2014-11-09T21:06:16+00:00
url: /298/building-a-3d-game-with-css-html
categories:
  - post
tags:
  - css
  - demo
  - html
  - JavaScript
  - web audio api

---
I have recently been exploring some of the lesser-used features of CSS &#8211; namely 3D transforms and animations. For a recent talk I gave at a local JavaScript user group, I put together <a href="http://www.michaelbromley.co.uk/experiments/css-3d-butterfly/" target="_blank">this demo</a>, and in doing so I became really curious about just how far the 3D capabilities of pure CSS could be pushed.

In searching around for examples, I came across the work of Keith Clark. In particular, he has put together two absolutely stunning demos of what can be achieved using pure CSS, in the form of a <a href="http://keithclark.co.uk/labs/css-fps/" target="_blank">FPS-style 3D world</a> and this <a href="http://keithclark.co.uk/articles/calculating-element-vertex-data-from-css-transforms/demo6/" target="_blank">shaded X-wing model</a>. Inspired by these and a number of other <a href="http://codepen.io/search?q=css+3d&limit=all&depth=everything&show_forks=false" target="_blank">amazing demos on Codepen</a>, I decided to see if I could put together a working 3D game using only CSS, HTML and JavaScript. That is to say, I would only use CSS and HTML to draw everything you can see on the screen &#8211; _no images_, _no canvas_, _no WebGL_, _no SVG_.

Here is what the result looks like (click to open the actual game in a new tab) &#8211; **<a href="http://www.michaelbromley.co.uk/experiments/css-space-shooter/" target="_blank">CSS Space Shooter</a>**:

<div id="attachment_294" style="width: 1010px" class="wp-caption aligncenter">
  <a href="http://www.michaelbromley.co.uk/experiments/css-space-shooter/" target="_blank"><img class="wp-image-294 size-full" src="/media/2014/11/screenshot-02.jpg" alt="Screenshot of CSS Space Shooter" width="1000" height="676" srcset="/media/2014/11/screenshot-02.jpg 1000w, /media/2014/11/screenshot-02-300x202.jpg 300w" sizes="(max-width: 1000px) 100vw, 1000px" /></a>
  
  <p class="wp-caption-text">
    Screenshot of CSS Space Shooter
  </p>
</div>

## 

Since I wanted to stress the 3D capabilities of CSS, I decided on an old-school arcade-style shoot-em-up. I mean, you are _flying into the screen_ and aliens are _flying out of it_. You can&#8217;t get much more 3D than that, right?

For the look and feel I took inspiration from the classic Atari game <a href="http://en.wikipedia.org/wiki/Tempest_(video_game)" target="_blank">Tempest </a>&#8211; with its wire-frame 3D style and strong primary colour palette. The fact that this visual style also meant I didn&#8217;t have to worry about shading was a nice side-effect.

## Why CSS?

Good question. Was  CSS designed for this kind of thing? Hell no! CSS, as we all well know, is for making button rollovers without needing JavaScript and for removing underlines from links. Would I recommend using CSS in place of more conventional web-based graphics technologies like canvas and WebGL? No &#8211; and I will expand on this a bit later. But still, I think it&#8217;s cool to see just how powerful pure CSS can be, and there _are_ certain advantages to taking a CSS-only approach to 3D graphics.

## The Advantages

I&#8217;ll start by saying that I&#8217;m no professional games or graphics programmer. My day job involves building web and business apps, but I just enjoy playing with canvas and other visual tools in my free time. With that in mind, the maths involved in real 3D programming is not my strong point. So the first advantage of CSS is that you can tell the browser to make something 3D without needing to know the implementation details, and &#8211; if the browser is <a href="http://caniuse.com/#feat=transforms3d" target="_blank">reasonably modern and compliant</a> &#8211; it will oblige. Just like when you tell the browser via CSS to do a graduated colour fill, and you don&#8217;t need to know _how_ to interpolate from one colour to another yourself.

<p class='codepen'  data-height='268' data-theme-id='8720' data-slug-hash='OPLQgx' data-default-tab='result' data-animations='run' data-editable='' data-embed-version='2'>
  See the Pen <a href="http://codepen.io/michaelbromley/pen/OPLQgx/">Simple 3D rotating squares</a> by Michael Bromley (<a href="http://codepen.io/michaelbromley">@michaelbromley</a>) on <a href="http://codepen.io">CodePen</a>.8720
</p>

That&#8217;s the nature of a declarative language like CSS. Just say, &#8220;_Okay CSS_ (as we may one day be able to address it, in some future utopia), _rotate this div by 45 degrees on the x-axis and then translate it by 500px on the z-axis._&#8221; The browser will spit out a rotated, translated div, with nary a thought of &#8220;sin&#8221; or &#8220;cos&#8221; needing to trouble your mind. You can also nest elements and have them inherit the 3D orientation of their parent, allowing you to build up 3D objects which can then be controlled in 3D space by simply manipulating a few properties of the parent element. For an example of this principle in action, take a look at an <a href="http://www.michaelbromley.co.uk/blog/236/css-javascript-3d-butterfly-case-study" target="_blank">earlier article I wrote</a> where I used this technique.

It is also the declarative nature of CSS that keeps it simple and therefore more approachable than learning canvas or WebGL. Every web developer knows at least some CSS. They know that a DOM element has a number of CSS properties that can be defined to determine the appearance of that element. Doing 3D stuff with CSS is no different from setting the text colour via the `color` property or setting the width or height of a div. And with astonishingly few lines of CSS, you can create very impressive 3D effects. This is no primer on 3D in CSS &#8211; if you want to get a feel for how it works, I highly recommend <a href="http://desandro.github.io/3dtransforms/" target="_blank">David DeSandro&#8217;s introduction article</a>.

So at the very simple end of the 3D spectrum, CSS offers massive bang for your programming buck. So why aren&#8217;t there more 3D games implemented with CSS? Well&#8230;

## The Problems

As cool as CSS 3D transforms and animations are, I stated earlier that I wouldn&#8217;t recommend their use for serious 3D games. Here are some reasons why I came to this conclusion.

### Peg/Hole Disparity Problem

First &#8211; the obvious one. HTML is for making web pages. CSS is for styling them. To wrangle them into doing something like rendering a 3D game can be a fun hobby, but could also justifiably be labelled abuse. Let&#8217;s take a look at some of the implications of that statement.

### Inherent Limitations

The very points I cited as advantages quickly turn into problems as you try to do anything reasonably complex. For example, if I wanted to draw anything other than a rectangle or an ellipse with CSS, I will have to start resorting to increasingly ugly hacks. So, you know, <a href="http://stackoverflow.com/questions/6100528/why-are-there-always-triangles-used-in-a-3d-engine" target="_blank">triangles can be pretty useful in 3D graphics</a>; yet in CSS the only &#8220;triangle&#8221; you will see is in fact <a href="http://css-tricks.com/snippets/css/css-triangle/" target="_blank">the space between two massive invisible borders</a>.

<div id="attachment_303" style="width: 310px" class="wp-caption aligncenter">
  <a href="/media/2014/11/css-triangle.png"><img class="size-full wp-image-303" src="/media/2014/11/css-triangle.png" alt="Illustration of the CSS triangle hack as given in this StackOverflow answer." width="300" height="200" /></a>
  
  <p class="wp-caption-text">
    Illustration of the CSS triangle hack as given in <a href="http://stackoverflow.com/a/18293319/772859" target="_blank">this StackOverflow answer</a>.
  </p>
</div>

Another aspect of the declarative duo of CSS and HTML is that they do not fit so well with procedural or generative graphics techniques. In my game, I do need to generate objects on the fly &#8211; for example when new aliens are spawned &#8211; but to do this I just save a copy of the hard-coded alien DOM node and clone it back to the document whenever I need a new alien, which works quite well. If I wanted to programmatically change the shape of the alien, however, things would quickly become unwieldy with this approach.

Essentially, these are problems arising from trying to get something to do things that it wasn&#8217;t really designed to do. A bit like those <a href="http://a.singlediv.com/" target="_blank">impressive single div CSS drawings</a> you might have seen &#8211; more of a curiosity than anything you would consider using in your day job as a graphic designer, I would imagine. Same goes for this &#8211; I built it as an experiment, and that&#8217;s how it should stay. I don&#8217;t want to be held responsible for a new trend towards CSS for everything 3D. Especially not when we consider the next two problems.

### Performance

You might have heard about how using CSS 3D transforms allow you to leverage (there &#8211; I just used _that_ word) the GPU for better performance. This is true. However, it doesn&#8217;t mean CSS will necessarily be more performant than the more conventional ways of rendering graphics. Not by a long shot. In my tests with this CSS Space Shooter, I get a pretty consistent 60 frames per second in Chrome running on my core i7 ultrabook as long as there are less than about 5 &#8211; 10 aliens on screen at once. Above that point, things start to slow down. In an earlier version, I had aliens exploding with an expanding ball of flame, which I achieved by animating the box-shadow property of the alien. While this looked pretty good, there was a noticeable slow-down every time an alien exploded, so I had to ditch that technique in favour of something a little simpler.

In Firefox, for whatever reason, performance is much worse, but I&#8217;ll come to the browser issue next. In comparison, my canvas-based pseudo-3D <a href="http://www.michaelbromley.co.uk/experiments/soundcloud-vis/#muse/undisclosed-desires" target="_blank">audio visualizer experiment</a> is vastly more complex in terms of on-screen objects, yet generally runs pretty smoothly across browsers.

### Browser Support

Another huge problem with this experiment is that it only seems to run properly in Chrome. Despite the fact that Firefox fully supports all the features I have used, on my machine at least, performance is terrible in that browser &#8211; sluggish frame rates followed by complete meltdown after a minute or two. Switching off the CSS animated grid yields a huge improvement, but it is still way worse than in Chrome. This is the other thing about declarative languages &#8211; you are forced to reply on whatever implementation the runtime environment can supply, which in the case of browsers and CSS, has a sorry history of inconsistency.

In Internet Explorer the game won&#8217;t load at all. However, this is due to lack of support for the Web Audio API (more on that later), rather than the CSS stuff. If it did load, however, it would look terrible anyway, since IE (the current version being 11 at this time) does not support a key property &#8211; transform-style: preserve3d &#8211; which is needed to construct a scene consisting of many objects which all share the same 3D space.

I have a Windows machine but I have been told that the game doesn&#8217;t work on Safari 7.1 on Mac either.

So I&#8217;m sorry, but I&#8217;ve had to add a &#8220;Works best in <span style="text-decoration: line-through;">Internet Explorer</span> Google Chrome&#8221;-type banner to the game, just so people on other browsers don&#8217;t think I am worse at programming than I actually am.

## The Web Audio API

This section has absolutely nothing to do with CSS or graphics, but I just wanted to write a short mention of just how cool the Web Audio API is. I use it in this game for both the incidental sound effects and the background music. I basically learned everything I needed about it from a couple of articles on Html5Rocks:

  * <a href="http://www.html5rocks.com/en/tutorials/webaudio/intro/" target="_blank">Getting Started with Web Audio API</a>
  * <a href="http://www.html5rocks.com/en/tutorials/webaudio/games/" target="_blank">Developing Game Audio with the Web Audio API</a>

With very little code, I was able to make sound effects that pan as the source of the sound moves relative to the player, and even simulate doppler effects consistent with the velocity of objects!

For the background music, I just stole a bit of code from my earlier SoundCloud visualizer project, and also piped it through the Web Audio API so that I could make the blue colouring effect at the screen edges react to the music. For a little more on how this effect is achieved, see <a href="http://www.michaelbromley.co.uk/blog/42/audio-visualization-with-web-audio-canvas-and-the-soundcloud-api" target="_blank">this earlier article I wrote on the topic</a>.

If you are interested, the music is the second movement of Beethoven&#8217;s 7th symphony. I&#8217;d like to say that it&#8217;s an old favourite that I drew from my impressive knowledge of all things refined and cultured. But no. I actually heard it recently while watching the <a href="http://www.rottentomatoes.com/m/knowing/" target="_blank">Nicholas Cage movie &#8220;Knowing&#8221;</a> where it is used as a central motif. It is the best thing about that entire movie.

## Conclusion

My main lessons from this exercise:

  1. Yes, CSS is surprisingly powerful and viable for simple 3D graphics.
  2. No, don&#8217;t use it for 3D games.
  3. I need to learn more about the Web Audio API.

And lastly, make sure you <a href="http://www.michaelbromley.co.uk/experiments/css-space-shooter/" target="_blank">try out the game</a>! Remember to use Chrome!

See if you can complete it &#8211; there are only 10 stages. If you do, let me know <a href="https://twitter.com/michlbrmly" target="_blank">@michlbrmly</a> &#8211; you&#8217;ll get major kudos from me because the last couple of stages get pretty bloody hard.

Some further reading and resources:

  * <a href="http://blog.teamtreehouse.com/3d-in-the-browser-webgl-versus-css-3d-transforms" target="_blank">WebGL vs CSS 3D Transforms</a> &#8211; a blog post by Nick Pettit which covers some of the same ground as I do in this one, but with more of an overview of the current state of each technology.
  * <a href="http://keithclark.co.uk/articles/creating-3d-worlds-with-html-and-css/" target="_blank">Creating 3D Worlds with HTML and CSS</a> &#8211; Blog post by Keith Clark about how he did the FPS demo. Goes into the implementation details in-depth. This guy knows what he is doing far more than I.
  * <a href="http://tridiv.com/" target="_blank">Tridiv</a> &#8211; A tool for creating 3D models in CSS. Some really impressive demos on the home page.
  * <a href="http://css3.bradshawenterprises.com/transforms/" target="_blank">Interactive 3D transforms</a> &#8211; play about with various settings to get a feel for how 3D objects can be constructed out of CSS and DOM.

&nbsp;