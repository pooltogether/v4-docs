---
id: prize-pool
title: Prize Pool
sidebar_position: 1
---

In PoolTogether V5 prizes are distributed through the Prize Pool contract. There is one Prize Pool deployed on each chain on which PT is deployed. The Prize Pool receives contributions of the prize token from prize vaults, and releases the tokens as prizes in every draw. In this way, prize liquidity is isolated to a chain.

The Prize Pool is fully autonomous and immutable; there are no governance or admin controls. The contract adjusts the number of prizes automatically.

The logic flows like so:

1. Prize vaults contribute the prize token to the Prize Pool.
2. Once per day a random number is drawn and pushed to the Prize Pool, and the next set of prizes is released. We call this a "Draw". When the random number is pushed the draw is "awarded".
3. Prize vaults claim prizes on behalf of users from the last awarded draw.

Let's analyze each in turn.

## Vaults Contribute the Prize Token

Prize liquidity comes from prize vaults; each vault liquidates its yield for the prize token, then contributes the prize token to the Prize Pool to earn a chance for the depositors to win.

## Incentivized Draws

The Prize Pool allows a "draw manager" contract to complete the draw and withdraw tokens from the reserve. This externalizes the Draw incentive mechanism.

## Prize Tiers

The Prize Pool distributes prizes using prize "tiers". Tiers are ordered from 0 to $n-1$, where $n$ is the number of prize tiers. The last 2 tiers are called the canary tiers, and are treated differently. We'll address it below.

### Standard Prize Tiers

The standard prize tiers run from 0 to $n-3$, where $n$ is the number of prize tiers. The number of tiers $n$ can range between 4 and 11.

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

This splits the liquidity allocated to the tier between more prizes for higher tiers and less prizes for lower tiers. The grand prize (tier 0) only has 1 prize, so it will grow the most.

**Odds of Occurring Per Draw**

Each prize tier has different odds of occurring. This allows infrequent tiers to build up liquidity for larger prizes, and frequent tiers to have many small prizes. The range of frequency is determined by the *grandPrizePeriod*.

Tier 0 is the infrequent grand prize, and the highest standard prize tier is the most common prize: occurring every single draw.

For example, if:

- There is a draw every day
- The *grandPrizePeriod* is 365
- $n = 4$

Then:

- There will always be prizes each day
- There will be a large prize that occurs generally once per year.

When $n > 4$, there will be tiers in-between the grand prize and the prizes that occur every draw.

## Canary Tiers

The canary tiers are the last two prize tiers each draw. They are expected to have reduced liquidity compared to normal prize tiers and are not usually distributed to the winners because of their insignificant value (this behavior is configured by the claimer and each vault can use a different claimer).

The first canary tier is expected to be claimed every draw, if it isn't then the next draw will have one less tier than before. Inversely, the second canary tier has slightly smaller prizes and is *not* expected to be claimed. If it is claimed, then the next draw will have one more tier. This behavior lets current gas prices and incoming yield determine the prize size and prize count.

## Reserve

A portion of the vault contributions are captured as reserve. This portion serves two purposes:

- funds the incentives to award the draw
- provides a cushion when there is insufficient tier liquidity for prizes (some deployments may use the `tierLiquidityUtilizationRate` for this purpose instead and choose to use the leftover reserve for other motives)

The reserve can only be withdrawn by the draw manager contract.

## Distributing Tokens using Shares

Tokens are distributed using *shares*, which is conceptually just like an ERC-20 token though only used for internal accounting. Prize tiers are each allocated shares, the canary tier is allocated shares, and the reserve is allocated shares. The number of shares for each category cannot be changed after the Prize Pool contract is deployed.

For example, if:

- each "normal" prize tier has 100 shares
- the canary tier has 4 shares
- and the reserve has 30 shares
- there are 10 prize tiers ($n = 10$)
- there are 10,000 tokens to distribute for this draw

Then:

- the total number of shares is `8*100 + 2*4 + 30 = 838`.
- Each normal prize tier will receive ${100 \over 838}$ portion of the draws liquidity
- The canary prize tier will receive ${4 \over 838}$ portion of the draws liquidity
- The reserve will receive ${30 \over 838}$ of the draws liquidity

# Claiming Prizes

Vaults can claim prizes on behalf of their users. The method of this is up to the vault, but the standard prize vaults will use the pre-deployed claimer contract that incentivizes prize claims by auctioning off a portion of each prize as rewards to the claimers.
