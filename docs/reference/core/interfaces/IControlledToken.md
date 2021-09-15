ERC20 Tokens with a controller for minting & burning


## Functions
### controller
```solidity
  function controller(
  ) external returns (address)
```
Interface to the contract responsible for controlling mint/burn



### controllerMint
```solidity
  function controllerMint(
    address user,
    uint256 amount
  ) external
```
Allows the controller to mint tokens for a user account

May be overridden to provide more granular control over minting

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`user` | address | Address of the receiver of the minted tokens
|`amount` | uint256 | Amount of tokens to mint

### controllerBurn
```solidity
  function controllerBurn(
    address user,
    uint256 amount
  ) external
```
Allows the controller to burn tokens from a user account

May be overridden to provide more granular control over burning

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`user` | address | Address of the holder account to burn tokens from
|`amount` | uint256 | Amount of tokens to burn

### controllerBurnFrom
```solidity
  function controllerBurnFrom(
    address operator,
    address user,
    uint256 amount
  ) external
```
Allows an operator via the controller to burn tokens on behalf of a user account

May be overridden to provide more granular control over operator-burning

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`operator` | address | Address of the operator performing the burn action via the controller contract
|`user` | address | Address of the holder account to burn tokens from
|`amount` | uint256 | Amount of tokens to burn

## Events
### Initialized
```solidity
  event Initialized(
  )
```

Emitted when an instance is initialized

