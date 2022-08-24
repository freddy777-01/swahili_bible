const { ipcRenderer, contextBridge } = require("electron");
const bible = require("./bibleQuery");
const { highlighter } = require("./dbQuery");
/*
console.log(ipcRenderer.sendSync("synchronous-message", "ping"));

ipcRenderer.on("asynchronous-reply", (_, ...args) => console.log(...args));

ipcRenderer.send("asynchronous-message", "ping");

ipcRenderer
  .invoke("invoke-handle-message", "ping")
  .then((reply) => console.log(reply));
*/
contextBridge.exposeInMainWorld("bible", {
  getOldTestamentTitles: () => bible.bible.oldTestamentTitles(),
  getNewTestamentTitles: () => bible.bible.newTestamentTitles(),
  getSura: (book) => bible.bible.tafutaSura(book),
  getVerses: (book, suraNum) => bible.bible.bibleVerses(book, suraNum),
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
