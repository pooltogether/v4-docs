---
title: Computing Prizes
sidebar_position: 4
---

# Description

The PoolTogether v4 protocol produces a lot of information surrounding prizes and winners across networks and draws.

This data contains:

1. Which addresses won prizes for each draw across networks
1. How much each address won for each draw
1. Which lucky pick won for each prize

## Prize Data Lifecycle Overview

This rich Prizes data set is made available off-chain via the Prizes API. The Prize HTTP API is an easy way to access the information related to Prizes claimable in PoolTogether v4. This data is entirely replicable from onchain data.

<div class="myDiv" display="flex">

<img
src={require('/img/guides/PrizesApiArchitecture.png').default}
alt='Prize Mining Datacycle'
margin-left="auto"
margin-right="auto"
/>

</div>

### Prize Data Available

The prize data begins its lifecycle when the `PrizeDistributionSet` event is fired from the `PrizeDistributionBuffer` contract for a particular network.
When this event fires all of the parameters required to calculate the winners are now available.

### Draw Calculator Prize Mining

The [Draw Calculator CLI](https://github.com/pooltogether/draw-calculator-cli) tool is then run automatically for this new draw. This NodeJs program is run in the `v4-draw-results` repo [action workflow](https://github.com/pooltogether/v4-draw-results/actions).

The CLI tool ingests data from the [Total Weighted Average Balance Subgraph](https://github.com/pooltogether/twab-subgraph) to calculate each users normalized balance eligible for that draw.

The CLI [Draw Calculator library](https://github.com/pooltogether/draw-calculator-js) is then run with these balances as input for each user, along with the [Prize Distribution](./prize-distribution#summary) parameters necessary to replicate the Draw Calculator contract off-chain. We call this process "Prize Mining" since it is computationally heavy as every pick is checked for the user!

The CLI computation results are then commited to the [v4-draw-results repo](https://github.com/pooltogether/v4-draw-results).

### Prize API

Finally Netlify automatically deploys a new API build with the new JSON files for that drawId and network, creating the hosted Prize API. Detailed usage of the Prize API is described [here](../reference/prize-api).
