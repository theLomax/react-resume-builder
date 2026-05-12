import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import { readFileSync } from 'fs'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    {
      name: 'dev-favicon',
      transformIndexHtml(html) {
        if (command !== 'serve') return html
        const svg = readFileSync(resolve(__dirname, 'public/favicon.svg'), 'utf-8')
        const devSvg = svg.replace(/(class="primary"[^>]*)fill="[^"]*"/, '$1fill="#22c55e"')
        const dataUri = `data:image/svg+xml,${encodeURIComponent(devSvg)}`
        return html.replace(/(<link rel="icon"[^>]*href=")[^"]*(")/,`$1${dataUri}$2`)
      },
    },
  ],
}))
