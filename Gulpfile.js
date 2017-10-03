const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const runSequence = require('run-sequence');

const plugins = gulpLoadPlugins();

const primer_modules_dir = './node_modules/'
// const primer_modules = fs.readdirSync(primer_modules_dir)
//   .filter(x => x.startsWith("primer-"))
//   .filter(x => x != "primer-css")
//   .map(x => x.substr(7));
const primer_modules = [
  "alerts",
  "base",
  "box",
  "buttons",
  "page-headers",
  "tables",
  "tooltips"
];

css_dir = "./css"
icon_dir = "./octicons"
dest = "./"
src = "./src"

gulp.task('watch', function() {

  gulp.watch([
    path.join(src, "*.html")
  ], ["html:compile", "html:refresh"])

  gulp.watch([
    path.join(src, "*.scss")
  ], ["styles:src", "html:refresh"])

  gulp.watch([
    "demo/*",
    path.join(src, "*.html")
  ], ["html:refresh"])

});

gulp.task('copy:octicons', function () {
  return gulp.src(
    './node_modules/octicons/build/svg/*.svg', {
      'base': './node_modules/octicons/build/svg'
    })
    .pipe(plugins.copy('./octicons', {
      prefix: 4
    }));
});

gulp.task('copy:octicons-license', function () {
  return gulp.src(
    './node_modules/octicons/LICENSE', {
      'base': './node_modules/octicons'
    })
    .pipe(plugins.copy('./octicons', {
      prefix: 2
    }));
});

gulp.task('html:refresh', function() {
  gulp.src([
    "demo/*.html",
    path.join(dest, "*.html")
  ])
  .pipe(plugins.connect.reload());
});

gulp.task('clean', function () {
  return gulp.src([
    path.join(css_dir, "*.css"),
    path.join(icon_dir, "*.svg")
  ], {
    read: false
  })
    .pipe(plugins.clean());
});

gulp.task('connect', function() {
  plugins.connect.server({
    host: '0.0.0.0',
    root: dest,
    port: process.env.CONNECT_PORT || 9000,
    livereload: true,
    debug: false
  });
});

gulp.task('styles:github', function() { 
  return gulp.src(primer_modules.map(module_name => path.join(
    primer_modules_dir,
    "primer-" + module_name,
    "index.scss"
  )), {
    base: primer_modules_dir
  })
  .pipe(plugins.plumber({
    errorHandler: function(error) {
      this.emit('skip');
    }
  }))
  .pipe(plugins.sass({
    includePaths: ['./node_modules/']
  }))
  .pipe(plugins.plumber.stop())
  .pipe(plugins.rename(function(path) {
    path.basename = path.dirname.replace("primer-", "")
    path.dirname = "."
  }))
  .pipe(gulp.dest(css_dir));
});

gulp.task('styles:src', function() { 
  return gulp.src(primer_modules.map(module_name => path.join(
    "./src/*.scss"
  )), {
    base: "./src"
  })
  .pipe(plugins.plumber({
    errorHandler: function(error) {
      this.emit('skip');
    }
  }))
  .pipe(plugins.sass({
    includePaths: ['./node_modules/']
  }))
  .pipe(plugins.plumber.stop())
  .pipe(gulp.dest(css_dir));
});

gulp.task('html:compile', function() {
  gulp.src("src/*.html")
  .pipe(plugins.inlineSource())
  .pipe(gulp.dest(dest))
});

gulp.task('upload', function() {
  return gulp.src([
    "./{octicons,demo,}/*.{html,svg,css}",
    ".nojekyll"
  ])
    .pipe(plugins.debug())
    .pipe(plugins.ghPages());
});

gulp.task('warmup', function(done) {
  runSequence(
    'clean',
    'styles:github',
    'styles:src',
    'copy:octicons',
    'copy:octicons-license',
    'html:compile',
    done
  );
});

gulp.task('default', function(done) {
  runSequence(
    'warmup',
    'connect',
    'watch',
    done
  );
});
