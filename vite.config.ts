import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  // Netlify normalmente deploya en '/', mientras que GitHub Pages requiere '/<repo>/'.
  // Seteá VITE_BASE="/revagancia-web/" (ejemplo) al buildear para Pages.
  const base = env.VITE_BASE || '/'

  return {
    base,
    plugins: [tailwindcss(), react()],
  }
})
