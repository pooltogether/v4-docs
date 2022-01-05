OracleTimelock(s) acts as an intermediary between multiple V4 smart contracts.
            The OracleTimelock is responsible for pushing Draws to a DrawBuffer and routing
            claim requests from a PrizeDistributor to a DrawCalculator. The primary objective is
            to include a "cooldown" period for all new Draws. Allowing the correction of a
            maliciously set Draw in the unfortunate event an Owner is compromised.


## Structs
### `Timelock`
  - uint64 timestamp
  - uint32 drawId


## Functions
### constructor
```solidity
  function constructor(
    address _owner,
    contract IDrawCalculator _calculator
  ) public
```
Initialize DrawCalculatorTimelockTrigger smart contract.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_owner` | address |                       Address of the DrawCalculator owner.
|`_calculator` | contract IDrawCalculator |                 DrawCalculator address.

### calculate
```solidity
  function calculate(
    address user,
    uint32[] drawIds,
    bytes data
  ) external returns (uint256[], bytes)
```
Routes claim/calculate requests between PrizeDistributor and DrawCalculator.

   Will enforce a "cooldown" period between when a Draw is pushed and when users can start to claim prizes.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`user` | address |    User address
|`drawIds` | uint32[] | Draw.drawId
|`data` | bytes |    Encoded pick indices

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint256[] | Prizes awardable array
### lock
```solidity
  function lock(
    uint32 _drawId,
    uint64 _timestamp
  ) external returns (bool)
```
Lock passed draw id for `timelockDuration` seconds.

   Restricts new draws by forcing a push timelock.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_drawId` | uint32 | Draw id to lock.
|`_timestamp` | uint64 | Epoch timestamp to unlock the draw.

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| bool | True if operation was successful.
### getDrawCalculator
```solidity
  function getDrawCalculator(
  ) external returns (contract IDrawCalculator)
```
Read internal DrawCalculator variable.




### getTimelock
```solidity
  function getTimelock(
  ) external returns (struct IDrawCalculatorTimelock.Timelock)
```
Read internal Timelock struct.




### setTimelock
```solidity
  function setTimelock(
    struct IDrawCalculatorTimelock.Timelock _timelock
  ) external
```
Set the Timelock struct. Only callable by the contract owner.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_timelock` | struct IDrawCalculatorTimelock.Timelock | Timelock struct to set.

### hasElapsed
```solidity
  function hasElapsed(
  ) external returns (bool)
```
Returns bool for timelockDuration elapsing.



#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| bool | True if timelockDuration, since last timelock has elapsed, false otherwise.
### manager
```solidity
  function manager(
  ) public returns (address)
```
Gets current `_manager`.



#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| address | Current `_manager` address.
### setManager
```solidity
  function setManager(
    address _newManager
  ) external returns (bool)
```
Set or change of manager.

Throws if called by any account other than the owner.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_newManager` | address | New _manager address.

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| bool | Boolean to indicate if the operation was successful or not.
### owner
```solidity
  function owner(
  ) public returns (address)
```
Returns the address of the current owner.



### pendingOwner
```solidity
  function pendingOwner(
  ) external returns (address)
```
Gets current `_pendingOwner`.



#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| address | Current `_pendingOwner` address.
### renounceOwnership
```solidity
  function renounceOwnership(
  ) external
```
Renounce ownership of the contract.

Leaves the contract without owner. It will not be possible to call
`onlyOwner` functions anymore. Can only be called by the current owner.
NOTE: Renouncing ownership will leave the contract without an owner,
thereby removing any functionality that is only available to the owner.


### transferOwnership
```solidity
  function transferOwnership(
    address _newOwner
  ) external
```
Allows current owner to set the `_pendingOwner` address.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_newOwner` | address | Address to transfer ownership to.

### claimOwnership
```solidity
  function claimOwnership(
  ) external
```
Allows the `_pendingOwner` address to finalize the transfer.

This function is only callable by the `_pendingOwner`.


## Events
### Deployed
```solidity
  event Deployed(
    contract IDrawCalculator drawCalculator
  )
```
Deployed event when the constructor is called


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`drawCalculator`| contract IDrawCalculator | DrawCalculator address bound to this timelock
### ManagerTransferred
```solidity
  event ManagerTransferred(
    address previousManager,
    address newManager
  )
```

Emitted when `_manager` has been changed.

#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`previousManager`| address | previous `_manager` address.
|`newManager`| address | new `_manager` address.
### OwnershipOffered
```solidity
  event OwnershipOffered(
    address pendingOwner
  )
```

Emitted when `_pendingOwner` has been changed.

#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`pendingOwner`| address | new `_pendingOwner` address.
### OwnershipTransferred
```solidity
  event OwnershipTransferred(
    address previousOwner,
    address newOwner
  )
```

Emitted when `_owner` has been changed.

#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`previousOwner`| address | previous `_owner` address.
|`newOwner`| address | new `_owner` address.
### LockedDraw
```solidity
  event LockedDraw(
    uint32 drawId,
    uint64 timestamp
  )
```
Emitted when target draw id is locked.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`drawId`| uint32 |    Draw ID
|`timestamp`| uint64 | Block timestamp
### TimelockSet
```solidity
  event TimelockSet(
    struct IDrawCalculatorTimelock.Timelock timelock
  )
```
Emitted event when the timelock struct is updated


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`timelock`| struct IDrawCalculatorTimelock.Timelock | Timelock struct set
