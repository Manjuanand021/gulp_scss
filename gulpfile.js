var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    browser_sync = require('browser-sync'),
    reload = browser_sync.reload;

    gulp.task('scripts', function(){
        console.log('Task is running...');
        gulp.src(['./js/*', '!./js/*.min.js'])
        .pipe(plumber())
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('./'))
        .pipe(reload({stream:true}))
    });

gulp.task('html', function(){
    gulp.src('./index.html')
    .pipe(reload({stream:true}))
})


gulp.task('preprocess-css', function(){
    gulp.src('./css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./'))
    .pipe(reload({stream:true}));
});

gulp.task('browser-sync', function(){
    browser_sync({
        server: {
            baseDir: './'
        }
    })
})

    gulp.task('watch', function(){
        gulp.watch('./js/*.js', ['scripts']);
        gulp.watch('./css/*.scss', ['preprocess-css']);
        gulp.watch('./index.html', ['html']); 
    });

    gulp.task('default', ['scripts', 'preprocess-css', 'html', 'browser-sync', 'watch']);