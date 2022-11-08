---
title: Entities & Sample Queries
sidebar_position: 3
sidebar_label: Prizes Claimed
---

## Prizes Claimed - Entities

- [Aggregate](#aggregate)
- [Account](#account)
- [Draw](#draw)
- [AccountDraw](#accountdraw)

## Aggregate

Description: A total sum of all prizes claimed on this network

| Field        | Type    | Description                    |
| ------------ | ------- | ------------------------------ |
| id           | String! | Aggregate ID                   |
| totalClaimed | BigInt! | Total number of prizes claimed |

## Account

| Field        | Type             | Description                           |
| ------------ | ---------------- | ------------------------------------- |
| id           | ID!              | Account address                       |
| totalClaimed | BigInt!          | Sum of amount claimed on this network |
| draws        | [AccountDraws!]! | Draws on this network                 |

## Draw

| Field              | Type            | Description                         |
| ------------------ | --------------- | ----------------------------------- |
| id                 | ID!             | Draw ID                             |
| createdAtTimestamp | BigInt!         | Time draw was created               |
| totalClaimed       | BigInt!         | Sum of amount claimed for this draw |
| accounts           | [AccountDraw!]! | Draws created on account            |

## AccountDraw

| Field              | Type     | Description                                 |
| ------------------ | -------- | ------------------------------------------- |
| id                 | String!  | Account.ID + Draw.ID                        |
| account            | Account! | User account                                |
| draw               | Draw!    | Draws created on account                    |
| claimed            | BigInt!  | Amount claimed by user for this single draw |
| createdAtTimestamp | BigInt!  | Time draw was created                       |

## Sample Queries

Below are some sample queries you can use to gather information from the Prizes-Claimed subgraph.

You can build your own queries using a [GraphQL Explorer](https://graphiql-online.com/graphiql) and enter your endpoint to limit the data to exactly what you need.

### Aggregate - Query

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
