import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Con dominio personalizado (revagancia.cl), la web se sirve desde la raíz '/'.
  const base = env.VITE_BASE || '/'

  return {
    base,
    plugins: [tailwindcss(), react()],
    server: {
      host: true,
    },
  }
})
