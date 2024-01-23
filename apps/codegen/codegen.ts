import type { CodegenConfig } from '@graphql-codegen/cli';
import 'dotenv/config';

const config: CodegenConfig = {
  schema: {
    [process.env.GRAPHQL_ENDPOINT]: {
      headers: {
        'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
      },
    },
  },
  generates: {
    '../web/src/lib/$generated/graphql.ts': {
      documents: ['../web/src/lib/graphql/**/*.graphql'],
      plugins: ['typescript', 'typescript-operations', 'graphql-codegen-svelte-apollo'],
      config: {
        clientPath: '../graphql-client.ts',
        asyncQuery: true,
      },
    },
    '../nhost/functions/_lib/$generated/graphql.ts': {
      documents: ['../nhost/functions/_lib/graphql/**/*.graphql'],
      plugins: ['typescript', 'typescript-operations', 'typescript-graphql-request'],
    },
  },
};

export default config;
