---
id: claiming-prizes
title: Claiming Prizes
sidebar_position: 4
---

PoolTogether incentivizes claimers to claim prizes on behalf of winners. This means that anyone holding prize-wrapped assets will simply receive tokens; they don't need to run a transaction. You can compute and claim prizes for profit!

Prizes expire every Draw. For daily prizes, that means they expire every 24 hours. Incentivizing claimers is critical to ensure that users get their prizes.

Claimers need to perform some work, however. Every eligible account can win multiple prizes from each tier. For example if there is 1 prize for tier 1, 3 prizes for tier 2, and are 7 prizes for tier 3, then each account could win up to 11 prizes.

## Steps to Claim Prizes

In order to earn fees on claiming prizes, you will need to:

1. [Attain a list of all active accounts for the Prize Pool you're checking](#1-list-active-accounts)
2. [Compute the prizes won (if any) for each account that holds a non-zero TWAB balance](#2-compute-winning-tiers)
3. [If the claim fees are sufficiently profitable, then execute a prize claim](#3-batch-prize-claims)
4. [Periodically withdraw the fees you have earned from the Prize Pool](#4-withdrawing-earned-fees)

---

### 1. List Active Accounts

To get a list of accounts that have a non-zero balance for the previous Draw you can use the Twab Controller subgraph:

[APIs - Subgraphs](/protocol/subgraphs)

There is also an npm library written with helper functions for getting vaults, computing prizes, and more located here: 

[GitHub - pt-v5-utils-js](https://github.com/GenerationSoftware/pt-v5-utils-js#user-content--get-subgraph-vaults)

---

### 2. Compute Winning Tiers

To compute whether an account won you can call [`isWinner`](/protocol/reference/prize-pool/PrizePool#iswinner) on the Prize Pool contract. The function returns `true` if the user won that prize for that tier.

To get the list of `prizeIndex` values for each tier, call [`getTierPrizeCount`](/protocol/reference/prize-pool/TieredLiquidityDistributor#gettierprizecount) on the Prize Pool.

---

### 3. Batch Prize Claims

To claim prizes and capture fees you can use the [`claimPrizes`](/protocol/reference/prize-claimer/Claimer#claimprizes) function on the Claimer contract.

To pre-calculate earned fees, call [`computeTotalFees`](/protocol/reference/prize-claimer/Claimer#computetotalfees) on the Claimer. 

You will want to check if a prize has already been claimed as attempting to claim prizes which have been claimed will lead to reverting transactions.

---

### 4. Withdrawing Earned Fees

Fees earned for the `feeRecipient` will be stored as a balance on the Prize Pool contract. You can check the balance of a recipient by calling [`rewardBalance`](/protocol/reference/prize-pool/PrizePool#rewardbalance), and you can withdraw using [`withdrawRewards`](/protocol/reference/prize-pool/PrizePool#withdrawrewards).

---

##  Caveats

When running multiple claim transactions to different vaults in a row you will likely want to wait until each transaction has completed before getting the newly updated value from [`computeTotalFees`](/protocol/reference/prize-claimer/Claimer#computetotalfees) and sending a new transaction.

It may also benefit you to rely on FlashBots (for networks that support it) to ensure your transaction will succeed as other bots may be attempting to make the same claims as you at the same time.
