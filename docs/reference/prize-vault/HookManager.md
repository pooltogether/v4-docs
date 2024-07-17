[Git Source](https://github.com/generationsoftware/pt-v5-vault/blob/da73ccf21a4c2ac885c0f85fd01f79ae44824787/src/abstract/HookManager.sol)

**Author:**
G9 Software Inc.

Allows each account to set and manage prize hooks that can be called when they win.


## State Variables
### _hooks
Maps user addresses to hooks that they want to execute when prizes are won.


```solidity
mapping(address => PrizeHooks) internal _hooks;
```


## Functions
### getHooks

Gets the hooks for the given account.


```solidity
function getHooks(address account) external view returns (PrizeHooks memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account`|`address`|The account to retrieve the hooks for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`PrizeHooks`|PrizeHooks The hooks for the given account|


### setHooks

Sets the hooks for a winner.

*Emits a `SetHooks` event*


```solidity
function setHooks(PrizeHooks calldata hooks) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hooks`|`PrizeHooks`|The hooks to set|


## Events
### SetHooks
Emitted when an account sets new hooks


```solidity
event SetHooks(address indexed account, PrizeHooks hooks);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account`|`address`|The account whose hooks are being configured|
|`hooks`|`PrizeHooks`|The hooks being set|

