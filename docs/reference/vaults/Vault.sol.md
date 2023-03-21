# Vault
[Git Source](https://github.com/pooltogether/v5-prize-vault/blob/023805de5aa83af29487f2a21fa745c7bad2736e/src/Vault.sol)

**Inherits:**
ERC4626, ILiquidationSource, Ownable

**Author:**
PoolTogether Inc Team

Vault extends the ERC4626 standard and is the entry point for users interacting with a V5 pool.
Users deposit an underlying asset (i.e. USDC) in this contract and receive in exchange an ERC20 token
representing their share of deposit in the vault.
Underlying assets are then deposited in a YieldVault to generate yield.
This yield is sold for prize tokens (i.e. POOL) via the Liquidator and captured by the PrizePool to be awarded to depositors.

*Balances are stored in the TwabController contract.*


## State Variables
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
Claimer private _claimer;
```


### _liquidationPair
Address of the LiquidationPair used to liquidate yield for prize token.


```solidity
LiquidationPair private _liquidationPair;
```


### _assetSupplyBalance
Amount of underlying assets supplied to the YieldVault.


```solidity
uint256 private _assetSupplyBalance;
```


### autoClaimDisabled
Mapping to keep track of users who disabled prize auto claiming.


```solidity
mapping(address => bool) public autoClaimDisabled;
```


## Functions
### constructor

Vault constructor

*`claimer` can be set to address zero if none is available yet.*


```solidity
constructor(
    IERC20 _asset,
    string memory _name,
    string memory _symbol,
    TwabController twabController_,
    IERC4626 yieldVault_,
    PrizePool prizePool_,
    Claimer claimer_,
    address _owner
) ERC4626(_asset) ERC20(_name, _symbol) Ownable(_owner);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_asset`|`IERC20`|Address of the underlying asset used by the vault|
|`_name`|`string`|Name of the ERC20 share minted by the vault|
|`_symbol`|`string`|Symbol of the ERC20 share minted by the vault|
|`twabController_`|`TwabController`|Address of the TwabController used to keep track of balances|
|`yieldVault_`|`IERC4626`|Address of the ERC4626 vault in which assets are deposited to generate yield|
|`prizePool_`|`PrizePool`|Address of the PrizePool that computes prizes|
|`claimer_`|`Claimer`|Address of the claimer|
|`_owner`|`address`|Address that will gain ownership of this contract|


### availableBalanceOf

TODO: yield needs to be exposed but also other yield farm tokens => need for ownership


```solidity
function availableBalanceOf(address _token) public view override returns (uint256);
```

### totalAssets

*The total amount of assets managed by this vault is equal to
the total amount supplied to the YieldVault + the amount living in this vault.*


```solidity
function totalAssets() public view virtual override returns (uint256);
```

### maxDeposit

*We check if vault is properly collateralized.
If yes, we return uint112 max value. Otherwise, we return 0.*

*We use type(uint112).max cause this is the type used to store balances in TwabController.*


```solidity
function maxDeposit(address) public view virtual override returns (uint256);
```

### maxMint

*We use type(uint112).max cause this is the type used to store balances in TwabController.*


```solidity
function maxMint(address) public view virtual override returns (uint256);
```

### sponsor

Deposit assets into the Vault and delegate to the sponsorship address.


```solidity
function sponsor(uint256 _assets, address _receiver) external returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_assets`|`uint256`|Amount of assets to deposit|
|`_receiver`|`address`|Address of the receiver of the assets|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 Amount of shares minted to `_receiver`.|


### liquidate

*User provides prize tokens and receives in exchange Vault shares.*


```solidity
function liquidate(address _account, address _tokenIn, uint256 _amountIn, address _tokenOut, uint256 _amountOut)
    public
    virtual
    override
    returns (bool);
```

### targetOf


```solidity
function targetOf(address _token) external view returns (address);
```

### claimPrize

Claim prize for `_user`.

*Callable by anyone if claimer has not been set.*

*If claimer has been set:
- caller needs to be claimer address
- If auto claim is disabled for `_user`:
- caller can be any address except claimer address*


```solidity
function claimPrize(address _winner, uint8 _tier, address _to, uint96 _fee, address _feeRecipient)
    external
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_winner`|`address`|Address of the user to claim prize for|
|`_tier`|`uint8`|Tier to claim prize for|
|`_to`|`address`|Address of the recipient that will receive the prize|
|`_fee`|`uint96`|Amount in fees paid to `_feeRecipient`|
|`_feeRecipient`|`address`|Address that will receive the fee for claiming|


### disableAutoClaim

Allow a user to disable or activate prize auto claiming.

*Auto claim is active by default for all users.*


```solidity
function disableAutoClaim(bool _disable) external returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_disable`|`bool`|Disable or activate auto claim for `msg.sender`|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|bool New auto claim status|


### setClaimer

Set claimer.


```solidity
function setClaimer(Claimer claimer_) external onlyOwner returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`claimer_`|`Claimer`|New claimer address return address New claimer address|


### setLiquidationPair

Set liquidationPair.

*We reset approval of the previous liquidationPair and approve max for new one.*


```solidity
function setLiquidationPair(LiquidationPair liquidationPair_) external onlyOwner returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`liquidationPair_`|`LiquidationPair`|New liquidationPair address return address New liquidationPair address|


### twabController

Address of the TwabController keeping track of balances.


```solidity
function twabController() public view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|address TwabController address|


### yieldVault

Address of the ERC4626 vault generating yield.


```solidity
function yieldVault() public view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|address YieldVault address|


### liquidationPair

Address of the LiquidationPair used to liquidate yield for prize token.


```solidity
function liquidationPair() public view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|address LiquidationPair address|


### prizePool

Address of the PrizePool that computes prizes.


```solidity
function prizePool() public view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|address PrizePool address|


### claimer

Address of the claimer.


```solidity
function claimer() public view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|address Claimer address|


### _availableBalanceOf

Get available yield that can be liquidated by minting vault shares.

*The available yield to liquidate is equal to the maximum amount of assets
that can be withdrawn from the YieldVault minus the total amount of assets managed by this vault
which is equal to the total amount supplied to the YieldVault + the amount living in this vault.*

*If `_totalAssets` is greater than `_withdrawableAssets`, it could mean that:
- assets are living in this vault
- this vault is now undercollateralized
In both cases, we should not mint more shares than underlying assets available,
so we return the amount of assets living in this vault*


```solidity
function _availableBalanceOf(address _token) internal view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_token`|`address`|Address of the token to get available balance for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 Available amount of `_token`.|


### _deposit

Deposit/mint common workflow.

*If there are currently some underlying assets in the vault,
we only transfer the difference from the user wallet into the vault.
The difference is calculated this way:
- if `_vaultAssets` balance is greater than 0 and lower than `_assets`,
we substract `_vaultAssets` from `_assets` and deposit `_assetsDeposit` amount into the vault
- if `_vaultAssets` balance is greater than or equal to `_assets`,
we know the vault has enough underlying assets to fulfill the deposit
so we don't transfer any assets from the user wallet into the vault*


```solidity
function _deposit(address _caller, address _receiver, uint256 _assets, uint256 _shares) internal virtual override;
```

### _withdraw

*Withdraw/redeem common workflow.*


```solidity
function _withdraw(address _caller, address _receiver, address _owner, uint256 _assets, uint256 _shares)
    internal
    virtual
    override;
```

### _mint

Creates `_shares` tokens and assigns them to `_receiver`, increasing the total supply.

*Emits a {Transfer} event with `from` set to the zero address.*

*`_receiver` cannot be the zero address.*


```solidity
function _mint(address _receiver, uint256 _shares) internal virtual override;
```

### _burn

Destroys `_shares` tokens from `_owner`, reducing the total supply.

*Emits a {Transfer} event with `to` set to the zero address.*

*`_owner` cannot be the zero address.*

*`_owner` must have at least `_shares` tokens.*


```solidity
function _burn(address _owner, uint256 _shares) internal virtual override;
```

### _transfer

Updates `_from` and `_to` TWAB balance for a transfer.

*`_from` cannot be the zero address.*

*`_to` cannot be the zero address.*

*`_from` must have a balance of at least `_shares`.*


```solidity
function _transfer(address _from, address _to, uint256 _shares) internal virtual override;
```

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
    Claimer claimer,
    address owner
);
```

### AutoClaimDisabled
Emitted when auto claim has been disabled or activated by a user.


```solidity
event AutoClaimDisabled(address user, bool status);
```

### ClaimerSet
Emitted when a new claimer has been set.


```solidity
event ClaimerSet(Claimer previousClaimer, Claimer newClaimer);
```

### LiquidationPairSet
Emitted when a new LiquidationPair has been set.


```solidity
event LiquidationPairSet(LiquidationPair previousLiquidationPair, LiquidationPair newLiquidationPair);
```

### Sponsor
Emitted when a user sponsor the Vault.


```solidity
event Sponsor(address indexed caller, address indexed receiver, uint256 assets, uint256 shares);
```

