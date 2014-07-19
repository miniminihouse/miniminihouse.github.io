# Development environment 

You first need to install [Node.js](http://nodejs.org/) and [Ruby](https://www.ruby-lang.org/).

## Node / bower packages

### Install node packages

```
npm install
```

### Install bower packages

Make sure you have installed [Bower](http://bower.io/). It can be installed with `npm install -g bower`.

```
bower install
```

## Sass / Compass

I'm using sourcemap option for Sass live-editing.

These version of Sass/Compass will work.

```
$ sass -v
Sass 3.3.10 (Maptastic Maple)
$ compass -v
Compass 1.0.0.alpha.20
```

Sass-watch need gem listen 0.7.3 version.

```
$ gem list listen
*** LOCAL GEMS ***
listen (0.7.3)
```

#### Install Compass/Sass

```
gem install compass --pre
```
or
```
gem install compass --version "=1.0.0.alpha.20" 
```

#### Install Listener 0.7.3

```
gem install listen --version "=0.7.3"
```

#### Install Oily PNG

```
gem install oily_png
```

## Grunt

### Install Grunt CLI

```
npm install -g grunt-cli
```


# Grunt tasks

Make sure you have installed [Grunt CLI](https://github.com/gruntjs/grunt-cli). It can be installed with `npm install -g grunt-cli`.


## Basic task

### Develop

For develop stage.

```sh
$ grunt server
Running "server" task

Running "connect:livereload" (connect) task
Started connect web server on localhost:9000.

Running "shell:sassWatch" (shell) task

Running "watch" task
Waiting...
```

Then, access `http://localhost:9000/` from Chrome, or excute `grunt open` command from terminal.
Open Chrome dev tools.


### Build

Build deployable package.

```sh
$ grunt build
```

To deploy the dist directory, run the subtree push command from the root directory.

``` sh
$ git subtree push --prefix dist origin gh-pages
```
