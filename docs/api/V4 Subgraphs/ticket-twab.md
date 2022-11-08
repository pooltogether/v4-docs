---
title: Entities & Sample Queries
sidebar_position: 6
sidebar_label: Ticket TWAB
---

## Ticket TWAB - Entities

- [Ticket](#ticket)
- [Account](#account)
- [Twab](#twab)

## Ticket

| Field    | Type     | Description                    |
| -------- | -------- | ------------------------------ |
| id       | ID!      | Ticket address                 |
| accounts | Account! | Account associated with ticket |

## Account

| Field           | Type        | Description                                        |
| --------------- | ----------- | -------------------------------------------------- |
| id              | ID!         | Account address                                    |
| balance         | BigInt      | Ticket balance in user wallet                      |
| delegateBalance | BigInt      | Amount of tickets delegated to this account        |
| ticket          | Ticket      | Ticket associated with the account                 |
| twabs           | [Twab!]!    | Time weighted average balance                      |
| delegates       | [Account!]! | Accounts who delegated to this account             |
| delegatee       | Account     | Account to whom this account delegates his tickets |

## Twab

| Field           | Type     | Description                                    |
| --------------- | -------- | ---------------------------------------------- |
| id              | ID!      | Delegate address + timestamp                   |
| amount          | BigInt!  | Token balance for the prize pool after deposit |
| delegateBalance | BigInt!  | Amount of tickets delegated                    |
| timestamp       | BigInt!  | Time stamp for twab                            |
| account         | Account! | User account                                   |

## Sample Queries

Below are some sample queries you can use to gather information from the Ticket TWAB subgraph.

You can build your own queries using a [GraphQL Explorer](https://graphiql-online.com/graphiql) and enter your endpoint to limit the data to exactly what you need.

### TWAB

Description: This query fetches TWAB data.

```graphql
{
  twabs {
    id
    amount
    delegateBalance
    timestamp
  }
}
```

### Tickets

Description: This query fetches ticket data and the accounts they are associated with. It also sorts through the first 20 users where the balance is not equal to 0.

```graphql
{
  tickets {
    id
    accounts(
      first: 20
      orderBy: id
      orderDirection: desc
      where: { balance_not: "0" }
    ) {
      id
      balance
      delegateBalance
    }
  }
}
```
