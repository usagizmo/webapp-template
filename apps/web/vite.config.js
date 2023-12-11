import { sveltekit } from '@sveltejs/kit/vite';
import houdini from 'houdini/vite';

/** @type {import('vite').UserConfig} */
export default {
  plugins: [houdini(), sveltekit()],
  test: {
      include: ['src/**/*.{test,spec}.{js,ts}'],
    },
};
