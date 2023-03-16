---
id: vaults
title: Vaults
sidebar_position: 1
---

Users deposit tokens into Vaults in order to be eligible to win prizes. Vaults generate yield, liquidate the yield for POOL tokens, and contribute the POOL to the Prize Pool. The amount of contributed POOL determines the Vault's portion of the odds.

While Vaults can be fully customized, the protocol provides a standard Vault that can be instantiated using the VaultFactory. The PoolTogether standard Vault wraps any ERC-4626 compliant tokenized vault with the above  behaviour. The standard Vault is itself ERC-4626 compliant.

The PoolTogether standard Vault doesn't liquidate the yield itself, but rather exposes the yield to an external Liquidation Pair. See [Yield Liquidation](./yield-liquidation) for more information.

# Creating a Vault

You can create a new Vault without writing a line of code by using the PoolTogether Vault Factory. The only requirement is that you have an ERC-4626 compliant yield source.

(Insert guide here)