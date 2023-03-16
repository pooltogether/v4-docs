---
title: Flow of Funds
sidebar_position: 2
---

The following diagram shows the flow of funds for a single Prize Pool instance.  "Instance" here is really referring to an aggregate of contracts that together form a "Prize Pool".

1. First a user deposits into the Prize Pool.
2. The Prize Pool deposits those funds into a yield source, such as Compound or Aave.
3. The Prize Pool is instructed by its strategy to divert the interest to the Reserve contract.  The reserve measures the amount of funds that have been added.
4. The Reserve contract sends funds to both the Prize Distributor (for users to claim) and to the prize pool network (to capture value).
5. Users claim their prizes from the Prize Distributor.
6. The prize pool network will deposit funds into the Prize Distributor to bootstrap prizes.

<img
  src={require('/img/v4/guides/FlowofFunds.png').default}
  alt='Flow of Funds'
  class='img-max'
/>
