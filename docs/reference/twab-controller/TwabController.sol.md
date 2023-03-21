# TwabController
[Git Source](https://github.com/pooltogether/v5-twab-controller/blob/5ea608078f92284360b346fb5607a961437ae915/src/TwabController.sol)

**Author:**
PoolTogether Inc Team

This TwabController uses the TwabLib to provide token balances and on-chain historical
lookups to a user(s) time-weighted average balance. Each user is mapped to an
Account struct containing the TWAB history (ring buffer) and ring buffer parameters.
Every token.transfer() creates a new TWAB checkpoint. The new TWAB checkpoint is
stored in the circular ring buffer, as either a new checkpoint or rewriting a
previous checkpoint with new parameters. One checkpoint per day is stored.
The TwabLib guarantees minimum 1 year of search history.

*Time-Weighted Average Balance Controller for ERC20 tokens.*


## State Variables
### SPONSORSHIP_ADDRESS
Allows users to revoke their chances to win by delegating to the sponsorship address.


```solidity
address public constant SPONSORSHIP_ADDRESS = address(1);
```


### userTwabs
Record of token holders TWABs for each account for each vault


```solidity
mapping(address => mapping(address => TwabLib.Account)) internal userTwabs;
```


### totalSupplyTwab
Record of tickets total supply and ring buff parameters used for observation.


```solidity
mapping(address => TwabLib.Account) internal totalSupplyTwab;
```


### delegates

```solidity
mapping(address => mapping(address => address)) internal delegates;
```


## Functions
### balanceOf


```solidity
function balanceOf(address vault, address user) external view returns (uint256);
```

### totalSupply


```solidity
function totalSupply(address vault) external view returns (uint256);
```

### totalSupplyDelegateBalance


```solidity
function totalSupplyDelegateBalance(address vault) external view returns (uint256);
```

### delegateOf


```solidity
function delegateOf(address _vault, address _user) external view returns (address);
```

### delegateBalanceOf


```solidity
function delegateBalanceOf(address vault, address user) external view returns (uint256);
```

### getAccount


```solidity
function getAccount(address vault, address _user) external view returns (TwabLib.Account memory);
```

### getBalanceAt


```solidity
function getBalanceAt(address _vault, address _user, uint32 _targetTime) external view returns (uint256);
```

### getTotalSupplyAt


```solidity
function getTotalSupplyAt(address _vault, uint32 _targetTime) external view returns (uint256);
```

### getAverageBalanceBetween


```solidity
function getAverageBalanceBetween(address _vault, address _user, uint32 _startTime, uint32 _endTime)
    external
    view
    returns (uint256);
```

### getAverageTotalSupplyBetween


```solidity
function getAverageTotalSupplyBetween(address _vault, uint32 _startTime, uint32 _endTime)
    external
    view
    returns (uint256);
```

### getNewestTwab


```solidity
function getNewestTwab(address _vault, address _user)
    external
    view
    returns (uint16 index, ObservationLib.Observation memory twab);
```

### getOldestTwab


```solidity
function getOldestTwab(address _vault, address _user)
    external
    view
    returns (uint16 index, ObservationLib.Observation memory twab);
```

### twabMint


```solidity
function twabMint(address _to, uint112 _amount) external;
```

### twabBurn


```solidity
function twabBurn(address _from, uint112 _amount) external;
```

### twabTransfer


```solidity
function twabTransfer(address _from, address _to, uint112 _amount) external;
```

### delegate


```solidity
function delegate(address _vault, address _to) external;
```

### sponsor

Delegate user balance to the sponsorship address.

*Must only be called by the Vault contract.*


```solidity
function sponsor(address _from) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|Address of the user delegating their balance to the sponsorship address.|


### _transferBalance


```solidity
function _transferBalance(address _vault, address _from, address _to, uint112 _amount) internal;
```

### _delegateOf


```solidity
function _delegateOf(address _vault, address _user) internal view returns (address);
```

### _transferDelegateBalance


```solidity
function _transferDelegateBalance(address _vault, address _fromDelegate, address _toDelegate, uint112 _amount)
    internal;
```

### _delegate


```solidity
function _delegate(address _vault, address _from, address _toDelegate) internal;
```

### _increaseBalances


```solidity
function _increaseBalances(address _vault, address _user, uint112 _amount, uint112 _delegateAmount) internal;
```

### _decreaseBalances


```solidity
function _decreaseBalances(address _vault, address _user, uint112 _amount, uint112 _delegateAmount) internal;
```

### _decreaseTotalSupplyBalances


```solidity
function _decreaseTotalSupplyBalances(address _vault, uint112 _amount, uint112 _delegateAmount) internal;
```

### _increaseTotalSupplyBalances


```solidity
function _increaseTotalSupplyBalances(address _vault, uint112 _amount, uint112 _delegateAmount) internal;
```

## Events
### NewUserTwab

```solidity
event NewUserTwab(address indexed vault, address indexed user, ObservationLib.Observation newTwab);
```

### Delegated

```solidity
event Delegated(address indexed vault, address indexed delegator, address indexed delegate);
```

### NewTotalSupplyTwab

```solidity
event NewTotalSupplyTwab(address indexed vault, ObservationLib.Observation newTotalSupplyTwab);
```

