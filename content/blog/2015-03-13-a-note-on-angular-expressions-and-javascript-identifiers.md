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
A variable used in an Angular expression cannot contain a hyphen. This might be obvious to some, but [this issue](https://github.com/michaelbromley/angularUtils/issues/128) on one of my GitHub repos baffled me for a while, and the solution was really simple and now seems totally obvious to me. I'm making a public note of it so that I may save another frustrated developer a few minutes of hair-pulling.

## The Problem

In brief, I have a directive that takes an id attribute and parses it with the $parse service. Someone reported that my directive wasn't properly evaluating this expression (simplified version):

```HTML
<my-directive id="scopeObject.name + '-suffix'"></my-directive>
```

The code all seemed okay. Assuming the value of `$scope.scopeObject.name` to be "someName", you would expect the id to be parsed as "someName-suffix". After spending a while stepping through Angular's internals in Chrome devtools, I discovered that Angular would split the expression "someName-suffix" into two tokens, "someName" and "suffix", discarding the hyphen.

## The Solution

The fix in this case is to just remove the hyphen and replace it with, for example, and underscore: `id="scopeObject.name + '_suffix'"`. The (now stupidly obvious) reason is that in general, a variable used in an Angular expression must be a valid JavaScript identifier (i.e. a valid variable name). _JavaScript identifiers cannot contain a hyphen_. Here is an excellent article about the exact rules involved: [Valid JavaScript variable names in ECMAScript 5](https://mathiasbynens.be/notes/javascript-identifiers).

Some examples:

```HTML
// invalid
Hello {{ my-var }};
<input ng-model="my-var">

// valid
Hello {{ my_var }}
<input ng-model="my_var">

// invalid
Hello {{ someObject.my-var }}
<input ng-model="someObject.my-var">

// valid - the object bracket notation allows arbitrary strings as object keys.
Hello {{ someObject['my-var'] }}
<input ng-model="someObject['my-var']">
```

## Digging Deeper

Notice above that I said "in general", a variable in an Angular expression must be a valid JavaScript identifier. This is not strictly true. In JavaScript, there are a bunch of reserved words which are also off-limits for use as identifier names. Examples include "if", "while", "var", "null" and so on. Angular, on the other hand will let you use most of these keywords as a variable name in your expression:

```HTML
// this works
Hello {{while}}
<span style="line-height: 1.5;"><input ng-model="while"></span>

// so does this
Hello {{var}}
<input ng-model="var">

// but this breaks!
// Error: [ngModel:nonassign] Expression 'null' is non-assignable.
Hello {{null}}
<input ng-model="null">
```

Digging into the Angular source, we can see that there are five _really_ reserved words as far as Angular expressions are concerned: "this", "null", "undefined", "true" and "false". [Here is the relevant code](https://github.com/angular/angular.js/blob/v1.3.x/src/ng/parse.js#L86-L99) from the $parse service.

It is also worth bearing in mind that when you reference a variable in an Angular expression, it is actually just a property of the $scope object, rather than a stand-alone variable. In this regard, it seems less crazy to allow identifiers such as "while" or "var" in an expression, since they are actually referencing `$scope['while']` and `$scope['var']` respectively. I say _less_ crazy, since I still wouldn't advise the use of JavaScript reserved words in your expressions.
