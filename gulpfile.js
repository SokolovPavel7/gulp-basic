const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));
const server = require('gulp-server-livereload');
const clean = require('gulp-clean');
const fs = require('fs');

gulp.task('html', () => {
    return gulp
        .src('./src/*.html')
        .pipe(
            fileInclude({
                prefix: '@@',
                basepath: '@file',
            })
        )
        .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', () => {
    return gulp
        .src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('images', () => {
    return gulp.src('./src/img/**/*').pipe(gulp.dest('./dist/img/'));
});

gulp.task('server', () => {
    return gulp.src('./dist/').pipe(
        server({
            livereload: true,
            open: true,
        })
    );
});

gulp.task('clean', (done) => {
    if (fs.existsSync('./dist/')) {
        return gulp
            .src('./dist/', { read: false })
            .pipe(clean({ force: true }));
    }
    done();
});

gulp.task('watch', () => {
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('sass'));
    gulp.watch('./src/**/*.html', gulp.parallel('html'));
    gulp.watch('./src/img/**/*', gulp.parallel('images'));
});

gulp.task(
    'default',
    gulp.series(
        'clean',
        gulp.parallel('html', 'sass', 'images'),
        gulp.parallel('server', 'watch')
    )
);
