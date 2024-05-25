namespace Internal {
  export class CurrentDayPosition {
    ticker: string;
    date: string;
    position: number;
    totalBuyPrice: number;
    totalBuyQuantity: number;
    totalSellPrice: number;
    totalSellQuantity: number;

    constructor(
      ticker: string,
      date: string,
      position = 0,
      totalBuyPrice = 0.0,
      totalBuyQuantity = 0,
      totalSellPrice = 0.0,
      totalSellQuantity = 0,
    ) {
      this.ticker = ticker;
      this.date = date;
      this.position = position ?? 0;
      this.totalBuyPrice = totalBuyPrice ?? 0.0;
      this.totalBuyQuantity = totalBuyQuantity ?? 0;
      this.totalSellPrice = totalSellPrice ?? 0.0;
      this.totalSellQuantity = totalSellQuantity ?? 0;
    }

    processTransaction(transaction: Input.Transaction.Model): void {
      const quantity = transaction.quantity;
      const price = transaction.unitPrice;
      if (transaction.isBuyOperation()) {
        this.buy(quantity, price);
      } else if (transaction.isSellOperation()) {
        this.sell(quantity, price);
      }
    }

    isDayEqual(date: string): boolean {
      return date === this.date;
    }

    getAverageBuyPrice(): number {
      if (this.totalBuyQuantity === 0) {
        return 0;
      }
      return this.totalBuyPrice / this.totalBuyQuantity;
    }

    getAverageSellPrice(): number {
      if (this.totalSellQuantity === 0) {
        return 0;
      }
      return this.totalSellPrice / this.totalSellQuantity;
    }

    private buy(quantity: number, price: number): void {
      this.position += quantity;
      this.totalBuyQuantity += quantity;
      this.totalBuyPrice += quantity * price;
      Logger.log(
        `CurrentDayPosition: bought, ticker: ${this.ticker}, position: ${this.position}, totalBuyQuantity: ${this.totalBuyQuantity}, totalBuyPrice: ${this.totalBuyPrice}, quantity: ${quantity}, price: ${price}`,
      );
    }

    private sell(quantity: number, price: number): void {
      this.position -= quantity;
      this.totalSellQuantity += quantity;
      this.totalSellPrice += quantity * price;
      Logger.log(
        `CurrentDayPosition: sold, ticker: ${this.ticker}, position: ${this.position}, totalSellQuantity: ${this.totalSellQuantity}, totalSellPrice: ${this.totalSellPrice}, quantity: ${quantity}, price: ${price}`,
      );
    }
  }
}
