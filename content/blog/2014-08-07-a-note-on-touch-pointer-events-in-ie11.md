---
title: A Note on Touch (Pointer) Events in Internet Explorer
author: michael-bromley
type: post
date: 2014-08-07T08:08:29+00:00
url: /193/a-note-on-touch-pointer-events-in-ie11
categories:
  - post
tags:
  - css
  - internet explorer
  - mobile
---
Using touch events in your JavaScript app is as simple as adding event listeners like this:

```JavaScript
myElement.addEventListener('touchstart', myStartHandler);
myElement.addEventListener('touchmove', myMoveHandler);
myElement.addEventListener('touchend', myEndHandler);
```

While making an app which needs to work cross-browser with touch, I had some difficulties getting it to work with Internet Explorer. I have version 11 installed on my desktop and I also have a Windows Phone 8 which comes with IE 10.

I wanted to override the default scroll handling of the page and implement my own function to handle scrolling.

The first thing to know is that IE does not implement touch events like WebKit, Firefox and others do. Instead, it implements the proposed [Pointer Events](http://www.w3.org/TR/pointerevents/) standard. This is not just a case of IE doing things wrong again. In fact, the Pointer Events spec provides a higher-level abstraction which covers mouse, touch and pen input in one paradigm. The Polymer project currently provides a [polyfill](http://www.polymer-project.org/platform/pointer-events.html), and it looks like it will be more widely used in the future.

Therefore, to support Pointer Events, we need to listen for them, too. Simple, right?

```JavaScript
myElement.addEventListener('pointerdown', myStartHandler);
myElement.addEventListener('pointermove', myMoveHandler);
myElement.addEventListener('pointerup', myEndHandler);
```

Well, I did this and on testing, the events would not always fire as expected in IE11 (note: for IE10 on WP8, I needed to also listen for the legacy &#8216;MSPointerDown' etc. and this also did not work).

After a lot of frustration I discovered that the key is the CSS property `touch-action`.

## The `touch-action` Property

From the [webplatform.org docs](http://docs.webplatform.org/wiki/css/properties/touch-action):

**"Determines whether touch input may trigger default behavior supplied by the user agent, such as panning or zooming"**

The basic idea is that the browser will automatically deal with touch events in the way it sees fit: e.g. if you swipe up on a page with a scrollbar, the browser will scroll down.

The problem with this is that in this case it won't then fire any other pointer events other than `pointerdown`. This is what I was running into.

The solution is simple enough: for any element on which you wish to listen for pointer events, make sure you set the CSS `touch-action` to an appropriate value that will prevent the browser from overriding your event handlers:

```CSS
.myElement {
    touch-action: none;
}
```

## Demo

This demo only really makes sense in IE11, but even in Chrome 36+ you'll see that the red square cannot be srolled, due to the `touch-action: none;` CSS property.

## Update

On July 31 2014, the IE mobile team announced that IE 11 on Windows Phone will start supporting "touch" events as well as "pointer" events. Read all about it in this very informative blog post: [The Mobile Web should just work for everyone](http://blogs.msdn.com/b/ie/archive/2014/07/31/the-mobile-web-should-just-work-for-everyone.aspx)

I am also told that IE 11 on Windors Phone 8.1 does indeed support the un-prefixed pointer events. Thanks on both counts to [Jacob Rossi](https://twitter.com/jacobrossi) for the heads up.