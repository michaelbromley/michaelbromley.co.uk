---
title: Automatic @import of Less/Sass files with Gulp
author: michael-bromley
type: post
date: 2015-04-15T20:13:57+00:00
url: /425/automatic-import-of-lesssass-files-with-gulp
categories:
  - post
tags:
  - code
  - css
  - gulp
  - JavaScript
  - Less

---
This post describes a way to use <a href="http://gulpjs.com/" target="_blank">Gulp</a> to automatically `@import` <a href="http://lesscss.org/" target="_blank">Less</a> files from anywhere in your project&#8217;s folder structure. It is useful if you want to define self-contained components that put all HTML, JavaScript and LESS files together, yet you don&#8217;t want to maintain a list of imports in your main LESS file.

The following method should also apply if you prefer Sass, since it uses the same kind of imports system. I&#8217;ve not tested this though, so if anyone runs into any problems with applying this to Sass files, do let me know.

## The Problem

I have a large client-side JavaScript app. I like to modularise my app as much as possible, breaking it down into self-contained components which usually consist of a JavaScript file, an HTML template, a Less file for any custom styling and any unit tests for the component.

Consider a hypothetical calendar widget. The folder structure might look like this:

<pre>app/
 |-common/
 |    |-components/
 |          |-calendarWidget/
 |                 |-calendarWidget.js
 |                 |-calendarWidget.html
 |                 |-calendarWidget.spec.js
 |                 |-calendarWidget.less
 ...
 |-styles/
     |-main.less
</pre>

In order to include the styles in `calendarWidget.less` in my `main.less`, I could of course write:

<pre>// main.less
@import "../common/components/calendarWidget/calendarWidget"
</pre>

However, when the number of components in my app grows, this method becomes a pain to maintain:

<pre>// main.less
@import "../common/components/calendarWidget/calendarWidget"
@import "../common/components/navbar/navbar"
@import "../common/components/searchBox/searchBox"
@import "../projects/projectList/projectList"
@import "../admin/optionsPanel/optionsPanel"
// etc.
</pre>

The <a href="https://github.com/plus3network/gulp-less" target="_blank">gulp-less</a> plugin I use in my build does offer a &#8220;paths&#8221; option which allows me to specify where to look for imports, but that just shifts the housekeeping from the `main.less` into `gulpfile.js`.

I wanted some way to use my Gulp build to scan the folder tree and automatically import all Less files for me. I searched around for a solution to this and could not find anything satisfactory, so I figured out the following, and note it here so that it may be of help to others with a similar aim.

## A Solution with gulp-inject

<a href="https://github.com/klei/gulp-inject" target="_blank">Gulp-inject</a> is a plugin commonly used to auto-inject css and JavaScript files into an HTML document. However, it can also be used to inject anything into anything else. This means we can use it to inject `@import` statements into our `main.less`:

<pre>// main.less
/* inject:imports */
/* endinject */

body {
//... rest of the file
</pre>

<pre>// gulpfile.js
var gulp = require('gulp'),
    less = require('gulp-less'),
    inject = require('gulp-inject');

gulp.task('less', function() {
    return gulp.src('src/styles/main.less')
    /**
     * Dynamically injects @import statements into the main app.less file, allowing
     * .less files to be placed around the app structure with the component
     * or page they apply to.
     */
        .pipe(inject(gulp.src(['../**/*.less'], {read: false, cwd: 'src/styles/'}), {
            starttag: '/* inject:imports */',
            endtag: '/* endinject */',
            transform: function (filepath) {
                return '@import ".' + filepath + '";';
            }
        }))
        .pipe(less())
        .pipe(gulp.dest('build/styles'));
});
</pre>

To explain what is happening above: We add some custom &#8220;inject&#8221; annotations to the top of our `main.less` file, which match up to the `starttag` and `endtag` definitions in the gulp task. The gulp task then pipes the `main.less` file to the gulp-inject plugin, which scans the entire `src/` folder recursively for any .less files, and injects any it finds, complete with correct path, into the `main.less` file. We then pipe the modified `main.less` to the gulp-less plugin, which is then able to pull in all the imported Less files and build our CSS file.

## Summary

This is a pretty simple technique, and I&#8217;m sure you can think of ways to extend the basic concept to fit your needs. The basic idea boils down to:

  1. Less/Sass files are located arbitrarily throughout the project&#8217;s source folder tree.
  2. Gulp used as a build system
  3. Gulp-inject to automatically automatically handle the Less/Sass @imports.

There is scope to make it more sophisticated (to support, for example, the various <a href="http://lesscss.org/features/#import-options" target="_blank">Less import options</a>) but for my current work it serves very well.

## Update: Another Solution

In doing further research I came across this Less plugin: <a href="https://github.com/just-boris/less-plugin-glob" target="_blank">less-plugin-glob</a>. This allows you to use globs in your imports like so:

<pre>@import "common/**";
@import "themes/**";
</pre>

I&#8217;ve not tested it out but it looks very promising and may well be a more straightforward way to handle this than the gulp-inject method.