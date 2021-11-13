# Next.js Template

- [Next.js](https://nextjs.org/) (w/ [TypeScript](https://www.typescriptlang.org/))
- [Tailwind CSS (jit)](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Firebase (Authentication/Storage)](https://firebase.google.com/)
- [Hasura Cloud](https://cloud.hasura.io/)
- [React Query](https://react-query.tanstack.com/) (w/ [GraphQL Code Generator](https://www.graphql-code-generator.com/))
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [husky](https://github.com/typicode/husky) x [lint-staged](https://github.com/okonet/lint-staged)
- GitHub Actions (Formatting + Testing)

## Prepare .env.local

```bash
cp .env.local.example .env.local
# Then, set it up
```

## Command List

```bash
yarn dev     # next dev
yarn build   # yarn generate && next build
yarn start   # next start
yarn lint    # Linting
yarn format  # Formatting
yarn hasura:migrate:apply    # Apply table structure to Hasura
yarn hasura:migrate:export   # Get table structure from Hasura
yarn hasura:seed:apply       # Apply Seed to Hasura
yarn hasura:seed:export --from-table <table1>  # Get Seed per table from Hasura
yarn hasura:metadata:apply   # Apply DB meta information to Hasura
yarn hasura:metadata:export  # Get DB meta information from Hasura
yarn generate                # Output GraphQL code (`src/generated/graphql.ts`) from Hasura schema and contents of `graphql/`.
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

- `nodenv` to use node `v14.5.0` / [anyenv](https://github.com/anyenv/anyenv)
- [Firebase CLI](https://firebase.google.com/docs/cli)

### Commands

```
# Execute command operations in the `firebase/`
cd firebase

# Already done it
# firebase init

# Set project
firebase use --add <project-id>

# In the `firebase/functions/`
cd functions
yarn

# Add 2 environment variables
firebase functions:config:set hasura.endpoint=https://<project-name>.hasura.app/v1/graphql --project <project-id>
firebase functions:config:set hasura.admin.secret=<HASURA_GRAPHQL_ADMIN_SECRET> --project <project-id>

# Deploy functions
yarn deploy
```

## Registering environment variables for GitHub / Vercel (or Netlify)

If you need to prepare the GitHub / Vercel (or Netlify) environment, you will need to set the environment variables (the contents of `.env.local`) at build time.
