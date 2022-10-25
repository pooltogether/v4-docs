---
title: Entities
sidebar_position: 9
sidebar_label: Entities
---

# Entities

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
