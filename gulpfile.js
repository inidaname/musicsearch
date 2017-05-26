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
  assets = require('postcss-assets'),
  autoprefixer = require('autoprefixer'),
  mqpacker = require('css-mqpacker'),
  cssnano = require('cssnano'),
  csscomb = require('gulp-csscomb'),

  //gulp deploy to github pages
  ghPages = require('gulp-gh-pages'),

	//server for reload and serve
  nodemon = require('gulp-nodemon'),
  jshint = require('gulp-jshint');

  // development mode?
  devBuild = (process.env.NODE_ENV !== 'production'),

  // folders
  folder = {
    src: 'devTools/',
    build: 'app/'
  }
;

// image processing
gulp.task('images', () => {
  let out = folder.build + 'images/';
  return gulp.src(folder.src + 'images/**/*')
    .pipe(newer(out))
    .pipe(smushit({
		 verbose: true
	 }))
    .pipe(gulp.dest(out));
});

gulp.task('deploy', function() {
  return gulp.src('app/**/*')
    .pipe(ghPages());
});

// HTML processing
gulp.task('html', ['images'], function() {
  var
    out = folder.build + 'html/',
    page = gulp.src(folder.src + 'html/**/*')
      .pipe(newer(out));

  // minify production code
  if (!devBuild) {
    page = page.pipe(htmlclean());
  }

  return page.pipe(gulp.dest(out));
});

// JavaScript processing
gulp.task('js', function() {

  var jsbuild = gulp.src(folder.src + 'coffee/**/*')
    .pipe(deporder())
    .pipe(concat('main.js'));

  if (!devBuild) {
    jsbuild = jsbuild
      .pipe(stripdebug())
      .pipe(uglify());
  }

  return jsbuild.pipe(gulp.dest(folder.build + 'js/'));

});

// CSS processing
gulp.task('css', ['images'], function() {

  var postCssOpts = [
  assets({ loadPaths: ['images/'] }),
  autoprefixer({ browsers: ['last 2 versions', '> 2%'] }),
  mqpacker
  ];

  if (!devBuild) {
    postCssOpts.push(cssnano);
  }

  return gulp.src(folder.src + 'SASS/*.scss')
    .pipe(sass({
      outputStyle: 'nested',
      imagePath: 'images/',
      precision: 3,
      errLogToConsole: true
    }))
	 .pipe(csscomb())
    .pipe(postcss(postCssOpts))
    .pipe(gulp.dest(folder.build + 'css/'));

});

gulp.task('lint', function () {
  gulp.src('./**/*.js')
    .pipe(jshint())
})

gulp.task('develop', function () {
  var stream = nodemon({
	  script: 'server.js',
	  ext: 'html js',
	  ignore: ['ignored.js'],
	  tasks: ['lint']
  })

  stream
      .on('restart', function () {
        console.log('restarted!')
      })
      .on('crash', function() {
        console.error('Application has crashed!\n')
         stream.emit('restart', 10)  // restart the server in 10 seconds
      })
})

// run all tasks
gulp.task('run', ['html', 'css', 'js', 'develop']);

// watch for changes
gulp.task('watch', function() {

  // image changes
  gulp.watch(folder.src + 'images/**/*', ['images']);

  // html changes
  gulp.watch(folder.src + 'html/**/*', ['html']);

  // javascript changes
  gulp.watch(folder.src + 'coffee/**/*', ['js']);

  // css changes
  gulp.watch(folder.src + 'SASS/**/*', ['css']);

});


// default task
gulp.task('default', ['run', 'watch']);
