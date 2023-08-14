# My Website

## Development

### Requirements

 * sh
 * git
 * node
 * gcloud

### Commands

| Command                   | Action
| :------------------------ | :------------------------------------------
| `npm run dev`             | Starts local dev server at `localhost:3000`
| `npm run build`           | Build your production site to `./dist/`

### Configuration

| Property               | Source | Description
| :--------------------- | :----- | :-----------------------
| BASE_URL               | `.env` | URL where site runs
| SECRET_GITHUB_TOKEN    | `.env` | Github token for authenticating Astro Github client (used only by npm (sub)process)
| GITHUB_OAUTH_CLIENT_ID | `.env` | Id of OAuth2 application
| GITHUB_OAUTH_URL       | `.env` | URL of OAuth2 client code authorizer service
| github_client_secret   |        | Client secret to authenticate webapp against Github (stored in GCP Secret Manager)
