// vite.config.mjs
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    // Критическая оптимизация для LCP
    target: 'es2015', // Совместимость с большинством браузеров
    minify: 'terser',
    cssMinify: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
      },
    },
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          const ext = name ? name.split('.').pop() : 'bin'
          return `assets/[name]-[hash].[ext]`
        },
        // Упрощенный split: ВСЕ node_modules в один чанк (кроме analytics)
        // чтобы исключить cross-chunk React зависимости
        manualChunks: (id) => {
          // Analytics - отдельный чанк для lazy loading
          if (id.includes('node_modules') && id.includes('posthog')) {
            return 'analytics';
          }

          // ВСЁ остальное из node_modules - в vendor-react
          // Это предотвращает ANY cross-chunk React dependency issues
          if (id.includes('node_modules')) {
            return 'vendor-react';
          }

          // Формы — ленивое подключение (только код приложения)
          if (id.includes('src/components/forms')) {
            return 'forms';
          }

          // Критические секции (код приложения для LCP)
          if (
            id.includes('src/components/sections/HeroSection') ||
            id.includes('src/components/sections/TrustSection')
          ) {
            return 'critical-sections';
          }

          // Критические perf-компоненты (код приложения)
          if (id.includes('src/components/performance')) {
            return 'critical-performance';
          }

          // Страницы — отдельно для ленивой загрузки
          if (id.includes('src/pages/')) {
            const pageName = id.split('/pages/')[1]?.split('/')[0]?.replace('.jsx', '');
            return `page-${pageName}`;
          }
        },
      },
    },
    // Критическая настройка chunk size
    chunkSizeWarningLimit: 1000,
    emptyOutDir: true,
    // Предварительная загрузка критических ресурсов
    assetsInlineLimit: 4096, // Инлайним маленькие ассеты
  },
  // Критические CSS настройки
  css: {
    devSourcemap: false,
  },
  base: '/',
})