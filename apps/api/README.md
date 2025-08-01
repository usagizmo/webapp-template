# API ([Supabase](https://supabase.com/))

[Supabase](https://supabase.com/) local development environment with PostgreSQL, Auth, and API services.

## Commands

```bash
pnpm start      # Start Supabase locally
pnpm stop       # Stop Supabase
pnpm status     # Show Supabase service status
pnpm reset      # Reset database and regenerate types
pnpm generate   # Generate TypeScript types
pnpm test       # Run database tests
```

For additional Supabase CLI commands and usage, see the [official CLI reference](https://supabase.com/docs/reference/cli/introduction).

## Development

1. `pnpm start` - Start Supabase
2. Access Studio: http://localhost:54323
3. `pnpm generate` - Update types after schema changes

## Testing

```bash
pnpm test  # Run all database tests (requires Supabase running)
```

Test files in `supabase/tests/` cover database schema, CRUD operations, RLS policies, and triggers.

## Port Numbers

- API: 54321
- Database: 54322
- Studio: 54323
- Inbucket (Email): 54324

See the [root README](../../README.md) for complete setup instructions.
