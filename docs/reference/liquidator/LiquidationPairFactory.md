[Git Source](https://github.com/GenerationSoftware/pt-v5-cgda-liquidator/blob/9a693939b7c71f667ffb0d6066ecd479e9b24345/src/LiquidationPairFactory.sol)



Factory contract for deploying LiquidationPair contracts.

## Events

### PairCreated

```solidity
event PairCreated(contract LiquidationPair pair, address tokenIn, address tokenOut, contract ILiquidationSource source, uint32 periodLength, uint32 firstPeriodStartsAt, uint32 targetFirstSaleTime, SD59x18 decayConstant, uint104 initialAmountIn, uint104 initialAmountOut, uint256 minimumAuctionAmount)
```

Emitted when a new LiquidationPair is created

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| pair | contract LiquidationPair | The address of the new pair |
| tokenIn | address | The input token for the pair |
| tokenOut | address | The output token for the pair |
| source | contract ILiquidationSource | The liquidation source that the pair is using |
| periodLength | uint32 | The duration of auctions |
| firstPeriodStartsAt | uint32 | The start time offset of auctions |
| targetFirstSaleTime | uint32 | The target time for the first auction |
| decayConstant | SD59x18 | The decay constant that the pair is using |
| initialAmountIn | uint104 | The initial amount of input tokens (used to compute initial exchange rate) |
| initialAmountOut | uint104 | The initial amount of output tokens (used to compute initial exchange rate) |
| minimumAuctionAmount | uint256 | The minimum auction size in output tokens |

## Variables

### allPairs

```solidity
contract LiquidationPair[] allPairs
```

Tracks an array of all pairs created by this factory

### deployedPairs

```solidity
mapping(contract LiquidationPair => bool) deployedPairs
```

Mapping to verify if a LiquidationPair has been deployed via this factory.

_LiquidationPair address => boolean_

## Functions

### createPair

```solidity
function createPair(contract ILiquidationSource _source, address _tokenIn, address _tokenOut, uint32 _periodLength, uint32 _firstPeriodStartsAt, uint32 _targetFirstSaleTime, SD59x18 _decayConstant, uint104 _initialAmountIn, uint104 _initialAmountOut, uint256 _minimumAuctionAmount) external returns (contract LiquidationPair)
```

Creates a new LiquidationPair and registers it within the factory

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _source | contract ILiquidationSource | The liquidation source that the pair will use |
| _tokenIn | address | The input token for the pair |
| _tokenOut | address | The output token for the pair |
| _periodLength | uint32 | The duration of auctions |
| _firstPeriodStartsAt | uint32 | The start time offset of auctions |
| _targetFirstSaleTime | uint32 | The target time for the first auction |
| _decayConstant | SD59x18 | The decay constant that the pair will use. This determines how rapidly the price changes. |
| _initialAmountIn | uint104 | The initial amount of input tokens (used to compute initial exchange rate) |
| _initialAmountOut | uint104 | The initial amount of output tokens (used to compute initial exchange rate) |
| _minimumAuctionAmount | uint256 | The minimum auction size in output tokens |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract LiquidationPair | The address of the new pair |
### totalPairs

```solidity
function totalPairs() external view returns (uint256)
```

Total number of LiquidationPair deployed by this factory.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Number of LiquidationPair deployed by this factory. |

## Structs

## Errors

