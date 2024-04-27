import { config } from 'dotenv';
import { execSync } from 'node:child_process';
import * as path from 'node:path';
import url from 'node:url';

config();

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const outputPath = path.join(__dirname, '..', 'src', 'lib', '$generated', 'supabase-types.ts');

execSync(
  `supabase gen types typescript --db-url ${process.env.SUPABASE_DIRECT_URL} > '${outputPath}'`,
);
