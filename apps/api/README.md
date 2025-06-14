# API ([Supabase](https://supabase.com/))

[Supabase](https://supabase.com/) local development environment with PostgreSQL, Auth, and API services.

## Commands

```bash
pnpm start      # Start Supabase locally
pnpm stop       # Stop Supabase
pnpm reset      # Reset database and regenerate types
pnpm diff       # Show schema changes
pnpm push       # Push migrations to remote
pnpm pull       # Pull schema changes from remote and regenerate types
pnpm migration  # Create new migration file
pnpm link       # Link to remote project
pnpm seed       # Seed storage buckets
pnpm generate   # Generate TypeScript types
```

## Development Setup

1. Start Supabase: `pnpm start`
2. Access Supabase Studio: http://localhost:54323
3. Generate types after schema changes: `pnpm generate`

## Development Workflow

### Basic Workflow

1. `pnpm start` - Start Supabase
2. Make schema changes in Studio (http://localhost:54323)
3. `pnpm diff` - Generate migration from changes
4. `pnpm generate` - Update TypeScript types

### Migration Workflow

1. `pnpm migration <name>` - Create new migration file
2. Edit the migration file with SQL
3. `pnpm reset` - Apply migrations and regenerate types

### Remote Sync

1. `pnpm link` - Link to remote project (first time only)
2. `pnpm pull` - Pull remote schema changes
3. `pnpm push` - Push local migrations to remote

## Port Numbers

- API: 54321
- Database: 54322
- Studio: 54323
- Inbucket (Email): 54324

See the [root README](../../README.md) for complete setup instructions.
