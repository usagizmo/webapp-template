import { sveltekit } from '@sveltejs/kit/vite';
import houdini from 'houdini/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      houdini({
        apiUrl: env.PUBLIC_GRAPHQL_ENDPOINT,
        schemaPollHeaders: {
          'x-hasura-admin-secret': env.HASURA_ADMIN_SECRET,
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any),
      sveltekit(),
    ],
    test: {
      include: ['src/**/*.{test,spec}.{js,ts}'],
    },
  };
});
