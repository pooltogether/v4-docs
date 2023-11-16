[Git Source](https://github.com/GenerationSoftware/pt-v5-twab-delegator/blob/1e3f84133b9398e6986915c4d5841523e1b7b790/src/Delegation.sol)



A Delegation allows his owner to execute calls on behalf of the contract.

_This contract is intended to be counterfactually instantiated via CREATE2 through the LowLevelDelegator contract.
This contract will hold tickets that will be delegated to a chosen delegatee._

## Events

## Variables

### lockUntil

```solidity
uint96 lockUntil
```

Timestamp until which the delegation is locked.

## Functions

### initialize

```solidity
function initialize(uint96 _lockUntil) external
```

Initializes the delegation.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _lockUntil | uint96 | Timestamp until which the delegation is locked |

### executeCalls

```solidity
function executeCalls(struct Delegation.Call[] calls) external returns (bytes[])
```

Executes calls on behalf of this contract.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| calls | struct Delegation.Call[] | The array of calls to be executed |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes[] | An array of the return values for each of the calls |
### setLockUntil

```solidity
function setLockUntil(uint96 _lockUntil) external
```

Set the timestamp until which the delegation is locked.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _lockUntil | uint96 | The timestamp until which the delegation is locked |

## Structs

## Errors

