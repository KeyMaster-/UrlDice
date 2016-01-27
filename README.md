# UrlDice
Quick experiment for a website doing dice rolls for you, inspired by this [tweet](https://twitter.com/eigenbom/status/691064024247640064).

The script reads the last part of the URL as dice notation (e.g. `example.com/2d6+3`), rolls the dice and displays the final result.

Written in [Haxe](http://www.haxe.org), using [hxparse](https://github.com/Simn/hxparse) and [hxnodejs](https://github.com/HaxeFoundation/hxnodejs).

## Setup
**This is my first time making something for the web, so do not expect any good practices here!**

Change the `listen_url` and `listen_port` variables in `server/Main.hx` to the correct values for your website, then compile using the `build.hxml` file.

In `site/index.html`, change the value of the `base` tag to the correct value for your website (`/` if it is running at the domain root, otherwise the subdirectory the website is running unter).

Finally, run `main.js` in the `site` folder with node.js.