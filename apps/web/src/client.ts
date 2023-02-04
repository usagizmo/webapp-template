import { PUBLIC_GRAPHQL_ENDPOINT } from '$env/static/public';
import { HoudiniClient, type RequestHandlerArgs } from '$houdini';
import { createClient } from 'graphql-ws';
import { browser } from '$app/environment';

const fetchQuery = async ({ fetch, text = '', variables = {}, session }: RequestHandlerArgs) => {
  const url = PUBLIC_GRAPHQL_ENDPOINT;
  const token = session.token as string | null;
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      query: text,
      variables,
    }),
  });
  return await result.json();
};

const socketClient = browser
  ? // @ts-expect-error - for using new
    new createClient({
      url: PUBLIC_GRAPHQL_ENDPOINT.replace(/^http(s?):/, 'ws$1:'),
    })
  : null;

export default new HoudiniClient(fetchQuery, socketClient);
