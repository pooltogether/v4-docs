[Git Source](https://github.com/GenerationSoftware/pt-v5-vault/blob/20fa85c88da69db10b7e4f1a2b1d9cc5b6bca536/src/interfaces/IVaultHooks.sol)

**Author:**
PoolTogether Inc. & G9 Software Inc.

Allows winners to attach smart contract hooks to their prize winnings


## Functions
### beforeClaimPrize

Triggered before the prize pool claim prize function is called.


```solidity
function beforeClaimPrize(address winner, uint8 tier, uint32 prizeIndex, uint96 reward, address rewardRecipient)
    external
    returns (address);
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
|`<none>`|`address`|address The address of the recipient of the prize|


### afterClaimPrize

Triggered after the prize pool claim prize function is called.


```solidity
function afterClaimPrize(address winner, uint8 tier, uint32 prizeIndex, uint256 prize, address recipient) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`winner`|`address`|The user who won the prize and for whom this hook is attached|
|`tier`|`uint8`|The tier of the prize|
|`prizeIndex`|`uint32`|The index of the prize|
|`prize`|`uint256`|The total size of the prize (payout + reward)|
|`recipient`|`address`|The recipient of the prize|


## Structs

### VaultHooks

Defines a hook implementation and instructions on which hooks to call.

```solidity
struct VaultHooks {
    bool useBeforeClaimPrize;
    bool useAfterClaimPrize;
    IVaultHooks implementation;
}
```