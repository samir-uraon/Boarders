import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv"
dotenv.config()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  server:{
    allowedHosts:true,
    port:process.env.VITE_port,
    host:process.env.VITE_host
  }
})
