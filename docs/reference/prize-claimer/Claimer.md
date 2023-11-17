[Git Source](https://github.com/GenerationSoftware/pt-v5-claimer/blob/93c98129e6a96185e647de69a85ce0d7f581834a/src/Claimer.sol)



This contract uses a variable rate gradual dutch auction to incentivize prize claims on behalf of others

## Events

### AlreadyClaimed

```solidity
event AlreadyClaimed(address winner, uint8 tier, uint32 prizeIndex)
```

Emitted when a prize has already been claimed

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| winner | address | The winner of the prize |
| tier | uint8 | The prize tier |
| prizeIndex | uint32 | The prize index |

### ClaimError

```solidity
event ClaimError(contract IClaimable vault, uint8 tier, address winner, uint32 prizeIndex, bytes reason)
```

Emitted when a claim reverts

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | contract IClaimable | The vault for which the claim failed |
| tier | uint8 | The tier for which the claim failed |
| winner | address | The winner for which the claim failed |
| prizeIndex | uint32 | The prize index for which the claim failed |
| reason | bytes | The revert reason |

## Variables

### prizePool

```solidity
contract PrizePool prizePool
```

The Prize Pool that this Claimer is claiming prizes for

### maxFeePortionOfPrize

```solidity
UD2x18 maxFeePortionOfPrize
```

The maximum fee that can be charged as a portion of the prize size. Fixed point 18 number

### decayConstant

```solidity
SD59x18 decayConstant
```

The VRGDA decay constant computed in the constructor

### minimumFee

```solidity
uint256 minimumFee
```

The minimum fee that should be charged per claim (used to calculate the VRGDA decay constant that controls the pricing curve)

### timeToReachMaxFee

```solidity
uint256 timeToReachMaxFee
```

The time in seconds to reach the max auction fee

## Functions

### constructor

```solidity
constructor(contract PrizePool _prizePool, uint256 _minimumFee, uint256 _maximumFee, uint256 _timeToReachMaxFee, UD2x18 _maxFeePortionOfPrize) public
```

Constructs a new Claimer

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _prizePool | contract PrizePool | The prize pool to claim for |
| _minimumFee | uint256 | The minimum fee that should be charged (used to calculate the VRGDA decay constant). Fees will start at this price during an auction, so it is recommended to set it very low (must be greater than zero). |
| _maximumFee | uint256 | The maximum fee that should be charged (used to calculate the VRGDA decay constant). Fees will never exceed this amount per claim. |
| _timeToReachMaxFee | uint256 | The time it should take to reach the maximum fee |
| _maxFeePortionOfPrize | UD2x18 | The maximum fee that can be charged as a portion of the prize size. Fixed point 18 number |

### claimPrizes

```solidity
function claimPrizes(contract IClaimable _vault, uint8 _tier, address[] _winners, uint32[][] _prizeIndices, address _feeRecipient, uint256 _minVrgdaFeePerClaim) external returns (uint256 totalFees)
```

Allows the caller to claim prizes on behalf of others or for themself.

_If you are claiming for yourself or don't want to take a fee, set the `_feeRecipient` and
`_minVrgdaFeePerClaim` to zero. This will save some gas on fee calculation._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vault | contract IClaimable | The vault to claim from |
| _tier | uint8 | The tier to claim for |
| _winners | address[] | The array of winners to claim for |
| _prizeIndices | uint32[][] | The array of prize indices to claim for each winner (length should match winners) |
| _feeRecipient | address | The address to receive the claim fees |
| _minVrgdaFeePerClaim | uint256 | The minimum fee for each claim |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| totalFees | uint256 | The total fees collected across all successful claims |
### computeTotalFees

```solidity
function computeTotalFees(uint8 _tier, uint256 _claimCount) external view returns (uint256)
```

Computes the total fees for the given number of claims.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tier | uint8 | The tier to claim prizes from |
| _claimCount | uint256 | The number of claims |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The total fees for those claims |
### computeTotalFees

```solidity
function computeTotalFees(uint8 _tier, uint256 _claimCount, uint256 _claimedCount) external view returns (uint256)
```

Computes the total fees for the given number of claims if a number of claims have already been made.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tier | uint8 | The tier to claim prizes from |
| _claimCount | uint256 | The number of claims |
| _claimedCount | uint256 | The number of prizes already claimed |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The total fees for those claims |
### computeFeePerClaim

```solidity
function computeFeePerClaim(uint256 _maxFee, uint256 _claimCount) external view returns (uint256)
```

Computes the fees for several claims.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _maxFee | uint256 | the maximum fee that can be charged |
| _claimCount | uint256 | the number of claims to check |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The fees for the claims |
### computeMaxFee

```solidity
function computeMaxFee(uint8 _tier) public view returns (uint256)
```

Computes the maximum fee that can be charged.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tier | uint8 | The tier to compute the max fee for |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The maximum fee that can be charged |

## Structs

## Errors

### ClaimArraySizeMismatch

```solidity
error ClaimArraySizeMismatch(uint256 winnersLength, uint256 prizeIndicesLength)
```

Thrown when the length of the winners array does not match the length of the prize indices array while claiming.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| winnersLength | uint256 | Length of the winners array |
| prizeIndicesLength | uint256 | Length of the prize indices array |

### MinFeeGeMax

```solidity
error MinFeeGeMax(uint256 minFee, uint256 maxFee)
```

Emitted when the minimum fee is greater than or equal to the max fee

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| minFee | uint256 | The minimum fee passed |
| maxFee | uint256 | The maximum fee passed |

### VrgdaClaimFeeBelowMin

```solidity
error VrgdaClaimFeeBelowMin(uint256 minFee, uint256 fee)
```

Emitted when the VRGDA fee is below the minimum fee

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| minFee | uint256 | The minimum fee requested by the user |
| fee | uint256 | The actual VRGDA fee |

### PrizePoolZeroAddress

```solidity
error PrizePoolZeroAddress()
```

Emitted when the prize pool is set the the zero address

### FeeRecipientZeroAddress

```solidity
error FeeRecipientZeroAddress()
```

Emitted when someone tries to claim a prizes with a fee, but sets the fee recipient address to the zero address.

