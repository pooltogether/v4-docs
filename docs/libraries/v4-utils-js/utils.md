#  Utilities

## Table of contents

### Functions

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

## Functions

### createDrawResultsObject

▸ **createDrawResultsObject**(`drawId`): `DrawResults`

#### Parameters

| Name | Type |
| :------ | :------ |
| `drawId` | `number` |

#### Returns

`DrawResults`

#### Defined in

[utils/createDrawResultsObject.ts:5](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/utils/createDrawResultsObject.ts#L5)

___

### filterResultsByValue

▸ **filterResultsByValue**(`drawResults`, `maxPicksPerUser`): `DrawResults`

#### Parameters

| Name | Type |
| :------ | :------ |
| `drawResults` | `DrawResults` |
| `maxPicksPerUser` | `number` |

#### Returns

`DrawResults`

#### Defined in

[utils/filterResultsByValue.ts:7](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/utils/filterResultsByValue.ts#L7)

___

### findBitMatchesAtIndex

▸ **findBitMatchesAtIndex**(`word1`, `word2`, `matchIndex`, `bitRangeSize`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `word1` | `BigNumber` |
| `word2` | `BigNumber` |
| `matchIndex` | `number` |
| `bitRangeSize` | `number` |

#### Returns

`boolean`

#### Defined in

[utils/findBitMatchesAtIndex.ts:6](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/utils/findBitMatchesAtIndex.ts#L6)

___

### formatTierPercentage

▸ `Const` **formatTierPercentage**(`tier`): `BigNumber`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tier` | `string` |

#### Returns

`BigNumber`

#### Defined in

[utils/formatTierPercentage.ts:4](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/utils/formatTierPercentage.ts#L4)

___

### hashUserAddress

▸ **hashUserAddress**(`address`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |

#### Returns

`string`

#### Defined in

[utils/hashUserAddress.ts:3](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/utils/hashUserAddress.ts#L3)

___

### isBitRangeSizeValid

▸ **isBitRangeSizeValid**(`bitRangeSize`, `matchCardinality`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bitRangeSize` | `number` |
| `matchCardinality` | `number` |

#### Returns

`boolean`

#### Defined in

[utils/isBitRangeSizeValid.ts:1](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/utils/isBitRangeSizeValid.ts#L1)

___

### isTiersValid

▸ **isTiersValid**(`tiers`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tiers` | `BigNumberish`[] |

#### Returns

`boolean`

#### Defined in

[utils/isTiersValid.ts:5](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/utils/isTiersValid.ts#L5)

___

### sanityCheckPrizeDistribution

▸ **sanityCheckPrizeDistribution**(`prizeDistribution`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `prizeDistribution` | `PrizeDistribution` |

#### Returns

`string`

#### Defined in

[utils/sanityCheckPrizeDistribution.ts:5](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/utils/sanityCheckPrizeDistribution.ts#L5)

___

### sortByBigNumberAsc

▸ `Const` **sortByBigNumberAsc**(`a`, `b`): ``0`` \| ``1`` \| ``-1``

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `BigNumber` |
| `b` | `BigNumber` |

#### Returns

``0`` \| ``1`` \| ``-1``

#### Defined in

[utils/sortByBigNumber.ts:3](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/utils/sortByBigNumber.ts#L3)

___

### sortByBigNumberDesc

▸ `Const` **sortByBigNumberDesc**(`a`, `b`): ``0`` \| ``1`` \| ``-1``

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `BigNumber` |
| `b` | `BigNumber` |

#### Returns

``0`` \| ``1`` \| ``-1``

#### Defined in

[utils/sortByBigNumber.ts:10](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/utils/sortByBigNumber.ts#L10)

___

### sumBigNumbers

▸ **sumBigNumbers**(`numbers`): `BigNumberish`

#### Parameters

| Name | Type |
| :------ | :------ |
| `numbers` | `BigNumberish`[] |

#### Returns

`BigNumberish`

#### Defined in

[utils/sumBigNumbers.ts:10](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/utils/sumBigNumbers.ts#L10)

___

### sumTwoBigNumbers

▸ **sumTwoBigNumbers**(`bn1`, `bn2`): `BigNumber`

#### Parameters

| Name | Type |
| :------ | :------ |
| `bn1` | `BigNumberish` |
| `bn2` | `BigNumberish` |

#### Returns

`BigNumber`

#### Defined in

[utils/sumBigNumbers.ts:3](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/utils/sumBigNumbers.ts#L3)

___

### updateDrawResultsWithWinningPicks

▸ **updateDrawResultsWithWinningPicks**(`pickPrizes`, `results`, `picks`): `DrawResults`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pickPrizes` | `PickPrize`[] |
| `results` | `DrawResults` |
| `picks` | `any`[] |

#### Returns

`DrawResults`

#### Defined in

[utils/updateDrawResultsWithWinningPicks.ts:5](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/utils/updateDrawResultsWithWinningPicks.ts#L5)
dateDrawResultsWithWinningPicks.ts#L5)
