#!/usr/bin/env bash
set -euo pipefail

# Deploy the SoftDAB WP MU seeder to the blog server.
# Usage:
#   ./deploy-wp-seed.sh [user@host] [wp_path]
# Defaults:
#   user@host = root@softdab.tech
#   wp_path   = /var/www/subdomains/blog

HOST="${1:-root@softdab.tech}"
WP_PATH="${2:-/var/www/subdomains/blog}"
MU_DIR="$WP_PATH/wp-content/mu-plugins"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SEED_FILE="$SCRIPT_DIR/wp-seed-softdab-posts.php"

if [[ ! -f "$SEED_FILE" ]]; then
  echo "Seeder file not found: $SEED_FILE" >&2
  exit 1
fi

echo "Creating mu-plugins directory on $HOST:$MU_DIR ..."
ssh "$HOST" "mkdir -p '$MU_DIR' && chown -R \
  \$(stat -c '%U' '$WP_PATH' 2>/dev/null || echo www-data):\$(stat -c '%G' '$WP_PATH' 2>/dev/null || echo www-data) '$MU_DIR'" || true

echo "Copying seeder to $HOST:$MU_DIR ..."
scp "$SEED_FILE" "$HOST:$MU_DIR/"

cat <<INFO
Done. Next steps:
1) Log into https://blog.softdab.tech/wp-admin/ as an administrator.
2) Load any admin page once. The seeder runs automatically and shows a success notice.
3) Verify posts under Posts > All Posts and categories under Posts > Categories.
4) Check robots output: https://blog.softdab.tech/robots.txt contains the sitemap line.
INFO
