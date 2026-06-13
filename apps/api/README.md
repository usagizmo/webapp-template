# API ([Supabase](https://supabase.com/))

Local [Supabase](https://supabase.com/) development environment — PostgreSQL, Auth, and API services.

See the [root README](../../README.md) for commands and ports. For the full CLI, see the [official reference](https://supabase.com/docs/reference/cli/introduction).

## Workflow

1. `bun start` — start Supabase
2. Open Studio at http://localhost:54323
3. `bun generate` — regenerate TypeScript types after schema changes

## Testing

`bun test` runs the database tests in `supabase/tests/`, covering schema, CRUD operations, RLS policies, and triggers (requires Supabase running).
