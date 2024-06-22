import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { bible } from '../core/core'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    // contextBridge.exposeInMainWorld('api', api)

    contextBridge.exposeInMainWorld('bible', {
      NewTestament: bible.NewTestament,
      OldTestament: bible.OldTestament
    })
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
