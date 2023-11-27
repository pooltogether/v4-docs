[Git Source](https://github.com/GenerationSoftware/pt-v5-twab-controller/blob/81f9274850294c5c47c879c27e299dbc9cf5fdf9/src/TwabController.sol)



This TwabController uses the TwabLib to provide token balances and on-chain historical
lookups to a user(s) time-weighted average balance. Each user is mapped to an
Account struct containing the TWAB history (ring buffer) and ring buffer parameters.
Every token.transfer() creates a new TWAB observation. The new TWAB observation is
stored in the circular ring buffer as either a new observation or rewriting a
previous observation with new parameters. One observation per period is stored.
The TwabLib guarantees minimum 1 year of search history if a period is a day.

_Time-Weighted Average Balance Controller for ERC20 tokens._

## Events

### IncreasedBalance

```solidity
event IncreasedBalance(address vault, address user, uint96 amount, uint96 delegateAmount)
```

Emitted when a balance or delegateBalance is increased.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | address | the vault for which the balance increased |
| user | address | the users whose balance increased |
| amount | uint96 | the amount the balance increased by |
| delegateAmount | uint96 | the amount the delegateBalance increased by |

### DecreasedBalance

```solidity
event DecreasedBalance(address vault, address user, uint96 amount, uint96 delegateAmount)
```

Emitted when a balance or delegateBalance is decreased.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | address | the vault for which the balance decreased |
| user | address | the users whose balance decreased |
| amount | uint96 | the amount the balance decreased by |
| delegateAmount | uint96 | the amount the delegateBalance decreased by |

### ObservationRecorded

```solidity
event ObservationRecorded(address vault, address user, uint96 balance, uint96 delegateBalance, bool isNew, struct ObservationLib.Observation observation)
```

Emitted when an Observation is recorded to the Ring Buffer.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | address | the vault for which the Observation was recorded |
| user | address | the users whose Observation was recorded |
| balance | uint96 | the resulting balance |
| delegateBalance | uint96 | the resulting delegated balance |
| isNew | bool | whether the observation is new or not |
| observation | struct ObservationLib.Observation | the observation that was created or updated |

### Delegated

```solidity
event Delegated(address vault, address delegator, address delegate)
```

Emitted when a user delegates their balance to another address.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | address | the vault for which the balance was delegated |
| delegator | address | the user who delegated their balance |
| delegate | address | the user who received the delegated balance |

### IncreasedTotalSupply

```solidity
event IncreasedTotalSupply(address vault, uint96 amount, uint96 delegateAmount)
```

Emitted when the total supply or delegateTotalSupply is increased.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | address | the vault for which the total supply increased |
| amount | uint96 | the amount the total supply increased by |
| delegateAmount | uint96 | the amount the delegateTotalSupply increased by |

### DecreasedTotalSupply

```solidity
event DecreasedTotalSupply(address vault, uint96 amount, uint96 delegateAmount)
```

Emitted when the total supply or delegateTotalSupply is decreased.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | address | the vault for which the total supply decreased |
| amount | uint96 | the amount the total supply decreased by |
| delegateAmount | uint96 | the amount the delegateTotalSupply decreased by |

### TotalSupplyObservationRecorded

```solidity
event TotalSupplyObservationRecorded(address vault, uint96 balance, uint96 delegateBalance, bool isNew, struct ObservationLib.Observation observation)
```

Emitted when a Total Supply Observation is recorded to the Ring Buffer.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | address | the vault for which the Observation was recorded |
| balance | uint96 | the resulting balance |
| delegateBalance | uint96 | the resulting delegated balance |
| isNew | bool | whether the observation is new or not |
| observation | struct ObservationLib.Observation | the observation that was created or updated |

## Variables

### PERIOD_LENGTH

```solidity
uint32 PERIOD_LENGTH
```

Sets the minimum period length for Observations. When a period elapses, a new Observation is recorded, otherwise the most recent Observation is updated.

### PERIOD_OFFSET

```solidity
uint32 PERIOD_OFFSET
```

Sets the beginning timestamp for the first period. This allows us to maximize storage as well as line up periods with a chosen timestamp.

_Ensure that the PERIOD_OFFSET is in the past._

## Functions

### constructor

```solidity
constructor(uint32 _periodLength, uint32 _periodOffset) public
```

Construct a new TwabController.

_Reverts if the period offset is in the future._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _periodLength | uint32 | Sets the minimum period length for Observations. When a period elapses, a new Observation      is recorded, otherwise the most recent Observation is updated. |
| _periodOffset | uint32 | Sets the beginning timestamp for the first period. This allows us to maximize storage as well      as line up periods with a chosen timestamp. |

### getAccount

```solidity
function getAccount(address vault, address user) external view returns (struct TwabLib.Account)
```

Loads the current TWAB Account data for a specific vault stored for a user.

_Note this is a very expensive function_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | address | the vault for which the data is being queried |
| user | address | the user whose data is being queried |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct TwabLib.Account | The current TWAB Account data of the user |
### getTotalSupplyAccount

```solidity
function getTotalSupplyAccount(address vault) external view returns (struct TwabLib.Account)
```

Loads the current total supply TWAB Account data for a specific vault.

_Note this is a very expensive function_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | address | the vault for which the data is being queried |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | struct TwabLib.Account | The current total supply TWAB Account data |
### balanceOf

```solidity
function balanceOf(address vault, address user) external view returns (uint256)
```

The current token balance of a user for a specific vault.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | address | the vault for which the balance is being queried |
| user | address | the user whose balance is being queried |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The current token balance of the user |
### totalSupply

```solidity
function totalSupply(address vault) external view returns (uint256)
```

The total supply of tokens for a vault.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | address | the vault for which the total supply is being queried |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The total supply of tokens for a vault |
### totalSupplyDelegateBalance

```solidity
function totalSupplyDelegateBalance(address vault) external view returns (uint256)
```

The total delegated amount of tokens for a vault.

_Delegated balance is not 1:1 with the token total supply. Users may delegate their
     balance to the sponsorship address, which will result in those tokens being subtracted
     from the total._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | address | the vault for which the total delegated supply is being queried |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The total delegated amount of tokens for a vault |
### delegateOf

```solidity
function delegateOf(address vault, address user) external view returns (address)
```

The current delegate of a user for a specific vault.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | address | the vault for which the delegate balance is being queried |
| user | address | the user whose delegate balance is being queried |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | The current delegate balance of the user |
### delegateBalanceOf

```solidity
function delegateBalanceOf(address vault, address user) external view returns (uint256)
```

The current delegateBalance of a user for a specific vault.

_the delegateBalance is the sum of delegated balance to this user_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | address | the vault for which the delegateBalance is being queried |
| user | address | the user whose delegateBalance is being queried |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The current delegateBalance of the user |
### getBalanceAt

```solidity
function getBalanceAt(address vault, address user, uint256 periodEndOnOrAfterTime) external view returns (uint256)
```

Looks up a users balance at a specific time in the past.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | address | the vault for which the balance is being queried |
| user | address | the user whose balance is being queried |
| periodEndOnOrAfterTime | uint256 | The time in the past for which the balance is being queried. The time will be snapped to a period end time on or after the timestamp. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The balance of the user at the target time |
### getTotalSupplyAt

```solidity
function getTotalSupplyAt(address vault, uint256 periodEndOnOrAfterTime) external view returns (uint256)
```

Looks up the total supply at a specific time in the past.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | address | the vault for which the total supply is being queried |
| periodEndOnOrAfterTime | uint256 | The time in the past for which the balance is being queried. The time will be snapped to a period end time on or after the timestamp. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The total supply at the target time |
### getTwabBetween

```solidity
function getTwabBetween(address vault, address user, uint256 startTime, uint256 endTime) external view returns (uint256)
```

Looks up the average balance of a user between two timestamps.

_Timestamps are Unix timestamps denominated in seconds_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | address | the vault for which the average balance is being queried |
| user | address | the user whose average balance is being queried |
| startTime | uint256 | the start of the time range for which the average balance is being queried. The time will be snapped to a period end time on or after the timestamp. |
| endTime | uint256 | the end of the time range for which the average balance is being queried. The time will be snapped to a period end time on or after the timestamp. |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The average balance of the user between the two timestamps |
### getTotalSupplyTwabBetween

```solidity
function getTotalSupplyTwabBetween(address vault, uint256 startTime, uint256 endTime) external view returns (uint256)
```

Looks up the average total supply between two timestamps.

_Timestamps are Unix timestamps denominated in seconds_

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | address | the vault for which the average total supply is being queried |
| startTime | uint256 | the start of the time range for which the average total supply is being queried |
| endTime | uint256 | the end of the time range for which the average total supply is being queried |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The average total supply between the two timestamps |
### periodEndOnOrAfter

```solidity
function periodEndOnOrAfter(uint256 _timestamp) external view returns (uint256)
```

Computes the period end timestamp on or after the given timestamp.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _timestamp | uint256 | The timestamp to check |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | The end timestamp of the period that ends on or immediately after the given timestamp |
### getNewestObservation

```solidity
function getNewestObservation(address vault, address user) external view returns (uint16, struct ObservationLib.Observation)
```

Looks up the newest observation for a user.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | address | the vault for which the observation is being queried |
| user | address | the user whose observation is being queried |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint16 | index The index of the observation |
| [1] | struct ObservationLib.Observation | observation The observation of the user |
### getOldestObservation

```solidity
function getOldestObservation(address vault, address user) external view returns (uint16, struct ObservationLib.Observation)
```

Looks up the oldest observation for a user.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | address | the vault for which the observation is being queried |
| user | address | the user whose observation is being queried |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint16 | index The index of the observation |
| [1] | struct ObservationLib.Observation | observation The observation of the user |
### getNewestTotalSupplyObservation

```solidity
function getNewestTotalSupplyObservation(address vault) external view returns (uint16, struct ObservationLib.Observation)
```

Looks up the newest total supply observation for a vault.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | address | the vault for which the observation is being queried |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint16 | index The index of the observation |
| [1] | struct ObservationLib.Observation | observation The total supply observation |
### getOldestTotalSupplyObservation

```solidity
function getOldestTotalSupplyObservation(address vault) external view returns (uint16, struct ObservationLib.Observation)
```

Looks up the oldest total supply observation for a vault.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| vault | address | the vault for which the observation is being queried |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint16 | index The index of the observation |
| [1] | struct ObservationLib.Observation | observation The total supply observation |
### getTimestampPeriod

```solidity
function getTimestampPeriod(uint256 time) external view returns (uint256)
```

Calculates the period a timestamp falls into.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| time | uint256 | The timestamp to check |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | period The period the timestamp falls into |
### hasFinalized

```solidity
function hasFinalized(uint256 time) external view returns (bool)
```

Checks if the given timestamp is before the current overwrite period.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| time | uint256 | The timestamp to check |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | bool | True if the given time is finalized, false if it's during the current overwrite period. |
### currentOverwritePeriodStartedAt

```solidity
function currentOverwritePeriodStartedAt() external view returns (uint256)
```

Computes the timestamp at which the current overwrite period started.

_The overwrite period is the period during which observations are collated._

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | uint256 | period The timestamp at which the current overwrite period started. |
### mint

```solidity
function mint(address _to, uint96 _amount) external
```

Mints new balance and delegateBalance for a given user.

_Note that if the provided user to mint to is delegating that the delegate's
     delegateBalance will be updated.
Mint is expected to be called by the Vault._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _to | address | The address to mint balance and delegateBalance to |
| _amount | uint96 | The amount to mint |

### burn

```solidity
function burn(address _from, uint96 _amount) external
```

Burns balance and delegateBalance for a given user.

_Note that if the provided user to burn from is delegating that the delegate's
     delegateBalance will be updated.
Burn is expected to be called by the Vault._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _from | address | The address to burn balance and delegateBalance from |
| _amount | uint96 | The amount to burn |

### transfer

```solidity
function transfer(address _from, address _to, uint96 _amount) external
```

Transfers balance and delegateBalance from a given user.

_Note that if the provided user to transfer from is delegating that the delegate's
     delegateBalance will be updated._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _from | address | The address to transfer the balance and delegateBalance from |
| _to | address | The address to transfer balance and delegateBalance to |
| _amount | uint96 | The amount to transfer |

### delegate

```solidity
function delegate(address _vault, address _to) external
```

Sets a delegate for a user which forwards the delegateBalance tied to the user's
         balance to the delegate's delegateBalance.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _vault | address | The vault for which the delegate is being set |
| _to | address | the address to delegate to |

### sponsor

```solidity
function sponsor(address _from) external
```

Delegate user balance to the sponsorship address.

_Must only be called by the Vault contract._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _from | address | Address of the user delegating their balance to the sponsorship address. |

## Structs

## Errors

### SameDelegateAlreadySet

```solidity
error SameDelegateAlreadySet(address delegate)
```

Emitted when an account already points to the same delegate address that is being set

### CannotTransferToSponsorshipAddress

```solidity
error CannotTransferToSponsorshipAddress()
```

Emitted when an account tries to transfer to the sponsorship address

### PeriodLengthTooShort

```solidity
error PeriodLengthTooShort()
```

Emitted when the period length is too short

### PeriodOffsetInFuture

```solidity
error PeriodOffsetInFuture(uint32 periodOffset)
```

Emitted when the period offset is not in the past.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| periodOffset | uint32 | The period offset that was passed in |

### TransferToZeroAddress

```solidity
error TransferToZeroAddress()
```

Emitted when a user tries to mint or transfer to the zero address

