# VaultFactory
[Git Source](https://github.com/pooltogether/v5-prize-vault/blob/023805de5aa83af29487f2a21fa745c7bad2736e/src/VaultFactory.sol)


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
mapping(Vault => bool) public deployedVaults;
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
    TwabController _twabController,
    IERC4626 _yieldVault,
    PrizePool _prizePool,
    Claimer _claimer,
    address _owner
) external returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_asset`|`IERC20`|Address of the underlying asset used by the vault|
|`_name`|`string`|Name of the ERC20 share minted by the vault|
|`_symbol`|`string`|Symbol of the ERC20 share minted by the vault|
|`_twabController`|`TwabController`|Address of the TwabController used to keep track of balances|
|`_yieldVault`|`IERC4626`|Address of the ERC4626 vault in which assets are deposited to generate yield|
|`_prizePool`|`PrizePool`|Address of the PrizePool that computes prizes|
|`_claimer`|`Claimer`|Address of the claimer|
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
|`<none>`|`uint256`|Number of vaults deployed by this factory.|


## Events
### NewFactoryVault
Emitted when a new Vault has been deployed by this factory.


```solidity
event NewFactoryVault(Vault indexed vault, VaultFactory indexed vaultFactory);
```

