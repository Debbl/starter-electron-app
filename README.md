# starter-electron-app

**Please replace globally the `starter-electron-app` to your app name**

This is a starter template for an Electron app. Using `next.js` for the renderer.

- next.js

  - framer-motion
  - nextorg-ui
  - tailwindcss

- electron-forge

<img width="985" alt="image" src="https://github.com/user-attachments/assets/506e3aae-2048-4515-8445-92ad8b80f6a6">

<img width="985" alt="image" src="https://github.com/user-attachments/assets/71dce0ff-c12d-49c9-90fa-e331cbe46aef">



## HRM (Hot Module Replacement)

### Dev

main process: use the `rollup --no-watch.clearScreen` to watch the main process files changes but sometimes it cloud not work well. So, you need to use cli to restart the app.

renderer process: main process load the renderer process by `http://localhost:3000` so you cloud need to reload the app sometimes when the pages is not updated.
