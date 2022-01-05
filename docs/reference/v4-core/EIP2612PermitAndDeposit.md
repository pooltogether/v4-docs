




## Functions
### permitAndDepositToAndDelegate
```solidity
  function permitAndDepositToAndDelegate(
    contract IPrizePool _prizePool,
    uint256 _amount,
    address _to,
    struct Signature _permitSignature,
    struct DelegateSignature _delegateSignature
  ) external
```
Permits this contract to spend on a user's behalf and deposits into the prize pool.

The `spender` address required by the permit function is the address of this contract.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_prizePool` | contract IPrizePool | Address of the prize pool to deposit into
|`_amount` | uint256 | Amount of tokens to deposit into the prize pool
|`_to` | address | Address that will receive the tickets
|`_permitSignature` | struct Signature | Permit signature
|`_delegateSignature` | struct DelegateSignature | Delegate signature

### depositToAndDelegate
```solidity
  function depositToAndDelegate(
    contract IPrizePool _prizePool,
    uint256 _amount,
    address _to,
    struct DelegateSignature _delegateSignature
  ) external
```
Deposits user's token into the prize pool and delegate tickets.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_prizePool` | contract IPrizePool | Address of the prize pool to deposit into
|`_amount` | uint256 | Amount of tokens to deposit into the prize pool
|`_to` | address | Address that will receive the tickets
|`_delegateSignature` | struct DelegateSignature | Delegate signature

