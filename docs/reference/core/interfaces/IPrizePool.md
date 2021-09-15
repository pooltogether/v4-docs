Accounting is managed using Controlled Tokens, whose mint and burn functions can only be called by this contract.

Must be inherited to provide specific yield-bearing asset control, such as Compound cTokens

## Functions
### tokenAtIndex
```solidity
  function tokenAtIndex(
  ) external returns (contract IControlledToken)
```

Returns the address of a token in the _tokens array.


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Address`| uint256 | of token
### depositTo
```solidity
  function depositTo(
    address to,
    uint256 amount,
    contract IControlledToken controlledToken
  ) external
```
Deposit assets into the Prize Pool in exchange for tokens


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`to` | address | The address receiving the newly minted tokens
|`amount` | uint256 | The amount of assets to deposit
|`controlledToken` | contract IControlledToken | The address of the type of token the user is minting

### withdrawFrom
```solidity
  function withdrawFrom(
    address from,
    uint256 amount,
    contract IControlledToken controlledToken
  ) external returns (uint256)
```
Withdraw assets from the Prize Pool instantly.  A fairness fee may be charged for an early exit.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`from` | address | The address to redeem tokens from.
|`amount` | uint256 | The amount of tokens to redeem for assets.
|`controlledToken` | contract IControlledToken | The address of the token to redeem (i.e. ticket or sponsorship)

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`| address | actual amount withdrawn
### awardBalance
```solidity
  function awardBalance(
  ) external returns (uint256)
```
Returns the balance that is available to award.

captureAwardBalance() should be called first


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | total amount of assets to be awarded for the current prize
### captureAwardBalance
```solidity
  function captureAwardBalance(
  ) external returns (uint256)
```
Captures any available interest as award balance.

This function also captures the reserve fees.


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | total amount of assets to be awarded for the current prize
### award
```solidity
  function award(
    address to,
    uint256 amount,
    contract IControlledToken controlledToken
  ) external
```
Called by the prize strategy to award prizes.

The amount awarded must be less than the awardBalance()

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`to` | address | The address of the winner that receives the award
|`amount` | uint256 | The amount of assets to be awarded
|`controlledToken` | contract IControlledToken | The address of the asset token being awarded

### transferExternalERC20
```solidity
  function transferExternalERC20(
    address to,
    address amount,
    uint256 externalToken
  ) external
```
Called by the Prize-Strategy to transfer out external ERC20 tokens

Used to transfer out tokens held by the Prize Pool.  Could be liquidated, or anything.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`to` | address | The address of the winner that receives the award
|`amount` | address | The amount of external assets to be awarded
|`externalToken` | uint256 | The address of the external asset token being awarded

### awardExternalERC20
```solidity
  function awardExternalERC20(
    address to,
    address amount,
    uint256 externalToken
  ) external
```
Called by the Prize-Strategy to award external ERC20 prizes

Used to award any arbitrary tokens held by the Prize Pool

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`to` | address | The address of the winner that receives the award
|`amount` | address | The amount of external assets to be awarded
|`externalToken` | uint256 | The address of the external asset token being awarded

### awardExternalERC721
```solidity
  function awardExternalERC721(
    address to,
    address externalToken,
    uint256[] tokenIds
  ) external
```
Called by the prize strategy to award external ERC721 prizes

Used to award any arbitrary NFTs held by the Prize Pool

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`to` | address | The address of the winner that receives the award
|`externalToken` | address | The address of the external NFT token being awarded
|`tokenIds` | uint256[] | An array of NFT Token IDs to be transferred

### setLiquidityCap
```solidity
  function setLiquidityCap(
    uint256 _liquidityCap
  ) external
```
Allows the Governor to set a cap on the amount of liquidity that he pool can hold


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_liquidityCap` | uint256 | The new liquidity cap for the prize pool

### setPrizeStrategy
```solidity
  function setPrizeStrategy(
    address _prizeStrategy
  ) external
```
Sets the prize strategy of the prize pool.  Only callable by the owner.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_prizeStrategy` | address | The new prize strategy.  Must implement ClaimableDrawPrizeStrategy

### token
```solidity
  function token(
  ) external returns (address)
```

Returns the address of the underlying ERC20 asset


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | address of the asset
### tokens
```solidity
  function tokens(
  ) external returns (contract IControlledToken[])
```
An array of the Tokens controlled by the Prize Pool (ie. Tickets, Sponsorship)



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`An`|  | array of controlled token addresses
### accountedBalance
```solidity
  function accountedBalance(
  ) external returns (uint256)
```
The total of all controlled tokens



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | current total of all tokens
## Events
### Initialized
```solidity
  event Initialized(
  )
```

Emitted when an instance is initialized

### ControlledTokenAdded
```solidity
  event ControlledTokenAdded(
  )
```

Event emitted when controlled token is added

### AwardCaptured
```solidity
  event AwardCaptured(
  )
```



### Deposited
```solidity
  event Deposited(
  )
```

Event emitted when assets are deposited

### Awarded
```solidity
  event Awarded(
  )
```

Event emitted when interest is awarded to a winner

### AwardedExternalERC20
```solidity
  event AwardedExternalERC20(
  )
```

Event emitted when external ERC20s are awarded to a winner

### TransferredExternalERC20
```solidity
  event TransferredExternalERC20(
  )
```

Event emitted when external ERC20s are transferred out

### AwardedExternalERC721
```solidity
  event AwardedExternalERC721(
  )
```

Event emitted when external ERC721s are awarded to a winner

### Withdrawal
```solidity
  event Withdrawal(
  )
```

Event emitted when assets are withdrawn instantly

### LiquidityCapSet
```solidity
  event LiquidityCapSet(
  )
```

Event emitted when the Liquidity Cap is set

### PrizeStrategySet
```solidity
  event PrizeStrategySet(
  )
```

Event emitted when the Prize Strategy is set

### ErrorAwardingExternalERC721
```solidity
  event ErrorAwardingExternalERC721(
  )
```

Emitted when there was an error thrown awarding an External ERC721

