---
date: 2017-08-01T20:52:59+02:00
title: The Covert Opt-In
type: post
categories:
  - post 
tags:
  - essay
  - technology
  - internet
---
 
About 13 years ago I built a web shop for my dad's company. Like many small businesses, the company does not
have an in-house development or IT department, so anything vaguely website-related tends to end up in my inbox. 
This is how I recently found myself in a conference call with Dom from IntegriMart<sup>1</sup>, a company
which provides marketing tools for websites. This type of business is known as a *"marketing tech"* company, sometimes abbreviated
to the crap-sounding *"martech"*, and a close cousin to *"adtech"*.

{{< figure src="/media/2017/08/marketing-ux.png" >}}

## Engaging, Trust-building Conversations

Dom was an upbeat, chatty guy with a mild London accent. He guided our head of marketing and I through a slide deck of
IntegriMart's offerings, which cover things like displaying a popup when the user seems to want to leave the site, or 
sending emails to remind users that they didn't finish checking out yet.

As he lead us through the slides, Dom would tell us that this-or-that offering would help us "start a conversation"
with our users or "build trust" or "drive engagement". Several times I had to stop him to simply ask *"What does that mean? What does it do?"*. Where I could get an answer, that answer was very simple. Perhaps that's why Dom felt it needed fluffing up a bit. Or perhaps he was just following a script. I was never quite sure.

An example would go something like this:

> *Dom:* "Remarkatron" anticipates the customer's needs, helps drive 
engagement and keeps the conversation going at the most convenient time for the customer.

> *Me:* Okay. What does it do exactly?

> *Dom:* It's a way of optimizing the conversion rate by enabling strategic re-marketing at the right point in the customer journey.

> *Me:* Is it one of those popup things?

> (Back and forth as I try to extract a clear answer)

> *Me:* (finally) So, it shows a popup when the mouse goes out of the browser viewport and asks for their email address?

> *Dom:* Basically, yeah.

> *Me:* Thanks.

## The Funnel

In the online marketing world, there is the concept of *The Funnel*. It's used to describe the customer's journey from first contact (e.g. seeing an ad) right up until the hallowed *Conversion* (i.e. buying your stuff). I guess it's funnel-shaped because people drop off at each stage, so only a fraction of those who see the ad will ever buy your stuff. To my mind it behaves more like a sieve, but "conversion sieve" doesn't have the same ring to it.

Dom liked to talk about The Funnel. IntegriMart's offerings were all ultimately geared towards keeping people inside The Funnel. The *"please don't go!"* popups and *"you forgot to checkout!"* email reminders are aimed at scooping up drop-offs and plopping them back into The Funnel.

*And that can be just fine*. Marketing *does* have a valid function, and yes: sometimes I *do* want to buy something online and I don't mind being guided along a little. Sometimes I'm even glad to have seen an ad for a cool thing I was previously unaware of.

A problem arises where this effort becomes covert.

## The Covert "Opt-In"

IntegriMart's website boasts:

> We continuously track and store your customers' data, down to **every last user interaction and behaviour**, providing crucial insights that are used to inform the performance of your campaigns. 

Towards the end of the slide deck, Dom excitedly explained how if a user enters an email address in *any* form field anywhere on the website, then *regardless of whether the form is submitted*, that email address will be captured by IntegriMart and paired up with a browser fingerprint for that user. This, presumably, allows us to "continue to build a dialogue" with that user.

At this point there was a loud record scratch.

> *Me:* Wait, what?

> *Dom:* Yeah, I know, pretty spooky! Haha. But it's all totally above-board and is just there to help build...

> *Me:* But isn't it a bit off to secretly collect this information? Surely the user has a reasonable expectation that this stuff won't get recorded, right?

> *Dom:* All the techniques we use are fully legal and technically *opt-in*.

> *Me:* ... opt-in? How can you opt in to something you are unaware of?

> *Dom:* (stumbling) I mean, um, yeah. It's per a legal definition of *opt-in* (mumble).

At this point the sound of Dom's voice begins to drift away. The room darkens and a vivid image comes into my mind:

Dom and a Lawyer who looks like Saul Goodman are sitting in a bar, sputtering the words "OPT-IN!" between bouts of hysterical laughter, all the while slapping their thighs and occasionally pausing to snort a line of coke though an optimized conversion funnel. The roars of laughter build to a crushing crescendo. I wake up in a cold sweat, screaming

> **"THIS IS NOT WHAT BRENDAN EICH INTENDED!"**

## We Build Our World

What is my point in relating this anecdote? Is is that salespeople are sometimes glib and clueless? Is it that ad- and martech has a distinctly shady side? That's nothing new.

No. The point is that somebody like you or me wrote that code which secretly captures email addresses. Right now there are people thinking of better ways to fingerprint and track us around the web in ways that make an utter mockery of the 
[EU's cookie directive](https://www.theregister.co.uk/2017/03/01/planned_cookie_law_update_expert/) and other such doomed legislation. An entire industry is pursuing an agenda which finally turns the internet into a never-ending
assault on both our dignity and our senses.

If companies like IntegriMart openly boast about such invasive practices, one can only imagine the things they *don't* talk about. 

Once you let third-party JavaScript execute on your domain, you are handing your users over to those parties on a plate. Ask yourself whether, in light of what you know, you trust them to be as scrupulous as you are.

On a less sinister yet far more annoying level, it is these same forces which eventually destroy the user experience of broswing websites. Here's an experiment for you: 
Go to your favourite search engine and search one of the following phrases (or variation thereof): *"build my email list"*, *"growth hacking"*, *"increase engagement"*.

Pick a few results and browse around. I guarantee that you'll come across some or all of the following:

* Massive, obtrusive social sharing links
* Full-screen overlays asking for your email address
* A tiny box of content embedded in a patchwork of ads
* Stuff just... *popping up all over the place*
* Requests to send you push notifications (NO NO NO!)

And that's just the stuff you notice. Who knows what dark sorcery is going on in the JavaScript being delivered by any one of the 20-odd domains that somehow got in on the action.

As both consumers *and* creators of the Internet, we build our world. 

If you use the Internet, decide how much abuse you are willing to take in the name of *free* and *convenient*.

If you build the Internet, decide to what degree you are willing to turn weapons of annoyance and surveillance on your users in the name of *engagement* and *conversions* and *insight*<sup>2</sup>.

I'll finish with an excerpt from [this blistering speech](https://www.youtube.com/watch?v=LOAJA3Ei2w8) by Bob Hoffman of the
[Ad Contrarian](http://adcontrarian.blogspot.co.uk) blog:

> "It's hard for us to imagine that technology we are using that began with a simple and benign purpose of delivering online ads to websites efficiently has morphed into a monster.

> "It's powered by ‘tracking', which is just a pleasanter word for surveillance, and it has led to all kinds of dangerous mischief. It has subverted our industry's relationship to the public. It has enabled a cesspool of corruption, and an ocean of fraud. It places personal and private information about us within the reach of criminals, governments, and other potential malefactors. It has devalued the work of legitimate online publishers. It is degrading our news media. It is distrusted by marketers, and it is despised by the public.

> "Other than that, it's fuckin' great."

> -- <cite>Bob Hoffman, World Federation of Advertisers conference, April 2017</cite>

---

<sup>1</sup> Names have been changed of course. Conversations have been reconstructed from my memory - with perhaps a little dramatic licence - whilst still preserving the spirit of the exchange.

<sup>2</sup> I use Google Analytics on this website, for example.
