import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Medical System',
        short_name: 'Medical',
        description: 'Sistema de gestión médica',
        theme_color: '#10b981', // Tailwind: emerald-600
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'img/logo/dental-max.svg',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'img/logo/dental-max.svg',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'img/logo/dental-max.svg',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
});
