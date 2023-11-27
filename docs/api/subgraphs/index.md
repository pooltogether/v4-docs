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

> NOTE: The subgraphs were previously separated into `PrizePool` and `TwabController` subgraphs, but are now unified in one subgraph. Some entities may have changed from the previous versions.

### Mainnet Subgraphs

#### [Ethereum](../../deployments/mainnet#ethereum)

| Subgraph | Decentralized Service Endpoint |
| :-- | :-- |
| PoolTogether V5 Ethereum | https://api.studio.thegraph.com/proxy/50959/pt-v5-eth/version/latest |
| PoolTogether V5 Optimism | https://api.studio.thegraph.com/proxy/50959/pt-v5-op/version/latest |

### Testnet Subgraph

#### [Optimism Goerli](../../deployments/testnet#optimism-goerli)

| Subgraph | Decentralized Service Endpoint |
| :-- | :-- |
| PoolTogether V5 OP Goerli | https://api.studio.thegraph.com/query/50959/pt-v5-op-goerli/version/latest |


### Beta Subgraphs

#### [Optimism](../../deployments/beta)

| Subgraph | Decentralized Service Endpoint |
| :-- | :-- |
| Prize Pool | https://api.studio.thegraph.com/query/41211/pt-v5-optimism-prize-pool/v0.0.1 |
| TWAB Controller | https://api.studio.thegraph.com/query/41211/pt-v5-optimism-twab-controller/v0.0.1 |
