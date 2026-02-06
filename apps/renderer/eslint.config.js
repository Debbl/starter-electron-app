// @ts-check
import { defineConfig } from '@debbl/eslint-config'

export default defineConfig({
  ignores: {
    files: ['next-env.d.ts'],
  },
  typescript: true,
  react: {
    next: true,
    compiler: true,
  },
  tailwindcss: 'prettier',
})
