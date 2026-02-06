import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    'main/index': 'src/index.ts',
    'preload/index': 'src/preload/index.ts',
  },
  outDir: 'dist',
  format: 'cjs',
  minify: true,
  clean: true,
  external: ['electron'],
  treeshake: true,
})
