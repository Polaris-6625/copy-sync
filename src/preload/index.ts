import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  fetchData: () => ipcRenderer.send('fetchData'),
  on: (channel: string, callback: Function) => {
    ipcRenderer.on(channel, (_, data) => callback(data))
  },
  clearItem: (title: string) => ipcRenderer.send('clear-Item', title),
  setItem: (data: string, fromInternalCopy: boolean = false) => ipcRenderer.send('set-Item', data, fromInternalCopy),
  clearAllItems: () => ipcRenderer.send('clearAllItems')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('myPoints', api)
    contextBridge.exposeInMainWorld('read', {
      getArray: (callback) => ipcRenderer.on('read-All', callback)
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.myPoints = api
}
