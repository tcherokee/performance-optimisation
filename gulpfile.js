'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    inlnSrc = require('gulp-inline-source'),
    cleanCSS = require('gulp-clean-css'),
    gulpSequence = require('gulp-sequence'),
    rename = require('gulp-rename'),
    pump = require('pump'),
    htmlmin = require('gulp-htmlmin'),
    del = require('del');

gulp.task('cleanTasks', function(){
  del('dist');
});

gulp.task('processCSS', ['cleanTasks'], function(){
  return gulp.src([
                    'src/css/normalize.css',
                    'src/css/foundation.css',
                    'src/css/menu.css',
                    'src/css/hero.css',
                    'src/css/photo-grid.css',
                    'src/css/modals.css',
                    'src/css/footer.css'
                  ])
                .pipe(cleanCSS({
                  level: {
                    1: {},
                    2: {}
                  }
                }))
                .pipe(concat('styles.min.css'))
                .pipe(gulp.dest('dist/css'))
});

gulp.task('concatScripts', function(){
  return gulp.src([
            'src/js/jquery.js',
            'src/js/fastclick.js',
            'src/js/foundation.js',
            'src/js/foundation.equalizer.js',
            'src/js/foundation.reveal.js'
          ])
      .pipe(concat('app.js'))
      .pipe(gulp.dest('dist/js'))
});

gulp.task('compressJS', ['concatScripts'], function(err){
  pump([
    gulp.src('dist/js/app.js'),
    uglify(),
    rename({suffix: '.min'}),
    gulp.dest('dist/js')
  ],err)
});

gulp.task('copyIndexImg', function(){
  return gulp.src(['src/img/**', 'src/index.html', 'src/css/basics.css'], {base:'src'})
      .pipe(gulp.dest('dist'))
})

gulp.task('inlineSourceCSS', ['copyIndexImg'], function(){
  gulp.src('dist/index.html')
             .pipe(inlnSrc())
             .pipe(htmlmin({collapseWhitespace: true}))
             .pipe(gulp.dest('dist'))
});

gulp.task('default', gulpSequence('processCSS', 'compressJS', 'inlineSourceCSS'));
