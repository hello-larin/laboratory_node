import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/laboratory_node", // Замените RepoName на имя вашего репозитория
  server: { 
    port: 3000,
    proxy: {
      "/api": {
        target: "http://192.168.100.4:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/"),
      },
    }
   },
})
