[Git Source](https://github.com/generationsoftware/pt-v5-draw-manager/blob/1fe208b28f371d393c8889323b4f11e8cc58fcb4/src/DrawManager.sol)

**Author:**
G9 Software Inc.

The DrawManager contract is a permissionless RNG incentive layer for a Prize Pool.


## State Variables
### prizePool
================= Variables =================

The prize pool that this DrawManager is bound to

*This contract should be the draw manager of the prize pool.*


```solidity
PrizePool public immutable prizePool;
```


### rng
The random number generator that this DrawManager uses to generate random numbers


```solidity
IRng public immutable rng;
```


### auctionDuration
Duration of the auction in seconds


```solidity
uint48 public immutable auctionDuration;
```


### auctionTargetTime
The target duration of the auctions (elapsed time at close of auction)


```solidity
uint48 public immutable auctionTargetTime;
```


### _auctionTargetTimeFraction
The target time to complete the auction as a fraction of the auction duration

*This just saves some calculations and is a duplicate of auctionTargetTime*


```solidity
UD2x18 internal immutable _auctionTargetTimeFraction;
```


### maxRewards
The maximum total rewards for both auctions for a single draw


```solidity
uint256 public immutable maxRewards;
```


### maxRetries
The maximum number of times a start RNG request can be retried on failure.


```solidity
uint256 public immutable maxRetries;
```


### vaultBeneficiary
The address of a vault to contribute remaining reserve on behalf of


```solidity
address public immutable vaultBeneficiary;
```


### _startDrawAuctions
A stack of the last Start Draw Auction results


```solidity
StartDrawAuction[] internal _startDrawAuctions;
```


### lastStartDrawFraction
The last reward fraction used for the start rng auction


```solidity
UD2x18 public lastStartDrawFraction;
```


### lastFinishDrawFraction
The last reward fraction used for the finish draw auction


```solidity
UD2x18 public lastFinishDrawFraction;
```


## Functions
### constructor

================= Constructor =================

Deploy the RngAuction smart contract.


```solidity
constructor(
    PrizePool _prizePool,
    IRng _rng,
    uint48 _auctionDuration,
    uint48 _auctionTargetTime,
    UD2x18 _firstStartDrawTargetFraction,
    UD2x18 _firstFinishDrawTargetFraction,
    uint256 _maxRewards,
    uint256 _maxRetries,
    address _vaultBeneficiary
);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_prizePool`|`PrizePool`|Address of the Prize Pool|
|`_rng`|`IRng`|Address of the RNG service|
|`_auctionDuration`|`uint48`|Auction duration in seconds|
|`_auctionTargetTime`|`uint48`|Target time to complete the auction in seconds|
|`_firstStartDrawTargetFraction`|`UD2x18`|The expected reward fraction for the first start rng auction (to help fine-tune the system)|
|`_firstFinishDrawTargetFraction`|`UD2x18`|The expected reward fraction for the first finish draw auction (to help fine-tune the system)|
|`_maxRewards`|`uint256`|The maximum amount of rewards that can be allocated to the auction|
|`_maxRetries`|`uint256`|The maximum number of times a start RNG request can be retried on failure.|
|`_vaultBeneficiary`|`address`|The address of a vault to contribute remaining reserve on behalf of|


### startDraw

================= External =================

Completes the start draw auction.

*Will revert if recipient is zero, the draw id to award has not closed, the prize pool is shutdown, the start draw was already called for this draw, or if the rng is invalid.*


```solidity
function startDraw(address _rewardRecipient, uint32 _rngRequestId) external returns (uint24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_rewardRecipient`|`address`|Address that will be allocated the reward for starting the RNG request. This reward can be withdrawn from the Prize Pool after it is successfully awarded.|
|`_rngRequestId`|`uint32`|The RNG request ID to use for randomness. This request must be made in the same block as this call.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint24`|The draw id for which start draw was called.|


### canStartDraw

Checks if the start draw can be called.


```solidity
function canStartDraw() public view returns (bool);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if start draw can be called, false otherwise|


### startDrawReward

Calculates the current reward for starting the draw. If start draw cannot be called, this will be zero.


```solidity
function startDrawReward() public view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The current reward denominated in prize tokens of the target prize pool.|


### finishDraw

Called to award the prize pool and pay out rewards.


```solidity
function finishDraw(address _rewardRecipient) external returns (uint24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_rewardRecipient`|`address`|The recipient of the finish draw reward.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint24`|The awarded draw ID|


### canFinishDraw

Determines whether finish draw can be called.


```solidity
function canFinishDraw() public view returns (bool);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the finish draw can be called, false otherwise.|


### finishDrawReward

Calculates the reward for calling finishDraw.


```solidity
function finishDrawReward() public view returns (uint256 reward);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`reward`|`uint256`|The current reward denominated in prize tokens|


### getLastStartDrawAuction

================= State =================

The last auction results.


```solidity
function getLastStartDrawAuction() public view returns (StartDrawAuction memory result);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`result`|`StartDrawAuction`|StartDrawAuctions struct from the last auction.|


### getStartDrawAuctionCount

Returns the number of start draw auctions.


```solidity
function getStartDrawAuctionCount() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The number of start draw auctions.|


### getStartDrawAuction

Returns the start draw auction at the given index.


```solidity
function getStartDrawAuction(uint256 _index) external view returns (StartDrawAuction memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_index`|`uint256`|The index of the start draw auction to return.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`StartDrawAuction`|The start draw auction at the given index.|


### _computeFinishDrawReward

Computes what the reward and reward fraction would be for the finish draw

*Caps the reward such that the total rewards cannot exceed the available rewards*


```solidity
function _computeFinishDrawReward(
    uint256 _auctionOpenedAt,
    uint256 _auctionClosedAt,
    uint256 _availableRewards,
    UD2x18 _fractionalRewardsLeft
) internal view returns (uint256 reward, UD2x18 fraction);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_auctionOpenedAt`|`uint256`|The time at which the auction started|
|`_auctionClosedAt`|`uint256`|The time at which the auction closed|
|`_availableRewards`|`uint256`|The amount of rewards available|
|`_fractionalRewardsLeft`|`UD2x18`|The fraction of rewards that is available|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`reward`|`uint256`|The reward for the finish draw auction|
|`fraction`|`UD2x18`|The reward fraction for the finish draw auction|


### _computeStartDrawRewards

Computes the rewards and reward fractions for the start draw auctions

*Caps the reward such that the total rewards cannot exceed the available rewards*


```solidity
function _computeStartDrawRewards(uint256 _firstAuctionOpenedAt, uint256 _availableRewards)
    internal
    view
    returns (uint256[] memory rewards, UD2x18[] memory fractions, UD2x18 totalRewardFractionLeft);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_firstAuctionOpenedAt`|`uint256`|The time at which the first auction started|
|`_availableRewards`|`uint256`|The amount of rewards available|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`rewards`|`uint256[]`|The rewards for the start draw auctions|
|`fractions`|`UD2x18[]`|The reward fractions for the start draw auctions|
|`totalRewardFractionLeft`|`UD2x18`|The total fractional rewards left [0.0, 1.0] range|


### _computeStartDrawReward

Computes the reward and reward fraction for the start draw auction

*Caps the reward such that it cannot exceed the remaining amount*


```solidity
function _computeStartDrawReward(
    uint256 _auctionOpenedAt,
    uint256 _auctionClosedAt,
    uint256 _availableRewards,
    UD2x18 _fractionalRewardsLeft
) internal view returns (uint256 reward, UD2x18 fraction);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_auctionOpenedAt`|`uint256`|The time at which the auction started|
|`_auctionClosedAt`|`uint256`|The time at which the auction closed|
|`_availableRewards`|`uint256`|The amount of rewards available|
|`_fractionalRewardsLeft`|`UD2x18`|The fraction of rewards that is available|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`reward`|`uint256`|The reward for the start draw auction|
|`fraction`|`UD2x18`|The reward fraction for the start draw auction|


### _isAuctionExpired

================= Internal =================

Checks if the auction has expired.


```solidity
function _isAuctionExpired(uint256 closedAt) internal view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`closedAt`|`uint256`|The time at which the auction started|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the auction has expired, false otherwise|


### _reward

Allocates the reward to the recipient.


```solidity
function _reward(address _recipient, uint256 _amount) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_recipient`|`address`|The recipient of the reward|
|`_amount`|`uint256`|The amount of the reward|


### _computeAvailableRewards

Computes the available rewards for the auction (limited by max).


```solidity
function _computeAvailableRewards() internal view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of rewards available for the auction|


### _computeElapsedTime

Calculates the elapsed time for the current RNG auction.


```solidity
function _computeElapsedTime(uint256 _startTimestamp, uint256 _endTimestamp) internal pure returns (uint48);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint48`|The elapsed time since the start of the current RNG auction in seconds.|


## Events
### DrawStarted
================= Events =================

Emitted when start draw is called.


```solidity
event DrawStarted(
    address indexed sender,
    address indexed recipient,
    uint24 indexed drawId,
    uint48 elapsedTime,
    uint256 reward,
    uint32 rngRequestId,
    uint64 count
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address that triggered the rng auction|
|`recipient`|`address`|The recipient of the auction reward|
|`drawId`|`uint24`|The draw id that this request is for|
|`elapsedTime`|`uint48`|The amount of time that had elapsed when start draw was called|
|`reward`|`uint256`|The reward for the start draw auction|
|`rngRequestId`|`uint32`|The RNGInterface request ID|
|`count`|`uint64`|The number of start draw auctions, including this one.|

### DrawFinished
Emitted when the finish draw is called


```solidity
event DrawFinished(
    address indexed sender,
    address indexed recipient,
    uint24 indexed drawId,
    uint48 elapsedTime,
    uint256 reward,
    uint256 contribution
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The address that triggered the finish draw auction|
|`recipient`|`address`|The recipient of the finish draw auction reward|
|`drawId`|`uint24`|The draw id|
|`elapsedTime`|`uint48`|The amount of time that had elapsed between start draw and finish draw|
|`reward`|`uint256`|The reward for the finish draw auction|
|`contribution`|`uint256`|The amount of tokens contributed to the prize pool on behalf of the vault beneficiary|


## Structs
### StartDrawAuction
A struct that stores the details of a Start Draw auction


```solidity
struct StartDrawAuction {
    address recipient;
    uint40 closedAt;
    uint24 drawId;
    uint32 rngRequestId;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`recipient`|`address`|The recipient of the reward|
|`closedAt`|`uint40`|The time at which the auction closed|
|`drawId`|`uint24`|The draw id that the auction started|
|`rngRequestId`|`uint32`|The id of the RNG request that was made|

