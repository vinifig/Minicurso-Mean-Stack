'use strict';

// Windows Control
// START APPLICATION
// Module to control application life.
// var app = require('app');
const {app, BrowserWindow} = require('electron')
// Module to create native browser window.
// var electron = require('electron');
// console.dir(electron);
// var BrowserWindow = require('electron');

let mainWindow = null;
// Quit when all windows are closed.
app.on('window-all-closed', function(){
  if (process.platform != 'darwin') {
    app.quit();
  }
});
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function(){
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600, frame: false});
  mainWindow.maximize();

  // Deixa janela full screen
  // mainWindow.setFullScreen(true);

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)
  // mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Open the devtools.
  // mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function(){
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
