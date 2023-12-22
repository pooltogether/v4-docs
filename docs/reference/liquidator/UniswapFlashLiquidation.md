[Git Source](https://github.com/GenerationSoftware/pt-v5-flash-liquidator/blob/a4c783f12113237b2bd4bcc9e46aafe23ccde1d6/src/UniswapFlashLiquidation.sol)



**Inherits:**
IFlashSwapCallback

**Author:**
G9 Software Inc.

This contract uses a flashswap on a PoolTogether V5 LiquidationPair to swap yield for
prize tokens on Uniswap V3 and then contributes the prize tokens to the prize pool while
sending any excess to the receiver as profit.


## State Variables
### quoter
Uniswap V3 Static Quoter


```solidity
IUniswapV3StaticQuoter public immutable quoter;
```


### router
Uniswap V3 Router


```solidity
IV3SwapRouter public immutable router;
```


## Functions
### constructor

UniswapFlashLiquidation constructor.


```solidity
constructor(IUniswapV3StaticQuoter quoter_, IV3SwapRouter router_);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`quoter_`|`IUniswapV3StaticQuoter`|The Uniswap V3 Static Quoter to use to quote swap prices|
|`router_`|`IV3SwapRouter`|The Uniswap V3 Swap Router to use for swaps|


### flashLiquidate

Liquidate yield via the LiquidationPair and swap `_amountOut` of tokenOut in exchange of
`_amountInMax` of tokenIn. Any excess in tokenOut is sent as profit to `_receiver`.

*Will revert if `block.timestamp` exceeds the `_deadline`.*

*Will revert if the tokenIn profit is less than `_profitMin`.*


```solidity
function flashLiquidate(
    ILiquidationPair _liquidationPair,
    address _receiver,
    uint256 _amountOut,
    uint256 _amountInMax,
    uint256 _profitMin,
    uint256 _deadline,
    bytes calldata _path
) public returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_liquidationPair`|`ILiquidationPair`|Address of the LiquidationPair to flash liquidate against|
|`_receiver`|`address`|Address that will receive the liquidation profit (i.e. the amount of tokenIn in excess)|
|`_amountOut`|`uint256`|Amount of tokenOut to swap for tokenIn|
|`_amountInMax`|`uint256`|Maximum amount of tokenIn to send to the LiquidationPair target|
|`_profitMin`|`uint256`|Minimum amount of excess tokenIn to receive for performing the liquidation|
|`_deadline`|`uint256`|The timestamp in seconds by which the flash liquidation must be executed|
|`_path`|`bytes`|The Uniswap V3 path to take for the swap|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of tokenIn in excess sent to `_receiver`|


### flashSwapCallback


```solidity
function flashSwapCallback(address, uint256 _amountIn, uint256 _amountOut, bytes calldata _path) external;
```

### findBestQuoteStatic

Finds the biggest profit that can be made with the given liquidation pair and swap path.

*SHOULD be called statically, not intended for onchain interactions!*


```solidity
function findBestQuoteStatic(ILiquidationPair _liquidationPair, bytes calldata _path)
    external
    returns (ProfitInfo memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_liquidationPair`|`ILiquidationPair`|The pair to liquidate|
|`_path`|`bytes`|The Uniswap V3 swap path to use|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`ProfitInfo`|The profit info for the best swap|


### getProfitInfoStatic

Calculates the profit point at the given amount out.

*SHOULD be called statically, not intended for onchain interactions!*


```solidity
function getProfitInfoStatic(uint256 _amountOut, ILiquidationPair _liquidationPair, bytes calldata _path)
    public
    returns (ProfitInfo memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_amountOut`|`uint256`|The amount out at which to calculate the profit point|
|`_liquidationPair`|`ILiquidationPair`|The pair to liquidate|
|`_path`|`bytes`|The Uniswap V3 swap path to use|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`ProfitInfo`|The profit point for the given amount out|


## Events
### FlashSwapLiquidation
Emitted when a flashswap liquidation has been made.


```solidity
event FlashSwapLiquidation(
    address indexed receiver, ILiquidationPair indexed liquidationPair, bytes path, uint256 profit
);
```

## Structs
### ProfitInfo
Struct to store current profit info with the associated liquidation parameters.


```solidity
struct ProfitInfo {
    uint256 amountIn;
    uint256 amountOut;
    uint256 profit;
    bool success;
}
```

## Errors
### FlashLiquidationExpired
Thrown when the `flashLiquidate` `deadline has passed.


```solidity
error FlashLiquidationExpired(uint256 timestamp, uint256 deadline);
```

### InsufficientProfit
Thrown when the amount of tokenIn left after the liquidation is lower than the expected `minProfit`.


```solidity
error InsufficientProfit(uint256 profit, uint256 minProfit);
```

### QuoterZeroAddress
Thrown if the `IUniswapV3StaticQuoter` address passed to the constructor is the zero address.


```solidity
error QuoterZeroAddress();
```

### RouterZeroAddress
Thrown if the `IV3SwapRouter` address passed to the constructor is the zero address.


```solidity
error RouterZeroAddress();
```

