[Git Source](https://github.com/generationsoftware/pt-v5-prize-pool/blob/768fa642eb31cfff0fe929da0929a9bb4dea0b2d/src/libraries/DrawAccumulatorLib.sol)

**Author:**
G9 Software Inc.

This contract distributes tokens over time according to an exponential weighted average.
Time is divided into discrete "draws", of which each is allocated tokens.


## Constants
### MAX_OBSERVATION_CARDINALITY

```solidity
uint16 constant MAX_OBSERVATION_CARDINALITY = 366;
```

## Functions
### add

Adds balance for the given draw id to the accumulator.


```solidity
function add(Accumulator storage accumulator, uint256 _amount, uint24 _drawId) internal returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`accumulator`|`Accumulator`|The accumulator to add to|
|`_amount`|`uint256`|The amount of balance to add|
|`_drawId`|`uint24`|The draw id to which to add balance to. This must be greater than or equal to the previous addition's draw id.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if a new observation was created, false otherwise.|


### newestDrawId

Returns the newest draw id from the accumulator.


```solidity
function newestDrawId(Accumulator storage accumulator) internal view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`accumulator`|`Accumulator`|The accumulator to get the newest draw id from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The newest draw id|


### newestObservation

Returns the newest draw id from the accumulator.


```solidity
function newestObservation(Accumulator storage accumulator) internal view returns (Observation memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`accumulator`|`Accumulator`|The accumulator to get the newest draw id from|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`Observation`|The newest draw id|


### getDisbursedBetween

Gets the balance that was disbursed between the given start and end draw ids, inclusive.


```solidity
function getDisbursedBetween(Accumulator storage _accumulator, uint24 _startDrawId, uint24 _endDrawId)
    internal
    view
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_accumulator`|`Accumulator`|The accumulator to get the disbursed balance from|
|`_startDrawId`|`uint24`|The start draw id, inclusive|
|`_endDrawId`|`uint24`|The end draw id, inclusive|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The disbursed balance between the given start and end draw ids, inclusive|


### binarySearch

Binary searches an array of draw ids for the given target draw id.

*The _targetDrawId MUST exist between the range of draws at _oldestIndex and _newestIndex (inclusive)*


```solidity
function binarySearch(
    uint24[366] storage _drawRingBuffer,
    uint16 _oldestIndex,
    uint16 _newestIndex,
    uint16 _cardinality,
    uint24 _targetDrawId
)
    internal
    view
    returns (uint16 beforeOrAtIndex, uint24 beforeOrAtDrawId, uint16 afterOrAtIndex, uint24 afterOrAtDrawId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_drawRingBuffer`|`uint24[366]`|The array of draw ids to search|
|`_oldestIndex`|`uint16`|The oldest index in the ring buffer|
|`_newestIndex`|`uint16`|The newest index in the ring buffer|
|`_cardinality`|`uint16`|The number of items in the ring buffer|
|`_targetDrawId`|`uint24`|The target draw id to search for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`beforeOrAtIndex`|`uint16`|The index of the observation occurring at or before the target draw id|
|`beforeOrAtDrawId`|`uint24`|The draw id of the observation occurring at or before the target draw id|
|`afterOrAtIndex`|`uint16`|The index of the observation occurring at or after the target draw id|
|`afterOrAtDrawId`|`uint24`|The draw id of the observation occurring at or after the target draw id|


## Structs
### Accumulator
An accumulator for a draw.


```solidity
struct Accumulator {
    RingBufferInfo ringBufferInfo;
    uint24[366] drawRingBuffer;
    mapping(uint256 drawId => Observation observation) observations;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`ringBufferInfo`|`RingBufferInfo`|The metadata for the drawRingBuffer|
|`drawRingBuffer`|`uint24[366]`|The ring buffer of draw ids|
|`observations`|`mapping(uint256 drawId => Observation observation)`|The observations for each draw id|

### Observation
The accumulator observation record


```solidity
struct Observation {
    uint96 available;
    uint160 disbursed;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`available`|`uint96`|The total amount available as of this Observation|
|`disbursed`|`uint160`|The total amount disbursed in the past|

### RingBufferInfo
The metadata for using the ring buffer.


```solidity
struct RingBufferInfo {
    uint16 nextIndex;
    uint16 cardinality;
}
```

