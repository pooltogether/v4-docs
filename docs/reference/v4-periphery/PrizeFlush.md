The PrizeFlush contract helps capture interest from the PrizePool and move collected funds
           to a designated PrizeDistributor contract. When deployed, the destination, reserve and strategy
           addresses are set and used as static parameters during every "flush" execution. The parameters can be
           reset by the Owner if necessary.




## Functions
### constructor
```solidity
  function constructor(
    address _owner,
    address _destination,
    contract IStrategy _strategy,
    contract IReserve _reserve
  ) public
```
Deploy Prize Flush.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_owner` | address | Prize Flush owner address
|`_destination` | address | Destination address
|`_strategy` | contract IStrategy | Strategy address
|`_reserve` | contract IReserve | Reserve address


### getDestination
```solidity
  function getDestination(
  ) external returns (address)
```
Read global destination variable.



### getReserve
```solidity
  function getReserve(
  ) external returns (contract IReserve)
```
Read global reserve variable.



### getStrategy
```solidity
  function getStrategy(
  ) external returns (contract IStrategy)
```
Read global strategy variable.



### setDestination
```solidity
  function setDestination(
  ) external returns (address)
```
Set global destination variable.



### setReserve
```solidity
  function setReserve(
  ) external returns (contract IReserve)
```
Set global reserve variable.



### setStrategy
```solidity
  function setStrategy(
  ) external returns (contract IStrategy)
```
Set global strategy variable.



### flush
```solidity
  function flush(
  ) external returns (bool)
```
Migrate interest from PrizePool to PrizeDistributor in a single transaction.

   Captures interest, checkpoint data and transfers tokens to final destination.


#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| bool | True if operation is successful.
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
    address destination,
    contract IReserve reserve,
    contract IStrategy strategy
  )
```
Emitted when contract has been deployed.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`destination`| address | Destination address
|`reserve`| contract IReserve | Strategy address
|`strategy`| contract IStrategy | Reserve address

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
### Flushed
```solidity
  event Flushed(
    address destination,
    uint256 amount
  )
```
Emit when the flush function has executed.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`destination`| address | Address receiving funds
|`amount`| uint256 |      Amount of tokens transferred
### DestinationSet
```solidity
  event DestinationSet(
    address destination
  )
```
Emit when destination is set.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`destination`| address | Destination address
### StrategySet
```solidity
  event StrategySet(
    contract IStrategy strategy
  )
```
Emit when strategy is set.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`strategy`| contract IStrategy | Strategy address
### ReserveSet
```solidity
  event ReserveSet(
    contract IReserve reserve
  )
```
Emit when reserve is set.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`reserve`| contract IReserve | Reserve address
