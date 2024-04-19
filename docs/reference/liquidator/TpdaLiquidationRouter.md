[Git Source](https://github.com/generationsoftware/pt-v5-tpda-liquidator/blob/3ef1738dc1856e93d2f0eda590eb9df90e085bab/src/TpdaLiquidationRouter.sol)

**Inherits:**
IFlashSwapCallback

**Author:**
G9 Software Inc.

Serves as the user-facing swapping interface for Liquidation Pairs.


## State Variables
### _liquidationPairFactory
The TpdaLiquidationPairFactory that this router uses.

*TpdaLiquidationPairs will be checked to ensure they were created by the factory*


```solidity
TpdaLiquidationPairFactory internal immutable _liquidationPairFactory;
```


## Functions
### constructor

Constructs a new LiquidationRouter


```solidity
constructor(TpdaLiquidationPairFactory liquidationPairFactory_);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`liquidationPairFactory_`|`TpdaLiquidationPairFactory`|The factory that pairs will be verified to have been created by|


### swapExactAmountOut

Swaps the given amount of output tokens for at most input tokens


```solidity
function swapExactAmountOut(
    TpdaLiquidationPair _liquidationPair,
    address _receiver,
    uint256 _amountOut,
    uint256 _amountInMax,
    uint256 _deadline
) external onlyTrustedTpdaLiquidationPair(address(_liquidationPair)) returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_liquidationPair`|`TpdaLiquidationPair`|The pair to swap against|
|`_receiver`|`address`|The account to receive the output tokens|
|`_amountOut`|`uint256`|The exact amount of output tokens expected|
|`_amountInMax`|`uint256`|The maximum of input tokens to spend|
|`_deadline`|`uint256`|The timestamp that the swap must be completed by|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The actual number of input tokens used|


### flashSwapCallback

Called on the token receiver by the LiquidationPair during a liquidation if the flashSwap data length is non-zero


```solidity
function flashSwapCallback(address _sender, uint256 _amountIn, uint256, bytes calldata _flashSwapData)
    external
    override
    onlyTrustedTpdaLiquidationPair(msg.sender)
    onlySelf(_sender);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_sender`|`address`|The address that triggered the liquidation swap|
|`_amountIn`|`uint256`|The amount of tokens expected to be sent to the target|
|`<none>`|`uint256`||
|`_flashSwapData`|`bytes`|The flash swap data that was passed into the swap function.|


### onlyTrustedTpdaLiquidationPair

Checks that the given pair was created by the factory


```solidity
modifier onlyTrustedTpdaLiquidationPair(address _liquidationPair);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_liquidationPair`|`address`|The pair address to check|


### onlySelf

Checks that the given address matches this contract


```solidity
modifier onlySelf(address _sender);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_sender`|`address`|The address that called the liquidation pair|


## Events
### LiquidationRouterCreated
Emitted when the router is created


```solidity
event LiquidationRouterCreated(TpdaLiquidationPairFactory indexed liquidationPairFactory);
```

### SwappedExactAmountOut
Emitted after a swap occurs


```solidity
event SwappedExactAmountOut(
    TpdaLiquidationPair indexed liquidationPair,
    address indexed sender,
    address indexed receiver,
    uint256 amountOut,
    uint256 amountInMax,
    uint256 amountIn,
    uint256 deadline
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`liquidationPair`|`TpdaLiquidationPair`|The pair that was swapped against|
|`sender`|`address`|The address that initiated the swap|
|`receiver`|`address`|The address that received the output tokens|
|`amountOut`|`uint256`|The amount of output tokens received|
|`amountInMax`|`uint256`|The maximum amount of input tokens that could have been used|
|`amountIn`|`uint256`|The amount of input tokens that were actually used|
|`deadline`|`uint256`|The deadline for the swap|

