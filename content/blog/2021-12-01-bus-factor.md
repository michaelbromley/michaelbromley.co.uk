---
date: 2021-12-01T08:00:59+01:00
title: But What About the Bus Factor?
type: post
categories:
  - post 
  - featured
tags:
  - essay
  - open source
ogimage: media/2021/12/romain-chollet-U3_QBX2qZb0-unsplash.jpg
---

The term ["bus factor"](https://en.wikipedia.org/wiki/Bus_factor) refers to the number of project maintainers who, if hit by a bus and incapacitated, would cause that project to stall. You can replace the bus crash with any other form of physical or mental incapacitation or even changes in life circumstances or priorities. The lower the bus factor, the greater the risk that a project might suddenly become unsustainable.

{{< figure src="/media/2021/12/romain-chollet-U3_QBX2qZb0-unsplash.jpg" title="Credit: Romain Chollet via Unsplash" >}}

This is a topic close to my heart. As the maintainer of the open-source e-commerce framework [Vendure](https://www.vendure.io/), I am living with a bus factor of **one**. I work full-time on Vendure, and I'm hoping to indie-hack my way to sustainability. To get there, lots of companies need to be willing to adopt it. I'm pretty sure that the bus factor plays a role in their decision. 

But how much does it matter, really?

## The Average Bus Factor Is One

In open source software - now powering the entire world economy - a large number of extremely critical projects have a very low (i.e. ~ 1) bus factor. Take the Node.js framework Express for example - [17 million downloads per week](https://www.npmjs.com/package/express) and powering all manner of Very Important Applications. Bus factor of one: [Doug Wilson](https://github.com/dougwilson?org=expressjs&year_list=1). Indeed, issues [like this one](https://github.com/expressjs/express/issues/2844) highlight the considerable anxiety that can arise when it seems that perhaps that one guy might have been hit by the proverbial bus.

There are many, many major projects in a similar situation. [This article from 2016](https://medium.com/@aserg.ufmg/what-is-the-truck-factor-of-github-projects-bb0d5f019a6f) (which in turn in based on [this research paper](https://arxiv.org/pdf/1604.06766.pdf)) analyzed the top projects on Github at the time and found that **10 of the top 30 projects had a bus factor of one**.  I'm quite confident that the situation in 2021 is similar. 

And even if you depend on a project maintained by a large team, what is the *transitive bus factor*? I can almost guarantee that somewhere in your dependency graph, everything balances upon that one random person in Nebraska.

{{< figure src="https://imgs.xkcd.com/comics/dependency.png" title="Obligatroy https://xkcd.com/2347/" >}}

The point here is not to say that the bus factor poses no risk; rather that the risk is part of the deal when you decide to build your business on open source software. Much like the endemic risk of supply chain attacks, it is a fact of life as things currently stand. 

> My theory is this: our average bus factor is one. I don't have any hard evidence to back this up, no hard research to rely on. I'd love to be proven wrong. I'd love for this to change.
>
> -- [Theory: average bus factor = 1](https://anarc.at/blog/2019-10-16-bus-factor/)


But just like with supply chain attacks, the lower on the stack, the deeper in the dependency graph, the less people will care to analyze the risks. 

Vendure is right at the top of the dependency graph - it is the platform that merchants must select when deciding between Shopify, Magento, WooCommerce and so on. 

So what can I do to mitigate the bus factor risk? 

## Mitigation

### "I would simply raise the bus factor"

The obvious mitigation is to raise the bus factor. Recruit more maintainers. 
 
{{< figure src="/media/2021/12/i-would-simply.jpg" title="Pretty simple really" >}}

This means pay people, or get them so invested in the project that they are willing take on a significant maintenance burden. 

I'd like to pay people eventually, but I'm not there yet. The latter option is no easy feat. As of this writing, Vendure has 65 contributors whose contributions follow a typical [power-law curve](https://en.wikipedia.org/wiki/Power_law). That is, I've made about 3,000 commits, the next highest contributors made around 15 each, with the majority having made one or two commits. Look at some popular repos ([Vue](https://github.com/vuejs/vue/graphs/contributors), [Laravel](https://github.com/laravel/laravel/graphs/contributors), [D3](https://github.com/d3/d3/graphs/contributors), [Styled Components](https://github.com/styled-components/styled-components/graphs/contributors), [Curl](https://github.com/curl/curl/graphs/contributors)) and you'll find a similar story.

I'm slowly building up a core of contributors who are starting to make more regular and significant contributions to the project. How active does one have to be to count towards the bus factor? In the paper cited above, they use this heuristic:

> Our estimation relies on a coverage assumption: a system will face serious delays or will be likely discontinued if its current set of authors covers less than 50% of the current set of files in the system
>
> -- [A Novel Approach for Estimating Truck Factors](https://arxiv.org/pdf/1604.06766.pdf)

So raising the bus factor organically is hard. What else can we do?

### Align Goals

A positive signal is when the maintainer's goals are maximally aligned with the goals of the project and community. In my case, I started building Vendure because I needed it for my family business, and as well as being the maintainer, I'm also a major user of the product.

As the Vendure community grows and the project matures, more bugs and edge-cases are found and fixed. My family business (which is funding the project) reaps these benefits, and in turn the project and community benefit from my focused, dedicated full-time work. In the long-term I'm planning for Vendure to become my life's work at least for the next decade or so.

Compare this situation to one in which the maintainer works on the project in his or her spare time, often outside of their day jobs. I've been in that situation before - maintaining libraries for frameworks I no longer use. Or a baby arrives and suddenly _evenings no longer exist_. It's a chore and the outcome is usually a stalled or abandoned project. 

So the degree of alignment in a very important variable when assessing the bus factor.

This part of the success of projects like Vue, Laravel or Tailwind. They aren't hobbies. They are Magnum Opera. 

### Cultivate the Community

If the bus factor is ever to be increased, then it must start by building a community of users who are invested in the project either professionally or personally or both.

People want to take part when they feel a sense of ownership, so making the project welcoming is important. That means good docs, contribution guides, open and responsive communication channels, fast turnaround on issues and PRs. It means delegating tasks to eager contributors even if you could do it yourself in a shorter amount of time.

Eventually these community members step up and start taking on more responsibility. With Vendure I'm at the stage where I have a handful of contributors I can trust to just take on and handle issues with minimal intervention. This is a long process and takes a lot of consistent work.

### Get Funded

Let's pay people to work full time. Right now the particular niche that Vendure inhabits (headless e-commerce) is awash in VC cash. Despite a fair amount of interest, I've not taken any funding (and I'll probably dive a bit more into the reason in another blog post at some point), but what if I did?

Well, there are plenty of examples of those that have. In fact, several of my "direct competitors" are funded from between $1 - $2.5 million.

But how does that funding affect the bus factor? Looking at the contribution numbers for a couple of those funded projects, the power-law curve drops off _slightly_ less steeply. To be sure, there are more contributors making more commits, but I'd bet that the number of people with a deep holistic understanding of the system remains low. What might the formula be? The bus factor increments with every $5m invested? $50m? I'm not sure.

And funding introduces other risks. Now we have the problem of an open-source project needing to please not just the creators and community, but also the investors. Or the company never finds product-market fit and implodes. Or gets bought out by private equity and squeezed into a pulp.

## So: What About the Bus Factor?
Should merchants build their flashy new e-commerce apps on _Vendure: bus factor one_? 

If no, then good luck choosing your stack. Express? Nope. NestJS? Laravel? Vue? Nope. If it helps, there are plenty of other companies who already took the risk on Vendure - including a national supermarket chain, a unicorn startup, and yes, even IBM (and to paraphrase, "nobody ever got fired for choosing the framework used by IBM"). 

Ultimately, the bus factor is but one vital sign out of many. I think raising the bus factor is a good and valid target for _all_ open source projects. The world is built on this stuff. 

But you can't wait for us to get there. 

And neither can I. 

---

[Discuss on Hacker News](https://news.ycombinator.com/item?id=29416674)
