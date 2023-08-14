#!/bin/sh

. ../.env

gcloud functions deploy oauth2 \
  --runtime go120 \
  --trigger-http \
  --source . \
  --entry-point Authenticate \
  --region us-central1 \
  --set-env-vars CLIENT_ID=${GITHUB_OAUTH_CLIENT_ID},CORS_ORIGIN=${BASE_URL} \
  --set-secrets CLIENT_SECRET=github_client_secret:latest \
  --docker-registry container-registry \
  --memory 128MB