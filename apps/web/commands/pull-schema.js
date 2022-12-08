import { execSync } from 'child_process';
execSync(
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  `gq ${process.env.PUBLIC_GRAPHQL_ENDPOINT} -H "X-Hasura-Admin-Secret: ${process.env.HASURA_ADMIN_SECRET}" --introspect > schema.graphql`
);
