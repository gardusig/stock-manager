namespace Internal {
  export class MonthlyTradeReport {
    totalSoldPerYearPerMonth: Map<string, Map<string, number>>;

    constructor() {
      this.totalSoldPerYearPerMonth = new Map<string, Map<string, number>>();
    }

    processTrade(trade: Output.Trade.Model): void {
      const [year, month] = this.getYearAndMonthFromStockTrade(trade);
      if (!this.totalSoldPerYearPerMonth.has(year)) {
        this.totalSoldPerYearPerMonth.set(year, new Map<string, number>());
      }
      const totalSoldPerMonth = this.totalSoldPerYearPerMonth.get(year)!;
      if (!totalSoldPerMonth.has(month)) {
        totalSoldPerMonth.set(month, 0);
      }
      const previousValue = totalSoldPerMonth.get(month)!;
      const amountToAdd = trade.quantity * trade.sellPrice;
      const newValue = previousValue + amountToAdd;
      totalSoldPerMonth.set(month, newValue);
    }

    getMonthlyTradeReportList(): Output.Report.MonthlyTrade.Model[] {
      const monthlyTradeReportList: Output.Report.MonthlyTrade.Model[] = [];
      for (const [year, totalSoldPerMonth] of this.totalSoldPerYearPerMonth) {
        for (const [month, totalSold] of totalSoldPerMonth) {
          const report = new Output.Report.MonthlyTrade.Model(
            year,
            month,
            totalSold,
          );
          monthlyTradeReportList.push(report);
        }
      }
      return monthlyTradeReportList;
    }

    private getMonthFromStockTrade(stockTrade: Output.Trade.Model): string {
      const dateParts = stockTrade.date.split("/");
      return dateParts[1];
    }

    private getYearFromStockTrade(stockTrade: Output.Trade.Model): string {
      const dateParts = stockTrade.date.split("/");
      return dateParts[2];
    }

    private getYearAndMonthFromStockTrade(
      stockTrade: Output.Trade.Model,
    ): [string, string] {
      return [
        this.getYearFromStockTrade(stockTrade),
        this.getMonthFromStockTrade(stockTrade),
      ];
    }
  }
}
