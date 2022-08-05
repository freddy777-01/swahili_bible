const { ipcRenderer, contextBridge } = require("electron");
const bible = require("./bibleQuery");
/*
console.log(ipcRenderer.sendSync("synchronous-message", "ping"));

ipcRenderer.on("asynchronous-reply", (_, ...args) => console.log(...args));

ipcRenderer.send("asynchronous-message", "ping");

ipcRenderer
  .invoke("invoke-handle-message", "ping")
  .then((reply) => console.log(reply));
*/
contextBridge.exposeInMainWorld("get", {
  oldTestamentTitles: () => bible.bible.oldTestamentTitles(),
  newTestamentTitles: () => bible.bible.newTestamentTitles(),
  getSura: (book) => bible.bible.tafutaSura(book),
  getVerses: (book, suraNum) => bible.bible.bibleVerses(book, suraNum),
});

contextBridge.exposeInMainWorld("disclose", {
  noteBook: () => ipcRenderer.send("win-status", { show: true }),
  closeAllWin: () => ipcRenderer.send("close-all-win", null),
});
