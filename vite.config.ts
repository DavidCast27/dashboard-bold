import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import {coverageConfigDefaults} from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'clover', 'json'],
      exclude: [
        ...coverageConfigDefaults.exclude,
      ],
    },
  },

})
