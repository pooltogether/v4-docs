# LiquidationPair
[Git Source](https://github.com/pooltogether/v5-liquidator/blob/ec165bc70ce06ff56ed5f6b62ef103b1443540b8/src/LiquidationPair.sol)


## State Variables
### source

```solidity
ILiquidationSource public immutable source;
```


### tokenIn

```solidity
address public immutable tokenIn;
```


### tokenOut

```solidity
address public immutable tokenOut;
```


### swapMultiplier

```solidity
UFixed32x9 public immutable swapMultiplier;
```


### liquidityFraction

```solidity
UFixed32x9 public immutable liquidityFraction;
```


### virtualReserveIn

```solidity
uint128 public virtualReserveIn;
```


### virtualReserveOut

```solidity
uint128 public virtualReserveOut;
```


## Functions
### constructor


```solidity
constructor(
    ILiquidationSource _source,
    address _tokenIn,
    address _tokenOut,
    UFixed32x9 _swapMultiplier,
    UFixed32x9 _liquidityFraction,
    uint128 _virtualReserveIn,
    uint128 _virtualReserveOut
);
```

### maxAmountOut


```solidity
function maxAmountOut() external returns (uint256);
```

### _availableReserveOut


```solidity
function _availableReserveOut() internal returns (uint256);
```

### nextLiquidationState


```solidity
function nextLiquidationState() external returns (uint128, uint128);
```

### computeExactAmountIn


```solidity
function computeExactAmountIn(uint256 _amountOut) external returns (uint256);
```

### computeExactAmountOut


```solidity
function computeExactAmountOut(uint256 _amountIn) external returns (uint256);
```

### swapExactAmountIn


```solidity
function swapExactAmountIn(address _account, uint256 _amountIn, uint256 _amountOutMin) external returns (uint256);
```

### swapExactAmountOut


```solidity
function swapExactAmountOut(address _account, uint256 _amountOut, uint256 _amountInMax) external returns (uint256);
```

### target

Get the address that will receive `tokenIn`.


```solidity
function target() external returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|address Address of the target|


### _swap


```solidity
function _swap(address _account, uint256 _amountOut, uint256 _amountIn) internal;
```

## Events
### Swapped

```solidity
event Swapped(address indexed account, uint256 amountIn, uint256 amountOut);
```

