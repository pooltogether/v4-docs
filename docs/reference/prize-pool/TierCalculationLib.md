[Git Source](https://github.com/generationsoftware/pt-v5-prize-pool/blob/568ca55a911a9310bc767a173a0c8a734f7f158c/src/libraries/TierCalculationLib.sol)

**Author:**
PoolTogether Inc. Team

Provides helper functions to assist in calculating tier prize counts, frequency, and odds.


## Functions
### getTierOdds

Calculates the odds of a tier occurring.


```solidity
function getTierOdds(uint8 _tier, uint8 _numberOfTiers, uint24 _grandPrizePeriod) internal pure returns (SD59x18);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tier`|`uint8`|The tier to calculate odds for|
|`_numberOfTiers`|`uint8`|The total number of tiers|
|`_grandPrizePeriod`|`uint24`|The number of draws between grand prizes|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`SD59x18`|The odds that a tier should occur for a single draw.|


### estimatePrizeFrequencyInDraws

Estimates the number of draws between a tier occurring.

*Limits the frequency to the grand prize period in draws.*


```solidity
function estimatePrizeFrequencyInDraws(SD59x18 _tierOdds, uint24 _grandPrizePeriod) internal pure returns (uint24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tierOdds`|`SD59x18`|The odds for the tier to calculate the frequency of|
|`_grandPrizePeriod`|`uint24`|The number of draws between grand prizes|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint24`|The estimated number of draws between the tier occurring|


### prizeCount

Computes the number of prizes for a given tier.


```solidity
function prizeCount(uint8 _tier) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tier`|`uint8`|The tier to compute for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The number of prizes|


### isWinner

Determines if a user won a prize tier.


```solidity
function isWinner(
    uint256 _userSpecificRandomNumber,
    uint256 _userTwab,
    uint256 _vaultTwabTotalSupply,
    SD59x18 _vaultContributionFraction,
    SD59x18 _tierOdds
) internal pure returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_userSpecificRandomNumber`|`uint256`|The random number to use as entropy|
|`_userTwab`|`uint256`|The user's time weighted average balance|
|`_vaultTwabTotalSupply`|`uint256`|The vault's time weighted average total supply|
|`_vaultContributionFraction`|`SD59x18`|The portion of the prize that was contributed by the vault|
|`_tierOdds`|`SD59x18`|The odds of the tier occurring|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the user won the tier, false otherwise|


### calculatePseudoRandomNumber

The user-held portion of the total supply is the "winning zone".
If the above pseudo-random number falls within the winning zone, the user has won this tier.
However, we scale the size of the zone based on:
- Odds of the tier occurring
- Number of prizes
- Portion of prize that was contributed by the vault

Calculates a pseudo-random number that is unique to the user, tier, and winning random number.


```solidity
function calculatePseudoRandomNumber(
    uint24 _drawId,
    address _vault,
    address _user,
    uint8 _tier,
    uint32 _prizeIndex,
    uint256 _winningRandomNumber
) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_drawId`|`uint24`|The draw id the user is checking|
|`_vault`|`address`|The vault the user deposited into|
|`_user`|`address`|The user|
|`_tier`|`uint8`|The tier|
|`_prizeIndex`|`uint32`|The particular prize index they are checking|
|`_winningRandomNumber`|`uint256`|The winning random number|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|A pseudo-random number|


### calculateWinningZone

Calculates the winning zone for a user. If their pseudo-random number falls within this zone, they win the tier.


```solidity
function calculateWinningZone(uint256 _userTwab, SD59x18 _vaultContributionFraction, SD59x18 _tierOdds)
    internal
    pure
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_userTwab`|`uint256`|The user's time weighted average balance|
|`_vaultContributionFraction`|`SD59x18`|The portion of the prize that was contributed by the vault|
|`_tierOdds`|`SD59x18`|The odds of the tier occurring|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The winning zone for the user.|


### tierPrizeCountPerDraw

Computes the estimated number of prizes per draw for a given tier and tier odds.


```solidity
function tierPrizeCountPerDraw(uint8 _tier, SD59x18 _odds) internal pure returns (uint32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tier`|`uint8`|The tier|
|`_odds`|`SD59x18`|The odds of the tier occurring for the draw|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint32`|The estimated number of prizes per draw for the given tier and tier odds|


### isValidTier

Checks whether a tier is a valid tier


```solidity
function isValidTier(uint8 _tier, uint8 _numberOfTiers) internal pure returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tier`|`uint8`|The tier to check|
|`_numberOfTiers`|`uint8`|The number of tiers|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the tier is valid, false otherwise|


