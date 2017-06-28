---
title: A Note on Angular Expressions And JavaScript Identifiers
author: michael-bromley
type: post
date: 2015-03-13T09:39:41+00:00
url: /410/a-note-on-angular-expressions-and-javascript-identifiers
categories:
  - post
tags:
  - AngularJS
  - code
  - JavaScript

---
A variable used in an Angular expression cannot contain a hyphen. This might be obvious to some, but <a href="https://github.com/michaelbromley/angularUtils/issues/128" target="_blank">this issue</a> on one of my GitHub repos baffled me for a while, and the solution was really simple and now seems totally obvious to me. I&#8217;m making a public note of it so that I may save another frustrated developer a few minutes of hair-pulling.

## The Problem

In brief, I have a directive that takes an id attribute and parses it with the $parse service. Someone reported that my directive wasn&#8217;t properly evaluating this expression (simplified version):

<pre>&lt;my-directive id="scopeObject.name + '-suffix'"&gt;&lt;/my-directive&gt;
</pre>

The code all seemed okay. Assuming the value of `$scope.scopeObject.name` to be &#8220;someName&#8221;, you would expect the id to be parsed as &#8220;someName-suffix&#8221;. After spending a while stepping through Angular&#8217;s internals in Chrome devtools, I discovered that Angular would split the expression &#8220;someName-suffix&#8221; into two tokens, &#8220;someName&#8221; and &#8220;suffix&#8221;, discarding the hyphen.

## The Solution

The fix in this case is to just remove the hyphen and replace it with, for example, and underscore: `id="scopeObject.name + '_suffix'"`. The (now stupidly obvious) reason is that in general, a variable used in an Angular expression must be a valid JavaScript identifier (i.e. a valid variable name). _JavaScript identifiers cannot contain a hyphen_. Here is an excellent article about the exact rules involved: <a href="https://mathiasbynens.be/notes/javascript-identifiers" target="_blank">Valid JavaScript variable names in ECMAScript 5</a>.

Some examples:

<pre ng-non-bindable>// invalid
Hello {{ my-var }};
&lt;input ng-model="my-var"&gt;

// valid
Hello {{ my_var }}
&lt;input ng-model="my_var"&gt;

// invalid
Hello {{ someObject.my-var }}
&lt;input ng-model="someObject.my-var"&gt;

// valid - the object bracket notation allows arbitrary strings as object keys.
Hello {{ someObject['my-var'] }}
&lt;input ng-model="someObject['my-var']"&gt;
</pre>

## Digging Deeper

Notice above that I said &#8220;in general&#8221;, a variable in an Angular expression must be a valid JavaScript identifier. This is not strictly true. In JavaScript, there are a bunch of reserved words which are also off-limits for use as identifier names. Examples include &#8220;if&#8221;, &#8220;while&#8221;, &#8220;var&#8221;, &#8220;null&#8221; and so on. Angular, on the other hand will let you use most of these keywords as a variable name in your expression:

<pre ng-non-bindable>// this works
Hello {{while}}
<span style="line-height: 1.5;">&lt;input ng-model="while"&gt;</span>

// so does this
Hello {{var}}
&lt;input ng-model="var"&gt;

// but this breaks!
// Error: [ngModel:nonassign] Expression 'null' is non-assignable.
Hello {{null}}
&lt;input ng-model="null"&gt;
</pre>

Digging into the Angular source, we can see that there are five _really_ reserved words as far as Angular expressions are concerned: &#8220;this&#8221;, &#8220;null&#8221;, &#8220;undefined&#8221;, &#8220;true&#8221; and &#8220;false&#8221;. <a href="https://github.com/angular/angular.js/blob/v1.3.x/src/ng/parse.js#L86-L99" target="_blank">Here is the relevant code</a> from the $parse service.

It is also worth bearing in mind that when you reference a variable in an Angular expression, it is actually just a property of the $scope object, rather than a stand-alone variable. In this regard, it seems less crazy to allow identifiers such as &#8220;while&#8221; or &#8220;var&#8221; in an expression, since they are actually referencing `$scope['while']` and `$scope['var']` respectively. I say _less_ crazy, since I still wouldn&#8217;t advise the use of JavaScript reserved words in your expressions.