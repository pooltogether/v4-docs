[Git Source](https://github.com/GenerationSoftware/pt-v5-vault/blob/97f5fd14e9d25c704b9d7da87c4d9d996b7dec41/src/VaultFactory.sol)



**Author:**
PoolTogether Inc. & G9 Software Inc.

Factory contract for deploying new vaults using a standard underlying ERC4626 yield vault.


## State Variables
### allVaults
List of all vaults deployed by this factory.


```solidity
Vault[] public allVaults;
```


### deployedVaults
Mapping to verify if a Vault has been deployed via this factory.

*Vault address => boolean*


```solidity
mapping(address => bool) public deployedVaults;
```


### deployerNonces
Mapping to store deployer nonces for CREATE2


```solidity
mapping(address => uint256) public deployerNonces;
```


## Functions
### deployVault

Deploy a new vault

*`claimer` can be set to address zero if none is available yet.*


```solidity
function deployVault(
    IERC20 _asset,
    string memory _name,
    string memory _symbol,
    IERC4626 _yieldVault,
    PrizePool _prizePool,
    address _claimer,
    address _yieldFeeRecipient,
    uint32 _yieldFeePercentage,
    address _owner
) external returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_asset`|`IERC20`|Address of the underlying asset used by the vault|
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
|`<none>`|`address`|address Address of the newly deployed Vault|


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
### NewFactoryVault
Emitted when a new Vault has been deployed by this factory.


```solidity
event NewFactoryVault(Vault indexed vault, VaultFactoryV2 indexed vaultFactory);
```

