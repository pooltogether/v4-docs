rm -rf docs/reference/v4-core/test
rm -rf docs/reference/v4-core/external
mv docs/reference/v4-core/prize-pool/YieldSourcePrizePool.md docs/reference/v4-core/YieldSourcePrizePool.md
rm -rf docs/reference/v4-core/prize-pool
rm -rf docs/reference/v4-core/external
rm -rf docs/reference/v4-core/interfaces
rm -rf docs/reference/v4-core/libraries
rm -rf docs/reference/v4-core/prize-strategy
echo '{ \"label\": \"V4 Core\", \"position\": 5 }' > docs/reference/v4-core/_category_.json