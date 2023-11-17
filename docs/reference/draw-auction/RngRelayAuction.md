[Git Source](https://github.com/GenerationSoftware/pt-v5-draw-auction/blob/1f623e423d34437096ddfb3c146d64f61b37688e/src/RngRelayAuction.sol)



This contract auctions off the RNG relay, then closes the Prize Pool using the RNG results.

## Events

### AuctionRewardAllocated

```solidity
event AuctionRewardAllocated(uint32 sequenceId, address recipient, uint32 index, uint256 reward)
```

Emitted for each auction that is rewarded within the sequence.

_Note that the reward fractions compound_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sequenceId | uint32 | The sequence ID of the auction |
| recipient | address | The recipient of the reward |
| index | uint32 | The order in which this reward occurred |
| reward | uint256 | The reward amount |

### RngSequenceCompleted

```solidity
event RngSequenceCompleted(uint32 sequenceId, uint32 drawId)
```

Emitted once when the sequence is completed and the Prize Pool draw is closed.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sequenceId | uint32 | The sequence id |
| drawId | uint32 | The draw id that was closed |

## Variables

### prizePool

```solidity
contract PrizePool prizePool
```

The PrizePool whose draw will be closed.

### rngAuctionRelayer

```solidity
address rngAuctionRelayer
```

The relayer that RNG results must originate from.

_Note that this may be a Remote Owner if relayed over an ERC-5164 bridge._

### maxRewards

```solidity
uint256 maxRewards
```

The maximum number of rewards that will be distributed per sequence.

## Functions

### constructor

```solidity
constructor(contract PrizePool prizePool_, uint64 auctionDurationSeconds_, uint64 auctionTargetTime_, address _rngAuctionRelayer, UD2x18 firstAuctionTargetRewardFraction_, uint256 _maxRewards) public
```

Construct a new contract

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| prizePool_ | contract PrizePool | The target Prize Pool to close draws for |
| auctionDurationSeconds_ | uint64 | The auction duration in seconds |
| auctionTargetTime_ | uint64 | The target time to complete the auction |
| _rngAuctionRelayer | address | The relayer that RNG results must originate from |
| firstAuctionTargetRewardFraction_ | UD2x18 | Target reward fraction to complete the first auction |
| _maxRewards | uint256 | The maximum number of rewards that will be distributed per sequence. |

### rngComplete

```solidity
function rngComplete(uint256 _randomNumber, uint256 _rngCompletedAt, address _rewardRecipient, uint32 _sequenceId, struct AuctionResult _rngAuctionResult) external returns (bytes32)
```

Called by the relayer to complete the Rng relay auction.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _randomNumber | uint256 | The random number that was generated |
| _rngCompletedAt | uint256 | The timestamp that the RNG was completed at |
| _rewardRecipient | address | The recipient of the relay auction reward (the recipient can withdraw the rewards from the Prize Pool once the auction is complete) |
| _sequenceId | uint32 | The sequence ID of the auction |
| _rngAuctionResult | struct AuctionResult | The result of the RNG auction |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | The closed draw ID converted to bytes32 |
### computeRewards

```solidity
function computeRewards(struct AuctionResult[] __auctionResults) external view returns (uint256[])
```

Computes the actual rewards that will be allocated to the recipients using the current Prize Pool reserve.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| __auctionResults | struct AuctionResult[] | The auction results to use for calculation |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256[] | rewards The rewards that will be allocated |
### computeRewardsWithTotal

```solidity
function computeRewardsWithTotal(struct AuctionResult[] __auctionResults, uint256 _totalReserve) external pure returns (uint256[])
```

Computes the actual rewards that will be allocated to the recipients given the passed total reserve

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| __auctionResults | struct AuctionResult[] | The auction results to use for calculation |
| _totalReserve | uint256 | The total reserve to use for calculation |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256[] | rewards The rewards that will be allocated. |
### isSequenceCompleted

```solidity
function isSequenceCompleted(uint32 _sequenceId) external view returns (bool)
```

Returns whether the given sequence has complete.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _sequenceId | uint32 | The sequence to check |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if the sequence has already completed |
### auctionDuration

```solidity
function auctionDuration() external view returns (uint64)
```

Returns the duration of the auction in seconds.

### computeRewardFraction

```solidity
function computeRewardFraction(uint64 _auctionElapsedTime) external view returns (UD2x18)
```

Computes the reward fraction for the given auction elapsed time

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _auctionElapsedTime | uint64 | The elapsed time of the auction |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | UD2x18 | The reward fraction |
### isAuctionOpen

```solidity
function isAuctionOpen(uint32 _sequenceId, uint256 _rngCompletedAt) external view returns (bool)
```

Returns whether the auction is still open

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if the , false otherwise |
### lastSequenceId

```solidity
function lastSequenceId() external view returns (uint32)
```

Returns the last completed sequence id

### getLastAuctionResult

```solidity
function getLastAuctionResult() external view returns (struct AuctionResult)
```

Returns the last auction result

## Structs

## Errors

### AuctionDurationZero

```solidity
error AuctionDurationZero()
```

Thrown if the auction period is zero.

### AuctionTargetTimeZero

```solidity
error AuctionTargetTimeZero()
```

Thrown if the auction target time is zero.

### UnauthorizedRelayer

```solidity
error UnauthorizedRelayer(address relayer)
```

Thrown if the caller is not the relayer.

### AuctionTargetTimeExceedsDuration

```solidity
error AuctionTargetTimeExceedsDuration(uint64 auctionDuration, uint64 auctionTargetTime)
```

Thrown if the auction target time exceeds the auction duration.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| auctionDuration | uint64 | The auction duration in seconds |
| auctionTargetTime | uint64 | The auction target time to complete in seconds |

### TargetRewardFractionGTOne

```solidity
error TargetRewardFractionGTOne()
```

Thrown when the first auction target reward fraction is greater than one.

### RngRelayerZeroAddress

```solidity
error RngRelayerZeroAddress()
```

Thrown if the RngAuction address is the zero address.

### SequenceAlreadyCompleted

```solidity
error SequenceAlreadyCompleted()
```

Thrown if the current sequence has already been completed.

### AuctionExpired

```solidity
error AuctionExpired()
```

Thrown if the current draw auction has expired.

### PrizePoolZeroAddress

```solidity
error PrizePoolZeroAddress()
```

Thrown if the PrizePool address is the zero address.

### MaxRewardIsZero

```solidity
error MaxRewardIsZero()
```

Thrown if the max reward is zero.

### RewardRecipientIsZeroAddress

```solidity
error RewardRecipientIsZeroAddress()
```

Emitted when recipient is zero

