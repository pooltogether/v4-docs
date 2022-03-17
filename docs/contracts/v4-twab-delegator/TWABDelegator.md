This contract allows accounts to easily delegate a portion of their tickets to multiple delegatees.
  The delegatees chance of winning prizes is increased by the delegated amount.
  If a delegator doesn't want to actively manage the delegations, then they can stake on the contract and appoint representatives.


## Structs
### `Signature`
  - uint256 deadline
  - uint8 v
  - bytes32 r
  - bytes32 s


## Functions
### constructor
```solidity
  function constructor(
    string name_,
    string symbol_,
    contract ITicket _ticket
  ) public
```
Creates a new TWAB Delegator that is bound to the given ticket contract.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`name_` | string | The name for the staked ticket token
|`symbol_` | string | The symbol for the staked ticket token
|`_ticket` | contract ITicket | Address of the ticket contract

### stake
```solidity
  function stake(
    address _to,
    uint256 _amount
  ) external
```
Stake `_amount` of tickets in this contract.

Tickets can be staked on behalf of a `_to` user.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_to` | address | Address to which the stake will be attributed
|`_amount` | uint256 | Amount of tickets to stake

### unstake
```solidity
  function unstake(
    address _to,
    uint256 _amount
  ) external
```
Unstake `_amount` of tickets from this contract. Transfers ticket to the passed `_to` address.

If delegator has delegated his whole stake, he will first have to withdraw from a delegation to be able to unstake.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_to` | address | Address of the recipient that will receive the tickets
|`_amount` | uint256 | Amount of tickets to unstake

### createDelegation
```solidity
  function createDelegation(
    address _delegator,
    uint256 _slot,
    address _delegatee,
    uint96 _lockDuration
  ) external returns (contract Delegation)
```
Creates a new delegation.
   This will create a new Delegation contract for the given slot and have it delegate its tickets to the given delegatee.
   If a non-zero lock duration is passed, then the delegatee cannot be changed, nor funding withdrawn, until the lock has expired.

The `_delegator` and `_slot` params are used to compute the salt of the delegation

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_delegator` | address | Address of the delegator that will be able to handle the delegation
|`_slot` | uint256 | Slot of the delegation
|`_delegatee` | address | Address of the delegatee
|`_lockDuration` | uint96 | Duration of time for which the delegation is locked. Must be less than the max duration.

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| contract Delegation | Returns the address of the Delegation contract that will hold the tickets
### updateDelegatee
```solidity
  function updateDelegatee(
    address _delegator,
    uint256 _slot,
    address _delegatee,
    uint96 _lockDuration
  ) external returns (contract Delegation)
```
Updates the delegatee and lock duration for a delegation slot.

Only callable by the `_delegator` or their representative.
Will revert if delegation is still locked.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_delegator` | address | Address of the delegator
|`_slot` | uint256 | Slot of the delegation
|`_delegatee` | address | Address of the delegatee
|`_lockDuration` | uint96 | Duration of time during which the delegatee cannot be changed nor withdrawn

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| contract Delegation | The address of the Delegation
### fundDelegation
```solidity
  function fundDelegation(
    address _delegator,
    uint256 _slot,
    uint256 _amount
  ) external returns (contract Delegation)
```
Fund a delegation by transferring tickets from the caller to the delegation.

Callable by anyone.
Will revert if delegation does not exist.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_delegator` | address | Address of the delegator
|`_slot` | uint256 | Slot of the delegation
|`_amount` | uint256 | Amount of tickets to transfer

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| contract Delegation | The address of the Delegation
### fundDelegationFromStake
```solidity
  function fundDelegationFromStake(
    address _delegator,
    uint256 _slot,
    uint256 _amount
  ) external returns (contract Delegation)
```
Fund a delegation using the `_delegator` stake.

Callable only by the `_delegator` or a representative.
Will revert if delegation does not exist.
Will revert if `_amount` is greater than the staked amount.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_delegator` | address | Address of the delegator
|`_slot` | uint256 | Slot of the delegation
|`_amount` | uint256 | Amount of tickets to send to the delegation from the staked amount

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| contract Delegation | The address of the Delegation
### withdrawDelegationToStake
```solidity
  function withdrawDelegationToStake(
    address _delegator,
    uint256 _slot,
    uint256 _amount
  ) external returns (contract Delegation)
```
Withdraw tickets from a delegation. The tickets will be held by this contract and the delegator's stake will increase.

Only callable by the `_delegator` or a representative.
Will send the tickets to this contract and increase the `_delegator` staked amount.
Will revert if delegation is still locked.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_delegator` | address | Address of the delegator
|`_slot` | uint256 | Slot of the delegation
|`_amount` | uint256 | Amount of tickets to withdraw

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| contract Delegation | The address of the Delegation
### transferDelegationTo
```solidity
  function transferDelegationTo(
    uint256 _slot,
    uint256 _amount,
    address _to
  ) external returns (contract Delegation)
```
Withdraw an `_amount` of tickets from a delegation. The delegator is assumed to be the caller.

Tickets are sent directly to the passed `_to` address.
Will revert if delegation is still locked.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_slot` | uint256 | Slot of the delegation
|`_amount` | uint256 | Amount to withdraw
|`_to` | address | Account to transfer the withdrawn tickets to

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| contract Delegation | The address of the Delegation
### setRepresentative
```solidity
  function setRepresentative(
    address _representative,
    bool _set
  ) external
```
Allow an account to set or unset a `_representative` to handle delegation.

If `_set` is `true`, `_representative` will be set as representative of `msg.sender`.
If `_set` is `false`, `_representative` will be unset as representative of `msg.sender`.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_representative` | address | Address of the representative
|`_set` | bool | Set or unset the representative

### isRepresentativeOf
```solidity
  function isRepresentativeOf(
    address _delegator,
    address _representative
  ) external returns (bool)
```
Returns whether or not the given rep is a representative of the delegator.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_delegator` | address | The delegator
|`_representative` | address | The representative to check for

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| bool | True if the rep is a rep, false otherwise
### multicall
```solidity
  function multicall(
    bytes[] _data
  ) external returns (bytes[])
```
Allows a user to call multiple functions on the same contract.  Useful for EOA who wants to batch transactions.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_data` | bytes[] | An array of encoded function calls.  The calls must be abi-encoded calls to this contract.

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| bytes[] | The results from each function call
### permitAndMulticall
```solidity
  function permitAndMulticall(
    uint256 _amount,
    struct PermitAndMulticall.Signature _permitSignature,
    bytes[] _data
  ) external
```
Alow a user to approve ticket and run various calls in one transaction.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_amount` | uint256 | Amount of tickets to approve
|`_permitSignature` | struct PermitAndMulticall.Signature | Permit signature
|`_data` | bytes[] | Datas to call with `functionDelegateCall`

### getDelegation
```solidity
  function getDelegation(
    address _delegator,
    uint256 _slot
  ) external returns (contract Delegation delegation, address delegatee, uint256 balance, uint256 lockUntil, bool wasCreated)
```
Allows the caller to easily get the details for a delegation.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_delegator` | address | The delegator address
|`_slot` | uint256 | The delegation slot they are using

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| contract Delegation | delegation The address that holds tickets for the delegation
| address | delegatee The address that tickets are being delegated to
| uint256 | balance The balance of tickets in the delegation
| uint256 | lockUntil The timestamp at which the delegation unlocks
| bool | wasCreated Whether or not the delegation has been created
### computeDelegationAddress
```solidity
  function computeDelegationAddress(
    address _delegator,
    uint256 _slot
  ) external returns (address)
```
Computes the address of the delegation for the delegator + slot combination.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_delegator` | address | The user who is delegating tickets
|`_slot` | uint256 | The delegation slot

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| address | The address of the delegation.  This is the address that holds the balance of tickets.
### decimals
```solidity
  function decimals(
  ) public returns (uint8)
```
Returns the ERC20 token decimals.

This value is equal to the decimals of the ticket being delegated.


#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint8 | ERC20 token decimals
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
- `to` cannot be the zero address.
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
NOTE: If `amount` is the maximum `uint256`, the allowance is not updated on
`transferFrom`. This is semantically equivalent to an infinite approval.
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
NOTE: Does not update the allowance if the current allowance
is the maximum `uint256`.
Requirements:
- `from` and `to` cannot be the zero address.
- `from` must have a balance of at least `amount`.
- the caller must have allowance for ``from``'s tokens of at least
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
### TicketSet
```solidity
  event TicketSet(
    contract ITicket ticket
  )
```
Emitted when ticket associated with this contract has been set.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`ticket`| contract ITicket | Address of the ticket
### TicketsStaked
```solidity
  event TicketsStaked(
    address delegator,
    uint256 amount
  )
```
Emitted when tickets have been staked.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`delegator`| address | Address of the delegator
|`amount`| uint256 | Amount of tickets staked
### TicketsUnstaked
```solidity
  event TicketsUnstaked(
    address delegator,
    address recipient,
    uint256 amount
  )
```
Emitted when tickets have been unstaked.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`delegator`| address | Address of the delegator
|`recipient`| address | Address of the recipient that will receive the tickets
|`amount`| uint256 | Amount of tickets unstaked
### DelegationCreated
```solidity
  event DelegationCreated(
    address delegator,
    uint256 slot,
    uint96 lockUntil,
    address delegatee,
    contract Delegation delegation,
    address user
  )
```
Emitted when a new delegation is created.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`delegator`| address | Delegator of the delegation
|`slot`| uint256 | Slot of the delegation
|`lockUntil`| uint96 | Timestamp until which the delegation is locked
|`delegatee`| address | Address of the delegatee
|`delegation`| contract Delegation | Address of the delegation that was created
|`user`| address | Address of the user who created the delegation
### DelegateeUpdated
```solidity
  event DelegateeUpdated(
    address delegator,
    uint256 slot,
    address delegatee,
    uint96 lockUntil,
    address user
  )
```
Emitted when a delegatee is updated.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`delegator`| address | Address of the delegator
|`slot`| uint256 | Slot of the delegation
|`delegatee`| address | Address of the delegatee
|`lockUntil`| uint96 | Timestamp until which the delegation is locked
|`user`| address | Address of the user who updated the delegatee
### DelegationFunded
```solidity
  event DelegationFunded(
    address delegator,
    uint256 slot,
    uint256 amount,
    address user
  )
```
Emitted when a delegation is funded.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`delegator`| address | Address of the delegator
|`slot`| uint256 | Slot of the delegation
|`amount`| uint256 | Amount of tickets that were sent to the delegation
|`user`| address | Address of the user who funded the delegation
### DelegationFundedFromStake
```solidity
  event DelegationFundedFromStake(
    address delegator,
    uint256 slot,
    uint256 amount,
    address user
  )
```
Emitted when a delegation is funded from the staked amount.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`delegator`| address | Address of the delegator
|`slot`| uint256 | Slot of the delegation
|`amount`| uint256 | Amount of tickets that were sent to the delegation
|`user`| address | Address of the user who pulled funds from the delegator stake to the delegation
### WithdrewDelegationToStake
```solidity
  event WithdrewDelegationToStake(
    address delegator,
    uint256 slot,
    uint256 amount,
    address user
  )
```
Emitted when an amount of tickets has been withdrawn from a delegation. The tickets are held by this contract and the delegator stake is increased.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`delegator`| address | Address of the delegator
|`slot`| uint256 | Slot of the delegation
|`amount`| uint256 | Amount of tickets withdrawn
|`user`| address | Address of the user who withdrew the tickets
### TransferredDelegation
```solidity
  event TransferredDelegation(
    address delegator,
    uint256 slot,
    uint256 amount,
    address to
  )
```
Emitted when a delegator withdraws an amount of tickets from a delegation to a specified wallet.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`delegator`| address | Address of the delegator
|`slot`| uint256 |  Slot of the delegation
|`amount`| uint256 | Amount of tickets withdrawn
|`to`| address | Recipient address of withdrawn tickets
### RepresentativeSet
```solidity
  event RepresentativeSet(
    address delegator,
    address representative,
    bool set
  )
```
Emitted when a representative is set.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`delegator`| address | Address of the delegator
|`representative`| address | Address of the representative
|`set`| bool | Boolean indicating if the representative was set or unset
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

