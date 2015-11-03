'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var rimraf = require('gulp-rimraf');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var jade = require('gulp-jade');


var Server = require('karma').Server;



gulp.task('serve', function() {
  connect.server({
    root: 'build',
    port: 8080,
    livereload: true
  });
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
  var YOUR_LOCALS = {};

  gulp.src('./src/**/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }).on('error', errorHandler))
    .pipe(gulp.dest('build'))
});
gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/test/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*.scss', ['sass']);
  gulp.watch('./src/**/*.js', ['scripts']);
  gulp.watch('./src/**/*.spec.js', ['test']);
});

gulp.task('default', ['clean', 'serve', 'sass', 'scripts', 'vendor', 'templates', 'watch']);


// Handle the error
function errorHandler (error) {
  console.log('my error', error.message);
  this.emit('end');
}
