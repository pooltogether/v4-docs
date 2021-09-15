

## Functions
### canStartDraw
```solidity
  function canStartDraw(
  ) external returns (bool)
```




### canCompleteDraw
```solidity
  function canCompleteDraw(
  ) external returns (bool)
```




### calculateNextBeaconPeriodStartTime
```solidity
  function calculateNextBeaconPeriodStartTime(
  ) external returns (uint256)
```




### cancelDraw
```solidity
  function cancelDraw(
  ) external
```




### completeDraw
```solidity
  function completeDraw(
  ) external
```




### beaconPeriodRemainingSeconds
```solidity
  function beaconPeriodRemainingSeconds(
  ) external returns (uint256)
```




### beaconPeriodEndAt
```solidity
  function beaconPeriodEndAt(
  ) external returns (uint256)
```




### getLastRngLockBlock
```solidity
  function getLastRngLockBlock(
  ) external returns (uint32)
```




### getLastRngRequestId
```solidity
  function getLastRngRequestId(
  ) external returns (uint32)
```




### isBeaconPeriodOver
```solidity
  function isBeaconPeriodOver(
  ) external returns (bool)
```




### isRngCompleted
```solidity
  function isRngCompleted(
  ) external returns (bool)
```




### isRngRequested
```solidity
  function isRngRequested(
  ) external returns (bool)
```




### isRngTimedOut
```solidity
  function isRngTimedOut(
  ) external returns (bool)
```




### setBeaconPeriodSeconds
```solidity
  function setBeaconPeriodSeconds(
  ) external
```




### setRngTimeout
```solidity
  function setRngTimeout(
  ) external
```




### setRngService
```solidity
  function setRngService(
  ) external
```




### startDraw
```solidity
  function startDraw(
  ) external
```




### setDrawHistory
```solidity
  function setDrawHistory(
  ) external returns (contract IDrawHistory)
```




## Events
### Initialized
```solidity
  event Initialized(
    contract IDrawHistory drawHistory,
    contract RNGInterface rng,
    uint256 rngRequestPeriodStart,
    uint256 drawPeriodSeconds
  )
```
Emit when the DrawBeacon is initialized.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`drawHistory`| contract IDrawHistory | Address of the draw history to push draws to
|`rng`| contract RNGInterface | Address of RNG service
|`rngRequestPeriodStart`| uint256 | Timestamp when draw period starts
|`drawPeriodSeconds`| uint256 | Minimum seconds between draw period
### DrawHistoryTransferred
```solidity
  event DrawHistoryTransferred(
    contract IDrawHistory previousDrawHistory,
    contract IDrawHistory newDrawHistory
  )
```
Emit when a new DrawHistory has been set.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`previousDrawHistory`| contract IDrawHistory |  The previous DrawHistory address
|`newDrawHistory`| contract IDrawHistory |       The new DrawHistory address
### BeaconPeriodStarted
```solidity
  event BeaconPeriodStarted(
    address operator,
    uint256 drawPeriodStartedAt
  )
```
Emit when a draw has opened.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`operator`| address |             User address responsible for opening draw  
|`drawPeriodStartedAt`| uint256 |  Epoch timestamp
### DrawStarted
```solidity
  event DrawStarted(
    address operator,
    uint32 rngRequestId,
    uint32 rngLockBlock
  )
```
Emit when a draw has started.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`operator`| address |      User address responsible for starting draw  
|`rngRequestId`| uint32 |  draw id
|`rngLockBlock`| uint32 |  Block when draw becomes invalid
### DrawCancelled
```solidity
  event DrawCancelled(
    address operator,
    uint32 rngRequestId,
    uint32 rngLockBlock
  )
```
Emit when a draw has been cancelled.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`operator`| address |      User address responsible for cancelling draw  
|`rngRequestId`| uint32 |  draw id
|`rngLockBlock`| uint32 |  Block when draw becomes invalid
### DrawCompleted
```solidity
  event DrawCompleted(
    address operator,
    uint256 randomNumber
  )
```
Emit when a draw has been completed.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`operator`| address |      User address responsible for completing draw  
|`randomNumber`| uint256 |  Random number generated from draw
### RngServiceUpdated
```solidity
  event RngServiceUpdated(
    contract RNGInterface rngService
  )
```
Emit when a RNG service address is set.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`rngService`| contract RNGInterface |  RNG service address
### RngTimeoutSet
```solidity
  event RngTimeoutSet(
    uint32 rngTimeout
  )
```
Emit when a draw timeout param is set.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`rngTimeout`| uint32 |  draw timeout param in seconds
### BeaconPeriodSecondsUpdated
```solidity
  event BeaconPeriodSecondsUpdated(
    uint256 drawPeriodSeconds
  )
```
Emit when the drawPeriodSeconds is set.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`drawPeriodSeconds`| uint256 | Time between draw
