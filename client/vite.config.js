import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy: {
      '/api': 'https://glorious-space-sniffle-q5r6w755g4qf4gg7-5000.app.github.dev'
    }
  },
  plugins: [
    react(),
    tailwindcss()
  ],
})
