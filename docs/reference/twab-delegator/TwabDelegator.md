[Git Source](https://github.com/GenerationSoftware/pt-v5-twab-delegator/blob/62d5cf5702bea2c4f4436d830b0843d739bc3817/src/TwabDelegator.sol)

**Inherits:**
ERC20, [LowLevelDelegator](./LowLevelDelegator.md), [PermitAndMulticall](./PermitAndMulticall.md)

This contract allows accounts to easily delegate a portion of their Vault shares to multiple delegatees.
The delegatees chance of winning prizes is increased by the delegated amount.
If a delegator doesn't want to actively manage the delegations, then they can stake on the contract and appoint representatives.


## State Variables
### _vault
Vault to which this contract is tied to.


```solidity
IERC20 private immutable _vault;
```


### _twabController
TwabController to which this contract is tied to.


```solidity
TwabController private immutable _twabController;
```


### MAX_LOCK
Max lock time during which a delegation cannot be updated.


```solidity
uint256 public constant MAX_LOCK = 180 days;
```


### representatives
Representative elected by the delegator to handle delegation.

*Representative can only handle delegation and cannot withdraw Vault shares to their wallet.*

*delegator => representative => bool allowing representative to represent the delegator*


```solidity
mapping(address => mapping(address => bool)) internal representatives;
```


## Functions
### constructor

Creates a new TWAB Delegator that is bound to the given vault contract.


```solidity
constructor(string memory name_, string memory symbol_, TwabController twabController_, IERC20 vault_)
    LowLevelDelegator()
    ERC20(name_, symbol_);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`name_`|`string`|The name for the staked vault token|
|`symbol_`|`string`|The symbol for the staked vault token|
|`twabController_`|`TwabController`|Address of the TwabController contract|
|`vault_`|`IERC20`|Address of the Vault contract|


### stake

Stake `_amount` of Vault shares in this contract.

*Vault Shares can be staked on behalf of a `_to` user.*


```solidity
function stake(address _to, uint256 _amount) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_to`|`address`|Address to which the stake will be attributed|
|`_amount`|`uint256`|Amount of Vault shares to stake|


### unstake

Unstake `_amount` of Vault shares from this contract. Transfers Vault shares to the passed `_to` address.

*If delegator has delegated his whole stake, he will first have to withdraw from a delegation to be able to unstake.*


```solidity
function unstake(address _to, uint256 _amount) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_to`|`address`|Address of the recipient that will receive the Vault shares|
|`_amount`|`uint256`|Amount of Vault shares to unstake|


### createDelegation

Creates a new delegation.
This will create a new Delegation contract for the given slot and have it delegate its Vault shares to the given delegatee.
If a non-zero lock duration is passed, then the delegatee cannot be changed, nor funding withdrawn, until the lock has expired.

*The `_delegator` and `_slot` params are used to compute the salt of the delegation*


```solidity
function createDelegation(address _delegator, uint256 _slot, address _delegatee, uint96 _lockDuration)
    external
    returns (Delegation);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_delegator`|`address`|Address of the delegator that will be able to handle the delegation|
|`_slot`|`uint256`|Slot of the delegation|
|`_delegatee`|`address`|Address of the delegatee|
|`_lockDuration`|`uint96`|Duration of time for which the delegation is locked. Must be less than the max duration.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Delegation`|Returns the address of the Delegation contract that will hold the Vault shares|


### updateDelegatee

Updates the delegatee and lock duration for a delegation slot.

*Only callable by the `_delegator` or their representative.*

*Will revert if delegation is still locked.*


```solidity
function updateDelegatee(address _delegator, uint256 _slot, address _delegatee, uint96 _lockDuration)
    external
    returns (Delegation);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_delegator`|`address`|Address of the delegator|
|`_slot`|`uint256`|Slot of the delegation|
|`_delegatee`|`address`|Address of the delegatee|
|`_lockDuration`|`uint96`|Duration of time during which the delegatee cannot be changed nor withdrawn|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Delegation`|The address of the Delegation|


### fundDelegation

Fund a delegation by transferring Vault shares from the caller to the delegation.

*Callable by anyone.*

*Will revert if delegation does not exist.*


```solidity
function fundDelegation(address _delegator, uint256 _slot, uint256 _amount) external returns (Delegation);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_delegator`|`address`|Address of the delegator|
|`_slot`|`uint256`|Slot of the delegation|
|`_amount`|`uint256`|Amount of Vault shares to transfer|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Delegation`|The address of the Delegation|


### fundDelegationFromStake

Fund a delegation using the `_delegator` stake.

*Callable only by the `_delegator` or a representative.*

*Will revert if delegation does not exist.*

*Will revert if `_amount` is greater than the staked amount.*


```solidity
function fundDelegationFromStake(address _delegator, uint256 _slot, uint256 _amount) external returns (Delegation);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_delegator`|`address`|Address of the delegator|
|`_slot`|`uint256`|Slot of the delegation|
|`_amount`|`uint256`|Amount of Vault shares to send to the delegation from the staked amount|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Delegation`|The address of the Delegation|


### withdrawDelegationToStake

Withdraw Vault shares from a delegation. The Vault shares will be held by this contract and the delegator's stake will increase.

*Only callable by the `_delegator` or a representative.*

*Will send the Vault shares to this contract and increase the `_delegator` staked amount.*

*Will revert if delegation is still locked.*


```solidity
function withdrawDelegationToStake(address _delegator, uint256 _slot, uint256 _amount) external returns (Delegation);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_delegator`|`address`|Address of the delegator|
|`_slot`|`uint256`|Slot of the delegation|
|`_amount`|`uint256`|Amount of Vault shares to withdraw|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Delegation`|The address of the Delegation|


### transferDelegationTo

Withdraw an `_amount` of Vault shares from a delegation. The delegator is assumed to be the caller.

*Vault Shares are sent directly to the passed `_to` address.*

*Will revert if delegation is still locked.*


```solidity
function transferDelegationTo(uint256 _slot, uint256 _amount, address _to) external returns (Delegation);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_slot`|`uint256`|Slot of the delegation|
|`_amount`|`uint256`|Amount to withdraw|
|`_to`|`address`|Account to transfer the withdrawn Vault shares to|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Delegation`|The address of the Delegation|


### setRepresentative

Allow an account to set or unset a `_representative` to handle delegation.

*If `_set` is `true`, `_representative` will be set as representative of `msg.sender`.*

*If `_set` is `false`, `_representative` will be unset as representative of `msg.sender`.*


```solidity
function setRepresentative(address _representative, bool _set) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_representative`|`address`|Address of the representative|
|`_set`|`bool`|Set or unset the representative|


### isRepresentativeOf

Returns whether or not the given rep is a representative of the delegator.


```solidity
function isRepresentativeOf(address _delegator, address _representative) external view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_delegator`|`address`|The delegator|
|`_representative`|`address`|The representative to check for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the rep is a rep, false otherwise|


### multicall

Allows a user to call multiple functions on the same contract.  Useful for EOA who wants to batch transactions.


```solidity
function multicall(bytes[] calldata _data) external returns (bytes[] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_data`|`bytes[]`|An array of encoded function calls.  The calls must be abi-encoded calls to this contract.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes[]`|The results from each function call|


### permitAndMulticall

Alow a user to approve Vault shares and run various calls in one transaction.


```solidity
function permitAndMulticall(uint256 _amount, Signature calldata _permitSignature, bytes[] calldata _data) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_amount`|`uint256`|Amount of Vault shares to approve|
|`_permitSignature`|`Signature`|Permit signature|
|`_data`|`bytes[]`|Datas to call with `functionDelegateCall`|


### getDelegation

Allows the caller to easily get the details for a delegation.


```solidity
function getDelegation(address _delegator, uint256 _slot)
    external
    view
    returns (Delegation delegation, address delegatee, uint256 balance, uint256 lockUntil, bool wasCreated);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_delegator`|`address`|The delegator address|
|`_slot`|`uint256`|The delegation slot they are using|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`delegation`|`Delegation`|The address that holds Vault shares for the delegation|
|`delegatee`|`address`|The address that Vault shares are being delegated to|
|`balance`|`uint256`|The balance of Vault shares in the delegation|
|`lockUntil`|`uint256`|The timestamp at which the delegation unlocks|
|`wasCreated`|`bool`|Whether or not the delegation has been created|


### computeDelegationAddress

Computes the address of the delegation for the delegator + slot combination.


```solidity
function computeDelegationAddress(address _delegator, uint256 _slot) external view returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_delegator`|`address`|The user who is delegating Vault shares|
|`_slot`|`uint256`|The delegation slot|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the delegation.  This is the address that holds the balance of Vault shares.|


### decimals

Returns the ERC20 token decimals.

*This value is equal to the decimals of the Vault shares being delegated.*


```solidity
function decimals() public view virtual override returns (uint8);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint8`|ERC20 token decimals|


### twabController

Returns the TwabController address.


```solidity
function twabController() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|TwabController address|


### vault

Returns the Vault address.


```solidity
function vault() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|Vault address|


### _computeAddress

Computes the address of a delegation contract using the delegator and slot as a salt.
The contract is a clone, also known as minimal proxy contract.


```solidity
function _computeAddress(address _delegator, uint256 _slot) internal view returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_delegator`|`address`|Address of the delegator|
|`_slot`|`uint256`|Slot of the delegation|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|Address at which the delegation contract will be deployed|


### _computeLockUntil

Computes the timestamp at which the delegation unlocks, after which the delegatee can be changed and Vault shares withdrawn.


```solidity
function _computeLockUntil(uint96 _lockDuration) internal view returns (uint96);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_lockDuration`|`uint96`|The duration of the lock|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint96`|The lock expiration timestamp|


### _setDelegateeCall

Delegates Vault shares from the `_delegation` contract to the `_delegatee` address.


```solidity
function _setDelegateeCall(Delegation _delegation, address _delegatee) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_delegation`|`Delegation`|Address of the delegation contract|
|`_delegatee`|`address`|Address of the delegatee|


### _transferCall

Tranfers Vault shares from the Delegation contract to the `_to` address.


```solidity
function _transferCall(Delegation _delegation, address _to, uint256 _amount) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_delegation`|`Delegation`|Address of the delegation contract|
|`_to`|`address`|Address of the recipient|
|`_amount`|`uint256`|Amount of Vault shares to transfer|


### _executeCall

Execute a function call on the delegation contract.


```solidity
function _executeCall(Delegation _delegation, address _to, bytes memory _data) internal returns (bytes[] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_delegation`|`Delegation`|Address of the delegation contract|
|`_to`|`address`|The address that will be called|
|`_data`|`bytes`|The call data that will be executed|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes[]`|The return datas from the calls|


### _transfer

Transfers Vault shares from a delegation contract to `_to`.


```solidity
function _transfer(Delegation _delegation, address _to, uint256 _amount) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_delegation`|`Delegation`|Address of the delegation contract|
|`_to`|`address`|Address of the recipient|
|`_amount`|`uint256`|Amount of Vault shares to transfer|


### _requireDelegatorOrRepresentative

Require to only allow the delegator or representative to call a function.


```solidity
function _requireDelegatorOrRepresentative(address _delegator) internal view;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_delegator`|`address`|Address of the delegator|


### _requireDelegateeNotZeroAddress

Require to verify that `_delegatee` is not address zero.


```solidity
function _requireDelegateeNotZeroAddress(address _delegatee) internal pure;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_delegatee`|`address`|Address of the delegatee|


### _requireAmountGtZero

Require to verify that `_amount` is greater than 0.


```solidity
function _requireAmountGtZero(uint256 _amount) internal pure;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_amount`|`uint256`|Amount to check|


### _requireRecipientNotZeroAddress

Require to verify that `_to` is not address zero.


```solidity
function _requireRecipientNotZeroAddress(address _to) internal pure;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_to`|`address`|Address to check|


### _requireDelegationUnlocked

Require to verify if a `_delegation` is locked.


```solidity
function _requireDelegationUnlocked(Delegation _delegation) internal view;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_delegation`|`Delegation`|Delegation to check|


### _requireLockDuration

Require to verify that a `_lockDuration` does not exceed the maximum lock duration.


```solidity
function _requireLockDuration(uint256 _lockDuration) internal pure;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_lockDuration`|`uint256`|Lock duration to check|


## Events
### TwabControllerSet
Emitted when TwabController associated with this contract has been set.


```solidity
event TwabControllerSet(TwabController indexed twabController);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`twabController`|`TwabController`|Address of the TwabController|

### VaultSet
Emitted when Vault associated with this contract has been set.


```solidity
event VaultSet(IERC20 indexed vault);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`IERC20`|Address of the Vault|

### VaultSharesStaked
Emitted when Vault shares have been staked.


```solidity
event VaultSharesStaked(address indexed delegator, uint256 amount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`delegator`|`address`|Address of the delegator|
|`amount`|`uint256`|Amount of Vault shares shares staked|

### VaultSharesUnstaked
Emitted when Vault shares have been unstaked.


```solidity
event VaultSharesUnstaked(address indexed delegator, address indexed recipient, uint256 amount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`delegator`|`address`|Address of the delegator|
|`recipient`|`address`|Address of the recipient that will receive the Vault shares|
|`amount`|`uint256`|Amount of Vault shares unstaked|

### DelegationCreated
Emitted when a new delegation is created.


```solidity
event DelegationCreated(
    address indexed delegator,
    uint256 indexed slot,
    uint96 lockUntil,
    address indexed delegatee,
    Delegation delegation,
    address user
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`delegator`|`address`|Delegator of the delegation|
|`slot`|`uint256`|Slot of the delegation|
|`lockUntil`|`uint96`|Timestamp until which the delegation is locked|
|`delegatee`|`address`|Address of the delegatee|
|`delegation`|`Delegation`|Address of the delegation that was created|
|`user`|`address`|Address of the user who created the delegation|

### DelegateeUpdated
Emitted when a delegatee is updated.


```solidity
event DelegateeUpdated(
    address indexed delegator, uint256 indexed slot, address indexed delegatee, uint96 lockUntil, address user
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`delegator`|`address`|Address of the delegator|
|`slot`|`uint256`|Slot of the delegation|
|`delegatee`|`address`|Address of the delegatee|
|`lockUntil`|`uint96`|Timestamp until which the delegation is locked|
|`user`|`address`|Address of the user who updated the delegatee|

### DelegationFunded
Emitted when a delegation is funded.


```solidity
event DelegationFunded(address indexed delegator, uint256 indexed slot, uint256 amount, address indexed user);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`delegator`|`address`|Address of the delegator|
|`slot`|`uint256`|Slot of the delegation|
|`amount`|`uint256`|Amount of Vault shares that were sent to the delegation|
|`user`|`address`|Address of the user who funded the delegation|

### DelegationFundedFromStake
Emitted when a delegation is funded from the staked amount.


```solidity
event DelegationFundedFromStake(address indexed delegator, uint256 indexed slot, uint256 amount, address indexed user);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`delegator`|`address`|Address of the delegator|
|`slot`|`uint256`|Slot of the delegation|
|`amount`|`uint256`|Amount of Vault shares that were sent to the delegation|
|`user`|`address`|Address of the user who pulled funds from the delegator stake to the delegation|

### WithdrewDelegationToStake
Emitted when an amount of Vault shares has been withdrawn from a delegation.

*The Vault shares are held by this contract and the delegator stake is increased.*


```solidity
event WithdrewDelegationToStake(address indexed delegator, uint256 indexed slot, uint256 amount, address indexed user);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`delegator`|`address`|Address of the delegator|
|`slot`|`uint256`|Slot of the delegation|
|`amount`|`uint256`|Amount of Vault shares withdrawn|
|`user`|`address`|Address of the user who withdrew the Vault shares|

### TransferredDelegation
Emitted when a delegator withdraws an amount of Vault shares from a delegation to a specified wallet.


```solidity
event TransferredDelegation(address indexed delegator, uint256 indexed slot, uint256 amount, address indexed to);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`delegator`|`address`|Address of the delegator|
|`slot`|`uint256`| Slot of the delegation|
|`amount`|`uint256`|Amount of Vault shares withdrawn|
|`to`|`address`|Recipient address of withdrawn Vault shares|

### RepresentativeSet
Emitted when a representative is set.


```solidity
event RepresentativeSet(address indexed delegator, address indexed representative, bool set);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`delegator`|`address`|Address of the delegator|
|`representative`|`address`|Address of the representative|
|`set`|`bool`|Boolean indicating if the representative was set or unset|

