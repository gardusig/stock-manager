namespace Internal {
  export class PreviousDayPosition {
    ticker: string;
    position: number;
    totalPurchasePrice: number;
    totalPurchaseQuantity: number;
    tradeList: Output.Trade.Model[];

    constructor(
      ticker: string,
      position = 0,
      totalPurchasePrice = 0.0,
      totalPurchaseQuantity = 0,
    ) {
      this.ticker = ticker;
      this.position = position;
      this.totalPurchasePrice = totalPurchasePrice;
      this.totalPurchaseQuantity = totalPurchaseQuantity;
      this.tradeList = [];
    }

    processCurrentDayPosition(
      currentDayPosition: Internal.CurrentDayPosition,
    ): void {
      this.processCurrentDayTrade(currentDayPosition);
      if (currentDayPosition.position > 0) {
        this.buy(
          currentDayPosition.position,
          currentDayPosition.getAverageBuyPrice(),
        );
      } else if (currentDayPosition.position < 0) {
        this.sell(
          currentDayPosition.date,
          currentDayPosition.position,
          currentDayPosition.getAverageSellPrice(),
        );
      }
    }

    getPositionIfValid(): Output.Position.Model | null {
      if (this.position <= 0) {
        return null;
      }
      return new Output.Position.Model(
        this.ticker,
        this.position,
        this.getAveragePurchasePrice(),
      );
    }

    private processCurrentDayTrade(
      currentDayPosition: Internal.CurrentDayPosition,
    ): void {
      const quantity = Math.min(
        currentDayPosition.totalBuyQuantity,
        currentDayPosition.totalSellQuantity,
      );
      if (quantity <= 0) {
        Logger.log(
          `PreviousDayPosition: no trade processed for CurrentDayPosition, ticker: ${this.ticker}, date: ${currentDayPosition.date}`,
        );
        return;
      }
      this.tradeList.push(
        new Output.Trade.Model(
          currentDayPosition.date,
          this.ticker,
          quantity,
          currentDayPosition.getAverageBuyPrice(),
          currentDayPosition.getAverageSellPrice(),
        ),
      );
      Logger.log(
        `PreviousDayPosition: added trade, ticker: ${this.ticker}, date: ${currentDayPosition.date}, quantity: ${quantity}, tradeListSize: ${this.tradeList.length}`,
      );
    }

    private buy(quantity: number, price: number): void {
      this.position += quantity;
      this.totalPurchaseQuantity += quantity;
      this.totalPurchasePrice += quantity * price;
      Logger.log(
        `PreviousDayPosition: bought, ticker: ${this.ticker}, position: ${this.position}, totalPurchaseQuantity: ${this.totalPurchaseQuantity}, totalPurchasePrice: ${this.totalPurchasePrice}`,
      );
    }

    private sell(date: string, quantity: number, price: number): void {
      this.position -= quantity;
      const trade = new Output.Trade.Model(
        date,
        this.ticker,
        quantity,
        this.getAveragePurchasePrice(),
        price,
      );
      this.tradeList.push(trade);
      Logger.log(
        `PreviousDayPosition: sold, ticker: ${this.ticker}, position: ${this.position}`,
      );
    }

    private getAveragePurchasePrice(): number {
      if (this.totalPurchaseQuantity === 0) {
        return 0;
      }
      return this.totalPurchasePrice / this.totalPurchaseQuantity;
    }
  }
}
