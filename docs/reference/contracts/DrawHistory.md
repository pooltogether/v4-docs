The DrawHistory keeps a historical record of Draws created/pushed by DrawBeacon(s).
            Once a DrawBeacon (on mainnet) completes a RNG request, a new Draw will be added
            to the DrawHistory draws ring buffer. A DrawHistory will store a limited number
            of Draws before beginning to overwrite (managed via the cardinality) previous Draws.
            All mainnet DrawHistory(s) are updated directly from a DrawBeacon, but non-mainnet
            DrawHistory(s) (Matic, Optimism, Arbitrum, etc...) will receive a cross-chain message,
            duplicating the mainnet Draw configuration - enabling a prize savings liquidity network.

## Functions
### constructor
```solidity
  function constructor(
    address _owner,
    uint8 _cardinality
  ) public
```
Deploy DrawHistory smart contract.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_owner` | address | Address of the owner of the DrawHistory.
|`_cardinality` | uint8 | Draw ring buffer cardinality.

### getDraw
```solidity
  function getDraw(
    uint32 drawId
  ) external returns (struct DrawLib.Draw)
```
Read a Draw from the draws ring buffer.

   Read a Draw using the Draw.drawId to calculate position in the draws ring buffer.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`drawId` | uint32 | Draw.drawId


### getDraws
```solidity
  function getDraws(
    uint32[] drawIds
  ) external returns (struct DrawLib.Draw[])
```
Read multiple Draws from the draws ring buffer.

   Read multiple Draws using each Draw.drawId to calculate position in the draws ring buffer.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`drawIds` | uint32[] | Array of Draw.drawIds


### getDrawCount
```solidity
  function getDrawCount(
  ) external returns (uint32)
```
Gets the number of Draws held in the draw ring buffer.

If no Draws have been pushed, it will return 0.
If the ring buffer is full, it will return the cardinality.
Otherwise, it will return the NewestDraw index + 1.


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Number`|  | of Draws held in the draw ring buffer.
### getNewestDraw
```solidity
  function getNewestDraw(
  ) external returns (struct DrawLib.Draw)
```
Read newest Draw from the draws ring buffer.

   Uses the nextDrawIndex to calculate the most recently added Draw.



### getOldestDraw
```solidity
  function getOldestDraw(
  ) external returns (struct DrawLib.Draw)
```
Read oldest Draw from the draws ring buffer.

   Finds the oldest Draw by comparing and/or diffing totalDraws with the cardinality.



### pushDraw
```solidity
  function pushDraw(
    struct DrawLib.Draw draw
  ) external returns (uint32)
```
Push Draw onto draws ring buffer history.

   Push new draw onto draws history via authorized manager or owner.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`draw` | struct DrawLib.Draw | DrawLib.Draw


### setDraw
```solidity
  function setDraw(
    struct DrawLib.Draw newDraw
  ) external returns (uint32)
```
Set existing Draw in draws ring buffer with new parameters.

   Updating a Draw should be used sparingly and only in the event an incorrect Draw parameter has been stored.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`newDraw` | struct DrawLib.Draw | DrawLib.Draw


### manager
```solidity
  function manager(
  ) public returns (address)
```
Gets current `_manager`.



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Current`|  | `_manager` address.
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
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Boolean`| address | to indicate if the operation was successful or not.
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
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Current`|  | `_pendingOwner` address.
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
### DrawSet
```solidity
  event DrawSet(
    uint32 drawId,
    struct DrawLib.Draw draw
  )
```
Emit when a new draw has been created.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`drawId`| uint32 | Draw id
|`draw`| struct DrawLib.Draw | The Draw struct
