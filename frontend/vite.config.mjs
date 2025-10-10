// vite.config.mjs
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// если у вас раньше было require('path'), замените:
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // ваши прочие опции...
})