L1TimelockTrigger(s) acts as an intermediary between multiple V4 smart contracts.
            The L1TimelockTrigger is responsible for pushing Draws to a DrawBuffer and routing
            claim requests from a PrizeDistributor to a DrawCalculator. The primary objective is
            to  include a "cooldown" period for all new Draws. Allowing the correction of a
            malicously set Draw in the unfortunate event an Owner is compromised.




## Functions
### constructor
```solidity
  function constructor(
    address _owner,
    contract IPrizeDistributionBuffer _prizeDistributionBuffer,
    contract IDrawCalculatorTimelock _timelock
  ) public
```
Initialize L1TimelockTrigger smart contract.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_owner` | address |                    Address of the L1TimelockTrigger owner.
|`_prizeDistributionBuffer` | contract IPrizeDistributionBuffer | PrizeDistributionBuffer address
|`_timelock` | contract IDrawCalculatorTimelock |                 Elapsed seconds before new Draw is available

### push
```solidity
  function push(
    struct IDrawBeacon.Draw _draw,
    struct IPrizeDistributionBuffer.PrizeDistribution _prizeDistribution
  ) external
```
Push Draw onto draws ring buffer history.

   Restricts new draws by forcing a push timelock.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_draw` | struct IDrawBeacon.Draw | Draw struct
|`_prizeDistribution` | struct IPrizeDistributionBuffer.PrizeDistribution | PrizeDistribution struct

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
    contract IPrizeDistributionBuffer prizeDistributionBuffer,
    contract IDrawCalculatorTimelock timelock
  )
```
Emitted when the contract is deployed.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`prizeDistributionBuffer`| contract IPrizeDistributionBuffer | The address of the prize distribution buffer contract.
|`timelock`| contract IDrawCalculatorTimelock | The address of the DrawCalculatorTimelock
### PrizeDistributionPushed
```solidity
  event PrizeDistributionPushed(
    uint32 drawId,
    struct IPrizeDistributionBuffer.PrizeDistribution prizeDistribution
  )
```
Emitted when target prize distribution is pushed.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`drawId`| uint32 |    Draw ID
|`prizeDistribution`| struct IPrizeDistributionBuffer.PrizeDistribution | PrizeDistribution
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
