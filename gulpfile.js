const gulp = require('gulp');
const sass = require('gulp-sass');
const path = require('path');
const merge = require('merge-stream');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const source = require('vinyl-source-stream');
const rename = require('gulp-rename');
const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const babel = require('babelify');

const themeSrc = './themes/terminal/src';
const themeDest = './themes/terminal/static';

function compile(watch) {
    console.log('bundling JS');
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
    const vendor = gulp.src([
        './node_modules/prismjs/themes/prism.css']
    );

    const app = gulp.src(path.join(themeSrc, 'styles/main.scss'))
        .pipe(sass().on('error', sass.logError));

    return merge(app, vendor)
        .pipe(concat('style.css'))
        //.pipe(rename('style.css'))
        .pipe(gulp.dest(path.join(themeDest, 'css')));
});

gulp.task('watch', function () {
    gulp.watch(path.join(themeSrc, 'styles/*.scss'), ['sass']);
    gulp.watch(path.join(themeSrc, 'scripts/*.js'), compile(true));
});