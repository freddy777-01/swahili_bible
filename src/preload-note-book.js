const { ipcRenderer, contextBridge } = require("electron");
const notes = require("./dbQuery");

contextBridge.exposeInMainWorld("win", {
  hide: () => ipcRenderer.send("win-status", { show: false }),
});

contextBridge.exposeInMainWorld("notes", {
  getNotes: () => notes.notes.getNotes(),
});
