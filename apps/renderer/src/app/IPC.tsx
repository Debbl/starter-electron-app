"use client";
import { Button } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import type { IpcRenderer } from "../../electron";

export default function IPC() {
  const ipcRenderer = useRef<IpcRenderer>();

  const ping = () => {
    ipcRenderer.current?.send("ping", "Hi");
  };

  useEffect(() => {
    ipcRenderer.current = window.ipcRenderer;
    ipcRenderer.current.on("pong", (_, data) => {
      // eslint-disable-next-line no-console
      console.log("Pong", data);
    });
  }, []);

  return (
    <div>
      <Button onClick={ping}>Ping</Button>
    </div>
  );
}
