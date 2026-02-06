#!/usr/bin/env tsx

import fs from 'node:fs'
import { buildElectron } from './electron-builder.mts'
import { copyDir } from './utils/index.mts'
import { logger } from './utils/logger.mts'

export async function main() {
  // delete dist directory
  fs.rmSync('dist', { recursive: true, force: true })
  logger.info('Deleted dist directory')

  // copy dist files from apps/main and apps/renderer
  copyDir('apps/main/dist', 'dist')
  logger.info('Copied apps/main/dist to dist/main')

  copyDir('apps/renderer/out', 'dist/renderer')
  logger.info('Copied apps/renderer/out to dist/renderer')

  // exec electron builder
  await buildElectron()
}

main()
