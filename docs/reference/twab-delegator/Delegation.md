[Git Source](https://github.com/GenerationSoftware/pt-v5-twab-delegator/blob/62d5cf5702bea2c4f4436d830b0843d739bc3817/src/Delegation.sol)

A Delegation allows his owner to execute calls on behalf of the contract.

*This contract is intended to be counterfactually instantiated via CREATE2 through the LowLevelDelegator contract.*

*This contract will hold tickets that will be delegated to a chosen delegatee.*


## State Variables
### _owner
Contract owner.


```solidity
address private _owner;
```


### lockUntil
Timestamp until which the delegation is locked.


```solidity
uint96 public lockUntil;
```


## Functions
### initialize

Initializes the delegation.


```solidity
function initialize(uint96 _lockUntil) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_lockUntil`|`uint96`|Timestamp until which the delegation is locked|


### executeCalls

Executes calls on behalf of this contract.


```solidity
function executeCalls(Call[] calldata calls) external onlyOwner returns (bytes[] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`calls`|`Call[]`|The array of calls to be executed|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes[]`|An array of the return values for each of the calls|


### setLockUntil

Set the timestamp until which the delegation is locked.


```solidity
function setLockUntil(uint96 _lockUntil) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_lockUntil`|`uint96`|The timestamp until which the delegation is locked|


### _executeCall

Executes a call to another contract.


```solidity
function _executeCall(address to, bytes memory data) internal returns (bytes memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|The address to call|
|`data`|`bytes`|The call data|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|The return data from the call|


### onlyOwner

Modifier to only allow the contract owner to call a function


```solidity
modifier onlyOwner();
```

## Structs
### Call
A structure to define arbitrary contract calls.


```solidity
struct Call {
    address to;
    bytes data;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|The address to call|
|`data`|`bytes`|The call data|

