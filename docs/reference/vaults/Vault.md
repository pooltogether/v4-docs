[Git Source](https://github.com/GenerationSoftware/pt-v5-vault/blob/97f5fd14e9d25c704b9d7da87c4d9d996b7dec41/src/Vault.sol)



**Inherits:**
IERC4626, ERC20Permit, ILiquidationSource, IClaimable, Ownable

**Author:**
PoolTogether Inc. & G9 Software Inc.

Vault extends the ERC4626 standard and is the entry point for users interacting with a V5 pool.
Users deposit an underlying asset (i.e. USDC) in this contract and receive in exchange an ERC20 token
representing their share of deposit in the vault.
Underlying assets are then deposited in a YieldVault to generate yield.
This yield is sold for prize tokens (i.e. POOL) via the Liquidator and captured by the PrizePool to be awarded to depositors.

*Balances are stored in the TwabController contract.*


## State Variables
### UINT96_MAX
The maximum amount of shares that can be minted.


```solidity
uint256 private constant UINT96_MAX = type(uint96).max;
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


### FEE_PRECISION
Fee precision denominated in 9 decimal places and used to calculate yield fee percentage.


```solidity
uint32 private constant FEE_PRECISION = 1e9;
```


### _yieldFeePercentage
Yield fee percentage represented in integer format with 9 decimal places (i.e. 10000000 = 0.01 = 1%).


```solidity
uint32 private _yieldFeePercentage;
```


### HOOK_GAS
The gas to give to each of the before and after prize claim hooks.
This should be enough gas to mint an NFT if needed.


```solidity
uint24 private constant HOOK_GAS = 150_000;
```


### _twabController
Address of the TwabController used to keep track of balances.


```solidity
TwabController private immutable _twabController;
```


### _yieldVault
Address of the ERC4626 vault generating yield.


```solidity
IERC4626 private immutable _yieldVault;
```


### _prizePool
Address of the PrizePool that computes prizes.


```solidity
PrizePool private immutable _prizePool;
```


### _claimer
Address of the claimer.


```solidity
address private _claimer;
```


### _liquidationPair
Address of the liquidation pair used to liquidate yield for prize token.


```solidity
address private _liquidationPair;
```


### _yieldFeeRecipient
Address of the yield fee recipient. Receives Vault shares when `mintYieldFee` is called.


```solidity
address private _yieldFeeRecipient;
```


### _yieldFeeShares
Total yield fee shares available. Can be minted to `_yieldFeeRecipient` by calling `mintYieldFee`.


```solidity
uint256 private _yieldFeeShares;
```


### _hooks
Maps user addresses to hooks that they want to execute when prizes are won.


```solidity
mapping(address => VaultHooks) internal _hooks;
```


## Functions
### onlyVaultCollateralized

Modifier reverting if the Vault is under-collateralized.


```solidity
modifier onlyVaultCollateralized();
```

### _onlyVaultCollateralized

Reverts if the Vault is under-collateralized.


```solidity
function _onlyVaultCollateralized(uint256 _depositedAssets, uint256 _withdrawableAssets) internal pure;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_depositedAssets`|`uint256`|Assets deposited into the YieldVault|
|`_withdrawableAssets`|`uint256`|Assets withdrawable from the YieldVault|


### onlyClaimer

Requires the caller to be the claimer.


```solidity
modifier onlyClaimer();
```

### onlyLiquidationPair

Requires the caller to be the liquidation pair.


```solidity
modifier onlyLiquidationPair();
```

### constructor

Vault constructor

*`claimer_` can be set to address zero if none is available yet.*


```solidity
constructor(
    IERC20 asset_,
    string memory name_,
    string memory symbol_,
    IERC4626 yieldVault_,
    PrizePool prizePool_,
    address claimer_,
    address yieldFeeRecipient_,
    uint32 yieldFeePercentage_,
    address owner_
) ERC20(name_, symbol_) ERC20Permit(name_) Ownable(owner_);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|Address of the underlying asset used by the vault|
|`name_`|`string`|Name of the ERC20 share minted by the vault|
|`symbol_`|`string`|Symbol of the ERC20 share minted by the vault|
|`yieldVault_`|`IERC4626`|Address of the ERC4626 vault in which assets are deposited to generate yield|
|`prizePool_`|`PrizePool`|Address of the PrizePool that computes prizes|
|`claimer_`|`address`|Address of the claimer|
|`yieldFeeRecipient_`|`address`|Address of the yield fee recipient|
|`yieldFeePercentage_`|`uint32`|Yield fee percentage|
|`owner_`|`address`|Address that will gain ownership of this contract|


### asset


```solidity
function asset() external view virtual override returns (address);
```

### balanceOf


```solidity
function balanceOf(address _account) public view virtual override(ERC20, IERC20) returns (uint256);
```

### decimals


```solidity
function decimals() public view virtual override(ERC20, IERC20Metadata) returns (uint8);
```

### totalAssets


```solidity
function totalAssets() external view virtual override returns (uint256);
```

### totalSupply


```solidity
function totalSupply() public view virtual override(ERC20, IERC20) returns (uint256);
```

### convertToShares


```solidity
function convertToShares(uint256 _assets) external view virtual override returns (uint256);
```

### convertToAssets


```solidity
function convertToAssets(uint256 _shares) external view virtual override returns (uint256);
```

### maxDeposit


```solidity
function maxDeposit(address) external view virtual override returns (uint256);
```

### previewDeposit


```solidity
function previewDeposit(uint256 _assets) external view virtual override returns (uint256);
```

### maxMint


```solidity
function maxMint(address) external view virtual override returns (uint256);
```

### previewMint


```solidity
function previewMint(uint256 _shares) external view virtual override returns (uint256);
```

### maxWithdraw


```solidity
function maxWithdraw(address _owner) external view virtual override returns (uint256);
```

### previewWithdraw


```solidity
function previewWithdraw(uint256 _assets) external view virtual override returns (uint256);
```

### maxRedeem


```solidity
function maxRedeem(address _owner) external view virtual override returns (uint256);
```

### previewRedeem


```solidity
function previewRedeem(uint256 _shares) external view virtual override returns (uint256);
```

### deposit

*Will revert if the Vault is under-collateralized.*


```solidity
function deposit(uint256 _assets, address _receiver) external virtual override returns (uint256);
```

### depositWithPermit

Approve underlying asset with permit, deposit into the Vault and mint Vault shares to `_owner`.

*Can't be used to deposit on behalf of another user since `permit` does not accept a receiver parameter.
Meaning that anyone could reuse the signature and pass an arbitrary receiver to this function.*

*Will revert if the Vault is under-collateralized.*


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
|`<none>`|`uint256`|uint256 Amount of Vault shares minted to `_owner`.|


### mint

*Will revert if the Vault is under-collateralized.*


```solidity
function mint(uint256 _shares, address _receiver) external virtual override returns (uint256);
```

### sponsor

Deposit assets into the Vault and delegate to the sponsorship address.

*Will revert if the Vault is under-collateralized.*


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
|`<none>`|`uint256`|uint256 Amount of shares minted to caller.|


### sweep

Deposit underlying assets that have been mistakenly sent to the Vault into the YieldVault.

*The deposited assets will contribute to the yield of the YieldVault.*


```solidity
function sweep() external returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 Amount of underlying assets deposited|


### withdraw


```solidity
function withdraw(uint256 _assets, address _receiver, address _owner) external virtual override returns (uint256);
```

### redeem


```solidity
function redeem(uint256 _shares, address _receiver, address _owner) external virtual override returns (uint256);
```

### availableYieldBalance

Total available yield amount accrued by this vault.


```solidity
function availableYieldBalance() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 Total yield amount|


### availableYieldFeeBalance

Get the available yield fee amount accrued by this vault.


```solidity
function availableYieldFeeBalance() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 Yield fee amount|


### mintYieldFee

Mint Vault shares to the `_yieldFeeRecipient`.

*Will revert if the Vault is undercollateralized.
So shares does not need to be converted to assets.*

*Will revert if `_shares` is greater than `_yieldFeeShares`.*

*Will revert if there is not enough yield available in the YieldVault to back `_shares`.*


```solidity
function mintYieldFee(uint256 _shares) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_shares`|`uint256`|Amount of shares to mint|


### liquidatableBalanceOf


```solidity
function liquidatableBalanceOf(address _token) external view override returns (uint256);
```

### transferTokensOut

*Will revert if the Vault is undercollateralized.
So `_amountOut` does not need to be converted to assets.*

*User provides prize tokens and receives in exchange Vault shares.*

*The yield fee can serve as a buffer in case of undercollateralization of the Vault.*


```solidity
function transferTokensOut(address, address _receiver, address _tokenOut, uint256 _amountOut)
    external
    virtual
    override
    onlyLiquidationPair
    onlyVaultCollateralized
    returns (bytes memory);
```

### verifyTokensIn


```solidity
function verifyTokensIn(address _tokenIn, uint256 _amountIn, bytes calldata)
    external
    virtual
    override
    onlyLiquidationPair;
```

### targetOf


```solidity
function targetOf(address) external view returns (address);
```

### isLiquidationPair


```solidity
function isLiquidationPair(address _tokenOut, address liquidationPair_) external view returns (bool);
```

### claimPrize

Claim prize for a winner


```solidity
function claimPrize(address _winner, uint8 _tier, uint32 _prizeIndex, uint96 _fee, address _feeRecipient)
    external
    onlyClaimer
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_winner`|`address`|The winner of the prize|
|`_tier`|`uint8`|The prize tier|
|`_prizeIndex`|`uint32`|The prize index|
|`_fee`|`uint96`|The fee to charge|
|`_feeRecipient`|`address`|The recipient of the fee|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total prize amount claimed. Zero if already claimed.|


### isVaultCollateralized

Check if the Vault is collateralized.


```solidity
function isVaultCollateralized() external view returns (bool);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|bool True if the vault is collateralized, false otherwise|


### setClaimer

Set claimer.


```solidity
function setClaimer(address claimer_) external onlyOwner returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`claimer_`|`address`|Address of the claimer|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|address New claimer address|


### setHooks

Sets the hooks for a winner.


```solidity
function setHooks(VaultHooks calldata hooks) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hooks`|`VaultHooks`|The hooks to set|


### setLiquidationPair

Set liquidationPair.


```solidity
function setLiquidationPair(address liquidationPair_) external onlyOwner returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`liquidationPair_`|`address`|New liquidationPair address|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|address New liquidationPair address|


### setYieldFeePercentage

Set yield fee percentage.

*Yield fee is represented in 9 decimals and can't exceed `1e9`.*


```solidity
function setYieldFeePercentage(uint32 yieldFeePercentage_) external onlyOwner returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`yieldFeePercentage_`|`uint32`|Yield fee percentage|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 New yield fee percentage|


### setYieldFeeRecipient

Set fee recipient.


```solidity
function setYieldFeeRecipient(address yieldFeeRecipient_) external onlyOwner returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`yieldFeeRecipient_`|`address`|Address of the fee recipient|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|address New fee recipient address|


### yieldFeeRecipient

Address of the yield fee recipient.


```solidity
function yieldFeeRecipient() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|address Yield fee recipient address|


### yieldFeePercentage

Yield fee percentage.


```solidity
function yieldFeePercentage() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 Yield fee percentage|


### yieldFeeShares

Get total yield fee accrued by this Vault.

*If the vault becomes undercollateralized, this total yield fee can be used to collateralize it.*


```solidity
function yieldFeeShares() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 Total accrued yield fee|


### twabController

Address of the TwabController keeping track of balances.


```solidity
function twabController() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|address TwabController address|


### yieldVault

Address of the ERC4626 vault generating yield.


```solidity
function yieldVault() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|address YieldVault address|


### liquidationPair

Address of the LiquidationPair used to liquidate yield for prize token.


```solidity
function liquidationPair() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|address LiquidationPair address|


### prizePool

Address of the PrizePool that computes prizes.


```solidity
function prizePool() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|address PrizePool address|


### claimer


```solidity
function claimer() external view returns (address);
```

### getHooks

Gets the hooks for the given user.


```solidity
function getHooks(address _account) external view returns (VaultHooks memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_account`|`address`|The user to retrieve the hooks for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`VaultHooks`|VaultHooks The hooks for the given user|


### _tryGetAssetDecimals

Fetch underlying asset decimals.

*Attempts to fetch the asset decimals. A return value of false indicates that the attempt failed in some way.*


```solidity
function _tryGetAssetDecimals(IERC20 asset_) private view returns (bool, uint8);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`asset_`|`IERC20`|Address of the underlying asset|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|bool True if the attempt was successful, false otherwise|
|`<none>`|`uint8`|uint8 Token decimals number|


### _balanceOf

Get the Vault shares balance of a given account.


```solidity
function _balanceOf(address _account) internal view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_account`|`address`|Account to get the balance for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 Balance of the account|


### _totalAssets

Total amount of assets managed by this Vault.


```solidity
function _totalAssets() internal view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 Total amount of assets|


### _totalSupply

Total amount of shares minted by this Vault.


```solidity
function _totalSupply() internal view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 Total amount of shares|


### _convertToShares

Convert assets to shares.


```solidity
function _convertToShares(
    uint256 _assets,
    uint256 _depositedAssets,
    uint256 _withdrawableAssets,
    Math.Rounding _rounding
) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_assets`|`uint256`|Amount of assets to convert|
|`_depositedAssets`|`uint256`|Assets deposited into the YieldVault|
|`_withdrawableAssets`|`uint256`|Assets withdrawable from the YieldVault|
|`_rounding`|`Math.Rounding`|Rounding mode (i.e. down or up)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 Amount of shares corresponding to the assets|


### _convertToAssets

Convert shares to assets.


```solidity
function _convertToAssets(
    uint256 _shares,
    uint256 _depositedAssets,
    uint256 _withdrawableAssets,
    Math.Rounding _rounding
) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_shares`|`uint256`|Amount of shares to convert|
|`_depositedAssets`|`uint256`|Assets deposited into the YieldVault|
|`_withdrawableAssets`|`uint256`|Assets withdrawable from the YieldVault|
|`_rounding`|`Math.Rounding`|Rounding mode (i.e. down or up)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 Amount of assets corresponding to the shares|


### _maxDeposit

Returns the maximum amount of underlying assets that can be deposited into the Vault.

*We use type(uint96).max cause this is the type used to store balances in TwabController.*


```solidity
function _maxDeposit(uint256 _depositedAssets) internal view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_depositedAssets`|`uint256`|Assets deposited into the YieldVault|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 Amount of underlying assets that can be deposited|


### _maxWithdraw

Returns the maximum amount of the underlying asset that can be withdrawn
from the owner balance in the Vault, through a withdraw call.


```solidity
function _maxWithdraw(address _owner) internal view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_owner`|`address`|Address to check `maxWithdraw` for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 Amount of the underlying asset that can be withdrawn|


### _maxRedeem

Returns the maximum amount of Vault shares that can be redeemed
from the owner balance in the Vault, through a redeem call.


```solidity
function _maxRedeem(address _owner) internal view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_owner`|`address`|Address to check `maxRedeem` for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 Amount of Vault shares that can be redeemed|


### _availableYieldBalance

Total available yield amount accrued by this vault.

*This amount includes the liquidatable yield + yield fee amount.*

*The available yield is equal to the total amount of assets managed by this Vault
minus the total amount of assets supplied to the Vault and current allocated `_yieldFeeShares`.*

*If `_assetsAllocated` is greater than `_withdrawableAssets`, it means that the Vault is undercollateralized.
We must not mint more shares than underlying assets available so we return 0.*


```solidity
function _availableYieldBalance() internal view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 Total yield amount|


### _availableYieldFeeBalance

Available yield fee amount.


```solidity
function _availableYieldFeeBalance(uint256 _availableYield) internal view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_availableYield`|`uint256`|Total amount of yield available|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 Available yield fee balance|


### _increaseYieldFeeBalance

Increase yield fee balance accrued by `_yieldFeeRecipient`.


```solidity
function _increaseYieldFeeBalance(uint256 _shares) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_shares`|`uint256`|Amount of shares to increase yield fee balance by|


### _liquidatableBalanceOf

Return the yield amount (available yield minus fees) that can be liquidated by minting Vault shares.


```solidity
function _liquidatableBalanceOf(address _token) internal view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_token`|`address`|Address of the token to get available balance for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 Available amount of `_token`|


### _deposit

Deposit assets and mint shares

*If there are currently some underlying assets in the vault,
we only transfer the difference from the user wallet into the vault.
The difference is calculated this way:
- if `_vaultAssets` balance is greater than 0 and lower than `_assets`,
we subtract `_vaultAssets` from `_assets` and deposit `_assetsDeposit` amount into the vault
- if `_vaultAssets` balance is greater than or equal to `_assets`,
we know the vault has enough underlying assets to fulfill the deposit
so we don't transfer any assets from the user wallet into the vault*

*Will revert if 0 shares are minted back to the receiver.*


```solidity
function _deposit(address _caller, address _receiver, uint256 _assets) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_caller`|`address`|The caller of the deposit|
|`_receiver`|`address`|The receiver of the deposit shares|
|`_assets`|`uint256`|Amount of assets to deposit|


### _depositAssets

Deposit assets and mint shares.

*Will revert if the Vault is under-collateralized.
So assets does not need to be converted to shares.*


```solidity
function _depositAssets(uint256 _assets, address _owner, address _receiver, bool _isMint) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_assets`|`uint256`|The assets to deposit|
|`_owner`|`address`|The owner of the assets|
|`_receiver`|`address`|The receiver of the deposit shares|
|`_isMint`|`bool`|Whether the function is called to mint or deposit|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 Amount of shares minted to `_receiver`|


### _redeem

Redeem/Withdraw common flow

*When the Vault is collateralized, shares are backed by assets 1:1, `withdraw` is used.
When the Vault is undercollateralized, shares are not backed by assets 1:1.
`redeem` is used to avoid burning too many YieldVault shares in exchange of assets.*


```solidity
function _redeem(
    address _caller,
    address _receiver,
    address _owner,
    uint256 _shares,
    uint256 _assets,
    bool _vaultCollateralized
) internal returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_caller`|`address`|Address of the caller|
|`_receiver`|`address`|Address of the receiver of the assets|
|`_owner`|`address`|Owner of the shares|
|`_shares`|`uint256`|Shares to burn|
|`_assets`|`uint256`|Assets to withdraw|
|`_vaultCollateralized`|`bool`|Whether the Vault is collateralized or not|


### _mint

Creates `_shares` tokens and assigns them to `_receiver`, increasing the total supply.

*Emits a {Transfer} event with `from` set to the zero address.*

*`_receiver` cannot be the zero address.*


```solidity
function _mint(address _receiver, uint256 _shares) internal virtual override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_receiver`|`address`|Address that will receive the minted shares|
|`_shares`|`uint256`|Shares to mint|


### _burn

Destroys `_shares` tokens from `_owner`, reducing the total supply.

*Emits a {Transfer} event with `to` set to the zero address.*

*`_owner` cannot be the zero address.*

*`_owner` must have at least `_shares` tokens.*


```solidity
function _burn(address _owner, uint256 _shares) internal virtual override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_owner`|`address`|The owner of the shares|
|`_shares`|`uint256`|The shares to burn|


### _transfer

Updates `_from` and `_to` TWAB balance for a transfer.

*`_from` cannot be the zero address.*

*`_to` cannot be the zero address.*

*`_from` must have a balance of at least `_shares`.*


```solidity
function _transfer(address _from, address _to, uint256 _shares) internal virtual override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|Address to transfer from|
|`_to`|`address`|Address to transfer to|
|`_shares`|`uint256`|Shares to transfer|


### _collateral

Returns the quantity of withdrawable underlying assets held as collateral by the YieldVault.

*When the Vault is collateralized, Vault shares are minted at a 1:1 ratio based on the user's deposited underlying assets.
The total supply of shares corresponds directly to the total amount of underlying assets deposited into the YieldVault.
Users have the ability to withdraw only the quantity of underlying assets they initially deposited,
without access to any of the accumulated yield within the YieldVault.*

*In case of undercollateralization, any remaining collateral within the YieldVault can be withdrawn.
Withdrawals can be made by users for their corresponding deposit shares.*


```solidity
function _collateral(uint256 _depositedAssets, uint256 _withdrawableAssets) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_depositedAssets`|`uint256`|Assets deposited into the YieldVault|
|`_withdrawableAssets`|`uint256`|Assets withdrawable from the YieldVault|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 Available collateral|


### _isVaultCollateralized

Check if the Vault is collateralized.

*The vault is collateralized if the total amount of underlying assets currently held by the YieldVault
is greater than or equal to the total supply of shares minted by the Vault.*


```solidity
function _isVaultCollateralized(uint256 _depositedAssets, uint256 _withdrawableAssets) internal pure returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_depositedAssets`|`uint256`|Assets deposited into the YieldVault|
|`_withdrawableAssets`|`uint256`|Assets withdrawable from the YieldVault|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|bool True if the vault is collateralized, false otherwise|


### _setClaimer

Set claimer address.

*Will revert if `claimer_` is address zero.*


```solidity
function _setClaimer(address claimer_) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`claimer_`|`address`|Address of the claimer|


### _setYieldFeePercentage

Set yield fee percentage.

*Yield fee is represented in 9 decimals and can't exceed or equal `1e9`.*


```solidity
function _setYieldFeePercentage(uint32 yieldFeePercentage_) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`yieldFeePercentage_`|`uint32`|The new yield fee percentage to set|


### _setYieldFeeRecipient

Set yield fee recipient address.


```solidity
function _setYieldFeeRecipient(address yieldFeeRecipient_) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`yieldFeeRecipient_`|`address`|Address of the fee recipient|


## Events
### NewVault
Emitted when a new Vault has been deployed.


```solidity
event NewVault(
    IERC20 indexed asset,
    string name,
    string symbol,
    TwabController twabController,
    IERC4626 indexed yieldVault,
    PrizePool indexed prizePool,
    address claimer,
    address yieldFeeRecipient,
    uint256 yieldFeePercentage,
    address owner
);
```

### SetHooks
Emitted when an account sets new hooks


```solidity
event SetHooks(address indexed account, VaultHooks indexed hooks);
```

### MintYieldFee
Emitted when yield fee is minted to the yield recipient.


```solidity
event MintYieldFee(address indexed caller, address indexed recipient, uint256 shares);
```

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

### Sweep
Emitted when a user sweeps assets held by the Vault into the YieldVault.


```solidity
event Sweep(address indexed caller, uint256 assets);
```

## Errors
### YieldVaultZeroAddress
Emitted when the Yield Vault is set to the zero address.


```solidity
error YieldVaultZeroAddress();
```

### PrizePoolZeroAddress
Emitted when the Prize Pool is set to the zero address.


```solidity
error PrizePoolZeroAddress();
```

### OwnerZeroAddress
Emitted when the Owner is set to the zero address.


```solidity
error OwnerZeroAddress();
```

### UnderlyingAssetMismatch
Emitted when the underlying asset passed to the constructor is different from the YieldVault one.


```solidity
error UnderlyingAssetMismatch(address asset, address yieldVaultAsset);
```

### DepositMoreThanMax
Emitted when the amount being deposited for the receiver is greater than the max amount allowed.


```solidity
error DepositMoreThanMax(address receiver, uint256 amount, uint256 max);
```

### MintMoreThanMax
Emitted when the amount being minted for the receiver is greater than the max amount allowed.


```solidity
error MintMoreThanMax(address receiver, uint256 amount, uint256 max);
```

### WithdrawMoreThanMax
Emitted when the amount being withdrawn for the owner is greater than the max amount allowed.


```solidity
error WithdrawMoreThanMax(address owner, uint256 amount, uint256 max);
```

### RedeemMoreThanMax
Emitted when the amount being redeemed for owner is greater than the max allowed amount.


```solidity
error RedeemMoreThanMax(address owner, uint256 amount, uint256 max);
```

### MintZeroShares
Emitted when `_deposit` is called but no shares are minted back to the receiver.


```solidity
error MintZeroShares();
```

### WithdrawZeroAssets
Emitted when `_withdraw` is called but no assets are being withdrawn.


```solidity
error WithdrawZeroAssets();
```

### WithdrawAssetsLTRequested
Emitted when `_withdraw` is called but the amount of assets withdrawn from the YieldVault
is lower than the amount of assets requested by the caller.


```solidity
error WithdrawAssetsLTRequested(uint256 requestedAssets, uint256 withdrawnAssets);
```

### SweepZeroAssets
Emitted when `sweep` is called but no underlying assets are currently held by the Vault.


```solidity
error SweepZeroAssets();
```

### CallerNotLP
Emitted during the liquidation process when the caller is not the liquidation pair contract.


```solidity
error CallerNotLP(address caller, address liquidationPair);
```

### LiquidationTokenInNotPrizeToken
Emitted during the liquidation process when the token in is not the prize token.


```solidity
error LiquidationTokenInNotPrizeToken(address tokenIn, address prizeToken);
```

### LiquidationTokenOutNotVaultShare
Emitted during the liquidation process when the token out is not the vault share token.


```solidity
error LiquidationTokenOutNotVaultShare(address tokenOut, address vaultShare);
```

### LiquidationAmountOutZero
Emitted during the liquidation process when the liquidation amount out is zero.


```solidity
error LiquidationAmountOutZero();
```

### LiquidationAmountOutGTYield
Emitted during the liquidation process if the amount out is greater than the available yield.


```solidity
error LiquidationAmountOutGTYield(uint256 amountOut, uint256 availableYield);
```

### VaultUndercollateralized
Emitted when the Vault is under-collateralized.


```solidity
error VaultUndercollateralized();
```

### TargetTokenNotSupported
Emitted when the target token is not supported for a given token address.


```solidity
error TargetTokenNotSupported(address token);
```

### ClaimerZeroAddress
Emitted when the Claimer is set to the zero address.


```solidity
error ClaimerZeroAddress();
```

### CallerNotClaimer
Emitted when the caller is not the prize claimer.


```solidity
error CallerNotClaimer(address caller, address claimer);
```

### YieldFeeGTAvailableShares
Emitted when the minted yield exceeds the yield fee shares available.


```solidity
error YieldFeeGTAvailableShares(uint256 shares, uint256 yieldFeeShares);
```

### YieldFeeGTAvailableYield
Emitted when the minted yield exceeds the amount of available yield in the YieldVault.


```solidity
error YieldFeeGTAvailableYield(uint256 shares, uint256 availableYield);
```

### LPZeroAddress
Emitted when the Liquidation Pair being set is the zero address.


```solidity
error LPZeroAddress();
```

### YieldFeePercentageGtePrecision
Emitted when the yield fee percentage being set is greater than or equal to 1.


```solidity
error YieldFeePercentageGtePrecision(uint256 yieldFeePercentage, uint256 maxYieldFeePercentage);
```

### BeforeClaimPrizeFailed
Emitted when the BeforeClaim prize hook fails


```solidity
error BeforeClaimPrizeFailed(bytes reason);
```

### AfterClaimPrizeFailed
Emitted when the AfterClaim prize hook fails


```solidity
error AfterClaimPrizeFailed(bytes reason);
```

### ClaimRecipientZeroAddress
Emitted when a prize is claimed for the zero address.


```solidity
error ClaimRecipientZeroAddress();
```

### PermitCallerNotOwner
Emitted when the caller of a permit function is not the owner of the assets being permitted.


```solidity
error PermitCallerNotOwner(address caller, address owner);
```

### PermitAllowanceNotSet
Emitted when a permit call on the underlying asset failed to set the spending allowance.

*This is likely thrown when the underlying asset does not support permit, but has a fallback function.*


```solidity
error PermitAllowanceNotSet(address owner, address spender, uint256 amount, uint256 allowance);
```

