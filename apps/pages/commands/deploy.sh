PKG_DIR="$(cd "$(dirname "$0")/.." && pwd)"
rsync -ahvu --delete --exclude=".*" $PKG_DIR/public/ <SSH_HOST>:/var/www/html/
echo -e "\n🚀 \x1b[32mhttps://webapp-template-pages.usagizmo.com/\x1b[0m\n"
