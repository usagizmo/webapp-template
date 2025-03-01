# In repository root
cd "$(dirname $0)/.."

rm .env.example
echo "\033[32mRemoved\033[0m\033[33m .env.example\033[0m"

rm commands/init.sh
echo "\033[32mRemoved\033[0m\033[33m commands/init.sh\033[0m"

sed -i '' 's/"prepare": "husky && .\/commands\/init.sh"/"prepare": "husky"/g' package.json
echo "\033[32mRemoved\033[0m init.sh execution in\033[33m package.json\033[0m"


# Remove `apps/backend` related files and lines
rm -rf apps/backend
echo "\033[32mRemoved\033[0m\033[33m apps/backend\033[0m"

sed -i '' '/\/apps\/backend/d' .prettierignore
echo "\033[32mRemoved\033[0m [backend] in\033[33m .prettierignore\033[0m"

sed -i '' '/\/apps\/backend/d' cspell.json
echo "\033[32mRemoved\033[0m [backend] in\033[33m cspell.json\033[0m"

# TODO: turbo.json


# Remove `apps/web` related files and lines
rm -rf apps/web
echo "\033[32mRemoved\033[0m\033[33m apps/web\033[0m"

sed -i '' '/\/apps\/web/d' .prettierignore
echo "\033[32mRemoved\033[0m [web] in\033[33m .prettierignore\033[0m"

sed -i '' '/\/apps\/web/d' .markuplintrc.cjs
echo "\033[32mRemoved\033[0m [web] in\033[33m .markuplintrc.cjs\033[0m"

sed -i '' '/\/apps\/web/d' cspell.json
echo "\033[32mRemoved\033[0m [web] in\033[33m cspell.json\033[0m"

# TODO: turbo.json


# Remove lines related to svelte
sed -i '' '/svelte/d' .lintstagedrc.js
echo "\033[32mRemoved\033[0m [svelte] in\033[33m .lintstagedrc.js\033[0m"

# cspell:ignore velte
sed -i '' '/[Ss]velte/d' .markuplintrc.cjs
echo "\033[32mRemoved\033[0m [svelte] in\033[33m .markuplintrc.cjs\033[0m"
# TODO: Remove svelte related lines from .markuplintrc.cjs

sed -i '' '/svelte/d' .gitignore
echo "\033[32mRemoved\033[0m [svelte] in\033[33m .gitignore\033[0m"

sed -i '' '/svelte/d' package.json
echo "\033[32mRemoved\033[0m [svelte] in\033[33m package.json\033[0m"

sed -i '' -E "s/'prettier-plugin-svelte',?//g" prettier.config.js
echo "\033[32mRemoved\033[0m [prettier-plugin-svelte] in\033[33m prettier.config.js\033[0m"

sed -i '' '/svelte/d' prettier.config.js
echo "\033[32mRemoved\033[0m [svelte] in\033[33m prettier.config.js\033[0m"

sed -i '' '/svelte/d' .vscode/extensions.json
echo "\033[32mRemoved\033[0m [svelte] in\033[33m .vscode/extensions.json\033[0m"

sed -i '' '/svelte/d' .vscode/settings.json
echo "\033[32mRemoved\033[0m [svelte] in\033[33m .vscode/settings.json\033[0m"

# TODO: turbo.json

# cspell:ignore velte
sed -i '' '/[Ss]velte/d' packages/eslint-config/eslint.config.js
echo "\033[32mRemoved\033[0m [svelte] in\033[33m packages/eslint-config/eslint.config.js\033[0m"
# TODO: Remove svelte related lines from packages/eslint-config/eslint.config.js

sed -i '' '/svelte/d' packages/eslint-config/package.json
echo "\033[32mRemoved\033[0m [svelte] in\033[33m packages/eslint-config/package.json\033[0m"
