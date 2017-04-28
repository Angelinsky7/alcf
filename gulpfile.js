var gulp = require('gulp'),
    sass = require('gulp-sass'),
    util = require("gulp-util"),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    sassdoc = require('sassdoc'),
    log = util.log;
var browserSync = require('browser-sync').create();

gulp.task('styles', function() {
    gulp.src('./test/test.scss', { base: './' })
        .pipe(sourcemaps.init())
        .pipe(sass({ includePaths: ['node_modules/'] }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('build', function() {
    gulp.src('./alcf-flex.scss', { base: './' })
        .pipe(sass({ includePaths: ['node_modules/'] }).on('error', sass.logError))
        .pipe(rename(function(path) {
            path.dirname += '/css/';
        }))
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(gulp.dest('./'))
        .pipe(rename(function(path) {
            // path.dirname += '/css/';
            path.basename += '.min';
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('./'));
});

gulp.task('serve', ['styles'], function() {

    browserSync.init({
        server: {
            baseDir: "./test"
        }
    });

    gulp.watch("**/*.html").on('change', browserSync.reload);
    gulp.watch("**/*.scss", ['styles']);
});