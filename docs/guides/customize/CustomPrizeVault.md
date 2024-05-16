---
id: custom-prize-vault
title: Create a Custom Prize Vault
sidebar_position: 3
---

PoolTogether provides a default [`PrizeVault`](/protocol/reference/prize-vault/) contract that enables new prize savings integrations to be spun up quickly using an underlying ERC4626 yield source, but the prize pool is permissionless and anyone can create a custom prize vault for integrations not covered by the default contract.

## How to Create a Custom Prize Vault

Custom prize vaults need to fulfill three basic requirements to participate in the prize pool:

1. Store depositor balances in the prize pool's [TWAB Controller](/protocol/reference/twab-controller/) (this can be done easily by extending the [`TwabERC20`](/protocol/reference/prize-vault/TwabERC20) base contract!)
2. Contribute prize tokens to the prize pool by calling the [`contributePrizeTokens`](/protocol/reference/prize-pool/PrizePool#contributeprizetokens) function
3. Enable prizes to be claimed each draw (extend the [`Claimable`](/protocol/reference/prize-vault/Claimable) contract to quickly enable automatic prize claims!)

Check out the [custom prize vault example code](https://github.com/GenerationSoftware/pt-v5-builder-code-examples/tree/main/src/custom-vaults/examples/sponsored-vault#custom-sponsored-vault) to see how to create a custom vault in less than 50 lines of code!