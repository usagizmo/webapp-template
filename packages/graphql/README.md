# `@nextjs-template/graphql`

## Usage

```
cp .env.example .env
yarn build #=> Output type files to /packages/app/src/plugins/graphql/generated/*
```

## Schema

The current `src/schema.graphql` was exported by Hasura.

<img width="1006" alt="Hasura Schema" src="https://user-images.githubusercontent.com/1271863/100516504-bf241d00-31c7-11eb-8f85-eb02a3112096.png">

```bash
yarn global add graphqurl
gq https://<project-name>.hasura.app/v1/graphql --introspect > src/schema.graphql
```

Remove `src/schema.graphql` if you want to specify a URL in your .env `SCHEMA_PATH`.
