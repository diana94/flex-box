'use strict';
var gulp        = require('gulp'),
    connect     = require('gulp-connect'),
    less        = require('gulp-less'),
    chalk       = require('chalk'),
    sourcemaps  = require('gulp-sourcemaps'),
    cssmin      = require('gulp-cssmin'),
    rename      = require('gulp-rename'),
    minify      = require('gulp-minify'),
    fileinclude = require('gulp-file-include');

var LessPluginCleanCSS = require("less-plugin-clean-css"),
    cleancss = new LessPluginCleanCSS({advanced: true});

var LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    autoprefix = new LessPluginAutoPrefix({browsers: ["last 3 versions"]});

gulp.task('less', function () {

    gulp.src('./dev/less/*.less')
        .pipe(sourcemaps.init())
        .pipe(less({
            plugins: [autoprefix] /*, cleancss]*/
        }))
        .pipe(sourcemaps.write('.'))
        .on('error', function (err) {
            console.log(chalk.red("ERROR! ") + "file: " + chalk.red(err.filename) + " line: " + chalk.cyan(err.line));
        })
        .pipe(gulp.dest('./dev/style'));
});

gulp.task('compress-css', function () {
    gulp.src('dev/style/style.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dev/style'));
});

gulp.task('compress-js', function() {
  gulp.src('dev/js/script.js')
    .pipe(minify({
        ext:{
            min:'.min.js'
        }
    }))
    .pipe(gulp.dest('dev/js'))
});

gulp.task('connect', function() {
  connect.server({
    port: 8001,
    host: '172.16.17.40',
    root: 'dev',
    livereload: true
  });
});

gulp.task('fileinclude', function() {
  gulp.src(['dev/pages/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: 'dev/blocks'
    }))
    .pipe(gulp.dest('dev/'));
});

gulp.task('html', function () {
  gulp.src('./dev/*.html')
    .pipe(connect.reload());
});

gulp.task('default', ['less', 'connect', 'compress-css', 'compress-js', 'fileinclude'], function () {
    gulp.watch('./dev/**/*.less', ['less']);
    gulp.watch('./dev/**/style.css', ['compress-css']);
    gulp.watch('./dev/js/script.js', ['compress-js']);
    gulp.watch(['./dev/*.html'], ['html']);
    gulp.watch(['./dev/blocks/**/*.html'], ['fileinclude']);
});
