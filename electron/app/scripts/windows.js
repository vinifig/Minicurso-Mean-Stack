const TitleBarWindows = require('electron-titlebar-windows');
const {BrowserWindow} = require('electron').remote;

const titlebar = new TitleBarWindows(
  {
    backgroundColor: 'rgb(30, 30, 30)',
    draggable: true
  }
);
titlebar.on('close', function(e) {
  // closeWindow();
  let window = BrowserWindow.getFocusedWindow();
  window.close();
});

titlebar.on('resize', function(e) {
  let maximized = titlebar.element.getAttribute('class').indexOf('fullscreen') != -1;
  let window = BrowserWindow.getFocusedWindow();
  if(!maximized){
    window.maximize();
  }else{
    window.restore();
  }
});

titlebar.on('minimize', function(e) {
  let window = BrowserWindow.getFocusedWindow();
  window.minimize();
})

const titleEl = document.createElement('div');
titleEl.innerHTML = document.title;
titleEl.setAttribute('class','title electron-window-title');
titlebar.element.appendChild(titleEl);
titlebar.appendTo(document.body);
