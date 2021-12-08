---
title: Prize API
sidebar_position: 4
---

# Usage

For a detailed description of the Prize API as a concept see [here](../concepts/prize-api).

The API data is sorted by Prize Distributor. This is the contract that distributes the prizes associated with a Ticket on a network. This is because a Ticket may have multiple Prize Distributors.

| Network | Prize Distributor                                                                                                                        |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| mainnet | [0xb9a179dca5a7bf5f8b9e088437b3a85ebb495efe](https://etherscan.io/address/0xb9a179DcA5a7bf5f8B9E088437B3A85ebB495eFe)                    |
| polygon | [0x8141bcfbcee654c5de17c4e2b2af26b67f9b9056](https://explorer-mainnet.maticvigil.com/address/0x8141BcFBcEE654c5dE17C4e2B2AF26B67f9B9056) |

**NOTE**: The Prize API does not reduce the prizes awardable according to the `maxPicksPerUser` protocol limit.

## Hosted API

The hosted API can be used to query prize winners per Draw for each Network and Ticket associated Prize Distributor.

### All Prizes per Draw

`HTTP GET` https://api.pooltogether.com/prizes/:chainId/:prizeDistributorAddress/draw/:drawId/prizes.json

| Field                   | Description                      | Example/Description                              |
| ----------------------- | -------------------------------- | ------------------------------------------------ |
| chainId                 | the chainId of the network       | 1 for Ethereum mainnet, 137 for Polygon          |
| prizeDistributorAddress | address of the prize distributor | the Prize Distributor associated with this prize |
| drawId                  | the integer drawId               | drawId's are sequential over time                |

#### Response

The response JSON is an array of objects of the following structure _for each winning address_:

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

### All Prizes per Address for a Draw

The API also serves a JSON file for an individual address per Draw, enabling more granular usage/analysis.

`HTTP GET` https://api.pooltogether.com/prizes/:chainId/:prizeDistributorAddress/draw/:drawId/:address.json

| Field                   | Description                      | Example/Description                              |
| ----------------------- | -------------------------------- | ------------------------------------------------ |
| chainId                 | the chainId of the network       | 1 for Ethereum mainnet, 137 for Polygon          |
| prizeDistributorAddress | address of the prize distributor | the Prize Distributor associated with this prize |
| drawId                  | the integer drawId               | drawId's are sequential over time                |
| address                 | the address of the user          | this address must be lower case                  |

The endpoint will return a 404 if the address did not win for that Draw.

#### Response

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
    address: "0x01a0f8f364c2fec07cfcdebd2980da3f950d0410",
    pick: "20166",
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

#### Example

For example, using Javascript, getting the results for Draw 10 on Ethereum mainnet:

```js
const draw10PrizesResult = await fetch(
  `https://api.pooltogether.com/prizes/1/0xb9a179dca5a7bf5f8b9e088437b3a85ebb495efe/draw/10/prizes.json`
);
const draw10PrizesArray = await draw10PrizesResult.json();
```

For example if we wanted to get prizes for every user for Draws 8 and 9 on Polygon we would make the following requests:

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
This method may be preffered for data analysis or similar purposes.
In your `package.json` add:

```javascript
  ...
  "dependencies": {
    ...
    "v4PrizesData": "git:@pooltogether/v4-draw-results.git"
  }
  ...
```

This data can then be imported into scripts for analysis using:

```javascript
import prizesData from "v4PrizesData";
```
