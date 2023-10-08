const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sass = require('gulp-sass')(require('sass'));

gulp.task('includeFiles', () => {
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
    return gulp.src('./src/scss/*.scss').pipe(sass()).pipe(gulp.dest('./dist/css/'));
});
