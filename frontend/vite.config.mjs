// vite.config.mjs - OPTIMIZED FOR PERFORMANCE & SEO
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    react({
      // Optimize React
      babel: {
        plugins: [
          // Remove PropTypes in production
          ['babel-plugin-transform-react-remove-prop-types', { removeImport: true }]
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    // Generate hashes for all files
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          const ext = name ? name.split('.').pop() : 'bin'
          return `assets/[name]-[hash].[ext]`
        },
        // Optimize chunk splitting for caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['framer-motion', 'react-hot-toast'],
          forms: ['react-hook-form', 'yup']
        },
      },
    },
    // Performance optimizations
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Bundle size optimizations
    chunkSizeWarningLimit: 1000,
    // Clean dist before build
    emptyOutDir: true,
    // Source maps only in dev
    sourcemap: false,
  },
  // Performance optimizations for dev
  server: {
    host: true,
    port: 3000,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
  base: '/',
})