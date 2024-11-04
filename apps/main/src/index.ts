import { is } from "@electron-toolkit/utils";
import { app, BrowserWindow } from "electron";
import { waitForPort } from "get-port-please";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (is.dev) {
    const port = 3000;
    // delay (20 * 500 = 20_000)s to load for next server is ready
    waitForPort(port, { delay: 500, retries: 20 })
      .then(() => {
        mainWindow.loadURL(`http://localhost:${port}`);
      })
      .catch(() => {
        throw new Error(`Failed to start the renderer server on port ${port}`);
      });
  } else {
    mainWindow.loadFile("index.html");
  }

  return mainWindow;
}

app.whenReady().then(() => {
  const mainWindow = createWindow();

  mainWindow.on("ready-to-show", () => mainWindow.show());

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  app.quit();
});
