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
If you are building a public-facing app in AngularJS, you&#8217;ll want your users to be able to share it via social media. Indeed, for certain apps, this may be the most important channel of promotion. By &#8220;rich social sharing&#8221;, I mean something like this:

<div id="attachment_172" style="width: 300px" class="wp-caption aligncenter">
  <img class="wp-image-172 size-medium" src="/media/2014/07/facebook_rich_share_1-290x300.jpg" alt="Rich sharing on Facebook" width="290" height="300" srcset="/media/2014/07/facebook_rich_share_1-290x300.jpg 290w, /media/2014/07/facebook_rich_share_1.jpg 514w" sizes="(max-width: 290px) 100vw, 290px" />
  
  <p class="wp-caption-text">
    Rich sharing on Facebook
  </p>
</div>

<div id="attachment_173" style="width: 310px" class="wp-caption aligncenter">
  <img class="wp-image-173 size-medium" src="/media/2014/07/twitter_rich_share_1-300x214.jpg" alt="twitter_rich_share_1" width="300" height="214" srcset="/media/2014/07/twitter_rich_share_1-300x214.jpg 300w, /media/2014/07/twitter_rich_share_1.jpg 524w" sizes="(max-width: 300px) 100vw, 300px" />
  
  <p class="wp-caption-text">
    Rich sharing on Twitter
  </p>
</div>

As you can see, certain sites allow Facebook, Twitter et al. to fetch more than just the standard page title and image. This is achieved by using special meta tags in the HTML head. For example, Facebook and a bunch of other sites like Pinterest and Google Plus can read the <a href="http://ogp.me/" target="_blank">Open Graph protocol</a>, which looks something like this:

<pre>&lt;head&gt;
    &lt;meta property="og:title" content="My Page" /&gt;
    &lt;meta property="og:description" content="A description of my page." /&gt;
    &lt;meta property="og:image" content="http://www.mysite.com/images/my_lovely_face.jpg" /&gt;
    &lt;!-- etc. --&gt;
&lt;/head&gt;
</pre>

Twitter uses a very similar system, but with a prefix of &#8220;twitter:&#8221; rather than &#8220;og:&#8221;.

When you share a URL on one of these sites, a crawler is dispatched to that URL and will scrape the page&#8217;s HTML, firstly looking for any of these special meta tags that it can understand and use, and secondly looking at the regular HTML elements such as the <head> tag and the any images that it might be able to use.

## The Problem With AngularJS

I have built <a href="http://www.michaelbromley.co.uk/experiments/angular-social-demo/home" target="_blank">a simple AngularJS app to show off my favourite albums</a>, and I&#8217;ll use it as the example for this article. If I wanted to share one of my favourite albums with my Facebook friends, I&#8217;d paste the link into the status update box and hope to see something like this:

<div id="attachment_175" style="width: 519px" class="wp-caption aligncenter">
  <img class="size-full wp-image-175" src="/media/2014/07/angular_share_good.jpg" alt="The desired sharing experience" width="509" height="328" srcset="/media/2014/07/angular_share_good.jpg 509w, /media/2014/07/angular_share_good-300x193.jpg 300w" sizes="(max-width: 509px) 100vw, 509px" />
  
  <p class="wp-caption-text">
    The desired sharing experience
  </p>
</div>

However, even though I have included all the necessary Open Graph meta tags, when I paste my link, I will be disappointed to see something more like this:

<div id="attachment_174" style="width: 513px" class="wp-caption aligncenter">
  <img class="wp-image-174 size-full" src="/media/2014/07/angular_share_bad.jpg" alt="The ugly reality" width="503" height="269" srcset="/media/2014/07/angular_share_bad.jpg 503w, /media/2014/07/angular_share_bad-300x160.jpg 300w" sizes="(max-width: 503px) 100vw, 503px" />
  
  <p class="wp-caption-text">
    The ugly reality
  </p>
</div>

The reason it looks so bad is simple: the crawlers that scrape the HTML **do not evaluate JavaScript**. Therefore, when they crawl my app, this is what they will see:

<pre>&lt;head&gt;
    &lt;meta property="og:title" content="{{ page.title }}" /&gt;
    &lt;meta property="og:description" content="{{ page.description }}" /&gt;
    &lt;meta property="og:image" content="{{ page.image }}" /&gt;
    &lt;!-- etc. --&gt;
&lt;/head&gt;
</pre>

This problem would apply to _any_ client-side JavaScript framework. I&#8217;m just concentrating on Angular since that is what I know, and I have implemented the following solution to good effect in a production AngularJS app.

## The Solution

The solution is basically to use some kind of server-side user-agent detection to pick up whenever a social media crawler arrives, and then instead of showing it the plain AngularJS template file, redirect it to a server-generated page that will contain the desired meta tags, all filled with the correct information. This is the basic idea in visual form:

<div id="attachment_176" style="width: 457px" class="wp-caption aligncenter">
  <img class="wp-image-176 size-full" src="/media/2014/07/workflow.png" alt="Workflow of server-side rendering" width="447" height="429" srcset="/media/2014/07/workflow.png 447w, /media/2014/07/workflow-300x287.png 300w" sizes="(max-width: 447px) 100vw, 447px" />
  
  <p class="wp-caption-text">
    Workflow of server-side rendering
  </p>
</div>

### What we will need:

  1. A web server capable of URL rewriting (or, more accurately, _remapping_). In this case, we are using Apache and the mod_rewrite module.
  2. A server-side language to generate our crawler-friendly pages. In this case I will use PHP.
  3. The Angular app must be using &#8220;html5mode&#8221; its URLs. This is because the # portion of a URL does not get sent to the server, so makes server-side redirection based on the Angular page impossible. For more information, see <a href="http://stackoverflow.com/a/16678065/772859" target="_blank">this StackOverflow answe</a><span style="text-decoration: underline;">r</span>.

Following is a write-up of how to set things up assuming the above technologies are being used.

### Configure Apache

We will need three specific Apache modules enabled: mod\_rewrite, mod\_proxy and mod\_proxy\_http (installation of these modules will vary depending on your OS/Apache version, but is beyond the scope of this article). We will come back to the use of these modules shortly.

### Set up the server-side script

Next we need to make the script that will handle the requests from the social media crawlers. Let&#8217;s assume that our AngularJS app gets its data from an API. In this example, we are getting album information from the endpoint `api/{id}`. We can re-use this same API in our server-side script and use the data to build, on the server, our HTML page including all the social media meta tags, and output this HTML to the crawler.

An simplified PHP implementation follows:

<pre>&lt;?php
$SITE_ROOT = "http://www.mysite.com/";

$jsonData = getData($SITE_ROOT);
makePage($jsonData, $SITE_ROOT);
function getData($siteRoot) {
    $id = ctype_digit($_GET['id']) ? $_GET['id'] : 1;
    $rawData = file_get_contents($siteRoot.'api/'.$id);
    return json_decode($rawData);
}

function makePage($data, $siteRoot) {
    ?&gt;
    &lt;!DOCTYPE html&gt;
    &lt;html&gt;
        &lt;head&gt;
            &lt;meta property="og:title" content="&lt;?php echo $data-&gt;title; ?&gt;" /&gt;
            &lt;meta property="og:description" content="&lt;?php echo $data-&gt;description; ?&gt;" /&gt;
            &lt;meta property="og:image" content="&lt;?php echo $data-&gt;image; ?&gt;" /&gt;
            &lt;!-- etc. --&gt;
        &lt;/head&gt;
        &lt;body&gt;
            &lt;p&gt;&lt;?php echo $data-&gt;description; ?&gt;&lt;/p&gt;
            &lt;img src="&lt;?php echo $imageUrl; ?&gt;"&gt;
        &lt;/body&gt;
    &lt;/html&gt;
    &lt;?php
}
?&gt;</pre>

The output of this script can be tested by visiting it directly in the browser. In the example, that would be <a href="http://www.michaelbromley.co.uk/experiments/angular-social-demo/server/static-page.php?id=1" target="_blank">http://www.michaelbromley.co.uk/experiments/angular-social-demo/server/static-page.php?id=1</a>

### Redirect crawlers to the server-side script

Now that we have our server-side script up an running, we just need to set up the redirection. This technique requires the use of the three Apache modules mentioned earlier, and is done with an `.htaccess` file containing the following rule:

<pre>&lt;ifModule mod_rewrite.c&gt;
RewriteEngine On

# allow social media crawlers to work by redirecting them to a server-rendered static version on the page
RewriteCond %{HTTP_USER_AGENT} (facebookexternalhit/[0-9]|Twitterbot|Pinterest|Google.*snippet)
RewriteRule album/(\d*)$ http://www.michaelbromley.co.uk/experiments/angular-social-demo/server/static-page.php?id=$1 [P]

&lt;/ifModule&gt;
</pre>

The `RewriteCond` link looks at the <a style="color: #4183c4;" href="http://en.wikipedia.org/wiki/User_agent">user agent</a> string to see if it matches the following expression. The specific strings used in this expression are based on the known user agents of the various social media crawlers (at the time of this writing):

<ul class="task-list">
  <li>
    Facebook: <code>facebookexternalhit/1.1 (+http(s)://www.facebook.com/externalhit_uatext.php)</code>
  </li>
  <li>
    Twitter: <code>Twitterbot/{version}</code>
  </li>
  <li>
    Pinterest: <code>Pinterest/0.1 +http://pinterest.com/</code>
  </li>
  <li>
    Google Plus: <code>Google (+https://developers.google.com/+/web/snippet/)</code>
  </li>
  <li>
    Google Structured Data Testing tool: <code>Google-StructuredDataTestingTool; +http://www.google.com/webmasters/tools/richsnippets</code>
  </li>
</ul>

The `[P]` flag causes Apache to perform a remap using mod\_proxy and mod\_proxy_http, rather than a regular redirect. If a 301 redirect is used, Facebook for example will link to the &#8220;static-page.php&#8221; URL rather than the original URL. Disclaimer: I am no Apache expert &#8211; in fact I find .htaccess and URL rewriting to be one of the toughest things to get right &#8211; so there may be other, better ways to do this. However, after much trial on my part, this is the configuration that I found to work.

### Test it out

Now that everything is set up, it&#8217;s time to test out whether it actually works as expected. All the social media sites we have mentioned so far offer some kind of validation tool that will give you an idea of what your URL will look like when shared:

<ul class="task-list">
  <li>
    <a style="color: #4183c4;" href="https://developers.facebook.com/tools/debug/">Facebook Open Graph Object Debugger</a> &#8211; also useful for any other open-graph based site.
  </li>
  <li>
    <a style="color: #4183c4;" href="https://dev.twitter.com/docs/cards/validation/validator">Twitter Card Validator</a> &#8211; you need a twitter account to use it.
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

The solution I described here is perhaps the most basic approach to solving this issue. The problem with crawlers and JavaScript apps is much bigger than this, and another approach would be to use a more complete solution such as <a href="https://prerender.io/" target="_blank">Prerender.io</a> to apply this same principle (in a more sophisticated form) to your entire app. The advantage with this would be that you will also cover search engine crawlers (although recently <a href="http://googlewebmastercentral.blogspot.co.at/2014/05/understanding-web-pages-better.html" target="_blank">Google announced that it would start to evaluate JavaScript</a>, largely mitigating the issue for that particular search engine), and you needn&#8217;t manually build the server-side pages. The drawback is just a bit more overhead to set up and maybe a more complex a workflow to build your app.

As with Google, it is conceivable that the various social media sites may modify their crawlers to evaluate JavaScript too, in which case the method I outline here can be consigned to history as just another hack to patch up the developing Internet.

Until that time, if you want your AngularJS app (or any client-side JavaScript app) to work at all with Facebook, Twitter, Pinterest et al., I hope you can use some of the ideas I have presented here.

## Resources

<a href="http://www.michaelbromley.co.uk/experiments/angular-social-demo/home" target="_blank">Demo App</a> &#8211; Try sharing it. It should work!

<a href="https://github.com/michaelbromley/angular-social-demo" target="_blank">GitHub Repo</a> &#8211; Contains full code for the app so you can see in more detail how this solution works.