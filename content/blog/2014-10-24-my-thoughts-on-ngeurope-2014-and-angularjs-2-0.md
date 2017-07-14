---
title: My Thoughts on ngEurope 2014 and AngularJS 2.0
author: michael-bromley
type: post
date: 2014-10-24T08:30:18+00:00
url: /267/my-thoughts-on-ngeurope-2014-and-angularjs-2-0
categories:
  - post
tags:
  - Angular 2
  - AngularJS
  - ngEurope

---
I write this from a tiny apartment in Paris, sitting up in bed on a sleepy Friday morning after a crazy couple of days at the ngEurope conference. I would like to share a few thoughts and experiences about what I&#8217;ve seen and learned over the past couple of days. This isn&#8217;t going to be a purely technical blog post. I also won&#8217;t try to be comprehensive in covering all the talks. I&#8217;ll give you my impressions of the whole experience and make a few comments on some of the particular topics and announcements that really stood out for me. If you really want to find out the detailed content of these talks, check out the <a href="https://www.youtube.com/channel/UCEGUP3TJJfMsEM_1y8iviSQ" target="_blank">videos on YouTube</a> as soon as they have been posted.

## Background

For those that don&#8217;t know, ngEurope is the first European conference dedicated to the <a href="http://www.angularjs.org" target="_blank">AngularJS </a>framework. Prior to this there has been one other conference, <a href="http://ng-conf.org/" target="_blank">ng-conf</a>, which happened earlier this year in Utah, USA. As with ng-conf, many of the core Angular devs were in attendance and speaking at this event.

The conference was pretty huge. There were about 800 attendees altogether. You can get an idea of the scale from this photo that I took at the start of the first day:

<div id="attachment_270" style="width: 650px" class="wp-caption aligncenter">
  <a href="/media/2014/10/WP_20141022_09_33_06_Pro.jpg" target="_blank"><img class="wp-image-270 size-large" src="/media/2014/10/WP_20141022_09_33_06_Pro-1024x576.jpg" alt="ngEurope was pretty huge" width="640" height="360" srcset="/media/2014/10/WP_20141022_09_33_06_Pro-1024x576.jpg 1024w, /media/2014/10/WP_20141022_09_33_06_Pro-300x168.jpg 300w" sizes="(max-width: 640px) 100vw, 640px" /></a>
  
  <p class="wp-caption-text">
    ngEurope was pretty huge
  </p>
</div>

## Angular 1.3

The talks by the Angular core devs were roughly split between addressing Angular 1.3 concerns and Angular 2.0 &#8211; with more emphasis on the latter (since that was what most people were here to find out about, I suspect).

With Angular 1.3, the information is already out there since it was released in stable form last week. Prior to ngEurope, I had heard about various improvements to the API that come along with 1.3 such as one-time bindings and the ngMessages module, but I honestly wasn&#8217;t overly excited about it. I didn&#8217;t feel a compelling reason to upgrade my current project from 1.2.x to 1.3, for example.

By the end of the conference I am convinced of the need to upgrade. Turns out that as well as new APIs, there are under-the-hood improvements which can yield a significant (I think I remember up to a factor of four being mentioned) speed benefits to your app &#8211; depending on your use case, of course &#8211; for free. One example of something I had no idea about was that you can <a href="https://docs.angularjs.org/guide/production#disabling-debug-data" target="_blank">disable debug info which Angular adds to any data-bound elements</a>, to improve performance of your app in production.

With so much talk and excitement surrounding Angular 2.0, developers are understandably concerned about whether it is worth investing time now into a large Angular 1.x project, and whether they need to do anything special to prepare for an eventual migration to 2.0. The overall sentiment from the Angular team was to definitely upgrade to 1.3 if you are still on 1.2.x, and then just write the best, most consistent 1.3 code you can.

Asked about support for 1.3 once 2.0 is released, Brad Green conjectured that we could expect 1 &#8211; 1 1/2 years of support for 1.3 _after_ the final stable release of Angular 2.0. Considering the fact that 2.0 is still very much in an experimental stage, with many implementation details not yet even decided upon, I would say that gives us at least a few years of full support for 1.3. It is also of note that in his talk, Rob Eisenberg (who is writing the new router for 2.0) stated that the 2.0 router will be ported to 1.3. Perhaps this may happen with other 2.0 modules &#8211; we&#8217;ll have to wait and see.

## Angular 2.0

Angular 2.0 &#8211; the topic on every Angular dev&#8217;s mind during this conference. Firstly, there was _a lot_ of information given about it over several talks and the Q & A session. I&#8217;ll comment here on a few points that stood out to me the most. Again, you need to watch the videos as soon as they are online.

### AtScript &#8211; Not A New Language

You might have heard from recent talks or podcasts about how Angular 2.0 is being written in a way that incorporates extensions to the JavaScript language for typing and annotations. In his talk, Miško announced this as a superset of JavaScript known as **_AtScript_**. He was at pains to stress the fact that this is not a new language, rather it is more akin to something like TypeScript wherein additions to the native JavaScript syntax are optional, and everything gets transpiled to JavaScript. In fact, as you can see in the photo below, AtScript is actually a superset of TypeScript, and uses the exact same type and class syntax as TypeScript, but then adds additional annotations and introspection capabilities.

<div id="attachment_271" style="width: 733px" class="wp-caption aligncenter">
  <a href="/media/2014/10/misko1.jpg" target="_blank"><img class="wp-image-271 size-full" src="/media/2014/10/misko1.jpg" alt="AtScript is a superset of TypeScript" width="723" height="445" srcset="/media/2014/10/misko1.jpg 723w, /media/2014/10/misko1-300x184.jpg 300w" sizes="(max-width: 723px) 100vw, 723px" /></a>
  
  <p class="wp-caption-text">
    AtScript is a superset of TypeScript
  </p>
</div>

For those who are skeptical about the need for such an extension to JavaScript, Miško made it clear that if you don&#8217;t want to, you don&#8217;t need to use AtScript at all. You could write an Angular 2.0 app in ES5 if you like. However, it is not recommended.

Personally I welcome this announcement. I am already using TypeScript in a large Angular project for the benefits of improved tooling support (better auto-completes and refactoring, static analysis) and the assurances of contracts that become all the more necessary as your code base grows.

The Angular team have a lot of respect for the TypeScript project, and from the Q & A session it seems that TypeScript was even considered for Angular 2.0 before AtScript was developed (but for various reasons was not a viable option at the time). Anyway, here is what Anders Hejlsberg (creator of TypeScript) had to say about the announcement a few hours later:

<blockquote class="twitter-tweet" lang="en">
  <p>
    TypeScript + Angular v2. Will be fun making them play well together. <a href="https://twitter.com/hashtag/typescript?src=hash">#typescript</a> <a href="https://twitter.com/hashtag/AngularJS?src=hash">#AngularJS</a> <a href="https://twitter.com/hashtag/ngeurope?src=hash">#ngeurope</a> <a href="https://twitter.com/hashtag/javascript?src=hash">#javascript</a>
  </p>
  
  <p>
    — Anders Hejlsberg (@ahejlsberg) <a href="https://twitter.com/ahejlsberg/status/525313767672791040">October 23, 2014</a>
  </p>
</blockquote>



Here is a slide that shows what AtScript will look like in the context of an Angular 2.0 directive:

<div id="attachment_273" style="width: 650px" class="wp-caption aligncenter">
  <a href="/media/2014/10/misko2.jpg" target="_blank"><img class="wp-image-273 size-large" src="/media/2014/10/misko2-1024x558.jpg" alt="An Angular 2.0 directive written in AtScript" width="640" height="348" srcset="/media/2014/10/misko2-1024x558.jpg 1024w, /media/2014/10/misko2-300x163.jpg 300w, /media/2014/10/misko2.jpg 1556w" sizes="(max-width: 640px) 100vw, 640px" /></a>
  
  <p class="wp-caption-text">
    An Angular 2.0 directive written in AtScript
  </p>
</div>

A few other points to note about AtScript

  * It will transpile to both JavaScript and Dart. Thus, with Angular 2.0, both AngularJS & AngularDart will share a common code base.
  * Since AtScript is a superset of TypeScript, TypeScript is valid AtScript (as are both ES6 and ES5).
  * Miško also presented a roadmap for AtScript which included full alignment with TypeScript and an eventual proposal to ECMA as a standard (perhaps a future version of ECMAScript).
  * There has been talk already with the major IDEs to support these language extensions. Since TypeScript already has pretty good support in various IDEs, the addition of annotations would not be a huge undertaking.

### Igor & Tobias Kill Everything

Igor Minar and Tobias Bosch gave a talk ostensibly about &#8220;Templating in Angular 2.0&#8221;. In fact, the talk was more akin to the <a href="http://gameofthrones.wikia.com/wiki/Red_Wedding" target="_blank">&#8220;Red Wedding&#8221; episode of Game of Thrones</a>, only this time it was all your familiar APIs from Angular 1.x that were being massacred. Here&#8217;s what I mean:

<div id="attachment_274" style="width: 650px" class="wp-caption aligncenter">
  <a href="/media/2014/10/redweddingangular.jpg" target="_blank"><img class="wp-image-274 size-large" src="/media/2014/10/redweddingangular-1024x768.jpg" alt="Angular 2.0 Kills off many APIs from 1.x" width="640" height="480" srcset="/media/2014/10/redweddingangular-1024x768.jpg 1024w, /media/2014/10/redweddingangular-300x225.jpg 300w" sizes="(max-width: 640px) 100vw, 640px" /></a>
  
  <p class="wp-caption-text">
    Angular 2.0 Kills off many APIs from 1.x
  </p>
</div>

So, that&#8217;s

  * Controllers
  * Directive definition objects
  * $scope
  * angular.module
  * jQlite

All completely gone. Pretty radical, right? So what&#8217;s left?

It seems there has been a fundamental re-think of Angular from the ground up. For all of us who have invested our time to master the current APIs, this may come as upsetting news. I personally am very glad to see what is coming. Yes, I&#8217;ve put in the hours to wrestle with transclusion, isolate scopes and all that &#8211; and perhaps it is a badge of pride that I can now tame the beast &#8211; but when I step back I can see that the radically simpler and more consistent API being hinted at with Angular 2.0 will make progress possible. Not only that, I think it will drive adoption for the next generation of Angular application developers who will no longer need to go through the famous <a href="http://www.bennadel.com/blog/2439-my-experience-with-angularjs-the-super-heroic-javascript-mvw-framework.htm" target="_blank">Ben Nadel Angular Learning Curve</a>.

As for how Angular actually will work without these staple APIs, you&#8217;ll have to watch the video when available as I was still reeling from the shock and didn&#8217;t take it all in. What I can show you is a slide of a how a directive will look in Angular 2.0 (as with all of 2.0 currently, I guess this is subject to change):

<div id="attachment_275" style="width: 650px" class="wp-caption aligncenter">
  <a href="/media/2014/10/angular2directive.jpg" target="_blank"><img class="wp-image-275 size-large" src="/media/2014/10/angular2directive-1024x618.jpg" alt="A template in Angular 2.0" width="640" height="386" srcset="/media/2014/10/angular2directive-1024x618.jpg 1024w, /media/2014/10/angular2directive-300x181.jpg 300w, /media/2014/10/angular2directive.jpg 1595w" sizes="(max-width: 640px) 100vw, 640px" /></a>
  
  <p class="wp-caption-text">
    A template in Angular 2.0
  </p>
</div>

A few more points on this:

  * The inclusion of jQlite was found to be a performance bottleneck. Micro-optimization was attempted but it was deemed better to just scrap it and operate with the native DOM API instead. Since Angular 2.0 is aimed exclusively at so-called _evergreen_ browsers, I can see the logic behind this. I personally find myself using native APIs more and more. However, you will still be free to include and use jQuery if you want the simplified DOM traversal and all that.
  * In a talk on AngularDart, there was a slide which showed how AngularDart apps use shadow DOM to encapsulate their components (which I understand to be the equivalent of isolate-scope directives). In the Q & A I asked whether shadow DOM will also feature in Angular 2.0, and Miško answered emphatically yes.
  * If you look at the earlier photo of Miško&#8217;s talk where he shows a directive definition, you can see that CSS selectors are used to associate directives with DOM elements. I&#8217;m not sure what the implications of this are, but it feels like a good move towards following more common practices and reducing the number of new concepts that are required to get started with Angular.

## The Rest

So those were the main technical matters that I wanted to comment on while it is still somewhat fresh in my mind. I won&#8217;t cover the rest of the talks here in much detail, but I will mention a few highlights:

  * Andy Joslin gave a great demo of the <a href="http://ionicframework.com/" target="_blank">Ionic framework</a>. I don&#8217;t know whether I am more impressed with the framework itself or his speed-coding skills. He wrote a whole app from scratch in about 20 minutes.
  * Mattieu Lux did a talk entitled &#8220;AngularJS From Scratch&#8221;. I saw the title and wondered whether he really meant that. He did. He started with an empty file, and implemented a simplified but function version of Angular&#8217;s two-way data-binding; including things like scope, digest and watchers. It was amazing, and one of the single most illuminating explanations I have witnessed of the &#8220;magic&#8221; behind Angular.
  * Back at ng-conf, Dave Smith did a talk on directives which really helped me understand them at a deeper level. This time he talks about the $q service and promises in general. Again he does a great job of explaining concepts which can be initially a little tricky to appreciate. Even if you already &#8220;know&#8221; promises, it&#8217;s worth checking out.
  * Vojta Jina did a sort of exploratory talk in which he compared our craft to that of architects. The main point I got was that the use of pure functions and immutability are desirable in term of achieving clarity in your code. It gave me food for thought and will probably inspire some refactorings when I get home!
  * The Q & A session was very good. A wide range of topics covered and genuinely useful answers regarding the future of 1.3 and the transition to 2.0.

## Lightning Talks

A few weeks before the conference, I got an email from the organizer announcing that there would be a lightning talk contest. Since I&#8217;ve had a vague goal to speak at a conference sometime in 2015, I thought it would be a good first step to at least submit a proposal &#8211; not that it would be picked. But the gesture is what counts.

A week or so later I found out my proposal had been accepted. A little nervous, I assured myself that the lightning talks would probably take place in some separate, smaller room after hours, and maybe 50 or 100 people would turn up.

Turns out I was wrong. We were in the main hall, at the end of the first day, in front of an audience of 700 or so, and being judged by Brad Green. Gulp. Here is a photo I took from the stage right after my talk (which was my equivalent of &#8220;Hi mum!&#8221;):

<div id="attachment_269" style="width: 650px" class="wp-caption aligncenter">
  <a href="/media/2014/10/WP_20141022_17_54_23_Pro1.jpg" target="_blank"><img class="wp-image-269 size-large" src="/media/2014/10/WP_20141022_17_54_23_Pro1-1024x576.jpg" alt="The view from the stage" width="640" height="360" srcset="/media/2014/10/WP_20141022_17_54_23_Pro1-1024x576.jpg 1024w, /media/2014/10/WP_20141022_17_54_23_Pro1-300x168.jpg 300w" sizes="(max-width: 640px) 100vw, 640px" /></a>
  
  <p class="wp-caption-text">
    The view from the stage
  </p>
</div>

To be honest I didn&#8217;t really appreciate any of the talks that came before mine, as I was too zoned out as I ran through my talk in my head. But check them out &#8211; I think they&#8217;ll find their way on to YouTube too at some point. If you are interested, mine was about <a href="https://github.com/michaelbromley/angularUtils/tree/master/src/directives/pagination" target="_blank">the pagination module I have written</a>, and I came second and won some pretty nice Jaybird Bluebuds and a Chromecast!

I&#8217;ve just got to mention how approachable and generally what a sound bloke Brad is. He took the time to speak with each of the lightning talkers and had a positive thing to say to each, and seemed genuinely interested in the ideas presented.

## Conclusion

I&#8217;ve had a great time here at ngEurope and I&#8217;d like to congratulate the organizers for making it happen. Yeah, you might read some moaning tweets about the crap wi-fi at the venue and the coffee break with no coffee, but overall I think it was a very well-executed event and &#8211; more importantly &#8211; the content of the presentations was pretty much exactly what I was looking for. Those members of the Angular team and other speakers I got a chance to speak to were all very friendly and willing to discuss ideas. There was a definite community spirit during the conference and afterwards; I met and got to know many very cool new people from all over Europe and beyond.

I&#8217;m excited about the direction of Angular 2.0, and I&#8217;m eager to upgrade my projects to 1.3 and take advantage of the improvements available right there. I&#8217;ll still keep digging into the Angular 1.x source and trying to refine my understanding. After all, we all still have years with this framework.

I&#8217;m off to spend the day exploring Paris now. It&#8217;ll be the first time I see daylight since I arrived on Tuesday evening.

Au revoir!

&nbsp;

<div id="attachment_281" style="width: 650px" class="wp-caption aligncenter">
  <a href="/media/2014/10/WP_20141022_11_25_39_Pro.jpg" target="_blank"><img class="wp-image-281 size-large" src="/media/2014/10/WP_20141022_11_25_39_Pro-1024x576.jpg" alt="Vojta talks achitecture" width="640" height="360" srcset="/media/2014/10/WP_20141022_11_25_39_Pro-1024x576.jpg 1024w, /media/2014/10/WP_20141022_11_25_39_Pro-300x168.jpg 300w" sizes="(max-width: 640px) 100vw, 640px" /></a>
  
  <p class="wp-caption-text">
    Vojta talks achitecture
  </p>
</div>

<div id="attachment_282" style="width: 650px" class="wp-caption aligncenter">
  <a href="/media/2014/10/WP_20141022_12_31_23_Pro.jpg" target="_blank"><img class="wp-image-282 size-large" src="/media/2014/10/WP_20141022_12_31_23_Pro-1024x576.jpg" alt="Time for some intriguing foodstuffs" width="640" height="360" srcset="/media/2014/10/WP_20141022_12_31_23_Pro-1024x576.jpg 1024w, /media/2014/10/WP_20141022_12_31_23_Pro-300x168.jpg 300w" sizes="(max-width: 640px) 100vw, 640px" /></a>
  
  <p class="wp-caption-text">
    Time for some intriguing foodstuffs
  </p>
</div>

<div id="attachment_283" style="width: 650px" class="wp-caption aligncenter">
  <a href="/media/2014/10/WP_20141023_19_06_32_Pro.jpg" target="_blank"><img class="wp-image-283 size-large" src="/media/2014/10/WP_20141023_19_06_32_Pro-1024x576.jpg" alt="The Q & A session" width="640" height="360" srcset="/media/2014/10/WP_20141023_19_06_32_Pro-1024x576.jpg 1024w, /media/2014/10/WP_20141023_19_06_32_Pro-300x168.jpg 300w" sizes="(max-width: 640px) 100vw, 640px" /></a>
  
  <p class="wp-caption-text">
    The Q & A session
  </p>
</div>

<div id="attachment_284" style="width: 650px" class="wp-caption aligncenter">
  <a href="/media/2014/10/WP_20141023_19_08_46_Pro.jpg" target="_blank"><img class="wp-image-284 size-large" src="/media/2014/10/WP_20141023_19_08_46_Pro-1024x576.jpg" alt="The organizers and speakers" width="640" height="360" srcset="/media/2014/10/WP_20141023_19_08_46_Pro-1024x576.jpg 1024w, /media/2014/10/WP_20141023_19_08_46_Pro-300x168.jpg 300w" sizes="(max-width: 640px) 100vw, 640px" /></a>
  
  <p class="wp-caption-text">
    The organizers and speakers
  </p>
</div>

<div id="attachment_280" style="width: 586px" class="wp-caption aligncenter">
  <a href="/media/2014/10/WP_20141022_22_29_00_Pro.jpg" target="_blank"><img class="wp-image-280 size-large" src="/media/2014/10/WP_20141022_22_29_00_Pro-576x1024.jpg" alt="Au revoir Paris" width="576" height="1024" srcset="/media/2014/10/WP_20141022_22_29_00_Pro-576x1024.jpg 576w, /media/2014/10/WP_20141022_22_29_00_Pro-168x300.jpg 168w, /media/2014/10/WP_20141022_22_29_00_Pro.jpg 1080w" sizes="(max-width: 576px) 100vw, 576px" /></a>
  
  <p class="wp-caption-text">
    Au revoir Paris
  </p>
</div>