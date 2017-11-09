---
date: 2017-11-09T10:45:59+02:00
title: Notes on AngularConnect 2017
type: post
categories:
  - post 
tags:
  - angular
---


I write this from somewhere above Western Europe as I fly back to Vienna from the AngularConnect conference which just 
took place in London. Since a lot of the news and announcements from conferences typically take a long time to 
percolate out into the wider community, I thought I'd jot down a few notes of the things which I found interesting from 
the talks I saw (it was multi-track so I missed at least as much).

{{< figure src="/media/2017/11/docklands.jpg" >}}

## Adoption

There always seems to be interest in the adoption of Angular both within Google and by other companies. In the past 
I've noticed an anxiety about the degree to which Google "dogfood" the framework, as some kind of indicator of whether 
it's safe for us to eat too. "Why don't Google write Google Maps / Gmail in Angular?!" and so on. Personally this has 
never been too much of a concern for me. People perhaps forget the vast armies of Angular developers working on 
line-of-business and enterprise apps which are hidden away within the corporate intranets of the world. I know this 
because I've seen them. I've *built* them. Not cool, not sexy, but potentially some of the most complex apps you could 
think of. 

However, for those who are interested, the opening keynote included some pretty impressive stats (which I forgot to note down) 
about the number of internal Google apps built with Angular or AngularJS (I believe it was on the order of hundreds). 
Public-facing examples include Google Cloud Platform and Google Analytics. Moreover, the AngularJS apps are being migrated 
to Angular in increasing numbers (see the chart below).

Then there's the big-name apps. 
The keynotes featured some interesting case studies from Forbes (whose website is a server-rendered Angular 
app), NBA.com (some kind of American version of netball, apparently very big), and all the VMware admin apps - an 
indication that Angular is as well-suited to content-heavy public-facing apps as to the forms-over-data type of app
that many of us have the pleasure of working on.

{{< figure src="/media/2017/11/angular-migration.jpg" title="Scientific chart of the rate of AngularJS to Angular migration within Google." >}}

[Keynote Slides](https://docs.google.com/presentation/d/e/2PACX-1vRiuE9JSG2nhtr8pDO5GEl91ZnAX9Ry96F0ZcmPjMIeCTWEiNkrThDaPhyHHXkG-uarvCo6qCUgt-li/pub?start=false&loop=false&delayms=3000&slide=id.g274ad2734c_0_620)

## i18n

"i18n" stands for "internationalization", which refers to making your app able to conform to the language and 
conventions of more than one country or locale. As a spoiled English speaker I never used to give this any thought. 
However, since moving to Austria a few years ago, I discovered that many do not enjoy this luxury; 
indeed I now deal with it on an almost daily basis. So I was very interested to hear what my buddy [Olivier 
Combe](https://twitter.com/OCombe) had to say about it. 

Olivier is the maintainer of the ngx-translate library and now works with the Angular core team to improve i18n support 
in Angular itself. I'll be honest: I never touched the Angular i18n solution because 1) it is scary and 2) it doesn't 
do everything I need - specifically it can only translate templates, and not things like toast notifications triggered 
by code.

Here's what I noted down:

* Angular 5 no longer uses the browser-native intl API. This means we no longer need to polyfill it, which is nice 
since the polyfill is about 50kb.
* There is a really nice API for making components (e.g. 3rd party libs) i18n-ready in terms of number & date formats. 
Looks like there is still a little work to be done here but it's very promising.
* The really exciting stuff: there are plans to enable run-time translations so that each locale does not require its 
own JS bundle, and also plans to enable translations in code.
* Overall it seems that the plan is that the built-in Angular i18n solution will make ngx-translate obsolete.

[Slides for Olivier's talk](https://docs.google.com/presentation/d/19z2aQs0NwgX1xnkeEkj8jJNPS_aGz3utFcPjql51CXQ/edit#slide=id.g29442ee2c1_0_159)

## Angular Elements

{{< figure src="/media/2017/11/angular-elements.gif" >}}

Angular Elements is a project being developed in Angular Labs (a secret bunker below Mountain View with 
bubbling test tubes and mice) which is potentially huge. The basic idea is to be able to bundle an Angular component as a custom 
element (web component) which can then be used just like any regular HTML tag in any context. The consumer of the 
component need know nothing about Angular, and the inputs (properties / attributes) and outputs (events) work exactly 
like any native HTML element. Rob Wormold gave a demo where he uses it to create a progress bar component which he 
then throws onto a regular HTML document and even inside a Preact app.

In my company I'm working on a shared component library which would potentially be used across many front-end teams, 
not all of whom use Angular. Rather than needing several implementations of each component, Angular Elements might 
enable us to build once and then use anywhere. My main concern right now would be the size of each component. It's not 
clear how much of the Angular framework needs to be bundled up and ship with each component, but of course a custom 
button element which comes with 50kb of JavaScript is of course not viable. This seems to be an area which is still 
being worked on, and I really hope it works out.

[Slides for Rob's talk](https://docs.google.com/presentation/d/1jiXHYwfe1iSUiVLdKLFhSPRHLI_FmIvrI60QTpP6KLk/edit#slide=id.g26d86d3325_0_0)

[Demo of Angular Elements running in Preact](http://jsfiddle.net/u9m5x0L7/243/)

## Server-side rendering

All my Angular projects live behind the Great Corporate Firewall, so server-side rendering (SSR) has never been a 
priority for me, and to be honest I would have thought to use a completely different technology were I to build a 
public-facing app where SEO and crawlability were top priority - e.g. an ecommerce website. Jeff Cross disabused me of 
this notion with his talk on SSR. He covers a number of strategies for handling SSR, such as:

* Server-render each request newly
* Server-render on first request for that route and then cache
* Render all or a subset of routes a build time and then serve static HTML

There's a whole spectrum from "render a basic app shell, load the rest on bootstrap" all the way to "server-render 
the full current state of the app, record all user interactions, replay events after bootstrap". The point is that you 
can be pragmatic about what level of complexity is actually worth it for your particular use-case. I'm pretty interested to
try some of these approaches out on upcoming public apps.

{{< figure src="/media/2017/11/ssr-chart.jpg" title="Chart illustrating various SSR strategies appropriate for different types of page." >}}

[Slides from Jeff's talk](https://drive.google.com/file/d/1EHJqMNygBWjDp7ymgWPnD1-CxHjGuFTT/view)

## Animations

Whenever I've looked at the Angular animations API, I always thought "nah". It just seemed too weird and verbose, and
thus far I've managed to get by just fine with good old CSS transitions. Lukas Ruebbelke's talk on Animations was perhaps
the tipping point where I had to concede that there was *no way* that stuff could be more easily done with CSS. 

I can't find Lukas' demo, but I believe all of the concepts are covered in [this post by Matias Niemelä](https://www.yearofmoo.com/2017/06/new-wave-of-animation-features.html)
who is the author of the Angular animations module.

In particular, animating between route transitions and the crazy advanced stuff made possible with the AnimationBuilder
API blew me away. I'll still probably use CSS transitions for most of the simple stuff, but I'm pretty excited to
see what I can do with the more sophisticated stuff now on offer.

## The Rest

A few other random notes I made:

* The Angular team are working on making their internal toolchain, consisting of Angular, Bazel (a build tool) and 
the Closure compiler ("ABC") available and more easily useable to the outside world. There's a talk on this by Rado 
Kirov which I unfortunately did not get to see, but [the slides are here](https://docs.google.com/presentation/d/1EudIzQvz9gzVPr0UdP1DymlbhfG29kFCeiJVVEE_FVw/edit#slide=id.g239c7f86c7_0_0).
* [Minko Gechev](https://twitter.com/mgechev) did a deep-dive into runtime performance optimizations. Very thorough and 
well worth a look. [Slides are here](https://speakerdeck.com/mgechev/purely-fast)
* [Dominik Kundel](https://twitter.com/DKundel) did a fantastic but frankly frightening talk & demo on web security which 
 made me consider becoming a farmer so I don't have to deal with all that stuff. [Slides are here](https://speakerdeck.com/dkundel/angular-connect-17-intro-to-web-security)
* This was my third time at AngularConnect. There was a distinct shift towards more advanced topics this time, which I'm
sure is welcome for most of us who work with Angular day-to-day. In particular, the talks by Kara Erikson 
([slides](https://docs.google.com/presentation/d/e/2PACX-1vTS20UdnMGqA3ecrv7ww_7CDKQM8VgdH2tbHl94aXgEsYQ2cyjq62ydU3e3ZF_BaQ64kMyQa0INe2oI/pub?start=false&loop=false&delayms=3000&slide=id.p))
on advanced forms and Alex Rickabaugh (can't find the slides, wait for the video) were very good in that regard.

Go and follow [@AngularConnect](https://twitter.com/AngularConnect) on twitter to find out when the videos become available.
