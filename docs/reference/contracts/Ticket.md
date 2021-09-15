

## Functions
### initialize
```solidity
  function initialize(
    string _name,
    string _symbol,
    uint8 decimals_
  ) public
```
Initializes Ticket with passed parameters.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_name` | string | ERC20 ticket token name.
|`_symbol` | string | ERC20 ticket token symbol.
|`decimals_` | uint8 | ERC20 ticket token decimals.

### getAccountDetails
```solidity
  function getAccountDetails(
    address _user
  ) external returns (struct Ticket.AccountDetails)
```
Gets a users twap context.  This is a struct with their balance, next twab index, and cardinality.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_user` | address | The user for whom to fetch the TWAB context

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`| address | TWAB context, which includes { balance, nextTwabIndex, cardinality }
### getTwab
```solidity
  function getTwab(
    address _user,
    uint16 _index
  ) external returns (struct TwabLibrary.Twab)
```
Gets the TWAB at a specific index for a user.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_user` | address | The user for whom to fetch the TWAB
|`_index` | uint16 | The index of the TWAB to fetch

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`| address | TWAB, which includes the twab amount and the timestamp.
### getBalanceAt
```solidity
  function getBalanceAt(
    address _user,
    uint256 _target
  ) external returns (uint256)
```
Retrieves `_user` TWAB balance.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_user` | address | Address of the user whose TWAB is being fetched.
|`_target` | uint256 | Timestamp at which the reserved TWAB should be for.

### getAverageBalanceBetween
```solidity
  function getAverageBalanceBetween(
    address _user,
    uint256 _startTime,
    uint256 _endTime
  ) external returns (uint256)
```
Calculates the average balance held by a user for a given time frame.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_user` | address | The user whose balance is checked
|`_startTime` | uint256 | The start time of the time frame.
|`_endTime` | uint256 | The end time of the time frame.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`| address | average balance that the user held during the time frame.
### getBalancesAt
```solidity
  function getBalancesAt(
    address _user,
    uint32[] _targets
  ) external returns (uint256[])
```
Retrieves `_user` TWAB balances.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_user` | address | Address of the user whose TWABs are being fetched.
|`_targets` | uint32[] | Timestamps at which the reserved TWABs should be for.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`TWAB`| address | balances.
### getTotalSupply
```solidity
  function getTotalSupply(
    uint32 _target
  ) external returns (uint256)
```
Retrieves ticket TWAB `totalSupply`.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_target` | uint32 | Timestamp at which the reserved TWAB should be for.

### getTotalSupplies
```solidity
  function getTotalSupplies(
    uint32[] _targets
  ) external returns (uint256[])
```
Retrieves ticket TWAB `totalSupplies`.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_targets` | uint32[] | Timestamps at which the reserved TWABs should be for.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`ticket`| uint32[] | TWAB `totalSupplies`.
### delegateOf
```solidity
  function delegateOf(
  ) external returns (address)
```




### decimals
```solidity
  function decimals(
  ) public returns (uint8)
```
Returns the ERC20 ticket token decimals.

This value should be equal to the decimals of the token used to deposit into the pool.


#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`uint8`|  | decimals.
### balanceOf
```solidity
  function balanceOf(
  ) public returns (uint256)
```
Returns the ERC20 ticket token balance of a ticket holder.



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`uint224`| address | `_user` ticket token balance.
### totalSupply
```solidity
  function totalSupply(
  ) public returns (uint256)
```
Returns the ERC20 ticket token total supply.



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`uint256`|  | Total supply of the ERC20 ticket token.
### delegate
```solidity
  function delegate(
  ) external
```




