---
id: prize-hooks
title: Using Prize Hooks
sidebar_position: 2
---

Prize hooks are modular onchain actions, configurable by a depositor, that automatically execute when a prize is claimed for them on a standard vault.

![Prize Hook Diagram](/img/v5/prize-hooks/prize-hook-diagram.jpg)

> In the above diagram, we see how Alice can set a custom prize hook on a vault to automatically trigger the execution of additional code when she wins a prize.

## How do they Work?

Prize hooks can be created permissionlessly by deploying a contract that extends the [`IVaultHooks` interface](/protocol/reference/vaults/IVaultHooks). Up to two hooks can be implemented (`beforeClaimPrize` and `afterClaimPrize`). Like the names suggest, the first is called immediately before the prize is claimed while the second is called immediately after. Both hooks are passed some basic data about the prize that is being claimed which can be used to verify the prize win, determine prize size and claim fee, and identify the recipient.

Each user can set a different hook implementation on a vault they are deposited in. When that user wins a prize, their specified hooks are called. The user can change or remove their hooks at any time.

### Hook: `beforeClaimPrize`

In addition to receiving some basic data about the prize, the `beforeClaimPrize` hook also has the option to return an address that will be used as the new recipient of the prize. This enables users to dynamically redirect their prizes to different addresses based on onchain conditions.

An example of this would be to redirect your prizes won to a random holder of an enumerable NFT collection ([see example code](https://github.com/GenerationSoftware/pt-v5-builder-code-examples/tree/main/src/prize-hooks/examples/prize-to-nft-holder#hook-to-award-prizes-to-a-random-nft-holder)).

### Hook: `afterClaimPrize`

This hook receives some additional information such as the total prize value transferred (including fees). It is useful for executing actions that do something with the prize funds, such as splitting up the prize or doing additional token transfers ([see the prize recycle example](https://github.com/GenerationSoftware/pt-v5-builder-code-examples/tree/main/src/prize-hooks/examples/prize-recycle#prize-recycle-hook)).

## Creating a Prize Hook

Custom prize hooks can be created by deploying a contract that extends the [`IVaultHooks`](/protocol/reference/vaults/IVaultHooks) interface. See the [prize hook examples](https://github.com/GenerationSoftware/pt-v5-builder-code-examples/tree/main/src/prize-hooks/examples) to get started!

### Gas Limits

On standard vaults, each hook (`beforeClaimPrize` and `afterClaimPrize`) is limited to 150k gas. This is to prevent hook executions from becoming too costly for claimers since they pay the extra gas required. If the hook exceeds this limit, the call will revert. Limits may be different on non-standard vaults.

## Using a Prize Hook

To opt-in to a new prize hook on a standard vault, you can call the [`setHooks`](/protocol/reference/vaults/Vault#sethooks-1) function on the vault with the following data:

```solidity
struct VaultHooks {
  bool useBeforeClaimPrize; // if true, the `beforeClaimPrize` hook will be called
  bool useAfterClaimPrize; // if true, the `afterClaimPrize` hook will be called
  contract IVaultHooks implementation; // the address of the hook contract
}
```

If you would like to set the hooks on multiple vaults, you will need to repeat the process on each one.

## Security

The hooks are called by the vault contract when a prize claim occurs, but a hook contract may not know which vaults to trust. There are a couple ways to verify that the caller of a hook can be trusted:

### Verify the Caller is a Standard Vault

The easiest way to check if the caller can be trusted is to verify that it has been deployed through the standard vault factory by using the [`deployedVaults`](/protocol/reference/vaults/VaultFactory#deployedvaults) mapping. If the vault was deployed by the factory, then the hook can be certain that it will only be called when a legitimate prize has been won.

This method is the quickest and safest, but it restricts the vault compatibility to only standard vaults from a specific factory contract. If a new factory or a new type of vault is created and uses the same hook standard, then it will not be compatible with a hook that uses this method.

### Verify the Caller is Any Valid Vault

To verify that the caller of a hook is any valid vault, it can be cross-referenced with the prize pool contract. Both hooks receive parameters for the winner's address, the prize tier, and the prize index. This data can be passed to the [`PrizePool.isWinner(...)`](/protocol/reference/prize-pool/PrizePool#iswinner) function with the vault parameter set as `msg.sender`. If this function returns `true`, the hook can be certain that the specified prize has been won for the last awarded draw.

> It is important to note that if this verification method is used, the additional parameters passed to the hooks (`fee` & `feeRecipient` or `prize` & `recipient`) cannot be trusted without additional verification.
>
> It is also possible that a malicious vault may call the hooks out of order, or not call a hook at all, so the default hook behavior should not be assumed.

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

> It may be tempting to use the `PrizePool.wasClaimed(...)` function to check for replay protection, but it is not secure as a malicious vault could call a hook as many times as it wants without actually claiming the prize.