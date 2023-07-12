---
id: draw-auction
title: Draw Auction
sidebar_position: 5
---

### TODO: Update design docs about the draw auction:

To encourage the completion of the Draw, the Prize Pool's reserve, which accumulated during the duration of the Draw, is distributed through an auction. A linear auction mechanism is used to distribute it.

## Draw Mechanism

The Draw completion process involves two steps:

1. Requesting a random number from an RNG service (e.g., Chainlink, Witnet)
2. Utilizing the generated random number to compute the winners and complete the Draw.

This process is handled by the [RNGRequestor](https://github.com/pooltogether/v5-draw-auction/blob/main/src/RNGRequestor.sol) contract.

## Auction Mechanism

A contract wishing to implement an auction can inherit from the base [Auction](https://github.com/pooltogether/v5-draw-auction/blob/main/src/auctions/Auction.sol) contract to set and retrieve phases.

As mentioned in the Draw Mechanism section, two steps are involved to complete the Draw.
The [TwoStepsAuction](https://github.com/pooltogether/v5-draw-auction/blob/main/src/auctions/TwoStepsAuction.sol) contract inherit from the Auction and RNGRequestor contracts to run an auction incentivizing the completion of the Draw.

Hooks are used across the codebase to offer modularity.

Once the RNG request has been triggered, the [`_afterRNGStart`](https://github.com/pooltogether/v5-draw-auction/blob/main/src/RNGRequestor.sol#L175) hook is called, which allows any contract inheriting from the RNGRequestor to override this function and run any additional code.

In the case of the [TwoStepsAuction](https://github.com/pooltogether/v5-draw-auction/blob/main/src/auctions/TwoStepsAuction.sol#L37) contract, we set the first phase.

Same goes for the [`_afterRNGComplete`](https://github.com/pooltogether/v5-draw-auction/blob/main/src/RNGRequestor.sol#L191) hook which is used to set the second phase in the [TwoStepsAuction](https://github.com/pooltogether/v5-draw-auction/blob/main/src/auctions/TwoStepsAuction.sol#L47) contract.

Once the RNG request has completed, the [`_afterAuctionEnds`](https://github.com/pooltogether/v5-draw-auction/blob/main/src/auctions/TwoStepsAuction.sol#L60) hook is called, which allows us to compute and distribute the rewards at the end of the auction.

## Auction Rewards

As mentioned earlier, rewards are computed via a linear interpolation present in the [AuctionLib](https://github.com/pooltogether/v5-draw-auction/blob/main/src/libraries/RewardLib.sol#L116) library.
The auction commences after the Draw concludes and ends when the auction duration is reached.

To qualify for rewards, each phase must be completed before the end of the auction.

It incentivizes bots competing for the reward to complete the Draw before the end of the auction.

If a phase was started before the end of the auction, but completed after, the end time used to calculate the reward will be the auction end time.

If the Draw fails to complete before the start of the next Draw period, the Draw will rollover and the auction will restart from the beginning.

## Ethereum (Layer 1) Mechanism

The [DrawAuction](https://github.com/pooltogether/v5-draw-auction/blob/main/src/DrawAuction.sol) contract handles the completion of the Draw on Ethereum.

<img src='/img/v5/draw-auction/l1-flow.png' />

It follows the following steps from the above diagram:

1. The Draw initiator calls the [`hasOpenDrawFinished`](https://github.com/pooltogether/v5-prize-pool/blob/4cbd0dbb40704c21cc07b42b2e3057a7e90b1057/src/PrizePool.sol#L579) function on the PrizePool and retrieves the current reward for completing the first phase of the auction by calling the  [`reward`](https://github.com/pooltogether/v5-draw-auction/blob/main/src/libraries/RewardLib.sol#L52) function on the DrawAuction contract
2. If the Draw has finished and the reward amount is sufficient to cover the cost of requesting the RNG, the Draw initiator calls [`startRNGRequest`](https://github.com/pooltogether/v5-draw-auction/blob/main/src/RNGRequestor.sol#L163)
3. Once the RNG request has been fulfilled by the RNG service, the Draw initiator can look at the current reward for completing the second phase of the auction and call the [`completeRNGRequest`](https://github.com/pooltogether/v5-draw-auction/blob/main/src/RNGRequestor.sol#L185) function.
Once called, the random number generated will be used to complete the Draw and the rewards will be distributed in the [`_afterAuctionEnds`](https://github.com/pooltogether/v5-draw-auction/blob/main/src/DrawAuction.sol#L81) hook.

## Layer 1 to Layer 2 Mechanism

To compute the random number and use it on a Layer 2 to complete the Draw, the flow is similar to the Ethereum one, except for the last step.

<img src='/img/v5/draw-auction/l1-flow.png' />

When calling the `completeRNGRequest` on the [DrawAuctionDispatcher](https://github.com/pooltogether/v5-draw-auction/blob/main/src/DrawAuctionDispatcher.sol) contract, the [`_afterAuctionEnds`](https://github.com/pooltogether/v5-draw-auction/blob/main/src/DrawAuctionDispatcher.sol#L155) hook will be called and make use of [ERC-5164](https://github.com/pooltogether/ERC5164) to dispatch the auction phases and random number to the [DrawAuctionExecutor](https://github.com/pooltogether/v5-draw-auction/blob/main/src/DrawAuctionExecutor.sol) contract on Layer 2.

The [`completeAuction`](https://github.com/pooltogether/v5-draw-auction/blob/main/src/DrawAuctionExecutor.sol#L93) function will then be called to complete the Draw and distribute the rewards.

Before triggering any phase of the auction, Draw initiators need to ensure that they have control over the provided [`_rewardRecipient`](https://github.com/pooltogether/v5-draw-auction/blob/main/src/auctions/TwoStepsAuction.sol#L35) address on L2.
