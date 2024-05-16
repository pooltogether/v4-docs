[Git Source](https://github.com/generationsoftware/pt-v5-vault/blob/a10aaa1d1a04e19253a8a7c64aa384e2cb67fb2e/src/abstract/Claimable.sol)

**Inherits:**
[HookManager](./HookManager), IClaimable

**Author:**
G9 Software Inc.

Provides an interface for Claimer contracts to interact with a vault in PoolTogether
V5 while allowing each account to set and manage prize hooks that are called when they win.


## State Variables
### HOOK_GAS
The gas to give to each of the before and after prize claim hooks.

*This should be enough gas to mint an NFT if needed.*


```solidity
uint24 public constant HOOK_GAS = 150_000;
```


### prizePool
Address of the PrizePool that computes prizes.


```solidity
PrizePool public immutable prizePool;
```


### claimer
Address of the claimer.


```solidity
address public claimer;
```


## Functions
### onlyClaimer

Requires the caller to be the claimer.


```solidity
modifier onlyClaimer();
```

### constructor

Claimable constructor


```solidity
constructor(PrizePool prizePool_, address claimer_);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`prizePool_`|`PrizePool`|The prize pool to claim prizes from|
|`claimer_`|`address`|The address allowed to claim prizes on behalf of winners|


### claimPrize

Claim a prize for a winner

*Also calls the before and after claim hooks if set by the winner.*


```solidity
function claimPrize(address _winner, uint8 _tier, uint32 _prizeIndex, uint96 _reward, address _rewardRecipient)
    external
    onlyClaimer
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_winner`|`address`|The winner of the prize|
|`_tier`|`uint8`|The prize tier|
|`_prizeIndex`|`uint32`|The prize index|
|`_reward`|`uint96`|The reward to allocate to the reward recipient, in prize tokens|
|`_rewardRecipient`|`address`|The recipient of the reward|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total prize token amount claimed (zero if already claimed)|


### _setClaimer

Set claimer address.

*Will revert if `_claimer` is address zero.*


```solidity
function _setClaimer(address _claimer) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_claimer`|`address`|Address of the claimer|


## Errors
### PrizePoolZeroAddress
Thrown when the Prize Pool is set to the zero address.


```solidity
error PrizePoolZeroAddress();
```

### ClaimerZeroAddress
Thrown when the Claimer is set to the zero address.


```solidity
error ClaimerZeroAddress();
```

### ClaimRecipientZeroAddress
Thrown when a prize is claimed for the zero address.


```solidity
error ClaimRecipientZeroAddress();
```

### CallerNotClaimer
Thrown when the caller is not the prize claimer.


```solidity
error CallerNotClaimer(address caller, address claimer);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`caller`|`address`|The caller address|
|`claimer`|`address`|The claimer address|

