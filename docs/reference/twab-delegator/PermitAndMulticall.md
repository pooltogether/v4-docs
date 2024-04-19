[Git Source](https://github.com/GenerationSoftware/pt-v5-twab-delegator/blob/62d5cf5702bea2c4f4436d830b0843d739bc3817/src/PermitAndMulticall.sol)

Allows a user to permit token spend and then call multiple functions on a contract.


## Functions
### _multicall

Allows a user to call multiple functions on the same contract.  Useful for EOA who want to batch transactions.


```solidity
function _multicall(bytes[] calldata _data) internal virtual returns (bytes[] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_data`|`bytes[]`|An array of encoded function calls.  The calls must be abi-encoded calls to this contract.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes[]`|The results from each function call|


### _permitAndMulticall

Allow a user to approve an ERC20 token and run various calls in one transaction.


```solidity
function _permitAndMulticall(
    IERC20Permit _permitToken,
    uint256 _amount,
    Signature calldata _permitSignature,
    bytes[] calldata _data
) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_permitToken`|`IERC20Permit`|Address of the ERC20 token|
|`_amount`|`uint256`|Amount of tickets to approve|
|`_permitSignature`|`Signature`|Permit signature|
|`_data`|`bytes[]`|Datas to call with `functionDelegateCall`|


## Structs
### Signature
Secp256k1 signature values.


```solidity
struct Signature {
    uint256 deadline;
    uint8 v;
    bytes32 r;
    bytes32 s;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`deadline`|`uint256`|Timestamp at which the signature expires|
|`v`|`uint8`|`v` portion of the signature|
|`r`|`bytes32`|`r` portion of the signature|
|`s`|`bytes32`|`s` portion of the signature|

