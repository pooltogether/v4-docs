The PrizeFlush is a helper library to facilate interest distribution.

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
Set owner, reserve and strategy when deployed.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_owner` | address |       address
|`_destination` | address | address
|`_strategy` | contract IStrategy |    IStrategy
|`_reserve` | contract IReserve |     IReserve


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
Migrate interest from PrizePool to DrawPrize in single transaction.

   Captures interest, checkpoint data and transfers tokens to final destination.


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
    address reserve,
    contract IReserve strategy
  )
```
Emit when contract deployed.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`reserve`| address | IReserve
|`strategy`| contract IReserve | IStrategy

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
  )
```



### DestinationSet
```solidity
  event DestinationSet(
  )
```



### StrategySet
```solidity
  event StrategySet(
  )
```



### ReserveSet
```solidity
  event ReserveSet(
  )
```



