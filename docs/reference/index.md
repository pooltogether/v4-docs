---
title: Reference
---

The PoolTogether code base breaks out every component into a composable system of contracts that all work together to create a permissionless hyperstructure for prize savings:

- [Prize Pool](./prize-pool) - the core of the prize system
- [Twab Controller](./twab-controller) - track weighted-average balances of depositors
- [Twab Delegator](./twab-delegator) - delegate a portion of deposits to other accounts
- [Twab Rewards](./twab-rewards) - permissionlessly create a stream of token rewards to depositors
- [Prize Vaults](./prize-vaults) - deposit and win prizes
- [Vault Booster](./vault-boost) - boost the prize power of a vault
- [Liquidator](./liquidator) - swap yield for prize tokens
- [Prize Claimer](./prize-claimer) - claim prizes on behalf of depositors
- [Draw Manager](./draw-manager) - keeps the prize machine ticking over everyday with a series of auctions