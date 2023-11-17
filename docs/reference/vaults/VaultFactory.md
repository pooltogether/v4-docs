[Git Source](https://github.com/GenerationSoftware/pt-v5-vault/blob/10eb9ff64bd4b5eaa93cc7cffdf6bfe01af619bf/src/VaultFactory.sol)



Factory contract for deploying new vaults using a standard underlying ERC4626 yield vault.

## Events

### NewFactoryVault

```solidity
event NewFactoryVault(contract Vault vault, contract VaultFactory vaultFactory)
```

Emitted when a new Vault has been deployed by this factory.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | contract Vault | Address of the vault that was deployed |
| vaultFactory | contract VaultFactory | Address of the VaultFactory that deployed `vault` |

## Variables

### allVaults

```solidity
contract Vault[] allVaults
```

List of all vaults deployed by this factory.

### deployedVaults

```solidity
mapping(contract Vault => bool) deployedVaults
```

Mapping to verify if a Vault has been deployed via this factory.

_Vault address => boolean_

### deployerNonces

```solidity
mapping(address => uint256) deployerNonces
```

Mapping to store deployer nonces for CREATE2

## Functions

### deployVault

```solidity
function deployVault(contract IERC20 _asset, string _name, string _symbol, contract IERC4626 _yieldVault, contract PrizePool _prizePool, address _claimer, address _yieldFeeRecipient, uint32 _yieldFeePercentage, address _owner) external returns (address)
```

Deploy a new vault

_`claimer` can be set to address zero if none is available yet._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _asset | contract IERC20 | Address of the underlying asset used by the vault |
| _name | string | Name of the ERC20 share minted by the vault |
| _symbol | string | Symbol of the ERC20 share minted by the vault |
| _yieldVault | contract IERC4626 | Address of the ERC4626 vault in which assets are deposited to generate yield |
| _prizePool | contract PrizePool | Address of the PrizePool that computes prizes |
| _claimer | address | Address of the claimer |
| _yieldFeeRecipient | address | Address of the yield fee recipient |
| _yieldFeePercentage | uint32 | Yield fee percentage |
| _owner | address | Address that will gain ownership of this contract |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address Address of the newly deployed Vault |
### totalVaults

```solidity
function totalVaults() external view returns (uint256)
```

Total number of vaults deployed by this factory.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 Number of vaults deployed by this factory. |

## Structs

## Errors

