The PrizeDistributor contract holds Tickets (captured interest) and distributes tickets to users with winning draw claims.
              PrizeDistributor uses an external IDrawCalculator to validate a users draw claim, before awarding payouts. To prevent users 
              from reclaiming prizes, a payout history for each draw claim is mapped to user accounts. Reclaiming a draw can occur
              if an "optimal" prize was not included in previous claim pick indices and the new claims updated payout is greater then
              the previous prize distributor claim payout.




## Functions
### constructor
```solidity
  function constructor(
    address _owner,
    contract IERC20 _token,
    contract IDrawCalculator _drawCalculator
  ) public
```
Initialize PrizeDistributor smart contract.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_owner` | address |          Owner address
|`_token` | contract IERC20 |          Token address
|`_drawCalculator` | contract IDrawCalculator | DrawCalculator address

### claim
```solidity
  function claim(
    address user,
    uint32[] drawIds,
    bytes data
  ) external returns (uint256)
```
Claim prize payout(s) by submitting valud drawId(s) and winning pick indice(s). The user address
               is used as the "seed" phrase to generate random numbers.

   The claim function is public and any wallet may execute claim on behalf of another user.
               Prizes are always paid out to the designated user account and not the caller (msg.sender).
               Claiming prizes is not limited to a single transaction. Reclaiming can be executed
               subsequentially if an "optimal" prize was not included in previous claim pick indices. The
               payout difference for the new claim is calculated during the award process and transfered to user.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`user` | address |    Address of user to claim awards for. Does NOT need to be msg.sender
|`drawIds` | uint32[] | Draw IDs from global DrawBuffer reference
|`data` | bytes |    The data to pass to the draw calculator

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint256 | Total claim payout. May include calcuations from multiple draws.
### withdrawERC20
```solidity
  function withdrawERC20(
    contract IERC20 token,
    address to,
    uint256 amount
  ) external returns (bool)
```
Transfer ERC20 tokens out of contract to recipient address.

   Only callable by contract owner.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`token` | contract IERC20 |  ERC20 token to transfer.
|`to` | address |     Recipient of the tokens.
|`amount` | uint256 | Amount of tokens to transfer.

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| bool | true if operation is successful.
### getDrawCalculator
```solidity
  function getDrawCalculator(
  ) external returns (contract IDrawCalculator)
```
Read global DrawCalculator address.




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
Read global Ticket address.




### setDrawCalculator
```solidity
  function setDrawCalculator(
    contract IDrawCalculator newCalculator
  ) external returns (contract IDrawCalculator)
```
Sets DrawCalculator reference contract.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`newCalculator` | contract IDrawCalculator | DrawCalculator address

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| contract IDrawCalculator | New DrawCalculator address
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
Emit when user has claimed token from the PrizeDistributor.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`user`| address |   User address receiving draw claim payouts
|`drawId`| uint32 | Draw id that was paid out
|`payout`| uint256 | Payout for draw
### DrawCalculatorSet
```solidity
  event DrawCalculatorSet(
    contract IDrawCalculator calculator
  )
```
Emit when DrawCalculator is set.


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
Emit when Token is set.


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
Emit when ERC20 tokens are withdrawn.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`token`| contract IERC20 |  ERC20 token transferred.
|`to`| address |     Address that received funds.
|`amount`| uint256 | Amount of tokens transferred.
