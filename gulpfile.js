var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    postcss = require('gulp-postcss'),

    // Notification on error
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),

    autoprefixer = require('autoprefixer'),
    fileinclude = require('gulp-file-include')
    uglify = require("gulp-uglify"),
    sourcemaps = require('gulp-sourcemaps'),
    fsCache = require('gulp-fs-cache'),
    rename = require("gulp-rename"),
    concat = require('gulp-concat'),
    del = require('del'),

    //min css
    cleanCSS = require('gulp-clean-css');


// Gulp Task SASS, postcss/autoprefixer, Browsersync
gulp.task('sass', function() {
    return gulp.src('./app/scss/main.scss')
        .pipe(plumber({ errorHandler: function(err) {
            notify.onError({
                title: "Gulp error in " + err.plugin,
                message:  err.toString()
            })(err);
        }}))
        .pipe(sass())
        .pipe(postcss([ autoprefixer({ browsers: [
          'Chrome >= 35',
          'Firefox >= 38',
          'Edge >= 12',
          'Explorer >= 10',
          'iOS >= 8',
          'Safari >= 8',
          'Android 2.3',
          'Android >= 4',
          'Opera >= 12']})]))
        .pipe(gulp.dest('./app/build/css'), { sourcemaps: true })
        .pipe(cleanCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./app/build/css'))
        .pipe(browserSync.stream());
});

// File Include
gulp.task('fileinclude', function() {
  return gulp.src(['./app/*.html'])
    .pipe(plumber({ errorHandler: function(err) {
        notify.onError({
            title: "Gulp error in " + err.plugin,
            message:  err.toString()
        })(err);
    }}))
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./app/build/'))
    .pipe(browserSync.stream());
});

// Build- watch file fileinclude
gulp.task('fileinclude-watch', gulp.series('fileinclude'));

// Uglify - Cache
gulp.task('scripts', function () {
  var jsFsCache = fsCache('.tmp/jscache'); // save cache to .tmp/jscache
  return gulp.src(['./app/js/plugins.js', './app/js/main.js'])
      .pipe(plumber({ errorHandler: function(err) {
          notify.onError({
              title: "Gulp error in " + err.plugin,
              message:  err.toString()
          })(err);
      }}))
      .pipe(concat('app.js'))
      .pipe(sourcemaps.init())
      .pipe(jsFsCache)
      .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(jsFsCache.restore)
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./app/build/js/')).pipe(browserSync.stream());
});

// Compile SASS
gulp.task('serve', gulp.series('sass', function() {
    browserSync.init({
        server: "./app/build/",
        reloadOnRestart: true,
    });
    // warch file-include for root and inc
    gulp.watch(['./app/inc/**/*.html', './app/*.html'], gulp.series('fileinclude-watch'));
    gulp.watch("./app/scss/**/*.scss", gulp.series('scripts', 'sass'));
    gulp.watch("./app/js/**/*.js", gulp.series('scripts'));
    gulp.watch("./app/**/*.html").on('change', browserSync.reload);
}));

// gulp run - generate build folder and run browserSync
gulp.task('default', gulp.series('serve', 'fileinclude', 'scripts'));

// gulp - generate only build folder
gulp.task('build', gulp.series('sass', 'fileinclude', 'scripts'));
