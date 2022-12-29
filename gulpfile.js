const { src, dest, watch, parallel, series } = require('gulp');

const browserSync = require('browser-sync').create();
const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');
const nunjucksRender = require('gulp-nunjucks-render');

const renderHtml = () => {
  nunjucksRender.nunjucks.configure({
    watch: false,
  });

  return src('app/**/[^_]*.html')
    .pipe(nunjucksRender({
      path: ['app/']
    }))
    .pipe(dest('build/'))
    .pipe(browserSync.stream())
}

const styles = minify => {
  return src('app/scss/[^_]*.scss')
    .pipe(scss({ outputStyle: `${minify}` }))
    .pipe(autoprefixer({
      overrideBrowsersList: ['last 10 versions']
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
};

const stylesDev = () => {
  return styles('expanded');
};

const stylesProd = () => {
  return styles('compressed');
};

const scripts = () => {
  return src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/slick-carousel/slick/slick.min.js',
    'node_modules/select2/dist/js/select2.min.js',
    'app/js/script.js'
  ])
    .pipe(concat('script.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
};

const images = () => {
  return src('app/images/**/*')
    .pipe(imagemin([
      imagemin.gifsicle({ interlaced: true }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.optipng({ optimizationLevel: 5 }),
      imagemin.svgo({
        plugins: [
          { removeViewBox: true },
          { cleanupIDs: false }
        ]
      })
    ]))
    .pipe(dest('build/images'))
};

const build = () => {
  return src([
    'app/*.html',
    'app/css/*.css',
    'app/js/script.min.js',
    'app/fonts/**/*'
  ], { base: 'app/' })
    .pipe(dest('build'))
};

const cleanBuild = () => {
  return del('build', { force: true })
};

const watchFiles = () => {
  browserSync.init({
    server: { baseDir: ['build/', 'app/'] },
    notify: false,
    ghostMode: false,
    files: [
      'app/**/*',
      'build/**/*'
    ],
  });

  watch(['app/**/[^_]*.html', 'app/**/_*.html'], renderHtml);
  watch('app/scss/**/*.scss', stylesDev);
  watch(['app/js/**/*.js', '!app/js/script.min.js'], scripts);
};


exports.stylesDev = stylesDev;
exports.stylesProd = stylesProd;
exports.scripts = scripts;
exports.images = images;
exports.watchFiles = watchFiles;
exports.cleanBuild = cleanBuild;
exports.renderHtml = renderHtml;

exports.build = series(cleanBuild, stylesProd, scripts, images, build, renderHtml);
exports.default = parallel(series(renderHtml, watchFiles), stylesDev, scripts);