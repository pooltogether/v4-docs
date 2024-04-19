[Git Source](https://github.com/generationsoftware/pt-v5-draw-manager/blob/f04edd938f0ce3d6bbaf5db2748319d6ebf6b078/src/libraries/RewardLib.sol)

**Author:**
G9 Software Inc.

Library for calculating auction rewards.

*This library uses a parabolic fractional dutch auction (PFDA) to calculate rewards. For more details see https://dev.pooltogether.com/protocol/next/design/draw-auction#parabolic-fractional-dutch-auction-pfda*


## Functions
### fractionalReward

Calculates the fractional reward using a Parabolic Fractional Dutch Auction (PFDA)
given the elapsed time, auction time, and target sale parameters.


```solidity
function fractionalReward(
    uint48 _elapsedTime,
    uint48 _auctionDuration,
    UD2x18 _targetTimeFraction,
    UD2x18 _targetRewardFraction
) internal pure returns (UD2x18);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_elapsedTime`|`uint48`|The elapsed time since the start of the auction in seconds|
|`_auctionDuration`|`uint48`|The auction duration in seconds|
|`_targetTimeFraction`|`UD2x18`|The target sale time as a fraction of the total auction duration (0.0,1.0]|
|`_targetRewardFraction`|`UD2x18`|The target fractional sale price|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`UD2x18`|The reward fraction as a UD2x18 fraction|


### rewards

Calculates rewards to distribute given the available reserve and completed
auction results.

*Each auction takes a fraction of the remaining reserve. This means that if the
reserve is equal to 100 and the first auction takes 50% and the second takes 50%, then
the first reward will be equal to 50 while the second will be 25.*


```solidity
function rewards(Allocation[] memory _allocations, uint256 _reserve) internal pure returns (uint256[] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_allocations`|`Allocation[]`|Auction results to get rewards for|
|`_reserve`|`uint256`|Reserve available for the rewards|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256[]`|Rewards in the same order as the auction results they correspond to|


### reward

Calculates the reward for the given auction result and available reserve.

*If the auction reward recipient is the zero address, no reward will be given.*


```solidity
function reward(UD2x18 _rewardFraction, uint256 _reserve) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_rewardFraction`|`UD2x18`|Reward fraction to get reward for|
|`_reserve`|`uint256`|Reserve available for the reward|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Reward amount|


## Structs
### Allocation
Stores the results of an auction.


```solidity
struct Allocation {
    address recipient;
    UD2x18 rewardFraction;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`recipient`|`address`|The recipient of the auction awards|
|`rewardFraction`|`UD2x18`|The fraction of the available rewards to be sent to the recipient|