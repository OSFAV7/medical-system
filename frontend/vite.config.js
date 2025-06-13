import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),   // <<< esto
  ],
  resolve: {
    extensions: ['.js', '.jsx'],  // opcional, pero puede ayudar
  }
})
