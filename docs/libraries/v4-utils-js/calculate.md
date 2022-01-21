#  calculate

## Table of contents

### Functions

- [calculateCardinality](#calculatecardinality)
- [calculateFractionOfPrize](#calculatefractionofprize)
- [calculateNormalizedBalancePicksFromTotalPicks](#calculatenormalizedbalancepicksfromtotalpicks)
- [calculateNumberOfMatches](#calculatenumberofmatches)
- [calculateNumberOfPrizesForTierIndex](#calculatenumberofprizesfortierindex)
- [calculatePick](#calculatepick)
- [calculatePicks](#calculatepicks)
- [calculatePicksFromAverageTotalSuppliesBetween](#calculatepicksfromaveragetotalsuppliesbetween)
- [calculatePrizeForTierPercentage](#calculateprizefortierpercentage)
- [calculateTierIndexFromMatches](#calculatetierindexfrommatches)

## Functions

### calculateCardinality

▸ **calculateCardinality**(`bitRangeSize`, `totalSupply`, `decimals`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bitRangeSize` | `BigNumberish` |
| `totalSupply` | `BigNumberish` |
| `decimals` | `BigNumberish` |

#### Returns

`number`

#### Defined in

[calculate/calculateCardinality.ts:6](https://github.com/pooltogether/v4-utils-js/blob/4a945a2/src/calculate/calculateCardinality.ts#L6)

___

### calculateFractionOfPrize

▸ **calculateFractionOfPrize**(`tierTotalPrizes`, `tierValue`): `BigNumber`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tierTotalPrizes` | `BigNumberish` |
| `tierValue` | `BigNumberish` |

#### Returns

`BigNumber`

#### Defined in

[calculate/calculateFractionOfPrize.ts:4](https://github.com/pooltogether/v4-utils-js/blob/4a945a2/src/calculate/calculateFractionOfPrize.ts#L4)

___

### calculateNormalizedBalancePicksFromTotalPicks

▸ **calculateNormalizedBalancePicksFromTotalPicks**(`numberOfPicks`, `normalizedBalance`): `BigNumber`

#### Parameters

| Name | Type |
| :------ | :------ |
| `numberOfPicks` | `BigNumberish` |
| `normalizedBalance` | `BigNumberish` |

#### Returns

`BigNumber`

#### Defined in

[calculate/calculateNormalizedBalancePicksFromTotalPicks.ts:3](https://github.com/pooltogether/v4-utils-js/blob/4a945a2/src/calculate/calculateNormalizedBalancePicksFromTotalPicks.ts#L3)

___

### calculateNumberOfMatches

▸ **calculateNumberOfMatches**(`pickNumber`, `winningRandomNumber`, `matchCardinality`, `bitRangeSize`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pickNumber` | `BigNumberish` |
| `winningRandomNumber` | `BigNumberish` |
| `matchCardinality` | `number` |
| `bitRangeSize` | `number` |

#### Returns

`number`

#### Defined in

[calculate/calculateNumberOfMatches.ts:5](https://github.com/pooltogether/v4-utils-js/blob/4a945a2/src/calculate/calculateNumberOfMatches.ts#L5)

___

### calculateNumberOfPrizesForTierIndex

▸ **calculateNumberOfPrizesForTierIndex**(`bitRangeSize`, `tierIndex`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bitRangeSize` | `number` |
| `tierIndex` | `number` |

#### Returns

`number`

#### Defined in

[calculate/calculateNumberOfPrizesForTierIndex.ts:1](https://github.com/pooltogether/v4-utils-js/blob/4a945a2/src/calculate/calculateNumberOfPrizesForTierIndex.ts#L1)

___

### calculatePick

▸ **calculatePick**(`address`, `pick`): `Pick`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `pick` | `BigNumberish` |

#### Returns

`Pick`

#### Defined in

[calculate/calculatePick.ts:6](https://github.com/pooltogether/v4-utils-js/blob/4a945a2/src/calculate/calculatePick.ts#L6)

___

### calculatePicks

▸ **calculatePicks**(`address`, `picks`): `Pick`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `picks` | `BigNumber`[] |

#### Returns

`Pick`[]

#### Defined in

[calculate/calculatePicks.ts:6](https://github.com/pooltogether/v4-utils-js/blob/4a945a2/src/calculate/calculatePicks.ts#L6)

___

### calculatePicksFromAverageTotalSuppliesBetween

▸ **calculatePicksFromAverageTotalSuppliesBetween**(`totalPicks`, `ticketPrimaryTotalSupply`, `otherTicketsTotalSupply`): `number` \| `undefined`

#### Parameters

| Name | Type |
| :------ | :------ |
| `totalPicks` | `number` |
| `ticketPrimaryTotalSupply` | `BigNumber` |
| `otherTicketsTotalSupply` | `BigNumber` |

#### Returns

`number` \| `undefined`

#### Defined in

[calculate/calculatePicksFromAverageTotalSuppliesBetween.ts:7](https://github.com/pooltogether/v4-utils-js/blob/4a945a2/src/calculate/calculatePicksFromAverageTotalSuppliesBetween.ts#L7)

___

### calculatePrizeForTierPercentage

▸ **calculatePrizeForTierPercentage**(`tierIndex`, `tierValue`, `bitRangeSize`, `prizeAmount`): `BigNumber`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tierIndex` | `number` |
| `tierValue` | `BigNumberish` |
| `bitRangeSize` | `number` |
| `prizeAmount` | `BigNumber` |

#### Returns

`BigNumber`

#### Defined in

[calculate/calculatePrizeForTierPercentage.ts:6](https://github.com/pooltogether/v4-utils-js/blob/4a945a2/src/calculate/calculatePrizeForTierPercentage.ts#L6)

___

### calculateTierIndexFromMatches

▸ **calculateTierIndexFromMatches**(`matchCardinality`, `numberOfMatches`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `matchCardinality` | `number` |
| `numberOfMatches` | `number` |

#### Returns

`number`

#### Defined in

[calculate/calculateTierIndexFromMatches.ts:1](https://github.com/pooltogether/v4-utils-js/blob/4a945a2/src/calculate/calculateTierIndexFromMatches.ts#L1)
