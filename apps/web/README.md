| [README.md](../../README.md) | [firebase](../../apps/firebase/README.md) | [hasura](../../apps/hasura/README.md) | [web](../../apps/web/README.md) |
| ---------------------------- | ----------------------------------------- | ------------------------------------- | ------------------------------- |

## `web` app

```bash
pnpm generate  # Export the pathpida and graphql files under `src/generated/`
pnpm build     # pnpm generate && next build
pnpm dev       # pathpida --watch + graphql-codegen --watch + next dev
pnpm start     # next start
pnpm lint      # next
pnpm lint:fix  # next --fix
```
