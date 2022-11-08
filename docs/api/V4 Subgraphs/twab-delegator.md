---
title: Entities & Sample Queries
sidebar_position: 5
sidebar_label: TWAB Delegator
---

## TWAB Delegator - Entities

- [Ticket](#ticket)
- [Delegation](#delegation)
- [Account](#account)

## Ticket

| Field       | Type           | Description                            |
| ----------- | -------------- | -------------------------------------- |
| id          | ID!            | Ticket ID                              |
| accounts    | [Account!]!    | Accounts associated with the ticket    |
| delegations | [Delegation!]! | Delegations associated with the ticket |

## Delegation

| Field     | Type     | Description                       |
| --------- | -------- | --------------------------------- |
| id        | ID!      | Delegator ID                      |
| delegator | Account! | Delegator address                 |
| delegatee | Account! | Delegatee address                 |
| balance   | BigInt!  | Total amount delegated            |
| lockUntil | BigInt!  | Duration for delegation           |
| ticket    | Ticket   | Ticket associated with delegation |

## Account

| Field       | Type           | Description                 |
| ----------- | -------------- | --------------------------- |
| id          | ID!            | Account ID                  |
| delegations | [Delegation!]! | Delegations made by user    |
| ticket      | Ticket         | Ticket associated with user |

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
