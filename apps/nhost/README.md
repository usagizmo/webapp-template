# `nhost` app

> The Open Source Firebase Alternative with GraphQL
> Make backend easy. Never manage infrastructure
> Database / GraphQL API / Authentication / Storage / Serverless Functions

ref: https://nhost.io/

## Commands

```bash
pnpm dev     # Launch Nhost dev server
pnpm lint    # markuplint the contents of email
pnpm format  # Format with `prettier`
```

## Local **sign up** process

Once you have signed up, check your email to MailHog.  
http://localhost:8025/

## Reset local database

Delete `apps/nhost/.nhost` and start the dev server again with `pnpm dev`.

## (Nhost) Production settings

- Deployment Branch: `main`
- Base Directory: `./apps/nhost/`
