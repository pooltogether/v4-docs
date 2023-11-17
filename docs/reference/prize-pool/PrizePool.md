[Git Source](https://github.com/GenerationSoftware/pt-v5-prize-pool/blob/354b51d8a9218d26ff10e0c963bb900162a93a8b/src/PrizePool.sol)



The Prize Pool holds the prize liquidity and allows vaults to claim prizes.

## Events

### ClaimedPrize

```solidity
event ClaimedPrize(address vault, address winner, address recipient, uint24 drawId, uint8 tier, uint32 prizeIndex, uint152 payout, uint96 fee, address feeRecipient)
```

Emitted when a prize is claimed.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | address | The address of the vault that claimed the prize. |
| winner | address | The address of the winner |
| recipient | address | The address of the prize recipient |
| drawId | uint24 | The draw ID of the draw that was claimed. |
| tier | uint8 | The prize tier that was claimed. |
| prizeIndex | uint32 |  |
| payout | uint152 | The amount of prize tokens that were paid out to the winner |
| fee | uint96 | The amount of prize tokens that were paid to the claimer |
| feeRecipient | address | The address that the claim fee was sent to |

### DrawAwarded

```solidity
event DrawAwarded(uint24 drawId, uint256 winningRandomNumber, uint8 lastNumTiers, uint8 numTiers, uint104 reserve, UD34x4 prizeTokensPerShare, uint48 drawOpenedAt)
```

Emitted when a draw is awarded.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| drawId | uint24 | The ID of the draw that was awarded |
| winningRandomNumber | uint256 | The winning random number for the awarded draw |
| lastNumTiers | uint8 | The previous number of prize tiers |
| numTiers | uint8 | The number of prize tiers for the awarded draw |
| reserve | uint104 | The resulting reserve available |
| prizeTokensPerShare | UD34x4 | The amount of prize tokens per share for the awarded draw |
| drawOpenedAt | uint48 | The start timestamp of the awarded draw |

### AllocateRewardFromReserve

```solidity
event AllocateRewardFromReserve(address to, uint256 amount)
```

Emitted when any amount of the reserve is rewarded to a recipient.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | The recipient of the reward |
| amount | uint256 | The amount of assets rewarded |

### ContributedReserve

```solidity
event ContributedReserve(address user, uint256 amount)
```

Emitted when the reserve is manually increased.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| user | address | The user who increased the reserve |
| amount | uint256 | The amount of assets transferred |

### ContributePrizeTokens

```solidity
event ContributePrizeTokens(address vault, uint24 drawId, uint256 amount)
```

Emitted when a vault contributes prize tokens to the pool.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | address | The address of the vault that is contributing tokens |
| drawId | uint24 | The ID of the first draw that the tokens will be contributed to |
| amount | uint256 | The amount of tokens contributed |

### WithdrawRewards

```solidity
event WithdrawRewards(address account, address to, uint256 amount, uint256 available)
```

Emitted when an address withdraws their prize claim rewards.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | address | The account that is withdrawing rewards |
| to | address | The address the rewards are sent to |
| amount | uint256 | The amount withdrawn |
| available | uint256 | The total amount that was available to withdraw before the transfer |

### IncreaseClaimRewards

```solidity
event IncreaseClaimRewards(address to, uint256 amount)
```

Emitted when an address receives new prize claim rewards.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| to | address | The address the rewards are given to |
| amount | uint256 | The amount increased |

### DrawManagerSet

```solidity
event DrawManagerSet(address drawManager)
```

Emitted when the drawManager is set.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| drawManager | address | The draw manager |

### ReserveConsumed

```solidity
event ReserveConsumed(uint256 amount)
```

Emitted when the reserve is consumed due to insufficient prize liquidity.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint256 | The amount to decrease by |

## Variables

### smoothing

```solidity
SD1x18 smoothing
```

The degree of POOL contribution smoothing. 0 = no smoothing, ~1 = max smoothing.

_Smoothing spreads out vault contribution over multiple draws; the higher the smoothing the more draws._

### prizeToken

```solidity
contract IERC20 prizeToken
```

The token that is being contributed and awarded as prizes.

### twabController

```solidity
contract TwabController twabController
```

The Twab Controller to use to retrieve historic balances.

### drawManager

```solidity
address drawManager
```

The draw manager address.

### drawPeriodSeconds

```solidity
uint48 drawPeriodSeconds
```

The number of seconds between draws.

### firstDrawOpensAt

```solidity
uint48 firstDrawOpensAt
```

The timestamp at which the first draw will open.

### claimCount

```solidity
uint32 claimCount
```

The number of prize claims for the last awarded draw.

### grandPrizePeriodDraws

```solidity
uint24 grandPrizePeriodDraws
```

The frequency of the grand prize

### tierShares

```solidity
uint8 tierShares
```

The number of shares to allocate to each prize tier.

### reserveShares

```solidity
uint8 reserveShares
```

The number of shares to allocate to the reserve.

### prizeTokenPerShare

```solidity
UD34x4 prizeTokenPerShare
```

The current number of prize tokens per share.

### numberOfTiers

```solidity
uint8 numberOfTiers
```

The number of tiers for the last awarded draw. The last tier is the canary tier.

### lastAwardedDrawAwardedAt

```solidity
uint48 lastAwardedDrawAwardedAt
```

The timestamp at which the last awarded draw was awarded.

## Functions

### constructor

```solidity
constructor(struct ConstructorParams params) public
```

Constructs a new Prize Pool.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| params | struct ConstructorParams | A struct of constructor parameters |

### setDrawManager

```solidity
function setDrawManager(address _drawManager) external
```

Allows a caller to set the DrawManager if not already set.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _drawManager | address | The draw manager |

### contributePrizeTokens

```solidity
function contributePrizeTokens(address _prizeVault, uint256 _amount) external returns (uint256)
```

Contributes prize tokens on behalf of the given vault.

_The tokens should have already been transferred to the prize pool.
The prize pool balance will be checked to ensure there is at least the given amount to deposit._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _prizeVault | address | The address of the vault to contribute to |
| _amount | uint256 | The amount of prize tokens to contribute |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The amount of available prize tokens prior to the contribution. |
### allocateRewardFromReserve

```solidity
function allocateRewardFromReserve(address _to, uint96 _amount) external
```

Allows the Manager to allocate a reward from the reserve to a recipient.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _to | address | The address to allocate the rewards to |
| _amount | uint96 | The amount of tokens for the reward |

### awardDraw

```solidity
function awardDraw(uint256 winningRandomNumber_) external returns (uint24)
```

Allows the Manager to award a draw with the winning random number.

_Updates the number of tiers, the winning random number and the prize pool reserve._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| winningRandomNumber_ | uint256 | The winning random number for the draw |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint24 | The ID of the awarded draw |
### claimPrize

```solidity
function claimPrize(address _winner, uint8 _tier, uint32 _prizeIndex, address _prizeRecipient, uint96 _fee, address _feeRecipient) external returns (uint256)
```

Claims a prize for a given winner and tier.

_This function takes in an address _winner, a uint8 _tier, a uint96 _fee, and an
address _feeRecipient. It checks if _winner is actually the winner of the _tier for the calling vault.
If so, it calculates the prize size and transfers it to the winner. If not, it reverts with an error message.
The function then checks the claim record of _winner to see if they have already claimed the prize for the
awarded draw. If not, it updates the claim record with the claimed tier and emits a ClaimedPrize event with
information about the claim.
Note that this function can modify the state of the contract by updating the claim record, changing the largest
tier claimed and the claim count, and transferring prize tokens. The function is marked as external which
means that it can be called from outside the contract._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _winner | address | The address of the eligible winner |
| _tier | uint8 | The tier of the prize to be claimed. |
| _prizeIndex | uint32 | The prize to claim for the winner. Must be less than the prize count for the tier. |
| _prizeRecipient | address | The recipient of the prize |
| _fee | uint96 | The fee associated with claiming the prize. |
| _feeRecipient | address | The address to receive the fee. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | Total prize amount claimed (payout and fees combined). If the prize was already claimed it returns zero. |
### withdrawRewards

```solidity
function withdrawRewards(address _to, uint256 _amount) external
```

Withdraws earned rewards for the caller.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _to | address | The address to transfer the rewards to |
| _amount | uint256 | The amount of rewards to withdraw |

### contributeReserve

```solidity
function contributeReserve(uint96 _amount) external
```

Allows anyone to deposit directly into the Prize Pool reserve.

_Ensure caller has sufficient balance and has approved the Prize Pool to transfer the tokens_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amount | uint96 | The amount of tokens to increase the reserve by |

### getWinningRandomNumber

```solidity
function getWinningRandomNumber() external view returns (uint256)
```

Returns the winning random number for the last awarded draw.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The winning random number |
### getLastAwardedDrawId

```solidity
function getLastAwardedDrawId() external view returns (uint24)
```

Returns the last awarded draw id.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint24 | The last awarded draw id |
### getTotalContributedBetween

```solidity
function getTotalContributedBetween(uint24 _startDrawIdInclusive, uint24 _endDrawIdInclusive) external view returns (uint256)
```

Returns the total prize tokens contributed between the given draw ids, inclusive.

_Note that this is after smoothing is applied._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _startDrawIdInclusive | uint24 | Start draw id inclusive |
| _endDrawIdInclusive | uint24 | End draw id inclusive |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The total prize tokens contributed by all vaults |
### getContributedBetween

```solidity
function getContributedBetween(address _vault, uint24 _startDrawIdInclusive, uint24 _endDrawIdInclusive) external view returns (uint256)
```

Returns the total prize tokens contributed by a particular vault between the given draw ids, inclusive.

_Note that this is after smoothing is applied._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vault | address | The address of the vault |
| _startDrawIdInclusive | uint24 | Start draw id inclusive |
| _endDrawIdInclusive | uint24 | End draw id inclusive |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The total prize tokens contributed by the given vault |
### getTierAccrualDurationInDraws

```solidity
function getTierAccrualDurationInDraws(uint8 _tier) external view returns (uint24)
```

Computes the expected duration prize accrual for a tier.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tier | uint8 | The tier to check |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint24 | The number of draws |
### totalWithdrawn

```solidity
function totalWithdrawn() external view returns (uint256)
```

The total amount of prize tokens that have been claimed for all time

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The total amount of prize tokens that have been claimed for all time |
### accountedBalance

```solidity
function accountedBalance() external view returns (uint256)
```

Computes how many tokens have been accounted for

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The balance of tokens that have been accounted for |
### getOpenDrawId

```solidity
function getOpenDrawId() external view returns (uint24)
```

Returns the open draw ID.

_The open draw is the draw to which contributions can currently be made._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint24 | The open draw ID |
### getDrawIdToAward

```solidity
function getDrawIdToAward() external view returns (uint24)
```

Returns the next draw ID that can be awarded.

_It's possible for draws to be missed, so the next draw ID to award
may be more than one draw ahead of the last awarded draw ID._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint24 | The ID of the next draw that can be awarded |
### drawOpensAt

```solidity
function drawOpensAt(uint24 drawId) external view returns (uint48)
```

Returns the time at which a draw opens / opened at.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| drawId | uint24 | The draw to get the timestamp for |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint48 | The start time of the draw in seconds |
### drawClosesAt

```solidity
function drawClosesAt(uint24 drawId) external view returns (uint48)
```

Returns the time at which a draw closes / closed at.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| drawId | uint24 | The draw to get the timestamp for |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint48 | The end time of the draw in seconds |
### isDrawFinalized

```solidity
function isDrawFinalized(uint24 drawId) external view returns (bool)
```

Checks if the given draw is finalized.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| drawId | uint24 | The draw to check |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if the draw is finalized, false otherwise |
### pendingReserveContributions

```solidity
function pendingReserveContributions() external view returns (uint256)
```

Returns the amount of tokens that will be added to the reserve when next draw to award is awarded.

_Intended for Draw manager to use after a draw has closed but not yet been awarded._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The amount of prize tokens that will be added to the reserve |
### wasClaimed

```solidity
function wasClaimed(address _vault, address _winner, uint8 _tier, uint32 _prizeIndex) external view returns (bool)
```

Returns whether the winner has claimed the tier for the last awarded draw

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vault | address | The vault to check |
| _winner | address | The account to check |
| _tier | uint8 | The tier to check |
| _prizeIndex | uint32 | The prize index to check |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if the winner claimed the tier for the last awarded draw, false otherwise. |
### rewardBalance

```solidity
function rewardBalance(address _recipient) external view returns (uint256)
```

Returns the balance of rewards earned for the given address.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _recipient | address | The recipient to retrieve the reward balance for |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The balance of rewards for the given recipient |
### isWinner

```solidity
function isWinner(address _vault, address _user, uint8 _tier, uint32 _prizeIndex) external view returns (bool)
```

Checks if the given user has won the prize for the specified tier in the given vault.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vault | address | The address of the vault to check. |
| _user | address | The address of the user to check for the prize. |
| _tier | uint8 | The tier for which the prize is to be checked. |
| _prizeIndex | uint32 | The index of the prize to check (less than prize count for tier) |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | A boolean value indicating whether the user has won the prize or not. |
### getVaultUserBalanceAndTotalSupplyTwab

```solidity
function getVaultUserBalanceAndTotalSupplyTwab(address _vault, address _user, uint256 _drawDuration) external view returns (uint256, uint256)
```

Returns the time-weighted average balance (TWAB) and the TWAB total supply for the specified user in the given vault over a specified period.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vault | address | The address of the vault for which to get the TWAB. |
| _user | address | The address of the user for which to get the TWAB. |
| _drawDuration | uint256 | The duration of the period over which to calculate the TWAB, in number of draw periods. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The TWAB and the TWAB total supply for the specified user in the given vault over the specified period. |
| [1] | uint256 |  |
### getVaultPortion

```solidity
function getVaultPortion(address _vault, uint24 _startDrawId, uint24 _endDrawId) external view returns (SD59x18)
```

Returns the portion of a vault's contributions in a given draw range as a fraction.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vault | address | The address of the vault to calculate the contribution portion for. |
| _startDrawId | uint24 | The starting draw ID of the draw range to calculate the contribution portion for. |
| _endDrawId | uint24 | The ending draw ID of the draw range to calculate the contribution portion for. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | SD59x18 | The portion of the _vault's contributions in the given draw range as an SD59x18 value. |
### estimateNextNumberOfTiers

```solidity
function estimateNextNumberOfTiers() external view returns (uint8)
```

Computes and returns the next number of tiers based on the current prize claim counts. This number may change throughout the draw

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint8 | The next number of tiers |
### computeNextNumberOfTiers

```solidity
function computeNextNumberOfTiers(uint32 _claimCount) external view returns (uint8)
```

Calculates the number of tiers given the number of prize claims

_This function will use the claim count to determine the number of tiers, then add one for the canary tier._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _claimCount | uint32 | The number of prize claims |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint8 | The estimated number of tiers + the canary tier |

### constructor

```solidity
constructor(uint8 _numberOfTiers, uint8 _tierShares, uint8 _reserveShares, uint24 _grandPrizePeriodDraws) public
```

Constructs a new Prize Pool.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _numberOfTiers | uint8 | The number of tiers to start with. Must be greater than or equal to the minimum number of tiers. |
| _tierShares | uint8 | The number of shares to allocate to each tier |
| _reserveShares | uint8 | The number of shares to allocate to the reserve. |
| _grandPrizePeriodDraws | uint24 |  |

### getTierPrizeSize

```solidity
function getTierPrizeSize(uint8 _tier) external view returns (uint104)
```

Returns the prize size for the given tier.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tier | uint8 | The tier to retrieve |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint104 | The prize size for the tier |
### getTierPrizeCount

```solidity
function getTierPrizeCount(uint8 _tier) external view returns (uint32)
```

Returns the estimated number of prizes for the given tier.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tier | uint8 | The tier to retrieve |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint32 | The estimated number of prizes |
### getTotalShares

```solidity
function getTotalShares() external view returns (uint256)
```

Computes the total shares in the system. That is `(number of tiers * tier shares) + reserve shares`.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The total shares |
### getTierRemainingLiquidity

```solidity
function getTierRemainingLiquidity(uint8 _tier) external view returns (uint256)
```

Computes the remaining liquidity available to a tier.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tier | uint8 | The tier to compute the liquidity for |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The remaining liquidity |
### estimatedPrizeCount

```solidity
function estimatedPrizeCount() external view returns (uint32)
```

Estimates the number of prizes for the current number of tiers, including the canary tier

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint32 | The estimated number of prizes including the canary tier |
### estimatedPrizeCount

```solidity
function estimatedPrizeCount(uint8 numTiers) external view returns (uint32)
```

Estimates the number of prizes that will be awarded given a number of tiers. Includes canary tier

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| numTiers | uint8 | The number of tiers |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint32 | The estimated prize count for the given number of tiers |
### reserve

```solidity
function reserve() external view returns (uint96)
```

Returns the balance of the reserve.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint96 | The amount of tokens that have been reserved. |
### getTierOdds

```solidity
function getTierOdds(uint8 _tier, uint8 _numTiers) external view returns (SD59x18)
```

Computes the odds for a tier given the number of tiers.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tier | uint8 | The tier to compute odds for |
| _numTiers | uint8 | The number of prize tiers |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | SD59x18 | The odds of the tier |

## Structs

### ConstructorParams

```solidity
struct ConstructorParams {
  contract IERC20 prizeToken;
  contract TwabController twabController;
  uint48 drawPeriodSeconds;
  uint48 firstDrawOpensAt;
  SD1x18 smoothing;
  uint24 grandPrizePeriodDraws;
  uint8 numberOfTiers;
  uint8 tierShares;
  uint8 reserveShares;
}
```

### Tier

```solidity
struct Tier {
  uint24 drawId;
  uint104 prizeSize;
  UD34x4 prizeTokenPerShare;
}
```

## Errors

### FirstDrawOpensInPast

```solidity
error FirstDrawOpensInPast()
```

Emitted when the prize pool is constructed with a first draw open timestamp that is in the past

### IncompatibleTwabPeriodLength

```solidity
error IncompatibleTwabPeriodLength()
```

Emitted when the Twab Controller has an incompatible period length

### IncompatibleTwabPeriodOffset

```solidity
error IncompatibleTwabPeriodOffset()
```

Emitted when the Twab Controller has an incompatible period offset

### DrawManagerIsZeroAddress

```solidity
error DrawManagerIsZeroAddress()
```

Emitted when someone tries to set the draw manager with the zero address

### NotDeployer

```solidity
error NotDeployer()
```

Emitted when the caller is not the deployer.

### InsufficientRewardsError

```solidity
error InsufficientRewardsError(uint256 requested, uint256 available)
```

Emitted when someone tries to withdraw too many rewards.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| requested | uint256 | The requested reward amount to withdraw |
| available | uint256 | The total reward amount available for the caller to withdraw |

### DidNotWin

```solidity
error DidNotWin(address vault, address winner, uint8 tier, uint32 prizeIndex)
```

Emitted when an address did not win the specified prize on a vault when claiming.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | address | The vault address |
| winner | address | The address checked for the prize |
| tier | uint8 | The prize tier |
| prizeIndex | uint32 | The prize index |

### FeeTooLarge

```solidity
error FeeTooLarge(uint256 fee, uint256 maxFee)
```

Emitted when the fee being claimed is larger than the max allowed fee.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| fee | uint256 | The fee being claimed |
| maxFee | uint256 | The max fee that can be claimed |

### SmoothingGTEOne

```solidity
error SmoothingGTEOne(int64 smoothing)
```

Emitted when the initialized smoothing number is not less than one.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| smoothing | int64 | The unwrapped smoothing value that exceeds the limit |

### ContributionGTDeltaBalance

```solidity
error ContributionGTDeltaBalance(uint256 amount, uint256 available)
```

Emitted when the contributed amount is more than the available, un-accounted balance.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint256 | The contribution amount that is being claimed |
| available | uint256 | The available un-accounted balance that can be claimed as a contribution |

### InsufficientReserve

```solidity
error InsufficientReserve(uint104 amount, uint104 reserve)
```

Emitted when the withdraw amount is greater than the available reserve.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | uint104 | The amount being withdrawn |
| reserve | uint104 | The total reserve available for withdrawal |

### RandomNumberIsZero

```solidity
error RandomNumberIsZero()
```

Emitted when the winning random number is zero.

### AwardingDrawNotClosed

```solidity
error AwardingDrawNotClosed(uint48 drawClosesAt)
```

Emitted when the draw cannot be awarded since it has not closed.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| drawClosesAt | uint48 | The timestamp in seconds at which the draw closes |

### InvalidPrizeIndex

```solidity
error InvalidPrizeIndex(uint32 invalidPrizeIndex, uint32 prizeCount, uint8 tier)
```

Emitted when prize index is greater or equal to the max prize count for the tier.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| invalidPrizeIndex | uint32 | The invalid prize index |
| prizeCount | uint32 | The prize count for the tier |
| tier | uint8 | The tier number |

### NoDrawsAwarded

```solidity
error NoDrawsAwarded()
```

Emitted when there are no awarded draws when a computation requires an awarded draw.

### InvalidTier

```solidity
error InvalidTier(uint8 tier, uint8 numberOfTiers)
```

Emitted when attempting to claim from a tier that does not exist.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tier | uint8 | The tier number that does not exist |
| numberOfTiers | uint8 | The current number of tiers |

### CallerNotDrawManager

```solidity
error CallerNotDrawManager(address caller, address drawManager)
```

Emitted when the caller is not the draw manager.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller | address | The caller address |
| drawManager | address | The drawManager address |

### PrizeIsZero

```solidity
error PrizeIsZero()
```

Emitted when someone tries to claim a prize that is zero size

### FeeRecipientZeroAddress

```solidity
error FeeRecipientZeroAddress()
```

Emitted when someone tries to claim a prize, but sets the fee recipient address to the zero address.

### ClaimPeriodExpired

```solidity
error ClaimPeriodExpired()
```

Emitted when a claim is attempted after the claiming period has expired.

### NumberOfTiersLessThanMinimum

```solidity
error NumberOfTiersLessThanMinimum(uint8 numTiers)
```

Emitted when the number of tiers is less than the minimum number of tiers.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| numTiers | uint8 | The invalid number of tiers |

### NumberOfTiersGreaterThanMaximum

```solidity
error NumberOfTiersGreaterThanMaximum(uint8 numTiers)
```

Emitted when the number of tiers is greater than the max tiers

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| numTiers | uint8 | The invalid number of tiers |

### InsufficientLiquidity

```solidity
error InsufficientLiquidity(uint104 requestedLiquidity)
```

Emitted when there is insufficient liquidity to consume.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| requestedLiquidity | uint104 | The requested amount of liquidity |

