---
id: liquidating-yield
title: Liquidating Yield
sidebar_position: 3
---

# Arbitraging Yield Liquidations

---

PoolTogether continuously liquidates all yield for the prize token and deposits them into a Prize Pool. Liquidation sells yield at a slight discount for prize tokens, creating an arbitrage opportunity.

Liquidation Pairs are the mechanism by which yield is liquidated. Each PoolTogether Vault will have one or more associated Liquidation Pairs. A Liquidation Pair is like a Uniswap pair, but it only supports swaps in a single direction.

Liquidation Pairs are immutable contracts that are created by the Liquidation Pair Factory.

## Arbitrage Steps

To arbitrage yield, you would follow these steps:

1. [Find the Liquidation Pair you wish to arb](#1-find-the-liquidation-pair)
2. [Compute the current available liquidity and the prize token cost](#2-compute-the-available-liquidity)
3. [If liquidity is available at a sufficient discount and profitable to you, execute a swap](#3-execute-a-swap)

---

### 1. Find the Liquidation Pair

You can list the Liquidation Pairs on-chain by using the Liquidation Pair Factory contract. The contract tracks all created pairs, making it easy to determine whether a pair is legitimate, and to enumerate all pairs.

Realistically, however, bots will want to index and track the Liquidation Pairs off-chain. We'll leave that up to implementors.

**Getting the Total Count of Liquidation Pairs**

To get the count of the number of Liquidation Pairs, you can call [`totalPairs`](/protocol/reference/liquidator/TpdaLiquidationPairFactory#totalpairs) on the Liquidation Pair Factory.

**Retrieving the address of the Nth Liquidation Pair**

Liquidation Pair addresses can be accessed using the [`allPairs`](/protocol/reference/liquidator/TpdaLiquidationPairFactory#allpairs) function on the Liquidation Pair Factory.

**Checking Whether an Address was created by the Factory**

You can check whether an address is a Liquidation Pair created by the factory using the [`deployedPairs`](/protocol/reference/liquidator/TpdaLiquidationPairFactory#deployedpairs) function on the Liquidation Pair Factory. It returns true if the given address is a Liquidation Pair created by the factory.

---

### 2. Compute the Available Liquidity

The Liquidation Pair will have a limited amount of yield available.

Compute how much yield is available using the [`maxAmountOut`](/protocol/reference/liquidator/TpdaLiquidationPair#maxamountout) function on the Liquidation Pair. This function returns the maximum number of tokens you can swap out.

You could also check the profitability of a swap by calling the Liquidation Router's [`swapExactAmountOut`](/protocol/reference/liquidator/TpdaLiquidationRouter#swapexactamountout) statically (no state change), and get the return value.

**Note:** [`swapExactAmountOut`](/protocol/reference/liquidator/TpdaLiquidationRouter#swapexactamountout) exists on both the LiquidationPair contracts and the LiquidationRouter, however for your swaps to be successful you will need to run it on the LiquidationRouter.


### 3. Execute a Swap

If a swap is profitable, then you can execute the swap using the Liquidation Router.  The Router provides only [`swapExactAmountOut`](/protocol/reference/liquidator/TpdaLiquidationRouter#swapexactamountout) which allows the caller to define the expected number of output tokens.

---

## Using Flashswaps to Liquidate

Flashswaps are unique swaps where the sender receives the output first, executes some external logic to obtain input tokens and sends the required input amount to the swap contract, keeping the profit from the arbitrage. In order for this to be possible, the contract verifies that the required token input has been received at the end of the transaction and fails if they haven't.

In PoolTogether V5, flashswaps can be used with yield liquidations as a way to atomically liquidate yield for prize tokens with an onchain market without having to worry about volatility.

To learn more about using flashswaps to liquidate yield, check out the [Flashswap Liquidations Guide](https://github.com/GenerationSoftware/pt-v5-builder-code-examples/tree/main/src/liquidations/examples/flash-swap-liquidations) or the [Uniswap V3 Flashswap Liquidation Contract](/protocol/reference/liquidator/UniswapFlashLiquidation).
