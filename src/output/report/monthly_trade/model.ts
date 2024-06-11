namespace Output.Report.MonthlyTrade {
  export class Model implements Output.Model {
    readonly year: string;
    readonly month: string;
    readonly totalSold: number;
    readonly dayTrade: number;
    readonly swingTrade: number;

    constructor(
      year: string,
      month: string,
      totalSold: number,
      dayTrade: number,
      swingTrade: number,
    ) {
      this.year = year;
      this.month = month;
      this.totalSold = totalSold;
      this.dayTrade = dayTrade;
      this.swingTrade = swingTrade;
    }

    buildSheetObject(): Record<string, any> {
      return {
        [Header.year]: this.year,
        [Header.month]: this.month,
        [Header.totalSold]: this.totalSold,
        [Header.dayTrade]: this.dayTrade,
        [Header.swingTrade]: this.swingTrade,
      };
    }

    static getHeader(): string[] {
      return [
        Header.year,
        Header.month,
        Header.totalSold,
        Header.dayTrade,
        Header.swingTrade,
      ];
    }
  }

  export function createSheet(
    monthlyTradeReportList: Output.Report.MonthlyTrade.Model[],
    sheetName?: string,
    header?: string[],
  ): void {
    sheetName = sheetName ?? "generatedMonthlyReport";
    header = header ?? Output.Report.MonthlyTrade.Model.getHeader();
    Util.createSheet(sheetName, header, monthlyTradeReportList);
  }

  enum Header {
    year = "year",
    month = "month",
    totalSold = "totalSold",
    dayTrade = "dayTrade",
    swingTrade = "swingTrade",
  }
}
