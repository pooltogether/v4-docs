[Git Source](https://github.com/generationsoftware/pt-v5-claimer/blob/a3619aa13c19beb25210ddb6474cd51aac794706/src/ClaimerFactory.sol)

**Author:**
G9 Software Inc.

Factory to deploy new VRGDA Claimer contracts for PoolTogether V5.


## State Variables
### allClaimers
List of all claimers deployed by this factory.


```solidity
Claimer[] public allClaimers;
```


### deployedClaimer
Mapping to verify if a Claimer has been deployed via this factory.


```solidity
mapping(Claimer claimer => bool deployedFromFactory) public deployedClaimer;
```


## Functions
### createClaimer

Creates a new Claimer with the provided parameters.


```solidity
function createClaimer(PrizePool _prizePool, uint256 _timeToReachMaxFee, UD2x18 _maxFeePortionOfPrize)
    external
    returns (Claimer);
```

### totalClaimers

Total number of claimers deployed by this factory.


```solidity
function totalClaimers() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|Number of claimers deployed by this factory.|


## Events
### ClaimerCreated
Emitted when a new claimer contract is created.


```solidity
event ClaimerCreated(
    Claimer indexed claimer, PrizePool indexed prizePool, uint256 timeToReachMaxFee, UD2x18 maxFeePortionOfPrize
);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`claimer`|`Claimer`||
|`prizePool`|`PrizePool`|The prize pool to claim for|
|`timeToReachMaxFee`|`uint256`|The time it should take to reach the maximum fee|
|`maxFeePortionOfPrize`|`UD2x18`|The maximum fee that can be charged as a portion of the prize size. Fixed point 18 number|

