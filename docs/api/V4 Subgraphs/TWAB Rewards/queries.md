---
title: Queries
sidebar_position: 6
sidebar_label: Queries
---

## Sample Queries

Below are some sample queries you can use to gather information from the TWAB Rewards subgraph.

You can build your own queries using a [GraphQL Explorer](https://graphiql-online.com/graphiql) and enter your endpoint to limit the data to exactly what you need.

### Promotion

Description: This query fetches users, their claimed promotions, their associated tickets, and unclaimed rewards.

```graphql
{
  accounts {
    claimedPromotions {
      promotionId
      rewards
      epochs
      ticket {
        id
        promotions {
          rewardsUnclaimed
        }
      }
    }
  }
}
```
