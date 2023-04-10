---
id: liquidating-yield
title: Liquidating Yield
sidebar_position: 2
---

# Liquidating Yield

PoolTogether V5 continuously liquidates all yield for POOL tokens and deposits them into a Prize Pool. Liquidation sells yield at a slight discount for POOL, creating an arbitrage opportunity.

Liquidation Pairs are the mechanism by which yield is liquidated. Each PoolTogether Vault will have one or more associated Liquidation Pairs. A Liquidation Pair is like a Uniswap pair, but it only supports swaps in a single direction.

Liquidation Pairs are immutable contracts that are created by the Liquidation Pair Factory.

# Arbitrage Steps

To arbitrage yield, you would follow these steps:

1. Find the Liquidation Pair you wish to arb.
2. Compute the current available liquidity and the POOL cost
3. If the liquidity is available at a sufficient discount, execute a swap

## Find the Liquidation Pair

You can list the Liquidation Pairs on-chain by using the Liquidation Pair Factory contract. The contract tracks all created pairs, making it easy to determine whether a pair is legitimate, and to enumerate all pairs.

Realistically, however, bots will want to index and track the Liquidation Pairs off-chain. We'll leave that up to implementors.

**Getting the Total Count of Liquidation Pairs**

To get the count of the number of Liquidation Pairs, you can call `totalPairs()` on the Liquidation Pair Factory

**Retrieving the address of the Nth Liquidation Pair**

Liquidation Pair addresses can be accessed using the `allPairs(uint index)` function on the Liquidation Pair Factory.

**Checking Whether an Address was created by the Factory**

You can check whether an address is a Liquidation Pair created by the factory using the `deployedPairs(address pair)` function on the Liquidation Pair Factory. It returns true if the given address is a Liquidation Pair created by the factory.

## Compute the Available Liquidity

The Liquidation Pair will have a limited amount of yield available.

Compute how much yield is available using the `maxAmountOut()` function on the Liquidation Pair. This function returns the maximum number of tokens you can swap out.

You could also check the profitability of a swap by calling the Liquidation Router `swapExactAmountIn()` or `swapExactAmountOut()` statically (no state change), and get the return value.

**Note:** `swapExactAmountIn()` and `swapExactAmountOut()` both exist on the LiquidationPair contracts, however for your swaps to be successful you will need to run them on the LiquidationRouter.

## Execute a Swap

If a swap is profitable, then you can execute the swap using the Liquidation Router.  The Router provides two functions to do so: `swapExactAmountIn()` lets the caller execute a swap with an exact amount of POOL tokens, or `swapExactAmountOut()` which allows the caller to define the expected number of output tokens.

