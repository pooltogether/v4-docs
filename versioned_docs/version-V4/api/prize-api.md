---
title: Prize API
sidebar_position: 1
---

# Prize API

The Prize API is an easy way to access the PoolTogether V4 prize data. For a detailed description of how the prizes are calculated see [here](../architecture/computing-prizes).

This data contains:

1. Which addresses won prizes for each draw across networks
1. How much each address won for each draw
1. Which lucky pick won for each users prize

This data can be accessed via:

- Hosted API
- Locally

This data can be reproduced by following the instructions [here](https://github.com/pooltogether/v4-draw-results).

# Usage

The Prize data is first catagorized by network, specifically chainId.

The data is then catagorized by Prize Distributor address. This is the contract that distributes the prizes associated with a Ticket on a network. This is because a Ticket may have multiple Prize Distributors.

| Network   | Prize Distributor                                                                                                        |
| --------- | ------------------------------------------------------------------------------------------------------------------------ |
| mainnet   | [0xb9a179dca5a7bf5f8b9e088437b3a85ebb495efe](https://etherscan.io/address/0xb9a179DcA5a7bf5f8B9E088437B3A85ebB495eFe)    |
| polygon   | [0x8141bcfbcee654c5de17c4e2b2af26b67f9b9056](https://polygonscan.com/address/0x8141BcFBcEE654c5dE17C4e2B2AF26B67f9B9056) |
| avalanche | [0x83332f908f403ce795d90f677ce3f382fe73f3d1](https://snowtrace.io/address/0x83332f908f403ce795d90f677ce3f382fe73f3d1)   |
| optimism | [0x722e9BFC008358aC2d445a8d892cF7b62B550F3F](https://optimistic.etherscan.io/address/0x722e9BFC008358aC2d445a8d892cF7b62B550F3F)   |

Finally the data is sorted by `drawId`, where `drawId` is unique and sequentially increasing over time.

**NOTE**: These addresses **must** be lower case.

**NOTE**: The Prize data does not reduce the prizes claimable according to the `maxPicksPerUser` protocol limit.

## Data Structure

The Prize data is expressed as follows:

```javascript
[
  ...
  {
    address: "0x01a0f8f364c2fec07cfcdebd2980da3f950d0410",
    pick: "20165",
    tier: 5,
    amount: "9999999",
  },
  {
    address: "0x020bf6c3166dcca9f5efd5ba14652d62c6c5d422",
    pick: "2018",
    tier: 3,
    amount: "99999999",
  },
  ...
];
```

| Field   | Description                  |
| ------- | ---------------------------- |
| address | address of the user          |
| pick    | which pick won this prize    |
| tier    | the prize tier of this prize |
| amount  | the prize amount             |

## Hosted API

The following section describes how to use the hosted API at https://api.pooltogether.com/prizes

### All Prizes per Draw

This API endpoint serves a JSON file with _all_ the winners for that particular `drawId`.

`HTTP GET` **https://api.pooltogether.com/prizes/:chainId/:prizeDistributorAddress/draw/:drawId/prizes.json**

| Field                   | Description                      | Example/Description                                          |
| ----------------------- | -------------------------------- | ------------------------------------------------------------ |
| chainId                 | the chainId of the network       | 1 for Ethereum mainnet, 137 for Polygon, 43114 for Avalanche |
| prizeDistributorAddress | address of the prize distributor | the prize distributor address associated with this prize     |
| drawId                  | the integer drawId               | drawId's are unique and sequential over time                 |

### All Prizes per Address for a Draw

This API endpoint serves a JSON file for an individual address per draw, enabling more granular usage/analysis.

`HTTP GET` **https://api.pooltogether.com/prizes/:chainId/:prizeDistributorAddress/draw/:drawId/:address.json**

| Field                   | Description                      | Example/Description                                          |
| ----------------------- | -------------------------------- | ------------------------------------------------------------ |
| chainId                 | the chainId of the network       | 1 for Ethereum mainnet, 137 for Polygon, 43114 for Avalanche |
| prizeDistributorAddress | address of the prize distributor | the prize distributor associated with this prize             |
| drawId                  | the integer drawId               | drawId's are sequential over time                            |
| address                 | the address of the user          | this address must be lower case                              |

The endpoint will return a `404` status if the address passed was not a winner for that draw.

#### Examples

For example, using Javascript and [Fetch](https://www.npmjs.com/package/node-fetch), getting the results for `drawId` 10 on Ethereum mainnet:

```js
const draw10PrizesResult = await fetch(
  `https://api.pooltogether.com/prizes/1/0xb9a179dca5a7bf5f8b9e088437b3a85ebb495efe/draw/10/prizes.json`
);
const draw10PrizesArray = await draw10PrizesResult.json();
```

Equivalently, `drawId` 10 on Avalanche:

```js
const draw10PrizesResult = await fetch(
  `https://api.pooltogether.com/prizes/43114/0x83332f908f403ce795d90f677ce3f382fe73f3d1/draw/10/prizes.json`
);
const draw10PrizesArray = await draw10PrizesResult.json();
```

If we wanted to get prizes for every user for drawId's 8 and 9 on Polygon we would make the following requests:

```js
const urls = [
  `https://api.pooltogether.com/prizes/137/0x8141bcfbcee654c5de17c4e2b2af26b67f9b9056/draw/8/prizes.json`,
  `https://api.pooltogether.com/prizes/137/0x8141bcfbcee654c5de17c4e2b2af26b67f9b9056/draw/9/prizes.json`,
];

const prizes = await Promise.all(
  urls.map(async (url) => {
    const resp = await fetch(url);
    return await resp.json();
  })
);
```

## Local Usage

The data served from this API can also be installed locally using yarn or npm.
This method may be prefered for data analysis or similar purposes.

#### Example

In your `package.json` add:

```javascript
  ...
  "dependencies": {
    ...
    "v4PrizesData": "git+https://github.com/pooltogether/v4-draw-results.git"
  }
  ...
```

This data can then be imported into scripts for analysis using:

```javascript
// all winners data for draw 2 on mainnet
import allWinnersDraw2 from "./node_modules/v4PrizesData/api/prizes/1/0xb9a179dca5a7bf5f8b9e088437b3a85ebb495efe/draw/2/prizes";
```
