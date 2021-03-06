'use strict'

/* ----GULP REQUIREMENTS---- */

var gulp = require('gulp')
var sass = require('gulp-sass')
var browserSync = require('browser-sync')
var maps = require('gulp-sourcemaps')
var del = require('del')
var rename = require('gulp-rename')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var autoprefixer = require('gulp-autoprefixer')
var ghPages = require('gulp-gh-pages')

/* ----DEVELOPMENT TASKS---- */

// Compile Sass to CSS
gulp.task('compileSass', function () {
  return gulp.src('app/scss/main.scss')
  .pipe(maps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('app'))
  .pipe(browserSync.stream())
})

// Combine all local JavaScript files into app.js
gulp.task('concatScripts', function () {
  return gulp.src([
    'app/calculist2.module.js',
    'app/data/database.service.js',
    'app/calculator/calculator.controller.js',
    'app/list/list.controller.js'
  ])
  .pipe(maps.init())
  .pipe(concat('app.js'))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('app'))
})

gulp.task('minifyScripts', ['concatScripts'], function () {
  return gulp.src('app/app.js')
  .pipe(uglify())
  .pipe(rename('app.min.js'))
  .pipe(gulp.dest('app'))
  .pipe(browserSync.reload({ stream: true }))
})

gulp.task('runBrowserSync', ['minifyScripts', 'compileSass'], function () {
  browserSync({ server: 'app/' })
})

// Serve the page up with BrowserSync and watch the Sass and HTML for changes
gulp.task('serve', ['runBrowserSync'], function () {
  gulp.watch('app/scss/**/*', ['compileSass'])
  gulp.watch('app/**/*.js').on('change', browserSync.reload)
  gulp.watch('app/index.html').on('change', browserSync.reload)
})

/* ----BUILD TASKS---- */

// Clean task to clear build files
gulp.task('clean', function () {
  return del(['dist'])
})

// Build task to get files ready for production
gulp.task('build', ['clean', 'minifyScripts', 'compileSass'], function () {
  gulp.src(['app/main.css', 'app/app.js', 'app/index.html'])
  .pipe(gulp.dest('dist'))
  browserSync({ server: './dist' })
})

gulp.task('deploy', function () {
  gulp.src('./dist/**/*')
  .pipe(ghPages())
})

// Default gulp task
gulp.task('default', ['build'], function () {
  console.log('All tasks complete!')
})
