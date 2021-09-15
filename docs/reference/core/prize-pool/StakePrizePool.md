


## Functions
### initialize
```solidity
  function initialize(
    contract IControlledToken[] _controlledTokens,
    contract IERC20Upgradeable _stakeToken
  ) public
```
Initializes the Prize Pool and Yield Service with the required contract connections


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_controlledTokens` | contract IControlledToken[] | Array of addresses for the Ticket and Sponsorship Tokens controlled by the Prize Pool
|`_stakeToken` | contract IERC20Upgradeable | Address of the stake token

### _canAwardExternal
```solidity
  function _canAwardExternal(
    address _externalToken
  ) internal returns (bool)
```
Determines whether the passed token can be transferred out as an external award.

Different yield sources will hold the deposits as another kind of token: such a Compound's cToken.  The
prize strategy should not be allowed to move those tokens.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_externalToken` | address | The address of the token to check

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`True`| address | if the token may be awarded, false otherwise
### _balance
```solidity
  function _balance(
  ) internal returns (uint256)
```
Returns the total balance (in asset tokens).  This includes the deposits and interest.



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | underlying balance of asset tokens
### _token
```solidity
  function _token(
  ) internal returns (contract IERC20Upgradeable)
```




### _supply
```solidity
  function _supply(
    uint256 mintAmount
  ) internal
```
Supplies asset tokens to the yield source.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`mintAmount` | uint256 | The amount of asset tokens to be supplied

### _redeem
```solidity
  function _redeem(
    uint256 redeemAmount
  ) internal returns (uint256)
```
Redeems asset tokens from the yield source.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`redeemAmount` | uint256 | The amount of yield-bearing tokens to be redeemed

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`| uint256 | actual amount of tokens that were redeemed.
## Events
### StakePrizePoolInitialized
```solidity
  event StakePrizePoolInitialized(
  )
```



