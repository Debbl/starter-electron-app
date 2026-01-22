import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    'main/index': 'src/index.ts',
    'preload/index': 'src/preload/index.ts',
  },
  outDir: 'dist',
  format: 'cjs',
  external: ['electron'],
  treeshake: true,
})
