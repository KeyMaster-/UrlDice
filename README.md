# UrlDice
Quick experiment for a website doing dice rolls for you, inspired by this [tweet](https://twitter.com/eigenbom/status/691064024247640064).

The script reads the last part of the URL as dice notation (e.g. `example.com/2d6+3`), rolls the dice and displays the final result.

Written in [Haxe](http://www.haxe.org), using [hxparse](https://github.com/Simn/hxparse).

## Setup
**This is my first time making something for the web, so do not expect any good practices here!**


The site runs with apache2. Compile the haxe code, then use the www directory as the website folder. 
IMPORTANT: Modify the link to the main.js file in index.html to be the absolute path to it on the server. Otherwise, urls that look like directories will break. (There's probably a better way to do this, but I don't know of it)
The site uses mod_rewrite to redirect dice roll urls to `index.html`, where the roll script is run, so make sure to enable this in the apache2 configuration.