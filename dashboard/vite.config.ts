import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import dotenv from "dotenv"
dotenv.config()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: parseInt(process.env.VITE_PORT!),
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:" + process.env.VITE_PORT!,
  }
})
