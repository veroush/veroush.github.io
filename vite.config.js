import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index:   'index.html',
        about:   'about.html',
        work:    'work.html',
        contact: 'contact.html',
      }
    }
  },
  optimizeDeps: {
    exclude: ['./js/main.js', './js/work.js']
  },
  plugins: [
    {
      name: 'no-transform-plain-js',
      transform(code, id) {
        if (id.includes('/js/main.js') || id.includes('/js/work.js')) {
          return { code, map: null }
        }
      }
    }
  ]
})