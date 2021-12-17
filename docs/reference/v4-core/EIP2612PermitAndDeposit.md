

## Functions
### permitAndDepositTo
```solidity
  function permitAndDepositTo(
    address _token,
    address _owner,
    uint256 _amount,
    uint256 _deadline,
    uint8 _v,
    bytes32 _r,
    bytes32 _s,
    address _prizePool,
    address _to
  ) external
```
Permits this contract to spend on a user's behalf, and deposits into the prize pool.

The `spender` address required by the permit function is the address of this contract.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_token` | address | Address of the EIP-2612 token to approve and deposit.
|`_owner` | address | Token owner's address (Authorizer).
|`_amount` | uint256 | Amount of tokens to deposit.
|`_deadline` | uint256 | Timestamp at which the signature expires.
|`_v` | uint8 | `v` portion of the signature.
|`_r` | bytes32 | `r` portion of the signature.
|`_s` | bytes32 | `s` portion of the signature.
|`_prizePool` | address | Address of the prize pool to deposit into.
|`_to` | address | Address that will receive the tickets.

