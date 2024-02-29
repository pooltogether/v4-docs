[Git Source](https://github.com/GenerationSoftware/pt-v5-vault/blob/20fa85c88da69db10b7e4f1a2b1d9cc5b6bca536/src/TwabERC20.sol)

**Inherits:**
ERC20, ERC20Permit

**Author:**
G9 Software Inc.

This contract creates an ERC20 token with balances stored in a TwabController,
enabling time-weighted average balances for each depositor and token compatibility
with the PoolTogether V5 Prize Pool.

*This contract is designed to be used as an accounting layer when building a vault
for PoolTogether V5.*

*The TwabController limits all balances including total token supply to uint96 for
gas savings. Any mints that increase a balance past this limit will fail.*


## State Variables
### twabController
Address of the TwabController used to keep track of balances.


```solidity
TwabController public immutable twabController;
```


## Functions
### constructor

TwabERC20 Constructor


```solidity
constructor(string memory name_, string memory symbol_, TwabController twabController_)
    ERC20(name_, symbol_)
    ERC20Permit(name_);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`name_`|`string`|The name of the token|
|`symbol_`|`string`|The token symbol|
|`twabController_`|`TwabController`||


### balanceOf


```solidity
function balanceOf(address _account) public view virtual override(ERC20) returns (uint256);
```

### totalSupply


```solidity
function totalSupply() public view virtual override(ERC20) returns (uint256);
```

### _mint

Mints tokens to `_receiver` and increases the total supply.

*Emits a {Transfer} event with `from` set to the zero address.*

*`_receiver` cannot be the zero address.*


```solidity
function _mint(address _receiver, uint256 _amount) internal virtual override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_receiver`|`address`|Address that will receive the minted tokens|
|`_amount`|`uint256`|Tokens to mint|


### _burn

Destroys tokens from `_owner` and reduces the total supply.

*Emits a {Transfer} event with `to` set to the zero address.*

*`_owner` cannot be the zero address.*

*`_owner` must have at least `_amount` tokens.*


```solidity
function _burn(address _owner, uint256 _amount) internal virtual override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_owner`|`address`|The owner of the tokens|
|`_amount`|`uint256`|The amount of tokens to burn|


### _transfer

Transfers tokens from one account to another.

*Emits a {Transfer} event.*

*`_from` cannot be the zero address.*

*`_to` cannot be the zero address.*

*`_from` must have a balance of at least `_amount`.*


```solidity
function _transfer(address _from, address _to, uint256 _amount) internal virtual override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|Address to transfer from|
|`_to`|`address`|Address to transfer to|
|`_amount`|`uint256`|The amount of tokens to transfer|


## Errors
### TwabControllerZeroAddress
Thrown if the TwabController address is the zero address.


```solidity
error TwabControllerZeroAddress();
```

