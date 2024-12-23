import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/laboratory_node", // Замените RepoName на имя вашего репозитория
  server: { 
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      "/api": {
        target: "http://192.168.15.56:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/"),
      },
      "/lab1": {
        target: "http://192.168.15.56:9000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/lab1/, "/lab1/"),
      },
    }
   },
})
