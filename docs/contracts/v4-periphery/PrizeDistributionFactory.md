The Prize Distribution Factory populates a Prize Distribution Buffer for a prize pool.  It uses a Prize Tier History, Draw Buffer and Ticket
to compute the correct prize distribution.  It automatically sets the cardinality based on the minPickCost and the total network ticket supply.




## Functions
### constructor
```solidity
  function constructor(
  ) public
```




### pushPrizeDistribution
```solidity
  function pushPrizeDistribution(
    uint32 _drawId,
    uint256 _totalNetworkTicketSupply
  ) external returns (struct IPrizeDistributionBuffer.PrizeDistribution)
```
Allows the owner or manager to push a new prize distribution onto the buffer.
The PrizeTier and Draw for the given draw id will be pulled in, and the total network ticket supply will be used to calculate cardinality.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_drawId` | uint32 | The draw id to compute for
|`_totalNetworkTicketSupply` | uint256 | The total supply of tickets across all prize pools for the network that the ticket belongs to.

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| struct IPrizeDistributionBuffer.PrizeDistribution | The resulting Prize Distribution
### setPrizeDistribution
```solidity
  function setPrizeDistribution(
    uint32 _drawId,
    uint256 _totalNetworkTicketSupply
  ) external returns (struct IPrizeDistributionBuffer.PrizeDistribution)
```
Allows the owner or manager to override an existing prize distribution in the buffer.
The PrizeTier and Draw for the given draw id will be pulled in, and the total network ticket supply will be used to calculate cardinality.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_drawId` | uint32 | The draw id to compute for
|`_totalNetworkTicketSupply` | uint256 | The total supply of tickets across all prize pools for the network that the ticket belongs to.

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| struct IPrizeDistributionBuffer.PrizeDistribution | The resulting Prize Distribution
### calculatePrizeDistribution
```solidity
  function calculatePrizeDistribution(
    uint32 _drawId,
    uint256 _totalNetworkTicketSupply
  ) public returns (struct IPrizeDistributionBuffer.PrizeDistribution)
```
Calculates what the prize distribution will be, given a draw id and total network ticket supply.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_drawId` | uint32 | The draw id to pull from the Draw Buffer and Prize Tier History
|`_totalNetworkTicketSupply` | uint256 | The total of all ticket supplies across all prize pools in this network

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| struct IPrizeDistributionBuffer.PrizeDistribution | PrizeDistribution using info from the Draw for the given draw id, total network ticket supply, and PrizeTier for the draw.
### calculatePrizeDistributionWithDrawData
```solidity
  function calculatePrizeDistributionWithDrawData(
    uint32 _drawId,
    uint256 _totalNetworkTicketSupply,
    uint32 _beaconPeriodSeconds,
    uint64 _drawTimestamp
  ) public returns (struct IPrizeDistributionBuffer.PrizeDistribution)
```
Calculates what the prize distribution will be, given a draw id and total network ticket supply.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_drawId` | uint32 | The draw from which to use the Draw and
|`_totalNetworkTicketSupply` | uint256 | The sum of all ticket supplies across all prize pools on the network
|`_beaconPeriodSeconds` | uint32 | The beacon period in seconds
|`_drawTimestamp` | uint64 | The timestamp at which the draw RNG request started.

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| struct IPrizeDistributionBuffer.PrizeDistribution | A PrizeDistribution based on the given params and PrizeTier for the passed draw id
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
### PrizeDistributionPushed
```solidity
  event PrizeDistributionPushed(
    uint32 drawId,
    uint256 totalNetworkTicketSupply
  )
```
Emitted when a new Prize Distribution is pushed.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`drawId`| uint32 | The draw id for which the prize dist was pushed
|`totalNetworkTicketSupply`| uint256 | The total network ticket supply that was used to compute the cardinality and portion of picks
### PrizeDistributionSet
```solidity
  event PrizeDistributionSet(
    uint32 drawId,
    uint256 totalNetworkTicketSupply
  )
```
Emitted when a Prize Distribution is set (overrides another)


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`drawId`| uint32 | The draw id for which the prize dist was set
|`totalNetworkTicketSupply`| uint256 | The total network ticket supply that was used to compute the cardinality and portion of picks
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
