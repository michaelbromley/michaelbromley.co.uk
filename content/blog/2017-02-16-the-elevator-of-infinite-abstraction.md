---
title: The Elevator of Infinite Abstraction
author: michael-bromley
type: post
date: 2017-02-16T16:19:08+00:00
url: /565/the-elevator-of-infinite-abstraction
categories:
  - featured
  - post
tags:
  - essay
  - programming

---
In software development, we often hear and speak of _abstractions_. When we use this term, we often mean some variation on concepts such as &#8220;hiding the implementation details&#8221;, &#8220;providing an interface&#8221;, &#8220;modelling a data type&#8221; or even &#8220;removing duplicate code&#8221;. But what is the essence of abstraction?

<div id="attachment_566" style="width: 810px" class="wp-caption aligncenter">
  <img class="size-full wp-image-566" src="http://www.michaelbromley.co.uk/api/wp-content/uploads/2017/02/abstract-etymology.jpg" alt="" width="800" height="219" srcset="http://www.michaelbromley.co.uk/api/wp-content/uploads/2017/02/abstract-etymology.jpg 800w, http://www.michaelbromley.co.uk/api/wp-content/uploads/2017/02/abstract-etymology-300x82.jpg 300w, http://www.michaelbromley.co.uk/api/wp-content/uploads/2017/02/abstract-etymology-768x210.jpg 768w" sizes="(max-width: 800px) 100vw, 800px" />
  
  <p class="wp-caption-text">
    The origin of &#8220;abstract&#8221; in the Macmillan Dictionary for Students
  </p>
</div>

I was recently looking up the term &#8220;abstract&#8221; in a dictionary, and was struck with the origin of the word:

> Latin _abstractus_, past participle of _abstrahere_ **to draw away**, from _abs_ away from and _trahere_ to draw

When we _abstract_ something, we _draw away_ from it. Indeed, our usual mental model of this involves moving upwards, from a lower level to a higher one. Thus we speak of &#8220;levels of abstraction&#8221;.

The dictionary in question (the Macmillan Dictionary for Students), also went on to give the following example for &#8220;abstraction&#8221;:

> The idea of redness is an abstraction

Think about this for a few moments. No, just _really_ think about it. When I did so, it inspired an extended &#8220;shower thought&#8221; which I will share with you now.

Consider a newborn baby. In her short existence, she has observed a chair which happened to be red and a table which also happened to be red. She also once saw a white car. Now we ask the newborn to try to conceive of a red car (assume for a moment that she can understand English). In order to do so, she would have to be able to extract out the common attribute &#8220;redness&#8221;, and then be able to apply it to other concrete objects she knows about. In doing so, she has created the _abstraction_ of redness by _drawing away_ from specific known red objects to a more general idea which can apply to a large set of objects.

Now let&#8217;s take a coding example.

<pre>fillStyle = 'red';
context.fillRect(0, 0, 200, 200);
</pre>

Above is an implementation of a red square with an HTML Canvas.

Let&#8217;s _draw away_ from this code and make a function:

<pre>function drawRedSquare() {
  context.fillStyle = 'red';
  context.fillRect(0, 0, 200, 200);
}

drawRedSquare();
</pre>

So that&#8217;s a level higher on the abstraction elevator. I guess we are all familiar with this idea. What about going lower? Join me as we take a philosophical journey on the the Elevator of Infinite Abstraction.

## Going Down

First of all let&#8217;s take a look at `context.fillStyle = 'red';`.

In this case, &#8220;red&#8221; really means `#ff0000`.

Which means &#8220;a red value of 255, a green value of 0 and a blue value of 0 in the [RGB colour model][1]&#8220;.

Which means &#8220;allocate a location in the video framebuffer with values `11111111, 00000000, 00000000`&#8221;

Which translates to a bunch of instructions in machine code.

Which eventually means do something on the physical level to translate these values into visible colours. By this point, I am way beyond my level of technical knowledge, but I guess some stuff happens with electricity and LEDs in the device&#8217;s display.

So by now we have a bunch of LEDs which are emitting light with a wavelength of ~650nm. We have descended the abstraction elevator quite some way from where we started. We have reached the level of physical existence &#8211; the concrete reality underlying the multiple levels of abstraction provided by the hardware, operating system and language.

At this point, the elevator is nearing what we could call the _ontological basement_ &#8211; the point at which physical objects exist and physical processes take place, and we can start to think about whether _those_ things really exist, or are themselves abstractions over some more fundamental reality.

> Some philosophers, notably of the Platonic school, contend that all nouns (including abstract nouns) refer to existent entities. Other philosophers contend that nouns do not always name entities, but that some provide a kind of shorthand for reference to a collection of either objects or events.
  
> <cite><a href="https://en.wikipedia.org/wiki/Ontology#Overview">Wikipedia: Ontology</a></cite>

Here is the level of philosophical debate; of String Theory; of wondering whether we are in the Matrix, or indeed whether this universe is a deeply-nested computer simulation, ultimately set in motion by some super-advanced race. After wandering around the ontological basement for a while, we might think to ourselves, &#8220;What happens if we go the other way?&#8221;

## Going Up

Let&#8217;s start from the `drawRedSquare()` floor. It turns out we were drawing a red square because we want to draw a table, the square being the table top.

So we go up a level to `drawTable()`. We wanted to draw a table because we are making a floor diagram for our new penthouse apartment (which will be entirely red).

Eventually we arrive at `drawRoom()`. Much like in our natural languages, abstractions can be combined together (or _composed_) into new, higher-level abstractions which successively capture more and more meaning:

A _room_ is a space enclosed by walls, a floor and a ceiling. A _dwelling_ is a room or series of rooms in which one lives. An _apartment_ is a dwelling which shares a single building with other dwellings. A _penthouse_ is an apartment on the uppermost floor of a tall building. So we can use the single word &#8220;penthouse&#8221; to express that entire set of ideas in one fell swoop.

As we move up the levels of abstraction, we encompass an ever-wider scope, and are able to express ever-more-complex ideas with single symbols (words, variables, functions).

In programming languages, this is simple to illustrate. A statement in C++ would [encompass many lines of assembly][2]. A array `map` function may encompass several lines of looping logic. At the higher levels of the elevator, a library like [rxjs][3] provides methods such as `flatMap`, which will (from the [docs][4]) _&#8220;transform the items emitted by an Observable into Observables, then flatten the emissions from those into a single Observable_&#8220;. Attempt to expand that last sentence out into a form which could be understood by someone unfamiliar with rxjs, and you will appreciate how high-level an abstraction `flatMap` really is.

The highest point on this line we can speculate about is some language or framework which is so high-level that we can just explain the business requirements to it (in typically vague fashion), and it will deal with the lower-level details of actually putting it all together in the way that we intended.

What&#8217;s the upper limit, the _ne plus ultra_ of this increasing abstraction, this increasing composition of meaning? I guess it would be a single word or concept which encompasses the entirety of knowledge and meaning in this universe. The only serious approach to this level I know of is contained in Douglas Adams&#8217; [_Hitchhiker&#8217;s Guide To The Galaxy_][5]. At this point, we have hit the _theological roof_, and our elevator ride is at an end.

## Summary

Between the ontological basement and the theological roof, we have a continuum of all objects and ideas, arranged in levels of ascending scope and complexity. To make this very clear, I have put together the following helpful diagram for your enjoyment:

<div id="attachment_571" style="width: 662px" class="wp-caption aligncenter">
  <img class="wp-image-571 size-full" src="http://www.michaelbromley.co.uk/api/wp-content/uploads/2017/02/abstract_elevator.jpg" width="652" height="720" srcset="http://www.michaelbromley.co.uk/api/wp-content/uploads/2017/02/abstract_elevator.jpg 652w, http://www.michaelbromley.co.uk/api/wp-content/uploads/2017/02/abstract_elevator-272x300.jpg 272w" sizes="(max-width: 652px) 100vw, 652px" />
  
  <p class="wp-caption-text">
    I trust this makes things clear.
  </p>
</div>

 [1]: https://en.wikipedia.org/wiki/RGB_color_model
 [2]: https://godbolt.org/
 [3]: http://reactivex.io/
 [4]: http://reactivex.io/documentation/operators/flatmap.html
 [5]: https://en.wikipedia.org/wiki/Phrases_from_The_Hitchhiker%27s_Guide_to_the_Galaxy#Answer_to_the_Ultimate_Question_of_Life.2C_the_Universe.2C_and_Everything_.2842.29