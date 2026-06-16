import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' keeps the build relocatable (works on GitHub Pages project
// sites and user sites alike without configuring a repo name here).
export default defineConfig({
  base: './',
  plugins: [react()],
});
