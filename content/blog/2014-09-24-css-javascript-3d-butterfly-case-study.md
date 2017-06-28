---
title: 'CSS + JavaScript 3D Butterfly: A Case Study'
author: michael-bromley
type: post
date: 2014-09-24T05:39:39+00:00
url: /236/css-javascript-3d-butterfly-case-study
categories:
  - post
tags:
  - code
  - css
  - demo
  - JavaScript

---
I&#8217;ve recently been having lots of fun with CSS 3D transforms and animations. As part of a demo for a talk I am giving at the ViennaJS meetup group this month, I put together a demo that showcases how some fairly sophisticated 3D effects can be achieved with pure CSS, and made interactive with a little JavaScript.

_Note: The 3D effect is not currently supported by Internet Explorer. _

<a title="CSS 3D Butteryfly Demo" href="http://www.michaelbromley.co.uk/experiments/css-3d-butterfly/" target="_blank"><img class="aligncenter size-full wp-image-251" src="http://www.michaelbromley.co.uk/api/wp-content/uploads/2014/09/css-butterfly.jpg" alt="CSS 3D Butterfly demo" width="865" height="546" srcset="http://www.michaelbromley.co.uk/api/wp-content/uploads/2014/09/css-butterfly.jpg 865w, http://www.michaelbromley.co.uk/api/wp-content/uploads/2014/09/css-butterfly-300x189.jpg 300w" sizes="(max-width: 865px) 100vw, 865px" /></a>
  
<a class="pure-button" href="http://www.michaelbromley.co.uk/experiments/css-3d-butterfly/" target="_blank">View The Demo</a>

## The Markup

Here is the entire HTML code for the butterfly:

<pre>&lt;div class="container"&gt;
    &lt;div class="hover-container"&gt;
        &lt;div class="left wing"&gt;&lt;/div&gt;
        &lt;div class="right wing"&gt;&lt;/div&gt;
        &lt;div class="body"&gt;&lt;/div&gt;
        &lt;div class="head"&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
</pre>

  * The `.container` div is as it sounds &#8211; it contains everything and it is the div that gets moved around the screen, causing the whole butterfly to move.
  * The `.hover-container` div is responsible for the constant erratic motion of the butterfly.
  * The `.wing`, `.body` and `.head` divs make up the butterfly itself. I make use of the pseudo-elements `:before` and `:after` to make more complex shapes out of single divs (<a href="https://hacks.mozilla.org/2014/09/single-div-drawings-with-css/" target="_blank">explanation</a>) &#8211; e.g. the front and back part of each wing, or the `.head` div with two antennae.

Here is the flat, un-animated version of the butterfly:

<p class='codepen'  data-height='268' data-theme-id='8720' data-slug-hash='EbDvx' data-default-tab='result' data-animations='run' data-editable='' data-embed-version='2'>
  See the Pen <a href="http://codepen.io/michaelbromley/pen/EbDvx/">3D Butterfly – flat view</a> by Michael Bromley (<a href="http://codepen.io/michaelbromley">@michaelbromley</a>) on <a href="http://codepen.io">CodePen</a>.8720
</p>

## The CSS

The overall effect is achieved with a combination of <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transition" target="_blank">CSS transitions</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/animation" target="_blank">CSS animations</a>. Transitions are used for the movement of the butterfly around the screen, following the mouse clicks. Animations are used for the flapping wings and the erratic motion of the butterfly when at rest. The flapping wings effect is achieved by animating the rotation of each wing about the y axis. We also need to make sure we set the transform-origin to one side, otherwise the wings would see-saw about the center, rather than flapping. Here are the relevant excerpts of CSS &#8211; the styling is omitted, only the rules relating to the animation of the wings are shown:

<pre>@keyframes flap {
    0% {
        transform: rotateY(80deg);
    }
    100% {
        transform: rotateY(-80deg);
    }
}</pre>

<pre>body {
    perspective: 1500px;
    transform-origin: center center;
}

.container {
    transform: rotateX(90deg);
    transform-style: preserve-3d;
}

.hover-container {
    transform-style: preserve-3d;
}

.wing {
    position: absolute;
    transform-style: preserve-3d;
    animation: flap 0.3s linear infinite alternate;
}
.left {
    transform-origin: right center;
    border-radius: 177% 50%;
}
.right {
    transform-origin: left center;
    border-radius: 50% 177%;
    left: 110px;
    animation-direction: alternate-reverse;
}</pre>

A couple of things to note:

  1. We set the `perspective` rule on the body element. This establishes a common 3D space for all the elements below it. In order to &#8220;pass a reference&#8221; to that common 3D space down, the `.container` and `.hover-container` divs both include the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/transform-style" target="_blank"><code>transform-style: preserve-3d</code> rule</a>, ensuring their child elements have a common perspective when having 3d transformations applied to them.
  2. Although both the left and right wing use the same flap animation, the animation needs to be mirrored. This is achieved by setting the `animation-direction: alternate-reverse;` rule on the right wing.

&nbsp;

Here is what the butterfly looks like with the 3D perspective applied, and the wings animated:

<p class='codepen'  data-height='268' data-theme-id='8720' data-slug-hash='zeKsq' data-default-tab='result' data-animations='run' data-editable='' data-embed-version='2'>
  See the Pen <a href="http://codepen.io/michaelbromley/pen/zeKsq/">3D Butterfly – flying</a> by Michael Bromley (<a href="http://codepen.io/michaelbromley">@michaelbromley</a>) on <a href="http://codepen.io">CodePen</a>.8720
</p>

## Following The Mouse Clicks

This is where some JavaScript is needed, but only to set a few CSS values, which are then animated with CSS transitions. The `.container` div has the following CSS transition rules defined:

<pre>.container {
    transition:
        top 3s cubic-bezier(.34,.63,.26,.94),
        left 3s cubic-bezier(.34,.63,.26,.94),
        transform 1s linear;
}</pre>

What this means is that if we change the top or left values of the container, it will transition to the new position over the course of 3 seconds, following a timing function specified by the <a href="http://cubic-bezier.com/#.34,.63,.26,.94" target="_blank">cubic-bezier</a> function (this one makes it accelerate rapidly, and very slowly come to a stop). This is used to move the butterfly around the screen.

At the same time, we will transition any transforms more quickly, following a <a href="http://cubic-bezier.com/#0,0,1,1" target="_blank">linear timing function</a>. This is used to rotate the butterfly towards the point where the mouse clicked. Another transform causes the butterfly to move towards and away from the screen (by adjusting its position on the z axis).

Here is a simplified version of the JavaScript code that sets these dynamic CSS values based on mouse clicks:

<pre>document.addEventListener('click', moveTo);
var container = document.querySelector('.container');

function moveTo(e) {
    var currentX = parseInt(container.style.left, 10);
    var currentY = parseInt(container.style.top, 10);
    var newX = e.clientX - butterflyWingspan;
    var newY = e.clientY;
    var deltaX = newX - currentX;
    var deltaY = newY - currentY;

    var rotateZ = -Math.min(Math.max(deltaX / rotationDamping, -90), 90);
    var rotateX = 90 - Math.min(Math.max(deltaY / rotationDamping, -90), 90);
    var translateZ = newY - 500;

    container.style.left = newX + 'px'; 
    container.style.top = newY + 'px'; 
    container.style.transform = 'translateZ(' + translateZ + 'px) rotateX(' + rotateX + 'deg) rotateZ(' + rotateZ + 'deg)'; 
}</pre>

Reading the code from the top of the `moveTo` function, here is what is happening:

  1. We get the current position of the butterfly by querying the container&#8217;s left and top style properties.
  2. We get the coordinates of the mouse click.
  3. We work out the delta (difference) between the two sets of coordinates. This is used to set the 3D rotation of the container. The greater the delta, the more the container is rotated on that axis. We also use the y position of the click to determine how &#8220;close to the screen&#8221; the container is placed on the z axis. A click near the top of the screen sends the container further back; near the bottom brings it closer.
  4. We use the container&#8217;s style object to set the inline CSS of the element, which will trigger the transitions to the new values.

To make this easier to understand, here is a demo which uses the above principles, but with a simple 3D square rather than a butterfly:

<p class='codepen'  data-height='268' data-theme-id='8720' data-slug-hash='dJweB' data-default-tab='result' data-animations='run' data-editable='' data-embed-version='2'>
  See the Pen <a href="http://codepen.io/michaelbromley/pen/dJweB/">3D object following mouse</a> by Michael Bromley (<a href="http://codepen.io/michaelbromley">@michaelbromley</a>) on <a href="http://codepen.io">CodePen</a>.8720
</p>

## Conclusion

CSS, while often a source of frustration for the front-end developer, is nonetheless a powerful declarative language that is well worth exploring. This demo shows how a relatively few lines of code can achieve a result that would no doubt take many times that number of lines to write in pure JavaScript.

Browser support for these features is getting better, but vendor prefixes are still needed to ensure broad compatibility. I have made use of <a href="http://leaverou.github.io/prefixfree/" target="_blank">prefix-free</a> to dynamically add the necessary prefixes, so I don&#8217;t need to worry about remembering them all when writing my CSS. Having said that, lack of support for the transform-style: preserve-3d property in Internet Explorer means that the demo won&#8217;t look right in that browser currently. As for the various mobile browsers, I&#8217;ve not tested on any but in general support is a little sketchier on mobile at this time.

Here is a short list of resources that I found very useful when learning about this subject:

  * <a href="http://desandro.github.io/3dtransforms/" target="_blank">Intro to CSS 3D Transforms by David DeSandro</a>
  * <a href="http://css3.bradshawenterprises.com/transforms/" target="_blank">CSS Transforms Playground by Rich Bradshaw</a>
  * <a href="http://caniuse.com/#feat=transforms3d" target="_blank">Can I Use page for CSS 3D Transforms</a>