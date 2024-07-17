[Git Source](https://github.com/generationsoftware/pt-v5-prize-pool/blob/568ca55a911a9310bc767a173a0c8a734f7f158c/src/extensions/BlastPrizePool.sol)

**Inherits:**
[PrizePool](./PrizePool)

**Author:**
G9 Software Inc.

A modified prize pool that opts in to claimable WETH yield on Blast and allows anyone to trigger
a donation of the accrued yield to the prize pool.


## Constants
### WETH

```solidity
IERC20Rebasing constant WETH = IERC20Rebasing(0x4300000000000000000000000000000000000004);
```


## Enums
### YieldMode

The Blast yield modes for WETH

```solidity
enum YieldMode {
    AUTOMATIC,
    VOID,
    CLAIMABLE
}
```


## Functions
### constructor

Constructs a new Blast Prize Pool.

*Reverts if the prize token is not the expected WETH token on Blast.*


```solidity
constructor(ConstructorParams memory params) PrizePool(params);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`params`|`ConstructorParams`|A struct of constructor parameters|


### claimableYieldBalance

Returns the claimable WETH yield balance for this contract


```solidity
function claimableYieldBalance() external view returns (uint256);
```

### donateClaimableYield

Claims the available WETH yield balance and donates it to the prize pool.


```solidity
function donateClaimableYield() external returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount claimed and donated.|


