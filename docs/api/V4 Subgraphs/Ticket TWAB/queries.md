---
title: Queries
sidebar_position: 10
sidebar_label: Queries
---

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
