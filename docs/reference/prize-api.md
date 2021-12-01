---
title: Prizes API
sidebar_position: 5
---

# Description

The Prizes API is a convenient API that summarizes the Prizes awardable across the Prize Linked Network.
Prizes information is provided in a HTTP JSON server. This API is entirely replicable from onchain data.
This data contains:

1. Which addresses won prizes for each draw across networks
1. How much each address won for each draw
1. Which lucky pick indice won for each prize

# Data Lifecycle

<img
src={require('/img/prizesApiArchitecture.jpeg').default}
alt='Flow of Funds'
class='img-max'
/>

The prize data begins its lifecycle when the `PrizeDistributionSet` event is fired from the `PrizeDistributionBuffer` for a particular network.
When this event fires all of the parameters required to calculate the winners is available.

The [Draw Calculator CLI](https://github.com/pooltogether/draw-calculator-cli) tool is then run automatically for the new draw. We use Google Cloud Run, but this may be done locally and is fully reproducible.
The CLI ingests data from the [Total Weighted Average Balance Subgraph](https://github.com/pooltogether/twab-subgraph) to calculate each users normalized balance eligible for that draw.
The CLI [Draw Calculator library](https://github.com/pooltogether/draw-calculator-js) is then run with these balances as input for each user, along with the `PrizeDistribution` parameters necessary to replicate the Draw Calculator contract off-chain.

**NOTE**: the output of the Draw Calculator JS library does not reduce the prizes awardable according to the `maxPicksPerUser` protocol limit.

This produces JSON files for each winner. These files are stored in a [Github repo](https://github.com/pooltogether/v4-draw-results).

Finally Netlify automatically deploys a new API build with the new JSON files for that drawId and network.

# Usage

The API can be used to query prize winners per draw for each network and Ticket associated Prize Distributor.
For example if we wanted to get prizes for every user for draws 8 and 9 on Polygon we would make the following requests:

```js
const draw8Prizes = await (
  await fetch(
    `https://eager-fermat-3a8c47.netlify.app/137/0x8141bcfbcee654c5de17c4e2b2af26b67f9b9056/draw8/prizes.json`
  )
).json();
const draw9Prizes = await (
  await fetch(
    `https://eager-fermat-3a8c47.netlify.app/137/0x8141bcfbcee654c5de17c4e2b2af26b67f9b9056/draw9/prizes.json`
  )
).json();
```
