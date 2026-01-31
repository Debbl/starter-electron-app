#!/usr/bin/env tsx

import fs from 'node:fs'
import { execa } from 'execa'
import { copyDir } from './utils/index.mts'
import { logger } from './utils/logger.mts'

const KNOWN_ARCHS = ['arm64', 'x64', 'ia32']

function getArchFromArgv(): string | undefined {
  // eslint-disable-next-line n/prefer-global/process
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith('--')) {
      const arch = arg.slice(2)
      if (KNOWN_ARCHS.includes(arch)) return arch
    }
  }
  return undefined
}

export async function main() {
  // delete dist directory
  fs.rmSync('dist', { recursive: true, force: true })
  logger.info('Deleted dist directory')

  // copy dist files from apps/main and apps/renderer
  copyDir('apps/main/dist', 'dist')
  logger.info('Copied apps/main/dist to dist/main')

  copyDir('apps/renderer/out', 'dist/renderer')
  logger.info('Copied apps/renderer/out to dist/renderer')

  // arch from CLI: pnpm run make -- --arm64 | --x64 (e.g. from CI matrix.arch)
  const arch = getArchFromArgv()
  const electronBuilderArgs = arch ? [`--${arch}`] : []

  logger.info(
    `Running electron-builder ${electronBuilderArgs.length ? `with arch: ${arch}` : 'without arch'}`,
  )
  await execa('electron-builder', electronBuilderArgs, { stdio: 'inherit' })
}

main()
