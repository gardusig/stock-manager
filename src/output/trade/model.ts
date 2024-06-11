namespace Output.Trade {
  export class Model implements Output.Model {
    readonly date: string;
    readonly ticker: string;
    readonly quantity: number;
    readonly avgBuyPrice: number;
    readonly avgSellPrice: number;
    readonly type: string;

    constructor(
      date: string,
      ticker: string,
      quantity: number,
      avgBuyPrice: number,
      sellPrice: number,
      type: string,
    ) {
      this.date = date;
      this.ticker = ticker;
      this.quantity = quantity;
      this.avgBuyPrice = avgBuyPrice;
      this.avgSellPrice = sellPrice;
      this.type = type;
    }

    buildSheetObject(): Record<string, any> {
      return {
        [Header.date]: this.date,
        [Header.ticker]: this.ticker,
        [Header.quantity]: this.quantity,
        [Header.avgBuyPrice]: this.avgBuyPrice,
        [Header.avgSellPrice]: this.avgSellPrice,
        [Header.profit]: this.calculateTradeProfit(),
        [Header.profitPercentage]: this.calculateTradeProfitPercentage(),
        [Header.type]: this.type,
      };
    }

    static getHeader(): string[] {
      return [
        Header.date,
        Header.ticker,
        Header.quantity,
        Header.avgBuyPrice,
        Header.avgSellPrice,
        Header.profit,
        Header.profitPercentage,
        Header.type,
      ];
    }

    private calculateTradeProfit(): number {
      return (this.avgSellPrice - this.avgBuyPrice) * this.quantity;
    }

    private calculateTradeProfitPercentage(): number {
      if (this.avgBuyPrice === 0) {
        return 1;
      }
      return this.avgSellPrice / this.avgBuyPrice - 1;
    }
  }

  export function createSheet(
    tradeList: Output.Trade.Model[],
    sheetName?: string,
    header?: string[],
  ): void {
    sheetName = sheetName ?? "generatedTrade";
    header = header ?? Output.Trade.Model.getHeader();
    Util.createSheet(sheetName, header, tradeList);
  }

  enum Header {
    date = "date",
    ticker = "ticker",
    quantity = "quantity",
    avgBuyPrice = "avgBuyPrice",
    avgSellPrice = "avgSellPrice",
    profit = "profit",
    profitPercentage = "profitPercentage",
    type = "type",
  }
}
