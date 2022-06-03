Contract to distribute rewards to depositors in a pool.
This contract supports the creation of several promotions that can run simultaneously.
In order to calculate user rewards, we use the TWAB (Time-Weighted Average Balance) from the Ticket contract.
This way, users simply need to hold their tickets to be eligible to claim rewards.
Rewards are calculated based on the average amount of tickets they hold during the epoch duration.

This contract supports only one prize pool ticket.
This contract does not support the use of fee on transfer tokens.

## Structs
### `Promotion`
  - address creator
  - uint64 startTimestamp
  - uint8 numberOfEpochs
  - uint48 epochDuration
  - uint48 createdAt
  - contract IERC20 token
  - uint256 tokensPerEpoch
  - uint256 rewardsUnclaimed


## Functions
### constructor
```solidity
  function constructor(
    contract ITicket _ticket
  ) public
```
Constructor of the contract.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_ticket` | contract ITicket | Prize Pool ticket address for which the promotions will be created

### createPromotion
```solidity
  function createPromotion(
    contract IERC20 _token,
    uint64 _startTimestamp,
    uint256 _tokensPerEpoch,
    uint48 _epochDuration,
    uint8 _numberOfEpochs
  ) external returns (uint256)
```
Creates a new promotion.

For sake of simplicity, `msg.sender` will be the creator of the promotion.
`_latestPromotionId` starts at 0 and is incremented by 1 for each new promotion.
So the first promotion will have id 1, the second 2, etc.
The transaction will revert if the amount of reward tokens provided is not equal to `_tokensPerEpoch * _numberOfEpochs`.
This scenario could happen if the token supplied is a fee on transfer one.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_token` | contract IERC20 | Address of the token to be distributed
|`_startTimestamp` | uint64 | Timestamp at which the promotion starts
|`_tokensPerEpoch` | uint256 | Number of tokens to be distributed per epoch
|`_epochDuration` | uint48 | Duration of one epoch in seconds
|`_numberOfEpochs` | uint8 | Number of epochs the promotion will last for

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint256 | Id of the newly created promotion
### endPromotion
```solidity
  function endPromotion(
    uint256 _promotionId,
    address _to
  ) external returns (bool)
```
End currently active promotion and send promotion tokens back to the creator.

Will only send back tokens from the epochs that have not completed.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_promotionId` | uint256 | Promotion id to end
|`_to` | address | Address that will receive the remaining tokens if there are any left

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| bool | true if operation was successful
### destroyPromotion
```solidity
  function destroyPromotion(
    uint256 _promotionId,
    address _to
  ) external returns (bool)
```
Delete an inactive promotion and send promotion tokens back to the creator.

Will send back all the tokens that have not been claimed yet by users.
This function will revert if the promotion is still active.
This function will revert if the grace period is not over yet.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_promotionId` | uint256 | Promotion id to destroy
|`_to` | address | Address that will receive the remaining tokens if there are any left

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| bool | True if operation was successful
### extendPromotion
```solidity
  function extendPromotion(
    uint256 _promotionId,
    uint8 _numberOfEpochs
  ) external returns (bool)
```
Extend promotion by adding more epochs.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_promotionId` | uint256 | Id of the promotion to extend
|`_numberOfEpochs` | uint8 | Number of epochs to add

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| bool | True if the operation was successful
### claimRewards
```solidity
  function claimRewards(
    address _user,
    uint256 _promotionId,
    uint8[] _epochIds
  ) external returns (uint256)
```
Claim rewards for a given promotion and epoch.

Rewards can be claimed on behalf of a user.
Rewards can only be claimed for a past epoch.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_user` | address | Address of the user to claim rewards for
|`_promotionId` | uint256 | Id of the promotion to claim rewards for
|`_epochIds` | uint8[] | Epoch ids to claim rewards for

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint256 | Total amount of rewards claimed
### getPromotion
```solidity
  function getPromotion(
    uint256 _promotionId
  ) external returns (struct ITwabRewards.Promotion)
```
Get settings for a specific promotion.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_promotionId` | uint256 | Id of the promotion to get settings for

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| struct ITwabRewards.Promotion | Promotion settings
### getCurrentEpochId
```solidity
  function getCurrentEpochId(
    uint256 _promotionId
  ) external returns (uint256)
```
Get the current epoch id of a promotion.

Epoch ids and their boolean values are tightly packed and stored in a uint256, so epoch id starts at 0.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_promotionId` | uint256 | Id of the promotion to get current epoch for

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint256 | Current epoch id of the promotion
### getRemainingRewards
```solidity
  function getRemainingRewards(
    uint256 _promotionId
  ) external returns (uint256)
```
Get the total amount of tokens left to be rewarded.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_promotionId` | uint256 | Id of the promotion to get the total amount of tokens left to be rewarded for

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint256 | Amount of tokens left to be rewarded
### getRewardsAmount
```solidity
  function getRewardsAmount(
    address _user,
    uint256 _promotionId,
    uint8[] _epochIds
  ) external returns (uint256[])
```
Get amount of tokens to be rewarded for a given epoch.

Rewards amount can only be retrieved for epochs that are over.
Will revert if `_epochId` is over the total number of epochs or if epoch is not over.
Will return 0 if the user average balance of tickets is 0.
Will be 0 if user has already claimed rewards for the epoch.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_user` | address | Address of the user to get amount of rewards for
|`_promotionId` | uint256 | Id of the promotion from which the epoch is
|`_epochIds` | uint8[] | Epoch ids to get reward amount for

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint256[] | Amount of tokens per epoch to be rewarded
## Events
### PromotionCreated
```solidity
  event PromotionCreated(
    uint256 promotionId
  )
```
Emitted when a promotion is created.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`promotionId`| uint256 | Id of the newly created promotion
### PromotionEnded
```solidity
  event PromotionEnded(
    uint256 promotionId,
    address recipient,
    uint256 amount,
    uint8 epochNumber
  )
```
Emitted when a promotion is ended.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`promotionId`| uint256 | Id of the promotion being ended
|`recipient`| address | Address of the recipient that will receive the remaining rewards
|`amount`| uint256 | Amount of tokens transferred to the recipient
|`epochNumber`| uint8 | Epoch number at which the promotion ended
### PromotionDestroyed
```solidity
  event PromotionDestroyed(
    uint256 promotionId,
    address recipient,
    uint256 amount
  )
```
Emitted when a promotion is destroyed.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`promotionId`| uint256 | Id of the promotion being destroyed
|`recipient`| address | Address of the recipient that will receive the unclaimed rewards
|`amount`| uint256 | Amount of tokens transferred to the recipient
### PromotionExtended
```solidity
  event PromotionExtended(
    uint256 promotionId,
    uint256 numberOfEpochs
  )
```
Emitted when a promotion is extended.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`promotionId`| uint256 | Id of the promotion being extended
|`numberOfEpochs`| uint256 | Number of epochs the promotion has been extended by
### RewardsClaimed
```solidity
  event RewardsClaimed(
    uint256 promotionId,
    uint8[] epochIds,
    address user,
    uint256 amount
  )
```
Emitted when rewards have been claimed.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`promotionId`| uint256 | Id of the promotion for which epoch rewards were claimed
|`epochIds`| uint8[] | Ids of the epochs being claimed
|`user`| address | Address of the user for which the rewards were claimed
|`amount`| uint256 | Amount of tokens transferred to the recipient address
