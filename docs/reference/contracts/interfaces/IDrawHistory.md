

## Functions
### drawIdToDrawIndex
```solidity
  function drawIdToDrawIndex(
  ) external returns (uint32)
```




### getDraws
```solidity
  function getDraws(
  ) external returns (struct DrawLib.Draw[])
```




### getDraw
```solidity
  function getDraw(
  ) external returns (struct DrawLib.Draw)
```




### pushDraw
```solidity
  function pushDraw(
  ) external returns (uint32)
```




### setDraw
```solidity
  function setDraw(
  ) external returns (uint32)
```




## Events
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
