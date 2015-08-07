import gulp from 'gulp';

gulp.task('copy:data', () => {
	gulp
		.src('app/data/*')
		.pipe(gulp.dest('dist/data'));
})

gulp.task('copy:js', () => {
	gulp
		.src('app/scripts/libs/*')
		.pipe(gulp.dest('dist/scripts/libs'));
})

gulp.task('copy', ['copy:data']);
