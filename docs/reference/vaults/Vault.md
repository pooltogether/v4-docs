[Git Source](https://github.com/GenerationSoftware/pt-v5-vault/blob/10eb9ff64bd4b5eaa93cc7cffdf6bfe01af619bf/src/Vault.sol)



Vault extends the ERC4626 standard and is the entry point for users interacting with a V5 pool.
        Users deposit an underlying asset (i.e. USDC) in this contract and receive in exchange an ERC20 token
        representing their share of deposit in the vault.
        Underlying assets are then deposited in a YieldVault to generate yield.
        This yield is sold for prize tokens (i.e. POOL) via the Liquidator and captured by the PrizePool to be awarded to depositors.

_Balances are stored in the TwabController contract._

## Events

### NewVault

```solidity
event NewVault(contract IERC20 asset, string name, string symbol, contract TwabController twabController, contract IERC4626 yieldVault, contract PrizePool prizePool, address claimer, address yieldFeeRecipient, uint256 yieldFeePercentage, address owner)
```

Emitted when a new Vault has been deployed.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset | contract IERC20 | Address of the underlying asset used by the vault |
| name | string | Name of the ERC20 share minted by the vault |
| symbol | string | Symbol of the ERC20 share minted by the vault |
| twabController | contract TwabController | Address of the TwabController used to keep track of balances |
| yieldVault | contract IERC4626 | Address of the ERC4626 vault in which assets are deposited to generate yield |
| prizePool | contract PrizePool | Address of the PrizePool that computes prizes |
| claimer | address | Address of the claimer |
| yieldFeeRecipient | address | Address of the yield fee recipient |
| yieldFeePercentage | uint256 | Yield fee percentage in integer format with 1e9 precision (50% would be 5e8) |
| owner | address | Address of the contract owner |

### SetHooks

```solidity
event SetHooks(address account, struct VaultHooks hooks)
```

Emitted when an account sets new hooks

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| account | address | The account whose hooks are being configured |
| hooks | struct VaultHooks | The hooks being set |

### MintYieldFee

```solidity
event MintYieldFee(address caller, address recipient, uint256 shares)
```

Emitted when yield fee is minted to the yield recipient.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller | address | Address that called the function |
| recipient | address | Address receiving the Vault shares |
| shares | uint256 | Amount of shares minted to `recipient` |

### YieldFeeRecipientSet

```solidity
event YieldFeeRecipientSet(address yieldFeeRecipient)
```

Emitted when a new yield fee recipient has been set.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| yieldFeeRecipient | address | Address of the new yield fee recipient |

### YieldFeePercentageSet

```solidity
event YieldFeePercentageSet(uint256 yieldFeePercentage)
```

Emitted when a new yield fee percentage has been set.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| yieldFeePercentage | uint256 | New yield fee percentage |

### Sponsor

```solidity
event Sponsor(address caller, uint256 assets, uint256 shares)
```

Emitted when a user sponsors the Vault.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller | address | Address that called the function |
| assets | uint256 | Amount of assets deposited into the Vault |
| shares | uint256 | Amount of shares minted to the caller address |

### Sweep

```solidity
event Sweep(address caller, uint256 assets)
```

Emitted when a user sweeps assets held by the Vault into the YieldVault.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller | address | Address that called the function |
| assets | uint256 | Amount of assets sweeped into the YieldVault |

## Variables

## Functions

### constructor

```solidity
constructor(contract IERC20 asset_, string name_, string symbol_, contract IERC4626 yieldVault_, contract PrizePool prizePool_, address claimer_, address yieldFeeRecipient_, uint32 yieldFeePercentage_, address owner_) public
```

Vault constructor

_`claimer_` can be set to address zero if none is available yet._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset_ | contract IERC20 | Address of the underlying asset used by the vault |
| name_ | string | Name of the ERC20 share minted by the vault |
| symbol_ | string | Symbol of the ERC20 share minted by the vault |
| yieldVault_ | contract IERC4626 | Address of the ERC4626 vault in which assets are deposited to generate yield |
| prizePool_ | contract PrizePool | Address of the PrizePool that computes prizes |
| claimer_ | address | Address of the claimer |
| yieldFeeRecipient_ | address | Address of the yield fee recipient |
| yieldFeePercentage_ | uint32 | Yield fee percentage |
| owner_ | address | Address that will gain ownership of this contract |

### asset

```solidity
function asset() external view virtual returns (address)
```

_Returns the address of the underlying token used for the Vault for accounting, depositing, and withdrawing.
- MUST be an ERC-20 token contract.
- MUST NOT revert._

### balanceOf

```solidity
function balanceOf(address _account) public view virtual returns (uint256)
```

_See {IERC20-balanceOf}._

### decimals

```solidity
function decimals() public view virtual returns (uint8)
```

_Returns the decimals places of the token._

### totalAssets

```solidity
function totalAssets() external view virtual returns (uint256)
```

_Returns the total amount of the underlying asset that is “managed” by Vault.
- SHOULD include any compounding that occurs from yield.
- MUST be inclusive of any fees that are charged against assets in the Vault.
- MUST NOT revert._

### totalSupply

```solidity
function totalSupply() public view virtual returns (uint256)
```

_See {IERC20-totalSupply}._

### convertToShares

```solidity
function convertToShares(uint256 _assets) external view virtual returns (uint256)
```

_Returns the amount of shares that the Vault would exchange for the amount of assets provided, in an ideal
scenario where all the conditions are met.
- MUST NOT be inclusive of any fees that are charged against assets in the Vault.
- MUST NOT show any variations depending on the caller.
- MUST NOT reflect slippage or other on-chain conditions, when performing the actual exchange.
- MUST NOT revert.
NOTE: This calculation MAY NOT reflect the “per-user” price-per-share, and instead should reflect the
“average-user’s” price-per-share, meaning what the average user should expect to see when exchanging to and
from._

### convertToAssets

```solidity
function convertToAssets(uint256 _shares) external view virtual returns (uint256)
```

_Returns the amount of assets that the Vault would exchange for the amount of shares provided, in an ideal
scenario where all the conditions are met.
- MUST NOT be inclusive of any fees that are charged against assets in the Vault.
- MUST NOT show any variations depending on the caller.
- MUST NOT reflect slippage or other on-chain conditions, when performing the actual exchange.
- MUST NOT revert.
NOTE: This calculation MAY NOT reflect the “per-user” price-per-share, and instead should reflect the
“average-user’s” price-per-share, meaning what the average user should expect to see when exchanging to and
from._

### maxDeposit

```solidity
function maxDeposit(address) external view virtual returns (uint256)
```

_Returns the maximum amount of the underlying asset that can be deposited into the Vault for the receiver,
through a deposit call.
- MUST return a limited value if receiver is subject to some deposit limit.
- MUST return 2 ** 256 - 1 if there is no limit on the maximum amount of assets that may be deposited.
- MUST NOT revert._

### previewDeposit

```solidity
function previewDeposit(uint256 _assets) external view virtual returns (uint256)
```

_Allows an on-chain or off-chain user to simulate the effects of their deposit at the current block, given
current on-chain conditions.
- MUST return as close to and no more than the exact amount of Vault shares that would be minted in a deposit
  call in the same transaction. I.e. deposit should return the same or more shares as previewDeposit if called
  in the same transaction.
- MUST NOT account for deposit limits like those returned from maxDeposit and should always act as though the
  deposit would be accepted, regardless if the user has enough tokens approved, etc.
- MUST be inclusive of deposit fees. Integrators should be aware of the existence of deposit fees.
- MUST NOT revert.
NOTE: any unfavorable discrepancy between convertToShares and previewDeposit SHOULD be considered slippage in
share price or some other type of condition, meaning the depositor will lose assets by depositing._

### maxMint

```solidity
function maxMint(address) external view virtual returns (uint256)
```

_Returns the maximum amount of the Vault shares that can be minted for the receiver, through a mint call.
- MUST return a limited value if receiver is subject to some mint limit.
- MUST return 2 ** 256 - 1 if there is no limit on the maximum amount of shares that may be minted.
- MUST NOT revert._

### previewMint

```solidity
function previewMint(uint256 _shares) external view virtual returns (uint256)
```

_Allows an on-chain or off-chain user to simulate the effects of their mint at the current block, given
current on-chain conditions.
- MUST return as close to and no fewer than the exact amount of assets that would be deposited in a mint call
  in the same transaction. I.e. mint should return the same or fewer assets as previewMint if called in the
  same transaction.
- MUST NOT account for mint limits like those returned from maxMint and should always act as though the mint
  would be accepted, regardless if the user has enough tokens approved, etc.
- MUST be inclusive of deposit fees. Integrators should be aware of the existence of deposit fees.
- MUST NOT revert.
NOTE: any unfavorable discrepancy between convertToAssets and previewMint SHOULD be considered slippage in
share price or some other type of condition, meaning the depositor will lose assets by minting._

### maxWithdraw

```solidity
function maxWithdraw(address _owner) external view virtual returns (uint256)
```

_Returns the maximum amount of the underlying asset that can be withdrawn from the owner balance in the
Vault, through a withdraw call.
- MUST return a limited value if owner is subject to some withdrawal limit or timelock.
- MUST NOT revert._

### previewWithdraw

```solidity
function previewWithdraw(uint256 _assets) external view virtual returns (uint256)
```

_Allows an on-chain or off-chain user to simulate the effects of their withdrawal at the current block,
given current on-chain conditions.
- MUST return as close to and no fewer than the exact amount of Vault shares that would be burned in a withdraw
  call in the same transaction. I.e. withdraw should return the same or fewer shares as previewWithdraw if
  called
  in the same transaction.
- MUST NOT account for withdrawal limits like those returned from maxWithdraw and should always act as though
  the withdrawal would be accepted, regardless if the user has enough shares, etc.
- MUST be inclusive of withdrawal fees. Integrators should be aware of the existence of withdrawal fees.
- MUST NOT revert.
NOTE: any unfavorable discrepancy between convertToShares and previewWithdraw SHOULD be considered slippage in
share price or some other type of condition, meaning the depositor will lose assets by depositing._

### maxRedeem

```solidity
function maxRedeem(address _owner) external view virtual returns (uint256)
```

_Returns the maximum amount of Vault shares that can be redeemed from the owner balance in the Vault,
through a redeem call.
- MUST return a limited value if owner is subject to some withdrawal limit or timelock.
- MUST return balanceOf(owner) if owner is not subject to any withdrawal limit or timelock.
- MUST NOT revert._

### previewRedeem

```solidity
function previewRedeem(uint256 _shares) external view virtual returns (uint256)
```

_Allows an on-chain or off-chain user to simulate the effects of their redeemption at the current block,
given current on-chain conditions.
- MUST return as close to and no more than the exact amount of assets that would be withdrawn in a redeem call
  in the same transaction. I.e. redeem should return the same or more assets as previewRedeem if called in the
  same transaction.
- MUST NOT account for redemption limits like those returned from maxRedeem and should always act as though the
  redemption would be accepted, regardless if the user has enough shares, etc.
- MUST be inclusive of withdrawal fees. Integrators should be aware of the existence of withdrawal fees.
- MUST NOT revert.
NOTE: any unfavorable discrepancy between convertToAssets and previewRedeem SHOULD be considered slippage in
share price or some other type of condition, meaning the depositor will lose assets by redeeming._

### deposit

```solidity
function deposit(uint256 _assets, address _receiver) external virtual returns (uint256)
```

_Will revert if the Vault is under-collateralized._

### depositWithPermit

```solidity
function depositWithPermit(uint256 _assets, address _owner, uint256 _deadline, uint8 _v, bytes32 _r, bytes32 _s) external returns (uint256)
```

Approve underlying asset with permit, deposit into the Vault and mint Vault shares to `_owner`.

_Can't be used to deposit on behalf of another user since `permit` does not accept a receiver parameter.
     Meaning that anyone could reuse the signature and pass an arbitrary receiver to this function.
Will revert if the Vault is under-collateralized._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _assets | uint256 | Amount of assets to approve and deposit |
| _owner | address | Address of the owner depositing `_assets` and signing the permit |
| _deadline | uint256 | Timestamp after which the approval is no longer valid |
| _v | uint8 | V part of the secp256k1 signature |
| _r | bytes32 | R part of the secp256k1 signature |
| _s | bytes32 | S part of the secp256k1 signature |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 Amount of Vault shares minted to `_owner`. |
### mint

```solidity
function mint(uint256 _shares, address _receiver) external virtual returns (uint256)
```

_Will revert if the Vault is under-collateralized._

### sponsor

```solidity
function sponsor(uint256 _assets) external returns (uint256)
```

Deposit assets into the Vault and delegate to the sponsorship address.

_Will revert if the Vault is under-collateralized._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _assets | uint256 | Amount of assets to deposit |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 Amount of shares minted to caller. |
### sweep

```solidity
function sweep() external returns (uint256)
```

Deposit underlying assets that have been mistakenly sent to the Vault into the YieldVault.

_The deposited assets will contribute to the yield of the YieldVault._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 Amount of underlying assets deposited |
### withdraw

```solidity
function withdraw(uint256 _assets, address _receiver, address _owner) external virtual returns (uint256)
```

_Burns shares from owner and sends exactly assets of underlying tokens to receiver.
- MUST emit the Withdraw event.
- MAY support an additional flow in which the underlying tokens are owned by the Vault contract before the
  withdraw execution, and are accounted for during withdraw.
- MUST revert if all of assets cannot be withdrawn (due to withdrawal limit being reached, slippage, the owner
  not having enough shares, etc).
Note that some implementations will require pre-requesting to the Vault before a withdrawal may be performed.
Those methods should be performed separately._

### redeem

```solidity
function redeem(uint256 _shares, address _receiver, address _owner) external virtual returns (uint256)
```

_Burns exactly shares from owner and sends assets of underlying tokens to receiver.
- MUST emit the Withdraw event.
- MAY support an additional flow in which the underlying tokens are owned by the Vault contract before the
  redeem execution, and are accounted for during redeem.
- MUST revert if all of shares cannot be redeemed (due to withdrawal limit being reached, slippage, the owner
  not having enough shares, etc).
NOTE: some implementations will require pre-requesting to the Vault before a withdrawal may be performed.
Those methods should be performed separately._

### availableYieldBalance

```solidity
function availableYieldBalance() external view returns (uint256)
```

Total available yield amount accrued by this vault.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 Total yield amount |
### availableYieldFeeBalance

```solidity
function availableYieldFeeBalance() external view returns (uint256)
```

Get the available yield fee amount accrued by this vault.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 Yield fee amount |
### mintYieldFee

```solidity
function mintYieldFee(uint256 _shares) external
```

Mint Vault shares to the `_yieldFeeRecipient`.

_Will revert if the Vault is undercollateralized.
     So shares does not need to be converted to assets.
Will revert if `_shares` is greater than `_yieldFeeShares`.
Will revert if there is not enough yield available in the YieldVault to back `_shares`._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _shares | uint256 | Amount of shares to mint |

### liquidatableBalanceOf

```solidity
function liquidatableBalanceOf(address _token) external view returns (uint256)
```

Get the available amount of tokens that can be swapped.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | address |  |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 Available amount of `token` |
### transferTokensOut

```solidity
function transferTokensOut(address, address _receiver, address _tokenOut, uint256 _amountOut) external virtual returns (bytes)
```

Transfers tokens to the receiver

_Will revert if the Vault is undercollateralized.
     So `_amountOut` does not need to be converted to assets.
User provides prize tokens and receives in exchange Vault shares.
The yield fee can serve as a buffer in case of undercollateralization of the Vault._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
|  | address |  |
| _receiver | address |  |
| _tokenOut | address |  |
| _amountOut | uint256 |  |

### verifyTokensIn

```solidity
function verifyTokensIn(address _tokenIn, uint256 _amountIn, bytes) external virtual
```

Verifies that tokens have been transferred in.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenIn | address |  |
| _amountIn | uint256 |  |
|  | bytes |  |

### targetOf

```solidity
function targetOf(address) external view returns (address)
```

Get the address that will receive `tokenIn`.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
|  | address |  |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address Address of the target |
### isLiquidationPair

```solidity
function isLiquidationPair(address _tokenOut, address liquidationPair_) external view returns (bool)
```

Checks if a liquidation pair can be used to liquidate the given tokenOut from this source.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenOut | address |  |
| liquidationPair_ | address |  |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool True if the liquidation pair can be used, false otherwise |
### claimPrize

```solidity
function claimPrize(address _winner, uint8 _tier, uint32 _prizeIndex, uint96 _fee, address _feeRecipient) external returns (uint256)
```

Claim prize for a winner

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _winner | address | The winner of the prize |
| _tier | uint8 | The prize tier |
| _prizeIndex | uint32 | The prize index |
| _fee | uint96 | The fee to charge |
| _feeRecipient | address | The recipient of the fee |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The total prize amount claimed. Zero if already claimed. |
### isVaultCollateralized

```solidity
function isVaultCollateralized() external view returns (bool)
```

Check if the Vault is collateralized.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool True if the vault is collateralized, false otherwise |
### setClaimer

```solidity
function setClaimer(address claimer_) external returns (address)
```

Set claimer.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| claimer_ | address | Address of the claimer |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address New claimer address |
### setHooks

```solidity
function setHooks(struct VaultHooks hooks) external
```

Sets the hooks for a winner.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| hooks | struct VaultHooks | The hooks to set |

### setLiquidationPair

```solidity
function setLiquidationPair(address liquidationPair_) external returns (address)
```

Set liquidationPair.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| liquidationPair_ | address | New liquidationPair address |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address New liquidationPair address |
### setYieldFeePercentage

```solidity
function setYieldFeePercentage(uint32 yieldFeePercentage_) external returns (uint256)
```

Set yield fee percentage.

_Yield fee is represented in 9 decimals and can't exceed `1e9`._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| yieldFeePercentage_ | uint32 | Yield fee percentage |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 New yield fee percentage |
### setYieldFeeRecipient

```solidity
function setYieldFeeRecipient(address yieldFeeRecipient_) external returns (address)
```

Set fee recipient.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| yieldFeeRecipient_ | address | Address of the fee recipient |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address New fee recipient address |
### yieldFeeRecipient

```solidity
function yieldFeeRecipient() external view returns (address)
```

Address of the yield fee recipient.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address Yield fee recipient address |
### yieldFeePercentage

```solidity
function yieldFeePercentage() external view returns (uint256)
```

Yield fee percentage.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 Yield fee percentage |
### yieldFeeShares

```solidity
function yieldFeeShares() external view returns (uint256)
```

Get total yield fee accrued by this Vault.

_If the vault becomes undercollateralized, this total yield fee can be used to collateralize it._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 Total accrued yield fee |
### twabController

```solidity
function twabController() external view returns (address)
```

Address of the TwabController keeping track of balances.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address TwabController address |
### yieldVault

```solidity
function yieldVault() external view returns (address)
```

Address of the ERC4626 vault generating yield.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address YieldVault address |
### liquidationPair

```solidity
function liquidationPair() external view returns (address)
```

Address of the LiquidationPair used to liquidate yield for prize token.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address LiquidationPair address |
### prizePool

```solidity
function prizePool() external view returns (address)
```

Address of the PrizePool that computes prizes.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address PrizePool address |
### claimer

```solidity
function claimer() external view returns (address)
```

Gets the current address that can call `claimPrize`.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | The claimer address |
### getHooks

```solidity
function getHooks(address _account) external view returns (struct VaultHooks)
```

Gets the hooks for the given user.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _account | address | The user to retrieve the hooks for |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct VaultHooks | VaultHooks The hooks for the given user |

## Structs

## Errors

### YieldVaultZeroAddress

```solidity
error YieldVaultZeroAddress()
```

Emitted when the Yield Vault is set to the zero address.

### PrizePoolZeroAddress

```solidity
error PrizePoolZeroAddress()
```

Emitted when the Prize Pool is set to the zero address.

### OwnerZeroAddress

```solidity
error OwnerZeroAddress()
```

Emitted when the Owner is set to the zero address.

### UnderlyingAssetMismatch

```solidity
error UnderlyingAssetMismatch(address asset, address yieldVaultAsset)
```

Emitted when the underlying asset passed to the constructor is different from the YieldVault one.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| asset | address | Address of the underlying asset passed to the constructor |
| yieldVaultAsset | address | Address of the YieldVault underlying asset |

### DepositMoreThanMax

```solidity
error DepositMoreThanMax(address receiver, uint256 amount, uint256 max)
```

Emitted when the amount being deposited for the receiver is greater than the max amount allowed.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| receiver | address | The receiver of the deposit |
| amount | uint256 | The amount to deposit |
| max | uint256 | The max deposit amount allowed |

### MintMoreThanMax

```solidity
error MintMoreThanMax(address receiver, uint256 amount, uint256 max)
```

Emitted when the amount being minted for the receiver is greater than the max amount allowed.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| receiver | address | The receiver of the mint |
| amount | uint256 | The amount to mint |
| max | uint256 | The max mint amount allowed |

### WithdrawMoreThanMax

```solidity
error WithdrawMoreThanMax(address owner, uint256 amount, uint256 max)
```

Emitted when the amount being withdrawn for the owner is greater than the max amount allowed.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner | address | The owner of the assets |
| amount | uint256 | The amount to withdraw |
| max | uint256 | The max withdrawable amount |

### RedeemMoreThanMax

```solidity
error RedeemMoreThanMax(address owner, uint256 amount, uint256 max)
```

Emitted when the amount being redeemed for owner is greater than the max allowed amount.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| owner | address | The owner of the assets |
| amount | uint256 | The amount to redeem |
| max | uint256 | The max redeemable amount |

### MintZeroShares

```solidity
error MintZeroShares()
```

Emitted when `_deposit` is called but no shares are minted back to the receiver.

### WithdrawZeroAssets

```solidity
error WithdrawZeroAssets()
```

Emitted when `_withdraw` is called but no assets are being withdrawn.

### WithdrawAssetsLTRequested

```solidity
error WithdrawAssetsLTRequested(uint256 requestedAssets, uint256 withdrawnAssets)
```

Emitted when `_withdraw` is called but the amount of assets withdrawn from the YieldVault
        is lower than the amount of assets requested by the caller.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| requestedAssets | uint256 | The amount of assets requested |
| withdrawnAssets | uint256 | The amount of assets withdrawn from the YieldVault |

### SweepZeroAssets

```solidity
error SweepZeroAssets()
```

Emitted when `sweep` is called but no underlying assets are currently held by the Vault.

### CallerNotLP

```solidity
error CallerNotLP(address caller, address liquidationPair)
```

Emitted during the liquidation process when the caller is not the liquidation pair contract.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller | address | The caller address |
| liquidationPair | address | The LP address |

### LiquidationTokenInNotPrizeToken

```solidity
error LiquidationTokenInNotPrizeToken(address tokenIn, address prizeToken)
```

Emitted during the liquidation process when the token in is not the prize token.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenIn | address | The provided tokenIn address |
| prizeToken | address | The prize token address |

### LiquidationTokenOutNotVaultShare

```solidity
error LiquidationTokenOutNotVaultShare(address tokenOut, address vaultShare)
```

Emitted during the liquidation process when the token out is not the vault share token.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenOut | address | The provided tokenOut address |
| vaultShare | address | The vault share token address |

### LiquidationAmountOutZero

```solidity
error LiquidationAmountOutZero()
```

Emitted during the liquidation process when the liquidation amount out is zero.

### LiquidationAmountOutGTYield

```solidity
error LiquidationAmountOutGTYield(uint256 amountOut, uint256 availableYield)
```

Emitted during the liquidation process if the amount out is greater than the available yield.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amountOut | uint256 | The amount out |
| availableYield | uint256 | The available yield |

### VaultUndercollateralized

```solidity
error VaultUndercollateralized()
```

Emitted when the Vault is under-collateralized.

### TargetTokenNotSupported

```solidity
error TargetTokenNotSupported(address token)
```

Emitted when the target token is not supported for a given token address.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | address | The unsupported token address |

### ClaimerZeroAddress

```solidity
error ClaimerZeroAddress()
```

Emitted when the Claimer is set to the zero address.

### CallerNotClaimer

```solidity
error CallerNotClaimer(address caller, address claimer)
```

Emitted when the caller is not the prize claimer.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller | address | The caller address |
| claimer | address | The claimer address |

### YieldFeeGTAvailableShares

```solidity
error YieldFeeGTAvailableShares(uint256 shares, uint256 yieldFeeShares)
```

Emitted when the minted yield exceeds the yield fee shares available.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| shares | uint256 | The amount of yield shares to mint |
| yieldFeeShares | uint256 | The accrued yield fee shares available |

### YieldFeeGTAvailableYield

```solidity
error YieldFeeGTAvailableYield(uint256 shares, uint256 availableYield)
```

Emitted when the minted yield exceeds the amount of available yield in the YieldVault.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| shares | uint256 | The amount of yield shares to mint |
| availableYield | uint256 | The amount of yield available |

### LPZeroAddress

```solidity
error LPZeroAddress()
```

Emitted when the Liquidation Pair being set is the zero address.

### YieldFeePercentageGtePrecision

```solidity
error YieldFeePercentageGtePrecision(uint256 yieldFeePercentage, uint256 maxYieldFeePercentage)
```

Emitted when the yield fee percentage being set is greater than or equal to 1.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| yieldFeePercentage | uint256 | The yield fee percentage in integer format |
| maxYieldFeePercentage | uint256 | The max yield fee percentage in integer format (this value is equal to 1 in decimal format) |

### BeforeClaimPrizeFailed

```solidity
error BeforeClaimPrizeFailed(bytes reason)
```

Emitted when the BeforeClaim prize hook fails

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| reason | bytes | The revert reason that was thrown |

### AfterClaimPrizeFailed

```solidity
error AfterClaimPrizeFailed(bytes reason)
```

Emitted when the AfterClaim prize hook fails

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| reason | bytes | The revert reason that was thrown |

### ClaimRecipientZeroAddress

```solidity
error ClaimRecipientZeroAddress()
```

Emitted when a prize is claimed for the zero address.

