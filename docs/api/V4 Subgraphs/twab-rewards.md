---
title: Entities & Sample Queries
sidebar_position: 4
sidebar_label: TWAB Rewards
---

## TWAB Rewards - Entities

- [Ticket](#ticket)
- [Promotion](#promotion)
- [Account](#account)
- [ClaimedPromotion](#claimedpromotion)

## Ticket

| Field      | Type          | Description                          |
| ---------- | ------------- | ------------------------------------ |
| id         | ID!           | Ticket address                       |
| accounts   | [Account!]!   | Account associated with the ticket   |
| promotions | [Promotion!]! | Promotion associated with the ticket |

## Promotion

| Field            | Type     | Description                                     |
| ---------------- | -------- | ----------------------------------------------- |
| id               | ID!      | Promotion ID                                    |
| creator          | Account! | Account who created the promotion               |
| createdAt        | BigInt!  | Timestamp at which the promotion was created    |
| endedAt          | BigInt   | Timestamp at which the promotion was ended      |
| destroyedAt      | BigInt   | Timestamp at which the promotion was destroyed  |
| startTimestamp   | BigInt!  | Timestamp at which the promotion starts         |
| numberOfEpochs   | BigInt!  | Number of epochs the promotion lasts            |
| epochDuration    | BigInt!  | Duration of each epoch in seconds               |
| tokensPerEpoch   | BigInt!  | Number of tokens to be distributed per epoch    |
| rewardsUnclaimed | BigInt!  | Number of tokens that have not been claimed yet |
| token            | Bytes!   | Address of the token distributed as rewards     |
| ticket           | Ticket   | Ticket to which the promotion is associated     |

## Account

| Field             | Type                 | Description                                             |
| ----------------- | -------------------- | ------------------------------------------------------- |
| id                | ID!                  | Account address                                         |
| promotions        | [Promotion!]!        | Promotions created by the account                       |
| claimedPromotions | [ClaimedPromotion!]! | IDs of promotions that have been claimed by the account |
| ticket            | Ticket               | Ticket to which the account is associated               |

## ClaimedPromotion

| Field       | Type      | Description                                                     |
| ----------- | --------- | --------------------------------------------------------------- |
| id          | ID!       | Composite ID of the account address + promotion ID              |
| promotionId | BigInt!   | ID of the promotion that was claimed                            |
| account     | Account!  | Account that has claimed the promotion                          |
| epochs      | [BigInt!] | Epochs from the promotion that have been claimed by the account |
| rewards     | BigInt!   | Total amount of rewards that have been claimed by the account   |
| ticket      | Ticket    | Ticket to which the promotion is associated                     |

## Sample Queries

Below are some sample queries you can use to gather information from the TWAB Rewards subgraph.

You can build your own queries using a [GraphQL Explorer](https://graphiql-online.com/graphiql) and enter your endpoint to limit the data to exactly what you need.

### Promotion - Query

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
