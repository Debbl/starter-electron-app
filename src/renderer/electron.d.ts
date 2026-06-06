import type { IpcRendererEvent } from 'electron'

export interface IpcRenderer {
  send: (channel: string, data?: unknown) => void
  on: (
    channel: string,
    listener: (event: IpcRendererEvent, ...args: unknown[]) => void,
  ) => () => void
}

declare global {
  interface Window {
    ipcRenderer?: IpcRenderer
  }
}

export {}
