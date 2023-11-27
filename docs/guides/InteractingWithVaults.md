---
id: interacting-with-vaults
title: Interacting with Vaults
sidebar_position: 1
---

## Types of Vaults

In PoolTogether V5, vaults are not constricted to one specific kind of contract, instead they can take any form and still permissionlessly participate in the shared prize pool as long as they follow the correct procedures.

### Standard Vaults

With the launch of V5 came the creation of the first *standard* [vaults](/protocol/reference/vaults/Vault). These vaults are ERC4626 compliant and can be created through a [factory contract](/protocol/reference/vaults/VaultFactory) by providing a compatible ERC-4626 yield source.

Since standard vaults are ERC-4626 compliant, you can refer to the [EIP-4626 documentation](https://eips.ethereum.org/EIPS/eip-4626) for more on how to deposit and withdraw.

#### Discovering New Vaults

Standard vaults are created using the VaultFactory, which provides a means to enumerate all created Vaults. You can query a list of all created vaults from the factory contract by reading [the `allVaults` array](/protocol/reference/vaults/VaultFactory#allvaults).

#### Prize Hooks

Standard vaults also offer an additional layer of customization to depositors by allowing each account to set custom prize hooks, which are additional onchain actions that are automatically executed when their prize is claimed. More information and use cases can be found in the [Prize Hooks Guide](./prize-hooks)

### Non-Standard Vaults

Vaults that are not created through the standard vault factory may not follow the same format that standard vaults do; therefore, non-standard vaults must be evaluated on a case-by-case basis when discovering how to interact with a specific contract.

#### Discovering Non-Standard Vaults

Since non-standard vaults may not be created through a factory contract that provides enumeration, discovering these vaults can be quite difficult. One method of discovery is to query the [`ContributePrizeTokens`](/protocol/reference/prize-pool/PrizePool#contributeprizetokens) event on the `PrizePool` contract. This event is triggered anytime prize tokens are contributed on behalf of a vault. If a vault contributes any amount of prize tokens to the prize pool, it's depositors will be automatically eligible to win prizes.