---
title: Automatic @import of Less/Sass files with Gulp
author: michael-bromley
type: post
date: 2015-04-15T20:13:57+00:00
aliases:
  - blog/425/automatic-import-of-lesssass-files-with-gulp
categories:
  - post
tags:
  - code
  - css
  - gulp
  - JavaScript
  - Less

---
This post describes a way to use [Gulp](http://gulpjs.com/) to automatically `@import` [Less](http://lesscss.org/) files from anywhere in your project's folder structure. It is useful if you want to define self-contained components that put all HTML, JavaScript and LESS files together, yet you don't want to maintain a list of imports in your main LESS file.

The following method should also apply if you prefer Sass, since it uses the same kind of imports system. I've not tested this though, so if anyone runs into any problems with applying this to Sass files, do let me know.

## The Problem

I have a large client-side JavaScript app. I like to modularise my app as much as possible, breaking it down into self-contained components which usually consist of a JavaScript file, an HTML template, a Less file for any custom styling and any unit tests for the component.

Consider a hypothetical calendar widget. The folder structure might look like this:

```text
app/
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
```

In order to include the styles in `calendarWidget.less` in my `main.less`, I could of course write:

```css
// main.less
@import "../common/components/calendarWidget/calendarWidget"
```

However, when the number of components in my app grows, this method becomes a pain to maintain:

```css
// main.less
@import "../common/components/calendarWidget/calendarWidget"
@import "../common/components/navbar/navbar"
@import "../common/components/searchBox/searchBox"
@import "../projects/projectList/projectList"
@import "../admin/optionsPanel/optionsPanel"
// etc.
```

The [gulp-less](https://github.com/plus3network/gulp-less) plugin I use in my build does offer a "paths" option which allows me to specify where to look for imports, but that just shifts the housekeeping from the `main.less` into `gulpfile.js`.

I wanted some way to use my Gulp build to scan the folder tree and automatically import all Less files for me. I searched around for a solution to this and could not find anything satisfactory, so I figured out the following, and note it here so that it may be of help to others with a similar aim.

## A Solution with gulp-inject

[Gulp-inject](https://github.com/klei/gulp-inject) is a plugin commonly used to auto-inject css and JavaScript files into an HTML document. However, it can also be used to inject anything into anything else. This means we can use it to inject `@import` statements into our `main.less`:

```css
// main.less
/* inject:imports */
/* endinject */

body {
//... rest of the file
```

```JavaScript
// gulpfile.js
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
```

To explain what is happening above: We add some custom "inject" annotations to the top of our `main.less` file, which match up to the `starttag` and `endtag` definitions in the gulp task. The gulp task then pipes the `main.less` file to the gulp-inject plugin, which scans the entire `src/` folder recursively for any .less files, and injects any it finds, complete with correct path, into the `main.less` file. We then pipe the modified `main.less` to the gulp-less plugin, which is then able to pull in all the imported Less files and build our CSS file.

## Summary

This is a pretty simple technique, and I'm sure you can think of ways to extend the basic concept to fit your needs. The basic idea boils down to:

  1. Less/Sass files are located arbitrarily throughout the project's source folder tree.
  2. Gulp used as a build system
  3. Gulp-inject to automatically automatically handle the Less/Sass @imports.

There is scope to make it more sophisticated (to support, for example, the various [Less import options](http://lesscss.org/features/#import-options)) but for my current work it serves very well.

## Update: Another Solution

In doing further research I came across this Less plugin: [less-plugin-glob](https://github.com/just-boris/less-plugin-glob). This allows you to use globs in your imports like so:

```css
@import "common/**";
@import "themes/**";
```

I've not tested it out but it looks very promising and may well be a more straightforward way to handle this than the gulp-inject method.