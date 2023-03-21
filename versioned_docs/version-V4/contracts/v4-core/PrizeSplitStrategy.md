Captures PrizePool interest for PrizeReserve and additional PrizeSplit recipients.
            The PrizeSplitStrategy will have at minimum a single PrizeSplit with 100% of the captured
            interest transfered to the PrizeReserve. Additional PrizeSplits can be added, depending on
            the deployers requirements (i.e. percentage to charity). In contrast to previous PoolTogether
            iterations, interest can be captured independent of a new Draw. Ideally (to save gas) interest
            is only captured when also distributing the captured prize(s) to applicable Prize Distributor(s).


## Structs
### `PrizeSplitConfig`
  - address target
  - uint16 percentage


## Functions
### constructor
```solidity
  function constructor(
    address _owner,
    contract IPrizePool _prizePool
  ) public
```
Deploy the PrizeSplitStrategy smart contract.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_owner` | address |     Owner address
|`_prizePool` | contract IPrizePool | PrizePool address

### distribute
```solidity
  function distribute(
  ) external returns (uint256)
```
Capture the award balance and distribute to prize splits.

   Permissionless function to initialize distribution of interst


#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint256 | Prize captured from PrizePool
### getPrizePool
```solidity
  function getPrizePool(
  ) external returns (contract IPrizePool)
```
Get PrizePool address




### getPrizeSplit
```solidity
  function getPrizeSplit(
    uint256 prizeSplitIndex
  ) external returns (struct IPrizeSplit.PrizeSplitConfig)
```
Read prize split config from active PrizeSplits.

   Read PrizeSplitConfig struct from prizeSplits array.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`prizeSplitIndex` | uint256 | Index position of PrizeSplitConfig

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| struct IPrizeSplit.PrizeSplitConfig | PrizeSplitConfig Single prize split config
### getPrizeSplits
```solidity
  function getPrizeSplits(
  ) external returns (struct IPrizeSplit.PrizeSplitConfig[])
```
Read all prize splits configs.

   Read all PrizeSplitConfig structs stored in prizeSplits.


#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| struct IPrizeSplit.PrizeSplitConfig[] | Array of PrizeSplitConfig structs
### setPrizeSplits
```solidity
  function setPrizeSplits(
    struct IPrizeSplit.PrizeSplitConfig[] newPrizeSplits
  ) external
```
Set and remove prize split(s) configs. Only callable by owner.

Set and remove prize split configs by passing a new PrizeSplitConfig structs array. Will remove existing PrizeSplitConfig(s) if passed array length is less than existing prizeSplits length.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`newPrizeSplits` | struct IPrizeSplit.PrizeSplitConfig[] | Array of PrizeSplitConfig structs

### setPrizeSplit
```solidity
  function setPrizeSplit(
    struct IPrizeSplit.PrizeSplitConfig prizeStrategySplit,
    uint8 prizeSplitIndex
  ) external
```
Updates a previously set prize split config.

Updates a prize split config by passing a new PrizeSplitConfig struct and current index position. Limited to contract owner.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`prizeStrategySplit` | struct IPrizeSplit.PrizeSplitConfig | PrizeSplitConfig config struct
|`prizeSplitIndex` | uint8 | Index position of PrizeSplitConfig to update

### owner
```solidity
  function owner(
  ) public returns (address)
```
Returns the address of the current owner.



### pendingOwner
```solidity
  function pendingOwner(
  ) external returns (address)
```
Gets current `_pendingOwner`.



#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| address | Current `_pendingOwner` address.
### renounceOwnership
```solidity
  function renounceOwnership(
  ) external
```
Renounce ownership of the contract.

Leaves the contract without owner. It will not be possible to call
`onlyOwner` functions anymore. Can only be called by the current owner.
NOTE: Renouncing ownership will leave the contract without an owner,
thereby removing any functionality that is only available to the owner.


### transferOwnership
```solidity
  function transferOwnership(
    address _newOwner
  ) external
```
Allows current owner to set the `_pendingOwner` address.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_newOwner` | address | Address to transfer ownership to.

### claimOwnership
```solidity
  function claimOwnership(
  ) external
```
Allows the `_pendingOwner` address to finalize the transfer.

This function is only callable by the `_pendingOwner`.


## Events
### Deployed
```solidity
  event Deployed(
    address owner,
    contract IPrizePool prizePool
  )
```
Deployed Event


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`owner`| address | Contract owner
|`prizePool`| contract IPrizePool | Linked PrizePool contract
### Distributed
```solidity
  event Distributed(
    uint256 totalPrizeCaptured
  )
```
Emit when a strategy captures award amount from PrizePool.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`totalPrizeCaptured`| uint256 |  Total prize captured from the PrizePool
### OwnershipOffered
```solidity
  event OwnershipOffered(
    address pendingOwner
  )
```

Emitted when `_pendingOwner` has been changed.

#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`pendingOwner`| address | new `_pendingOwner` address.
### OwnershipTransferred
```solidity
  event OwnershipTransferred(
    address previousOwner,
    address newOwner
  )
```

Emitted when `_owner` has been changed.

#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`previousOwner`| address | previous `_owner` address.
|`newOwner`| address | new `_owner` address.
### PrizeSplitAwarded
```solidity
  event PrizeSplitAwarded(
    address user,
    uint256 prizeAwarded,
    contract IControlledToken token
  )
```
Emit when an individual prize split is awarded.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`user`| address |          User address being awarded
|`prizeAwarded`| uint256 |  Awarded prize amount
|`token`| contract IControlledToken |         Token address
### PrizeSplitSet
```solidity
  event PrizeSplitSet(
    address target,
    uint16 percentage,
    uint256 index
  )
```
Emitted when a PrizeSplitConfig config is added or updated.

   Emitted when a PrizeSplitConfig config is added or updated in setPrizeSplits or setPrizeSplit.

#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`target`| address |     Address of prize split recipient
|`percentage`| uint16 | Percentage of prize split. Must be between 0 and 1000 for single decimal precision
|`index`| uint256 |      Index of prize split in the prizeSplts array
### PrizeSplitRemoved
```solidity
  event PrizeSplitRemoved(
    uint256 target
  )
```
Emitted when a PrizeSplitConfig config is removed.

   Emitted when a PrizeSplitConfig config is removed from the prizeSplits array.

#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`target`| uint256 | Index of a previously active prize split config
