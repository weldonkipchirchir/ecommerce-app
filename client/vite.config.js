import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import vitePluginRequire from 'vite-plugin-require'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginRequire.default()],
  
})
