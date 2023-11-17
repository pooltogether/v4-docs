[Git Source](https://github.com/GenerationSoftware/pt-v5-chainlink-vrf-v2-direct/blob/64e884253ef8c0f7674c7507154c0d6b36385ba1/src/ChainlinkVRFV2DirectRngAuctionHelper.sol)



This is a helper contract to provide clients a simplified interface to interact
with the RNGAuction if a fee needs to be transferred before starting the RNG request.

## Events

## Variables

### chainlinkVrfV2Direct

```solidity
contract ChainlinkVRFV2Direct chainlinkVrfV2Direct
```

The ChainlinkVRFV2Direct contract that the fee will be transferred to.

### rngAuction

```solidity
contract IRngAuction rngAuction
```

The RngAuction that will be completed after the fee is transferred.

## Functions

### constructor

```solidity
constructor(contract ChainlinkVRFV2Direct _chainlinkVrfV2Direct, contract IRngAuction _rngAuction) public
```

Initializes the contract with the target ChainlinkVRFV2Direct and RngAuction
contracts.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _chainlinkVrfV2Direct | contract ChainlinkVRFV2Direct | The ChainlinkVRFV2Direct contract that the fee will be transferred to. |
| _rngAuction | contract IRngAuction | The RngAuction contract that will be completed after the fee is transferred. |

### transferFeeAndStartRngRequest

```solidity
function transferFeeAndStartRngRequest(address _rewardRecipient) external
```

Transfers the RNG fee from the caller to the ChainlinkVRFV2Direct contract before
completing the RNG auction by starting the RNG request.

_Will revert if the active RNG service of the RngAuction does not match the ChainlinkVRFV2Direct
contract address.
To estimate the request fee, use the `estimateRequestFee(...)` function on this contract.
DO NOT USE THE `getRequestFee()` FUNCTION ON THE RNG SERVICE TO PREDICT THE FEE AS IT REQUIRES A
TX GAS PRICE TO CALCULATE THE CORRECT VALUE!_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _rewardRecipient | address | Address that will receive the auction reward for starting the RNG request |

### estimateRequestFee

```solidity
function estimateRequestFee(uint256 _gasPrice) external view returns (address _feeToken, uint256 _requestFee)
```

Estimates the RNG request fee in LINK based on the expected gas price.

_Use this function instead of `RNGInterface.getRequestFee()` when estimating request fees offchain._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _gasPrice | uint256 | The gas price to calculate the request fee for |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| _feeToken | address | The LINK address |
| _requestFee | uint256 | The estimated request fee based on the given gas price |

## Structs

## Errors

### ChainlinkVRFV2DirectZeroAddress

```solidity
error ChainlinkVRFV2DirectZeroAddress()
```

Thrown if the ChainlinkVRFV2Direct contract is set to the zero address.

### RngAuctionZeroAddress

```solidity
error RngAuctionZeroAddress()
```

Thrown if the RngAuction contract is set to the zero address.

### RngServiceNotActive

```solidity
error RngServiceNotActive(address chainlinkVrfV2Direct, address activeRngService)
```

Thrown if the active RNG service of the RngAuction doesn't match the address of
the ChainlinkVRFV2Direct contract.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| chainlinkVrfV2Direct | address | The ChainlinkVRFV2Direct contract address |
| activeRngService | address | The active RNG service of the RngAuction |

