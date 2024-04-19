[Git Source](https://github.com/GenerationSoftware/pt-v5-twab-rewards/blob/61f78da8544d87324cf78056772dff73c5c9cc28/src/TwabRewards.sol)



**Inherits:**
[ITwabRewards](./ITwabRewards.md), Multicall

**Author:**
PoolTogether Inc. & G9 Software Inc.

Contract to distribute rewards to depositors in a PoolTogether V5 Vault.
This contract supports the creation of several promotions that can run simultaneously.
In order to calculate user rewards, we use the TWAB (Time-Weighted Average Balance) for the vault and depositor.
This way, users simply need to hold their vault tokens to be eligible to claim rewards.
Rewards are calculated based on the average amount of vault tokens they hold during the epoch duration.

*This contract does not support the use of fee on transfer tokens.*


## State Variables
### twabController
TwabController contract from which the promotions read time-weighted average balances from.


```solidity
TwabController public immutable twabController;
```


### GRACE_PERIOD
Period during which the promotion owner can't destroy a promotion.


```solidity
uint32 public constant GRACE_PERIOD = 60 days;
```


### _promotions
Settings of each promotion.


```solidity
mapping(uint256 => Promotion) internal _promotions;
```


### _latestPromotionId
Latest recorded promotion id.

*Starts at 0 and is incremented by 1 for each new promotion. So the first promotion will have id 1, the second 2, etc.*


```solidity
uint256 internal _latestPromotionId;
```


### _claimedEpochs
Keeps track of claimed rewards per user.

*_claimedEpochs[promotionId][user] => claimedEpochs*

*We pack epochs claimed by a user into a uint256. So we can't store more than 256 epochs.*


```solidity
mapping(uint256 => mapping(address => uint256)) internal _claimedEpochs;
```


## Functions
### constructor

Constructor of the contract.


```solidity
constructor(TwabController _twabController);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_twabController`|`TwabController`|The TwabController contract to reference for vault balance and supply|


### createPromotion

Creates a new promotion.

*For sake of simplicity, `msg.sender` will be the creator of the promotion.*

*`_latestPromotionId` starts at 0 and is incremented by 1 for each new promotion.
So the first promotion will have id 1, the second 2, etc.*

*The transaction will revert if the amount of reward tokens provided is not equal to `_tokensPerEpoch * _numberOfEpochs`.
This scenario could happen if the token supplied is a fee on transfer one.*


```solidity
function createPromotion(
    address _vault,
    IERC20 _token,
    uint64 _startTimestamp,
    uint256 _tokensPerEpoch,
    uint48 _epochDuration,
    uint8 _numberOfEpochs
) external override returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`||
|`_token`|`IERC20`||
|`_startTimestamp`|`uint64`||
|`_tokensPerEpoch`|`uint256`||
|`_epochDuration`|`uint48`||
|`_numberOfEpochs`|`uint8`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Id of the newly created promotion|


### endPromotion

End currently active promotion and send promotion tokens back to the creator.

*Will only send back tokens from the epochs that have not completed.*


```solidity
function endPromotion(uint256 _promotionId, address _to) external override returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_promotionId`|`uint256`||
|`_to`|`address`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if operation was successful|


### destroyPromotion

Delete an inactive promotion and send promotion tokens back to the creator.

*Will send back all the tokens that have not been claimed yet by users.*


```solidity
function destroyPromotion(uint256 _promotionId, address _to) external override returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_promotionId`|`uint256`||
|`_to`|`address`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if operation was successful|


### extendPromotion

Extend promotion by adding more epochs.


```solidity
function extendPromotion(uint256 _promotionId, uint8 _numberOfEpochs) external override returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_promotionId`|`uint256`||
|`_numberOfEpochs`|`uint8`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the operation was successful|


### claimRewards

Claim rewards for a given promotion and epoch.

*Rewards can be claimed on behalf of a user.*


```solidity
function claimRewards(address _user, uint256 _promotionId, uint8[] calldata _epochIds)
    external
    override
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_user`|`address`||
|`_promotionId`|`uint256`||
|`_epochIds`|`uint8[]`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Total amount of rewards claimed|


### getPromotion

Get settings for a specific promotion.


```solidity
function getPromotion(uint256 _promotionId) external view override returns (Promotion memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_promotionId`|`uint256`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Promotion`|Promotion settings|


### getCurrentEpochId

Get the current epoch id of a promotion.

*Epoch ids and their boolean values are tightly packed and stored in a uint256, so epoch id starts at 0.*


```solidity
function getCurrentEpochId(uint256 _promotionId) external view override returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_promotionId`|`uint256`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Current epoch id of the promotion|


### getRemainingRewards

Get the total amount of tokens left to be rewarded.


```solidity
function getRemainingRewards(uint256 _promotionId) external view override returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_promotionId`|`uint256`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Amount of tokens left to be rewarded|


### getRewardsAmount

Get amount of tokens to be rewarded for a given epoch.

*Rewards amount can only be retrieved for epochs that are over.*


```solidity
function getRewardsAmount(address _user, uint256 _promotionId, uint8[] calldata _epochIds)
    external
    view
    override
    returns (uint256[] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_user`|`address`||
|`_promotionId`|`uint256`||
|`_epochIds`|`uint8[]`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256[]`|Amount of tokens per epoch to be rewarded|


### _requireNumberOfEpochs

Allow a promotion to be created or extended only by a positive number of epochs.


```solidity
function _requireNumberOfEpochs(uint8 _numberOfEpochs) internal pure;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_numberOfEpochs`|`uint8`|Number of epochs to check|


### _requirePromotionActive

Requires that a promotion is active.


```solidity
function _requirePromotionActive(uint256 _promotionId, Promotion memory _promotion) internal view;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_promotionId`|`uint256`||
|`_promotion`|`Promotion`|Promotion to check|


### _requirePromotionCreator

Requires that msg.sender is the promotion creator.


```solidity
function _requirePromotionCreator(Promotion memory _promotion) internal view;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_promotion`|`Promotion`|Promotion to check|


### _getPromotion

Get settings for a specific promotion.

*Will revert if the promotion does not exist.*


```solidity
function _getPromotion(uint256 _promotionId) internal view returns (Promotion memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_promotionId`|`uint256`|Promotion id to get settings for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Promotion`|Promotion settings|


### _getPromotionEndTimestamp

Compute promotion end timestamp.


```solidity
function _getPromotionEndTimestamp(Promotion memory _promotion) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_promotion`|`Promotion`|Promotion to compute end timestamp for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Promotion end timestamp|


### _getCurrentEpochId

Get the current epoch id of a promotion.

*Epoch ids and their boolean values are tightly packed and stored in a uint256, so epoch id starts at 0.*

*We return the current epoch id if the promotion has not ended.
If the current timestamp is before the promotion start timestamp, we return 0.
Otherwise, we return the epoch id at the current timestamp. This could be greater than the number of epochs of the promotion.*


```solidity
function _getCurrentEpochId(Promotion memory _promotion) internal view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_promotion`|`Promotion`|Promotion to get current epoch for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Epoch id|


### _calculateRewardAmount

Get reward amount for a specific user.

*Rewards can only be calculated once the epoch is over.*

*Will revert if `_epochId` is over the total number of epochs or if epoch is not over.*

*Will return 0 if the user average balance in the vault is 0.*


```solidity
function _calculateRewardAmount(address _user, Promotion memory _promotion, uint8 _epochId)
    internal
    view
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_user`|`address`|User to get reward amount for|
|`_promotion`|`Promotion`|Promotion from which the epoch is|
|`_epochId`|`uint8`|Epoch id to get reward amount for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Reward amount|


### _getRemainingRewards

Get the total amount of tokens left to be rewarded.


```solidity
function _getRemainingRewards(Promotion memory _promotion) internal view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_promotion`|`Promotion`|Promotion to get the total amount of tokens left to be rewarded for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Amount of tokens left to be rewarded|


### _updateClaimedEpoch

Set boolean value for a specific epoch.

*Bits are stored in a uint256 from right to left.
Let's take the example of the following 8 bits word. 0110 0011
To set the boolean value to 1 for the epoch id 2, we need to create a mask by shifting 1 to the left by 2 bits.
We get: 0000 0001 << 2 = 0000 0100
We then OR the mask with the word to set the value.
We get: 0110 0011 | 0000 0100 = 0110 0111*


```solidity
function _updateClaimedEpoch(uint256 _userClaimedEpochs, uint8 _epochId) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_userClaimedEpochs`|`uint256`|Tightly packed epoch ids with their boolean values|
|`_epochId`|`uint8`|Id of the epoch to set the boolean for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Tightly packed epoch ids with the newly boolean value set|


### _isClaimedEpoch

Check if rewards of an epoch for a given promotion have already been claimed by the user.

*Bits are stored in a uint256 from right to left.
Let's take the example of the following 8 bits word. 0110 0111
To retrieve the boolean value for the epoch id 2, we need to shift the word to the right by 2 bits.
We get: 0110 0111 >> 2 = 0001 1001
We then get the value of the last bit by masking with 1.
We get: 0001 1001 & 0000 0001 = 0000 0001 = 1
We then return the boolean value true since the last bit is 1.*


```solidity
function _isClaimedEpoch(uint256 _userClaimedEpochs, uint8 _epochId) internal pure returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_userClaimedEpochs`|`uint256`|Record of epochs already claimed by the user|
|`_epochId`|`uint8`|Epoch id to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|true if the rewards have already been claimed for the given epoch, false otherwise|


## Events
### PromotionCreated
Emitted when a promotion is created.


```solidity
event PromotionCreated(
    uint256 indexed promotionId,
    address indexed vault,
    IERC20 indexed token,
    uint64 startTimestamp,
    uint256 tokensPerEpoch,
    uint48 epochDuration,
    uint8 initialNumberOfEpochs
);
```

### PromotionEnded
Emitted when a promotion is ended.


```solidity
event PromotionEnded(uint256 indexed promotionId, address indexed recipient, uint256 amount, uint8 epochNumber);
```

### PromotionDestroyed
Emitted when a promotion is destroyed.


```solidity
event PromotionDestroyed(uint256 indexed promotionId, address indexed recipient, uint256 amount);
```

### PromotionExtended
Emitted when a promotion is extended.


```solidity
event PromotionExtended(uint256 indexed promotionId, uint256 numberOfEpochs);
```

### RewardsClaimed
Emitted when rewards have been claimed.


```solidity
event RewardsClaimed(uint256 indexed promotionId, uint8[] epochIds, address indexed user, uint256 amount);
```

## Errors
### EpochDurationNotMultipleOfTwabPeriod

Thrown if an epoch duration is not a multiple of the TWAB period length.


```solidity
error EpochDurationNotMultipleOfTwabPeriod(uint48 epochDuration, uint32 twabPeriodLength);
```

### EpochNotOver

Thrown if the rewards for an epoch are being claimed before the epoch is over.


```solidity
error EpochNotOver(uint64 epochEndTimestamp);
```

### ExceedsMaxEpochs

Thrown if a promotion extension would exceed the max number of epochs.


```solidity
error ExceedsMaxEpochs(uint8 epochExtension, uint8 currentEpochs, uint8 maxEpochs);
```

### GracePeriodActive

Thrown if an action cannot be completed while the grace period is active.


```solidity
error GracePeriodActive(uint256 gracePeriodEndTimestamp);
```

### InvalidEpochId

Thrown if an epoch is outside the range of epochs in a promotion.


```solidity
error InvalidEpochId(uint8 epochId, uint8 numberOfEpochs);
```

### InvalidPromotion

Thrown if the promotion is invalid or not initialized.


```solidity
error InvalidPromotion(uint256 promotionId);
```

### OnlyPromotionCreator

Thrown if the sender is not the promotion creator on a creator-only action.


```solidity
error OnlyPromotionCreator(address sender, address creator);
```

### PayeeZeroAddress

Thrown if the address to receive tokens from ending or destroying a promotion is the zero address.


```solidity
error PayeeZeroAddress();
```

### PromotionInactive

Thrown if a promotion is no longer active.


```solidity
error PromotionInactive(uint256 promotionId);
```

### RewardsAlreadyClaimed

Thrown if rewards for the promotion epoch have already been claimed by the user.


```solidity
error RewardsAlreadyClaimed(uint256 promotionId, address user, uint8 epochId);
```

### StartTimeNotAlignedWithTwabPeriod

Thrown if a promotion start time is not aligned with the start of a TWAB period.


```solidity
error StartTimeNotAlignedWithTwabPeriod(uint64 startTimePeriodOffset);
```

### TokensReceivedLessThanExpected

Thrown if the tokens received at the creation of a promotion is less than the expected amount.


```solidity
error TokensReceivedLessThanExpected(uint256 received, uint256 expected);
```

### TwabControllerZeroAddress

Thrown when the TwabController address set in the constructor is the zero address.


```solidity
error TwabControllerZeroAddress();
```

### ZeroEpochDuration

Thrown when a promotion is created with an epoch duration of zero.


```solidity
error ZeroEpochDuration();
```

### ZeroEpochs

Thrown when the number of epochs is zero when it must be greater than zero.


```solidity
error ZeroEpochs();
```

### ZeroTokensPerEpoch

Thrown when a promotion is created with an emission of zero tokens per epoch.


```solidity
error ZeroTokensPerEpoch();
```

