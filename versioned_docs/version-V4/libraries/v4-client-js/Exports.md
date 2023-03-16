# Exports

## Table of contents

### Namespaces

- [calculate](/protocol/libraries/v4-utils-js/calculate )
- [compute](/protocol/libraries/v4-utils-js/compute )
- [utils](/protocol/libraries/v4-utils-js/utils )

### Classes

- [ContractFactory](Classes/ContractFactory )
- [PrizeApi](Classes/PrizeApi )
- [PrizeDistributor](Classes/PrizeDistributor )
- [PrizePool](Classes/PrizePool )
- [PrizePoolNetwork](Classes/PrizePoolNetwork )
- [User](Classes/User )

### Interfaces

- [ABIIdentifier](Interfaces/ABIIdentifier )
- [ChildContractAddresses](Interfaces/ChildContractAddresses )
- [Contract](Interfaces/Contract )
- [ContractIdentifier](Interfaces/ContractIdentifier )
- [ContractList](Interfaces/ContractList )
- [LEGACYDrawResults](Interfaces/LEGACYDrawResults )
- [LEGACYPrize](Interfaces/LEGACYPrize )
- [PrizePoolTokenBalances](Interfaces/PrizePoolTokenBalances )
- [Providers](Interfaces/Providers )
- [SignersOrProviders](Interfaces/SignersOrProviders )
- [Tags](Interfaces/Tags )
- [TokenData](Interfaces/TokenData )
- [Version](Interfaces/Version )

### Type aliases

- [Claim](Exports#claim)
- [Draw](Exports#draw)
- [DrawResults](Exports#drawresults)
- [Pick](Exports#pick)
- [PickPrize](Exports#pickprize)
- [Prize](Exports#prize)
- [PrizeAwardable](Exports#prizeawardable)
- [PrizeDistribution](Exports#prizedistribution)
- [PrizeTier](Exports#prizetier)

### Functions

- [createContract](Exports#createcontract)
- [createContractMetadata](Exports#createcontractmetadata)
- [createInterface](Exports#createinterface)
- [formatTierToBasePercentage](Exports#formattiertobasepercentage)
- [getContractListChainIds](Exports#getcontractlistchainids)
- [getContractsByType](Exports#getcontractsbytype)
- [getMetadataAndContract](Exports#getmetadataandcontract)
- [getTokenData](Exports#gettokendata)
- [getUsersERC20Balance](Exports#getuserserc20balance)
- [getUsersTokenAllowance](Exports#getuserstokenallowance)
- [initializePrizeDistributors](Exports#initializeprizedistributors)
- [initializePrizePools](Exports#initializeprizepools)
- [sortContractsByChainId](Exports#sortcontractsbychainid)
- [sortContractsByContractTypeAndChildren](Exports#sortcontractsbycontracttypeandchildren)
- [validateAddress](Exports#validateaddress)
- [validateIsSigner](Exports#validateissigner)
- [validateSignerNetwork](Exports#validatesignernetwork)
- [validateSignerOrProviderNetwork](Exports#validatesignerorprovidernetwork)

## Type aliases

### Claim

Ƭ **Claim**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `drawIds` | `number`[] |
| `encodedWinningPickIndices` | `string` |
| `userAddress` | `string` |
| `winningPickIndices` | `BigNumber`[][] |

#### Defined in

node_modules/@pooltogether/v4-utils-js/dist/types.d.ts:35

___

### Draw

Ƭ **Draw**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `beaconPeriodSeconds` | `number` |
| `beaconPeriodStartedAt` | `BigNumber` |
| `drawId` | `number` |
| `timestamp` | `BigNumber` |
| `winningRandomNumber` | `BigNumber` |

#### Defined in

node_modules/@pooltogether/v4-utils-js/dist/types.d.ts:15

___

### DrawResults

Ƭ **DrawResults**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `drawId` | `number` |
| `prizes` | [`PrizeAwardable`](Exports#prizeawardable)[] |
| `totalValue` | `BigNumber` |

#### Defined in

node_modules/@pooltogether/v4-utils-js/dist/types.d.ts:41

___

### Pick

Ƭ **Pick**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `hash` | `string` |
| `index` | `number` |

#### Defined in

node_modules/@pooltogether/v4-utils-js/dist/types.d.ts:22

___

### PickPrize

Ƭ **PickPrize**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BigNumber` |
| `tierIndex` | `number` |

#### Defined in

node_modules/@pooltogether/v4-utils-js/dist/types.d.ts:31

___

### Prize

Ƭ **Prize**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `amount` | `BigNumber` |
| `pick` | `BigNumber` |
| `tier` | `number` |

#### Defined in

node_modules/@pooltogether/v4-utils-js/dist/types.d.ts:67

___

### PrizeAwardable

Ƭ **PrizeAwardable**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `amount` | `BigNumber` |
| `pick` | `BigNumber` |
| `tierIndex` | `number` |

#### Defined in

node_modules/@pooltogether/v4-utils-js/dist/types.d.ts:26

___

### PrizeDistribution

Ƭ **PrizeDistribution**: [`PrizeTier`](Exports#prizetier) & { `endTimestampOffset`: `number` ; `matchCardinality`: `number` ; `numberOfPicks`: `BigNumber` ; `startTimestampOffset`: `number`  }

#### Defined in

node_modules/@pooltogether/v4-utils-js/dist/types.d.ts:9

___

### PrizeTier

Ƭ **PrizeTier**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bitRangeSize` | `number` |
| `expiryDuration` | `number` |
| `maxPicksPerUser` | `number` |
| `prize` | `BigNumber` |
| `tiers` | `number`[] |

#### Defined in

node_modules/@pooltogether/v4-utils-js/dist/types.d.ts:2

## Functions

### createContract

▸ `Const` **createContract**(`address`, `contractInterface`, `provider`): `Contract`

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `contractInterface` | `Interface` |
| `provider` | `Signer` \| `Provider` |

#### Returns

`Contract`

#### Defined in

[src/utils/createContract.ts:6](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/utils/createContract.ts#L6)

___

### createContractMetadata

▸ **createContractMetadata**(`chainId`, `address`, `type`, `abi`, `version?`, `tags?`, `extensions?`): [`Contract`](Interfaces/Contract )

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `chainId` | `number` | `undefined` |
| `address` | `string` | `undefined` |
| `type` | `ContractType` | `undefined` |
| `abi` | `any`[] | `undefined` |
| `version` | [`Version`](Interfaces/Version ) | `undefined` |
| `tags` | `string`[] | `[]` |
| `extensions` | `Object` | `{}` |

#### Returns

[`Contract`](Interfaces/Contract )

#### Defined in

[src/utils/createContractMetadata.ts:6](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/utils/createContractMetadata.ts#L6)

___

### createInterface

▸ **createInterface**(`abi`): `Interface`

#### Parameters

| Name | Type |
| :------ | :------ |
| `abi` | `any` |

#### Returns

`Interface`

#### Defined in

[src/utils/createInterface.ts:3](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/utils/createInterface.ts#L3)

___

### formatTierToBasePercentage

▸ **formatTierToBasePercentage**(`distribution`): `BigNumber`

#### Parameters

| Name | Type |
| :------ | :------ |
| `distribution` | `string` |

#### Returns

`BigNumber`

#### Defined in

[src/utils/formatTierToBasePercentage.ts:5](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/utils/formatTierToBasePercentage.ts#L5)

___

### getContractListChainIds

▸ **getContractListChainIds**(`contracts`): `number`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `contracts` | [`Contract`](Interfaces/Contract )[] |

#### Returns

`number`[]

#### Defined in

[src/utils/getContractListChainIds.ts:3](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/utils/getContractListChainIds.ts#L3)

___

### getContractsByType

▸ **getContractsByType**(`contracts`, `type`): [`Contract`](Interfaces/Contract )[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `contracts` | [`Contract`](Interfaces/Contract )[] |
| `type` | `ContractType` |

#### Returns

[`Contract`](Interfaces/Contract )[]

#### Defined in

[src/utils/getContractsByType.ts:4](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/utils/getContractsByType.ts#L4)

___

### getMetadataAndContract

▸ **getMetadataAndContract**(`chainId`, `signerOrProvider`, `contractType`, `contractMetadataList`, `addressOverride?`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `signerOrProvider` | `Signer` \| `Provider` |
| `contractType` | `ContractType` |
| `contractMetadataList` | [`Contract`](Interfaces/Contract )[] |
| `addressOverride?` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `contract` | `Contract` |
| `contractMetadata` | [`Contract`](Interfaces/Contract ) |

#### Defined in

[src/utils/getMetadataAndContract.ts:10](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/utils/getMetadataAndContract.ts#L10)

___

### getTokenData

▸ **getTokenData**(`tokenContract`): `Promise`<[`TokenData`](Interfaces/TokenData )\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenContract` | `Contract` |

#### Returns

`Promise`<[`TokenData`](Interfaces/TokenData )\>

#### Defined in

[src/utils/contractGetters.ts:7](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/utils/contractGetters.ts#L7)

___

### getUsersERC20Balance

▸ **getUsersERC20Balance**(`usersAddress`, `tokenContract`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `usersAddress` | `string` |
| `tokenContract` | `Contract` |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[src/utils/contractGetters.ts:19](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/utils/contractGetters.ts#L19)

___

### getUsersTokenAllowance

▸ **getUsersTokenAllowance**(`usersAddress`, `spendersAddress`, `tokenContract`): `Promise`<`BigNumber`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `usersAddress` | `string` |
| `spendersAddress` | `string` |
| `tokenContract` | `Contract` |

#### Returns

`Promise`<`BigNumber`\>

#### Defined in

[src/utils/contractGetters.ts:27](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/utils/contractGetters.ts#L27)

___

### initializePrizeDistributors

▸ **initializePrizeDistributors**(`contractList`, `signersOrProviders`): [`PrizeDistributor`](Classes/PrizeDistributor )[]

Utility function to create several PrizeDistributors from a contract list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractList` | [`ContractList`](Interfaces/ContractList ) | a list of all of the relevant contract metadata for all of the PrizeDistributors to create |
| `signersOrProviders` | [`SignersOrProviders`](Interfaces/SignersOrProviders ) | signers or providers for all of the networks the PrizeDistributors are deployed on keyed by the chain id |

#### Returns

[`PrizeDistributor`](Classes/PrizeDistributor )[]

a list of PrizeDistributors

#### Defined in

[src/PrizeDistributor.ts:863](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L863)

___

### initializePrizePools

▸ **initializePrizePools**(`contractList`, `providers`): [`PrizePool`](Classes/PrizePool )[]

A utility function to create several PrizePools from a contract list.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractList` | [`ContractList`](Interfaces/ContractList ) | a list of all of the relevant contract metadata for all of the Prize Pools |
| `providers` | [`Providers`](Interfaces/Providers ) | providers for all of the networks in the list of Prize Pools |

#### Returns

[`PrizePool`](Classes/PrizePool )[]

a list of initialized PrizePools

#### Defined in

[src/PrizePool.ts:326](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizePool.ts#L326)

___

### sortContractsByChainId

▸ **sortContractsByChainId**(`contracts`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contracts` | [`Contract`](Interfaces/Contract )[] |

#### Returns

`Object`

#### Defined in

[src/utils/sortContractsByChainId.ts:3](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/utils/sortContractsByChainId.ts#L3)

___

### sortContractsByContractTypeAndChildren

▸ **sortContractsByContractTypeAndChildren**(`contracts`, `contractType`): [`Contract`](Interfaces/Contract )[][]

Reads the contract list and pulls out connected contracts based on the
children extension.

NOTE: This extension is added in the intialize functions for creating the instances of
PrizePoolNetwork and PrizeDistributors

#### Parameters

| Name | Type |
| :------ | :------ |
| `contracts` | [`Contract`](Interfaces/Contract )[] |
| `contractType` | `ContractType` |

#### Returns

[`Contract`](Interfaces/Contract )[][]

#### Defined in

[src/utils/sortContractsByContractTypeAndChildren.ts:12](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/utils/sortContractsByContractTypeAndChildren.ts#L12)

___

### validateAddress

▸ **validateAddress**(`errorPrefix`, `address`): `void`

Throws an error if the provided address is invalid.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `errorPrefix` | `string` | the class and function name of where the error occurred |
| `address` | `string` | the address to validate |

#### Returns

`void`

#### Defined in

[src/utils/validation.ts:10](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/utils/validation.ts#L10)

___

### validateIsSigner

▸ **validateIsSigner**(`errorPrefix`, `signerOrProvider`): `void`

Throws an error if the signerOrProvider is not a Signer

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `errorPrefix` | `string` | the class and function name of where the error occurred |
| `signerOrProvider` | `Signer` \| `Provider` | a Signer or Provider to check |

#### Returns

`void`

#### Defined in

[src/utils/validation.ts:37](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/utils/validation.ts#L37)

___

### validateSignerNetwork

▸ **validateSignerNetwork**(`errorPrefix`, `signer`, `chainId`): `Promise`<`void`\>

Throws an error if the Signer provided is not on the chain id provided.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `errorPrefix` | `string` | the class and function name of where the error occurred |
| `signer` | `Signer` | a Signer to validate |
| `chainId` | `number` | the network to check for |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/validation.ts:23](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/utils/validation.ts#L23)

___

### validateSignerOrProviderNetwork

▸ **validateSignerOrProviderNetwork**(`errorPrefix`, `signerOrProvider`, `chainId`): `Promise`<`void`\>

Throws and error if the Signer or Provider is not on the chain id provided.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `errorPrefix` | `string` | the class and function name of where the error occurred |
| `signerOrProvider` | `Signer` \| `Provider` | a Signer or Provider to check |
| `chainId` | `number` | the network to check for |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/utils/validation.ts:49](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/utils/validation.ts#L49)
