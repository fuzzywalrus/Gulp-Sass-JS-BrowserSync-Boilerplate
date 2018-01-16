// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    pump = require('pump'),
    shell = require('gulp-shell'),
    browserSync = require('browser-sync').create(),
    //configurate
    appDefaults = {
      myProxy: "http://test.lvh.me",
      javascriptConcat : ['../js/libs/**/*.js' , '../js/components/**/*.js'],
      javascriptDestination : "../js/",
      javascriptUglify : "../js/app.js",
      stylesDirectory : "../scss/", // path to styles
      stylesDestination : "../css/",
      watchHTML : "../**/*.html",
      watchJavascript : +"../js/app.js"
    }

// Styles
gulp.task('sass', function() {
  return gulp.src(appDefaults.stylesDirectory+'**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'safari 10', 'ie 10', 'opera 12.1', 'ios 9', 'android 4'))
    .pipe(gulp.dest(appDefaults.stylesDestination))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.init({loadMaps: true})) //pass sourcemaps
    .pipe(cleanCSS({debug: true}, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
     }))
    .pipe(sourcemaps.write(appDefaults.stylesDestination))
    .pipe(gulp.dest(appDefaults.stylesDestination))
    .pipe(browserSync.stream());
});

//Concat scripts
gulp.task('scripts', function() {
  return gulp.src(appDefaults.javascriptConcat)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(appDefaults.javascriptDestination));
});

//uglify scripts
gulp.task('compress', function (cb) {
  pump([
        gulp.src(appDefaults.javascriptUglify),
        uglify(),
        gulp.dest(appDefaults.javascriptDestination)
    ],
    cb
  );
});

gulp.task('serve', ['sass'], function() {
    browserSync.init({
        proxy: appDefaults.myProxy
    });
});

// Watch
gulp.task('default',['serve'], function() {
  // Watch .scss files
  gulp.watch(appDefaults.stylesDirectory+'**/*.scss', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('sass');
  });
  gulp.watch(appDefaults.javascriptConcat , function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('scripts');
    gulp.run('compress');
  });
  gulp.watch(appDefaults.watchJavascript).on('change', browserSync.reload);
  gulp.watch(appDefaults.watchHTML).on('change', browserSync.reload);
});
// runs task with KSS
gulp.task('styleguide',['serve'], function() {
  // Watch .scss files
  gulp.watch(appDefaults.stylesDirectory+'**/*.scss', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('sass');
    gulp.run('kss');
  });
  gulp.watch(appDefaults.javascriptConcat , function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    gulp.run('scripts');
    gulp.run('compress');
  });
  gulp.watch(appDefaults.watchJavascript).on('change', browserSync.reload);
  gulp.watch(appDefaults.watchHTML).on('change', browserSync.reload);
});
