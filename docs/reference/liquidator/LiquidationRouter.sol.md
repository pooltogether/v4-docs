# LiquidationRouter
[Git Source](https://github.com/pooltogether/v5-liquidator/blob/ec165bc70ce06ff56ed5f6b62ef103b1443540b8/src/LiquidationRouter.sol)


## State Variables
### _liquidationPairFactory

```solidity
LiquidationPairFactory internal immutable _liquidationPairFactory;
```


## Functions
### constructor


```solidity
constructor(LiquidationPairFactory liquidationPairFactory_);
```

### onlyTrustedLiquidationPair


```solidity
modifier onlyTrustedLiquidationPair(LiquidationPair _liquidationPair);
```

### swapExactAmountIn


```solidity
function swapExactAmountIn(
    LiquidationPair _liquidationPair,
    address _receiver,
    uint256 _amountIn,
    uint256 _amountOutMin
) external onlyTrustedLiquidationPair(_liquidationPair) returns (uint256);
```

### swapExactAmountOut


```solidity
function swapExactAmountOut(
    LiquidationPair _liquidationPair,
    address _receiver,
    uint256 _amountOut,
    uint256 _amountInMax
) external onlyTrustedLiquidationPair(_liquidationPair) returns (uint256);
```

## Events
### LiquidationRouterCreated

```solidity
event LiquidationRouterCreated(LiquidationPairFactory indexed liquidationPairFactory);
```

