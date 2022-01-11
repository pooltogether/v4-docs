---
title: Twab Rewards
sidebar_position: 1
---

# Twab Rewards

## How to create a promotion

The Twab Rewards contract allow anyone to create a promotion for depositors into a pool.

This contract being tied to a pool, it is important that you first verify that the Twab Rewards contract you are interacting with is tied to the pool you want to create the promotion for.

To do so, you can load the `YieldSourcePrizePool` contract in Etherscan, or one of his clones, and look at the `getTicket` view function, in the `Read Contract` section, to retrieve the Ticket address.

<img
  src={require('/img/how-to/twab-rewards/yield-source-prize-pool-get-ticket-etherscan.png').default}
  alt='Yield Source Prize Pool getTicket view function on Etherscan'
  class='padding-bottom--md'
/>

To get the ticket address used by the `TwabRewards` contract, you can load it in Etherscan and look at the `ticket` variable in the `Read Contract` section.

<img
  src={require('/img/how-to/twab-rewards/twab-rewards-ticket-etherscan.png').default}
  alt='Twab Rewards ticket address on Etherscan'
  class='padding-bottom--md'
/>

If the addresses match, you are good to go.

Before creating a promotion, a few key concepts are important to understand.

The promotion you will create will last for a certain amount of time that we refer to as `epoch`.
At the end of each epoch, the contract will reward depositors with a certain amount of tokens that you will have determined.
Depositors need to claim these rewards, they are not automatically sent to them.

If you wish to extend the promotion by a number of epochs, you can call the `extendPromotion` function.
You will not be able to change the amount tokens that are awarded by epoch. If you wish to change it, you will need to create a new promotion.

You will be able to end the promotion at any time by calling `endPromotion` and receive the tokens from the epochs that have not been awarded yet, which means that you will only receive the amount of tokens from the epochs that have not yet started.

Once the promotion has ended, you can call `destroyPromotion` to destroy it and receive the tokens that have not been claimed yet.
This function is only callable 60 days after the end of the promotion to give some time to users to claim their rewards.

Tutorials in this section are here to explain you how the above functions work.

Now that you know the inner workings of a promotion, you are ready to create your first promotion.

Load the Twab Rewards contract in Etherscan, go to the `Write Contract` section and unfold the `createPromotion` function.

<img
  src={require('/img/how-to/twab-rewards/twab-rewards-create-promotion-etherscan.png').default}
  alt='Twab Rewards createPromotion function on Etherscan'
  class='padding-bottom--md'
/>

We will go over each parameter of the function in order to understand how to fill them out:
- `_token`: address of the token you wish to award to the depositors.
- `_startTimestamp`: timestamp at which the promotion will start. Needs to be in the future, so choose a timestamp further away enough for your transaction to be successfully mined.
- `_tokensPerEpoch`: the amount of tokens that will be awarded to the depositors at the end of each epoch.
- `_epochDuration`: the duration of each epoch in seconds.
- `_numberOfEpochs`: the number of epochs the promotion will last for.

Let's take a concrete example to understand how to fill the last three parameters.
For example, we want to create a promotion that will last for 3 months and award 12,000 tokens to the depositors.

We decide that each epoch will last for 1 week, so `_epochDuration` will be `604800`.

There is 4 weeks in a month, since we want the promotion to run for 3 months, `_numberOfEpochs` will be `3 * 4 = 12`.

Now that we have the number of epochs, we can calculate the amount of `_tokensPerEpoch` which will be `12000 / 12 = 1000`.

We are now ready to fill out the promotion parameters.

<img
  src={require('/img/how-to/twab-rewards/twab-rewards-create-promotion-filled-etherscan.png').default}
  alt='Twab Rewards createPromotion function filled on Etherscan'
  class='padding-bottom--md'
/>

Click on the `Write` button to send the transaction.

Once the transaction has been mined, you should look at the transaction on Etherscan and go to the `Logs` section to retrieve the id of the promotion you just created.

Here, the promotion id is `1`.

<img
  src={require('/img/how-to/twab-rewards/twab-rewards-create-promotion-log-etherscan.png').default}
  alt='Twab Rewards PromotionCreated log on Etherscan'
/>

## How to extend a promotion

The process to extend a promotion is fairly straight forward.

The following parameters need to be filled out:
- `_promotionId`: id of the promotion you wish to extend
- `_numberOfEpochs`: number of epochs the promotion will be extended for.

<img
  src={require('/img/how-to/twab-rewards/twab-rewards-extend-promotion-etherscan.png').default}
  alt='Twab Rewards extendPromotion function on Etherscan'
  class='padding-bottom--md'
/>

Now let's say we want to extend the promotion we just created by a month:
- `_promotionId`: will be `1`
- `_numberOfEpochs`: will be `4` since `_epochDuration` is equal to a week

<img
  src={require('/img/how-to/twab-rewards/twab-rewards-extend-promotion-filled-etherscan.png').default}
  alt='Twab Rewards extendPromotion function filled on Etherscan'
  class='padding-bottom--md'
/>

Before sending the transaction, make sure you have enough tokens in your wallet. In our case, we award 1,000 tokens per epoch, so we need to have at least 4,000 tokens.

Click on the `Write` button to send the transaction. Once your transaction is mined, your promotion is extended by 4 weeks at the end of the last epoch.

## How to end a promotion

You can call the `endPromotion` function to end the promotion.

Keep in mind that you will only receive the amount of tokens from the epochs that have not yet started.

The following parameters need to be filled out:
- `_promotionId`: id of the promotion you wish to end
- `_to`: address of the wallet you wish to send the tokens to

<img
  src={require('/img/how-to/twab-rewards/twab-rewards-end-promotion-etherscan.png').default}
  alt='Twab Rewards endPromotion function filled on Etherscan'
  class='padding-bottom--md'
/>

Let's say you want to end the promotion with id `1` and send the tokens to `0x3A791e828fDd420fbE16416efDF509E4b9088Dd4`.

This is how you will fill out the parameters:

<img
  src={require('/img/how-to/twab-rewards/twab-rewards-end-promotion-filled-etherscan.png').default}
  alt='Twab Rewards endPromotion function filled on Etherscan'
  class='padding-bottom--md'
/>

Click on the `Write` button to send the transaction. Once your transaction is mined, you should receive the tokens from the epochs that have not yet started.

