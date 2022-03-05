# Set up Hasura Cloud

```bash
pnpm migrate:apply # Apply table structure to Hasura
# The first time you run this, you may need to [Track] all tables on Hasura

pnpm migrate:export   # Get table structure from Hasura
pnpm seed:apply       # Apply Seed to Hasura
pnpm seed:export -- --from-table <table1> [--from-table <table2>] # Export seed data from tables
pnpm metadata:apply   # Apply DB meta information to Hasura
pnpm metadata:export  # Get DB meta information from Hasura
```

## Handling Hasura Cloud's database in code

The [Hasura CLI](https://hasura.io/docs/1.0/graphql/core/hasura-cli/index.html) allows you to easily manage Hasura Cloud's database.  
After completing the settings in Hasura Cloud, execute the following command.

※Before using the CLI, please make sure you have set up Hasura Cloud (create a project/database connection)

### Prepare to use hasura-cli

Set the following 2 environment variables.

- `HASURA_GRAPHQL_JWT_SECRET`:  
  Set **JWT Config** to work with `Firebase Authentication`.  
  [https://hasura.io/jwt-config/](https://hasura.io/jwt-config/)
- `HASURA_GRAPHQL_UNAUTHORIZED_ROLE`:  
  Set the role for unlogged users to `anonymous`.

If you are using a hosting service other than Hasura Cloud, you will also need to check and change the values of the other environment variables.

- `HASURA_GRAPHQL_ADMIN_SECRET`:  
  Use `openssl rand -hex 32` or similar to generate and set the value.  
  In addition to that, set the same value for `x-hasura-admin-secret` in Console's `API` > `GraphiQL` > `Request Headers`.
- `PG_DATABASE_URL`:  
  This points to the URL of the DB that Hasura is using.  
  We set this environment variable key name to `configuration.connection_info.database_url.from_env` in `hasura/metadata/databases/databases.yaml`.  
  For example, if you want to use [Render](https://render.com/), you need to change this key name in the above file to `HASURA_GRAPHQL_DATABASE_URL`.
