---
id: liquidation-pairs
title: Liquidation Pairs
sidebar_position: 2
---

# Liquidation Pair

A key component of the PoolTogether V5 is the consolidation of yield from many different assets into POOL, which is then awarded as prizes. The protocol will consolidate yield from potentially thousands of different tokens in order to build a single pool of prize liquidity.

To maximize the return from liquidations we need to:

- Sell all of the available yield
- Sell the yield at the highest rate possible

A secondary goal is to on-board new assets rapidly, so we need the ability to liquidate any kind of token. This means that:

- The code should not rely on oracles, as they support a limited set of assets
- The code should be autonomous, as we won't be able to manually track hundreds of assets.

The PoolTogether Liquidation Pair is a single-sided virtual AMM that achieves the above goals.

## Reframing Consolidation as Swaps

Let's reframe yield liquidation in terms of swaps. These are the two sides to the swap:

- The protocol is swapping yield for POOL (protocol wants POOL)
- Users are swapping POOL for yield (users want to arbitrage yield)

When you swap with an AMM, you are shifting token liquidity. A swap adds tokens to one side and removes tokens from the other:

- Swapping yield tokens for POOL: adds yield tokens, removes POOL
- Swapping POOL for yield tokens: adds POOL, removes yield tokens

By swapping yield tokens for POOL we increase the yield liquidity and decrease the POOL liquidity. There is now more yield token per POOL in the pair, so the *buying power of POOL has increased*. Vice versa for the other side of the swap. This is how price changes occur in an AMM.

This behaviour is useful to us; as the protocol swaps yield for prizes the buying power of the POOL increases. The value of the POOL will exceed the going market rate, and it will become an arbitrage opportunity.

When users swap tokens for yield, they will arbitrage any difference, and so the pair will re-balance to the market rate.

# Virtual Liquidity

In an AMM the liquidity of the pair is held by the contract itself: each Uniswap pair holds tokens. However, our swapping mechanism won't hold liquidity directly, because:

- Yield accrues gradually in the prize pools
- POOL is sent to the prize pool

Instead, we'll need to create "virtual" liquidity; when we create the liquidation pair we'll configure virtual liquidity amounts for both the yield tokens and POOL.

For AMM pairs the size of the liquidity determines the price "slippage" for trades, so we'll want the virtual liquidity amounts to be appropriate for the rate of accrual of yield. More on this later....

# Protocol: Swaps Yield for Tokens

The protocol is going to swap yield for tokens. However, there are some important considerations:

- The protocol swap won't actually transfer tokens, because the protocol already owns the liquidity. The swap will be purely virtual.
- Yield accrues passively. When is the swap executed?

We can execute the virtual swap when a user swaps tokens for yield. As long as the virtual swap occurs before the user swap is calculated, then there will be an arbitrage opportunity.

# User: Swaps Tokens for Yield

We've now established that when a user swaps tokens for yield, these two steps occur:

1. We do a virtual swap of yield for tokens
2. We execute a real swap of tokens for yield (yay arbitrage!)

Great! Next let's make some observations:

- A rational user will swap only enough to capture the discount from the market rate.
- A user cannot swap more than the available yield.

With these in mind, let's analyze market conditions with respect to the value of tokens.

# Swaps Under Market Conditions

The market condition is the difference between the token price on the liquidator and the market rate.

For example: if the yield tokens are USDC and the POOL are POOL, then the liquidator price of tokens will be USDC per POOL. This price may or may not differ from the current market price of POOL.

There are three market conditions we will consider:

1. When the market price of POOL is the same as the liquidator price
2. When the market price of POOL is higher than the liquidator price
3. When the market price of POOL is lower than the liquidator price

## Market Price Matches Liquidator Price

When the exchange rate on the liquidator matches the market the user will arbitrage the entire yield. The exchange rate after the swap remains the same, because the user consumed the entire yield.

<img src='/img/v5/yield-liquidation/StableExchangeRate.png' />

## Market Price is Higher

In this scenario the market is trading the POOL at a higher price than the liquidator. Remember our earlier observation: a rational user will only capture the above market rate for tokens. Users will only arbitrage up until the market rate:

<img src='/img/v5/yield-liquidation/ValueOfTokenRises.png' />

## Market Price is Lower

In this scenario the market price of tokens is *lower* than the liquidator price. The user will want to swap as much as possible, because the tokens have greater buying power in the liquidator.

***The problem is that users cannot purchase more than the available yield.***

We will see the same behaviour as a stable market price:

<img src='/img/v5/yield-liquidation/ValueOfTokenDecreases.png' />

# Virtual Swap Multiplier

We need to add additional swap pressure so that the token value can *decrease*.

To do this, we can add an additional virtual swap to every user swap. This virtual swap is a fraction of the user swap; so when a user swaps it will drive the price down further. This fraction is the swap multiplier. The virtual swap occurs after a user swap, and will be a percent of the user swap size.  It does not affect the user swap.

<img src='/img/v5/yield-liquidation/ValueOfTokenDecreasesVirtualSwap.png' />

You can see how after multiple swaps the liquidator's POOL price begins to stabilize at the market price:

<img src='/img/v5/yield-liquidation/VirtualSwapLostPortion.png' />

A balance needs to be struck between the ability to track the market rate and maximizing the amount of yield liquidated.

# Adaptive Virtual Liquidity

The size of the virtual liquidity determines the efficiency of trades in either direction.

If the virtual liquidity is small relative to the yield then:

- Yield accrual will have a larger effect on the exchange rate: price goes up faster
- More slippage is incurred from arbitrage: price goes down faster

If the virtual liquidity is large, then the opposite is true.

A prize pool's yield will change over time, so we need the virtual liquidity amount to adapt to the amount of yield so that trades are efficient.

**An Adaptive Approach**

Let's say we want the yield to always be 5% of the virtual liquidity. After each swap, we adjust the virtual liquidity like so:

```
liquidityFraction = 0.05
multiplier = currentlyAccruedYield / (yieldVirtualLiquidity*liquidityFraction)

yieldVirtualLiquidity = multiplier * yieldVirtualLiquidity
tokenVirtualLiquidity = multiplier * tokenVirtualLiquidity
```

The `liquidityFraction` determines the yield's size relative to the virtual liquidity. In this case the yield will be 5% of the virtual liquidity.

# Summary

You can see how a virtual AMM will allow us to scale yield liquidations with very little overhead. We now have a complete swapping algorithm. When someone swaps these steps occur:

1. Protocol virtually swaps yield for tokens
2. User swaps tokens for yield
3. Extra virtual user swap (negative pressure)
4. Adjust virtual liquidity based on accrued yield

The controls we have available are:

- **Initial virtual liquidity**: This will determine the exchange rate of the pair, the efficiency of swaps, and how quickly the price will track market swings.
- **Swap Multiplier**: This determines how quickly the price tracks downward market swings. Higher values also mean that more yield is left unsold, due to price impact.
- **Liquidity fraction**: Determines the size of virtual LP to the average yield. Lower values make for efficient swaps, but it will track downward price swings poorly.
