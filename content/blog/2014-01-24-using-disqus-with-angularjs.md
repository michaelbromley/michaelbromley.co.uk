---
title: Using Disqus with AngularJS
author: michael-bromley
type: post
date: 2014-01-24T16:41:37+00:00
aliases:
  - blog/34/using-disqus-with-angularjs
categories:
  - post
tags:
  - AngularJS
  - code
  - JavaScript

---
Getting the comments platform [Disqus](http://disqus.com/) to work with your Angular-based website is probably not going to be as simple as dropping in the default Disqus code snippet into your HTML template.

Due to the way Angular loads its templates, it is likely that the Disqus script will not get executed and you won't see the comments box on your page.

I searched on Google to see if there was a documented way to get Disqus to work with Angular, and I came across [this project on GitHub](https://github.com/kirstein/angular-disqus). Unfortunately it has the requirement that you need to use hashbang (#!) URLs in order to make it work, and also it seemed a bit more than I needed. I just wanted a very simple solution to getting a Disqus widget on my page.

So I wrote a custom directive for Angular that makes adding Disqus to your page as simple as:

```HTML
<dir-disqus disqus-shortname="YOUR_DISQUS_SHORTNAME"></dir-disqus>
```

You can also specify any custom config values like so:

```HTML
<dir-disqus disqus-shortname="YOUR_DISQUS_SHORTNAME"
        disqus-identifier="{{ article.id }}"
        disqus-title="{{ article.title }}"
        ...>
 </dir-disqus>
```

As you can see in the example above, you can use Angular's data binding to dynamically specify the Disqus config options. Also of note is that you don't need to do any kind of configuration in your JavaScript code. It's all done through the "API" set up by the directive itself, via the attributes.

For full documentation and code, check it out in [my Angular Utilities repo on GitHub](https://github.com/michaelbromley/angularUtils/tree/master/src/directives/disqus).

I hope others find this useful too!

&nbsp;