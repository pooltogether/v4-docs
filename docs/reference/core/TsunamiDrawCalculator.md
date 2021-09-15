


## Functions
### initialize
```solidity
  function initialize(
    contract ITicket _ticket,
    address _drawSettingsManager,
    contract ClaimableDraw _claimableDraw
  ) public
```
Initializer sets the initial parameters


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_ticket` | contract ITicket | Ticket associated with this DrawCalculator
|`_drawSettingsManager` | address | Address of the DrawSettingsManager. Can be different from the contract owner.
|`_claimableDraw` | contract ClaimableDraw | ClaimableDraw associated with this DrawCalculator

### calculate
```solidity
  function calculate(
    address _user,
    struct DrawLib.Draw[] _draws,
    bytes _pickIndicesForDraws
  ) external returns (uint96[])
```
Calulates the prize amount for a user for Multiple Draws. Typically called by a ClaimableDraw.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_user` | address | User for which to calcualte prize amount
|`_draws` | struct DrawLib.Draw[] | draw array for which to calculate prize amounts for
|`_pickIndicesForDraws` | bytes | The encoded pick indices for all Draws. Expected to be just indices of winning claims. Populated values must be less than totalUserPicks.

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`An`| address | array of amount of prizes awardable
### setDrawSettings
```solidity
  function setDrawSettings(
    uint32 _drawId,
    struct DrawLib.DrawSettings _drawSettings
  ) external returns (bool success)
```
Sets DrawSettings for a draw id. only callable by the owner or manager


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_drawId` | uint32 | The id of the Draw
|`_drawSettings` | struct DrawLib.DrawSettings | The DrawSettings to set

### setClaimableDraw
```solidity
  function setClaimableDraw(
    contract ClaimableDraw _claimableDraw
  ) external returns (contract ClaimableDraw)
```
Sets DrawSettings for a draw id. only callable by the owner or manager


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_claimableDraw` | contract ClaimableDraw | The address of the ClaimableDraw to update with the updated DrawSettings

### getDrawSettings
```solidity
  function getDrawSettings(
    uint32 _drawId
  ) external returns (struct DrawLib.DrawSettings)
```
Gets the DrawSettings for a draw id


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_drawId` | uint32 | The id of the Draw

### _calculatePrizesAwardable
```solidity
  function _calculatePrizesAwardable(
    uint256[] _userBalances,
    bytes32 _userRandomNumber,
    uint256[] _winningRandomNumbers,
    uint256[][] _pickIndicesForDraws
  ) internal returns (uint96[])
```
Calculates the prizes awardable foe each Draw passed. Called by calculate()


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_userBalances` | uint256[] | Balances of the user at each Draw
|`_userRandomNumber` | bytes32 | Random number of the user to consider over draws
|`_winningRandomNumbers` | uint256[] | Winning random numbers for each Draw
|`_pickIndicesForDraws` | uint256[][] | Pick indices for each Draw

### _calculate
```solidity
  function _calculate(
    uint256 _winningRandomNumber,
    uint256 _balance,
    bytes32 _userRandomNumber,
    uint256[] _picks,
    struct DrawLib.DrawSettings _drawSettings
  ) internal returns (uint96)
```
calculates the prize amount per Draw per users pick


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_winningRandomNumber` | uint256 | The Draw's winningRandomNumber
|`_balance` | uint256 | The users's balance for that Draw
|`_userRandomNumber` | bytes32 | the users randomNumber for that draw
|`_picks` | uint256[] | The users picks for that draw
|`_drawSettings` | struct DrawLib.DrawSettings | Params with the associated draw

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`prize`| uint256 | (if any) per Draw claim
### _calculateDistributionIndex
```solidity
  function _calculateDistributionIndex(
    uint256 _randomNumberThisPick,
    uint256 _winningRandomNumber,
    uint256[] _masks
  ) internal returns (uint256)
```
Calculates the distribution index given the random numbers and masks


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_randomNumberThisPick` | uint256 | users random number for this Pick
|`_winningRandomNumber` | uint256 | The winning number for this draw
|`_masks` | uint256[] | The pre-calculate bitmasks for the drawSettings

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`The`| uint256 | position within the prize distribution array (0 = top prize, 1 = runner-up prize, etc)
### _createBitMasks
```solidity
  function _createBitMasks(
    struct DrawLib.DrawSettings _drawSettings
  ) internal returns (uint256[])
```
helper function to create bitmasks equal to the matchCardinality


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_drawSettings` | struct DrawLib.DrawSettings | The DrawSettings to use to calculate the masks

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`An`| struct DrawLib.DrawSettings | array of bitmasks
### _calculatePrizeDistributionFraction
```solidity
  function _calculatePrizeDistributionFraction(
    struct DrawLib.DrawSettings _drawSettings,
    uint256 _prizeDistributionIndex
  ) internal returns (uint256)
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
|`returns`| struct DrawLib.DrawSettings | the fraction of the total prize (base 1e18)
### _numberOfPrizesForIndex
```solidity
  function _numberOfPrizesForIndex(
    uint8 _bitRangeSize,
    uint256 _prizeDistributionIndex
  ) internal returns (uint256)
```
Calculates the number of prizes for a given prizeDistributionIndex


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_bitRangeSize` | uint8 | DrawSettings struct for Draw
|`_prizeDistributionIndex` | uint256 | Index of the prize distribution array to calculate

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`returns`| uint8 | the fraction of the total prize (base 1e18)
### _setDrawSettings
```solidity
  function _setDrawSettings(
    uint32 drawId,
    struct DrawLib.DrawSettings _drawSettings
  ) internal returns (bool)
```
Set the DrawCalculators DrawSettings

Distributions must be expressed with Ether decimals (1e18)

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`drawId` | uint32 | The id of the Draw
|`_drawSettings` | struct DrawLib.DrawSettings | DrawSettings struct to set

### _setClaimableDraw
```solidity
  function _setClaimableDraw(
    contract ClaimableDraw _claimableDraw
  ) internal returns (contract ClaimableDraw)
```
Internal function to set the Claimable Draw address


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_claimableDraw` | contract ClaimableDraw | The address of the Claimable Draw contract to set

