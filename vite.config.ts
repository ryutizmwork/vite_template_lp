import { resolve } from 'path'
import { defineConfig } from 'vite'

const noAttr = () => {
  return {
    name: 'no-attribute',
    transformIndexHtml(html) {
      return html.replace(/\s(type="module"|crossorigin(="[^"]*")?)/g, '')
    }
  }
}

export default defineConfig({
  plugins: [noAttr()],
  base: './', // 相対パスで解決
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about/index.html'),
      }
    }
  },
  css: {
    devSourcemap: true
  }
})
