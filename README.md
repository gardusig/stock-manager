# shitdb
Library for handling data mapping between Javascript objects and Google Sheets

## Push code

```bash
clasp login
clasp push
```

## Summary

Reads through `transaction` sheet, extracting these element like this:

| Ticker | Side | Quantity | Total     | Price  |
| ------ | ---- | -------- | --------- | ------ |
| SLCE3  | BUY  | 200      | $3,690.00 | $18.45 |

Creates a sheet called `generatedPosition`, with elements like this:

| Ticker | AvgPrice  | Qty  |
| ------ | --------- | ---- |
| VALE3  | 66.352125 | 4000 |

Also creates a sheet called `generatedTrade`, with elements like this:

| Ticker | Quantity | AvgBuyPrice | SellPrice | Profit | ProfitPercentage |
| ------ | -------- | ----------- | --------- | ------ | ---------------- |
| CMIG3  | 300      | 15          | 15.45     | 135    | 0.03             |
