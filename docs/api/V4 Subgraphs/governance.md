---
title: Entities & Sample Queries
sidebar_position: 7
sidebar_label: Governance
---

## Governance - Entities

- [TokenHolder](#tokenholder)
- [Delegate](#delegate)
- [Proposal](#proposal)
- [Vote](#vote)
- [Governance](#governance)

## TokenHolder

| Field             | Type        | Description                                                                                                                    |
| ----------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------ |
| id                | ID!         | Token holder address                                                                                                           |
| delegate          | Delegate    | Delegate address of the token holder which will participate in votings                                                         |
| tokenBalanceRaw   | BigInt!     | Governance token balance of this address expressed in the smallest unit of the governance token                                |
| tokenBalance      | BigDecimal! | Governance token balance of this address expressed as a BigDecimal normalized value for the governance token                   |
| totalTokenHeldRaw | BigInt!     | Total amount of governance tokens ever held by this address expressed in the smallest unit of the governance token             |
| totalTokensHeld   | BigDecimal! | Total amount of governance token ever held by this address expressed as a BigDecimal normalized value for the governance token |

## Delegate

| Field                         | Type            | Description                                                                                                                                   |
| ----------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| id                            | ID!             | Delegate address                                                                                                                              |
| delegatedVotesRaw             | BigInt!         | Amount of votes delegated to this delegate to be used on proposal votings expressed in the smallest unit of the governance token              |
| delegatedVotes                | BigDecimal!     | Amount of votes delegated to this delegate to be used on proposal votings expressed as a BigDecimal normalized value for the governance token |
| tokenHoldersRepresentedAmount | Int!            |                                                                                                                                               |
| tokenHoldersRepresented       | [TokenHolder!]! | Token holders that this delegate represents                                                                                                   |
| votes                         | [Vote!]!        | Votes that a delegate has made in different proposals                                                                                         |
| proposals                     | [Proposal!]!    | Proposals that the delegate has created                                                                                                       |

## Proposal

| Field        | Type            | Description                                                                    |
| ------------ | --------------- | ------------------------------------------------------------------------------ |
| id           | ID!             | Internal proposal ID (autoincremental ID)                                      |
| proposer     | Delegate!       | Delegate that proposed the change                                              |
| targets      | [Bytes!]        | Targets data for the change                                                    |
| values       | [BigInt!]       | Values data for the change                                                     |
| signatures   | [String!]       | Signature data for the change                                                  |
| calldatas    | [Bytes!]        | Call data for the change                                                       |
| startBlock   | BigInt!         | Block number from where the voting starts                                      |
| endBlock     | BigInt!         | Block number from where the voting ends                                        |
| description  | String!         | String description of the change                                               |
| status       | ProposalStatus! | Status of the proposal                                                         |
| executionETA | BigInt          | Once the proposal is queued for execution it will have an ETA of the execution |
| votes        | [Vote!]!        | Votes associated to this proposal                                              |

## Vote

| Field    | Type        | Description                                                                                              |
| -------- | ----------- | -------------------------------------------------------------------------------------------------------- |
| id       | ID!         | Delegate ID + Proposal ID                                                                                |
| support  | Boolean!    | Whether the vote is in favour or against the proposal                                                    |
| votesRaw | BigInt!     | Amount of votes in favour or against expressed in the smallest unit of the governance token              |
| votes    | BigDecimal! | Amount of votes in favour or against expressed as a BigDecimal normalized value for the governance token |
| voter    | Delegate!   | Delegate that emitted the vote                                                                           |

## Governance

| Field               | Type        | Description                                                                                         |
| ------------------- | ----------- | --------------------------------------------------------------------------------------------------- |
| id                  | ID!         | Unique entity used to keep track of common aggregated data                                          |
| proposals           | BigInt!     | Number of proposals created                                                                         |
| currentTokenHolders | BigInt!     | Total number of token holders currently                                                             |
| currentDelegates    | BigInt!     | Total number of delegates participating on the governance currently                                 |
| totalTokenHolders   | BigInt!     | Total number of token holders                                                                       |
| totalDelegates      | BigInt!     | Total number of delegates that held delegated votes                                                 |
| delegatedVotesRaw   | BigInt!     | Total number of votes delegated expressed in the smallest unit of the governance token              |
| delegatedVotes      | BigDecimal! | Total number of votes delegated expressed as a BigDecimal normalized value for the governance token |
| proposalsQueued     | BigInt!     | Number of proposals currently queued for execution                                                  |

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

### Governance - Query

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
