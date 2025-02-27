import path from 'path'
import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import { ViteMinifyPlugin } from 'vite-plugin-minify'
import * as glob from 'glob'
import dbJson from './db.json'

const pagesData = {
  index: {},
  shop: {},
  basket: {
    cart: dbJson.basket,
  
  },
}

export default defineConfig({
  root: path.join(__dirname, 'src'),
  publicDir: path.join(__dirname, 'public'),
  resolve: {
    alias: { '/src': path.resolve(process.cwd(), 'src') },
  },

  plugins: [
    handlebars({
      partialDirectory: path.resolve(__dirname, 'src', 'templates'),
      context: async (pagePath) => {
        const pageKey = pagePath.split('/')?.at(-1)?.replace('.html', '')
        return Object.assign({}, pagesData?.[pageKey] || {})
      },
    }),
    ViteMinifyPlugin({}),
  ],
  build: {
    outDir: path.join(__dirname, 'dist'),
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: glob.sync('./src/**/*.html'),
      output: { dir: path.join(__dirname, 'dist') },
    },
  },
})
