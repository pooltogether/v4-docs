

## Functions
### initializeYieldSourcePrizePool
```solidity
  function initializeYieldSourcePrizePool(
    contract IControlledToken[] _controlledTokens,
    contract IYieldSource _yieldSource
  ) public
```
Initializes the Prize Pool and Yield Service with the required contract connections


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_controlledTokens` | contract IControlledToken[] | Array of addresses for the Ticket and Sponsorship Tokens controlled by the Prize Pool
|`_yieldSource` | contract IYieldSource | Address of the yield source

## Events
### YieldSourcePrizePoolInitialized
```solidity
  event YieldSourcePrizePoolInitialized(
  )
```



