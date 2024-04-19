[Git Source](https://github.com/generationsoftware/pt-v5-twab-controller/blob/827255118b0de751bc797de6bf6ed042496aea4d/src/libraries/TwabLib.sol)

**Author:**
PoolTogether Inc. & G9 Software Inc.

This TwabLib adds on-chain historical lookups to a user(s) time-weighted average balance.
Each user is mapped to an Account struct containing the TWAB history (ring buffer) and
ring buffer parameters. Every token.transfer() creates a new TWAB checkpoint. The new
TWAB checkpoint is stored in the circular ring buffer, as either a new checkpoint or
rewriting a previous checkpoint with new parameters. One checkpoint per day is stored.
The TwabLib guarantees minimum 1 year of search history.

There are limitations to the Observation data structure used. Ensure your token is
compatible before using this library. Ensure the date ranges you're relying on are
within safe boundaries.

*Time-Weighted Average Balance Library for ERC20 tokens.*

## Types
### PeriodOffsetRelativeTimestamp

```solidity
type PeriodOffsetRelativeTimestamp is uint32;
```

## Functions
### increaseBalances

Increase a user's balance and delegate balance by a given amount.

*This function mutates the provided account.*


```solidity
function increaseBalances(
    uint32 PERIOD_LENGTH,
    uint32 PERIOD_OFFSET,
    Account storage _account,
    uint96 _amount,
    uint96 _delegateAmount
)
    internal
    returns (
        ObservationLib.Observation memory observation,
        bool isNew,
        bool isObservationRecorded,
        AccountDetails memory accountDetails
    );
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`PERIOD_LENGTH`|`uint32`|The length of an overwrite period|
|`PERIOD_OFFSET`|`uint32`|The offset of the first period|
|`_account`|`Account`|The account to update|
|`_amount`|`uint96`|The amount to increase the balance by|
|`_delegateAmount`|`uint96`|The amount to increase the delegate balance by|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`observation`|`ObservationLib.Observation`|The new/updated observation|
|`isNew`|`bool`|Whether or not the observation is new or overwrote a previous one|
|`isObservationRecorded`|`bool`|Whether or not an observation was recorded to storage|
|`accountDetails`|`AccountDetails`||


### decreaseBalances

Decrease a user's balance and delegate balance by a given amount.

*This function mutates the provided account.*


```solidity
function decreaseBalances(
    uint32 PERIOD_LENGTH,
    uint32 PERIOD_OFFSET,
    Account storage _account,
    uint96 _amount,
    uint96 _delegateAmount,
    string memory _revertMessage
)
    internal
    returns (
        ObservationLib.Observation memory observation,
        bool isNew,
        bool isObservationRecorded,
        AccountDetails memory accountDetails
    );
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`PERIOD_LENGTH`|`uint32`|The length of an overwrite period|
|`PERIOD_OFFSET`|`uint32`|The offset of the first period|
|`_account`|`Account`|The account to update|
|`_amount`|`uint96`|The amount to decrease the balance by|
|`_delegateAmount`|`uint96`|The amount to decrease the delegate balance by|
|`_revertMessage`|`string`|The revert message to use if the balance is insufficient|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`observation`|`ObservationLib.Observation`|The new/updated observation|
|`isNew`|`bool`|Whether or not the observation is new or overwrote a previous one|
|`isObservationRecorded`|`bool`|Whether or not the observation was recorded to storage|
|`accountDetails`|`AccountDetails`||


### getOldestObservation

Looks up the oldest observation in the circular buffer.


```solidity
function getOldestObservation(
    ObservationLib.Observation[MAX_CARDINALITY] storage _observations,
    AccountDetails memory _accountDetails
) internal view returns (uint16 index, ObservationLib.Observation memory observation);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_observations`|`ObservationLib.Observation[MAX_CARDINALITY]`|The circular buffer of observations|
|`_accountDetails`|`AccountDetails`|The account details to query with|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`index`|`uint16`|The index of the oldest observation|
|`observation`|`ObservationLib.Observation`|The oldest observation in the circular buffer|


### getNewestObservation

Looks up the newest observation in the circular buffer.


```solidity
function getNewestObservation(
    ObservationLib.Observation[MAX_CARDINALITY] storage _observations,
    AccountDetails memory _accountDetails
) internal view returns (uint16 index, ObservationLib.Observation memory observation);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_observations`|`ObservationLib.Observation[MAX_CARDINALITY]`|The circular buffer of observations|
|`_accountDetails`|`AccountDetails`|The account details to query with|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`index`|`uint16`|The index of the newest observation|
|`observation`|`ObservationLib.Observation`|The newest observation in the circular buffer|


### getBalanceAt

Looks up a users balance at a specific time in the past. The time must be before the current overwrite period.

*Ensure timestamps are safe using requireFinalized*


```solidity
function getBalanceAt(
    uint32 PERIOD_LENGTH,
    uint32 PERIOD_OFFSET,
    ObservationLib.Observation[MAX_CARDINALITY] storage _observations,
    AccountDetails memory _accountDetails,
    uint256 _targetTime
) internal view requireFinalized(PERIOD_LENGTH, PERIOD_OFFSET, _targetTime) returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`PERIOD_LENGTH`|`uint32`|The length of an overwrite period|
|`PERIOD_OFFSET`|`uint32`|The offset of the first period|
|`_observations`|`ObservationLib.Observation[MAX_CARDINALITY]`|The circular buffer of observations|
|`_accountDetails`|`AccountDetails`|The account details to query with|
|`_targetTime`|`uint256`|The time to look up the balance at|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|balance The balance at the target time|


### isShutdownAt

Returns whether the TwabController has been shutdown at the given timestamp
If the twab is queried at or after this time, whether an absolute timestamp or time range, it will return 0.


```solidity
function isShutdownAt(uint256 timestamp, uint32 PERIOD_LENGTH, uint32 PERIOD_OFFSET) internal pure returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`timestamp`|`uint256`|The timestamp to check|
|`PERIOD_LENGTH`|`uint32`||
|`PERIOD_OFFSET`|`uint32`|The offset of the first period|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|True if the TwabController is shutdown at the given timestamp, false otherwise.|


### lastObservationAt

Computes the largest timestamp at which the TwabController can record a new observation.


```solidity
function lastObservationAt(uint32 PERIOD_LENGTH, uint32 PERIOD_OFFSET) internal pure returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`PERIOD_LENGTH`|`uint32`||
|`PERIOD_OFFSET`|`uint32`|The offset of the first period|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The largest timestamp at which the TwabController can record a new observation.|


### getTwabBetween

Looks up a users TWAB for a time range. The time must be before the current overwrite period.

*If the timestamps in the range are not exact matches of observations, the balance is extrapolated using the previous observation.*


```solidity
function getTwabBetween(
    uint32 PERIOD_LENGTH,
    uint32 PERIOD_OFFSET,
    ObservationLib.Observation[MAX_CARDINALITY] storage _observations,
    AccountDetails memory _accountDetails,
    uint256 _startTime,
    uint256 _endTime
) internal view requireFinalized(PERIOD_LENGTH, PERIOD_OFFSET, _endTime) returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`PERIOD_LENGTH`|`uint32`|The length of an overwrite period|
|`PERIOD_OFFSET`|`uint32`|The offset of the first period|
|`_observations`|`ObservationLib.Observation[MAX_CARDINALITY]`|The circular buffer of observations|
|`_accountDetails`|`AccountDetails`|The account details to query with|
|`_startTime`|`uint256`|The start of the time range|
|`_endTime`|`uint256`|The end of the time range|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|twab The TWAB for the time range|


### _recordObservation

Given an AccountDetails with updated balances, either updates the latest Observation or records a new one


```solidity
function _recordObservation(
    uint32 PERIOD_LENGTH,
    uint32 PERIOD_OFFSET,
    AccountDetails memory _accountDetails,
    Account storage _account
)
    internal
    returns (ObservationLib.Observation memory observation, bool isNew, AccountDetails memory newAccountDetails);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`PERIOD_LENGTH`|`uint32`|The overwrite period length|
|`PERIOD_OFFSET`|`uint32`|The overwrite period offset|
|`_accountDetails`|`AccountDetails`|The updated account details|
|`_account`|`Account`|The account to update|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`observation`|`ObservationLib.Observation`|The new/updated observation|
|`isNew`|`bool`|Whether or not the observation is new or overwrote a previous one|
|`newAccountDetails`|`AccountDetails`|The new account details|


### _calculateTemporaryObservation

Calculates a temporary observation for a given time using the previous observation.

*This is used to extrapolate a balance for any given time.*


```solidity
function _calculateTemporaryObservation(
    ObservationLib.Observation memory _observation,
    PeriodOffsetRelativeTimestamp _time
) private pure returns (ObservationLib.Observation memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_observation`|`ObservationLib.Observation`|The previous observation|
|`_time`|`PeriodOffsetRelativeTimestamp`|The time to extrapolate to|


### _getNextObservationIndex

Looks up the next observation index to write to in the circular buffer.

*If the current time is in the same period as the newest observation, we overwrite it.*

*If the current time is in a new period, we increment the index and write a new observation.*


```solidity
function _getNextObservationIndex(
    uint32 PERIOD_LENGTH,
    uint32 PERIOD_OFFSET,
    ObservationLib.Observation[MAX_CARDINALITY] storage _observations,
    AccountDetails memory _accountDetails
) private view returns (uint16 index, ObservationLib.Observation memory newestObservation, bool isNew);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`PERIOD_LENGTH`|`uint32`|The length of an overwrite period|
|`PERIOD_OFFSET`|`uint32`|The offset of the first period|
|`_observations`|`ObservationLib.Observation[MAX_CARDINALITY]`|The circular buffer of observations|
|`_accountDetails`|`AccountDetails`|The account details to query with|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`index`|`uint16`|The index of the next observation slot to overwrite|
|`newestObservation`|`ObservationLib.Observation`|The newest observation in the circular buffer|
|`isNew`|`bool`|True if the observation slot is new, false if we're overwriting|


### _currentOverwritePeriodStartedAt

Computes the start time of the current overwrite period


```solidity
function _currentOverwritePeriodStartedAt(uint32 PERIOD_LENGTH, uint32 PERIOD_OFFSET) private view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`PERIOD_LENGTH`|`uint32`|The length of an overwrite period|
|`PERIOD_OFFSET`|`uint32`|The offset of the first period|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The start time of the current overwrite period|


### _extrapolateFromBalance

Calculates the next cumulative balance using a provided Observation and timestamp.


```solidity
function _extrapolateFromBalance(
    ObservationLib.Observation memory _observation,
    PeriodOffsetRelativeTimestamp _offsetTimestamp
) private pure returns (uint128);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_observation`|`ObservationLib.Observation`|The observation to extrapolate from|
|`_offsetTimestamp`|`PeriodOffsetRelativeTimestamp`|The timestamp to extrapolate to|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint128`|cumulativeBalance The cumulative balance at the timestamp|


### currentOverwritePeriodStartedAt

Computes the overwrite period start time given the current time


```solidity
function currentOverwritePeriodStartedAt(uint32 PERIOD_LENGTH, uint32 PERIOD_OFFSET) internal view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`PERIOD_LENGTH`|`uint32`|The length of an overwrite period|
|`PERIOD_OFFSET`|`uint32`|The offset of the first period|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The start time for the current overwrite period.|


### getTimestampPeriod

Calculates the period a timestamp falls within.

*Timestamp prior to the PERIOD_OFFSET are considered to be in period 0.*


```solidity
function getTimestampPeriod(uint32 PERIOD_LENGTH, uint32 PERIOD_OFFSET, uint256 _timestamp)
    internal
    pure
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`PERIOD_LENGTH`|`uint32`|The length of an overwrite period|
|`PERIOD_OFFSET`|`uint32`|The offset of the first period|
|`_timestamp`|`uint256`|The timestamp to calculate the period for|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|period The period|


### getPeriodStartTime

Calculates the start timestamp for a period


```solidity
function getPeriodStartTime(uint32 PERIOD_LENGTH, uint32 PERIOD_OFFSET, uint256 _period)
    internal
    pure
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`PERIOD_LENGTH`|`uint32`|The period length to use to calculate the period|
|`PERIOD_OFFSET`|`uint32`|The period offset to use to calculate the period|
|`_period`|`uint256`|The period to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|_timestamp The timestamp at which the period starts|


### getPeriodEndTime

Calculates the last timestamp for a period


```solidity
function getPeriodEndTime(uint32 PERIOD_LENGTH, uint32 PERIOD_OFFSET, uint256 _period)
    internal
    pure
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`PERIOD_LENGTH`|`uint32`|The period length to use to calculate the period|
|`PERIOD_OFFSET`|`uint32`|The period offset to use to calculate the period|
|`_period`|`uint256`|The period to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|_timestamp The timestamp at which the period ends|


### getPreviousOrAtObservation

Looks up the newest observation before or at a given timestamp.

*If an observation is available at the target time, it is returned. Otherwise, the newest observation before the target time is returned.*


```solidity
function getPreviousOrAtObservation(
    uint32 PERIOD_OFFSET,
    ObservationLib.Observation[MAX_CARDINALITY] storage _observations,
    AccountDetails memory _accountDetails,
    uint256 _targetTime
) internal view returns (ObservationLib.Observation memory prevOrAtObservation);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`PERIOD_OFFSET`|`uint32`|The period offset to use to calculate the period|
|`_observations`|`ObservationLib.Observation[MAX_CARDINALITY]`|The circular buffer of observations|
|`_accountDetails`|`AccountDetails`|The account details to query with|
|`_targetTime`|`uint256`|The timestamp to look up|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`prevOrAtObservation`|`ObservationLib.Observation`|The observation|


### _getPreviousOrAtObservation

Looks up the newest observation before or at a given timestamp.

*If an observation is available at the target time, it is returned. Otherwise, the newest observation before the target time is returned.*


```solidity
function _getPreviousOrAtObservation(
    ObservationLib.Observation[MAX_CARDINALITY] storage _observations,
    AccountDetails memory _accountDetails,
    PeriodOffsetRelativeTimestamp _offsetTargetTime
) private view returns (ObservationLib.Observation memory prevOrAtObservation);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_observations`|`ObservationLib.Observation[MAX_CARDINALITY]`|The circular buffer of observations|
|`_accountDetails`|`AccountDetails`|The account details to query with|
|`_offsetTargetTime`|`PeriodOffsetRelativeTimestamp`|The timestamp to look up (offset by the period offset)|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`prevOrAtObservation`|`ObservationLib.Observation`|The observation|


### hasFinalized

Checks if the given timestamp is safe to perform a historic balance lookup on.

*A timestamp is safe if it is before the current overwrite period*


```solidity
function hasFinalized(uint32 PERIOD_LENGTH, uint32 PERIOD_OFFSET, uint256 _time) internal view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`PERIOD_LENGTH`|`uint32`|The period length to use to calculate the period|
|`PERIOD_OFFSET`|`uint32`|The period offset to use to calculate the period|
|`_time`|`uint256`|The timestamp to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|isSafe Whether or not the timestamp is safe|


### _hasFinalized

Checks if the given timestamp is safe to perform a historic balance lookup on.

*A timestamp is safe if it is on or before the current overwrite period start time*


```solidity
function _hasFinalized(uint32 PERIOD_LENGTH, uint32 PERIOD_OFFSET, uint256 _time) private view returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`PERIOD_LENGTH`|`uint32`|The period length to use to calculate the period|
|`PERIOD_OFFSET`|`uint32`|The period offset to use to calculate the period|
|`_time`|`uint256`|The timestamp to check|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|isSafe Whether or not the timestamp is safe|


### requireFinalized

Checks if the given timestamp is safe to perform a historic balance lookup on.


```solidity
modifier requireFinalized(uint32 PERIOD_LENGTH, uint32 PERIOD_OFFSET, uint256 _timestamp);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`PERIOD_LENGTH`|`uint32`|The period length to use to calculate the period|
|`PERIOD_OFFSET`|`uint32`|The period offset to use to calculate the period|
|`_timestamp`|`uint256`|The timestamp to check|


## Structs
### AccountDetails
Struct ring buffer parameters for single user Account.


```solidity
struct AccountDetails {
    uint96 balance;
    uint96 delegateBalance;
    uint16 nextObservationIndex;
    uint16 cardinality;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`balance`|`uint96`|Current token balance for an Account|
|`delegateBalance`|`uint96`|Current delegate balance for an Account (active balance for chance)|
|`nextObservationIndex`|`uint16`|Next uninitialized or updatable ring buffer checkpoint storage slot|
|`cardinality`|`uint16`|Current total "initialized" ring buffer checkpoints for single user Account. Used to set initial boundary conditions for an efficient binary search.|

### Account
Account details and historical twabs.

*The size of observations is MAX_CARDINALITY from the ObservationLib.*


```solidity
struct Account {
    AccountDetails details;
    ObservationLib.Observation[17520] observations;
}
```

**Properties**

|Name|Type|Description|
|----|----|-----------|
|`details`|`AccountDetails`|The account details|
|`observations`|`ObservationLib.Observation[17520]`|The history of observations for this account|

