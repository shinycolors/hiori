const gulp = require('gulp')
const seq = require('gulp-sequence')
const clean = require('gulp-clean')
const wait = require('gulp-wait')
const webpack = require('webpack-stream')

// Clean
gulp.task('clean', function() {
	return gulp.src('build/dist/**/*', {read: false})
		.pipe(wait(100))
		.pipe(clean({force: true}))
})

// Static files
gulp.task('static', function(done){
	seq(['static:manifest', 'static:img'])(done)
})
gulp.task('static:manifest', function() {
	return gulp.src('src/manifest.json').pipe(gulp.dest('build/dist/'))
})
gulp.task('static:img', function() {
	return gulp.src('src/img/**/*') .pipe(gulp.dest('build/dist/img'))
})

// Webpack
gulp.task('compile', function(done){
	seq(['compile:background'])(done)
})
gulp.task('compile:background', function() {
	return gulp.src('src/background.js')
	  .pipe(webpack(require('./build/config/webpack.background.js')))
	  .pipe(gulp.dest('build/dist'))
})

// Watch
gulp.task('watch', function() {
	gulp.watch('src/**/*', ['compile'])
})

// Public (npm scripts)
gulp.task('build', seq('clean', ['static', 'compile']))
gulp.task('dev', seq('build', 'watch'))
gulp.task('dist', seq('build', 'zip'))
