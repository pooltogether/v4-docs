Accounting is managed using Controlled Tokens, whose mint and burn functions can only be called by this contract.

Must be inherited to provide specific yield-bearing asset control, such as Compound cTokens

## Functions
### initialize
```solidity
  function initialize(
    contract IControlledToken[] _controlledTokens
  ) public
```
Initializes the Prize Pool


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_controlledTokens` | contract IControlledToken[] | Array of ControlledTokens that are controlled by this Prize Pool.

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
### balance
```solidity
  function balance(
  ) external returns (uint256)
```

Returns the total underlying balance of all assets. This includes both principal and interest.


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | underlying balance of assets
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
### canAwardExternal
```solidity
  function canAwardExternal(
    address _externalToken
  ) external returns (bool)
```

Checks with the Prize Pool if a specific token type may be awarded as an external prize

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_externalToken` | address | The address of the token to check

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`True`| address | if the token may be awarded, false otherwise
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
|`The`| address | actual exit fee paid
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



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | total amount of assets to be awarded for the current prize
### award
```solidity
  function award(
    address _to,
    uint256 _amount,
    contract IControlledToken _controlledToken
  ) external
```
Called by the prize strategy to award prizes.

The amount awarded must be less than the awardBalance()

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_to` | address | The address of the winner that receives the award
|`_amount` | uint256 | The amount of assets to be awarded
|`_controlledToken` | contract IControlledToken | The address of the asset token being awarded

### transferExternalERC20
```solidity
  function transferExternalERC20(
    address _to,
    address _amount,
    uint256 _externalToken
  ) external
```
Called by the Prize-Strategy to transfer out external ERC20 tokens

Used to transfer out tokens held by the Prize Pool.  Could be liquidated, or anything.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_to` | address | The address of the winner that receives the award
|`_amount` | address | The amount of external assets to be awarded
|`_externalToken` | uint256 | The address of the external asset token being awarded

### awardExternalERC20
```solidity
  function awardExternalERC20(
    address _to,
    address _amount,
    uint256 _externalToken
  ) external
```
Called by the Prize-Strategy to award external ERC20 prizes

Used to award any arbitrary tokens held by the Prize Pool

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_to` | address | The address of the winner that receives the award
|`_amount` | address | The amount of external assets to be awarded
|`_externalToken` | uint256 | The address of the external asset token being awarded

### _transferOut
```solidity
  function _transferOut(
  ) internal returns (bool)
```




### _mint
```solidity
  function _mint(
    address _to,
    uint256 _amount,
    contract IControlledToken _controlledToken
  ) internal
```
Called to mint controlled tokens.  Ensures that token listener callbacks are fired.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_to` | address | The user who is receiving the tokens
|`_amount` | uint256 | The amount of tokens they are receiving
|`_controlledToken` | contract IControlledToken | The token that is going to be minted

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

### _setLiquidityCap
```solidity
  function _setLiquidityCap(
  ) internal
```




### _addControlledToken
```solidity
  function _addControlledToken(
    contract IControlledToken _controlledToken,
    uint256 _index
  ) internal
```
Adds a new controlled token


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_controlledToken` | contract IControlledToken | The controlled token to add.
|`_index` | uint256 | The index to add the controlledToken

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
|`_prizeStrategy` | address | The new prize strategy

### _setPrizeStrategy
```solidity
  function _setPrizeStrategy(
    address _prizeStrategy
  ) internal
```
Sets the prize strategy of the prize pool.  Only callable by the owner.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_prizeStrategy` | address | The new prize strategy

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
### _currentTime
```solidity
  function _currentTime(
  ) internal returns (uint256)
```

Gets the current time as represented by the current block


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | timestamp of the current block
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
### compLikeDelegate
```solidity
  function compLikeDelegate(
    contract ICompLike _compLike,
    address _to
  ) external
```
Delegate the votes for a Compound COMP-like token held by the prize pool


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_compLike` | contract ICompLike | The COMP-like token held by the prize pool that should be delegated
|`_to` | address | The address to delegate to

### onERC721Received
```solidity
  function onERC721Received(
    address _operator,
    address _from,
    uint256 _tokenId,
    bytes _data
  ) external returns (bytes4)
```
Required for ERC721 safe token transfers from smart contracts.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_operator` | address | The address that acts on behalf of the owner
|`_from` | address | The current owner of the NFT
|`_tokenId` | uint256 | The NFT to transfer
|`_data` | bytes | Additional data with no specified format, sent in call to `_to`.

### _tokenTotalSupply
```solidity
  function _tokenTotalSupply(
  ) internal returns (uint256)
```
The total of all controlled tokens



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | current total of all tokens
### _canAddLiquidity
```solidity
  function _canAddLiquidity(
    uint256 _amount
  ) internal returns (bool)
```

Checks if the Prize Pool can receive liquidity based on the current cap

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_amount` | uint256 | The amount of liquidity to be added to the Prize Pool

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`True`| uint256 | if the Prize Pool can receive the specified amount of liquidity
### _isControlled
```solidity
  function _isControlled(
    contract IControlledToken controlledToken
  ) internal returns (bool)
```

Checks if a specific token is controlled by the Prize Pool

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`controlledToken` | contract IControlledToken | The address of the token to check

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`True`| contract IControlledToken | if the token is a controlled token, false otherwise
### isControlled
```solidity
  function isControlled(
    contract IControlledToken controlledToken
  ) external returns (bool)
```

Checks if a specific token is controlled by the Prize Pool

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`controlledToken` | contract IControlledToken | The address of the token to check

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`True`| contract IControlledToken | if the token is a controlled token, false otherwise
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
### _token
```solidity
  function _token(
  ) internal returns (contract IERC20Upgradeable)
```
Returns the ERC20 asset token used for deposits.



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`|  | ERC20 asset token
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
