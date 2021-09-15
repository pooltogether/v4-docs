This library allows you to efficiently track a user's historic balance.  You can get a



## Functions
### _minCardinality
```solidity
  function _minCardinality(
    uint16 _cardinality
  ) internal returns (uint16)
```
Ensures the passed cardinality is a minimum of 1


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_cardinality` | uint16 | The cardinality to ensure a floor of 1

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Returns`| uint16 | 1 if the given cardinality is zero, otherwise return the cardinality
### getBalanceAt
```solidity
  function getBalanceAt(
    uint16 _target
  ) internal returns (uint256)
```
Retrieves TWAB balance.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_target` | uint16 | Timestamp at which the reserved TWAB should be for.

### getAverageBalanceBetween
```solidity
  function getAverageBalanceBetween(
    uint16 _startTime,
    uint16 _endTime,
    struct TwabLibrary.Twab[65535] _time
  ) internal returns (uint256)
```
Calculates the average balance held by an Account for a given time frame.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_startTime` | uint16 | The start time of the time frame.
|`_endTime` | uint16 | The end time of the time frame.
|`_time` | struct TwabLibrary.Twab[65535] | The current time

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`| uint16 | average balance that the user held during the time frame.
### update
```solidity
  function update(
    uint224 _balance,
    uint16 _time,
    uint16 _ttl
  ) internal returns (uint16 nextTwabIndex, uint16 cardinality, struct TwabLibrary.Twab twab, bool isNew)
```
Decreases an account's balance and records a new twab.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_balance` | uint224 | The balance held since the last update
|`_time` | uint16 | The current time
|`_ttl` | uint16 | The time-to-live for TWABs. This is essentially how long twabs are kept around.  History is not available longer than the time-to-live.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`twab`| uint224 | The user's latest TWAB
|`isNew`| uint16 | Whether the TWAB is new
### wrapCardinality
```solidity
  function wrapCardinality(
    uint256 _index
  ) internal returns (uint16)
```
Returns TWAB index.

`twabs` is a circular buffer of `MAX_CARDINALITY` size equal to 32. So the array goes from 0 to 31.
In order to navigate the circular buffer, we need to use the modulo operator.
For example, if `_index` is equal to 32, `_index % MAX_CARDINALITY` will return 0 and will point to the first element of the array.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_index` | uint256 | Index used to navigate through `twabs` circular buffer.

### mostRecentIndex
```solidity
  function mostRecentIndex(
    uint256 _nextAvailableIndex,
    uint16 _cardinality
  ) internal returns (uint16)
```
Returns the index of the last recorded TWAB


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_nextAvailableIndex` | uint256 | The next available twab index.  This will be recorded to next.
|`_cardinality` | uint16 | The cardinality of the TWAB history.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`| uint256 | index of the last recorded TWAB
### binarySearch
```solidity
  function binarySearch(
    struct TwabLibrary.Twab[65535] _twabs,
    uint16 _twabIndex,
    uint16 _target
  ) internal returns (struct TwabLibrary.Twab beforeOrAt, struct TwabLibrary.Twab atOrAfter)
```
Fetches TWABs `beforeOrAt` and `atOrAfter` a `_target`, eg: where [`beforeOrAt`, `atOrAfter`] is satisfied.
The result may be the same TWAB, or adjacent TWABs.

The answer must be contained in the array, used when the target is located within the stored TWAB.
boundaries: older than the most recent TWAB and younger, or the same age as, the oldest TWAB.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_twabs` | struct TwabLibrary.Twab[65535] | List of TWABs to search through.
|`_twabIndex` | uint16 | Index of the TWAB to start searching from.
|`_target` | uint16 | Timestamp at which the reserved TWAB should be for.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`beforeOrAt`| struct TwabLibrary.Twab[65535] | TWAB recorded before, or at, the target.
|`atOrAfter`| uint16 | TWAB recorded at, or after, the target.
### calculateTwab
```solidity
  function calculateTwab(
    struct TwabLibrary.Twab[65535] _twabs
  ) internal returns (struct TwabLibrary.Twab)
```
Calculates the TWAB for a given timestamp.  It interpolates as necessary.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_twabs` | struct TwabLibrary.Twab[65535] | The TWAB history

### getAverageBalanceBetween
```solidity
  function getAverageBalanceBetween(
  ) internal returns (uint256)
```




### getBalanceAt
```solidity
  function getBalanceAt(
    struct TwabLibrary.Twab[65535] _twabs,
    uint32 _currentBalance,
    uint256 _target,
    uint16 _twabIndex
  ) internal returns (uint256)
```
Retrieves amount at `_target` timestamp


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_twabs` | struct TwabLibrary.Twab[65535] | List of TWABs to search through.
|`_currentBalance` | uint32 | Most recent amount recorded.
|`_target` | uint256 | Timestamp at which the reserved TWAB should be for.
|`_twabIndex` | uint16 | Most recent TWAB index recorded.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`uint256`| struct TwabLibrary.Twab[65535] | TWAB amount at `_target`.
### nextTwab
```solidity
  function nextTwab(
    struct TwabLibrary.Twab _currentBalance
  ) internal returns (struct TwabLibrary.Twab)
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
### calculateNextWithExpiry
```solidity
  function calculateNextWithExpiry(
  ) internal returns (uint16 nextAvailableTwabIndex, uint16 nextCardinality)
```




### nextTwabWithExpiry
```solidity
  function nextTwabWithExpiry(
  ) internal returns (uint16 nextAvailableTwabIndex, uint16 nextCardinality, struct TwabLibrary.Twab twab, bool isNew)
```




