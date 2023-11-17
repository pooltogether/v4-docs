[Git Source](https://github.com/GenerationSoftware/pt-v5-vault-boost/blob/276fb4e1dc7c1a3b3d574c7aa2113726fb1d1020/src/VaultBoosterFactory.sol)



Factory contract for VaultBooster

## Events

### CreatedVaultBooster

```solidity
event CreatedVaultBooster(contract VaultBooster vaultBooster, contract PrizePool prizePool, address vault, address owner)
```

Emitted when a new VaultBooster is created

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vaultBooster | contract VaultBooster | The address of the new Vault Booster |
| prizePool | contract PrizePool | The address of the prize pool to contribute to |
| vault | address | The address of the vault to contribute for |
| owner | address | The owner of the VaultBooster |

## Variables

### deployerNonces

```solidity
mapping(address => uint256) deployerNonces
```

Mapping to store deployer nonces for CREATE2

## Functions

### createVaultBooster

```solidity
function createVaultBooster(contract PrizePool _prizePool, address _vault, address _owner) external returns (contract VaultBooster)
```

Creates a new vault booster contract

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _prizePool | contract PrizePool | The prize pool to contribute to |
| _vault | address | The vault to contribute for |
| _owner | address | The owner of the Vault Booster |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract VaultBooster | The address of the new Vault Booster |

## Structs

## Errors

