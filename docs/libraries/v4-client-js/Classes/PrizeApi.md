#   PrizeApi

PoolTogether Prize API.
Provides easy access to PoolTogether Prize APIs.

## Table of contents

### Constructors

- [constructor](PrizeApi#constructor)

### Methods

- [checkPrizeApiStatus](PrizeApi#checkprizeapistatus)
- [computeDrawResults](PrizeApi#computedrawresults)
- [computeDrawResultsOnCloudFlareWorker](PrizeApi#computedrawresultsoncloudflareworker)
- [getCloudFlareDrawResultsUrl](PrizeApi#getcloudflaredrawresultsurl)
- [getDrawResultsFromPrizeApi](PrizeApi#getdrawresultsfromprizeapi)
- [getDrawResultsStatusUrl](PrizeApi#getdrawresultsstatusurl)
- [getDrawResultsUrl](PrizeApi#getdrawresultsurl)
- [getUsersDrawResultsByDraw](PrizeApi#getusersdrawresultsbydraw)
- [getUsersDrawResultsByDraws](PrizeApi#getusersdrawresultsbydraws)

## Constructors

### constructor

• **new PrizeApi**()

## Methods

### checkPrizeApiStatus

▸ `Static` **checkPrizeApiStatus**(`chainId`, `prizeDistributorAddress`, `drawId`): `Promise`<`boolean`\>

Checks the status of a particular draw and returns true if the data is available for the requested draw.

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `prizeDistributorAddress` | `string` |
| `drawId` | `number` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/PrizeApi.ts:294](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeApi.ts#L294)

___

### computeDrawResults

▸ `Static` **computeDrawResults**(`chainId`, `usersAddress`, `prizeDistributorAddress`, `drawId`): `Promise`<[`DrawResults`](../Exports#drawresults)\>

Computes the users prizes locally.
NOTE: This is a heavy calculation and not recommended on users devices.

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `usersAddress` | `string` |
| `prizeDistributorAddress` | `string` |
| `drawId` | `number` |

#### Returns

`Promise`<[`DrawResults`](../Exports#drawresults)\>

#### Defined in

[src/PrizeApi.ts:190](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeApi.ts#L190)

___

### computeDrawResultsOnCloudFlareWorker

▸ `Static` **computeDrawResultsOnCloudFlareWorker**(`chainId`, `usersAddress`, `prizeDistributorAddress`, `drawId`): `Promise`<[`DrawResults`](../Exports#drawresults)\>

Computes the users prizes in a CloudFlare worker.

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `usersAddress` | `string` |
| `prizeDistributorAddress` | `string` |
| `drawId` | `number` |

#### Returns

`Promise`<[`DrawResults`](../Exports#drawresults)\>

#### Defined in

[src/PrizeApi.ts:163](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeApi.ts#L163)

___

### getCloudFlareDrawResultsUrl

▸ `Static` **getCloudFlareDrawResultsUrl**(`chainId`, `prizeDistributorAddress`, `usersAddress`, `drawId`): `string`

Returns the URL that the prizes can be calculated at on CloudFlare

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `prizeDistributorAddress` | `string` |
| `usersAddress` | `string` |
| `drawId` | `number` |

#### Returns

`string`

#### Defined in

[src/PrizeApi.ts:362](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeApi.ts#L362)

___

### getDrawResultsFromPrizeApi

▸ `Static` **getDrawResultsFromPrizeApi**(`chainId`, `usersAddress`, `prizeDistributorAddress`, `drawId`, `maxPicksPerUser`): `Promise`<[`DrawResults`](../Exports#drawresults)\>

Fetches precomputed prizes from the Prize API.
The Prize API only supports a limited set of networks, see https://dev.pooltogether.com/protocol/api/prize-api for more info.

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `usersAddress` | `string` |
| `prizeDistributorAddress` | `string` |
| `drawId` | `number` |
| `maxPicksPerUser` | `number` |

#### Returns

`Promise`<[`DrawResults`](../Exports#drawresults)\>

#### Defined in

[src/PrizeApi.ts:131](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeApi.ts#L131)

___

### getDrawResultsStatusUrl

▸ `Static` **getDrawResultsStatusUrl**(`chainId`, `prizeDistributorAddress`, `drawId`): `string`

Returns the URL for the status of the calculations for the draw requested from the Prize API

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `prizeDistributorAddress` | `string` |
| `drawId` | `number` |

#### Returns

`string`

#### Defined in

[src/PrizeApi.ts:346](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeApi.ts#L346)

___

### getDrawResultsUrl

▸ `Static` **getDrawResultsUrl**(`chainId`, `prizeDistributorAddress`, `usersAddress`, `drawId`): `string`

Returns the URL for pre-calculated prizes from the Prize API
TODO: Fix the casing functions once Kames fixes the bug

#### Parameters

| Name | Type |
| :------ | :------ |
| `chainId` | `number` |
| `prizeDistributorAddress` | `string` |
| `usersAddress` | `string` |
| `drawId` | `number` |

#### Returns

`string`

#### Defined in

[src/PrizeApi.ts:329](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeApi.ts#L329)

___

### getUsersDrawResultsByDraw

▸ `Static` **getUsersDrawResultsByDraw**(`chainId`, `usersAddress`, `prizeDistributorAddress`, `drawId`, `maxPicksPerUser`): `Promise`<[`DrawResults`](../Exports#drawresults)\>

Fetches a users DrawResults for the provided draw id

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | `number` | the chain id the PrizeDistributor is deployed on |
| `usersAddress` | `string` | the address of the user to fetch draw results for |
| `prizeDistributorAddress` | `string` | the address of the PrizeDistributor to fetch prizes for |
| `drawId` | `number` | the id of the draw to check |
| `maxPicksPerUser` | `number` | the maximum number of picks per user |

#### Returns

`Promise`<[`DrawResults`](../Exports#drawresults)\>

#### Defined in

[src/PrizeApi.ts:38](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeApi.ts#L38)

___

### getUsersDrawResultsByDraws

▸ `Static` **getUsersDrawResultsByDraws**(`chainId`, `usersAddress`, `prizeDistributorAddress`, `drawIds`, `maxPicksPerUserPerDraw`): `Promise`<{ [drawId: number]: [`DrawResults`](../Exports#drawresults);  }\>

Fetches a users DrawResults for the provided draw ids.
Checks the status of the Prize API, falls back to the CloudFlare worker if Prize API status is invalid.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | `number` | the chain id the PrizeDistributor is deployed on |
| `usersAddress` | `string` | the address of the user to fetch draw results for |
| `prizeDistributorAddress` | `string` | the address of the PrizeDistributor to fetch prizes for |
| `drawIds` | `number`[] | a list of draw ids to check for prizes |
| `maxPicksPerUserPerDraw` | `number`[] | the maximum number of picks per user for each drwa |

#### Returns

`Promise`<{ [drawId: number]: [`DrawResults`](../Exports#drawresults);  }\>

#### Defined in

[src/PrizeApi.ts:64](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/PrizeApi.ts#L64)
