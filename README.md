# scss-starter-pack
SCSS Starterkit working with scss, gulp, browsersync, gulp-file-include. Version 2.0

### Main Dependencies
* browser-sync
* gulp
* gulp-file-include
* gulp-sass
* gulp-uglify
* stylelint
* autoprefixer
* gulp-clean-css

## Quick Start

First, make sure that you have installed Node.js, npm and gulp globally:

### Install Node.js and npm
https://nodejs.org/en/


### Install Gulp
```shell
npm install --global gulp
```
### Install scss-starter-pack
For installation, clone or download the package and open the terminal to run:
```shell

# Go to the root folder of your project, or just type cd, space and drag n drop the folder in terminal
cd /main-folder-of-your-project

# Install browserSync and all the node dependencies that we need
npm install

# Gulp default generate the build folder and start browserSync
gulp

# Gulp run only generate the build folder
gulp run

```
After installation and run gulp, browser-sync will lunch the automatically with http://localhost:3000 on the port :3000. On the port :3001 will find other browser-sync feature.

## Structure
Inside the app there is all you need for your project
```shell

  app
   ├── build                  # Build folder
   │   ├── css                # CSS builded files from SCSS folder
   │   └── js                 # JS folder with app.min.js(plugins.js + main.js) builded from ./app/js/ folder
   │   └── img                # Your img folder or video, fonts, etc.
   │   └── ...                # JS folder with app.min.js(plugins.js + main.js) builded from ./app/js/ folder
   ├── inc                    # Include folder via gulp-file-include (_header.html, _footer.html, etc.)
   ├── js                     # Test files (alternatively `spec` or `tests`)
   │   ├── main.js            # Your scripts
   │   └──  plugins.js        # Your JQuery plugins
   ├── scss                     
   │   ├── main.scss          # Main file with all the @import    
   │   ├── _mobile.scss       # Style for tablet breakpoint  
   │   ├── _mobile.scss       # Style for mobile breakpoint  
   │   └── ...
   └── ...

```

* The folder ./app/js is just for compile and build the file plugins.js and main.js. For other plugins or scripts, put .js files into the ./app/build/js/

### Gulp file inlcude
You can include files thanks to gulp-file-include. All the included files are in the ./app/inc folder.
``` html
<!-- just put this code inside your .html files -->
@@include('inc/_name-file.html')
```

### Stylelint
Stylelint is included for SCSS. You can install on your own editor via this guide:
https://stylelint.io/user-guide/complementary-tools/#editor-plugins

### Other documentation
* BrowserSync: https://www.browsersync.io/
* SCSS: https://sass-lang.com/guide
* Stylelint: https://stylelint.io/
* BEM CSS: http://getbem.com/introduction/
