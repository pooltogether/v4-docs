---
title: Launch Architecture
sidebar_position: 3
---

At launch, the prize pool network will include a USDC prize pool on Ethereum and a USDC prize pool on Polygon.  The diagram below outlines the main components in the system.

(Click image to open in new tab)

<a href={require('/img/v4/guides/V4_Launch_Architecture.png').default} target="_blank">
  <img
    src={require('/img/v4/guides/V4_Launch_Architecture.png').default}
    alt='Prize Pool'
    class='img-full'
  />
</a>

## Progressive Decentralization

PoolTogether will be taking a progressive approach to decentralization.  These prize pools will be linked using a multisig and an [OpenZeppelin Defender](https://openzeppelin.com/defender/) Autotask.  Later, as we streamline the process we will transition control to an IBC protocol.

The OpenZeppelin Defender Autotask is mainly for transaction automation.  It will be responsible for:

- Triggering the Draw Beacon on Ethereum to create new Draws (public call)
- Flushing interest from the prize pool directly into the PrizeDistributor contract. (public call)
- Pushing new Prize Distributions to the Ethereum prize pool. (privileged call)
- Copying Draws and Prize Distributions from the Ethereum prize pool to the Polygon prize pool. (privileged call)

The multisig will be tasked with:

- Moving funds into the Prize Distributor contract to provide prize liquidity for claiming (public call)
- Verifying Prize Distributions on Ethereum and overriding them if there is a mismatch (privileged call)
- Verifying Draws and Prize Distributions on Polygon and overriding them if there is a mismatch (privileged call)

The launch architecture for PoolTogether emphasizes the mantra **"don't trust, verify!"**.  The integrity of the Draw and Prize Distributions can be verified using on-chain data, so anyone can check that the prizes are correct.

The core responsibility of the multisig will be to monitor the Defender autotask to ensure it propagates the correct Draw and Prize Distribution configurations. The DrawCalculatorTimelocks require 24 hours to pass after being triggered before allowing the Draw or Prize Distribution data to be used. This give the executive team ample time to fix any discrepencies by overriding the state.

**It's important to note that deposited are never custodied.** Neither the multisig or Defender have access to user deposits.

As the protocol decentralizes the privileged roles will be reduced in order to minimize trust and maximize automation.

## Attacks and Mitigations

There are two specific types of attack that we've mitigated using timelocks:

- Defender bug or attack
- Cross-chain front-running

### Defender Bug or Attack

If the Defender script has a bug or been compromised then the Draw, Prize Distribution, or both will be corrupted.  The Draw Calculator Timelock will be 24 hours long to mitigate this problem.

This means that the Draw and Prize Distributions cannot be used until 24 hours have elapsed after submission.  This affords the multisig an ample window of time to fix the problem.

### Front-running

The Draw Beacon on Ethereum will be using the Chainlink VRF to request a random number and create a new Draw.  The Defender autotask will propagate the Draw to Polygon.  Front-running on Ethereum isn't possible because the Draw timestamp is set when the RNG is requested, before the reveal.

However, on Polygon, if a user sees the VRF reveal and the Polygon chain is a few seconds behind then the user can quickly deposit using a wallet of their choice into the Polygon pool.  This means they could calculate a wallet that wins the grand prize and deposit using that wallet.

To mitigate this problem, we look at user balances one hour prior to the draw timestamp.  This allows for clock drift between Ethereum and Polygon for as much as an hour.  Totally overkill, but we can decrease it over time.
