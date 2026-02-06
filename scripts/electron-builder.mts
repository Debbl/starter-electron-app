/* eslint-disable no-template-curly-in-string */
import { build } from 'electron-builder'

export async function buildElectron() {
  await build({
    config: {
      appId: 'com.electron.vault',
      productName: 'Starter',
      electronLanguages: ['en'],
      files: ['dist'],
      directories: {
        output: 'out',
      },
      icon: 'assets/icon.png',
      win: {
        icon: 'assets/icon.ico',
        target: 'nsis',
        artifactName: '${name}-${version}-windows-${arch}.${ext}',
      },
      nsis: {
        oneClick: false,
        allowToChangeInstallationDirectory: true,
        installerIcon: 'assets/icon.ico',
        uninstallerIcon: 'assets/icon.ico',
        shortcutName: 'Vault',
      },
      mac: {
        icon: 'assets/icon.icns',
        target: 'dmg',
        signIgnore: null,
        artifactName: '${productName}-Setup-${version}.${ext}',
      },
      linux: {
        icon: 'assets/icon.png',
        target: ['AppImage', 'deb'],
        artifactName: '${name}-${version}-linux-${arch}.${ext}',
      },
    },
  })
}
