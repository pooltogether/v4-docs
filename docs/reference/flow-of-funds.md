---
title: Flow of Funds
sidebar_position: 2
---

The following diagram shows the flow of funds for a single Prize Pool instance.  "Instance" here is really referring to an aggregate of contracts that together form a "Prize Pool".

1. First a user deposits into the Prize Pool.
2. The Prize Pool deposits those funds into a yield source, such as Compound or Aave.
3. The Prize Pool is instructed by its strategy to divert the interest to the Reserve contract.  The reserve measures the amount of funds that have been added.
4. The Reserve contract sends funds to both the Draw Prize (for users to claim) and to the protocol (to capture value).
5. Users claim their prizes from the Draw Prize.
6. The Protocol will deposit funds into the Draw Prize to bootstrap prizes.

<img
  src={require('/img/guides/FlowofFunds.png').default}
  alt='Flow of Funds'
  class='img-max'
/>
