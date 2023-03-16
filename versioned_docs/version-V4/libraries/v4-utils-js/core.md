#  Core

## Table of contents

### Functions

- [encodeWinningPicks](core#encodewinningpicks)
- [winningPicks](core#winningpicks)

## Functions

### encodeWinningPicks

▸ **encodeWinningPicks**(`user`, `drawResults`): `Claim`

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `User` |
| `drawResults` | `DrawResults`[] |

#### Returns

`Claim`

#### Defined in

core/encodeWinningPicks.ts:7

___

### winningPicks

▸ **winningPicks**(`user`, `draws`, `prizeDistributions`): `Claim`

**`description`** Computes a User's winning picks for multiple Draws and returns an encoded transaction.

**`dev`** Historical blockchain state must be first fetched to run computations.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `user` | `User` | Includes an account address and a list of normalized balances. |
| `draws` | `Draw`[] | Draw(s) should be fetched from DrawHistory contract |
| `prizeDistributions` | `PrizeDistribution`[] | PrizeDistribution(s) should be fetched from PrizeTierHistory contract |

#### Returns

`Claim`

Computed winning picks and encoded transaction ready for broadcast to an EVM blockchain.

#### Defined in

core/winningPicks.ts:13
ts:13
:13
ts:13
