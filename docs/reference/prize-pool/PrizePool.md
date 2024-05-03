[Git Source](https://github.com/generationsoftware/pt-v5-prize-pool/blob/768fa642eb31cfff0fe929da0929a9bb4dea0b2d/src/PrizePool.sol)

**Inherits:**
[TieredLiquidityDistributor](./TieredLiquidityDistributor)

**Author:**
G9 Software Inc. & PoolTogether Inc. Team

The Prize Pool holds the prize liquidity and allows vaults to claim prizes.


## State Variables
### _vaultAccumulator
The DrawAccumulator that tracks the exponential moving average of the contributions by a vault.


```solidity
mapping(address vault => DrawAccumulatorLib.Accumulator accumulator) internal _vaultAccumulator;
```


### _claimedPrizes
Records the claim record for a winner.


```solidity
mapping(
    address vault
        => mapping(
            address account
                => mapping(uint24 drawId => mapping(uint8 tier => mapping(uint32 prizeIndex => bool claimed)))
        )
) internal _claimedPrizes;
```


### _rewards
Tracks the total rewards accrued for a claimer or draw completer.


```solidity
mapping(address recipient => uint256 rewards) internal _rewards;
```


### DONATOR
The special value for the donator address. Contributions from this address are excluded from the total odds.

*0x000...F2EE because it's free money!*


```solidity
address public constant DONATOR = 0x000000000000000000000000000000000000F2EE;
```


### prizeToken
The token that is being contributed and awarded as prizes.


```solidity
IERC20 public immutable prizeToken;
```


### twabController
The Twab Controller to use to retrieve historic balances.


```solidity
TwabController public immutable twabController;
```


### drawPeriodSeconds
The number of seconds between draws.


```solidity
uint48 public immutable drawPeriodSeconds;
```


### firstDrawOpensAt
The timestamp at which the first draw will open.


```solidity
uint48 public immutable firstDrawOpensAt;
```


### drawTimeout
The maximum number of draws that can be missed before the prize pool is considered inactive.


```solidity
uint24 public immutable drawTimeout;
```


### creator
The address that is allowed to set the draw manager


```solidity
address immutable creator;
```


### _totalAccumulator
The exponential weighted average of all vault contributions.


```solidity
DrawAccumulatorLib.Accumulator internal _totalAccumulator;
```


### _winningRandomNumber
The winner random number for the last awarded draw.


```solidity
uint256 internal _winningRandomNumber;
```


### drawManager
The draw manager address.


```solidity
address public drawManager;
```


### _directlyContributedReserve
Tracks reserve that was contributed directly to the reserve. Always increases.


```solidity
uint96 internal _directlyContributedReserve;
```


### claimCount
The number of prize claims for the last awarded draw.


```solidity
uint24 public claimCount;
```


### _totalWithdrawn
The total amount of prize tokens that have been claimed for all time.


```solidity
uint128 internal _totalWithdrawn;
```


### _totalRewardsToBeClaimed
The total amount of rewards that have yet to be claimed


```solidity
uint104 internal _totalRewardsToBeClaimed;
```


### shutdownObservation
The observation at which the shutdown balance was recorded


```solidity
Observation shutdownObservation;
```


### shutdownBalance
The balance available to be withdrawn at shutdown


```solidity
uint256 shutdownBalance;
```


### _withdrawalObservations
The total contributed observation that was used for the last withdrawal for a vault and account


```solidity
mapping(address vault => mapping(address account => Observation lastWithdrawalTotalContributedObservation)) internal
    _withdrawalObservations;
```


### _shutdownPortions
The shutdown portion of liquidity for a vault and account


```solidity
mapping(address vault => mapping(address account => ShutdownPortion shutdownPortion)) internal _shutdownPortions;
```


## Functions
### constructor

Constructs a new Prize Pool.


```solidity
constructor(ConstructorParams memory params)
    TieredLiquidityDistributor(
        params.tierLiquidityUtilizationRate,
        params.numberOfTiers,
        params.tierShares,
        params.canaryShares,
        params.reserveShares,
        params.grandPrizePeriodDraws
    );
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`params`|`ConstructorParams`|A struct of constructor parameters|


### onlyDrawManager

Modifier that throws if sender is not the draw manager.


```solidity
modifier onlyDrawManager();
```

### setDrawManager

Sets the Draw Manager contract on the prize pool. Can only be called once by the creator.


```solidity
function setDrawManager(address _drawManager) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_drawManager`|`address`|The address of the Draw Manager contract|


### contributePrizeTokens

Contributes prize tokens on behalf of the given vault.

*The tokens should have already been transferred to the prize pool.*

*The prize pool balance will be checked to ensure there is at least the given amount to deposit.*


```solidity
function contributePrizeTokens(address _prizeVault, uint256 _amount) public returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_prizeVault`|`address`|The address of the vault to contribute to|
|`_amount`|`uint256`|The amount of prize tokens to contribute|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of available prize tokens prior to the contribution.|


### donatePrizeTokens

Allows a user to donate prize tokens to the prize pool.


```solidity
function donatePrizeTokens(uint256 _amount) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_amount`|`uint256`|The amount of tokens to donate. The amount should already be approved for transfer.|


### allocateRewardFromReserve

Allows the Manager to allocate a reward from the reserve to a recipient.


```solidity
function allocateRewardFromReserve(address _to, uint96 _amount) external onlyDrawManager notShutdown;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_to`|`address`|The address to allocate the rewards to|
|`_amount`|`uint96`|The amount of tokens for the reward|


### awardDraw

Allows the Manager to award a draw with the winning random number.

*Updates the number of tiers, the winning random number and the prize pool reserve.*


```solidity
function awardDraw(uint256 winningRandomNumber_) external onlyDrawManager notShutdown returns (uint24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`winningRandomNumber_`|`uint256`|The winning random number for the draw|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint24`|The ID of the awarded draw|


### claimPrize

Claims a prize for a given winner and tier.

*This function takes in an address _winner, a uint8 _tier, a uint96 _claimReward, and an
address _claimRewardRecipient. It checks if _winner is actually the winner of the _tier for the calling vault.
If so, it calculates the prize size and transfers it to the winner. If not, it reverts with an error message.
The function then checks the claim record of _winner to see if they have already claimed the prize for the
awarded draw. If not, it updates the claim record with the claimed tier and emits a ClaimedPrize event with
information about the claim.
Note that this function can modify the state of the contract by updating the claim record, changing the largest
tier claimed and the claim count, and transferring prize tokens. The function is marked as external which
means that it can be called from outside the contract.*


```solidity
function claimPrize(
    address _winner,
    uint8 _tier,
    uint32 _prizeIndex,
    address _prizeRecipient,
    uint96 _claimReward,
    address _claimRewardRecipient
) external returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_winner`|`address`|The address of the eligible winner|
|`_tier`|`uint8`|The tier of the prize to be claimed.|
|`_prizeIndex`|`uint32`|The prize to claim for the winner. Must be less than the prize count for the tier.|
|`_prizeRecipient`|`address`|The recipient of the prize|
|`_claimReward`|`uint96`|The claimReward associated with claiming the prize.|
|`_claimRewardRecipient`|`address`|The address to receive the claimReward.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Total prize amount claimed (payout and claimRewards combined).|


### withdrawRewards

Withdraws earned rewards for the caller.

*Claims cannot occur after a draw has been finalized (1 period after a draw closes). This prevents
the reserve from changing while the following draw is being awarded.*


```solidity
function withdrawRewards(address _to, uint256 _amount) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_to`|`address`|The address to transfer the rewards to|
|`_amount`|`uint256`|The amount of rewards to withdraw|


### contributeReserve

Allows anyone to deposit directly into the Prize Pool reserve.

*Ensure caller has sufficient balance and has approved the Prize Pool to transfer the tokens*


```solidity
function contributeReserve(uint96 _amount) external notShutdown;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_amount`|`uint96`|The amount of tokens to increase the reserve by|


### getWinningRandomNumber

Returns the winning random number for the last awarded draw.


```solidity
function getWinningRandomNumber() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The winning random number|


### getLastAwardedDrawId

Returns the last awarded draw id.


```solidity
function getLastAwardedDrawId() external view returns (uint24);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint24`|The last awarded draw id|


### getContributedBetween

Returns the total prize tokens contributed by a particular vault between the given draw ids, inclusive.


```solidity
function getContributedBetween(address _vault, uint24 _startDrawIdInclusive, uint24 _endDrawIdInclusive)
    external
    view
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|The address of the vault|
|`_startDrawIdInclusive`|`uint24`|Start draw id inclusive|
|`_endDrawIdInclusive`|`uint24`|End draw id inclusive|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total prize tokens contributed by the given vault|


### getDonatedBetween

Returns the total prize tokens donated to the prize pool


```solidity
function getDonatedBetween(uint24 _startDrawIdInclusive, uint24 _endDrawIdInclusive) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_startDrawIdInclusive`|`uint24`|Start draw id inclusive|
|`_endDrawIdInclusive`|`uint24`|End draw id inclusive|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total prize tokens donated to the prize pool|


### getTotalAccumulatorNewestObservation

Returns the newest observation for the total accumulator


```solidity
function getTotalAccumulatorNewestObservation() external view returns (Observation memory);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Observation`|The newest observation|


### getVaultAccumulatorNewestObservation

Returns the newest observation for the specified vault accumulator


```solidity
function getVaultAccumulatorNewestObservation(address _vault) external view returns (Observation memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|The vault to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Observation`|The newest observation for the vault|


### getTierAccrualDurationInDraws

Computes the expected duration prize accrual for a tier.


```solidity
function getTierAccrualDurationInDraws(uint8 _tier) external view returns (uint24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_tier`|`uint8`|The tier to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint24`|The number of draws|


### totalWithdrawn

The total amount of prize tokens that have been withdrawn as fees or prizes


```solidity
function totalWithdrawn() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total amount of prize tokens that have been withdrawn as fees or prizes|


### pendingReserveContributions

Returns the amount of tokens that will be added to the reserve when next draw to award is awarded.

*Intended for Draw manager to use after a draw has closed but not yet been awarded.*


```solidity
function pendingReserveContributions() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of prize tokens that will be added to the reserve|


### wasClaimed

Returns whether the winner has claimed the tier for the last awarded draw


```solidity
function wasClaimed(address _vault, address _winner, uint8 _tier, uint32 _prizeIndex) external view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|The vault to check|
|`_winner`|`address`|The account to check|
|`_tier`|`uint8`|The tier to check|
|`_prizeIndex`|`uint32`|The prize index to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the winner claimed the tier for the last awarded draw, false otherwise.|


### wasClaimed

Returns whether the winner has claimed the tier for the specified draw


```solidity
function wasClaimed(address _vault, address _winner, uint24 _drawId, uint8 _tier, uint32 _prizeIndex)
    external
    view
    returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|The vault to check|
|`_winner`|`address`|The account to check|
|`_drawId`|`uint24`|The draw ID to check|
|`_tier`|`uint8`|The tier to check|
|`_prizeIndex`|`uint32`|The prize index to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the winner claimed the tier for the specified draw, false otherwise.|


### rewardBalance

Returns the balance of rewards earned for the given address.


```solidity
function rewardBalance(address _recipient) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_recipient`|`address`|The recipient to retrieve the reward balance for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The balance of rewards for the given recipient|


### estimateNextNumberOfTiers

Computes and returns the next number of tiers based on the current prize claim counts. This number may change throughout the draw


```solidity
function estimateNextNumberOfTiers() external view returns (uint8);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint8`|The next number of tiers|


### accountedBalance

Computes how many tokens have been accounted for


```solidity
function accountedBalance() public view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The balance of tokens that have been accounted for|


### getShutdownInfo

Returns the balance available at the time of shutdown, less rewards to be claimed.

*This function will compute and store the current balance if it has not yet been set.*


```solidity
function getShutdownInfo() public returns (uint256 balance, Observation memory observation);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`balance`|`uint256`|The balance that is available for depositors to withdraw|
|`observation`|`Observation`|The observation used to compute the balance|


### getOpenDrawId

Returns the open draw ID based on the current block timestamp.

*Returns `1` if the first draw hasn't opened yet. This prevents any contributions from
going to the inaccessible draw zero.*

*First draw has an ID of `1`. This means that if `_lastAwardedDrawId` is zero,
we know that no draws have been awarded yet.*

*Capped at the shutdown draw ID if the prize pool has shutdown.*


```solidity
function getOpenDrawId() public view returns (uint24);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint24`|The ID of the draw period that the current block is in|


### getDrawId

Returns the open draw id for the given timestamp


```solidity
function getDrawId(uint256 _timestamp) public view returns (uint24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_timestamp`|`uint256`|The timestamp to get the draw id for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint24`|The ID of the open draw that the timestamp is in|


### getDrawIdToAward

Returns the next draw ID that can be awarded.

*It's possible for draws to be missed, so the next draw ID to award
may be more than one draw ahead of the last awarded draw ID.*


```solidity
function getDrawIdToAward() public view returns (uint24);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint24`|The next draw ID that can be awarded|


### drawOpensAt

Returns the time at which a draw opens / opened at.


```solidity
function drawOpensAt(uint24 drawId) public view returns (uint48);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`drawId`|`uint24`|The draw to get the timestamp for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint48`|The start time of the draw in seconds|


### drawClosesAt

Returns the time at which a draw closes / closed at.


```solidity
function drawClosesAt(uint24 drawId) public view returns (uint48);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`drawId`|`uint24`|The draw to get the timestamp for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint48`|The end time of the draw in seconds|


### isDrawFinalized

Checks if the given draw is finalized.


```solidity
function isDrawFinalized(uint24 drawId) public view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`drawId`|`uint24`|The draw to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the draw is finalized, false otherwise|


### computeNextNumberOfTiers

Calculates the number of tiers given the number of prize claims

*This function will use the claim count to determine the number of tiers, then add one for the canary tier.*


```solidity
function computeNextNumberOfTiers(uint32 _claimCount) public view returns (uint8);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_claimCount`|`uint32`|The number of prize claims|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint8`|The estimated number of tiers + the canary tier|


### computeShutdownPortion

Returns the given account and vault's portion of the shutdown balance.


```solidity
function computeShutdownPortion(address _vault, address _account) public view returns (ShutdownPortion memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|The vault whose contributions are measured|
|`_account`|`address`|The account whose vault twab is measured|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`ShutdownPortion`|The portion of the shutdown balance that the account is entitled to.|


### shutdownBalanceOf

Returns the shutdown balance for a given vault and account. The prize pool must already be shutdown.

*The shutdown balance is the amount of prize tokens that a user can claim after the prize pool has been shutdown.*

*The shutdown balance is calculated using the user's TWAB and the total supply TWAB, whose time ranges are the
grand prize period prior to the shutdown timestamp.*


```solidity
function shutdownBalanceOf(address _vault, address _account) public returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|The vault to check|
|`_account`|`address`|The account to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The shutdown balance for the given vault and account|


### withdrawShutdownBalance

Withdraws the shutdown balance for a given vault and sender


```solidity
function withdrawShutdownBalance(address _vault, address _recipient) external returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|The eligible vault to withdraw the shutdown balance from|
|`_recipient`|`address`|The address to send the shutdown balance to|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of prize tokens withdrawn|


### getShutdownDrawId

Returns the open draw ID at the time of shutdown.


```solidity
function getShutdownDrawId() public view returns (uint24);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint24`|The draw id|


### shutdownAt

Returns the timestamp at which the prize pool will be considered inactive and shutdown


```solidity
function shutdownAt() public view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The timestamp at which the prize pool will be considered inactive|


### isShutdown

Returns whether the prize pool has been shutdown


```solidity
function isShutdown() public view returns (bool);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if shutdown, false otherwise|


### drawTimeoutAt

Returns the timestamp at which the prize pool will be considered inactive


```solidity
function drawTimeoutAt() public view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The timestamp at which the prize pool has timed out and becomes inactive|


### getTotalContributedBetween

Returns the total prize tokens contributed between the given draw ids, inclusive.


```solidity
function getTotalContributedBetween(uint24 _startDrawIdInclusive, uint24 _endDrawIdInclusive)
    public
    view
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_startDrawIdInclusive`|`uint24`|Start draw id inclusive|
|`_endDrawIdInclusive`|`uint24`|End draw id inclusive|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total prize tokens contributed by all vaults|


### isWinner

Checks if the given user has won the prize for the specified tier in the given vault.


```solidity
function isWinner(address _vault, address _user, uint8 _tier, uint32 _prizeIndex) public view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|The address of the vault to check|
|`_user`|`address`|The address of the user to check for the prize|
|`_tier`|`uint8`|The tier for which the prize is to be checked|
|`_prizeIndex`|`uint32`|The prize index to check. Must be less than prize count for the tier|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|A boolean value indicating whether the user has won the prize or not|


### computeRangeStartDrawIdInclusive

Compute the start draw id for a range given the end draw id and range size


```solidity
function computeRangeStartDrawIdInclusive(uint24 _endDrawIdInclusive, uint24 _rangeSize) public pure returns (uint24);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_endDrawIdInclusive`|`uint24`|The end draw id (inclusive) of the range|
|`_rangeSize`|`uint24`|The size of the range|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint24`|The start draw id (inclusive) of the range|


### getVaultUserBalanceAndTotalSupplyTwab

Returns the time-weighted average balance (TWAB) and the TWAB total supply for the specified user in
the given vault over a specified period.

*This function calculates the TWAB for a user by calling the getTwabBetween function of the TWAB controller
for a specified period of time.*


```solidity
function getVaultUserBalanceAndTotalSupplyTwab(
    address _vault,
    address _user,
    uint24 _startDrawIdInclusive,
    uint24 _endDrawIdInclusive
) public view returns (uint256 twab, uint256 twabTotalSupply);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|The address of the vault for which to get the TWAB.|
|`_user`|`address`|The address of the user for which to get the TWAB.|
|`_startDrawIdInclusive`|`uint24`|The starting draw for the range (inclusive)|
|`_endDrawIdInclusive`|`uint24`|The end draw for the range (inclusive)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`twab`|`uint256`|The TWAB for the specified user in the given vault over the specified period.|
|`twabTotalSupply`|`uint256`|The TWAB total supply over the specified period.|


### getVaultPortion

Calculates the portion of the vault's contribution to the prize pool over a specified duration in draws.


```solidity
function getVaultPortion(address _vault, uint24 _startDrawIdInclusive, uint24 _endDrawIdInclusive)
    public
    view
    returns (SD59x18);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|The address of the vault for which to calculate the portion.|
|`_startDrawIdInclusive`|`uint24`|The starting draw ID (inclusive) of the draw range to calculate the contribution portion for.|
|`_endDrawIdInclusive`|`uint24`|The ending draw ID (inclusive) of the draw range to calculate the contribution portion for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`SD59x18`|The portion of the vault's contribution to the prize pool over the specified duration in draws.|


### _getVaultShares


```solidity
function _getVaultShares(address _vault, uint24 _startDrawIdInclusive, uint24 _endDrawIdInclusive)
    internal
    view
    returns (uint256 shares, uint256 totalSupply);
```

### _accountedBalance


```solidity
function _accountedBalance(Observation memory _observation) internal view returns (uint256);
```

### notShutdown

Modifier that requires the prize pool not to be shutdown


```solidity
modifier notShutdown();
```

## Events
### ClaimedPrize
Emitted when a prize is claimed.


```solidity
event ClaimedPrize(
    address indexed vault,
    address indexed winner,
    address indexed recipient,
    uint24 drawId,
    uint8 tier,
    uint32 prizeIndex,
    uint152 payout,
    uint96 claimReward,
    address claimRewardRecipient
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|The address of the vault that claimed the prize.|
|`winner`|`address`|The address of the winner|
|`recipient`|`address`|The address of the prize recipient|
|`drawId`|`uint24`|The draw ID of the draw that was claimed.|
|`tier`|`uint8`|The prize tier that was claimed.|
|`prizeIndex`|`uint32`|The index of the prize that was claimed|
|`payout`|`uint152`|The amount of prize tokens that were paid out to the winner|
|`claimReward`|`uint96`|The amount of prize tokens that were paid to the claimer|
|`claimRewardRecipient`|`address`|The address that the claimReward was sent to|

### DrawAwarded
Emitted when a draw is awarded.


```solidity
event DrawAwarded(
    uint24 indexed drawId,
    uint256 winningRandomNumber,
    uint8 lastNumTiers,
    uint8 numTiers,
    uint104 reserve,
    uint128 prizeTokensPerShare,
    uint48 drawOpenedAt
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`drawId`|`uint24`|The ID of the draw that was awarded|
|`winningRandomNumber`|`uint256`|The winning random number for the awarded draw|
|`lastNumTiers`|`uint8`|The previous number of prize tiers|
|`numTiers`|`uint8`|The number of prize tiers for the awarded draw|
|`reserve`|`uint104`|The resulting reserve available|
|`prizeTokensPerShare`|`uint128`|The amount of prize tokens per share for the awarded draw|
|`drawOpenedAt`|`uint48`|The start timestamp of the awarded draw|

### AllocateRewardFromReserve
Emitted when any amount of the reserve is rewarded to a recipient.


```solidity
event AllocateRewardFromReserve(address indexed to, uint256 amount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|The recipient of the reward|
|`amount`|`uint256`|The amount of assets rewarded|

### ContributedReserve
Emitted when the reserve is manually increased.


```solidity
event ContributedReserve(address indexed user, uint256 amount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`user`|`address`|The user who increased the reserve|
|`amount`|`uint256`|The amount of assets transferred|

### ContributePrizeTokens
Emitted when a vault contributes prize tokens to the pool.


```solidity
event ContributePrizeTokens(address indexed vault, uint24 indexed drawId, uint256 amount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|The address of the vault that is contributing tokens|
|`drawId`|`uint24`|The ID of the first draw that the tokens will be contributed to|
|`amount`|`uint256`|The amount of tokens contributed|

### SetDrawManager
Emitted when the draw manager is set


```solidity
event SetDrawManager(address indexed drawManager);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`drawManager`|`address`|The address of the draw manager|

### WithdrawRewards
Emitted when an address withdraws their prize claim rewards.


```solidity
event WithdrawRewards(address indexed account, address indexed to, uint256 amount, uint256 available);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account`|`address`|The account that is withdrawing rewards|
|`to`|`address`|The address the rewards are sent to|
|`amount`|`uint256`|The amount withdrawn|
|`available`|`uint256`|The total amount that was available to withdraw before the transfer|

### IncreaseClaimRewards
Emitted when an address receives new prize claim rewards.


```solidity
event IncreaseClaimRewards(address indexed to, uint256 amount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|The address the rewards are given to|
|`amount`|`uint256`|The amount increased|

## Structs

### ShutdownPortion
A struct to represent a shutdown portion of liquidity for a vault and account


```solidity
struct ShutdownPortion {
    uint256 numerator;
    uint256 denominator;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`numerator`|`uint256`|The numerator of the portion|
|`denominator`|`uint256`|The denominator of the portion|

### ConstructorParams
Constructor Parameters


```solidity
struct ConstructorParams {
    IERC20 prizeToken;
    TwabController twabController;
    address creator;
    uint256 tierLiquidityUtilizationRate;
    uint48 drawPeriodSeconds;
    uint48 firstDrawOpensAt;
    uint24 grandPrizePeriodDraws;
    uint8 numberOfTiers;
    uint8 tierShares;
    uint8 canaryShares;
    uint8 reserveShares;
    uint24 drawTimeout;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`prizeToken`|`IERC20`|The token to use for prizes|
|`twabController`|`TwabController`|The Twab Controller to retrieve time-weighted average balances from|
|`creator`|`address`|The address that will be permitted to finish prize pool initialization after deployment|
|`tierLiquidityUtilizationRate`|`uint256`|The rate at which liquidity is utilized for prize tiers. This allows for deviations in prize claims; if 0.75e18 then it is 75% utilization so it can accommodate 25% deviation in more prize claims.|
|`drawPeriodSeconds`|`uint48`|The number of seconds between draws. E.g. a Prize Pool with a daily draw should have a draw period of 86400 seconds.|
|`firstDrawOpensAt`|`uint48`|The timestamp at which the first draw will open|
|`grandPrizePeriodDraws`|`uint24`|The target number of draws to pass between each grand prize|
|`numberOfTiers`|`uint8`|The number of tiers to start with. Must be greater than or equal to the minimum number of tiers|
|`tierShares`|`uint8`|The number of shares to allocate to each tier|
|`canaryShares`|`uint8`|The number of shares to allocate to each canary tier|
|`reserveShares`|`uint8`|The number of shares to allocate to the reserve|
|`drawTimeout`|`uint24`|The number of draws that need to be missed before the prize pool shuts down. The timeout resets when a draw is awarded.|
