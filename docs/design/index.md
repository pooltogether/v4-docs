---
id: design
title: PoolTogether V5 Protocol Design
sidebar_position: 3
---

Fundamentally, PoolTogether’s value proposition is high-variance yield. Instead of earning their own yield, users have a chance to win everyone’s yield. PoolTogether V5 combines yield from any number of assets in a autonomous, permissionless way.

# Flow of Funds

1. Users deposit tokens into Vaults
2. Vaults liquidate yield for POOL tokens which are then contributed to the Prize Pool
3. The Prize Pool releases POOL Prizes in daily draws, which are claimed and sent to the winners.

![Flow of Funds](/img/v5/FlowOfFunds.png)

# Depositing into Vaults

To be eligible to win prizes, users deposit tokens into Vaults. 