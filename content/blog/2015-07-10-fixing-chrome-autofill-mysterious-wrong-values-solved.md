---
title: 'Fixing Chrome Autofill: Mysterious Wrong Values Solved'
author: michael-bromley
type: post
date: 2015-07-10T14:52:17+00:00
aliases:
  - blog/437/fixing-chrome-autofill-mysterious-wrong-values-solved
categories:
  - post
tags:
  - code

---
On an ecommerce website I maintain, we started running into a strange issue where we were getting orders coming in with the first line of the address being duplicated in the "delivery instructions" field. This was causing all sorts of confusion and mild distress at the office. Today I finally persisted enough to get to the bottom of it.

The form was something like this - try it out yourself to see if you also get the first line of your address appearing in the delivery instructions:

<p class='codepen'  data-height='480' data-theme-id='8720' data-slug-hash='vOjdad' data-default-tab='result' data-animations='run' data-editable='' data-embed-version='2'>
  See the Pen <a href="http://codepen.io/michaelbromley/pen/vOjdad/">vOjdad</a> by Michael Bromley (<a href="http://codepen.io/michaelbromley">@michaelbromley</a>) on <a href="http://codepen.io">CodePen</a>.8720
</p>

It turns out to be a Chromium issue related to the way the autofill feature decides where to put saved data. You may have wondered how Chrome and other browsers figure out where to put each line of the address. Looking at the Chromium source, we can see that it uses a series of regular expressions to figure this out. Here's an example for how it detects where to put address line 1 ([source](https://code.google.com/p/chromium/codesearch#chromium/src/components/autofill/core/browser/autofill_regex_constants.cc)):

```C
const char kAddressLine1Re[] =
    "address.*line|address1|addr1|street"
    "|(shipping|billing)address$"
    "|strasse|straße|hausnummer|housenumber"  // de-DE
    "|house.?name"  // en-GB
    "|direccion|dirección"  // es
    "|adresse"  // fr-FR
    "|indirizzo"  // it-IT
    "|住所1"  // ja-JP
    "|morada|endereço"  // pt-BR, pt-PT
    "|Адрес"  // ru
    "|地址"  // zh-CN
    "|주소.?1";  // ko-KR
```

If you look at the HTML of my example above, you'll see that the name of the delivery instructions input is "instructions" - so why does that get picked up by the regex `"address.*line|address1|addr1|street"`?

After a little bit of hair pulling, I finally figured out that it matches against both the input name and the label. Look at the label again. There is actually a dedicated regex which looks for the label of address 1, which simply matches against the word "address".

The solution was simple - you can try it out by [editing the CodePen demo](http://codepen.io/michaelbromley/pen/vOjdad?editors=100) - I just changed the description to read _"Delivery instructions (if **location** hard to find)"_.

Then I moved on with my life. I hope this post can save somebody else an afternoon of bamboozlement. If this topic excites you, there is a riveting discussion to be found [here on StackOverflow](http://stackoverflow.com/a/9795126/772859).