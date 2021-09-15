

## Functions
### initialize
```solidity
  function initialize(
    address _drawCalculatorManager,
    contract IDrawHistory _drawHistory
  ) external
```
Initialize claimable draw smart contract.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_drawCalculatorManager` | address |  Address of the draw calculator manager
|`_drawHistory` | contract IDrawHistory |            Address of the draw history contract

### userDrawPayout
```solidity
  function userDrawPayout(
    address user,
    uint32 drawId
  ) external returns (uint96)
```
Allows users to check the claimable status for a target draw. 

   Checks a claimable status for target draw by reading from a user's claim history in claimedDraws.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`user` | address |   Address of user
|`drawId` | uint32 | Draw id

### userDrawPayouts
```solidity
  function userDrawPayouts(
    address user
  ) external returns (uint96[8])
```
Reads a user draw claim history.

   Reads a user draw claim history, which is stored in a packed bytes32 "word"

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`user` | address | Address of user

### setDrawCalculator
```solidity
  function setDrawCalculator(
    uint32 _drawId,
    contract IDrawCalculator _newCalculator
  ) external returns (contract IDrawCalculator)
```
External function to set a new draw calculator.

   External function to sets a new draw calculator, which is then sequentially stored in new draw structs. Enabling unique prize calculators for individual draws.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_drawId` | uint32 |    Draw id
|`_newCalculator` | contract IDrawCalculator |  New draw calculator address

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`New`| uint32 | calculator address
### setDrawHistory
```solidity
  function setDrawHistory(
  ) external returns (contract IDrawHistory)
```
External function to set a new draw calculator. Only callable by manager or owner.
    @param _drawHistory Address of the draw history contract



### claim
```solidity
  function claim(
    address _user,
    uint32[][] _drawIds,
    contract IDrawCalculator[] _drawCalculators,
    bytes[] _data
  ) external returns (uint256)
```
External function to claim a user's award by passing in the calculated drawIds, drawCalculators and pickIndices. 



#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_user` | address |             Address of user to claim awards for. Does NOT need to be msg.sender
|`_drawIds` | uint32[][] |          Index of the draw in the draws array
|`_drawCalculators` | contract IDrawCalculator[] |  Address of the draw calculator for a set of draw ids
|`_data` | bytes[] |             The draw pick indices (uint256[][]) passed as a formatted bytes correlating to the draw ids

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Total`| address | claim payout
### withdrawERC20
```solidity
  function withdrawERC20(
    contract IERC20Upgradeable _erc20Token,
    address _to,
    uint256 _amount
  ) external returns (bool)
```
Transfer ERC20 tokens out of this contract.

This function is only callable by the owner asset manager.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_erc20Token` | contract IERC20Upgradeable | ERC20 token to transfer.
|`_to` | address | Recipient of the tokens.
|`_amount` | uint256 | Amount of tokens to transfer.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`true`| contract IERC20Upgradeable | if operation is successful.
## Events
### ClaimedDraw
```solidity
  event ClaimedDraw(
    address user,
    uint256 totalPayout
  )
```
Emitted when a user has claimed N of draw prizes.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`user`| address |             Address of user receiving draw(s) total award payout
|`totalPayout`| uint256 |      Total award payout calculated using total draw ids and pick indices
### DrawCalculatorSet
```solidity
  event DrawCalculatorSet(
    uint256 calculator
  )
```
Emitted when a new draw calculator is set.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`calculator`| uint256 | Address of the new calculator used to calculate award payout
### DrawHistorySet
```solidity
  event DrawHistorySet(
    contract IDrawHistory drawHistory
  )
```
Emitted when a new draw history address is set.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`drawHistory`| contract IDrawHistory | Address of the new draw drawHistory contract
### ERC20Withdrawn
```solidity
  event ERC20Withdrawn(
    contract IERC20Upgradeable token,
    address to,
    uint256 amount
  )
```
Emitted when ERC20 tokens are withdrawn from the claimable draw.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`token`| contract IERC20Upgradeable | ERC20 token transferred.
|`to`| address | Address that received funds.
|`amount`| uint256 | Amount of tokens transferred.
