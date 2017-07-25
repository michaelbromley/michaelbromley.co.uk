---
title: Writing Multi-Element Directives in AngularJS
author: michael-bromley
type: post
date: 2014-10-14T09:52:55+00:00
aliases:
  - blog/260/writing-multi-element-directives-in-angularjs
categories:
  - post
tags:
  - AngularJS
  - code
  - demo

---
AngularJS 1.2 introduced a new feature for the ngRepeat directive which allows the directive to span multiple elements, as opposed to just the single element that it is attached to. This is done by appending `-start` and `-end` to the directive name in your view:

```HTML
<tr ng-repeat-start="item in items"><td>{{ item.name }}</td></tr>

<tr ng-repeat-end><td>{{ item.innerLegMeasurement }}</td></tr>
```

The code above will output two table rows for each item in the collection - something that was simply not possible to achieve before.

I recently needed similar functionality in one of my own custom directives, but I couldn't find much information on how to write so-called "multi-element" directives. Therefore I thought it would be useful to write up what I learned from my experience.

## You Can Do It, Too!

The first thing to note is that it is indeed possible to write a multi-element custom directive. In fact, in Angular 1.2, it is as simple as defining a directive in the usual way, and then sticking `-start` and `-end` onto it when you use it in your view (with Angular 1.3 there is a slight change which I will discuss below).

As soon as you do this, you'll find that the `element` argument which gets passed to your directive's compile and link functions is now a collection of elements, ranging from  the element with the `-start` suffix up to and including the element with the `-end` suffix.

### An Example

I have written a directive, makePretty, which when added to an element will make it pretty with some tasteful colour adjustments:

```JavaScript
app.directive('makePretty', function() {

  function randomPrettyColour() {
    var prettyColours = ['Chartreuse', 'Fuchsia', 'MediumPurple', 'Yellow', 
                         'PeachPuff', 'HotPink', 'FireBrick', 'Aqua', 'DeepSkyBlue', 
                         'Peru', 'NavajoWhite', 'MistyRose'];
    return prettyColours[Math.floor(Math.random() * prettyColours.length)]
  }

  return {
    link: function(scope, element, attrs) {

      angular.forEach(element, function(el) {

        if (el.nodeType === Node.ELEMENT_NODE) {
          angular.element(el).css({
            'color': randomPrettyColour(),
            'background-color': randomPrettyColour()
          });
        }

      });

    }
  };
});
```

And I will use it like this:

```HTML
<p make-pretty-start>'You should learn not to make personal remarks,' Alice said with some severity; 'it's very rude.'</p>

<p>The Hatter opened his eyes very wide on hearing this; but all he SAID was, 'Why is a raven like a writing-desk?'</p>

<p make-pretty-end>'Come, we shall have some fun now!' thought Alice. 'I'm glad they've begun asking riddles.&mdash;I believe I can guess that,' she added aloud.</p>
```

When the directive is invoked, the `link` function will receive a jQLite collection of  5 nodes: the 3 `<p>` elements and 2 text nodes representing the carriage returns between each. In my directive I first check that the node is an element, and if so, I make it pretty.

That's it - it's really quite simple, as it turns out. Here is a working demo (I've added a bit of functionality to the example above, so that it can be toggled):

{{< plunker id="ny6aqt3kzDyljaGakaEM" >}}

Of course, this example is trivial and could just as easily be done with a separate directive on each paragraph element, but it demonstrates the point I think.

## Changes In AngularJS 1.3

The current implementation in Angular 1.2 has the nasty side-effect that you cannot name your directives with a `-start` suffix. I ran into this a while back when working with a touch-enabled app where I had created an event-handling directive named \`on-touch-start\`. It took me quite a while to figure out why this didn't work.

This behaviour is caused by the <a href="https://github.com/angular/angular.js/blob/v1.2.25/src/ng/compile.js#L1038" target="_blank"><code>$compile</code> service matching against any directive attribute with a "-start" suffix</a>, and assuming that this is therefore a multi-element invocation. When it fails to find the corresponding -end attribute, you get the following error:

<span style="color: #ff0000;"><code>Error: [$compile:uterdir] Unterminated attribute, found 'on-touch-start' but no matching 'on-touch-end' found.</code></span>

In 1.3, this unwanted behaviour is fixed by requiring that any multi-element directives are explicitly defined as such, by setting the new `multiElement` property of the directive definition object to true:

```JavaScript
myApp.directive('myMultiElementDirective', function() {
    return {
        multiElement: true,
        link: function(scope, element, attrs) {
            // ...
        }
    };
});
```

From the [Angular docs](https://docs.angularjs.org/api/ng/service/$compile#-multielement-):

> #### `multiElement` {#-multielement-}
> 
> When this property is set to true, the HTML compiler will collect DOM nodes between nodes with the attributes `<span class="pln">directive</span><span class="pun">-</span><span class="pln">name</span><span class="pun">-</span><span class="pln">start</span>`and `<span class="pln">directive</span><span class="pun">-</span><span class="pln">name</span><span class="pun">-</span><span class="kwd">end</span>`, and group them together as the directive elements. It is recomended that this feature be used on directives which are not strictly behavioural (such as [`<span class="pln">ngClick</span>`][1]), and which do not manipulate or replace child nodes (such as [`<span class="pln">ngInclude</span>`][2]).

Therefore, in 1.3 our example above would not work, since the $compile service would now see the `make-pretty-start` attribute and look for a corresponding `makePrettyStart` directive, which does not exist. Setting the `multiElement: true` property on the `makePretty` directive will, however, cause it to function as expected once again.

This has a couple of implications:

  1. With AngularJS 1.3 you are now free to name your directives anything you like, and they will work.
  2. If you are writing multi-element directives for an Angular 1.2 app, you should still set `multiElement: true`, to make your directive future-proof. The definition will be ignored in 1.2, so there is no harm in putting it there.

## Other Core Multi-Element Directives

An interesting side-note is that a [search on the AngularJS GitHub repo for "multiElement"](https://github.com/angular/angular.js/search?utf8=%E2%9C%93&q=multiElement) reveals that the property is set to "true" for several common core directives including ngIf, ngSwitch and ngShow/Hide. I've not yet explored the use of these directives in a multi-element setting, but I'm sure that knowing this possibility may come in useful at some point.

 [1]: https://docs.angularjs.org/api/ng/directive/ngClick
 [2]: https://docs.angularjs.org/api/ng/directive/ngInclude