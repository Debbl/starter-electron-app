import { contextBridge, ipcRenderer } from 'electron'
import type { IpcRendererEvent } from 'electron'

contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel: string, data?: unknown) => ipcRenderer.send(channel, data),
  on: (
    channel: string,
    listener: (event: IpcRendererEvent, ...args: unknown[]) => void,
  ) => {
    ipcRenderer.on(channel, listener)

    return () => ipcRenderer.removeListener(channel, listener)
  },
})
