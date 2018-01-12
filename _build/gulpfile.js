// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    pump = require('pump'),
    browserSync = require('browser-sync').create(),
    //configurate
    appDefaults = {
      myProxy: "http://test.lvh.me",
      javascriptConcat : ['../js/libs/**/*.js' , '../js/components/**/*.js'],
      javascriptDestination : "../js/",
      javascriptUglify : "../js/app.js",
      stylesDir : "../scss/", // path to styles
      stylesDestination : "../css/",
      watchHTML : "../**/*.html",
      watchJavascript : +"../js/app.js"
    }

// Styles
gulp.task('sass', function() {
  return gulp.src(appDefaults.stylesDir+'**/*.scss')
    .pipe(sass({ style: 'compressed'  }))
    .pipe(autoprefixer('last 2 version', 'safari 10', 'ie 10', 'opera 12.1', 'ios 9', 'android 4'))
    .pipe(gulp.dest(appDefaults.stylesDestination))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
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
  gulp.watch(appDefaults.stylesDir+'**/*.scss', function(event) {
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
