# michaelbromley.co.uk

This is the source code and raw content of my personal website and blog, located at https://www.michaelbromley.co.uk.

It is built with [Hugo](https://gohugo.io/).

## Dev Build

0. Install Hugo per the instructions in the Hugo docs.
1. `npm install`
2. `npm run watch`
3. `hugo server`

## Prod Build

1. `npm run build`
2. `hugo`

## Social Cards

Every page is built with a 1200x630 Open Graph image, so a link shared anywhere gets a
proper preview whether or not the page has a picture of its own. Hugo draws the card at
build time in `themes/terminal/layouts/partials/og/image.html`, setting the page title,
description and byline in Fira Mono over one of two backdrops:

- the page's own picture, from the `ogimage` front matter key on a post or `image` on a
  project, darkened by `themes/terminal/assets/og/card-scrim.png`
- otherwise `themes/terminal/assets/og/card-bg.png`

Both backdrops have an editable `.svg` beside them; the comment at the top of each says
how to regenerate the raster. The same goes for `static/favicon.svg`, which is what Slack
and Discord show beside an unfurled link.

The generated images are cached in `resources/`, which is not committed. A cold build
regenerates the lot in about a second.

To override what a card says, set `description`, `ogtitle` or `ogimagealt` in a page's
front matter.

## License & Copyright

All **content**, by which is meant the written material in the `/content` folder, is original work by the author, Michael Bromley.
It is protected by copyright and may be used only with explicit permission.

The **code** in this repo is made available under the MIT license. You may re-use my theme, but I advise that you change 
it at least a little in order to preserve your integrity and self-respect as a developer or designer :)
