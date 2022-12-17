import { sveltekit } from '@sveltejs/kit/vite';
import houdini from 'houdini/vite';
import { defineConfig, loadEnv, type UserConfigExport } from 'vite';

const config: UserConfigExport = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      houdini({
        apiUrl: env.PUBLIC_GRAPHQL_ENDPOINT,
        schemaPollHeaders: {
          'x-hasura-admin-secret': env.HASURA_ADMIN_SECRET,
        },
      }),
      sveltekit(),
    ],
    test: {
      include: ['src/**/*.{test,spec}.{js,ts}'],
    },
  };
});

export default config;
