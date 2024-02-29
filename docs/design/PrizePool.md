---
id: prize-pool
title: Prize Pool
sidebar_position: 1
---

In PoolTogether V5 prizes are distributed through the Prize Pool contract. There is one Prize Pool deployed on each chain on which PT is deployed. The Prize Pool receives contributions of the prize token from Vaults, and releases the tokens as prizes in daily Draws. In this way, prize liquidity is isolated to a chain.

The Prize Pool is fully autonomous and immutable; there are no governance or admin controls. The contract adjusts the number of prizes automatically.

The logic flows like so:

1. Vaults contribute the prize token to the Prize Pool.
2. Once per day a random number is drawn and pushed to the Prize Pool, and the next set of prizes is released. We call this a "Draw". When the random number is pushed the draw is "completed".
3. Vaults claim prizes on behalf of users from the last completed draw.

Let's analyze each in turn.

# Vaults Contribute the Prize Token

Prize liquidity comes from Vaults; each Vault liquidates its yield for the prize token, then contributes the prize token to the Prize Pool. However, liquidations may occur sporadically. A Vault might only generate enough yield for a liquidation to occur once a day, or once per week. Because of this, the Prize Pool smooths contributions over time using an exponential weighted average. The weighted average spreads the contributions out over many draws, so that if a Vault is only contributing once a week then it still has a chance to win between contributions.

The benefit of the exponential weighted average is that it's computationally cheap and that it "stacks" extremely cleanly. Tracking both the total contributed amounts per draw as well as contributed amount per Vault per draw is very easy.

## Exponential Weighted Average

The degree of smoothing is determined by the Prize Pool's $\alpha$ value, which is configured at initialization. The value must be $0 < \alpha < 1$.  The value 0 is no smoothing, and higher values represent greater degrees of smoothing.

Let $t$ be the contributed amount by a Vault, and $d$ be the number of draws after the contribution (think of $d$ as the time dimension). Then the contribution $c$ as a function of time is:

$$c(d) = -t*ln(\alpha)*\alpha^d$$

With $t = 100$ and $a = 0.9$, we'd have a graph like so:

<div class="max-width-wrapper">

![Smoothing Function](/img/v5/yield-smoothing/SmoothingFunction.png)
**Tokens contributed by vaults are distributed over many draws.**
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
2. distribute tokens allocated to a draw over the prize tiers, canary tier, and reserve.

## Incentivized Draws

The Prize Pool allows a "draw manager" contract to complete the Draw and withdraw tokens from the reserve. This externalizes the Draw incentive mechanism.

## Prize Tiers

The Prize Pool distributes prizes using prize "tiers". Tiers are ordered from 0 to $n-1$, where $n$ is the number of prize tiers. The highest tier is called the canary tier, and it's treated differently. We'll address it below.

### Standard Prize Tiers

The standard prize tiers run from 0 to $n-2$, where $n$ is the number of prize tiers. The number of tiers $n$ can range between 3 and 10.

Each tier has a unique:

- Odds of a prize occurring
- Amount of available liquidity

#### Odds of a Prize Occurring

The odds of a prize tier being awarded are two-fold: there is an over-arch odds of the tier occurring, but also the number of prizes for a tier.

**Number of prizes**

A given standard tier $t$ will have $p$ prizes according to this function:

$$
p = 4^t
$$

**Odds of Occurring Per Draw**

Each prize tier has different odds of occurring. This allows infrequent tiers to build up liquidity for larger prizes, and frequent tiers to have many small prizes. The range of frequency is determined by the *grandPrizePeriod*.

Tier 0 is the infrequent grand prize, and the highest standard prize tier is the most common prize: occurring every single draw.

For example, if:

- There is a draw every day
- The *grandPrizePeriod* is 365
- $n = 3$

Then:

- There will always be prizes each day
- There will be a large prize that occurs generally once per year.

When $n > 3$, there will be tiers in-between the grand prize and the prizes that occur every draw.

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
- The canary tier's prize count is tuned so that the prize size would match the largest standard tier if the number of tiers was $n+1$

The canary tier's role is to let us know whether it's worth offering $n+1$ tiers of prizes. This means that the canary tier prize size for number of tiers $n$ will match the highest standard prize tier for $n+1$ prize tiers.

## Reserve

A portion of the vault contributions are captured as Reserve. This portion serves two purposes:

- funds the incentives to submit draw
- provides a cushion when there is insufficient tier liquidity for prizes

The reserve cannot be withdrawn by anyone; it can only be used to incentivize draws and supplement prize liquidity.

## Distributing Tokens using Shares

Tokens are distributed using *shares*, which is conceptually just like an ERC-20 token though only used for internal accounting. Prize tiers are each allocated shares, the canary tier is allocated shares, and the reserve is allocated shares. The number of shares for each category cannot be changed after the Prize Pool contract is deployed.

For example, if:

- each "normal" prize tier has 100 shares
- the canary tier has 30 shares
- and the reserve has 70 shares
- there are 10 prize tiers ($n = 10$)
- there are 10,000 tokens to distribute for this draw

Then:

- the total number of shares is `9*100 + 30 + 70 = 1000`.
- Each normal prize tier will receive ${100 \over 1000}$ portion of the draws liquidity
- The canary prize tier will receive ${30 \over 1000}$ portion of the draws liquidity
- The reserve will receive ${70 \over 1000}$ of the draws liquidity

## Adjusting Prize Tiers

The Prize Pool increases and decreases the number of prizes by adjusting the number of prize tiers. The Prize Pool is constructed with a percentage *claim threshold*, which determines when the number of tiers is increased.

The number of tiers is increased when:

- the number of claimed standard prizes exceeds the claim threshold % of the *expected* number of standard prizes.
- the number of claimed canary prizes exceeds the expected number of canary prizes

This means that if the canary prizes are sufficiently large, then they will be worth claiming and it's time to increase the number of tiers.

The number of tiers is decreased if the highest tier claimed is less than $n-2$.

# Claiming Prizes

Vaults can claim prizes on behalf of their users.

<!-- TODO: Add details about the prize eligiblity -->

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
