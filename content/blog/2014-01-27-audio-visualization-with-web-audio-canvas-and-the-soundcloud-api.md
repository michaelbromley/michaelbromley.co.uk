---
title: Audio Visualization with Web Audio, Canvas and the Soundcloud API
author: michael-bromley
type: post
date: 2014-01-27T13:54:41+00:00
url: /42/audio-visualization-with-web-audio-canvas-and-the-soundcloud-api
categories:
  - post
tags:
  - canvas
  - code
  - JavaScript
  - soundcloud
  - web audio api

---
<a href="http://www.michaelbromley.co.uk/experiments/soundcloud-vis/#muse/undisclosed-desires" target="_blank"><img class="aligncenter size-full wp-image-55" src="/media/2014/01/Untitled-4.jpg" alt="Audio visualization" width="800" height="511" srcset="/media/2014/01/Untitled-4.jpg 800w, /media/2014/01/Untitled-4-300x191.jpg 300w" sizes="(max-width: 800px) 100vw, 800px" /></a>

&nbsp;

**Update 05/02/14** &#8211; This demo got featured on Google&#8217;s <a href="http://www.chromeexperiments.com/detail/soundcloud-visualizer/?f=" target="_blank">Chrome Experiments</a> website! This has generated a lot more interest (as in hundreds of views per day rather than one or two per week) so hopefully we will see some improvements from the community via the <a href="https://github.com/michaelbromley/soundcloud-visualizer" target="_blank">GitHub repo</a> &#8211; I&#8217;ve already had a first pull request adding some very cool new functionality!

**Update May 2015** &#8211; As of latest versions of Chrome (42+) and recent versions of Firefox, changes in the way cross-origin audio is handled mean this demo may not work. It&#8217;s a well-known issue for everyone who&#8217;s used the SoundCloud API for JavaScript visualizations (there are a lot of us). I&#8217;m working on a new project to bring this (and many other) JS/Canvas visualizations onto your computer, allowing you to visualize the output of your sound card directly and thereby bypassing all the problems associated with streaming over the internet. Watch this space&#8230;

&#8212;&#8212;&#8211;

After attending meeting of the <a href="http://www.meetup.com/viennajs/" target="_blank">Vienna JS usergroup</a> last year, I got inspired to check out a couple of web technologies that I had theretofore no experience with: <a href="https://developer.mozilla.org/en/docs/HTML/Canvas" target="_blank">the <code>&lt;canvas&gt;</code> element</a> and the <a href="https://developer.mozilla.org/en-US/docs/Web_Audio_API" target="_blank">web audio API</a>.

I don&#8217;t intend to give an in-depth tutorial on how to use these technologies &#8211; there are already plenty of good write-ups out there. Instead, I just want to share some basic pointers for further study, a few things that I found interesting, and an example of what I was able to build with canvas and web audio. Here are a few resources that I found particularly useful in getting started:

  * <a href="https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Canvas_tutorial" target="_blank">MDN Canvas Tutorial</a>
  * <a href="http://www.html5rocks.com/en/tutorials/webaudio/intro/" target="_blank">Getting Started with Web Audio API</a>
  * <a href="http://joshondesign.com/p/books/canvasdeepdive/chapter12.html" target="_blank">Intro to WebAudio</a>
  * <a href="http://chimera.labs.oreilly.com/books/1234000001552/ch05.html" target="_blank">Web Audio API chapter on analysis and visualization</a>

## Turning Sound Into Numbers

Visualizations are all about transforming a non-visual form of data into a visual form. With audio data, a simple transformation might be to represent the volume as a number between, say, 0 and 255. A loud sound would be closer to 255, and a quieter sound closer to 0. Once we have the audio data in the form of a number, we could assign it to a variable and use it to, for example, draw a vertical black bar in our `<canvas>` element, with a height proportional to our volume value. The canvas code would look something like this:

<pre>ctx.fillRect(0, 0, 10, volume);</pre>

This would be a simple example of an audio visualization. If this volume value was being updated in real-time, then we would be able to build an impressive visualization.  However, instead of simply altering the height of a rectangle, we could do any number of transformations using just this single value representing the volume. For example, we could use it to specify colours, rotations, movements on the canvas &#8211; the only limit would be your imagination.

Now let&#8217;s take it one step further and imagine that, rather than getting a single value representing the volume of our audio source, we could somehow get an array of values, each one representing the volume of the sound across a whole range of frequencies. So, for example, a deep bass drum sound would give us larger values towards the lower end of the range, whereas a crash cymbal would give large values mainly at the upper end of the range. You have seen such data visualized many times before, I would guess (come on &#8211; who grew up with WinAmp?):

<img class="aligncenter size-medium wp-image-45" src="/media/2014/01/89s84-300x200.jpg" alt="Example of a simple visualization" width="300" height="200" srcset="/media/2014/01/89s84-300x200.jpg 300w, /media/2014/01/89s84.jpg 480w" sizes="(max-width: 300px) 100vw, 300px" />

Helpfully, the web audio API has a built-in feature that allows us to extract just such a set of data from an audio source. It is known as an <a href="https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode" target="_blank">Analyser Node</a>. This interface allows us to get a real-time snapshot of the audio data. I&#8217;ll not go into depth on how to implement it, but the important thing to know is that we can use it to get an array of integers from 0 &#8211; 255, each representing the relative volume of the sound at each frequency band, from low to high. <a href="http://webaudiodemos.appspot.com/slides/mediademo/" target="_blank">Here is a nice, simple example of the kind of thing you can do with this data</a>. Note that in learning about the web audio API, you will start to run into the term &#8220;fast Fourier transform&#8221; or FFT. Feel free to read up on it, but it can seem awfully complex to the uninitiated (like me). It&#8217;s enough to know that it is a name for a method used to get frequency data from a signal such as our audio source.

## Getting Audio Data from Soundcloud

If you don&#8217;t already know, <a href="https://soundcloud.com" target="_blank">Soundcloud </a>is sort of like YouTube, but for audio rather than video. It provides <a href="http://developers.soundcloud.com/docs" target="_blank">a rich API</a> for building apps that use its audio streams, so I decided to use it as the source for my visualization  (note that you&#8217;ll need to register your app to use the Soundcloud API &#8211; it&#8217;s free and straightforward to do).

To do this, I put an <audio> element in the page, and used JavaScript to dynamically set the source attribute (`src="...."`) of that audio element to the location of the Soundcloud audio stream. Once you have a working audio element that plays sound, you can hook it up to the web audio API by using `audioContext.createMediaElementSource(audioElement);` If you are anything like me, you&#8217;ll probably have to do a fair bit of reading through blogs and source code in order to get everything working right. I&#8217;ll offer you a snippet of the code that I use in my demo app to get audio data from Soundcloud and into a useful array of numbers:

<pre>var SoundCloudAudioSource = function(audioElement) {
    var player = document.getElementById(audioElement);
    var self = this;
    var analyser;
    var audioCtx = new (window.AudioContext || window.webkitAudioContext); // this is because it's not been standardised accross browsers yet.
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256; // see - there is that 'fft' thing. 
    var source = audioCtx.createMediaElementSource(player); // this is where we hook up the &lt;audio&gt; element
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    var sampleAudioStream = function() {
        // This closure is where the magic happens. Because it gets called with setInterval below, it continuously samples the audio data
        // and updates the streamData and volume properties. This the SoundCouldAudioSource function can be passed to a visualization routine and 
        // continue to give real-time data on the audio stream.
        analyser.getByteFrequencyData(self.streamData);
        // calculate an overall volume value
        var total = 0;
        for (var i = 0; i &lt; 80; i++) { // get the volume from the first 80 bins, else it gets too loud with treble
            total += self.streamData[i];
        }
        self.volume = total;
    };
    setInterval(sampleAudioStream, 20); // 
    // public properties and methods
    this.volume = 0;
    this.streamData = new Uint8Array(128); // This just means we will have 128 "bins" (always half the analyzer.fftsize value), each containing a number between 0 and 255. 
    this.playStream = function(streamUrl) {
        // get the input stream from the audio element
        player.setAttribute('src', streamUrl);
        player.play();
    }
};</pre>

Here is an example of how you might use it:

<pre>// assuming something like this in your HTML: 
&lt;canvas id="canvas" width="300" height="200"&gt;&lt;/canvas&gt;
&lt;audio id="player"&gt;&lt;/audio&gt;</pre>

<pre>var audioSource = new SoundCloudAudioSource('player');
var canvasElement = document.getElementById('canvas');
var context = canvasElement.getContext("2d");

var draw = function() {
    // you can then access all the frequency and volume data
    // and use it to draw whatever you like on your canvas
    for(bin = 0; bin &lt; audioSource.streamData.length; bin ++) {
        // do something with each value. Here's a simple example
        var val = audioSource.streamData[bin];
        var red = val;
        var green = 255 - val;
        var blue = val / 2; 
        context.fillStyle = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
        context.fillRect(bin * 2, 0, 2, 200);
        // use lines and shapes to draw to the canvas is various ways. Use your imagination!
    }
    requestAnimationFrame(draw);
};

audioSource.playStream('url_to_soundcloud_stream');
draw();</pre>

## Making It Look Cool

Okay, so that will hopefully give you a few ideas about how to get started. The real fun (at least for me) comes in actually making your visualization. Now that you have the raw data to work with, the sky is the limit. Here are some ideas of things you can do with the audio data:

  * Dynamically set colours (as in the example above)
  * Dynamically resize shapes
  * Set the rotation of shapes
  * Set the position of shapes
  * Deform shapes by moving their vertices in different ways

Combinations of the above, when thoughtfully combined, can produce stunning visuals.

## Re-Learn Trigonometry

One thing I quickly discovered, once I moved beyond the most basic of visualizations, was that I needed to use a lot of trig. This is because the trig functions sine and cosine allow you to input any changing number (such as is produced by the analyser node) and transform it into a smoothly-changing number between 1 and -1. By further transforming this result, you can achieve more natural and fluid transitions. The other reason that trig is vital in using canvas is that you can use it to calculate coordinates in 2D space (as in canvas), which is necessary if you want to do any sort of complex rotation or movement.

Since I&#8217;ve not really used it much since college, I needed to swot up on my <a href="http://www.mathsisfun.com/algebra/sohcahtoa.html" target="_blank">SOHCAHTOA</a>. One really useful resource that I used a lot was the <a href="https://www.desmos.com/calculator" target="_blank">Desmos graphing calculator</a>. This is a beautiful app in itself, and I found it helped me to visualize my calculations and test out new ideas before having to write all the code. Just type &#8216;sin x&#8217; and watch the magic happen.

## Demo

<a href="http://www.michaelbromley.co.uk/experiments/soundcloud-vis/#muse/undisclosed-desires" target="_blank">Here is a demo of the app that I built</a>. The visualization is fairly complex compared to my example above &#8211; it uses three cavases overlayed one on top of the other, and there are transformations of colour, size, rotation, and skew all going on at once. However, I just started simple and built up the complexity one bit at a time. It&#8217;s a lot of fun and a good opportunity to experience some less well-trodden areas of JavaScript and web development.

## Source

<a href="https://github.com/michaelbromley/soundcloud-visualizer" target="_blank">The source is all on GitHub</a>, check it out to see how the demo works, and see some of the more advanced techniques I used.