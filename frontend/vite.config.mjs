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
    target: 'es2020', // Современные браузеры = меньший bundle
    minify: 'terser',
    cssMinify: 'lightningcss',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2, // Две итерации сжатия
      },
      format: {
        comments: false, // Удалить все комментарии
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
        // КРИТИЧЕСКОЕ: React ecosystem должен быть в ОДНОМ чанке для избежания cross-chunk dependency errors
        manualChunks: (id) => {
          // Analytics - отдельный чанк для lazy loading
          if (id.includes('node_modules/posthog')) {
            return 'analytics';
          }

          // ВСЁ из node_modules в vendor-react (безопасный вариант)
          // Разделение React ecosystem на части вызывает "forwardRef is undefined"
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
    chunkSizeWarningLimit: 500,
    emptyOutDir: true,
    // Предварительная загрузка критических ресурсов
    assetsInlineLimit: 2048, // Меньше inline = лучше кеширование
    reportCompressedSize: false, // Ускорение сборки
  },
  // Критические CSS настройки
  css: {
    devSourcemap: false,
  },
  base: '/',
})