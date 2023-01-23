# PoolTogether V4 Docs

The documentation is built using [Docusaurus 2](https://v2.docusaurus.io/).

# Contributing

## Update Deployed Contracts

You'll find the deployed networks in `docs/deployments`:

- **mainnet.md**: Generated using `yarn docs` in the [v4-mainnet](https://github.com/pooltogether/v4-mainnet) project. The PT V4 prize pool network. Note: this includes multiple blockchains, such as Ethereum, Polygon, Optimism, etc.
- **testnet.md**: Generated using `yarn docs` in the [v4-testnet](https://github.com/pooltogether/v4-testnet) project. The PT V4 prize pool test network. Rinkeby, Optimistic Kovan, etc.

To update a network after a new deployment:

1. Depending on what you're updating, git clone the mainnet or testnet projects (linked above)
2. Run `yarn docs` to generate either the `mainnet.md` or `testnet.md` file
3. Replace the similarly named file in the project (located at `docs/deployments`) with the new file.

# Contributing to PoolTogether Docs

Contributing to the docs site is a great way to get involved in the dev community and help other devs along the way! Check out our guidelines [here](https://github.com/PoolTogether/v4-docs/blob/main/CONTRIBUTING.md).

# How to generate markdown files from solidity Natspec comments

Install solidity doc gen
`npm install solidity-docgen`

Get the correct compiler version
`npm install -D solc-0.7@npm:solc@0.7.6`

Put the updated template `contract.hbs` in a /templates folder under the same directory as /contracts that you want to generate

Run `npx solidity-docgen --solc-module solc-0.7 -t ./templates`

# How to generate markdown files from typescript comments

`npm install --save-dev typedoc typedoc-plugin-markdown`

`typedoc --out <docs> src/index.ts`

see https://www.npmjs.com/package/typedoc-plugin-markdown for details

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
