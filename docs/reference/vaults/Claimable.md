[Git Source](https://github.com/GenerationSoftware/pt-v5-vault/blob/20fa85c88da69db10b7e4f1a2b1d9cc5b6bca536/src/abstract/Claimable.sol)

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

*Also calls the before and after claim hooks if set by the winner.*


```solidity
function claimPrize(address _winner, uint8 _tier, uint32 _prizeIndex, uint96 _reward, address _rewardRecipient)
    external
    onlyClaimer
    returns (uint256);
```

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

