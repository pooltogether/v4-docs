ERC20 Tokens with a controller for minting & burning

## Functions
### controller
```solidity
  function controller(
  ) external returns (address)
```
Interface to the contract responsible for controlling mint/burn



### controllerMint
```solidity
  function controllerMint(
    address user,
    uint256 amount
  ) external
```
Allows the controller to mint tokens for a user account

May be overridden to provide more granular control over minting

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`user` | address | Address of the receiver of the minted tokens
|`amount` | uint256 | Amount of tokens to mint

### controllerBurn
```solidity
  function controllerBurn(
    address user,
    uint256 amount
  ) external
```
Allows the controller to burn tokens from a user account

May be overridden to provide more granular control over burning

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`user` | address | Address of the holder account to burn tokens from
|`amount` | uint256 | Amount of tokens to burn

### controllerBurnFrom
```solidity
  function controllerBurnFrom(
    address operator,
    address user,
    uint256 amount
  ) external
```
Allows an operator via the controller to burn tokens on behalf of a user account

May be overridden to provide more granular control over operator-burning

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`operator` | address | Address of the operator performing the burn action via the controller contract
|`user` | address | Address of the holder account to burn tokens from
|`amount` | uint256 | Amount of tokens to burn

### totalSupply
```solidity
  function totalSupply(
  ) external returns (uint256)
```

Returns the amount of tokens in existence.


### balanceOf
```solidity
  function balanceOf(
  ) external returns (uint256)
```

Returns the amount of tokens owned by `account`.


### transfer
```solidity
  function transfer(
  ) external returns (bool)
```

Moves `amount` tokens from the caller's account to `recipient`.
Returns a boolean value indicating whether the operation succeeded.
Emits a {Transfer} event.


### allowance
```solidity
  function allowance(
  ) external returns (uint256)
```

Returns the remaining number of tokens that `spender` will be
allowed to spend on behalf of `owner` through {transferFrom}. This is
zero by default.
This value changes when {approve} or {transferFrom} are called.


### approve
```solidity
  function approve(
  ) external returns (bool)
```

Sets `amount` as the allowance of `spender` over the caller's tokens.
Returns a boolean value indicating whether the operation succeeded.
IMPORTANT: Beware that changing an allowance with this method brings the risk
that someone may use both the old and the new allowance by unfortunate
transaction ordering. One possible solution to mitigate this race
condition is to first reduce the spender's allowance to 0 and set the
desired value afterwards:
https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
Emits an {Approval} event.


### transferFrom
```solidity
  function transferFrom(
  ) external returns (bool)
```

Moves `amount` tokens from `sender` to `recipient` using the
allowance mechanism. `amount` is then deducted from the caller's
allowance.
Returns a boolean value indicating whether the operation succeeded.
Emits a {Transfer} event.


## Events
### Initialized
```solidity
  event Initialized(
  )
```

Emitted when an instance is initialized

### Transfer
```solidity
  event Transfer(
  )
```

Emitted when `value` tokens are moved from one account (`from`) to
another (`to`).
Note that `value` may be zero.

### Approval
```solidity
  event Approval(
  )
```

Emitted when the allowance of a `spender` for an `owner` is set by
a call to {approve}. `value` is the new allowance.

