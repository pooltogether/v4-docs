---
title: Queries
sidebar_position: 12
sidebar_label: Queries
---

## Sample Queries

Below are some sample queries you can use to gather information from the Governance subgraph.

You can build your own queries using a [GraphQL Explorer](https://graphiql-online.com/graphiql) and enter your endpoint to limit the data to exactly what you need.

### Delegated Votes

Description: This query filters token holders, tokens held by them, and their delegated votes.

```graphql
{
  tokenHolders(where: { delegate_not: "null" }) {
    id
    totalTokensHeld
    delegate {
      delegatedVotes
      votes {
        votes
      }
    }
  }
}
```

### Governance

Description: This query fetches governance data aggregate.

```graphql
{
  governances {
    id
    proposals
    proposalsQueued
    delegatedVotes
    currentTokenHolders
    currentDelegates
    totalDelegates
    totalTokenHolders
  }
}
```
