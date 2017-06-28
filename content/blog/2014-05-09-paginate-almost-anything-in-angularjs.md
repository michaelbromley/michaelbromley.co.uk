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
The `ng-repeat` is probably one of the most oft-used of all the core AngularJS directives, and with good reason. It offers amazing flexibility and is probably one of the first things to really &#8220;wow&#8221; you about the framework.

Whenever I&#8217;ve used `ng-repeat`, however, I&#8217;ve usually also run in to the need to paginate the items being repeated. It seems like there should be some way to do it that is as simple and intuitive as the `ng-repeat` directive itself.

Google for &#8220;angularjs pagination&#8221;, and you&#8217;ll find <a href="http://stackoverflow.com/questions/10816073/how-to-do-paging-in-angularjs" target="_blank">this StackOverflow thread</a>, in which several different approaches are discussed &#8211; with the current accepted answer coming from Brian Ford of the Angular core team. There are certainly lots of good ideas there, but still not the &#8220;plug and play&#8221; solution that I felt should exist.

After having implemented my own pagination directives a few times &#8211; each time getting simpler and better encapsulated &#8211; I decided to sit down and really tackle the problem. I&#8217;ve made what I think is a solid solution for paginating (almost) anything. I say almost, since I&#8217;ve not tested everything. But I designed it so that if works in an `ng-repeat`, it&#8217;ll work here.



## Design Goals

<ul style="margin-left: 30px; list-style: inherit;">
  <li>
    Zero or minimal code needed in the controller. The solutions in the StackOverflow thread mentioned above all involve some degree of logic in the controller, e.g. to calculate the total pages and so on.
  </li>
  <li>
    Ability to work with filters on the collection
  </li>
  <li>
    Pagination links that are data-bound to the <code>ng-repeat</code> block.
  </li>
  <li>
    Ability to work across controllers, i.e. repeat block in one controller and the pagination links in another.
  </li>
</ul>

## The Solution

I&#8217;ve written a module that allows you to add pagination as simply as adding `ng-repeat`. In fact, the directive delegates to ng-repeat while also adding a bunch of features automatically, that usually would require quite a bit of custom code in the controller. Here is how it looks:

<pre>&lt;ul&gt;
    &lt;li dir-paginate="item in items | itemsPerPage: 10"&gt;{{ item }}&lt;/li&gt;
&lt;/ul&gt;

// then somewhere else on the page ....

&lt;dir-pagination-controls&gt;&lt;/dir-pagination-controls&gt;</pre>

As you can see, this is just the HTML template &#8211; no code is needed in your controller. In fact, the two parts (the `dir-paginate` and the `dir-pagination-controls` can be in totally separate controllers, and they&#8217;ll still be bound together (you can see this aspect in action in the Plunker demo below).

## How It Works

The module consists of two directives &#8211; `dirPaginate` and `dirPaginationControls` &#8211; a filter `itemsPerPage`, and a service `paginationService`, which allows communication between the directives without relying on any controller&#8217;s $scope.

As mentioned earlier, the `dir-paginate` directive delegates to `ng-repeat` under the hood, which allows it to use any kind of <a href="https://docs.angularjs.org/api/ng/directive/ngRepeat" target="_blank">expression that can be used by ngRepeat</a>. Credit for the method I used to achieve this goes to the author of <a href="https://groups.google.com/d/msg/angular/an9QpzqIYiM/r8v-3W1X5vcJ" target="_blank">this post</a>, and it basically involves adding the `ng-repeat` attribute to the element before the linking stage and using the `$compile` service to return a template function that is used in the `link` stage.

## Demo

<a href="http://plnkr.co/edit/Wtkv71LIqUR4OhzhgpqL?p=preview" target="_blank">Check out a working demo on Plunker</a>. The demo demonstrates some of the cool features outlined in the design goals section such as working across controllers and dynamic filters and page size.

## Asynchronous (Server-Side) Paging

The arrangement described above works well for smaller collections, but once your data set reaches a certain size, you may not want to have to get the entire collection from the server just to view a few pages. The solution to this is to paginate on the server-side, whereby the server will only send one page of data at a time. In this case, the directive would see the small (one page) data set and think that was all, resulting in no pagination at all (assuming you set the `itemsPerPage` filter to match the number of items returned per server-side page).

After running into this very scenario, I added the ability to accommodate server-side paging with only a few additions to what is described above. There is a full write-up and example of how this would work in the <a href="https://github.com/michaelbromley/angularUtils/tree/master/src/directives/pagination#working-with-asynchronous-data" target="_blank">here in the documentation on GitHub</a>.

## Code

The code is available in my <a href="https://github.com/michaelbromley/angularUtils/tree/master/src/directives/pagination" target="_blank">AngularUtils repo on GitHub</a>. It&#8217;s available under the MIT license so use it and contribute!

## 5-Minute Intro Video

Here is a video of my lightning talk at the ngEurope conference 2014 where I give a 5-minute introduction to this module: