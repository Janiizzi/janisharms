import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss(), svgr()],
  ...(isSsrBuild && {
    ssr: {
      external: ['@lottiefiles/dotlottie-react'],
    },
  }),
  build: {
    outDir: isSsrBuild ? 'dist/ssr-server' : 'dist',
    sourcemap: false,
    ...(!isSsrBuild && {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'lottie': ['@lottiefiles/dotlottie-react'],
            'fontawesome': [
              '@fortawesome/fontawesome-svg-core',
              '@fortawesome/free-brands-svg-icons',
              '@fortawesome/free-regular-svg-icons',
              '@fortawesome/free-solid-svg-icons',
              '@fortawesome/react-fontawesome',
            ],
          },
        },
      },
    }),
  },
}))
