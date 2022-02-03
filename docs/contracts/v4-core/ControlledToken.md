 ERC20 Tokens with a controller for minting & burning




## Functions
### constructor
```solidity
  function constructor(
    string _name,
    string _symbol,
    uint8 decimals_,
    address _controller
  ) public
```
Deploy the Controlled Token with Token Details and the Controller


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_name` | string | The name of the Token
|`_symbol` | string | The symbol for the Token
|`decimals_` | uint8 | The number of decimals for the Token
|`_controller` | address | Address of the Controller contract for minting & burning

### controllerMint
```solidity
  function controllerMint(
    address _user,
    uint256 _amount
  ) external
```
Allows the controller to mint tokens for a user account

May be overridden to provide more granular control over minting

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_user` | address | Address of the receiver of the minted tokens
|`_amount` | uint256 | Amount of tokens to mint

### controllerBurn
```solidity
  function controllerBurn(
    address _user,
    uint256 _amount
  ) external
```
Allows the controller to burn tokens from a user account

May be overridden to provide more granular control over burning

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_user` | address | Address of the holder account to burn tokens from
|`_amount` | uint256 | Amount of tokens to burn

### controllerBurnFrom
```solidity
  function controllerBurnFrom(
    address _operator,
    address _user,
    uint256 _amount
  ) external
```
Allows an operator via the controller to burn tokens on behalf of a user account

May be overridden to provide more granular control over operator-burning

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_operator` | address | Address of the operator performing the burn action via the controller contract
|`_user` | address | Address of the holder account to burn tokens from
|`_amount` | uint256 | Amount of tokens to burn

### decimals
```solidity
  function decimals(
  ) public returns (uint8)
```
Returns the ERC20 controlled token decimals.

This value should be equal to the decimals of the token used to deposit into the pool.


#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint8 | uint8 decimals.
### controller
```solidity
  function controller(
  ) external returns (address)
```
Interface to the contract responsible for controlling mint/burn



### permit
```solidity
  function permit(
  ) public
```

See {IERC20Permit-permit}.


### nonces
```solidity
  function nonces(
  ) public returns (uint256)
```

See {IERC20Permit-nonces}.


### DOMAIN_SEPARATOR
```solidity
  function DOMAIN_SEPARATOR(
  ) external returns (bytes32)
```

See {IERC20Permit-DOMAIN_SEPARATOR}.


### name
```solidity
  function name(
  ) public returns (string)
```

Returns the name of the token.


### symbol
```solidity
  function symbol(
  ) public returns (string)
```

Returns the symbol of the token, usually a shorter version of the
name.


### totalSupply
```solidity
  function totalSupply(
  ) public returns (uint256)
```

See {IERC20-totalSupply}.


### balanceOf
```solidity
  function balanceOf(
  ) public returns (uint256)
```

See {IERC20-balanceOf}.


### transfer
```solidity
  function transfer(
  ) public returns (bool)
```

See {IERC20-transfer}.
Requirements:
- `recipient` cannot be the zero address.
- the caller must have a balance of at least `amount`.


### allowance
```solidity
  function allowance(
  ) public returns (uint256)
```

See {IERC20-allowance}.


### approve
```solidity
  function approve(
  ) public returns (bool)
```

See {IERC20-approve}.
Requirements:
- `spender` cannot be the zero address.


### transferFrom
```solidity
  function transferFrom(
  ) public returns (bool)
```

See {IERC20-transferFrom}.
Emits an {Approval} event indicating the updated allowance. This is not
required by the EIP. See the note at the beginning of {ERC20}.
Requirements:
- `sender` and `recipient` cannot be the zero address.
- `sender` must have a balance of at least `amount`.
- the caller must have allowance for ``sender``'s tokens of at least
`amount`.


### increaseAllowance
```solidity
  function increaseAllowance(
  ) public returns (bool)
```

Atomically increases the allowance granted to `spender` by the caller.
This is an alternative to {approve} that can be used as a mitigation for
problems described in {IERC20-approve}.
Emits an {Approval} event indicating the updated allowance.
Requirements:
- `spender` cannot be the zero address.


### decreaseAllowance
```solidity
  function decreaseAllowance(
  ) public returns (bool)
```

Atomically decreases the allowance granted to `spender` by the caller.
This is an alternative to {approve} that can be used as a mitigation for
problems described in {IERC20-approve}.
Emits an {Approval} event indicating the updated allowance.
Requirements:
- `spender` cannot be the zero address.
- `spender` must have allowance for the caller of at least
`subtractedValue`.


## Events
### Deployed
```solidity
  event Deployed(
  )
```

Emitted when contract is deployed

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

