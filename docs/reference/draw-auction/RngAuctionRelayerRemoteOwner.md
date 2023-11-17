[Git Source](https://github.com/GenerationSoftware/pt-v5-draw-auction/blob/1f623e423d34437096ddfb3c146d64f61b37688e/src/RngAuctionRelayerRemoteOwner.sol)



This contract allows anyone to relay RNG results to an IRngAuctionRelayListener on another chain.

_This contract uses a Remote Owner, which allows a contract on one chain to operate an address on another chain._

## Events

### RelayedToDispatcher

```solidity
event RelayedToDispatcher(contract IMessageDispatcherOptimism messageDispatcher, uint256 remoteOwnerChainId, contract RemoteOwner remoteOwner, contract IRngAuctionRelayListener remoteRngAuctionRelayListener, address rewardRecipient, bytes32 messageId)
```

Emitted when the relay was successfully dispatched to the ERC-5164 Dispatcher

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| messageDispatcher | contract IMessageDispatcherOptimism | The ERC-5164 Dispatcher to use to bridge messages |
| remoteOwnerChainId | uint256 | The chain ID that the Remote Owner is deployed to. |
| remoteOwner | contract RemoteOwner | The address of the Remote Owner on the other chain whom should call the remote relayer |
| remoteRngAuctionRelayListener | contract IRngAuctionRelayListener | The address of the IRngAuctionRelayListener to relay to on the other chain. |
| rewardRecipient | address | The address that shall receive the RNG relay reward. |
| messageId | bytes32 | The message ID of the dispatched message. |

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
function relay(contract IMessageDispatcherOptimism _messageDispatcher, uint256 _remoteOwnerChainId, contract RemoteOwner _remoteOwner, contract IRngAuctionRelayListener _remoteRngAuctionRelayListener, address _rewardRecipient, uint32 _gasLimit) external returns (bytes32)
```

Relays the RNG results through the 5164 message dispatcher to the remote rngAuctionRelayListener on the other chain.

_Note that some bridges require an additional transaction to bridge the message.
For example, both Arbitrum and zkSync require off-chain information to accomplish this. See ERC-5164 implementations for more details._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _messageDispatcher | contract IMessageDispatcherOptimism | The ERC-5164 Dispatcher to use to bridge messages |
| _remoteOwnerChainId | uint256 | The chain ID that the Remote Owner is deployed to |
| _remoteOwner | contract RemoteOwner | The address of the Remote Owner on the other chain whom should call the remote relayer |
| _remoteRngAuctionRelayListener | contract IRngAuctionRelayListener | The address of the IRngAuctionRelayListener to relay to on the other chain |
| _rewardRecipient | address | The address that shall receive the RngAuctionRelay reward. Note that this address must be able to receive rewards on the other chain. |
| _gasLimit | uint32 | Gas limit at which the message will be executed on the receiving chain |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes32 | The message ID of the dispatched message |

## Structs

## Errors

### MessageDispatcherIsZeroAddress

```solidity
error MessageDispatcherIsZeroAddress()
```

Emitted when the message dispatcher is the zero address.

### RemoteOwnerIsZeroAddress

```solidity
error RemoteOwnerIsZeroAddress()
```

Emitted when the remote owner is the zero address.

### RemoteRngAuctionRelayListenerIsZeroAddress

```solidity
error RemoteRngAuctionRelayListenerIsZeroAddress()
```

Emitted when the relayer listener is the zero address.

### GasLimitIsZero

```solidity
error GasLimitIsZero()
```

Emitted when the `gasLimit` passed to the `relay` function is zero.

