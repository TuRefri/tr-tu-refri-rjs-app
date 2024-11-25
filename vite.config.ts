import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  plugins: [
    react(), 
    tsconfigPaths(),
    VitePWA({
      registerType:'autoUpdate',
      includeAssets:['pwa-512x512.png'],
      devOptions: {
        enabled: true
      },
      manifest: {
        display: 'standalone',
        display_override: ['window-controls-overlay'],
        lang:'en-US',
        name:'turefri',
        short_name:'TuRefri',
        description:'pwa turefri',
        theme_color: '#19223c',
        background_color:'#d4d4d4',
        icons:[
          {
            src:"pwa-512x512.png",
            sizes:'512x512',
            type:'image/png',
            purpose: 'maskable'
          },
          {
            src:"pwa-512x512.png",
            sizes:'512x512',
            type:'image/png',
            purpose: 'any'
          }
        ],
      }
    })]
})
