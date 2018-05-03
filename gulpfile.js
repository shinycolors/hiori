const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const seq = require('gulp-sequence')
const clean = require('gulp-clean')
const wait = require('gulp-wait')
const zip = require('gulp-zip')
const jsonModify = require('gulp-json-modify')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const packageJson = require('./package.json')

const BROWSER = process.env.BROWSER || 'chrome'
const TARGET_DIR = path.join('build/dist', BROWSER)

// Clean
gulp.task('clean', function() {
	return gulp.src(TARGET_DIR + '/**/*', {read: false})
		.pipe(wait(100))
		.pipe(clean({force: true}))
})

// Static files
gulp.task('static', function(done){
	seq(['static:manifest', 'static:html', 'static:img'])(done)
})
gulp.task('static:manifest', function() {
	return gulp.src('src/manifest.json')
		.pipe(jsonModify({ key: 'name', value: packageJson.name }))
		.pipe(jsonModify({ key: 'short_name', value: packageJson.short_name }))
		.pipe(jsonModify({ key: 'version', value: packageJson.version }))
		.pipe(jsonModify({ key: 'description', value: packageJson.description }))
		.pipe(gulp.dest(TARGET_DIR))
})
gulp.task('static:html', function() {
	return gulp.src('src/html/**/*') .pipe(gulp.dest(path.join(TARGET_DIR, 'html')))
})
gulp.task('static:img', function() {
	return gulp.src('src/img/**/*') .pipe(gulp.dest(path.join(TARGET_DIR, 'img')))
})

// Webpack
gulp.task('compile', function(done){
	seq(['compile:background', 'compile:content', 'compile:injects', 'compile:options'])(done)
})
gulp.task('compile:background', function() {
	return gulp.src('src/entry/background.js')
	  .pipe(webpackStream(require('./build/config/webpack.background.js'), webpack))
	  .pipe(gulp.dest(TARGET_DIR))
})
gulp.task('compile:content', function() {
	return gulp.src('src/entry/content.js')
	  .pipe(webpackStream(require('./build/config/webpack.content.js'), webpack))
	  .pipe(gulp.dest(TARGET_DIR))
})
gulp.task('compile:injects', function() {
	return gulp.src('src/entry/injects.js')
	  .pipe(webpackStream(require('./build/config/webpack.injects.js'), webpack))
	  .pipe(gulp.dest(TARGET_DIR))
})
gulp.task('compile:options', function() {
	return gulp.src('src/entry/options.js')
	  .pipe(webpackStream(require('./build/config/webpack.options.js'), webpack))
	  .pipe(gulp.dest(TARGET_DIR))
})

// Zip
gulp.task('zip', function() {
  return gulp.src(TARGET_DIR + '/**/*')
    .pipe(zip(BROWSER + '.zip'))
    .pipe(gulp.dest(path.join(TARGET_DIR, '../')))
})

// Watch
gulp.task('watch', function() {
	gulp.watch('src/**/*', ['static', 'compile'])
})

// Check for missing image files
gulp.task('check:img', function(done) {
  let lang = process.env.LANG || 'en'
	let missing = (`
    4de32a008aefb569637d432ae95156ad0104980ae1403a23f017627048fb8e83
    1cfd99a1195e7a17f22770a6519ca2bcd3f1905e0a118c1c759146deb095cd4e
    2fa2b2795e0570696c643977c9967235c45b9a5dcd751a4c1ad770e615ac2bf9
    3bc7c9607ecfa3cf2d74c158a6a1a1262205f98d4ae28725136b9b945186a094
    5f0c85ed6735bf9037f64ff5b75fa3305779c7a7746e2c7523389510ba2c8ed5
    180a7c4bb89fe4df75bde5068cfc653c8faec22902ff57ad265455c965f624f3
    1492f0294487db749f3e371e293240daf049da31e2f6bfa7cf49f937a747c6d5
    a9a9758ab0bd21f1e9e3a01f035a7e1021eec1c6b1fbca0944848acdaaa03f35
    a5780581d35525729e3fbf6820cf9efaaffcc5e9757c80cd184b6e86b6451afd
    b310c3ebb4f05abe049050323c73c1d611ee4344344a520d02f0c2cb43ee3b87
    ecf1ec89c6203708afee86b137d3d098710b56277cd183102e2a1ed6238ae8cc
    fb1b59e5b237ea115975e6d17adfdebe8d739658292839bdf722201924bfeb48
    380326a29d35f0bd8968cf36916290c37f6aa380729c262121f0813e9107b4a7
    8b052ad74264a62ee32638e179c744ab883e6ae0cb68bc700d90353e810bc6d3
    9b416ccb81b7b2e21e813caa90276caeed19af4232b7efed7c0fcf98a773043f
    65a6c73e9cfb25193ae7026388f3d93f84889466ee5b806cbd4edb8ff390c679
    9e80bb5ef0fd4b7c34eaba4b344155b6730c2119cb3fd8cde7078c68a988cfdc
    52a5cd4af5594ed3d88f43dd6a63fd7c1deba77bab92abdd6d4d2d3311e7d366
    5cf3bc98d3e21722c700c725075520aa0dd2de492ade5eb323d1140c8cdf1b9e
    65d1200d2678a621f34c6300d4f4bb69ee35248911e08226f4d47fde8e7d7074
    523a5a3203a181ab135be20c520b2ee645d8474f79f00d368e7cffb4adcb7ebd
  `).split('\n')
    .map(v => v.trim())
    .filter(v => !!v)
    .filter(v => {
      return !fs.existsSync(path.resolve(path.join(process.cwd(), 'src/modules/replacer/ui', lang, v + '.png')))
    })
    .forEach(v => { console.log(v) })
  done()
})

// Public (npm scripts)
gulp.task('build', seq('clean', ['static', 'compile']))
gulp.task('dev', seq('build', 'watch'))
gulp.task('dist', seq('build', 'zip'))
