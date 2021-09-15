

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

## Events
### StakePrizePoolInitialized
```solidity
  event StakePrizePoolInitialized(
  )
```



