# LiquidationPairFactory
[Git Source](https://github.com/pooltogether/v5-liquidator/blob/ec165bc70ce06ff56ed5f6b62ef103b1443540b8/src/LiquidationPairFactory.sol)


## State Variables
### allPairs

```solidity
LiquidationPair[] public allPairs;
```


### deployedPairs
Mapping to verify if a LiquidationPair has been deployed via this factory.

*LiquidationPair address => boolean*


```solidity
mapping(LiquidationPair => bool) public deployedPairs;
```


## Functions
### createPair


```solidity
function createPair(
    ILiquidationSource _source,
    address _tokenIn,
    address _tokenOut,
    UFixed32x9 _swapMultiplier,
    UFixed32x9 _liquidityFraction,
    uint128 _virtualReserveIn,
    uint128 _virtualReserveOut
) external returns (LiquidationPair);
```

### totalPairs

Total number of LiquidationPair deployed by this factory.


```solidity
function totalPairs() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Number of LiquidationPair deployed by this factory.|


## Events
### PairCreated

```solidity
event PairCreated(
    LiquidationPair indexed liquidator,
    ILiquidationSource indexed source,
    address indexed tokenIn,
    address tokenOut,
    UFixed32x9 swapMultiplier,
    UFixed32x9 liquidityFraction,
    uint128 virtualReserveIn,
    uint128 virtualReserveOut
);
```

