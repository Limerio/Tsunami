import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import node from '@astrojs/node'
import 'dotenv/config'

export default defineConfig({
  outDir: '../../dist/apps/web',
  output: 'server',
  adapter: node({
    mode: 'middleware',
  }),
  integrations: [react()],
  server: {
    port: Number(process.env.PORT),
  },
})
