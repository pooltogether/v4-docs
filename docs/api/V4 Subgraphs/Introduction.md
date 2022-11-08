---
title: Introduction
sidebar_position: 2
sidebar_label: Subgraph Introduction
---

## PoolTogether-V4 Subgraph Introduction

The following pages contain everything you need to know about the PoolTogether suite of subgraphs.

PoolTogether has a GraphQL API Endpoint hosted by [The Graph](https://thegraph.com/docs/about/introduction#what-the-graph-is) called a subgraph for indexing and organizing data from the PoolTogether smart contracts.

These subgraphs can be used to query on-chain PoolTogether data. The subgraphs data are serviced by a decentralized group of server operators called [Indexers](https://thegraph.com/docs/en/network/indexing/).

The PoolTogether subgraphs work by listening for events emitted by one or more data sources (Smart Contracts) on the various chains. It handles the indexing and caching of data which can later be queried using the GraphQL API Endpoint, providing an excellent developer experience.

## Get Started

Learn more about how subgraphs work by checking out [The Graph's official documentation](https://thegraph.com/docs/en/). If you are unfamiliar with GraphQL, we recommend taking a quick look through their documentation first [here](https://graphql.org/learn/)

## Current Subgraph locations

## Mainnet

| Subgraph       | Hosted Service                                                                        | Decentralized Network                                                                                  |
| :------------- | :------------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------------- |
| Prizes Claimed | `https://thegraph.com/hosted-service/subgraph/pooltogether/mainnet-v4-prizes-claimed` | `https://thegraph.com/explorer/subgraph?id=2egD38z98PyFwxU9wmNACJLPErpY9f28v7gxvgU4WHxg&view=Overview` |
| TWAB Rewards   | `https://thegraph.com/hosted-service/subgraph/pooltogether/mainnet-twab-rewards`      | `https://thegraph.com/explorer/subgraph?id=J2rXR9mkUi1Lp7y2frVYFnSx9iJ2W4YmJDgGdK7k7wip&view=Overview` |
| TWAB Delegator | `https://thegraph.com/hosted-service/subgraph/pooltogether/mainnet-twab-delegator`    | `https://thegraph.com/explorer/subgraph?id=9e675xZvfRpWLzfkPqipNKWwZWUmWYMg6igWLVKA2qcw&view=Overview` |
| Ticket TWAB    | `https://thegraph.com/hosted-service/subgraph/pooltogether/mainnet-twab`              | `https://thegraph.com/explorer/subgraph?id=DwkpPnn9yQPnhMS4WfnUFYNFXRZM9R1PjLBwbo7EmGA6&view=Overview` |
| Governance     | `https://thegraph.com/hosted-service/subgraph/pooltogether/pooltogether-governance`   | `https://thegraph.com/explorer/subgraph?id=HZmtsnmRWMKh532QbirX9ouAxUGrzSNtWUPK6nnM2bdL&view=Overview` |

## Polygon

| Subgraph       | Hosted Service                                                                        | Decentralized Network |
| :------------- | :------------------------------------------------------------------------------------ | :-------------------- |
| Prizes Claimed | `https://thegraph.com/hosted-service/subgraph/pooltogether/polygon-v4-prizes-claimed` |                       |
| TWAB Rewards   | `https://thegraph.com/hosted-service/subgraph/pooltogether/polygon-twab-rewards`      |                       |
| TWAB Delegator | `https://thegraph.com/hosted-service/subgraph/pooltogether/polygon-twab-delegator`    |                       |
| Ticket TWAB    | `https://thegraph.com/hosted-service/subgraph/pooltogether/polygon-twab`              |                       |

## Avalanche

| Subgraph       | Hosted Service                                                                          | Decentralized Network |
| :------------- | :-------------------------------------------------------------------------------------- | :-------------------- |
| Prizes Claimed | `https://thegraph.com/hosted-service/subgraph/pooltogether/avalanche-v4-prizes-claimed` |                       |
| TWAB Rewards   | `https://thegraph.com/hosted-service/subgraph/pooltogether/avalanche-twab-rewards`      |                       |
| TWAB Delegator | `https://thegraph.com/hosted-service/subgraph/pooltogether/avalanche-twab-delegator`    |                       |
| Ticket TWAB    | `https://thegraph.com/hosted-service/subgraph/pooltogether/avalanche-twab`              |                       |

## Optimism

| Subgraph       | Hosted Service                                                                         | Decentralized Network |
| :------------- | :------------------------------------------------------------------------------------- | :-------------------- |
| Prizes Claimed | `https://thegraph.com/hosted-service/subgraph/pooltogether/optimism-v4-prizes-claimed` |                       |
| TWAB Rewards   | `https://thegraph.com/hosted-service/subgraph/pooltogether/optimism-twab-rewards`      |                       |
| TWAB Delegator | `https://thegraph.com/hosted-service/subgraph/pooltogether/optimism-twab-delegator`    |                       |
| Ticket TWAB    | `https://thegraph.com/hosted-service/subgraph/pooltogether/optimism-twab`              |                       |

## GraphQL Endpoint Links

- Prizes Claimed: `https://gateway.thegraph.com/api/[api-key]/subgraphs/id/2egD38z98PyFwxU9wmNACJLPErpY9f28v7gxvgU4WHxg`
- TWAB Rewards: `https://gateway.thegraph.com/api/[api-key]/subgraphs/id/J2rXR9mkUi1Lp7y2frVYFnSx9iJ2W4YmJDgGdK7k7wip`
- TWAB Delegator: `https://gateway.thegraph.com/api/[api-key]/subgraphs/id/9e675xZvfRpWLzfkPqipNKWwZWUmWYMg6igWLVKA2qcw`
- Ticket TWAB: `https://gateway.thegraph.com/api/[api-key]/subgraphs/id/DwkpPnn9yQPnhMS4WfnUFYNFXRZM9R1PjLBwbo7EmGA6`
- Governance: `https://gateway.thegraph.com/api/[api-key]/subgraphs/id/HZmtsnmRWMKh532QbirX9ouAxUGrzSNtWUPK6nnM2bdL`

## Helpful Resources

- [Video Tutorial on creating an API Key](https://www.youtube.com/watch?v=UrfIpm-Vlgs)
- [Managing your API Key & setting your indexer preferences](https://thegraph.com/docs/en/studio/managing-api-keys/)
- [Querying from an application](https://thegraph.com/docs/en/developer/querying-from-your-app/)
- [How to use the explorer and playground to query on-chain data](https://medium.com/@chidubem_/how-to-query-on-chain-data-with-the-graph-f8507488215)
- [Explorer Page](https://thegraph.com/explorer/subgraph?id=FDrqtqbp8LhG1hSnwtWB2hE6C97FWA54irrozjb2TtMH&view=Overview)
