#!/bin/sh

# Check if Railway is providing placeholder values
if echo "$MAILERSEND_API_KEY" | grep -q "<jouw"; then
  echo "⚠️  WARNING: Railway is providing placeholder values!"
  echo "⚠️  Contact form will NOT work until this is fixed."
  echo ""
  echo "To fix: Use Railway CLI to set variables:"
  echo "  railway variables set MAILERSEND_API_KEY=mlsn.51a308770deccd139b6329d22792e413fe4a867bfd035ab65b28a06b487f800b"
  echo "  railway variables set MAILERSEND_FROM_EMAIL=rob@schakel.ai"
  echo "  railway variables set MAILERSEND_TO_EMAIL=rob@schakel.ai"
  echo ""
fi

# Start the application
exec node server-dist/index.mjs
