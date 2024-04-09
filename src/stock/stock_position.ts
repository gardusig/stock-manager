namespace StockPosition {
    export class StockPosition implements StockUtil.SheetValue {
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

        getAveragePurchasePrice(): number {
            return this.totalPurchasePrice / this.totalPurchaseQuantity
        }

        buy(quantity: number, price: number): void {
            this.position += quantity
            this.totalPurchaseQuantity += quantity
            this.totalPurchasePrice += (quantity * price)
        }

        sell(quantity: number, price: number): StockTrade.StockTrade {
            this.position -= quantity
            return new StockTrade.StockTrade(
                this.ticker,
                quantity,
                this.getAveragePurchasePrice(),
                price
            )
        }

        buildSheetObject(): Record<string, any> {
            return {
                [PositionTableHeader.ticker]: this.ticker,
                [PositionTableHeader.avgPrice]: this.getAveragePurchasePrice(),
                [PositionTableHeader.position]: this.position,
            }
        }
    }

    export function getHeader() {
        return [
            PositionTableHeader.ticker,
            PositionTableHeader.avgPrice,
            PositionTableHeader.position,
        ]
    }
}

enum PositionTableHeader {
    ticker = 'ticker',
    avgPrice = 'avgPrice',
    position = 'qty',
}
