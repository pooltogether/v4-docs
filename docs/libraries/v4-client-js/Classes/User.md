[@pooltogether/v4-client-js](../) / [Exports](../modules) / User

# Class: User

A User for a PrizePool.
Provides read & write functionality for a Prize Pool. Reads use the provider from the PrizePool. Writes use the signer from the contructor. Throws an error if a write is triggered with a signer that does not match the network of the Prize Pool.

## Hierarchy

- [`PrizePool`](PrizePool)

  ↳ **`User`**

## Table of contents

### Constructors

- [constructor](User#constructor)

### Properties

- [address](User#address)
- [chainId](User#chainid)
- [contractMetadataList](User#contractmetadatalist)
- [prizePoolContract](User#prizepoolcontract)
- [prizePoolMetadata](User#prizepoolmetadata)
- [signer](User#signer)
- [signerOrProvider](User#signerorprovider)
- [ticketContract](User#ticketcontract)
- [ticketMetadata](User#ticketmetadata)
- [tokenContract](User#tokencontract)
- [tokenMetadata](User#tokenmetadata)

### Methods

- [approveDeposits](User#approvedeposits)
- [delegateTickets](User#delegatetickets)
- [deposit](User#deposit)
- [depositAndDelegate](User#depositanddelegate)
- [getDepositAllowance](User#getdepositallowance)
- [getTicketBalance](User#getticketbalance)
- [getTicketContract](User#getticketcontract)
- [getTicketData](User#getticketdata)
- [getTicketDelegate](User#getticketdelegate)
- [getTicketTotalSupply](User#gettickettotalsupply)
- [getTokenBalance](User#gettokenbalance)
- [getTokenContract](User#gettokencontract)
- [getTokenData](User#gettokendata)
- [getUsersDepositAllowance](User#getusersdepositallowance)
- [getUsersPrizePoolBalances](User#getusersprizepoolbalances)
- [getUsersTicketBalance](User#getusersticketbalance)
- [getUsersTicketDelegate](User#getusersticketdelegate)
- [getUsersTicketTwabAt](User#getuserstickettwabat)
- [getUsersTokenBalance](User#getuserstokenbalance)
- [id](User#id)
- [selfDelegateTickets](User#selfdelegatetickets)
- [validateSignerNetwork](User#validatesignernetwork)
- [withdraw](User#withdraw)

## Constructors

### constructor

• **new User**(`prizePoolMetadata`, `signer`, `prizePool`)

Creates an instance of a User for a specific PrizePool

#### Parameters

| Name                | Type                                 | Description                                  |
| :------------------ | :----------------------------------- | :------------------------------------------- |
| `prizePoolMetadata` | [`Contract`](../interfaces/Contract) | -                                            |
| `signer`            | `Signer`                             | signer to submit transactions with           |
| `prizePool`         | [`PrizePool`](PrizePool)             | PrizePool that the User should interact with |

#### Overrides

[PrizePool](PrizePool).[constructor](PrizePool#constructor)

#### Defined in

[src/User.ts:24](https://github.com/pooltogether/v4-client-js/blob/d352428/src/User.ts#L24)

## Properties

### address

• `Readonly` **address**: `string`

#### Inherited from

[PrizePool](PrizePool).[address](PrizePool#address)

#### Defined in

[src/PrizePool.ts:30](https://github.com/pooltogether/v4-client-js/blob/d352428/src/PrizePool.ts#L30)

---

### chainId

• `Readonly` **chainId**: `number`

#### Inherited from

[PrizePool](PrizePool).[chainId](PrizePool#chainid)

#### Defined in

[src/PrizePool.ts:29](https://github.com/pooltogether/v4-client-js/blob/d352428/src/PrizePool.ts#L29)

---

### contractMetadataList

• `Readonly` **contractMetadataList**: [`Contract`](../interfaces/Contract)[]

#### Inherited from

[PrizePool](PrizePool).[contractMetadataList](PrizePool#contractmetadatalist)

#### Defined in

[src/PrizePool.ts:27](https://github.com/pooltogether/v4-client-js/blob/d352428/src/PrizePool.ts#L27)

---

### prizePoolContract

• `Readonly` **prizePoolContract**: `Contract`

#### Inherited from

[PrizePool](PrizePool).[prizePoolContract](PrizePool#prizepoolcontract)

#### Defined in

[src/PrizePool.ts:38](https://github.com/pooltogether/v4-client-js/blob/d352428/src/PrizePool.ts#L38)

---

### prizePoolMetadata

• `Readonly` **prizePoolMetadata**: [`Contract`](../interfaces/Contract)

#### Inherited from

[PrizePool](PrizePool).[prizePoolMetadata](PrizePool#prizepoolmetadata)

#### Defined in

[src/PrizePool.ts:33](https://github.com/pooltogether/v4-client-js/blob/d352428/src/PrizePool.ts#L33)

---

### signer

• `Readonly` **signer**: `Signer`

#### Defined in

[src/User.ts:17](https://github.com/pooltogether/v4-client-js/blob/d352428/src/User.ts#L17)

---

### signerOrProvider

• `Readonly` **signerOrProvider**: `Signer` \| `Provider`

#### Inherited from

[PrizePool](PrizePool).[signerOrProvider](PrizePool#signerorprovider)

#### Defined in

[src/PrizePool.ts:28](https://github.com/pooltogether/v4-client-js/blob/d352428/src/PrizePool.ts#L28)

---

### ticketContract

• **ticketContract**: `undefined` \| `Contract`

#### Inherited from

[PrizePool](PrizePool).[ticketContract](PrizePool#ticketcontract)

#### Defined in

[src/PrizePool.ts:39](https://github.com/pooltogether/v4-client-js/blob/d352428/src/PrizePool.ts#L39)

---

### ticketMetadata

• **ticketMetadata**: `undefined` \| [`Contract`](../interfaces/Contract)

#### Inherited from

[PrizePool](PrizePool).[ticketMetadata](PrizePool#ticketmetadata)

#### Defined in

[src/PrizePool.ts:34](https://github.com/pooltogether/v4-client-js/blob/d352428/src/PrizePool.ts#L34)

---

### tokenContract

• **tokenContract**: `undefined` \| `Contract`

#### Inherited from

[PrizePool](PrizePool).[tokenContract](PrizePool#tokencontract)

#### Defined in

[src/PrizePool.ts:40](https://github.com/pooltogether/v4-client-js/blob/d352428/src/PrizePool.ts#L40)

---

### tokenMetadata

• **tokenMetadata**: `undefined` \| [`Contract`](../interfaces/Contract)

#### Inherited from

[PrizePool](PrizePool).[tokenMetadata](PrizePool#tokenmetadata)

#### Defined in

[src/PrizePool.ts:35](https://github.com/pooltogether/v4-client-js/blob/d352428/src/PrizePool.ts#L35)

## Methods

### approveDeposits

▸ **approveDeposits**(`amountUnformatted?`, `overrides?`): `Promise`<`TransactionResponse`\>

Submits a transaction to set an allowance for deposits into the Prize Pool.

#### Parameters

| Name                 | Type        | Description                                                       |
| :------------------- | :---------- | :---------------------------------------------------------------- |
| `amountUnformatted?` | `BigNumber` | an unformatted and decimal shifted amount to approve for deposits |
| `overrides?`         | `Overrides` | optional overrides for the transaction creation                   |

#### Returns

`Promise`<`TransactionResponse`\>

the transaction response

#### Defined in

[src/User.ts:111](https://github.com/pooltogether/v4-client-js/blob/d352428/src/User.ts#L111)

---

### delegateTickets

▸ **delegateTickets**(`address`, `overrides?`): `Promise`<`TransactionResponse`\>

Delegates the users ticket chance to the provided address

#### Parameters

| Name         | Type        | Description                                     |
| :----------- | :---------- | :---------------------------------------------- |
| `address`    | `string`    | the address to delegate to                      |
| `overrides?` | `Overrides` | optional overrides for the transaction creation |

#### Returns

`Promise`<`TransactionResponse`\>

the transaction response

#### Defined in

[src/User.ts:150](https://github.com/pooltogether/v4-client-js/blob/d352428/src/User.ts#L150)

---

### deposit

▸ **deposit**(`amountUnformatted`, `overrides?`): `Promise`<`TransactionResponse`\>

Submits a transaction to deposit a controlled token into the Prize Pool to the Signer.

#### Parameters

| Name                | Type        | Description                                                              |
| :------------------ | :---------- | :----------------------------------------------------------------------- |
| `amountUnformatted` | `BigNumber` | an unformatted and decimal shifted amount to deposit from the prize pool |
| `overrides?`        | `Overrides` | optional overrides for the transaction creation                          |

#### Returns

`Promise`<`TransactionResponse`\>

the transaction response

#### Defined in

[src/User.ts:59](https://github.com/pooltogether/v4-client-js/blob/d352428/src/User.ts#L59)

---

### depositAndDelegate

▸ **depositAndDelegate**(`amountUnformatted`, `to?`, `overrides?`): `Promise`<`TransactionResponse`\>

Submits a transaction to deposit a controlled token into the Prize Pool to the Signer.

#### Parameters

| Name                | Type        | Description                                                              |
| :------------------ | :---------- | :----------------------------------------------------------------------- |
| `amountUnformatted` | `BigNumber` | an unformatted and decimal shifted amount to deposit from the prize pool |
| `to?`               | `string`    | -                                                                        |
| `overrides?`        | `Overrides` | optional overrides for the transaction creation                          |

#### Returns

`Promise`<`TransactionResponse`\>

the transaction response

#### Defined in

[src/User.ts:77](https://github.com/pooltogether/v4-client-js/blob/d352428/src/User.ts#L77)

---

### getDepositAllowance

▸ **getDepositAllowance**(): `Promise`<{ `allowanceUnformatted`: `BigNumber` ; `isApproved`: `boolean` = !allowanceUnformatted.isZero() }\>

Fetches the allowance the User has for depositing into the Prize Pool.

#### Returns

`Promise`<{ `allowanceUnformatted`: `BigNumber` ; `isApproved`: `boolean` = !allowanceUnformatted.isZero() }\>

the allowance the user has set for deposits

#### Defined in

[src/User.ts:187](https://github.com/pooltogether/v4-client-js/blob/d352428/src/User.ts#L187)

---

### getTicketBalance

▸ **getTicketBalance**(): `Promise`<`BigNumber`\>

Fetches the Users ticket balance.

#### Returns

`Promise`<`BigNumber`\>

the users ticket balance

#### Defined in

[src/User.ts:169](https://github.com/pooltogether/v4-client-js/blob/d352428/src/User.ts#L169)

---

### getTicketContract

▸ **getTicketContract**(): `Promise`<`Contract`\>

Fetches the addresses to build an instance of an ethers Contract for the Ticket

#### Returns

`Promise`<`Contract`\>

an ethers contract for the ticket

#### Inherited from

[PrizePool](PrizePool).[getTicketContract](PrizePool#getticketcontract)

#### Defined in

[src/PrizePool.ts:273](https://github.com/pooltogether/v4-client-js/blob/d352428/src/PrizePool.ts#L273)

---

### getTicketData

▸ **getTicketData**(): `Promise`<[`TokenData`](../interfaces/TokenData)\>

Fetches decimals, name and symbol for the Ticket.

#### Returns

`Promise`<[`TokenData`](../interfaces/TokenData)\>

decimals, name and symbol for the ticket

#### Inherited from

[PrizePool](PrizePool).[getTicketData](PrizePool#getticketdata)

#### Defined in

[src/PrizePool.ts:201](https://github.com/pooltogether/v4-client-js/blob/d352428/src/PrizePool.ts#L201)

---

### getTicketDelegate

▸ **getTicketDelegate**(): `Promise`<`string`\>

Fetches the address the user has delegated to

#### Returns

`Promise`<`string`\>

the address the user has delegated to

#### Defined in

[src/User.ts:196](https://github.com/pooltogether/v4-client-js/blob/d352428/src/User.ts#L196)

---

### getTicketTotalSupply

▸ **getTicketTotalSupply**(): `Promise`<`BigNumber`\>

Fetches total supply for the Ticket.

#### Returns

`Promise`<`BigNumber`\>

the total supply of the ticket

#### Inherited from

[PrizePool](PrizePool).[getTicketTotalSupply](PrizePool#gettickettotalsupply)

#### Defined in

[src/PrizePool.ts:213](https://github.com/pooltogether/v4-client-js/blob/d352428/src/PrizePool.ts#L213)

---

### getTokenBalance

▸ **getTokenBalance**(): `Promise`<`BigNumber`\>

Fetches the Users token (underlying token) balance.

#### Returns

`Promise`<`BigNumber`\>

the users underlying token balance

#### Defined in

[src/User.ts:178](https://github.com/pooltogether/v4-client-js/blob/d352428/src/User.ts#L178)

---

### getTokenContract

▸ **getTokenContract**(): `Promise`<`Contract`\>

Fetches the addresses to build an instance of an ethers Contract for the underlying Token

#### Returns

`Promise`<`Contract`\>

an ethers contract for the underlying token

#### Inherited from

[PrizePool](PrizePool).[getTokenContract](PrizePool#gettokencontract)

#### Defined in

[src/PrizePool.ts:296](https://github.com/pooltogether/v4-client-js/blob/d352428/src/PrizePool.ts#L296)

---

### getTokenData

▸ **getTokenData**(): `Promise`<[`TokenData`](../interfaces/TokenData)\>

Fetches decimals, name and symbol for the underling Token.

#### Returns

`Promise`<[`TokenData`](../interfaces/TokenData)\>

decimals, name and symbol for the underling token

#### Inherited from

[PrizePool](PrizePool).[getTokenData](PrizePool#gettokendata)

#### Defined in

[src/PrizePool.ts:189](https://github.com/pooltogether/v4-client-js/blob/d352428/src/PrizePool.ts#L189)

---

### getUsersDepositAllowance

▸ **getUsersDepositAllowance**(`usersAddress`): `Promise`<{ `allowanceUnformatted`: `BigNumber` ; `isApproved`: `boolean` = !allowanceUnformatted.isZero() }\>

Fetches a users deposit allowance for the Prize Pool.

#### Parameters

| Name           | Type     | Description                                    |
| :------------- | :------- | :--------------------------------------------- |
| `usersAddress` | `string` | the address to fetch the deposit allowance for |

#### Returns

`Promise`<{ `allowanceUnformatted`: `BigNumber` ; `isApproved`: `boolean` = !allowanceUnformatted.isZero() }\>

the amount the user has approved for deposits

#### Inherited from

[PrizePool](PrizePool).[getUsersDepositAllowance](PrizePool#getusersdepositallowance)

#### Defined in

[src/PrizePool.ts:159](https://github.com/pooltogether/v4-client-js/blob/d352428/src/PrizePool.ts#L159)

---

### getUsersPrizePoolBalances

▸ **getUsersPrizePoolBalances**(`usersAddress`): `Promise`<[`PrizePoolTokenBalances`](../interfaces/PrizePoolTokenBalances)\>

Fetches a users balances for the Prize Pool underlying Token and Ticket.

#### Parameters

| Name           | Type     | Description                             |
| :------------- | :------- | :-------------------------------------- |
| `usersAddress` | `string` | the users address to fetch balances for |

#### Returns

`Promise`<[`PrizePoolTokenBalances`](../interfaces/PrizePoolTokenBalances)\>

the users balances for the underlying deposit token and the ticket token

#### Inherited from

[PrizePool](PrizePool).[getUsersPrizePoolBalances](PrizePool#getusersprizepoolbalances)

#### Defined in

[src/PrizePool.ts:93](https://github.com/pooltogether/v4-client-js/blob/d352428/src/PrizePool.ts#L93)

---

### getUsersTicketBalance

▸ **getUsersTicketBalance**(`usersAddress`): `Promise`<`BigNumber`\>

Fetches a users balance for the Prize Pools Ticket.

#### Parameters

| Name           | Type     | Description                          |
| :------------- | :------- | :----------------------------------- |
| `usersAddress` | `string` | the address to fetch the balance for |

#### Returns

`Promise`<`BigNumber`\>

the users ticket balance

#### Inherited from

[PrizePool](PrizePool).[getUsersTicketBalance](PrizePool#getusersticketbalance)

#### Defined in

[src/PrizePool.ts:114](https://github.com/pooltogether/v4-client-js/blob/d352428/src/PrizePool.ts#L114)

---

### getUsersTicketDelegate

▸ **getUsersTicketDelegate**(`usersAddress`): `Promise`<`string`\>

Fetches the address a user has delegated to.

#### Parameters

| Name           | Type     | Description                           |
| :------------- | :------- | :------------------------------------ |
| `usersAddress` | `string` | the address to fetch the delegate for |

#### Returns

`Promise`<`string`\>

the address a user has delegated to

#### Inherited from

[PrizePool](PrizePool).[getUsersTicketDelegate](PrizePool#getusersticketdelegate)

#### Defined in

[src/PrizePool.ts:176](https://github.com/pooltogether/v4-client-js/blob/d352428/src/PrizePool.ts#L176)

---

### getUsersTicketTwabAt

▸ **getUsersTicketTwabAt**(`usersAddress`, `unixTimestamp`): `Promise`<`BigNumber`\>

Fetches a users Ticket TWAB at a specific unix timestamp.

#### Parameters

| Name            | Type     | Description                              |
| :-------------- | :------- | :--------------------------------------- |
| `usersAddress`  | `string` | the address to fetch the ticket TWAB for |
| `unixTimestamp` | `number` | the unix timestamp to fetch in seconds   |

#### Returns

`Promise`<`BigNumber`\>

the users TWAB at the requested time

#### Inherited from

[PrizePool](PrizePool).[getUsersTicketTwabAt](PrizePool#getuserstickettwabat)

#### Defined in

[src/PrizePool.ts:129](https://github.com/pooltogether/v4-client-js/blob/d352428/src/PrizePool.ts#L129)

---

### getUsersTokenBalance

▸ **getUsersTokenBalance**(`usersAddress`): `Promise`<`BigNumber`\>

Fetches a users balance for the Prize Pools underlying Token.

#### Parameters

| Name           | Type     | Description                          |
| :------------- | :------- | :----------------------------------- |
| `usersAddress` | `string` | the address to fetch the balance for |

#### Returns

`Promise`<`BigNumber`\>

the users token balance

#### Inherited from

[PrizePool](PrizePool).[getUsersTokenBalance](PrizePool#getuserstokenbalance)

#### Defined in

[src/PrizePool.ts:145](https://github.com/pooltogether/v4-client-js/blob/d352428/src/PrizePool.ts#L145)

---

### id

▸ **id**(): `string`

Returns a unique id string for this Prize Pool.

#### Returns

`string`

a unique id for the Prize Pool

#### Inherited from

[PrizePool](PrizePool).[id](PrizePool#id)

#### Defined in

[src/PrizePool.ts:82](https://github.com/pooltogether/v4-client-js/blob/d352428/src/PrizePool.ts#L82)

---

### selfDelegateTickets

▸ **selfDelegateTickets**(`overrides?`): `Promise`<`TransactionResponse`\>

Submits a transaction to delegate to ticket chance to the users self

#### Parameters

| Name         | Type        | Description                                     |
| :----------- | :---------- | :---------------------------------------------- |
| `overrides?` | `Overrides` | optional overrides for the transaction creation |

#### Returns

`Promise`<`TransactionResponse`\>

the transaction response

#### Defined in

[src/User.ts:132](https://github.com/pooltogether/v4-client-js/blob/d352428/src/User.ts#L132)

---

### validateSignerNetwork

▸ **validateSignerNetwork**(`errorPrefix`): `Promise`<`void`\>

Validates the provided signers network.
Throws if it does not match the expected network.

#### Parameters

| Name          | Type     | Description                                             |
| :------------ | :------- | :------------------------------------------------------ |
| `errorPrefix` | `string` | the class and function name of where the error occurred |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/User.ts:208](https://github.com/pooltogether/v4-client-js/blob/d352428/src/User.ts#L208)

---

### withdraw

▸ **withdraw**(`amountUnformatted`, `overrides?`): `Promise`<`TransactionResponse`\>

Submits a transaction to withdraw a controlled token from the Prize Pool to the Signer.

#### Parameters

| Name                | Type        | Description                                                               |
| :------------------ | :---------- | :------------------------------------------------------------------------ |
| `amountUnformatted` | `BigNumber` | an unformatted and decimal shifted amount to withdraw from the prize pool |
| `overrides?`        | `Overrides` | optional overrides for the transaction creation                           |

#### Returns

`Promise`<`TransactionResponse`\>

the transaction response

#### Defined in

[src/User.ts:38](https://github.com/pooltogether/v4-client-js/blob/d352428/src/User.ts#L38)
