

## Functions
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

## Events
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
