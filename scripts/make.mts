#!/usr/bin/env tsx

import fs from 'node:fs'
import { execa } from 'execa'
import { buildElectron } from './electron-builder.mts'
import { logger } from './utils/logger.mts'

export async function main() {
  fs.rmSync('out', { recursive: true, force: true })
  logger.info('Deleted out directory')

  await execa('pnpm', ['build'], { stdio: 'inherit' })
  logger.info('Built main and renderer')

  await buildElectron()
}

main()
