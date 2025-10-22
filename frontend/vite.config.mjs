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
        // АГРЕССИВНЫЙ chunk splitting для критического LCP < 2.5s
        manualChunks: (id) => {
          // Critical React core - самый приоритетный
          if (id.includes('react') && !id.includes('react-router')) {
            return 'react-core';
          }
          
          // Critical performance components - для LCP
          if (id.includes('src/components/performance')) {
            return 'critical-performance';
          }
          
          // Critical sections (Hero, etc) - для LCP
          if (id.includes('src/components/sections/HeroSection') || 
              id.includes('src/components/sections/TrustSection')) {
            return 'critical-sections';
          }
          
          // Router - отдельно для code splitting
          if (id.includes('react-router')) {
            return 'router';
          }
          
          // UI Icons - часто используемые
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          
          // Forms - lazy load
          if (id.includes('react-hook-form') || id.includes('src/components/forms')) {
            return 'forms';
          }
          
          // Node modules vendor split по размеру
          if (id.includes('node_modules')) {
            // Large libraries separate
            if (id.includes('posthog')) return 'analytics';
            if (id.includes('helmet')) return 'seo';
            
            // Small utilities together
            return 'vendor';
          }
          
          // Pages - individual chunks для lazy loading
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