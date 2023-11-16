---
id: reference
title: Reference
sidebar_position: 1
---

The PoolTogether V5 code base breaks out every component into a composable system of contracts that all work together to create a permissionless hyperstructure for prize savings:

- [Prize Pool](./prize-pool) - the core of the prize system
- [Twab Controller](./twab-controller/) - track weighted-average balances of depositors
- [Twab Delegator](./twab-delegator/) - delegate a portion of deposits to other accounts
- [Vaults](./vaults) - deposit and accrue yield
- [Vault Booster](./vault-boost) - boost the prize power of a vault
- [Liquidator](./liquidator) - swap yield for prize tokens
- [Prize Claimer](./prize-claimer) - claim prizes on behalf of depositors
- [Draw Auctions](./draw-auction) - keeps the prize machine ticking over everyday with a series of auctions
- [Chainlink VRF V2 RNG](./chainlink-vrf-v2-direct) - request RNG from Chainlink's VRF V2 service