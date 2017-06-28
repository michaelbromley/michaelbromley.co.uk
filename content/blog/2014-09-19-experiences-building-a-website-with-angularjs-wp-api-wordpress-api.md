---
title: Experiences Building a Website with AngularJS + WP-API (WordPress API)
author: michael-bromley
type: post
date: 2014-09-19T15:26:15+00:00
url: /228/experiences-building-a-website-with-angularjs-wp-api-wordpress-api
categories:
  - post
tags:
  - AngularJS
  - css
  - gulp
  - html
  - JavaScript

---
I&#8217;ve just completed and launched a complete re-write of this website. Since the first iteration (started around nine months ago) and this new one, I&#8217;ve learned a lot about the fundamental technologies of the web: HTML, CSS and JavaScript; about AngularJS in particular; and about things like build systems and application architecture. Therefore I wanted to share a few thoughts and experiences I had building this site.

<!--more-->

[<img class="aligncenter wp-image-229 size-full" src="http://www.michaelbromley.co.uk/api/wp-content/uploads/2014/09/mockup-both.gif" alt="new site design" width="661" height="300" />][1]

## This is Not a Tutorial

Attempting a tutorial on such a general topic would require a whole series of specialised posts. Instead, I am going to assume you have at least some familiarity with building websites in general and at least a little experience with AngularJS, and then take you through some thoughts and observations that may be useful in your own projects. Rather than trying to explain everything I mention, I&#8217;ll include links so that you can read more as needed.

## Design Goals

<div id="attachment_234" style="width: 522px" class="wp-caption alignright">
  <a href="http://www.michaelbromley.co.uk/api/wp-content/uploads/2014/09/old-site-desktop.gif"><img class="size-full wp-image-234" src="http://www.michaelbromley.co.uk/api/wp-content/uploads/2014/09/old-site-desktop.gif" alt="The former design" width="512" height="300" /></a>
  
  <p class="wp-caption-text">
    The former design
  </p>
</div>

There were a number of shortcomings with the previous design which I wanted to address with this rewrite:

  1. The old site was not particularly optimized for readability. The text was too small, there was a distracting background, and overall I hadn&#8217;t put a whole lot of thought into the typography and resultant reading experience.
  2. The mobile experience on the old site was more of an afterthought rather than an equal experience to the desktop version. I wanted to build the new site with a great mobile experience in mind from the start.
  3. The build system of the old site was messy and slow, and still involved manual steps to deploy changes. I wanted a faster, cleaner build with zero human intervention required.
  4. The AngularJS code was a mess. I knew could do better now.

## Architecture

As with the old site, the front end of this one is built with <a href="https://angularjs.org/" target="_blank">AngularJS</a>, and the content is powered by WordPress.  <a href="http://wp-api.org/" target="_blank">WP-API</a> enables WordPress to serve data as json, which is then rendered by Angular.

The architecture stayed basically identical. The only difference being that WP-API is now more mature and full-featured than when I started with it. There is still a little way to go before it does everything I want, but nevertheless it is a great project which is under constant active development.

## Libraries & Tools

Partly an attempt to learn something new, and partly an attempt to fix some issues, I swapped out some libraries and tools:

  * <a href="http://purecss.io/" target="_blank">PureCSS</a> instead of Bootstrap. Mainly for the size difference. Since I am writing mostly custom CSS, I don&#8217;t need 90% of what Bootstrap provides. A good grid system and some sensible defaults is all I wanted, and Pure seems to be a good fit.
  * Custom project structure & build system instead of ng-boilerplate. Ng-boilerplate is great, but was actually too much for a relatively simple site such as this. More on this below.
  * <a href="http://gulpjs.com/" target="_blank">Gulp</a> instead of Grunt. I wanted to check out what the hype was all about. Turns out Gulp is great. More on this below too.

## Cleaning Up the AngularJS Mess

When I built the original iteration of this site, I used it as a means to learn AngularJS. In that regard, it served its purpose quite well &#8211; I was able to experiment with various design approaches, third-party modules, learn to write my own injectables, and so on. The downside of all this experimentation was that the code base ended up being inconsistent (when I would decide half way through that _ah! <span style="text-decoration: underline;">this </span>is the proper way to do that!_) and convoluted. I made a lot of the requisite newbie mistakes and discovered many of the Angular anti-patterns, the remnants of which lingered in the code undetected.

At first I attempted to do a spring clean. After about an hour I realised that I just needed to burn this rotten ship and build a new one. On the plus side, it was gratifying to be able to easily pick out all the bad points of the code I&#8217;d written nine months earlier. I must be making progress!

### Simplify

I found that I was able to considerably simplify several areas based on a better understanding and judgement of Angular.

For example, I had previously used the `$resource` service to do my REST calls to WordPress. For something as simple as retrieving some json, I realised that the `$http` service is perfectly adequate, and as a result the code for my API service shrank from 133 lines to 71 (and is a lot simpler to read too).

Another example is that for the original site I used <a href="https://github.com/ngbp/ngbp" target="_blank">ng-boilerplate</a> as the basis of my project and stuck rigidly to its advices. Now, to be clear, I think ng-boilerplate is a fantastic resource, and it accelerated my learning of Angular considerably. It was also clearly the better choice when compared to the official <a href="https://github.com/angular/angular-seed/tree/294bb71ff83a8f6c9b13d98c141ff565a4c16e9a/app/js" target="_blank">Angular seed project that was around at the time</a>, which plonked everything together in potentially huge monster-files.

This time around, however, rather than using ng-boilerplate as-is, I was able to take certain aspects which are appropriate &#8211; e.g. the grouping of files by logical section and the general pattern of the build system &#8211; and discard others that seemed a bit overblown for a relatively simple app as this &#8211; e.g. defining separate Angular modules and routing for each section of the site.

The result is a leaner, simpler code base that is a pleasure rather than a chore to navigate.

### Standardise

As mentioned earlier &#8211; I had gone through the typical Angular learning experience where one wrestles with issues like:

  * should this be a factory or a service (or a provider?!)!?
  * do I need to use isolate scope of this directive!?
  * why does this need to be wrapped in a call to $apply()!?
  * where should I resolve this promise!?
  * is it a good idea to use $rootScope for this!?
  * etc !?

As you can see, all of the above issue are punctuated by both a question mark _and_ an exclamation mark, indicating the real distress they bring to the fledgling Angular developer. The result of this uncertainty was, in my case, a rather incoherent code base which, although functional, brought with it a sense of unease and disorder.

After the better part of a year working with Angular, I have been able to resolve for myself most of these issues (and others) most of the time. Apart from the fact of just writing several Angular apps and learning from experience what works best, I&#8217;ve also learned a lot from diving into the <a href="https://github.com/angular/angular.js/tree/master/src/ng" target="_blank">Angular source code</a>, doing a couple of Angular courses on <a href="http://pluralsight.com/training" target="_blank">Pluralsight</a>, reading Ari Lerner&#8217;s <a href="https://www.ng-book.com/" target="_blank">ng-book</a>,  and studying the style guides of <a href="https://github.com/toddmotto/angularjs-styleguide" target="_blank">Todd Motto</a> and <a href="https://github.com/johnpapa/angularjs-styleguide" target="_blank">John Papa</a>.

So now my Angular code is (on the whole) easily readable and most importantly, consistent.

## Build System

The ng-boilerplate build system is thorough to say the least. It was also my first exposure to Grunt, and I learned a lot from studying and tweaking the <a href="https://github.com/ngbp/ngbp/blob/v0.3.2-release/Gruntfile.js" target="_blank">formidable Gruntfile</a> that powers it. However, it includes some things I just don&#8217;t need (e.g. CoffeeScript compilation) and some things that I think could be done better (like using ng-min rather than its successor, <a href="https://github.com/olov/ng-annotate" target="_blank">ng-annotate</a>). I also wanted to try out Gulp, since I&#8217;d heard a lot of good reports about it.

It took a couple of days to set up my Gulp build &#8211; a bit of a mental shift was needed to adjust to the idea of streams, especially since I&#8217;ve never done any Node.js programming before. I found <a href="http://netengine.com.au/blog/gulp-and-angularjs-a-love-story-or-the-old-wheel-was-terrible-check-out-my-new-wheel/" target="_blank">this blog post</a> (and its <a href="http://netengine.com.au/blog/gulp-and-angular-js-a-tune-up/" target="_blank">follow up</a>) extremely helpful in getting up and running, and I adopted several suggestions given therein.

The main gain from using Gulp is its speed. With <a href="https://www.npmjs.org/package/gulp-livereload" target="_blank">live reload</a> enabled, I can barely switch from my IDE to Chrome before the relevant tasks have completed and the page is refreshed.

In the ng-boilerplate Gruntfile, &#8220;build&#8221; and &#8220;compile&#8221; are completely separate tasks, with building being done often and compiling only when a production-ready release is needed. The mean reason for this is that the compile tasks (annotation of Angular code, minification of JS and CSS) take too long to run on every save.

With Gulp, I found it so fast that I was able to put together a build system that does &#8220;build&#8221; and &#8220;compile&#8221; in parallel, continuously. So every time I make a change to a JS file, my un-minified build version is updated as well as the minified, concatenated main.min.js file &#8211; ready to deploy to the production server! Both of these tasks are done within a few hundred milliseconds. This is such an incredibly efficient system, I&#8217;m certain I&#8217;ll be sticking with Gulp from here on.

## Readability

<div id="attachment_232" style="width: 569px" class="wp-caption alignright">
  <a href="http://www.michaelbromley.co.uk/api/wp-content/uploads/2014/09/old-site.gif"><img class="wp-image-232 size-full" src="http://www.michaelbromley.co.uk/api/wp-content/uploads/2014/09/old-site.gif" alt="Typography in the previous version" width="559" height="335" /></a>
  
  <p class="wp-caption-text">
    Typography in the previous version
  </p>
</div>

Since this is primarily a blog site, readability should be the primary concern. With the old site, there were a few problems in that regard: the font size was a little on the small side at 14px, the typefaces were the old work horses Georgia and Helvetica Neue, and there was a slightly distracting background texture.

This time I have ramped up the font size to 19px for the body of the post and opted for a very readable typeface in Open Sans (with the help of <a href="https://www.google.com/fonts" target="_blank">Google Fonts</a>).

I have also removed any possible distraction from the content by stripping out almost everything except the text, and I spent much longer experimenting with things like line-spacing, colours and vertical spacing of block elements in order to achieve a comfortable reading experience.

The result is, in my opinion, pleasingly minimal and functional, on any screen size.

## Mobile Experience

The PureCSS grid system has a responsive module that will be quite familiar to anyone who knows Bootstrap or Foundation &#8211; specify multiple grid size classes in your container elements.

I came to realise that layout is only half of what makes a &#8220;responsive&#8221; site work well. The other part is actually taking the time to get things like typography, spacing, and navigation right across screen sizes.

## Fancy Bits

In my spare time I&#8217;ve been heavily into CSS and JavaScript animation projects, and I couldn&#8217;t resist putting a few fancy touches into this design. Since everything else is so simple and stripped-back, I figure that I&#8217;d earned some &#8220;fanciness credit&#8221;, so I spent it on the terminal-like typing effect in the titles, and the animated homepage/menu animation. The former is powered by <a href="https://github.com/michaelbromley/angularUtils/tree/master/src/directives/terminalType" target="_blank">this custom Angular directive</a> I wrote, and the latter is just some regular CSS animation via transtions.

I hope it adds a little interest, without distracting from the content.

Thanks for reading, and I hope you found some useful perspectives and information here.

&nbsp;

**Update 28/03/15** &#8211; After receiving many requests for more technical implementation details and even for the source code for this site, I put together a bare-bones example project based on the above: [angular-wordpress-seed: A complete example project with AngularJS and the WordPress JSON REST API][2]

 [1]: http://www.michaelbromley.co.uk/api/wp-content/uploads/2014/09/mockup-both.gif
 [2]: http://www.michaelbromley.co.uk/blog/418/angular-wordpress-seed-a-complete-example-project-with-angularjs-and-the-wordpress-json-rest-api