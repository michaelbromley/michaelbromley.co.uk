---
title: An Overview of the ng-conf 2014 Presentations
author: michael-bromley
type: post
date: 2014-01-22T19:10:39+00:00
aliases:
  - blog/15/an-overview-of-the-ng-conf-2014-presentations
categories:
  - post
tags:
  - AngularJS

---
Although I couldn't be there in person, I just finished watching the [entire ng-conf on YouTube](http://www.youtube.com/user/ngconfvideos). Here is my overview of what I learned and what I enjoyed from the presentations. To give you an idea of my perspective, I'm a relatively new AngularJS developer. I'm getting comfortable with the basics and I'm about to embark on a pretty large-scale Angular project. So my main interests in this conference were learning about building at scale, cementing my understanding of the basics, and gaining a deeper appreciation of how all the magic in Angular actually works.

You will all have your own levels of knowledge and your own particular interests, so you'll likely have different favourites, but here I will concentrate firstly on the talks that I personally got the most out of, and then I'll write a bit about many of the other very worthwhile talks, and what most impressed me about them.

Very roughly, I would divide all the talks into three categories:

  1. **Talks dealing with Angular itself**. This includes both talks that focus on one particular technical aspect such as filters, directives or dependency injection, as well as general Angular issues such as the keynote and the team panel.
  2. **Talks dealing with "X" and how it can work with Angular**. This includes talks on third-party products that can integrate with Angular, other languages that can work with Angular, as well as general design or UX approaches and how they can be implemented in Angular.
  3. **Talks that were actually not really about Angular**, but the speaker just tagged on Angular integration in order to make it topical. There were only a couple of these, but they still included some pretty cool demos.

So I'll start off with the pick of the three talks that I found most valuable:

## Dave Smith - Deep Dive into Custom Directives



Directives have the reputation of being a bit complex. Indeed, in the keynote talk, Miško talks about how directives will be simplified in Angular 2.0. But for now, we are stuck with the current implementation, so we'd better learn how to master their use! This talk is a great place to start to gain a deeper understanding of directives.

If you follow blogs or tutorials about Angular, you'll often hear how directives are the place, the _only_ place, from which you should touch the DOM. Why? You may also hear terms such as _transclusion_, _isolate scope_, _compile_ and _link_ functions, and other things that may seem a little intimidating to the newcomer. Although I have written directives myself, I must admit that I would not have felt confident explaining all of these terms to another.

In this talk, Dave Smith walks us through the concept of directives from the top, and in the process he covers all of the above scary terms and much, much more.

### Some things I learned* 
Angular's built-in directives that we all know and love - _ng-repeat_, _ng-show_, _ng-class_ etc_._ - they're all just plain old directives, and you can <a title="AngularJS GitHub repo directives folder" href="https://github.com/angular/angular.js/tree/master/src/ng/directive" target="_blank">go and look at the source code</a> and you can understand how they work! Look: see how simple the code is for ng-show: 

```JavaScript
var ngShowDirective = ['$animate', function($animate) {
  return function(scope, element, attr) {
    scope.$watch(attr.ngShow, function ngShowWatchAction(value){
      $animate[toBoolean(value) ? 'removeClass' : 'addClass'](element, 'ng-hide');
    });
  };
}];
```
    
Okay, it's one the most simple built-in directives, but when I understood this, I thought, "wow, I could have written that!" - something I previously didn't imagine I would think when it comes to the Angular source code.</li> 

* How to use the `restrict` property. I knew that I had the choice of defining a directive as an element, or as an attribute on an element (or even as a class or a comment), but I wasn't sure when I was supposed to use which. From this talk I learned that, broadly, you use `E` (element) if you are building a re-usable widget (such as a date picker, for example), and you use `A` (attribute) if you want to add some behaviour to an existing element (such as handling a click or other user event).
* The use of isolate scope, and why it makes a lot of sense for things like re-usable components. Basically it is a form of encapsulation that prevents your directive from needing to know anything about the containing scope. This has benefits for testability as well as portability - you should be able to drop it in anywhere you want, explicitly pass it the data it needs, and it'll work.
* Transclusion. Don't be intimidated by the fancy-sounding word.  The speaker does a great job of explaining it. Transclusion is used to make a directive that contains arbitrary content. By using transclusion, you can place the contents of the directive element into the template. The example given in the talk is a modal dialog box, and to test my understanding, I made a <a title="Demo of transclusion" href="http://plnkr.co/edit/qlE17hqmDxfjqAZoYsct?p=preview" target="_blank">simple demo of my own</a> that you can check out. Once I got a handle on this, I realised that the ng-repeat directive must use transclusion, since it uses your arbitrary HTML content inside its output. And indeed, in looking at [the source for ng-repeat](https://github.com/angular/angular.js/blob/master/src/ng/directive/ngRepeat.js), you can see that it does. Cool!</ul> 

There's a whole lot more that he covers in this talk, but those are just a few of the more memorable things I took away from it. Of course, there's much, much more to know about all of the above, but the value of that initial spark of comprehension cannot be overlooked. Without that little bit of understanding, that small feeling of success, the whole thing can seem overwhelming and impossible to fathom. Once you achieve a foothold of understanding, the rest feels within your reach.

## Vojta Jina - Dependency Injection

Vojta is part of the Angular core team, so he is in an especially good position to give an excellent description and explanation of dependency injection, both as it exists currently in Angular, and as it will exist in future versions.

He begins with a good, simple explanation of dependency injection (DI),  and addresses the question of why it has been given such a central role in Angular. The latter part of the talk deals with how future versions of Angular will improve on the current implementation of DI, to solve such things as minification problems (you cannot currently run Angular apps through a minifier like jsmin without using certain work-arounds), naming collisions and over-complexity.

### Some things I learned

* I reinforced my understanding of dependency injection in general, and gained a better understanding of why it is used in Angular. Vojta addresses not only the benefits of DI, but also the additional complexity it can introduce when the framework is doing so much wiring behind the scenes. By having a grasp of arguments for _and_ against a particular approach, I was able to develop some judgement of my own about it.
* A really interesting point he makes is along the lines of "**testing and re-using code is the same thing.**" By this he means that if you design your code to be easily testable, you are by the same token making it portable and re-usable. The attributes required by both disciplines are similar: loosely-coupled, modular, encapsulated.
* I learned that I'm not the only one who found the current DI implementation in Angular a bit confusing! Does everyone have a good understanding of when and why to use a provider, a service, a factory, config, run? So far I have learned things that work, but I don't always know exactly _why_ they work that way, and whether something different might work even better. This talk doesn't get into explaining all of these, but at least I know that it's not unusual to be a bit confused at first.
* In Angular 2.0, the DI implementation will be simplified and aligned with the new ECMA Script 6 (ES6) syntax of classes and modules. Vojta gives some code examples of how this will actually look and how it will work. This was helpful for me because so far I've had very little exposure to actual ES6 code.

## DoubleClick Team - Writing a Massive Angular App at Google {#watch-headline-title
These guys have build a massive Angular app with over 71k lines of production code, 129 controllers, 137 directives and 59 services. Since they started using Angular way back in 2010, this might be the oldest and largest Angular app in the world. A project of this size presents particular problems of performance and complexity, and three of the team address different aspects of how to deal with the above in this presentation.

### What I learned from this talk

* How to approach the problem of handling user authorization of a client-side app. The inherently open nature of the client means that we need to take special care in how we control user access to our application and its features. The first speaker in this talk explains how DoubleClick first addressed the issue, why it didn't work well, and how they improved it. I won't go into detail about it - you should watch the talk - but he talks about how to use server-side rendering of your index.html page which is a very interesting solution that I intend to explore further.
* Ideas on how to conditionally load features of your app. What if your app contains some features that only certain users should be able to access - premium content, admin-only controls etc? Do you just use ng-show? If these features (directives, views) are at all complex, then you don't want Angular to have to watch and evaluate all this hidden stuff every time it needs to update the root scope. From about 8 minutes into the talk, you'll see an interesting way to approach this problem.
* Useful ideas from the second speaker on the various approaches to dealing with re-usable code in Angular. She presents five methods of implementing re-usable code, with a discussion on the benefits and liabilities of each. Each code example is available on jsFiddle (see the links below), and I personally found it very useful to follow along, pausing the video and playing with the code example to make sure I really got the idea. 
    * Inheritance - [http://jsfiddle.net/3dPpK/9/](http://jsfiddle.net/3dPpK/9/)
    * Mixins - [http://jsfiddle.net/dFNSW/11/](http://jsfiddle.net/dFNSW/11/)
    * Composition - [http://jsfiddle.net/RQy8K/4/](http://jsfiddle.net/RQy8K/4/)
    * Services - [http://jsfiddle.net/E2nyQ/8/](http://jsfiddle.net/E2nyQ/8/)
    * Helper Controllers - [http://jsfiddle.net/8M27W/8/](http://jsfiddle.net/8M27W/8/)
* Ideas on how to extend the built-in Angular services when the requirements of your app outgrow the basic functionality provided by Angular. The key point is that Angular provides basic building blocks which allow you to extend outwards in whatever direction you need to.

## The Rest

There were several other presentations that I could have singled out above, as the general quality was very high. Certain of them were less concerned with a specific technical aspect, and more about providing insight into the "why" behind certain choices in Angular, or its team dynamics or history. I found these equally enjoyable to watch, and insightful in a completely different way. Igor Minar's wonderful talk stands out as the best example of this.

Other talks were simply too specialised on some technology in which I am not currently interested - Dart or RequireJS for example. Some were just a little too advanced for me to easily follow. I'm sure I will be able to find more value in these if I revisit them in the future, which I certainly intend to do.

So, here are my picks of the rest, categorised into the three rough divisions that I mentioned at the top of this article:

### Talks dealing with Angular itself

* **[Igor Minar - Angular === Community](http://www.youtube.com/watch?v=h-SQvre_6qU)**
  This was actually one of the best talks of the entire conference. There is very little technical content in this talk; rather, it examines the history of Angular and how the team has dealt with its rapid growth and the attendant pressures and challenges. Igor presents the human side of Angular, in a very heartfelt and endearing way. I guarantee you will enjoy this one, no matter what your interest or level of expertise in Angular.
* **[Miško Hevery and Brad Green - Keynote](http://www.youtube.com/watch?v=r1A1VR0ibIQ)**
  These two have a very relaxed and natural presence on the stage, and in this talk they take us through the development of Angular from the very start, with plenty of anecdotes that demonstrate how much the whole team really put their hearts into this project. Not only that, there is plenty of very solid information on what to expect in Angular 2.0. If you want to know the current state of Angular and where it is headed, watch this one.
* **[Angular Team Panel](http://www.youtube.com/watch?v=srt3OBP2kGc)**
  The entire core team of Angular field questions from the community. Includes practical tips as well as more general discussions of higher-level concepts. Too much is covered to bother enumerating here - just watch it!
* **[Dan Wahlin - AngularJS in 20ish Minutes](http://www.youtube.com/watch?v=tnXO-i7944M)**
  For anyone who has done anything with Angular (or watched John Lindquist's [egghead.io](https://egghead.io/) videos), possibly none of the content of this talk will be anything new. However, I still recommend it because 1) Dan does a pretty impressive demonstration of live coding as he puts together a whole demo app almost from scratch, and 2) I was able to confirm my understanding of the basics. It's good to be able to watch and think, "yeah, I know why he did that," and to be able to have an opinion about what you see.
* **[Karl Seamon - Angular Performance](http://www.youtube.com/watch?v=zyYpHIOrk_Y)**
  This is a pretty full-on technical talk, where the speaker rapidly goes through many, many pointers on how to optimize your Angular code for performance. To be honest, I wasn't able to take all of this in - some of it was a bit beyond my immediate comprehension. I can certainly imagine coming back to it when I really need to get into performance tweaks though.
* **[Sharon DiOrio - Filters beyond OrderBy and LimitTo](http://www.youtube.com/watch?v=L4FJ_kuO9Rc)**
  All in all, there was not much new here if you have any experience writing custom filters in Angular. However, I include it here because Sharon includes an impressive demo of the scalability of filters, sorting 300,000 records with barely any lag at all. I was surprised how good the performance is, and that's good to know as I start to write an Angular app dealing with a similar quantities of data.
* **[Christian Lilley - Going Postal with Angular in Promises](http://www.youtube.com/watch?v=XcRdO5QVlqE)**
  A very good introduction to promises. He graphically demonstrates how the road to "callback hell" is paved with nested functions, and how promises fix that, and a whole lot more. Promises can feel a little counter-intuitive at first (at least, I found them so), so if you still feel that way, this talk could help with getting you started on the route to really using them to your advantage.

### Talks about how to use "X" with Angular

* **[Anant Narayanan - Building Realtime Apps With Firebase and Angular](http://www.youtube.com/watch?v=e4yUTkva_FM)**
  You might have come across Firebase from the demo on the angularjs.org home page. Up until seeing this talk, that was my only exposure to it. After seeing this talk, I definitely want to find out more! Probably one of the first "wow!" moments you had with Angular was the 2-way data binding. In his talk, Anant introduces the concept of 3-way data binding. 3-way?! Yeah, you just need to watch this video. Also of note is that the speaker is super-confident in his live coding in this very impressive demo.
* **[Daniel Zen - Using AngularJS to create iPhone & Android applications](http://www.youtube.com/watch?v=wVntVkRLR3M)**
  This is a very rapid primer on using [Phonegap ](http://phonegap.com/)to turn your Angular app into a native mobile app that will run on Android or iOS. The speaker starts out with "15 second" introductions to Phonegap and using it with Angular, and then proceeds to share a series of very practical tips, tools, optimizations and gotchas for mobile development. He ends with an impressive demo of just how slick and &#8216;native' an app you can make with these technologies.
* **[John Papa - Progressive Saving](http://www.youtube.com/watch?v=JLij19xbefI)**
  Progressive saving is an approach to UX that solves the problem of users who partially complete a process - say filling out a form - but then for whatever reason they don't save it, and then navigate away from the form or accidentally close their browser. This will become more and more of an issue as we move more of our apps into the context of the browser, which doesn't handle this scenario very well by default. The idea is to save a "work in progress" as the user types, which gets persisted without an explicit "save" or "update" command being required. The concept is universal, but in this case John demonstrates a pretty slick implementation in Angular, with the last 5 minutes dedicated to the specifics of that implementation.
* **[Julie Ralph - End to End Angular Testing with Protractor](http://www.youtube.com/watch?v=aQipuiTcn3U)**
  End to end (e2e) testing is something I've thus far only read about. I'm pretty familiar with using Jasmine and Karma for unit tests in Angular, so I was happy to see the same approach applied to e2e testing with Protractor - it makes the idea more approachable when you don't need to learn an entire new toolset and syntax. I'm sure I'll be using Protractor before long, so this was a good introduction.

### Talks that aren't really about Angular at all

* In this category I would include [Ari Lerner - Robotics powering interfaces with AngularJS to the Arduino](http://www.youtube.com/watch?v=MhVgGE-pgEY) and [Tom Valletta and Gabe Dayley - Angular Weapon Defense](http://www.youtube.com/watch?v=f62k7b753-Y). Essentially these are not particularly Angular talks, but if you are interested in interfacing Angular with hardware then check these out.

So there you have it. I think the organisers did a great job getting together so many high-quality speakers, and the Angular team  should certainly be commended for their support and commitment to the community.

_PS. Since it's pretty far from Vienna to Utah, why not do the next ng-conf somewhere in Europe?  Somewhere central... I dunno... how about Slovakia? Bratislava is only an hour from here, and it's got an international airport..._