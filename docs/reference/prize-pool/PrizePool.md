# PrizePool
[Git Source](https://github.com/pooltogether/v5-prize-pool/blob/aedeba0e089d9404c490a37f2f9e456fac901b56/src/PrizePool.sol)


## State Variables
### MINIMUM_NUMBER_OF_TIERS

```solidity
uint8 internal constant MINIMUM_NUMBER_OF_TIERS = 2;
```


### ESTIMATED_PRIZES_PER_DRAW_FOR_2_TIERS

```solidity
uint32 internal immutable ESTIMATED_PRIZES_PER_DRAW_FOR_2_TIERS;
```


### ESTIMATED_PRIZES_PER_DRAW_FOR_3_TIERS

```solidity
uint32 internal immutable ESTIMATED_PRIZES_PER_DRAW_FOR_3_TIERS;
```


### ESTIMATED_PRIZES_PER_DRAW_FOR_4_TIERS

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


### ESTIMATED_PRIZES_PER_DRAW_FOR_12_TIERS

```solidity
uint32 internal immutable ESTIMATED_PRIZES_PER_DRAW_FOR_12_TIERS;
```


### ESTIMATED_PRIZES_PER_DRAW_FOR_13_TIERS

```solidity
uint32 internal immutable ESTIMATED_PRIZES_PER_DRAW_FOR_13_TIERS;
```


### ESTIMATED_PRIZES_PER_DRAW_FOR_14_TIERS

```solidity
uint32 internal immutable ESTIMATED_PRIZES_PER_DRAW_FOR_14_TIERS;
```


### ESTIMATED_PRIZES_PER_DRAW_FOR_15_TIERS

```solidity
uint32 internal immutable ESTIMATED_PRIZES_PER_DRAW_FOR_15_TIERS;
```


### ESTIMATED_PRIZES_PER_DRAW_FOR_16_TIERS

```solidity
uint32 internal immutable ESTIMATED_PRIZES_PER_DRAW_FOR_16_TIERS;
```


### CANARY_PRIZE_COUNT_FOR_2_TIERS

```solidity
UD60x18 internal immutable CANARY_PRIZE_COUNT_FOR_2_TIERS;
```


### CANARY_PRIZE_COUNT_FOR_3_TIERS

```solidity
UD60x18 internal immutable CANARY_PRIZE_COUNT_FOR_3_TIERS;
```


### CANARY_PRIZE_COUNT_FOR_4_TIERS

```solidity
UD60x18 internal immutable CANARY_PRIZE_COUNT_FOR_4_TIERS;
```


### CANARY_PRIZE_COUNT_FOR_5_TIERS

```solidity
UD60x18 internal immutable CANARY_PRIZE_COUNT_FOR_5_TIERS;
```


### CANARY_PRIZE_COUNT_FOR_6_TIERS

```solidity
UD60x18 internal immutable CANARY_PRIZE_COUNT_FOR_6_TIERS;
```


### CANARY_PRIZE_COUNT_FOR_7_TIERS

```solidity
UD60x18 internal immutable CANARY_PRIZE_COUNT_FOR_7_TIERS;
```


### CANARY_PRIZE_COUNT_FOR_8_TIERS

```solidity
UD60x18 internal immutable CANARY_PRIZE_COUNT_FOR_8_TIERS;
```


### CANARY_PRIZE_COUNT_FOR_9_TIERS

```solidity
UD60x18 internal immutable CANARY_PRIZE_COUNT_FOR_9_TIERS;
```


### CANARY_PRIZE_COUNT_FOR_10_TIERS

```solidity
UD60x18 internal immutable CANARY_PRIZE_COUNT_FOR_10_TIERS;
```


### CANARY_PRIZE_COUNT_FOR_11_TIERS

```solidity
UD60x18 internal immutable CANARY_PRIZE_COUNT_FOR_11_TIERS;
```


### CANARY_PRIZE_COUNT_FOR_12_TIERS

```solidity
UD60x18 internal immutable CANARY_PRIZE_COUNT_FOR_12_TIERS;
```


### CANARY_PRIZE_COUNT_FOR_13_TIERS

```solidity
UD60x18 internal immutable CANARY_PRIZE_COUNT_FOR_13_TIERS;
```


### CANARY_PRIZE_COUNT_FOR_14_TIERS

```solidity
UD60x18 internal immutable CANARY_PRIZE_COUNT_FOR_14_TIERS;
```


### CANARY_PRIZE_COUNT_FOR_15_TIERS

```solidity
UD60x18 internal immutable CANARY_PRIZE_COUNT_FOR_15_TIERS;
```


### vaultAccumulator

```solidity
mapping(address => DrawAccumulatorLib.Accumulator) internal vaultAccumulator;
```


### totalAccumulator

```solidity
DrawAccumulatorLib.Accumulator internal totalAccumulator;
```


### _tierExchangeRates

```solidity
mapping(uint256 => UD60x18) internal _tierExchangeRates;
```


### claimRecords

```solidity
mapping(address => ClaimRecord) internal claimRecords;
```


### prizeToken

```solidity
IERC20 public immutable prizeToken;
```


### alpha

```solidity
SD1x18 public immutable alpha;
```


### grandPrizePeriodDraws

```solidity
uint32 public immutable grandPrizePeriodDraws;
```


### twabController

```solidity
TwabController public immutable twabController;
```


### tierShares

```solidity
uint96 public immutable tierShares;
```


### drawPeriodSeconds

```solidity
uint32 public immutable drawPeriodSeconds;
```


### claimExpansionThreshold

```solidity
UD2x18 public immutable claimExpansionThreshold;
```


### canaryShares

```solidity
uint96 public immutable canaryShares;
```


### reserveShares

```solidity
uint96 public immutable reserveShares;
```


### _totalClaimedPrizes

```solidity
uint256 internal _totalClaimedPrizes;
```


### prizeTokenPerShare

```solidity
UD60x18 public prizeTokenPerShare;
```


### _reserve

```solidity
uint256 public _reserve;
```


### _winningRandomNumber

```solidity
uint256 public _winningRandomNumber;
```


### numberOfTiers

```solidity
uint8 public numberOfTiers;
```


### claimCount

```solidity
uint32 public claimCount;
```


### canaryClaimCount

```solidity
uint32 public canaryClaimCount;
```


### largestTierClaimed

```solidity
uint8 public largestTierClaimed;
```


### lastCompletedDrawId

```solidity
uint32 public lastCompletedDrawId;
```


### lastCompletedDrawStartedAt_

```solidity
uint64 internal lastCompletedDrawStartedAt_;
```


## Functions
### constructor


```solidity
constructor(
    IERC20 _prizeToken,
    TwabController _twabController,
    uint32 _grandPrizePeriodDraws,
    uint32 _drawPeriodSeconds,
    uint64 nextDrawStartsAt_,
    uint8 _numberOfTiers,
    uint96 _tierShares,
    uint96 _canaryShares,
    uint96 _reserveShares,
    UD2x18 _claimExpansionThreshold,
    SD1x18 _alpha
);
```

### getWinningRandomNumber


```solidity
function getWinningRandomNumber() external view returns (uint256);
```

### getLastCompletedDrawId


```solidity
function getLastCompletedDrawId() external view returns (uint256);
```

### getTotalContributedBetween


```solidity
function getTotalContributedBetween(uint32 _startDrawIdInclusive, uint32 _endDrawIdInclusive)
    external
    view
    returns (uint256);
```

### getContributedBetween

Gets the contributed amount between


```solidity
function getContributedBetween(address _vault, uint32 _startDrawIdInclusive, uint32 _endDrawIdInclusive)
    external
    view
    returns (uint256);
```

### getTierAccrualDurationInDraws


```solidity
function getTierAccrualDurationInDraws(uint8 _tier) external view returns (uint32);
```

### getTierPrizeCount


```solidity
function getTierPrizeCount(uint8 _tier) external pure returns (uint256);
```

### contributePrizeTokens


```solidity
function contributePrizeTokens(address _prizeVault, uint256 _amount) external returns (uint256);
```

### _accountedBalance


```solidity
function _accountedBalance() internal view returns (uint256);
```

### getNextDrawId


```solidity
function getNextDrawId() external view returns (uint256);
```

### lastCompletedDrawStartedAt


```solidity
function lastCompletedDrawStartedAt() external view returns (uint64);
```

### reserve


```solidity
function reserve() external view returns (uint256);
```

### withdrawReserve


```solidity
function withdrawReserve(address _to, uint256 _amount) external;
```

### nextDrawStartsAt

Returns the start time of the draw for the next successful completeAndStartNextDraw


```solidity
function nextDrawStartsAt() external view returns (uint64);
```

### nextDrawEndsAt


```solidity
function nextDrawEndsAt() external view returns (uint64);
```

### _nextDrawStartsAt

Returns the start time of the draw for the next successful completeAndStartNextDraw


```solidity
function _nextDrawStartsAt() internal view returns (uint64);
```

### _nextDrawEndsAt


```solidity
function _nextDrawEndsAt() internal view returns (uint64);
```

### completeAndStartNextDraw


```solidity
function completeAndStartNextDraw(uint256 winningRandomNumber_) external returns (uint32);
```

### _reclaimTierLiquidity


```solidity
function _reclaimTierLiquidity(uint8 _numberOfTiers, uint8 _nextNumberOfTiers) internal view returns (uint256);
```

### _computeDrawDeltaExchangeRate


```solidity
function _computeDrawDeltaExchangeRate(uint8 _numberOfTiers)
    internal
    view
    returns (UD60x18 deltaExchangeRate, uint256 remainder);
```

### _canaryClaimExpansionThreshold


```solidity
function _canaryClaimExpansionThreshold(UD2x18 _claimExpansionThreshold, uint8 _numberOfTiers)
    internal
    view
    returns (uint256);
```

### _prizeClaimExpansionThreshold


```solidity
function _prizeClaimExpansionThreshold(UD2x18 _claimExpansionThreshold, uint8 _numberOfTiers)
    internal
    view
    returns (uint256);
```

### totalDrawLiquidity


```solidity
function totalDrawLiquidity() external view returns (uint256);
```

### claimPrize


```solidity
function claimPrize(address _winner, uint8 _tier, address _to, uint96 _fee, address _feeRecipient)
    external
    returns (uint256);
```

### isWinner

TODO: check that beaconPeriodStartedAt is the timestamp at which the draw started
Add in memory start and end timestamp


```solidity
function isWinner(address _vault, address _user, uint8 _tier) external view returns (bool);
```

### _isWinner

TODO: check that beaconPeriodStartedAt is the timestamp at which the draw started
Add in memory start and end timestamp


```solidity
function _isWinner(address _vault, address _user, uint8 _tier) internal view returns (bool);
```

### calculateTierTwabTimestamps


```solidity
function calculateTierTwabTimestamps(uint8 _tier) external view returns (uint64 startTimestamp, uint64 endTimestamp);
```

### _getVaultUserBalanceAndTotalSupplyTwab


```solidity
function _getVaultUserBalanceAndTotalSupplyTwab(address _vault, address _user, uint256 _drawDuration)
    internal
    view
    returns (uint256 twab, uint256 twabTotalSupply);
```

### getVaultUserBalanceAndTotalSupplyTwab


```solidity
function getVaultUserBalanceAndTotalSupplyTwab(address _vault, address _user, uint256 _drawDuration)
    external
    view
    returns (uint256, uint256);
```

### _getVaultPortion


```solidity
function _getVaultPortion(address _vault, uint32 drawId_, uint32 _durationInDraws, SD59x18 _alpha)
    internal
    view
    returns (SD59x18);
```

### getVaultPortion


```solidity
function getVaultPortion(address _vault, uint32 startDrawId, uint32 endDrawId) external view returns (SD59x18);
```

### calculatePrizeSize


```solidity
function calculatePrizeSize(uint8 _tier) external view returns (uint256);
```

### _calculatePrizeSize


```solidity
function _calculatePrizeSize(uint8 _tier) internal view returns (uint256);
```

### getTierLiquidity


```solidity
function getTierLiquidity(uint8 _tier) external view returns (uint256);
```

### _getLiquidity


```solidity
function _getLiquidity(uint8 _tier, uint256 _shares) internal view returns (uint256);
```

### getTotalShares


```solidity
function getTotalShares() external view returns (uint256);
```

### _getTotalShares


```solidity
function _getTotalShares(uint8 _numberOfTiers) internal view returns (uint256);
```

### estimatedPrizeCount


```solidity
function estimatedPrizeCount() external view returns (uint32);
```

### estimatedPrizeCount


```solidity
function estimatedPrizeCount(uint8 numTiers) external view returns (uint32);
```

### canaryPrizeCountMultiplier


```solidity
function canaryPrizeCountMultiplier(uint8 numTiers) external view returns (UD60x18);
```

### canaryPrizeCount


```solidity
function canaryPrizeCount() external view returns (uint32);
```

### canaryPrizeCount


```solidity
function canaryPrizeCount(uint8 _numTiers) external view returns (uint32);
```

### _estimatedPrizeCount


```solidity
function _estimatedPrizeCount(uint8 numTiers) internal view returns (uint32);
```

### _canaryPrizeCount


```solidity
function _canaryPrizeCount(uint8 numTiers) internal view returns (UD60x18);
```

## Events
### ClaimedPrize

```solidity
event ClaimedPrize(
    uint32 indexed drawId,
    address indexed vault,
    address indexed winner,
    uint8 tier,
    uint152 payout,
    address to,
    uint96 fee,
    address feeRecipient
);
```

## Structs
### ClaimRecord

```solidity
struct ClaimRecord {
    uint32 drawId;
    uint8 claimedTiers;
}
```

