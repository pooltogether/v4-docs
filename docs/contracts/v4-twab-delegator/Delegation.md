A Delegation allows his owner to execute calls on behalf of the contract.

This contract is intended to be counterfactually instantiated via CREATE2 through the LowLevelDelegator contract.
This contract will hold tickets that will be delegated to a chosen delegatee.

## Structs
### `Call`
  - address to
  - bytes data


## Functions
### initialize
```solidity
  function initialize(
    uint96 _lockUntil
  ) external
```
Initializes the delegation.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_lockUntil` | uint96 | Timestamp until which the delegation is locked

### executeCalls
```solidity
  function executeCalls(
    struct Delegation.Call[] calls
  ) external returns (bytes[])
```
Executes calls on behalf of this contract.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`calls` | struct Delegation.Call[] | The array of calls to be executed

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| bytes[] | An array of the return values for each of the calls
### setLockUntil
```solidity
  function setLockUntil(
    uint96 _lockUntil
  ) external
```
Set the timestamp until which the delegation is locked.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_lockUntil` | uint96 | The timestamp until which the delegation is locked

