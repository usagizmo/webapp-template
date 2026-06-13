import { spawnSync } from 'node:child_process';

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

/**
 * Run the test suite in snapshot-update mode.
 *
 * `bun test` strips its own flags (e.g. `--update-snapshots`) from `process.argv`,
 * so the update signal is passed through an env var that the test reads instead.
 * @returns {void}
 */
function updateSnapshots() {
  const result = spawnSync('bun', ['test'], {
    cwd: rootDir,
    stdio: 'inherit',
    env: { ...process.env, UPDATE_SNAPSHOTS: '1' },
  });

  if (result.error) {
    console.error(result.error.message);
    process.exitCode = 1;
    return;
  }

  process.exitCode = result.status ?? 1;
}

updateSnapshots();
