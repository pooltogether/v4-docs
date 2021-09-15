


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
### _bufferPosition
```solidity
  function _bufferPosition(
    uint256 _nextBufferIndex,
    uint32 _deltaIndex
  ) internal returns (uint32)
```

   Calculates a ring buffer position using the next index and delta index

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_nextBufferIndex` | uint256 | Next ring buffer index 
|`_deltaIndex` | uint32 | Delta index 

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Ring`| uint256 | buffer index pointer
### _wrapCardinality
```solidity
  function _wrapCardinality(
    uint256 _index
  ) internal returns (uint32)
```

   Modulo index with ring buffer cardinality.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_index` | uint256 | Ring buffer index 

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Ring`| uint256 | buffer index pointer
### _drawIdToDrawIndex
```solidity
  function _drawIdToDrawIndex(
    uint32 _drawId
  ) internal returns (uint32)
```
Internal function to calculate draw index using the draw id.

   Use the draw id to calculate the draw index position in the draws ring buffer.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_drawId` | uint32 | Draw id

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Draw`| uint32 | index
### _getNewestDraw
```solidity
  function _getNewestDraw(
  ) internal returns (struct DrawLib.Draw)
```
Internal function to get the last draw.

   Internal function to get the last draw using the nextDrawIndex.


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Last`| uint256 | draw
### _pushDraw
```solidity
  function _pushDraw(
    struct DrawLib.Draw _newDraw
  ) internal returns (uint32)
```
Internal function to create a new draw.

   Internal function to create a new draw from an authorized manager or owner.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_newDraw` | struct DrawLib.Draw | Draw struct

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`New`| struct DrawLib.Draw | draw id
### _setDraw
```solidity
  function _setDraw(
    uint256 _drawIndex,
    struct DrawLib.Draw _newDraw
  ) internal returns (uint32)
```
Internal function to set an existing draw.

   Internal function to set an existing draw from an authorized manager or owner.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_drawIndex` | uint256 | Draw index
|`_newDraw` | struct DrawLib.Draw |   Draw struct

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Draw`| uint256 | index
