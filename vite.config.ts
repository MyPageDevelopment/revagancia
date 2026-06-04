import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Netlify normalmente deploya en '/', mientras que GitHub Pages requiere '/<repo>/'.
  // En producción, usamos '/revagancia/' (nombre del repo de GitHub).
  const base = env.VITE_BASE || (mode === 'production' ? '/revagancia/' : '/')

  return {
    base,
    plugins: [tailwindcss(), react()],
    server: {
      host: true,
    },
  }
})
