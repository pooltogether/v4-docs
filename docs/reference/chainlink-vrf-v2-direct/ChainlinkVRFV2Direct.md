[Git Source](https://github.com/GenerationSoftware/pt-v5-chainlink-vrf-v2-direct/blob/64e884253ef8c0f7674c7507154c0d6b36385ba1/src/ChainlinkVRFV2Direct.sol)



This is an RNG service contract that interfaces with the Chainlink VRF V2
service to trigger direct-funded RNG requests.

## Events

### SetCallbackGasLimit

```solidity
event SetCallbackGasLimit(uint32 callbackGasLimit)
```

Emitted when the callback gas limit is set

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| callbackGasLimit | uint32 | The new callback gas limit |

### SetRequestConfirmations

```solidity
event SetRequestConfirmations(uint16 requestConfirmations)
```

Emitted when the number of request confirmations is set.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| requestConfirmations | uint16 | The new request confirmations |

## Variables

## Functions

### constructor

```solidity
constructor(address _owner, contract VRFV2Wrapper _vrfV2Wrapper, uint32 callbackGasLimit_, uint16 requestConfirmations_) public
```

Constructor of the contract

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _owner | address | Address of the contract owner |
| _vrfV2Wrapper | contract VRFV2Wrapper | Address of the VRF V2 Wrapper |
| callbackGasLimit_ | uint32 | Gas limit for the fulfillRandomWords callback |
| requestConfirmations_ | uint16 | The number of confirmations to wait before fulfilling the request |

### requestRandomNumber

```solidity
function requestRandomNumber() external returns (uint32 requestId, uint32 lockBlock)
```

Sends a request for a random number to the 3rd-party service

_Some services will complete the request immediately, others may have a time-delay
Some services require payment in the form of a token, such as $LINK for Chainlink VRF_

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| requestId | uint32 | The ID of the request used to get the results of the RNG service |
| lockBlock | uint32 | The block number at which the RNG service will start generating time-delayed randomness. The calling contract should "lock" all activity until the result is available via the `requestId` |
### isRequestComplete

```solidity
function isRequestComplete(uint32 _internalRequestId) external view returns (bool isCompleted)
```

Checks if the request for randomness from the 3rd-party service has completed

_For time-delayed requests, this function is used to check/confirm completion_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _internalRequestId | uint32 |  |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| isCompleted | bool | True if the request has completed and a random number is available, false otherwise |
### randomNumber

```solidity
function randomNumber(uint32 _internalRequestId) external view returns (uint256 randomNum)
```

Gets the random number produced by the 3rd-party service

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _internalRequestId | uint32 |  |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| randomNum | uint256 | The random number |
### completedAt

```solidity
function completedAt(uint32 requestId) external view returns (uint64 completedAtTimestamp)
```

Returns the timestamp at which the passed `requestId` was completed.

_Returns zero if not completed or if the request doesn't exist_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| requestId | uint32 | The ID of the request |

### getLastRequestId

```solidity
function getLastRequestId() external view returns (uint32 requestId)
```

Gets the last request id used by the RNG service

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| requestId | uint32 | The last request id used in the last request |
### getRequestFee

```solidity
function getRequestFee() external view returns (address feeToken, uint256 requestFee)
```

Gets the Fee for making a Request against an RNG service

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| feeToken | address | The address of the token that is used to pay fees |
| requestFee | uint256 | The fee required to be paid to make a request |
### getCallbackGasLimit

```solidity
function getCallbackGasLimit() external view returns (uint32)
```

Returns the current callback gas limit.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint32 | The current callback gas limit |
### getRequestConfirmations

```solidity
function getRequestConfirmations() external view returns (uint16)
```

Returns the current request confirmation count.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint16 | The current request confirmation count |
### vrfV2Wrapper

```solidity
function vrfV2Wrapper() external view returns (contract VRFV2Wrapper)
```

Returns the VRF V2 Wrapper contract that this contract uses.

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | contract VRFV2Wrapper | The VRFV2Wrapper contract |
### setCallbackGasLimit

```solidity
function setCallbackGasLimit(uint32 callbackGasLimit_) external
```

Sets a new callback gat limit.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| callbackGasLimit_ | uint32 | The new callback gat limit |

### setRequestConfirmations

```solidity
function setRequestConfirmations(uint16 requestConfirmations_) external
```

Sets a new request confirmation count.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| requestConfirmations_ | uint16 | The new request confirmation count |

## Structs

## Errors

### LinkTokenZeroAddress

```solidity
error LinkTokenZeroAddress()
```

Thrown when the LINK token contract address is set to the zero address.

### VRFV2WrapperZeroAddress

```solidity
error VRFV2WrapperZeroAddress()
```

Thrown when the VRFV2Wrapper address is set to the zero address.

### CallbackGasLimitZero

```solidity
error CallbackGasLimitZero()
```

Thrown when the callback gas limit is set to zero.

### RequestConfirmationsZero

```solidity
error RequestConfirmationsZero()
```

Thrown when the number of request confirmations is set to zero.

### InvalidVrfRequestId

```solidity
error InvalidVrfRequestId(uint256 vrfRequestId)
```

Thrown when the chainlink VRF request ID does not match any stored request IDs.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vrfRequestId | uint256 | The chainlink ID for the VRF Request |

