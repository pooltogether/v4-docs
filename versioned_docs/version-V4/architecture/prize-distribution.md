---
title: "Prize Distribution"
sidebar_position: 2
---

PoolTogether V4 uses a statistical approach for prize distribution. It allows a virtually infinite number of prizes to be distributed in prize tiers.

The algorithm is called Tsunami as it brings a massive wave of prizes.

<img
src={require('/img/v4/Tsunami.png').default}
alt='Tsunami'
class='img-max'
/>

# Overview

Prizes are distributed through weekly draws:

- Each draw has a set of prize distribution parameters, including a randomly generated winning number
- Users submit their winning "picks" to claim prizes. Picks are pseudo-random numbers that are allocated to each user for each draw. Users can only claim up to a certain number of picks per draw.
- The tier to which a pick matches the draw's winning number determines the prize size for the pick. The matching algorithm is configured per-draw.

## Matching Algorithm

Each pick is compared to the winning number. How is this done exactly? By breaking each number down into an array of smaller numbers.

Each pick is 256 bits long. Let's interpret the first 32 bits as 8 numbers. This means we have 8 4-bit numbers.

If the pick is `0x12345678....`, then the first 8 numbers are 1, 2, 3, 4, 5, 6, 7, 8.

We call the number of bits for each number the **bit range**, and the number of numbers the **cardinality**. In the above example the bit range is 4 and the cardinality is 8.

Continuing the above example, let's assume the winning number is `0x123fe678...`. With bit range of 4 and cardinality 8 the first 8 numbers will be 1, 2, 3, f, e, 6, 7, 8.

Let's stack them up side-by-side.

| index 0 | index 1 | index 2 | index 3 | index 4 | index 5 | index 6 | index 7 |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| 1       | 2       | 3       | 4       | 5       | 6       | 7       | 8       |
| 1       | 2       | 3       | f       | e       | 6       | 7       | 8       |

The "tier" of the match is _the cardinality less the first N matching numbers_.

In the above example the first three numbers match:

| index 0 | index 1 | index 2 | index 3 | index 4 | index 5 | index 6 | index 7 |
| ------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| **1**   | **2**   | **3**   | 4       | 5       | 6       | 7       | 8       |
| **1**   | **2**   | **3**   | f       | e       | 6       | 7       | 8       |

This means that the tier of match is 8 - 3, or five.

The tier of the match is used to determine what tier of prize they won. Tier 0 is the grand prize, Tier 1 is second place, etc.

## Total Picks

Given the bit range and the cardinality for a prize distribution, we can calculate the total number of combinations:

number of combinations = (2^bit range)^cardinality

For example, given the above cardinality of 8 and bit range of 4 we'd have:

number of combinations = (2^4)^8 = 4,294,967,296 possible combinations.

There is only 1 combination that matches all 8 winning numbers, so its odds are 1 / 4,294,967,296.

We call the number of combinations the **total picks**.

## Pick Distribution

Each prize pool is alloted a portion of the total picks proportional to its contribution to the prize network liquidity for the week. If a prize pool contributed 50% of the prize liquidity for the week, then it would be alloted 4,294,967,296 / 2 = 2147483648 picks.

Each user for each prize pool is alloted a portion of the prize pool's picks based on their liquidity provided for the previous week. If a user provided 20% of the liquidity for the above prize pool during the previous week, then they would get 0.2 \* 2147483648 = 429496729 picks.

We can compute a user's historic liquidity contribution using their Time-Weighted Average Balance.

## Generating Picks

If a user has 2000 picks for a draw, that means they are allowed to submit Pick 0 up until Pick 1999. Each's pick is pseudo-randomly generated using the user's address and the pick index.

For example, Pick 12 is equal to `keccak(keccak(address), 12)`. The resulting 256 bit hash is used as a pseudo-random number.

## Calculating Prizes

A user can determine the value of a winning pick based on the tier of the match, the prize distribution, and the total prize. The prize distribution has an array of fractions that determines the portion of the prize allocated to each tier.

For example:

| tier | Percentage |
| ---- | ---------- |
| 0    | 40%        |
| 1    | 20%        |
| 2    | 40%        |

### Splitting the Prizes

For each tier, we must also calculate the _number of combinations that will match that tier_ so that we can fairly split the portion among the winners.

For tier 0, which is to match all numbers, there will only be 1 combination. So in the above example a tier 0 pick will be awarded 40% of the total prize.

For tier 1, it's a little more complicated. If the bit range is 4, then each number can be one of 2^4, or 16. This means that the number of combinations that are **exactly** tier 1 are 15: the number of combinations that fall within tier 1 **less** the number that match tier 0.

This gives us the general formula:

`Number of prizes for a tier = (2^bit range)^tier - (2^bit range)^(tier-1)`

The prize for each tier must be split among these, so we have:

`prize for a tier = total prize * tier percentage / number of prizes for a tier`

## Claiming Picks

A user can claim the winnings for picks by submitting the winning pick indices to the Prize Distributor contract. The Prize Distributor contract will calculate their payout. However- there is a limit to the number of picks they can claim. This is both due to computational limitations as well as helping mitigate whales from scooping all the prizes. The whales have a higher chance of winning good picks, but cannot claim all of them.

## Summary

Each Draw includes:

- **cardinality**: the number of sub-divisions of a random number. Same for all pools in the network.
- **bit range**: the number of bits allocated to each division. Same for all pools in the network.
- **distribution**: an array of percentages that define each tier's portion of prize. Same for all pools in the network.
- **number of picks**: the number of picks for a particular pool. Unique to each pool.
- **winning number**: the winning bits. Same for all pools in the network
- **timestamp**: the timestamp at which the draw occurred. Same for all pools in the network.
- **prize**: the total prize money. Same for all pools in the network.
