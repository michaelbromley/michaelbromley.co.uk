---
title: Auto-breadcrumbs with angular-ui-router
author: michael-bromley
type: post
date: 2014-04-04T13:19:51+00:00
aliases:
  - blog/100/auto-breadcrumbs-with-angular-ui-router
categories:
  - post
tags:
  - AngularJS
  - code
  - JavaScript
  - ui-router

---
For those that don't know, [angular-ui-router](https://github.com/angular-ui/ui-router) is a router for AngularJS that replaces the one that comes built-in, and adds a whole lot of  powerful features.

I've been using it on a project I'm working on and I've found the ability to nest routes to be really powerful and a nice way to organise routes (or _states_, as they should be more correctly called in the context of ui-router). I needed a way to auto-generate breadcrumbs based on this hierarchy of states, but didn't find any pre-packaged solution, so I put together my own. Here's a demo, and then I'll explain some features:

## How it works

The directive uses the `$state` service to generate the breadcrumbs by looking at the current state, and the traversing the state hierarchy to construct an array of breadcrumbs that are then used in an `ng-repeat` to generate the expected output.

So, for example, if you have the following set of states:

```Text
home
    home.contactsList
    home.contactsList.detail
```

You would expect the breadcrumbs to look something like: "Home / Contacts / John Smith"

The directive allows you to achieve this by adding a display name property onto the `$stateProvider.state()` config objects when you set up your states. You then tell the directive where that property is to be found, and the directive takes care of the rest. You can even use data resolved from asynchronous calls, or tell it not to generate a breadcrumb at all for that particular state.

## Code and docs

[All the code and full documentation is available on GitHub](https://github.com/michaelbromley/angularUtils/tree/master/src/directives/uiBreadcrumbs). Go and check it out. Any problems can be reported through GitHub. Note that while the directive has a pretty comprehensive set of unit tests, it hasn't been extensively tested yet in production, so there may be cases where it doesn't perform as expected. Just let me know and we'll see if we can improve it!