const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
// app.on('ready',createWindow);
// icont for the App
let icoPath = path.join(__dirname, "icons/swahili_bible.ico");
const getIcon = () => {
  if ((process.platform = "win32"))
    return path.join(__dirname, "icons/swahili_bible.ico");
  return path.join(__dirname, "icons/swahili_bible.png");
};
app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: getIcon(),
    minWidth: 1240,
    minHeight: 600,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const noteBook = new BrowserWindow({
    width: 600,
    height: 600,
    frame: true,
    show: true,
    minWidth: 610,
    autoHideMenuBar: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload-note-book.js"),
    },
  });
  noteBook.loadFile(path.join(__dirname, "noteBook.html"));

  mainWindow.loadFile(path.join(__dirname, "index.html"));
  ipcMain.on("win-status", (event, args) => {
    // console.log(args.show);
    if (args.show) {
      noteBook.show();
    } else {
      noteBook.hide();
    }
  });
  ipcMain.on("close-all-win", (event, args) => {
    // console.log(args.show);
    noteBook.close();
    setTimeout(() => {
      mainWindow.close();
    }, 1000);
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
