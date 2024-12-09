import { resolve } from 'path'
import { defineConfig } from 'vite'

const root = 'src'
export default defineConfig({
  root: root,
  publicDir: '../public/',
  build: {
    outDir: '../dist', // ビルド成果物の生成先
    rollupOptions: {
      output: {
        // entry chunk assets それぞれの書き出し名の指定
        entryFileNames: `assets/js/script.js`,
        chunkFileNames: `assets/js/script.js`,
        assetFileNames: (assetInfo) => {
          const { name } = assetInfo
          if (!name) return 'assets/[name].[ext]'
          const isImg = /\.( gif|jpeg|jpg|png|svg|webp| )$/.test(name)
          const isCss = /\.css$/.test(name)
          let assetType: 'img' | 'css' | undefined = isImg
            ? 'img'
            : isCss
              ? 'css'
              : undefined
          switch (assetType) {
            case 'img':
              return 'assets/images/[name].[ext]'
            case 'css':
              return 'assets/css/style.css'
            default:
              return 'assets/[name].[ext]'
          }
        }
      },
      input: {
        main: resolve(__dirname, root, 'index.html'),
        about: resolve(__dirname, root, 'about/index.html'),
      }
    }
  },
  css: {
    devSourcemap: true,
  }
})