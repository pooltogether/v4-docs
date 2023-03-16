---
title: Computing Prizes
sidebar_position: 4
---

# Computing Prizes

This section outlines how the prizes are computed for each draw. The high-level steps of this process are:

- Get the Draw & Prize Distribution from the DrawBuffer and PrizeDistributionBuffer contracts respectively
- Compute the user's TWAB for the draw given the draw start timestamp, beacon period & offsets
- Get the total ticket supply TWAB
- Compute the number of picks a user gets (this is the user's fraction of TWAB vs. total supply TWAB multipled by the number of picks for the draw)
- For each pick, compute the users random number and compare it to winning random number

<a href={require('/img/v4/guides/ComputingPrizes.png').default} target="\_blank">
<img
src={require('/img/v4/guides/ComputingPrizes.png').default}
alt='Prize Pool'
class='img-full'
/>
</a>

## Offchain Prize Calculation

Since the user may have hundreds or thousands of picks, this calculation can also be replicated off-chain.
The high-level steps of this process are:

- Query the [Total Weighted Average Balance Subgraph](https://github.com/pooltogether/twab-subgraph) for each user's balance for the draw
- For each of these users, run [Draw Calculator library](https://github.com/pooltogether/draw-calculators-js), which returns prizes for users (if any).

These steps are combined in the [Draw Calculator CLI](https://github.com/pooltogether/v4-cli) and executed in the [v4-draw-results repo](https://github.com/pooltogether/v4-draw-results) workflow to create the prize data.

## Prize API

All prize data is made readily available at the [Prize API](https://github.com/pooltogether/v4-docs/blob/main/docs/api/prize-api.md).
