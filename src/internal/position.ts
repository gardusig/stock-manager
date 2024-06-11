namespace Internal {
  export class Position {
    currentDayPosition: Internal.CurrentDayPosition | null;
    previousDayPosition: Internal.PreviousDayPosition;

    constructor(ticker: string) {
      this.currentDayPosition = null;
      this.previousDayPosition = new Internal.PreviousDayPosition(ticker);
    }

    processTransaction(transaction: Input.Transaction.Model): void {
      Logger.log(
        `Position: processing transaction: ${JSON.stringify(transaction, null, 2)}`,
      );
      this.resetDayIfNeeded(transaction.date);
      if (this.currentDayPosition) {
        this.currentDayPosition.processTransaction(transaction);
      }
    }

    getTradeList(): Output.Trade.Model[] {
      if (this.currentDayPosition !== null) {
        this.previousDayPosition.processCurrentDayPosition(
          this.currentDayPosition,
        );
        this.currentDayPosition = null;
      }
      return this.previousDayPosition.tradeList;
    }

    getPositionIfValid(): Output.Position.Model | null {
      return this.previousDayPosition.getPositionIfValid();
    }

    private resetDayIfNeeded(date: string): void {
      if (this.currentDayPosition === null) {
        this.currentDayPosition = new Internal.CurrentDayPosition(
          this.previousDayPosition.ticker,
          date,
        );
        Logger.log(
          `Position: created new CurrentDayPosition, ticker: ${this.previousDayPosition.ticker}, date: ${date}`,
        );
        return;
      }
      if (!this.currentDayPosition.isDayEqual(date)) {
        this.previousDayPosition.processCurrentDayPosition(
          this.currentDayPosition,
        );
        this.currentDayPosition = new Internal.CurrentDayPosition(
          this.previousDayPosition.ticker,
          date,
        );
        Logger.log(
          `Position: created new CurrentDayPosition, ticker: ${this.previousDayPosition.ticker}, date: ${date}`,
        );
      }
    }
  }
}
