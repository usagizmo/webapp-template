# In repository root
cd "$(dirname $0)/.."

if [ ! -f .env ]; then
  cp .env.example .env && echo 'Generated: .env'
fi
