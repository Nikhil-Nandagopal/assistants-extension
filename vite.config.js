import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        content: 'src/content.js'
      },
      output: {
        entryFileNames: '[name].js',
        format: 'es'
      }
    }
  }
});