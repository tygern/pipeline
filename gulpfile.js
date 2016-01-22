(function () {
    'use strict';

    var gulp = require('gulp'),
        sass = require('gulp-sass'),
        tsProject = require('./tsconfig.json')['compilerOptions'],
        ts = require('gulp-typescript'),
        concat = require('gulp-concat'),
        sourcemaps = require('gulp-sourcemaps'),
        browserSync = require('browser-sync'),
        wiredep = require('wiredep'),
        del = require('del');

    gulp.task('default', function () {
        console.log('Hello world');
    });

    gulp.task('style', function (done) {
        gulp.src('app/style/app.scss')
            .pipe(sass())
            .pipe(gulp.dest('dist/style'));
        done();
    });

    gulp.task('markup', function () {
        return gulp.src('app/index.html')
            .pipe(wiredep.stream({
                fileTypes: {
                    html: {
                        replace: {
                            js: function (filePath) {
                                return '<script src="' + 'vendor/' + filePath.split('/').pop() + '"></script>';
                            },
                            css: function (filePath) {
                                return '<link rel="stylesheet" href="' + 'vendor/' + filePath.split('/').pop() + '"/>';
                            }
                        }
                    }
                }
            }))
            .pipe(gulp.dest('dist'));
    });

    gulp.task('scripts', function () {
        return gulp.src(['typings/tsd.d.ts', 'app/**/*.ts'])
            .pipe(ts(tsProject))
            .pipe(concat('app.js'))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('dist/scripts'));
    });

    gulp.task('vendorScripts', function () {
        return gulp.src(wiredep().js)
            .pipe(gulp.dest('dist/vendor'));
    });

    gulp.task('clean', function (done) {
        del(['dist']);
        done();
    });

    gulp.task('build', ['clean', 'markup', 'vendorScripts', 'scripts', 'style']);

    gulp.task('watch', ['build'], function () {
        gulp.watch('app/**/*.scss', ['style']);
        gulp.watch('app/index.html', ['markup']);
        gulp.watch('app/**/*.ts', ['scripts']);
    });

    gulp.task('serve', ['build'], function () {
        browserSync.instance = browserSync.init('dist/**/*', {
            startPath: '/', server: {baseDir: 'dist'}
        });
    });

})();
