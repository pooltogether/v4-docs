---
title: JS Client Quickstart
sidebar_position: 2
---

This guide shows you how to quickly add the packages required to deposit into PoolTogether.

Basic knowledge of Javascript, Typescript, [Ethereum](https://ethereum.org/en/what-is-ethereum/) and [ethers.js](https://docs.ethers.io/) is assumed.

## 💾 Installation

To interact with the latest PoolTogether V4 deployment you'll need to install 2 packages: [v4-client-js](https://www.npmjs.com/package/@pooltogether/v4-client-js) and [v4-pool-data](https://www.npmjs.com/package/@pooltogether/v4-pool-data).

`v4-client-js` provides functionality for interacting with the deployment.

`v4-pool-data` contains the latest contract addresses & ABIs of the PoolTogether Prize Pool Network.

```bash
yarn add @pooltogether/v4-client-js @pooltogether/v4-pool-data
```

## Getting Started

### 1. Prize Pool Networks

To begin, we'll create an instance of the deployed [Prize Pool Network](/protocol/concepts/prize-pools-network). The [`PrizePoolNetwork`](/protocol/libraries/v4-client-js/Classes/PrizePoolNetwork) class is the root of most interaction through the [client library](/protocol/libraries/v4-client-js/), so we'll begin by creating an instance of it.

You'll need to create instances of [ethers Providers](https://docs.ethers.io/v5/api/providers/) to read data from each blockchain the contract list contains deployments for. Default code is provided below but acquiring your own API keys for better performance is recommended.

> NOTE: You can determine the chain ids needed dynamically by using `getContractListChainIds` from `v4-client-js`.

```js
import { PrizePoolNetwork } from "@pooltogether/v4-client-js";
import { mainnet } from "@pooltogether/v4-pool-data";
import { ethers } from "ethers";

const providers = {
  // Mainnet Ethereum
  1: ethers.getDefaultProvider(1),
  // Polygon
  137: new ethers.providers.JsonRpcProvider(137, "https://polygon-rpc.com"),
  // Avalanche
  43114: new ethers.providers.JsonRpcProvider(
    43114,
    "https://api.avax.network/ext/bc/C/rpc"
  ),
};

const PrizePoolNetwork = new PrizePoolNetwork(providers, mainnet);
```

That's it! Now we're ready to start reading data from the PoolTogether Prize Pool Network!

### 2. Prize Pools

A [`PrizePool`](/protocol/libraries/v4-client-js/Classes/PrizePool) is a representation of a Prize Pool deployment. The Prize Pool is responsible for managing deposits, withdrawals & delegation. `PrizePool` is a read only object, for write capabilities see `User`.

Our `PrizePoolNetwork` is already populated with a `PrizePool` instance for each deployment provided in the contract list. To interact with a specific one we can read it from the `PrizePoolNetwork` with a combination of chain id and the addres of the `YieldSourcePrizePool` contract.

```js
const prizePool = PrizePoolNetwork.getPrizePool(
  1,
  "0xd89a09084555a7D0ABe7B111b1f78DFEdDd638Be"
);
```

### 3. Users

A [`User`](/protocol/libraries/v4-client-js/Classes/User) is wrapper around `PrizePool` with the ability to send transactions to manage deposits, withdrawals and delegation.

It is created by passing an instance of an [ethers Signer](https://docs.ethers.io/v5/api/signer/) and a `PrizePool`. Depending on how your dApp is set up, acquiring a `Signer` may vary.

```js
const user = new User(prizePool.prizePoolMetadata, signer, prizePool);
```

### 4. How to Get Token Balances

A very basic action is just getting a users token balances. We want to know the amount of tokens a user has deposited, the amount of underlying token the user has, as well as other details about the token like it's decimals, name and symbol.

We can use [`getUsersPrizePoolBalances`](/protocol/libraries/v4-client-js/Classes/PrizePoolNetwork#getusersprizepoolbalances) to fetch a users token balances across all of the networks.

```js
const balances = await PrizePoolNetwork.getUsersPrizePoolBalances(
  "0x1D9312B477E38397c6A69A6bBA2A1AD009CcF685"
);
```

Alternatively we can use [`getUsersDepositAllowance`](/protocol/libraries/v4-client-js/Classes/PrizePool#getusersdepositallowance) to fetch a users token balances for a specific Prize Pool.

```js
const balances = await PrizePool.getUsersDepositAllowance(
  "0x1D9312B477E38397c6A69A6bBA2A1AD009CcF685"
);
```

### 5. How to Deposit

Before we can make a deposit, we need to make sure hte user has approved the `YieldSourcePrizePool` to use the users underlying token (USDC in this case).

> NOTE: All of the read actions that are taking place through the User object can also be done with just a PrizePool.

```js
const { allowanceUnformatted, isApproved } = await user.getDepositAllowance();
```

`isApproved` is a boolean which is `true` if the user has an approved depost allowance.
`allowanceUnformatted` is a `BigNumber` representing the amount the user has allowed the contract to spend. The `Unformatted` suffix implies that the data **has not** been shifted to account for the decimals of the underlying token that was approved for use.

If `isApproved` is `false`, we will need to submit a transaction to update the amount the user has approved. Otherwise we can move forward.

> NOTE: `decimals` can be found in `usersTokenBalances` from above.

```js
const txResponse: TransactionResponse = await user.approveDeposits(
  ethers.utils.parseUnits(1000, decimals)
);
```

If `isApproved` is `true` and the amount the user wishes to deposit is less than the allowance, then we can simply submit a transaction to deposit.

```js
const txResponse: TransactionResponse = await user.deposit(
  ethers.utils.parseUnits(10, decimals)
);
```

### 6. How to Claim Prizes

TODO
