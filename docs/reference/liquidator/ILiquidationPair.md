[Git Source](https://github.com/GenerationSoftware/pt-v5-liquidator-interfaces/blob/b934e0ae66eeb2e2feb978e5edd2bd0b8b1eacf6/src/interfaces/ILiquidationPair.sol)


## Functions
### source

The liquidation source that the pair is using.

*The source executes the actual token swap, while the pair handles the pricing.*


```solidity
function source() external returns (ILiquidationSource);
```

### tokenIn

Returns the token that is used to pay for auctions.


```solidity
function tokenIn() external returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|address of the token coming in|


### tokenOut

Returns the token that is being auctioned.


```solidity
function tokenOut() external returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|address of the token coming out|


### target

Get the address that will receive `tokenIn`.


```solidity
function target() external returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|Address of the target|


### maxAmountOut

Gets the maximum amount of tokens that can be swapped out from the source.


```solidity
function maxAmountOut() external returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The maximum amount of tokens that can be swapped out.|


### swapExactAmountOut

Swaps the given amount of tokens out and ensures the amount of tokens in doesn't exceed the given maximum.

*The amount of tokens being swapped in must be sent to the target before calling this function.*


```solidity
function swapExactAmountOut(address _receiver, uint256 _amountOut, uint256 _amountInMax, bytes calldata _flashSwapData)
    external
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_receiver`|`address`|The address to send the tokens to.|
|`_amountOut`|`uint256`|The amount of tokens to receive out.|
|`_amountInMax`|`uint256`|The maximum amount of tokens to send in.|
|`_flashSwapData`|`bytes`|If non-zero, the _receiver is called with this data prior to|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of tokens sent in.|


### computeExactAmountIn

Computes the exact amount of tokens to send in for the given amount of tokens to receive out.


```solidity
function computeExactAmountIn(uint256 _amountOut) external returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_amountOut`|`uint256`|The amount of tokens to receive out.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of tokens to send in.|


