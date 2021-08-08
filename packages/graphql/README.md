# `@nextjs-template/graphql`

## Usage

```
# vi .env # Update
yarn build #=> Output files to `/generated/*` and `/dist/*`
```

## Schemas

The current `src/schema.graphql` was exported by Hasura.

<img width="1006" alt="Hasura Schema" src="https://user-images.githubusercontent.com/1271863/100516504-bf241d00-31c7-11eb-8f85-eb02a3112096.png">

```bash
npx graphqurl https://<project-name>.hasura.app/v1/graphql -H "X-Hasura-Admin-Secret: <admin-secret-key>" --introspect > src/schema.graphql
# ref: https://hasura.io/docs/latest/graphql/core/guides/export-graphql-schema.html
```

Remove `src/schema.graphql` if you want to specify a URL in your .env `SCHEMA_PATH`.

## Handling Hasura Cloud's database in code

The [Hasura CLI](https://hasura.io/docs/1.0/graphql/core/hasura-cli/index.html) allows you to easily manage Hasura Cloud's database.  
After completing the settings in Hasura Cloud, execute the following command.

```bash
# If you have not created an `.env`
cp .env.example .env # Then, set it up

# Add `hasura` directory
npx hasura init hasura --endpoint https://<project-name>.hasusura.app --admin-secret <admin-secret-key>

cd hasura
npx hasura migrate create "init" --from-server
# ref: https://hasura.io/docs/2.0/graphql/core/hasura-cli/hasura_migrate_create.html

npx hasura metadata export
# ref: https://hasura.io/docs/2.0/graphql/core/hasura-cli/hasura_metadata_export.html

npx hasura seed create tables_seed <--from-table table1 --from-table table2>
# ref: https://hasura.io/docs/2.0/graphql/core/hasura-cli/hasura_seed_create.html
```

### Apply the code to Hasura Cloud

```bash
cd hasura
npx hasura migrate apply
npx hasura metadata apply
npx hasura seed apply
```
