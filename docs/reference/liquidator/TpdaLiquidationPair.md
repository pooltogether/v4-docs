[Git Source](https://github.com/generationsoftware/pt-v5-tpda-liquidator/blob/3ef1738dc1856e93d2f0eda590eb9df90e085bab/src/TpdaLiquidationPair.sol)

**Inherits:**
ILiquidationPair

**Author:**
G9 Software Inc.

This contract sells one token for another at a target time interval. The pricing algorithm is designed
such that the price of the auction is inversely proportional to the time since the last auction.
auctionPrice = (targetAuctionPeriod / elapsedTimeSinceLastAuction) * lastAuctionPrice


## Constants
### MIN_PRICE

```solidity
uint192 constant MIN_PRICE = 100;
```


## State Variables
### source
The liquidation source


```solidity
ILiquidationSource public immutable source;
```


### targetAuctionPeriod
The target time interval between auctions


```solidity
uint256 public immutable targetAuctionPeriod;
```


### _tokenIn
The token that is being purchased


```solidity
IERC20 internal immutable _tokenIn;
```


### _tokenOut
The token that is being sold


```solidity
IERC20 internal immutable _tokenOut;
```


### smoothingFactor
The degree of smoothing to apply to the available token balance


```solidity
uint256 public immutable smoothingFactor;
```


### lastAuctionAt
The time at which the last auction occurred


```solidity
uint64 public lastAuctionAt;
```


### lastAuctionPrice
The price of the last auction


```solidity
uint192 public lastAuctionPrice;
```


## Functions
### constructor

Constructors a new TpdaLiquidationPair


```solidity
constructor(
    ILiquidationSource _source,
    address __tokenIn,
    address __tokenOut,
    uint64 _targetAuctionPeriod,
    uint192 _targetAuctionPrice,
    uint256 _smoothingFactor
);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_source`|`ILiquidationSource`|The liquidation source|
|`__tokenIn`|`address`|The token that is being purchased by the source|
|`__tokenOut`|`address`|The token that is being sold by the source|
|`_targetAuctionPeriod`|`uint64`|The target time interval between auctions|
|`_targetAuctionPrice`|`uint192`|The first target price of the auction|
|`_smoothingFactor`|`uint256`|The degree of smoothing to apply to the available token balance|


### tokenIn

Returns the token that is used to pay for auctions.


```solidity
function tokenIn() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|address of the token coming in|


### tokenOut

Returns the token that is being auctioned.


```solidity
function tokenOut() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|address of the token coming out|


### target

Get the address that will receive `tokenIn`.


```solidity
function target() external returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|Address of the target|


### maxAmountOut

Gets the maximum amount of tokens that can be swapped out from the source.


```solidity
function maxAmountOut() external returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The maximum amount of tokens that can be swapped out.|


### swapExactAmountOut

Swaps the given amount of tokens out and ensures the amount of tokens in doesn't exceed the given maximum.

*The amount of tokens being swapped in must be sent to the target before calling this function.*


```solidity
function swapExactAmountOut(address _receiver, uint256 _amountOut, uint256 _amountInMax, bytes calldata _flashSwapData)
    external
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_receiver`|`address`|The address to send the tokens to.|
|`_amountOut`|`uint256`|The amount of tokens to receive out.|
|`_amountInMax`|`uint256`|The maximum amount of tokens to send in.|
|`_flashSwapData`|`bytes`|If non-zero, the _receiver is called with this data prior to|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of tokens sent in.|


### computeExactAmountIn

Computes the exact amount of tokens to send in for the given amount of tokens to receive out.


```solidity
function computeExactAmountIn(uint256) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of tokens to send in.|


### computeTimeForPrice

Computes the time at which the given auction price will occur


```solidity
function computeTimeForPrice(uint256 price) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`price`|`uint256`|The price of the auction|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The timestamp at which the given price will occur|


### _availableBalance

Computes the available balance of the tokens to be sold


```solidity
function _availableBalance() internal returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The available balance of the tokens|


### _computePrice

Computes the current auction price


```solidity
function _computePrice() internal view returns (uint192);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint192`|The current auction price|


## Events
### SwappedExactAmountOut
Emitted when a swap is made


```solidity
event SwappedExactAmountOut(
    address indexed sender,
    address indexed receiver,
    uint256 amountOut,
    uint256 amountInMax,
    uint256 amountIn,
    bytes flashSwapData
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`sender`|`address`|The sender of the swap|
|`receiver`|`address`|The receiver of the swap|
|`amountOut`|`uint256`|The amount of tokens out|
|`amountInMax`|`uint256`|The maximum amount of tokens in|
|`amountIn`|`uint256`|The actual amount of tokens in|
|`flashSwapData`|`bytes`|The data used for the flash swap|

