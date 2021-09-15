---
id: smart-contracts
title: Smart Contracts Overview
skug: /reference
sidebar_position: 1
---

PoolTogether 4.0 is a prize savings liquidity network.  Users deposit into the network to win prize money.  The deposits generate yield, which is then distributed as prizes.   These are the two fundamental PoolTogether processes: yield capture and prize distribution.

![Overview](/img/guides/Overview.png)


# Yield Capture

## Prize Pools

Yield is captured by Prize Pools.  Users deposit into prize pools and receive "Ticket" tokens in exchange at a 1:1 ratio.  Prize Pools deposit the funds into a service such as Compound, Aave, or Yearn to generate yield.  Users can redeem their tickets for the underlying collateral at any time.

There are no fees in PoolTogether 4.0!

![Overview](/img/guides/PrizePool.png)

## Prize Split Strategy & Protocol Reserve

Each prize pool has a Prize Split Strategy that determines how interest is disbursed.  At any time anyone can tell the Prize Split Strategy to disburse the currently accrued interest.  The strategy will mint Tickets to the Protocol Reserve, which allows the protocol to measure the prize pool's reserve contribution and sweep the funds.

![Overview](/img/guides/ProtocolReserve.png)

# Prize Distribution

Prizes are distributed through regular prize drawings.  Draws are emitted by a Draw Beacon and consist of a random number and a timestamp.  When a new Draw is available users can claim their prizes from the Claimable Draw contract.

The Claimable Draw contract holds the prize liquidity for all Draws, and allows users to claim prizes as determined by each draw's Draw Calculator. The Claimable Draw holds a mapping of Draws to Draw Calculators.
The default calculator is the Tsunami Draw Calculator, which calculates payouts using the Tsunami algorithm.
Let's dive into more detail.

## Draw Beacon & Draw History

The Draw Beacon acts as the heartbeat of a prize network by periodically creating Draws. It has a start time and a period, which together determine when Draws can be created.  When the period has elapsed, anyone can create a new Draw. The resulting Draw will be pushed onto the Draw History, which stores the last 256 Draws.

The Draw is created in two steps:

1. The Draw is "started": the random number request is made to the RNG service.
2. The Draw is "completed": the random number is consumed and a new Draw is pushed to the Draw History.

![Overview](/img/guides/DrawBeacon.png)

## Claimable Draw

Users claim their prizes from the Claimable Draw, which holds the liquidity for all draws for a prize pool.   When a user claims the prizes for a draw:
- The Claimable Draw pulls the Draw information from the Draw History
- Passes the Draw to the corresponding Draw Calculator to compute the total payout
- Transfers the payout to the user

![Overview](/img/guides/ClaimableDraw.png)

## Tsunami Draw Calculator

The Tsunami Draw Calculator

## Draw Settings

Each Draw has a setting object that determines the prize size and distribution.  The calculator has a "manager" that updates the settings for new Draws.  When the manager updates the settings, the calculator sets itself as the calculator for the draw in the Claimable Draw.  This may seem redundant, but it allows us to swap which calculator the Claimable Draw uses.
