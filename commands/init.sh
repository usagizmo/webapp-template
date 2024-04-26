# In repository root
cd "$(dirname $0)/.."

if [ ! -f .env ]; then
  cp .env.example .env && echo 'Generated: .env'
fi
ln -sf "$(pwd)/.env" apps/backend/.env && echo 'Linked: apps/backend/.env'
ln -sf "$(pwd)/.env" apps/web/.env && echo 'Linked: apps/web/.env'
