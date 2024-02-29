[Git Source](https://github.com/GenerationSoftware/pt-v5-vault/blob/20fa85c88da69db10b7e4f1a2b1d9cc5b6bca536/src/abstract/HookManager.sol)

**Author:**
G9 Software Inc.

Allows each account to set and manage prize hooks that can be called when they win.


## State Variables
### _hooks
Maps user addresses to hooks that they want to execute when prizes are won.


```solidity
mapping(address => VaultHooks) internal _hooks;
```


## Functions
### getHooks

Gets the hooks for the given account.


```solidity
function getHooks(address account) external view returns (VaultHooks memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account`|`address`|The account to retrieve the hooks for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`VaultHooks`|VaultHooks The hooks for the given account|


### setHooks

Sets the hooks for a winner.

*Emits a `SetHooks` event*


```solidity
function setHooks(VaultHooks calldata hooks) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`hooks`|`VaultHooks`|The hooks to set|


## Events
### SetHooks
Emitted when an account sets new hooks


```solidity
event SetHooks(address indexed account, VaultHooks hooks);
```

