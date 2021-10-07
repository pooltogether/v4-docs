The PrizeDistributionBuffer stores individual PrizeDistributions for each Draw.drawId.
            PrizeDistributions parameters like cardinality, bitRange, distributions, number of picks
            and prize. The settings determine the specific distribution model for each individual
            draw. Storage of the PrizeDistribution(s) is handled by ring buffer with a max cardinality
            of 256 or roughly 5 years of history with a weekly draw cadence.

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
|`_cardinality` | uint8 | Cardinality of the `prizeDistributionsRingBufferData`

### getPrizeDistribution
```solidity
  function getPrizeDistribution(
    uint32 drawId
  ) external returns (struct DrawLib.PrizeDistribution)
```
Gets the PrizeDistributionBuffer for a Draw.drawID


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`drawId` | uint32 | Draw.drawId

### getPrizeDistributions
```solidity
  function getPrizeDistributions(
    uint32[] drawIds
  ) external returns (struct DrawLib.PrizeDistribution[])
```
Gets array of PrizeDistributionBuffer for Draw.drawID(s)


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`drawIds` | uint32[] | Draw.drawId

### getPrizeDistributionCount
```solidity
  function getPrizeDistributionCount(
  ) external returns (uint32)
```
Gets the number of PrizeDistributions held in the prize distributions ring buffer.

If no Draws have been pushed, it will return 0.
If the ring buffer is full, it will return the cardinality.
Otherwise, it will return the NewestPrizeDistribution index + 1.


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Number`|  | of PrizeDistributions held in the prize distributions ring buffer.
### getNewestPrizeDistribution
```solidity
  function getNewestPrizeDistribution(
  ) external returns (struct DrawLib.PrizeDistribution prizeDistribution, uint32 drawId)
```
Read newest PrizeDistributions from the prize distributions ring buffer.

   Uses the nextDrawIndex to calculate the most recently added Draw.


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`prizeDistribution`|  | DrawLib.PrizeDistribution
|`drawId`|  | Draw.drawId
### getOldestPrizeDistribution
```solidity
  function getOldestPrizeDistribution(
  ) external returns (struct DrawLib.PrizeDistribution prizeDistribution, uint32 drawId)
```
Read oldest PrizeDistributions from the prize distributions ring buffer.

   Finds the oldest Draw by buffer.nextIndex and buffer.lastDrawId


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`prizeDistribution`|  | DrawLib.PrizeDistribution
|`drawId`|  | Draw.drawId
### pushPrizeDistribution
```solidity
  function pushPrizeDistribution(
    uint32 drawId,
    struct DrawLib.PrizeDistribution draw
  ) external returns (bool)
```
Sets PrizeDistributionBuffer for a Draw.drawID.

   Only callable by the owner or manager

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`drawId` | uint32 | Draw.drawId
|`draw` | struct DrawLib.PrizeDistribution |   PrizeDistributionBuffer struct

### setPrizeDistribution
```solidity
  function setPrizeDistribution(
  ) external returns (uint32)
```
Set existing Draw in prize distributions ring buffer with new parameters.

   Updating a Draw should be used sparingly and only in the event an incorrect Draw parameter has been stored.



### manager
```solidity
  function manager(
  ) public returns (address)
```
Gets current `_manager`.



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Current`|  | `_manager` address.
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
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Boolean`| address | to indicate if the operation was successful or not.
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
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Current`|  | `_pendingOwner` address.
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
  )
```



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
### DrawSet
```solidity
  event DrawSet(
    uint32 drawId,
    uint32 timestamp,
    uint256 winningRandomNumber
  )
```
Emit when a new draw has been created.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`drawId`| uint32 |       Draw id
|`timestamp`| uint32 |    Epoch timestamp when the draw is created.
|`winningRandomNumber`| uint256 | Randomly generated number used to calculate draw winning numbers
### PrizeDistributionsSet
```solidity
  event PrizeDistributionsSet(
    uint32 drawId,
    struct DrawLib.PrizeDistribution prizeDistributions
  )
```
Emitted when the DrawParams are set/updated


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`drawId`| uint32 |       Draw id
|`prizeDistributions`| struct DrawLib.PrizeDistribution | DrawLib.PrizeDistribution
