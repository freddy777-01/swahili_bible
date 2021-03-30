const { app, BrowserWindow, ipcMain,Menu } = require('electron');
const path = require('path');
const fs = require('fs');


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// icont for the App
let icoPath = path.join(__dirname,'icons/swahili_bible.ico')
const getIcon =()=>{
  if(process.platform = 'win32') return path.join(__dirname,'icons/swahili_bible.ico')
  return path.join(__dirname,'icons/swahili_bible.png')
}

app.on('ready',() => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    show: false,
    icon:getIcon(),
    minWidth:900,
    minHeight:600,
    backgroundColor:'#2e2c29',
    darkTheme:true,
    webPreferences:{
    	scrollBounce:true,
      nodeIntegration:true,
      // enableRemoteModule:true,
      preload:path.join(__dirname,'preload.js')
    }
  });

   // creating a splash window
   const splashScreen =new BrowserWindow({
     width: 610, 
     height: 310, 
     transparent: true, 
     frame: false, 
     alwaysOnTop: true,
     parent:mainWindow,
     modal:true,
     icon:getIcon(),
    });
   splashScreen.loadFile(path.join(__dirname,'splash-screen.html'));
 
  // const main = mainWindow = splashScreen.initSplashScreen(config) 
  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // if main window is ready to show, then destroy the splash window and show up the main window
  mainWindow.once('ready-to-show', () => {
    setTimeout(() => {
      splashScreen.destroy();
    }, 5000);
    mainWindow.show();
  });

});

// Creating Menu
const isMac = process.platform === 'darwin'
Menu.setApplicationMenu(Menu.buildFromTemplate([
  ...(isMac ?[{
    label:app.name,
    submenu:[
      {role:'about'},
      {type:'separator'},
      {role:'services'},
      {role:'hideothers'},
      {role:'unhide'},
      {type:'separator'},
      {role:'quit'}
    ]
  }]:[]),
  {
    label: 'File',
    submenu:[
      isMac ? {role:'close'} : {role:'quit'}
    ]
  },
  {
    label:'View',
    submenu:[
      {role:'reload'},
      {role:'forceReload'},
      {type:'separator'},
      {role:'zoomIn'},
      {role:'zoomOut'},
      {role:'resetZoom'},
      {role:'togglefullscreen'},
      {type:'separator'},
      {role:'toggleDevTools'}
    ]
  },
  {
    label: 'Window',
    submenu: [
      { role: 'minimize' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ])
    ]
  }
]))


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready',createWindow);


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

