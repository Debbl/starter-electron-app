'use client'
import { useEffect } from 'react'
import { Button } from '~/components/ui/button'

export default function IPC() {
  const ping = () => {
    window.ipcRenderer?.send('ping', 'Hi')
  }

  useEffect(() => {
    const unsubscribe = window.ipcRenderer?.on('pong', (_, data) => {
      // eslint-disable-next-line no-console
      console.log('Pong', data)
    })

    return () => unsubscribe?.()
  }, [])

  return (
    <div>
      <Button onClick={ping}>Ping</Button>
    </div>
  )
}
