import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
    sourcemap: process.env.NODE_ENV !== 'production',
    minify: 'esbuild', // Use esbuild instead of terser (faster and no extra dependency)
    rollupOptions: {
      output: {
        manualChunks: {
          // Code splitting for better performance
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
          i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true,
  },
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './src/components'),
      '@/assets': resolve(__dirname, './src/assets'),
      '@/types': resolve(__dirname, './src/types'),
      '@/utils': resolve(__dirname, './src/utils'),
      '@/config': resolve(__dirname, './src/config'),
      '@/contexts': resolve(__dirname, './src/contexts'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'i18next', 'react-i18next'],
  },
  // Performance optimizations
  server: {
    hmr: {
      overlay: true,
    },
  },
})
