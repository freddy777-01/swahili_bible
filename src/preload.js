const { ipcRenderer, contextBridge } = require("electron");
const { bible } = require("./bibleQuery");
const { highlighter, bookmarking } = require("./dbQuery");
/*
console.log(ipcRenderer.sendSync("synchronous-message", "ping"));

ipcRenderer.on("asynchronous-reply", (_, ...args) => console.log(...args));

ipcRenderer.send("asynchronous-message", "ping");

ipcRenderer
  .invoke("invoke-handle-message", "ping")
  .then((reply) => console.log(reply));
*/
contextBridge.exposeInMainWorld("bible", {
  getOldTestamentTitles: () => bible.oldTestamentTitles(),
  getNewTestamentTitles: () => bible.newTestamentTitles(),
  getSura: (book) => bible.tafutaSura(book),
  getVerses: (book, suraNum) => bible.bibleVerses(book, suraNum),
  getTitleName: (titleNum) => bible.titleName(titleNum),
});

contextBridge.exposeInMainWorld("disclose", {
  noteBook: () => ipcRenderer.send("win-status", { show: true }),
  closeAllWin: () => ipcRenderer.send("close-all-win", null),
});

contextBridge.exposeInMainWorld("highlighter", {
  highlight: (key, color) => highlighter.highlight(key, color),
  getHighlight: (key) => highlighter.getHighlight(key),
  allHighlights: (key) => highlighter.allHighlights(key),
  updateHighlight: (key, color) => highlighter.updateHighlight(key, color),
  deHighlight: (key) => highlighter.deHighlight(key),
});

contextBridge.exposeInMainWorld("bookmark", {
  addbkmk: (bkmk) => bookmarking.addBkmk(bkmk),
  getbkmks: () => bookmarking.getBkmks(),
  deletebkmk: (id) => bookmarking.deleteBkmk(id),
});
