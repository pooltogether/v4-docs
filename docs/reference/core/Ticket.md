


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

### _getBalanceAt
```solidity
  function _getBalanceAt(
    struct TwabLibrary.Twab[65535] _target
  ) internal returns (uint256)
```
Retrieves `_user` TWAB balance.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_target` | struct TwabLibrary.Twab[65535] | Timestamp at which the reserved TWAB should be for.

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
### _getAverageBalanceBetween
```solidity
  function _getAverageBalanceBetween(
    struct TwabLibrary.Twab[65535] _startTime,
    struct Ticket.AccountDetails _endTime
  ) internal returns (uint256)
```
Calculates the average balance held by a user for a given time frame.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_startTime` | struct TwabLibrary.Twab[65535] | The start time of the time frame.
|`_endTime` | struct Ticket.AccountDetails | The end time of the time frame.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`| struct TwabLibrary.Twab[65535] | average balance that the user held during the time frame.
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




### _balanceOf
```solidity
  function _balanceOf(
  ) internal returns (uint256)
```
Returns the ERC20 ticket token balance of a ticket holder.



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`uint256`| address | `_user` ticket token balance.
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




### _transfer
```solidity
  function _transfer(
    address _sender,
    address _recipient,
    uint256 _amount
  ) internal
```
Overridding of the `_transfer` function of the base ERC20Upgradeable contract.

`_sender` cannot be the zero address.
`_recipient` cannot be the zero address.
`_sender` must have a balance of at least `_amount`.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_sender` | address | Address of the `_sender`that will send `_amount` of tokens.
|`_recipient` | address | Address of the `_recipient`that will receive `_amount` of tokens.
|`_amount` | uint256 | Amount of tokens to be transferred from `_sender` to `_recipient`.

### _mint
```solidity
  function _mint(
    address _to,
    uint256 _amount
  ) internal
```
Overridding of the `_mint` function of the base ERC20Upgradeable contract.

`_to` cannot be the zero address.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_to` | address | Address that will be minted `_amount` of tokens.
|`_amount` | uint256 | Amount of tokens to be minted to `_to`.

### _burn
```solidity
  function _burn(
    address _from,
    uint256 _amount
  ) internal
```
Overridding of the `_burn` function of the base ERC20Upgradeable contract.

`_from` cannot be the zero address.
`_from` must have at least `_amount` of tokens.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_from` | address | Address that will be burned `_amount` of tokens.
|`_amount` | uint256 | Amount of tokens to be burnt from `_from`.

### _increaseUserTwab
```solidity
  function _increaseUserTwab(
  ) internal
```




### _decreaseUserTwab
```solidity
  function _decreaseUserTwab(
  ) internal
```




### increaseTwab
```solidity
  function increaseTwab(
    struct Ticket.Account _account,
    uint256 _amount
  ) internal returns (struct TwabLibrary.Twab twab, bool isNew)
```
Increases an account's balance and records a new twab.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_account` | struct Ticket.Account | The account whose balance will be increased
|`_amount` | uint256 | The amount to increase the balance by

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`twab`| struct Ticket.Account | The user's latest TWAB
|`isNew`| uint256 | Whether the TWAB is new
### decreaseTwab
```solidity
  function decreaseTwab(
    struct Ticket.Account _account,
    uint256 _amount,
    string _message
  ) internal returns (struct TwabLibrary.Twab twab, bool isNew)
```
Decreases an account's balance and records a new twab.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_account` | struct Ticket.Account | The account whose balance will be decreased
|`_amount` | uint256 | The amount to decrease the balance by
|`_message` | string | The revert message in the event of insufficient balance

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`twab`| struct Ticket.Account | The user's latest TWAB
|`isNew`| uint256 | Whether the TWAB is new
