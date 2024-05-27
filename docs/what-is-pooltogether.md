---
id: introduction
title: What Is PoolTogether?
sidebar_position: 1
---

PoolTogether is a prize savings game, where users pool yield from their tokens for a chance to win prizes.

The protocol is a gamification layer that allows users to have a chance to win big while holding their favourite token. Any token that offers yield, whether LP tokens or lending tokens like aTokens or cTokens, can be integrated into PoolTogether.

All yield is liquidated for WETH to form a single pool of prize liquidity on each chain.

# User Experience

Never lose your principal, and have a chance to win big!

1. 🏦 **Users deposit tokens**
2. 📈 **Yield accrues**
3. 🏆 **The yield is randomly awarded as prizes**
4. 💰 **Users can withdraw their deposit at any time**

# Design Principles

PoolTogether has been designed to be:

- **Autonomous:** the core components of the protocol run autonomously and automatically. There is no administrator or privileged actions. The number of prizes adapts automatically to the amount of available liquidity.
- **Permissionless:** anyone can extend the protocol and add new assets or yield sources; in fact anyone can fully customize the flow of funds.
- **Incentivized:** all actions needed for the protocol to operate are incentivized and public, so that anyone will trigger them.

To find out more, the best place to start is the [Protocol Design](design/index.md).

# Developer Experience

The core PoolTogether protocol is permissionless; anyone can add new tokens to the system. We've made integration simple by providing a template for ERC-4626 compatible vaults, but the developer can choose to customize every aspect of the integration: from yield liquidation to prize claiming.

Learn how [you can earn rewards and extend the protocol](guides/index.md).
