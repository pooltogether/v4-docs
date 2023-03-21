---
title: TWAB Rewards
sidebar_position: 1
---

The TWAB Rewards contract allows anyone to distribute tokens to prize pool depositors.

To distribute tokens, you will create what we call a promotion.

The tutorials bellow will walk you through the process of:

- creating a promotion
- extending the promotion
- ending the promotion
- destroying the promotion

## Key concepts

Before creating a promotion, a few key concepts are important to understand.

The promotion you will create will last for a certain amount of time that we refer to as epoch.
At the end of each epoch, the contract will reward depositors with a certain amount of tokens that you will have determined.
Depositors need to claim these rewards, they are not automatically sent to them.

If you wish to extend the promotion by a number of epochs, you can call the `extendPromotion` function.
You will not be able to change the amount of tokens that are awarded by epoch. If you wish to change it, you will need to create a new promotion.

You will be able to end the promotion at any time by calling `endPromotion` and receive the tokens from the epochs that have not been awarded yet, which means that you will only receive the amount of tokens from the epochs that have not yet completed.

Once the promotion has ended, you can call `destroyPromotion` to destroy it and receive the tokens that have not been claimed yet.
This function is only callable 60 days after the end or the creation of the promotion to give some time to users to claim their rewards.

Now that you know the inner workings of a promotion, you are ready to create your first one.

## Verify that you are interacting with the right contract

This contract being tied to a pool, it is important that you first verify that the TWAB Rewards contract you are interacting with is tied to the pool you want to create the promotion for.

To do so, you can load the `YieldSourcePrizePool` contract in Etherscan, or one of his clones, and look at the `getTicket` view function, in the `Read Contract` section, to retrieve the Ticket address.

<img
src={require('/img/v4/how-to/twab-rewards/yield-source-prize-pool-get-ticket-etherscan.png').default}
alt='Yield Source Prize Pool getTicket view function on Etherscan'
class='padding-bottom--md'
/>

To get the ticket address used by the `TwabRewards` contract, you can load it in Etherscan and look at the `ticket` variable in the `Read Contract` section.

<img
src={require('/img/v4/how-to/twab-rewards/twab-rewards-ticket-etherscan.png').default}
alt='TWAB Rewards ticket address on Etherscan'
class='padding-bottom--md'
/>

If the addresses match, you are good to go.

## How to create a promotion

The following tutorial will explain you how to create a promotion that will last for 3 months and award 12,000 tokens to the pool depositors.

Each epoch will last for 1 week, since there are 4 weeks in a month, the total number of epochs is `3 * 4 = 12`.

We want to award 12,000 tokens in total, so we will award `12000 / 12 = 1000` tokens per epoch.

### Approve the TWAB Rewards contract to spend your tokens

Before creating a promotion, you need to approve the TWAB Rewards contract to spend your ERC20 tokens.

Let's take for example the USDC token.

After loading the contract in Etherscan, you should first check the number of decimals used by the token.
To do so, you can look at the `decimals` variable in the `Read Contract` section.

<img
src={require('/img/v4/how-to/twab-rewards/usdc-decimals-etherscan.png').default}
alt='USDC decimals variable on Etherscan'
class='padding-bottom--md'
/>

As we can see, the number of decimals is 6, meaning that when approving the contract to spend your tokens, you will need to pad your amount with 6 zeros.

To approve the contract to spend your tokens, you will need to call the `approve` function in the `Write Contract` section.

This is the parameters the function expects:

- `spender`: the address of the TWAB Rewards contract
- `amount`: the amount of tokens you want to approve

Fill the `spender` parameter with the address of the TWAB Rewards contract.

<img
src={require('/img/v4/how-to/twab-rewards/usdc-spender-etherscan.png').default}
alt='USDC spender on Etherscan'
class='padding-bottom--md'
/>

Fill the `amount` parameter with the amount of tokens you want to approve. 12,000 in our case.

To pad the amount, you can use the useful `Add zeroes` popin by clicking on the `+` button.

<img
src={require('/img/v4/how-to/twab-rewards/usdc-amount-etherscan.png').default}
alt='USDC amount on Etherscan'
class='padding-bottom--md'
/>

Then select `10ˆ6` and click on the `Add` button.

<img
src={require('/img/v4/how-to/twab-rewards/usdc-pad-etherscan.png').default}
alt='USDC Add zeroes popin on Etherscan'
class='padding-bottom--md'
/>

The parameters should look like this:

<img
src={require('/img/v4/how-to/twab-rewards/usdc-approve-etherscan.png').default}
alt='USDC approve function on Etherscan'
class='padding-bottom--md'
/>

Click on the `Write` button to send the transaction.

Once your transaction is mined, the TWAB Rewards contract can now spend up to 12,000 of your USDC tokens. You are ready to create your first promotion.

### Create a promotion

Load the TWAB Rewards contract in Etherscan, go to the `Write Contract` section and unfold the `createPromotion` function.

<img
src={require('/img/v4/how-to/twab-rewards/twab-rewards-create-promotion-etherscan.png').default}
alt='TWAB Rewards createPromotion function on Etherscan'
class='padding-bottom--md'
/>

We will go over each parameter of the function in order to understand how to fill them out:

- `_token`: address of the token you wish to award to the depositors.
- `_startTimestamp`: timestamp at which the promotion will start.
- `_tokensPerEpoch`: the amount of tokens that will be awarded to the depositors at the end of each epoch.
- `_epochDuration`: the duration of each epoch in seconds.
- `_numberOfEpochs`: the number of epochs the promotion will last for.

We want to award 12,000 tokens during a period of 3 months.

We decide that each epoch will last for 1 week, so `_epochDuration` in seconds will be `604800`.

There is 4 weeks in a month, since we want the promotion to run for 3 months, `_numberOfEpochs` will be `3 * 4 = 12`.

Now that we have the number of epochs, we can calculate the amount of `_tokensPerEpoch` which will be `12000 / 12 = 1000`.

We are now ready to fill out the promotion parameters.

<img
src={require('/img/v4/how-to/twab-rewards/twab-rewards-create-promotion-filled-etherscan.png').default}
alt='TWAB Rewards createPromotion function filled on Etherscan'
class='padding-bottom--md'
/>

Click on the `Write` button to send the transaction.

Once your transaction is mined, you will have successfully created your first promotion.

We will now see how you can retrieve the id of the promotion, so you can interact with it in the future.

### Retrieve the promotion id

Load the transaction that created your promotion on Etherscan and go to the `Logs` section to retrieve the id of the promotion.

Here, the promotion id is `1`.

<img
src={require('/img/v4/how-to/twab-rewards/twab-rewards-create-promotion-log-etherscan.png').default}
alt='TWAB Rewards PromotionCreated log on Etherscan'
/>

Now that you have the id of your promotion, you can manage it through several functions.

We will go through each of these functions in the tutorials below.

## How to extend a promotion

If you wish to extend a promotion by a number of epochs, you can call the `extendPromotion` function.

You will need to fill the following parameters:

- `_promotionId`: id of the promotion you wish to extend.
- `_numberOfEpochs`: number of epochs the promotion will be extended for.

<img
src={require('/img/v4/how-to/twab-rewards/twab-rewards-extend-promotion-etherscan.png').default}
alt='TWAB Rewards extendPromotion function on Etherscan'
class='padding-bottom--md'
/>

Now let's say we want to extend the promotion we just created by a month:

- `_promotionId`: will be `1`.
- `_numberOfEpochs`: will be `4` since `_epochDuration` is equal to a week.

<img
src={require('/img/v4/how-to/twab-rewards/twab-rewards-extend-promotion-filled-etherscan.png').default}
alt='TWAB Rewards extendPromotion function filled on Etherscan'
class='padding-bottom--md'
/>

Before sending the transaction, make sure you have enough tokens in your wallet. In our case, we award 1,000 tokens per epoch, so we need to have at least 4,000 tokens.

Click on the `Write` button to send the transaction. Once your transaction is mined, your promotion is extended by 4 weeks at the end of the last epoch.

## How to end a promotion

The `endPromotion` function allows you to end a currently running promotion.

Keep in mind that you will only receive the amount of tokens from the epochs that have not yet completed.

The following parameters need to be filled out:

- `_promotionId`: id of the promotion you wish to end.
- `_to`: address of the wallet you wish to send the tokens to.

<img
src={require('/img/v4/how-to/twab-rewards/twab-rewards-end-promotion-etherscan.png').default}
alt='TWAB Rewards endPromotion function on Etherscan'
class='padding-bottom--md'
/>

Let's say you want to end the promotion with id `1` and send the tokens to `0x3A791e828fDd420fbE16416efDF509E4b9088Dd4`.

This is how you will fill out the parameters:

<img
src={require('/img/v4/how-to/twab-rewards/twab-rewards-end-promotion-filled-etherscan.png').default}
alt='TWAB Rewards endPromotion function filled on Etherscan'
class='padding-bottom--md'
/>

Click on the `Write` button to send the transaction. Once your transaction is mined, you should receive the tokens from the epochs that have not yet completed and your promotion is now ended.

## How to destroy a promotion

You can call the `destroyPromotion` function to destroy a promotion.

Only promotions that have ended or have not started yet can be destroyed. Which means that no epoch is currently running for this promotion.

Keep in mind that you can only destroy a promotion 60 days after the end of the promotion or it's creation, if the promotion is not currently running.

Only the tokens that have not been claimed yet will be sent back to the wallet you specify.

The following parameters need to be filled out:

- `_promotionId`: id of the promotion you wish to destroy.
- `_to`: address of the wallet you wish to send the remaining tokens to.

<img
src={require('/img/v4/how-to/twab-rewards/twab-rewards-destroy-promotion-etherscan.png').default}
alt='TWAB Rewards destroyPromotion function on Etherscan'
class='padding-bottom--md'
/>

Let's say you want to end the promotion with id `1` and send the tokens to `0x3A791e828fDd420fbE16416efDF509E4b9088Dd4`.

This is how you will fill out the parameters:

<img
src={require('/img/v4/how-to/twab-rewards/twab-rewards-destroy-promotion-filled-etherscan.png').default}
alt='TWAB Rewards destroyPromotion function filled on Etherscan'
class='padding-bottom--md'
/>

Click on the `Write` button to send the transaction. Once your transaction is mined, you should receive the tokens that have not been claimed and your promotion is now destroyed.
