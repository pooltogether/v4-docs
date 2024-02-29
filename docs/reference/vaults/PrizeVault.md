[Git Source](https://github.com/GenerationSoftware/pt-v5-vault/blob/20fa85c88da69db10b7e4f1a2b1d9cc5b6bca536/src/PrizeVault.sol)

**Inherits:**
[TwabERC20](./TwabERC20), [Claimable](./Claimable), IERC4626, ILiquidationSource, Ownable

**Author:**
G9 Software Inc.

The prize vault takes deposits of an asset and earns yield with the deposits through an underlying yield
vault. The yield is then expected to be liquidated and contributed to the prize pool as prize tokens. The
depositors of the prize vault will then be eligible to win prizes from the pool. If a prize is won, The
permitted claimer contract for the prize vault will claim the prize on behalf of the winner. Depositors
can also set custom hooks that are called directly before and after their prize is claimed.

*Share balances are stored in the TwabController contract.*

*Depositors should always expect to be able to withdraw their full deposit amount and no more as long as
global withdrawal limits meet or exceed their balance. However, if the underlying yield source loses
assets, depositors will only be able to withdraw a proportional amount of remaining assets based on their
share balance and the total debt balance.*

*The prize vault is designed to embody the "no loss" spirit of PoolTogether, down to the last wei. Most
ERC4626 yield vaults incur small, necessary rounding errors on deposit and withdrawal to ensure the
internal accounting cannot be taken advantage of. The prize vault employs two strategies in an attempt
to cover these rounding errors with yield to ensure that depositors can withdraw every last wei of their
initial deposit:
1. The "dust collection strategy":
Rounding errors are directly related to the exchange rate of the underlying yield vault; the more
assets a single yield vault share is worth, the more severe the rounding errors can become. For
example, if the exchange rate is 100 assets for 1 yield vault share and we assume 0 decimal
precision; if alice deposits 199 assets, the yield vault will round down on the conversion and mint
alice 1 share, essentially donating the remaining 99 assets to the yield vault. This behavior can
open pathways for exploits in the prize vault since a bad actor could repeatedly make deposits and
withdrawals that result in large rounding errors and since the prize vault covers rounding errors
with yield, the attacker could withdraw without loss while essentially donating the yield back to
the yield vault.
To mitigate this issue, the prize vault calculates the amount of yield vault shares that would be
minted during a deposit, but mints those shares directly instead, ensuring that only the exact
amount of assets needed are sent to the yield vault while keeping the remainder as a latent balance
in the prize vault until it can be used in the next deposit or withdraw. An inverse strategy is also
used when withdrawing assets from the yield vault. This reduces the possible rounding errors to just
1 wei per deposit or withdraw.
2. The "yield buffer":
Since the prize vault can still incur minimal rounding errors from the yield vault, a yield buffer
is required to ensure that there is always enough yield reserved to cover the rounding errors on
deposits and withdrawals. This buffer should never run dry during normal operating conditions and
expected yield rates. If the yield buffer is ever depleted, new deposits will be prevented and the
prize vault will enter a lossy withdrawal state where depositors will incur the rounding errors on
withdraw.*

*The prize vault does not support underlying yield vaults that take a fee on deposit or withdraw.*


## State Variables
### FEE_PRECISION
The yield fee decimal precision.


```solidity
uint32 public constant FEE_PRECISION = 1e9;
```


### MAX_YIELD_FEE
The max yield fee that can be set.

*Decimal precision is defined by `FEE_PRECISION`.*

*If the yield fee is set too high, liquidations won't occur on a regular basis. If a use case requires
a yield fee higher than this max, a custom liquidation pair can be set to manipulate the yield as required.*


```solidity
uint32 public constant MAX_YIELD_FEE = 9e8;
```


### yieldBuffer
The yield buffer that is reserved for covering rounding errors on withdrawals and deposits.

*The buffer prevents the entire yield balance from being liquidated, which would leave the vault
in a state where a single rounding error could reduce the totalAssets to less than the totalSupply.
The yield buffer is expected to be of insignificant value and is used to cover rounding
errors on deposits and withdrawals. Yield is expected to accrue faster than the yield buffer
can be reasonably depleted.
IT IS RECOMMENDED TO DONATE ASSETS DIRECTLY TO THE PRIZE VAULT AFTER DEPLOYMENT TO FILL THE YIELD
BUFFER AND COVER ROUNDING ERRORS UNTIL THE DEPOSITS CAN GENERATE ENOUGH YIELD TO KEEP THE BUFFER
FULL WITHOUT ASSISTANCE.
The yield buffer should be set as high as possible while still being considered insignificant
for the underlying asset. For example, a reasonable yield buffer for USDC with 6 decimals might be
1e5 (`$0.10`), which will cover up to 100k rounding errors while still being an insignificant value.
Some assets may be considered incompatible with the prize vault if the yield vault incurs rounding
errors and the underlying asset has a low precision per dollar ratio.
Precision per dollar (PPD) can be calculated by: `(10 ^ DECIMALS) / ($ value of 1 asset)`.
For example, USDC has a PPD of `(10 ^ 6) / ($1) = 10e6 p/$`.
As a rule of thumb, assets with lower PPD than USDC should not be assumed to be compatible since
the potential loss of a single unit rounding error is likely too high to be made up by yield at
a reasonable rate. Actual results may vary based on expected gas costs, asset fluctuation, and yield
accrual rates. If the underlying yield vault does not incur any rounding errors, then the yield buffer
can be set to zero.
If the yield buffer is depleted on the prize vault, new deposits will be prevented if it would result in
a rounding error and any rounding errors incurred by withdrawals will not be covered by yield. The yield
buffer will be replenished automatically as yield accrues.*


```solidity
uint256 public immutable yieldBuffer;
```


### yieldVault
Address of the underlying ERC4626 vault generating yield.


```solidity
IERC4626 public immutable yieldVault;
```


### yieldFeePercentage
Yield fee percentage represented in integer format with decimal precision defined by `FEE_PRECISION`.

*For example, if `FEE_PRECISION` were 1e9 a value of 1e7 = 0.01 = 1%.*


```solidity
uint32 public yieldFeePercentage;
```


### yieldFeeRecipient
Address of the yield fee recipient.


```solidity
address public yieldFeeRecipient;
```


### yieldFeeBalance
The accrued yield fee balance that the fee recipient can claim as vault shares.


```solidity
uint256 public yieldFeeBalance;
```


### liquidationPair
Address of the liquidation pair used to liquidate yield for prize token.


```solidity
address public liquidationPair;
```


### _asset
Address of the underlying asset used by the Vault.


```solidity
IERC20 private immutable _asset;
```


### _underlyingDecimals
Underlying asset decimals.


```solidity
uint8 private immutable _underlyingDecimals;
```


## Functions
### onlyLiquidationPair

Requires the caller to be the liquidation pair.


```solidity
modifier onlyLiquidationPair();
```

### onlyYieldFeeRecipient

Requires the caller to be the yield fee recipient.


```solidity
modifier onlyYieldFeeRecipient();
```

### constructor

Vault constructor


```solidity
constructor(
    string memory name_,
    string memory symbol_,
    IERC4626 yieldVault_,
    PrizePool prizePool_,
    address claimer_,
    address yieldFeeRecipient_,
    uint32 yieldFeePercentage_,
    uint256 yieldBuffer_,
    address owner_
) TwabERC20(name_, symbol_, prizePool_.twabController()) Claimable(prizePool_, claimer_) Ownable(owner_);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`name_`|`string`|Name of the ERC20 share minted by the vault|
|`symbol_`|`string`|Symbol of the ERC20 share minted by the vault|
|`yieldVault_`|`IERC4626`|Address of the underlying ERC4626 vault in which assets are deposited to generate yield|
|`prizePool_`|`PrizePool`|Address of the PrizePool that computes prizes|
|`claimer_`|`address`|Address of the claimer|
|`yieldFeeRecipient_`|`address`|Address of the yield fee recipient|
|`yieldFeePercentage_`|`uint32`|Yield fee percentage|
|`yieldBuffer_`|`uint256`|Amount of yield to keep as a buffer|
|`owner_`|`address`|Address that will gain ownership of this contract|


### decimals


```solidity
function decimals() public view override(ERC20, IERC20Metadata) returns (uint8);
```

### asset


```solidity
function asset() external view returns (address);
```

### totalAssets

*The latent asset balance is included in the total asset count to account for the "dust collection
strategy".*


```solidity
function totalAssets() public view returns (uint256);
```

### convertToShares


```solidity
function convertToShares(uint256 _assets) public view returns (uint256);
```

### convertToAssets


```solidity
function convertToAssets(uint256 _shares) public view returns (uint256);
```

### maxDeposit

*Considers the uint96 limit on total share supply in the TwabController*

*Returns zero if any deposit would result in a loss of assets*

*Any latent balance of assets in the prize vault will be swept in with the deposit as a part of
the "dust collection strategy". This means that the max deposit must account for the latent balance
by subtracting it from the max deposit available otherwise.*


```solidity
function maxDeposit(address) public view returns (uint256);
```

### maxMint

*Returns the same value as `maxDeposit` since shares and assets are 1:1 on mint*

*Returns zero if any deposit would result in a loss of assets*


```solidity
function maxMint(address _owner) public view returns (uint256);
```

### maxWithdraw

*The prize vault maintains a latent balance of assets as part of the "dust collection strategy".
This latent balance are accounted for in the max withdraw limits.*


```solidity
function maxWithdraw(address _owner) public view returns (uint256);
```

### maxRedeem

*The prize vault maintains a latent balance of assets as part of the "dust collection strategy".
This latent balance are accounted for in the max redeem limits.*


```solidity
function maxRedeem(address _owner) public view returns (uint256);
```

### previewDeposit


```solidity
function previewDeposit(uint256 _assets) public pure returns (uint256);
```

### previewMint


```solidity
function previewMint(uint256 _shares) public pure returns (uint256);
```

### previewWithdraw

*Reverts if `totalAssets` in the vault is zero*


```solidity
function previewWithdraw(uint256 _assets) public view returns (uint256);
```

### previewRedeem


```solidity
function previewRedeem(uint256 _shares) public view returns (uint256);
```

### deposit


```solidity
function deposit(uint256 _assets, address _receiver) external returns (uint256);
```

### mint


```solidity
function mint(uint256 _shares, address _receiver) external returns (uint256);
```

### withdraw


```solidity
function withdraw(uint256 _assets, address _receiver, address _owner) external returns (uint256);
```

### redeem


```solidity
function redeem(uint256 _shares, address _receiver, address _owner) external returns (uint256);
```

### depositWithPermit

Approve underlying asset with permit, deposit into the Vault and mint Vault shares to `_owner`.

*Can't be used to deposit on behalf of another user since `permit` does not accept a receiver parameter,
meaning that anyone could reuse the signature and pass an arbitrary receiver to this function.*


```solidity
function depositWithPermit(uint256 _assets, address _owner, uint256 _deadline, uint8 _v, bytes32 _r, bytes32 _s)
    external
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_assets`|`uint256`|Amount of assets to approve and deposit|
|`_owner`|`address`|Address of the owner depositing `_assets` and signing the permit|
|`_deadline`|`uint256`|Timestamp after which the approval is no longer valid|
|`_v`|`uint8`|V part of the secp256k1 signature|
|`_r`|`bytes32`|R part of the secp256k1 signature|
|`_s`|`bytes32`|S part of the secp256k1 signature|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Amount of Vault shares minted to `_owner`.|


### sponsor

Deposit assets into the Vault and delegate to the sponsorship address.

*Emits a `Sponsor` event*


```solidity
function sponsor(uint256 _assets) external returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_assets`|`uint256`|Amount of assets to deposit|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Amount of shares minted to caller.|


### totalDebt

Returns the total assets that are owed to share holders and any other internal balances.


```solidity
function totalDebt() public view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total asset debt of the vault|


### totalYieldBalance

Total yield balance of the vault

*Equal to total assets minus total debt*


```solidity
function totalYieldBalance() public view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total yield balance|


### availableYieldBalance

Total available yield on the vault

*Equal to total assets minus total allocation (total debt + yield buffer)*


```solidity
function availableYieldBalance() public view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The available yield balance|


### currentYieldBuffer

Current amount of assets available in the yield buffer


```solidity
function currentYieldBuffer() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The available assets in the yield buffer|


### claimYieldFeeShares

Transfers yield fee shares to the yield fee recipient

*Emits a `ClaimYieldFeeShares` event*

*Will revert if the caller is not the yield fee recipient or if zero shares are withdrawn*


```solidity
function claimYieldFeeShares(uint256 _shares) external onlyYieldFeeRecipient;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_shares`|`uint256`|The shares to mint to the yield fee recipient|


### liquidatableBalanceOf

*Returns the liquid amount of `_tokenOut` minus any yield fees.*

*Supports the liquidation of either assets or prize vault shares.*


```solidity
function liquidatableBalanceOf(address _tokenOut) public view returns (uint256);
```

### transferTokensOut

*Emits a `TransferYieldOut` event*

*Supports the liquidation of either assets or prize vault shares.*


```solidity
function transferTokensOut(address, address _receiver, address _tokenOut, uint256 _amountOut)
    public
    virtual
    onlyLiquidationPair
    returns (bytes memory);
```

### verifyTokensIn


```solidity
function verifyTokensIn(address _tokenIn, uint256 _amountIn, bytes calldata) external onlyLiquidationPair;
```

### targetOf


```solidity
function targetOf(address) external view returns (address);
```

### isLiquidationPair


```solidity
function isLiquidationPair(address _tokenOut, address _liquidationPair) external view returns (bool);
```

### setClaimer

Set claimer.


```solidity
function setClaimer(address _claimer) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_claimer`|`address`|Address of the claimer|


### setLiquidationPair

Set liquidationPair.

*Emits a `LiquidationPairSet` event*


```solidity
function setLiquidationPair(address _liquidationPair) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_liquidationPair`|`address`|New liquidationPair address|


### setYieldFeePercentage

Set yield fee percentage.

*Yield fee is defined on a scale from `0` to `FEE_PRECISION`, inclusive.*


```solidity
function setYieldFeePercentage(uint32 _yieldFeePercentage) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_yieldFeePercentage`|`uint32`|The new yield fee percentage to set|


### setYieldFeeRecipient

Set fee recipient.


```solidity
function setYieldFeeRecipient(address _yieldFeeRecipient) external onlyOwner;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_yieldFeeRecipient`|`address`|Address of the fee recipient|


### _tryGetAssetDecimals

Fetch decimals of the underlying asset.

*A return value of false indicates that the attempt failed in some way.*


```solidity
function _tryGetAssetDecimals(IERC20 asset_) internal view returns (bool, uint8);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|Address of the underlying asset|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the attempt was successful, false otherwise|
|`<none>`|`uint8`|Number of token decimals|


### _totalDebt

Returns the total assets that are owed to share holders and any other internal balances.

*The yield fee balance is included since it's cheaper to keep track of those shares
internally instead of doing an additional TWAB mint on every liquidation.*


```solidity
function _totalDebt(uint256 _totalSupply) internal view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_totalSupply`|`uint256`|The total share supply of the vault|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total asset debt of the vault|


### _twabSupplyLimit

Returns the remaining supply that can be minted without exceeding the TwabController limits.

*The TwabController limits the total supply for each vault to uint96*


```solidity
function _twabSupplyLimit(uint256 _totalSupply) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_totalSupply`|`uint256`|The total share supply of the vault|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The remaining supply that can be minted without exceeding TWAB limits|


### _totalYieldBalance

Total yield balance of the vault (including the yield buffer).


```solidity
function _totalYieldBalance(uint256 _totalAssets, uint256 totalDebt_) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_totalAssets`|`uint256`|The total assets controlled by the vault|
|`totalDebt_`|`uint256`|The total asset debt owed|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total yield balance|


### _availableYieldBalance

Available yield balance given the total assets and total share supply.

*Subtracts the yield buffer from the total yield balance.*


```solidity
function _availableYieldBalance(uint256 _totalAssets, uint256 totalDebt_) internal view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_totalAssets`|`uint256`|The total assets controlled by the vault|
|`totalDebt_`|`uint256`|The total asset debt owed|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The available yield balance|


### _depositAndMint

Deposits assets to the yield vault and mints shares

*Emits a `Deposit` event.*

*Will revert if 0 shares are minted back to the receiver or if 0 assets are deposited.*

*Will revert if the deposit may result in the loss of funds.*


```solidity
function _depositAndMint(address _caller, address _receiver, uint256 _assets, uint256 _shares) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_caller`|`address`|The caller of the deposit|
|`_receiver`|`address`|The receiver of the deposit shares|
|`_assets`|`uint256`|Amount of assets to deposit|
|`_shares`|`uint256`|Amount of shares to mint|


### _burnAndWithdraw

Burns shares and withdraws assets from the underlying yield vault.

*Emits a `Withdraw` event.*

*Will revert if 0 assets are withdrawn or if 0 shares are burned*


```solidity
function _burnAndWithdraw(address _caller, address _receiver, address _owner, uint256 _shares, uint256 _assets)
    internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_caller`|`address`|Address of the caller|
|`_receiver`|`address`|Address of the receiver of the assets|
|`_owner`|`address`|Owner of the shares|
|`_shares`|`uint256`|Shares to burn|
|`_assets`|`uint256`|Assets to withdraw|


### _maxYieldVaultWithdraw

Returns the max assets that can be withdrawn from the yield vault through this vault's
`_withdraw` function.

*This should be used over `yieldVault.maxWithdraw` when considering withdrawal limits since
this function takes into account the yield vault redemption limits, which is necessary since the
`_withdraw` function uses `yieldVault.redeem` instead of `yieldVault.withdraw`. Since we convert
the max redeemable shares to assets rounding down, the `yieldVault.previewWithdraw` call in the
`_withdraw` function is guaranteed to return less than or equal shares to the max yield vault
redemption.*


```solidity
function _maxYieldVaultWithdraw() internal view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The max assets that can be withdrawn from the yield vault.|


### _withdraw

Withdraws assets to the receiver while accounting for rounding errors.


```solidity
function _withdraw(address _receiver, uint256 _assets) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_receiver`|`address`|The receiver of the assets|
|`_assets`|`uint256`|The assets to withdraw|


### _setYieldFeePercentage

Set yield fee percentage.

*Yield fee is defined on a scale from `0` to `MAX_YIELD_FEE`, inclusive.*

*Emits a `YieldFeePercentageSet` event*


```solidity
function _setYieldFeePercentage(uint32 _yieldFeePercentage) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_yieldFeePercentage`|`uint32`|The new yield fee percentage to set|


### _setYieldFeeRecipient

Set yield fee recipient address.

*Emits a `YieldFeeRecipientSet` event*


```solidity
function _setYieldFeeRecipient(address _yieldFeeRecipient) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_yieldFeeRecipient`|`address`|Address of the fee recipient|


## Events
### YieldFeeRecipientSet
Emitted when a new yield fee recipient has been set.


```solidity
event YieldFeeRecipientSet(address indexed yieldFeeRecipient);
```

### YieldFeePercentageSet
Emitted when a new yield fee percentage has been set.


```solidity
event YieldFeePercentageSet(uint256 yieldFeePercentage);
```

### Sponsor
Emitted when a user sponsors the Vault.


```solidity
event Sponsor(address indexed caller, uint256 assets, uint256 shares);
```

### TransferYieldOut
Emitted when yield is transferred out by the liquidation pair address.


```solidity
event TransferYieldOut(
    address indexed liquidationPair,
    address indexed tokenOut,
    address indexed recipient,
    uint256 amountOut,
    uint256 yieldFee
);
```

### ClaimYieldFeeShares
Emitted when yield fee shares are claimed by the yield fee recipient.


```solidity
event ClaimYieldFeeShares(address indexed recipient, uint256 shares);
```

## Errors
### YieldVaultZeroAddress
Thrown when the Yield Vault is set to the zero address.


```solidity
error YieldVaultZeroAddress();
```

### OwnerZeroAddress
Thrown when the Owner is set to the zero address.


```solidity
error OwnerZeroAddress();
```

### WithdrawZeroAssets
Thrown when a withdrawal of zero assets on the yield vault is attempted


```solidity
error WithdrawZeroAssets();
```

### BurnZeroShares
Thrown when no shares are being burnt during a withdrawal of assets


```solidity
error BurnZeroShares();
```

### DepositZeroAssets
Thrown when zero assets are being deposited


```solidity
error DepositZeroAssets();
```

### MintZeroShares
Thrown when zero shares are being minted


```solidity
error MintZeroShares();
```

### ZeroTotalAssets
Thrown if `totalAssets` is zero during a withdraw


```solidity
error ZeroTotalAssets();
```

### LPZeroAddress
Thrown when the Liquidation Pair being set is the zero address.


```solidity
error LPZeroAddress();
```

### SweepZeroAssets
Thrown when `sweep` is called but no underlying assets are currently held by the Vault.


```solidity
error SweepZeroAssets();
```

### LiquidationAmountOutZero
Thrown during the liquidation process when the liquidation amount out is zero.


```solidity
error LiquidationAmountOutZero();
```

### CallerNotLP
Thrown during the liquidation process when the caller is not the liquidation pair contract.


```solidity
error CallerNotLP(address caller, address liquidationPair);
```

### CallerNotYieldFeeRecipient
Thrown if the caller is not the yield fee recipient when withdrawing yield fee shares.


```solidity
error CallerNotYieldFeeRecipient(address caller, address yieldFeeRecipient);
```

### PermitCallerNotOwner
Thrown when the caller of a permit function is not the owner of the assets being permitted.


```solidity
error PermitCallerNotOwner(address caller, address owner);
```

### YieldFeePercentageExceedsMax
Thrown when the yield fee percentage being set exceeds the max yield fee allowed.


```solidity
error YieldFeePercentageExceedsMax(uint256 yieldFeePercentage, uint256 maxYieldFeePercentage);
```

### SharesExceedsYieldFeeBalance
Thrown when the yield fee shares being withdrawn exceeds the available yieldFee Balance.


```solidity
error SharesExceedsYieldFeeBalance(uint256 shares, uint256 yieldFeeBalance);
```

### LiquidationTokenInNotPrizeToken
Thrown during the liquidation process when the token in is not the prize token.


```solidity
error LiquidationTokenInNotPrizeToken(address tokenIn, address prizeToken);
```

### LiquidationTokenOutNotSupported
Thrown during the liquidation process when the token out is not supported.


```solidity
error LiquidationTokenOutNotSupported(address tokenOut);
```

### LiquidationExceedsAvailable
Thrown during the liquidation process if the total to withdraw is greater than the available yield.


```solidity
error LiquidationExceedsAvailable(uint256 totalToWithdraw, uint256 availableYield);
```

### LossyDeposit
Thrown when a deposit results in a state where the total assets are less than the total share supply.


```solidity
error LossyDeposit(uint256 totalAssets, uint256 totalSupply);
```

