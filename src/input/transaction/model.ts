namespace Input.Transaction {
  export class Model {
    date: string;
    side: string;
    ticker: string;
    quantity: number;
    unitPrice: number;
    totalValue: number;

    constructor(stockTransaction: Input.Transaction.StockTransaction) {
      if (
        !stockTransaction.date ||
        !stockTransaction.side ||
        !stockTransaction.ticker ||
        !stockTransaction.quantity ||
        !stockTransaction.unitPrice ||
        !stockTransaction.totalValue
      ) {
        throw new Error("Missing required properties in stockTransaction");
      }
      this.date = stockTransaction.date;
      this.side = stockTransaction.side;
      this.ticker = this.getNonFractionalTicker(stockTransaction.ticker);
      this.quantity = parseInt(stockTransaction.quantity);
      this.unitPrice = parseFloatOrString(stockTransaction.unitPrice);
      this.totalValue = parseFloatOrString(stockTransaction.totalValue);
    }

    isBuyOperation(): boolean {
      return this.side === "Compra";
    }

    isSellOperation(): boolean {
      return this.side === "Venda";
    }

    private getNonFractionalTicker(ticker: string): string {
      if (ticker[ticker.length - 1] === "F") {
        return ticker.substring(0, ticker.length - 1);
      }
      return ticker;
    }
  }

  export function getTransactionList(): Input.Transaction.Model[] {
    const transactionList: Input.Transaction.Model[] = [];
    const rawTransactionList = readSheet();
    for (let i = rawTransactionList.length - 1; i >= 0; i--) {
      const transaction = new Input.Transaction.Model(rawTransactionList[i]);
      transactionList.push(transaction);
    }
    return transactionList;
  }
}

function readSheet(sheetName?: string): any[] {
  sheetName = sheetName ?? "transaction";
  const transactionSheet = new ShitDb.Mapper.SheetToObject(sheetName);
  return transactionSheet.getAllObjects();
}

function parseFloatOrString(value: string | number): number {
  if (typeof value === "string") {
    return parseFloat(value.substring(3));
  }
  return value;
}
