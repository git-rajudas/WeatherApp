import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",

      manifest:{
        name: "Weather App",
        short_name: "Weather",
        description: "Modern Weather Application",
        theme_color: "#3b82f6",

        icons: [
          {
            src: "/weatherLogo.png",
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/weatherLogo.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ]
      }
    })
  ],
})
