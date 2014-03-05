Permalink
=========

This is a jQuery plugin that converts a DOM element into "permalink"
widget.  This means that the element becomes clickable, and clicking
on it will pop up a small div containing a URL that has been
pre-selected, so that the user can conveniently copy/paste the URL.
The URL is passed as an option when the plugin is invoked.

For example, if you have

```html
<span id="permalink">Permalink</span>
```

in your document, then invoking

```js
$('#permalink').permalink({
    url : 'http://www.mysite.com/page.html'
});
```

will cause the above `span` to appear as

<p align="center">
  <img src="./sample.png?raw=true"/>
</p>

and when the user clicks on it they will see the following:

<p align="center">
  <img src="./sample-clicked.png?raw=true"/>
</p>

The intended use is stateful browser applications which can generate URLs
to re-create the current state; the permalink widget provides a convenient
way for the application to give the user access to the URL, without always
displaying it somewhere on the page.

Permalink provides a single plugin method named `url`, which can be used to
set or get the current url after the plugin has been invoked:

```js
// set the widget's url to http://www.newsite.com/page.html:
$('#permalink').permalink('url', 'http://www.newsite.com/page.html');
```

```js
// return the widget's current url:
$('#permalink').permalink('url');
```
