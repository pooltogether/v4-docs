The DrawPrize distributes claimable draw prizes to users via a pull model.
            Managing the regularly captured PrizePool interest, a DrawPrize is the
            entrypoint for users to submit Draw.drawId(s) and winning pick indices.
            Communicating with a DrawCalculator, the DrawPrize will determine the maximum
            prize payout and transfer those tokens directly to a user address.

## Functions
### constructor
```solidity
  function constructor(
    address _owner,
    contract IERC20 _token,
    contract IDrawCalculator _drawCalculator
  ) public
```
Initialize DrawPrize smart contract.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_owner` | address |           Address of the DrawPrize owner
|`_token` | contract IERC20 |           Token address
|`_drawCalculator` | contract IDrawCalculator | DrawCalculator address

### claim
```solidity
  function claim(
    address user,
    uint32[] drawIds,
    bytes data
  ) external returns (uint256)
```
Claim a user token payouts via a collection of draw ids and pick indices.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`user` | address |    Address of user to claim awards for. Does NOT need to be msg.sender
|`drawIds` | uint32[] | Draw IDs from global DrawHistory reference
|`data` | bytes |    The data to pass to the draw calculator

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Actual`| address | claim payout.  If the user has previously claimed a draw, this may be less.
### getDrawCalculator
```solidity
  function getDrawCalculator(
  ) external returns (contract IDrawCalculator)
```
Read DrawCalculator




### getDrawPayoutBalanceOf
```solidity
  function getDrawPayoutBalanceOf(
    address user,
    uint32 drawId
  ) external returns (uint256)
```
Get the amount that a user has already been paid out for a draw


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`user` | address |   User address
|`drawId` | uint32 | Draw ID

### getToken
```solidity
  function getToken(
  ) external returns (contract IERC20)
```
Read global Ticket variable.




### setDrawCalculator
```solidity
  function setDrawCalculator(
    contract IDrawCalculator _newCalculator
  ) external returns (contract IDrawCalculator)
```
Sets DrawCalculator reference for individual draw id.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_newCalculator` | contract IDrawCalculator |  DrawCalculator address

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`New`| contract IDrawCalculator | DrawCalculator address
### withdrawERC20
```solidity
  function withdrawERC20(
    contract IERC20 _erc20Token,
    address _to,
    uint256 _amount
  ) external returns (bool)
```
Transfer ERC20 tokens out of this contract.

   This function is only callable by the owner.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_erc20Token` | contract IERC20 | ERC20 token to transfer.
|`_to` | address | Recipient of the tokens.
|`_amount` | uint256 | Amount of tokens to transfer.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`true`| contract IERC20 | if operation is successful.
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
### ClaimedDraw
```solidity
  event ClaimedDraw(
    address user,
    uint32 drawId,
    uint256 payout
  )
```
Emitted when a user has claimed N draw payouts.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`user`| address |        User address receiving draw claim payouts
|`drawId`| uint32 |      Draw id that was paid out
|`payout`| uint256 | Payout for draw
### DrawCalculatorSet
```solidity
  event DrawCalculatorSet(
    contract IDrawCalculator calculator
  )
```
Emitted when a DrawCalculator is set


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`calculator`| contract IDrawCalculator | DrawCalculator address
### TokenSet
```solidity
  event TokenSet(
    contract IERC20 token
  )
```
Emitted when a global Ticket variable is set.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`token`| contract IERC20 | Token address
### ERC20Withdrawn
```solidity
  event ERC20Withdrawn(
    contract IERC20 token,
    address to,
    uint256 amount
  )
```
Emitted when ERC20 tokens are withdrawn


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`token`| contract IERC20 | ERC20 token transferred.
|`to`| address | Address that received funds.
|`amount`| uint256 | Amount of tokens transferred.
