[Git Source](https://github.com/GenerationSoftware/pt-v5-liquidator-interfaces/blob/b934e0ae66eeb2e2feb978e5edd2bd0b8b1eacf6/src/interfaces/ILiquidationSource.sol)


## Functions
### liquidatableBalanceOf

Get the available amount of tokens that can be swapped.


```solidity
function liquidatableBalanceOf(address tokenOut) external returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenOut`|`address`|Address of the token to get available balance for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 Available amount of `token`|


### transferTokensOut

Transfers tokens to the receiver


```solidity
function transferTokensOut(address sender, address receiver, address tokenOut, uint256 amountOut)
    external
    returns (bytes memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|Address that triggered the liquidation|
|`receiver`|`address`|Address of the account that will receive `tokenOut`|
|`tokenOut`|`address`|Address of the token being bought|
|`amountOut`|`uint256`|Amount of token being bought|


### verifyTokensIn

Verifies that tokens have been transferred in.


```solidity
function verifyTokensIn(address tokenIn, uint256 amountIn, bytes calldata transferTokensOutData) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenIn`|`address`|Address of the token being sold|
|`amountIn`|`uint256`|Amount of token being sold|
|`transferTokensOutData`|`bytes`|Data returned by the corresponding transferTokensOut call|


### targetOf

Get the address that will receive `tokenIn`.


```solidity
function targetOf(address tokenIn) external returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenIn`|`address`|Address of the token to get the target address for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|address Address of the target|


### isLiquidationPair

Checks if a liquidation pair can be used to liquidate the given tokenOut from this source.


```solidity
function isLiquidationPair(address tokenOut, address liquidationPair) external returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenOut`|`address`|The address of the token to liquidate|
|`liquidationPair`|`address`|The address of the liquidation pair that is being checked|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|bool True if the liquidation pair can be used, false otherwise|


## Events
### LiquidationPairSet
Emitted when a new liquidation pair is set for the given `tokenOut`.


```solidity
event LiquidationPairSet(address indexed tokenOut, address indexed liquidationPair);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`tokenOut`|`address`|The token being liquidated|
|`liquidationPair`|`address`|The new liquidation pair for the token|

