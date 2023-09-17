#!/bin/sh -e

cd $(dirname $0)/../auth
. ../.env.production

gcloud meta list-files-for-upload

gcloud functions deploy oauth2 \
  --allow-unauthenticated \
  --runtime go121 \
  --trigger-http \
  --source . \
  --entry-point Authenticate \
  --region us-central1 \
  --set-env-vars GITHUB_OAUTH_CLIENT_ID=${GITHUB_OAUTH_CLIENT_ID},BASE_URL=${BASE_URL} \
  --set-secrets GITHUB_OAUTH_CLIENT_SECRET=github_oauth_client_secret:latest \
  --docker-registry container-registry \
  --memory 128MB
