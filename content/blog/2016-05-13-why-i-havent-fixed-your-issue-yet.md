---
title: Why I Haven’t Fixed Your Issue Yet
author: michael-bromley
type: post
date: 2016-05-13T14:22:02+00:00
url: /529/why-i-havent-fixed-your-issue-yet
categories:
  - featured
  - post
tags:
  - essay
  - open source
  - programming

---
Hi there. You opened an issue with my project on GitHub, and it&#8217;s getting kind of stale by now.

I am aware of it &#8211; GitHub was kind enough to send me an email containing your report, which I scanned one morning a couple of weeks ago while I ate breakfast. I&#8217;ve even thought about it briefly a couple of times since then; once I was in the shower and I got the vague idea that I knew what caused it &#8211; but I wasn&#8217;t sure because I could not recall the specifics.

Of course, you knew none of this. You may have wondered if your issue &#8211; which may be critical to your current project &#8211; has been lost to the void. Allow me a few minutes to explain why you&#8217;ve not heard anything from me.

A couple of years ago, I was a freelancer and father to a new baby. The freelance hours provided me with flexibility and the baby was conveniently immobile and fairly docile. I started writing libraries and publishing them on GitHub. Seeing people use my code was and is exciting and rewarding. Collecting stars on GitHub is a guilty pleasure just as with any other kind of &#8220;fake internet points&#8221;. I had plenty of time to work on issues and improvements, and I would generally respond to (and often fix) issues within a day or two.

Today, I am in full-time employment. The baby is now a toddler, and there is also another baby. Toddlers are neither docile nor immobile. If I am lucky, I can carve out an hour of free time per day &#8211; generally between 9pm and 10pm.

Do you know what I like to do in that time? Unfortunately for you, the answer is not _&#8220;fire up my IDE, get the build pipeline going, start a local dev server, and try to recreate someone else&#8217;s issue&#8221;_. And I don&#8217;t mean to berate; I am simply stating fact. My weary evening mind is just not up to the task most days. Usually I like to sit on the couch for a bit, and just enjoy sitting.

<div id="attachment_531" style="width: 560px" class="wp-caption aligncenter">
  <img class="size-full wp-image-531" src="http://www.michaelbromley.co.uk/api/wp-content/uploads/2016/05/couch.jpg" alt="A couch" width="550" height="542" srcset="http://www.michaelbromley.co.uk/api/wp-content/uploads/2016/05/couch.jpg 550w, http://www.michaelbromley.co.uk/api/wp-content/uploads/2016/05/couch-300x296.jpg 300w" sizes="(max-width: 550px) 100vw, 550px" />
  
  <p class="wp-caption-text">
    You are competing with this. Usually, you will lose.
  </p>
</div>

So where does that leave you, user of my library? Do I no longer care about your plight? Have you done your  company a disservice by using my library in your project? In this _Free and Open Source Software_ (FOSS) reality we live in, how many parts of your company&#8217;s product are coupled to the lifestyle and priorities of some lone, unpaid package maintainer? It&#8217;s something I have to think about too &#8211; in my day-job I build software on top of many FOSS libraries, many of which are probably maintained by people in similar circumstances to my own.

As with all things in life, a trade-off is involved. There is an implicit agreement which needs to be understood by both consumers and creators of FOSS projects<sup>1</sup>. It goes something like this:

  * I agree to provide you with some free code which solves your problem.
  * I recognize that in doing so, I have taken on a small portion of responsibility to you as a user of my code.
  * I agree to try to help you if you have difficulty in using my code.
  * I agree to try to fix bugs that you find in my code.
  * Crucially, you agree that I, in acting without remuneration, am free to assign priority to the above points as I see fit.

The last point is the reason why I haven&#8217;t fixed your issue yet. Your issue is competing for my attention with my work, my family, my couch, my other interests and of course with all the other issues that are still open &#8211; several of which are much older than yours.

So, here is my message to you, to all the users of my FOSS projects, and to all developers who use and benefit from the FOSS ecosystem:

> _I will try my best to get around to it. I do want to help you._
> 
> _Make things easier for me by reading and following as closely as possible the [issue template][1]._
> 
> _Take time to understand, research and debug your issue &#8211; don&#8217;t offload that burden onto me._
> 
> _Understand if I do not reply in what seems like a reasonable time. And don&#8217;t be that one guy who was extremely rude and insulting (I&#8217;ll refrain from linking the issue for his sake)._

Thanks for reading, and happy coding.

* * *

<sup>1</sup> <small>This goes for projects which are promoted in some way. If you tell people &#8220;hey, you should use my thing&#8221;, then you&#8217;ve entered into this agreement with them. If you just throw your stuff up onto GitHub for the fun of it, then it doesn&#8217;t necessarily apply.</small>

 [1]: https://github.com/michaelbromley/ng2-pagination/blob/master/ISSUE_TEMPLATE.md