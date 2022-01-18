### Namespaces

- [calculate](calculate)
- [compute](compute)
- [utils](utils)

### References

- [calculateCardinality](calculate#calculatecardinality)
- [calculateFractionOfPrize](calculate#calculatefractionofprize)
- [calculateNormalizedBalancePicksFromTotalPicks](calculate#calculatenormalizedbalancepicksfromtotalpicks)
- [calculateNumberOfMatches](calculate#calculatenumberofmatches)
- [calculateNumberOfPrizesForTierIndex](calculate#calculatenumberofprizesfortierindex)
- [calculatePick](calculate#calculatepick)
- [calculatePicks](calculate#calculatepicks)
- [calculatePicksFromAverageTotalSuppliesBetween](calculate#calculatepicksfromaveragetotalsuppliesbetween)
- [calculatePrizeForTierPercentage](calculate#calculateprizefortierpercentage)
- [calculateTierIndexFromMatches](calculate#calculatetierindexfrommatches)
- [computeDrawResults](compute/#computedrawresults)
- [computePickPrize](compute/#computepickprize)
- [computePicksPrizes](compute/#computepicksprizes)
- [computePrizeAmount](compute/#computeprizeamount)
- [computePrizeDistributionFromTicketAverageTotalSupplies](compute/#computeprizedistributionfromticketaveragetotalsupplies)
- [computeUserPicks](compute/#computeuserpicks)
- [computeUserWinningPicksForRandomNumber](compute/#computeuserwinningpicksforrandomnumber)
- [computeWinningPicks](compute/#computewinningpicks)

## Functions

- [encodeWinningPicks](#encodewinningpicks)
- [winningPicks](#winningpicks)

### encodeWinningPicks

▸ **encodeWinningPicks**(`user`, `drawResults`): `Claim`

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `User` |
| `drawResults` | `DrawResults`[] |

#### Returns

`Claim`

#### Defined in

[encodeWinningPicks.ts:7](https://github.com/pooltogether/v4-js/blob/2137ee6/src/encodeWinningPicks.ts#L7)

___

### winningPicks

▸ **winningPicks**(`user`, `draws`, `prizeDistributions`): `Claim`

#### Parameters

| Name | Type |
| :------ | :------ |
| `user` | `User` |
| `draws` | `Draw`[] |
| `prizeDistributions` | `PrizeDistribution`[] |

#### Returns

`Claim`

#### Defined in

[winningPicks.ts:5](https://github.com/pooltogether/v4-js/blob/2137ee6/src/winningPicks.ts#L5)
