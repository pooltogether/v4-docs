---
id: creating-vaults
title: Creating a Vault
sidebar_position: 2
---

# Creating a Vault

Creating a new Vault is the primary way in which to extend PoolTogether. Vaults represents asset and yield source combinations, so to add a new asset or yield source to the protocol you would simply create a new Vault and grow its deposits.

Vaults can be coded in any way the creator pleases; the only requirements to become part of the PoolTogether Protocol are:

- The Vault must update the [Twab Controller](../design/TwabController.md) to ensure it's depositors are eligible to win prizes.
- The Vault must contribute prize tokens to the [Prize Pool](../design/PrizePool.md) to increase the depositors odds of winning.

However, the PoolTogether Protocol provides a standard prize vault that makes it easy to integrate new [ERC-4626](https://erc4626.info/) compatible yield sources and assets without writing any code. For this guide we're going to focus on the standard prize vault.

## PoolTogether Standard Prize Vault

The standard prize vault is an [ERC-4626](https://erc4626.info/) compliant tokenized vault that wraps a ERC-4626 yield source. The standard vault liquidates yield for the prize token, and contributes those tokens to the Prize Pool.

The standard prize vault behaviour:

1. Users deposit tokens, which the vault deposits into the underlying yield source. The vault updates user balances in the Twab Controller.
2. Yield that accrues on deposits is exposed to a Liquidation Pair, which liquidates the yield for the prize token.
3. When yield is liquidated, the standard vault contributes the prize tokens to the Prize Pool.

## Creating a Standard Vault

To create a standard vault, you will need to: 

1. Use an ERC-4626 compatible yield source.
2. Deploy on the same chain as the prize pool
3. Set up a Liquidation Pair for the accrued yield
4. Deploy a claimer contract

### Use an ERC-4626 Compatible Yield Source

The PT Standard Prize Vault requires an ERC-4626 compatible yield source to generate yield. This means that the yield will accrue in the yield source (the value of shares will increase). This is critically important; the standard prize vault only recognizes increases in ERC-4626 vault shares.

It's also important to evaluate the behaviour of the underlying yield source; the yield source should not have fees-on-transfer or fees-on-withdrawal or incur any fee otherwise that would affect this behaviour. The standard vault expects the yield source to be freely liquid, and that balances always go up. 

The fundamental security risks of an asset and yield source must be evaluated as well.

### Set Up a Liquidation Pair

The standard vault can have Liquidation Pairs added to it. The Liquidation Pair should be liquidating the vault's shares for the prize token. The vault will deposit the tokens into the Prize Pool upon liquidation.

### Deploying a Claimer Contract

Depositors in V5 expect their prizes to be automatically claimed and sent to their wallet. This is done through a daily auction run by a claimer contract where bots can compete to claim prizes for the lowest fee.

Standard vaults are initialized with a claimer address that is the only address permitted to claim prizes on behalf of users. You can deploy a claimer contract through the [`ClaimerFactory`](/protocol/reference/prize-claimer/ClaimerFactory) (you can find the live deployed factories [here](/protocol/deployments/optimism)).

## Non-Standard Vaults

If a particular vault design isn't compatible with the standard vault contract, then a non-standard vault can be made. Non-standard vaults have no explicit interface that they need to implement, but they do need to be compatible with the `PrizePool` and `TwabController` contracts in order to be eligible for prizes. They may also be expected to integrate an incentivised claimer contract so that depositors will have prizes claimed automatically for them, just like in a standard prize vault.

The bare minimum that a non-standard vault needs to do is:

1. [Store depositor balance info](/protocol/reference/twab-controller/TwabController#mint) in the `TwabController`
2. [Contribute prize tokens](/protocol/reference/prize-pool/PrizePool#contributeprizetokens) to the `PrizePool`
3. [Claim prizes](/protocol/reference/prize-pool/PrizePool#claimprize) from the `PrizePool` before the next draw is closed (less than 24 hours).

### Custom Vault Examples

Check out the [custom vault examples](https://github.com/GenerationSoftware/pt-v5-builder-code-examples/tree/main/src/custom-vaults/examples) for more info on how to build your own non-standard vault.
