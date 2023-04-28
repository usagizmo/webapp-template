import { createClient } from 'graphql-ws';
import { PUBLIC_GRAPHQL_ENDPOINT } from '$env/static/public';
import { subscription } from '$houdini/plugins';
import { HoudiniClient } from '$houdini';

const url = PUBLIC_GRAPHQL_ENDPOINT;
const wsUrl = PUBLIC_GRAPHQL_ENDPOINT.replace(/^http(s?):/, 'ws$1:');

export default new HoudiniClient({
  url,
  fetchParams({ session }) {
    const token = session?.token ?? null;
    return {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };
  },
  plugins: [
    subscription(({ session }) => {
      const token = session?.token ?? null;
      return createClient({
        url: wsUrl,
        connectionParams: {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        },
      });
    }),
  ],
});
