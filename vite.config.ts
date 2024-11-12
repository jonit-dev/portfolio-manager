/* eslint-disable import/no-default-export */
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export const viteConfig = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@store': path.resolve(__dirname, './src/store'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@types': path.resolve(__dirname, './src/types'),
      '@views': path.resolve(__dirname, './src/views'),
      '@config': path.resolve(__dirname, './src/config'),
      '@validation': path.resolve(__dirname, './src/validation'),
      '@mocks': path.resolve(__dirname, './src/mocks'),
    },
  },
});

export default viteConfig;
