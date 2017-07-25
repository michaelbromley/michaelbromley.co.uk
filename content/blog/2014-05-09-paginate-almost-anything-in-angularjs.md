---
title: Paginate (almost) Anything in AngularJS
author: michael-bromley
type: post
date: 2014-05-09T19:46:45+00:00
url: /108/paginate-almost-anything-in-angularjs
categories:
  - post
tags:
  - AngularJS
  - code
  - demo
  - JavaScript
---
The `ng-repeat` is probably one of the most oft-used of all the core AngularJS directives, and with good reason. It offers amazing flexibility and is probably one of the first things to really "wow" you about the framework.

Whenever I've used `ng-repeat`, however, I've usually also run in to the need to paginate the items being repeated. It seems like there should be some way to do it that is as simple and intuitive as the `ng-repeat` directive itself.

Google for "angularjs pagination", and you'll find [this StackOverflow thread](http://stackoverflow.com/questions/10816073/how-to-do-paging-in-angularjs), in which several different approaches are discussed - with the current accepted answer coming from Brian Ford of the Angular core team. There are certainly lots of good ideas there, but still not the "plug and play" solution that I felt should exist.

After having implemented my own pagination directives a few times - each time getting simpler and better encapsulated - I decided to sit down and really tackle the problem. I've made what I think is a solid solution for paginating (almost) anything. I say almost, since I've not tested everything. But I designed it so that if works in an `ng-repeat`, it'll work here.

## Design Goals

*Zero or minimal code needed in the controller. The solutions in the StackOverflow thread mentioned above all involve some degree of logic in the controller, e.g. to calculate the total pages and so on.
* Ability to work with filters on the collection
* Pagination links that are data-bound to the <code>ng-repeat</code> block.
* Ability to work across controllers, i.e. repeat block in one controller and the pagination links in another.

## The Solution

I've written a module that allows you to add pagination as simply as adding `ng-repeat`. In fact, the directive delegates to ng-repeat while also adding a bunch of features automatically, that usually would require quite a bit of custom code in the controller. Here is how it looks:

```HTML
<ul>
    <li dir-paginate="item in items | itemsPerPage: 10">{{ item }}</li>
</ul>

// then somewhere else on the page ....

<dir-pagination-controls></dir-pagination-controls>
```

As you can see, this is just the HTML template - no code is needed in your controller. In fact, the two parts (the `dir-paginate` and the `dir-pagination-controls` can be in totally separate controllers, and they'll still be bound together (you can see this aspect in action in the Plunker demo below).

## How It Works

The module consists of two directives - `dirPaginate` and `dirPaginationControls` - a filter `itemsPerPage`, and a service `paginationService`, which allows communication between the directives without relying on any controller's $scope.

As mentioned earlier, the `dir-paginate` directive delegates to `ng-repeat` under the hood, which allows it to use any kind of [expression that can be used by ngRepeat](https://docs.angularjs.org/api/ng/directive/ngRepeat). Credit for the method I used to achieve this goes to the author of [this post](https://groups.google.com/d/msg/angular/an9QpzqIYiM/r8v-3W1X5vcJ), and it basically involves adding the `ng-repeat` attribute to the element before the linking stage and using the `$compile` service to return a template function that is used in the `link` stage.

## Demo

[Check out a working demo on Plunker](http://plnkr.co/edit/Wtkv71LIqUR4OhzhgpqL?p=preview). The demo demonstrates some of the cool features outlined in the design goals section such as working across controllers and dynamic filters and page size.

## Asynchronous (Server-Side) Paging

The arrangement described above works well for smaller collections, but once your data set reaches a certain size, you may not want to have to get the entire collection from the server just to view a few pages. The solution to this is to paginate on the server-side, whereby the server will only send one page of data at a time. In this case, the directive would see the small (one page) data set and think that was all, resulting in no pagination at all (assuming you set the `itemsPerPage` filter to match the number of items returned per server-side page).

After running into this very scenario, I added the ability to accommodate server-side paging with only a few additions to what is described above. There is a full write-up and example of how this would work in the [here in the documentation on GitHub](https://github.com/michaelbromley/angularUtils/tree/master/src/directives/pagination#working-with-asynchronous-data).

## Code

The code is available in my [AngularUtils repo on GitHub](https://github.com/michaelbromley/angularUtils/tree/master/src/directives/pagination). It's available under the MIT license so use it and contribute!

## 5-Minute Intro Video

Here is a video of my lightning talk at the ngEurope conference 2014 where I give a 5-minute introduction to this module:

{{< youtube tASrOwMSfcg >}}
