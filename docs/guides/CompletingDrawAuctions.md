---
id: completing-draw-auctions
title: Completing Draw Auctions
sidebar_position: 5
---

#### **Tutorial:** [👨‍⚖️ Creating a Draw Auction bot](https://mirror.xyz/chuckbergeron-g9.eth/1o-d_ScnJ8F0cer5SRmILMSPxTCn4vlWgN7fkU4FD4o)

---

In order for PoolTogether to work, a random number is required to choose winners and complete draws. PoolTogether V5 incentivizes anyone looking to request and relay random numbers from a trusted and verifiable RNG service. 

Draws are daily, which means:

- there is `1` `startRngRequest` that needs to take place (typically on an L1 such as Ethereum mainnet) each day
- there is `n` number of `relay` transactions that need to take place for `n` number of prize pools

Prize pools typically live on L2s as it is much cheaper for poolers to deposit and withdraw on L2s. In these cases, the `relay` transaction will also bridge the RNG from the source (eg. Ethereum) to the destination (eg. Optimism).

### To earn from completing draw auctions you will need to:

1. [Check to see if there are open auctions](#1-check-for-open-auctions)
2. [Compute the rewards that can be earned](#2-compute-rewards)
3. [Compute associated costs](#3-compute-costs)
4. [If completing an auction is profitable, execute a transaction to complete it](#4-completing-an-auction)


---

### 1. Check For Open Auctions

#### RngAuction

You can use `isAuctionOpen` on the **RngAuction** contract to test if the auction is open and can be completed.

#### RngRelayAuction

Finding out if the **RngRelayAuction** is open is a bit more complicated due to it being based on the previous **RngAuction**. It also has an `isAuctionOpen` function however this it requires two parameters: `isAuctionOpen(_sequenceId, _rngCompletedAt)`.

`_sequenceId` can be found by querying **RngAuction** for `lastSequenceId()`.

`_rngCompletedAt` can be found by querying **RngAuction** for `getRngResults()`. This returns two values: the `randomNumber` and `rngCompletedAt`.


### 2. Compute Rewards

---

#### RngAuction

We can get the expected reward that the **PrizePool** will pay out from it's reserve to determine profitability before running any transactions. First, we need the **reserve** from the **PrizePool**. This can be calculated by summing the **reserve** with the **reserveForOpenDraw**:

`PrizePool.reserve().add(PrizePool.reserveForOpenDraw())`

We can then multiply the **currentFractionalReward** with the summed reserve to get the expected reward in prize tokens:

`RngAuction.currentFractionalReward().mul(reserveSummed)`

---

#### RngRelayAuction

The expected reward from the **RngRelayAuction** is a bit more involved as it relies on the state of the previous **RngAuction**:

```sol
  uint32 lastSequenceId = rngAuction.lastSequenceId();

  UD2x18 rewardFraction = rngAuction.currentFractionalReward();

  AuctionResult memory auctionResult = AuctionResult({
    rewardFraction: rewardFraction,
    recipient: address(this) // reward recipient address
  });

  AuctionResult[] memory auctionResults = new AuctionResult[](1);
  auctionResults[0] = auctionResult;

  uint256[] memory rewards = rngRelayAuction.computeRewards(auctionResults);
```

### 3. Compute Costs

---

#### RngAuction

In some test environments the RNG uses the blockhash, which is not useful in production. When the RNG is derived from the blockhash we can use the **RngAuction** contract directly.

In production, currently the Chainlink VRF2 Direct Funding model is used to receive a random number. This requires we find the cost of the RNG in **LINK**. There is a helper contract specifically for working with the VRF. The **estimateRequestFee** function requires the current chain's gas price as an argument:

```sol
  (address _feeToken, uint256 _requestFee) = 
    ChainlinkVRFV2DirectRngAuctionHelperContract.estimateRequestFee(
      gasPrice
    );
```

---

#### RngRelayAuction

The **RngRelayAuction** does not have any other associated costs, other than typical chain gas costs.


### 4. Completing an Auction

---

#### RngAuction

To complete an RNG auction you can run the **RngAuction's** `startRngRequest(address _rewardRecipient)` if the RNG is set to blockhash. 

If the **rngService** is set, use the **ChainlinkVRFV2DirectRngAuctionHelper** contract's `transferFeeAndStartRngRequest(address _rewardRecipient)`.

Make sure to first approve a LINK allowance to the ChainlinkVRFV2DirectRngAuctionHelper contract.

---

#### RngRelayAuction

You can use the **RngAuctionRelayerDirect** contract's `relay(address _rngAuctionRelayListener, address _relayRewardRecipient)` to complete a relay auction if the **PrizePool** lives on the same chain as the **RngRelayAuction** contract.


If the **PrizePool** contract lives on a different chain, an ERC5164-compatible **RngAuctionRelayerRemoteOwner** contract will need to be used. This will complete the relay auction while also transferring the random number from the source chain to the destination chain the **PrizePool** lives on:

```sol
  function relay(
    IMessageDispatcher _messageDispatcher,
    uint256 _remoteOwnerChainId,
    RemoteOwner _remoteOwner,
    IRngAuctionRelayListener _remoteRngAuctionRelayListener,
    address _rewardRecipient
  )
```


<div className='flex-center'>
  <img src="/img/github.svg" width="20" height="20" className='github-img-dark' />
  <img src="/img/github-light.png" width="20" height="20" className='github-img-light' />
  <a href="https://github.com/GenerationSoftware/pt-v5-draw-auction/blob/f85d0d129c57137f393e683784126c6c74a26d09/src/RngAuctionRelayerRemoteOwner.sol#L60">RngAuctionRelayerRemoteOwner on Github</a>
</div>


---

## Reference Implementation

To see code examples, a reference implementation of an draw auction bot created by [Generation Software](https://www.g9software.xyz/) is available on GitHub:

<div className='flex-center'>
  <img src="/img/github.svg" width="20" height="20" className='github-img-dark' />
  <img src="/img/github-light.png" width="20" height="20" className='github-img-light' />
  <a href="https://github.com/GenerationSoftware/pt-v5-autotasks-monorepo/tree/main/packages/draw-auction">GitHub - pt-v5-autotasks-draw-auction</a>
</div>
