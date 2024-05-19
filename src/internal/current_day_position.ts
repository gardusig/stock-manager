namespace Internal {
    export class CurrentDayPosition {
        date: string
        position: number
        totalBuyPrice: number
        totalBuyQuantity: number
        totalSellPrice: number
        totalSellQuantity: number

        constructor(
            date: string,
            position?: number,
            totalBuyPrice?: number,
            totalBuyQuantity?: number,
            totalSellPrice?: number,
            totalSellQuantity?: number,
        ) {
            this.date = date
            this.position = position ?? 0
            this.totalBuyPrice = totalBuyPrice ?? 0.0
            this.totalBuyQuantity = totalBuyQuantity ?? 0
            this.totalSellPrice = totalSellPrice ?? 0.0
            this.totalSellQuantity = totalSellQuantity ?? 0
        }

        ingestTransaction(stockTransaction: Input.Transaction): void {
            const quantity = stockTransaction.quantity
            const price = stockTransaction.unitPrice
            if (stockTransaction.isBuyOperation()) {
                this.buy(quantity, price)
                return
            }
            if (stockTransaction.isSellOperation()) {
                this.sell(quantity, price)
                return
            }
        }

        isDayEqual(date: string): boolean {
            return date === this.date
        }

        getAverageBuyPrice(): number {
            if (this.totalBuyQuantity === 0) {
                return 0
            }
            return this.totalBuyPrice / this.totalBuyQuantity
        }

        getAverageSellPrice(): number {
            if (this.totalSellQuantity === 0) {
                return 0
            }
            return this.totalSellPrice / this.totalSellQuantity
        }

        private buy(quantity: number, price: number): void {
            this.position += quantity
            this.totalBuyQuantity += quantity
            this.totalBuyPrice += (quantity * price)
        }

        private sell(quantity: number, price: number): void {
            this.position -= quantity
            this.totalSellQuantity += quantity
            this.totalSellPrice += (quantity * price)
        }
    }
}
