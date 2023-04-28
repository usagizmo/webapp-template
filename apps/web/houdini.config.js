/** @type {import('houdini').ConfigFile} */
const config = {
  watchSchema: {
    url: 'env:PUBLIC_GRAPHQL_ENDPOINT',
    headers: {
      'X-Hasura-Admin-Secret': (env) => env.HASURA_ADMIN_SECRET,
    },
  },
  plugins: {
    'houdini-svelte': {
      client: './src/client',
    },
  },
  scalars: {
    // ref: https://www.houdinigraphql.com/api/config#custom-scalars
    uuid: {
      type: 'string',
      unmarshal: (val) => val,
      marshal: (text) => text,
    },
    citext: {
      type: 'string',
      unmarshal: (val) => val,
      marshal: (text) => text,
    },
    timestamptz: {
      type: 'Date',
      unmarshal: (val) => new Date(val),
      marshal: (date) => date.getTime(),
    },
  },
};

export default config;
