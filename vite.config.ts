/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      '@': process.cwd(),
    },
  },
  test: {
    globals: true,
    environment: 'node',
  },
});
