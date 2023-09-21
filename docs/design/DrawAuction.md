---
id: draw-auction
title: Draw Auction
sidebar_position: 5
---

# Draw Auction

Unlike previous versions of PoolTogether, the V5 protocol is no longer reliant on permissioned controls to close the prize draws and instead incentivises 3rd parties to close the periodic draws using a sequence of timed auctions. The draw auctions outlined in these docs leverage an incentivisation mechanism to encourage competition among third parties to complete the draws in a timely manner while maximizing cost efficiency.

# Motivation

The PoolTogether V5 protocol is designed to be permissionless and self-sustainable, with daily prize pool draws that must run efficiently without any central control points. The completion of a prize pool draw requires at least two major steps:

1. Requesting an onchain random number from a proveably random source
2. Closing the prize pool draw with the resulting random number

The design for the draw auctions for PoolTogether V5 makes an assumption that the RNG source for all prize pools, regardless of which chain they are deployed on, will exist on the L1 network. The protocol will initially be deployed with an integration for Chainlink VRF V2 as the RNG source, but provides an option to upgrade the RNG source if a more decentralised option becomes available.

To ensure the timely closing of draws, the protocol must incentivise each step of the process to complete in sequential order while automatically adjusting the rewards to account for variables that will change over time:

1. Gas costs
2. RNG request fees
3. Bridging costs
4. 3rd-party software and hosting fees for bidders

The V5 protocol requires a system that accomplishes these tasks consitently and efficiently on a daily basis.

# Design

The design for the closing of PoolTogether V5 draws revolves around a sequence of timed auctions, each permissionlessly incentivising the completion of a specific task.

## Terminology

### Auction

A period of time over which a reward from zero to the maximum value increases until a bidder completes the required task.

### Prize Pool

The PoolTogether V5 prize pool contract that collects and distributes prizes. There exists one prize pool contract for each chain that the V5 protocol is deployed to.

### Draw

A draw is the process by which a prize pool uses a random number to distribute prizes to winners determined by that randomness and the state of their deposits. Draws happen once every day on each prize pool.

### RNG

Random Number Generation (or) Random Number Generator

### Bots

3rd-party scripts that are designed to complete auction tasks to earn the available rewards.

## Types of Auctions

There are two types of auctions that occur sequentially every draw period:

- **RNG Auction**: rewarded when a bot starts an RNG request
- **RNG Relay Auction**: rewarded when a bot relays a completed RNG result to the Prize Pool.

There is only one RNG auction that produces the random number for all prize pools. This saves time and value for the protocol since RNG requests can be costly in both. On the other hand, there is one draw auction for each prize pool. This allows each draw auction to be specifically designed to send the RNG data to the target prize pool in an efficient manner that works for the receiving chain.

In addition, if an L2 prize pool requires an extra step to be completed to bridge the data, an additional auction may be added after the draw auction completes for that pool to incentivise the completion of that step.

## Auction Timing

The RNG auction for any given draw starts at the beginning of the following draw period and must complete within the auction duration. Following the RNG auction, there is an “unknown” waiting period while the RNG service fufills the request.

Once the random number is available, the draw auctions begin at the timestamp at which the RNG request was completed and must also complete within their defined durations. The draw auction for an L2 will also be followed by a bridging period while the data is sent to the target prize pool. If the data does not reach the prize pool within the duration of the draw period, the draw for that prize pool will be delayed by 1 period and the data will still be used to close the pending draw.

> Note: this can cause some prize pools to be closed for a given period while others are still open. Bots must be aware of this if they want accurate reward estimates!

Once the draw is closed for a prize pool, it will distribute the fractional reserve portions based on the auction results that contributed to the closing of that draw.

![Draw Auction Flow](/img/v5/draw-auction/DrawAuction.png)

## Rewards

Each Prize Pool has a prize “reserve” that grows whenever prize liquidations occur. The reserve on a prize pool is the source of the rewards for the auctions that are used to close the draws on that pool.

Now, you might be thinking… “If the auctions are on L1, but the prize pool is on L2, how do the auctions know what the reserve is?”

To address this communication issue, the auctions are designed to function “blindly” by auctioning off a fraction of the reserve instead of a fixed value from the reserve. This leaves it up to the bots to query the L2 to find out the available reserve in a prize pool before bidding on an auction.

As mentioned above, there is one draw auction per prize pool, but only one RNG auction shared between them all. So which prize pool incentivises the bots to complete the RNG process? The answer is all of them!

In this case, auctioning off a fractional number works to our advantage since that fraction can be taken from all prize pool reserves, and the bots can use their clairvoiant nature to calculate exactly what rewards they will receive from each reserve should the draws be completed across them all.

## Parabolic Fractional Dutch Auction (PFDA)

Since the reserves on each prize pool can fluctuate significantly over time, the auctions need an automatic adaptive mechanism to try and ensure that auctions complete in a timely manner while still giving bots the time they need to bid as close to their profit thresholds as possible.

In early tests, a linear auction was used starting at 0% and ending at 100% of the reserve. This method quickly proved to be flawed by causing the protocol to pay over market value to the bots since the auction reward could change drastically over a matter of seconds when the prize pool reserves had significant value.

For example, if there are 10,000 tokens in the reserves and the auction has a duration of 2 hours, the auction price would go up over 80 tokens in a single minute. If the cost of completing the auction task is 20 tokens, then the protocol could overpay by a 300% margin or more within the first minute of the auction.

To solve this issue, a pricing function is needed that can:

- Cover the entire range of reserve
- “Slow down” the auction at the expected bidding price
- Automatically adjust the expected bidding price as external variables fluctuate
- Time the auction so that the expected bidding price always occurs at the same time in the auction

Given a target fractional bid price P where 0 ≤ P ≤ 1, and a target bid time T, where 0 < T ≤ 1 the strictly-increasing pricing function needs to start at price 0.0, reach P at time T, and end at price 1.0.

The following solution uses two mirrored pabarabolic curves that meet at point (T,P) and significantly slow down the auction price change near the target sale.

**When x <= T:**

![PFDA Less Than or Equal to T](/img/v5/draw-auction/PFDA_leT.png)

**When x > T:**

![PFDA Greater Than T](/img/v5/draw-auction/PFDA_gtT.png)

Examples:

![PFDA Greater Than T](/img/v5/draw-auction/PFDA_shape.png)

[Interactive Demo](https://www.desmos.com/calculator/kwxl5men0k)

With PFDA pricing, each auction can adjust its target bid price to be the last sale price while setting the target sale time to be earlier in the auction duration to speed up the process and allow more time to be given to the other incentivised processes in the protocol (see info on the Claimer and Liquidator).

<!-- TODO: ## Code Examples & Interfaces -->

## Conclusion

Through the use of adaptive pricing and a single source of randomness, the PoolTogether V5 protocol can efficiently leverage individual prize pool reserves to incentivise the consistent closing of draws across all deployed prize pools.
