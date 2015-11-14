var gulp    = require('gulp');
var connect = require('gulp-connect');
var ts      = require('gulp-typescript');
var nodemon = require('gulp-nodemon')
var install = require("gulp-install");
var gulpsync = require('gulp-sync')(gulp);

// !!! Should get all files but not from project file
var tsProject = ts.createProject('client/scripts/tsconfig.json');

gulp.task('angular', function() {
  // place code for your default task here
  return gulp.src(['node_modules/angular2/**/*']).pipe(gulp.dest('client/bower_components/angular2'));
});

gulp.task('connect', function() {
  connect.server({
    root: 'client',
    livereload: {
      enabled: true,
      port: 35729
    },
    fallback: 'client/index.html'
  });
});

gulp.task('watch', function () {
  gulp.watch(['client/scripts/**/*.js', 'client/styles/**/*.css', 'client/views/**/*.html', 'client/scripts/**/*.html', 'client/*.html']).on('change', function (file) {
    console.log('reload');
        gulp.src(file.path).pipe( connect.reload() );
    });

  gulp.watch(['client/scripts/**/*.ts'], ['typescript']);
});

gulp.task('typescript', function () {
    var tsResult = tsProject.src('client/scripts/**/*.ts')
        .pipe(ts(tsProject));

    return tsResult.js.pipe(gulp.dest('client/scripts/'));
});

gulp.task('server', function () {
  nodemon({
    script: 'server/server.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('install', function () {
  gulp.src(['./client/bower.json', './package.json'])
    .pipe(install());
})



// !!! Clean js files before compiling or create new clean js task

// run angular task only if angular folder in bower is empty
gulp.task('client', gulpsync.sync(
  [
    'install',
    'angular',
    'typescript',
    [
      'connect', 'watch', 'server'
    ]
  ]
));
