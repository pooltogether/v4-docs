---
title: Queries
sidebar_position: 8
sidebar_label: Queries
---

## Sample Queries

Below are some sample queries you can use to gather information from the TWAB Delegator subgraph.

You can build your own queries using a [GraphQL Explorer](https://graphiql-online.com/graphiql) and enter your endpoint to limit the data to exactly what you need.

### Delegations

Description: This query fetches the data for delegators, delegatees, time duration of delegation, and balance.

```graphql
{
  delegations {
    delegator {
      id
      delegations {
        balance
        lockUntil
      }
    }
    delegatee {
      id
      delegations {
        balance
        lockUntil
      }
    }
  }
}
```

### Accounts

Description: This query fetches user accounts and their delegations.

```graphql
{
  accounts {
    id
    delegations {
      id
      lockUntil
      balance
    }
  }
}
```
