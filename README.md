# Gulp-Sass-JS-BrowserSync-Boilerplate

Gulp Sass JS Browsersync Boilerplate is a default template for getting started with [gulp.JS](http://www.gulpjs.com), using a common basic setup consisting of:

* Sass processing
* CSS Browser auto-prefixing 
* CSS minification
* CSS Sourcemaps
* JS Uglify (minification) 
* BrowserSync (Inject CSS changes + follow, reload on JS change)
* Sass Style guides using [Node-KSS](https://github.com/kss-node/kss-node)

The programmed watch files are for: JS directories, Scss Directory, HTML files.  

This does not include:
* Popular front-end frameworks or other boilerplates as it is designed to be platform agnostic. This will work with Bootstrap Sass and many others.

The idea is to make a gulp project that encompasses a common workflow, ready to go for vets and newbies alike, complete with CSS injection (no reloading) and page refreshes for JS changes. 


# Beginner's guide

Gulp.js is powerful but can be a bit confusing as there are plenty of libraries to pick from and chaining these behaviors together can be difficult.   Gulp requires Node.js. If you do not have Node.js installed already, go to [Nodejs.org](https://nodejs.org/) for more information.

If you are unsure if Node.js has been installed, in your terminal, run: node -v (windows users require the Node.js terminal so this is moot).

Once Node.js is installed, download/clone this repo and go to _build within your local copy in your terminal and run "npm install", this will install the necessary dependancies.

Next, you'll need to configure your local webserver and within your /_build/gulpfile.js change the server to match your local site. This should work with Apache, MAMP or local python server.  

## Ready to go!

Once your local webserver has been configured, you're ready to rock! From the terminal in your /_build directory, run "gulp," this will launch a browser window pointing to your localhost and will start compiling. 
If your localhost has been configured properly, you should see the Hello World text. Congrats!

On launch BrowserSync does some awesome stuff out of the box, allowing you to access your project from other devices on the same network, such as tablets/phones or VMs on your computer.

 To stop your project, hit command-period  (OS X) on your terminal window. Anytime you hit save on a Scss file or JS file; gulp will recompile your changes. 

# Styleguides!

CSSTricks wrote a great article called, [Build a Style Guide Straight from Sass](https://css-tricks.com/build-style-guide-straight-sass/). I highly recommend reading it! I've included a gulp task, gulp styleguides, ready to generate KSS style guides. 

KSS uses Sass comments to generate style guides automagically in a very platform agnostic way. You can configure KSS in the kss-config.json
