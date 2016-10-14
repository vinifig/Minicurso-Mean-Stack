'use strict';

const spawn = require('child_process').spawn;
const gulp = require('gulp');
const install = require('gulp-install')
const jetpack = require('fs-jetpack');

const projectDir = jetpack;
const moduleDirs = {};
moduleDirs.electron = projectDir.cwd('./Electron');
moduleDirs.electronApp = projectDir.cwd('./Electron/app');
moduleDirs.server = projectDir.cwd('./Server');
moduleDirs.ionic = projectDir.cwd('./Ionic');

// -------------------------------------
// Tasks
// -------------------------------------



gulp.task('install', function () {
  for(let moduleName in moduleDirs){
    let moduleDir = moduleDirs[moduleName].path();
    gulp.src(moduleDir + '/package.json', {cwd : moduleDir})
      .pipe(gulp.dest(moduleDir))
      .pipe(install());
  }
});


gulp.task('server', function(){
  spawn('node', [moduleDirs.server.path()], { stdio: 'inherit' });
});
