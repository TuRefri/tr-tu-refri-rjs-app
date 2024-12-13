import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  esbuild: {
    drop: ['console', 'debugger'],
   },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  server: {
    fs: {
      cachedChecks: false
    }
  },
  plugins: [
    react(), 
    tsconfigPaths(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,webp}'],
        runtimeCaching: [
          {
            urlPattern: /\/?.*\?.*/, 
            handler: 'NetworkFirst',
            options: {
              cacheName: 'query-params-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, 
              },
            },
          },
          {
            urlPattern: /^https:\/\/example\.com\/api\/.*$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7,
              },
            },
          },
        ],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [
          new RegExp('^/api')
        ],
      },
      includeAssets: [
        'pwa-512x512.png',
        'pwa-64x64.png', 
        'pwa-192x192.png', 
        'maskable-icon-512x512.png', 
        'apple-touch-icon-180x180.png'
      ],
      devOptions: {
        enabled: true
      },
      manifest: {
        display: 'standalone',
        display_override: ['window-controls-overlay'],
        lang: 'en-US',
        name: 'turefri',
        short_name: 'TuRefri',
        description: 'pwa turefri',
        theme_color: '#19223c',
        background_color: '#d4d4d4',
        icons: [
          {
            "src": "pwa-64x64.png",
            "sizes": "64x64",
            "type": "image/png"
          },
          {
            "src": "pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "maskable-icon-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "apple-touch-icon-180x180.png",
            "sizes": "180x180",
            "type": "image/png"
          },
        ],
      },
    }),
  ],
});
