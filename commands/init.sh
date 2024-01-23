# In repository root
cd "$(dirname $0)/.."

cp -n .env.example .env && echo 'Generated: .env'
ln -sf "$(pwd)/.env" apps/codegen/.env && echo 'Linked: apps/codegen/.env'
ln -sf "$(pwd)/.env" apps/web/.env && echo 'Linked: apps/web/.env'
