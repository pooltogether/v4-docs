[Git Source](https://github.com/GenerationSoftware/pt-v5-draw-auction/blob/1f623e423d34437096ddfb3c146d64f61b37688e/src/RngAuction.sol)



The RngAuction allows anyone to request a new random number using the RNG service set.
        The auction incentivises RNG requests to be started in-sync with prize pool draw
        periods across all chains.

## Events

### SetNextRngService

```solidity
event SetNextRngService(contract RNGInterface rngService)
```

Emitted when the RNG service address is set.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| rngService | contract RNGInterface | RNG service address |

### RngAuctionCompleted

```solidity
event RngAuctionCompleted(address sender, address recipient, uint32 sequenceId, contract RNGInterface rng, uint32 rngRequestId, uint64 elapsedTime, UD2x18 rewardFraction)
```

Emitted when the auction is completed.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address |  |
| recipient | address | The recipient of the auction reward |
| sequenceId | uint32 | The sequence ID for the auction |
| rng | contract RNGInterface | The RNGInterface that was used for this auction |
| rngRequestId | uint32 | The RNGInterface request ID |
| elapsedTime | uint64 | The amount of time that the auction ran for in seconds |
| rewardFraction | UD2x18 | The fraction of the available rewards to be allocated to the recipient |

## Variables

### auctionDuration

```solidity
uint64 auctionDuration
```

Duration of the auction in seconds

_This must always be less than the sequence period since the auction needs to complete each period._

### auctionTargetTime

```solidity
uint64 auctionTargetTime
```

The target time to complete the auction in seconds

### sequencePeriod

```solidity
uint64 sequencePeriod
```

Duration of the sequence that the auction should align with

_This must always be greater than the auction duration._

### sequenceOffset

```solidity
uint64 sequenceOffset
```

Offset of the sequence in seconds

_If the next sequence starts at unix timestamp `t`, then a valid offset is equal to `t % sequencePeriod`.
If the offset is set to some point in the future, some calculations will fail until that time, effectively
preventing any auctions until then._

## Functions

### constructor

```solidity
constructor(contract RNGInterface rng_, address owner_, uint64 sequencePeriod_, uint64 sequenceOffset_, uint64 auctionDurationSeconds_, uint64 auctionTargetTime_, UD2x18 firstAuctionTargetRewardFraction_) public
```

Deploy the RngAuction smart contract.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| rng_ | contract RNGInterface | Address of the RNG service |
| owner_ | address | Address of the RngAuction owner. The owner may swap out the RNG service. |
| sequencePeriod_ | uint64 | Sequence period in seconds |
| sequenceOffset_ | uint64 | Sequence offset in seconds |
| auctionDurationSeconds_ | uint64 | Auction duration in seconds |
| auctionTargetTime_ | uint64 | Target time to complete the auction in seconds |
| firstAuctionTargetRewardFraction_ | UD2x18 | Target reward fraction to complete the first auction |

### startRngRequest

```solidity
function startRngRequest(address _rewardRecipient) external
```

Starts the RNG Request, ends the current auction, and stores the reward fraction to
         be allocated to the recipient.

_Will revert if the current auction has already been completed or expired.
    If the RNG service expects the fee to already be in possession, the caller should not
         call this function directly and should instead call a helper function that transfers
         the funds to the RNG service before calling this function.
    If there is a pending RNG service (see _nextRng), it will be swapped in before the
         auction is completed._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rewardRecipient | address | Address that will be allocated the auction reward for starting the RNG request. The recipient can withdraw the rewards from the Prize Pools that use the random number once all subsequent auctions are complete. |

### canStartNextSequence

```solidity
function canStartNextSequence() external view returns (bool)
```

Determines if the next sequence can be started.

_The auction is complete when the RNG has been requested for the current sequence, therefore
the next sequence can be started if the current sequenceId is different from the last
auction's sequenceId._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if the next sequence can be started, false otherwise. |
### isAuctionOpen

```solidity
function isAuctionOpen() external view returns (bool)
```

Checks if the auction is still open and if it can be completed.

_The auction is open if RNG has not been requested yet this sequence and the
auction has not expired._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if the auction is open and can be completed, false otherwise. |
### auctionElapsedTime

```solidity
function auctionElapsedTime() external view returns (uint64)
```

The amount of time remaining in the current open auction

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint64 | The elapsed time since the auction started in seconds |
### currentFractionalReward

```solidity
function currentFractionalReward() external view returns (UD2x18)
```

Calculates the reward fraction for the current auction if it were to be completed at this time.

_Uses the last sold fraction as the target price for this auction._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | UD2x18 | The current reward fraction as a UD2x18 value |
### getLastAuction

```solidity
function getLastAuction() external view returns (struct RngAuctionResult)
```

The last auction results.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct RngAuctionResult | RngAuctionResults struct from the last auction. |
### getLastAuctionResult

```solidity
function getLastAuctionResult() external view returns (struct AuctionResult)
```

Returns the last auction as an AuctionResult struct to be used to calculate rewards.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct AuctionResult | AuctionResult struct with data from the last auction |
### openSequenceId

```solidity
function openSequenceId() external view returns (uint32)
```

Calculates a unique identifier for the current sequence.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint32 | The current sequence ID. |
### lastSequenceId

```solidity
function lastSequenceId() external view returns (uint32)
```

Returns the sequence ID from the last auction.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint32 | The last sequence ID. |
### isRngComplete

```solidity
function isRngComplete() external view returns (bool)
```

Returns whether the RNG request has completed or not for the current sequence.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if the RNG request has completed, false otherwise. |
### getRngResults

```solidity
function getRngResults() external returns (uint256 randomNumber, uint64 rngCompletedAt)
```

Returns the result of the last RNG Request.

_The RNG service may revert if the current RNG request is not complete.
Not marked as view since RNGInterface.randomNumber is not a view function._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| randomNumber | uint256 | The random number result |
| rngCompletedAt | uint64 | The timestamp at which the random number request was completed |
### computeRewardFraction

```solidity
function computeRewardFraction(uint64 __auctionElapsedTime) external view returns (UD2x18)
```

Computes the reward fraction for the given auction elapsed time.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| __auctionElapsedTime | uint64 | The elapsed time of the auction in seconds |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | UD2x18 | The reward fraction as a UD2x18 value |
### getLastRngService

```solidity
function getLastRngService() external view returns (contract RNGInterface)
```

Returns the RNG service used to generate random numbers.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract RNGInterface | RNG service instance |
### getNextRngService

```solidity
function getNextRngService() external view returns (contract RNGInterface)
```

Returns the pending RNG service that will replace the current service before the next auction completes.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract RNGInterface | RNG service instance |
### setNextRngService

```solidity
function setNextRngService(contract RNGInterface _rngService) external
```

Sets the RNG service used to generate random numbers.

_Only callable by the owner.
The service will not be updated immediately so the current auction is not disturbed. Instead,
it will be swapped out right before the next auction is completed._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rngService | contract RNGInterface | Address of the new RNG service |

## Structs

### RngAuctionResult

```solidity
struct RngAuctionResult {
  address recipient;
  UD2x18 rewardFraction;
  uint32 sequenceId;
  contract RNGInterface rng;
  uint32 rngRequestId;
}
```

## Errors

### AuctionDurationZero

```solidity
error AuctionDurationZero()
```

Thrown when the auction duration is zero.

### AuctionTargetTimeZero

```solidity
error AuctionTargetTimeZero()
```

Thrown if the auction target time is zero.

### AuctionTargetTimeExceedsDuration

```solidity
error AuctionTargetTimeExceedsDuration(uint64 auctionTargetTime, uint64 auctionDuration)
```

Thrown if the auction target time exceeds the auction duration.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| auctionTargetTime | uint64 | The auction target time to complete in seconds |
| auctionDuration | uint64 | The auction duration in seconds |

### SequencePeriodZero

```solidity
error SequencePeriodZero()
```

Thrown when the sequence period is zero.

### AuctionDurationGTSequencePeriod

```solidity
error AuctionDurationGTSequencePeriod(uint64 auctionDuration, uint64 sequencePeriod)
```

Thrown when the auction duration is greater than or equal to the sequence.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| auctionDuration | uint64 | The auction duration in seconds |
| sequencePeriod | uint64 | The sequence period in seconds |

### TargetRewardFractionGTOne

```solidity
error TargetRewardFractionGTOne()
```

Thrown when the first auction target reward fraction is greater than one.

### RngZeroAddress

```solidity
error RngZeroAddress()
```

Thrown when the RNG address passed to the setter function is zero address.

### CannotStartNextSequence

```solidity
error CannotStartNextSequence()
```

Thrown if the next sequence cannot yet be started

### AuctionExpired

```solidity
error AuctionExpired()
```

Thrown if the time elapsed since the start of the auction is greater than the auction duration.

### OwnerZeroAddress

```solidity
error OwnerZeroAddress()
```

Thrown if owner set is the zero address.

### RewardRecipientIsZero

```solidity
error RewardRecipientIsZero()
```

Emitted when the zero address is passed as reward recipient

