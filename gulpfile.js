'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rimraf = require('gulp-rimraf');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var jade = require('gulp-jade');
var nodemon = require('gulp-nodemon');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

var Server = require('karma').Server;

gulp.task('serve', function() {
  nodemon({
    script: 'app.js',
    ext: 'js html'
  })
});

gulp.task('sass', function () {
  gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', errorHandler))
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return gulp.src('build', {read: false})
    .pipe(rimraf().on('error', errorHandler));
});

gulp.task('jshint', function () {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
});

gulp.task('scripts', function() {
  return browserify({ entries: ['./src/main.js'] })
    .bundle()
    .pipe(source('app.js').on('error', errorHandler))
    .pipe(gulp.dest('build'));
});

gulp.task('vendor', function() {
  return browserify({ entries: ['./src/vendor.js'] })
    .bundle()
    .pipe(source('vendor.js').on('error', errorHandler))
    .pipe(gulp.dest('build'));
});

gulp.task('templates', function() {
  gulp.src('src/**/*.jade')
    .pipe(jade().on('error', errorHandler))
    .pipe(gulp.dest('build'))
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.scss', ['sass']);
  gulp.watch('src/**/*.js', ['scripts']);
  gulp.watch('src/**/*.jade', ['templates']);
  gulp.watch('src/**/*.spec.js', ['test']);
});

gulp.task('default', function () {
  runSequence(
    'clean',
    ['serve', 'sass', 'jshint', 'scripts', 'vendor', 'templates', 'watch']
  );
});
gulp.task('build', function () {
  runSequence(
    'clean',
    ['sass', 'scripts', 'vendor', 'templates']
  );
});

// Handle the error
function errorHandler (error) {
  console.log('my error', error.message);
  this.emit('end');
}
