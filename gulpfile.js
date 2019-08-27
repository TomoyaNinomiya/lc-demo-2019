const gulp = require('gulp')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const pug = require('gulp-pug')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const minifyCSS = require('gulp-csso')
const sourcemaps = require('gulp-sourcemaps')
const browserify = require('browserify')
const babelify = require('babelify')
const browserSync = require('browser-sync').create()
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const del = require('del')


const siteDirectory = '';

const paths = {
  src      : 'dev_src/',
  srcSass  : 'dev_src/scss/',
  srcPug   : 'dev_src/pug/',
  srcJs    : 'dev_src/js/',
  srcFileDir: 'dev_src/files/',
  srcFile  : 'dev_src/files/**/*.+(gif|svg|jpg|png|json|csv|pdf|ics|zip|eot|ttf|otf|woff|doc|woff2|mp4|json)',
  dist     : 'dist/' + siteDirectory,
  distCss  : 'dist/assets/' + siteDirectory + 'css/',
  distJs  : 'dist/assets/' + siteDirectory + 'js/'
};

gulp.task('pug', function () {
  return gulp.src(paths.srcPug + '**/[^_]*.pug')
    .pipe(plumber({errorHandler: notify.onError({
        message: "<%= error.message %>",
        title: "Template compilation"
      })}))
    .pipe(pug({
      basedir: '.',
      pretty: true
    }))
    .pipe(gulp.dest(paths.dist))
    .pipe(browserSync.stream())
}) 

gulp.task('scss', function(){
  return gulp.src(paths.srcSass + '**/*.scss')
    .pipe(plumber({errorHandler: notify.onError({
        message: "<%= error.message %>",
        title: "CSS preprocessing"
      })}))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer({grid: true})]))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.distCss))
    .pipe(browserSync.stream({match: '**/*.css'}))
})

gulp.task('js', () => {
  return browserify({
    entries: [paths.srcJs + 'common.js'],
    debug: true
  })
    .transform(babelify.configure({presets: [
      ["@babel/preset-env",
        {
          "targets": { "ie": 11 },
          useBuiltIns: "usage",
          corejs: 3
        }
      ],
    ], sourceMapsAbsolute: true}))
    .on('error', notify.onError({
        message: "<%= error.message %>",
        title: "Babelify JS"
      }))
    .bundle()
    .on('error', notify.onError({
        message: "<%= error.message %>",
        title: "JS compilation"
      }))
    .pipe(source('common.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.distJs))
    .pipe(browserSync.stream())
})

gulp.task('js:lib', function () {
  return gulp.src([
      paths.srcJs + 'lib/*.js'
  ])
    .pipe(plumber({errorHandler: notify.onError({
      message: "<%= error.message %>",
      title: "CSS preprocessing"
    })}))
    .pipe(uglify())
    .pipe(concat('lib.js'))
    .pipe(gulp.dest(paths.distJs));
});

gulp.task('file:copy', function() {
  return gulp.src(paths.srcFile)
    .pipe(gulp.dest(paths.dist))
})

gulp.task('clean', (done) => {
  del(paths.dist + '**/*');
  done();
});

gulp.task('serve', function(done) {

    browserSync.init({
      server: {
        baseDir: paths.dist
      },
      open: false,
      port: 3000,
      reloadOnRestart: true
    })

    let watcher = {
      scss : gulp.watch(paths.srcSass + '**/*.scss'),
      js : gulp.watch(paths.srcJs + '**/*.js'),
      pug : gulp.watch(paths.srcPug + '**/*.pug'),
      file : gulp.watch(paths.srcFile),
    }

    watcher.scss.on('all', gulp.parallel('scss'))
    watcher.js.on('all', gulp.parallel('js'))
    watcher.pug.on('all', gulp.parallel('pug'))
    watcher.file.on('all', gulp.series('file:copy', browserSync.reload))

    done()
})

gulp.task('build', gulp.series(
  'clean',
  'js', 
  'js:lib', 
  'scss',
  'pug',
  'file:copy'
))

gulp.task('default', gulp.series('build', 'serve'))