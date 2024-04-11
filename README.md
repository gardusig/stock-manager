# Stock Manager

Stock Manager is an application built on top of the ShitDB library. It provides functionality for managing stock transactions and generating sheets in Google Sheets.

## Push Code

To push the code to your Google Apps Script project, run `clasp login` to authenticate with your Google account, then execute `clasp push`.

## Summary

The Stock Manager application reads data from the `transaction` sheet, which contains stock transaction details, and performs the following operations:

1. **Reads Transaction Data**: Reads through the `transaction` sheet, extracting the following elements:

    | Ticker | Side | Quantity | Total     | Price  |
    | ------ | ---- | -------- | --------- | ------ |
    | SLCE3  | BUY  | 200      | $3,690.00 | $18.45 |

2. **Creates Position Sheet**: Generates a sheet called `generatedPosition` containing aggregated stock position data. Each row in the `generatedPosition` sheet represents a unique stock position and contains the following elements:

    | Ticker | AvgPrice  | Qty  |
    | ------ | --------- | ---- |
    | VALE3  | 66.352125 | 4000 |

3. **Creates Trade Sheet**: Generates a sheet called `generatedTrade` containing trade information. Each row in the `generatedTrade` sheet represents a trade and contains the following elements:

    | Ticker | Quantity | AvgBuyPrice | SellPrice | Profit | ProfitPercentage |
    | ------ | -------- | ----------- | --------- | ------ | ---------------- |
    | CMIG3  | 300      | 15          | 15.45     | 135    | 0.03             |

## Usage

### Main Function

The main function of the Stock Manager application is `main()`, which is responsible for initiating the stock management process. It can be manually triggered or set to run on a schedule.

### Usage Example

```javascript
// Import the Stock Wallet module
import { main } from 'stock-manager';

// Manually trigger the main function
main();
```
