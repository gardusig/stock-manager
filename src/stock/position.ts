namespace Stock {
    export class Position implements Sheet.Convertible {
        ticker: string
        position: number
        totalPurchasePrice: number
        totalPurchaseQuantity: number

        constructor(ticker: string, position?: number, totalPurchasePrice?: number, totalPurchaseQuantity?: number) {
            this.ticker = ticker
            this.position = position ?? 0
            this.totalPurchasePrice = totalPurchasePrice ?? 0.0
            this.totalPurchaseQuantity = totalPurchaseQuantity ?? 0.0
        }

        update(stockTransaction: Stock.Transaction): Stock.Trade | null {
            const quantity = stockTransaction.quantity
            const price = stockTransaction.unitPrice
            if (stockTransaction.isBuyOperation()) {
                this.buy(quantity, price)
                return null
            }
            if (stockTransaction.isSellOperation()) {
                return this.sell(quantity, price)
            }
            return null
        }

        getAveragePurchasePrice(): number {
            return this.totalPurchasePrice / this.totalPurchaseQuantity
        }

        buy(quantity: number, price: number): void {
            this.position += quantity
            this.totalPurchaseQuantity += quantity
            this.totalPurchasePrice += (quantity * price)
        }

        sell(quantity: number, price: number): Stock.Trade {
            this.position -= quantity
            return new Stock.Trade(
                this.ticker,
                quantity,
                this.getAveragePurchasePrice(),
                price
            )
        }

        buildSheetObject(): Record<string, any> {
            return {
                [PositionSheet.Header.ticker]: this.ticker,
                [PositionSheet.Header.avgPrice]: this.getAveragePurchasePrice(),
                [PositionSheet.Header.position]: this.position,
            }
        }
    }
}
