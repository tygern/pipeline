(function () {
    'use strict';

    var gulp = require('gulp'),
        sass = require('gulp-sass'),
        tsProject = require('./tsconfig.json'),
        ts = require('gulp-typescript'),
        wiredep = require('wiredep').stream,
        del = require('del');

    gulp.task('default', function () {
        console.log('Hello world');
    });

    gulp.task('style', function () {
        return gulp.src('app/style/app.scss')
            .pipe(sass())
            .pipe(gulp.dest('dist/style'));
    });

    gulp.task('markup', function () {
        return gulp.src('app/index.html')
            .pipe(wiredep({}))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('scripts', function () {
        return gulp.src(['typings/tsd.d.ts', 'app/**/*.ts'])
            .pipe(ts(tsProject))
            .pipe(gulp.dest('dist/scripts'));
    });

    gulp.task('clean', function () {
        return del(['dist']);
    });

    gulp.task('build', ['clean', 'style', 'markup', 'scripts']);

    gulp.task('watch', ['build'], function () {
        gulp.watch('app/**/*.scss', ['style']);
        gulp.watch('app/index.html', ['markup']);
        gulp.watch('app/**/*.ts', ['scripts']);
    });
})();
