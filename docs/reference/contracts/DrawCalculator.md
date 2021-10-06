The DrawCalculator calculates a user's prize by matching a winning random number against
            their picks. A users picks are generated deterministically based on their address and balance
            of tickets held. Prize payouts are divided into multiple tiers: grand prize, second place, etc...
            A user with a higher average weighted balance (during each draw perid) will be given a large number of
            pickIndices to choose from, and thus a higher chance to match the randomly generated winning numbers.
            The DrawCalculator will retrieve data, like average weighted balance and cost of picks per draw
            from the linked Ticket and PrizeDistributionHistory contracts when payouts are being calculated.

## Functions
### constructor
```solidity
  function constructor(
    address _owner,
    contract ITicket _ticket,
    contract IDrawHistory _drawHistory,
    contract PrizeDistributionHistory _prizeDistributionHistory
  ) public
```
Constructor for DrawCalculator


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_owner` | address | Address of the DrawCalculator owner
|`_ticket` | contract ITicket | Ticket associated with this DrawCalculator
|`_drawHistory` | contract IDrawHistory | The address of the draw history to push draws to
|`_prizeDistributionHistory` | contract PrizeDistributionHistory | PrizeDistributionHistory address

### calculate
```solidity
  function calculate(
    address user,
    uint32[] drawIds,
    bytes data
  ) external returns (uint256[])
```
Calulates the prize amount for a user for Multiple Draws. Typically called by a DrawPrize.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`user` | address | User for which to calcualte prize amount
|`drawIds` | uint32[] | draw array for which to calculate prize amounts for
|`data` | bytes | The encoded pick indices for all Draws. Expected to be just indices of winning claims. Populated values must be less than totalUserPicks.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`List`| address | of awardable prizes ordered by linked drawId
### getDrawHistory
```solidity
  function getDrawHistory(
  ) external returns (contract IDrawHistory)
```
Read global DrawHistory variable.




### getPrizeDistributionHistory
```solidity
  function getPrizeDistributionHistory(
  ) external returns (contract PrizeDistributionHistory)
```
Read global DrawHistory variable.




### setDrawHistory
```solidity
  function setDrawHistory(
    contract IDrawHistory _drawHistory
  ) external returns (contract IDrawHistory)
```
Set global DrawHistory reference.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_drawHistory` | contract IDrawHistory | DrawHistory address

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`New`| contract IDrawHistory | DrawHistory address
### getNormalizedBalancesForDrawIds
```solidity
  function getNormalizedBalancesForDrawIds(
    address _user,
    uint32[] _drawIds
  ) external returns (uint256[])
```
Returns a users balances expressed as a fraction of the total supply over time.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_user` | address | The users address
|`_drawIds` | uint32[] | The drawsId to consider

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Array`| address | of balances
### checkPrizeDistributionIndicesForDrawId
```solidity
  function checkPrizeDistributionIndicesForDrawId(
    address _user,
    uint64[] _pickIndices,
    uint32 _drawId
  ) external returns (struct IDrawCalculator.PickPrize[])
```
Returns a users balances expressed as a fraction of the total supply over time.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_user` | address | The user for which to calculate the distribution indices
|`_pickIndices` | uint64[] | The users pick indices for a draw
|`_drawId` | uint32 | The draw for which to calculate the distribution indices

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`List`| address | of distributions for Draw.drawId
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
### DrawHistorySet
```solidity
  event DrawHistorySet(
    contract IDrawHistory drawHistory
  )
```
Emitted when a global DrawHistory variable is set.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`drawHistory`| contract IDrawHistory | DrawHistory address
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
Emitted when the contract is initialized


### DrawPrizeSet
```solidity
  event DrawPrizeSet(
  )
```
Emitted when the drawPrize is set/updated


