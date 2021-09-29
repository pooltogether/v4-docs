---
title: "Time-Weighted Average Balance"
sidebar_position: 3
---

The Time-Weighted Average Balance can determine a users balance at any time in the past, or their average balance held between two times.







If a user held 100 tokens between Dec 20 and Dec 27, then their average balance was 100.  If instead they bought another 100 tokens halfway through, then their average should be 50.

# Borrowing Ideas from Uniwap

Uniswap

Fortunately, we had some prior art we could refer to: Uniswap's Time-Weighted Average Price.  The TWAP is a running sum of a token price weighted by time.  By comparing current and past TWAPs, you can determine a token's average price for that time range.

The TWAP is calculated like so:

Next TWAP Observation amount = Last TWAP Observation amount + current price x elapsed time since last TWAP

Each TWAP Observation includes an amount and the timestamp at which it was made.

For example, let's say there are three trades for a Uniswap pair:

Initial state: token value starts at 0
Trade 1: Token price was 100 at time 10
Trade 2: Token price was 200 at time 30
Trade 3: Token price was 400 at time 50

Before each trade we will create a new TWAP to record the price inflection:

TWAP 1: 0 + 0 * 10 = 0 @ time 10
TWAP 2: 0 + 100 * 20 = 2000 @ time 30
TWAP 3: 2000 + 200 * 20 = 6000 @ time 50

Now, what was the average price from time 10 to time 50?  We can calculate it like so:

(delta amount) / (elapsed time)

or:

(TWAP amount @ 50 - TWAP amount @ 0) / (40)

(6000 - 0) / 40 = 150

So the average price was 150 between 0 and 40.  Given the balance was 100 for half the time, and 200 for the other half, we can confirm this easily.

# Time-Weighted Average Balance

The TWAP technique can be mapped directly to token balances.  Our Time-Weighted Average Balance equation is:

Next TWAB Observation amount = Last TWAB Observation amount + **current balance** x elapsed time since last TWAB

Before a user's balance changes we calculate their current TWAB and append it to their history.

For example, let's say a user makes three transfers:

1. Transfers in 100 tokens @ time 10
2. Transfers in 400 tokens @ time 20
3. Transfers out 20 tokens @ time 30

The users balance must start at zero.  We then have three TWABs:

1. TWAB @ time 10: 0 + 0 * 10 = 0
2. TWAB @ time 20: 0 + 100 * 10 = 1000
3. TWAB @ time 30: 1000 + 500 * 10 = 6000

Let's say we want to calculate the user's average balance between t = 10 and t = 30:

(delta amount) / (delta time)

(6000 - 0) / (30 - 10) = 6000 / 20 = 300.

# TWAB Time-to-live

Great!  We have a way of computing a user's historic balance.  How do we store this efficiently on-chain?
