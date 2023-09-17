# Github Integrated Website

## Features

- Github Discussions

  > **TODO:** externalize into separate module

- Github Pages Deployment (not implemented)

  > **TODO:** externalize into separate module

## Operations

### Requirements

 * sh
 * git
 * node
 * gcloud

#### Github Project

### Deployment

#### Requirements

- Github OAuth App

### Development

#### Requirements

- Github OAuth App

### Environment

0. Set `BASE_URL`:

   For development `BASE_URL` is `http://localhost:4321`

1. Create Github Project

   Setup Discussions:
   
      1. Enable

      2. Create Category for Comments

         - Recommended "Discussion Format" - "Announcement"

         - Set `GITHUB_DISCUSSION_CATEGORY` in `.env`

2. Create Github OAuth App (required for Website; 1 per environment)

   `Settings / Developer Settings / OAuth Apps`

   Two separate OAuth Apps MUST be created for development and production

   "Homepage URL" and "Authorization callback URL" should be equal to `BASE_URL`

   The following need to be set in environment configuration:

   - Client Id:
   
     Set `GITHUB_OAUTH_CLIENT_ID` in `.env` 

     > **NOTE:** MAY be done later

   - Client Secret:
      
      - *Prod:*
      
        Set `github_oauth_client_secret` in GCP Secret Manager 

      - *Dev:*

        Set `GITHUB_OAUTH_CLIENT_SECRET` in `.env`

      > **WARN:** MUST be done right away

3. Create Github Authentication Token (required for deployment)

   `Settings / Developer Settings / Personal access tokens`

   > **NOTE:** If fine grained token, it MUST allow creating discussions.

### Commands

| Command          | Action
| :--------------- | :-------------------------------------------
| `npm run dev`    | Starts [local dev environment](http://localhost:4321)
| `npm run deploy` | Deploy site (not implemented)

### Configuration

Submidule `config` to encapsulate configuration.

Locations:

- Shared: `.env`
- Production:
  - `.env.production`
  - GCP Secret Manager
- Development: `.env.development`

| Property                   | Location           | Description
| :------------------------- | :----------------- | :------------------------------------
| BASE_URL                   | `.env.*`           | URL where site runs
| GITHUB_TOKEN               | `.env`             | For Astro to publish data into Github
| GITHUB_OAUTH_URL           | `.env.*`           | Address of authentication server
| GITHUB_OAUTH_CLIENT_ID     | `.env.*`           | Id of OAuth2 application
| GITHUB_OAUTH_CLIENT_SECRET | `.env.development` | OAuth2 secret for development
| github_oauth_client_secret | GCP Secret Manager | OAuth2 secret for production
| GITHUB_DISCUSSION_CATEGORY | `.env.*`           | Discussion Category slug to use
