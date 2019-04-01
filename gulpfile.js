// 载入外挂
var gulp = require('gulp'), 
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    htmlmin = require('gulp-htmlmin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');
 
// 样式
gulp.task('styles', function() { 
  return gulp.src([
    'src/styles/**/*.scss'
    ,'!src/styles/mixin.scss'
  ])
    .pipe(sass({ style: 'expanded', }))
    .pipe(gulp.dest('src/styles'))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/styles'))
});

//编译sass
gulp.task('sassToCss', function() { 
  return gulp.src([
    'src/styles/**/*.scss'
    ,'!src/styles/mixin.scss'
  ])
    .pipe(sass({ style: 'expanded', }))
    .pipe(gulp.dest('src/styles'))
});
 
// 脚本
gulp.task('scripts', function() { 
  gulp.src('src/scripts/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));
});
 
// 图片
gulp.task('images', function() { 
  return gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
});

//html
gulp.task('textHtml', function () {
  var options = {
      removeComments: true,//清除HTML注释
      collapseWhitespace: true,//压缩HTML
      collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
      removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
  };
  gulp.src('src/views/**/*.html')
      .pipe(htmlmin(options))
      .pipe(gulp.dest('dist/views'));
  gulp.src('src/index.html')
      .pipe(htmlmin(options))
      .pipe(gulp.dest('dist'));
});

//复制lib文件夹
gulp.task('copy', function () {
  return gulp.src('src/lib/**')
  .pipe(gulp.dest('dist/lib'))
})
 
//清理
gulp.task('clear', function(cb) {
    return del(['./dist/*'], cb);
});
 
// 看守
gulp.task('watch', function() {
 
  // 看守所有.scss档
  gulp.watch('src/styles/**/*.scss', ['styles']);
  gulp.watch('src/styles/**/*.scss', ['sassToCss']);
  // 看守所有.js档
  gulp.watch('src/scripts/**/*.js', ['scripts']);
 
  // 看守所有图片档
  gulp.watch('src/images/**/*', ['images']);

  // 看守所有html
  gulp.watch('src/views/**/*', ['textHtml']);
 
  // 建立即时重整伺服器
  var server = livereload();
 
  // 看守所有位在 dist/  目录下的档案，一旦有更动，便进行重整
  gulp.watch(['dist/**']).on('change', function(file) {
    console.log(server)
    // server.changed(file.path);
  });
});

gulp.task( 'default', [ 'styles', 'sassToCss', 'scripts', 'images', 'textHtml', 'watch' ] )
