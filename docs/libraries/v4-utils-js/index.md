# Utility Library
![Tests](https://github.com/pooltogether/v4-utils-js/actions/workflows/main.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/pooltogether/v4-utils-js/badge.svg?branch=main)](https://coveralls.io/github/pooltogether/v4-utils-js?branch=main)
![ts](https://badgen.net/badge/-/TypeScript?icon=typescript&label&labelColor=blue&color=555555)
[![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html)
![npm](https://img.shields.io/npm/v/@pooltogether/v4-utils-js)

The `@pooltogether/v4-utils-js` [node module package](https://www.npmjs.com/package/@pooltogether/v4-utils-js) provides calculations, computations and general utility functions for the PoolTogether V4 protocol.

Helping with both **low-level calculations** and **higher-order computations**, plus **essential utilities** like encoding, filtering and sorting.

**Join the PoolTogether Discord, ask questions and get help from the community.**

[![Discord](https://badgen.net/badge/icon/discord?icon=discord&label)](https://discord.gg/JFBPMxv5tr)

## Table of Contents

### Namespaces

- [calculate](calculate)
- [compute](compute)
- [core](core)
- [utils](utils)

**Core**
- [encodeWinningPicks](core#encodeWinningPicks)
- [winningPicks](core#winningPicks)

**Calculate**
- [calculateCardinality](calculate#calculatecardinality)
- [calculateFractionOfPrize](calculate#calculatefractionofprize)
- [calculateNormalizedBalancePicksFromTotalPicks](calculate#calculatenormalizedbalancepicksfromtotalpicks)
- [calculateNumberOfMatches](calculate#calculatenumberofmatches)
- [calculateNumberOfPrizesForTierIndex](calculate#calculatenumberofprizesfortierindex)
- [calculatePick](calculate#calculatepick)
- [calculatePicks](calculate#calculatepicks)
- [calculatePicksFromAverageTotalSuppliesBetween](calculate#calculatepicksfromaveragetotalsuppliesbetween)
- [calculatePrizeForTierPercentage](calculate#calculateprizefortierpercentage)
- [calculateTierIndexFromMatches](calculate#calculatetierindexfrommatches)

**Compute**
- [computeDrawResults](compute#computedrawresults)
- [computePickPrize](compute#computepickprize)
- [computePicksPrizes](compute#computepicksprizes)
- [computePrizeAmount](compute#computeprizeamount)
- [computePrizeDistributionFromTicketAverageTotalSupplies](compute#computeprizedistributionfromticketaveragetotalsupplies)
- [computeUserPicks](compute#computeuserpicks)
- [computeUserWinningPicksForRandomNumber](compute#computeuserwinningpicksforrandomnumber)
- [computeWinningPicks](compute#computewinningpicks)

**Utilities**
- [createDrawResultsObject](utils#createdrawresultsobject)
- [filterResultsByValue](utils#filterresultsbyvalue)
- [findBitMatchesAtIndex](utils#findbitmatchesatindex)
- [formatTierPercentage](utils#formattierpercentage)
- [hashUserAddress](utils#hashuseraddress)
- [isBitRangeSizeValid](utils#isbitrangesizevalid)
- [isTiersValid](utils#istiersvalid)
- [sanityCheckPrizeDistribution](utils#sanitycheckprizedistribution)
- [sortByBigNumberAsc](utils#sortbybignumberasc)
- [sortByBigNumberDesc](utils#sortbybignumberdesc)
- [sumBigNumbers](utils#sumbignumbers)
- [sumTwoBigNumbers](utils#sumtwobignumbers)
- [updateDrawResultsWithWinningPicks](utils#updatedrawresultswithwinningpicks)

## 💾 &nbsp;Installation

This project is available as an NPM package:

```sh
npm install @pooltogether/v4-utils-js
```

```sh
yarn add @pooltogether/v4-utils-js
```

The repo can be cloned from Github for contributions.

```sh
git clone https://github.com/pooltogether/v4-utils-js
```

## 🏎️ &nbsp;Quickstart 

Draw and PrizeDistribution structs should be fetched using the [@pooltogether/v4-js-client](/protocol/libraries/v4-js-client/) node module.

### Winnings Picks
```ts
import { winningPicks } from '@pooltogether/v4-utils-js';
const computedAndEncodedWinningPicks = winningPicks(wallet.address, [draw], [prizeDistribution]);
wallet.send(computedAndEncodedWinningPicks.encodedWinningPickIndices)
```

### Compute & Encode Winnings Picks
```ts
import { computeWinningPicks, encodeWinningPicks } from '@pooltogether/v4-utils-js';
const computedPicks = computeWinningPicks(wallet.address, [draw], [prizeDistribution]);
const transaction = encodeWinningPicks(wallet.address, computedWinningPicks);
wallet.send(transaction.encodedWinningPickIndices)
```

## 🧮 &nbsp;Examples

The utility library simulates smart contract rules/operations and also encapsulates higher-level abstractions common to PoolTogether V4 required transactions.

For example, in the `DrawCalculator` smart contract an account `address` is used to generate a random number via the `keccak256` hashing function. The hashed address is subquentially encoded with a `pickIndices` to calculate a `randomNumber`. Using a depositors `normalizedBalance` and `totalPrizeDistributionPicks` we can find the ceiling for the number of picks to calculate for each Draw epoch timerange.

In other words, the library exposes low-level functions like `hashUserAddress` and `calculateNumberOfMatches` so it's easier to build the high-level abstractions, like `winningPicks` which simply takes a user address, plus historical Draw/PrizeDistribution structs and generates/encode all potential winning picks for a user into a single transaction.

### Compute User Picks ([computeUserPicks](/protocol/libraries/v4-utils-js/compute#computeuserpicks))
Calculates a depositor potential picks using the totalNumberOfPicks relative to the normalizedBalance.

```ts
import { parseEther } from '@ethersproject/units';
import { computeUserPicks } from '@pooltogether/v4-utils-js';

const totalPicks = parseUnits('1000', 18);
const address = '0x000.000';
const normalizedBalance = parseUnits('0.1', 18)

const userPicksByIndexAndHash = computeUserPicks(
    totalPicks,
    address,
    normalizedBalance
);
```

### Calculate Number of Matches ([calculateNumberOfMatches](/protocol/libraries/v4-utils-js/calculate#calculatenumberofmatches))

A user's pick number and the Draw random generated number are compared to compute winning picks.

The `pick` and `winningRandomNumber` are **NOT** compared directly when calculating winning picks. 

Instead using `bitwise` operations in conjuction with `bitRangeSize` and `matchCardinality` the pick/randomNumber can be compared at the bit level via dynamic "index" positions and "indexRanges" supplied by the PrizeDistrubtion parameters.

**Abstract Example**

**UserPicks:** `22`, `6`, `30`, `2`, `52`, `90` <br/>
**WinningRandomNumber:** `22`, `6`, `30`, `66`, `100`, `40` <br/>
**Matches:** `true` `true` `true` `false` `false` `false` <br/>
**TotalMatches:** `3` <br/>

For efficient EVM storage the protocol avoids literal array representation for matching winning numbers -  opting instead for cost-efficient bitwise operators, but the end result is the same: **matching sets of numbers.**

```ts
import { BigNumber } from '@ethersproject/bignumber';
import { calculateNumberOfMatches } from '@pooltogether/v4-utils-js';

const pickNumber = BigNumber.from('0x03030303030');
const winningRandomNumber = BigNumber.from('0x525255252552525');
const bitRangeSize = 10;
const matchCardinality = 3;

const numberOfMatchesForAPickNumber = calculateNumberOfMatches(
    pickNumber,
    winningRandomNumber,
    bitRangeSize,
    matchCardinality
);
```

**Reminder: All inputs should be formatted to match the underlying asset decimals.**
