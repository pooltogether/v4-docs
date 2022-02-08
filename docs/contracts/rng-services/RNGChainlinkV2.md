


## Structs
### `RequestConfig`
  - uint64 subId
  - uint32 callbackGasLimit
  - uint16 requestConfirmations
  - uint32 numWords
  - bytes32 keyHash


## Functions
### constructor
```solidity
  function constructor(
    address _owner,
    address vrfCoordinator_,
    uint64 _subId,
    uint32 _callbackGasLimit,
    uint16 _requestConfirmations,
    uint32 _numWords,
    bytes32 _keyHash
  ) public
```
Constructor of the contract


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_owner` | address | Owner of the contract
|`vrfCoordinator_` | address | Address of the VRF Coordinator
|`_subId` | uint64 | Chainlink VRF subscription id
|`_callbackGasLimit` | uint32 | How much gas you would like in your callback to do work with the random words provided.
Must be less than the coordinators `maxGasLimit`.
|`_requestConfirmations` | uint16 | How many confirmations the Chainlink node should wait before responding.
The longer the node waits the more secure the random value is.
Must be greater than the coordinator's `minimumRequestBlockConfirmations`.
|`_numWords` | uint32 | Number of random values to receive
|`_keyHash` | bytes32 | Hash of the public key used to verify the VRF proof

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


### rawFulfillRandomWords
```solidity
  function rawFulfillRandomWords(
  ) external
```




## Events
### SubscriptionIdSet
```solidity
  event SubscriptionIdSet(
    uint64 subId
  )
```
Emmited when the Chainlink VRF subscription id is set


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`subId`| uint64 | Chainlink VRF subscription id
### CallbackGasLimitSet
```solidity
  event CallbackGasLimitSet(
    uint32 callbackGasLimit
  )
```
Emmited when the Chainlink VRF callback gas limit is set


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`callbackGasLimit`| uint32 | Chainlink VRF callback gas limit
### RequestConfirmationsSet
```solidity
  event RequestConfirmationsSet(
    uint16 requestConfirmations
  )
```
Emmited when the Chainlink VRF request confirmations is set


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`requestConfirmations`| uint16 | Chainlink VRF request confirmations
### KeyHashSet
```solidity
  event KeyHashSet(
    bytes32 keyHash
  )
```
Emmited when the Chainlink VRF keyHash is set


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`keyHash`| bytes32 | Chainlink VRF keyHash
### RequestConfigSet
```solidity
  event RequestConfigSet(
    struct RNGChainlinkV2.RequestConfig sRequestConfig
  )
```
Emmited when the Chainlink VRF request configuration is set


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`sRequestConfig`| struct RNGChainlinkV2.RequestConfig | Chainlink VRF request configuration
### VrfCoordinatorSet
```solidity
  event VrfCoordinatorSet(
    contract VRFCoordinatorV2Interface vrfCoordinator
  )
```
Emmited when the Chainlink VRF Coordinator address is set


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`vrfCoordinator`| contract VRFCoordinatorV2Interface | Address of the VRF Coordinator
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
