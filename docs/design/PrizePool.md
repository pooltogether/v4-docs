---
id: prize-pool
title: Prize Pool
sidebar_position: 3
---

In PoolTogether V5 prizes are distributed through the Prize Pool contract. There is one Prize Pool deployed on each chain on which PT is deployed. The Prize Pool receives POOL tokens from Vaults, and releases the tokens as prizes in daily Draws. In this way, prize liquidity is isolated to a chain.

The Prize Pool is fully autonomous and immutable; there are no governance or admin controls. The contract adjusts the number of prizes automatically.

The logic flows like so:

1. Vaults contribute POOL to the Prize Pool.
2. Once per day a random number is drawn and pushed to the Prize Pool, and the next set of prizes is released. We call this a "Draw". When the random number is pushed the draw is "completed".
3. Vaults claim prizes on behalf of users from the last completed draw.

Let's analyze each in turn.

# Vaults Contribute POOL

Prize liquidity comes from Vaults; each Vault liquidates its yield for POOL then contributes the POOL to the Prize Pool. However, liquidations may occur sporadically. A Vault might only generate enough yield for a liquidation to occur once a day, or once per week. Because of this, the Prize Pool smooths contributions over time using an exponential weighted average. The weighted average spreads the contributions out over many draws, so that if a Vault is only contributing once a week then it still has a chance to win between contributions.

The benefit of the exponential weighted average is that it's computationally cheap and that it "stacks" extremely cleanly. Tracking both the total contributed amounts per draw as well as contributed amount per Vault per draw is very easy.

## Exponential Weighted Average

The degree of smoothing is determined by the Prize Pool's $\alpha$ value, which is configured at initialization. The value must be $0 < \alpha < 1$.  The value 0 is no smoothing, and higher values represent greater degrees of smoothing.

Let $t$ be the contributed amount by a Vault, and $d$ be the number of draws after the contribution (think of $d$ as the time dimension). Then the contribution $c$ as a function of time is:

$$c(d) = -t*ln(\alpha)*\alpha^d$$

With $t = 100$ and $a = 0.9$, we'd have a graph like so:

<div class="max-width-wrapper">

![Smoothing Function](/img/v5/yield-smoothing/SmoothingFunction.png)

</div>

However, a "draw" is in fact a range of time. For daily draws, that range would span 24 hours. The contributions for draw 1 would be the sum of contributions between [0, 1]. To compute the allocated contribution for a draw $d$ we'd compute the integral:

$$
{\int_{d-1}^{d}c(d) = C(d) - C(d - 1)}
$$

Let's determine the antiderivative $C(d)$:

$$
C(d) = {\int c(d)} = {\int -t*ln(\alpha)*\alpha^d dd} = -t*\alpha^d
$$

**We can now calculate the contribution for a particular draw $d$**:

$$
{\int_{d-1}^{d}c(d) = -t*\alpha^d + t*\alpha^{d-1}}
$$

To see an example of this, see the [yield smoothing example](#yield-smoothing-example) in the appendix.

# Daily Draws Release Prizes

Each day a new random number is drawn and pushed into the Prize Pool. When a new draw is pushed the Prize Pool will:

1. adjust the number of prize tiers
2. distributes the draw's contributions over the prize tiers, canary tier, and reserve.

Let's dig into prize tiers, the canary tier, and the reserve. Afterwards we'll review the conditions for prize tier adjustment.

## Prize Tiers

The Prize Pool distributes prizes using prize "tiers". Tiers are ordered from 0 to $n-1$, where $n$ is the number of prize tiers. Tier 0 is the grand prize, and tier $n-1$ is the daily prize tier. The Prize Pool adjusts the prizes by changing the number of prize tiers $n$. The minimum number of tiers is 2, and the maximimum is 15.

The tier number determines:

- Number of prizes
- Odds of occurring per draw

Each tier is essentially a bucket of liquidity, and the tier number determines the number and frequency of prizes.

**Number of prizes**

A given tier $t$ will have $p$ prizes according to this function:

$$
p = 4^t
$$

You can see how tier 0, the grand prize, will have 1 prize.  The largest tier, 15, will have its prize liquidity split across 1,073,741,824 prizes

**Odds of Occurring Per Draw**

The Prize Pool adjusts the statistical odds of each tier so that tier 0 occurs yearly, and that the highest tier occurs daily.

To compute the odds $o$ of a tier occurring per draw, let:

- $g$ be the statistical period for the grand prize
- $n$ be the number of prize tiers
- $t$ be the prize tier we're calculating for

$$
o = e^{(t-n+1))*ln(1/g) \over (1-n)}
$$

The Prize Pool uses $o$ to lower the odds of a tier occurring. This means that prize liquidity builds up for tiers that are infrequent, resulting in larger prizes for those tiers.

For example, if $n = 4$ and $g = 365$, then for tier 0 we see that:

$$
o = e^{(0-4+1)*ln(1/365) \over (1-4)} = e^{-3*ln(1/365) \over -3} = e^{ln(1/365)} = {1 \over 365} = 0.002739726027
$$

Let's compute the rest:

| Tier | Odds | Prize Period in Draws |
| ---- | ---- | ---- |
| 0 | 0.002739726027 | 365 |
| 1 | 0.01957964246 | 51.07 |
| 2 | 0.1399272756 | 7.14 |
| 3 | 1 | 1 |

You can see how the equation bounds tier prize frequency between yearly and daily.

## Canary Tier

The Canary Tier is a special prize tier that receives a smaller amount of prize liquidity. The Canary Tier informs the Prize Pool as to whether it's worth increasing the number of prize tiers.

The Canary Tier behaves as if the number of tiers is $n+1$ and the canary tier is tier $n$.

- The canary tier has odds of occurring daily (as if it were the highest tier)
- The canary tier's prize count is specially tuned

The canary tier's role is to let us know whether it's worth offering $n+1$ tiers of prizes. This means that the canary tier prize size will match the prize tier $n$ if there were $n+1$ prize tiers.

## Reserve

A portion of the vault contributions are captured as Reserve. This portion serves two purposes:

- funds the incentives to submit draw
- provides a cushion when there is insufficient tier liquidity for prizes

The reserve cannot be withdrawn by anyone; it can only be used to incentivize draws and supplement prize liquidity.

## Distributing Contributions

The contributions for a draw are distributed using the concept of "shares".  Prize tiers each have a number of shares, the canary tier has its own shares, and the reserve has it's own shares. You can think of shares just like tokens, although shares are just used for internal accounting and there is no ERC20 interface. The Prize Pool distributes tokens by increasing a "share exchange rate", which determines the number of POOL tokens per share.

The Prize Pool is initialized with the number of shares per prize tier, canary tier, and reserve. The shares cannot be changed after it is created.

For example, if there are 100 shares per prize tier, 10 for the canary tier and 20 for the reserve, then if there are 4 prize tiers the total shares would be:

$$
100 * 4 + 10 + 10 = 420
$$

When a draw is pushed the Prize Pool will increase the share exchange rate by the contributed amount over the current total shares.

# Claiming Prizes

Vaults can claim prizes on behalf of their users

NOTE: add detail

# Appendix

## Yield Smoothing Example

Let's assume:

- a Vault contributes 10,000 tokens before the start of Draw 1
- the Prize Pool was initialized with $\alpha = 0.9$.

We can see how ~96% of the yield will be distributed over the next 30 draws. The remainder is distributed 

| Draw | Vault Contribution |
| ---- | ------------ |
| 1 | 1000 |
| 2 | 900 |
| 3 | 810 |
| 4 | 729 |
| 5 | 656.1 |
| ... | ... |
| 16    | 205.8911321 |
| 17    | 185.3020189 |
| 18    | 166.771817 |
| 19    | 150.0946353 |
| 20    | 135.0851718 |
| ...    | ... |
| 26    | 71.78979877 |
| 27    | 64.61081889 |
| 28    | 58.149737 |
| 29    | 52.3347633 |
| 30    | 47.10128697 |
