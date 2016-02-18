var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var spritesmith = require('gulp.spritesmith');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var mainBowerFiles = require('main-bower-files');
var exec = require('child_process').exec;
var merge = require('merge-stream');
var es = require('event-stream');
var cssBase64 = require('gulp-css-base64');
var base64 = require('gulp-base64');

var devdir = './dev'
var cssdir = './css';
var jsdir = './js';
var imgdir = './img';

gulp.task('default', function(){

    console.log('default gulp task...')

});

gulp.task('vendor', function() {
  var jsStream = gulp.src(mainBowerFiles('**/*.js'))
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(jsdir));

  var cssFiles = gulp.src(mainBowerFiles('**/*.css'));
  var scssFiles = gulp.src(mainBowerFiles('**/*.scss'))
    .pipe(sass());

  var styleStream = es.concat(scssFiles, cssFiles)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(cssdir));

  var fontStream = gulp.src(mainBowerFiles('**/*.{ttf,woff,woff2,eof,svg}'))
    .pipe(gulp.dest(cssdir + '/fonts'));
  var imgStream = gulp.src(mainBowerFiles('**/*.{png,jpg,gif}'))
    .pipe(gulp.dest(cssdir));

  return merge(styleStream, fontStream, imgStream);
})

gulp.task('js', function () {
  gulp.src(devdir + '/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('fail'))
    .pipe(concat('script.js'))
    .pipe(gulp.dest(jsdir));

});
gulp.task('sass', function () {
  var stream = gulp.src(devdir + '/scss/*.scss')
    .pipe(sass())
    .pipe(base64({
      baseDir: './',
      extensions: ['png', 'jpg', 'svg'],
      maxImageSize: 10*1024*1024, // bytes
    }))
    .pipe(gulp.dest(cssdir))
    .pipe(livereload());
  return stream;
});

gulp.task('img', function() {
  gulp.src(devdir + '/img/*.{png,jpg,gif}')
    .pipe(imagemin({
      optimizationLevel: 7,
      progressive: true
    }))
    .pipe(gulp.dest(imgdir))
});

gulp.task('copyfonts', function() {
   gulp.src(devdir + '/fonts/**/*.{ttf,woff,woff2,eof,svg,eot}')
   .pipe(gulp.dest(cssdir + '/typo'));
});
gulp.task('copyimages', function() {
    gulp.src(devdir + '/img/*.{png,jpg,gif,svg}')
    .pipe(gulp.dest('./img'));
})
gulp.task('copyfiles', ['copyfonts', 'copyimages'])

gulp.task('sprite', function () {
  var spriteData = gulp.src(devdir + '/img/sprite/*.png').pipe(spritesmith({
    retinaSrcFilter: [devdir + '/img/sprite/*@2x.png'],
    imgName: '../img/sprite.png',
    retinaImgName: '../img/sprite@2x.png',
    cssName: 'sprite.css',
    padding: 2
  }));
  var imgStream = spriteData.img
    .pipe(gulp.dest(imgdir));

  var cssStream = spriteData.css
    .pipe(gulp.dest(cssdir));

  return merge(imgStream, cssStream);
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(devdir + '/scss/*.scss', ['sass']);
  gulp.watch(devdir + '/js/*.js', ['js']);
  gulp.watch(devdir + '/img/*.{png,jpg,gif}', ['sass']);
  // gulp.watch(devdir + '/img/*.{png,jpg,gif}', ['img']);
});

gulp.task('default', ['js', 'sass', 'vendor', 'copyfiles', 'watch']);

gulp.task('pushdb', function(cb) {
  exec('wordmove push -de staging', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  })
})

gulp.task('pushall', function(cb) {
  exec('wordmove push -tpude staging', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  })
})

gulp.task('pulldb', function(cb) {
  exec('wordmove pull -de staging', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  })
})

gulp.task('pullall', function(cb) {
  exec('wordmove pull -ae staging', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  })
})

gulp.task('deploy', ['sass', 'js', 'vendor', 'pushall'])
