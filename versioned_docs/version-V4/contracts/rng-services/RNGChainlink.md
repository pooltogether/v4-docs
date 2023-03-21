




## Functions
### constructor
```solidity
  function constructor(
  ) public
```

Public constructor


### getLink
```solidity
  function getLink(
  ) external returns (address)
```




### setKeyhash
```solidity
  function setKeyhash(
    bytes32 _keyhash
  ) external
```
Allows governance to set the VRF keyhash


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_keyhash` | bytes32 | The keyhash to be used by the VRF

### setFee
```solidity
  function setFee(
    uint256 _fee
  ) external
```
Allows governance to set the fee per request required by the VRF


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_fee` | uint256 | The fee to be charged for a request

### getLastRequestId
```solidity
  function getLastRequestId(
  ) external returns (uint32 requestId)
```
Gets the last request id used by the RNG service



#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint32 | requestId The last request id used in the last request
### getRequestFee
```solidity
  function getRequestFee(
  ) external returns (address feeToken, uint256 requestFee)
```
Gets the Fee for making a Request against an RNG service



#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| address | feeToken The address of the token that is used to pay fees
| uint256 | requestFee The fee required to be paid to make a request
### requestRandomNumber
```solidity
  function requestRandomNumber(
  ) external returns (uint32 requestId, uint32 lockBlock)
```
Sends a request for a random number to the 3rd-party service

Some services will complete the request immediately, others may have a time-delay
Some services require payment in the form of a token, such as $LINK for Chainlink VRF


#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint32 | requestId The ID of the request used to get the results of the RNG service
| uint32 | lockBlock The block number at which the RNG service will start generating time-delayed randomness.  The calling contract
should "lock" all activity until the result is available via the `requestId`
### isRequestComplete
```solidity
  function isRequestComplete(
    uint32 requestId
  ) external returns (bool isCompleted)
```
Checks if the request for randomness from the 3rd-party service has completed

For time-delayed requests, this function is used to check/confirm completion

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`requestId` | uint32 | The ID of the request used to get the results of the RNG service

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| bool | isCompleted True if the request has completed and a random number is available, false otherwise
### randomNumber
```solidity
  function randomNumber(
    uint32 requestId
  ) external returns (uint256 randomNum)
```
Gets the random number produced by the 3rd-party service


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`requestId` | uint32 | The ID of the request used to get the results of the RNG service

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint256 | randomNum The random number
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


### rawFulfillRandomness
```solidity
  function rawFulfillRandomness(
  ) external
```




## Events
### KeyHashSet
```solidity
  event KeyHashSet(
  )
```



### FeeSet
```solidity
  event FeeSet(
  )
```



### VrfCoordinatorSet
```solidity
  event VrfCoordinatorSet(
  )
```



### VRFRequested
```solidity
  event VRFRequested(
  )
```



### OwnershipTransferred
```solidity
  event OwnershipTransferred(
  )
```



### RandomNumberRequested
```solidity
  event RandomNumberRequested(
    uint32 requestId,
    address sender
  )
```
Emitted when a new request for a random number has been submitted


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`requestId`| uint32 | The indexed ID of the request used to get the results of the RNG service
|`sender`| address | The indexed address of the sender of the request
### RandomNumberCompleted
```solidity
  event RandomNumberCompleted(
    uint32 requestId,
    uint256 randomNumber
  )
```
Emitted when an existing request for a random number has been completed


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`requestId`| uint32 | The indexed ID of the request used to get the results of the RNG service
|`randomNumber`| uint256 | The random number produced by the 3rd-party service
