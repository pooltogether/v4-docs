---
id: v4-twab-delegator
title: V4 TWAB Delegator
---

[![Tests](https://github.com/pooltogether/v4-twab-delegator/actions/workflows/main.yml/badge.svg)](https://github.com/pooltogether/v4-twab-delegator/actions/workflows/main.yml)
[![Coverage Status](https://coveralls.io/repos/github/pooltogether/v4-twab-delegator/badge.svg?branch=master)](https://coveralls.io/github/pooltogether/v4-twab-delegator?branch=master)

The PoolTogether V4 TWAB Delegator contract allows accounts to easily delegate their chance of winning to other accounts.

There are three roles that relate to this contract:

- Delegators
- Delegatees
- Representatives

**Delegators**

Delegators are accounts that want to delegate their chance to win to another account. They do so using delegation "slots". Each delegation slot corresponds to a smart contract deployed as a minimal proxy. This contract holds the tickets and delegates the chance of the held tickets to the delegatee.

**Delegatees**

Delegatees are those who have tickets delegated to them.  The delegatee gets a higher chance to win thanks to the delegation, but they don't have access to the underlying funds.

**Representatives**

Representatives are accounts that can manage delegations for a delegator.  They can create and update the delegations, but cannot withdraw any funds. This enables smart contracts to manage delegations, or even a human representative.

# User Flow

## Delegator Flow

The main user flow is that a delegator delegates tickets to a delegatee. The flow proceeds like so:

1. Delegator creates a delegation for the given slot:
```solidity
createDelegation(address delegatorAddress, uint256 slotIndex, address delegatee, uint256 lockDuration)
```
2. Delegator funds the delegation (transfers tickets into the delegation)
```solidity
fundDelegation(address delegator, uint256 slotIndex, uint256 amount)
```

## Representative Flow

If a delegator wishes a representative to manage their delegations for them, then the delegator can stake on the contract instead. The representative can use the stake to create delegations, but cannot withdraw the stake.

The staking and rep flow looks like so:

1. Delegator stakes tickets into the contract:
```solidity
stake(address to, uint256 amount)
```
2. Delegator adds a rep:
```solidity
setRepresentative(address rep, bool isRep)
```

The representative would follow a similar flow to create a delegation, but would instead fund from the stake:

1. Representative creates a delegation for the given slot:
```solidity
createDelegation(address delegatorAddress, uint256 slotIndex, address delegatee, uint256 lockDuration)
```
2. Representative funds the delegation (transfers tickets into the delegation)
```solidity
fundDelegationFromStake(address delegator, uint256 slotIndex, uint256 amount)
```

# Permit & Multicall

This contract implements the Multicall interface which allows EOAs to batch transactions together. It also implements a special [`permitAndMulticall`](https://dev.pooltogether.com/protocol/contracts/v4-twab-delegator/TWABDelegator#permitandmulticall) function so that users can also approve the ticket contract before running transactions, allowing them to create a delegation in a single tx.
