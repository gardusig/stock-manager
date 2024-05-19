namespace Internal {
    export class PreviousDayPosition {
        ticker: string
        position: number
        totalPurchasePrice: number
        totalPurchaseQuantity: number
        tradeList: Output.Trade[]

        constructor(
            ticker: string,
            position?: number,
            totalPurchasePrice?: number,
            totalPurchaseQuantity?: number
        ) {
            this.ticker = ticker
            this.position = position ?? 0
            this.totalPurchasePrice = totalPurchasePrice ?? 0.0
            this.totalPurchaseQuantity = totalPurchaseQuantity ?? 0
            this.tradeList = []
        }

        ingestCurrentDayPosition(currentDayPosition: Internal.CurrentDayPosition): void {
            this.ingestCurrentDayTrade(currentDayPosition)
            if (currentDayPosition.position > 0) {
                this.buy(
                    currentDayPosition.position,
                    currentDayPosition.getAverageBuyPrice(),
                )
                return
            }
            if (currentDayPosition.position < 0) {
                this.sell(
                    currentDayPosition.date,
                    currentDayPosition.position,
                    currentDayPosition.getAverageSellPrice(),
                )
                return
            }
        }

        private ingestCurrentDayTrade(currentDayPosition: Internal.CurrentDayPosition): void {
            const quantity = Math.min(
                currentDayPosition.totalBuyQuantity,
                currentDayPosition.totalSellQuantity,
            )
            if (!(quantity > 0)) {
                return
            }
            this.tradeList.push(
                new Output.Trade(
                    currentDayPosition.date,
                    this.ticker,
                    quantity,
                    currentDayPosition.getAverageBuyPrice(),
                    currentDayPosition.getAverageSellPrice(),
                )
            )
        }

        private buy(quantity: number, price: number): void {
            this.position += quantity
            this.totalPurchaseQuantity += quantity
            this.totalPurchasePrice += (quantity * price)
        }

        private sell(date: string, quantity: number, price: number): void {
            this.position -= quantity
            const trade = new Output.Trade(
                date,
                this.ticker,
                quantity,
                this.getAveragePurchasePrice(),
                price,
            )
            this.tradeList.push(trade)
        }

        private getAveragePurchasePrice(): number {
            if (this.totalPurchaseQuantity === 0) {
                return 0
            }
            return this.totalPurchasePrice / this.totalPurchaseQuantity
        }
    }
}
