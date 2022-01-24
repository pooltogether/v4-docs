#  Compute

## Table of contents

### Functions

- [computeDrawResults](compute#computedrawresults)
- [computePickPrize](compute#computepickprize)
- [computePicksPrizes](compute#computepicksprizes)
- [computePrizeAmount](compute#computeprizeamount)
- [computePrizeDistributionFromTicketAverageTotalSupplies](compute#computeprizedistributionfromticketaveragetotalsupplies)
- [computeUserPicks](compute#computeuserpicks)
- [computeUserWinningPicksForRandomNumber](compute#computeuserwinningpicksforrandomnumber)
- [computeWinningPicks](compute#computewinningpicks)

## Functions

### computeDrawResults

▸ **computeDrawResults**(`draw`, `picks`, `bitRangeSize`, `matchCardinality`, `prize`, `tiers`): `DrawResults`

#### Parameters

| Name | Type |
| :------ | :------ |
| `draw` | `Draw` |
| `picks` | `Pick`[] |
| `bitRangeSize` | `number` |
| `matchCardinality` | `number` |
| `prize` | `BigNumber` |
| `tiers` | `any`[] |

#### Returns

`DrawResults`

#### Defined in

[compute/computeDrawResults.ts:10](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/compute/computeDrawResults.ts#L10)

___

### computePickPrize

▸ **computePickPrize**(`pickHash`, `winningRandomNumber`, `bitRangeSize`, `matchCardinality`, `prize`, `tiers`): `PickPrize`

#### Parameters

| Name | Type |
| :------ | :------ |
| `pickHash` | `string` |
| `winningRandomNumber` | `BigNumber` |
| `bitRangeSize` | `number` |
| `matchCardinality` | `number` |
| `prize` | `BigNumber` |
| `tiers` | `any`[] |

#### Returns

`PickPrize`

#### Defined in

[compute/computePickPrize.ts:8](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/compute/computePickPrize.ts#L8)

___

### computePicksPrizes

▸ **computePicksPrizes**(`picks`, `winningRandomNumber`, `bitRangeSize`, `matchCardinality`, `prize`, `tiers`): `PickPrize`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `picks` | `any`[] |
| `winningRandomNumber` | `BigNumber` |
| `bitRangeSize` | `number` |
| `matchCardinality` | `number` |
| `prize` | `BigNumber` |
| `tiers` | `any`[] |

#### Returns

`PickPrize`[]

#### Defined in

[compute/computePicksPrizes.ts:6](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/compute/computePicksPrizes.ts#L6)

___

### computePrizeAmount

▸ **computePrizeAmount**(`tierIndex`, `tierValue`, `bitRangeSize`, `prizeAmount`): `PickPrize`

#### Parameters

| Name | Type |
| :------ | :------ |
| `tierIndex` | `number` |
| `tierValue` | `BigNumberish` |
| `bitRangeSize` | `number` |
| `prizeAmount` | `BigNumber` |

#### Returns

`PickPrize`

#### Defined in

[compute/computePrizeAmount.ts:8](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/compute/computePrizeAmount.ts#L8)

___

### computePrizeDistributionFromTicketAverageTotalSupplies

▸ **computePrizeDistributionFromTicketAverageTotalSupplies**(`draw`, `prizeTier?`, `ticketPrimaryAverageTotalSupply?`, `ticketSecondaryListAverageTotalSupply?`, `decimals?`): `Promise`<`PrizeDistribution` \| `undefined`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `draw` | `Draw` | `undefined` |
| `prizeTier?` | `PrizeTier` | `undefined` |
| `ticketPrimaryAverageTotalSupply?` | `BigNumberish` | `undefined` |
| `ticketSecondaryListAverageTotalSupply?` | `BigNumberish`[] | `undefined` |
| `decimals` | `BigNumberish` | `18` |

#### Returns

`Promise`<`PrizeDistribution` \| `undefined`\>

#### Defined in

[compute/computePrizeDistributionFromTicketAverageTotalSupplies.ts:12](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/compute/computePrizeDistributionFromTicketAverageTotalSupplies.ts#L12)

___

### computeUserPicks

▸ **computeUserPicks**(`totalNumberOfPicks`, `address`, `normalizedBalance`): `Pick`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `totalNumberOfPicks` | `BigNumberish` |
| `address` | `string` |
| `normalizedBalance` | `BigNumber` |

#### Returns

`Pick`[]

#### Defined in

[compute/computeUserPicks.ts:10](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/compute/computeUserPicks.ts#L10)

___

### computeUserWinningPicksForRandomNumber

▸ **computeUserWinningPicksForRandomNumber**(`randomNumber`, `bitRangeSize`, `matchCardinality`, `numberOfPicks`, `prize`, `tiers`, `userAddress`, `userNormalizedBalance`): `DrawResults`

#### Parameters

| Name | Type |
| :------ | :------ |
| `randomNumber` | `BigNumberish` |
| `bitRangeSize` | `number` |
| `matchCardinality` | `number` |
| `numberOfPicks` | `BigNumberish` |
| `prize` | `BigNumberish` |
| `tiers` | `any`[] |
| `userAddress` | `string` |
| `userNormalizedBalance` | `BigNumberish` |

#### Returns

`DrawResults`

#### Defined in

[compute/computeUserWinningPicksForRandomNumber.ts:11](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/compute/computeUserWinningPicksForRandomNumber.ts#L11)

___

### computeWinningPicks

▸ **computeWinningPicks**(`user`, `draws`, `prizeDistributions`): `DrawResults`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `User` |
| `draws` | `Draw`[] |
| `prizeDistributions` | `PrizeDistribution`[] |

#### Returns

`DrawResults`[]

#### Defined in

[compute/computeWinningPicks.ts:4](https://github.com/pooltogether/v4-utils-js/blob/e8b45cf/src/compute/computeWinningPicks.ts#L4)
puteWinningPicks.ts#L4)
ks.ts#L4)
