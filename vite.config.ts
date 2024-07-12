import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    server: {
      port: 3000,
      host: true,
      proxy: {
        '/api': {
          target: 'http://host.docker.internal:3001',
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
    plugins: [react(), svgr()],
  };
});
