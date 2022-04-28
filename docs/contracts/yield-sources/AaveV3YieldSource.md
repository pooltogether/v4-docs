Yield Source for a PoolTogether prize pool that generates yield by depositing into Aave V3.
This contract inherits from the ERC20 implementation to keep track of users deposits.




## Functions
### constructor
```solidity
  function constructor(
    contract IAToken _aToken,
    contract IRewardsController _rewardsController,
    contract IPoolAddressesProviderRegistry _poolAddressesProviderRegistry,
    string _name,
    string _symbol,
    uint8 decimals_,
    address _owner
  ) public
```
Initializes the yield source with Aave aToken.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_aToken` | contract IAToken | Aave aToken address
|`_rewardsController` | contract IRewardsController | Aave rewardsController address
|`_poolAddressesProviderRegistry` | contract IPoolAddressesProviderRegistry | Aave poolAddressesProviderRegistry address
|`_name` | string | Token name for the underlying ERC20 shares
|`_symbol` | string | Token symbol for the underlying ERC20 shares
|`decimals_` | uint8 | Number of decimals the shares (inhereted ERC20) will have. Same as underlying asset to ensure sane exchange rates for shares.
|`_owner` | address | Owner of this contract

### balanceOfToken
```solidity
  function balanceOfToken(
    address _user
  ) external returns (uint256)
```
Returns user total balance (in asset tokens). This includes their deposit and interest.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_user` | address | Address of the user to get balance of token for

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint256 | The underlying balance of asset tokens.
### depositToken
```solidity
  function depositToken(
  ) public returns (address)
```
Returns the ERC20 asset token used for deposits.



#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| address | The ERC20 asset token address.
### decimals
```solidity
  function decimals(
  ) public returns (uint8)
```
Returns the Yield Source ERC20 token decimals.

This value should be equal to the decimals of the token used to deposit into the pool.


#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint8 | The number of decimals.
### supplyTokenTo
```solidity
  function supplyTokenTo(
    uint256 _depositAmount,
    address _to
  ) external
```
Supplies asset tokens to the yield source.

Shares corresponding to the number of tokens supplied are minted to the user's balance.
Asset tokens are supplied to the yield source, then deposited into Aave.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_depositAmount` | uint256 | The amount of asset tokens to be supplied
|`_to` | address | The user whose balance will receive the tokens

### redeemToken
```solidity
  function redeemToken(
    uint256 _redeemAmount
  ) external returns (uint256)
```
Redeems asset tokens from the yield source.

Shares corresponding to the number of tokens withdrawn are burnt from the user's balance.
Asset tokens are withdrawn from Aave, then transferred from the yield source to the user's wallet.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_redeemAmount` | uint256 | The amount of asset tokens to be redeemed

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| uint256 | The actual amount of asset tokens that were redeemed.
### claimRewards
```solidity
  function claimRewards(
    address _to
  ) external returns (bool)
```
Claims the accrued rewards for the aToken, accumulating any pending rewards.

Only callable by the owner or manager.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_to` | address | Address where the claimed rewards will be sent

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| bool | True if operation was successful.
### decreaseERC20Allowance
```solidity
  function decreaseERC20Allowance(
    contract IERC20 _token,
    address _spender,
    uint256 _amount
  ) external
```
Decrease allowance of ERC20 tokens other than the aTokens held by this contract.

This function is only callable by the owner or asset manager.
Current allowance should be computed off-chain to avoid any underflow.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_token` | contract IERC20 | Address of the ERC20 token to decrease allowance for
|`_spender` | address | Address of the spender of the tokens
|`_amount` | uint256 | Amount of tokens to decrease allowance by

### increaseERC20Allowance
```solidity
  function increaseERC20Allowance(
    contract IERC20 _token,
    address _spender,
    uint256 _amount
  ) external
```
Increase allowance of ERC20 tokens other than the aTokens held by this contract.

This function is only callable by the owner or asset manager.
Allows another contract or address to withdraw funds from the yield source.
Current allowance should be computed off-chain to avoid any overflow.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_token` | contract IERC20 | Address of the ERC20 token to increase allowance for
|`_spender` | address | Address of the spender of the tokens
|`_amount` | uint256 | Amount of tokens to increase allowance by

### transferERC20
```solidity
  function transferERC20(
    contract IERC20 _token,
    address _to,
    uint256 _amount
  ) external
```
Transfer ERC20 tokens other than the aTokens held by this contract to the recipient address.

This function is only callable by the owner or asset manager.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_token` | contract IERC20 | Address of the ERC20 token to transfer
|`_to` | address | Address of the recipient of the tokens
|`_amount` | uint256 | Amount of tokens to transfer

### manager
```solidity
  function manager(
  ) public returns (address)
```
Gets current `_manager`.



#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| address | Current `_manager` address.
### setManager
```solidity
  function setManager(
    address _newManager
  ) external returns (bool)
```
Set or change of manager.

Throws if called by any account other than the owner.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_newManager` | address | New _manager address.

#### Return Values:
| Type          | Description                                                                  |
| :------------ | :--------------------------------------------------------------------------- |
| bool | Boolean to indicate if the operation was successful or not.
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


### name
```solidity
  function name(
  ) public returns (string)
```

Returns the name of the token.


### symbol
```solidity
  function symbol(
  ) public returns (string)
```

Returns the symbol of the token, usually a shorter version of the
name.


### totalSupply
```solidity
  function totalSupply(
  ) public returns (uint256)
```

See {IERC20-totalSupply}.


### balanceOf
```solidity
  function balanceOf(
  ) public returns (uint256)
```

See {IERC20-balanceOf}.


### transfer
```solidity
  function transfer(
  ) public returns (bool)
```

See {IERC20-transfer}.
Requirements:
- `to` cannot be the zero address.
- the caller must have a balance of at least `amount`.


### allowance
```solidity
  function allowance(
  ) public returns (uint256)
```

See {IERC20-allowance}.


### approve
```solidity
  function approve(
  ) public returns (bool)
```

See {IERC20-approve}.
NOTE: If `amount` is the maximum `uint256`, the allowance is not updated on
`transferFrom`. This is semantically equivalent to an infinite approval.
Requirements:
- `spender` cannot be the zero address.


### transferFrom
```solidity
  function transferFrom(
  ) public returns (bool)
```

See {IERC20-transferFrom}.
Emits an {Approval} event indicating the updated allowance. This is not
required by the EIP. See the note at the beginning of {ERC20}.
NOTE: Does not update the allowance if the current allowance
is the maximum `uint256`.
Requirements:
- `from` and `to` cannot be the zero address.
- `from` must have a balance of at least `amount`.
- the caller must have allowance for ``from``'s tokens of at least
`amount`.


### increaseAllowance
```solidity
  function increaseAllowance(
  ) public returns (bool)
```

Atomically increases the allowance granted to `spender` by the caller.
This is an alternative to {approve} that can be used as a mitigation for
problems described in {IERC20-approve}.
Emits an {Approval} event indicating the updated allowance.
Requirements:
- `spender` cannot be the zero address.


### decreaseAllowance
```solidity
  function decreaseAllowance(
  ) public returns (bool)
```

Atomically decreases the allowance granted to `spender` by the caller.
This is an alternative to {approve} that can be used as a mitigation for
problems described in {IERC20-approve}.
Emits an {Approval} event indicating the updated allowance.
Requirements:
- `spender` cannot be the zero address.
- `spender` must have allowance for the caller of at least
`subtractedValue`.


## Events
### AaveV3YieldSourceInitialized
```solidity
  event AaveV3YieldSourceInitialized(
    contract IAToken aToken,
    contract IRewardsController rewardsController,
    contract IPoolAddressesProviderRegistry poolAddressesProviderRegistry,
    string name,
    string symbol,
    uint8 decimals,
    address owner
  )
```
Emitted when the yield source is initialized.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`aToken`| contract IAToken | Aave aToken address
|`rewardsController`| contract IRewardsController | Aave rewardsController address
|`poolAddressesProviderRegistry`| contract IPoolAddressesProviderRegistry | Aave poolAddressesProviderRegistry address
|`name`| string | Token name for the underlying ERC20 shares
|`symbol`| string | Token symbol for the underlying ERC20 shares
|`decimals`| uint8 | Number of decimals the shares (inhereted ERC20) will have. Same as underlying asset to ensure sane exchange rates for shares.
|`owner`| address | Owner of this contract
### SuppliedTokenTo
```solidity
  event SuppliedTokenTo(
    address from,
    uint256 shares,
    uint256 amount,
    address to
  )
```
Emitted when asset tokens are supplied to the yield source.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`from`| address | Address that supplied the tokens
|`shares`| uint256 | Amount of shares minted to the user
|`amount`| uint256 | Amount of tokens supplied
|`to`| address | Address that received the shares
### RedeemedToken
```solidity
  event RedeemedToken(
    address from,
    uint256 shares,
    uint256 amount
  )
```
Emitted when asset tokens are redeemed from the yield source.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`from`| address | Address who redeemed the tokens
|`shares`| uint256 | Amount of shares burnt
|`amount`| uint256 | Amount of tokens redeemed
### Claimed
```solidity
  event Claimed(
    address from,
    address to,
    address[] rewardsList,
    uint256[] claimedAmounts
  )
```
Emitted when Aave rewards have been claimed.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`from`| address | Address who claimed the rewards
|`to`| address | Address that received the rewards
|`rewardsList`| address[] | List of addresses of the reward tokens
|`claimedAmounts`| uint256[] | List that contains the claimed amount per reward token
### DecreasedERC20Allowance
```solidity
  event DecreasedERC20Allowance(
    address from,
    address spender,
    uint256 amount,
    contract IERC20 token
  )
```
Emitted when decreasing allowance of ERC20 tokens other than yield source's aToken.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`from`| address | Address of the caller
|`spender`| address | Address of the spender
|`amount`| uint256 | Amount of `token` to decrease allowance by
|`token`| contract IERC20 | Address of the ERC20 token to decrease allowance for
### IncreasedERC20Allowance
```solidity
  event IncreasedERC20Allowance(
    address from,
    address spender,
    uint256 amount,
    contract IERC20 token
  )
```
Emitted when increasing allowance of ERC20 tokens other than yield source's aToken.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`from`| address | Address of the caller
|`spender`| address | Address of the spender
|`amount`| uint256 | Amount of `token` to increase allowance by
|`token`| contract IERC20 | Address of the ERC20 token to increase allowance for
### TransferredERC20
```solidity
  event TransferredERC20(
    address from,
    address to,
    uint256 amount,
    contract IERC20 token
  )
```
Emitted when ERC20 tokens other than yield source's aToken are withdrawn from the yield source.


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`from`| address | Address of the caller
|`to`| address | Address of the recipient
|`amount`| uint256 | Amount of `token` transferred
|`token`| contract IERC20 | Address of the ERC20 token transferred
### ManagerTransferred
```solidity
  event ManagerTransferred(
    address previousManager,
    address newManager
  )
```

Emitted when `_manager` has been changed.

#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|`previousManager`| address | previous `_manager` address.
|`newManager`| address | new `_manager` address.
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
### Transfer
```solidity
  event Transfer(
  )
```

Emitted when `value` tokens are moved from one account (`from`) to
another (`to`).
Note that `value` may be zero.

### Approval
```solidity
  event Approval(
  )
```

Emitted when the allowance of a `spender` for an `owner` is set by
a call to {approve}. `value` is the new allowance.

