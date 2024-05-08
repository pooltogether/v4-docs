---
id: prize-hook-security
title: Prize Hook Security
sidebar_position: 2
---

## Why is this important?

The hooks are called by the vault contract when a prize claim occurs, but a hook contract may not know which vaults to trust. There are a few ways to verify that the caller of a hook can be trusted:

### Option 1: Only Allow Hook Usage on a Single Vault

The easiest way to secure your hook is to check that the `msg.sender` address matches a specific vault that has been approved.

### Option 2: Verify the Caller is a Standard Prize Vault

The `msg.sender` can be verified as a standard prize vault by using the [`deployedVaults`](/protocol/reference/prize-vault/PrizeVaultFactory#deployedvaults) mapping on the factory contract. If the vault was deployed by the factory, then the hook can be certain that it will only be called when a legitimate prize has been won.

This method is the quick and safe, but it restricts the vault compatibility to only standard vaults from a specific factory contract. If a new factory or a new type of vault is created and uses the same hook standard, then it will not be compatible with a hook that uses this method.

### Option 3: Verify the Caller is Any Valid Vault

To verify that the caller of a hook is any valid vault, it can be cross-referenced with the prize pool contract. Both hooks receive parameters for the winner's address, the prize tier, and the prize index. This data can be passed to the [`PrizePool.isWinner(...)`](/protocol/reference/prize-pool/PrizePool#iswinner) function with the vault parameter set as `msg.sender`. If this function returns `true`, the hook can be certain that the specified prize has been won for the last awarded draw.

> ⚠️ It is important to note that if this verification method is used, the additional parameters passed to the hooks (`reward` & `rewardRecipient` or `prize` & `prizeRecipient`) cannot be trusted without additional verification.
>
> ⚠️ It is also possible that a malicious vault may call the hooks out of order, or not call a hook at all, so the default hook behavior should not be assumed.

If the hook also requires replay protection, then it can store a mapping of prizes won such that when the hook is called for any prize on a given draw, it will mark that prize as claimed and protect that hook from being called again with the same prize data.

The mapping may look like the following:

```solidity
mapping(address vault => 
  mapping(address account => 
    mapping(uint24 drawId => 
      mapping(uint8 tier => 
        mapping(uint32 prizeIndex => bool hooked)
      )
    )
  )
) internal _hookedPrizes;
```

The last awarded draw ID can be retrieved by calling [`PrizePool.getLastAwardedDrawId()`](/protocol/reference/prize-pool/PrizePool#getlastawardeddrawid).

> ⚠️ It may be tempting to use the `PrizePool.wasClaimed(...)` function to check for replay protection, but it is not secure as a malicious vault could call a hook as many times as it wants without actually claiming the prize.