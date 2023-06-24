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

## Current Testnet Subgraphs

### [Ethereum Sepolia](../../deployments/testnet#ethereum-sepolia)

| Subgraph | Decentralized Service Endpoint |
| :-- | :-- |
| Prize Pool | https://api.studio.thegraph.com/query/41211/v5-prize-pool-eth-sepolia/v0.0.3 |
| TWAB Controller | https://api.studio.thegraph.com/query/41211/v5-twab-controller-eth-sepolia/v0.0.3 |

### [Ethereum Goerli](../../deployments/testnet#ethereum-goerli)

| Subgraph | Hosted Service Endpoint |
| :-- | :-- |
| Prize Pool | https://api.thegraph.com/subgraphs/name/pooltogether/v5-eth-goerli-prize-pool |
| TWAB Controller | https://api.thegraph.com/subgraphs/name/pooltogether/v5-eth-goerli-twab-controller |

### [Polygon Mumbai](../../deployments/testnet#polygon-mumbai)

| Subgraph | Hosted Service Endpoint |
| :-- | :-- |
| Prize Pool | https://api.thegraph.com/subgraphs/name/pooltogether/v5-polygon-mumbai-prize-pool |
| TWAB Controller | https://api.thegraph.com/subgraphs/name/pooltogether/v5-polygon-mumbai-twab-control |
