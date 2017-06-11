---
title: 'AngularConnect: Summary and Analysis'
author: michael-bromley
type: post
date: 2015-10-22T19:36:00+00:00
url: /483/angularconnect-summary-and-analysis
categories:
  - post
tags:
  - AngularConnect
  - AngularJS
  - JavaScript

---
[AngularConnect][1], the largest Angular conference to date, has just taken place in London. Here is a summary based on what I learned and what I found most interesting. Since it was a two-track event, I only saw half the talks, so for the full picture, [watch the sessions yourself on YouTube][2].

Many of you just want a quick rundown on the key points, so the first section of this post is just that &#8211; &#8220;the meat&#8221;, albeit in bite-sized pieces (think pork scratchings or jerky). After that, if you like you can read my thoughts and analysis and then just a little more on the conference experience itself. Enjoy!

<div id="attachment_490" style="width: 650px" class="wp-caption aligncenter">
  <a href="http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151021_16_47_23_Pro.jpg" target="_blank"><img class="wp-image-490 size-large" src="http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151021_16_47_23_Pro-1024x575.jpg" alt="Angular team panel" width="640" height="359" srcset="http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151021_16_47_23_Pro-1024x575.jpg 1024w, http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151021_16_47_23_Pro-300x169.jpg 300w" sizes="(max-width: 640px) 100vw, 640px" /></a>
  
  <p class="wp-caption-text">
    The Angular team panel
  </p>
</div>

## &#8220;The Meat&#8221;

I&#8217;ve tried to organise this section into topics, so you can find the item you are interested in more easily (spoiler: no announcements of the Angular2 release date. Stop looking). Related resources are listed at the end in [brackets]. Note: this is all correct as far as my note-taking and memory allow. Corrections and clarifications are welcome.

### Angular 2

  * **Release:** In the keynote, Brad said &#8220;we&#8217;re really close&#8221; to beta, but not quite there yet. Specifically, the team wants to finish the docs and resolve the outstanding P1 (urgent) issues before announcing a beta release. [[release status section of keynote slides][3], [keynote video][4], [current status of open p1 issues on Github][5]]
  * **Browser Support:** Angular2 will support IE9 + [[slide from keynote][6]]
  * **Performance:** Performance is a huge area of focus for Angular2. Currently it is performing on average 4.2x faster than 1.x (yeah yeah, stats &#8211; see the keynote for more context). Template compilation will become a build step rather than a run-time step to further speed things up (see: _CLI_, _deeper dive_ below). Looking extremely impressive so far. [[section on perf from keynote slides][7]]
  * **Architecture**: Angular2 uses a separated compile/render architecture, which means it is able to target different rendering contexts, similar to how React does things. This enables things like server-side rendering, native mobile development (see NativeScript stuff below), and more. [[video on full-stack Angular2][8], [slide from keynote][9]]
  * **Traction:** Internally, Google are already porting apps to Angular2. Significantly, the Google Adwords app &#8211; with hundreds of developers and millions of lines of code &#8211; is amongst them.
  * **CLI:** The team are working on a command-line interface (CLI) for scaffolding Angular2 apps. In a demo, exactly two commands were needed to go from nothing to a fully working scaffolding, with defaults and transpiling all working. Another command creates a new component with all associated files. See the keynote for a demo. [[keynote video cli demo][10], [angular-cli repo][11]]
  * **Testing:** The testing situation already looks very promising. Julie Ralph (creator of Protractor) demonstrated a module that wraps Jasmine functions (it(), describe() etc.) to make them work with Angular2, as well as added helpers such as inject() to leverage the Angular2 dependency injection system. [[video of Julie&#8217;s talk][12]]
  * **Router:** The new router, a.k.a. &#8220;Component Router&#8221;, looks great. It can do everything that ui-router can do and more. The most exciting feature for me is &#8220;auxiliary routes&#8221;, which allow you to set up and navigate multiple independent routes in a single app (check out the video for a demo). Per Brian Ford, the router will follow the Angular2 release (i.e. it will go stable when Angular2 does), and the full functionality is also being developed for Angular 1.x. [[video of Brian&#8217;s talk on the router][13]]
  * **Learning / Getting started:** In their talk, Naomi Black and Rado Kirov build an app with Angular2. This is the best introduction I have yet seen. You get to see a live build almost from scratch with running commentary about the _what_ and the _why_ for each step. It also seems like a fair deal of effort is being invested in docs and partners such as egghead.io to make the developer experience happier than the early Angular 1 days. [[video of Naomi & Rado&#8217;s talk][14], [example application][15], [latest Angular2 dev guide][16]]
  * **RxJS:** Angular2 is build on top of the [RxJS reactive programming library][17]. What this means is that it will expose reactive observables through the built-in APIs. For example, the http service will return an observable stream rather than a promise, as will UI events. I spoke to Brad Green about this and it seems the idea is to provide observables wherever Angular 1.x now provides promises, plus several other places. [[Andre Staltz&#8217;s intro to reactive programming article][18], [video of talk &#8220;Angular2 Data Flow&#8221;][19] , [Ben Lesh&#8217;s talk on RxJS][20]]
  * **Module System:** Angular2 uses ES2015 modules. In his talk, Pawel Kozlowski takes a look at the state of current module loaders. The upshot is that currently you will see System.js being used in most of the Angular2 seed projects and examples, but there is no hard commitment by the Angular team to a specific module loading strategy. This will likely become more fixed as the CLI project develops. [[video of Pawel&#8217;s talk][21]]
  * **Deeper Dive:** Tobias Bosch and Victor Savkin cover some more advanced concepts which set Angular2 apart from 1.x. Their talk covers such things as the use of RxJS event streams; pre-compilation of templates; a React-like well-defined component life-cycle with hooks; and the use of expressive primitives provided by Angular2 which can vastly simplify creation of complex components. [[Better Concepts, Less Code talk video][22]]

### TypeScript

  * **General:** Very strong TypeScript presence throughout the conf. Basically all code examples were done in TS. It is still the case that Angular2 does not require TS &#8211; you can use any type of JS or compile-to-JS language you like.
  * **New Stuff:** Bill Ticehurst from Microsoft introduced the lastest stuff that either landed in 1.6, or is coming up, including JSX support, generators and async/await. Also automatic resolution of d.ts (ambient type definitions) without the need for explicit references or &#8220;typings&#8221; folder or tsd. [[What&#8217;s New In TypeScript video][23], [TypeScript blog: 1.6 announcement][24]]
  * **Learning:** For those new to TypeScript, who might be wondering if it is worth it (my opinion: DO IT.), the talk by Martin Probst and Alex Eagle does a great job of showing a from-scratch set-up of a TypeScript project, with explanations along of the way of each step. [[TypeScript tooling video][25]]

### Angular 1.x

  * **New Stuff:** A couple of new features just landed in the 1.5 branch: 
      * Multi-slot transclusion. This allows a transcluding directive to have multiple &#8220;slots&#8221; to place different content. Looks like it could radically simplify a whole class of parent-child-type directives. [[docs for multi-slot transclusion][26]]
      * Simplified component definitions for directives. There is a new way to declare directives which aims to simplify and bake-in all the best-practices that have evolved over time. As of this writing the docs for this feature haven&#8217;t been merged, but you can see the commit here: [[module#component commit][27]]
  * **Upgrading:** The upgrading situation is coming together pretty nicely: 
      * A community-driven project, **ng-forward**, aims to enable the use of Angular2 conventions and styles (TypeScript, decorators etc.) on 1.x apps. It was suggested that this _could_ be used in conjunction with the ng-upgrade (see below). [[ng-forward project repo][28]]
      * The Angular team are working on **ng-upgrade**, which will allow an incremental upgrade via an inter-operability layer. This will allow ng1 components to consume ng2 services and vice-versa. [[Angular 1.5 and beyond talk video][29], [simple example of how ng-upgrade will work][30]]
  * **Roadmap:** Brad Green re-iterated that Angular 1.x support will continue as long as it is still widely needed. He mentioned that the team track the stats between angularjs.org (for ng1.x docs) and angular.io (for ng2 docs) as an indicator of community adoption. Some specific areas still under active development for Angular 1.x &#8211; **Component Router**; **better internationalization & localization**; **improved animations**. [[Angular 1 section of keynote slides][31]]

### Other Notable Stuff

  * **NativeScript:** Since Angular2 uses a modular compilation/rendering architecture, render targets other than the browser DOM will be supported. One very cool use of this was demonstrated by the guys from NativeScript. In short, you will be able to develop real, native mobile apps (not webview-based like Ionic) which can use the native APIs directly with Angular2. [[video of the NativeScript talk][32]]
  * **Ionic 2:** Ionic 2 is built on Angular2 and has just been released as a public preview. [[Ionic 2 website][33]]
  * **Angular Material:** The first release candidate (RC1) for Angular Material 1.0 was just released. A Material Design library is also under very early development for Angular2. [[Angular Material website][34], [Angular Material talk video][35]]

<div id="attachment_491" style="width: 650px" class="wp-caption aligncenter">
  <a href="http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151020_16_47_49_Pro.jpg" target="_blank"><img class="wp-image-491 size-large" src="http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151020_16_47_49_Pro-1024x576.jpg" alt="Track 1 room" width="640" height="360" srcset="http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151020_16_47_49_Pro-1024x576.jpg 1024w, http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151020_16_47_49_Pro-300x169.jpg 300w" sizes="(max-width: 640px) 100vw, 640px" /></a>
  
  <p class="wp-caption-text">
    The conference was huge &#8211; all 1000 tickets sold out.
  </p>
</div>

## My 2 Pence

I went into this conference with two main questions: _&#8220;Should I start my next project with Angular2?&#8221;_ and _&#8220;What should I do with my existing Angular 1.x apps?&#8221;_. My answers to these are (tentatively) &#8211; yes, I&#8217;m going to give it a go, with the expectation that I may have to roll my sleeves up a little and maybe even contribute to the development of the framework; and to keep updating my 1.x apps &#8211; they already work, and I should be able to incrementally improve performance and features as development of the 1.x branch continues.

As a fairly long-time user of Angular, I&#8217;m pretty familiar with both its strengths and weaknesses. I&#8217;ve recently been playing with React and reactive programming &#8211; there is much to like about the innovations that both of these technologies offer. So I am pleased to see that the Angular team is incorporating many great ideas popularized by React (one-way data flow, component-tree architecture) and fully embracing the reactive approach by incorporating RxJS.

The tombstone-induced mass hysteria that swept (parts of) the Angular community a year ago has proven to be unjustified (as is usually the case with mass-hysterias). Angular 1.x will be around for a long time to come; the upgrade path seems well thought-out; the traction that Angular2 is gaining internally within Google and with partners is encouraging. Angular developers &#8211; pull your resumé out of the bin and iron it.

TypeScript looks set to become huge. I use it with great success in my Angular 1.x projects, and would be extremely reluctant to even consider doing a large-scale JS project without it now. With JSX support just added, I think it&#8217;ll become the go-to language for large-scale front-end development.

<div id="attachment_492" style="width: 650px" class="wp-caption aligncenter">
  <a href="http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151021_10_42_45_Pro.jpg" target="_blank"><img class="wp-image-492 size-large" src="http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151021_10_42_45_Pro-1024x576.jpg" alt="Outside the session rooms" width="640" height="360" srcset="http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151021_10_42_45_Pro-1024x576.jpg 1024w, http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151021_10_42_45_Pro-300x169.jpg 300w" sizes="(max-width: 640px) 100vw, 640px" /></a>
  
  <p class="wp-caption-text">
    As one attendee noted: there&#8217;s never been so many people in one place who know what &#8220;transclusion&#8221; means.
  </p>
</div>

## The Conference

Lastly, a few words on the conference itself. I had a chance to speak with Pete Bacon Darwin, one of the organisers and also the lead developer of Angular 1. He explained that the _&#8220;connect&#8221;_ in &#8220;AngularConnect&#8221; represented a larger goal than just &#8220;do some talks about Angular&#8221;. From my experience, they succeeded in that goal. As well as meeting old friends and making new ones, I had a chance to talk with members of the Angular team who seem to be a pretty uniformly cool and open bunch of people. I even managed to get a meteor issue on one of my packages fixed personally by a member of the Meteor team (thanks, Uri)!

The venue, the food, the meta-conf features (hack space, chill-out room, games room), the swag, and _especially_ the Back to the Future party were all a blast. A big thank you is due to all of you guys, to my friends old and new, and to [Gentics][36] for sending me.

<div id="attachment_493" style="width: 650px" class="wp-caption aligncenter">
  <a href="http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151020_07_41_24_Pro.jpg" target="_blank"><img class="wp-image-493 size-large" src="http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151020_07_41_24_Pro-1024x576.jpg" alt="Sunrise over London Docklands." width="640" height="360" srcset="http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151020_07_41_24_Pro-1024x576.jpg 1024w, http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151020_07_41_24_Pro-300x169.jpg 300w" sizes="(max-width: 640px) 100vw, 640px" /></a>
  
  <p class="wp-caption-text">
    Sunrise over London Docklands.
  </p>
</div>

&nbsp;

<div id="attachment_494" style="width: 650px" class="wp-caption aligncenter">
  <a href="http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151021_14_56_31_Pro.jpg" target="_blank"><img class="wp-image-494 size-large" src="http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151021_14_56_31_Pro-1024x576.jpg" alt="Fixing meteor issues with Uri Goldshtein" width="640" height="360" srcset="http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151021_14_56_31_Pro-1024x576.jpg 1024w, http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151021_14_56_31_Pro-300x169.jpg 300w" sizes="(max-width: 640px) 100vw, 640px" /></a>
  
  <p class="wp-caption-text">
    Fixing meteor issues with Uri Goldshtein
  </p>
</div>

&nbsp;

<div id="attachment_496" style="width: 650px" class="wp-caption aligncenter">
  <a href="http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151020_20_00_01_Pro.jpg" target="_blank"><img class="wp-image-496 size-large" src="http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151020_20_00_01_Pro-1024x596.jpg" alt="A magician" width="640" height="373" srcset="http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151020_20_00_01_Pro-1024x596.jpg 1024w, http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151020_20_00_01_Pro-300x175.jpg 300w, http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151020_20_00_01_Pro.jpg 1391w" sizes="(max-width: 640px) 100vw, 640px" /></a>
  
  <p class="wp-caption-text">
    There was a roving magician who was genuinely amazing. Presumably an homage to all the &#8220;magic&#8221; going on in the Angular framework itself.
  </p>
</div>

&nbsp;

<div id="attachment_497" style="width: 650px" class="wp-caption aligncenter">
  <a href="http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151020_19_26_21_Pro.jpg" target="_blank"><img class="wp-image-497 size-large" src="http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151020_19_26_21_Pro-1024x576.jpg" alt="Dancing" width="640" height="360" srcset="http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151020_19_26_21_Pro-1024x576.jpg 1024w, http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/WP_20151020_19_26_21_Pro-300x169.jpg 300w" sizes="(max-width: 640px) 100vw, 640px" /></a>
  
  <p class="wp-caption-text">
    The Enchantment Under the Sea dance. Amazing.
  </p>
</div>

&nbsp;

<div id="attachment_498" style="width: 650px" class="wp-caption aligncenter">
  <a href="http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/fun.jpg" target="_blank"><img class="wp-image-498 size-large" src="http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/fun-1024x768.jpg" alt="fun" width="640" height="480" srcset="http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/fun-1024x768.jpg 1024w, http://www.michaelbromley.co.uk/api/wp-content/uploads/2015/10/fun-300x225.jpg 300w" sizes="(max-width: 640px) 100vw, 640px" /></a>
  
  <p class="wp-caption-text">
    Connecting!
  </p>
</div>

 [1]: http://angularconnect.com/
 [2]: https://www.youtube.com/channel/UCzrskTiT_ObAk3xBkVxMz5g/videos
 [3]: https://docs.google.com/presentation/d/1r1ffV-shRXHXct9DbJRVesNs6oLLk8PFGQvlE1zLpRE/preview?slide=id.ge4d624f6e_1_796
 [4]: https://www.youtube.com/watch?v=UxjgUjVpe24
 [5]: https://github.com/angular/angular/labels/P1%3A%20urgent
 [6]: https://docs.google.com/presentation/d/1r1ffV-shRXHXct9DbJRVesNs6oLLk8PFGQvlE1zLpRE/preview?slide=id.ge4d624f6e_1_788
 [7]: https://docs.google.com/presentation/d/1r1ffV-shRXHXct9DbJRVesNs6oLLk8PFGQvlE1zLpRE/preview?slide=id.ge4d624f6e_1_106
 [8]: https://www.youtube.com/watch?v=MtoHFDfi8FM
 [9]: https://docs.google.com/presentation/d/1r1ffV-shRXHXct9DbJRVesNs6oLLk8PFGQvlE1zLpRE/preview?slide=id.ge4d624f6e_1_121
 [10]: https://youtu.be/UxjgUjVpe24?t=23m26s
 [11]: https://github.com/angular/angular/blob/master/modules/angular2/testing.ts
 [12]: https://www.youtube.com/watch?v=C0F2E-PRm44
 [13]: https://www.youtube.com/watch?v=z1NB-HG0ZH4
 [14]: https://www.youtube.com/watch?v=LS3aewTkfHI
 [15]: https://github.com/rkirov/angular2-tour-of-heroes
 [16]: https://angular.io/docs/ts/latest/guide/
 [17]: https://github.com/Reactive-Extensions/RxJS
 [18]: https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
 [19]: https://www.youtube.com/watch?v=bVI5gGTEQ_U
 [20]: https://www.youtube.com/watch?v=KOOT7BArVHQ
 [21]: https://www.youtube.com/watch?v=9odY9Rh5kTQ
 [22]: https://www.youtube.com/watch?v=4YmnbGoh49U
 [23]: https://www.youtube.com/watch?v=_TDUV9R09PM
 [24]: http://blogs.msdn.com/b/typescript/archive/2015/09/16/announcing-typescript-1-6.aspx
 [25]: https://www.youtube.com/watch?v=yy4c0hzNXKw
 [26]: https://docs.angularjs.org/api/ng/directive/ngTransclude#multi-slot-transclusion
 [27]: https://github.com/shahata/angular.js/commit/b03fa5dd4ca011f90aa3fdfa0b6790b16da8f374
 [28]: https://github.com/ngUpgraders/ng-forward
 [29]: https://www.youtube.com/watch?v=uXvNDcnLnwU
 [30]: https://github.com/angular/angular/tree/9d0d33f95a8fa12ba8a1b373d851e6ccc37208c5/modules/playground/src/upgrade
 [31]: https://docs.google.com/presentation/d/1r1ffV-shRXHXct9DbJRVesNs6oLLk8PFGQvlE1zLpRE/preview?slide=id.ge4d624f6e_1_21
 [32]: https://www.youtube.com/watch?v=4SbiiyRSIwo
 [33]: http://ionic.io/2
 [34]: https://material.angularjs.org/latest/
 [35]: https://www.youtube.com/watch?v=363o4i0rdvU
 [36]: http://gentics.com/