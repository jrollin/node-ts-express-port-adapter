import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, './src/core'),
      '@adapters': path.resolve(__dirname, './src/adapters'),
      '@fixtures': path.resolve(__dirname, './src/fixtures'),
      '@utils': path.resolve(__dirname, './src/utils')
    }
  },
  build: {
    ssr: true,
    target: 'node18',
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: () => 'index.js'
    },
    rollupOptions: {
      external: [
        /^node:.*/,
        'https',
        'fs',
        'path',
        'crypto',
        'stream',
        'util',
        'url',
        'events',
        'express',
        'pino',
        'helmet',
        'cors',
        'dotenv',
        'body-parser',
        'morgan',
        'cookie-parser',
        'multer',
        'axios',
        'validatorjs',
        'uuid',
        'crypto-js'
      ],
      output: {
        format: 'es',
        entryFileNames: 'index.js'
      }
    },
    sourcemap: true
  },
  test: {
    globals: true,
    environment: 'node',
    include: ['src/**/*.{test,spec}.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'src/fixtures/**',
        'node_modules/**',
        'dist/**'
      ]
    },
    clearMocks: true,
    mockReset: true,
    restoreMocks: true
  }
})
