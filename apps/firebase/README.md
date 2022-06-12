# Set up Firebase

## Use

- Authentication (Email/password)
- Firestore
- Functions (Need to upgrade to **Blaze** plan)
- Storege

## Requirement

- [Firebase CLI](https://firebase.google.com/docs/cli) (v11.0.1+)

※Before using the CLI, please make sure you have set up [Firebase](https://firebase.google.com/)

## Commands

```bash
# Set project
firebase use --add <firebase-project-id>
# `.firebaserc` is created

# In the `firebase/functions/`
cd functions

# Add 2 environment variables
firebase functions:config:set hasura.endpoint=https://<hasura-project-name>.hasura.app/v1/graphql
firebase functions:config:set hasura.admin.secret=<HASURA_GRAPHQL_ADMIN_SECRET>

# How to check the environment variables that have been set
# firebase functions:config:get

# Deploy firebase
firebase deploy

# Custom commands
pnpm build # build functions and update `./functions/lib`
pnpm dev   # Start the emulator server on http://localhost:4000 (and on port 9099, 5001, 8080, 8085, 9119)
```
