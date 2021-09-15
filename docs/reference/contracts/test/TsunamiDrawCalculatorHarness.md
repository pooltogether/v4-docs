

## Functions
### calculateDistributionIndex
```solidity
  function calculateDistributionIndex(
  ) public returns (uint256)
```




### createBitMasks
```solidity
  function createBitMasks(
  ) public returns (uint256[])
```




### calculatePrizeDistributionFraction
```solidity
  function calculatePrizeDistributionFraction(
    struct DrawLib.DrawSettings _drawSettings,
    uint256 _prizeDistributionIndex
  ) external returns (uint256)
```
Calculates the expected prize fraction per DrawSettings and prizeDistributionIndex


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_drawSettings` | struct DrawLib.DrawSettings | DrawSettings struct for Draw
|`_prizeDistributionIndex` | uint256 | Index of the prize distribution array to calculate

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`returns`| struct DrawLib.DrawSettings | the fraction of the total prize
### numberOfPrizesForIndex
```solidity
  function numberOfPrizesForIndex(
  ) external returns (uint256)
```




