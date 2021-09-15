
Extension of {ERC20} that adds a set of accounts with the {MinterRole},
which have permission to mint (create) new tokens as they see fit.

At construction, the deployer of the contract is the only minter.

## Functions
### constructor
```solidity
  function constructor(
  ) public
```




### mint
```solidity
  function mint(
  ) public returns (bool)
```

See {ERC20-_mint}.

Requirements:

- the caller must have the {MinterRole}.


### burn
```solidity
  function burn(
  ) public returns (bool)
```




### masterTransfer
```solidity
  function masterTransfer(
  ) public
```




