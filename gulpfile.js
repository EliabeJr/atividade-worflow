const gulp 		= require("gulp");
const sass 		= require("gulp-sass");
const notify 	= require("gulp-notify");
const htmlmin 	= require("gulp-htmlmin");
const cssmin 	= require('gulp-clean-css');

gulp.task("compile-css", function () {
	return gulp.src("./source/scss/**/*.scss")
			.pipe(sass())
			.on("error", notify.onError({title:"erro ao compilar", message:"<%= error.message %>"}))
			.pipe(gulp.dest("./source/css"))
});

gulp.task('min-css', function(){
  return gulp.src('./source/css/**/*.css')
    		.pipe(cssmin({compatibility: 'ie8'}))
   			.pipe(gulp.dest('./dist/css'));
});

gulp.task('min-html', function() {
  return gulp.src('./source/*.html')
    		.pipe(htmlmin({collapseWhitespace: true}))
    		.pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
    gulp.watch('./source/scss/**/*.scss', ['compile-css']);
    gulp.watch('./source/css/**/*.css', ['min-css']);
    gulp.watch('./source/*.html', ['min-html']);
});

gulp.task('default',['watch']);