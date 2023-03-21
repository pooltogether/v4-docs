The PrizeDistributionBuffer contract provides historical lookups of PrizeDistribution struct parameters (linked with a Draw ID) via a
            circular ring buffer. Historical PrizeDistribution parameters can be accessed on-chain using a drawId to calculate
            ring buffer storage slot. The PrizeDistribution parameters can be created by manager/owner and existing PrizeDistribution
            parameters can only be updated the owner. When adding a new PrizeDistribution basic sanity checks will be used to
            validate the incoming parameters.


## Structs
### `PrizeDistribution`
  - uint8 bitRangeSize
  - uint8 matchCardinality
  - uint32 startTimestampOffset
  - uint32 endTimestampOffset
  - uint32 maxPicksPerUser
  - uint32 expiryDuration
  - uint104 numberOfPicks
  - uint32[16] tiers
  - uint256 prize


## Functions
### constructor
```solidity
  function constructor(
    address _owner,
    uint8 _cardinality
  ) public
```
Constructor for PrizeDistributionBuffer


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_owner` | address | Address of the PrizeDistributionBuffer owner
|`_cardinality` | uint8 | Cardinality of the `bufferMetadata`

### getBufferCardinality
```solidity
  function getBufferCardinality(
  ) external returns (uint32)
```
Read a ring buffer cardinality



#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint32 | Ring buffer cardinality
### getPrizeDistribution
```solidity
  function getPrizeDistribution(
    uint32 drawId
  ) external returns (struct IPrizeDistributionBuffer.PrizeDistribution)
```
Gets the PrizeDistributionBuffer for a drawId


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`drawId` | uint32 | drawId


### getPrizeDistributions
```solidity
  function getPrizeDistributions(
    uint32[] drawIds
  ) external returns (struct IPrizeDistributionBuffer.PrizeDistribution[])
```
Gets PrizeDistribution list from array of drawIds


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`drawIds` | uint32[] | drawIds to get PrizeDistribution for


### getPrizeDistributionCount
```solidity
  function getPrizeDistributionCount(
  ) external returns (uint32)
```
Gets the number of PrizeDistributions stored in the prize distributions ring buffer.

If no Draws have been pushed, it will return 0.
If the ring buffer is full, it will return the cardinality.
Otherwise, it will return the NewestPrizeDistribution index + 1.


#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint32 | Number of PrizeDistributions stored in the prize distributions ring buffer.
### getNewestPrizeDistribution
```solidity
  function getNewestPrizeDistribution(
  ) external returns (struct IPrizeDistributionBuffer.PrizeDistribution prizeDistribution, uint32 drawId)
```
Read newest PrizeDistribution from prize distributions ring buffer.

   Uses nextDrawIndex to calculate the most recently added PrizeDistribution.



### getOldestPrizeDistribution
```solidity
  function getOldestPrizeDistribution(
  ) external returns (struct IPrizeDistributionBuffer.PrizeDistribution prizeDistribution, uint32 drawId)
```
Read oldest PrizeDistribution from prize distributions ring buffer.

   Finds the oldest Draw by buffer.nextIndex and buffer.lastDrawId



### pushPrizeDistribution
```solidity
  function pushPrizeDistribution(
    uint32 drawId,
    struct IPrizeDistributionBuffer.PrizeDistribution prizeDistribution
  ) external returns (bool)
```
Adds new PrizeDistribution record to ring buffer storage.

   Only callable by the owner or manager

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`drawId` | uint32 |            Draw ID linked to PrizeDistribution parameters
|`prizeDistribution` | struct IPrizeDistributionBuffer.PrizeDistribution | PrizeDistribution parameters struct

### setPrizeDistribution
```solidity
  function setPrizeDistribution(
  ) external returns (uint32)
```
Sets existing PrizeDistribution with new PrizeDistribution parameters in ring buffer storage.

   Retroactively updates an existing PrizeDistribution and should be thought of as a "safety"
               fallback. If the manager is setting invalid PrizeDistribution parameters the Owner can update
               the invalid parameters with correct parameters.



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


## Events
### Deployed
```solidity
  event Deployed(
    uint8 cardinality
  )
```
Emitted when the contract is deployed.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`cardinality`| uint8 | The maximum number of records in the buffer before they begin to expire.
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
### PrizeDistributionSet
```solidity
  event PrizeDistributionSet(
    uint32 drawId,
    struct IPrizeDistributionBuffer.PrizeDistribution prizeDistribution
  )
```
Emit when PrizeDistribution is set.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`drawId`| uint32 |       Draw id
|`prizeDistribution`| struct IPrizeDistributionBuffer.PrizeDistribution | IPrizeDistributionBuffer.PrizeDistribution
