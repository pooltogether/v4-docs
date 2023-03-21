---
id: v4-core
title: V4 Core
---

# V4 Core Smart Contracts

[![Tests](https://github.com/pooltogether/v4-core/actions/workflows/main.yml/badge.svg)](https://github.com/pooltogether/v4-core/actions/workflows/main.yml)
[![Coverage Status](https://coveralls.io/repos/github/pooltogether/v4-core/badge.svg?branch=master)](https://coveralls.io/github/pooltogether/v4-core?branch=master)
[![built-with openzeppelin](https://img.shields.io/badge/built%20with-OpenZeppelin-3677FF)](https://docs.openzeppelin.com/)
[![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html)

# Overview
- [ControlledToken](./ControlledToken.md)
- [DrawBeacon](./DrawBeacon.md)
- [DrawBuffer](./DrawBuffer.md)
- [DrawCalculator](./DrawCalculator.md)
- [EIP2612PermitAndDeposit](./EIP2612PermitAndDeposit.md)
- [PrizeDistributionBuffer](./PrizeDistributionBuffer.md)
- [PrizeDistributor](./PrizeDistributor.md)
- [PrizeSplitStrategy](./PrizeSplitStrategy.md)
- [Reserve](./Reserve.md)
- [StakePrizePool](./StakePrizePool.md)
- [Ticket](./Ticket.md)
- [YieldSourcePrizePool](./YieldSourcePrizePool.md)

Periphery and supporting contracts:
- [Periphery](./v4-periphery/index.md)
- [Timelocks](./v4-timelocks/index.md)

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
$ git clone https://github.com/pooltogether/v4-core
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

# Deployment

## Testnets
Deployment is maintained in a different [repo](https://github.com/pooltogether/v4-testnet).

## Mainnet
Deployment is maintained in a different [repo](https://github.com/pooltogether/v4-mainnet).
