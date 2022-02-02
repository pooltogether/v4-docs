[@pooltogether/v4-js-client](./) / Exports

# @pooltogether/v4-js-client

## Table of contents

### Classes

- [ContractFactory](classes/ContractFactory)
- [DrawCalculatorAPI](classes/DrawCalculatorAPI)
- [PrizeDistributor](classes/PrizeDistributor)
- [PrizePool](classes/PrizePool)
- [PrizePoolNetwork](classes/PrizePoolNetwork)
- [User](classes/User)

### Interfaces

- [ABIIdentifier](interfaces/ABIIdentifier)
- [ChildContractAddresses](interfaces/ChildContractAddresses)
- [Contract](interfaces/Contract)
- [ContractIdentifier](interfaces/ContractIdentifier)
- [ContractList](interfaces/ContractList)
- [Draw](interfaces/Draw)
- [PrizePoolTokenBalances](interfaces/PrizePoolTokenBalances)
- [Providers](interfaces/Providers)
- [SignersOrProviders](interfaces/SignersOrProviders)
- [Tags](interfaces/Tags)
- [TokenData](interfaces/TokenData)
- [Version](interfaces/Version)

### Type aliases

- [Claim](modules#claim)
- [DrawCalcDraw](modules#drawcalcdraw)
- [DrawCalcUser](modules#drawcalcuser)
- [DrawCalcUserDrawResult](modules#drawcalcuserdrawresult)
- [DrawResults](modules#drawresults)
- [Pick](modules#pick)
- [PickPrize](modules#pickprize)
- [PrizeAwardable](modules#prizeawardable)
- [PrizeDistribution](modules#prizedistribution)
- [PrizeTier](modules#prizetier)

### Functions

- [batchCalculateDrawResults](modules#batchcalculatedrawresults)
- [calculateDrawResults](modules#calculatedrawresults)
- [calculateNumberOfPicksForUser](modules#calculatenumberofpicksforuser)
- [calculateNumberOfPrizesForIndex](modules#calculatenumberofprizesforindex)
- [calculatePrizeForDistributionIndex](modules#calculateprizefordistributionindex)
- [computeCardinality](modules#computecardinality)
- [computeDrawResults](modules#computedrawresults)
- [computePicks](modules#computepicks)
- [createContract](modules#createcontract)
- [createContractMetadata](modules#createcontractmetadata)
- [createInterface](modules#createinterface)
- [filterResultsByValue](modules#filterresultsbyvalue)
- [formatTierToBasePercentage](modules#formattiertobasepercentage)
- [generatePicks](modules#generatepicks)
- [getContractListChainIds](modules#getcontractlistchainids)
- [getContractsByType](modules#getcontractsbytype)
- [getMetadataAndContract](modules#getmetadataandcontract)
- [getTokenData](modules#gettokendata)
- [getUsersERC20Balance](modules#getuserserc20balance)
- [getUsersTokenAllowance](modules#getuserstokenallowance)
- [initializePrizeDistributors](modules#initializeprizedistributors)
- [initializePrizePools](modules#initializeprizepools)
- [prepareClaims](modules#prepareclaims)
- [sortContractsByChainId](modules#sortcontractsbychainid)
- [sortContractsByContractTypeAndChildren](modules#sortcontractsbycontracttypeandchildren)
- [validateAddress](modules#validateaddress)
- [validateIsSigner](modules#validateissigner)
- [validateSignerNetwork](modules#validatesignernetwork)
- [validateSignerOrProviderNetwork](modules#validatesignerorprovidernetwork)

## Type aliases

### Claim

Ƭ **Claim**: `Object`

#### Type declaration

| Name                        | Type            |
| :-------------------------- | :-------------- |
| `drawIds`                   | `number`[]      |
| `encodedWinningPickIndices` | `string`        |
| `userAddress`               | `string`        |
| `winningPickIndices`        | `BigNumber`[][] |

#### Defined in

node_modules/@pooltogether/draw-calculator-js/dist/types.d.ts:45

---

### DrawCalcDraw

Ƭ **DrawCalcDraw**: `Object`

#### Type declaration

| Name                     | Type        |
| :----------------------- | :---------- |
| `beaconPeriodSeconds?`   | `number`    |
| `beaconPeriodStartedAt?` | `number`    |
| `drawId`                 | `number`    |
| `timestamp?`             | `number`    |
| `winningRandomNumber`    | `BigNumber` |

#### Defined in

node_modules/@pooltogether/draw-calculator-js/dist/types.d.ts:15

---

### DrawCalcUser

Ƭ **DrawCalcUser**: `Object`

#### Type declaration

| Name                 | Type                     |
| :------------------- | :----------------------- |
| `address`            | `string`                 |
| `normalizedBalances` | `BigNumber`[]            |
| `picks?`             | [`Pick`](modules#pick)[] |

#### Defined in

node_modules/@pooltogether/draw-calculator-js/dist/types.d.ts:26

---

### DrawCalcUserDrawResult

Ƭ **DrawCalcUserDrawResult**: `Object`

#### Type declaration

| Name         | Type                                   |
| :----------- | :------------------------------------- |
| `drawResult` | [`DrawResults`](modules#drawresults)   |
| `user`       | [`DrawCalcUser`](modules#drawcalcuser) |

#### Defined in

node_modules/@pooltogether/draw-calculator-js/dist/types.d.ts:51

---

### DrawResults

Ƭ **DrawResults**: `Object`

#### Type declaration

| Name         | Type                                         |
| :----------- | :------------------------------------------- |
| `drawId`     | `number`                                     |
| `prizes`     | [`PrizeAwardable`](modules#prizeawardable)[] |
| `totalValue` | `BigNumber`                                  |

#### Defined in

node_modules/@pooltogether/draw-calculator-js/dist/types.d.ts:31

---

### Pick

Ƭ **Pick**: `Object`

#### Type declaration

| Name    | Type     |
| :------ | :------- |
| `hash`  | `string` |
| `index` | `number` |

#### Defined in

node_modules/@pooltogether/draw-calculator-js/dist/types.d.ts:22

---

### PickPrize

Ƭ **PickPrize**: `Object`

#### Type declaration

| Name                | Type        |
| :------------------ | :---------- |
| `amount`            | `BigNumber` |
| `distributionIndex` | `number`    |

#### Defined in

node_modules/@pooltogether/draw-calculator-js/dist/types.d.ts:41

---

### PrizeAwardable

Ƭ **PrizeAwardable**: `Object`

#### Type declaration

| Name                | Type        |
| :------------------ | :---------- |
| `amount`            | `BigNumber` |
| `distributionIndex` | `number`    |
| `pick`              | `BigNumber` |

#### Defined in

node_modules/@pooltogether/draw-calculator-js/dist/types.d.ts:36

---

### PrizeDistribution

Ƭ **PrizeDistribution**: [`PrizeTier`](modules#prizetier) & { `drawEndTimestampOffset?`: `number` ; `drawStartTimestampOffset?`: `number` ; `matchCardinality`: `number` ; `numberOfPicks`: `BigNumber` }

#### Defined in

node_modules/@pooltogether/draw-calculator-js/dist/types.d.ts:9

---

### PrizeTier

Ƭ **PrizeTier**: `Object`

#### Type declaration

| Name              | Type        |
| :---------------- | :---------- |
| `bitRangeSize`    | `number`    |
| `expiryDuration?` | `number`    |
| `maxPicksPerUser` | `number`    |
| `prize`           | `BigNumber` |
| `tiers`           | `number`[]  |

#### Defined in

node_modules/@pooltogether/draw-calculator-js/dist/types.d.ts:2

## Functions

### batchCalculateDrawResults

▸ **batchCalculateDrawResults**(`prizeDistribution`, `draws`, `user`): [`DrawResults`](modules#drawresults)[]

#### Parameters

| Name                | Type                                               |
| :------------------ | :------------------------------------------------- |
| `prizeDistribution` | [`PrizeDistribution`](modules#prizedistribution)[] |
| `draws`             | [`DrawCalcDraw`](modules#drawcalcdraw)[]           |
| `user`              | [`DrawCalcUser`](modules#drawcalcuser)             |

#### Returns

[`DrawResults`](modules#drawresults)[]

#### Defined in

node_modules/@pooltogether/draw-calculator-js/dist/batchCalculateDrawResults.d.ts:2

---

### calculateDrawResults

▸ **calculateDrawResults**(`prizeDistribution`, `draw`, `user`, `drawIndex?`): [`DrawResults`](modules#drawresults)

#### Parameters

| Name                | Type                                             |
| :------------------ | :----------------------------------------------- |
| `prizeDistribution` | [`PrizeDistribution`](modules#prizedistribution) |
| `draw`              | [`DrawCalcDraw`](modules#drawcalcdraw)           |
| `user`              | [`DrawCalcUser`](modules#drawcalcuser)           |
| `drawIndex?`        | `number`                                         |

#### Returns

[`DrawResults`](modules#drawresults)

#### Defined in

node_modules/@pooltogether/draw-calculator-js/dist/calculateDrawResults.d.ts:2

---

### calculateNumberOfPicksForUser

▸ **calculateNumberOfPicksForUser**(`prizeDistribution`, `normalizedBalance`): `number`

#### Parameters

| Name                | Type                                             |
| :------------------ | :----------------------------------------------- |
| `prizeDistribution` | [`PrizeDistribution`](modules#prizedistribution) |
| `normalizedBalance` | `BigNumber`                                      |

#### Returns

`number`

#### Defined in

node_modules/@pooltogether/draw-calculator-js/dist/helpers/calculateNumberOfPicksForUser.d.ts:3

---

### calculateNumberOfPrizesForIndex

▸ **calculateNumberOfPrizesForIndex**(`bitRangeSize`, `tierIndex`): `number`

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `bitRangeSize` | `number` |
| `tierIndex`    | `number` |

#### Returns

`number`

#### Defined in

node_modules/@pooltogether/draw-calculator-js/dist/helpers/calculateNumberOfPrizesForIndex.d.ts:1

---

### calculatePrizeForDistributionIndex

▸ **calculatePrizeForDistributionIndex**(`distributionIndex`, `prizeDistrbution`): `BigNumber`

#### Parameters

| Name                | Type                                             |
| :------------------ | :----------------------------------------------- |
| `distributionIndex` | `number`                                         |
| `prizeDistrbution`  | [`PrizeDistribution`](modules#prizedistribution) |

#### Returns

`BigNumber`

#### Defined in

node_modules/@pooltogether/draw-calculator-js/dist/helpers/calculatePrizeForDistributionIndex.d.ts:3

---

### computeCardinality

▸ **computeCardinality**(`bitRangeSize`, `totalSupply`, `totalSupplyDecimals?`): `number`

#### Parameters

| Name                   | Type        |
| :--------------------- | :---------- |
| `bitRangeSize`         | `number`    |
| `totalSupply`          | `BigNumber` |
| `totalSupplyDecimals?` | `number`    |

#### Returns

`number`

#### Defined in

node_modules/@pooltogether/draw-calculator-js/dist/computeCardinality.d.ts:2

---

### computeDrawResults

▸ **computeDrawResults**(`prizeDistribution`, `draw`, `picks`): [`DrawResults`](modules#drawresults)

#### Parameters

| Name                | Type                                             |
| :------------------ | :----------------------------------------------- |
| `prizeDistribution` | [`PrizeDistribution`](modules#prizedistribution) |
| `draw`              | [`DrawCalcDraw`](modules#drawcalcdraw)           |
| `picks`             | [`Pick`](modules#pick)[]                         |

#### Returns

[`DrawResults`](modules#drawresults)

#### Defined in

node_modules/@pooltogether/draw-calculator-js/dist/computeDrawResults.d.ts:2

---

### computePicks

▸ **computePicks**(`address`, `pickIndices`): [`Pick`](modules#pick)[]

#### Parameters

| Name          | Type          |
| :------------ | :------------ |
| `address`     | `string`      |
| `pickIndices` | `BigNumber`[] |

#### Returns

[`Pick`](modules#pick)[]

#### Defined in

node_modules/@pooltogether/draw-calculator-js/dist/computePicks.d.ts:3

---

### createContract

▸ `Const` **createContract**(`address`, `contractInterface`, `provider`): `Contract`

#### Parameters

| Name                | Type                   |
| :------------------ | :--------------------- |
| `address`           | `string`               |
| `contractInterface` | `Interface`            |
| `provider`          | `Signer` \| `Provider` |

#### Returns

`Contract`

#### Defined in

[src/utils/createContract.ts:6](https://github.com/pooltogether/v4-js-client/blob/e36ffdf/src/utils/createContract.ts#L6)

---

### createContractMetadata

▸ **createContractMetadata**(`chainId`, `address`, `type`, `abi`, `version?`, `tags?`, `extensions?`): [`Contract`](interfaces/Contract)

#### Parameters

| Name         | Type                            | Default value |
| :----------- | :------------------------------ | :------------ |
| `chainId`    | `number`                        | `undefined`   |
| `address`    | `string`                        | `undefined`   |
| `type`       | `ContractType`                  | `undefined`   |
| `abi`        | `any`[]                         | `undefined`   |
| `version`    | [`Version`](interfaces/Version) | `undefined`   |
| `tags`       | `string`[]                      | `[]`          |
| `extensions` | `Object`                        | `{}`          |

#### Returns

[`Contract`](interfaces/Contract)

#### Defined in

[src/utils/createContractMetadata.ts:6](https://github.com/pooltogether/v4-js-client/blob/e36ffdf/src/utils/createContractMetadata.ts#L6)

---

### createInterface

▸ **createInterface**(`abi`): `Interface`

#### Parameters

| Name  | Type  |
| :---- | :---- |
| `abi` | `any` |

#### Returns

`Interface`

#### Defined in

[src/utils/createInterface.ts:3](https://github.com/pooltogether/v4-js-client/blob/e36ffdf/src/utils/createInterface.ts#L3)

---

### filterResultsByValue

▸ **filterResultsByValue**(`drawResults`, `maxPicksPerUser`): [`DrawResults`](modules#drawresults)

Filters out prizes if:

- there's more prizes than the max picks per user
- the prize won is 0 tokens

Sorts prizes by descending value too.

#### Parameters

| Name              | Type                                 |
| :---------------- | :----------------------------------- |
| `drawResults`     | [`DrawResults`](modules#drawresults) |
| `maxPicksPerUser` | `number`                             |

#### Returns

[`DrawResults`](modules#drawresults)

#### Defined in

node_modules/@pooltogether/draw-calculator-js/dist/helpers/filterResultsByValue.d.ts:12

---

### formatTierToBasePercentage

▸ **formatTierToBasePercentage**(`distribution`): `BigNumber`

#### Parameters

| Name           | Type     |
| :------------- | :------- |
| `distribution` | `string` |

#### Returns

`BigNumber`

#### Defined in

[src/utils/formatTierToBasePercentage.ts:5](https://github.com/pooltogether/v4-js-client/blob/e36ffdf/src/utils/formatTierToBasePercentage.ts#L5)

---

### generatePicks

▸ **generatePicks**(`prizeDistribution`, `address`, `normalizedBalance`): [`Pick`](modules#pick)[]

#### Parameters

| Name                | Type                                             |
| :------------------ | :----------------------------------------------- |
| `prizeDistribution` | [`PrizeDistribution`](modules#prizedistribution) |
| `address`           | `string`                                         |
| `normalizedBalance` | `BigNumber`                                      |

#### Returns

[`Pick`](modules#pick)[]

#### Defined in

node_modules/@pooltogether/draw-calculator-js/dist/generatePicks.d.ts:3

---

### getContractListChainIds

▸ **getContractListChainIds**(`contracts`): `number`[]

#### Parameters

| Name        | Type                                |
| :---------- | :---------------------------------- |
| `contracts` | [`Contract`](interfaces/Contract)[] |

#### Returns

`number`[]

#### Defined in

[src/utils/getContractListChainIds.ts:3](https://github.com/pooltogether/v4-js-client/blob/e36ffdf/src/utils/getContractListChainIds.ts#L3)

---

### getContractsByType

▸ **getContractsByType**(`contracts`, `type`): [`Contract`](interfaces/Contract)[]

#### Parameters

| Name        | Type                                |
| :---------- | :---------------------------------- |
| `contracts` | [`Contract`](interfaces/Contract)[] |
| `type`      | `ContractType`                      |

#### Returns

[`Contract`](interfaces/Contract)[]

#### Defined in

[src/utils/getContractsByType.ts:4](https://github.com/pooltogether/v4-js-client/blob/e36ffdf/src/utils/getContractsByType.ts#L4)

---

### getMetadataAndContract

▸ **getMetadataAndContract**(`chainId`, `signerOrProvider`, `contractType`, `contractMetadataList`, `addressOverride?`): `Object`

#### Parameters

| Name                   | Type                                |
| :--------------------- | :---------------------------------- |
| `chainId`              | `number`                            |
| `signerOrProvider`     | `Signer` \| `Provider`              |
| `contractType`         | `ContractType`                      |
| `contractMetadataList` | [`Contract`](interfaces/Contract)[] |
| `addressOverride?`     | `string`                            |

#### Returns

`Object`

| Name               | Type                              |
| :----------------- | :-------------------------------- |
| `contract`         | `Contract`                        |
| `contractMetadata` | [`Contract`](interfaces/Contract) |

#### Defined in

[src/utils/getMetadataAndContract.ts:10](https://github.com/pooltogether/v4-js-client/blob/e36ffdf/src/utils/getMetadataAndContract.ts#L10)

---

### getTokenData

▸ **getTokenData**(`tokenContract`): `Promise`<[`TokenData`](interfaces/TokenData)\>

#### Parameters

| Name            | Type       |
| :-------------- | :--------- |
| `tokenContract` | `Contract` |

#### Returns

`Promise`<[`TokenData`](interfaces/TokenData)\>

#### Defined in

[src/utils/contractGetters.ts:6](https://github.com/pooltogether/v4-js-client/blob/e36ffdf/src/utils/contractGetters.ts#L6)

---

### getUsersERC20Balance

▸ **getUsersERC20Balance**(`usersAddress`, `tokenContract`): `Promise`<`BigNumber`\>

#### Parameters

| Name            | Type       |
| :-------------- | :--------- |
| `usersAddress`  | `string`   |
| `tokenContract` | `Contract` |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[src/utils/contractGetters.ts:18](https://github.com/pooltogether/v4-js-client/blob/e36ffdf/src/utils/contractGetters.ts#L18)

---

### getUsersTokenAllowance

▸ **getUsersTokenAllowance**(`usersAddress`, `spendersAddress`, `tokenContract`): `Promise`<`BigNumber`\>

#### Parameters

| Name              | Type       |
| :---------------- | :--------- |
| `usersAddress`    | `string`   |
| `spendersAddress` | `string`   |
| `tokenContract`   | `Contract` |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[src/utils/contractGetters.ts:26](https://github.com/pooltogether/v4-js-client/blob/e36ffdf/src/utils/contractGetters.ts#L26)

---

### initializePrizeDistributors

▸ **initializePrizeDistributors**(`contractList`, `signersOrProviders`): [`PrizeDistributor`](classes/PrizeDistributor)[]

Utility function to create several PrizeDistributors from a contract list.

#### Parameters

| Name                 | Type                                                  | Description                                                                                              |
| :------------------- | :---------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `contractList`       | [`ContractList`](interfaces/ContractList)             | a list of all of the relevant contract metadata for all of the PrizeDistributors to create               |
| `signersOrProviders` | [`SignersOrProviders`](interfaces/SignersOrProviders) | signers or providers for all of the networks the PrizeDistributors are deployed on keyed by the chain id |

#### Returns

[`PrizeDistributor`](classes/PrizeDistributor)[]

a list of PrizeDistributors

#### Defined in

[src/PrizeDistributor.ts:871](https://github.com/pooltogether/v4-js-client/blob/e36ffdf/src/PrizeDistributor.ts#L871)

---

### initializePrizePools

▸ **initializePrizePools**(`contractList`, `providers`): [`PrizePool`](classes/PrizePool)[]

A utility function to create several PrizePools from a contract list.

#### Parameters

| Name           | Type                                      | Description                                                                |
| :------------- | :---------------------------------------- | :------------------------------------------------------------------------- |
| `contractList` | [`ContractList`](interfaces/ContractList) | a list of all of the relevant contract metadata for all of the Prize Pools |
| `providers`    | [`Providers`](interfaces/Providers)       | providers for all of the networks in the list of Prize Pools               |

#### Returns

[`PrizePool`](classes/PrizePool)[]

a list of initialized PrizePools

#### Defined in

[src/PrizePool.ts:326](https://github.com/pooltogether/v4-js-client/blob/e36ffdf/src/PrizePool.ts#L326)

---

### prepareClaims

▸ **prepareClaims**(`user`, `drawResults`): [`Claim`](modules#claim)

#### Parameters

| Name          | Type                                   |
| :------------ | :------------------------------------- |
| `user`        | [`DrawCalcUser`](modules#drawcalcuser) |
| `drawResults` | [`DrawResults`](modules#drawresults)[] |

#### Returns

[`Claim`](modules#claim)

#### Defined in

node_modules/@pooltogether/draw-calculator-js/dist/prepareClaims.d.ts:2

---

### sortContractsByChainId

▸ **sortContractsByChainId**(`contracts`): `Object`

#### Parameters

| Name        | Type                                |
| :---------- | :---------------------------------- |
| `contracts` | [`Contract`](interfaces/Contract)[] |

#### Returns

`Object`

#### Defined in

[src/utils/sortContractsByChainId.ts:3](https://github.com/pooltogether/v4-js-client/blob/e36ffdf/src/utils/sortContractsByChainId.ts#L3)

---

### sortContractsByContractTypeAndChildren

▸ **sortContractsByContractTypeAndChildren**(`contracts`, `contractType`): [`Contract`](interfaces/Contract)[][]

Reads the contract list and pulls out connected contracts based on the
children extension.

NOTE: This extension is added in the intialize functions for creating the instances of
PrizePoolNetwork and PrizeDistributors

#### Parameters

| Name           | Type                                |
| :------------- | :---------------------------------- |
| `contracts`    | [`Contract`](interfaces/Contract)[] |
| `contractType` | `ContractType`                      |

#### Returns

[`Contract`](interfaces/Contract)[][]

#### Defined in

[src/utils/sortContractsByContractTypeAndChildren.ts:12](https://github.com/pooltogether/v4-js-client/blob/e36ffdf/src/utils/sortContractsByContractTypeAndChildren.ts#L12)

---

### validateAddress

▸ **validateAddress**(`errorPrefix`, `address`): `void`

Throws an error if the provided address is invalid.

#### Parameters

| Name          | Type     | Description                                             |
| :------------ | :------- | :------------------------------------------------------ |
| `errorPrefix` | `string` | the class and function name of where the error occurred |
| `address`     | `string` | the address to validate                                 |

#### Returns

`void`

#### Defined in

[src/utils/validation.ts:10](https://github.com/pooltogether/v4-js-client/blob/e36ffdf/src/utils/validation.ts#L10)

---

### validateIsSigner

▸ **validateIsSigner**(`errorPrefix`, `signerOrProvider`): `void`

Throws an error if the signerOrProvider is not a Signer

#### Parameters

| Name               | Type                   | Description                                             |
| :----------------- | :--------------------- | :------------------------------------------------------ |
| `errorPrefix`      | `string`               | the class and function name of where the error occurred |
| `signerOrProvider` | `Signer` \| `Provider` | a Signer or Provider to check                           |

#### Returns

`void`

#### Defined in

[src/utils/validation.ts:37](https://github.com/pooltogether/v4-js-client/blob/e36ffdf/src/utils/validation.ts#L37)

---

### validateSignerNetwork

▸ **validateSignerNetwork**(`errorPrefix`, `signer`, `chainId`): `Promise`<`void`\>

Throws an error if the Signer provided is not on the chain id provided.

#### Parameters

| Name          | Type     | Description                                             |
| :------------ | :------- | :------------------------------------------------------ |
| `errorPrefix` | `string` | the class and function name of where the error occurred |
| `signer`      | `Signer` | a Signer to validate                                    |
| `chainId`     | `number` | the network to check for                                |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/validation.ts:23](https://github.com/pooltogether/v4-js-client/blob/e36ffdf/src/utils/validation.ts#L23)

---

### validateSignerOrProviderNetwork

▸ **validateSignerOrProviderNetwork**(`errorPrefix`, `signerOrProvider`, `chainId`): `Promise`<`void`\>

Throws and error if the Signer or Provider is not on the chain id provided.

#### Parameters

| Name               | Type                   | Description                                             |
| :----------------- | :--------------------- | :------------------------------------------------------ |
| `errorPrefix`      | `string`               | the class and function name of where the error occurred |
| `signerOrProvider` | `Signer` \| `Provider` | a Signer or Provider to check                           |
| `chainId`          | `number`               | the network to check for                                |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/validation.ts:49](https://github.com/pooltogether/v4-js-client/blob/e36ffdf/src/utils/validation.ts#L49)
