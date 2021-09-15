


## Functions
### lt
```solidity
  function lt(
    uint32 _a,
    uint32 _b,
    uint32 _timestamp
  ) internal returns (bool)
```
32-bit timestamps comparator.

safe for 0 or 1 overflows, `_a` and `_b` must be chronologically before or equal to time.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_a` | uint32 | A comparison timestamp from which to determine the relative position of `_timestamp`.
|`_b` | uint32 | Timestamp to compare against `_a`.
|`_timestamp` | uint32 | A timestamp truncated to 32 bits.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`bool`| uint32 | Whether `_a` is chronologically < `_b`.
### lte
```solidity
  function lte(
    uint32 _a,
    uint32 _b,
    uint32 _timestamp
  ) internal returns (bool)
```
32-bit timestamps comparator.

safe for 0 or 1 overflows, `_a` and `_b` must be chronologically before or equal to time.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_a` | uint32 | A comparison timestamp from which to determine the relative position of `_timestamp`.
|`_b` | uint32 | Timestamp to compare against `_a`.
|`_timestamp` | uint32 | A timestamp truncated to 32 bits.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`bool`| uint32 | Whether `_a` is chronologically <= `_b`.
### checkedSub
```solidity
  function checkedSub(
  ) internal returns (uint32)
```




