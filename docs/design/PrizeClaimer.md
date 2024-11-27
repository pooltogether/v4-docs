---
id: prize-claimer
title: Prize Claimer
sidebar_position: 3
---

The Prize Claimer contract allows anyone to claim prizes on behalf of winners, and earn rewards in doing so. Users of the Claimer would typically configure automated bots to constantly check how many prizes they can claim, and how much profit they can make. If the rewards they earn outweigh the gas costs, then they will run the transaction and claim prizes for winning depositors. 

Prizes are only claimable for the duration of 1 draw. For example, prizes would for a weekly draw would expire after 1 week since they were awarded. Due to this, ensuring the economics make sense for claimers is necessary to ensure depositors receive their prizes.

## Details

### Fees

The Prize Claimer contract uses a VRGDA (variable rate gradual dutch auction) to increase the rewards one can earn over time. The longer between prize claims, the more rewards someone can earn by claiming prizes.

Rewards are created by taking a percentage of the prize claimed. During contract initialization, constants are set for the minimum and maximum amounts that rewards will take from the prize amount.

### Claiming

The external `claimPrizes` function is used to claim prizes for one specific vault and tier combination. Multiple winners and multiple prize indices can be included in the transaction. A fee recipient address is also included, this is the account that will accumulate the earned rewards.

## Guides

Read the [guide](../guides/bots/ClaimingPrizes.md) on using the Prize Claimer.
