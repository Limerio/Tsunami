import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import node from '@astrojs/node'

export default defineConfig({
  outDir: '../../dist/apps/web',
  output: 'server',
  adapter: node({
    mode: 'middleware',
  }),
  integrations: [react()],
})
