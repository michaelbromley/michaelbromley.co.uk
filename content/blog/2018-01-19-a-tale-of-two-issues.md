---
date: 2018-01-20T20:52:59+02:00
title: A Tale of Two Issues
type: post
categories:
  - post 
  - featured
tags:
  - open source
  - programming
ogimage: media/2018/01/oliver-thomas-klein-207908.jpg
---

*Zoid* is a JavaScript library for simple arithmetic operations. The project has been around for a few years and
has a sole maintainer, who works on it in her free time.

{{< figure src="/media/2018/01/oliver-thomas-klein-207908.jpg" title="Photo by Oliver Thomas Klein on Unsplash" >}}

Here are a couple of issues picked out of the issue tracker - one from a couple of years ago and one very recent, 
presented without comment.

## Issue #37 - clicking button does not add 1

{{< issue-entry user="hecter88" type="comment" date="Jul 13, 2015" >}}
Hey. Having trouble with using the add function when clicking a button. It doesn't work.
{{< /issue-entry >}}

{{< issue-entry user="zoider (maintainer)" type="comment" date="Jul 13, 2015" >}}
Hi, can you show me what you are trying to do? Paste some code?
{{< /issue-entry >}}

{{< issue-entry user="hecter88" type="comment" date="Jul 13, 2015" >}}
  Oh yeh sorry.  
```JavaScript
add_handlers: function() {
document.getElementById('add_one').onclick = function() {
  this.current_count = zoid.add(this.current_count, 1);
}
  },
``` 
I do that and then just nothing happens. The counter doesn't go up. Please help!
{{< /issue-entry >}}

{{< issue-entry user="zoider (maintainer)" type="comment" date="Jul 13, 2015" >}}
Oh ok I think I see the issue. When you reference `this.current_count` inside the onclick handler, the value of "this"
will be bound to the element that was clicked, rather than the outer object.

So you can either use an arrow function or bind the outer `this` to another name, e.g. 
```JavaScript
const that = this;
```
and then use `that.current_count` in your click handler.
{{< /issue-entry >}}

{{< issue-entry user="hecter88" type="comment" date="Jul 14, 2015" >}}
Okay so I am not sure if this is right but I tried arrow functions and everything seems to be broken right now and 
I'm not sure what's up:
```JavaScript
add_handlers: function() => {
    document.getElementById('add_one').onclick = function() => {
  this.current_count = zoid.add(this.current_count, 1);
}
},
```
{{< /issue-entry >}}

{{< issue-entry user="zoider (maintainer)" type="comment" date="Jul 14, 2015" >}}
You need to remove the `function` keyword if you are using arrow functions. That's a syntax error right now. See the
[MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#Syntax) for the 
correct syntax.
{{< /issue-entry >}}

{{< issue-entry user="hecter88" type="comment" date="Jul 14, 2015" >}}
Ok . So we are almost there (thx for the help man). Now it all seems to work fine but in IE it seems totally broken
now as in nothing works, just loads of errors all over the place!
{{< /issue-entry >}}

{{< issue-entry user="zoider (maintainer)" type="comment" date="Jul 14, 2015" >}}
Just checking here - are you transpiling down your code with something like Babel? because those arrow functions are 
part of a newer version of JavaScript which is not supported in IE. See [caniuse.com for arrow functions](https://caniuse.com/#feat=arrow-functions).
{{< /issue-entry >}}

{{< issue-entry user="hecter88" type="comment" date="Jul 15, 2015" >}}
Sorry I don't know what transpiling or Babel is, could you give me a pointer?
{{< /issue-entry >}}

{{< issue-entry user="zoider (maintainer)" type="comment" date="Jul 14, 2015" >}}
Sure, sorry - [here's the Babel website](https://babeljs.io/), and "transpiling" here means taking modern JavaScript and
transforming it into the older style which is compatible with IE for example.
{{< /issue-entry >}}

{{< issue-entry user="hecter88" type="comment" date="Jul 15, 2015" >}}
Ok so I am trying to figure out Babel but running into more problems. It kept talking about "NPM" which is totally alien
to me but eventually I found a regular script to download (https://github.com/babel/babel-standalone) and now my HTML
page looks like this:
```HTML
<script src="javascripts/babel.js"></script>
<script type="text/babel" src="javascripts/my_scripts.js">
```
So this seems to fix the IE problem but this is crazy it's like 2MB bigger now and makes the website really slow. Is
that normal?
{{< /issue-entry >}}

{{< issue-entry user="zoider (maintainer)" type="comment" date="Jul 15, 2015" >}}
So the usual way to do it is to use Node and npm to install Babel and then you just use Babel only on your computer to
transpile the script. Then you use the transpiled script in your website and you don't need to load that huge *babel.js* 
file into your website anymore. 

To be honest this is kinda getting out of the scope of this issue tracker, which is really just for bugs relating
to Zoid. Maybe you can try some forums or [StackOverflow](https://stackoverflow.com/)?
{{< /issue-entry >}}

{{< issue-entry user="hecter88" type="comment" date="Jul 21, 2015" >}}
Ok yeah, sorry to waste your time man, but just one more thing. Ive managed to get node and
npm installed but when I try to run "npm run build" like it says in the docs I get this error :
```Text
npm ERR! missing script: build
```
I cannot figure out what it means. My script is called "my_scripts.js", not "build"!
{{< /issue-entry >}}

{{< issue-entry user="zoider (maintainer)" type="comment" date="Jul 24, 2015" >}}
That just means you are missing the "build" script in the `package.json` file. Follow the instructions [on the Babel 
website](https://babeljs.io/docs/setup).
{{< /issue-entry >}}

{{< issue-entry user="hecter88" type="comment" date="Jul 24, 2015" >}}
Thanks. I added the "build" script to the package.json file but now I get this error:
```Text
Module parse failed: /Users/Hecter/learning_js/food_counter/my_scripts.js Unexpected token (45:57)
 You may need an appropriate loader to handle this file type.`
```
I feel like I am a bit out of my depth here with all this npn Babel stuff... Could I upload my whole code somewhere
and you take a look? Might be faster!!
{{< /issue-entry >}}

{{< issue-entry user="zoider (maintainer)" type="comment" date="Jul 25, 2015" >}}
I mean I can't guarantee that I have time to look at and fix up all your code, but sure, throw it up somewhere and I'll
at least take a quick look. 
{{< /issue-entry >}}

{{< issue-entry user="hecter88" type="comment" date="Jul 26, 2015" >}}
So I've been trying to upload my code to my account on here but I think I need to use git rather than just upload the files
like though ftp or something. 

Is that right? How do I use git to upload the files?
{{< /issue-entry >}}

{{< issue-entry user="hecter88" type="comment" date="Jul 28, 2015" >}}
Hey I know you are probably busy but can you advise on the git thing? I tried to look at the docs but it seems
pretty confusing and there is no mention anywhere of how to upload to a website.
{{< /issue-entry >}}

{{< issue-entry user="zoider (maintainer)" type="comment" date="Jul 30, 2015" >}}
Sorry, I think at this stage you are better off getting help from a friend or a forum for all these issues
you are running into. I'd love to help more but I've not really got the time. Good luck! :)
{{< /issue-entry >}}

{{< issue-entry user="hecter88" type="comment" date="Aug 1, 2015" >}}
I tried asking on stack overflow but my questions keep getting downvoted or closed??!!
{{< /issue-entry >}}

{{< issue-entry user="zoider (maintainer)" type="close" date="Nov 15, 2015" >}}
{{< /issue-entry >}}

<div style="margin-bottom: 100px;"></div>

## Issue #161 - factorial calculation not working

{{< issue-entry user="hax_munki" type="comment" date="Jan 17, 2018" >}}
Hello, this is a awesome lib but I'm stuck on something. I am trying to work out a factorial using a recursive method
but I'm getting errors saying "undefined is not a function".
{{< /issue-entry >}}

{{< issue-entry user="zoider (maintainer)" type="comment" date="Jan 23, 2018" >}}
Hi there. 

There's not enough information here to judge whether this is an issue with Zoid, or just an error in your code.

Please take a look at [the issue template](https://github.com/stevemao/github-issue-templates/blob/386b99d9125cb16f928e5bc565acbddc4d9832e9/bugs-only/ISSUE_TEMPLATE.md) and actually fill out all the parts requested rather than deleting it all. 
I'm closing the issue for now, but if you post the filled-out issue template below *including code*, I'll consider
re-opening.
{{< /issue-entry >}}

{{< issue-entry user="zoider (maintainer)" type="close" date="Jan 23, 2018" >}}
{{< /issue-entry >}}

<style>
    .issue-entry {
        background-color: #fff;
        border: 1px solid #d1d5da;
        border-radius: 3px;
        margin-left: 50px;
        margin-bottom: 15px;
    }
    .issue-header-entry {
        display: flex;
        padding: 10px 15px;
        background-color: #f6f8fa;
        border-bottom: 1px solid #d1d5da;
    }
    .issue-header-entry > *, .issue-close-entry > * {
        margin-right: 5px;
        color: #586069;
    }
    .issue-user-name {
        font-weight: bold;
    }
    @media all and (max-width: 400px) {
        .issue-type {
            display: none;
        }
    }
    .issue-body {
        padding: 15px;
    }
    .issue-body p:first-of-type {
        margin-top: 0;
    }
    .issue-close-entry {
        margin-left: 50px;
        display: flex;
        position: relative;
    }
    .issue-close-entry:before {
        display: block;
        content: '';
        width: 24px;
        height: 24px;
        margin-right: 15px;
        border-radius: 50%;
        background-color: #cb2431;
    }
    .issue-close-entry:after {
        display: block;
        content: '';
        height: 20px;
        width: 2px;
        background-color: #eee;
        position: absolute;
        left: 11px;
        top: 2px;
        transform: rotateZ(45deg);
    }
    .avatar {
        float: left;
        width: 44px;
        height: 44px;
        border-radius: 3px;
        background-color: #d4d4d4;
        opacity: 0.7;
    }
</style>

<script>
function strToColor(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
        var value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}

Array.prototype.slice.call(document.querySelectorAll('.avatar'))
    .forEach(function(avatar) {
        var userName = avatar.nextElementSibling.querySelector('.issue-user-name').textContent;
        avatar.style.backgroundColor = strToColor(userName);
    });
</script>