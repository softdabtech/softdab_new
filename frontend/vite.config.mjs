// vite.config.mjs
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    // генерим хэш в именах всех файлов (в т.ч. CSS, чанков)
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          // корректные расширения для css, svg, png и т.д.
          const ext = name ? name.split('.').pop() : 'bin'
          return `assets/[name]-[hash].[ext]`
        },
      },
    },
    // очистить dist перед сборкой
    emptyOutDir: true,
  },
  // если сайт хостится в корне домена — оставьте base: '/'
  // если в поддиректории — укажите её, например base: '/softdab/'
  base: '/',
})