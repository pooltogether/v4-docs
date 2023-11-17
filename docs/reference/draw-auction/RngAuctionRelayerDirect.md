[Git Source](https://github.com/GenerationSoftware/pt-v5-draw-auction/blob/1f623e423d34437096ddfb3c146d64f61b37688e/src/RngAuctionRelayerDirect.sol)



This contract will allow anyone to trigger the relay of RNG results to an IRngAuctionRelayListener.

## Events

### DirectRelaySuccess

```solidity
event DirectRelaySuccess(address rewardRecipient, bytes returnData)
```

Emitted when the relay was successful.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| rewardRecipient | address | The address of the reward recipient. |
| returnData | bytes | The return data from the relay listener. |

## Variables

## Functions

### constructor

```solidity
constructor(contract RngAuction _rngAuction) public
```

Constructs a new contract

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rngAuction | contract RngAuction | The RNG auction to pull results from. |

### relay

```solidity
function relay(contract IRngAuctionRelayListener _rngAuctionRelayListener, address _relayRewardRecipient) external returns (bytes)
```

Relays the RNG results to an IRngAuctionRelayListener.

_The RNG request must complete before this call can be made_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rngAuctionRelayListener | contract IRngAuctionRelayListener | The address of the IRngAuctionRelayListener to relay to. |
| _relayRewardRecipient | address | The address that shall receive the RngAuctionRelay reward. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes | The return value from the relay listener. |

## Structs

## Errors

### DirectRelayFailed

```solidity
error DirectRelayFailed(bytes returnData)
```

Emitted when the relay call fails

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| returnData | bytes | The revert message from the relay call |

