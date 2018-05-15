// Gulp.js configuration
const
  // modules
  gulp = require('gulp'),
  newer = require('gulp-newer'),
  smushit = require('gulp-smushit'),
  htmlclean = require('gulp-htmlclean'),

  // JavaScript plugins
  concat = require('gulp-concat'),
  deporder = require('gulp-deporder'),
  stripdebug = require('gulp-strip-debug'),
  uglify = require('gulp-uglify'),

  // css plugins
  sass = require('gulp-sass'),
  postcss = require('gulp-postcss'),
//   assets = require('postcss-assets'),
  autoprefixer = require('autoprefixer'),
  mqpacker = require('css-mqpacker'),
  cssnano = require('cssnano'),
  csscomb = require('gulp-csscomb'),

  //gulp deploy to github pages
  ghPages = require('gulp-gh-pages'),

	//server for reload and serve
  nodemon = require('gulp-nodemon'),
  jshint = require('gulp-jshint'),
  browserSync = require('browser-sync').create();


  // folders
  folder = {
    src: 'app/'
  }

  folder.build = 'app/';

gulp.task('build', function () {
    return folder.build = 'dist/';
})

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: './app'
      }
  });
});

// image processing
gulp.task('images', function () {
  let out = folder.build + 'images';
  return gulp.src(folder.src + 'images/**/*.+(png|jpg|gif|svg)')
    .pipe(newer(out))
    .pipe(smushit({
		 verbose: true
	 }))
    .pipe(gulp.dest(out));
});

gulp.task('deploy', function() {
  return gulp.src(folder.build + '**/*')
    .pipe(ghPages());
});

// HTML processing
gulp.task('html', function() {
  var
    out = folder.build,
    page = gulp.src(folder.src + '**/*.html')
      .pipe(newer(out));

  // minify production code
  if (folder.build === 'dist/') {
    page = page.pipe(htmlclean());
  }

  return page.pipe(gulp.dest(out));
});

/**
 * for angular app this will not be effective
 */

// JavaScript processing
gulp.task('js', function() {

  var jsbuild = gulp.src(folder.src + '/**/*.js')
    .pipe(deporder());

  if (folder.build === 'dist/') {
    jsbuild = jsbuild
      .pipe(stripdebug());
  }

  return jsbuild.pipe(gulp.dest(folder.build));

});

// CSS processing
gulp.task('css', function() {

  var postCssOpts = [
//   assets({ loadPaths: ['images/'] }),
  autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
  mqpacker
  ];

  if (folder.build === 'dist/') {
    postCssOpts.push(cssnano);
  }

  return gulp.src(folder.src + 'scss/*.scss')
    .pipe(sass({
      outputStyle: 'nested',
      imagePath: 'images/',
      precision: 3,
      errLogToConsole: true
    }))
	 .pipe(csscomb())
    .pipe(postcss(postCssOpts))
    .pipe(gulp.dest(folder.build + 'styles/'));

});

gulp.task('lint', function () {
  gulp.src('./**/*.js')
    .pipe(jshint())
})

// gulp.task('develop', function () {
//   var stream = nodemon({
// 	  script: 'server.js',
// 	  ext: 'html js',
// 	  ignore: ['ignored.js'],
// 	  tasks: ['lint']
//   })

//   stream
//       .on('restart', function () {
//         console.log('restarted!')
//       })
//       .on('crash', function() {
//         console.error('Application has crashed!\n')
//          stream.emit('restart', 10)  // restart the server in 10 seconds
//       })
// })

// run all tasks
gulp.task('run', [ 'build', 'html', 'css', 'js']);

// watch for changes
gulp.task('watch', function() {

  // image changes
  gulp.watch(folder.src + 'images/**/*.+(png|jpg|gif|svg)', ['images']);

  // html changes
  gulp.watch(folder.src + '**/*.html', ['html']);

  // javascript changes
  gulp.watch(folder.src + '**/*.js', ['lint']);

  // css changes
  gulp.watch(folder.src + 'scss/**/*.scss', ['css']);

});


// default task
gulp.task('default', ['watch', 'browser-sync']);