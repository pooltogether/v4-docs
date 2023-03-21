---
id: claiming-prizes
title: Claiming Prizes
sidebar_position: 3
---

PoolTogether V5 incentivizes Claimers to claim prizes on behalf of winners. This means that anyone holding prize-wrapped assets will simply receive tokens; they don't need to run a transaction. You can compute and claim prizes for profit!

Prizes expire every Draw. For daily prizes, that means they expire every 24 hours. Incentivizing claimers is critical, to ensure that users get their prizes.

Claimers need to perform some work, however. Every eligible account can win one prize from each tier. For example if there are 10 tiers, then each account could win up to 10 prizes.

# Steps to Claim Prizes

In order to earn fees on claiming prizes, you will need to:

1. Attain a list of all active accounts for the Prize Pool you're checking.
2. Compute the winning tiers (if any) for each account that holds a non-zero TWAB balance
3. If the claim fees are sufficiently profitable, then execute a batch prize claim


## List Active Accounts

To get a list of accounts that have a non-zero balance for the Draw you are querying you can use the Twab Controller subgraph

(docs here)

## Compute Winning Tiers

To compute whether an account won you can call `isWinner(address vault, address account, uint8 tier)` on the Prize Pool. The function returns true if the user won that tier.

## Batch Prize Claims

To claim prizes and capture fees you can use the `claimPrizes(address vault, address[] winners, uint8[] tiers, uint256 minFees, address feeRecipient)` function on the Claimer contract.

To calculate earned fees, simple call the function statically (i.e. don't run a tx) and check the return value.

To execute the claims, submit the call as a transaction.