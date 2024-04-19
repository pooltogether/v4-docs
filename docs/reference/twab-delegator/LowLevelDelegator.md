[Git Source](https://github.com/GenerationSoftware/pt-v5-twab-delegator/blob/62d5cf5702bea2c4f4436d830b0843d739bc3817/src/LowLevelDelegator.sol)


## State Variables
### delegationInstance
The instance to which all proxies will point.


```solidity
Delegation public delegationInstance;
```


## Functions
### constructor

Contract constructor.


```solidity
constructor();
```

### _createDelegation

Creates a clone of the delegation.


```solidity
function _createDelegation(bytes32 _salt, uint96 _lockUntil) internal returns (Delegation);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_salt`|`bytes32`|Random number used to deterministically deploy the clone|
|`_lockUntil`|`uint96`|Timestamp until which the delegation is locked|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Delegation`|The newly created delegation|


### _computeAddress

Computes the address of a clone, also known as minimal proxy contract.


```solidity
function _computeAddress(bytes32 _salt) internal view returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_salt`|`bytes32`|Random number used to compute the address|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|Address at which the clone will be deployed|


### _computeSalt

Computes salt used to deterministically deploy a clone.


```solidity
function _computeSalt(address _delegator, bytes32 _slot) internal pure returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_delegator`|`address`|Address of the delegator|
|`_slot`|`bytes32`|Slot of the delegation|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|Salt used to deterministically deploy a clone.|


