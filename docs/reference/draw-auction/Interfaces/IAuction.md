[Git Source](https://github.com/GenerationSoftware/pt-v5-draw-auction/blob/1f623e423d34437096ddfb3c146d64f61b37688e/src/interfaces/IAuction.sol)



Defines some common interfaces for auctions

## Events

## Variables

## Functions

### auctionDuration

```solidity
function auctionDuration() external view returns (uint64)
```

Returns the auction duration in seconds.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint64 | The auction duration in seconds |
### lastSequenceId

```solidity
function lastSequenceId() external view returns (uint32)
```

Returns the last completed auction's sequence id

### computeRewardFraction

```solidity
function computeRewardFraction(uint64 _auctionElapsedTime) external view returns (UD2x18)
```

Computes the reward fraction given the auction elapsed time

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _auctionElapsedTime | uint64 | The elapsed time of the auction |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | UD2x18 | The reward fraction |
### getLastAuctionResult

```solidity
function getLastAuctionResult() external view returns (struct AuctionResult)
```

Returns the results of the last completed auction.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct AuctionResult | auctionResults The completed auction results |

## Structs

### AuctionResult

```solidity
struct AuctionResult {
  address recipient;
  UD2x18 rewardFraction;
}
```

## Errors

