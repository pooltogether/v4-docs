

## Functions
### setTwabs
```solidity
  function setTwabs(
  ) external
```




### wrapCardinality
```solidity
  function wrapCardinality(
  ) external returns (uint16)
```




### mostRecentIndex
```solidity
  function mostRecentIndex(
  ) external returns (uint16)
```




### binarySearch
```solidity
  function binarySearch(
    uint16 _twabIndex,
    uint16 _target
  ) external returns (struct TwabLibrary.Twab beforeOrAt, struct TwabLibrary.Twab atOrAfter)
```
Fetches TWABs `beforeOrAt` and `atOrAfter` a `_target`, eg: where [`beforeOrAt`, `atOrAfter`] is satisfied.
The result may be the same TWAB, or adjacent TWABs.

The answer must be contained in the array, used when the target is located within the stored TWAB.
boundaries: older than the most recent TWAB and younger, or the same age as, the oldest TWAB.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_twabIndex` | uint16 | Index of the TWAB to start searching from.
|`_target` | uint16 | Timestamp at which the reserved TWAB should be for.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`beforeOrAt`| uint16 | TWAB recorded before, or at, the target.
|`atOrAfter`| uint16 | TWAB recorded at, or after, the target.
### calculateTwab
```solidity
  function calculateTwab(
  ) external returns (struct TwabLibrary.Twab)
```




### getAverageBalanceBetween
```solidity
  function getAverageBalanceBetween(
  ) external returns (uint256)
```




### getBalanceAt
```solidity
  function getBalanceAt(
    uint32 _currentBalance,
    uint256 _target,
    uint16 _twabIndex
  ) external returns (uint256)
```
Retrieves amount at `_target` timestamp


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_currentBalance` | uint32 | Most recent amount recorded.
|`_target` | uint256 | Timestamp at which the reserved TWAB should be for.
|`_twabIndex` | uint16 | Most recent TWAB index recorded.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`uint256`| uint32 | TWAB amount at `_target`.
### nextTwab
```solidity
  function nextTwab(
    struct TwabLibrary.Twab _currentBalance
  ) external returns (struct TwabLibrary.Twab)
```
Records a new TWAB.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_currentBalance` | struct TwabLibrary.Twab | Current `amount`.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`New`| struct TwabLibrary.Twab | TWAB that was recorded.
