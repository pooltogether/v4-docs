---
id: completing-draw-auctions
title: Completing Draw Auctions
sidebar_position: 5
---

#### **Tutorial:** [👨‍⚖️ Creating a Draw Auction bot](https://mirror.xyz/chuckbergeron-g9.eth/1o-d_ScnJ8F0cer5SRmILMSPxTCn4vlWgN7fkU4FD4o)

---

In order for PoolTogether to work, a random number is required to choose winners and complete draws. PoolTogether V5 incentivizes anyone looking to request and relay random numbers from a trusted and verifiable RNG service. 

Draws are daily, which means:

- there is `1` `startRngRequest` that needs to take place (typically on an L1 such as Ethereum mainnet) each day
- there is `n` number of `relay` transactions that need to take place for `n` number of prize pools

Prize pools typically live on L2s as it is much cheaper for poolers to deposit and withdraw on L2s. In these cases, the `relay` transaction will also bridge the RNG from the source (eg. Ethereum) to the destination (eg. Optimism).

### To earn from completing draw auctions you will need to:

1. [Check to see if there are open auctions](#1-list-active-accounts)
2. [Compute the rewards that can be earned, and the costs associated](#2-compute-winning-tiers)
3. [If completing an auction is profitable, execute a transaction to complete it](#3-batch-prize-claims)


---

### 1. Check For Open Auctions



### 2. Compute Rewards and Costs


### 3. Completing an Auction



## Reference Implementation

To see code examples, a reference implementation of an arbitrage bot created by [Generation Software](https://www.g9software.xyz/) is available on GitHub:

<div className='flex-center'>
  <img src="/img/github.svg" width="20" height="20" className='github-img-dark' />
  <img src="/img/github-light.png" width="20" height="20" className='github-img-light' />
  <a href="https://github.com/GenerationSoftware/pt-v5-autotasks-monorepo/tree/main/packages/draw-auction">GitHub - pt-v5-autotasks-draw-auction</a>
</div>
