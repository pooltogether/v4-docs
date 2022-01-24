#  Calculate

## Table of contents

### Functions

- [calculateCardinality](calculate.md#calculatecardinality)
- [calculateFractionOfPrize](calculate.md#calculatefractionofprize)
- [calculateNormalizedBalancePicksFromTotalPicks](calculate.md#calculatenormalizedbalancepicksfromtotalpicks)
- [calculateNumberOfMatches](calculate.md#calculatenumberofmatches)
- [calculateNumberOfPrizesForTierIndex](calculate.md#calculatenumberofprizesfortierindex)
- [calculatePick](calculate.md#calculatepick)
- [calculatePicks](calculate.md#calculatepicks)
- [calculatePicksFromAverageTotalSuppliesBetween](calculate.md#calculatepicksfromaveragetotalsuppliesbetween)
- [calculatePrizeForTierPercentage](calculate.md#calculateprizefortierpercentage)
- [calculateTierIndexFromMatches](calculate.md#calculatetierindexfrommatches)

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

[calculate/calculateCardinality.ts:6](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/calculate/calculateCardinality.ts#L6)

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

[calculate/calculateFractionOfPrize.ts:4](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/calculate/calculateFractionOfPrize.ts#L4)

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

[calculate/calculateNormalizedBalancePicksFromTotalPicks.ts:3](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/calculate/calculateNormalizedBalancePicksFromTotalPicks.ts#L3)

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

[calculate/calculateNumberOfMatches.ts:5](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/calculate/calculateNumberOfMatches.ts#L5)

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

[calculate/calculateNumberOfPrizesForTierIndex.ts:1](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/calculate/calculateNumberOfPrizesForTierIndex.ts#L1)

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

[calculate/calculatePick.ts:6](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/calculate/calculatePick.ts#L6)

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

[calculate/calculatePicks.ts:6](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/calculate/calculatePicks.ts#L6)

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

[calculate/calculatePicksFromAverageTotalSuppliesBetween.ts:7](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/calculate/calculatePicksFromAverageTotalSuppliesBetween.ts#L7)

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

[calculate/calculatePrizeForTierPercentage.ts:6](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/calculate/calculatePrizeForTierPercentage.ts#L6)

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

[calculate/calculateTierIndexFromMatches.ts:1](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/calculate/calculateTierIndexFromMatches.ts#L1)
es.ts#L1)
