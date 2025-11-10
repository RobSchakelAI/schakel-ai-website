#!/bin/sh
echo "=== Railway Environment Check ==="
echo "NODE_ENV: $NODE_ENV"
echo "PORT: $PORT"
echo "MAILERSEND_API_KEY present: $([ -n "$MAILERSEND_API_KEY" ] && echo 'YES' || echo 'NO')"
echo "MAILERSEND_API_KEY prefix: ${MAILERSEND_API_KEY:0:10}"
echo "MAILERSEND_FROM_EMAIL: $MAILERSEND_FROM_EMAIL"
echo "MAILERSEND_TO_EMAIL: $MAILERSEND_TO_EMAIL"
echo "=================================="

# Start the application
exec node server-dist/index.mjs
