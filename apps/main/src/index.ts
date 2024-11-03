import { is } from "@electron-toolkit/utils";
import { app, BrowserWindow } from "electron";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (is.dev) {
    mainWindow.loadURL("http://localhost:3000");
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
