'use strict';
var gulp        = require('gulp'),
    connect     = require('gulp-connect'),
    less        = require('gulp-less'),
    chalk       = require('chalk'),
    sourcemaps  = require('gulp-sourcemaps'),
    cssmin      = require('gulp-cssmin'),
    rename      = require('gulp-rename');

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

gulp.task('compress', function () {
    gulp.src('dev/style/style.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dev/style'));
});

gulp.task('connect', function() {
  connect.server({
    port: 8001,
    host: '172.16.17.40',
    root: 'dev',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./dev/*.html')
    .pipe(connect.reload());
});

gulp.task('default', ['less', 'connect', 'compress'], function () {
    gulp.watch('./dev/**/*.less', ['less']);
    gulp.watch('./dev/**/style.css', ['compress']);
    gulp.watch(['./dev/*.html'], ['html']);
});
