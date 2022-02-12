# Next.js Template

- [Next.js](https://nextjs.org/) (w/ [TypeScript](https://www.typescriptlang.org/)) - [pathpida](https://github.com/aspida/pathpida)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase (Authentication/Storage)](https://firebase.google.com/) x [NextAuth](https://next-auth.js.org/)
- [Hasura Cloud](https://cloud.hasura.io/)
- [React Query](https://react-query.tanstack.com/) (w/ [GraphQL Code Generator](https://www.graphql-code-generator.com/))
- [Zustand](https://github.com/pmndrs/zustand)
- [ESLint](https://eslint.org/) / [Prettier](https://prettier.io/)
- [husky](https://github.com/typicode/husky) x [lint-staged](https://github.com/okonet/lint-staged)
- GitHub Actions (Formatting + Testing)
- Node (`v16+`) / [pnpm](https://pnpm.io/)

## Prepare .env.local

```bash
cp .env.local.example .env.local
# Then, set it up
```

## Command List

```bash
pnpm i
pnpm dev     # pathpida --watch + next dev
pnpm build   # pathpida && pnpm generate && next build
pnpm start   # next start
pnpm lint    # Linting
pnpm format  # Formatting

pnpm hasura:migrate:apply # Apply table structure to Hasura
# The first time you run this, you may need to [Track] all tables on Hasura

pnpm hasura:migrate:export   # Get table structure from Hasura
pnpm hasura:seed:apply       # Apply Seed to Hasura
pnpm hasura:seed:export --from-table <table1>  # Get Seed per table from Hasura
pnpm hasura:metadata:apply   # Apply DB meta information to Hasura
pnpm hasura:metadata:export  # Get DB meta information from Hasura

pnpm generate  # Output GraphQL code
# Output (`src/generated/graphql.ts`) from Hasura schema and contents of `graphql/`.
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

## Set up Firebase

### Use

- Authentication (Email/password)
- Firestore
- Functions (Need to upgrade to **Blaze** plan)
- Storege

※Before using the CLI, please make sure you have set up Firebase

### Requirement

- [Firebase CLI](https://firebase.google.com/docs/cli) (v9.23.0+)

### Commands

```
# Execute command operations in the `firebase/`
cd firebase

# Already done it
# firebase init

# Set project
firebase use --add <firebase-project-id>

# In the `firebase/functions/`
cd functions
pnpm i

# Add 2 environment variables
firebase functions:config:set hasura.endpoint=https://<hasura-project-name>.hasura.app/v1/graphql --project <firebase-project-id>
firebase functions:config:set hasura.admin.secret=<HASURA_GRAPHQL_ADMIN_SECRET> --project <firebase-project-id>

# How to check the environment variables that have been set
# firebase functions:config:get

# Deploy firebase
firebase deploiy

# Deploy only functions
# pnpm deploy
```

## Registering environment variables for GitHub / Vercel (or Netlify)

If you need to prepare the GitHub / Vercel (or Netlify) environment, you will need to set the environment variables (the contents of `.env.local`) at build time.

## Deploy to Vercel

To use `pnpm`, configure the following settings in Vercel `Project Settings`.

`General` > `Build` & `Development Settings` > `INSTALL COMMAND`:

```bash
npm i pnpm -g && pnpm i
```
