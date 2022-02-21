
Delegations are instantiated via CREATE2 through the LowLevelDelegator contract by calling `_createDelegation`.
Delegators and their representatives can then handle their delegations through this contract.

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
    address _ticket
  ) public
```
Contract constructor.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_ticket` | address | Address of the prize pool ticket

### balanceOf
```solidity
  function balanceOf(
    address _delegator
  ) public returns (uint256)
```
Returns the amount of tickets staked by a `_delegator`.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_delegator` | address | Address of the delegator

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint256 | Amount of tickets staked by the `_delegator`
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
Unstake `_amount` of tickets from this contract.

Only callable by a delegator.
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
  ) external
```
Creates a new delegation.

Callable by anyone.
The `_delegator` and `_slot` params are used to compute the salt of the delegation.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_delegator` | address | Address of the delegator that will be able to handle the delegation
|`_slot` | uint256 | Slot of the delegation
|`_delegatee` | address | Address of the delegatee
|`_lockDuration` | uint96 | Time during which the delegation cannot be updated

### updateDelegatee
```solidity
  function updateDelegatee(
    address _delegator,
    uint256 _slot,
    address _delegatee,
    uint96 _lockDuration
  ) external
```
Update a delegation `delegatee` and `amount` delegated.

Only callable by the `_delegator` or his representative.
Will revert if staked amount is less than `_amount`.
Will revert if delegation is still locked.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_delegator` | address | Address of the delegator
|`_slot` | uint256 | Slot of the delegation
|`_delegatee` | address | Address of the delegatee
|`_lockDuration` | uint96 | Time during which the delegation cannot be updated

### fundDelegation
```solidity
  function fundDelegation(
    address _delegator,
    uint256 _slot,
    uint256 _amount
  ) external
```
Fund a delegation.

Callable by anyone.
Will revert if delegation does not exist.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_delegator` | address | Address of the delegator
|`_slot` | uint256 | Slot of the delegation
|`_amount` | uint256 | Amount of tickets to delegate and send to the delegation

### fundDelegationFromStake
```solidity
  function fundDelegationFromStake(
    address _delegator,
    uint256 _slot,
    uint256 _amount
  ) external
```
Fund a delegation using `_amount` of tokens that has been staked by the `_delegator`.

Callable only by the `_delegator` or his representative.
Will revert if delegation does not exist.
Will revert if `_amount` is greater than the staked amount.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_delegator` | address | Address of the delegator
|`_slot` | uint256 | Slot of the delegation
|`_amount` | uint256 | Amount of tickets from the staked amount to send to the delegation

### withdrawDelegationToStake
```solidity
  function withdrawDelegationToStake(
    address _delegator,
    uint256 _slot,
    uint256 _amount
  ) external
```
Withdraw an amount of tickets from a delegation to this contract.

Only callable by the `_delegator` or his representative.
Will send the tickets to this contract and increase the `_delegator` staked amount.
Will revert if delegation is still locked.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_delegator` | address | Address of the delegator
|`_slot` | uint256 | Slot of the delegation
|`_amount` | uint256 | Amount of tickets to withdraw

### withdrawDelegation
```solidity
  function withdrawDelegation(
    uint256 _slot,
    uint256 _amount
  ) external
```
Withdraw an `_amount` of tickets from a delegation to the delegator wallet.

Only callable by the delegator of the delegation.
Will directly send the tickets to the delegator wallet.
Will revert if delegation is still locked.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_slot` | uint256 | Slot of the delegation
|`_amount` | uint256 | Amount to withdraw

### setRepresentative
```solidity
  function setRepresentative(
    address _representative,
    bool _set
  ) external
```
Allow a `msg.sender` to set or unset a `_representative` to handle delegation.

If `_set` is `true`, `_representative` will be set as representative of `msg.sender`.
If `_set` is `false`, `_representative` will be unset as representative of `msg.sender`.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_representative` | address | Address of the representative
|`_set` | bool | Set or unset the representative

### multicall
```solidity
  function multicall(
    bytes[] _data
  ) external returns (bytes[] results)
```
Allows a user to call multiple functions on the same contract.  Useful for EOA who want to batch transactions.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_data` | bytes[] | An array of encoded function calls.  The calls must be abi-encoded calls to this contract.

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| bytes[] | results The results from each function call
### permitAndMulticall
```solidity
  function permitAndMulticall(
    address _from,
    uint256 _amount,
    struct PermitAndMulticall.Signature _permitSignature,
    bytes[] _data
  ) external
```
Alow a user to approve ticket and run various calls in one transaction.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_from` | address | Address of the sender
|`_amount` | uint256 | Amount of tickets to approve
|`_permitSignature` | struct PermitAndMulticall.Signature | Permit signature
|`_data` | bytes[] | Datas to call with `functionDelegateCall`

### getDelegation
```solidity
  function getDelegation(
    address _staker,
    uint256 _slot
  ) external returns (address delegation, address delegatee, uint256 balance, uint256 lockUntil, bool wasCreated)
```
Allows the caller to easily get the details for a delegation.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_staker` | address | The address whose stake it is
|`_slot` | uint256 | The delegation slot they are using

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| address | delegation The address of the delegation that holds tickets
| address | delegatee The address that the position is delegating to
| uint256 | balance The balance of tickets held by the position
| uint256 | lockUntil The timestamp at which the position unlocks
| bool | wasCreated Whether or not the position has already been created
### computeDelegationAddress
```solidity
  function computeDelegationAddress(
    address _staker,
    uint256 _slot
  ) external returns (address)
```
Computes the address of the delegation for the staker + slot combination.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_staker` | address | The user who is staking tickets
|`_slot` | uint256 | The slot for which they are staking

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| address | The address of the delegation.  This is the address that holds the balance of tickets.
## Events
### TicketSet
```solidity
  event TicketSet(
    address ticket
  )
```
Emmited when ticket associated with this contract has been set.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`ticket`| address | Address of the ticket
### TicketsStaked
```solidity
  event TicketsStaked(
    address delegator,
    uint256 amount
  )
```
Emmited when tickets have been staked.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`delegator`| address | Address of the delegator
|`amount`| uint256 | Amount of tokens staked
### TicketsUnstaked
```solidity
  event TicketsUnstaked(
    address delegator,
    address recipient,
    uint256 amount
  )
```
Emmited when tickets have been unstaked.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`delegator`| address | Address of the delegator
|`recipient`| address | Address of the recipient that will receive the tickets
|`amount`| uint256 | Amount of tokens staked
### DelegationCreated
```solidity
  event DelegationCreated(
    address delegator,
    uint256 slot,
    uint256 lockUntil,
    address delegatee,
    contract Delegation delegation,
    address user
  )
```
Emmited when a new delegation is created.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`delegator`| address | Delegator of the delegation
|`slot`| uint256 | Slot of the delegation
|`lockUntil`| uint256 | Timestamp until which the delegation is locked
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
Emmited when a delegatee is updated.


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
Emmited when a delegation is funded.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`delegator`| address | Address of the delegator
|`slot`| uint256 | Slot of the delegation
|`amount`| uint256 | Amount of tokens that were sent to the delegation
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
Emmited when a delegation is funded from the staked amount.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`delegator`| address | Address of the delegator
|`slot`| uint256 | Slot of the delegation
|`amount`| uint256 | Amount of tokens that were sent to the delegation
|`user`| address | Address of the user who funded the delegation
### WithdrewDelegationToStake
```solidity
  event WithdrewDelegationToStake(
    address delegator,
    uint256 slot,
    uint256 amount,
    address user
  )
```
Emmited when an amount of tickets has been withdrawn from a delegation to this contract.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`delegator`| address | Address of the delegator
|`slot`| uint256 |  Slot of the delegation
|`amount`| uint256 | Amount of tickets withdrawn
|`user`| address | Address of the user who withdrew the tickets
### WithdrewDelegation
```solidity
  event WithdrewDelegation(
    address delegator,
    uint256 slot,
    uint256 amount
  )
```
Emmited when a delegator withdrawn an amount of tickets from a delegation to his wallet.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`delegator`| address | Address of the delegator
|`slot`| uint256 |  Slot of the delegation
|`amount`| uint256 | Amount of tickets withdrawn
### RepresentativeSet
```solidity
  event RepresentativeSet(
    address delegator,
    address representative,
    bool set
  )
```
Emmited when a representative is set.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`delegator`| address | Address of the delegator
|`representative`| address | Address of the representative
|`set`| bool | Boolean indicating if the representative was set or unset
