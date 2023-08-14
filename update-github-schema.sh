#!/bin/sh

set -e

. ./.env

SCHEMA_FILE="src/integrations/github/graphql/schema.json"

if [ -f $SCHEMA_FILE ]; then
  exit 0
fi

if [ -z "$SECRET_GITHUB_TOKEN" ]; then
  echo "env: SECRET_GITHUB_TOKEN not set" 1>&2
  exit 1
fi

curl https://api.github.com/graphql \
  -H "Authorization: token $SECRET_GITHUB_TOKEN" \
> $SCHEMA_FILE
