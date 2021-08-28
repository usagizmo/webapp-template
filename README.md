This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Handling Hasura Cloud's database in code

The [Hasura CLI](https://hasura.io/docs/1.0/graphql/core/hasura-cli/index.html) allows you to easily manage Hasura Cloud's database.  
After completing the settings in Hasura Cloud, execute the following command.

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
npx hasura metadata apply
npx hasura seed apply
```

### Retrieve Hasura Cloud settings

```bash
npx hasura migrate create init --from-server
# ref: https://hasura.io/docs/2.0/graphql/core/hasura-cli/hasura_migrate_create.html

npx hasura metadata export
# ref: https://hasura.io/docs/2.0/graphql/core/hasura-cli/hasura_metadata_export.html

npx hasura seed create tables_seed <--from-table table1 --from-table table2>
# ref: https://hasura.io/docs/2.0/graphql/core/hasura-cli/hasura_seed_create.html
```

## Set up Firebase

### Use

- Authentication (Email/password)
- Firestore
- Functions (Need to upgrade to **Blaze** plan)
- Storege

### Requirement

- `nodenv` to use node `v14.5.0` / [anyenv](https://github.com/anyenv/anyenv)
- [Firebase CLI](https://firebase.google.com/docs/cli)

### Commands

```
cd firebase

# Already done it
# firebase init

cd functions
yarn

# Add Environment Variable
firebase functions:config:set hasura.endpoint=https://<project-name>.hasura.app/v1/graphql --project <project-name>
firebase functions:config:set hasura.admin.secret=<HASURA_GRAPHQL_ADMIN_SECRET> --project <project-name>

# Deploy functions
yarn deploy
```

## Set up GitHub / Vercel (or Netlify)

If you need to prepare the GitHub / Vercel (or Netlify) environment, you will need to set the necessary environment variables (the contents of `.env.local`) at build time.
