[Git Source](https://github.com/GenerationSoftware/pt-v5-vault/blob/10eb9ff64bd4b5eaa93cc7cffdf6bfe01af619bf/src/interfaces/IVaultHooks.sol)



Allows winners to attach smart contract hooks to their prize winnings

## Events

## Variables

## Functions

### beforeClaimPrize

```solidity
function beforeClaimPrize(address winner, uint8 tier, uint32 prizeIndex, uint96 fee, address feeRecipient) external returns (address)
```

Triggered before the prize pool claim prize function is called.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| winner | address | The user who won the prize and for whom this hook is attached |
| tier | uint8 | The tier of the prize |
| prizeIndex | uint32 | The index of the prize in the tier |
| fee | uint96 |  |
| feeRecipient | address |  |

#### Return Values

| Name | Type | Description |
| ---- | ---- | ----------- |
| [0] | address | address The address of the recipient of the prize |
### afterClaimPrize

```solidity
function afterClaimPrize(address winner, uint8 tier, uint32 prizeIndex, uint256 prize, address recipient) external
```

Triggered after the prize pool claim prize function is called.

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| winner | address | The user who won the prize and for whom this hook is attached |
| tier | uint8 | The tier of the prize |
| prizeIndex | uint32 | The index of the prize |
| prize | uint256 | The total size of the prize (payout + fee) |
| recipient | address | The recipient of the prize |

## Structs

### VaultHooks

```solidity
struct VaultHooks {
  bool useBeforeClaimPrize;
  bool useAfterClaimPrize;
  contract IVaultHooks implementation;
}
```

## Errors

