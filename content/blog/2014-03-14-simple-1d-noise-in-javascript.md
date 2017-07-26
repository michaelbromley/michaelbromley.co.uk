---
title: Simple 1D Noise in JavaScript
author: michael-bromley
type: post
date: 2014-03-14T07:15:00+00:00
aliases:
  - blog/90/simple-1d-noise-in-javascript
categories:
  - post
tags:
  - AngularJS
  - creative
  - code
  - JavaScript

---
I am working on a side project in which I needed to generate some "random", or more accurately, unpredictable motion. At first I tried using the `Math.random()` method, and using those values to set the position of my moving element. This, of course, looks terrible because the element will simply jump around to various points, "teleporting" between them. After searching around for a bit (one of those slow search processes where you don't really know what you are looking for) I figured out I needed some kind of noise function.

I found [this excellent article on scratchapixel.com](http://www.scratchapixel.com/lessons/3d-advanced-lessons/noise-part-1/creating-a-simple-1d-noise/), and used it as a basis for my own implementation of simple one dimensional noise in JavaScript. Here is the result:

{{< plunker id="SnCuRTG5Mkb0676ncYmH" height="850px" >}}

## The Code

Here is the code. I can't take credit for the algorithm, I pretty much just ported it from the article referenced above. To understand what the code is doing, read the article. It's a good read.

```JavaScript
var Simple1DNoise = function() {
    var MAX_VERTICES = 256;
    var MAX_VERTICES_MASK = MAX_VERTICES -1;
    var amplitude = 1;
    var scale = 1;

    var r = [];

    for ( var i = 0; i < MAX_VERTICES; ++i ) {
        r.push(Math.random());
    }

    var getVal = function( x ){
        var scaledX = x * scale;
        var xFloor = Math.floor(scaledX);
        var t = scaledX - xFloor;
        var tRemapSmoothstep = t * t * ( 3 - 2 * t );

        /// Modulo using &#038;
        var xMin = xFloor &#038; MAX_VERTICES_MASK;
        var xMax = ( xMin + 1 ) &#038; MAX_VERTICES_MASK;

        var y = lerp( r[ xMin ], r[ xMax ], tRemapSmoothstep );

        return y * amplitude;
    };

    /**
    * Linear interpolation function.
    * @param a The lower integer value
    * @param b The upper integer value
    * @param t The value between the two
    * @returns {number}
    */
    var lerp = function(a, b, t ) {
        return a * ( 1 - t ) + b * t;
    };

    // return the API
    return {
        getVal: getVal,
        setAmplitude: function(newAmplitude) {
            amplitude = newAmplitude;
        },
        setScale: function(newScale) {
            scale = newScale;
        }
    };
};
```

## How to use it

Check out some instructions on my [AngularUtils repo](https://github.com/michaelbromley/angularUtils/tree/master/src/services/noise).

Since I am working a lot with AngularJS, and the side project I am making is using Angular, I wrapped the above function in an Angular service, which you can find at the above location. Using it outside of angular is as simple as copying the code listed above, and instantiating it like so:

```JavaScript
var generator = new Simple1DNoise();
var x = 1;
var y = generator.getVal(x);
```

I hope some of you find this useful, or at least interesting.