import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Build output goes into the theme folder so WordPress can serve it
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'build',
    emptyDirOutDir: true,
    rollupOptions: {
      input: 'src/main.jsx',
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  server: {
    proxy: {
      // Proxy API requests to your WordPress during development
      '/wp-json': {
        target: 'http://localhost',
        changeOrigin: true,
      },
    },
  },
});
