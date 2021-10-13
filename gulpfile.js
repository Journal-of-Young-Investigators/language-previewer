/* Load gulp and plugins. */
const gulp = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const cleanCss = require("gulp-clean-css");

/* Gulp task to pack js files. */
gulp.task("pack-js", () => {
    return gulp.src("build/static/**/*.js")
        .pipe(concat("bundle.js"))
        .pipe(terser())
        .pipe(gulp.dest("build/prod/"));
});

/* Gulp task to pack css files. */
gulp.task("pack-css", () => {
    return gulp.src("build/static/**/*.css")
        .pipe(concat("stylesheet.css"))
        .pipe(cleanCss())
        .pipe(gulp.dest("build/prod/"));
});

gulp.task("default", gulp.parallel("pack-js", "pack-css"));