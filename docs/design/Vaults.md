---
id: vaults
title: Vaults
sidebar_position: 1
---

Users deposit tokens into prize vaults in order to be eligible to win prizes. Prize vaults generate yield, liquidate the yield for the prize token, and contribute the prize token to the prize pool. The amount contributed determines the prize vault's portion of the odds.

While Vaults can be fully customized, the protocol provides a standard PrizeVault that can be instantiated using the PrizeVaultFactory. The PoolTogether standard prize vault wraps any ERC-4626 compliant tokenized vault with the above behavior. The standard prize vault is also ERC-4626 compliant.

The PoolTogether standard prize vault doesn't liquidate the yield itself, but rather exposes the yield to an external liquidation pair. See the guide [Liquidating Yield](../guides/bots/LiquidatingYield.md) for more information.

# Creating a Vault

You can create a new standard prize vault without writing a line of code by using the Cabana Vault Factory. The only requirement is that you have a compatible ERC-4626 compliant yield source.
