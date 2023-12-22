[Git Source](https://github.com/GenerationSoftware/pt-v5-twab-rewards/blob/61f78da8544d87324cf78056772dff73c5c9cc28/src/interfaces/ITwabRewards.sol)



**Author:**
PoolTogether Inc. & G9 Software Inc.

TwabRewards contract interface.


## Functions
### createPromotion

Creates a new promotion.


```solidity
function createPromotion(
    address vault,
    IERC20 token,
    uint64 startTimestamp,
    uint256 tokensPerEpoch,
    uint48 epochDuration,
    uint8 numberOfEpochs
) external returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|Address of the vault that the promotion applies to|
|`token`|`IERC20`|Address of the token to be distributed|
|`startTimestamp`|`uint64`|Timestamp at which the promotion starts|
|`tokensPerEpoch`|`uint256`|Number of tokens to be distributed per epoch|
|`epochDuration`|`uint48`|Duration of one epoch in seconds|
|`numberOfEpochs`|`uint8`|Number of epochs the promotion will last for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Id of the newly created promotion|


### endPromotion

End currently active promotion and send promotion tokens back to the creator.

*Will only send back tokens from the epochs that have not completed.*


```solidity
function endPromotion(uint256 promotionId, address to) external returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`promotionId`|`uint256`|Promotion id to end|
|`to`|`address`|Address that will receive the remaining tokens if there are any left|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if operation was successful|


### destroyPromotion

Delete an inactive promotion and send promotion tokens back to the creator.

*Will send back all the tokens that have not been claimed yet by users.*

*This function will revert if the promotion is still active.*

*This function will revert if the grace period is not over yet.*


```solidity
function destroyPromotion(uint256 promotionId, address to) external returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`promotionId`|`uint256`|Promotion id to destroy|
|`to`|`address`|Address that will receive the remaining tokens if there are any left|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if operation was successful|


### extendPromotion

Extend promotion by adding more epochs.


```solidity
function extendPromotion(uint256 promotionId, uint8 numberOfEpochs) external returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`promotionId`|`uint256`|Id of the promotion to extend|
|`numberOfEpochs`|`uint8`|Number of epochs to add|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the operation was successful|


### claimRewards

Claim rewards for a given promotion and epoch.

*Rewards can be claimed on behalf of a user.*

*Rewards can only be claimed for a past epoch.*


```solidity
function claimRewards(address user, uint256 promotionId, uint8[] calldata epochIds) external returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user`|`address`|Address of the user to claim rewards for|
|`promotionId`|`uint256`|Id of the promotion to claim rewards for|
|`epochIds`|`uint8[]`|Epoch ids to claim rewards for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Total amount of rewards claimed|


### getPromotion

Get settings for a specific promotion.


```solidity
function getPromotion(uint256 promotionId) external view returns (Promotion memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`promotionId`|`uint256`|Id of the promotion to get settings for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Promotion`|Promotion settings|


### getCurrentEpochId

Get the current epoch id of a promotion.


```solidity
function getCurrentEpochId(uint256 promotionId) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`promotionId`|`uint256`|Id of the promotion to get current epoch for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Current epoch id of the promotion|


### getRemainingRewards

Get the total amount of tokens left to be rewarded.


```solidity
function getRemainingRewards(uint256 promotionId) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`promotionId`|`uint256`|Id of the promotion to get the total amount of tokens left to be rewarded for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Amount of tokens left to be rewarded|


### getRewardsAmount

Get amount of tokens to be rewarded for a given epoch.

*Rewards amount can only be retrieved for epochs that are over.*

*Will revert if `epochId` is over the total number of epochs or if epoch is not over.*

*Will return 0 if the user average balance for the promoted vault is 0.*

*Will be 0 if user has already claimed rewards for the epoch.*


```solidity
function getRewardsAmount(address user, uint256 promotionId, uint8[] calldata epochIds)
    external
    view
    returns (uint256[] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user`|`address`|Address of the user to get amount of rewards for|
|`promotionId`|`uint256`|Id of the promotion from which the epoch is|
|`epochIds`|`uint8[]`|Epoch ids to get reward amount for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256[]`|Amount of tokens per epoch to be rewarded|

## Structs
### Promotion

Struct to keep track of each promotion's settings.


```solidity
struct Promotion {
    address creator;
    uint64 startTimestamp;
    uint8 numberOfEpochs;
    address vault;
    uint48 epochDuration;
    uint48 createdAt;
    IERC20 token;
    uint256 tokensPerEpoch;
    uint256 rewardsUnclaimed;
}
```

