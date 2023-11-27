[Git Source](https://github.com/GenerationSoftware/pt-v5-vault-boost/blob/276fb4e1dc7c1a3b3d574c7aa2113726fb1d1020/src/VaultBooster.sol)



Allows someone to liquidate arbitrary tokens for a vault and improve the vault's chance of winning

## Events

### SetBoost

```solidity
event SetBoost(contract IERC20 token, address liquidationPair, UD2x18 multiplierOfTotalSupplyPerSecond, uint96 tokensPerSecond, uint144 initialAvailable, uint48 lastAccruedAt)
```

Emitted when a boost is set

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract IERC20 | The token to liquidate to boost the Vault's chances |
| liquidationPair | address | The pair that will act as the liquidator |
| multiplierOfTotalSupplyPerSecond | UD2x18 | The multiplier of the total supply per second. Can be used to simulate APR. Can be combined with tokensPerSecond |
| tokensPerSecond | uint96 | The number of tokens to accrue per second. Is a simple straight time*amount allocation. Can be combiend with the multiplier. |
| initialAvailable | uint144 | The initial available balance |
| lastAccruedAt | uint48 | The timestamp at which the boost was set |

### Deposited

```solidity
event Deposited(contract IERC20 token, address from, uint256 amount)
```

Emitted when someone deposits tokens

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract IERC20 | The token that they deposited |
| from | address | The account that deposited the tokens |
| amount | uint256 | The amount that was deposited. |

### Withdrawn

```solidity
event Withdrawn(contract IERC20 token, address from, uint256 amount)
```

Emitted when tokens are withdrawn by the owner

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract IERC20 | The token that was withdrawn |
| from | address | The account that withdraw the tokens |
| amount | uint256 | The amount of tokens that were withdrawn |

### Liquidated

```solidity
event Liquidated(contract IERC20 token, address from, uint256 amountIn, uint256 amountOut, uint256 availableBoostBalance)
```

Emitted when tokens are liquidated

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract IERC20 | The token that was sold |
| from | address | The account that is receiving the tokens |
| amountIn | uint256 | The amount of tokens that were contributed to the prize pool |
| amountOut | uint256 | The amount of tokens that were sold |
| availableBoostBalance | uint256 | The remaining available boost balance for the token |

### BoostAccrued

```solidity
event BoostAccrued(contract IERC20 token, uint256 availableBoostBalance)
```

Emitted when boost tokens are accrued

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract IERC20 | The token that accrued |
| availableBoostBalance | uint256 | The new available balance |

## Variables

### prizePool

```solidity
contract PrizePool prizePool
```

The prize pool that this booster will contribute to

### twabController

```solidity
contract TwabController twabController
```

The prize pool's twab controller; copied here to save gas

### vault

```solidity
address vault
```

The vault that the VaultBooster is boosting

## Functions

### constructor

```solidity
constructor(contract PrizePool _prizePool, address _vault, address _owner) public
```

Constructs a new VaultBooster

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _prizePool | contract PrizePool | The prize pool to contribute to |
| _vault | address | The vault to boost |
| _owner | address | The owner of the VaultBooster contract |

### getBoost

```solidity
function getBoost(contract IERC20 _token) external returns (struct Boost)
```

Retrieves boost details for a token

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | contract IERC20 | The token whose boost details to retrieve |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct Boost | The boost details |
### setBoost

```solidity
function setBoost(contract IERC20 _token, address _liquidationPair, UD2x18 _multiplierOfTotalSupplyPerSecond, uint96 _tokensPerSecond, uint144 _initialAvailable) external
```

Allows the owner to configure a boost for a token

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | contract IERC20 | The token that will be liquidated to boost the chances of the vault |
| _liquidationPair | address | The liquidation pair that will facilitate liquidations |
| _multiplierOfTotalSupplyPerSecond | UD2x18 | The multiplier of the total supply per second, useful for simulating APR. Can be combined with tokensPerSecond. |
| _tokensPerSecond | uint96 | A simple tokensPerSecond*deltaTime accumulator. Can be combined with the multiplier. |
| _initialAvailable | uint144 | The initial available balance. If this value is greater than this contract's current balance of the given token, the current balance will be used instead. |

### deposit

```solidity
function deposit(contract IERC20 _token, uint256 _amount) external
```

Deposits tokens into this contract.

_Useful because it ensures `accrue` is called before depositing_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | contract IERC20 | The token to deposit |
| _amount | uint256 | The amount to deposit |

### accrue

```solidity
function accrue(contract IERC20 _token) external returns (uint256)
```

Accrues the boost for the given token

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | contract IERC20 | The token whose boost should be updated |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The new available balance of the boost |
### withdraw

```solidity
function withdraw(contract IERC20 _token, uint256 _amount) external
```

allows the owner to withdraw tokens

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _token | contract IERC20 | The token to withdraw |
| _amount | uint256 | The amount of tokens to withdraw |

### liquidatableBalanceOf

```solidity
function liquidatableBalanceOf(address _tokenOut) external returns (uint256)
```

Get the available amount of tokens that can be swapped.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenOut | address |  |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | uint256 Available amount of `token` |
### transferTokensOut

```solidity
function transferTokensOut(address, address receiver, address tokenOut, uint256 amountOut) external returns (bytes)
```

Transfers tokens to the receiver

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
|  | address |  |
| receiver | address | Address of the account that will receive `tokenOut` |
| tokenOut | address | Address of the token being bought |
| amountOut | uint256 | Amount of token being bought |

### verifyTokensIn

```solidity
function verifyTokensIn(address tokenIn, uint256 amountIn, bytes transferTokensOutData) external
```

Verifies that tokens have been transferred in.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenIn | address | Address of the token being sold |
| amountIn | uint256 | Amount of token being sold |
| transferTokensOutData | bytes | Data returned by the corresponding transferTokensOut call |

### isLiquidationPair

```solidity
function isLiquidationPair(address tokenOut, address liquidationPair) external view returns (bool)
```

Checks if a liquidation pair can be used to liquidate the given tokenOut from this source.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| tokenOut | address | The address of the token to liquidate |
| liquidationPair | address | The address of the liquidation pair that is being checked |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | bool True if the liquidation pair can be used, false otherwise |
### targetOf

```solidity
function targetOf(address _tokenIn) external view returns (address)
```

Get the address that will receive `tokenIn`.

_Reverts if `_tokenIn` isn't the prize token.
Always returns the prize pool address._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _tokenIn | address |  |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address Address of the target |

## Structs

### Boost

```solidity
struct Boost {
  address liquidationPair;
  UD2x18 multiplierOfTotalSupplyPerSecond;
  uint96 tokensPerSecond;
  uint144 available;
  uint48 lastAccruedAt;
}
```

## Errors

### OnlyLiquidationPair

```solidity
error OnlyLiquidationPair()
```

Emitted when someone tries to call liquidate and isn't the liquidation pair

### InsufficientAvailableBalance

```solidity
error InsufficientAvailableBalance(uint256 amountOut, uint256 available)
```

Emitted when the liquidator attempts to liquidate more than the available balance

### UnsupportedTokenIn

```solidity
error UnsupportedTokenIn()
```

Emitted when the liquidator attempts to liquidate for a token other than the prize token

### ZeroAmountWithdraw

```solidity
error ZeroAmountWithdraw()
```

Emitted when a withdraw of zero amount is initiated.

### ZeroAmountDeposit

```solidity
error ZeroAmountDeposit()
```

Emitted when a deposit of zero amount is initiated.

### VaultZeroAddress

```solidity
error VaultZeroAddress()
```

Emitted when the vault is set to the zero address.

### OwnerZeroAddress

```solidity
error OwnerZeroAddress()
```

Emitted when the owner is set to the zero address.

### CannotDepositWithoutBoost

```solidity
error CannotDepositWithoutBoost(contract IERC20 token)
```

Emitted when someone tries to deposit when no boost has been set for a token

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| token | contract IERC20 | The token that was attempted to be deposited |

### TokenZeroAddress

```solidity
error TokenZeroAddress()
```

Emitted when the token is set to the zero address.

### LiquidationPairZeroAddress

```solidity
error LiquidationPairZeroAddress()
```

Emitted when the liquidation pair param is the zero address.

