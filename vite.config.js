import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/PuzzleGame/', // 👈 This fixes the blank white screen
  plugins: [react()],
});
