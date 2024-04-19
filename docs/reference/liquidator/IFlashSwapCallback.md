[Git Source](https://github.com/GenerationSoftware/pt-v5-liquidator-interfaces/blob/b934e0ae66eeb2e2feb978e5edd2bd0b8b1eacf6/src/interfaces/IFlashSwapCallback.sol)

Interface for the flash swap callback


## Functions
### flashSwapCallback

Called on the token receiver by the LiquidationPair during a liquidation if the flashSwap data length is non-zero


```solidity
function flashSwapCallback(address _sender, uint256 _amountIn, uint256 _amountOut, bytes calldata _flashSwapData)
    external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_sender`|`address`|The address that triggered the liquidation swap|
|`_amountIn`|`uint256`|The amount of tokens expected to be sent to the target|
|`_amountOut`|`uint256`|The amount of tokens that were sent to the receiver|
|`_flashSwapData`|`bytes`|The flash swap data that was passed into the swap function.|


