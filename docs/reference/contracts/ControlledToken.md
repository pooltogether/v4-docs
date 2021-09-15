ERC20 Tokens with a controller for minting & burning

## Functions
### initialize
```solidity
  function initialize(
    string _name,
    string _symbol,
    uint8 decimals_,
    address _controller
  ) public
```
Initializes the Controlled Token with Token Details and the Controller


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_name` | string | The name of the Token
|`_symbol` | string | The symbol for the Token
|`decimals_` | uint8 | The number of decimals for the Token
|`_controller` | address | Address of the Controller contract for minting & burning

### controllerMint
```solidity
  function controllerMint(
    address _user,
    uint256 _amount
  ) external
```
Allows the controller to mint tokens for a user account

May be overridden to provide more granular control over minting

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_user` | address | Address of the receiver of the minted tokens
|`_amount` | uint256 | Amount of tokens to mint

### controllerBurn
```solidity
  function controllerBurn(
    address _user,
    uint256 _amount
  ) external
```
Allows the controller to burn tokens from a user account

May be overridden to provide more granular control over burning

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_user` | address | Address of the holder account to burn tokens from
|`_amount` | uint256 | Amount of tokens to burn

### controllerBurnFrom
```solidity
  function controllerBurnFrom(
    address _operator,
    address _user,
    uint256 _amount
  ) external
```
Allows an operator via the controller to burn tokens on behalf of a user account

May be overridden to provide more granular control over operator-burning

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_operator` | address | Address of the operator performing the burn action via the controller contract
|`_user` | address | Address of the holder account to burn tokens from
|`_amount` | uint256 | Amount of tokens to burn

### decimals
```solidity
  function decimals(
  ) public returns (uint8)
```
Returns the ERC20 controlled token decimals.

This value should be equal to the decimals of the token used to deposit into the pool.


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`uint8`|  | decimals.
