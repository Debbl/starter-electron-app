export interface IpcRenderer {
  send: (channel: string, data?: any) => void
  on: (channel: string, listener: (event: any, ...args: any[]) => void) => void
}

declare global {
  interface Window {
    ipcRenderer?: IpcRenderer
  }
}

export {}
