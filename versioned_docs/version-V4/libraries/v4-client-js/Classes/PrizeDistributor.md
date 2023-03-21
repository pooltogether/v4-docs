#   PrizeDistributor

A Prize Distributor.
Provides access to the contracts for viewing expiration times on draws, timelock timers and checking/claiming prizes for a user. Can be instantiated with an ethers Signer or Provider. Use a Signer if you want to claim transactions for a user. If a provider is provided, only read methods are available.

## Table of contents

### Constructors

- [constructor](PrizeDistributor#constructor)

### Properties

- [address](PrizeDistributor#address)
- [chainId](PrizeDistributor#chainid)
- [contractMetadataList](PrizeDistributor#contractmetadatalist)
- [drawBufferContract](PrizeDistributor#drawbuffercontract)
- [drawBufferMetadata](PrizeDistributor#drawbuffermetadata)
- [drawCalculatorContract](PrizeDistributor#drawcalculatorcontract)
- [drawCalculatorMetadata](PrizeDistributor#drawcalculatormetadata)
- [drawCalculatorTimelockContract](PrizeDistributor#drawcalculatortimelockcontract)
- [drawCalculatorTimelockMetadata](PrizeDistributor#drawcalculatortimelockmetadata)
- [prizeDistributionsBufferContract](PrizeDistributor#prizedistributionsbuffercontract)
- [prizeDistributionsBufferMetadata](PrizeDistributor#prizedistributionsbuffermetadata)
- [prizeDistributorContract](PrizeDistributor#prizedistributorcontract)
- [prizeDistributorMetadata](PrizeDistributor#prizedistributormetadata)
- [signerOrProvider](PrizeDistributor#signerorprovider)
- [tokenContract](PrizeDistributor#tokencontract)
- [tokenMetadata](PrizeDistributor#tokenmetadata)

### Methods

- [claimPrizesAcrossMultipleDrawsByDrawResults](PrizeDistributor#claimprizesacrossmultipledrawsbydrawresults)
- [claimPrizesByDraw](PrizeDistributor#claimprizesbydraw)
- [claimPrizesByDrawResults](PrizeDistributor#claimprizesbydrawresults)
- [getAndSetEthersContract](PrizeDistributor#getandsetetherscontract)
- [getDraw](PrizeDistributor#getdraw)
- [getDrawBufferContract](PrizeDistributor#getdrawbuffercontract)
- [getDrawCalculatorContract](PrizeDistributor#getdrawcalculatorcontract)
- [getDrawIdsFromDrawBuffer](PrizeDistributor#getdrawidsfr rawbuffer)
- [getDrawIdsFromPrizeDistributionBuffer](PrizeDistributor#getdrawidsfromprizedistributionbuffer)
- [getDraws](PrizeDistributor#getdraws)
- [getDrawsAndPrizeDistributions](PrizeDistributor#getdrawsandprizedistributions)
- [getNewestDraw](PrizeDistributor#getnewestdraw)
- [getNewestPrizeDistribution](PrizeDistributor#getnewestprizedistribution)
- [getOldestDraw](PrizeDistributor#getoldestdraw)
- [getOldestPrizeDistribution](PrizeDistributor#getoldestprizedistribution)
- [getPrizeDistribution](PrizeDistributor#getprizedistribution)
- [getPrizeDistributions](PrizeDistributor#getprizedistributions)
- [getPrizeDistributionsBufferContract](PrizeDistributor#getprizedistributionsbuffercontract)
- [getTimelockDrawId](PrizeDistributor#gettimelockdrawid)
- [getTokenContract](PrizeDistributor#gettokencontract)
- [getTokenData](PrizeDistributor#gettokendata)
- [getUsersAddress](PrizeDistributor#getusersaddress)
- [getUsersClaimedAmount](PrizeDistributor#getusersclaimedamount)
- [getUsersClaimedAmounts](PrizeDistributor#getusersclaimedamounts)
- [getUsersDrawResultsForDrawId](PrizeDistributor#getusersdrawresultsfordrawid)
- [getUsersDrawResultsForDrawIds](PrizeDistributor#getusersdrawresultsfordrawids)
- [getUsersNormalizedBalancesForDrawIds](PrizeDistributor#getusersnormalizedbalancesfordrawids)
- [getValidDrawIds](PrizeDistributor#getvaliddrawids)
- [id](PrizeDistributor#id)
- [validateIsSigner](PrizeDistributor#validateissigner)
- [validateSignerNetwork](PrizeDistributor#validatesignernetwork)

## Constructors

### constructor

• **new PrizeDistributor**(`prizeDistributorMetadata`, `signerOrProvider`, `contractMetadataList`)

Create an instance of a PrizeDistributor by providing the metadata of the PrizeDistributor contract, an ethers Provider or Signer for the network the PrizeDistributor contract is deployed on and a list of contract metadata for the other contracts that make up the PrizeDistributor.

#### Parameters

| Name | Type |
| :------ | :------ |
| `prizeDistributorMetadata` | [`Contract`](../Interfaces/Contract ) |
| `signerOrProvider` | `Signer` \| `Provider` |
| `contractMetadataList` | [`Contract`](../Interfaces/Contract )[] |

#### Defined in

[src/PrizeDistributor.ts:63](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L63)

## Properties

### address

• `Readonly` **address**: `string`

#### Defined in

[src/PrizeDistributor.ts:39](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L39)

___

### chainId

• `Readonly` **chainId**: `number`

#### Defined in

[src/PrizeDistributor.ts:38](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L38)

___

### contractMetadataList

• `Readonly` **contractMetadataList**: [`Contract`](../Interfaces/Contract )[]

#### Defined in

[src/PrizeDistributor.ts:36](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L36)

___

### drawBufferContract

• **drawBufferContract**: `Contract`

#### Defined in

[src/PrizeDistributor.ts:53](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L53)

___

### drawBufferMetadata

• **drawBufferMetadata**: [`Contract`](../Interfaces/Contract )

#### Defined in

[src/PrizeDistributor.ts:45](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L45)

___

### drawCalculatorContract

• **drawCalculatorContract**: `Contract`

#### Defined in

[src/PrizeDistributor.ts:52](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L52)

___

### drawCalculatorMetadata

• **drawCalculatorMetadata**: [`Contract`](../Interfaces/Contract )

#### Defined in

[src/PrizeDistributor.ts:44](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L44)

___

### drawCalculatorTimelockContract

• `Readonly` **drawCalculatorTimelockContract**: `Contract`

#### Defined in

[src/PrizeDistributor.ts:51](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L51)

___

### drawCalculatorTimelockMetadata

• `Readonly` **drawCalculatorTimelockMetadata**: [`Contract`](../Interfaces/Contract )

#### Defined in

[src/PrizeDistributor.ts:43](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L43)

___

### prizeDistributionsBufferContract

• **prizeDistributionsBufferContract**: `Contract`

#### Defined in

[src/PrizeDistributor.ts:54](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L54)

___

### prizeDistributionsBufferMetadata

• **prizeDistributionsBufferMetadata**: [`Contract`](../Interfaces/Contract )

#### Defined in

[src/PrizeDistributor.ts:46](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L46)

___

### prizeDistributorContract

• `Readonly` **prizeDistributorContract**: `Contract`

#### Defined in

[src/PrizeDistributor.ts:50](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L50)

___

### prizeDistributorMetadata

• `Readonly` **prizeDistributorMetadata**: [`Contract`](../Interfaces/Contract )

#### Defined in

[src/PrizeDistributor.ts:42](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L42)

___

### signerOrProvider

• `Readonly` **signerOrProvider**: `Signer` \| `Provider`

#### Defined in

[src/PrizeDistributor.ts:37](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L37)

___

### tokenContract

• **tokenContract**: `Contract`

#### Defined in

[src/PrizeDistributor.ts:55](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L55)

___

### tokenMetadata

• **tokenMetadata**: [`Contract`](../Interfaces/Contract )

#### Defined in

[src/PrizeDistributor.ts:47](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L47)

## Methods

### claimPrizesAcrossMultipleDrawsByDrawResults

▸ **claimPrizesAcrossMultipleDrawsByDrawResults**(`drawResults`, `overrides?`): `Promise`<`TransactionResponse`\>

Submits a transaction to claim a users prizes across multiple draws
PrizeDistributor must be initialized with a Signer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `drawResults` | `Object` | an object of the users draw results to claim keyed by draw ids |
| `overrides?` | `Overrides` | optional overrides for the transaction creation |

#### Returns

`Promise`<`TransactionResponse`\>

the transaction response

#### Defined in

[src/PrizeDistributor.ts:185](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L185)

___

### claimPrizesByDraw

▸ **claimPrizesByDraw**(`drawId`, `maxPicksPerUser`, `overrides?`): `Promise`<`TransactionResponse`\>

Fetches a users prizes for the provided draw and submits a transaction to claim them to the Signer.
PrizeDistributor must be initialized with a Signer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `drawId` | `number` | the draw id to claim prizes for |
| `maxPicksPerUser` | `number` | the maximum picks per user from the PrizeDistribution for the provided draw id |
| `overrides?` | `Overrides` | optional overrides for the transaction creation |

#### Returns

`Promise`<`TransactionResponse`\>

the transaction response

#### Defined in

[src/PrizeDistributor.ts:126](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L126)

___

### claimPrizesByDrawResults

▸ **claimPrizesByDrawResults**(`drawResults`, `overrides?`): `Promise`<`TransactionResponse`\>

Submits a transaction to claim a users prizes
PrizeDistributor must be initialized with a Signer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `drawResults` | [`DrawResults`](../Exports#drawresults) | the prize results for a user for a specific draw |
| `overrides?` | `Overrides` | optional overrides for the transaction creation |

#### Returns

`Promise`<`TransactionResponse`\>

the transaction response

#### Defined in

[src/PrizeDistributor.ts:149](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L149)

___

### getAndSetEthersContract

▸ `Private` **getAndSetEthersContract**(`key`, `contractType`, `getContractAddress`): `Promise`<`Contract`\>

Fetches a contract address, finds the relevant metadata in the ContractList and creates an ethers Contract for that contract. The ethers Contract is cached on the instance of the PrizeDistributor and is returned immediately if already stored.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the key for the requested contract to be stored on the PrizeDistributor |
| `contractType` | `ContractType` | the contract name |
| `getContractAddress` | () => `Promise`<`string`\> | a function to fetch the contract address |

#### Returns

`Promise`<`Contract`\>

an ethers Contract for the provided address and contract type

#### Defined in

[src/PrizeDistributor.ts:720](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L720)

___

### getDraw

▸ **getDraw**(`drawId`): `Promise`<[`Draw`](../Exports#draw)\>

Fetches a Draw from the DrawBuffer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `drawId` | `number` | the draw id of the Draw to fetch |

#### Returns

`Promise`<[`Draw`](../Exports#draw)\>

the Draw

#### Defined in

[src/PrizeDistributor.ts:494](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L494)

___

### getDrawBufferContract

▸ **getDrawBufferContract**(): `Promise`<`Contract`\>

Fetches the address of the DrawBuffer and caches the ethers Contract for the DrawBuffer.

#### Returns

`Promise`<`Contract`\>

an ethers Contract for the DrawBuffer related to this PrizeDistributor

#### Defined in

[src/PrizeDistributor.ts:772](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L772)

___

### getDrawCalculatorContract

▸ **getDrawCalculatorContract**(): `Promise`<`Contract`\>

Fetches the address of the DrawCalculator and caches the ethers Contract for the DrawCalculator

#### Returns

`Promise`<`Contract`\>

an ethers Contract for the DrawCalculator related to this PrizeDistributor

#### Defined in

[src/PrizeDistributor.ts:749](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L749)

___

### getDrawIdsFromDrawBuffer

▸ **getDrawIdsFromDrawBuffer**(): `Promise`<`number`[]\>

Fetches the range of draw ids that are available in the DrawBuffer.

#### Returns

`Promise`<`number`[]\>

a list of draw ids in the buffer

#### Defined in

[src/PrizeDistributor.ts:355](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L355)

___

### getDrawIdsFromPrizeDistributionBuffer

▸ **getDrawIdsFromPrizeDistributionBuffer**(): `Promise`<`number`[]\>

Fetches the range of draw ids for the prize distributions that are available in the PrizeDistributionBuffer.

#### Returns

`Promise`<`number`[]\>

a list of draw ids in the buffer

#### Defined in

[src/PrizeDistributor.ts:380](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L380)

___

### getDraws

▸ **getDraws**(`drawIds`): `Promise`<{ [drawId: number]: [`Draw`](../Exports#draw);  }\>

Fetches multiple Draws from the DrawBuffer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `drawIds` | `number`[] | a list of draw ids to fetch |

#### Returns

`Promise`<{ [drawId: number]: [`Draw`](../Exports#draw);  }\>

an object with Draws keyed by their draw ids

#### Defined in

[src/PrizeDistributor.ts:511](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L511)

___

### getDrawsAndPrizeDistributions

▸ **getDrawsAndPrizeDistributions**(`drawIds`): `Promise`<{ [drawId: number]: { `draw`: [`Draw`](../Exports#draw) ; `prizeDistribution`: [`PrizeDistribution`](../Exports#prizedistribution)  };  }\>

Fetches Draws and PrizeDistributions from their respective buffers for the provided list of draw ids.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `drawIds` | `number`[] | the list of draw ids to fetch Draws and PrizeDistributions for |

#### Returns

`Promise`<{ [drawId: number]: { `draw`: [`Draw`](../Exports#draw) ; `prizeDistribution`: [`PrizeDistribution`](../Exports#prizedistribution)  };  }\>

an object full of Draws and PrizeDistributions keyed by their draw id

#### Defined in

[src/PrizeDistributor.ts:459](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L459)

___

### getNewestDraw

▸ **getNewestDraw**(): `Promise`<[`Draw`](../Exports#draw)\>

Fetches the newest Draw in the DrawBuffer related to the PrizeDistributor.
NOTE: Will throw an error if the buffer is empty.

#### Returns

`Promise`<[`Draw`](../Exports#draw)\>

the newest draw in the draw buffer

#### Defined in

[src/PrizeDistributor.ts:250](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L250)

___

### getNewestPrizeDistribution

▸ **getNewestPrizeDistribution**(): `Promise`<{ `drawId`: `number` ; `prizeDistribution`: [`PrizeDistribution`](../Exports#prizedistribution)  }\>

Fetches the newest PrizeDistribution in the PrizeDistributionBuffer related to the PrizeDistributor.
NOTE: Will throw an error if the buffer is empty.

#### Returns

`Promise`<{ `drawId`: `number` ; `prizeDistribution`: [`PrizeDistribution`](../Exports#prizedistribution)  }\>

the newest prize distribution in the prize distribution buffer

#### Defined in

[src/PrizeDistributor.ts:285](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L285)

___

### getOldestDraw

▸ **getOldestDraw**(): `Promise`<[`Draw`](../Exports#draw)\>

Fetches the oldest Draw in the DrawBuffer related to the PrizeDistributor.

#### Returns

`Promise`<[`Draw`](../Exports#draw)\>

the oldest draw in the draw buffer

#### Defined in

[src/PrizeDistributor.ts:267](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L267)

___

### getOldestPrizeDistribution

▸ **getOldestPrizeDistribution**(): `Promise`<{ `drawId`: `number` ; `prizeDistribution`: [`PrizeDistribution`](../Exports#prizedistribution)  }\>

Fetches the oldest PrizeDistribution in the PrizeDistributionBuffer related to the PrizeDistributor.

#### Returns

`Promise`<{ `drawId`: `number` ; `prizeDistribution`: [`PrizeDistribution`](../Exports#prizedistribution)  }\>

the oldest prize distribution in the prize distribution buffer

#### Defined in

[src/PrizeDistributor.ts:312](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L312)

___

### getPrizeDistribution

▸ **getPrizeDistribution**(`drawId`): `Promise`<[`PrizeDistribution`](../Exports#prizedistribution)\>

Fetches a PrizeDistribution from the PrizeDistributionBuffer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `drawId` | `number` | the draw id for the PrizeDistribution to fetch |

#### Returns

`Promise`<[`PrizeDistribution`](../Exports#prizedistribution)\>

the PrizeDistribution

#### Defined in

[src/PrizeDistributor.ts:535](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L535)

___

### getPrizeDistributions

▸ **getPrizeDistributions**(`drawIds`): `Promise`<{ [drawId: number]: [`PrizeDistribution`](../Exports#prizedistribution);  }\>

Fetches multiple PrizeDistributions from the PrizeDistributionBuffer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `drawIds` | `number`[] | a list of draw ids to fetch PrizeDistributions for |

#### Returns

`Promise`<{ [drawId: number]: [`PrizeDistribution`](../Exports#prizedistribution);  }\>

an object with PrizeDistributions keyed by draw ids

#### Defined in

[src/PrizeDistributor.ts:558](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L558)

___

### getPrizeDistributionsBufferContract

▸ **getPrizeDistributionsBufferContract**(): `Promise`<`Contract`\>

Fetches the address of the PrizeDistributionsBuffer and caches the ethers Contract for the PrizeDistributionsBuffer.

#### Returns

`Promise`<`Contract`\>

an ethers Contract for the PrizeDistributionsBuffer related to this PrizeDistributor

#### Defined in

[src/PrizeDistributor.ts:785](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L785)

___

### getTimelockDrawId

▸ **getTimelockDrawId**(): `Promise`<{ `drawId`: `number` ; `endTimeSeconds`: `BigNumber`  }\>

Fetches the id and end time stamp of the draw that is currently in the DrawCalcluatorTimelock.

#### Returns

`Promise`<{ `drawId`: `number` ; `endTimeSeconds`: `BigNumber`  }\>

the draw id and the end time as a unix time stamp in seconds

#### Defined in

[src/PrizeDistributor.ts:339](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L339)

___

### getTokenContract

▸ **getTokenContract**(): `Promise`<`Contract`\>

Fetches the address of the Token that is distributed by this PrizeDistributor and caches the ethers Contract for the ERC20 Token.

#### Returns

`Promise`<`Contract`\>

an ethers Contract for the ERC20 Token related to this PrizeDistributor

#### Defined in

[src/PrizeDistributor.ts:802](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L802)

___

### getTokenData

▸ **getTokenData**(): `Promise`<[`TokenData`](../Interfaces/TokenData )\>

Fetches decimals, name and symbol for the Token that will be distributed.

#### Returns

`Promise`<[`TokenData`](../Interfaces/TokenData )\>

the decimals, name and symbol for the token

#### Defined in

[src/PrizeDistributor.ts:240](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L240)

___

### getUsersAddress

▸ **getUsersAddress**(`errorPrefix?`): `Promise`<`string`\>

Returns the users address of the provided Signer.
PrizeDistributor must be initialized with a Signer.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `errorPrefix` | `string` | `'PrizeDistributors [getUsersAddress] |'` | the class and function name of where the error occurred |

#### Returns

`Promise`<`string`\>

the address of the user

#### Defined in

[src/PrizeDistributor.ts:833](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L833)

___

### getUsersClaimedAmount

▸ **getUsersClaimedAmount**(`usersAddress`, `drawId`): `Promise`<`BigNumber`\>

Fetches the amount of tokens a user claimed for a draw.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `usersAddress` | `string` | the address of the user to check |
| `drawId` | `number` | the draw id to check |

#### Returns

`Promise`<`BigNumber`\>

the amount a user claimed

#### Defined in

[src/PrizeDistributor.ts:589](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L589)

___

### getUsersClaimedAmounts

▸ **getUsersClaimedAmounts**(`usersAddress`, `drawIds`): `Promise`<{ [drawId: number]: `BigNumber`;  }\>

Fetches the amount of tokens a user claimed for multiple draws.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `usersAddress` | `string` | the address of the user to check |
| `drawIds` | `number`[] | a list of draw ids to check |

#### Returns

`Promise`<{ [drawId: number]: `BigNumber`;  }\>

an object of claimed amounts keyed by the draw ids

#### Defined in

[src/PrizeDistributor.ts:606](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L606)

___

### getUsersDrawResultsForDrawId

▸ **getUsersDrawResultsForDrawId**(`usersAddress`, `drawId`, `maxPicksPerUser`): `Promise`<[`DrawResults`](../Exports#drawresults)\>

Fetches the claimable prizes a user won for a specific Draw.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `usersAddress` | `string` | the users address to fetch prizes for |
| `drawId` | `number` | the draw id to fetch prizes for |
| `maxPicksPerUser` | `number` | the maximum number of picks per user from the matching prize distribution |

#### Returns

`Promise`<[`DrawResults`](../Exports#drawresults)\>

the results for user for the provided draw

#### Defined in

[src/PrizeDistributor.ts:649](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L649)

___

### getUsersDrawResultsForDrawIds

▸ **getUsersDrawResultsForDrawIds**(`usersAddress`, `drawIds`, `maxPicksPerUserPerDraw`): `Promise`<{ [drawId: number]: [`DrawResults`](../Exports#drawresults);  }\>

Fetches the claimable prizes a user won for multiple Draws.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `usersAddress` | `string` | the users address to fetch prizes for |
| `drawIds` | `number`[] | the draw ids to fetch prizes for |
| `maxPicksPerUserPerDraw` | `number`[] | the maximum number of picks per user from the matching prize distribution for each draw |

#### Returns

`Promise`<{ [drawId: number]: [`DrawResults`](../Exports#drawresults);  }\>

the results for user for the provided draw

#### Defined in

[src/PrizeDistributor.ts:670](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L670)

___

### getUsersNormalizedBalancesForDrawIds

▸ **getUsersNormalizedBalancesForDrawIds**(`usersAddress`, `drawIds`): `Promise`<{ [drawId: number]: `BigNumber`;  }\>

Fetches a users normalized balance for several draw ids.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `usersAddress` | `string` | the address of a user to fetch normalized balances for |
| `drawIds` | `number`[] | a list of draw ids to fetch normalized balances for |

#### Returns

`Promise`<{ [drawId: number]: `BigNumber`;  }\>

an object of normalized balances keyed by draw ids

#### Defined in

[src/PrizeDistributor.ts:627](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L627)

___

### getValidDrawIds

▸ **getValidDrawIds**(): `Promise`<`number`[]\>

Gets the list of draw ids of draws that have are available in both the DrawBuffer and PrizeDistributionBuffer.

#### Returns

`Promise`<`number`[]\>

a list of draw ids in both buffers

#### Defined in

[src/PrizeDistributor.ts:411](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L411)

___

### id

▸ **id**(): `string`

Returns a unique id string for this PrizeDistributor.

#### Returns

`string`

a unique id for the PrizeDistributor

#### Defined in

[src/PrizeDistributor.ts:112](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L112)

___

### validateIsSigner

▸ **validateIsSigner**(`errorPrefix`): `Promise`<`void`\>

Validates that the data provided for providerOrSigner is a Signer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `errorPrefix` | `string` | the class and function name of where the error occurred |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/PrizeDistributor.ts:852](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L852)

___

### validateSignerNetwork

▸ **validateSignerNetwork**(`errorPrefix`): `Promise`<`void`\>

Validates that a Signer is on the network the PrizeDistributor is deployed on.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `errorPrefix` | `string` | the class and function name of where the error occurred |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/PrizeDistributor.ts:844](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeDistributor.ts#L844)
