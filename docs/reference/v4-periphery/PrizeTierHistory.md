IPrizeTierHistory is the base contract for PrizeTierHistory


## Structs
### `PrizeTier`
  - uint8 bitRangeSize
  - uint32 drawId
  - uint32 maxPicksPerUser
  - uint32 expiryDuration
  - uint32 endTimestampOffset
  - uint256 prize
  - uint32[16] tiers


## Functions
### constructor
```solidity
  function constructor(
  ) public
```




### push
```solidity
  function push(
  ) external
```




### replace
```solidity
  function replace(
  ) external
```




### popAndPush
```solidity
  function popAndPush(
  ) external returns (uint32)
```




### getPrizeTier
```solidity
  function getPrizeTier(
  ) external returns (struct IPrizeTierHistory.PrizeTier)
```




### getOldestDrawId
```solidity
  function getOldestDrawId(
  ) external returns (uint32)
```




### getNewestDrawId
```solidity
  function getNewestDrawId(
  ) external returns (uint32)
```




### getPrizeTierList
```solidity
  function getPrizeTierList(
  ) external returns (struct IPrizeTierHistory.PrizeTier[])
```




### getPrizeTierAtIndex
```solidity
  function getPrizeTierAtIndex(
  ) external returns (struct IPrizeTierHistory.PrizeTier)
```




### count
```solidity
  function count(
  ) external returns (uint256)
```




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
### PrizeTierPushed
```solidity
  event PrizeTierPushed(
    uint32 drawId,
    struct IPrizeTierHistory.PrizeTier prizeTier
  )
```
Emit when new PrizeTier is added to history


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`drawId`| uint32 |    Draw ID
|`prizeTier`| struct IPrizeTierHistory.PrizeTier | PrizeTier parameters
### PrizeTierSet
```solidity
  event PrizeTierSet(
    uint32 drawId,
    struct IPrizeTierHistory.PrizeTier prizeTier
  )
```
Emit when existing PrizeTier is updated in history


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`drawId`| uint32 |    Draw ID
|`prizeTier`| struct IPrizeTierHistory.PrizeTier | PrizeTier parameters
