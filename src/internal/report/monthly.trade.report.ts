namespace Internal {
  export class MonthlyTradeReport {
    tradeReportByYearByMonth: Map<
      string,
      Map<string, Internal.Report.TradeReport>
    >;

    constructor() {
      this.tradeReportByYearByMonth = new Map<
        string,
        Map<string, Internal.Report.TradeReport>
      >();
    }

    processTrade(trade: Output.Trade.Model): void {
      const [year, month] = this.getYearAndMonthFromStockTrade(trade);
      if (!this.tradeReportByYearByMonth.has(year)) {
        this.tradeReportByYearByMonth.set(
          year,
          new Map<string, Internal.Report.TradeReport>(),
        );
      }
      const totalSoldPerMonth = this.tradeReportByYearByMonth.get(year)!;
      if (!totalSoldPerMonth.has(month)) {
        totalSoldPerMonth.set(month, {
          totalSold: 0,
          dayTrade: 0,
          swingTrade: 0,
        });
      }
      const tradeReport = totalSoldPerMonth.get(month)!;
      const amountToAdd = trade.quantity * trade.avgSellPrice;
      tradeReport.totalSold += amountToAdd;
      if (trade.type === "SWING") {
        tradeReport.swingTrade += amountToAdd;
      }
      if (trade.type === "DAY") {
        tradeReport.dayTrade += amountToAdd;
      }
      totalSoldPerMonth.set(month, tradeReport);
    }

    getMonthlyTradeReportList(): Output.Report.MonthlyTrade.Model[] {
      const monthlyTradeReportList: Output.Report.MonthlyTrade.Model[] = [];
      for (const [year, totalSoldPerMonth] of this.tradeReportByYearByMonth) {
        for (const [month, tradeReport] of totalSoldPerMonth) {
          const report = new Output.Report.MonthlyTrade.Model(
            year,
            month,
            tradeReport.totalSold,
            tradeReport.dayTrade,
            tradeReport.swingTrade,
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
