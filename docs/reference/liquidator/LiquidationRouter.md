[Git Source](https://github.com/GenerationSoftware/pt-v5-cgda-liquidator/blob/9a693939b7c71f667ffb0d6066ecd479e9b24345/src/LiquidationRouter.sol)



Serves as the user-facing swapping interface for Liquidation Pairs.

## Events

### LiquidationRouterCreated

```solidity
event LiquidationRouterCreated(contract LiquidationPairFactory liquidationPairFactory)
```

Emitted when the router is created

### SwappedExactAmountOut

```solidity
event SwappedExactAmountOut(contract LiquidationPair liquidationPair, address sender, address receiver, uint256 amountOut, uint256 amountInMax, uint256 amountIn, uint256 deadline)
```

Emitted after a swap occurs

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| liquidationPair | contract LiquidationPair | The pair that was swapped against |
| sender | address | The address that initiated the swap |
| receiver | address | The address that received the output tokens |
| amountOut | uint256 | The amount of output tokens received |
| amountInMax | uint256 | The maximum amount of input tokens that could have been used |
| amountIn | uint256 | The amount of input tokens that were actually used |
| deadline | uint256 |  |

## Variables

## Functions

### constructor

```solidity
constructor(contract LiquidationPairFactory liquidationPairFactory_) public
```

Constructs a new LiquidationRouter

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| liquidationPairFactory_ | contract LiquidationPairFactory | The factory that pairs will be verified to have been created by |

### swapExactAmountOut

```solidity
function swapExactAmountOut(contract LiquidationPair _liquidationPair, address _receiver, uint256 _amountOut, uint256 _amountInMax, uint256 _deadline) external returns (uint256)
```

Swaps the given amount of output tokens for at most input tokens

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _liquidationPair | contract LiquidationPair | The pair to swap against |
| _receiver | address | The account to receive the output tokens |
| _amountOut | uint256 | The exact amount of output tokens expected |
| _amountInMax | uint256 | The maximum of input tokens to spend |
| _deadline | uint256 | The timestamp that the swap must be completed by |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The actual number of input tokens used |
### flashSwapCallback

```solidity
function flashSwapCallback(address _sender, uint256 _amountIn, uint256, bytes _flashSwapData) external
```

Called on the token receiver by the LiquidationPair during a liquidation if the flashSwap data length is non-zero

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _sender | address | The address that triggered the liquidation swap |
| _amountIn | uint256 | The amount of tokens expected to be sent to the target |
|  | uint256 |  |
| _flashSwapData | bytes | The flash swap data that was passed into the swap function. |

## Structs

## Errors

### UndefinedLiquidationPairFactory

```solidity
error UndefinedLiquidationPairFactory()
```

Thrown when the liquidation pair factory is the zero address

### UnknownLiquidationPair

```solidity
error UnknownLiquidationPair(contract LiquidationPair liquidationPair)
```

Throw when the liquidation pair was not created by the liquidation pair factory

### SwapExpired

```solidity
error SwapExpired(uint256 deadline)
```

Thrown when a swap deadline has passed

### InvalidSender

```solidity
error InvalidSender(address sender)
```

Thrown when the router is used as a receiver in a swap by another EOA or contract

