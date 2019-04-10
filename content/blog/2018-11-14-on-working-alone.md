---
date: 2018-11-22T08:00:59+01:00
title: On Working Alone
type: post
categories:
  - post 
  - featured
tags:
  - essay
  - programming
ogimage: media/2018/11/noah-silliman-136622-unsplash.jpg
---

Earlier this year I quit my job to work full-time on an [open source ecommerce framework](https://github.com/vendure-ecommerce/vendure). After three years working as the lead of a small team within a department of around 20 devs, I'm now back to working alone. Here are some reflections on the thrills and perils of the lone developer.

{{< figure src="/media/2018/11/noah-silliman-136622-unsplash.jpg" title="Photo by Noah Silliman on Unsplash" >}}

## Communication & Efficiency

The problems of development teams are essentially problems of communication. Email, Slack, stand-ups, Jira, meetings. All serve their purpose and all have their downsides - as documented in approximately 50,000 think-pieces over on Medium. Managers, processes and methodologies all exist - at least in part - to solve the problems of team communication. 

Meetings are often the method used by teams to reach consensus on some issue. The problem is the time overhead inherent in any meeting, which usually goes something like this:

*Scheduling the meeting. Ramping down on your current work in anticipation of the meeting. Getting to the meeting, waiting for all attendees. Inevitable off-topic conversations. Discussing the topic at hand. Coming to a consensus on the solution. Ramping back up to work after the meeting.*

The wonderful, exhilarating thing about working alone is that these solutions are not much needed. **Communication occurs at the speed of thought**. The efficiency benefit is immense. Of course, to say that the solo decision-making is more *efficient* implies that the decision arrived at is a good one; there's nothing efficient about spending days implementing the wrong solution.

The difference can be compared to a democracy versus a dictatorship. I am the Supreme Leader and I don't need to call a vote before installing a new dependecy. Dictatorships can be an extremely effective and efficient way of conducting the affairs of a nation. They can also be completely dysfunctional and disastrous. Essentially, this is the *Bad Emperor Problem*<sup>1</sup> as applied to software development.

## Knowledge & Experience

I spent the first several years of my developer career working alone, having taught myself PHP. I documented the sorry tale in an earlier essay, [*Confessions of an Intermediate Programmer*](/blog/confessions-of-an-intermediate-programmer/). 

The long and short of it is that as a solo, self-taught developer, it is extremely easy to reach your "local maximum"<sup>2</sup> and stagnate in terms of learning and personal development. You are, by default, always the best and most experienced at everything, which is a bad state of affairs for a developer. 

In my first year at my last company, I made more progress than I had in the previous five years working alone. Interacting with a whole range of customers with a diverse set of requirements and constraints is not something which can be readily substituted. Also I can actually do an interactive git rebase now (thanks Leon)!

Sure, you can read blogs, listen to podcasts and follow trends on Twitter. But in my experience, this just can't replace the nuance of person-to-person knowledge transfer. Pair programming, regardless of the experience level of your partner, cannot be replaced by a tutorial. When people work together, they don't just share technical knowledge; they share viewpoints, ways of thinking, opinions, and values. This rich, holistic pooling of experience is hard to replace when working alone.

## Discipline

No manager breathing over your shoulder. Nobody to catch you in the act of surfing YouTube when you should be writing those unit tests. Hell, no one to even tell you to *write tests in the first place*. Group mores and pressure can be useful in getting things done. On your own, this motivation and discipline must come from within.

You are the CEO of your single-person enterprise, and as with any leader you set the work culture. You are the emperor. Are you Caligula or an Augustus?

For the typical "indie hacker"<sup>3</sup>, the excitement and urgency around building and shipping your own thing probably provides enough push to overcome many of the traps. At least it seems to work that way in my case. 


## Tips

Here are some of the tools and approaches I use to mitigate the pitfalls of solo development:

{{< figure src="/media/2018/11/code-review.gif" title="Reviewing my code before committing changes" >}}

* I do a lot of planning. Features usually start off as sketches on paper. For architectural designs I use [PlantUML](http://plantuml.com/) and keep the diagrams under source control in the project repo. 
* I record all major design decisions as GitHub issues, documenting my thought process and research findings ([example](https://github.com/vendure-ecommerce/vendure/issues/31)). If I have made PlantUML diagrams, I throw them into the issue too ([example](https://github.com/vendure-ecommerce/vendure/issues/33)).
* I document features as I build them ([example](https://github.com/vendure-ecommerce/vendure/blob/ea8338882b5aaeb4bab405c23b37aeccf68537dd/README.md#custom-fields)). It is surprising how quickly you can forget the details of something you yourself built just a few weeks ago.
* I do code reviews before any commit. I use the built-in diffing provided by WebStorm and step through every change (see above). There is almost always something that needs fixing.
* I use [Toggl](https://www.toggl.com) to track my time. The very act of putting myself "on the clock" seems to aid my focus. Beyond that, I find it useful to record and occasionally review what tasks I have been spending time on.
* I avoid stagnation by staying connected up with the community - meetups, conferences and meetings with other developers. I also work from a co-working space, which provides further opportunities for making contacts and learning from others.
* I spend a fair amount of time on research and try to avoid getting sucked into cranking out features at a hundred miles per hour using which ever idea first comes to my mind. It's about finding the balance between reckless velocity and prudent planning.

If you are working alone, or are considering taking the plunge into the world of the indie hacker, I hope you found this little write-up of use. 


{{< figure src="/media/2018/11/thom-holmes-525061-unsplash.jpg" title="Photo by Thom Holmes on Unsplash" >}}

<hr>

<sup>1</sup> "The Bad Emperor Problem" is discussed in Francis Fukuyama's book *Political Order and Political Decay*. Throughout Chinese history, a good emperor could rule effectively and efficiently without regard to interest groups, whereas no institutions existed to reign in the destructive actions of a bad emperor.

<sup>2</sup> The "local maximum" is the highest point within a given range. Applied to personal development, this refers to the fact that you can reach the seeming "peak" of your ability or know-how, when in reality there exist other much higher peaks just out of sight.

<sup>3</sup> Referring to lone "makers" - entrepreneurs looking to bootstrap a business to profitability. See [indiehackers.com](https://www.indiehackers.com)