# In repository root
cd "$(dirname $0)/.."

cp -n .env.example .env && echo 'Generated: .env'
ln -sf "$(pwd)/.env" apps/nhost/.env && echo 'Linked: apps/nhost/.env'
ln -sf "$(pwd)/.env" apps/web/.env.local && echo 'Linked: apps/web/.env.local'
ln -sf "$(pwd)/.env" packages/generated/.env && echo 'Linked: packages/generated/.env'
