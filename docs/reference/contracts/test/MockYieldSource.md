
Extension of {ERC20} that adds a set of accounts with the {MinterRole},
which have permission to mint (create) new tokens as they see fit.

At construction, the deployer of the contract is the only minter.
## Functions
### constructor
```solidity
  function constructor(
  ) public
```




### yield
```solidity
  function yield(
  ) external
```




### depositToken
```solidity
  function depositToken(
  ) external returns (address)
```
Returns the ERC20 asset token used for deposits.



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | ERC20 asset token address.
### balanceOfToken
```solidity
  function balanceOfToken(
  ) external returns (uint256)
```
Returns the total balance (in asset tokens).  This includes the deposits and interest.



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`| address | underlying balance of asset tokens.
### supplyTokenTo
```solidity
  function supplyTokenTo(
    uint256 amount,
    address to
  ) external
```
Supplies tokens to the yield source.  Allows assets to be supplied on other user's behalf using the `to` param.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`amount` | uint256 | The amount of asset tokens to be supplied.  Denominated in `depositToken()` as above.
|`to` | address | The user whose balance will receive the tokens

### redeemToken
```solidity
  function redeemToken(
    uint256 amount
  ) external returns (uint256)
```
Redeems tokens from the yield source.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`amount` | uint256 | The amount of asset tokens to withdraw.  Denominated in `depositToken()` as above.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`| uint256 | actual amount of interst bearing tokens that were redeemed.
### tokensToShares
```solidity
  function tokensToShares(
  ) public returns (uint256)
```




### sharesToTokens
```solidity
  function sharesToTokens(
  ) public returns (uint256)
```




