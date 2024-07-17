[Git Source](https://github.com/generationsoftware/pt-v5-claimer/blob/a3619aa13c19beb25210ddb6474cd51aac794706/src/Claimer.sol)

**Inherits:**
ReentrancyGuard

**Author:**
G9 Software Inc.

This contract uses a variable rate gradual dutch auction to incentivize prize claims on behalf of others.  Fees for each canary tier is set to the respective tier's prize size.


## State Variables
### prizePool
The Prize Pool that this Claimer is claiming prizes for


```solidity
PrizePool public immutable prizePool;
```


### maxFeePortionOfPrize
The maximum fee that can be charged as a portion of the prize size. Fixed point 18 number


```solidity
UD2x18 public immutable maxFeePortionOfPrize;
```


### timeToReachMaxFee
The time in seconds to reach the max auction fee


```solidity
uint256 public immutable timeToReachMaxFee;
```


## Functions
### constructor

Constructs a new Claimer


```solidity
constructor(PrizePool _prizePool, uint256 _timeToReachMaxFee, UD2x18 _maxFeePortionOfPrize);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_prizePool`|`PrizePool`|The prize pool to claim for|
|`_timeToReachMaxFee`|`uint256`|The time it should take to reach the maximum fee|
|`_maxFeePortionOfPrize`|`UD2x18`|The maximum fee that can be charged as a portion of the prize size. Fixed point 18 number|


### claimPrizes

Allows the caller to claim prizes on behalf of others or for themself.

*If you are claiming for yourself or don't want to take a fee, set the `_feeRecipient` and
`_minFeePerClaim` to zero. This will save some gas on fee calculation.*


```solidity
function claimPrizes(
    IClaimable _vault,
    uint8 _tier,
    address[] calldata _winners,
    uint32[][] calldata _prizeIndices,
    address _feeRecipient,
    uint256 _minFeePerClaim
) external nonReentrant returns (uint256 totalFees);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`IClaimable`|The vault to claim from|
|`_tier`|`uint8`|The tier to claim for|
|`_winners`|`address[]`|The array of winners to claim for|
|`_prizeIndices`|`uint32[][]`|The array of prize indices to claim for each winner (length should match winners)|
|`_feeRecipient`|`address`|The address to receive the claim fees|
|`_minFeePerClaim`|`uint256`|The minimum fee for each claim|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`totalFees`|`uint256`|The total fees collected across all successful claims|


### _countClaims

If the claimer hasn't specified both a min fee and a fee recipient, we assume that they don't
expect a fee and save them some gas on the calculation.

Computes the number of claims that will be made


```solidity
function _countClaims(address[] calldata _winners, uint32[][] calldata _prizeIndices) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_winners`|`address[]`|The array of winners to claim for|
|`_prizeIndices`|`uint32[][]`|The array of prize indices to claim for each winner (length should match winners)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The number of claims|


### _claim

Claims prizes for a batch of winners and prize indices


```solidity
function _claim(
    IClaimable _vault,
    uint8 _tier,
    address[] calldata _winners,
    uint32[][] calldata _prizeIndices,
    address _feeRecipient,
    uint96 _feePerClaim
) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`IClaimable`|The vault to claim from|
|`_tier`|`uint8`|The tier to claim for|
|`_winners`|`address[]`|The array of winners to claim for|
|`_prizeIndices`|`uint32[][]`|The array of prize indices to claim for each winner (length should match winners)|
|`_feeRecipient`|`address`|The address to receive the claim fees|
|`_feePerClaim`|`uint96`|The fee to charge for each claim|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The number of claims that were successful|


### computeTotalFees

Computes the total fees for the given number of claims.


```solidity
function computeTotalFees(uint8 _tier, uint256 _claimCount) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tier`|`uint8`|The tier to claim prizes from|
|`_claimCount`|`uint256`|The number of claims|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total fees for those claims|


### computeTotalFees

Computes the total fees for the given number of claims if a number of claims have already been made.


```solidity
function computeTotalFees(uint8 _tier, uint256 _claimCount, uint256 _claimedCount) public view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tier`|`uint8`|The tier to claim prizes from|
|`_claimCount`|`uint256`|The number of claims|
|`_claimedCount`|`uint256`|The number of prizes already claimed|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total fees for those claims|


### computeFeePerClaim

Computes the fee per claim for the given tier and number of claims


```solidity
function computeFeePerClaim(uint8 _tier, uint256 _claimCount) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tier`|`uint8`|The tier to claim prizes from|
|`_claimCount`|`uint256`|The number of claims|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The fee that will be taken per claim|


### _computeFeePerClaim

Computes the total fees for the given number of claims.


```solidity
function _computeFeePerClaim(uint8 _tier, uint256 _claimCount, uint256 _claimedCount) internal view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tier`|`uint8`|The tier|
|`_claimCount`|`uint256`|The number of claims to check|
|`_claimedCount`|`uint256`|The number of prizes already claimed|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total fees for the claims|


### computeMaxFee

Computes the maximum fee that can be charged.


```solidity
function computeMaxFee(uint8 _tier) public view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tier`|`uint8`|The tier to compute the max fee for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The maximum fee that can be charged|


### _computeMaxFee

Computes the max fee given the tier


```solidity
function _computeMaxFee(uint8 _tier) internal view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tier`|`uint8`|The tier to compute the max fee for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The maximum fee that will be charged for a prize claim for the given tier|


### _computeFeeForNextClaim

Computes the fee for the next claim.


```solidity
function _computeFeeForNextClaim(
    uint256 _targetFee,
    SD59x18 _decayConstant,
    SD59x18 _perTimeUnit,
    uint256 _elapsed,
    uint256 _sold,
    uint256 _maxFee
) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_targetFee`|`uint256`|The target fee that should be charged|
|`_decayConstant`|`SD59x18`|The VRGDA decay constant|
|`_perTimeUnit`|`SD59x18`|The num to be claimed per second|
|`_elapsed`|`uint256`|The number of seconds that have elapsed|
|`_sold`|`uint256`|The number of prizes that were claimed|
|`_maxFee`|`uint256`|The maximum fee that can be charged|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The fee to charge for the next claim|


## Events
### ClaimError
Emitted when a claim reverts


```solidity
event ClaimError(IClaimable indexed vault, uint8 indexed tier, address indexed winner, uint32 prizeIndex, bytes reason);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`IClaimable`|The vault for which the claim failed|
|`tier`|`uint8`|The tier for which the claim failed|
|`winner`|`address`|The winner for which the claim failed|
|`prizeIndex`|`uint32`|The prize index for which the claim failed|
|`reason`|`bytes`|The revert reason|

