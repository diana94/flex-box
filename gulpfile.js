'use strict';
var gulp        = require('gulp'),
    connect     = require('gulp-connect'),
    less        = require('gulp-less'),
    chalk       = require('chalk'),
    sourcemaps  = require('gulp-sourcemaps');

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

gulp.task('connect', function() {
  connect.server({
    port: 8001,
    host: '172.16.17.40',
    root: 'dev',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
});

gulp.task('default', ['less', 'connect'], function () {

    gulp.watch('./dev/**/*.less', ['less']);
    gulp.watch(['./dev/*.html'], ['html']);
});
