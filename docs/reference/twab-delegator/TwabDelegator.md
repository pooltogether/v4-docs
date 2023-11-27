[Git Source](https://github.com/GenerationSoftware/pt-v5-twab-delegator/blob/1e3f84133b9398e6986915c4d5841523e1b7b790/src/TwabDelegator.sol)



This contract allows accounts to easily delegate a portion of their Vault shares to multiple delegatees.
The delegatees chance of winning prizes is increased by the delegated amount.
If a delegator doesn't want to actively manage the delegations, then they can stake on the contract and appoint representatives.

## Events

### TwabControllerSet

```solidity
event TwabControllerSet(contract TwabController twabController)
```

Emitted when TwabController associated with this contract has been set.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| twabController | contract TwabController | Address of the TwabController |

### VaultSet

```solidity
event VaultSet(contract Vault vault)
```

Emitted when Vault associated with this contract has been set.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | contract Vault | Address of the Vault |

### VaultSharesStaked

```solidity
event VaultSharesStaked(address delegator, uint256 amount)
```

Emitted when Vault shares have been staked.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegator | address | Address of the delegator |
| amount | uint256 | Amount of Vault shares shares staked |

### VaultSharesUnstaked

```solidity
event VaultSharesUnstaked(address delegator, address recipient, uint256 amount)
```

Emitted when Vault shares have been unstaked.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegator | address | Address of the delegator |
| recipient | address | Address of the recipient that will receive the Vault shares |
| amount | uint256 | Amount of Vault shares unstaked |

### DelegationCreated

```solidity
event DelegationCreated(address delegator, uint256 slot, uint96 lockUntil, address delegatee, contract Delegation delegation, address user)
```

Emitted when a new delegation is created.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegator | address | Delegator of the delegation |
| slot | uint256 | Slot of the delegation |
| lockUntil | uint96 | Timestamp until which the delegation is locked |
| delegatee | address | Address of the delegatee |
| delegation | contract Delegation | Address of the delegation that was created |
| user | address | Address of the user who created the delegation |

### DelegateeUpdated

```solidity
event DelegateeUpdated(address delegator, uint256 slot, address delegatee, uint96 lockUntil, address user)
```

Emitted when a delegatee is updated.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegator | address | Address of the delegator |
| slot | uint256 | Slot of the delegation |
| delegatee | address | Address of the delegatee |
| lockUntil | uint96 | Timestamp until which the delegation is locked |
| user | address | Address of the user who updated the delegatee |

### DelegationFunded

```solidity
event DelegationFunded(address delegator, uint256 slot, uint256 amount, address user)
```

Emitted when a delegation is funded.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegator | address | Address of the delegator |
| slot | uint256 | Slot of the delegation |
| amount | uint256 | Amount of Vault shares that were sent to the delegation |
| user | address | Address of the user who funded the delegation |

### DelegationFundedFromStake

```solidity
event DelegationFundedFromStake(address delegator, uint256 slot, uint256 amount, address user)
```

Emitted when a delegation is funded from the staked amount.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegator | address | Address of the delegator |
| slot | uint256 | Slot of the delegation |
| amount | uint256 | Amount of Vault shares that were sent to the delegation |
| user | address | Address of the user who pulled funds from the delegator stake to the delegation |

### WithdrewDelegationToStake

```solidity
event WithdrewDelegationToStake(address delegator, uint256 slot, uint256 amount, address user)
```

Emitted when an amount of Vault shares has been withdrawn from a delegation.

_The Vault shares are held by this contract and the delegator stake is increased._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegator | address | Address of the delegator |
| slot | uint256 | Slot of the delegation |
| amount | uint256 | Amount of Vault shares withdrawn |
| user | address | Address of the user who withdrew the Vault shares |

### TransferredDelegation

```solidity
event TransferredDelegation(address delegator, uint256 slot, uint256 amount, address to)
```

Emitted when a delegator withdraws an amount of Vault shares from a delegation to a specified wallet.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegator | address | Address of the delegator |
| slot | uint256 | Slot of the delegation |
| amount | uint256 | Amount of Vault shares withdrawn |
| to | address | Recipient address of withdrawn Vault shares |

### RepresentativeSet

```solidity
event RepresentativeSet(address delegator, address representative, bool set)
```

Emitted when a representative is set.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegator | address | Address of the delegator |
| representative | address | Address of the representative |
| set | bool | Boolean indicating if the representative was set or unset |

## Variables

### MAX_LOCK

```solidity
uint256 MAX_LOCK
```

Max lock time during which a delegation cannot be updated.

## Functions

### constructor

```solidity
constructor(string name_, string symbol_, contract TwabController twabController_, contract Vault vault_) public
```

Creates a new TWAB Delegator that is bound to the given vault contract.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| name_ | string | The name for the staked vault token |
| symbol_ | string | The symbol for the staked vault token |
| twabController_ | contract TwabController | Address of the TwabController contract |
| vault_ | contract Vault | Address of the Vault contract |

### stake

```solidity
function stake(address _to, uint256 _amount) external
```

Stake `_amount` of Vault shares in this contract.

_Vault Shares can be staked on behalf of a `_to` user._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _to | address | Address to which the stake will be attributed |
| _amount | uint256 | Amount of Vault shares to stake |

### unstake

```solidity
function unstake(address _to, uint256 _amount) external
```

Unstake `_amount` of Vault shares from this contract. Transfers Vault shares to the passed `_to` address.

_If delegator has delegated his whole stake, he will first have to withdraw from a delegation to be able to unstake._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _to | address | Address of the recipient that will receive the Vault shares |
| _amount | uint256 | Amount of Vault shares to unstake |

### createDelegation

```solidity
function createDelegation(address _delegator, uint256 _slot, address _delegatee, uint96 _lockDuration) external returns (contract Delegation)
```

Creates a new delegation.
This will create a new Delegation contract for the given slot and have it delegate its Vault shares to the given delegatee.
If a non-zero lock duration is passed, then the delegatee cannot be changed, nor funding withdrawn, until the lock has expired.

_The `_delegator` and `_slot` params are used to compute the salt of the delegation_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _delegator | address | Address of the delegator that will be able to handle the delegation |
| _slot | uint256 | Slot of the delegation |
| _delegatee | address | Address of the delegatee |
| _lockDuration | uint96 | Duration of time for which the delegation is locked. Must be less than the max duration. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract Delegation | Returns the address of the Delegation contract that will hold the Vault shares |
### updateDelegatee

```solidity
function updateDelegatee(address _delegator, uint256 _slot, address _delegatee, uint96 _lockDuration) external returns (contract Delegation)
```

Updates the delegatee and lock duration for a delegation slot.

_Only callable by the `_delegator` or their representative.
Will revert if delegation is still locked._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _delegator | address | Address of the delegator |
| _slot | uint256 | Slot of the delegation |
| _delegatee | address | Address of the delegatee |
| _lockDuration | uint96 | Duration of time during which the delegatee cannot be changed nor withdrawn |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract Delegation | The address of the Delegation |
### fundDelegation

```solidity
function fundDelegation(address _delegator, uint256 _slot, uint256 _amount) external returns (contract Delegation)
```

Fund a delegation by transferring Vault shares from the caller to the delegation.

_Callable by anyone.
Will revert if delegation does not exist._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _delegator | address | Address of the delegator |
| _slot | uint256 | Slot of the delegation |
| _amount | uint256 | Amount of Vault shares to transfer |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract Delegation | The address of the Delegation |
### fundDelegationFromStake

```solidity
function fundDelegationFromStake(address _delegator, uint256 _slot, uint256 _amount) external returns (contract Delegation)
```

Fund a delegation using the `_delegator` stake.

_Callable only by the `_delegator` or a representative.
Will revert if delegation does not exist.
Will revert if `_amount` is greater than the staked amount._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _delegator | address | Address of the delegator |
| _slot | uint256 | Slot of the delegation |
| _amount | uint256 | Amount of Vault shares to send to the delegation from the staked amount |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract Delegation | The address of the Delegation |
### withdrawDelegationToStake

```solidity
function withdrawDelegationToStake(address _delegator, uint256 _slot, uint256 _amount) external returns (contract Delegation)
```

Withdraw Vault shares from a delegation. The Vault shares will be held by this contract and the delegator's stake will increase.

_Only callable by the `_delegator` or a representative.
Will send the Vault shares to this contract and increase the `_delegator` staked amount.
Will revert if delegation is still locked._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _delegator | address | Address of the delegator |
| _slot | uint256 | Slot of the delegation |
| _amount | uint256 | Amount of Vault shares to withdraw |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract Delegation | The address of the Delegation |
### transferDelegationTo

```solidity
function transferDelegationTo(uint256 _slot, uint256 _amount, address _to) external returns (contract Delegation)
```

Withdraw an `_amount` of Vault shares from a delegation. The delegator is assumed to be the caller.

_Vault Shares are sent directly to the passed `_to` address.
Will revert if delegation is still locked._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _slot | uint256 | Slot of the delegation |
| _amount | uint256 | Amount to withdraw |
| _to | address | Account to transfer the withdrawn Vault shares to |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract Delegation | The address of the Delegation |
### setRepresentative

```solidity
function setRepresentative(address _representative, bool _set) external
```

Allow an account to set or unset a `_representative` to handle delegation.

_If `_set` is `true`, `_representative` will be set as representative of `msg.sender`.
If `_set` is `false`, `_representative` will be unset as representative of `msg.sender`._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _representative | address | Address of the representative |
| _set | bool | Set or unset the representative |

### isRepresentativeOf

```solidity
function isRepresentativeOf(address _delegator, address _representative) external view returns (bool)
```

Returns whether or not the given rep is a representative of the delegator.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _delegator | address | The delegator |
| _representative | address | The representative to check for |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if the rep is a rep, false otherwise |
### multicall

```solidity
function multicall(bytes[] _data) external returns (bytes[])
```

Allows a user to call multiple functions on the same contract.  Useful for EOA who wants to batch transactions.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _data | bytes[] | An array of encoded function calls.  The calls must be abi-encoded calls to this contract. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bytes[] | The results from each function call |
### permitAndMulticall

```solidity
function permitAndMulticall(uint256 _amount, struct PermitAndMulticall.Signature _permitSignature, bytes[] _data) external
```

Alow a user to approve Vault shares and run various calls in one transaction.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _amount | uint256 | Amount of Vault shares to approve |
| _permitSignature | struct PermitAndMulticall.Signature | Permit signature |
| _data | bytes[] | Datas to call with `functionDelegateCall` |

### getDelegation

```solidity
function getDelegation(address _delegator, uint256 _slot) external view returns (contract Delegation delegation, address delegatee, uint256 balance, uint256 lockUntil, bool wasCreated)
```

Allows the caller to easily get the details for a delegation.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _delegator | address | The delegator address |
| _slot | uint256 | The delegation slot they are using |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| delegation | contract Delegation | The address that holds Vault shares for the delegation |
| delegatee | address | The address that Vault shares are being delegated to |
| balance | uint256 | The balance of Vault shares in the delegation |
| lockUntil | uint256 | The timestamp at which the delegation unlocks |
| wasCreated | bool | Whether or not the delegation has been created |
### computeDelegationAddress

```solidity
function computeDelegationAddress(address _delegator, uint256 _slot) external view returns (address)
```

Computes the address of the delegation for the delegator + slot combination.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _delegator | address | The user who is delegating Vault shares |
| _slot | uint256 | The delegation slot |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | The address of the delegation.  This is the address that holds the balance of Vault shares. |
### decimals

```solidity
function decimals() public view virtual returns (uint8)
```

Returns the ERC20 token decimals.

_This value is equal to the decimals of the Vault shares being delegated._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint8 | ERC20 token decimals |
### twabController

```solidity
function twabController() external view returns (address)
```

Returns the TwabController address.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | TwabController address |
### vault

```solidity
function vault() external view returns (address)
```

Returns the Vault address.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | Vault address |

## Structs

## Errors

