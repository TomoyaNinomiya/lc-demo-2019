# Dev environment for static web pages
The environment is to use for cording static web pages.  
When create a new project, copy the files to a new project directory.

## Requirement
* Node.js
* npm
* SASS

## Configuration files
* package.json
* gulpfile.js - This file will give you a taste of what gulp does.
* .browserslistrc - The config to share target browsers and Node.js versions between different front-end tools. https://www.npmjs.com/package/browserslist

## Installation
* Copy the files to a new project directory
* Remove the following directory and file
  * .git/
  * reademe.md (this file)
* Rewite package.json
  * "name" - new project name
  * "description" - new project description
* Run the following command in terminal  
  ```npm install```

## Comand
* ```npm run gulp``` - build the publish files and start the server for development
* ```npm run gulp build``` - only build the publish files

## Directory structure
```
/
├── dev_src/ - contain the development files  
│   ├── pug/   - html templates by Pug  
│   │   └── _include/ - common included files (_header, _footer, _layout etc.)  
│   ├── scss/  - scss files  
│   │   ├── styles.scss - import scss files  
│   │   ├── base/       - common base files
│   │   │   ├── _base.scss      - common elements styles  
│   │   │   ├── _variable.scss  - common variable  
│   │   │   ├── _mixin.scss     - common mixin  
│   │   │   └── _keyframes.scss - common keyframes for animation  
│   │   ├── layout/    - layout styles (_header, _footer, _layout etc.)  
│   │   └── component/ - other component files (plugins styles etc.)  
│   ├── js/    - javascript files  
│   │   ├── common.js - base file 
│   │   ├── modules/  - 
│   │   │   ├── checkDevice.js - script for responsive design  
│   │   │   ├── header.js      - script for the control of header   
│   │   │   ├── animation.js   - script for animation  
│   │   │   └── component.js   - other script  
│   │   └── lib/ - libliry and plugin script files (jQuery, Slick etc.)  
│   └── files/ - other files (images, fonts etc.)  
└── dist/ - contain the builded publish files from dev_src/
    └── assets/ - assets  
        ├── css/ - css files
        ├── js/  - js files
        └── img/ - image files
```