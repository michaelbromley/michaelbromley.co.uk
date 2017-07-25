---
title: An Ordinal Date Filter for AngularJS
author: michael-bromley
type: post
date: 2014-01-19T15:29:46+00:00
url: /13/an-ordinal-date-filter-for-angularjs
categories:
  - post
tags:
  - AngularJS
  - code
  - JavaScript

---
The [AngularJS date filter](http://docs.angularjs.org/api/ng.filter:date) is used to format a time stamp into a human-readable date string. For this website, I wanted to be able to format the date so that the day of the month included the English ordinal suffix, 1st, 2nd, 3rd, 4th etc. Having worked with PHP's date() function, I expected there to be a format string for this very thing, but was surprised to see that there isn't.

After a bit of research, I found [this pull request](https://github.com/angular/angular.js/pull/4075) which explains what I had kind of suspected - an ordinal suffix option would be a nightmare for internationalization and would add unwanted overhead.

Fair enough. So I decided to write my own. It's does one thing and one thing only - it adds the English ordinal suffix to the day of the month wherever it encounters "d" in the format string.

[See the full code here in my Angular Utilities Github repo](https://github.com/michaelbromley/angularUtils/tree/master/src/filters/ordinalDate)

## How it works

The filter is just a wrapper around the built-in Angular date filter. First of all, it creates a new Date object from the time stamp provided to the filter, and from this it gets which day of the month this date is:

```JavaScript
var date = new Date(timestamp);
var dayOfMonth = date.getDate();
var suffix = getOrdinalSuffix(dayOfMonth);
```

I then had to write a routine to figure out what the ordinal suffix should be. There are plenty of examples of this out there, most of them cleverer than mine, but I think mine is quite easy to follow:

```JavaScript
var getOrdinalSuffix = function(
    var suffixes = ["'th'", "'st'", "'nd'", "'rd'"];
    var relevantDigits = (number < 30) ? number % 20 : number % 30;
    return (relevantDigits <= 3) ? suffixes[relevantDigits] : suffixes[0];
};
```

From there we need to figure out where to insert that the suffix in the format string. At first glance this appears to be trivial - just replace any instance of the string "d" with "d'<suffix>'" right?

Well, actually it's not that simple. Since "dd" is the format string for a 2-digit day of the month (01-31), we don't want to add a suffix to each day (which would give "1th5th" instead of "15th"). Likewise, we don't want to add a suffix to the letter "d" if it occurs within a string in the format. Anyway, to account for these, I wrote a routine that looks like this:

```JavaScript
var getIndecesOfDayCharacter = function(format) {
    var dayRegex = /(?:'(?:[^']|'')*')|(?:d+)/g;
    var matchingIndices = [];
    var finishedLooking = false;

    while(!finishedLooking) {
        var matches = dayRegex.exec(format);
        if (matches) {
            dayRegex.lastIndex = matches.index + matches[0].length;
            if (matches[0] === 'd') {
                matchingIndices.push(matches.index + 1);
            }
        } else {
            finishedLooking = true;
        }
    }
    return matchingIndices;
};
```

Finally we need to be able to insert the suffix at the correct place in the format string. Do achieve this I wrote the following routine:

```JavaScript
var insertAtIndex = function(inputString, index, stringToInsert) {
    var partBeforeIndex = inputString.substring(0, index);
    var partAfterIndex = inputString.substring(index, inputString.length);
    return partBeforeIndex + stringToInsert + partAfterIndex;
};
```

And finally, we pass our new format string to the Angular date filter and return the results. The final returned filter function looks like this:

```JavaScript 
return function(timestamp, format) {
    var date = new Date(timestamp);
    var dayOfMonth = date.getDate();
    var suffix = getOrdinalSuffix(dayOfMonth);

    var matchingIndices = getIndecesOfDayCharacter(format);

    // now we to insert the suffix at the index(-ces) that we found
    for (var i = matchingIndices.length; i > 0; i --) {
        format = insertAtIndex(format, matchingIndices[i-1], suffix);
    }
    return $filter('date')(new Date(timestamp), format);
};
```

So there you go. I hope you find this useful. If you have any feedback, [I'd be happy to hear from you](http://www.michaelbromley.co.uk/contact)!