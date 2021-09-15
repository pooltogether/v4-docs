

## Functions
### initialize
```solidity
  function initialize(
    contract IPrizePool _prizePool
  ) external
```
Initialize the PrizeSplitStrategy smart contract.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_prizePool` | contract IPrizePool | PrizePool contract address

### distribute
```solidity
  function distribute(
  ) external returns (uint256)
```
Capture the award balance and distribute to prize splits.

   Capture the award balance and award tokens using the linked PrizePool.


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Total`|  | prize amount captured via prizePool.captureAwardBalance()
## Events
### Distributed
```solidity
  event Distributed(
    uint256 totalPrizeCaptured
  )
```
Emit when a strategy captures award amount from PrizePool.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`totalPrizeCaptured`| uint256 |  Total prize captured from PrizePool
### PrizeSplitAwarded
```solidity
  event PrizeSplitAwarded(
    address user,
    uint256 prizeAwarded,
    contract IControlledToken token
  )
```
Emit when an individual prize split is awarded.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`user`| address |          User address being awarded
|`prizeAwarded`| uint256 |  Token prize amount
|`token`| contract IControlledToken |         Token awarded address
