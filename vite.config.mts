/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@/components': '/src/components',
      '@/pages': '/src/pages',
      '@/services': '/src/services',
      '@/const': '/src/const',
      '@/models': '/src/models',
      '@/hooks': '/src/hooks',
      '@/stories': '/src/stories',
      '@/styles': '/src/styles',
    },
  },
});