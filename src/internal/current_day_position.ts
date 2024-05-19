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
            position = 0,
            totalBuyPrice = 0.0,
            totalBuyQuantity = 0,
            totalSellPrice = 0.0,
            totalSellQuantity = 0,
        ) {
            this.date = date
            this.position = position ?? 0
            this.totalBuyPrice = totalBuyPrice ?? 0.0
            this.totalBuyQuantity = totalBuyQuantity ?? 0
            this.totalSellPrice = totalSellPrice ?? 0.0
            this.totalSellQuantity = totalSellQuantity ?? 0
        }

        processTransaction(transaction: Input.Transaction.Model): void {
            const quantity = transaction.quantity
            const price = transaction.unitPrice
            if (transaction.isBuyOperation()) {
                this.buy(quantity, price)
            } else if (transaction.isSellOperation()) {
                this.sell(quantity, price)
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
            this.totalBuyPrice += quantity * price
        }

        private sell(quantity: number, price: number): void {
            this.position -= quantity
            this.totalSellQuantity += quantity
            this.totalSellPrice += quantity * price
        }
    }
}
