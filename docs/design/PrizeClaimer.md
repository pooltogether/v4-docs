---
id: prize-claimer
title: Prize Claimer
sidebar_position: 3
---

The Prize Claimer contract allows anyone to claim prizes on behalf of winners, and earn fees in doing so. Users of the Claimer would typically configure automated bots to constantly check how many prizes they can claim, and how much profit they can make. If the fees they earn outweigh the gas costs, then they will run the transaction and claim prizes for winning depositors. 

Prizes are only claimable for the duration of 1 draw. For example, prizes would for a weekly draw would expire after 1 week since they were awarded. Due to this, ensuring the economics make sense for claimers is necessary to ensure depositors receive their prizes.

## Details

### Fees

The Prize Claimer contract uses a VRGDA (variable rate gradual dutch auction) to increase the fees one can earn over time. The longer between prize claims, the more fees someone can earn by claiming prizes.

Fees are created by taking a percentage of the prize claimed. During contract initialization, constants are set for the minimum and maximum amounts that fees will take from the prize amount.

### Claiming

The external `claimPrizes` function is used to claim prizes for one specific vault and tier combination. Multiple winners and multiple prize indices can be included in the transaction. A fee recipient address is also included, this is the account that will accumulate the earned fees.

### Auto-claim

There is an auto-claim feature which a user can disable for their account if they do not want a bot to claim their prizes for them. Using this feature allows a depositor to choose to claim prizes they've won when they like (and in doing so also claim the associated fees).


## Guides

Read the [guide](../guides/claiming-prizes) on using the Prize Claimer.