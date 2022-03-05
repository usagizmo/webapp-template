# Set up Firebase

## Use

- Authentication (Email/password)
- Firestore
- Functions (Need to upgrade to **Blaze** plan)
- Storege

※Before using the CLI, please make sure you have set up Firebase

## Requirement

- [Firebase CLI](https://firebase.google.com/docs/cli) (v9.23.0+)

## Commands

```bash
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
firebase functions:config:set hasura.endpoint=https://<hasura-project-name>.hasura.app/v1/graphql
firebase functions:config:set hasura.admin.secret=<HASURA_GRAPHQL_ADMIN_SECRET>

# How to check the environment variables that have been set
# firebase functions:config:get

# Deploy firebase
firebase deploy

# Deploy only functions
# pnpm deploy
```
