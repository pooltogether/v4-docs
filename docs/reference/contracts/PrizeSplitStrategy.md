

## Functions
### initialize
```solidity
  function initialize(
    contract IPrizePool _prizePool
  ) external
```
Initialize the PrizeSplitStrategy smart contract.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_prizePool` | contract IPrizePool | PrizePool contract address

### distribute
```solidity
  function distribute(
  ) external returns (uint256)
```
Capture the award balance and distribute to prize splits.

   Capture the award balance and award tokens using the linked PrizePool.


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Total`|  | prize amount captured via prizePool.captureAwardBalance()
### prizeSplits
```solidity
  function prizeSplits(
  ) external returns (struct PrizeSplit.PrizeSplitConfig[])
```
Read all prize splits configs.

Read all PrizeSplitConfig structs stored in _prizeSplits.


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`_prizeSplits`|  | Array of PrizeSplitConfig structs
### prizeSplit
```solidity
  function prizeSplit(
    uint256 prizeSplitIndex
  ) external returns (struct PrizeSplit.PrizeSplitConfig)
```
Read prize split config from active PrizeSplits.

Read PrizeSplitConfig struct from _prizeSplits array.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`prizeSplitIndex` | uint256 | Index position of PrizeSplitConfig

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`PrizeSplitConfig`| uint256 | Single prize split config
### setPrizeSplits
```solidity
  function setPrizeSplits(
    struct PrizeSplit.PrizeSplitConfig[] newPrizeSplits
  ) external
```
Set and remove prize split(s) configs.

Set and remove prize split configs by passing a new PrizeSplitConfig structs array. Will remove existing PrizeSplitConfig(s) if passed array length is less than existing _prizeSplits length.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`newPrizeSplits` | struct PrizeSplit.PrizeSplitConfig[] | Array of PrizeSplitConfig structs

### setPrizeSplit
```solidity
  function setPrizeSplit(
    struct PrizeSplit.PrizeSplitConfig prizeStrategySplit,
    uint8 prizeSplitIndex
  ) external
```
Updates a previously set prize split config.

Updates a prize split config by passing a new PrizeSplitConfig struct and current index position. Limited to contract owner.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`prizeStrategySplit` | struct PrizeSplit.PrizeSplitConfig | PrizeSplitConfig config struct
|`prizeSplitIndex` | uint8 | Index position of PrizeSplitConfig to update

### owner
```solidity
  function owner(
  ) public returns (address)
```

Returns the address of the current owner.


### renounceOwnership
```solidity
  function renounceOwnership(
  ) public
```

Leaves the contract without owner. It will not be possible to call
`onlyOwner` functions anymore. Can only be called by the current owner.
NOTE: Renouncing ownership will leave the contract without an owner,
thereby removing any functionality that is only available to the owner.


### transferOwnership
```solidity
  function transferOwnership(
  ) public
```

Transfers ownership of the contract to a new account (`newOwner`).
Can only be called by the current owner.


## Events
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
|`totalPrizeCaptured`| uint256 |  Total prize captured from PrizePool
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
|`prizeAwarded`| uint256 |  Token prize amount
|`token`| contract IControlledToken |         Token awarded address
### PrizeSplitSet
```solidity
  event PrizeSplitSet(
    address target,
    uint16 percentage,
    uint8 token,
    uint256 index
  )
```
Emitted when a PrizeSplitConfig config is added or updated.

Emitted when aPrizeSplitConfig config is added or updated in setPrizeSplits or setPrizeSplit.

#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`target`| address | Address of prize split recipient
|`percentage`| uint16 | Percentage of prize split. Must be between 0 and 1000 for single decimal precision
|`token`| uint8 | Index (0 or 1) of token in the prizePool.tokens mapping
|`index`| uint256 | Index of prize split in the prizeSplts array
### PrizeSplitRemoved
```solidity
  event PrizeSplitRemoved(
    uint256 target
  )
```
Emitted when a PrizeSplitConfig config is removed.

Emitted when a PrizeSplitConfig config is removed from the _prizeSplits array.

#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`target`| uint256 | Index of a previously active prize split config
### OwnershipTransferred
```solidity
  event OwnershipTransferred(
  )
```



