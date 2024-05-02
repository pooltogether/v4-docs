# PoolTogether Developer Docs

The documentation is built using [Docusaurus 2](https://v2.docusaurus.io/).

# Contributing

## Update Deployed Contracts

You'll find the deployed networks in `docs/deployments` which are generated using `./scripts/generateV5Deployments.js` and contract lists in the `data` folder.

To update a deployment list:

1. Update the corresponding contract json file in the `data` folder
2. Run the script with the deployment you want to generate, ex: `node script/generateV5Deployments.js optimism`

# Contributing to PoolTogether Developer Docs

Contributing to the docs site is a great way to get involved in the dev community and help other devs along the way! Check out our guidelines [here](./CONTRIBUTING.md).

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
yarn start
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
