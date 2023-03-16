---
id: v4-periphery
title: V4 Periphery
---

# V4 Periphery Contracts

[![Fork](https://github.com/pooltogether/v4-periphery/actions/workflows/fork.yml/badge.svg)](https://github.com/pooltogether/v4-periphery/actions/workflows/fork.yml)
[![Tests](https://github.com/pooltogether/v4-periphery/actions/workflows/main.yml/badge.svg)](https://github.com/pooltogether/v4-periphery/actions/workflows/main.yml)
[![Coverage Status](https://coveralls.io/repos/github/pooltogether/v4-periphery/badge.svg?branch=master)](https://coveralls.io/github/pooltogether/v4-periphery?branch=master)
[![built-with openzeppelin](https://img.shields.io/badge/built%20with-OpenZeppelin-3677FF)](https://docs.openzeppelin.com/)
[![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html)

# Overview
- [PrizeDistributionFactory](./PrizeDistributionFactory)
- [PrizeFlush](./PrizeFlush)
- [PrizeTierHistory](./PrizeTierHistory)
- [TwabRewards](./TwabRewards)

# Deployments
- [Ethereum](../../deployments/mainnet#mainnet)
- [Polygon](../../deployments/mainnet#polygon)
- [Avalanche](../../deployments/mainnet#avalanche)

# Getting Started

The project is made available as a NPM package.

```sh
$ yarn add @pooltogether/v4-periphery
```

The repo can be cloned from Github for contributions.

```sh
$ git clone https://github.com/pooltogether/v4-periphery
```

```sh
$ yarn
```

We use [direnv](https://direnv.net/) to manage environment variables.  You'll likely need to install it.

```sh
cp .envrc.example .envrc
```

# Testing

We use [Hardhat](https://hardhat.dev) and [hardhat-deploy](https://github.com/wighawag/hardhat-deploy)

To run unit tests:

```sh
$ yarn test
```

To run coverage:

```sh
$ yarn coverage
```

# Forking

Mainnet fork tests have been implemented to test the functionalities of the TWAB Rewards contract.

To start the mainnet fork RPC server, run:

```sh
$ yarn start-fork
```

To run the mainnet fork tests for the TWAB Rewards contract, run:

```sh
$ yarn twab-rewards-fork
```

If you wish to run both at the same time, run:

```sh
$ yarn run-twab-rewards-fork
```

This command is used in the Github Actions workflow located in `.github/workflows/fork.yml`.
