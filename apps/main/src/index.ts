import path from "node:path";
import { is, platform } from "@electron-toolkit/utils";
import { app, BrowserWindow, ipcMain } from "electron";
import { waitForPort } from "get-port-please";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
    },
  });

  if (is.dev) {
    const port = 3000;
    // delay (20 * 500 = 10_000)ms to load for next server is ready
    waitForPort(port, { delay: 500, retries: 20 })
      .then(() => {
        mainWindow.loadURL(`http://localhost:${port}`);
      })
      .catch(() => {
        throw new Error(`Failed to start the renderer server on port ${port}`);
      });
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }

  return mainWindow;
}

app.whenReady().then(() => {
  const mainWindow = createWindow();

  mainWindow.on("ready-to-show", () => mainWindow.show());

  ipcMain.on("ping", (event, data) => {
    // eslint-disable-next-line no-console
    console.log("ping", data);
    event.reply("pong", data);
  });

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (!platform.isMacOS) app.quit();
});
