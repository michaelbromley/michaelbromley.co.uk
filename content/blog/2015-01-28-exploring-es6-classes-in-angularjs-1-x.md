---
title: Exploring ES6 Classes In AngularJS 1.x
author: michael-bromley
type: post
date: 2015-01-28T17:10:14+00:00
url: /350/exploring-es6-classes-in-angularjs-1-x
categories:
  - post
tags:
  - AngularJS
  - code
  - demo
  - ES6
  - JavaScript
  - TypeScript

---
In this post I will describe a way of using ES6 classes today in your AngularJS 1.x applications. This is intended more as an exploration than a recommendation of best practice. I&#8217;ll go into quite some detail about the reasoning and process behind my solution, but if you&#8217;d prefer to fast forward to the finale rather than enjoy the adventure, see the last section where I [bring it all together][1], or go directly to the <a href="https://github.com/michaelbromley/angular-es6" target="_blank">demo app repo</a>.

<div id="attachment_377" style="width: 650px" class="wp-caption aligncenter">
  <a href="/media/2015/01/ng-es6.png"><img class="wp-image-377 size-large" src="/media/2015/01/ng-es6-1024x497.png" alt="AngularJS & ES6 logos" width="640" height="311" srcset="/media/2015/01/ng-es6-1024x497.png 1024w, /media/2015/01/ng-es6-300x146.png 300w, /media/2015/01/ng-es6.png 1200w" sizes="(max-width: 640px) 100vw, 640px" /></a>
  
  <p class="wp-caption-text">
    AngularJS & ES6
  </p>
</div>

If you are not familiar with ES6 &#8211; the latest version of JavaScript &#8211; here is an <a href="https://github.com/lukehoban/es6features" target="_blank">overview of the new features</a>, and here is an article specifically about the <a href="http://javascriptplayground.com/blog/2014/07/introduction-to-es6-classes-tutorial/" target="_blank">ES6 class syntax</a>.

## Why ES6 Classes?

A best practice for defining Angular components has emerged whereby named functions are favoured over the anonymous callbacks which are often seen in tutorials and documentation. For example:

<pre>// avoid
angular.module('app')
    .controller('MyController', function($scope, ...) {
        // controller definition
    });

// better
angular.module('app')
    .controller('MyController', MyController);

function MyController($scope, ...) {
    // controller definition
}</pre>

Further explanation and examples can be found in the popular <a href="https://github.com/johnpapa/angularjs-styleguide#named-vs-anonymous-functions" target="_blank">Angular style guides by John Papa</a> and <a href="https://github.com/toddmotto/angularjs-styleguide#modules" target="_blank">Todd Motto</a>. The use of ES6 classes aligns with this trend and can enable cleaner and more readable code.

Another motivating factor is that, as I <a title="My Thoughts on ngEurope 2014 and AngularJS 2.0" href="http://www.michaelbromley.co.uk/blog/267/my-thoughts-on-ngeurope-2014-and-angularjs-2-0#_section-atscript-not-a-new-language" target="_blank">reported </a>from last October&#8217;s ngEurope conference, the upcoming version 2 of Angular is being written in a superset of ES6, AtScript, and the <a href="https://docs.google.com/presentation/d/1XQP0_NTzCUcFweauLlkZpbbhNVYbYy156oD--KLmXsk/edit#slide=id.g49458163d_026" target="_blank">examples given</a> of Angular 2 components can be fairly closely approximated today in Angular 1.x by using ES6. Whether or not this is a worthwhile future-proofing strategy is debatable, but in any case I think it may provide benefits in and of itself.

Further, those who write Angular apps with TypeScript (which is <a href="http://blogs.msdn.com/b/typescript/archive/2014/10/22/typescript-and-the-road-to-2-0.aspx" target="_blank">on track</a> to be a superset of ES6) can also use approach that I will lay out here &#8211; the demo app includes a <a href="https://github.com/michaelbromley/angular-es6/blob/master/src/app/directives/stateDisplay.ts" target="_blank">working TypeScript component</a>.

## The Goal

In this experiment, I am using the examples of Angular 2 services and directives as a model to work against. The goal is to see if we can achieve similar levels of consistency and simplicity within the confines of the rather complex 1.x API.

**Note**: I am _not_ attempting here to back-port the exact Angular 2 AtScript syntax to 1.x. There are a number of interesting efforts in this direction, however, some of which I list at the end of the article under &#8220;further study&#8221;.

Here are a couple of examples from <a href="https://docs.google.com/presentation/d/1XQP0_NTzCUcFweauLlkZpbbhNVYbYy156oD--KLmXsk/edit#slide=id.p" target="_blank">Igor Minar & Tobias Bosch&#8217;s ngEurope talk</a>:

<pre>// An example Angular 2 directive
@ComponentDirective
class SantaTodoApp {
    constructor() {
        this.newTodoTitle = '';
    }
    addTodo: function() { ... }
    removeTodo: function(todo) { ... }
    todosOf: function(filter) { ... }
}

// An example Angular 2 service
class TodoStore {
    constructor(win:Window) {
        this.win = win;
    }
    add(todo) { 
        // access this.win.localStorage ... 
    }
    remove(todo) { ... }
    todosOf(filter) {  ... }
}
</pre>

In order to understand the challenges involved in emulating this style, we need to understand the ways in which a component can be registered with an Angular 1.x app.

## A Review of Angular Component Types

In researching this article, I really started to appreciate why Misko (the creator of Angular) <a href="http://youtu.be/lGdnh8QSPPk?t=1m6s" target="_blank">felt the need to apologise</a> for the crazy API that has evolved with Angular 1.x. In attempting to bring a more consistent, class-based structure to a 1.x app, we need to know our way around the <a href="https://docs.angularjs.org/api/ng/type/angular.Module" target="_blank"><code>angular.Module</code></a> interface. Here are some of the more commonly-used methods, arranged in order of craziness:

<pre>angular.module('app')
    .controller(name, constructor); // expects a constructor function. Ah, simple!
    .service(name, constructor); // ditto 
    .provider(name, providerType); // expects a constructor function that must contain a $get() method
    .factory(name, providerFunction); // expects a factory function.
    .directive(name, directiveFactory); // expects an especially crazy factory function. 
</pre>

There are a few other component types, but the above are the most frequently used. For the full list &#8211; and much more detail &#8211; see the <a href="https://docs.angularjs.org/api/ng/type/angular.Module" target="_blank">Angular docs</a>. With that in mind, let us explore how we can use an ES6 class-based approach to define the various components of our app.

## Defining Components with Classes

### Services & Controllers

The simplest case is that of the service and the controller, since both are expecting a constructor function which will then be instantiated with the `new` keyword. Here is an example of defining and registering each:

<pre>class UserService {
    constructor($http) {
        this.$http = $http;
    }
    getFullName() {
        return this.$http.get('api/user/details');
    }
}

class MyController {
    constructor(userService) {
        userService.getFullName()
            .then(result =&gt; this.userName = result.fullName);
    }
}

angular.module('app')
    .service('userService', UserService)
    .controller('MyController', MyController);
</pre>

That&#8217;s easy. For a more detailed look at this case, check out the article <a href="http://blog.thoughtram.io/angularjs/es6/2015/01/23/exploring-angular-1.3-using-es6.html" target="_blank">Using ES6 With Angular Today</a> by Christoph Bergdorf (which also goes into using ES6 modules &#8211; a topic I&#8217;m not going to talk about here).

### Providers

The provider expects a constructor function which must contain a property named `$get`, which should be a factory function. Confused? Here is an example:

<pre>class ThingServiceProvider {
    constructor() {
        this.apiPath = 'default/api';
    }
    setApiPath(value) {
        this.apiPath = value;
    }
    $get($http) {
        return {
            getThings: () =&gt; $http.get(this.apiPath)
        };
    }
}

angular.module('app')
    .provider('thingService', ThingServiceProvider);
</pre>

Admittedly, this doesn&#8217;t look as neat as the examples above, and the benefits of defining a provider in this way are less clear to me. Also note that any dependencies should be arguments in the `$get` method, rather than the constructor.

### Factories

The factory is very similar to the service, except that the function passed to it will not be instantiated with `new`, rather it will simply be invoked and is expected to return some value (usually an object).

[**Update 27/02/15**: _Pete Bacon Darwin, who currently leads development of Angular 1.x, left a clarifying comment below regarding the role of factories vs services & classes:_

> One thing that is worth mentioning is that the \`module.factory()\` method is specifically for when you are not using classes. The \`module.service()\` method was specifically designed for when you want to define your services as classes (or instantiable types). So there is actually no point in trying to hack together a way to register a class via the \`module.factory()\` method. Just use \`module.service()\` instead.

_With that in mind, here is how you <span style="text-decoration: underline;">could</span> define a factory as a class if you wanted to. The technique I employ becomes important when we get to directives, so it&#8217;s still worth reading and getting your head around.]_

Here is a factory defined as a class:

<pre>class Thing {
    constructor() {
        console.log('Created a new Thing!');
        this.explode();
    }
    explode() {
        console.log('BOOM!');
    }
}

/**
 * The ThingFactory class creates new Things
 */
class ThingFactory {
    constructor($timeout) {
        this.$timeout = $timeout;
    }
    newThing() {
        console.log('Getting a new Thing...');
        return this.$timeout(() =&gt; new Thing(), 1000);
    }
}
</pre>

Now we come to an interesting problem: we need to somehow turn the `ThingFactory` class into a factory function that we can pass to `factory()`. A naive approach would be something like:

<pre>// A naive and faulty method 
angular.module('app')
    .factory('thingFactory', () =&gt; new ThingFactory());
</pre>

However, this will not preserve the dependency on `$timeout`, and therefore our factory will not work. Ultimately, we want a way of declaring the factory like this:

<pre>// A working method
angular.module('app')
    .factory('thingFactory', ['$timeout', ($timeout) =&gt; 
                                              new ThingFactory($timeout)]);
</pre>

Of course, we don&#8217;t want to have to keep our list of dependencies up to date in _four_ separate places for every factory we define. That would be madness.

The solution is to annotate the class with the required dependencies, and then use a function to inspect that annotation and construct our desired factory function dynamically. Here&#8217;s how that can be done:

**1. Annotating The Class**

Angular provides a method of dependency annotation referred to as <a href="https://docs.angularjs.org/guide/di#-inject-property-annotation" target="_blank">$inject property annotation</a>. To use this you simply need to add a property to your class named `$inject` which is an array of dependency names. This can be done manually like this:

<pre>class ThingFactory {
    constructor($timeout) {
        // ...
    }
}
ThingFactory.$inject = ['$timeout'];</pre>

However, this still requires the maintenance of _two_ lists of dependencies. The best way to handle this is to use a build tool to add the dependency annotations automatically. In the <a href="https://github.com/michaelbromley/angular-es6" target="_blank">demo project</a>, I use the <a href="https://www.npmjs.com/package/gulp-ng-annotate" target="_blank">gulp-ng-annotate</a> tool which does a pretty good job of understanding the code and adding the `$inject` annotations. However, to be safe, in the actual demo app I have used the <a href="https://github.com/olov/ng-annotate#explicit-annotations-with-nginject" target="_blank"><code>/*@ngInject*/</code></a> annotation where necessary just to make sure ng-annotate doesn&#8217;t miss anything. For the sake of simplicity I&#8217;ve omitted that annotation from the examples presented here.

**2. Inspecting The Annotation & Creating A Factory Function**

Once we have an annotated class, we can inspect that annotation to dynamically create a factory function that will be minification-safe using Angular&#8217;s array notation:

<pre>// Goal: turn `ThingFactory` into
// ['$timeout', ($timeout) =&gt; new ThingFactory($timeout)]

var constructorFn = ThingFactory;

var args = constructorFn.$inject; // args = ['$timeout']
var factoryFunction = (...args) =&gt; {
    return new constructorFn(...args);
}
var factoryArray = args.push(factoryFunction);  
// factoryArray = ['$timeout', factoryFunction]
</pre>

The `factoryArray` is now in the correct format to pass to `.factory()` and will have the correct dependencies injected. Later we will abstract this method out into its own function to simplify the registration of factories.

### Directives

And now we come to the &#8220;final boss&#8221; of this little adventure. Directives have a notoriously complex API in the form of the &#8220;<a href="https://docs.angularjs.org/api/ng/service/$compile#directive-definition-object" target="_blank">Directive Definition Object</a>&#8220;. In essence, the `.directive()` method expects a factory function with particular properties that are used to configure that directive. It seems Angular 2 will use some form of AtScript annotations to define these configurations, but by using ES6 classes with Angular 1.x we can still make things look fairly neat:

<pre>class MyDirective {
    constructor($interval) {
        this.template = '&lt;div&gt;I\'m a directive!&lt;/div&gt;'; 
        this.restrict = 'E'; 
        this.scope = {} 
        // etc. for the usual config options 

        // allows us to use the injected dependencies 
        // elsewhere in the directive (e.g. compile or link function) 
        this.$interval = $interval; 
    } 

    // optional compile function 
    compile(tElement) { 
        tElement.css('position', 'absolute'); 
    } 

    // optional link function 
    link(scope, element) { 
        this.$interval(() =&gt; this.move(element), 1000); 
    } 

    move(element) {
        element.css('left', (Math.random() * 500) + 'px'); 
        element.css('top', (Math.random() * 500) + 'px'); 
    } 
}</pre>

As with factories, we&#8217;ll need to wrap this class in a factory function with the correct dependencies injected (`$interval` in this case). We&#8217;ve already covered this above, and the exact same method of annotation and inspection can be used here.

However, the directive factory function is a bit special. It can also contain `compile` and `link` functions which have their <a href="http://www.jvandemo.com/the-nitty-gritty-of-compile-and-link-functions-inside-angularjs-directives/" target="_blank">own significance in the Angular bootstrapping process</a>, and are required if the directive is to have any kind of interactive functionality.

**The Problem**

You may be aware that, if both the `compile` and `link` functions are used, `link` should be the return value of `compile` (<a href="https://docs.angularjs.org/api/ng/service/$compile#-compile-" target="_blank">docs</a>). At first I tried this:

<pre>compile(tElement) {
    // do stuff
    return this.link;
}</pre>

This won&#8217;t work because, when Angular invokes the `link` function, it is no longer in the context of the class instance, and therefore `this.$interval` will be undefined. The next thing I tried was this:

<pre>compile(tElement) {
    // do stuff
    return (scope, element ) =&gt; {
        this.$interval(() =&gt; this.move(element), 1000);
    };
}</pre>

The use of the fat arrow preserves the lexical scope (so `this.$interval()` now works), but it&#8217;s ugly looking and a step away from the clean class definitions that I was aiming for. The next thing I tried was this:

<pre>compile(tElement) {
    // do stuff
    return this.link.bind(this);
}</pre>

This is better, but still a bit clumsy in that the developer has to remember to include that strange return value. Worse still, both of the above methods enforce the use of a `compile` function, which is not often necessary in practice.

**The Solution**

In order to get the desired result, with optional `compile` and `link` functions, we need to do a little bit of trickery. The solution I came up with is to:

  1. Check whether the class has a `compile` method. If not, create an empty one.
  2. Save a reference to the original `compile` method, and replace it with a new function which:
  3. Delegates to the original `compile` method, using the correct context and arguments via the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply" target="_blank"><code>Function.apply()</code></a> method.
  4. If the class has a `link` method, return that method, but bound to the correct lexical scope via the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind" target="_blank"><code>Function.bind()</code></a> method.

Here is what all of that looks like in practice:

<pre>var constructorFn = MyDirective;

if (!constructorFn.prototype.compile) {
    // create an empty compile function if none exists
    constructorFn.prototype.compile = () =&gt; {};
}

var originalCompileFn = _cloneFunction(constructorFn.prototype.compile);

// the _override helper function replaces the 'compile' property on
// constructorFn.prototype with a new function defined by the third argument.
_override(constructorFn.prototype, 'compile', function () {
    return function () {
        originalCompileFn.apply(this, arguments);

        if (constructorFn.prototype.link) {
            return constructorFn.prototype.link.bind(this);
        }
    };
});</pre>

Combined with the earlier method of creating factory functions from constructors, this allows us to define directives as a clean, readable class.

## Putting It All Together

Rather than having to remember how each type of component has to be registered with Angular, and having to duplicate all that code, we would benefit from a helper utility which encapsulates all of that and presents a simple and consistent API. I have written such a utility, imaginatively named <a href="https://github.com/michaelbromley/angular-es6/blob/master/src/app/utils/register.js" target="_blank">register.js</a>. It provides the following API, and behind the scenes it applies all the methods we have explored above (plus a bit extra in the way of defensive programming):

<pre>class MyAngularComponent {
    /*@ngInject*/
    constructor(dependency1, dependency2) {
        this.dependency1 = dependency1;
        // stuff happens here
    }
    someMethods() {
        this.dependency1.doThatThing();
        // more stuff here
    }
}

register('app')
    .controller('MyController', MyAngularComponent)
    .service('myService', MyAngularComponent)
    .provider('myOtherService', MyAngularComponent)
    .factory('myFactory', MyAngularComponent)
    .directive('myDirective', MyAngularComponent);
</pre>

To summarise, to use the approach I have outlined in this article you need to:

  1. Define your Angular components as ES6 classes as outlined above.
  2. Use a transpiler to convert the ES6 code into a usable form. I used <a href="https://www.npmjs.com/package/gulp-6to5" target="_blank">6to5</a>, but there are others out there.
  3. Use ng-annotate to insert annotations for your components&#8217; dependencies.
  4. Use the register.js API to register your components.

**Now go and look at the <a href="https://github.com/michaelbromley/angular-es6" target="_blank">demo app code</a>.**

**To prove it works, here&#8217;s the <a href="http://www.michaelbromley.co.uk/experiments/angular-es6-demo/build/" target="_blank">working demo</a> (warning: it&#8217;s quite daft).**

## Resources & Further Study

I linked to quite a few resources throughout this article. Here is a handy list of them:

  * <a href="https://github.com/lukehoban/es6features" target="_blank">ECMAScript 6 Features repo by Luke Hoban</a>
  * <a href="http://javascriptplayground.com/blog/2014/07/introduction-to-es6-classes-tutorial/" target="_blank">An introduction to ES6 classes by Jack Franklin</a>
  * <a href="https://github.com/johnpapa/angularjs-styleguide" target="_blank">John Papa&#8217;s AngularJS style guide</a>
  * <a href="https://github.com/toddmotto/angularjs-styleguide" target="_blank">Todd Motto&#8217;s AngularJS style guide </a>
  * <a href="http://www.michaelbromley.co.uk/blog/267/my-thoughts-on-ngeurope-2014-and-angularjs-2-0" target="_blank">My report from ngEurope, October 2014</a>
  * <a href="https://docs.google.com/presentation/d/1XQP0_NTzCUcFweauLlkZpbbhNVYbYy156oD--KLmXsk/edit#slide=id.p" target="_blank">Igor Minar & Tobias Bosch&#8217;s ngEurope slides on &#8220;Angular 2 Core&#8221;</a>
  * <a href="http://blogs.msdn.com/b/typescript/archive/2014/10/22/typescript-and-the-road-to-2-0.aspx" target="_blank">TypeScript and the Road to 2.0 blog post on MSDN</a>
  * <a href="https://www.youtube.com/watch?v=lGdnh8QSPPk" target="_blank">Misko Hevery&#8217;s keynote on AtScript from ngEurope (video) </a>
  * <a href="http://blog.thoughtram.io/angularjs/es6/2015/01/23/exploring-angular-1.3-using-es6.html" target="_blank">Using ES6 with Angular today &#8211; blog post on throughtram.io</a>
  * <a href="http://www.jvandemo.com/the-nitty-gritty-of-compile-and-link-functions-inside-angularjs-directives/" target="_blank">The nitty-gritty of compile and link functions inside AngularJS directives &#8211; blog post by Jurgen Van de Moere</a>
  * <a href="https://docs.angularjs.org/api/ng/type/angular.Module" target="_blank">AngularJS docs for angular.Module</a>
  * <a href="https://docs.angularjs.org/guide/di#-inject-property-annotation" target="_blank">AngularJS docs for $inject property annotations</a>
  * <a href="https://docs.angularjs.org/api/ng/service/$compile#directive-definition-object" target="_blank">AngularJS docs for the Directive Definition Object</a>

In researching this material, I came to discover that there are quite a few people making similar efforts to combine ES6 and Angular 1.x. Some of these focus on attempting to faithfully recreate the AtScript syntax by using the <a href="https://github.com/google/traceur-compiler/wiki/LanguageFeatures#annotations-experimental" target="_blank">annotation extensions of the Traceur compiler</a>, which are not a standard part of ECMAScript. These projects proved useful to me and are well worth checking out:

  * <a href="https://github.com/marcj/angular-es6-annotations" target="_blank">marcj/angular-es6-annotations</a>
  * <a href="https://github.com/robianmcd/angular-next" target="_blank">robianmcd/angular-next</a>
  * <a href="https://github.com/hannahhoward/a1atscript" target="_blank">hannahhoward/a1atscript</a>

Thanks for taking the time to read this. Feedback, critiques and suggestions are most welcome.

 [1]: blog/350/exploring-es6-classes-in-angularjs-1-x#_section-putting-it-all-together