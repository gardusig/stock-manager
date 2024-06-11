namespace Internal.Report {
  export class TradeReport {
    totalSold: number;
    dayTrade: number;
    swingTrade: number;

    constructor(
      totalSold: number = 0,
      dayTrade: number = 0,
      swingTrade: number = 0,
    ) {
      this.totalSold = totalSold;
      this.dayTrade = dayTrade;
      this.swingTrade = swingTrade;
    }
  }
}
