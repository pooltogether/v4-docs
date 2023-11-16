[Git Source](https://github.com/GenerationSoftware/pt-v5-draw-auction/blob/1f623e423d34437096ddfb3c146d64f61b37688e/src/abstract/RngAuctionRelayer.sol)



Base contarct that relays RNG auction results to a listener

## Events

## Variables

### rngAuction

```solidity
contract RngAuction rngAuction
```

The RNG Auction to get the random number from

## Functions

## Structs

## Errors

### RngNotCompleted

```solidity
error RngNotCompleted()
```

Emitted when the RNG has not yet completed

### RngAuctionIsZeroAddress

```solidity
error RngAuctionIsZeroAddress()
```

Emitted when the RngAuction is zero

### RewardRecipientIsZeroAddress

```solidity
error RewardRecipientIsZeroAddress()
```

Emitted when recipient is zero

