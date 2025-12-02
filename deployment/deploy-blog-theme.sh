#!/usr/bin/env bash
set -euo pipefail

# Deploy SoftDAB Blog Theme to WordPress
# Usage: ./deploy-blog-theme.sh [user@host] [wp_path]

HOST="${1:-root@softdab.tech}"
WP_PATH="${2:-/var/www/subdomains/blog}"
THEMES_DIR="$WP_PATH/wp-content/themes"
THEME_NAME="softdab-blog"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
THEME_ZIP="$SCRIPT_DIR/softdab-blog-theme.zip"

if [[ ! -f "$THEME_ZIP" ]]; then
  echo "Theme zip not found: $THEME_ZIP" >&2
  echo "Run: cd deployment/softdab-blog-theme && zip -r ../softdab-blog-theme.zip ." >&2
  exit 1
fi

echo "📦 Uploading theme to $HOST:$THEMES_DIR ..."
ssh "$HOST" "mkdir -p '$THEMES_DIR/$THEME_NAME'"
scp "$THEME_ZIP" "$HOST:/tmp/softdab-blog-theme.zip"

echo "📂 Extracting theme on server ..."
ssh "$HOST" "cd '$THEMES_DIR/$THEME_NAME' && unzip -o /tmp/softdab-blog-theme.zip && rm /tmp/softdab-blog-theme.zip"

echo "🔧 Setting permissions ..."
ssh "$HOST" "chown -R www-data:www-data '$THEMES_DIR/$THEME_NAME' || chown -R \$(stat -c '%U:%G' '$WP_PATH' 2>/dev/null || echo www-data:www-data) '$THEMES_DIR/$THEME_NAME'" || true

cat <<INFO

✅ Theme deployed to $THEMES_DIR/$THEME_NAME

Next steps:
1. Log into https://blog.softdab.tech/wp-admin/
2. Go to Appearance → Themes → Activate "SoftDAB Blog"
3. Go to Appearance → Menus → create/assign a menu to "Primary Menu"
4. (Optional) Upload the MU seeder via ./deploy-wp-seed.sh to create 20 posts

INFO
