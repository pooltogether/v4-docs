#   ContractFactory

An ethers Contract Factory.
Given a ContractList, the ContractFactory will initialize ethers Contracts and easily provide Providers or Signers.

## Table of contents

### Constructors

- [constructor](ContractFactory#constructor)

### Properties

- [contractList](ContractFactory#contractlist)
- [signersOrProviders](ContractFactory#signersorproviders)

### Methods

- [getContract](ContractFactory#getcontract)
- [getContractList](ContractFactory#getcontractlist)
- [getContracts](ContractFactory#getcontracts)
- [getSignerOrProvider](ContractFactory#getsignerorprovider)
- [getSignersOrProviders](ContractFactory#getsignersorproviders)

## Constructors

### constructor

• **new ContractFactory**(`signersOrProviders`, `contractList`)

Create an instance of a ContractFactory by providing Signers or Providers keyed by their chain ids and a list of contract metadata.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `signersOrProviders` | [`SignersOrProviders`](../Interfaces/SignersOrProviders ) | signers or providers keyed by their chain ids |
| `contractList` | [`ContractList`](../Interfaces/ContractList ) | a list of contract metadata |

#### Defined in

[src/ContractFactory.ts:25](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/ContractFactory.ts#L25)

## Properties

### contractList

• `Readonly` **contractList**: [`ContractList`](../Interfaces/ContractList )

#### Defined in

[src/ContractFactory.ts:17](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/ContractFactory.ts#L17)

___

### signersOrProviders

• `Readonly` **signersOrProviders**: [`SignersOrProviders`](../Interfaces/SignersOrProviders )

#### Defined in

[src/ContractFactory.ts:16](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/ContractFactory.ts#L16)

## Methods

### getContract

▸ **getContract**(`chainId`, `address`): `Contract`

Creates an ethers Contract for the contract identifier provided using the ContractList and Signers or Providers provided on initialization.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | `number` | the chain id the contract was deployed on |
| `address` | `string` | the address of the contract to create |

#### Returns

`Contract`

an ethers contract for the provided contract identifier

#### Defined in

[src/ContractFactory.ts:40](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/ContractFactory.ts#L40)

___

### getContractList

▸ **getContractList**(): [`ContractList`](../Interfaces/ContractList )

Getter for the ContractList provided on initialization.

#### Returns

[`ContractList`](../Interfaces/ContractList )

the contract list the contract factory was initialized with

#### Defined in

[src/ContractFactory.ts:87](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/ContractFactory.ts#L87)

___

### getContracts

▸ **getContracts**(`contractIdentifiers`): `Contract`[]

Creates multiple ethers Contracts for the identifiers provided using the ContractList and Signers or Providers provided on initialization.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractIdentifiers` | [`ContractIdentifier`](../Interfaces/ContractIdentifier )[] | a list of unique identifiers for contracts to create |

#### Returns

`Contract`[]

a list of ethers contracts for the provided conract identifiers

#### Defined in

[src/ContractFactory.ts:58](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/ContractFactory.ts#L58)

___

### getSignerOrProvider

▸ **getSignerOrProvider**(`chainId`): `Signer` \| `Provider`

Gets a Signer or Provider for the chain id requested from the Signers or Providers prodiced on initialization.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `chainId` | `number` | the chain id to get a signer or provider for |

#### Returns

`Signer` \| `Provider`

the signer or provider for the chain id requested

#### Defined in

[src/ContractFactory.ts:71](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/ContractFactory.ts#L71)

___

### getSignersOrProviders

▸ **getSignersOrProviders**(): [`SignersOrProviders`](../Interfaces/SignersOrProviders )

Getter for the Signers or Providers provided on initialization.

#### Returns

[`SignersOrProviders`](../Interfaces/SignersOrProviders )

the signers or providers the contract factory was initialized with

#### Defined in

[src/ContractFactory.ts:79](https://github.com/pooltogether/v4-client-js/blob/97109bb/src/ContractFactory.ts#L79)
