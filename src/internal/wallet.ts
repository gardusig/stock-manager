namespace Internal {
  export class Wallet {
    positionMap: Map<string, Internal.Position>;
    monthlyTradeReport: Internal.MonthlyTradeReport;

    constructor() {
      this.positionMap = new Map<string, Internal.Position>();
      this.monthlyTradeReport = new Internal.MonthlyTradeReport();
    }

    processTransactions(): void {
      for (const transaction of Input.Transaction.getTransactionList()) {
        this.processTransaction(transaction);
      }
      for (const trade of this.getTradeList()) {
        this.monthlyTradeReport.processTrade(trade);
      }
    }

    processSheets(): void {
      this.writeMonthlyTradeReportSheet();
      this.writeTradeSheet();
      this.writePositionSheet();
      this.trimSheets();
    }

    private getTradeList(): Output.Trade.Model[] {
      const tradeList: Output.Trade.Model[] = [];
      for (const position of this.positionMap.values()) {
        tradeList.push(...position.getTradeList());
      }
      tradeList.sort(dateCompare);
      return tradeList;
    }

    private processTransaction(transaction: Input.Transaction.Model): void {
      const ticker = transaction.ticker;
      if (!this.positionMap.has(ticker)) {
        const position = new Internal.Position(ticker);
        this.positionMap.set(ticker, position);
      }
      const position = this.positionMap.get(ticker)!;
      position.processTransaction(transaction);
    }

    private getPositionList(): Output.Position.Model[] {
      const positionList: Output.Position.Model[] = [];
      for (const position of this.positionMap.values()) {
        const outputPosition = position.getPositionIfValid();
        if (outputPosition !== null) {
          positionList.push(outputPosition);
        }
      }
      return positionList;
    }

    private writeMonthlyTradeReportSheet(): void {
      Output.Report.MonthlyTrade.createSheet(
        this.monthlyTradeReport.getMonthlyTradeReportList(),
      );
    }

    private writeTradeSheet(): void {
      Output.Trade.createSheet(this.getTradeList());
    }

    private writePositionSheet(): void {
      Output.Position.createSheet(this.getPositionList());
    }

    private trimSheets(): void {
      const sheetNames = ["position", "trade", "report/monthlyTrade"];
      for (const sheetName of sheetNames) {
        Util.trimSheet(sheetName);
      }
    }
  }
}

// Compares two trade models based on their dates in dd/mm/yyyy format
function dateCompare(a: Output.Trade.Model, b: Output.Trade.Model): number {
  const dateA = getConvertedDate(a.date);
  const dateB = getConvertedDate(b.date);
  return dateA.localeCompare(dateB);
}

// Converts a date from dd/mm/yyyy format to yyyymmdd format for comparison
function getConvertedDate(date: string): string {
  const [day, month, year] = date.split("/").map(Number);
  return `${year}${month.toString().padStart(2, "0")}${day.toString().padStart(2, "0")}`;
}
