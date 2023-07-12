---
id: claiming-prizes
title: Claiming Prizes
sidebar_position: 3
---

PoolTogether V5 incentivizes Claimers to claim prizes on behalf of winners. This means that anyone holding prize-wrapped assets will simply receive tokens; they don't need to run a transaction. You can compute and claim prizes for profit!

Prizes expire every Draw. For daily prizes, that means they expire every 24 hours. Incentivizing claimers is critical to ensure that users get their prizes.

Claimers need to perform some work, however. Every eligible account can win multiple prizes from each tier. For example if there is 1 prize for tier 1, 3 prizes for tier 2, and are 7 prizes for tier 3, then each account could win up to 11 prizes.

## Steps to Claim Prizes

In order to earn fees on claiming prizes, you will need to:

1. [Attain a list of all active accounts for the Prize Pool you're checking](#1-list-active-accounts)
2. [Compute the prizes won (if any) for each account that holds a non-zero TWAB balance](#2-compute-winning-tiers)
3. [If the claim fees are sufficiently profitable, then execute a prize claim](#3-batch-prize-claims)
4. [Periodically withdraw the fees you have earned from the Prize Pool](#4-withdrawing-earned-fees)

### 1. List Active Accounts

To get a list of accounts that have a non-zero balance for the Draw you are querying you can use the Twab Controller subgraph:

[APIs - Subgraphs](../api/subgraphs/index.md)

Make sure to filter out any accounts who have `autoClaimDisabled` set to `true`.

### 2. Compute Winning Tiers

To compute whether an account won you can call `isWinner(address vault, address account, uint8 tier, uint32 prizeIndex)` on the Prize Pool contract. The function returns `true` if the user won that prize for that tier.

To get the list of `prizeIndex` values for each tier, call `getTierPrizeCount(uint8 tier)` on the Prize Pool.

### 3. Batch Prize Claims

To claim prizes and capture fees you can use the `claimPrizes(address vault, address[] winners, uint8[] tiers, uint256 minFees, address feeRecipient)` function on the Claimer contract.

To pre-calculate earned fees, call `computeTotalFees(uint8 tier, uint claimCount)` on the Claimer. 

You will want to check if a prize has already been claimed as attempting to claim prizes which have been claimed will lead to reverting transactions.

### 4. Withdrawing Earned Fees

Fees earned for the `feeRecipient` specified will be stored as a value on the Prize Pool contract. You can check the balance of fees owed to a Fee Recipient by calling `balanceOfClaimRewards(claimer address)`, and you can withdraw using `withdrawClaimRewards(to address, amount uint256)`.

##  Caveats

When running multiple claim transactions to different vaults in a row you will likely want to wait until each transaction has completed before getting the newly updated value from `computeTotalFees` and sending a new transaction.

It may also benefit you to rely on FlashBots (for networks which support it) to ensure your transaction will succeed as other bots may be attempting to make the same claims as you at the same time.

## Reference Implementation

To see code examples, a reference Implementation of a prize claiming bot created by [Generation Software](https://www.g9software.xyz/) is available on GitHub:

https://github.com/GenerationSoftware/pt-v5-autotasks-monorepo/tree/main/packages/prize-claimer