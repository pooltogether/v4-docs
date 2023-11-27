[Git Source](https://github.com/GenerationSoftware/pt-v5-draw-auction/blob/1f623e423d34437096ddfb3c146d64f61b37688e/src/abstract/AddressRemapper.sol)



Allows addresses to provide a remapping to a new address.

_The RngAuction lives on L1, but the rewards are given out on L2s. This contract allows the L1 reward recipients to remap their addresses to their L2 addresses if needed._

## Events

### AddressRemapped

```solidity
event AddressRemapped(address caller, address destination)
```

Emitted when a remapping is set.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| caller | address | Caller address |
| destination | address | Remapped destination address that will be used in place of the caller address |

## Variables

## Functions

### remappingOf

```solidity
function remappingOf(address _addr) public view returns (address)
```

Retrieves the remapping for the given address.

_If the address does not have a remapping, the input address will be returned._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _addr | address | The address to check for remappings |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | The remapped destination address for `_addr` |
### remapTo

```solidity
function remapTo(address _destination) external
```

Remaps the caller's address to the specified destination address

_Reset the destination to the zero address to remove the remapping._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _destination | address | The destination address to remap caller to |

## Structs

## Errors

