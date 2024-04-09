enum PositionTableHeader {
    ticker = 'ticker',
    avgPrice = 'avgPrice',
    position = 'position',
    spent = 'spent'
}

namespace StockPosition {
    export class StockPosition {
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

        getAveragePurchasePrice() {
            return this.totalPurchasePrice / this.totalPurchaseQuantity
        }

        buy(quantity: number, price: number) {
            this.position += quantity
            this.totalPurchaseQuantity += quantity
            this.totalPurchasePrice += (quantity * price)
        }

        sell(quantity: number) {
            this.position -= quantity
        }

        buildSheetObject() {
            return {
                [PositionTableHeader.ticker]: this.ticker,
                [PositionTableHeader.avgPrice]: this.getAveragePurchasePrice(),
                [PositionTableHeader.position]: this.position,
                [PositionTableHeader.spent]: this.totalPurchasePrice,
            }
        }
    }

    export function getHeader() {
        return [
            PositionTableHeader.ticker,
            PositionTableHeader.avgPrice,
            PositionTableHeader.position,
            PositionTableHeader.spent,
        ]
    }
}
