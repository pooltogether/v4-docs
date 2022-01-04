The Yield Source Prize Pool uses a yield source contract to generate prizes.
        Funds that are deposited into the prize pool are then deposited into a yield source. (i.e. Aave, Compound, etc...)




## Functions
### constructor
```solidity
  function constructor(
    address _owner,
    contract IYieldSource _yieldSource
  ) public
```
Deploy the Prize Pool and Yield Service with the required contract connections


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_owner` | address | Address of the Yield Source Prize Pool owner
|`_yieldSource` | contract IYieldSource | Address of the yield source

### sweep
```solidity
  function sweep(
  ) external
```
Sweeps any stray balance of deposit tokens into the yield source.

This becomes prize money


### balance
```solidity
  function balance(
  ) external returns (uint256)
```



#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint256 | The underlying balance of assets
### awardBalance
```solidity
  function awardBalance(
  ) external returns (uint256)
```
Returns the balance that is available to award.

captureAwardBalance() should be called first


#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint256 | The total amount of assets to be awarded for the current prize
### canAwardExternal
```solidity
  function canAwardExternal(
    address externalToken
  ) external returns (bool)
```

Checks with the Prize Pool if a specific token type may be awarded as an external prize

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`externalToken` | address | The address of the token to check

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| bool | True if the token may be awarded, false otherwise
### isControlled
```solidity
  function isControlled(
    contract ITicket controlledToken
  ) external returns (bool)
```

Checks if a specific token is controlled by the Prize Pool

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`controlledToken` | contract ITicket | The address of the token to check

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| bool | True if the token is a controlled token, false otherwise
### getAccountedBalance
```solidity
  function getAccountedBalance(
  ) external returns (uint256)
```
Read internal Ticket accounted balance.



#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint256 | uint256 accountBalance
### getBalanceCap
```solidity
  function getBalanceCap(
  ) external returns (uint256)
```
Read internal balanceCap variable



### getLiquidityCap
```solidity
  function getLiquidityCap(
  ) external returns (uint256)
```
Read internal liquidityCap variable



### getTicket
```solidity
  function getTicket(
  ) external returns (contract ITicket)
```
Read ticket variable



### getPrizeStrategy
```solidity
  function getPrizeStrategy(
  ) external returns (address)
```
Read prizeStrategy variable



### getToken
```solidity
  function getToken(
  ) external returns (address)
```
Read token variable



### captureAwardBalance
```solidity
  function captureAwardBalance(
  ) external returns (uint256)
```
Captures any available interest as award balance.

This function also captures the reserve fees.


#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint256 | The total amount of assets to be awarded for the current prize
### depositTo
```solidity
  function depositTo(
    address to,
    uint256 amount
  ) external
```
Deposit assets into the Prize Pool in exchange for tokens


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`to` | address | The address receiving the newly minted tokens
|`amount` | uint256 | The amount of assets to deposit

### depositToAndDelegate
```solidity
  function depositToAndDelegate(
    address to,
    uint256 amount,
    address delegate
  ) external
```
Deposit assets into the Prize Pool in exchange for tokens,
then sets the delegate on behalf of the caller.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`to` | address | The address receiving the newly minted tokens
|`amount` | uint256 | The amount of assets to deposit
|`delegate` | address | The address to delegate to for the caller

### withdrawFrom
```solidity
  function withdrawFrom(
    address from,
    uint256 amount
  ) external returns (uint256)
```
Withdraw assets from the Prize Pool instantly.  A fairness fee may be charged for an early exit.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`from` | address | The address to redeem tokens from.
|`amount` | uint256 | The amount of tokens to redeem for assets.

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint256 | The actual amount withdrawn
### award
```solidity
  function award(
    address to,
    uint256 amount
  ) external
```
Called by the prize strategy to award prizes.

The amount awarded must be less than the awardBalance()

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`to` | address | The address of the winner that receives the award
|`amount` | uint256 | The amount of assets to be awarded

### transferExternalERC20
```solidity
  function transferExternalERC20(
    address to,
    address externalToken,
    uint256 amount
  ) external
```
Called by the Prize-Strategy to transfer out external ERC20 tokens

Used to transfer out tokens held by the Prize Pool.  Could be liquidated, or anything.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`to` | address | The address of the winner that receives the award
|`externalToken` | address | The address of the external asset token being awarded
|`amount` | uint256 | The amount of external assets to be awarded

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

### setBalanceCap
```solidity
  function setBalanceCap(
    uint256 balanceCap
  ) external returns (bool)
```
Allows the owner to set a balance cap per `token` for the pool.

If a user wins, his balance can go over the cap. He will be able to withdraw the excess but not deposit.
Needs to be called after deploying a prize pool to be able to deposit into it.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`balanceCap` | uint256 | New balance cap.

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| bool | True if new balance cap has been successfully set.
### setLiquidityCap
```solidity
  function setLiquidityCap(
    uint256 liquidityCap
  ) external
```
Allows the Governor to set a cap on the amount of liquidity that he pool can hold


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`liquidityCap` | uint256 | The new liquidity cap for the prize pool

### setTicket
```solidity
  function setTicket(
    contract ITicket ticket
  ) external returns (bool)
```
Set prize pool ticket.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`ticket` | contract ITicket | Address of the ticket to set.

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| bool | True if ticket has been successfully set.
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
|`_prizeStrategy` | address | The new prize strategy.

### compLikeDelegate
```solidity
  function compLikeDelegate(
    contract ICompLike compLike,
    address to
  ) external
```
Delegate the votes for a Compound COMP-like token held by the prize pool


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`compLike` | contract ICompLike | The COMP-like token held by the prize pool that should be delegated
|`to` | address | The address to delegate to

### onERC721Received
```solidity
  function onERC721Received(
  ) external returns (bytes4)
```

Whenever an {IERC721} `tokenId` token is transferred to this contract via {IERC721-safeTransferFrom}
by `operator` from `from`, this function is called.
It must return its Solidity selector to confirm the token transfer.
If any other value is returned or the interface is not implemented by the recipient, the transfer will be reverted.
The selector can be obtained in Solidity with `IERC721.onERC721Received.selector`.


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
### Deployed
```solidity
  event Deployed(
    address yieldSource
  )
```

Emitted when yield source prize pool is deployed.

#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`yieldSource`| address | Address of the yield source.
### Swept
```solidity
  event Swept(
    uint256 amount
  )
```
Emitted when stray deposit token balance in this contract is swept


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`amount`| uint256 | The amount that was swept
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

Event emitted when assets are withdrawn

### BalanceCapSet
```solidity
  event BalanceCapSet(
  )
```

Event emitted when the Balance Cap is set

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

### TicketSet
```solidity
  event TicketSet(
  )
```

Event emitted when the Ticket is set

### ErrorAwardingExternalERC721
```solidity
  event ErrorAwardingExternalERC721(
  )
```

Emitted when there was an error thrown awarding an External ERC721

