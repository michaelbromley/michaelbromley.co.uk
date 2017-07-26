---
title: How I got Zurb Foundation 4 to work with IE8 with zero lines of code
author: michael-bromley
type: post
date: 2014-01-19T06:14:03+00:00
aliases:
  - blog/5/how-i-got-zurb-foundation-4-to-work-with-ie8-with-zero-lines-of-code
categories:
  - post
tags:
  - JavaScript

---
I recently did a re-design of a medium-sized e-commerce website with version 4 of the excellent Foundation framework from Zurb.

Right at the very end of the project, I realised that my carefully-crafted design completely broke on IE8. **It literally looked like it had been run over by a bus and had flattened into a big tyre-track of dead webpage running down my monitor.**

## But...why even support IE8?

Good question. The Zurb guys themselves made the decision to drop support from version 4 onwards. With the added baggage and need for polyfills that comes along with supporting legacy IE, many projects are now deciding to drop support altogether, and move into the auto-updating future. After all, the only people who are actually locked into using IE 8 are those still on Windows XP. And hell, even they could just download Chrome or another modern browser if they wanted!

Yeah, well it turns out that, due to the nature of the products this website sells, a large proportion of the users are elderly, less computer-literate, and - in some cases - still using XP. People who would stare at me blankly if I suggested that they download a more modern browser.

A quick look at our analytics revealed that roughly 4% of visits from the past month came from IE <= 8. Four percent is not too bad, but it still equates to a couple of thousand visitors per month who were about to be presented with an almost unusable website. I would guess there are others out there who have run into a similar scenario. Hence this article.

## Okay, I get it. So whats the fix then?

The basic reason why my website broke in such a spectacular way is due to the lack of media queries support in IE8 and below. Since the entire "mobile first" approach of Foundation 4 utterly depends on media queries, that's not a good mix.

After searching around for a while, I found a post on Zurb's blog addressing this exact issue: <a title="Getting Foundation and IE8 to Play Nice" href="http://zurb.com/article/1204/getting-foundation-and-ie8-to-play-nice" target="_blank">Getting Foundation and IE8 to Play Nice</a>. Great! Except that the proposed solution was a monstrosity of conditional stylesheet loading, doubling-up on grid tags and basically having both Foundation 3 and Foundation 4 run in parallel.  Not only does this solution feel like an assault on my sense of elegance, it would also demand at least a few days' time trudging through all the view code, adding new classes everywhere and then testing everything again. Not to mention the added bloat of an entire new set of CSS and JavaScript.

No!

Luckily, one of the comments to that blog post contained the real solution (for me, at least, and maybe for you too).

<h3 style="text-align: center;">
  <a title="Respond.js" href="https://github.com/scottjehl/Respond" target="_blank">The solution is Respond.js</a>
</h3>

Respond.js is a polyfill written by Scott Jehl for min- and max-width media queries support. Minified and gzipped, it's only 1kb. Drop it in to your site, and your Foundation 4 (and probably 5, but I've not tested that) will magically work.

## But... zero lines of code?

Okay, I cheated a bit so I could have a cooler-sounding title. I am using a [Grunt](http://gruntjs.com/)-based workflow that is set up to automatically concatenate and minify all my .js files. So I just had to drop the respond.js file into my script folder and then sit back and enjoy a working IE8 experience. I use the word "enjoy" advisedly.

&nbsp;