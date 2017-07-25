---
title: What Makes A Good Tech Talk?
author: michael-bromley
type: post
date: 2014-06-16T14:25:34+00:00
aliases:
  - blog/105/what-makes-a-good-tech-talk
categories:
  - post
tags:
  - speaking
  - essay
---
When I moved to Vienna last October, I was pleased to find a very active and vibrant development community. Just this week alone, there have been at least 19 tech meetups in the city. A [quick search on meetup.com](http://www.meetup.com/find/tech/?allMeetups=false&radius=2&userFreeform=Vienna%2C+Austria&mcName=Vienna%2C+AT&lat=48.22&lon=16.37&sort=recommended&eventFilter=mysugg) reveals 46 tech-related meetup groups at the time of this writing, and there's even a [website dedicated to listing all the meetups](http://www.devs-austria.org/) each week. During my time here so far, I've found the local tech meetups a great way to learn and improve as a developer, as well as a way to get involved in the community and get to know some cool people in a new city.

{{< figure src="/media/2014/06/crowd.jpg" title="Original image borrowed from https://lebowskifest.com/lebowski-fest-la-w-jeff-bridges-photos/" >}}

As great as these meetups are, there have been a few occasions in which a talk was so bad that I could almost physically feel the life being drained out of the room. The little slide counter in the bottom right of the screen taunted us with the fact that we hadn't even reached the half-way point yet.

I'd like discuss what makes a good tech talk, and I posit that there exist a few simple factors that are common to most of the bad talks I have witnessed. Moreover, I posit that it is within the ability of any speaker, regardless of experience, to improve on these points and thus increase the overall quality and value of the talk.

I want to be clear here that the purpose of this post is not simply to criticize or point out the faults of others. Giving talks can take some courage, and usually demands quite a bit of time in terms of preparation. Without people willing to put in this effort and share their ideas, there would be no meetups at all and the community would be that much poorer for it. Moreover, since these meetups comprise the entirety of my social life at the moment (family time aside), I also have a vested interest in seeing them succeed and flourish!

This discussion is geared towards tech talks at the **local user group level**, rather than the international conference level. At the end of the article I list some further resources which go beyond these elementary factors.

## What Is "Good"?

"Good": a horribly general term, the use of which would probably cost me a grade if this were a creative writing exercise. It is also a term which requires some criteria by which we can all understand what I mean when I use it.

I propose that a good tech talk includes a greater degree of the following attributes:

  1. **Interest**. Interest can be generated in many ways, including relevant subject matter, engaging delivery, amusing or enlightening slides, and so on. It is a bad thing if the audience is collectively longing for the talk to end.
  2. **Effective Communication**. Communication may be rendered ineffective by such things as a failure to define terms or context, poor narrative structure, a delivery that is difficult to hear or understand, or a speaker that is just plain unengaging and unenthusiastic. It is a bad thing if, despite a relevant topic, the audience is unable to follow and comprehend what the speaker is trying to communicate.

Of course, what I will write here is the opinion of one, and others will no doubt have opinions that differ to some degree. By what authority, you may wonder, can I be the judge of what is good and bad?  I've given a few talks myself at tech meetups and I've witnessed many more, but I'm no expert on the subject. The only real authority I can claim is that of an interested member of the community who likes to learn from his peers, and wishes to provide some general feedback on things that make it easier for me, personally, to learn from and enjoy the talks of others. I've also developed many of these ideas in conversations with other developers who regularly attend tech meetups, and there seems to be some consensus supporting these criteria as components of "goodness".

Following are several factors which can influence the two factors above, for better or for worse. They are ordered starting with the most fundamental, easy-to-implement points, proceeding to aspects which may take more skill or practice to get right. But none of them should require any particular talent or training in public speaking.

## Define The Problem, Provide A Context

<img class="size-full wp-image-144" style="float: right; margin: 10px;" src="/media/2014/06/partridge_speaking.jpg" alt="partridge.js talk" width="300" height="215" />

I have seen several talks in which the speaker almost immediately loses half of the audience by failing to provide any context for the topic he or she is discussing.

**Example**: At a JavaScript meetup, someone is doing a talk on "An Introduction to Partridge.js". They kick off the talk with "_Partridge.js actually developed from a community fork of Norwich.js, and has the following benefits..._".

We are all left thinking, "What the hell is &#8216;Norwich.js'?" What is it for? Why should I care? Even if Norwich.js was a fairly well-known library, by failing to define the problem it solves or any other kind of context, the speaker has excluded the inevitable group of attendees who don't happen to know about it. Although they may be able to glean this information from the remainder of the talk, the speaker has needlessly put the burden on the audience to discover what he is talking about.

**Example**: I attended a meetup where a guy gave a talk about caching - a very interesting topic which presented a great opportunity for the web developers present to gain an insight into one of the harder problems of computer science. For those present who did not have a firm grasp of the concept of caching, an introductory simple and high-level explanation would have gotten everyone on the same page and set the stage for an exploration of the topic. Instead, the speaker immediately launched into a slide which listed several cache-invalidation algorithms and proceeded to explain each one in detail, including the history of each. It was clear that the guy knew his stuff, but the value of his expertise sadly did not translate over into much learning or insight for the audience.

Both of the above are failures of communication. As an audience member, once the speaker has lost you, it hard to get you back on track. I know from personal experience that after 10 minutes of sitting in slack-jawed bemusement, even the sensation of a small amount of dribble exiting from the corner of my mouth might not be enough to snap me back into the room.

Of course, it is inevitable that not everyone will be able to keep up with every talk. The audience will always possess varying levels of knowledge and experience. But by failing to define the problem or the terms used in its solution, the speaker will surely lose many who otherwise would've been able to follow and learn from the talk.

If there is some doubt whether the definition of a term you use will be understood by all, it costs little to explain its meaning in a concise sentence or two, and could well retain the attention and engagement of a whole section of your audience.

## Correct Levels of Abstraction

<img class="alignright wp-image-140 size-full" style="float: right; margin: 10px;" src="/media/2014/06/cheese.jpg" alt="Cheese - original image from Wikipedia, used under the following licence: http://creativecommons.org/licenses/by-sa/3.0/" width="300" height="265" />

As a software developer, you may well be familiar with the concept of differing levels of abstraction. Abstraction allows us to communicate about larger and more complex concepts in a manageable way. Indeed, _whenever_ we communicate we are operating at some level of abstraction or other, since language itself is just abstract symbols representing the real things about which we speak. Therefore, in a tech talk, the speaker must realize that at different times, differing levels of abstraction are called for.

**Example**: A person asks you "_What is cheese?_". A very high level of abstraction is appropriate here. We might assume that the questioner knows about the concept of food, so we can begin at that level: "_Cheese is a type of food which is made from milk_," may be a useful answer. An answer that goes in at too low a level of abstraction may be, "_Cheese is the product of a process of coagulation of the protein casein, usually acidified and often having the enzyme rennet added to aid this process._" If you then go on to discuss whether it is considered best to use vinegar or lemon juice to acidify the mixture, you will have gained at least one very unsatisfied audience member.

**Example**: Back to the guy giving the talk about Partridge.js. Hardly anyone has heard of this library, nor the problem that it solves ("simulating Coogan distributions over very large data sets"). The speaker would be wise to stay at the level of the problem - why it is a problem and why we might benefit from this solution. If, on the other hand, he spent most of his time discussing the API and the changes coming up in version 0.0.3,  he's probably not communicating at a suitable level of abstraction.

**Example**: I once attended a meetup where a speaker was giving a talk about different types of web server software. At one point he mentioned proxy servers in the context of load-balancing, and an audience member raised her hand to ask what a proxy server was. The question, "What is a proxy server?" is at a pretty high level of abstraction. It is asking after the concept of the thing - perhaps its basic purpose and form. The concept of a load-balancing proxy server is not too complex to clearly describe in a couple of straightforward sentences. Instead, the speaker skipped the high-level description of the form and purpose of a proxy server, and jumped right into some low-level details about protocols and the nuances between different implementations - stuff which likely nobody else in the room could appreciate but he himself.

This concept would also apply the other way, i.e. a very specific question calling for a detailed, nitty-gritty response might be answered in too general or vague a way. However, in my experience, giving too high-level an answer is seldom the problem. I imagine that this is because, having knowledge in one domain, it is easy to forget that not everyone else knows what you know. Indeed, things which may be self-evident or common sense from your point of view may not be so to your audience.

## Narrative

Think back to your school creative writing classes, where you learned that a story should have a beginning, a middle, and an ending. I suggest that a tech talk should also have a deliberate structure. I personally find talks most satisfying and memorable when the speaker leads me through the material, at each stage eliciting a curiosity that he or she then goes on to resolve with the next point. This factor has much scope for refinement, as can be seen in [this excellent description of six common narratives](http://youtu.be/iE9y3gyF8Kw?t=38m59s), but need not be complicated or mysterious:

**Example**: The talk "_Promises in JavaScript_" begins with a list of various promise libraries, then goes on to look at the API of one, then describes what a promise is, then gives a code example of one, then gives a brief history of promises. This is disjointed and does not take the audience on a satisfying journey of discovery and understanding.

**Example**: Back to our speaker giving a talk about Partridge.js: "By show of hands, who here has ever worked with Coogan distributions?" [no hands go up]. "Okay, who has ever run into a situation where _x, y, z_?" [plenty of hands], "How did you solve it?" [perhaps some audience interaction.]. Now everyone is curious about some better way of solving _x, y, z_. The speaker introduces Coogan distributions as an efficient and elegant solution. Now everyone wants to know how they might implement such a solution themselves. Speaker goes on to show how Partridge.js enables this with a dead simple API. The crowd goes wild.

## Balance of Substance, Style & Delivery

<img class="alignright size-full wp-image-146" style="float: right; margin: 10px;" src="/media/2014/06/boring.jpg" alt="Delivery is lacking here" width="371" height="291" srcset="/media/2014/06/boring.jpg 371w, /media/2014/06/boring-300x235.jpg 300w" sizes="(max-width: 371px) 100vw, 371px" />

Tech talks at their best should be not only informative, but also entertaining. If we simply wanted to be informed, it is probably more efficient to read the docs or find a screencast or something like that. When you see an experienced speaker at an international conference, they usually strike a good balance of entertainment and information.

By _substance_, I mean the hard information that you are hoping to impart to the audience - the details of how the library works, how you implemented _X_, why one should consider using _Y,_ what _is_ a Coogan distribution, etc.

By _style_, I mean the way in which you present the information. Usually, this is done by showing slides or code or demos, or some combination of these.

By _delivery_, I mean the way in which you communicate to your audience. This includes such things as your demeanour, your attitude, and whether you are able to really engage with the audience, rather than just talking in their general direction.

These three factors should all be given consideration, and if one or more are found significantly wanting in a talk, the overall talk is likely to fail.

I don't expect every speaker at a local meetup to have the public speaking skills or charisma of some of the well-known conference names, but it's certainly worth acknowledging that the style and delivery of the presentation are important factors - some might say even more important than the content itself.

**Example**: Reading aloud the docs of Partridge.js directly from your laptop in a monotone voice, without ever looking up at the audience.

**Example**: Having horribly-designed slides that contain solid blocks of small text and byzantine flow diagrams.

On the other hand, the balance can be skewed the other way. A speaker with great presence and a beautiful bunch of slides might fall short by giving a talk on something that everyone already knows about, without offering any new insights.

**Example**: An hilarious slideshow full of memes, plenty of witty quips, yet without any learning or insight imparted. While this might be acceptable to audiences in small doses (especially as compared to the opposite examples above), too much would probably get annoying quite quickly.

This last section is really where we start to get into the more "advanced" aspects of public speaking. Here is where personality, presence and experience really start to show. These things are not necessarily something you just need to "remember to do", as could be said for the first three points, but at the same time they can be actively developed by anyone, regardless of one's inherent abilities or lack thereof.

## Further Study

The points I have made here are aimed at the regular developer who wants to share his or her ideas at local meetups. They are the things that, in my experience, make up "square zero"  and can be the difference between a terrible, what-am-I-doing-here disaster of a talk and a tolerable or even a decent one. If you want to take things further and find out about the elements of really great talks and good public speaking in general, others are much better qualified to advise:

  * <span style="color: #444444;">[Andrei's Tips on Giving Technical Talks](http://erdani.com/index.php/articles/tech-talk-tips): An excellent essay which provides practical and insightful advice to anyone hoping to give professional-quality talks.</span>
  * [Give a Great Tech Talk (video)](http://www.linuxfoundation.org/news-media/blogs/browse/2013/03/free-resource-how-give-great-tech-talk-tutorial-collabsummit): _Very_ in-depth talk about giving talks. Very long, but well worth viewing - the wonderful section on "<span style="color: #4d4d4d;">[The 7 Habits of Highly Ineffective Speakers](http://youtu.be/iE9y3gyF8Kw?t=1h35m22s)" alone is worth viewing for anyone who gives tech talks (or plans to start). Covers all aspects of preparation and delivery. Highly recommended if you are planning to give a talk yourself.</span>
  * [Presenting Lessons I've Learned (Jay Fields)](http://blog.jayfields.com/2009/12/presenting-lessons-ive-learned.html): Useful list of tips, including some useful but easily-overlooked details like "face forward" and "use short text". Most of this is covered in the video listed above, but if you don't want to watch that entire thing, this is a useful resource.