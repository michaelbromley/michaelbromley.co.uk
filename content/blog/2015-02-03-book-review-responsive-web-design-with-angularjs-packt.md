---
title: 'Book Review: Responsive Web Design with AngularJS; plus Musings on Technical Writing'
author: michael-bromley
type: post
date: 2015-02-02T22:05:56+00:00
aliases:
  - blog/389/book-review-responsive-web-design-with-angularjs-packt
categories:
  - post
tags:
  - AngularJS
  - book review

---
This is a review of the book _Responsive Web Design with AngularJS_ by Sandeep Kumar Patel. Disclosure: I was asked to review this book by the publisher, Packt, and they provided me with a copy of the ebook free of charge. The book can be found for purchase [here](https://www.packtpub.com/web-development/responsive-web-design-angularjs).

{{< figure src="/media/2015/02/cover.jpg" title="Responsive Web Design with AngularJS" >}}

### First Impressions

The first thing that struck me about this book is the title. "_Leverage the core functionalities of AngularJS_," reads the description on the cover page, "_to build responsive single page applications_". So what has AngularJS, I thought, got to do with responsive web design? After reading this book's 128 pages, the answer turns out to be "not much, really", though the author does explore some novel ways to combine the two.

The second thing that struck me is the quality of writing. From the very first page there are numerous grammatical and stylistic errors, and this unfortunately holds true for the entire book. It is clear that English is not the author's first language, and while I don't require technical books to be literary masterpieces, the errors present in this book are sufficiently serious to make reading difficult and the author's intent ambiguous in places.

With that said, I tried my best to look past the language difficulties and concentrate on the technical content. This does not always prove possible, for example when the author defines "controller scope" thus:

> AngularJS provides the controller scope to create a new controller to manipulate HTML DOM indirectly under its scope by modifying properties present inside its scope.

Gulp...

### What's It All About Then?

The first chapter is devoted to a general introduction to Angular. As a single chapter of an already-brief book, there is little hope of providing a useful introduction for Angular beginners; whereas for those already experienced with Angular, the cursory look at the basics is too simplistic and provides nothing new. In my opinion, the book should be squarely aimed at those already familiar with Angular, and dispense with the attempts at an introduction to the framework.

After that we get to the core proposition of the book, in which the author presents three methods of using Angular to make a responsive app, which boil down to:

  * Browser sniffing and then routing to specially-made views for either mobile, tablet or desktop.
  * Measuring `$window.outerWidth` and conditionally applying CSS classes to directives based on breakpoints which are hard-coded into the Angular code.

I'll not go into an in-depth technical breakdown of these approaches, except to say that I am highly dubious about how they would scale beyond the single-view demo app that is used in the book. On top of that, almost every example could be replicated with CSS media queries, leaving the Angular app in a much simpler state.

Too much space is taken with lists of API methods or CSS properties. In a reference book, this would be okay. Here, however, the data is neither complete nor particularly well explained. Usually, such a list is followed by a "go to [url] to find out more about [x]" - which could have effectively replaced the preceding page or two or half-hearted documentation, which is too many cases is simply confusing or outright misleading. Case in point, witness this definition of the "terminal" and "transclude" properties of a Directive Definition Object:

>   * `terminal`: This property takes a Boolean (true or false) as the value. When this property is set to true, the directive will execute.
>   * `transclude`: This property takes true or element as the value. Based on the input value, it compiles the current directive or elements and enables it to present a directive.

I'll admit - these are not necessarily the simplest terms to define (here are the [official docs](https://docs.angularjs.org/api/ng/service/$compile#-terminal-)), but come on. That's verging on nonsense.

Throughout the book I get the feeling that the author has been issued with a fixed page quota, and is trying his best to fill it. Remember back in school when you had to do a thousand-word essay on some topic that by all rights only warranted 500? Remember those pro-level waffle skills you developed to pad things out (_let's re-phrase that bit_, _who needs pronouns?_ etc.)? There's a lot of that going on here.

To my mind, this material is better suited as a blog post rather than a book. Take away all the bloated and redundant explanations of basic Angular and CSS terms, and you'd be left with a few pages of ideas and a dozen code snippets. Tell those who don't know what Angular is to go to [egghead.io](http://egghead.io/) and then come back when they've had a proper introduction to it.

### Conclusion

Unfortunately, I can think of no compelling reason to recommend this book. That is not to say the technical content is totally without merit, but I don't consider it worth the asking price to learn some techniques that - in my case at least - I cannot see being very useful in real projects.

There may be _some_ use cases for the techniques presented here, but I for one have managed to build this site - a responsive AngularJS app - by just using CSS media queries. Like normal people do.

## Epilogue

In this age of instantly-available educational content - myriad blogs, StackOverflow, numerous high-quality video courses - what is the appeal of forking out the sometimes-hefty sums asked for technical books? For me, I like the feeling of confidence that comes with buying a well-regarded book from a known, quality publisher. There is a certain reassurance imparted by knowing that the author or authors are a lot smarter and/or more experienced than I am. I just need to sit back, read, and level-up my skills, safe in the knowledge that I am not being lead down the dark path of wrongness.

To be frank, I was rather shocked by the low quality of this book. It strikes at the very thing I find most appealing about programming books. My first reaction was to email Packt to double-check that they had sent me the final version (I've not had a reply as of this writing). Then I tried to find out whether this was an aberration or the rule for this publisher.

I came across [this illuminating thread](https://plus.google.com/+ricardocabello/posts/PDVcovR7Sir) on the Google Plus page of Ricardo Cabello, aka Mr. Doob - the author of the popular JavaScript 3D library [three.js](https://github.com/mrdoob/three.js). In it he describes being sent an email by Packt asking him whether he would be interested in writing a book about three.js, since his "expertise in the subject is impressive". Then follows a huge discussion of the faults and merits of Packt, from disgruntled writers, disinterested spectators, and Packt employees themselves. Read the thread yourself and make up your own mind.

It must be said that Packt have definitely produced some quality books. In terms of AngularJS, their [book by Peter Bacon Darwin & Pawel Kozlowski](https://www.packtpub.com/web-development/mastering-web-application-development-angularjs) (two very well-known members of the Angular community) is generally held in very high regard. At the same time, the book under review here is clear evidence that high quality is not one of their requirements for publishing a book. The fact that there are _three _technical reviewers, a copy editor and two proof readers listed in the credits just confuses me even further. What is going on here?

I'd like to make it clear that I do not begrudge the author for his lack of command of English. I know that if I were to attempt to write a book in my second language (German), it would come out much worse than this. The author has a website full of informative blog posts and tutorials, and I'm sure that this has been a useful resource for many. The problem comes when we are asked to pay £18.99 for what is essentially blog-post quality material. The fault in this case lies _not_ with the author, rather it is the lack of editorial and technical oversight and control, which _should_ have prevented a book in this state from going to print.

**Closing thought**: Programmers are - in general - an exacting, demanding audience to write for. Trust and confidence are commodities which are difficult to accrue, and easy to lose. Publishers of technical literature are wise to recognise this and act accordingly.

&nbsp;