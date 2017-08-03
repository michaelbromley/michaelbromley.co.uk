---
date: 2017-07-30T20:52:59+02:00
title: Going Static with Hugo
type: post
categories:
  - post
tags:
  - code
  - hugo
---

I have just converted this website from an AngularJS app backed by the Wordpress REST API to a
static HTML site powered by [Hugo](https://gohugo.io/), a static site generator written in Go. This post explains my reasoning,
experiences and thoughts about the results.

{{< figure src="/media/2017/07/hugo-logo.png" >}}

Back in 2014 I was learning AngularJS, and I decided to build my website with it as a learning exercise. I wrote 
about it [here]({{< relref "2014-09-19-experiences-building-a-website-with-angularjs-wp-api-wordpress-api.md" >}}).
I was happy with the design, but there were a number of issues with which I gradually grew dissatisfied. 

Broadly, I wanted to address the areas of **accessibility**, **performance** and **maintainability**.

## Why Drop Wordpress & AngularJS?

I'm a big fan of Angular. AngularJS kickstarted my front-end JavaScript journey. However, using AngularJS 
(or any JavaScript framework) for the front-end of a blog introduces a number of problems for little gain:

* I had to [invent novel solutions]({{< relref "2014-07-02-enable-rich-social-sharing-in-your-angularjs-app.md" >}}) to 
accomodate web crawlers from the likes of Facebook and Twitter.
* The JS bundle was ~88k minified & gzipped. Too big for a blog site.
* The site is completely broken for those users with JavaScript disabled.

Likewise, Wordpress is a solid blogging platform, but:

* The overhead cost of running PHP & MySQL would occasionally cause issues. In the past couple of years I've had a couple
of blog posts get some attention from sites like Reddit and Hacker News, and my basic Digital Ocean box died 
under the pressure (see image below).
* Relative to serving static HTML, the making a request to the Wordpress API and then rendering with JavaScript is on the slow side.
* It was complex to manage the source of the site, since it was spread between a) the AngularJS client app, b) the Wordpress configuration and c) the content in the MySQL database.

{{< figure src="/media/2017/07/reddit-hug.png" title="A Reddit hug crushes and then kills PHP and/or MySQl, Dec 2015" >}}

## Why Hugo?

I have relatively little experience with static site generators, but after a few years using git and GitHub, the idea of writing all by posts in
markdown and keeping it all in git *really* appealed to me. I'd used [Hexo](https://hexo.io/) for a small project and 
found it a generally positive experience, so I started to look into what else was out there.

I settled on Hugo after reading [this article by Sara Soueidan](http://www.sarasoueidan.com/blog/jekyll-ghpages-to-hugo-netlify/).
If you want to know about the nuts & bolts of getting going with Hugo, read that article, it's excellent.

Some other things that appealed in particular about Hugo:

* It's a standalone executable. No requirement for a Ruby or Node environment. It's refreshing to get out of npm-land for a while; to just run a
program and know that it will simply work.
* It's really, *really* fast. I currently build about 45 pages, and Hugo averages about **40ms** to build and live-reload.
* I was able to bulk-convert the entire contents of my Wordpress install by using the [wordpress-to-hugo-exporter](https://github.com/SchumacherFM/wordpress-to-hugo-exporter).

## My Experience with Hugo

Generally I've found Hugo to be very pleasant to work with. It keeps out of the way and for the most part, the experience
is akin to the (mythical?) "good old days" of writing websites with simple HTML, CSS and a little JavaScript. The near-instant
change-reload cycle adds to the effect. Just run `hugo server` and away you go!

The main pain point for me was getting to grips with the [templating syntax](https://gohugo.io/templates/introduction/). 
At first glance, it looks very much like the libraries I've worked with before in JavaScript - Handlebars or Angular for 
example. The difference really comes from the underlying Go libraries powering the templates. I've never used Go
before, so the prefix (rather than infix) boolean operators took a bit of getting used to:

```HTML
{{ if and (or (isset .Params "title") (isset .Params "caption")) (isset .Params "attr") }}
  <div>Conditional content...</div>
{{ end }}
```

Part of the complexity comes from the fact that Go templates are significantly more powerful than Handlebars. I'm *sort of*
getting the hang of things now, but anything beyond the most simple task inevitably leads me to the 
[Hugo support forum](https://discourse.gohugo.io/search?q=template%20category%3A34) - where new Hugo users go to 
share in their mutual bewildered confusion.

Here's an example of something that seemed like it should be simple: displaying a list of "featured" posts on the
home page. After an inordinately long time spent trying to figure this out, here is what I arrived at. I am almost
certain that there is a better way to do it, but I can't for the life of me figure it out:

```HTML
{{ range $taxonomyname, $taxonomy := .Site.Taxonomies }}
    {{ if eq "categories" $taxonomyname }}
        {{ range $key, $value := $taxonomy }}
            {{ if eq $key "featured" }}
                <ul>
                {{ range $value.Pages }}
                    <li><a href="{{ .RelPermalink }}">{{ .Title }}</a></li>
                {{ end }}
                </ul>
            {{ end }}
        {{ end }}
    {{ end }}
{{ end }}
```

Despite my templating woes, there are plenty of really nice features which tip the developer experience further towards
pleasure and away from pain. [Shortcodes](https://gohugo.io/content-management/shortcodes/#readout), built in and simple 
[pagination](https://gohugo.io/templates/pagination/#readout), flexible [taxonomies](https://gohugo.io/content-management/taxonomies/#readout) 
and a [simple content model](https://gohugo.io/content-management/organization/) all add up to a productive and enjoyable way to build a website.

My complete lack of Go knowledge didn't seem to matter much, with one exception. I spent a good half hour trying to figure
out why my dates weren't formatting correctly, before I really *properly* read the [Go Format docs](https://golang.org/pkg/time/#Time.Format),
at which point I came to appreciate how the idiosyncratic way Go solves this problem actually results in a surprisingly good developer
experience. This definitely piqued my interest in Go in general. For those who disagree, there's always
the [Fucking Go Date Format](http://fuckinggodateformat.com/) website.

## Dropping Disqus

Prior to this update, I used Disqus for comments. I was generally happy with Disqus and I think it's a good solution
to the difficult problem of handling comments, but I decided to drop Disqus *and comments altogether* for the following reasons:

* In general, I didn't get a great deal of value from comments. There were a couple of technical posts where readers did
provide useful feedback, but in general the comments fell into one of two categories:
  * Compliments on the article. This is nice and can be motivating; on the other hand it's just another 
  attention-sucking-internet-status avenue for distraction.
  * Tech support requests. I already have GitHub issues and email. I don't need another channel for this kind of thing to enter my life!
* Upon page load, Disqus loads an additional ~250k of cruft. Scrolling down to the comments brings to total to over **730k**.
* Concerns about the number of third-party scripts pulled in by Disqus. A cursory scan of the network tab reveals at least
20 or so domains **in addition to** disqus.com. For a good breakdown of this problem see the article 
[Replacing Disqus with Github Comments](http://donw.io/post/github-comments/).
* A somewhat abstract aversion to relying on a service which I don't control.

## Conclusion

I must be improving as a programmer, because I'm developing a spider-sense for over-engineered solutions
to problems. A client-side JavaScript app backed by a REST API for a blog like mine is *too much*.

I now deliver **18kb** of JavaScript per page (6kb + 12kb for analytics) as opposed to between **100 - 800kb**, with *improved* accessibility and
usability.

Search engines and crawlers can read my articles. So can people who browse with JavaScript disabled.

I'll be able to move my Digital Ocean box back down to the cheapest option. I hastily upgraded one day in a moment of panic when
a blog post was at the top of Hacker News and my server died. I probably won't need the extra RAM anymore.

Hugo feels much better. I'm looking forward to writing more articles using markdown in my text editor and then committing
to git. You can see the [source for this website on GitHub](https://github.com/michaelbromley/michaelbromley.co.uk).
