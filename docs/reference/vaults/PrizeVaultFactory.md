[Git Source](https://github.com/GenerationSoftware/pt-v5-vault/blob/20fa85c88da69db10b7e4f1a2b1d9cc5b6bca536/src/PrizeVaultFactory.sol)

**Author:**
PoolTogether Inc. & G9 Software Inc.

Factory contract for deploying new prize vaults using a standard underlying ERC4626 yield vault.


## State Variables
### YIELD_BUFFER
The yield buffer to use for vault deployments.

*The yield buffer is expected to be of insignificant value and is used to cover rounding
errors on deposits and withdrawals. Yield is expected to accrue faster than the yield buffer
can be reasonably depleted.
The yield buffer should be set as high as possible while still being considered
insignificant for the lowest precision per dollar asset that is expected to be supported.
Precision per dollar (PPD) can be calculated by: (10 ^ DECIMALS) / ($ value of 1 asset).
For example, USDC has a PPD of (10 ^ 6) / ($1) = 10e6 p/$.
As a rule of thumb, assets with lower PPD than USDC should not be assumed to be compatible since
the potential loss of a single unit rounding error is likely too high to be made up by yield at
a reasonable rate. Actual results may vary based on expected gas costs, asset fluctuation, and
yield accrual rates.
The yield buffer of vaults deployed by this factory is 1e5. This means that if you deploy a
vault with USDC as the underlying asset, you will have to approve this factory to spend 1e5
USDC ($0.10) to be sent to the prize vault during deployment. This value will cover the first
100k rounding errors on deposits and withdraws to the vault and is not recoverable by the
deployer.
If the yield buffer is depleted on a vault, the vault will prevent any further
deposits if it would result in a rounding error and any rounding errors incurred by withdrawals
will not be covered by yield. The yield buffer will be replenished automatically as yield accrues
on deposits.*


```solidity
uint256 public constant YIELD_BUFFER = 1e5;
```


### allVaults
List of all vaults deployed by this factory.


```solidity
PrizeVault[] public allVaults;
```


### deployedVaults
Mapping to verify if a Vault has been deployed via this factory.


```solidity
mapping(address vault => bool deployedByFactory) public deployedVaults;
```


### deployerNonces
Mapping to store deployer nonces for CREATE2


```solidity
mapping(address deployer => uint256 nonce) public deployerNonces;
```


## Functions
### deployVault

Deploy a new vault

*Emits a `NewPrizeVault` event with the vault details.*

*`claimer` can be set to address zero if none is available yet.*

*The caller MUST approve this factory to spend underlying assets equal to `YIELD_BUFFER` so the yield
buffer can be filled on deployment. This value is unrecoverable and is expected to be insignificant.*


```solidity
function deployVault(
    string memory _name,
    string memory _symbol,
    IERC4626 _yieldVault,
    PrizePool _prizePool,
    address _claimer,
    address _yieldFeeRecipient,
    uint32 _yieldFeePercentage,
    address _owner
) external returns (PrizeVault);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_name`|`string`|Name of the ERC20 share minted by the vault|
|`_symbol`|`string`|Symbol of the ERC20 share minted by the vault|
|`_yieldVault`|`IERC4626`|Address of the ERC4626 vault in which assets are deposited to generate yield|
|`_prizePool`|`PrizePool`|Address of the PrizePool that computes prizes|
|`_claimer`|`address`|Address of the claimer|
|`_yieldFeeRecipient`|`address`|Address of the yield fee recipient|
|`_yieldFeePercentage`|`uint32`|Yield fee percentage|
|`_owner`|`address`|Address that will gain ownership of this contract|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`PrizeVault`|PrizeVault The newly deployed PrizeVault|


### totalVaults

Total number of vaults deployed by this factory.


```solidity
function totalVaults() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 Number of vaults deployed by this factory.|


## Events
### NewPrizeVault
Emitted when a new PrizeVault has been deployed by this factory.


```solidity
event NewPrizeVault(
    PrizeVault indexed vault, IERC4626 indexed yieldVault, PrizePool indexed prizePool, string name, string symbol
);
```

