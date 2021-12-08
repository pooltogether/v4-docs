---
title: Prize API
sidebar_position: 4
---

# Description

For a detailed description of the Prize API as a concept see [here](../concepts/prize-api).

# Usage

## API Usage

The hosted API can be used to query prize winners per Draw for each Network and Ticket associated Prize Distributor.

## Request Structure

GET URL: https://api.pooltogether.com/prizes/:chainId/:prizeDistributorAddress/draw/:drawId/:addressOrIndex.json

| Field                   | Description                        | Example/Description                                              |
| ----------------------- | ---------------------------------- | ---------------------------------------------------------------- |
| chainId                 | the chainId of the network         | 1 for Ethereum mainnet, 137 for Polygon                          |
| prizeDistributorAddress | address of the prize distributor   | the Prize Distributor associated with this prize                 |
| drawId                  | the integer drawId                 | drawId's are sequential over time                                |
| addressOrIndex          | the winning address OR prizes.json | prizes.json provides an index of all the winners for that drawId |

### Examples

For example, using Javascript, getting the results for Draw 10 on Ethereum mainnet:

```js
const draw10PrizesResult = await fetch(
  `https://api.pooltogether.com/prizes/1/0xb9a179dca5a7bf5f8b9e088437b3a85ebb495efe/draw10/prizes.json`
);
const draw10PrizesArray = await draw10PrizesResult.json();
```

For example if we wanted to get prizes for every user for Draws 8 and 9 on Polygon we would make the following requests:

```js
const urls = [
  `https://api.pooltogether.com/prizes/137/0x8141bcfbcee654c5de17c4e2b2af26b67f9b9056/draw8/prizes.json`,
  `https://api.pooltogether.com/prizes/137/0x8141bcfbcee654c5de17c4e2b2af26b67f9b9056/draw9/prizes.json`,
];

const prizes = await Promise.all(
  urls.map(async (url) => {
    const resp = await fetch(url);
    return await resp.json();
  })
);
```

## Response Structure

The response JSON is an array of objects of the following structure:

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

## Local Usage

The data served from this API can also be installed locally using yarn or npm.
This method may be preffered for data analysis or similar purposes.\
In your `package.json` add:

```javascript
  ...
  "dependencies": {
    ...
    "v4PrizesData": "git:@pooltogether/v4-draw-results.git"
  }
  ...
```

This data can then be imported into scripts for analysis using `import data from "v4PrizesData"` in your program.
