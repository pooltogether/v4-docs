---
id: creating-vaults
title: Creating a Vault
sidebar_position: 2
---

# Creating a Vault

Creating a new Vault is the primary way in which to extend PoolTogether. Vaults represents asset and yield source combinations, so to add a new asset or yield source to the protocol you would simply create a new Vault and grow its deposits.

Vaults can be coded in any way the creator pleases; the only requirements to become part of the PoolTogether Protocol are:

- The Vault must update the [Twab Controller](../design/TwabController.md) to ensure it's depositors are eligible to win prizes.
- The Vault must contribute POOL to the [Prize Pool](../design/PrizePool.md) to increase the depositors odds of winning.

However, the PoolTogether Protocol provides a standard Vault that makes it easy to integrate new [ERC-4626](https://erc4626.info/) compatible yield sources and assets without writing any code. For this guide we're going to focus on the standard vault.

# PoolTogether Standard Vault

The standard Vault is an [ERC-4626](https://erc4626.info/) compliant tokenized vault that wraps a ERC-4626 yield source.  The standard vault liquidates yield for POOL tokens, and contributes those POOL tokens to the Prize Pool.

The standard vault behaviour:

1. Users deposit tokens, which the vault deposit into the underlying yield source. The vault updates user balances in the Twab Controller.
2. Yield that accrues on deposits is exposed to a Liquidation Pair, which liquidates the yield for POOL tokens.
3. When yield is liquidated, the standard vault contributes the POOL to the Prize Pool.

## Creating a Standard Vault

To create a standard vault, you will need to: 

1. Use an ERC-4626 compatible yield source.
2. Deploy on a chain that PoolTogether V5 exists on
3. Set up a Liquidation Pair for the accrued yield

### Use an ERC-4626 Compatible Yield Source

The PT Standard Vault requires an ERC-4626 compatible yield source to generate yield. This means that the yield will accrue in the yield source (the value of shares will increase). This is critically important; the standard vault only recognizes increases in ERC-4626 vault shares.

It's also important to evaluate the behaviour of the underlying yield source; the yield source should not have fees-on-transfer or fees-on-withdrawal or incur any fee otherwise. The standard vault expects the yield source to be freely liquid, and that balances always go up. 

The fundamental security risks of an asset and yield source must be evaluated as well.

### Set Up a Liquidation Pair

The standard vault can have Liquidation Pairs added to it. The Liquidation Pair should be liquidating the vault's shares for the POOL token. The vault will deposit the POOL tokens into the Prize Pool upon liquidation.
