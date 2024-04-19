[Git Source](https://github.com/generationsoftware/pt-v5-tpda-liquidator/blob/3ef1738dc1856e93d2f0eda590eb9df90e085bab/src/TpdaLiquidationPairFactory.sol)

**Author:**
G9 Software Inc.

Factory contract for deploying TpdaLiquidationPair contracts.


## State Variables
### allPairs
Tracks an array of all pairs created by this factory


```solidity
TpdaLiquidationPair[] public allPairs;
```


### deployedPairs
Mapping to verify if a TpdaLiquidationPair has been deployed via this factory.


```solidity
mapping(address pair => bool wasDeployed) public deployedPairs;
```


## Functions
### createPair

Creates a new TpdaLiquidationPair and registers it within the factory


```solidity
function createPair(
    ILiquidationSource _source,
    address _tokenIn,
    address _tokenOut,
    uint64 _targetAuctionPeriod,
    uint192 _targetAuctionPrice,
    uint256 _smoothingFactor
) external returns (TpdaLiquidationPair);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_source`|`ILiquidationSource`|The liquidation source that the pair will use|
|`_tokenIn`|`address`|The input token for the pair|
|`_tokenOut`|`address`|The output token for the pair|
|`_targetAuctionPeriod`|`uint64`|The duration of auctions|
|`_targetAuctionPrice`|`uint192`|The initial auction price|
|`_smoothingFactor`|`uint256`|The degree of smoothing to apply to the available token balance|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`TpdaLiquidationPair`|The new liquidation pair|


### totalPairs

Total number of TpdaLiquidationPair deployed by this factory.


```solidity
function totalPairs() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Number of TpdaLiquidationPair deployed by this factory.|


## Events
### PairCreated
Emitted when a new TpdaLiquidationPair is created


```solidity
event PairCreated(
    TpdaLiquidationPair indexed pair,
    ILiquidationSource source,
    address indexed tokenIn,
    address indexed tokenOut,
    uint64 targetAuctionPeriod,
    uint192 targetAuctionPrice,
    uint256 smoothingFactor
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`pair`|`TpdaLiquidationPair`|The address of the new pair|
|`source`|`ILiquidationSource`|The liquidation source that the pair is using|
|`tokenIn`|`address`|The input token for the pair|
|`tokenOut`|`address`|The output token for the pair|
|`targetAuctionPeriod`|`uint64`|The duration of auctions|
|`targetAuctionPrice`|`uint192`|The minimum auction size in output tokens|
|`smoothingFactor`|`uint256`|The 18 decimal smoothing fraction for the liquid balance|

