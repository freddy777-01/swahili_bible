const { ipcRenderer, contextBridge } = require("electron");
// import { notes } from "./dbQuery";
const { notes } = require("./dbQuery");
const editJsonFile = require("edit-json-file");
let file = editJsonFile(`${__dirname}/settings/setting.json`, {
	autosave: true,
});
// console.log(file.get());
// file.set("night-mode", "fred");
file.save();
// console.log(file.get());

contextBridge.exposeInMainWorld("win", {
	hide: () => ipcRenderer.send("win-status", { show: false }),
	// editor: () => EditorJS,
});
// notes.notes.getNotes()
contextBridge.exposeInMainWorld("notes", {
	getNotes: () => notes.getNotes(),
	readNote: (id) => notes.readNote(id),
	saveNote: (title, note, date, deleted) =>
		notes.saveNote(title, note, date, deleted),
	deleteANote: (id) => notes.deleteANote(id),
	deleteAllNotes: () => notes.deleteAllNotes(),
});
