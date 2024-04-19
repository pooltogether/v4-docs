[Git Source](https://github.com/generationsoftware/pt-v5-prize-pool/blob/768fa642eb31cfff0fe929da0929a9bb4dea0b2d/src/abstract/TieredLiquidityDistributor.sol)

**Author:**
PoolTogether Inc.

A contract that distributes liquidity according to PoolTogether V5 distribution rules.

## Constants
### MINIMUM_NUMBER_OF_TIERS

```solidity
uint8 constant MINIMUM_NUMBER_OF_TIERS = 4;
```

### MAXIMUM_NUMBER_OF_TIERS

```solidity
uint8 constant MAXIMUM_NUMBER_OF_TIERS = 11;
```

### NUMBER_OF_CANARY_TIERS

```solidity
uint8 constant NUMBER_OF_CANARY_TIERS = 2;
```


## State Variables
### TIER_ODDS_0
The odds for each tier and number of tiers pair. For n tiers, the last three tiers are always daily.


```solidity
SD59x18 internal immutable TIER_ODDS_0;
```


### TIER_ODDS_EVERY_DRAW

```solidity
SD59x18 internal immutable TIER_ODDS_EVERY_DRAW;
```


### TIER_ODDS_1_5

```solidity
SD59x18 internal immutable TIER_ODDS_1_5;
```


### TIER_ODDS_1_6

```solidity
SD59x18 internal immutable TIER_ODDS_1_6;
```


### TIER_ODDS_2_6

```solidity
SD59x18 internal immutable TIER_ODDS_2_6;
```


### TIER_ODDS_1_7

```solidity
SD59x18 internal immutable TIER_ODDS_1_7;
```


### TIER_ODDS_2_7

```solidity
SD59x18 internal immutable TIER_ODDS_2_7;
```


### TIER_ODDS_3_7

```solidity
SD59x18 internal immutable TIER_ODDS_3_7;
```


### TIER_ODDS_1_8

```solidity
SD59x18 internal immutable TIER_ODDS_1_8;
```


### TIER_ODDS_2_8

```solidity
SD59x18 internal immutable TIER_ODDS_2_8;
```


### TIER_ODDS_3_8

```solidity
SD59x18 internal immutable TIER_ODDS_3_8;
```


### TIER_ODDS_4_8

```solidity
SD59x18 internal immutable TIER_ODDS_4_8;
```


### TIER_ODDS_1_9

```solidity
SD59x18 internal immutable TIER_ODDS_1_9;
```


### TIER_ODDS_2_9

```solidity
SD59x18 internal immutable TIER_ODDS_2_9;
```


### TIER_ODDS_3_9

```solidity
SD59x18 internal immutable TIER_ODDS_3_9;
```


### TIER_ODDS_4_9

```solidity
SD59x18 internal immutable TIER_ODDS_4_9;
```


### TIER_ODDS_5_9

```solidity
SD59x18 internal immutable TIER_ODDS_5_9;
```


### TIER_ODDS_1_10

```solidity
SD59x18 internal immutable TIER_ODDS_1_10;
```


### TIER_ODDS_2_10

```solidity
SD59x18 internal immutable TIER_ODDS_2_10;
```


### TIER_ODDS_3_10

```solidity
SD59x18 internal immutable TIER_ODDS_3_10;
```


### TIER_ODDS_4_10

```solidity
SD59x18 internal immutable TIER_ODDS_4_10;
```


### TIER_ODDS_5_10

```solidity
SD59x18 internal immutable TIER_ODDS_5_10;
```


### TIER_ODDS_6_10

```solidity
SD59x18 internal immutable TIER_ODDS_6_10;
```


### TIER_ODDS_1_11

```solidity
SD59x18 internal immutable TIER_ODDS_1_11;
```


### TIER_ODDS_2_11

```solidity
SD59x18 internal immutable TIER_ODDS_2_11;
```


### TIER_ODDS_3_11

```solidity
SD59x18 internal immutable TIER_ODDS_3_11;
```


### TIER_ODDS_4_11

```solidity
SD59x18 internal immutable TIER_ODDS_4_11;
```


### TIER_ODDS_5_11

```solidity
SD59x18 internal immutable TIER_ODDS_5_11;
```


### TIER_ODDS_6_11

```solidity
SD59x18 internal immutable TIER_ODDS_6_11;
```


### TIER_ODDS_7_11

```solidity
SD59x18 internal immutable TIER_ODDS_7_11;
```


### ESTIMATED_PRIZES_PER_DRAW_FOR_4_TIERS
The estimated number of prizes given X tiers.


```solidity
uint32 internal immutable ESTIMATED_PRIZES_PER_DRAW_FOR_4_TIERS;
```


### ESTIMATED_PRIZES_PER_DRAW_FOR_5_TIERS

```solidity
uint32 internal immutable ESTIMATED_PRIZES_PER_DRAW_FOR_5_TIERS;
```


### ESTIMATED_PRIZES_PER_DRAW_FOR_6_TIERS

```solidity
uint32 internal immutable ESTIMATED_PRIZES_PER_DRAW_FOR_6_TIERS;
```


### ESTIMATED_PRIZES_PER_DRAW_FOR_7_TIERS

```solidity
uint32 internal immutable ESTIMATED_PRIZES_PER_DRAW_FOR_7_TIERS;
```


### ESTIMATED_PRIZES_PER_DRAW_FOR_8_TIERS

```solidity
uint32 internal immutable ESTIMATED_PRIZES_PER_DRAW_FOR_8_TIERS;
```


### ESTIMATED_PRIZES_PER_DRAW_FOR_9_TIERS

```solidity
uint32 internal immutable ESTIMATED_PRIZES_PER_DRAW_FOR_9_TIERS;
```


### ESTIMATED_PRIZES_PER_DRAW_FOR_10_TIERS

```solidity
uint32 internal immutable ESTIMATED_PRIZES_PER_DRAW_FOR_10_TIERS;
```


### ESTIMATED_PRIZES_PER_DRAW_FOR_11_TIERS

```solidity
uint32 internal immutable ESTIMATED_PRIZES_PER_DRAW_FOR_11_TIERS;
```


### _tiers
The Tier liquidity data.


```solidity
mapping(uint8 tierId => Tier tierData) internal _tiers;
```


### grandPrizePeriodDraws
The frequency of the grand prize


```solidity
uint24 public immutable grandPrizePeriodDraws;
```


### tierShares
The number of shares to allocate to each prize tier.


```solidity
uint8 public immutable tierShares;
```


### canaryShares
The number of shares to allocate to each canary tier.


```solidity
uint8 public immutable canaryShares;
```


### reserveShares
The number of shares to allocate to the reserve.


```solidity
uint8 public immutable reserveShares;
```


### tierLiquidityUtilizationRate
The percentage of tier liquidity to target for utilization.


```solidity
UD60x18 public immutable tierLiquidityUtilizationRate;
```


### prizeTokenPerShare
The number of prize tokens that have accrued per share for all time.

*This is an ever-increasing exchange rate that is used to calculate the prize liquidity for each tier.*

*Each tier holds a separate tierPrizeTokenPerShare; the delta between the tierPrizeTokenPerShare and
the prizeTokenPerShare * tierShares is the available liquidity they have.*


```solidity
uint128 public prizeTokenPerShare;
```


### numberOfTiers
The number of tiers for the last awarded draw. The last tier is the canary tier.


```solidity
uint8 public numberOfTiers;
```


### _lastAwardedDrawId
The draw id of the last awarded draw.


```solidity
uint24 internal _lastAwardedDrawId;
```


### lastAwardedDrawAwardedAt
The timestamp at which the last awarded draw was awarded.


```solidity
uint48 public lastAwardedDrawAwardedAt;
```


### _reserve
The amount of available reserve.


```solidity
uint96 internal _reserve;
```


## Functions
### constructor

Constructs a new Prize Pool.


```solidity
constructor(
    uint256 _tierLiquidityUtilizationRate,
    uint8 _numberOfTiers,
    uint8 _tierShares,
    uint8 _canaryShares,
    uint8 _reserveShares,
    uint24 _grandPrizePeriodDraws
);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tierLiquidityUtilizationRate`|`uint256`|The target percentage of tier liquidity to utilize each draw|
|`_numberOfTiers`|`uint8`|The number of tiers to start with. Must be greater than or equal to the minimum number of tiers.|
|`_tierShares`|`uint8`|The number of shares to allocate to each tier|
|`_canaryShares`|`uint8`|The number of shares to allocate to each canary tier|
|`_reserveShares`|`uint8`|The number of shares to allocate to the reserve.|
|`_grandPrizePeriodDraws`|`uint24`|The number of draws between grand prizes|


### _awardDraw

Adjusts the number of tiers and distributes new liquidity.


```solidity
function _awardDraw(uint24 _awardingDraw, uint8 _nextNumberOfTiers, uint256 _prizeTokenLiquidity) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_awardingDraw`|`uint24`|The ID of the draw that is being awarded|
|`_nextNumberOfTiers`|`uint8`|The new number of tiers. Must be greater than minimum|
|`_prizeTokenLiquidity`|`uint256`|The amount of fresh liquidity to distribute across the tiers and reserve|


### _computeNewDistributions

Computes the liquidity that will be distributed for the next awarded draw given the next number of tiers and prize liquidity.


```solidity
function _computeNewDistributions(
    uint8 _numberOfTiers,
    uint8 _nextNumberOfTiers,
    uint128 _currentPrizeTokenPerShare,
    uint256 _prizeTokenLiquidity
) internal view returns (uint96 deltaReserve, uint128 newPrizeTokenPerShare);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_numberOfTiers`|`uint8`|The current number of tiers|
|`_nextNumberOfTiers`|`uint8`|The next number of tiers to use to compute distribution|
|`_currentPrizeTokenPerShare`|`uint128`|The current prize token per share|
|`_prizeTokenLiquidity`|`uint256`|The amount of fresh liquidity to distribute across the tiers and reserve|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`deltaReserve`|`uint96`|The amount of liquidity that will be added to the reserve|
|`newPrizeTokenPerShare`|`uint128`|The new prize token per share|


### getTierPrizeSize

Returns the prize size for the given tier.


```solidity
function getTierPrizeSize(uint8 _tier) external view returns (uint104);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tier`|`uint8`|The tier to retrieve|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint104`|The prize size for the tier|


### getTierPrizeCount

Returns the estimated number of prizes for the given tier.


```solidity
function getTierPrizeCount(uint8 _tier) external pure returns (uint32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tier`|`uint8`|The tier to retrieve|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint32`|The estimated number of prizes|


### _getTier

Retrieves an up-to-date Tier struct for the given tier.


```solidity
function _getTier(uint8 _tier, uint8 _numberOfTiers) internal view returns (Tier memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tier`|`uint8`|The tier to retrieve|
|`_numberOfTiers`|`uint8`|The number of tiers, should match the current. Passed explicitly as an optimization|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Tier`|An up-to-date Tier struct; if the prize is outdated then it is recomputed based on available liquidity and the draw ID is updated.|


### getTotalShares

Computes the total shares in the system.


```solidity
function getTotalShares() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total shares|


### computeTotalShares

Computes the total shares in the system given the number of tiers.


```solidity
function computeTotalShares(uint8 _numberOfTiers) public view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_numberOfTiers`|`uint8`|The number of tiers to calculate the total shares for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total shares|


### _computeReclamationStart

Determines at which tier we need to start reclaiming liquidity.


```solidity
function _computeReclamationStart(uint8 _numberOfTiers, uint8 _nextNumberOfTiers) internal pure returns (uint8);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_numberOfTiers`|`uint8`|The current number of tiers|
|`_nextNumberOfTiers`|`uint8`|The next number of tiers|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint8`|The tier to start reclaiming liquidity from|


### _consumeLiquidity

Consumes liquidity from the given tier.


```solidity
function _consumeLiquidity(Tier memory _tierStruct, uint8 _tier, uint104 _liquidity) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tierStruct`|`Tier`|The tier to consume liquidity from|
|`_tier`|`uint8`|The tier number|
|`_liquidity`|`uint104`|The amount of liquidity to consume|


### _computePrizeSize

Computes the prize size of the given tier.


```solidity
function _computePrizeSize(
    uint8 _tier,
    uint8 _numberOfTiers,
    uint128 _tierPrizeTokenPerShare,
    uint128 _prizeTokenPerShare
) internal view returns (uint104);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tier`|`uint8`|The tier to compute the prize size of|
|`_numberOfTiers`|`uint8`|The current number of tiers|
|`_tierPrizeTokenPerShare`|`uint128`|The prizeTokenPerShare of the Tier struct|
|`_prizeTokenPerShare`|`uint128`|The global prizeTokenPerShare|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint104`|The prize size|


### isCanaryTier

Returns whether the given tier is a canary tier


```solidity
function isCanaryTier(uint8 _tier) public view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tier`|`uint8`|The tier to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the passed tier is a canary tier, false otherwise|


### _numShares

Returns the number of shares for the given tier and number of tiers.


```solidity
function _numShares(uint8 _tier, uint8 _numberOfTiers) internal view returns (uint8);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tier`|`uint8`|The tier to compute the number of shares for|
|`_numberOfTiers`|`uint8`|The number of tiers|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint8`|The number of shares|


### getTierRemainingLiquidity

Computes the remaining liquidity available to a tier.


```solidity
function getTierRemainingLiquidity(uint8 _tier) public view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tier`|`uint8`|The tier to compute the liquidity for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The remaining liquidity|


### _getTierRemainingLiquidity

Computes the remaining tier liquidity.


```solidity
function _getTierRemainingLiquidity(uint128 _tierPrizeTokenPerShare, uint128 _prizeTokenPerShare, uint8 _tierShares)
    internal
    pure
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tierPrizeTokenPerShare`|`uint128`|The prizeTokenPerShare of the Tier struct|
|`_prizeTokenPerShare`|`uint128`|The global prizeTokenPerShare|
|`_tierShares`|`uint8`|The number of shares for the tier|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The remaining available liquidity|


### estimatedPrizeCount

Estimates the number of prizes for the current number of tiers, including the first canary tier


```solidity
function estimatedPrizeCount() external view returns (uint32);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint32`|The estimated number of prizes including the canary tier|


### estimatedPrizeCountWithBothCanaries

Estimates the number of prizes for the current number of tiers, including both canary tiers


```solidity
function estimatedPrizeCountWithBothCanaries() external view returns (uint32);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint32`|The estimated number of prizes including both canary tiers|


### reserve

Returns the balance of the reserve.


```solidity
function reserve() external view returns (uint96);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint96`|The amount of tokens that have been reserved.|


### estimatedPrizeCount

Estimates the prize count for the given number of tiers, including the first canary tier. It expects no prizes are claimed for the last canary tier


```solidity
function estimatedPrizeCount(uint8 numTiers) public view returns (uint32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`numTiers`|`uint8`|The number of prize tiers|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint32`|The estimated total number of prizes|


### estimatedPrizeCountWithBothCanaries

Estimates the prize count for the given tier, including BOTH canary tiers


```solidity
function estimatedPrizeCountWithBothCanaries(uint8 numTiers) public view returns (uint32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`numTiers`|`uint8`|The number of tiers|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint32`|The estimated prize count across all tiers, including both canary tiers.|


### _estimateNumberOfTiersUsingPrizeCountPerDraw

Estimates the number of tiers for the given prize count.


```solidity
function _estimateNumberOfTiersUsingPrizeCountPerDraw(uint32 _prizeCount) internal view returns (uint8);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_prizeCount`|`uint32`|The number of prizes that were claimed|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint8`|The estimated tier|


### _sumTierPrizeCounts

Computes the expected number of prizes for a given number of tiers.

*Includes the first canary tier prizes, but not the second since the first is expected to
be claimed.*


```solidity
function _sumTierPrizeCounts(uint8 _numTiers) internal view returns (uint32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_numTiers`|`uint8`|The number of tiers, including canaries|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint32`|The expected number of prizes, first canary included.|


### getTierOdds

Computes the odds for a tier given the number of tiers.


```solidity
function getTierOdds(uint8 _tier, uint8 _numTiers) public view returns (SD59x18);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tier`|`uint8`|The tier to compute odds for|
|`_numTiers`|`uint8`|The number of prize tiers|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`SD59x18`|The odds of the tier|


## Events
### ReserveConsumed
Emitted when the reserve is consumed due to insufficient prize liquidity.


```solidity
event ReserveConsumed(uint256 amount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`uint256`|The amount to decrease by|


## Structs
### Tier

Struct that tracks tier liquidity information.


```solidity
struct Tier {
    uint24 drawId;
    uint104 prizeSize;
    uint128 prizeTokenPerShare;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`drawId`|`uint24`|The draw ID that the tier was last updated for|
|`prizeSize`|`uint104`|The size of the prize for the tier at the drawId|
|`prizeTokenPerShare`|`uint128`|The total prize tokens per share that have already been consumed for this tier.|

