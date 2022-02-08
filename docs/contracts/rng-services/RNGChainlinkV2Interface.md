Provides an interface for requesting random numbers from Chainlink VRF V2.




## Functions
### getSubscriptionId
```solidity
  function getSubscriptionId(
  ) external returns (uint64)
```
Get Chainlink VRF subscription id associated with this contract.



#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint64 | uint64 Chainlink VRF subscription id
### getVrfCoordinator
```solidity
  function getVrfCoordinator(
  ) external returns (address)
```
Get Chainlink VRF coordinator contract address associated with this contract.



#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| address | address Chainlink VRF coordinator address
### setSubscriptionId
```solidity
  function setSubscriptionId(
    uint64 subId
  ) external
```
Set Chainlink VRF subscription id associated with this contract.

This function is only callable by the owner.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`subId` | uint64 | Chainlink VRF subscription id

### setCallbackGasLimit
```solidity
  function setCallbackGasLimit(
    uint32 callbackGasLimit
  ) external
```
Set Chainlink VRF callback gas limit.

This function is only callable by the owner.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`callbackGasLimit` | uint32 | Chainlink VRF callback gas limit

### setRequestConfirmations
```solidity
  function setRequestConfirmations(
    uint16 requestConfirmations
  ) external
```
Set Chainlink VRF request confirmations.

This function is only callable by the owner.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`requestConfirmations` | uint16 | Chainlink VRF request confirmations

### setKeyhash
```solidity
  function setKeyhash(
    bytes32 keyHash
  ) external
```
Set Chainlink VRF keyHash.

This function is only callable by the owner.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`keyHash` | bytes32 | Chainlink VRF keyHash

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
| uint32 | lockBlock The block number at which the RNG service will start generating time-delayed randomness.
The calling contract should "lock" all activity until the result is available via the `requestId`
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
## Events
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
