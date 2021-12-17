Contract to distribute rewards to depositors in a pool.
This contract supports the creation of several promotions that can run simultaneously.
In order to calculate user rewards, we use the TWAB (Time-Weighted Average Balance) from the Ticket contract.
This way, users simply need to hold their tickets to be eligible to claim rewards.
Rewards are calculated based on the average amount of tickets they hold during the epoch duration.


## Structs
### `Promotion`
  - address creator
  - address ticket
  - contract IERC20 token
  - uint216 tokensPerEpoch
  - uint32 startTimestamp
  - uint32 epochDuration
  - uint8 numberOfEpochs


## Functions
### createPromotion
```solidity
  function createPromotion(
  ) external returns (uint256)
```
Create a new promotion.
        @dev For sake of simplicity, `msg.sender` will be the creator of the promotion.
        @dev `_latestPromotionId` starts at 0 and is incremented by 1 for each new promotion.
        So the first promotion will have id 1, the second 2, etc.
        @param _ticket Prize Pool ticket address for which the promotion is created
        @param _token Address of the token to be distributed
        @param _tokensPerEpoch Number of tokens to be distributed per epoch
        @param _startTimestamp Timestamp at which the promotion starts
        @param _epochDuration Duration of one epoch in seconds
        @param _numberOfEpochs Number of epochs the promotion will last for
        @return Id of the newly created promotion



### cancelPromotion
```solidity
  function cancelPromotion(
  ) external returns (bool)
```
Cancel currently active promotion and send promotion tokens back to the creator.
        @param _promotionId Promotion id to cancel
        @param _to Address that will receive the remaining tokens if there are any left
        @return true if cancelation was successful



### extendPromotion
```solidity
  function extendPromotion(
  ) external returns (bool)
```
Extend promotion by adding more epochs.
        @param _promotionId Promotion id to extend
        @param _numberOfEpochs Number of epochs to add
        @return true if the operation was successful



### claimRewards
```solidity
  function claimRewards(
  ) external returns (uint256)
```
Claim rewards for a given promotion and epoch.
        @dev Rewards can be claimed on behalf of a user.
        @dev Rewards can only be claimed for a past epoch.
        @param _user Address of the user to claim rewards for
        @param _promotionId Promotion id to claim rewards for
        @param _epochIds Epoch ids to claim rewards for
        @return Amount of rewards claimed



### getPromotion
```solidity
  function getPromotion(
  ) external returns (struct ITwabRewards.Promotion)
```
Get settings for a specific promotion.
        @param _promotionId Promotion id to get settings for
        @return Promotion settings



### getCurrentEpochId
```solidity
  function getCurrentEpochId(
  ) external returns (uint256)
```
Get the current epoch id of a promotion.
        @dev Epoch ids and their boolean values are tightly packed and stored in a uint256, so epoch id starts at 0.
        @param _promotionId Promotion id to get current epoch for
        @return Epoch id



### getRemainingRewards
```solidity
  function getRemainingRewards(
  ) external returns (uint256)
```
Get the total amount of tokens left to be rewarded.
        @param _promotionId Promotion id to get the total amount of tokens left to be rewarded for
        @return Amount of tokens left to be rewarded



### getRewardsAmount
```solidity
  function getRewardsAmount(
  ) external returns (uint256[])
```
Get amount of tokens to be rewarded for a given epoch.
        @dev Will be 0 if user has already claimed rewards for the epoch.
        @param _user Address of the user to get amount of rewards for
        @param _promotionId Promotion id from which the epoch is
        @param _epochIds Epoch ids to get reward amount for
        @return Amount of tokens to be rewarded



## Events
### PromotionCreated
```solidity
  event PromotionCreated(
  )
```
Emitted when a promotion is created.
        @param promotionId Id of the newly created promotion


### PromotionCancelled
```solidity
  event PromotionCancelled(
  )
```
Emitted when a promotion is cancelled.
        @param promotionId Id of the promotion being cancelled
        @param amount Amount of tokens transferred to the promotion creator


### PromotionExtended
```solidity
  event PromotionExtended(
  )
```
Emitted when a promotion is extended.
        @param promotionId Id of the promotion being extended
        @param numberOfEpochs Number of epochs the promotion has been extended by


### RewardsClaimed
```solidity
  event RewardsClaimed(
  )
```
Emitted when rewards have been claimed.
        @param promotionId Id of the promotion for which epoch rewards were claimed
        @param epochIds Ids of the epochs being claimed
        @param user Address of the user for which the rewards were claimed
        @param amount Amount of tokens transferred to the recipient address


