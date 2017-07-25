---
title: Enable Rich Social Sharing in Your AngularJS App
author: michael-bromley
type: post
date: 2014-07-02T06:08:36+00:00
url: /171/enable-rich-social-sharing-in-your-angularjs-app
categories:
  - post
tags:
  - AngularJS
  - code
  - demo
  - JavaScript
  - social media
 
---
If you are building a public-facing app in AngularJS, you'll want your users to be able to share it via social media. Indeed, for certain apps, this may be the most important channel of promotion. By "rich social sharing", I mean something like this:

{{< figure src="/media/2014/07/facebook_rich_share_1-290x300.jpg" title="Rich sharing on Facebook" >}}

{{< figure src="/media/2014/07/twitter_rich_share_1-300x214.jpg" title="Rich sharing on Twitter" >}}

As you can see, certain sites allow Facebook, Twitter et al. to fetch more than just the standard page title and image. This is achieved by using special meta tags in the HTML head. For example, Facebook and a bunch of other sites like Pinterest and Google Plus can read the [Open Graph protocol](http://ogp.me/), which looks something like this:

```HTML
<head>
    <meta property="og:title" content="My Page" />
    <meta property="og:description" content="A description of my page." />
    <meta property="og:image" content="http://www.mysite.com/images/my_lovely_face.jpg" />
    <!-- etc. -->
</head>

```

Twitter uses a very similar system, but with a prefix of "twitter:" rather than "og:".

When you share a URL on one of these sites, a crawler is dispatched to that URL and will scrape the page's HTML, firstly looking for any of these special meta tags that it can understand and use, and secondly looking at the regular HTML elements such as the <head> tag and the any images that it might be able to use.

## The Problem With AngularJS

I have built [a simple AngularJS app to show off my favourite albums](http://www.michaelbromley.co.uk/experiments/angular-social-demo/home), and I'll use it as the example for this article. If I wanted to share one of my favourite albums with my Facebook friends, I'd paste the link into the status update box and hope to see something like this:

{{< figure src="/media/2014/07/angular_share_good.jpg" title="The desired sharing experience" >}}

However, even though I have included all the necessary Open Graph meta tags, when I paste my link, I will be disappointed to see something more like this:

{{< figure src="/media/2014/07/angular_share_bad.jpg" title="The ugly reality" >}}

The reason it looks so bad is simple: the crawlers that scrape the HTML **do not evaluate JavaScript**. Therefore, when they crawl my app, this is what they will see:

```HTML
<head>
    <meta property="og:title" content="{{ page.title }}" />
    <meta property="og:description" content="{{ page.description }}" />
    <meta property="og:image" content="{{ page.image }}" />
    <!-- etc. -->
</head>

```

This problem would apply to _any_ client-side JavaScript framework. I'm just concentrating on Angular since that is what I know, and I have implemented the following solution to good effect in a production AngularJS app.

## The Solution

The solution is basically to use some kind of server-side user-agent detection to pick up whenever a social media crawler arrives, and then instead of showing it the plain AngularJS template file, redirect it to a server-generated page that will contain the desired meta tags, all filled with the correct information. This is the basic idea in visual form:

{{< figure src="/media/2014/07/workflow.png" title="Workflow of server-side rendering" >}}

### What we will need:

  1. A web server capable of URL rewriting (or, more accurately, _remapping_). In this case, we are using Apache and the mod_rewrite module.
  2. A server-side language to generate our crawler-friendly pages. In this case I will use PHP.
  3. The Angular app must be using "html5mode" its URLs. This is because the # portion of a URL does not get sent to the server, so makes server-side redirection based on the Angular page impossible. For more information, see [this StackOverflow answe](http://stackoverflow.com/a/16678065/772859)<span style="text-decoration: underline;">r</span>.

Following is a write-up of how to set things up assuming the above technologies are being used.

### Configure Apache

We will need three specific Apache modules enabled: mod\_rewrite, mod\_proxy and mod\_proxy\_http (installation of these modules will vary depending on your OS/Apache version, but is beyond the scope of this article). We will come back to the use of these modules shortly.

### Set up the server-side script

Next we need to make the script that will handle the requests from the social media crawlers. Let's assume that our AngularJS app gets its data from an API. In this example, we are getting album information from the endpoint `api/{id}`. We can re-use this same API in our server-side script and use the data to build, on the server, our HTML page including all the social media meta tags, and output this HTML to the crawler.

An simplified PHP implementation follows:

```PHP
<?php
$SITE_ROOT = "http://www.mysite.com/";

$jsonData = getData($SITE_ROOT);
makePage($jsonData, $SITE_ROOT);
function getData($siteRoot) {
    $id = ctype_digit($_GET['id']) ? $_GET['id'] : 1;
    $rawData = file_get_contents($siteRoot.'api/'.$id);
    return json_decode($rawData);
}

function makePage($data, $siteRoot) {
    ?>
    <!DOCTYPE html>
    <html>
        <head>
            <meta property="og:title" content="<?php echo $data->title; ?>" />
            <meta property="og:description" content="<?php echo $data->description; ?>" />
            <meta property="og:image" content="<?php echo $data->image; ?>" />
            <!-- etc. -->
        </head>
        <body>
            <p><?php echo $data->description; ?></p>
            <img src="<?php echo $imageUrl; ?>">
        </body>
    </html>
    <?php
}
?>
```

The output of this script can be tested by visiting it directly in the browser. In the example, that would be [http://www.michaelbromley.co.uk/experiments/angular-social-demo/server/static-page.php?id=1](http://www.michaelbromley.co.uk/experiments/angular-social-demo/server/static-page.php?id=1)

### Redirect crawlers to the server-side script

Now that we have our server-side script up an running, we just need to set up the redirection. This technique requires the use of the three Apache modules mentioned earlier, and is done with an `.htaccess` file containing the following rule:

```TEXT
<ifModule mod_rewrite.c>
RewriteEngine On

# allow social media crawlers to work by redirecting them to a server-rendered static version on the page
RewriteCond %{HTTP_USER_AGENT} (facebookexternalhit/[0-9]|Twitterbot|Pinterest|Google.*snippet)
RewriteRule album/(\d*)$ http://www.michaelbromley.co.uk/experiments/angular-social-demo/server/static-page.php?id=$1 [P]

</ifModule>

```

The `RewriteCond` link looks at the [user agent](http://en.wikipedia.org/wiki/User_agent) string to see if it matches the following expression. The specific strings used in this expression are based on the known user agents of the various social media crawlers (at the time of this writing):

* Facebook: <code>facebookexternalhit/1.1 (+http(s)://www.facebook.com/externalhit_uatext.php)</code>
* Twitter: <code>Twitterbot/{version}</code>
* Pinterest: <code>Pinterest/0.1 +http://pinterest.com/</code>
* Google Plus: <code>Google (+https://developers.google.com/+/web/snippet/)</code>
* Google Structured Data Testing tool: <code>Google-StructuredDataTestingTool; +http://www.google.com/webmasters/tools/richsnippets</code>

The `[P]` flag causes Apache to perform a remap using mod\_proxy and mod\_proxy_http, rather than a regular redirect. If a 301 redirect is used, Facebook for example will link to the "static-page.php" URL rather than the original URL. Disclaimer: I am no Apache expert - in fact I find .htaccess and URL rewriting to be one of the toughest things to get right - so there may be other, better ways to do this. However, after much trial on my part, this is the configuration that I found to work.

### Test it out

Now that everything is set up, it's time to test out whether it actually works as expected. All the social media sites we have mentioned so far offer some kind of validation tool that will give you an idea of what your URL will look like when shared:

<ul class="task-list">
  <li>
    <a style="color: #4183c4;" href="https://developers.facebook.com/tools/debug/">Facebook Open Graph Object Debugger</a> - also useful for any other open-graph based site.
  </li>
  <li>
    <a style="color: #4183c4;" href="https://dev.twitter.com/docs/cards/validation/validator">Twitter Card Validator</a> - you need a twitter account to use it.
  </li>
  <li>
    <a style="color: #4183c4;" href="https://developers.pinterest.com/rich_pins/validator/">Pinterest Rich Pin Validator</a>
  </li>
  <li>
    <a style="color: #4183c4;" href="http://www.google.com/webmasters/tools/richsnippets">Google Structured Data Testing tool</a>
  </li>
</ul>

Also, <a style="color: #4183c4;" href="http://www.telerik.com/fiddler">Fiddler</a> is a great tool for testing out this kind of thing, since you can manually set the user agent and then inspect the response from the server.

## Other Approaches

The solution I described here is perhaps the most basic approach to solving this issue. The problem with crawlers and JavaScript apps is much bigger than this, and another approach would be to use a more complete solution such as [Prerender.io](https://prerender.io/) to apply this same principle (in a more sophisticated form) to your entire app. The advantage with this would be that you will also cover search engine crawlers (although recently [Google announced that it would start to evaluate JavaScript](http://googlewebmastercentral.blogspot.co.at/2014/05/understanding-web-pages-better.html), largely mitigating the issue for that particular search engine), and you needn't manually build the server-side pages. The drawback is just a bit more overhead to set up and maybe a more complex a workflow to build your app.

As with Google, it is conceivable that the various social media sites may modify their crawlers to evaluate JavaScript too, in which case the method I outline here can be consigned to history as just another hack to patch up the developing Internet.

Until that time, if you want your AngularJS app (or any client-side JavaScript app) to work at all with Facebook, Twitter, Pinterest et al., I hope you can use some of the ideas I have presented here.

## Resources

[Demo App](http://www.michaelbromley.co.uk/experiments/angular-social-demo/home) - Try sharing it. It should work!

[GitHub Repo](https://github.com/michaelbromley/angular-social-demo) - Contains full code for the app so you can see in more detail how this solution works.