var gulp = require('gulp'),
del = require('del'),
browser_sync = require('browser-sync'),
reload = browser_sync.reload;

//Build Tasks

//Clean build folder
gulp.task('build:clean', function () {
    del([
        './build'
    ])
})

//Copy all the files to build folder
gulp.task('build:copy', ['build:clean'], function () {
    return gulp.src('./**')
        .pipe(gulp.dest('./build'));
})

//Remove unwanted files
gulp.task('build:removeunwated', ['build:copy'], function (cb) {
    del([
      'build/node_modules/**/*',
        'build/node_modules',
        'build/npm-debug.log',
        'build/.gitignore'        
    ], cb);
})

gulp.task('browser-sync', function(){
    browser_sync({
        server: {
            baseDir: './'
        }
    })
})

// gulp.task('reload', function(){
//   gulp.src('./build')
//   .pipe(reload({stream:true}));

//   gulp.src('./**/*')
//   .pipe(reload({stream:true}));
// })

// gulp.task('watch', function(){
//   gulp.watch('./build', ['reload']);
//   gulp.watch('./**/*', ['reload'])
// });

//Final build
gulp.task('build', ['build:clean', 'build:copy', 'build:removeunwated', 'reload', 'browser-sync', 'watch']);