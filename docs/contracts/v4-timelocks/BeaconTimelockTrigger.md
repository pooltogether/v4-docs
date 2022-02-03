The BeaconTimelockTrigger smart contract is an upgrade of the L1TimelockTimelock smart contract.
            Reducing protocol risk by eliminating off-chain computation of PrizeDistribution parameters. The timelock will
            only pass the total supply of all tickets in a "PrizePool Network" to the prize distribution factory contract.




## Functions
### constructor
```solidity
  function constructor(
    address _owner,
    contract IPrizeDistributionFactory _prizeDistributionFactory,
    contract IDrawCalculatorTimelock _timelock
  ) public
```
Initialize BeaconTimelockTrigger smart contract.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_owner` | address | The smart contract owner
|`_prizeDistributionFactory` | contract IPrizeDistributionFactory | PrizeDistributionFactory address
|`_timelock` | contract IDrawCalculatorTimelock | DrawCalculatorTimelock address

### push
```solidity
  function push(
    struct IDrawBeacon.Draw draw,
    uint256 totalNetworkTicketSupply
  ) external
```
Locks next Draw and pushes totalNetworkTicketSupply to PrizeDistributionFactory

   Restricts new draws for N seconds by forcing timelock on the next target draw id.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`draw` | struct IDrawBeacon.Draw | Draw
|`totalNetworkTicketSupply` | uint256 | totalNetworkTicketSupply

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
### Deployed
```solidity
  event Deployed(
  )
```
Emitted when the contract is deployed.


### DrawLockedAndTotalNetworkTicketSupplyPushed
```solidity
  event DrawLockedAndTotalNetworkTicketSupplyPushed(
    uint32 drawId,
    struct IDrawBeacon.Draw draw,
    uint256 totalNetworkTicketSupply
  )
```
Emitted when Draw is locked and totalNetworkTicketSupply is pushed to PrizeDistributionFactory


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`drawId`| uint32 | Draw ID
|`draw`| struct IDrawBeacon.Draw | Draw
|`totalNetworkTicketSupply`| uint256 | totalNetworkTicketSupply
