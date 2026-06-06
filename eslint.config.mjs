import { defineConfig } from '@debbl/eslint-config'

export default defineConfig({
  ignores: {
    files: ['src/renderer/components'],
  },
  typescript: true,
})
