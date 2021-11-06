# Next.js Template

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Firebase (Authentication)](https://firebase.google.com/)
- [Hasura Cloud](https://cloud.hasura.io/)
- [React Query](https://react-query.tanstack.com/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [husky](https://github.com/typicode/husky) x [lint-staged](https://github.com/okonet/lint-staged)
- GitHub Actions (Formatting + Testing)

## Handling Hasura Cloud's database in code

The [Hasura CLI](https://hasura.io/docs/1.0/graphql/core/hasura-cli/index.html) allows you to easily manage Hasura Cloud's database.  
After completing the settings in Hasura Cloud, execute the following command.

※Before using the CLI, please make sure you have set up Hasura Cloud (create a project/database connection)

### Prepare to use hasura-cli

```bash
# Already done it
# npx hasura init hasura --endpoint https://<project-name>.hasura.app --admin-secret <admin-secret-key>

cd hasura
cp .env.example .env
# Then, set it up
```

Set Hasura's environment variable `HASURA_GRAPHQL_JWT_SECRET` to work with `Firebase Authentication`.  
[https://hasura.io/jwt-config/](https://hasura.io/jwt-config/)

Set `HASURA_GRAPHQL_UNAUTHORIZED_ROLE` to `anonymous` as well.

### Apply the code to Hasura Cloud

```bash
cd hasura
npx hasura migrate apply
npx hasura seed apply
npx hasura metadata apply
```

### Retrieve Hasura Cloud settings

```bash
cd hasura

npx hasura migrate create init --from-server
# ref: https://hasura.io/docs/2.0/graphql/core/hasura-cli/hasura_migrate_create.html

npx hasura seed create tables_seed <--from-table table1 --from-table table2>
# ref: https://hasura.io/docs/2.0/graphql/core/hasura-cli/hasura_seed_create.html

npx hasura metadata export
# ref: https://hasura.io/docs/2.0/graphql/core/hasura-cli/hasura_metadata_export.html
```

## Set up Firebase

### Use

- Authentication (Email/password)
- Firestore
- Functions (Need to upgrade to **Blaze** plan)
- Storege

※Before using the CLI, please make sure you have set up Firebase

### Requirement

- `nodenv` to use node `v14.5.0` / [anyenv](https://github.com/anyenv/anyenv)
- [Firebase CLI](https://firebase.google.com/docs/cli)

### Commands

```
cd firebase

# Already done it
# firebase init

# Set project
firebase use --add <project-id>

cd functions
yarn

# Add Environment Variable
firebase functions:config:set hasura.endpoint=https://<project-name>.hasura.app/v1/graphql --project <project-id>
firebase functions:config:set hasura.admin.secret=<HASURA_GRAPHQL_ADMIN_SECRET> --project <project-id>

# Deploy functions
yarn deploy
```

## Prepare .env.local

```bash
cp .env.local.example .env.local
# Then, set it up
```

## Set up GitHub / Vercel (or Netlify)

If you need to prepare the GitHub / Vercel (or Netlify) environment, you will need to set the necessary environment variables (the contents of `.env.local`) at build time.
