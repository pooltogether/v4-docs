

## Functions
### initialize
```solidity
  function initialize(
    string _name,
    string _symbol,
    uint8 decimals_
  ) public
```
Initializes Ticket with passed parameters.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_name` | string | ERC20 ticket token name.
|`_symbol` | string | ERC20 ticket token symbol.
|`decimals_` | uint8 | ERC20 ticket token decimals.

### getAccountDetails
```solidity
  function getAccountDetails(
    address _user
  ) external returns (struct Ticket.AccountDetails)
```
Gets a users twap context.  This is a struct with their balance, next twab index, and cardinality.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_user` | address | The user for whom to fetch the TWAB context

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`| address | TWAB context, which includes { balance, nextTwabIndex, cardinality }
### getTwab
```solidity
  function getTwab(
    address _user,
    uint16 _index
  ) external returns (struct TwabLibrary.Twab)
```
Gets the TWAB at a specific index for a user.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_user` | address | The user for whom to fetch the TWAB
|`_index` | uint16 | The index of the TWAB to fetch

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`| address | TWAB, which includes the twab amount and the timestamp.
### getBalanceAt
```solidity
  function getBalanceAt(
    address _user,
    uint256 _target
  ) external returns (uint256)
```
Retrieves `_user` TWAB balance.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_user` | address | Address of the user whose TWAB is being fetched.
|`_target` | uint256 | Timestamp at which the reserved TWAB should be for.

### getAverageBalanceBetween
```solidity
  function getAverageBalanceBetween(
    address _user,
    uint256 _startTime,
    uint256 _endTime
  ) external returns (uint256)
```
Calculates the average balance held by a user for a given time frame.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_user` | address | The user whose balance is checked
|`_startTime` | uint256 | The start time of the time frame.
|`_endTime` | uint256 | The end time of the time frame.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`| address | average balance that the user held during the time frame.
### getBalancesAt
```solidity
  function getBalancesAt(
    address _user,
    uint32[] _targets
  ) external returns (uint256[])
```
Retrieves `_user` TWAB balances.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_user` | address | Address of the user whose TWABs are being fetched.
|`_targets` | uint32[] | Timestamps at which the reserved TWABs should be for.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`TWAB`| address | balances.
### getTotalSupply
```solidity
  function getTotalSupply(
    uint32 _target
  ) external returns (uint256)
```
Retrieves ticket TWAB `totalSupply`.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_target` | uint32 | Timestamp at which the reserved TWAB should be for.

### getTotalSupplies
```solidity
  function getTotalSupplies(
    uint32[] _targets
  ) external returns (uint256[])
```
Retrieves ticket TWAB `totalSupplies`.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_targets` | uint32[] | Timestamps at which the reserved TWABs should be for.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`ticket`| uint32[] | TWAB `totalSupplies`.
### delegateOf
```solidity
  function delegateOf(
  ) external returns (address)
```




### decimals
```solidity
  function decimals(
  ) public returns (uint8)
```
Returns the ERC20 ticket token decimals.

This value should be equal to the decimals of the token used to deposit into the pool.


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`uint8`|  | decimals.
### balanceOf
```solidity
  function balanceOf(
  ) public returns (uint256)
```
Returns the ERC20 ticket token balance of a ticket holder.



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`uint224`| address | `_user` ticket token balance.
### totalSupply
```solidity
  function totalSupply(
  ) public returns (uint256)
```
Returns the ERC20 ticket token total supply.



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`uint256`|  | Total supply of the ERC20 ticket token.
### delegate
```solidity
  function delegate(
  ) external
```




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
### Delegated
```solidity
  event Delegated(
  )
```



### TicketInitialized
```solidity
  event TicketInitialized(
    string name,
    string symbol,
    uint8 decimals,
    address controller
  )
```
Emitted when ticket is initialized.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`name`| string | Ticket name (eg: PoolTogether Dai Ticket (Compound)).
|`symbol`| string | Ticket symbol (eg: PcDAI).
|`decimals`| uint8 | Ticket decimals.
|`controller`| address | Token controller address.
### NewUserTwab
```solidity
  event NewUserTwab(
    address ticketHolder,
    address user,
    struct TwabLibrary.Twab newTwab
  )
```
Emitted when a new TWAB has been recorded.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`ticketHolder`| address | The Ticket holder address.
|`user`| address | The recipient of the ticket power (may be the same as the ticketHolder)
|`newTwab`| struct TwabLibrary.Twab | Updated TWAB of a ticket holder after a successful TWAB recording.
### NewTotalSupplyTwab
```solidity
  event NewTotalSupplyTwab(
    struct TwabLibrary.Twab newTotalSupplyTwab
  )
```
Emitted when a new total supply TWAB has been recorded.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`newTotalSupplyTwab`| struct TwabLibrary.Twab | Updated TWAB of tickets total supply after a successful total supply TWAB recording.
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

