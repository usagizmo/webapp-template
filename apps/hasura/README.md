# Hasura

## Handling Hasura Cloud's database in code

The [Hasura CLI](https://hasura.io/docs/latest/graphql/core/hasura-cli/index/) allows you to easily manage Hasura Cloud's database.

## Start Hasura on Docker

```bash
pnpm dev # Run local hasura server on http://localhost:49180
# admin-secret is: hasura_graphql_admin_secret_xxxx
```

### Connect Database

`Data > Connect Database [Connect Existing Database]`

- Database Display Name: `default`
- Data Source Driver: `PostgreSQL`
- Connect Database Via: `Environment Variable`
  - Environment Variable: `PG_DATABASE_URL`

ref: https://hasura.io/docs/latest/graphql/core/getting-started/docker-simple/

## Commands

```bash
pnpm migrate:apply # Apply table structure to Hasura
# The first time you run this, you may need to [Track] all tables on Hasura

pnpm seed:apply       # Apply Seed to Hasura
pnpm metadata:apply   # Apply DB meta information to Hasura

# Exports
pnpm migrate:export   # Get table structure from Hasura
pnpm seed:export -- --from-table <table1> [--from-table <table2>] # Export seed data from tables
pnpm metadata:export  # Get DB meta information from Hasura
```

### Prepare Hasura Cloud

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
