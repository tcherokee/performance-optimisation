'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    inlnSrc = require('gulp-inline-source'),
    cleanCSS = require('gulp-clean-css');



gulp.task('inlineSourceCSS', function(){
  return gulp.src('src/index.html')
             .pipe(inlnSrc())
             .pipe(gulp.dest('dist'))
});

gulp.task('processCSS', function(){
  return gulp.src([
                    'src/css/normalize.css',
                    'src/css/foundation.css',
                    'src/css/arvo.css',
                    'src/css/ubuntu.css',
                    'src/css/menu.css',
                    'src/css/hero.css',
                    'src/css/photo-grid.css',
                    'src/css/modals.css',
                    'css/footer.css'
                  ])
                .pipe(cleanCSS({
                  level: {
                    1: {},
                    2: {}
                  }
                }))
                .pipe(concat('styles.min.css'))
                .pipe(gulp.dest('dist'))
});

gulp.task('concatScripts', function(){
  gulp.src([
            'src/js/jquery.js',
            'src/js/fastclick.js',
            'src/js/foundation.js',
            'src/foundation.equalizer.js',
            'src/foundation.reveal.js'
          ])
      .pipe(concat('app.js'))
      .pipe(gulp.dest('dist/js'))
});

gulp.task('minifyScripts', function(){
  gulp.src(['dist/app.js'])
      .pipe(uglify())
      .pipe(gulp.dest(./))
});

gulp.task('default', ['inlineSourceCSS', 'processCSS', 'concatScripts', 'minifyScripts']);
