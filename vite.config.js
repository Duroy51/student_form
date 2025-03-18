import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({
    jsxRuntime: 'classic', // Ajoutez cette ligne si nécessaire
  })],
  esbuild: {
    loader: 'jsx',
  },
})