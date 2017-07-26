---
title: My Thoughts on ngEurope 2014 and AngularJS 2.0
author: michael-bromley
type: post
date: 2014-10-24T08:30:18+00:00
aliases:
  - blog/267/my-thoughts-on-ngeurope-2014-and-angularjs-2-0
categories:
  - post
tags:
  - Angular
  - AngularJS
  
---
I write this from a tiny apartment in Paris, sitting up in bed on a sleepy Friday morning after a crazy couple of days at the ngEurope conference. I would like to share a few thoughts and experiences about what I've seen and learned over the past couple of days. This isn't going to be a purely technical blog post. I also won't try to be comprehensive in covering all the talks. I'll give you my impressions of the whole experience and make a few comments on some of the particular topics and announcements that really stood out for me. If you really want to find out the detailed content of these talks, check out the [videos on YouTube](https://www.youtube.com/channel/UCEGUP3TJJfMsEM_1y8iviSQ) as soon as they have been posted.

## Background

For those that don't know, ngEurope is the first European conference dedicated to the [AngularJS ](http://www.angularjs.org)framework. Prior to this there has been one other conference, [ng-conf](http://ng-conf.org/), which happened earlier this year in Utah, USA. As with ng-conf, many of the core Angular devs were in attendance and speaking at this event.

The conference was pretty huge. There were about 800 attendees altogether. You can get an idea of the scale from this photo that I took at the start of the first day:

{{< figure src="/media/2014/10/WP_20141022_09_33_06_Pro-1024x576.jpg" title="ngEurope was pretty huge" >}}

## Angular 1.3

The talks by the Angular core devs were roughly split between addressing Angular 1.3 concerns and Angular 2.0 - with more emphasis on the latter (since that was what most people were here to find out about, I suspect).

With Angular 1.3, the information is already out there since it was released in stable form last week. Prior to ngEurope, I had heard about various improvements to the API that come along with 1.3 such as one-time bindings and the ngMessages module, but I honestly wasn't overly excited about it. I didn't feel a compelling reason to upgrade my current project from 1.2.x to 1.3, for example.

By the end of the conference I am convinced of the need to upgrade. Turns out that as well as new APIs, there are under-the-hood improvements which can yield a significant (I think I remember up to a factor of four being mentioned) speed benefits to your app - depending on your use case, of course - for free. One example of something I had no idea about was that you can [disable debug info which Angular adds to any data-bound elements](https://docs.angularjs.org/guide/production#disabling-debug-data), to improve performance of your app in production.

With so much talk and excitement surrounding Angular 2.0, developers are understandably concerned about whether it is worth investing time now into a large Angular 1.x project, and whether they need to do anything special to prepare for an eventual migration to 2.0. The overall sentiment from the Angular team was to definitely upgrade to 1.3 if you are still on 1.2.x, and then just write the best, most consistent 1.3 code you can.

Asked about support for 1.3 once 2.0 is released, Brad Green conjectured that we could expect 1 - 1 1/2 years of support for 1.3 _after_ the final stable release of Angular 2.0. Considering the fact that 2.0 is still very much in an experimental stage, with many implementation details not yet even decided upon, I would say that gives us at least a few years of full support for 1.3. It is also of note that in his talk, Rob Eisenberg (who is writing the new router for 2.0) stated that the 2.0 router will be ported to 1.3. Perhaps this may happen with other 2.0 modules - we'll have to wait and see.

## Angular 2.0

Angular 2.0 - the topic on every Angular dev's mind during this conference. Firstly, there was _a lot_ of information given about it over several talks and the Q & A session. I'll comment here on a few points that stood out to me the most. Again, you need to watch the videos as soon as they are online.

### AtScript - Not A New Language

You might have heard from recent talks or podcasts about how Angular 2.0 is being written in a way that incorporates extensions to the JavaScript language for typing and annotations. In his talk, Miško announced this as a superset of JavaScript known as **_AtScript_**. He was at pains to stress the fact that this is not a new language, rather it is more akin to something like TypeScript wherein additions to the native JavaScript syntax are optional, and everything gets transpiled to JavaScript. In fact, as you can see in the photo below, AtScript is actually a superset of TypeScript, and uses the exact same type and class syntax as TypeScript, but then adds additional annotations and introspection capabilities.

{{< figure src="/media/2014/10/misko1.jpg" title="AtScript is a superset of TypeScript" >}}

For those who are skeptical about the need for such an extension to JavaScript, Miško made it clear that if you don't want to, you don't need to use AtScript at all. You could write an Angular 2.0 app in ES5 if you like. However, it is not recommended.

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

{{< figure src="/media/2014/10/misko2-1024x558.jpg" title="An Angular 2.0 directive written in AtScript" >}}

A few other points to note about AtScript

  * It will transpile to both JavaScript and Dart. Thus, with Angular 2.0, both AngularJS & AngularDart will share a common code base.
  * Since AtScript is a superset of TypeScript, TypeScript is valid AtScript (as are both ES6 and ES5).
  * Miško also presented a roadmap for AtScript which included full alignment with TypeScript and an eventual proposal to ECMA as a standard (perhaps a future version of ECMAScript).
  * There has been talk already with the major IDEs to support these language extensions. Since TypeScript already has pretty good support in various IDEs, the addition of annotations would not be a huge undertaking.

### Igor & Tobias Kill Everything

Igor Minar and Tobias Bosch gave a talk ostensibly about "Templating in Angular 2.0". In fact, the talk was more akin to the ["Red Wedding" episode of Game of Thrones](http://gameofthrones.wikia.com/wiki/Red_Wedding), only this time it was all your familiar APIs from Angular 1.x that were being massacred. Here's what I mean:

{{< figure src="/media/2014/10/redweddingangular-1024x768.jpg" title="Angular 2.0 Kills off many APIs from 1.x" >}}

So, that's

  * Controllers
  * Directive definition objects
  * $scope
  * angular.module
  * jQlite

All completely gone. Pretty radical, right? So what's left?

It seems there has been a fundamental re-think of Angular from the ground up. For all of us who have invested our time to master the current APIs, this may come as upsetting news. I personally am very glad to see what is coming. Yes, I've put in the hours to wrestle with transclusion, isolate scopes and all that - and perhaps it is a badge of pride that I can now tame the beast - but when I step back I can see that the radically simpler and more consistent API being hinted at with Angular 2.0 will make progress possible. Not only that, I think it will drive adoption for the next generation of Angular application developers who will no longer need to go through the famous [Ben Nadel Angular Learning Curve](http://www.bennadel.com/blog/2439-my-experience-with-angularjs-the-super-heroic-javascript-mvw-framework.htm).

As for how Angular actually will work without these staple APIs, you'll have to watch the video when available as I was still reeling from the shock and didn't take it all in. What I can show you is a slide of a how a directive will look in Angular 2.0 (as with all of 2.0 currently, I guess this is subject to change):

{{< figure src="/media/2014/10/angular2directive-1024x618.jpg" title="A template in Angular 2.0" >}}

A few more points on this:

  * The inclusion of jQlite was found to be a performance bottleneck. Micro-optimization was attempted but it was deemed better to just scrap it and operate with the native DOM API instead. Since Angular 2.0 is aimed exclusively at so-called _evergreen_ browsers, I can see the logic behind this. I personally find myself using native APIs more and more. However, you will still be free to include and use jQuery if you want the simplified DOM traversal and all that.
  * In a talk on AngularDart, there was a slide which showed how AngularDart apps use shadow DOM to encapsulate their components (which I understand to be the equivalent of isolate-scope directives). In the Q & A I asked whether shadow DOM will also feature in Angular 2.0, and Miško answered emphatically yes.
  * If you look at the earlier photo of Miško's talk where he shows a directive definition, you can see that CSS selectors are used to associate directives with DOM elements. I'm not sure what the implications of this are, but it feels like a good move towards following more common practices and reducing the number of new concepts that are required to get started with Angular.

## The Rest

So those were the main technical matters that I wanted to comment on while it is still somewhat fresh in my mind. I won't cover the rest of the talks here in much detail, but I will mention a few highlights:

  * Andy Joslin gave a great demo of the [Ionic framework](http://ionicframework.com/). I don't know whether I am more impressed with the framework itself or his speed-coding skills. He wrote a whole app from scratch in about 20 minutes.
  * Mattieu Lux did a talk entitled "AngularJS From Scratch". I saw the title and wondered whether he really meant that. He did. He started with an empty file, and implemented a simplified but function version of Angular's two-way data-binding; including things like scope, digest and watchers. It was amazing, and one of the single most illuminating explanations I have witnessed of the "magic" behind Angular.
  * Back at ng-conf, Dave Smith did a talk on directives which really helped me understand them at a deeper level. This time he talks about the $q service and promises in general. Again he does a great job of explaining concepts which can be initially a little tricky to appreciate. Even if you already "know" promises, it's worth checking out.
  * Vojta Jina did a sort of exploratory talk in which he compared our craft to that of architects. The main point I got was that the use of pure functions and immutability are desirable in term of achieving clarity in your code. It gave me food for thought and will probably inspire some refactorings when I get home!
  * The Q & A session was very good. A wide range of topics covered and genuinely useful answers regarding the future of 1.3 and the transition to 2.0.

## Lightning Talks

A few weeks before the conference, I got an email from the organizer announcing that there would be a lightning talk contest. Since I've had a vague goal to speak at a conference sometime in 2015, I thought it would be a good first step to at least submit a proposal - not that it would be picked. But the gesture is what counts.

A week or so later I found out my proposal had been accepted. A little nervous, I assured myself that the lightning talks would probably take place in some separate, smaller room after hours, and maybe 50 or 100 people would turn up.

Turns out I was wrong. We were in the main hall, at the end of the first day, in front of an audience of 700 or so, and being judged by Brad Green. Gulp. Here is a photo I took from the stage right after my talk (which was my equivalent of "Hi mum!"):

{{< figure src="/media/2014/10/WP_20141022_17_54_23_Pro1-1024x576.jpg" title="The view from the stage" >}}

To be honest I didn't really appreciate any of the talks that came before mine, as I was too zoned out as I ran through my talk in my head. But check them out - I think they'll find their way on to YouTube too at some point. If you are interested, mine was about [the pagination module I have written](https://github.com/michaelbromley/angularUtils/tree/master/src/directives/pagination), and I came second and won some pretty nice Jaybird Bluebuds and a Chromecast!

I've just got to mention how approachable and generally what a sound bloke Brad is. He took the time to speak with each of the lightning talkers and had a positive thing to say to each, and seemed genuinely interested in the ideas presented.

## Conclusion

I've had a great time here at ngEurope and I'd like to congratulate the organizers for making it happen. Yeah, you might read some moaning tweets about the crap wi-fi at the venue and the coffee break with no coffee, but overall I think it was a very well-executed event and - more importantly - the content of the presentations was pretty much exactly what I was looking for. Those members of the Angular team and other speakers I got a chance to speak to were all very friendly and willing to discuss ideas. There was a definite community spirit during the conference and afterwards; I met and got to know many very cool new people from all over Europe and beyond.

I'm excited about the direction of Angular 2.0, and I'm eager to upgrade my projects to 1.3 and take advantage of the improvements available right there. I'll still keep digging into the Angular 1.x source and trying to refine my understanding. After all, we all still have years with this framework.

I'm off to spend the day exploring Paris now. It'll be the first time I see daylight since I arrived on Tuesday evening.

Au revoir!

&nbsp;

{{< figure src="/media/2014/10/WP_20141022_11_25_39_Pro-1024x576.jpg" title="Vojta talks achitecture" >}}

{{< figure src="/media/2014/10/WP_20141022_12_31_23_Pro-1024x576.jpg" title="Time for some intriguing foodstuffs" >}}

{{< figure src="/media/2014/10/WP_20141023_19_06_32_Pro-1024x576.jpg" title="The Q & A session" >}}

{{< figure src="/media/2014/10/WP_20141023_19_08_46_Pro-1024x576.jpg" title="The organizers and speakers" >}}

{{< figure src="/media/2014/10/WP_20141022_22_29_00_Pro-576x1024.jpg" title="Au revoir Paris" >}}