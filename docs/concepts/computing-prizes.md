---
title: Computing Prizes
sidebar_position: 4
---

# Computing Prizes

## Description

This section outlines how the prizes are computed. The Draw Calculator contract is responsible for calculating prizes. For each draw, it takes several inputs:

- The users TWAB
- The total supply TWAB
- The Prize Distribution
- The winning random number

However since the user may have hundreds or thousands of picks, this calculation can also be replicated off-chain.

<a href={require('/img/guides/ComputingPrizes.png').default} target="\_blank">
<img
src={require('/img/guides/ComputingPrizes.png').default}
alt='Prize Pool'
class='img-full'
/>
</a>

## Draw Calculator

The draw calculator does the following:

- Calculates the number of picks for the user (derived from the user's fraction of the total supply TWAB).
- For each of the user's picks and the winning random number:
  - Within the `matchCardinality` and over the `bitRangeSize`, how many sequential matches occur.
- Given the number of matches, calculating the prize tier the user falls in.
- Returns the absolute amount of prize (if any) the user will receive for the draw.

## Prize API

All prize data is made readily available at the [Prize API](../reference/prize-api).
