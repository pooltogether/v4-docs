---
id: subgraphs-introduction
title: Subgraphs Introduction
sidebar_position: 1
---

# Introduction

## PoolTogether V5 Subgraphs

PoolTogether has a GraphQL API Endpoint hosted by [The Graph](https://thegraph.com/docs/en/about/#what-the-graph-is) called a subgraph for indexing and organizing data from the PoolTogether smart contracts.

These subgraphs can be used to query on-chain PoolTogether data. The subgraphs data are serviced by a decentralized group of server operators called [Indexers](https://thegraph.com/docs/en/network/indexing/).

The PoolTogether subgraphs work by listening for events emitted by one or more data sources (Smart Contracts) on the various chains. It handles the indexing and caching of data which can later be queried using the GraphQL API Endpoint, providing an excellent developer experience.

## Get Started

Learn more about how subgraphs work by checking out [The Graph's official documentation](https://thegraph.com/docs/en/). If you are unfamiliar with GraphQL, we recommend taking a quick look through the [GraphQL documentation](https://graphql.org/learn/) first.

## Beta Subgraphs

### [Optimism](../../deployments/beta)

| Subgraph | Decentralized Service Endpoint |
| :-- | :-- |
| Prize Pool | https://api.studio.thegraph.com/query/41211/pt-v5-optimism-prize-pool/v0.0.1 |
| TWAB Controller | https://api.studio.thegraph.com/query/41211/pt-v5-optimism-twab-controller/v0.0.1 |

## Testnet Subgraphs

### [Optimism Goerli](../../deployments/testnet#optimism-goerli)

| Subgraph | Decentralized Service Endpoint |
| :-- | :-- |
| Prize Pool | (https://api.studio.thegraph.com/query/50959/pt-v5-op-goerli-prize-pool/v0.0.1) |
| TWAB Controller | (https://api.studio.thegraph.com/query/50959/pt-v5-op-goerli-twab-control/v0.0.1) |

