The Ticket extends the standard ERC20 and ControlledToken interfaces with time-weighed average balance functionality.
            The TWAB (time-weighed average balance) enables contract-to-contract lookups of a user's average balance
            between timestamps. The timestamp/balance checkpoints are stored in a ring buffer for each user Account.
            Historical searches of a TWAB(s) are limited to the storage of these checkpoints. A user's average balance can
            be delegated to an alternative address. When delegating the average weighted balance is added to the delegatee
            TWAB lookup and removed from the delegaters TWAB lookup.

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
Constructs Ticket with passed parameters.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_name` | string | ERC20 ticket token name.
|`_symbol` | string | ERC20 ticket token symbol.
|`decimals_` | uint8 | ERC20 ticket token decimals.
|`_controller` | address | ERC20 ticket controller address (ie: Prize Pool address).

### getAccountDetails
```solidity
  function getAccountDetails(
    address user
  ) external returns (struct TwabLib.AccountDetails)
```
Gets a users twab context.  This is a struct with their balance, next twab index, and cardinality.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`user` | address | The user for whom to fetch the TWAB context

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`| address | TWAB context, which includes { balance, nextTwabIndex, cardinality }
### getTwab
```solidity
  function getTwab(
    address user,
    uint16 index
  ) external returns (struct ObservationLib.Observation)
```
Gets the TWAB at a specific index for a user.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`user` | address | The user for whom to fetch the TWAB
|`index` | uint16 | The index of the TWAB to fetch

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`| address | TWAB, which includes the twab amount and the timestamp.
### getBalanceAt
```solidity
  function getBalanceAt(
    address user,
    uint256 timestamp
  ) external returns (uint256)
```
Retrieves `_user` TWAB balance.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`user` | address | Address of the user whose TWAB is being fetched.
|`timestamp` | uint256 | Timestamp at which the reserved TWAB should be for.

### getAverageBalancesBetween
```solidity
  function getAverageBalancesBetween(
    address user,
    uint32[] startTimes,
    uint32[] endTimes
  ) external returns (uint256[])
```
Calculates the average balance held by a user for a given time frame.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`user` | address | The user whose balance is checked
|`startTimes` | uint32[] | The start time of the time frame.
|`endTimes` | uint32[] | The end time of the time frame.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`| address | average balance that the user held during the time frame.
### getAverageTotalSuppliesBetween
```solidity
  function getAverageTotalSuppliesBetween(
    uint32[] startTimes,
    uint32[] endTimes
  ) external returns (uint256[])
```
Calculates the average total supply balance for a set of given time frames.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`startTimes` | uint32[] | Array of start times
|`endTimes` | uint32[] | Array of end times

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`| uint32[] | average total supplies held during the time frame.
### getAverageBalanceBetween
```solidity
  function getAverageBalanceBetween(
    address user,
    uint256 startTime,
    uint256 endTime
  ) external returns (uint256)
```
Calculates the average balance held by a user for a given time frame.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`user` | address | The user whose balance is checked
|`startTime` | uint256 | The start time of the time frame.
|`endTime` | uint256 | The end time of the time frame.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`| address | average balance that the user held during the time frame.
### getBalancesAt
```solidity
  function getBalancesAt(
    address user,
    uint32[] timestamps
  ) external returns (uint256[])
```
Retrieves `_user` TWAB balances.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`user` | address | Address of the user whose TWABs are being fetched.
|`timestamps` | uint32[] | Timestamps at which the reserved TWABs should be for.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`TWAB`| address | balances.
### getTotalSupplyAt
```solidity
  function getTotalSupplyAt(
    uint32 timestamp
  ) external returns (uint256)
```
Calculates the average total supply balance for a set of a given time frame.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`timestamp` | uint32 | Timestamp


### getTotalSuppliesAt
```solidity
  function getTotalSuppliesAt(
    uint32[] timestamps
  ) external returns (uint256[])
```
Calculates the average total supply balance for a set of a given time frame.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`timestamps` | uint32[] | Timestamp


### delegateOf
```solidity
  function delegateOf(
    address user
  ) external returns (address)
```
ADD DOCS


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`user` | address | Address

### balanceOf
```solidity
  function balanceOf(
  ) public returns (uint256)
```

Returns the amount of tokens owned by `account`.


### totalSupply
```solidity
  function totalSupply(
  ) public returns (uint256)
```

Returns the amount of tokens in existence.


### delegate
```solidity
  function delegate(
    address to
  ) external
```
Delegate time-weighted average balances to an alternative address.

   Transfers (including mints) trigger the storage of a TWAB in delegatee(s) account, instead of the
              targetted sender and/or recipient address(s).
   "to" reset the delegatee use zero address (0x000.000)
Current delegate address should be different from the new delegate address `to`.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`to` | address | Receipient of delegated TWAB.

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
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`uint8`|  | decimals.
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
    struct ObservationLib.Observation newTwab
  )
```
Emitted when a new TWAB has been recorded.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`ticketHolder`| address | The Ticket holder address.
|`user`| address | The recipient of the ticket power (may be the same as the ticketHolder)
|`newTwab`| struct ObservationLib.Observation | Updated TWAB of a ticket holder after a successful TWAB recording.
### NewTotalSupplyTwab
```solidity
  event NewTotalSupplyTwab(
    struct ObservationLib.Observation newTotalSupplyTwab
  )
```
Emitted when a new total supply TWAB has been recorded.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`newTotalSupplyTwab`| struct ObservationLib.Observation | Updated TWAB of tickets total supply after a successful total supply TWAB recording.
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

