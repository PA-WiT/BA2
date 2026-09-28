import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages serves this repo at https://pa-wit.github.io/BA2/, so assets
// need that subpath prefix in production builds. Local dev stays at '/'.
// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/BA2/' : '/',
  plugins: [react()],
})
