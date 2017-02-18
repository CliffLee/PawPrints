import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import nodemon from 'gulp-nodemon';
import babel from 'gulp-babel';

gulp.task('server-build', function() {
  return gulp.src(['app/**/*'])
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist'));
});

gulp.task('server-run', ['server-build'], function() {
  nodemon({
    script: 'dist/bin/www',
    ext: 'js',
    ignore: [
      'node_modules',
      'dist',
      'index.android.js',
      'index.ios.js'
    ]
  });
});

gulp.task('default', ['server-run']);
