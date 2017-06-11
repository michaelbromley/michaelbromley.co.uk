---
title: Angular 2, CommonJS and Circular Dependencies
author: michael-bromley
type: post
date: 2016-01-29T08:50:04+00:00
url: /507/angular-2-commonjs-and-circular-dependencies
categories:
  - post
tags:
  - Angular 2
  - ES6
  - JavaScript

---
Yesterday I lost several hours to the following error in an Angular 2 app I am working on:

<pre>Cannot resolve all parameters for 'BaseDataService'(Http, undefined, ODataService). 
Make sure that all the parameters are decorated with Inject or have valid type 
annotations and that 'BaseDataService' is decorated with Injectable.</pre>

The `undefined` in this case is my redux AppStore service. Other dependencies (Http, ODataService) worked just fine. Even weirder &#8211; I was successfully injecting AppStore into several other components without issue. Why did it fail only in this case?

After stepping through first my app code, then the Angular 2 framework code, and finally the Webpack-generated JS, I figured out that the problem originated while Webpack is walking the module dependency graph and populated the `exports` property of each CommonJS module.

A little bit more research revealed that I was running into a problem with the way the CommonJS module format (as used by Webpack and Browserify) deals with circular (or &#8220;cyclic&#8221;) dependencies. If you are interested in the details, read the [section on cyclic dependencies][1] in Axel Rauschmayer&#8217;s _Exploring ES6_.

**In short: If you run into this error, carefully check your modules for circular dependencies**. In my case, the circle consisted of about 4 &#8220;hops&#8221; from one module to the next until getting back to the start, so it was by no means obvious.

I hope this article gets a good ranking on Google and saves someone else the pain I just went through.

 [1]: http://exploringjs.com/es6/ch_modules.html#sec_cyclic-dependencies