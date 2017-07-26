---
title: Site-Wide Split Tests With Google Analytics Content Experiments
author: michael-bromley
type: post
date: 2014-06-13T07:39:28+00:00
aliases:
  - blog/128/site-wide-split-tests-with-google-analytics-content-experiments
categories:
  - post
tags:
  - code

---
{{< figure src="/media/2014/06/ga.png" >}}

## The Problem

You use Google Analytics on your website and you want to do an A/B or multivariate test on some site-wide change, rather than just testing variations of a single page. An example - and the scenario which lead me to devise this solution - was testing how the presence or absence of the logo of a well-known security company in the footer of an e-commerce site would affect sales, the footer appearing on every page of the site.

If you use Google Analytics, then you automatically have a very good built-in way to do simple A/B or [multivariate ](http://en.wikipedia.org/wiki/Multivariate_testing)tests in the form of [Content Experiements](https://support.google.com/analytics/answer/1745147?hl=en-GB&ref_topic=1745207&rd=1) (CE). You can find this by selecting "behaviour" -> "experiments" in the left-hand navigation menu of Google Analytics. CE offers a relatively simple way to get up and running with testing variations of a single page on your site, and includes advanced statistical methods to evaluate the relative performance of each variation. However, if you wish to test a site-wide change, as in the example above, things become much less simple.

After doing quite a bit of research, for example in [this thread discussing the problem](https://productforums.google.com/forum/#!topic/analytics/_pKd9XlXD5g), and [this blog post which mentions site-wide CE](http://www.lunametrics.com/blog/2013/05/02/content-experiments-javascript-api/#sr=g&m=o&cp=or&ct=-tmc&st=(opu%20qspwjefe)&ts=1401711959), it became clear that there is no simple, built-in way to do a site-wide Content Experiment.

## A Solution

Here is a solution that I came up with which has allowed me to run a site-wide experiment, and seems to be working well. Since I found very little else of use on this topic, I thought it may help others to document how I solved the problem.

In my case, the website I was working on is built with PHP, but the principle can of course apply to any web technology. Following the original example, I want to test how the presence of the logo of the fictional security provider "McTaffy" in our site's footer will affect sales.

### Step 1: configure the variations

The key when setting up the experiment is to use the "relative" option for your variation:

{{< figure src="/media/2014/06/gce-1.gif" title="Setting up the variation" >}}

Since this experiment will be site-wide, the original page can be anything, but probably most sensible is to use the home page. The use of a relative URL via a query string for the variation will allow the experiment to fire on any page on the site in which the CE JavaScript snippet is found.

### Step 2: detect the variation

As you can see from the above configuration, the "B" in our A/B test is represented by the query string `?nologo=true`. Therefore we must tell our site how to detect and deal with this query string. Note: This example implementation is deliberately simplistic so that the core concept is more clearly illustrated (i.e. don't laugh at my bad code).

On my site I have a header function which is called on each page and generates the content of the HTML <head> element.

```PHP
function do_header() {
?>
<html>
<head>
...
<?php
    if (!isset($_SESSION["mctaffy_logo_experiment"])) {
        ?>
        <!-- Google Analytics Content Experiment code -->
        <script>function utmx_section(){}function utmx(){}(function(){var
        k='1234567-1',d=document,l=d.location,c=d.cookie;
        if(l.search.indexOf('utm_expid='+k)>0)return;
        function f(n){if(c){var i=c.indexOf(n+'=');if(i>-1){var j=c.
        indexOf(';',i);return escape(c.substring(i+n.length+1,j<0?c.
        length:j))}}}var x=f('__utmx'),xx=f('__utmxx'),h=l.hash;d.write(
        '<sc'+'ript src="'+'http'+(l.protocol=='https:'?'s://ssl':
        '://www')+'.google-analytics.com/ga_exp.js?'+'utmxkey='+k+
        '&utmx='+(x?x:'')+'&utmxx='+(xx?xx:'')+'&utmxtime='+new Date().
        valueOf()+(h?'&utmxhash='+escape(h.substr(1)):'')+
        '" type="text/javascript" charset="utf-8"></sc'+'ript>')})();
        </script><script>utmx('url','A/B');</script>
        <!-- End of Google Analytics Content Experiment code -->
        <?php
        $_SESSION["mctaffy_logo_experiment"]["set"] = true;
    }
    if ($_GET["nologo"] == true) {
        $_SESSION["mctaffy_logo_experiment"]["nologo"] = true;
    }
?>
...
</head>
<?php
}

```

(For those who are not familiar with PHP, the `$_SESSION` variable is a built-in global store of data (an array) pertaining to the current browser session. I am using it here simply as a convenient store of session-wide data - you may well wish to implement a better solution.)

The first time a user visits any page of my site, the `$_SESSION["mctaffy_logo_experiment"]` key will not be set. Therefore, the CE JavaScript snippet will be inserted into the page, triggering the A/B selection.

This will result in the user being either redirected with `?nologo=true` appended to the URL (the "Without Logo" variation), or remaining at the current URL (the "With Logo" original version).

In the former case, we record the fact that the user should now be viewing the "Without Logo" variation by setting a value in the `$_SESSION` array.

Note that, in the above set-up, we would only ever run the CE JavaScript snippet once per browser session. I found this to be an important factor, since the JavaScript causes a new page request each time it is run, effectively resulting in two complete requests per page viewed. On a site-wide experiment, this is going to cause trouble in terms of extra bandwidth usage and additional load time on every page.

### Step 3: generate the output

Now that we have decided which version the user should see, it is a simple matter to generate the variation. In this example, I also have a footer function which is likewise run on each page request to generate the footer markup:

```PHP
function do_footer() {
...
    if ($_SESSION["mctaffy_logo_experiment"]["nologo"] !== true) {
    ?>
    <img src="images/secure_logo.png" title="This site is obviously totally secure because we paid for this logo, okay?">
    <?php
    }
...
}
```

So, unless the "nologo" key is true, then we'll display the logo as usual. When the "nologo" _has_ been set, due to the CE having redirected the user to the `?nologo=true` URL, then the logo will _not_ be displayed on any page of the site, for the rest of this browser session.

### Persisting the variation

In PHP, the session data is lost when we close the browser. But we probably want to ensure that a given user gets the same variation of our site for the duration of the experiment. Do we therefore need to somehow store the "nologo" somewhere permanent, such as in a cookie or in the database?

No, thankfully we do not need to care about this. The Content Experiment itself will track, via its own cookie, which variation a particular user was first presented with, and then ensure that this user gets served this variation on each subsequent visit to the site.

## Conclusion

The pattern described above is currently working well for me. It is quite possible that there are alternative and better ways to do this; but if that is so, I was not able to easily locate such solutions. That being the case, I hope that others facing this problem - which must be fairly common - find some value in the ideas I've outlined here.
