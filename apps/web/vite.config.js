import { sveltekit } from '@sveltejs/kit/vite';
import houdini from 'houdini/vite';

/** @type {import('vite').UserConfig} */
export default {
  plugins: [houdini(), sveltekit()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
  // TODO: To use Vite 5 for now
  // ref. https://github.com/vitejs/vite/issues/15274
  resolve: {
    mainFields: ['browser', 'module', 'jsnext:main', 'jsnext'],
  },
};
