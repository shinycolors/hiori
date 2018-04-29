const gulp = require('gulp')
const seq = require('gulp-sequence')
const clean = require('gulp-clean')
const wait = require('gulp-wait')
const zip = require('gulp-zip')
const jsonModify = require('gulp-json-modify')
const webpack = require('webpack-stream')
const packageJson = require('./package.json')

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
	return gulp.src('src/manifest.json')
		.pipe(jsonModify({ key: 'name', value: packageJson.name }))
		.pipe(jsonModify({ key: 'short_name', value: packageJson.short_name }))
		.pipe(jsonModify({ key: 'version', value: packageJson.version }))
		.pipe(jsonModify({ key: 'description', value: packageJson.description }))
		.pipe(gulp.dest('build/dist'))
})
gulp.task('static:img', function() {
	return gulp.src('src/img/**/*') .pipe(gulp.dest('build/dist/img'))
})

// Webpack
gulp.task('compile', function(done){
	seq(['compile:background', 'compile:content', 'compile:injects'])(done)
})
gulp.task('compile:background', function() {
	return gulp.src('src/entry/background.js')
	  .pipe(webpack(require('./build/config/webpack.background.js')))
	  .pipe(gulp.dest('build/dist'))
})
gulp.task('compile:content', function() {
	return gulp.src('src/entry/content.js')
	  .pipe(webpack(require('./build/config/webpack.content.js')))
	  .pipe(gulp.dest('build/dist'))
})
gulp.task('compile:injects', function() {
	return gulp.src('src/entry/injects.js')
	  .pipe(webpack(require('./build/config/webpack.injects.js')))
	  .pipe(gulp.dest('build/dist'))
})

// Zip
gulp.task('zip', function() {
  return gulp.src('build/dist/*')
    .pipe(zip('release.zip'))
    .pipe(gulp.dest('build'))
})

// Watch
gulp.task('watch', function() {
	gulp.watch('src/**/*', ['static', 'compile'])
})

// Public (npm scripts)
gulp.task('build', seq('clean', ['static', 'compile']))
gulp.task('dev', seq('build', 'watch'))
gulp.task('dist', seq('build', 'zip'))
