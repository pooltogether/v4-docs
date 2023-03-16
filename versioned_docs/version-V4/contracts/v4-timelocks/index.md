---
id: v4-timelocks
title: V4 Timelocks
---

# V4 Timelocks Contracts

[![Tests](https://github.com/pooltogether/v4-timelocks/actions/workflows/main.yml/badge.svg)](https://github.com/pooltogether/v4-timelocks/actions/workflows/main.yml)
[![Coverage Status](https://coveralls.io/repos/github/pooltogether/v4-timelocks/badge.svg?branch=master)](https://coveralls.io/github/pooltogether/v4-timelocks?branch=master&asdf=1)
[![built-with openzeppelin](https://img.shields.io/badge/built%20with-OpenZeppelin-3677FF)](https://docs.openzeppelin.com/)
[![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html)

# Overview
- [BeaconTimelockTrigger](./BeaconTimelockTrigger.md)
- [DrawCalculatorTimelock](./DrawCalculatorTimelock.md)
- [L1TimelockTrigger](./L1TimelockTrigger.md)
- [L2TimelockTrigger](./L2TimelockTrigger.md)
- [ReceiverTimelockTrigger](./ReceiverTimelockTrigger.md)

Timelock contracts assist with Phase 1 in the roll-out of V4. Granting authority to the operations teams to prevent a "bad actor" oracle from incorrectly setting a draw or prize distribution params.

### DrawCalculatorTimelock
The DrawCalculatorTimelock adds a timelock for PrizeDistributor to execute a claim with the most recently pushed PrizeDistribution params pushed.

### L1TimelockTrigger & L2TimelockTrigger
Both L1TimelockTrigger/L2TimelockTrigger contracts set a timelock or a "cooldown" period in the linked `DrawCalculatorTimelock` contract. The `DrawCalculatorTimelock` routes `calculate` execution through a `DrawCalculator` contract for the linked `PrizeDistributor` contract.

### L1TimelockTrigger
The `L1TimelockTrigger` contract pushes `DrawLib.Draw` and `DrawLib.PrizeDistribution` params onto the `DrawBuffer` and `PrizeDistributionBuffer` contracts.

### L2TimelockTrigger
The `L2TimelockTrigger` pushes `DrawLib.PrizeDistribution` params onto a `PrizeDistributionBuffer` contract.

# Deployments
- [Ethereum](../../deployments/mainnet#mainnet)
- [Polygon](../../deployments/mainnet#polygon)
- [Avalanche](../../deployments/mainnet#avalanche)

# Getting Started

The project is made available as a NPM package.

```sh
$ yarn add @pooltogether/pooltogether-contracts
```

The repo can be cloned from Github for contributions.

```sh
$ git clone https://github.com/pooltogether/v4-timelock
```

```sh
$ yarn
```

We use [direnv](https://direnv.net/) to manage environment variables.  You'll likely need to install it.

```sh
cp .envrc.example .envrc
```

To run fork scripts, deploy or perform any operation with a mainnet/testnet node you will need an Infura API key.

# Testing

We use [Hardhat](https://hardhat.dev) and [hardhat-deploy](https://github.com/wighawag/hardhat-deploy)

To run unit & integration tests:

```sh
$ yarn test
```

To run coverage:

```sh
$ yarn coverage
```

# Fork Testing

Ensure your environment variables are set up.  Make sure your Alchemy URL is set.  Now start a local fork:

```sh
$ yarn start-fork
```

Setup account impersonation and transfer eth:

```sh
$ ./scripts/setup.sh
```

# Deployment

## Deploy Locally

Start a local node and deploy the top-level contracts:

```bash
$ yarn start
```

NOTE: When you run this command it will reset the local blockchain.

