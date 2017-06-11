const gulp = require('gulp');
const sass = require('gulp-sass');
const path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babel = require('babelify');

const themeSrc = './themes/terminal/src';
const themeDest = './themes/terminal/static';

function compile(watch) {
    var bundler = browserify(path.join(__dirname, themeSrc, 'scripts/main.js'), { debug: true }).transform(babel);

    function rebundle() {
        bundler.bundle()
            .on('error', function(err) { console.error(err); this.emit('end'); })
            .pipe(source('script.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(path.join(themeDest, 'js')));
    }

    if (watch) {
        bundler.on('update', function() {
            console.log('-> bundling...');
            rebundle();
        });
    }

    rebundle();
}

gulp.task('build', function() { return compile(); });

gulp.task('sass', function () {
    return gulp.src(path.join(themeSrc, 'styles/main.scss'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.join(themeDest, 'css')));
});

gulp.task('sass:watch', function () {
    gulp.watch(path.join(themeSrc, 'styles/*.scss'), ['sass']);
    gulp.watch(path.join(themeSrc, 'scripts/*.js'), ['babel']);
});