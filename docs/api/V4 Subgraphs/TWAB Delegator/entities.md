---
title: Entities
sidebar_position: 7
sidebar_label: Entities
---

# Entities

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
