import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed on Vercel / Netlify at the domain root, so base stays "/".
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    target: 'es2020',
    sourcemap: false,
    chunkSizeWarningLimit: 1400,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber'],
          gsap: ['gsap'],
        },
      },
    },
  },
})