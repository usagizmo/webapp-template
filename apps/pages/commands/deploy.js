import { spawnSync } from 'node:child_process';

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const DEPLOY_TARGET = '<SSH_HOST>:/var/www/html/';
const DEPLOY_URL = 'https://webapp-template-pages.usagizmo.com/';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const publicDir = join(rootDir, 'public');

/**
 * Deploy the public directory with rsync.
 * @returns {void}
 */
function deploy() {
  if (DEPLOY_TARGET.includes('<SSH_HOST>')) {
    console.error('Configure DEPLOY_TARGET in commands/deploy.js before running deploy.');
    process.exitCode = 1;
    return;
  }

  const result = spawnSync(
    'rsync',
    ['-ahvu', '--delete', '--exclude=.*', `${publicDir}/`, DEPLOY_TARGET],
    {
      stdio: 'inherit',
    },
  );

  if (result.error) {
    console.error(result.error.message);
    process.exitCode = 1;
    return;
  }

  if (result.status !== 0) {
    process.exitCode = result.status ?? 1;
    return;
  }

  console.log(`\nDeployed: ${DEPLOY_URL}\n`);
}

deploy();
