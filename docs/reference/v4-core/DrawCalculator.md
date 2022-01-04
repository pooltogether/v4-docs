The DrawCalculator calculates a user's prize by matching a winning random number against
            their picks. A users picks are generated deterministically based on their address and balance
            of tickets held. Prize payouts are divided into multiple tiers: grand prize, second place, etc...
            A user with a higher average weighted balance (during each draw period) will be given a large number of
            picks to choose from, and thus a higher chance to match the winning numbers.


## Structs
### `PickPrize`
  - bool won
  - uint8 tierIndex


## Functions
### constructor
```solidity
  function constructor(
    contract ITicket _ticket,
    contract IDrawBuffer _drawBuffer,
    contract IPrizeDistributionBuffer _prizeDistributionBuffer
  ) public
```
Constructor for DrawCalculator


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_ticket` | contract ITicket | Ticket associated with this DrawCalculator
|`_drawBuffer` | contract IDrawBuffer | The address of the draw buffer to push draws to
|`_prizeDistributionBuffer` | contract IPrizeDistributionBuffer | PrizeDistributionBuffer address

### calculate
```solidity
  function calculate(
    address user,
    uint32[] drawIds,
    bytes data
  ) external returns (uint256[], bytes)
```
Calculates the prize amount for a user for Multiple Draws. Typically called by a PrizeDistributor.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`user` | address | User for which to calculate prize amount.
|`drawIds` | uint32[] | drawId array for which to calculate prize amounts for.
|`data` | bytes | The ABI encoded pick indices for all Draws. Expected to be winning picks. Pick indices must be less than the totalUserPicks.

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint256[] | List of awardable prize amounts ordered by drawId.
### getDrawBuffer
```solidity
  function getDrawBuffer(
  ) external returns (contract IDrawBuffer)
```
Read global DrawBuffer variable.




### getPrizeDistributionBuffer
```solidity
  function getPrizeDistributionBuffer(
  ) external returns (contract IPrizeDistributionBuffer)
```
Read global DrawBuffer variable.




### getNormalizedBalancesForDrawIds
```solidity
  function getNormalizedBalancesForDrawIds(
    address user,
    uint32[] drawIds
  ) external returns (uint256[])
```
Returns a users balances expressed as a fraction of the total supply over time.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`user` | address | The users address
|`drawIds` | uint32[] | The drawsId to consider

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint256[] | Array of balances
## Events
### Deployed
```solidity
  event Deployed(
  )
```
Emitted when the contract is initialized


### PrizeDistributorSet
```solidity
  event PrizeDistributorSet(
  )
```
Emitted when the prizeDistributor is set/updated


