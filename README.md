
# [Avalanche Canada](https://github.com/avalanchedotca/AvalancheCanada.git) 
[![Build Status](https://travis-ci.org/avalanchedotca/AvalancheCanada.svg)](https://travis-ci.org/avalanchedotca/AvalancheCanada)
[![dependencies] (https://david-dm.org/avalanchedotca/avalanchecanada.png)](https://david-dm.org/)
****

## Introduction
The AvalancheCanada website is a implementation of a front end/view upon CAC data streams. Data is stored separately to the website and is available via RESTful API’s.   
Design still under way.  
Contact bshaw@avalanche.ca for more details or to get invoved.  

***

## Technical Architecture
The Avalanche Canada website is a [AngularJS](http://angularjs.org) project.  
Based of [ngBoilerplate](https://github.com/ngbp/ngbp.git) kickstarter.  
[Angular UI](http://angular-ui.github.io).  
[Angular Bootstrap](http://angular-ui.github.io/bootstrap)
[Font Awesome](http://fortawesome.github.com/Font-Awesome)  
[Grunt](http://gruntjs.org)-based build system to ensure maximum productivity.  
[Bower](http://bower.io/) package management
[Compass](http://compass-style.org/)  
[SASS](http://sass-lang.com/)  
[Travis CI] (https://travis-ci.org/avalanchedotca/AvalancheCanada) Continuous Integration and Deployment.     

***

## Modules

***

## Quick Start

Install Node.js and Ruby then:

```sh
$ gem install compass
$ sudo npm -g install grunt-cli karma bower 
$ npm install
$ bower install
$ grunt watch
```

Finally, open `file:///path/to/ng-boilerplate/build/index.html` in your browser.

### Overall Directory Structure

At a high level, the structure looks roughly like this:

```
AvalancheCanada/
  |- grunt-tasks/
  |- karma/
  |- src/
  |  |- app/
  |  |  |- <app logic>
  |  |- assets/
  |  |  |- <static files>
  |  |- common/
  |  |  |- <reusable code / directives>
  |  |- sass/
  |  |  |- main.scss
  |- vendor/
  |- .bowerrc
  |- bower.json
  |- build.config.js
  |- Gruntfile.js
  |- module.prefix
  |- module.suffix
  |- package.json
```

What follows is a brief description of each entry, but most directories contain
their own `README.md` file with additional documentation, so browse around to
learn more.

- `karma/` - test configuration.
- `src/` - our application sources. [Read more &raquo;](src/README.md)
- `vendor/` - third-party libraries. [Bower](http://bower.io) will install
  packages here. Anything added to this directory will need to be manually added
  to `build.config.js` and `karma/karma-unit.js` to be picked up by the build
  system.
- `.bowerrc` - the Bower configuration file. This tells Bower to install
  components into the `vendor/` directory.
- `bower.json` - this is our project configuration for Bower and it contains the
  list of Bower dependencies we need.
- `build.config.js` - our customizable build settings; see "The Build System"
  below.
- `Gruntfile.js` - our build script; see "The Build System" below.
- `module.prefix` and `module.suffix` - our compiled application script is
  wrapped in these, which by default are used to place the application inside a
  self-executing anonymous function to ensure no clashes with other libraries.
- `package.json` - metadata about the app, used by NPM and our build script. Our
  NPM dependencies are listed here.


## Roadmap

### To Do

See the [issues list](https://github.com/avalanchedotca/AvalancheCanada/issues). And
feel free to submit your own!

### Contributing

We welcome contributions..   
Please feel free to suggest an improvement via a pull request, report any issues via [issues list](https://github.com/avalanchedotca/AvalancheCanada/issues), join the discussion at [discussion group](https://groups.google.com/forum/#!forum/avalancheca-technical) or contact the developers at itsupport@avalanche.ca

## Questions/Contact
For any question please do not hesitate to contact itsupport@avalanche.ca
