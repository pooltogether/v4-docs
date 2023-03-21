---
id: smart-contracts
title: Smart Contracts Overview
---

PoolTogether 4.0 is a prize savings network. Users deposit into the network to win prize money. The deposits generate yield, which is then distributed as prizes. These are the two fundamental PoolTogether processes: yield capture and prize distribution.

<img
src={require('/img/v4/guides/Overview.png').default}
alt='Overview'
class='img-max'
/>

---

## Yield Capture

### Prize Pools

Yield is captured by Prize Pools. Users deposit into prize pools and receive "Ticket" tokens in exchange at a 1:1 ratio. Prize Pools deposit the funds into a service such as Compound, Aave, or Yearn to generate yield. Users can redeem their tickets for the underlying collateral at any time.

There are no fees in PoolTogether 4.0!

<img
src={require('/img/v4/guides/PrizePool.png').default}
alt='Prize Pool'
class='img-max'
/>

### Prize Split Strategy & Protocol Reserve

Each prize pool has a Prize Split Strategy that determines how interest is disbursed. At any time anyone can tell the Prize Split Strategy to disburse the currently accrued interest. The strategy will mint Tickets to the Protocol Reserve, which allows the protocol to measure the prize pool's reserve contribution and sweep the funds.

<img
src={require('/img/v4/guides/ProtocolReserve.png').default}
alt='Protocol Reserve'
class='img-max'
/>

## Prize Distribution

Prizes are distributed through regular prize drawings. Draws are emitted by a Draw Beacon and consist of a random number and a timestamp. When a new Draw is available users can claim their prizes from the Prize Distributor contract.

The Prize Distributor contract holds the prize liquidity for all Draws, and allows users to claim prizes as determined by each draw's Draw Calculator. The Prize Distributor holds a mapping of Draws to Draw Calculators.
The default calculator is the Tsunami Draw Calculator, which calculates payouts using the Tsunami algorithm.
Let's dive into more detail.

### Draw Beacon & Draw Buffer

The Draw Beacon acts as the heartbeat of a prize network by periodically creating Draws. It has a start time and a period, which together determine when Draws can be created. When the period has elapsed, anyone can create a new Draw. The resulting Draw will be pushed onto the Draw Buffer, which stores the last 256 Draws.

The Draw is created in two steps:

1. The Draw is "started": the random number request is made to the RNG service.
2. The Draw is "completed": the random number is consumed and a new Draw is pushed to the Draw Buffer.

<img
src={require('/img/v4/guides/DrawBeacon.png').default}
alt='Draw Beacon'
class='img-max'
/>

### Prize Distributor

Users claim their prizes from the PrizeDistributor contract, which holds the liquidity for all Prize Distributors for a prize pool. When a user claims the prizes for a draw:

- The PrizeDistributor determines the payout size using the Draw Calculator
- The PrizeDistributor transfers the payout as tickets to the user

<img
src={require('/img/v4/guides/PrizeDistributor.png').default}
alt='Prize Distributor'
class='img-max'
/>

### Draw Calculator

The Draw Calculator determines the prize payout amount for each pick. For an in-depth explanation see [Prize Distribution](/protocol/architecture/prize-distribution).

To calculate the payout for a draw, the Draw Calculator will retrieve the Draw and Prize Distribution for the given draw id. The Draw includes the winning random number and timestamp, and the Prize Distribution includes the data required to calculate winners.
