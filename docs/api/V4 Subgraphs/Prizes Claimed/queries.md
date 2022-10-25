---
title: Queries
sidebar_position: 4
sidebar_label: Queries
---

## Sample Queries

Below are some sample queries you can use to gather information from the Prizes-Claimed subgraph.

You can build your own queries using a [GraphQL Explorer](https://graphiql-online.com/graphiql) and enter your endpoint to limit the data to exactly what you need.

### Aggregate

Description: This query fetches the total sum of all prizes claimed on this network. It also sorts for the first 20 draws, and their total claimed.

```graphql
{
  aggregates {
    id
    totalClaimed
  }
  draws(first: 20, orderBy: id, orderDirection: desc) {
    id
    totalClaimed
  }
}
```

### AccountDraws

Description: This query fetches the balance of the total claimed and their timestamp from user accounts.

```graphql
{
  accountDraws {
    account {
      id
      totalClaimed
      draws(first: 20, orderBy: id, orderDirection: desc) {
        id
        claimed
        claimedAtTimestamp
      }
    }
  }
}
```
