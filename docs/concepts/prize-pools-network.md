---
title: "Prize Pool Network"
sidebar_label: "Prize Pool Network"
sidebar_position: 1
---

PoolTogether V4 is unique as it enables Prize Pool Networks.  A Prize Pool Network allows users across chains, with different assets, or different yield sources to combine their interest and share a single pool of prize liquidity.  There are three main processes:

1. Interest is captured by the network
2. Prize distributions are pushed out to the network.  This is not prize liquidity, but rather the structure of the distributions.
3. Prize liquidity is pushed out to the network

## Capturing Interest

Users deposit into Prize Pool contracts, which generate yield that goes to the network prize liquidity.

<img
  src={require('/img/guides/PrizeNetworkLiquidity.png').default}
  alt='Prize Network Liquidity'
  class='img-max'
/>

## Distributing Prizes

The prize pool yield contributions are compared, and weighted odds are pushed out to each prize pool.  Note, that these are the *odds* that are pushed out, not the actual prize liquidity.  The possible prizes for all users is the same, but their odds are weighted according to how much liquidity they contributed to the prize network liquidity.

<img
  src={require('/img/guides/TsunamiBroadcast.png').default}
  alt='Tsunami Prize Distribution'
  class='img-max'
/>

## Prize Liquidity

Prize Pools will largely feed off of their own interest, but liquidity will need to be rebalanced by the protocol to satisfy prize distributions.

<img
  src={require('/img/guides/PrizeDistribution.png').default}
  alt='Prize Distribution'
  class='img-max'
/>
