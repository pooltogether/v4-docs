[Git Source](https://github.com/GenerationSoftware/pt-v5-cgda-liquidator/blob/9a693939b7c71f667ffb0d6066ecd479e9b24345/src/LiquidationPair.sol)



## Events

### StartedAuction

```solidity
event StartedAuction(uint104 lastNonZeroAmountIn, uint104 lastNonZeroAmountOut, uint48 lastAuctionTime, uint48 period, SD59x18 emissionRate, SD59x18 initialPrice)
```

Emitted when a new auction is started

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| lastNonZeroAmountIn | uint104 | The total tokens in for the previous non-zero auction |
| lastNonZeroAmountOut | uint104 | The total tokens out for the previous non-zero auction |
| lastAuctionTime | uint48 | The timestamp at which the auction starts |
| period | uint48 | The current auction period |
| emissionRate | SD59x18 | The rate of token emissions for the current auction |
| initialPrice | SD59x18 | The initial price for the current auction |

### SwappedExactAmountOut

```solidity
event SwappedExactAmountOut(address sender, address receiver, uint256 amountOut, uint256 amountInMax, uint256 amountIn, bytes flashSwapData)
```

Emitted when a swap is made

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| sender | address | The sender of the swap |
| receiver | address | The receiver of the swap |
| amountOut | uint256 | The amount of tokens out |
| amountInMax | uint256 | The maximum amount of tokens in |
| amountIn | uint256 | The actual amount of tokens in |
| flashSwapData | bytes |  |

## Variables

### source

```solidity
contract ILiquidationSource source
```

The liquidation source that the pair is using.  The source executes the actual token swap, while the pair handles the pricing.

### tokenIn

```solidity
address tokenIn
```

The token that is used to pay for auctions

### tokenOut

```solidity
address tokenOut
```

The token that is being auctioned.

### decayConstant

```solidity
SD59x18 decayConstant
```

The rate at which the price decays

### periodLength

```solidity
uint256 periodLength
```

The duration of each auction.

### firstPeriodStartsAt

```solidity
uint256 firstPeriodStartsAt
```

Sets the beginning timestamp for the first period.

_If the firstPeriodStartsAt timestamp is in the future, the auctions won't run until then._

### targetFirstSaleTime

```solidity
uint32 targetFirstSaleTime
```

The time within an auction at which the price of available tokens matches the previous non-zero exchange rate.

### minimumAuctionAmount

```solidity
uint256 minimumAuctionAmount
```

Require a minimum number of tokens before an auction is triggered.

_This is important, because the gas cost ultimately determines the efficiency of the swap.
If gas cost to auction is 10 cents and the auction is for 11 cents, then the auction price will be driven to zero to make up for the difference.
If gas cost is 10 cents and we're seeking an efficiency of at least 90%, then the minimum auction amount should be $1 worth of tokens._

## Functions

### constructor

```solidity
constructor(contract ILiquidationSource _source, address _tokenIn, address _tokenOut, uint32 _periodLength, uint32 _firstPeriodStartsAt, uint32 _targetFirstSaleTime, SD59x18 _decayConstant, uint104 _initialAmountIn, uint104 _initialAmountOut, uint256 _minimumAuctionAmount) public
```

Construct a new pair

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _source | contract ILiquidationSource | The liquidation source to use for the pair |
| _tokenIn | address | The token that is used to pay for auctions |
| _tokenOut | address | The token that is being auctioned |
| _periodLength | uint32 | The duration of each auction. |
| _firstPeriodStartsAt | uint32 | Sets the beginning timestamp for the first period |
| _targetFirstSaleTime | uint32 | The time within an auction at which the price of available tokens matches the previous non-zero exchange rate |
| _decayConstant | SD59x18 | The rate at which the price decays |
| _initialAmountIn | uint104 | The initial amount of tokens in for the first auction (used for the initial exchange rate) |
| _initialAmountOut | uint104 | The initial amount of tokens out for the first auction (used for the initial exchange rate) |
| _minimumAuctionAmount | uint256 | Require a minimum number of tokens before an auction is triggered. |

### target

```solidity
function target() external returns (address)
```

Get the address that will receive `tokenIn`.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | Address of the target |
### maxAmountOut

```solidity
function maxAmountOut() external returns (uint256)
```

Gets the maximum amount of tokens that can be swapped out from the source.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The maximum amount of tokens that can be swapped out. |
### maxAmountIn

```solidity
function maxAmountIn() external returns (uint256)
```

Returns the maximum amount of tokens in

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The max number of tokens in |
### computeExactAmountIn

```solidity
function computeExactAmountIn(uint256 _amountOut) external returns (uint256)
```

Computes the exact amount of tokens to send in for the given amount of tokens to receive out.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amountOut | uint256 | The amount of tokens to receive out. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The amount of tokens to send in. |
### amountInForPeriod

```solidity
function amountInForPeriod() external returns (uint104)
```

Returns the total input tokens for the current auction.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint104 | Total tokens in |
### amountOutForPeriod

```solidity
function amountOutForPeriod() external returns (uint104)
```

Returns the total output tokens for the current auction.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint104 | Total tokens out |
### lastAuctionTime

```solidity
function lastAuctionTime() external returns (uint48)
```

Returns the timestamp to which emissions have been consumed.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint48 | The timestamp to which emissions have been consumed. |
### emissionRate

```solidity
function emissionRate() external returns (SD59x18)
```

Returns the emission rate in tokens per second for current auction

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | SD59x18 | The emission rate |
### initialPrice

```solidity
function initialPrice() external returns (SD59x18)
```

Returns the initial price for the current auction

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | SD59x18 | The initial price |
### swapExactAmountOut

```solidity
function swapExactAmountOut(address _receiver, uint256 _amountOut, uint256 _amountInMax, bytes _flashSwapData) external returns (uint256)
```

Swaps the given amount of tokens out and ensures the amount of tokens in doesn't exceed the given maximum.

_The amount of tokens being swapped in must be sent to the target before calling this function._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _receiver | address | The address to send the tokens to. |
| _amountOut | uint256 | The amount of tokens to receive out. |
| _amountInMax | uint256 | The maximum amount of tokens to send in. |
| _flashSwapData | bytes | If non-zero, the _receiver is called with this data prior to |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The amount of tokens sent in. |
### getElapsedTime

```solidity
function getElapsedTime() external returns (uint256)
```

Computes the elapsed time within the auction

### getPeriodStart

```solidity
function getPeriodStart() external returns (uint256)
```

Returns the current auction start time

_If the first period has not started yet, this will return the first period start time._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The start timestamp |
### getPeriodEnd

```solidity
function getPeriodEnd() external returns (uint256)
```

Returns the current auction end time

_If the first period has not started yet, this will return the first period end time._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The end timestamp |
### lastNonZeroAmountIn

```solidity
function lastNonZeroAmountIn() external returns (uint112)
```

Returns the last non-zero auction total input tokens

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint112 | Total input tokens |
### lastNonZeroAmountOut

```solidity
function lastNonZeroAmountOut() external returns (uint112)
```

Returns the last non-zero auction total output tokens

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint112 | Total output tokens |

## Structs

## Errors

### AmountInZero

```solidity
error AmountInZero()
```

Thrown when constructed with a zero initial amount in

### AmountOutZero

```solidity
error AmountOutZero()
```

Thrown when constructed with a zero initial amount out

### TargetFirstSaleTimeGePeriodLength

```solidity
error TargetFirstSaleTimeGePeriodLength(uint256 passedTargetSaleTime, uint256 periodLength)
```

Thrown when the target sale time is greater than or equal to the period length

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| passedTargetSaleTime | uint256 | The requested target sale time |
| periodLength | uint256 | The period length |

### SwapExceedsAvailable

```solidity
error SwapExceedsAvailable(uint256 amountOut, uint256 available)
```

Thrown when the swap exceeds the available amount

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amountOut | uint256 | The requested amount |
| available | uint256 | The available amount |

### SwapExceedsMax

```solidity
error SwapExceedsMax(uint256 amountInMax, uint256 amountIn)
```

Thrown when the actual swap amount in exceeds the user defined maximum amount in

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amountInMax | uint256 | The user-defined max amount in |
| amountIn | uint256 | The actual amount in |

### DecayConstantTooLarge

```solidity
error DecayConstantTooLarge(SD59x18 maxDecayConstant, SD59x18 decayConstant)
```

Thrown when the decay constant is too large

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| maxDecayConstant | SD59x18 | The maximum decay constant |
| decayConstant | SD59x18 | The requested decay constant |

### PurchasePriceIsZero

```solidity
error PurchasePriceIsZero(uint256 amountOut)
```

Throw when the amount in for a swap is zero

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amountOut | uint256 | The amount out |

### LiquidationSourceZeroAddress

```solidity
error LiquidationSourceZeroAddress()
```

Thrown when the liquidation source is the zero address

### TokenInZeroAddress

```solidity
error TokenInZeroAddress()
```

Thrown when the token in is the zero address

### TokenOutZeroAddress

```solidity
error TokenOutZeroAddress()
```

Thrown when the token out is the zero address

### EmissionRateIsZero

```solidity
error EmissionRateIsZero()
```

### ReceiverIsZero

```solidity
error ReceiverIsZero()
```

Thrown when the receiver of the swap is the zero address

