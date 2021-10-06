

## Functions
### permitAndDepositTo
```solidity
  function permitAndDepositTo(
    address token,
    address owner,
    uint256 amount,
    uint256 deadline,
    uint8 v,
    bytes32 r,
    bytes32 s,
    address prizePool,
    address to
  ) external
```
Permits this contract to spend on a user's behalf, and deposits into the prize pool.

The `spender` address required by the permit function is the address of this contract.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`token` | address | Address of the EIP-2612 token to approve and deposit.
|`owner` | address | Token owner's address (Authorizer).
|`amount` | uint256 | Amount of tokens to deposit.
|`deadline` | uint256 | Timestamp at which the signature expires.
|`v` | uint8 | `v` portion of the signature.
|`r` | bytes32 | `r` portion of the signature.
|`s` | bytes32 | `s` portion of the signature.
|`prizePool` | address | Address of the prize pool to deposit into.
|`to` | address | Address that will receive the tickets.

