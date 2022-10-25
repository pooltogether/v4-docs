---
title: Entities
sidebar_position: 3
sidebar_label: Entities
---

# Entities

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
