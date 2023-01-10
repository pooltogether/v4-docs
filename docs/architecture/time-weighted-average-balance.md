---
title: "Time-Weighted Average Balance"
sidebar_position: 3
---

Tracking a Time-Weighted Average Balance allows us to determine a user's balance at any time in the past, or their average balance held between two times.  Using their average balance and the average total supply, we can determine their share of the liquidity for that period of time.

This is critically important for PoolTogether, so that users can deposit and withdraw freely into a prize pool while having their liquidity contribution measured perfectly.

For example:

- if a user held 100 tokens between Dec 20 and Dec 27, then their average balance was 100.
- if instead they bought another 100 tokens halfway through, then their average between Dec 20 and Dec 27 would be 150.

The TWAB is wholly inspired by Uniswap's Time-Weighted Average Price, which [is described here](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles).

# Computing the TWAB

Each TWAB record is tuple of an amount and timestamp.  The amount stores the cumulative time-weighted balance, and the timestamp is the time at which the twab was recorded.  Immediately before a user's balance changes, we record a new TWAB.

The formula is:

```
new TWAB amount = last TWAB amount + current balance * (current time - last TWAB timestamp)
new TWAB timestamp = current time
```

## Example

Let's assume a user's transfer history looks like so:

| time | action | amount |
| ---- | ------ | ------ |
| 0 | receive | 100 |
| 10 | receive | 50 |
| 20 | send | 100 |
| 30 | send | 20 |

Let's go through it step-by-step.

The first twab would be:

```
amount = 0 + 0 * (0 - 0) = 0
timestamp = current time = 0
```

The second twab would be:

```
amount = 0 + 100 * (10 - 0) = 1000
timestamp = current time = 10
```

The third twab would be:

```
amount = 1000 + 150 * (20 - 10) = 2500
timestamp = current time = 20
```

The fourth twab would be:

```
amount = 2500 + 50 * (30 - 20) = 3000
timestamp = current time = 30
```

And so on.  Our twab table would look like this:

| time | twab amount |
| ---- | ----------- |
| 0 | 0 |
| 10 | 1000 |
| 20 | 2500 |
| 30 | 3000 |

Now, let's ask the question:

> What was the user's average balance between t = 0 and t = 20?

We can calculate the average by calculating the difference in the cumulative amount and dividing by the elapsed time:

```
average balance = (last TWAB amount - first TWAB amount) / (last TWAB timestamp - first TWAB timestamp)
```

So we'd have

```
average balance = (2500 - 0) / (20 - 0) = 125
```

Does this intuitively feel correct?  The user held 100 for 10 seconds, then held 150 for ten seconds. Yup.  That's right.

# Measuring Liquidity Contribution

We can use a TWAB for the user's balance and a TWAB for the total supply to determine a user's share of the liquidity supplied in the past.

The formula is quite simple:

```
user's fraction of liquidity = average balance between (t1, t2) / average total supply between (t1, t2)
```

# Gas Overhead

The TWAB incurs overhead to Ticket mint, transfer and burn costs.  Assuming a "cold" account is an address that has not held any tokens, and a "hot" address is one that has held tokens in the past, we have some approximate gas usage:

| Operation | Gas Used |
| --------- | -------- |
| mint (cold) | 140k |
| transfer (hot -> cold) | 120k |
| transfer (hot -> hot) | 90k |
