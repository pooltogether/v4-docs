---
title: Prize API
sidebar_position: 4
---

# Description

The Prize API is an easy way to access the information related to Prizes claimable in PoolTogether v4.

The Prizes API is a convenient HTTP API that summarizes the claimable Prizes across the Prize Linked Network.
Prizes information is provided in a HTTP JSON server. This API is entirely replicable from onchain data.
This data contains:

1. Which addresses won prizes for each draw across networks
1. How much each address won for each draw
1. Which lucky pick won for each prize

## Data Lifecycle

<div class="myDiv" display="flex">

<img
src={require('/img/guides/PrizesApiArchitecture.png').default}
alt='Flow of Funds'
margin-left="auto"
margin-right="auto"
/>

</div>

The prize data begins its lifecycle when the `PrizeDistributionSet` event is fired from the `PrizeDistributionBuffer` contract for a particular network.
When this event fires all of the parameters required to calculate the winners are available.

The [Draw Calculator CLI](https://github.com/pooltogether/draw-calculator-cli) tool is then run automatically for this new draw. This NodeJs program is run in the v4-draw-results repo [action workflow](https://github.com/pooltogether/v4-draw-results/actions).

The CLI ingests data from the [Total Weighted Average Balance Subgraph](https://github.com/pooltogether/twab-subgraph) to calculate each users normalized balance eligible for that draw. The CLI [Draw Calculator library](https://github.com/pooltogether/draw-calculator-js) is then run with these balances as input for each user, along with the [Prize Distribution](./prize-distribution#summary) parameters necessary to replicate the Draw Calculator contract off-chain. These results are commited to the repo.

Finally Netlify automatically deploys a new API build with the new JSON files for that drawId and network, creating the hosted Prizes API.

## Usage

Detailed usage of the Prize API is described [here](../reference/prize-api).
