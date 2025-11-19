'use client'
import { Button } from '@nextui-org/react'
import { useEffect } from 'react'

export default function IPC() {
  const ping = () => {
    window.ipcRenderer?.send('ping', 'Hi')
  }

  useEffect(() => {
    window.ipcRenderer?.on('pong', (_, data) => {
      // eslint-disable-next-line no-console
      console.log('Pong', data)
    })
  }, [])

  return (
    <div>
      <Button onClick={ping}>Ping</Button>
    </div>
  )
}
