# PoolTogether V4 Docs

The documentation is built using [Docusaurus 2](https://v2.docusaurus.io/).

# Contributing

## Update Deployed Contracts

You'll find the deployed networks in `docs/deployments`:

- **testnet.md**: Generated using `./scripts/generateV5TestnetDeployments.js` and `data/testnet-contracts.json`

To update the testnet:

1. Copy the `contracts.json` file from [v5-testnet](https://github.com/pooltogether/v5-testnet) to `data/testnet-contracts.json`
2. Run the script: `./scripts/generateV5TestnetDeployments.js`

# Contributing to PoolTogether Docs

Contributing to the docs site is a great way to get involved in the dev community and help other devs along the way! Check out our guidelines [here](https://github.com/PoolTogether/v4-docs/blob/main/CONTRIBUTING.md).

# How to Update search indices with algolia

create .env file with `APPLICATION_ID` and the `API_KEY` (write access)
Edit config.json file with

- start url from updated website
- sitemap url from updated website: ex) for docs: https://dev.pooltogether.com/sitemap.xml
- "v4_docs" index name
- install jq : `brew install jq`
  run `docker run -it --env-file=.env -e "CONFIG=$(cat ./config.json | jq -r tostring)" algolia/docsearch-scraper`

# How to add a new page

Create a markdown file in its respective versioned docs, or versioned SDK, directory.

# How to add internal links

Relative or absolute paths work. End links with a trailing `/`

## Installation

```console
yarn install
```

## Local Development

```console
yarn run start
```

This command starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

## Clear cache

```console
yarn docusaurus clear
```

## Build

```console
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

```console
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
