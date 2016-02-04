var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');


var paths = {
  sass: ['./scss/**/*.scss'],
  templates: ['./www/**/*.html'],
  dist: ['./www/dist']
};

gulp.task('min', function () {
  return gulp.src('./www/js/**/*.js')
    .pipe(ngAnnotate())
    .pipe(gulp.dest('dist'));
});

gulp.task('compress', function() {
  return gulp.src('./dist/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./www/dist'));
});
gulp.task('compresslib', function() {
  return gulp.src('./www/lib/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./www/dist'));
});






