import { config } from 'dotenv';
import { execSync } from 'node:child_process';

config();

execSync(
  `supabase gen types typescript --db-url ${process.env.SUPABASE_DIRECT_URL} > ./src/lib/\\$generated/supabase-types.ts`,
);
