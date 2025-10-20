import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    port: 5173, // your dev server port
    allowedHosts: ['.ngrok-free.dev'], // allow any ngrok free domain
  },
})
