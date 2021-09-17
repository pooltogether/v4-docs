---
title: 'Reference'
position: 2
---

[@pooltogether/draw-calculator-js-sdk](README.md) / Exports

# @pooltogether/draw-calculator-js-sdk

## Table of contents

### Type aliases

- [Claim](modules.md#claim)
- [Draw](modules.md#draw)
- [DrawResults](modules.md#drawresults)
- [DrawSettings](modules.md#drawsettings)
- [Pick](modules.md#pick)
- [PickPrize](modules.md#pickprize)
- [PrizeAwardable](modules.md#prizeawardable)
- [User](modules.md#user)
- [UserDrawResult](modules.md#userdrawresult)

### Functions

- [computeDrawResults](modules.md#computedrawresults)
- [computePicks](modules.md#computepicks)
- [generatePicks](modules.md#generatepicks)
- [prepareClaimForUserFromDrawResult](modules.md#prepareclaimforuserfromdrawresult)
- [prepareClaimsForUserFromDrawResults](modules.md#prepareclaimsforuserfromdrawresults)
- [runTsunamiDrawCalculatorForDraws](modules.md#runtsunamidrawcalculatorfordraws)
- [runTsunamiDrawCalculatorForSingleDraw](modules.md#runtsunamidrawcalculatorforsingledraw)

## Type aliases

### Claim

Ƭ **Claim**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `BigNumber`[][] |
| `drawIds` | `BigNumber`[] |
| `userAddress` | `string` |

#### Defined in

[types.ts:45](https://github.com/pooltogether/draw-calculators-js-sdk/blob/cb1a89f/src/types.ts#L45)

___

### Draw

Ƭ **Draw**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `drawId` | `BigNumber` |
| `winningRandomNumber` | `BigNumber` |

#### Defined in

[types.ts:11](https://github.com/pooltogether/draw-calculators-js-sdk/blob/cb1a89f/src/types.ts#L11)

___

### DrawResults

Ƭ **DrawResults**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `drawId` | `BigNumber` |
| `prizes` | [`PrizeAwardable`](modules.md#prizeawardable)[] |
| `totalValue` | `BigNumber` |

#### Defined in

[types.ts:27](https://github.com/pooltogether/draw-calculators-js-sdk/blob/cb1a89f/src/types.ts#L27)

___

### DrawSettings

Ƭ **DrawSettings**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bitRangeSize` | `number` |
| `distributions` | `BigNumber`[] |
| `matchCardinality` | `number` |
| `pickCost` | `BigNumber` |
| `prize` | `BigNumber` |

#### Defined in

[types.ts:3](https://github.com/pooltogether/draw-calculators-js-sdk/blob/cb1a89f/src/types.ts#L3)

___

### Pick

Ƭ **Pick**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `hash` | `string` |
| `index` | `number` |

#### Defined in

[types.ts:16](https://github.com/pooltogether/draw-calculators-js-sdk/blob/cb1a89f/src/types.ts#L16)

___

### PickPrize

Ƭ **PickPrize**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BigNumber` |
| `distributionIndex` | `number` |

#### Defined in

[types.ts:40](https://github.com/pooltogether/draw-calculators-js-sdk/blob/cb1a89f/src/types.ts#L40)

___

### PrizeAwardable

Ƭ **PrizeAwardable**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BigNumber` |
| `distributionIndex` | `number` |
| `pick` | `BigNumber` |

#### Defined in

[types.ts:34](https://github.com/pooltogether/draw-calculators-js-sdk/blob/cb1a89f/src/types.ts#L34)

___

### User

Ƭ **User**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `balance` | `BigNumber` |
| `pickIndices` | `BigNumber`[] |

#### Defined in

[types.ts:21](https://github.com/pooltogether/draw-calculators-js-sdk/blob/cb1a89f/src/types.ts#L21)

___

### UserDrawResult

Ƭ **UserDrawResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `drawResult` | [`DrawResults`](modules.md#drawresults) |
| `user` | [`User`](modules.md#user) |

#### Defined in

[types.ts:51](https://github.com/pooltogether/draw-calculators-js-sdk/blob/cb1a89f/src/types.ts#L51)

## Functions

### computeDrawResults

▸ **computeDrawResults**(`drawSettings`, `draw`, `picks`): [`DrawResults`](modules.md#drawresults)

#### Parameters

| Name | Type |
| :------ | :------ |
| `drawSettings` | [`DrawSettings`](modules.md#drawsettings) |
| `draw` | [`Draw`](modules.md#draw) |
| `picks` | [`Pick`](modules.md#pick)[] |

#### Returns

[`DrawResults`](modules.md#drawresults)

#### Defined in

[computeDrawResults.ts:11](https://github.com/pooltogether/draw-calculators-js-sdk/blob/cb1a89f/src/computeDrawResults.ts#L11)

___

### computePicks

▸ **computePicks**(`address`, `pickIndices`): [`Pick`](modules.md#pick)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `pickIndices` | `BigNumber`[] |

#### Returns

[`Pick`](modules.md#pick)[]

#### Defined in

[computePicks.ts:7](https://github.com/pooltogether/draw-calculators-js-sdk/blob/cb1a89f/src/computePicks.ts#L7)

___

### generatePicks

▸ **generatePicks**(`pickCost`, `address`, `balance`): [`Pick`](modules.md#pick)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `pickCost` | `BigNumber` |
| `address` | `string` |
| `balance` | `BigNumber` |

#### Returns

[`Pick`](modules.md#pick)[]

#### Defined in

[generatePicks.ts:5](https://github.com/pooltogether/draw-calculators-js-sdk/blob/cb1a89f/src/generatePicks.ts#L5)

___

### prepareClaimForUserFromDrawResult

▸ **prepareClaimForUserFromDrawResult**(`user`, `drawResult`): [`Claim`](modules.md#claim)

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`User`](modules.md#user) |
| `drawResult` | [`DrawResults`](modules.md#drawresults) |

#### Returns

[`Claim`](modules.md#claim)

#### Defined in

[prepareClaims.ts:5](https://github.com/pooltogether/draw-calculators-js-sdk/blob/cb1a89f/src/prepareClaims.ts#L5)

___

### prepareClaimsForUserFromDrawResults

▸ **prepareClaimsForUserFromDrawResults**(`user`, `drawResults`): [`Claim`](modules.md#claim)

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | [`User`](modules.md#user) |
| `drawResults` | [`DrawResults`](modules.md#drawresults)[] |

#### Returns

[`Claim`](modules.md#claim)

#### Defined in

[prepareClaims.ts:27](https://github.com/pooltogether/draw-calculators-js-sdk/blob/cb1a89f/src/prepareClaims.ts#L27)

___

### runTsunamiDrawCalculatorForDraws

▸ **runTsunamiDrawCalculatorForDraws**(`drawSettings`, `draws`, `user`): [`DrawResults`](modules.md#drawresults)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `drawSettings` | [`DrawSettings`](modules.md#drawsettings)[] |
| `draws` | [`Draw`](modules.md#draw)[] |
| `user` | [`User`](modules.md#user) |

#### Returns

[`DrawResults`](modules.md#drawresults)[]

#### Defined in

[tsunamiDrawCalculator.ts:28](https://github.com/pooltogether/draw-calculators-js-sdk/blob/cb1a89f/src/tsunamiDrawCalculator.ts#L28)

___

### runTsunamiDrawCalculatorForSingleDraw

▸ **runTsunamiDrawCalculatorForSingleDraw**(`drawSettings`, `draw`, `user`): [`DrawResults`](modules.md#drawresults)

#### Parameters

| Name | Type |
| :------ | :------ |
| `drawSettings` | [`DrawSettings`](modules.md#drawsettings) |
| `draw` | [`Draw`](modules.md#draw) |
| `user` | [`User`](modules.md#user) |

#### Returns

[`DrawResults`](modules.md#drawresults)

#### Defined in

[tsunamiDrawCalculator.ts:10](https://github.com/pooltogether/draw-calculators-js-sdk/blob/cb1a89f/src/tsunamiDrawCalculator.ts#L10)
