const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const isDev = process.env.NODE_ENV !== "production";

// icon for the App
let icoPath = path.join(__dirname, "icons/swahili_bible.ico");
const getIcon = () => {
	if ((process.platform = "win32")) {
		return path.join(__dirname, "/icons/swahili_bible.ico");
	} else {
		return path.join(__dirname, "/icons/swahili_bible.png");
	}
};
const locatePreload = (preloadFile) => {
	return !app.isPackaged
		? path.join(__dirname, preloadFile)
		: path.resolve(app.getAppPath(), "src/" + preloadFile);
	/* 	if (isDev) {
		return path.join(app.getAppPath(), "src/" + preloadFile);
	} else {
		return path.resolve(
			app.getAppPath(),
			"../app.asar.unpacked/src/" + preloadFile
		);
	} */
};
const IfInDev = () => {
	let dev = !app.isPackaged ? true : false;
	return dev;
};
// console.log(app.isPackaged);
console.log(app.getAppPath());
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
			preload: locatePreload("preload.js"),
			devTools: IfInDev(),
		},
	});
	// path.join(__dirname, "preload-note-book.js");
	const noteBook = new BrowserWindow({
		width: 600,
		height: 600,
		frame: false,
		show: false,
		minWidth: 610,
		minHeight: 600,
		autoHideMenuBar: true,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: locatePreload("preload-note-book.js"),
			devTools: IfInDev(),
		},
	});

	// creating a splash window
	const splashScreen = new BrowserWindow({
		width: 610,
		height: 310,
		transparent: true,
		frame: false,
		resizable: false,
		alwaysOnTop: true,
		parent: mainWindow,
		modal: true,
		show: true,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			devTools: IfInDev(),
		},
		// icon: getIcon(),
	});

	splashScreen.loadFile(path.join(__dirname, "splash-screen.html"));
	mainWindow.loadFile(path.join(__dirname, "index.html"));
	noteBook.loadFile(path.join(__dirname, "noteBook.html"));

	mainWindow.once("ready-to-show", () => {
		setTimeout(() => {
			splashScreen.destroy();
		}, 5000);
		mainWindow.show();
	});

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

// Creating Menu

const isMac = process.platform === "darwin";
Menu.setApplicationMenu(
	Menu.buildFromTemplate([
		...(isMac
			? [
					{
						label: app.name,
						submenu: [
							{ role: "about" },
							{ type: "separator" },
							{ role: "services" },
							{ role: "hideothers" },
							{ role: "unhide" },
							{ type: "separator" },
							{ role: "quit" },
						],
					},
			  ]
			: []),
		{
			label: "File",
			submenu: [isMac ? { role: "close" } : { role: "quit" }],
		},
		{
			label: "View",
			submenu: [
				/*{ role: "reload" },
        { role: "forceReload" },
        { type: "separator" },*/
				{ role: "zoomIn" },
				{ role: "zoomOut" },
				{ role: "resetZoom" },
				{ role: "togglefullscreen" },
				{ type: "separator" },
				{ role: "toggleDevTools" },
			],
		},
		{
			label: "Window",
			submenu: [
				{ role: "minimize" },
				...(isMac
					? [
							{ type: "separator" },
							{ role: "front" },
							{ type: "separator" },
							{ role: "window" },
					  ]
					: [{ role: "close" }]),
			],
		},
	])
);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
