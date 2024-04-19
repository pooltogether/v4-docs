[Git Source](https://github.com/generationsoftware/pt-v5-vault/blob/a10aaa1d1a04e19253a8a7c64aa384e2cb67fb2e/src/interfaces/IPrizeHooks.sol)

**Author:**
PoolTogether Inc. & G9 Software Inc.

Allows winners to attach smart contract hooks to their prize winnings


## Functions
### beforeClaimPrize

Triggered before the prize pool claim prize function is called.


```solidity
function beforeClaimPrize(address winner, uint8 tier, uint32 prizeIndex, uint96 reward, address rewardRecipient)
    external
    returns (address prizeRecipient, bytes memory data);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`winner`|`address`|The user who won the prize and for whom this hook is attached|
|`tier`|`uint8`|The tier of the prize|
|`prizeIndex`|`uint32`|The index of the prize in the tier|
|`reward`|`uint96`|The reward portion of the prize that will be allocated to the claimer|
|`rewardRecipient`|`address`|The recipient of the claim reward|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`prizeRecipient`|`address`|The address of the recipient of the prize|
|`data`|`bytes`|Arbitrary data that will be passed to the `afterClaimPrize` hook|


### afterClaimPrize

Triggered after the prize pool claim prize function is called.


```solidity
function afterClaimPrize(
    address winner,
    uint8 tier,
    uint32 prizeIndex,
    uint256 prize,
    address prizeRecipient,
    bytes memory data
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`winner`|`address`|The user who won the prize and for whom this hook is attached|
|`tier`|`uint8`|The tier of the prize|
|`prizeIndex`|`uint32`|The index of the prize|
|`prize`|`uint256`|The total size of the prize (not including the claim reward)|
|`prizeRecipient`|`address`|The recipient of the prize|
|`data`|`bytes`|Arbitrary data received from the `beforeClaimPrize` hook|


## Structs
### PrizeHooks
Defines a hook implementation and instructions on which hooks to call.


```solidity
struct PrizeHooks {
    bool useBeforeClaimPrize;
    bool useAfterClaimPrize;
    IPrizeHooks implementation;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`useBeforeClaimPrize`|`bool`|If true, the vault will call the beforeClaimPrize hook on the implementation|
|`useAfterClaimPrize`|`bool`|If true, the vault will call the afterClaimPrize hook on the implementation|
|`implementation`|`IPrizeHooks`|The address of the smart contract implementing the hooks|

