const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');

const plugins = gulpLoadPlugins();

const primer_modules_dir = './node_modules/'
const primer_modules = fs.readdirSync(primer_modules_dir)
  .filter(x => x.startsWith("primer-"))
  .map(x => x.substr(7));

css_dir = "./css"
dest = "./"

gulp.task('clean', function () {
  return gulp.src(path.join(css_dir, "*.css"), {
      read: false
    })
    .pipe(plugins.clean());
});

gulp.task('styles', function() { 
  return gulp.src(primer_modules.map(module_name => path.join(
    primer_modules_dir,
    "primer-" + module_name,
    "index.scss"
  )), {
    base: primer_modules_dir
  })
  .pipe(plugins.plumber({
    errorHandler: function(error) {
      this.emit('end');
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

gulp.task('html', function() {
  
  gulp.src("src/*.html")
  .pipe(plugins.inlineSource())
  .pipe(gulp.dest(dest))

});

gulp.task('default', ['clean', 'styles', 'html']);
