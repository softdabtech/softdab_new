import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Если деплой на поддиректорию — укажи base, иначе оставь закомментированным
  // base: '/',

  // При необходимости алиасов:
  // resolve: {
  //   alias: {
  //     '@': '/src',
  //   },
  // },

  // Если нужен прокси для API в dev:
  // server: {
  //   proxy: {
  //     '/api': 'http://localhost:3000'
  //   }
  // },

  // Опционально: строгие предупреждения/ошибки билдера
  // build: {
  //   sourcemap: false,
  //   outDir: 'dist',
  // }
});