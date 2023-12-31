import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import houdini from 'houdini/vite';

export default defineConfig({
  plugins: [houdini(), sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
});
