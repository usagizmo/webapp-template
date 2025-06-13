# Backend ([Supabase](https://supabase.com/))

[Supabase](https://supabase.com/) local development environment with PostgreSQL, Auth, and API services.

## Commands

```bash
pnpm start     # Start Supabase locally
pnpm stop      # Stop Supabase
pnpm pull      # Pull schema changes from remote
pnpm generate  # Generate TypeScript types
```

## Development Setup

1. Start Supabase: `pnpm start`
2. Access Supabase Studio: http://localhost:54323
3. Generate types after schema changes: `pnpm generate`

## Port Numbers

- API: 54321
- Database: 54322
- Studio: 54323
- Inbucket (Email): 54324

See the [root README](../../README.md) for complete setup instructions.
