---
title: The Secret Life of the HTML Style Attribute
author: michael-bromley
type: post
date: 2014-07-25T06:19:54+00:00
draft: true
private: true
url: /183/the-secret-life-of-the-html-style-attribute
categories:
  - post

---
The HTML style attribute is probably most commonly known to web devs as "that thing that you should not use". True - inline styles are, in many cases, not the best way to style your content for a number of reasons. However, inline styles have at least one major application: dynamically setting styles via JavaScript.

If you've ever used jQuery's `$(element).css()` method, or any kind of JavaScript DOM animation technique, chances are it relied on altering the inline style of that element.

I am currently working on a side project which is heavy on CSS- and DOM-manipulation. Part of it involves saving the current inline CSS state, doing some JavaScipt transformations on the element's CSS style, and then later restoring the original state. Implementing this feature lead me down the CSS rabbit hole - an ever-present danger for the front-end web developer. This time, though, I actually got something constructive out of the experience, rather than the usual frustration and bewilderment which accompanies in-depth CSS hacking.

## The Apparent Simplicity of the Style Attribute

On the suface, the style attribute looks to be a very simple affair. Let's say you want a div with a defined height and width:

```
<div style="height: 100px; width: 100px;"></div>
```

Simple, right? Just add the definitions as a string, like when you write and external .css file.

Mostly, yes.

It is true that you can simply specify the textual content of the style attribute in order to set simple style attributes. We do this any time we are doing quick-and-dirty hacking and can't be bothered to define a style in an external file, right?

Let's say I want to change the width and height with JavaScript, I could do therefore logically do this:

```
element.setAttribute('style', 'height: 50px; width: 50px;');
```

And that's all okay ([JSFiddle](http://jsfiddle.net/yNsJT/4/)). However, in certain cases, things can get a little weird...

## Let's Look At Some Weirdness

For the following demo I will be using the `window.getComputedStyle()` method. From [MDN](https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle):

> The Window.getComputedStyle() method gives the values of all the CSS properties of an element after applying the active stylesheets and resolving any basic computation those values may contain.

So getComputedStyle will give the result of _all_ style rules that apply to that element, including external .css files, style declarations in the document, and inline styles in the style attribute. To view the computed style for a particular property, we just write `window.getComputedStyle().propertyName`

Okay, with that established, let's look at some weirdness:

```
/* external .css file */
.myElement {
    transition: background-color 0.5s;
}

```

```
<!-- the HTML -->
<div class="myElement"></div>

```

<pre>// JavaScript
element = document.querySelector('.myElement');
// let's check the initial computed style for the "transition" property
console.log(window.getComputedStyle(element).transition);
// "background-color 0.5s ease 0s" - as expected.

// let's check the content of the "style" attribute
console.log(element.attr('style'));
// "" - empty as expected.

// let's define the "transition-delay" property as 0.5s
element.style.transitionDelay = '0.5s';
console.log(window.getComputedStyle(element).transition);
// "background-color 0.5s ease 0.5s" - it's added the 0.5s as expected.
console.log(element.attr('style'));
// "transition: 0.5s;" - hmm strange. The shorthand 



There is a mystery here. The style attribute remains identical after pressing the second button, yet the behaviour changes. What is going on?


<h2>
  Behind The Scenes - CSSStyleDeclaration
</h2>
The last example seems to indicate that there is more going on with an inline style than the mere textual content of the style attribute. That turns out to be the case.

In CSS, style rules are not internally represented by simple strings. Behind the scenes, these strings get converted to a 

[CSSStyleDeclaration](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration). This is the object that you interact with whenever you use the element.style property of a DOM element, or the $(element).css('propertyName') method in jQuery. It is the reason why the following things don't work as expected:


```
var element = document.getElementById('myElement');
element.style = "width: 100px;" // nope - the style property is read-only and returns a CSSStyleDeclaration object
element.style.width = "100px"; // works, since it uses the API provided by CSSStyleDeclaration

```


<p>
  The reason you are able to declare inline styles with a string, as in the first example, is that the CSSStyleDeclaration object will attempt to parse that string into an internal collection of style declarations. The reason it breaks down in the second example is that there is not always a one-to-one parity between the internal declarations and the string that appears in the HTML style attribute.
</p>


<p>
  To illustrate this, consider the following:
</p>


```
var myDiv = document.getElementById('myDiv');
myDiv.style.transitionDelay = "1s"; 
// result in Chrome 36: <div id="myDiv" style="transition: 1s; -webkit-transition: 1s;"></div>

```


<p>
  You would expect that the style attribute would be "transition-delay: 1s", but this is not the case. However, if you were to query the actual CSSStyleDeclaration object, you get this:
</p>


```
console.log(myDiv.style.transitionDelay); // result: "1s"
```


<p>
  Now if we manually set the string content of the HTML style attribute, let's see what we get:
</p>


```
myDiv.setAttribute('style', myDiv.style.cssText);
console.log(myDiv.style.transitionDelay); // result: "initial"

```


<p>
  Here, the second value "[initial](https://developer.mozilla.org/en-US/docs/Web/CSS/initial_value)" means that now no value is set for this CSS property, yet we have literally copied the exact CSS style text from the CSSStyleDeclaration object itself!
</p>


<p>
  &nbsp;
</p>