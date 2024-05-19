namespace Manager {
    export class Position {
        tradeList: Output.Trade[]
        currentDayPosition: Internal.CurrentDayPosition | null
        previousDayPosition: Internal.PreviousDayPosition

        constructor(ticker: string) {
            this.tradeList = []
            this.currentDayPosition = null
            this.previousDayPosition = new Internal.PreviousDayPosition(ticker)
        }

        processTransaction(stockTransaction: Input.Transaction): void {
            this.resetDayIfNeeded(stockTransaction.date)
            this.currentDayPosition!.ingestTransaction(stockTransaction)
        }

        private resetDayIfNeeded(date: string): void {
            if (this.currentDayPosition === null) {
                this.currentDayPosition = new Internal.CurrentDayPosition(date)
                return
            }
            if (!this.currentDayPosition.isDayEqual(date)) {
                this.previousDayPosition.ingestCurrentDayPosition(this.currentDayPosition)
                this.currentDayPosition = new Internal.CurrentDayPosition(date)
            }
        }
    }
}
