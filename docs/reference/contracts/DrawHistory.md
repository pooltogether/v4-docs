

## Functions
### initialize
```solidity
  function initialize(
    address _manager
  ) public
```
Initialize DrawHistory smart contract.



#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_manager` | address | Draw manager address

### draws
```solidity
  function draws(
  ) external returns (struct DrawLib.Draw[256])
```
Read all draws.

   Return all draws from the draws ring buffer.


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Draws`|  | array
### drawIdToDrawIndex
```solidity
  function drawIdToDrawIndex(
    uint32 drawId
  ) external returns (uint32)
```
External function to calculate draw index using the draw id.

   Use the draw id to calculate the draw index position in the draws ring buffer.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`drawId` | uint32 | Draw id

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Draw`| uint32 | index
### getDraw
```solidity
  function getDraw(
    uint32 drawId
  ) external returns (struct DrawLib.Draw)
```
Read draw from the draws ring buffer.

   Read draw from the draws ring buffer using the draw id.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`drawId` | uint32 | Draw id

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Draw`| uint32 | struct
### getDraws
```solidity
  function getDraws(
    uint32[] drawIds
  ) external returns (struct DrawLib.Draw[])
```
Read multiple draws from the draws ring buffer.

   Read multiple draws from the draws ring buffer from an array of draw ids.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`drawIds` | uint32[] | DrawID

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`draws`| uint32[] | Draw structs
### getNewestDraw
```solidity
  function getNewestDraw(
  ) external returns (struct DrawLib.Draw)
```
External function to get the newest draw.

   External function to get the newest draw using the nextDrawIndex.


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Newest`|  | draw
### getOldestDraw
```solidity
  function getOldestDraw(
  ) external returns (struct DrawLib.Draw)
```
Function to get the oldest draw.

   Function to get the oldest draw using the totalDraws.


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Last`|  | draw
### pushDraw
```solidity
  function pushDraw(
    struct DrawLib.Draw draw
  ) external returns (uint32)
```
External function to create a new draw.

   External function to create a new draw from an authorized manager or owner.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`draw` | struct DrawLib.Draw | Draw struct

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`New`| struct DrawLib.Draw | draw id
### setDraw
```solidity
  function setDraw(
    uint256 drawIndex,
    struct DrawLib.Draw newDraw
  ) external returns (uint32)
```
External function to set an existing draw.

   External function to set an existing draw from an authorized manager or owner.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`drawIndex` | uint256 | Draw index to set
|`newDraw` | struct DrawLib.Draw |   Draw struct

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Draw`| uint256 | id
### manager
```solidity
  function manager(
  ) public returns (address)
```
Gets current _manager.

Returns current _manager address.1


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Current`|  | _manager address.
### setManager
```solidity
  function setManager(
    address _newManager
  ) public returns (bool)
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


### renounceOwnership
```solidity
  function renounceOwnership(
  ) public
```

Leaves the contract without owner. It will not be possible to call
`onlyOwner` functions anymore. Can only be called by the current owner.
NOTE: Renouncing ownership will leave the contract without an owner,
thereby removing any functionality that is only available to the owner.


### transferOwnership
```solidity
  function transferOwnership(
  ) public
```

Transfers ownership of the contract to a new account (`newOwner`).
Can only be called by the current owner.


## Events
### ManagerTransferred
```solidity
  event ManagerTransferred(
    address newManager
  )
```

Emitted when _manager has been changed.

#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`newManager`| address | new _manager address.
### OwnershipTransferred
```solidity
  event OwnershipTransferred(
  )
```



### DrawSet
```solidity
  event DrawSet(
    uint256 drawIndex,
    uint32 drawId,
    uint32 timestamp,
    uint256 winningRandomNumber
  )
```
Emit when a new draw has been created.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`drawIndex`| uint256 |    Draw index in the draws array
|`drawId`| uint32 |       Draw id
|`timestamp`| uint32 |    Epoch timestamp when the draw is created.
|`winningRandomNumber`| uint256 | Randomly generated number used to calculate draw winning numbers
