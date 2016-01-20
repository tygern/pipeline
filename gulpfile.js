(function () {
    'use strict';

    var gulp = require('gulp');
    var sass = require('gulp-sass');

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
            .pipe(gulp.dest('dist'));
    });

    gulp.task('watch', ['style', 'markup'], function () {
        gulp.watch('app/**/*.scss', ['style']);
        gulp.watch('app/index.html', ['markup']);
    });
})();
