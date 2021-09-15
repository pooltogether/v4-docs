


## Functions
### _awardPrizeSplitAmount
```solidity
  function _awardPrizeSplitAmount(
    address target,
    uint256 amount,
    uint8 tokenIndex
  ) internal
```
Mints ticket or sponsorship tokens to prize split recipient.

Mints ticket or sponsorship tokens to prize split recipient via the linked PrizePool contract.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`target` | address | Recipient of minted tokens
|`amount` | uint256 | Amount of minted tokens
|`tokenIndex` | uint8 | Index (0 or 1) of a token in the prizePool.tokens mapping

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

### _getPrizeSplitAmount
```solidity
  function _getPrizeSplitAmount(
    uint256 amount,
    uint16 percentage
  ) internal returns (uint256)
```
Calculate single prize split distribution amount.

Calculate single prize split distribution amount using the total prize amount and prize split percentage.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`amount` | uint256 | Total prize award distribution amount
|`percentage` | uint16 | Percentage with single decimal precision using 0-1000 ranges

### _totalPrizeSplitPercentageAmount
```solidity
  function _totalPrizeSplitPercentageAmount(
  ) internal returns (uint256)
```
Calculates total prize split percentage amount.

Calculates total PrizeSplitConfig percentage(s) amount. Used to check the total does not exceed 100% of award distribution.


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Total`|  | prize split(s) percentage amount
### _distributePrizeSplits
```solidity
  function _distributePrizeSplits(
    uint256 prize
  ) internal returns (uint256)
```
Distributes prize split(s).

Distributes prize split(s) by awarding ticket or sponsorship tokens.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`prize` | uint256 | Starting prize award amount

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Total`| uint256 | prize award distribution amount exlcuding the awarded prize split(s)
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
