[Git Source](https://github.com/generationsoftware/pt-v5-draw-manager/blob/f04edd938f0ce3d6bbaf5db2748319d6ebf6b078/src/interfaces/IRng.sol)

*This is a simple interface to allow DrawManager to interact with a Random Number Generator*


## Functions
### requestedAtBlock

Returns the block number at which an rng request was made


```solidity
function requestedAtBlock(uint32 rngRequestId) external returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`rngRequestId`|`uint32`|The RNG request id|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The block number at which the request was made|


### isRequestComplete

Returns whether the RNG request is complete and the random number is available


```solidity
function isRequestComplete(uint32 rngRequestId) external view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`rngRequestId`|`uint32`|The RNG request id|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the random number is available, false otherwise|


### isRequestFailed

Returns whether the RNG request failed


```solidity
function isRequestFailed(uint32 rngRequestId) external view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`rngRequestId`|`uint32`|The RNG request id|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the request failed, false otherwise|


### randomNumber

Returns the random number for a given request


```solidity
function randomNumber(uint32 rngRequestId) external returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`rngRequestId`|`uint32`|The RNG request id|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The random number|


