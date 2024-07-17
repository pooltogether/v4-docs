[Git Source](https://github.com/generationsoftware/pt-v5-claimer/blob/0ea6b676aec4e3ea5d6f7344e5a682b850e520a2/src/libraries/LinearVRGDALib.sol)

**Authors:**
Brendan Asselstine <brendan@g9software.com>, Original authors FrankieIsLost <frankie@paradigm.xyz> and transmissions11 <t11s@paradigm.xyz>

Sell tokens roughly according to an issuance schedule.


## Functions
### getDecayConstant

Computes the decay constant using the priceDeltaScale


```solidity
function getDecayConstant(UD2x18 _priceDeltaScale) internal pure returns (SD59x18);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_priceDeltaScale`|`UD2x18`|The price change per time unit|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`SD59x18`|The decay constant|


### getPerTimeUnit

Gets the desired number of claims to be sold per second


```solidity
function getPerTimeUnit(uint256 _count, uint256 _durationSeconds) internal pure returns (SD59x18);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_count`|`uint256`|The total number of claims|
|`_durationSeconds`|`uint256`|The duration over which claiming should occur|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`SD59x18`|The target number of claims per second|


### getVRGDAPrice

Calculate the price of a token according to the VRGDA formula

*This function has some cases where some calculations might overflow. If an overflow will occur and the calculation would have resulted in a high price, then the max uint256 value is returned. If an overflow would happen where a low price would be returned, then zero is returned.*


```solidity
function getVRGDAPrice(
    uint256 _targetPrice,
    uint256 _timeSinceStart,
    uint256 _sold,
    SD59x18 _perTimeUnit,
    SD59x18 _decayConstant
) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_targetPrice`|`uint256`|The target price of sale scaled by 1e18|
|`_timeSinceStart`|`uint256`|Time passed since the VRGDA began, scaled by 1e18|
|`_sold`|`uint256`|The total number of tokens that have been sold so far|
|`_perTimeUnit`|`SD59x18`|The target number of claims to sell per second|
|`_decayConstant`|`SD59x18`|The decay constant for the VRGDA formula|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The price of a token according to VRGDA, scaled by 1e18|


### getMaximumPriceDeltaScale

Computes the fee delta so that the min fee will reach the max fee in the given time


```solidity
function getMaximumPriceDeltaScale(uint256 _minFee, uint256 _maxFee, uint256 _time) internal pure returns (UD2x18);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_minFee`|`uint256`|The fee at the start|
|`_maxFee`|`uint256`|The fee after the time has elapsed|
|`_time`|`uint256`|The elapsed time to reach _maxFee|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`UD2x18`|The price delta scale that will ensure the _minFee grows to the _maxFee in _time|


