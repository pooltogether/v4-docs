The Reserve contract provides historical lookups of a token balance increase during a target timerange.
              As the Reserve contract transfers OUT tokens, the withdraw accumulator is increased. When tokens are
              transfered IN new checkpoint *can* be created if checkpoint() is called after transfering tokens.
              By using the reserve and withdraw accumulators to create a new checkpoint, any contract or account
              can lookup the balance increase of the reserve for a target timerange.   

   By calculating the total held tokens in a specific time range, contracts that require knowledge 
              of captured interest during a draw period, can easily call into the Reserve and deterministically
              determine the newly aqcuired tokens for that time range.



## Functions
### constructor
```solidity
  function constructor(
    address _owner,
    contract IERC20 _token
  ) public
```
Constructs Ticket with passed parameters.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_owner` | address | Owner address
|`_token` | contract IERC20 | ERC20 address

### checkpoint
```solidity
  function checkpoint(
  ) external
```
Create observation checkpoint in ring bufferr.

   Calculates total desposited tokens since last checkpoint and creates new accumulator checkpoint.


### getToken
```solidity
  function getToken(
  ) external returns (contract IERC20)
```
Read global token value.




### getReserveAccumulatedBetween
```solidity
  function getReserveAccumulatedBetween(
    uint32 startTimestamp,
    uint32 endTimestamp
  ) external returns (uint224)
```
Calculate token accumulation beween timestamp range.

   Search the ring buffer for two checkpoint observations and diffs accumulator amount.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`startTimestamp` | uint32 | Account address
|`endTimestamp` | uint32 |   Transfer amount

### withdrawTo
```solidity
  function withdrawTo(
    address recipient,
    uint256 amount
  ) external
```
Transfer Reserve token balance to recipient address.

   Creates checkpoint before token transfer. Increments withdrawAccumulator with amount.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`recipient` | address | Account address
|`amount` | uint256 |    Transfer amount

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
### Checkpoint
```solidity
  event Checkpoint(
    uint256 reserveAccumulated,
    uint256 withdrawAccumulated
  )
```
Emit when checkpoint is created.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`reserveAccumulated`| uint256 |  Total depsosited
|`withdrawAccumulated`| uint256 | Total withdrawn
### Withdrawn
```solidity
  event Withdrawn(
    address recipient,
    uint256 amount
  )
```
Emit when the withdrawTo function has executed.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`recipient`| address | Address receiving funds
|`amount`| uint256 |    Amount of tokens transfered.
