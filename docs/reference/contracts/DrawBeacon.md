Manages RNG (random number generator) requests and pushing Draws onto DrawHistory.
            The DrawBeacon has 3 major phases for requesting a random number: start, cancel and complete.
            Once the complete phase is executed a new Draw (using nextDrawId) is pushed to the currently
            set DrawHistory smart contracts. If the RNG service requires payment (i.e. ChainLink) the DrawBeacon
            should have an available balance to cover the fees associated with random number generation.

## Functions
### constructor
```solidity
  function constructor(
    address _owner,
    contract IDrawHistory _drawHistory,
    contract RNGInterface _rng,
    uint32 _nextDrawId,
    uint64 _beaconPeriodStart,
    uint32 _beaconPeriodSeconds
  ) public
```
Deploy the DrawBeacon smart contract.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_owner` | address | Address of the DrawBeacon owner
|`_drawHistory` | contract IDrawHistory | The address of the draw history to push draws to
|`_rng` | contract RNGInterface | The RNG service to use
|`_nextDrawId` | uint32 | Draw ID at which the DrawBeacon should start. Can't be inferior to 1.
|`_beaconPeriodStart` | uint64 | The starting timestamp of the beacon period.
|`_beaconPeriodSeconds` | uint32 | The duration of the beacon period in seconds

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
Returns whether an Draw request can be started.



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`True`|  | if a Draw can be started, false otherwise.
### canCompleteDraw
```solidity
  function canCompleteDraw(
  ) external returns (bool)
```
Returns whether an Draw request can be completed.



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`True`|  | if a Draw can be completed, false otherwise.
### calculateNextBeaconPeriodStartTimeFromCurrentTime
```solidity
  function calculateNextBeaconPeriodStartTimeFromCurrentTime(
  ) external returns (uint64)
```
Calculates the next beacon start time, assuming all beacon periods have occurred between the last and now.



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | next beacon period start time
### calculateNextBeaconPeriodStartTime
```solidity
  function calculateNextBeaconPeriodStartTime(
    uint256 currentTime
  ) external returns (uint64)
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
Completes the Draw (RNG) request and pushes a Draw onto DrawHistory.



### beaconPeriodRemainingSeconds
```solidity
  function beaconPeriodRemainingSeconds(
  ) external returns (uint32)
```
Returns the number of seconds remaining until the beacon period can be complete.



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | number of seconds remaining until the beacon period can be complete.
### beaconPeriodEndAt
```solidity
  function beaconPeriodEndAt(
  ) external returns (uint64)
```
Returns the timestamp at which the beacon period ends



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | timestamp at which the beacon period ends.
### getBeaconPeriodSeconds
```solidity
  function getBeaconPeriodSeconds(
  ) external returns (uint32)
```




### getBeaconPeriodStartedAt
```solidity
  function getBeaconPeriodStartedAt(
  ) external returns (uint64)
```




### getDrawHistory
```solidity
  function getDrawHistory(
  ) external returns (contract IDrawHistory)
```




### getNextDrawId
```solidity
  function getNextDrawId(
  ) external returns (uint32)
```




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




### getRngService
```solidity
  function getRngService(
  ) external returns (contract RNGInterface)
```




### getRngTimeout
```solidity
  function getRngTimeout(
  ) external returns (uint32)
```




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
Set global DrawHistory variable.

   All subsequent Draw requests/completions will be pushed to the new DrawHistory.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`newDrawHistory` | contract IDrawHistory | DrawHistory address


### startDraw
```solidity
  function startDraw(
  ) external
```
Starts the Draw process by starting random number request. The previous beacon period must have ended.

The RNG-Request-Fee is expected to be held within this contract before calling this function


### setBeaconPeriodSeconds
```solidity
  function setBeaconPeriodSeconds(
    uint32 beaconPeriodSeconds
  ) external
```
Allows the owner to set the beacon period in seconds.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`beaconPeriodSeconds` | uint32 | The new beacon period in seconds.  Must be greater than zero.

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
### Deployed
```solidity
  event Deployed(
    contract IDrawHistory drawHistory,
    contract RNGInterface rng,
    uint32 nextDrawId,
    uint64 beaconPeriodStartedAt,
    uint32 beaconPeriodSeconds
  )
```
Emit when the DrawBeacon is initialized.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`drawHistory`| contract IDrawHistory | Address of the draw history to push draws to.
|`rng`| contract RNGInterface | Address of RNG service.
|`nextDrawId`| uint32 | Draw ID at which the DrawBeacon should start. Can't be inferior to 1.
|`beaconPeriodStartedAt`| uint64 | Timestamp when beacon period starts.
|`beaconPeriodSeconds`| uint32 | Minimum seconds between draw period.
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
### DrawHistoryTransferred
```solidity
  event DrawHistoryTransferred(
    contract IDrawHistory newDrawHistory
  )
```
Emit when a new DrawHistory has been set.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`newDrawHistory`| contract IDrawHistory |       The new DrawHistory address
### BeaconPeriodStarted
```solidity
  event BeaconPeriodStarted(
    address operator,
    uint64 startedAt
  )
```
Emit when a draw has opened.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`operator`| address |             User address responsible for opening draw
|`startedAt`| uint64 | Start timestamp
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
    uint32 drawPeriodSeconds
  )
```
Emit when the drawPeriodSeconds is set.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`drawPeriodSeconds`| uint32 | Time between draw
