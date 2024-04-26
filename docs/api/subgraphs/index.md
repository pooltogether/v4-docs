---
id: subgraphs-introduction
title: Subgraphs Introduction
sidebar_position: 1
---

# Introduction

### PoolTogether V5 Subgraphs

PoolTogether has a GraphQL API Endpoint hosted by [The Graph](https://thegraph.com/docs/en/about/#what-the-graph-is) called a subgraph for indexing and organizing data from the PoolTogether smart contracts.

These subgraphs can be used to query on-chain PoolTogether data. The subgraphs data are serviced by a decentralized group of server operators called [Indexers](https://thegraph.com/docs/en/network/indexing/).

The PoolTogether subgraphs work by listening for events emitted by one or more data sources (Smart Contracts) on the various chains. It handles the indexing and caching of data which can later be queried using the GraphQL API Endpoint, providing an excellent developer experience.

## Get Started

Learn more about how subgraphs work by checking out [The Graph's official documentation](https://thegraph.com/docs/en/). If you are unfamiliar with GraphQL, we recommend taking a quick look through the [GraphQL documentation](https://graphql.org/learn/) first.

### GitHub Code

You can find the source code for the subgraphs at:


<div className='flex-center'>
  <img src="/img/github.svg" width="20" height="20" className='github-img-dark' />
  <img src="/img/github-light.png" width="20" height="20" className='github-img-light' />
  <a href="https://github.com/GenerationSoftware/pt-v5-subgraph">GitHub - pt-v5-subgraph</a>
</div>

---

## Subgraph Endpoints

### Mainnet Subgraphs

#### [Optimism](../../deployments/optimism)

| Subgraph | Decentralized Service Endpoint |
| :-- | :-- |
| PoolTogether V5 Optimism | https://api.studio.thegraph.com/query/63100/pt-v5-optimism/version/latest |

### Testnet Subgraphs

#### [Optimism Sepolia](../../deployments/optimism-sepolia)

| Subgraph | Decentralized Service Endpoint |
| :-- | :-- |
| PoolTogether V5 OP Sepolia | https://api.studio.thegraph.com/query/63100/pt-v5-op-sepolia/version/latest |

#### [Base Sepolia](../../deployments/base-sepolia)

| Subgraph | Decentralized Service Endpoint |
| :-- | :-- |
| PoolTogether V5 Base Sepolia | https://api.studio.thegraph.com/query/63100/pt-v5-base-sepolia/version/latest |
