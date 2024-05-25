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
      Logger.log(`stockTransaction.quantity: ${stockTransaction.quantity}`);
      Logger.log(`this.quantity: ${this.quantity}`);
      this.unitPrice = parseFloat(stockTransaction.unitPrice.substring(3));
      Logger.log(`stockTransaction.unitPrice: ${stockTransaction.unitPrice}`);
      Logger.log(`this.unitPrice: ${this.unitPrice}`);
      this.totalValue = parseFloat(stockTransaction.totalValue);
      Logger.log(`stockTransaction.totalValue: ${stockTransaction.totalValue}`);
      Logger.log(`this.totalValue: ${this.totalValue}`);
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
