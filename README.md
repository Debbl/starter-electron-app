# starter-electron-app

**Please replace globally the `starter-electron-app` to your app name**

This is a starter template for an Electron app. It follows the electron-vite React TypeScript template style, with a Vite renderer and Electron main/preload builds managed by electron-vite.

- electron-vite
  - React
  - Motion
  - Tailwind CSS

- Electron Builder

<img width="985" alt="image" src="https://github.com/user-attachments/assets/506e3aae-2048-4515-8445-92ad8b80f6a6">

<img width="985" alt="image" src="https://github.com/user-attachments/assets/71dce0ff-c12d-49c9-90fa-e331cbe46aef">

## HRM (Hot Module Replacement)

### Dev

main process: `electron-vite dev` rebuilds and reloads the Electron main/preload code during development.

renderer process: the main process loads the dev server URL from `ELECTRON_RENDERER_URL` during development.
