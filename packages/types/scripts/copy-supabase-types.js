import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BACKEND_TYPES_PATH = join(__dirname, '../../../apps/backend/$generated/supabase-types.ts');
const OUTPUT_PATH = join(__dirname, '../src/supabase.ts');

/**
 * Copy Supabase types from backend to shared types package
 */
async function copySupabaseTypes() {
  try {
    // Ensure output directory exists
    await mkdir(dirname(OUTPUT_PATH), { recursive: true });

    // Read the generated types file
    const typesContent = await readFile(BACKEND_TYPES_PATH, 'utf8');

    // Write to types package
    await writeFile(OUTPUT_PATH, typesContent);

    console.log('✅ Supabase types copied successfully');
  } catch (error) {
    console.error('❌ Failed to copy Supabase types:', error.message);
    process.exit(1);
  }
}

copySupabaseTypes();
