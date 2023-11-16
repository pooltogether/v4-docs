[Git Source](https://github.com/GenerationSoftware/pt-v5-claimer/blob/93c98129e6a96185e647de69a85ce0d7f581834a/src/ClaimerFactory.sol)



Factory to deploy new VRGDA Claimer contracts for PoolTogether V5.

## Events

### ClaimerCreated

```solidity
event ClaimerCreated(contract Claimer claimer, contract PrizePool prizePool, uint256 minimumFee, uint256 maximumFee, uint256 timeToReachMaxFee, UD2x18 maxFeePortionOfPrize)
```

Emitted when a new claimer contract is created.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| claimer | contract Claimer |  |
| prizePool | contract PrizePool | The prize pool to claim for |
| minimumFee | uint256 | The minimum fee that should be charged |
| maximumFee | uint256 | The maximum fee that should be charged |
| timeToReachMaxFee | uint256 | The time it should take to reach the maximum fee |
| maxFeePortionOfPrize | UD2x18 | The maximum fee that can be charged as a portion of the prize size. Fixed point 18 number |

## Variables

### allClaimers

```solidity
contract Claimer[] allClaimers
```

List of all claimers deployed by this factory.

### deployedClaimer

```solidity
mapping(contract Claimer => bool) deployedClaimer
```

Mapping to verify if a Claimer has been deployed via this factory.

## Functions

### createClaimer

```solidity
function createClaimer(contract PrizePool _prizePool, uint256 _minimumFee, uint256 _maximumFee, uint256 _timeToReachMaxFee, UD2x18 _maxFeePortionOfPrize) external returns (contract Claimer)
```

Creates a new Claimer with the provided parameters.

### totalClaimers

```solidity
function totalClaimers() external view returns (uint256)
```

Total number of claimers deployed by this factory.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Number of claimers deployed by this factory. |

## Structs

## Errors

