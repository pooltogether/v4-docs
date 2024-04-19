[Git Source](https://github.com/generationsoftware/pt-v5-twab-controller/blob/827255118b0de751bc797de6bf6ed042496aea4d/src/TwabController.sol)

**Author:**
PoolTogether Inc. & G9 Software Inc.

This TwabController uses the TwabLib to provide token balances and on-chain historical
lookups to a user(s) time-weighted average balance. Each user is mapped to an
Account struct containing the TWAB history (ring buffer) and ring buffer parameters.
Every token.transfer() creates a new TWAB observation. The new TWAB observation is
stored in the circular ring buffer as either a new observation or rewriting a
previous observation with new parameters. One observation per period is stored.
The TwabLib guarantees minimum 1 year of search history if a period is a day.

*Time-Weighted Average Balance Controller for ERC20 tokens.*


## Constants
### MINIMUM_PERIOD_LENGTH

```solidity
uint32 constant MINIMUM_PERIOD_LENGTH = 1 hours;
```

### SPONSORSHIP_ADDRESS

```solidity
address constant SPONSORSHIP_ADDRESS = address(1);
```


## State Variables
### PERIOD_LENGTH
Sets the minimum period length for Observations. When a period elapses, a new Observation is recorded, otherwise the most recent Observation is updated.


```solidity
uint32 public immutable PERIOD_LENGTH;
```


### PERIOD_OFFSET
Sets the beginning timestamp for the first period. This allows us to maximize storage as well as line up periods with a chosen timestamp.

*Ensure that the PERIOD_OFFSET is in the past.*


```solidity
uint32 public immutable PERIOD_OFFSET;
```


### userObservations
Record of token holders TWABs for each account for each vault.


```solidity
mapping(address => mapping(address => TwabLib.Account)) internal userObservations;
```


### totalSupplyObservations
Record of tickets total supply and ring buff parameters used for observation.


```solidity
mapping(address => TwabLib.Account) internal totalSupplyObservations;
```


### delegates
vault => user => delegate.


```solidity
mapping(address => mapping(address => address)) internal delegates;
```


## Functions
### constructor

Construct a new TwabController.

*Reverts if the period offset is in the future.*


```solidity
constructor(uint32 _periodLength, uint32 _periodOffset);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_periodLength`|`uint32`|Sets the minimum period length for Observations. When a period elapses, a new Observation is recorded, otherwise the most recent Observation is updated.|
|`_periodOffset`|`uint32`|Sets the beginning timestamp for the first period. This allows us to maximize storage as well as line up periods with a chosen timestamp.|


### isShutdownAt

Returns whether the TwabController has been shutdown at the given timestamp
If the twab is queried at or after this time, whether an absolute timestamp or time range, it will return 0.

*This function will return true for any timestamp after the lastObservationAt()*


```solidity
function isShutdownAt(uint256 timestamp) external view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`timestamp`|`uint256`|The timestamp to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the TwabController is shutdown at the given timestamp, false otherwise.|


### lastObservationAt

Computes the timestamp after which no more observations will be made.


```solidity
function lastObservationAt() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The largest timestamp at which the TwabController can record a new observation.|


### getAccount

Loads the current TWAB Account data for a specific vault stored for a user.

*Note this is a very expensive function*


```solidity
function getAccount(address vault, address user) external view returns (TwabLib.Account memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|the vault for which the data is being queried|
|`user`|`address`|the user whose data is being queried|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`TwabLib.Account`|The current TWAB Account data of the user|


### getTotalSupplyAccount

Loads the current total supply TWAB Account data for a specific vault.

*Note this is a very expensive function*


```solidity
function getTotalSupplyAccount(address vault) external view returns (TwabLib.Account memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|the vault for which the data is being queried|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`TwabLib.Account`|The current total supply TWAB Account data|


### balanceOf

The current token balance of a user for a specific vault.


```solidity
function balanceOf(address vault, address user) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|the vault for which the balance is being queried|
|`user`|`address`|the user whose balance is being queried|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The current token balance of the user|


### totalSupply

The total supply of tokens for a vault.


```solidity
function totalSupply(address vault) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|the vault for which the total supply is being queried|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total supply of tokens for a vault|


### totalSupplyDelegateBalance

The total delegated amount of tokens for a vault.

*Delegated balance is not 1:1 with the token total supply. Users may delegate their
balance to the sponsorship address, which will result in those tokens being subtracted
from the total.*


```solidity
function totalSupplyDelegateBalance(address vault) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|the vault for which the total delegated supply is being queried|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total delegated amount of tokens for a vault|


### delegateOf

The current delegate of a user for a specific vault.


```solidity
function delegateOf(address vault, address user) external view returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|the vault for which the delegate balance is being queried|
|`user`|`address`|the user whose delegate balance is being queried|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The current delegate balance of the user|


### delegateBalanceOf

The current delegateBalance of a user for a specific vault.

*the delegateBalance is the sum of delegated balance to this user*


```solidity
function delegateBalanceOf(address vault, address user) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|the vault for which the delegateBalance is being queried|
|`user`|`address`|the user whose delegateBalance is being queried|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The current delegateBalance of the user|


### getBalanceAt

Looks up a users balance at a specific time in the past.


```solidity
function getBalanceAt(address vault, address user, uint256 periodEndOnOrAfterTime) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|the vault for which the balance is being queried|
|`user`|`address`|the user whose balance is being queried|
|`periodEndOnOrAfterTime`|`uint256`|The time in the past for which the balance is being queried. The time will be snapped to a period end time on or after the timestamp.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The balance of the user at the target time|


### getTotalSupplyAt

Looks up the total supply at a specific time in the past.


```solidity
function getTotalSupplyAt(address vault, uint256 periodEndOnOrAfterTime) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|the vault for which the total supply is being queried|
|`periodEndOnOrAfterTime`|`uint256`|The time in the past for which the balance is being queried. The time will be snapped to a period end time on or after the timestamp.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The total supply at the target time|


### getTwabBetween

Looks up the average balance of a user between two timestamps.

*Timestamps are Unix timestamps denominated in seconds*


```solidity
function getTwabBetween(address vault, address user, uint256 startTime, uint256 endTime)
    external
    view
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|the vault for which the average balance is being queried|
|`user`|`address`|the user whose average balance is being queried|
|`startTime`|`uint256`|the start of the time range for which the average balance is being queried. The time will be snapped to a period end time on or after the timestamp.|
|`endTime`|`uint256`|the end of the time range for which the average balance is being queried. The time will be snapped to a period end time on or after the timestamp.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The average balance of the user between the two timestamps|


### getTotalSupplyTwabBetween

Looks up the average total supply between two timestamps.

*Timestamps are Unix timestamps denominated in seconds*


```solidity
function getTotalSupplyTwabBetween(address vault, uint256 startTime, uint256 endTime) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|the vault for which the average total supply is being queried|
|`startTime`|`uint256`|the start of the time range for which the average total supply is being queried|
|`endTime`|`uint256`|the end of the time range for which the average total supply is being queried|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The average total supply between the two timestamps|


### periodEndOnOrAfter

Computes the period end timestamp on or after the given timestamp.


```solidity
function periodEndOnOrAfter(uint256 _timestamp) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_timestamp`|`uint256`|The timestamp to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The end timestamp of the period that ends on or immediately after the given timestamp|


### _periodEndOnOrAfter

Computes the period end timestamp on or after the given timestamp.


```solidity
function _periodEndOnOrAfter(uint256 _timestamp) internal view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_timestamp`|`uint256`|The timestamp to compute the period end time for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|A period end time.|


### getNewestObservation

Looks up the newest observation for a user.


```solidity
function getNewestObservation(address vault, address user)
    external
    view
    returns (uint16, ObservationLib.Observation memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|the vault for which the observation is being queried|
|`user`|`address`|the user whose observation is being queried|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint16`|index The index of the observation|
|`<none>`|`ObservationLib.Observation`|observation The observation of the user|


### getOldestObservation

Looks up the oldest observation for a user.


```solidity
function getOldestObservation(address vault, address user)
    external
    view
    returns (uint16, ObservationLib.Observation memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|the vault for which the observation is being queried|
|`user`|`address`|the user whose observation is being queried|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint16`|index The index of the observation|
|`<none>`|`ObservationLib.Observation`|observation The observation of the user|


### getNewestTotalSupplyObservation

Looks up the newest total supply observation for a vault.


```solidity
function getNewestTotalSupplyObservation(address vault)
    external
    view
    returns (uint16, ObservationLib.Observation memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|the vault for which the observation is being queried|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint16`|index The index of the observation|
|`<none>`|`ObservationLib.Observation`|observation The total supply observation|


### getOldestTotalSupplyObservation

Looks up the oldest total supply observation for a vault.


```solidity
function getOldestTotalSupplyObservation(address vault)
    external
    view
    returns (uint16, ObservationLib.Observation memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|the vault for which the observation is being queried|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint16`|index The index of the observation|
|`<none>`|`ObservationLib.Observation`|observation The total supply observation|


### getTimestampPeriod

Calculates the period a timestamp falls into.


```solidity
function getTimestampPeriod(uint256 time) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`time`|`uint256`|The timestamp to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|period The period the timestamp falls into|


### hasFinalized

Checks if the given timestamp is before the current overwrite period.


```solidity
function hasFinalized(uint256 time) external view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`time`|`uint256`|The timestamp to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the given time is finalized, false if it's during the current overwrite period.|


### currentOverwritePeriodStartedAt

Computes the timestamp at which the current overwrite period started.

*The overwrite period is the period during which observations are collated.*


```solidity
function currentOverwritePeriodStartedAt() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|period The timestamp at which the current overwrite period started.|


### mint

Mints new balance and delegateBalance for a given user.

*Note that if the provided user to mint to is delegating that the delegate's
delegateBalance will be updated.*

*Mint is expected to be called by the Vault.*


```solidity
function mint(address _to, uint96 _amount) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_to`|`address`|The address to mint balance and delegateBalance to|
|`_amount`|`uint96`|The amount to mint|


### burn

Burns balance and delegateBalance for a given user.

*Note that if the provided user to burn from is delegating that the delegate's
delegateBalance will be updated.*

*Burn is expected to be called by the Vault.*


```solidity
function burn(address _from, uint96 _amount) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address to burn balance and delegateBalance from|
|`_amount`|`uint96`|The amount to burn|


### transfer

Transfers balance and delegateBalance from a given user.

*Note that if the provided user to transfer from is delegating that the delegate's
delegateBalance will be updated.*


```solidity
function transfer(address _from, address _to, uint96 _amount) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address to transfer the balance and delegateBalance from|
|`_to`|`address`|The address to transfer balance and delegateBalance to|
|`_amount`|`uint96`|The amount to transfer|


### delegate

Sets a delegate for a user which forwards the delegateBalance tied to the user's
balance to the delegate's delegateBalance.


```solidity
function delegate(address _vault, address _to) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|The vault for which the delegate is being set|
|`_to`|`address`|the address to delegate to|


### sponsor

Delegate user balance to the sponsorship address.

*Must only be called by the Vault contract.*


```solidity
function sponsor(address _from) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|Address of the user delegating their balance to the sponsorship address.|


### _transferBalance

Transfers a user's vault balance from one address to another.

*If the user is delegating, their delegate's delegateBalance is also updated.*

*If we are minting or burning tokens then the total supply is also updated.*


```solidity
function _transferBalance(address _vault, address _from, address _to, uint96 _amount) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|the vault for which the balance is being transferred|
|`_from`|`address`|the address from which the balance is being transferred|
|`_to`|`address`|the address to which the balance is being transferred|
|`_amount`|`uint96`|the amount of balance being transferred|


### _delegateOf

Looks up the delegate of a user.


```solidity
function _delegateOf(address _vault, address _user) internal view returns (address);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|the vault for which the user's delegate is being queried|
|`_user`|`address`|the address to query the delegate of|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address of the user's delegate|


### _transferDelegateBalance

Transfers a user's vault delegateBalance from one address to another.


```solidity
function _transferDelegateBalance(address _vault, address _fromDelegate, address _toDelegate, uint96 _amount)
    internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|the vault for which the delegateBalance is being transferred|
|`_fromDelegate`|`address`|the address from which the delegateBalance is being transferred|
|`_toDelegate`|`address`|the address to which the delegateBalance is being transferred|
|`_amount`|`uint96`|the amount of delegateBalance being transferred|


### _delegate

Sets a delegate for a user which forwards the delegateBalance tied to the user's
balance to the delegate's delegateBalance. "Sponsoring" means the funds aren't delegated
to anyone; this can be done by passing address(0) or the SPONSORSHIP_ADDRESS as the delegate.


```solidity
function _delegate(address _vault, address _from, address _to) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|The vault for which the delegate is being set|
|`_from`|`address`|the address to delegate from|
|`_to`|`address`|the address to delegate to|


### _increaseBalances

Increases a user's balance and delegateBalance for a specific vault.


```solidity
function _increaseBalances(address _vault, address _user, uint96 _amount, uint96 _delegateAmount) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|the vault for which the balance is being increased|
|`_user`|`address`|the address of the user whose balance is being increased|
|`_amount`|`uint96`|the amount of balance being increased|
|`_delegateAmount`|`uint96`|the amount of delegateBalance being increased|


### _decreaseBalances

Decreases the a user's balance and delegateBalance for a specific vault.


```solidity
function _decreaseBalances(address _vault, address _user, uint96 _amount, uint96 _delegateAmount) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|the vault for which the totalSupply balance is being decreased|
|`_user`|`address`||
|`_amount`|`uint96`|the amount of balance being decreased|
|`_delegateAmount`|`uint96`|the amount of delegateBalance being decreased|


### _decreaseTotalSupplyBalances

Decreases the totalSupply balance and delegateBalance for a specific vault.


```solidity
function _decreaseTotalSupplyBalances(address _vault, uint96 _amount, uint96 _delegateAmount) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|the vault for which the totalSupply balance is being decreased|
|`_amount`|`uint96`|the amount of balance being decreased|
|`_delegateAmount`|`uint96`|the amount of delegateBalance being decreased|


### _increaseTotalSupplyBalances

Increases the totalSupply balance and delegateBalance for a specific vault.


```solidity
function _increaseTotalSupplyBalances(address _vault, uint96 _amount, uint96 _delegateAmount) internal;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|the vault for which the totalSupply balance is being increased|
|`_amount`|`uint96`|the amount of balance being increased|
|`_delegateAmount`|`uint96`|the amount of delegateBalance being increased|


## Events
### IncreasedBalance
Emitted when a balance or delegateBalance is increased.


```solidity
event IncreasedBalance(address indexed vault, address indexed user, uint96 amount, uint96 delegateAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|the vault for which the balance increased|
|`user`|`address`|the users whose balance increased|
|`amount`|`uint96`|the amount the balance increased by|
|`delegateAmount`|`uint96`|the amount the delegateBalance increased by|

### DecreasedBalance
Emitted when a balance or delegateBalance is decreased.


```solidity
event DecreasedBalance(address indexed vault, address indexed user, uint96 amount, uint96 delegateAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|the vault for which the balance decreased|
|`user`|`address`|the users whose balance decreased|
|`amount`|`uint96`|the amount the balance decreased by|
|`delegateAmount`|`uint96`|the amount the delegateBalance decreased by|

### ObservationRecorded
Emitted when an Observation is recorded to the Ring Buffer.


```solidity
event ObservationRecorded(
    address indexed vault,
    address indexed user,
    uint96 balance,
    uint96 delegateBalance,
    bool isNew,
    ObservationLib.Observation observation
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|the vault for which the Observation was recorded|
|`user`|`address`|the users whose Observation was recorded|
|`balance`|`uint96`|the resulting balance|
|`delegateBalance`|`uint96`|the resulting delegated balance|
|`isNew`|`bool`|whether the observation is new or not|
|`observation`|`ObservationLib.Observation`|the observation that was created or updated|

### Delegated
Emitted when a user delegates their balance to another address.


```solidity
event Delegated(address indexed vault, address indexed delegator, address indexed delegate);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|the vault for which the balance was delegated|
|`delegator`|`address`|the user who delegated their balance|
|`delegate`|`address`|the user who received the delegated balance|

### IncreasedTotalSupply
Emitted when the total supply or delegateTotalSupply is increased.


```solidity
event IncreasedTotalSupply(address indexed vault, uint96 amount, uint96 delegateAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|the vault for which the total supply increased|
|`amount`|`uint96`|the amount the total supply increased by|
|`delegateAmount`|`uint96`|the amount the delegateTotalSupply increased by|

### DecreasedTotalSupply
Emitted when the total supply or delegateTotalSupply is decreased.


```solidity
event DecreasedTotalSupply(address indexed vault, uint96 amount, uint96 delegateAmount);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|the vault for which the total supply decreased|
|`amount`|`uint96`|the amount the total supply decreased by|
|`delegateAmount`|`uint96`|the amount the delegateTotalSupply decreased by|

### TotalSupplyObservationRecorded
Emitted when a Total Supply Observation is recorded to the Ring Buffer.


```solidity
event TotalSupplyObservationRecorded(
    address indexed vault, uint96 balance, uint96 delegateBalance, bool isNew, ObservationLib.Observation observation
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`address`|the vault for which the Observation was recorded|
|`balance`|`uint96`|the resulting balance|
|`delegateBalance`|`uint96`|the resulting delegated balance|
|`isNew`|`bool`|whether the observation is new or not|
|`observation`|`ObservationLib.Observation`|the observation that was created or updated|

