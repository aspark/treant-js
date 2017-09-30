var gulp =require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

var mocha = require('gulp-mocha')

gulp.task('js', ['test'], function(){
    return gulp.src('./Treant.js')
    .pipe(gulp.dest('./dist'))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename('Treant.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('test', function(){
    return gulp.src('./Treant.test.js', {read:false})
    .pipe(mocha({reporter: 'spec'}));
});

gulp.task('css', function(){
    return gulp.src('./Treant.css').pipe(gulp.dest('./dist'));
});

gulp.task('build', ['js', 'css']);