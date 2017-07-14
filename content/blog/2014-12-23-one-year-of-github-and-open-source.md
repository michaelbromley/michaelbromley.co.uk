---
title: One Year of GitHub and Open Source
author: michael-bromley
type: post
date: 2014-12-23T15:53:28+00:00
url: /318/one-year-of-github-and-open-source
categories:
  - post
tags:
  - essay
  - open source
  - programming

---
Next week sees the close of my first year as an active participant on GitHub and in the open source community. I&#8217;d like to mark the occasion by collecting together a few thoughts on my experience thus far.

<div id="attachment_324" style="width: 650px" class="wp-caption aligncenter">
  <a href="/media/2014/12/pcb.jpg" target="_blank"><img class="wp-image-324 size-large" src="/media/2014/12/pcb-1024x746.jpg" alt="A close-up of a printed circuit board" width="640" height="466" srcset="/media/2014/12/pcb-1024x746.jpg 1024w, /media/2014/12/pcb-300x218.jpg 300w, /media/2014/12/pcb.jpg 1273w" sizes="(max-width: 640px) 100vw, 640px" /></a>
  
  <p class="wp-caption-text">
    Whoa, look at all those branches!<br /><small>Photo credit: https://www.flickr.com/photos/hinkelstone/2435823037</small>
  </p>
</div>

At the beginning of this year I wrote about my decidedly shaky start in the world of professional software development in the essay _[Confessions of an Intermediate Programmer][1]_. For those who have read the sorry tale, it&#8217;ll come as little surprise that it was only fairly recently that I started using any kind of version control system.

A couple of years ago a friend introduced me to <a href="http://mercurial.selenic.com/" target="_blank">Mercurial</a>, and until recently I was what you could call a &#8220;light user&#8221; &#8211; my revision history graph was a boring vertical line as opposed to something cool resembling, perhaps,  a <a href="https://www.tfl.gov.uk/maps/track/tube" target="_blank">London underground map</a> or a <a href="https://www.flickr.com/photos/hinkelstone/2435823037" target="_blank">close-up of a printed circuit board</a>. **Yes: source control for me was simply a glorified incremental backup**.

At the end of last year I made a decision to actively improve my knowledge and skill as a programmer, and one thing on my to do list was to find out what this _GitHub_ thing was all about.

Since then I think I&#8217;m getting the hang of it &#8211; I&#8217;ve published quite a few repos (some of which have actually proven useful to others), and this week I had my first pull request merged into a major project (<a href="https://github.com/zurb/foundation/pull/6118" target="_blank">a bugfix for Zurb Foundation</a>)!

## Social Coding

My biggest disadvantage as a programmer has been that I have always done it alone. I began by teaching myself, and then I worked for years without ever having another programmer look at what I had written. This, as you might imagine, resulted in some terrible habits and awfully ingenious &#8220;solutions&#8221;. One recent gem I uncovered during some refactoring involved a PHP function which dynamically assembled new PHP functions by string concatenation, and then stored the result in a database to be _eval()_ed later.

I still work alone most of the time, but I try to counteract the programming solitude by finding other ways to interact &#8211; attending user groups, reading the work and ideas of other developers and &#8211; increasingly &#8211; taking part in the open source community via GitHub. This last item has provided some of the most valuable interaction in terms of exposing me to new, better ways to do things.

An additional consequence of this is that I&#8217;ve finally started to get some use out of the _distributed_ part of the distributed version control paradigm.

## Open Source for Business and Pleasure

I&#8217;ve spent part of this year working on an AngularJS-based business application and I decided to open-source parts of it (with the client&#8217;s blessing) as an experiment to find out a) whether anyone else actually found them worthwhile and b) how the <a href="http://en.wikipedia.org/wiki/The_Cathedral_and_the_Bazaar" target="_blank">&#8220;bazaar&#8221; model</a> of software development (open and seemingly disorganised; as opposed to the quiet, closed &#8220;cathedral building&#8221; approach) would work out for my projects.

a) It turned out that yes, quite a few people were running into the same problems as I, and wanted a ready-made solution. This is the pleasure part, since I &#8211; as I image do many of us &#8211; derive quite some pleasure from helping others out with something I have made.

b) So far, the bazaar model is working fantastically well for me. One module in particular &#8211; and my most popular by far &#8211; is a pagination solution for AngularJS. I am continually amazed by all the strange and creative ways people find to _break_ the thing. And in doing so, they serve to expose yet another way it can be improved. I find this line I found on the Open Source Initiative&#8217;s website to be very true:

> &#8220;The foundation of the business case for open-source is high reliability. Open-source software is peer-reviewed software; it is more reliable than closed, proprietary software. Mature open-source code is as bulletproof as software ever gets.&#8221;
> 
> <cite>&#8211; <a href="http://opensource.org/advocacy/case_for_business.php" target="_blank">Open Source Case for Business</a></cite>

Whereas the client may have paid for my time spent developing something that I then gave away for free, they in return get a much richer, more resilient product. Everybody wins!

## Uh Oh, This Needs To Work Now

In writing and maintaining software that is used by people other than myself, I&#8217;ve also learned the importance of writing reliable, robust code and documenting it well. Anyone who has code that is in wide use will soon learn that a few hours spent making the docs clearer will save many times that in fielding requests for help later (or at the very least means you can simply provide a link to the docs instead of explaining it all _again_).

The experience has also brought home to me (once again) how automated testing is an utter necessity when it comes to fixing bugs or adding features whilst still being confident that I&#8217;m not breaking what already works well. Indeed, my most-used module has almost exactly double the number of lines of code dedicated to the unit tests than are used for the thing itself.

<div id="attachment_330" style="width: 650px" class="wp-caption aligncenter">
  <a href="/media/2014/12/what_happens_when_you_repair_you_car_yourself_640_34.jpg" target="_blank"><img class="wp-image-330 size-full" src="/media/2014/12/what_happens_when_you_repair_you_car_yourself_640_34.jpg" alt="This is what happens when you have no regression testing" width="640" height="426" srcset="/media/2014/12/what_happens_when_you_repair_you_car_yourself_640_34.jpg 640w, /media/2014/12/what_happens_when_you_repair_you_car_yourself_640_34-300x200.jpg 300w" sizes="(max-width: 640px) 100vw, 640px" /></a>
  
  <p class="wp-caption-text">
    This is what happens when you have no regression testing
  </p>
</div>

I&#8217;ve found that it can be easy to build something that works. To build something that works all the time, in any applicable context, is another thing entirely.

## Issues With Issues

The act of creation brings with it responsibility for that which was created. My one-year-old son provides an inescapable reminder of this important truth. The same goes for my projects on GitHub. Since I mostly work on this stuff outside of my day-job, I cannot always address issues as soon as I&#8217;d like. Of course, I always _know_ about the issue within a short time of it being created, thanks to GitHub&#8217;s friendly email alert service.

The open issue &#8211; especially the one that I have no clue yet how to solve &#8211; is somehow especially offensive to my mind&#8217;s desire for completion and perfection. Imagine having painted a portrait that looked almost perfect, and then someone points out the slightly weird left eye. From then on all you ever notice is that wonky eye.

The worst is when I read a new issue just before going to bed, and then can&#8217;t help but stay awake thinking about how to solve it.

To bring this point back to the children analogy: I sometimes find myself awake at hours that I would not normally choose, rocking my son back to sleep. Likewise, I sometimes find myself working a little extra in the evening, investigating that edge-case bug that someone uncovered. Both are relatively minor annoyances when compared to the overall value of the creative act.

## I Am Human and I Need To Be Loved

As with the Facebook and Instagram &#8220;like&#8221; or the Twitter &#8220;favorite&#8221;, the GitHub Star is a way to express a unary opinion (&#8220;it is good&#8221;) of something offered to the world.

I have an uneasy feeling about these features generally. Of themselves, they offer a useful way of getting some simple feedback. Nobody likes the thought that nobody cares. However, I also think they can encourage a kind of unhealthy inversion whereby we begin to hang our own self-worth on what _others think_ of what we do, rather than whether what we do is in accordance with our own values and convictions. That is not to say that we should not welcome feedback and helpful criticism, but an over-importance placed on likes, favourite or stars (or any other kind of fake Internet points) strips us of the power to decide our own worth and places it in the hands of others.

Since the Internet enables a sort of offhand, impersonal unkindness that doesn&#8217;t usually pass in real-life communication, such an inversion leaves people wide open to belittlement by others &#8211; both intentional and otherwise. I&#8217;ve even seen people get actually upset when their photo or status didn&#8217;t generate the expected number of likes on Facebook. This is more of a general point on Internet culture, but I&#8217;ve seen it play out to a lesser extent on GitHub from time to time, too.

In the context of GitHub, a programmer may get the idea that, because his or her offering has received fewer stars than other projects out there, it is somehow inferior. Maybe it is inferior. Or maybe it is so wildly forward-thinking that fewer people can appreciate it. Or maybe he or she is no good at promoting it. The point is, the star count should not be the only indication of worth.

That caveat aside, I do find the star feature useful overall, and I do use it as a way to signal appreciation for the work of others. As a feedback mechanism it is crude, but given the nature the GitHub social network, I&#8217;d also say that a star has more substance to it than a Facebook like.

And I&#8217;ll admit that I do like it when people star my projects. <a href="https://www.youtube.com/watch?v=pEq8DBxm0J4" target="_blank">I am human, and I need to be loved, just like everybody else does</a>.

## Looking Forward

I&#8217;ve had a lot of fun with GitHub so far. I&#8217;ve already got some plans for new projects to kick off 2015, and of course I&#8217;ll keep fielding the issues on my existing repos.

This will be my last blog post for 2014, so happy New Year and here&#8217;s to a successful and productive 2015!

 [1]: http://www.michaelbromley.co.uk/blog/65/confessions-of-an-intermediate-programmer "Confessions of an Intermediate Programmer"