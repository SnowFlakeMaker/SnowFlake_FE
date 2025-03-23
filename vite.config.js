import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://52.79.237.120:8080', // EC2 주소
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
        ws: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            if (req.url?.includes('/sse/subscribe')) {
              proxyReq.setHeader('Accept', 'text/event-stream');
              proxyReq.setHeader('Cache-Control', 'no-cache');
              proxyReq.setHeader('Connection', 'keep-alive');
            }
          });
        }
      }
    }
  }
})