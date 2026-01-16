#!/bin/bash
# instals the git hook
echo "Installing Vasta UX Guard pre-commit hook..."
HOOK_DIR=".git/hooks"
HOOK_FILE="$HOOK_DIR/pre-commit"

if [ ! -d "$HOOK_DIR" ]; then
  mkdir -p "$HOOK_DIR"
fi

cat > "$HOOK_FILE" <<EOF
#!/bin/bash
echo "🛡️  Running Vasta UX Guard..."
node .antigravity/plugins/vasta-ux-guard/scanner.js
EXIT_CODE=\$?

if [ \$EXIT_CODE -ne 0 ]; then
    echo "❌ Commit rejected due to UX violations."
    exit 1
fi
EOF

chmod +x "$HOOK_FILE"
echo "✅ Vasta UX Guard hook installed."
