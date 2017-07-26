---
title: 'angular-wordpress-seed: A complete example project with AngularJS and the WordPress JSON REST API'
author: michael-bromley
type: post
date: 2015-03-28T10:16:33+00:00
aliases:
  - blog/418/angular-wordpress-seed-a-complete-example-project-with-angularjs-and-the-wordpress-json-rest-api
categories:
  - post
tags:
  - AngularJS
  - code
  - Wordpress

---
Last September I wrote a [post][1] detailing how I went about re-building this website with AngularJS backed by WordPress. That write-up was a high-level discussion on my choice of tools, design decisions, and lessons learned, rather than specific implementation details. The article proved to be one of the more popular I've written so far, and I've since received many requests to make the source code publicly available.

In response to this interest, I decided to put together a bare-bones version of the code that is running this blog: **angular-wordpress-seed**. Go [check it out on GitHub][2]!

All the tools I described in the original post are used: namely AngularJS, WordPress, WP-API, Gulp and PureCSS. The Gulpfile is pretty full-featured: it'll live-build both a development and distribution version of the app simultaneously (the speed of Gulp over Grunt was something I highlighted previously) and do all the expected things like annotate your Angular code, jsHint, minification, concatenation, live reloading and so on.

Instructions on how to get it set up are included in the [repo's readme][3], but it's pretty simple and following my own instructions I was able to set up both the WordPress & Rest API and the client app from scratch in less than 10 minutes.

Resources

  * [angular-wordpress-seed repo on GitHub][2]
  * [Live demo of the project][4] (using my own WordPress instance as a data source)
  * [Experiences Building a Website with AngularJS + WP-API (WordPress API)][1] [the original article]

 [1]: http://www.michaelbromley.co.uk/blog/228/experiences-building-a-website-with-angularjs-wp-api-wordpress-api
 [2]: https://github.com/michaelbromley/angular-wordpress-seed
 [3]: https://github.com/michaelbromley/angular-wordpress-seed#setting-up-wordpress
 [4]: http://www.michaelbromley.co.uk/experiments/angular-wordpress-seed/