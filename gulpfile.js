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

  //browser-sync
  browserSync = require('browser-sync').create(),
  ghPages = require('gulp-gh-pages');

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

  return gulp.src(folder.src + 'SASS/master.scss')
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

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});


// run all tasks
gulp.task('run', ['html', 'css', 'js', 'browser-sync']);

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

  //browserSync reload
  gulp.watch("app/*.html").on('change', browserSync.reload);

});


// default task
gulp.task('default', ['run', 'watch']);
