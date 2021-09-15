

## Functions
### initialize
```solidity
  function initialize(
    contract IDrawHistory _drawHistory,
    contract RNGInterface _rng,
    uint256 _beaconPeriodStart,
    uint256 _beaconPeriodSeconds
  ) public
```
Initialize the DrawBeacon smart contract.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_drawHistory` | contract IDrawHistory | The address of the draw history to push draws to
|`_rng` | contract RNGInterface | The RNG service to use
|`_beaconPeriodStart` | uint256 | The starting timestamp of the beacon period.
|`_beaconPeriodSeconds` | uint256 | The duration of the beacon period in seconds

### isRngCompleted
```solidity
  function isRngCompleted(
  ) public returns (bool)
```
Returns whether the random number request has completed.



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`True`|  | if a random number request has completed, false otherwise.
### isRngRequested
```solidity
  function isRngRequested(
  ) public returns (bool)
```
Returns whether a random number has been requested



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`True`|  | if a random number has been requested, false otherwise.
### isRngTimedOut
```solidity
  function isRngTimedOut(
  ) public returns (bool)
```
Returns whether the random number request has timed out.



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`True`|  | if a random number request has timed out, false otherwise.
### canStartDraw
```solidity
  function canStartDraw(
  ) external returns (bool)
```
Returns whether an draw request can be started.



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`True`|  | if a draw can be started, false otherwise.
### canCompleteDraw
```solidity
  function canCompleteDraw(
  ) external returns (bool)
```
Returns whether an draw request can be completed.



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`True`|  | if a draw can be completed, false otherwise.
### calculateNextBeaconPeriodStartTime
```solidity
  function calculateNextBeaconPeriodStartTime(
    uint256 currentTime
  ) external returns (uint256)
```
Calculates when the next beacon period will start.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`currentTime` | uint256 | The timestamp to use as the current time

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`| uint256 | timestamp at which the next beacon period would start
### cancelDraw
```solidity
  function cancelDraw(
  ) external
```
Can be called by anyone to cancel the draw request if the RNG has timed out.



### completeDraw
```solidity
  function completeDraw(
  ) external
```
Completes the draw request and creates a new draw.

   Completes the draw request, creates a new draw on the DrawHistory and reset beacon period start.



### beaconPeriodRemainingSeconds
```solidity
  function beaconPeriodRemainingSeconds(
  ) external returns (uint256)
```
Returns the number of seconds remaining until the beacon period can be complete.



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | number of seconds remaining until the beacon period can be complete.
### beaconPeriodEndAt
```solidity
  function beaconPeriodEndAt(
  ) external returns (uint256)
```
Returns the timestamp at which the beacon period ends



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | timestamp at which the beacon period ends.
### getLastRngLockBlock
```solidity
  function getLastRngLockBlock(
  ) external returns (uint32)
```
Returns the block number that the current RNG request has been locked to.



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | block number that the RNG request is locked to
### getLastRngRequestId
```solidity
  function getLastRngRequestId(
  ) external returns (uint32)
```
Returns the current RNG Request ID.



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | current Request ID
### isBeaconPeriodOver
```solidity
  function isBeaconPeriodOver(
  ) external returns (bool)
```
Returns whether the beacon period is over



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`True`|  | if the beacon period is over, false otherwise
### setDrawHistory
```solidity
  function setDrawHistory(
    contract IDrawHistory newDrawHistory
  ) external returns (contract IDrawHistory)
```
External function to set DrawHistory.

   External function to set DrawHistory from an authorized manager.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`newDrawHistory` | contract IDrawHistory | DrawHistory address


### startDraw
```solidity
  function startDraw(
  ) external
```
Starts the award process by starting random number request.  The beacon period must have ended.

The RNG-Request-Fee is expected to be held within this contract before calling this function


### setBeaconPeriodSeconds
```solidity
  function setBeaconPeriodSeconds(
    uint256 beaconPeriodSeconds
  ) external
```
Allows the owner to set the beacon period in seconds.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`beaconPeriodSeconds` | uint256 | The new beacon period in seconds.  Must be greater than zero.

### setRngTimeout
```solidity
  function setRngTimeout(
    uint32 _rngTimeout
  ) external
```
Allows the owner to set the RNG request timeout in seconds. This is the time that must elapsed before the RNG request can be cancelled and the pool unlocked.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_rngTimeout` | uint32 | The RNG request timeout in seconds.

### setRngService
```solidity
  function setRngService(
    contract RNGInterface rngService
  ) external
```
Sets the RNG service that the Prize Strategy is connected to


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`rngService` | contract RNGInterface | The address of the new RNG service interface

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
### OwnershipTransferred
```solidity
  event OwnershipTransferred(
  )
```



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
